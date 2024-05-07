/*
 * libmedia matroska encoder
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

import { AVOFormatContext } from '../AVformatContext'
import AVPacket, { AVPacketFlags } from 'avutil/struct/avpacket'
import OFormat from './OFormat'
import { AVCodecID, AVMediaType } from 'avutil/codec'
import { AVFormat } from '../avformat'
import * as logger from 'common/util/logger'
import { avRescaleQ } from 'avutil/util/rational'
import { getAVPacketData } from 'avutil/util/avpacket'
import * as object from 'common/util/object'
import { OMatroskaContext, TrackEntry } from './matroska/type'
import IOWriterSync from 'common/io/IOWriterSync'
import * as omatroska from './matroska/omatroska'
import { EBMLId, MATROSKATrackType, MkvTag2CodecId, WebmTag2CodecId } from './matroska/matroska'
import * as crypto from 'avutil/util/crypto'
import AVCodecParameters from 'avutil/struct/avcodecparameters'
import { mapUint8Array } from 'cheap/std/memory'
import { chromaLocation2Pos } from 'avutil/pixelFormatDescriptor'
import { AV_MILLI_TIME_BASE_Q } from 'avutil/constant'
import * as string from 'common/util/string'
import AVStream from '../AVStream'
import concatTypeArray from 'common/function/concatTypeArray'

export interface OMatroskaFormatOptions {
  isLive?: boolean
  docType?: string
}

const defaultOMatroskaFormatOptions: OMatroskaFormatOptions = {
  isLive: false,
  docType: 'matroska'
}

function formatTimestamp(milliseconds: int64) {
  const hours = milliseconds / BigInt(1000 * 60 * 60)
  const remainingMilliseconds = milliseconds % BigInt(1000 * 60 * 60)

  const minutes = remainingMilliseconds / BigInt(1000 * 60)
  const remainingMillisecondsAfterMinutes = remainingMilliseconds % BigInt(1000 * 60)

  const seconds = remainingMillisecondsAfterMinutes / 1000n

  const ms = remainingMillisecondsAfterMinutes % 1000n

  return string.format(
    '%02d:%02d:%02d.%03d000000\x00\x00',
    static_cast<int32>(hours),
    static_cast<int32>(minutes),
    static_cast<int32>(seconds),
    static_cast<int32>(ms)
  )
}

export default class OMatroskaFormat extends OFormat {

  public type: AVFormat = AVFormat.MATROSKA

  private options: OMatroskaFormatOptions

  private context: OMatroskaContext

  private random: Uint8Array
  private randomView: DataView

  constructor(options: OMatroskaFormatOptions = {}) {
    super()
    this.options = object.extend({}, defaultOMatroskaFormatOptions, options)

    this.random = new Uint8Array(8)
    this.randomView = new DataView(this.random.buffer)
  }

  public init(formatContext: AVOFormatContext): number {
    formatContext.ioWriter.setEndian(false)

    const context: OMatroskaContext = {
      isLive: this.options.isLive,
      segmentStart: -1n,
      seekHeadEnd: -1n,
      header: {
        version: 1,
        readVersion: 1,
        maxIdLength: 4,
        maxSizeLength: 8,
        docType: this.options.docType,
        docTypeVersion: 4,
        docTypeReadVersion: 2
      },
      seekHead: {
        entry: []
      },
      info: {
        muxingApp: defined(VERSION),
        writingApp: defined(VERSION),
        timestampScale: 1000000,
        duration: 0,
        segmentUUID: -1n
      },
      tracks: {
        entry: []
      },
      attachments: {
        entry: []
      },
      chapters: {
        entry: []
      },
      cues: {
        entry: []
      },
      tags: {
        entry: [
          {
            tag: {
              name: 'ENCODER',
              string: defined(VERSION)
            }
          }
        ]
      },

      elePositionInfos: [],
      eleCaches: [],
      eleWriter: new IOWriterSync(),
      currentCluster: {
        timeCode: -1n,
        pos: -1n
      },
      hasVideo: false
    }

    if (context.header.docType === 'webm') {
      context.header.docTypeVersion = 2
      context.header.docTypeReadVersion = 2
    }

    context.eleWriter.onFlush = (data) => {
      context.eleCaches.push(data.slice())
      return 0
    }

    crypto.random(this.random)
    context.info.segmentUUID = this.randomView.getBigUint64(0)

    formatContext.privateData = this.context = context

    const tag2CodecId = this.context.header.docType === 'webm' ? WebmTag2CodecId : MkvTag2CodecId

    function codecId2Tag(codecpar: AVCodecParameters) {
      let tag = ''
      object.each(tag2CodecId, (id, t) => {
        if (id === codecpar.codecId) {
          tag = t
        }
      })
      if (codecpar.codecId === AVCodecID.AV_CODEC_ID_PCM_F64LE
        || codecpar.codecId === AVCodecID.AV_CODEC_ID_PCM_F32LE
      ) {
        tag = 'A_PCM/FLOAT/IEEE'
      }
      if (codecpar.codecId === AVCodecID.AV_CODEC_ID_PCM_S16BE
        || codecpar.codecId === AVCodecID.AV_CODEC_ID_PCM_S24BE
        || codecpar.codecId === AVCodecID.AV_CODEC_ID_PCM_S32BE
      ) {
        tag = 'A_PCM/INT/BIG'
      }
      if (codecpar.codecId === AVCodecID.AV_CODEC_ID_PCM_U8
        || codecpar.codecId === AVCodecID.AV_CODEC_ID_PCM_S16LE
        || codecpar.codecId === AVCodecID.AV_CODEC_ID_PCM_S24LE
        || codecpar.codecId === AVCodecID.AV_CODEC_ID_PCM_S32LE
      ) {
        tag = 'A_PCM/INT/LIT'
      }
      return tag
    }

    formatContext.streams.forEach((stream) => {
      if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_ATTACHMENT) {
        crypto.random(this.random)
        context.attachments.entry.push({
          uid: this.randomView.getBigUint64(0),
          name: stream.metadata['name'] || 'unknown',
          mime: stream.metadata['mime'] || 'unknown',
          data: {
            data: mapUint8Array(stream.codecpar.extradata, stream.codecpar.extradataSize),
            size: static_cast<int64>(stream.codecpar.extradataSize),
            pos: -1n
          },
          description: stream.metadata['description'] || 'unknown'
        })
      }
      else {
        const track: TrackEntry = {}
        crypto.random(this.random)
        track.uid = this.randomView.getBigUint64(0)
        track.codecId = codecId2Tag(stream.codecpar)
        track.number = stream.index + 1
        if (stream.codecpar.extradata) {
          track.codecPrivate = {
            data: mapUint8Array(stream.codecpar.extradata, stream.codecpar.extradataSize),
            pos: -1n,
            size: static_cast<int64>(stream.codecpar.extradataSize)
          }
        }
        track.language = stream.metadata['language'] || 'und'

        switch (stream.codecpar.codecType) {
          case AVMediaType.AVMEDIA_TYPE_AUDIO: {
            track.type = MATROSKATrackType.AUDIO
            track.audio = {
              channels: stream.codecpar.chLayout.nbChannels,
              sampleRate: reinterpret_cast<float>(stream.codecpar.sampleRate),
              bitDepth: stream.codecpar.bitsPerRawSample
            }
            break
          }
          case AVMediaType.AVMEDIA_TYPE_VIDEO: {
            context.hasVideo = true
            track.type = MATROSKATrackType.VIDEO
            track.video = {
              pixelWidth: stream.codecpar.width,
              pixelHeight: stream.codecpar.height,
              color: {
                matrixCoefficients: stream.codecpar.colorSpace,
                primaries: stream.codecpar.colorPrimaries,
                transferCharacteristics: stream.codecpar.colorTrc,
                range: stream.codecpar.colorRange
              }
            }
            const result = chromaLocation2Pos(stream.codecpar.chromaLocation)
            if (result) {
              track.video.color.chromaSitingVert = (result.x >>> 7) + 1
              track.video.color.chromaSitingHorz = (result.y >>> 7) + 1
            }
            break
          }
          case AVMediaType.AVMEDIA_TYPE_SUBTITLE: {
            track.type = MATROSKATrackType.SUBTITLE
            break
          }
        }

        stream.privData = track

        context.tracks.entry.push(track)
      }
    })

    return 0
  }

  public writeHeader(formatContext: AVOFormatContext): number {
    omatroska.writeHeader(formatContext.ioWriter, this.context, this.context.header)

    omatroska.writeEbmlId(formatContext.ioWriter, EBMLId.SEGMENT)

    const now = formatContext.ioWriter.getPos()
    omatroska.writeEbmlLengthUnknown(formatContext.ioWriter, 8)
    this.context.elePositionInfos.push({
      pos: now,
      length: 0,
      bytes: 8
    })

    this.context.segmentStart = formatContext.ioWriter.getPos()
    // SeekHead 占位
    formatContext.ioWriter.skip(96)
    this.context.seekHeadEnd = formatContext.ioWriter.getPos()

    return 0
  }

  private writeBlock(stream: AVStream, avpacket: pointer<AVPacket>) {
    const track = stream.privData as TrackEntry
    omatroska.writeEbmlId(this.context.eleWriter, EBMLId.SIMPLE_BLOCK)
    omatroska.writeEbmlLength(this.context.eleWriter, omatroska.ebmlLengthSize(track.number) + 2 + 1 + avpacket.size)
    omatroska.writeEbmlNum(this.context.eleWriter, track.number, omatroska.ebmlLengthSize(track.number))
    const pts = avRescaleQ(avpacket.pts, stream.timeBase, AV_MILLI_TIME_BASE_Q)

    this.context.eleWriter.writeInt16(static_cast<int32>(pts - this.context.currentCluster.timeCode))

    if (avpacket.flags & AVPacketFlags.AV_PKT_FLAG_KEY || stream.codecpar.codecType !== AVMediaType.AVMEDIA_TYPE_VIDEO) {
      this.context.eleWriter.writeUint8(0x80)
    }
    else {
      this.context.eleWriter.writeUint8(0x00)
    }
    this.context.eleWriter.writeBuffer(getAVPacketData(avpacket))
  }

  private writeCluster(formatContext: AVOFormatContext) {
    if (this.context.currentCluster.pos === -1n) {
      return
    }

    formatContext.ioWriter.flush()
    this.context.eleWriter.flush()

    let block = concatTypeArray(Uint8Array, this.context.eleCaches)

    if (!block.length) {
      return
    }

    this.context.eleCaches.length = 0
    omatroska.writeEbmlUint(this.context.eleWriter, EBMLId.CLUSTER_TIME_CODE, this.context.currentCluster.timeCode)
    this.context.eleWriter.flush()
    block = concatTypeArray(Uint8Array, [...this.context.eleCaches, block])


    omatroska.writeEbmlId(formatContext.ioWriter, EBMLId.CLUSTER)
    omatroska.writeEbmlLength(formatContext.ioWriter, block.length)
    formatContext.ioWriter.writeBuffer(block)

    formatContext.ioWriter.flush()
    this.context.eleCaches.length = 0
  }

  public writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number {

    if (!avpacket.size) {
      logger.warn(`packet\'s size is 0: ${avpacket.streamIndex}, ignore it`)
      return 0
    }

    const stream = formatContext.getStreamByIndex(avpacket.streamIndex)

    if (!stream) {
      logger.warn(`can not found the stream width the avpacket\'s streamIndex: ${avpacket.streamIndex}, ignore it`)
      return
    }

    const track = stream.privData as TrackEntry

    if (!track.maxPts || track.maxPts < avpacket.pts) {
      track.maxPts = avpacket.pts
    }

    if (this.options.isLive
      || (avpacket.flags & AVPacketFlags.AV_PKT_FLAG_KEY)
        && (
          stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO
          || !this.context.hasVideo
            && (avRescaleQ(avpacket.pts, stream.timeBase, AV_MILLI_TIME_BASE_Q) - this.context.currentCluster.timeCode > 5000n)
        )
    ) {
      this.writeCluster(formatContext)
      this.context.currentCluster.timeCode = avRescaleQ(avpacket.pts, stream.timeBase, AV_MILLI_TIME_BASE_Q)
      this.context.currentCluster.pos = formatContext.ioWriter.getPos() - this.context.segmentStart
      this.context.cues.entry.push({
        time: this.context.currentCluster.timeCode,
        pos: [{
          pos: this.context.currentCluster.pos,
          track: track.number
        }]
      })
    }

    this.writeBlock(stream, avpacket)

    return 0
  }

  public writeTrailer(formatContext: AVOFormatContext): number {

    this.writeCluster(formatContext)

    formatContext.streams.forEach((stream) => {
      const track = stream.privData as TrackEntry

      if (!this.options.isLive) {
        const duration = avRescaleQ(track.maxPts, stream.timeBase, AV_MILLI_TIME_BASE_Q)
        if (duration > this.context.info.duration) {
          this.context.info.duration = reinterpret_cast<float>(static_cast<int32>(duration))
        }
        this.context.tags.entry.push({
          tag: {
            name: 'DURATION',
            string: formatTimestamp(duration)
          },
          target: {
            trackUid: track.uid
          }
        })
      }
    })

    formatContext.ioWriter.flush()
    this.context.eleWriter.flush()
    this.context.eleCaches.length = 0

    this.context.eleWriter.reset()

    const now = formatContext.ioWriter.getPos()
    let segmentLength = now - this.context.segmentStart

    this.context.seekHead.entry.push({
      id: EBMLId.INFO,
      pos: this.context.eleWriter.getPos() + this.context.seekHeadEnd - this.context.segmentStart
    })
    omatroska.writeInfo(this.context.eleWriter, this.context, this.context.info)
    this.context.seekHead.entry.push({
      id: EBMLId.TRACKS,
      pos: this.context.eleWriter.getPos() + this.context.seekHeadEnd - this.context.segmentStart
    })
    omatroska.writeTracks(this.context.eleWriter, this.context, this.context.tracks)
    this.context.seekHead.entry.push({
      id: EBMLId.TAGS,
      pos: this.context.eleWriter.getPos() + this.context.seekHeadEnd - this.context.segmentStart
    })
    omatroska.writeTags(this.context.eleWriter, this.context, this.context.tags)
    this.context.eleWriter.flush()

    const buffer = concatTypeArray(Uint8Array, this.context.eleCaches)
    formatContext.ioWriter.onFlush(buffer, this.context.seekHeadEnd)

    segmentLength += static_cast<int64>(buffer.length)

    this.context.cues.entry.forEach((cue) => {
      cue.pos.forEach((item) => {
        item.pos += static_cast<int64>(buffer.length)
      })
    })

    if (this.context.cues.entry.length) {
      this.context.seekHead.entry.push({
        id: EBMLId.CUES,
        pos: formatContext.ioWriter.getPos() - this.context.segmentStart + static_cast<int64>(buffer.length)
      })
      omatroska.writeCues(formatContext.ioWriter, this.context, this.context.cues)
    }
    if (this.context.attachments.entry.length) {
      this.context.seekHead.entry.push({
        id: EBMLId.ATTACHMENTS,
        pos: formatContext.ioWriter.getPos() - this.context.segmentStart + static_cast<int64>(buffer.length)
      })
      omatroska.writeAttachments(formatContext.ioWriter, this.context, this.context.attachments)
    }

    formatContext.ioWriter.flush()
    segmentLength += formatContext.ioWriter.getPos() - now

    formatContext.ioWriter.seek(this.context.segmentStart)
    omatroska.writeSeekHeader(formatContext.ioWriter, this.context, this.context.seekHead)
    const seekHeadLen = formatContext.ioWriter.getPos() - this.context.segmentStart
    omatroska.writeEbmlId(formatContext.ioWriter, EBMLId.VOID)
    omatroska.writeEbmlLength(formatContext.ioWriter, this.context.seekHeadEnd - this.context.segmentStart - seekHeadLen - 2n, 1)
    formatContext.ioWriter.flush()

    this.context.elePositionInfos[0].length = segmentLength
    omatroska.updatePositionSize(formatContext.ioWriter, this.context)

    return 0
  }

  public flush(formatContext: AVOFormatContext): number {
    this.writeCluster(formatContext)
    this.context.currentCluster.timeCode = -1n
    this.context.currentCluster.pos = -1n
    return 0
  }

}