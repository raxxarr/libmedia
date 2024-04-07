/*
 * libmedia mov encoder
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 * 
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 * 
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */

import OFormat from './OFormat'
import AVPacket, { AVPacketFlags } from 'avutil/struct/avpacket'
import { AVOFormatContext } from '../AVformatContext'

import { MOVContext, MovFormatOptions, MOVStreamContext } from './mov/type'
import createMovContext from './mov/function/createMovContext'
import mktag from '../function/mktag'
import { AVCodecID, AVMediaType } from 'avutil/codec'
import * as omov from './mov/omov'
import { BoxType, SampleFlags, TKHDFlags } from './mov/boxType'
import createMovStreamContext from './mov/function/createMovStreamContext'
import createFragmentTrack from './mov/function/createFragmentTrack'
import IOWriter from 'common/io/IOWriterSync'
import * as array from 'common/util/array'
import * as logger from 'common/util/logger'
import concatTypeArray from 'common/function/concatTypeArray'
import updatePositionSize from './mov/function/updatePositionSize'
import { AV_TIME_BASE, AV_TIME_BASE_Q, UINT32_MAX } from 'avutil/constant'
import { FragmentMode, MovMode } from './mov/mov'
import * as object from 'common/util/object'
import rewriteIO from '../function/rewriteIO'

import arrayItemSame from '../function/arrayItemSame'
import { AVDisposition } from '../AVStream'
import { AVFormat } from '../avformat'
import { avQ2D, avRescaleQ } from 'avutil/util/rational'
import { getAVPacketData } from 'avutil/util/avpacket'
import { Rational } from 'avutil/struct/rational'
import Annexb2AvccFilter from '../bsf/h2645/Annexb2AvccFilter'
import { BitFormat } from '../codecs/h264'

const defaultOptions: MovFormatOptions = {
  fragmentMode: FragmentMode.GOP,
  movMode: MovMode.MP4,
  fragment: false,
  fastOpen: false,
  defaultBaseIsMoof: false
}

export default class OMovFormat extends OFormat {

  public type: AVFormat = AVFormat.MOV

  private context: MOVContext

  public options: MovFormatOptions

  private annexb2AvccFilter: Annexb2AvccFilter

  constructor(options: MovFormatOptions = {}) {
    super()

    this.options = object.extend({}, defaultOptions, options)

    this.context = createMovContext()
  }

  public init(formatContext: AVOFormatContext): number {
    formatContext.ioWriter.setEndian(true)
    const videoStream = formatContext.getStreamByMediaType(AVMediaType.AVMEDIA_TYPE_VIDEO)

    if (videoStream) {
      this.annexb2AvccFilter = new Annexb2AvccFilter()
      this.annexb2AvccFilter.init(addressof(videoStream.codecpar), addressof(videoStream.timeBase))
    }
    return 0
  }

  public destroy(formatContext: AVOFormatContext): void {
    super.destroy(formatContext)
    if (this.annexb2AvccFilter) {
      this.annexb2AvccFilter.destroy()
      this.annexb2AvccFilter = null
    }
  }

  /*
   * stream.disposition controls the "enabled" flag in the tkhd tag.
   * QuickTime will not play a track if it is not enabled.  So make sure
   * that one track of each type (audio, video, subtitle) is enabled.
   *
   * Subtitles are special.  For audio and video, setting "enabled" also
   * makes the track "default" (i.e. it is rendered when played). For
   * subtitles, an "enabled" subtitle is not rendered by default, but
   * if no subtitle is enabled, the subtitle menu in QuickTime will be
   * empty!
   */
  private enableStreams(formatContext: AVOFormatContext) {
    const enabled = []
    const first = []

    for (let i = 0; i < AVMediaType.AVMEDIA_TYPE_NB; i++) {
      enabled[i] = 0
      first[i] = -1
    }
    array.each(formatContext.streams, (stream, index) => {
      if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_UNKNOWN
        || stream.codecpar.codecType >= AVMediaType.AVMEDIA_TYPE_NB
      ) {
        return true
      }

      if (first[stream.codecpar.codecType] < 0) {
        first[stream.codecpar.codecType] = index
      }

      if (stream.disposition & AVDisposition.DEFAULT) {
        enabled[stream.codecpar.codecType]++
        (stream.privData as MOVStreamContext).flags |= TKHDFlags.ENABLED
      }
    })

    for (let i = 0; i < AVMediaType.AVMEDIA_TYPE_NB; i++) {
      switch (i) {
        case AVMediaType.AVMEDIA_TYPE_VIDEO:
        case AVMediaType.AVMEDIA_TYPE_AUDIO:
        case AVMediaType.AVMEDIA_TYPE_SUBTITLE:
          if (enabled[i] > 1) {
            (formatContext.streams[enabled[i]].privData as MOVStreamContext).perStreamGrouping = true
          }
          if (!enabled[i] && first[i] >= 0) {
            (formatContext.streams[first[i]].privData as MOVStreamContext).flags |= TKHDFlags.ENABLED
          }
          break
      }
    }
  }

  public writeHeader(formatContext: AVOFormatContext): number {

    this.context.majorBrand = mktag('isom')
    this.context.minorVersion = 512
    this.context.compatibleBrand = [mktag('isom')]
    this.context.timescale = 1000

    if (this.options.fragment) {
      this.context.compatibleBrand.push(mktag('iso6'))
      this.context.fragment = true
    }
    if (this.options.movMode === MovMode.MOV) {
      this.context.isom = true
      this.context.majorBrand = mktag('qt  ')
      this.context.compatibleBrand = [this.context.majorBrand]
    }

    if (this.options.movMode !== MovMode.MOV) {
      this.context.compatibleBrand.push(mktag('iso2'))

      const videoStream = formatContext.getStreamByMediaType(AVMediaType.AVMEDIA_TYPE_VIDEO)

      if (videoStream && videoStream.codecpar.codecId === AVCodecID.AV_CODEC_ID_H264) {
        this.context.compatibleBrand.push(mktag('avc1'))
      }

      this.context.compatibleBrand.push(mktag('mp41'))
    }

    omov.writeFtyp(formatContext.ioWriter, this.context)
    this.context.holdMoovPos = formatContext.ioWriter.getPos()

    if (this.options.fragment) {
      this.context.currentFragment = {
        pos: 0n,
        currentTrack: null,
        sequence: 1,
        tracks: [],
        size: 0,
        firstWrote: false
      }

      array.each(formatContext.streams, (stream, index) => {
        const streamContext = createMovStreamContext()
        stream.privData = streamContext

        streamContext.chunkOffsets = []
        streamContext.cttsSampleCounts = []
        streamContext.cttsSampleOffsets = []
        streamContext.stscFirstChunk = []
        streamContext.stscSamplesPerChunk = []
        streamContext.stscSampleDescriptionIndex = []
        streamContext.stssSampleNumbers = []
        streamContext.sampleSizes = []
        streamContext.sttsSampleCounts = []
        streamContext.sttsSampleDeltas = []
        streamContext.alternateGroup = index

        const track = createFragmentTrack()
        track.baseIsMoof = this.options.defaultBaseIsMoof
        track.streamIndex = stream.index
        track.trackId = this.context.nextTrackId++
        streamContext.trackId = track.trackId

        track.ioWriter = new IOWriter()
        track.ioWriter.onFlush = (data) => {
          track.buffers.push(data.slice())
          return 0
        }
        this.context.currentFragment.tracks.push(track)
      })

      this.enableStreams(formatContext)

      omov.writeMoov(formatContext.ioWriter, formatContext, this.context)
      formatContext.ioWriter.flush()
    }
    else {
      array.each(formatContext.streams, (stream, index) => {
        const streamContext = createMovStreamContext()
        stream.privData = streamContext

        streamContext.trackId = this.context.nextTrackId++

        streamContext.chunkOffsets = []
        streamContext.cttsSampleCounts = []
        streamContext.cttsSampleOffsets = []
        streamContext.stscFirstChunk = []
        streamContext.stscSamplesPerChunk = []
        streamContext.stscSampleDescriptionIndex = []
        streamContext.stssSampleNumbers = []
        streamContext.sampleSizes = []
        streamContext.sttsSampleCounts = []
        streamContext.sttsSampleDeltas = []
        streamContext.alternateGroup = index
      })

      this.enableStreams(formatContext)

      const pos = formatContext.ioWriter.getPos()
      formatContext.ioWriter.writeUint32(0)
      formatContext.ioWriter.writeUint32(mktag(BoxType.MDAT))
      this.context.boxsPositionInfo.push({
        pos,
        type: BoxType.MDAT,
        size: 0
      })
    }
    return 0
  }

  private updateCurrentChunk(formatContext: AVOFormatContext) {
    let currentChunk = this.context.currentChunk

    if (!currentChunk.sampleCount) {
      return
    }

    const prevStream = formatContext.streams.find((stream) => {
      return stream.index === currentChunk.streamIndex
    })
    const prevMovStreamContext = prevStream.privData as MOVStreamContext
    prevMovStreamContext.chunkCount++
    prevMovStreamContext.chunkOffsets.push(currentChunk.pos)
    if (!prevMovStreamContext.stscFirstChunk.length) {
      prevMovStreamContext.stscFirstChunk.push(prevMovStreamContext.chunkCount)
      prevMovStreamContext.stscSamplesPerChunk.push(currentChunk.sampleCount)
      prevMovStreamContext.stscSampleDescriptionIndex.push(1)
      prevMovStreamContext.lastStscCount = currentChunk.sampleCount
    }
    else {
      if (prevMovStreamContext.lastStscCount !== currentChunk.sampleCount) {
        prevMovStreamContext.stscFirstChunk.push(prevMovStreamContext.chunkCount)
        prevMovStreamContext.stscSamplesPerChunk.push(currentChunk.sampleCount)
        prevMovStreamContext.stscSampleDescriptionIndex.push(1)
        prevMovStreamContext.lastStscCount = currentChunk.sampleCount
      }
    }
  }

  private checkMdat(formatContext: AVOFormatContext, len: number) {
    const mdat = this.context.boxsPositionInfo[this.context.boxsPositionInfo.length - 1]

    if (mdat.type !== BoxType.MDAT) {
      logger.error('last box is not mdat')
      return
    }

    const pos = formatContext.ioWriter.getPos()

    const size = Number(pos - mdat.pos)

    if (size + len > UINT32_MAX) {
      mdat.size = size
      formatContext.ioWriter.writeUint32(0)
      formatContext.ioWriter.writeUint32(mktag(BoxType.MDAT))
      this.context.boxsPositionInfo.push({
        pos,
        type: BoxType.MDAT,
        size: 0
      })
    }
  }

  private updateCurrentFragment(formatContext: AVOFormatContext, currentDts?: int64) {
    if (this.context.currentFragment.firstWrote) {
      array.each(this.context.currentFragment.tracks, (track) => {

        const stream = formatContext.streams.find((stream) => {
          return stream.index === track.streamIndex
        })

        if (!track.sampleCount || !stream) {
          return  true
        }

        const streamContext = stream.privData as MOVStreamContext

        track.baseDataOffset = formatContext.ioWriter.getPos()

        if (!track.sampleDurations.length) {
          if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_AUDIO) {
            if (currentDts) {
              track.sampleDurations.push(Number(currentDts - streamContext.lastDts))
            }
            else if (stream.codecpar.frameSize > 0) {
              track.sampleDurations.push(Number(avRescaleQ(
                static_cast<int64>(stream.codecpar.frameSize / stream.codecpar.sampleRate * AV_TIME_BASE),
                AV_TIME_BASE_Q,
                stream.timeBase
              )))
            }
            else if (stream.codecpar.codecId === AVCodecID.AV_CODEC_ID_AAC) {
              track.sampleDurations.push(Number(avRescaleQ(
                static_cast<int64>(1024 / stream.codecpar.sampleRate * AV_TIME_BASE),
                AV_TIME_BASE_Q,
                stream.timeBase
              )))
            }
            else {
              // 随便猜一个？每帧一个 fragment 没有 sampleDuration QuickTime 无法播放
              track.sampleDurations.push(Number(avRescaleQ(
                static_cast<int64>(1024 / stream.codecpar.sampleRate * AV_TIME_BASE),
                AV_TIME_BASE_Q,
                stream.timeBase
              )))
            }
          }
          else if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO) {
            if (currentDts) {
              track.sampleDurations.push(Number(currentDts - streamContext.lastDts))
            }
            else if (avQ2D(stream.codecpar.framerate) > 0) {
              track.sampleDurations.push(Number(avRescaleQ(
                static_cast<int64>(1 / avQ2D(stream.codecpar.framerate) * AV_TIME_BASE),
                AV_TIME_BASE_Q,
                stream.timeBase
              )))
            }
            else {
              // 随便猜一个？每帧一个 fragment 没有 sampleDuration QuickTime 无法播放
              // 取帧率 30
              track.sampleDurations.push((stream.timeBase.den / (30 * stream.timeBase.num)) >>> 0)
            }
          }
          else {
            track.sampleDurations.push(0)
          }
        }
        else if (currentDts && track.sampleDurations.length === track.sampleSizes.length - 1) {
          track.sampleDurations.push(Number(currentDts - streamContext.lastDts))
        }

        streamContext.lastDuration = track.sampleDurations[track.sampleSizes.length - 1]

        if (track.sampleFlags.length === 1 || arrayItemSame(track.sampleFlags, 1)) {
          track.firstSampleFlags = track.sampleFlags[0]
          track.defaultSampleFlags = track.sampleFlags[1] ?? track.firstSampleFlags
          track.sampleFlags = []
        }
        if (track.sampleSizes.length === 1 || arrayItemSame(track.sampleSizes)) {
          track.defaultSampleSize = track.sampleSizes[0]
          track.sampleSizes = []
        }
        if (track.sampleDurations.length === 1 || arrayItemSame(track.sampleDurations)) {
          track.defaultSampleDuration = track.sampleDurations[0]
          track.sampleDurations = []
        }

        if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_AUDIO) {
          track.defaultSampleFlags = SampleFlags.DEPENDS_NO
        }
        else if (track.sampleFlags.length) {
          track.defaultSampleFlags = track.sampleFlags[0]
        }

        if (track.sampleSizes.length) {
          track.defaultSampleSize = track.sampleSizes[0]
        }

        if (track.sampleDurations.length) {
          track.defaultSampleDuration = track.sampleDurations[0]
        }
      })

      formatContext.ioWriter.flush()
      omov.writeMoof(formatContext.ioWriter, formatContext, this.context)

      let dataOffset = this.context.currentFragment.size + 8
      const buffers = []
      let mdatSize = 8
      array.each(this.context.currentFragment.tracks, (track) => {
        if (!track.sampleCount) {
          return  true
        }

        track.ioWriter.flush()
        const buffer = concatTypeArray(Uint8Array, track.buffers)
        track.dataOffset = dataOffset
        dataOffset += buffer.length
        mdatSize += buffer.length
        buffers.push(buffer)
        rewriteIO(formatContext.ioWriter, track.dataOffsetPos, track.dataOffset, 'int32')

        track.buffers = []
        track.sampleFlags = []
        track.sampleSizes = []
        track.sampleDurations = []
        track.sampleCompositionTimeOffset = []
        track.sampleCount = 0
        track.firstSampleFlags = 0
      })

      formatContext.ioWriter.writeUint32(mdatSize)
      formatContext.ioWriter.writeUint32(mktag(BoxType.MDAT))
      array.each(buffers, (buffer) => {
        formatContext.ioWriter.writeBuffer(buffer)
      })

      updatePositionSize(formatContext.ioWriter, this.context)

      formatContext.ioWriter.flush()

      this.context.currentFragment.firstWrote = false
      this.context.currentFragment.sequence++
    }
  }

  public writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number {

    if (!avpacket.size) {
      logger.warn(`packet\'s size is 0: ${avpacket.streamIndex}, ignore it`)
      return 0
    }

    const stream = formatContext.streams.find((stream) => {
      return stream.index === avpacket.streamIndex
    })

    if (!stream) {
      logger.warn(`can not found the stream width the avpacket\'s streamIndex: ${avpacket.streamIndex}, ignore it`)
      return
    }

    const streamContext = stream.privData as MOVStreamContext

    const dts = avRescaleQ(avpacket.dts, avpacket.timeBase, stream.timeBase)
    const pts = avRescaleQ(avpacket.pts < 0n ? avpacket.dts : avpacket.pts, avpacket.timeBase, stream.timeBase)

    if ((stream.codecpar.codecId === AVCodecID.AV_CODEC_ID_H264
        || stream.codecpar.codecId === AVCodecID.AV_CODEC_ID_MPEG4
        || stream.codecpar.codecId === AVCodecID.AV_CODEC_ID_HEVC
    )
      && avpacket.bitFormat !== BitFormat.AVCC
    ) {
      this.annexb2AvccFilter.sendAVPacket(avpacket)
      this.annexb2AvccFilter.receiveAVPacket(avpacket)
    }

    if (this.context.fragment) {
      const track = this.context.currentFragment.tracks.find((track) => {
        return track.streamIndex === avpacket.streamIndex
      })

      if (track) {
        if (this.options.fragmentMode === FragmentMode.GOP
          && stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO
          && avpacket.flags & AVPacketFlags.AV_PKT_FLAG_KEY
          || this.options.fragmentMode === FragmentMode.FRAME
        ) {
          if (this.context.currentFragment.tracks.length === 1) {
            this.updateCurrentFragment(formatContext, dts)
          }
          else {
            this.updateCurrentFragment(formatContext)
          }
        }

        track.ioWriter.writeBuffer(getAVPacketData(avpacket))

        if (!track.sampleSizes.length) {
          track.baseMediaDecodeTime = dts
        }

        if (track.sampleSizes.length
          && (!track.sampleDurations[track.sampleSizes.length - 1]
            || track.sampleDurations[track.sampleSizes.length - 1] <= 0
          )
        ) {
          track.sampleDurations[track.sampleSizes.length - 1] = Number(dts - streamContext.lastDts)
        }
        if (avpacket.duration > 0) {
          track.sampleDurations.push(Number(avRescaleQ(
            avpacket.duration,
            avpacket.timeBase,
            stream.timeBase
          )))
        }
        track.sampleSizes.push(avpacket.size)

        if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO) {
          let flag = 0
          if (avpacket.flags & AVPacketFlags.AV_PKT_FLAG_KEY) {
            flag |= SampleFlags.DEPENDS_NO
          }
          else {
            flag |= (SampleFlags.DEPENDS_YES | SampleFlags.IS_NON_SYN)
          }
          track.sampleCompositionTimeOffset.push(Number((pts || dts) - dts))

          track.sampleFlags.push(flag)
        }

        track.sampleCount++
        streamContext.lastPts = pts > streamContext.lastPts ? pts : streamContext.lastPts
        streamContext.lastDts = dts
        this.context.currentFragment.firstWrote = true
      }
      else {
        logger.warn(`can not found track width streamIndex ${avpacket.streamIndex}, ignore it`)
      }
    }
    else {

      this.checkMdat(formatContext, avpacket.size)

      const pos = formatContext.ioWriter.getPos()

      let currentChunk = this.context.currentChunk

      if (!currentChunk) {
        currentChunk = this.context.currentChunk = {
          pos,
          streamIndex: avpacket.streamIndex,
          sampleCount: 1
        }
      }
      else if (currentChunk.streamIndex !== avpacket.streamIndex) {
        this.updateCurrentChunk(formatContext)
        currentChunk.streamIndex = avpacket.streamIndex
        currentChunk.sampleCount = 1
        currentChunk.pos = pos
      }
      else {
        currentChunk.sampleCount++
      }

      formatContext.ioWriter.writeBuffer(getAVPacketData(avpacket))
      streamContext.sampleSizes.push(avpacket.size)

      if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO
        && avpacket.flags & AVPacketFlags.AV_PKT_FLAG_KEY
      ) {
        streamContext.stssSampleNumbers.push(streamContext.sampleSizes.length)
      }

      if (!streamContext.firstWrote) {
        streamContext.startDts = dts
        streamContext.startCT = Number((pts || dts) - dts)
        streamContext.firstWrote = true
      }
      else {
        const deltas = Number(dts - streamContext.lastDts)
        if (!streamContext.sttsSampleCounts.length) {
          streamContext.sttsSampleCounts.push(1)
          streamContext.sttsSampleDeltas.push(deltas)
        }
        else {
          if (streamContext.sttsSampleDeltas[streamContext.sttsSampleDeltas.length - 1] === deltas) {
            streamContext.sttsSampleCounts[streamContext.sttsSampleCounts.length - 1]++
          }
          else {
            streamContext.sttsSampleCounts.push(1)
            streamContext.sttsSampleDeltas.push(deltas)
          }
        }
      }

      if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO) {
        const ctts = Number((pts || dts) - dts)
        if (!streamContext.cttsSampleCounts.length) {
          streamContext.cttsSampleCounts.push(1)
          streamContext.cttsSampleOffsets.push(ctts)
        }
        else {
          if (streamContext.cttsSampleOffsets[streamContext.cttsSampleOffsets.length - 1]
            === ctts
          ) {
            streamContext.cttsSampleCounts[streamContext.cttsSampleCounts.length - 1]++
          }
          else {
            streamContext.cttsSampleCounts.push(1)
            streamContext.cttsSampleOffsets.push(ctts)
          }
        }
      }

      streamContext.lastPts = (pts || dts) > streamContext.lastPts ? (pts || dts) : streamContext.lastPts
      streamContext.lastDts = dts
    }

    return 0
  }

  public writeTrailer(formatContext: AVOFormatContext): number {
    if (!this.context.fragment) {
      this.updateCurrentChunk(formatContext)

      let lastPts = 0n
      let timeBase: Rational

      array.each(formatContext.streams, (stream) => {
        const streamContext = stream.privData as MOVStreamContext
        if (streamContext.sampleSizes.length) {
          if (streamContext.sttsSampleDeltas.length) {
            streamContext.sttsSampleCounts[streamContext.sttsSampleCounts.length - 1]++
          }
          else {
            streamContext.sttsSampleCounts = [1]
            streamContext.sttsSampleDeltas = [0]
          }
        }
        if (streamContext.lastPts > lastPts) {
          lastPts = streamContext.lastPts
          timeBase = stream.timeBase
        }
      })

      this.context.duration = avRescaleQ(lastPts, timeBase, { den: 1000, num: 1 })

      const mdat = this.context.boxsPositionInfo[this.context.boxsPositionInfo.length - 1]

      if (mdat.type !== BoxType.MDAT) {
        logger.error('last box is not mdat')
      }

      mdat.size = Number(formatContext.ioWriter.getPos() - mdat.pos)

      updatePositionSize(formatContext.ioWriter, this.context)

      if (this.options.fastOpen) {
        formatContext.ioWriter.flush()

        let buffers = []
        const rawFlush = formatContext.ioWriter.onFlush

        formatContext.ioWriter.onFlush = (buffer) => {
          buffers.push(buffer.slice())
          return 0
        }

        omov.writeMoov(formatContext.ioWriter, formatContext, this.context)
        formatContext.ioWriter.flush()

        let data = concatTypeArray(Uint8Array, buffers)

        array.each(formatContext.streams, (stream) => {
          const streamContext = stream.privData as MOVStreamContext
          if (streamContext.chunkOffsets.length) {
            for (let i = 0; i < streamContext.chunkOffsets.length; i++) {
              streamContext.chunkOffsets[i] += static_cast<int64>(data.length)
            }
          }
        })

        buffers = []

        omov.writeMoov(formatContext.ioWriter, formatContext, this.context)
        formatContext.ioWriter.flush()

        data = concatTypeArray(Uint8Array, buffers)

        if (rawFlush) {
          rawFlush(data, this.context.holdMoovPos)
        }

        formatContext.ioWriter.onFlush = rawFlush
      }
      else {
        omov.writeMoov(formatContext.ioWriter, formatContext, this.context)
        formatContext.ioWriter.flush()
      }
    }
    else {
      array.each(this.context.currentFragment.tracks, (track) => {
        const stream = formatContext.streams.find((stream) => {
          return stream.index === track.streamIndex
        })
        const streamContext = stream.privData as MOVStreamContext
        if (track.sampleCount) {
          if (track.sampleDurations.length) {
            track.sampleDurations.push(track.sampleDurations[track.sampleDurations.length - 1])
          }
          else {
            track.sampleDurations = [streamContext.lastDuration]
          }
        }
      })
      this.updateCurrentFragment(formatContext)

      formatContext.ioWriter.writeUint32(8)
      formatContext.ioWriter.writeString(BoxType.MFRA)

      formatContext.ioWriter.flush()
    }

    return 0
  }

  public flush(formatContext: AVOFormatContext): number {
    if (this.options.fragment) {
      array.each(this.context.currentFragment.tracks, (track) => {
        const stream = formatContext.streams.find((stream) => {
          return stream.index === track.streamIndex
        })
        const streamContext = stream.privData as MOVStreamContext
        if (track.sampleCount) {
          if (track.sampleDurations.length) {
            track.sampleDurations.push(track.sampleDurations[track.sampleDurations.length - 1])
          }
          else {
            track.sampleDurations = [streamContext.lastDuration]
          }
        }
      })
      this.updateCurrentFragment(formatContext)
    }
    formatContext.ioWriter.flush()
    return 0
  }
}