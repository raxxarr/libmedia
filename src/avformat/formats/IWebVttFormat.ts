/*
 * libmedia vtt decoder
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

import AVStream from '../AVStream'
import { AVIFormatContext } from '../AVFormatContext'
import AVPacket from 'avutil/struct/avpacket'
import { AVCodecID, AVMediaType, AVPacketSideDataType } from 'avutil/codec'
import * as logger from 'common/util/logger'
import * as errorType from 'avutil/error'
import IFormat from './IFormat'
import { AVFormat, AVSeekFlags } from '../avformat'
import { memcpyFromUint8Array } from 'cheap/std/memory'
import { avMalloc } from 'avutil/util/mem'
import { addAVPacketData, addAVPacketSideData } from 'avutil/util/avpacket'
import { IOError } from 'common/io/error'
import * as array from 'common/util/array'
import * as text from 'common/util/text'


function formatTime(time: string) {
  time = time.trim()
  let list = time.split(':')

  let ts = 0n

  if (list.length === 3) {
    ts += BigInt(+(list.shift().trim())) * 3600000n
  }
  ts += BigInt(+(list.shift().trim())) * 60000n

  list = list.shift().trim().split('.')
  ts += BigInt(+(list.shift().trim())) * 1000n
  ts += BigInt(+(list.shift().trim()))

  return ts
}

export default class IWebVttFormat extends IFormat {

  public type: AVFormat = AVFormat.WEBVTT

  private queue: {
    identifier?: string
    options?: string
    startTs: int64
    endTs: int64
    context: string
    pos: int64
  }[]
  private index: int32

  constructor() {
    super()
  }

  public init(formatContext: AVIFormatContext): void {
    this.queue = []
  }

  private async readChunk(formatContext: AVIFormatContext) {
    let chunk = ''
    const pos = formatContext.ioReader.getPos()
    while (true) {
      const line = await formatContext.ioReader.readLine()
      if (line === '') {
        break
      }
      chunk += line
    }
    return { chunk, pos}
  }

  public async readHeader(formatContext: AVIFormatContext): Promise<number> {

    const bom = await formatContext.ioReader.peekBuffer(3)

    if (bom[0] === 0xef && bom[1] === 0xbb && bom[2] === 0xbf) {
      await formatContext.ioReader.skip(3)
    }

    const signature = await formatContext.ioReader.peekString(6)
    if (signature !== 'WEBVTT') {
      logger.error('the file format is not vtt')
      return errorType.DATA_INVALID
    }

    const stream = formatContext.createStream()
    stream.codecpar.codecId = AVCodecID.AV_CODEC_ID_WEBVTT
    stream.codecpar.codecType = AVMediaType.AVMEDIA_TYPE_SUBTITLE
    stream.timeBase.den = 1000
    stream.timeBase.num = 1

    const header = await formatContext.ioReader.readLine()
    if (header.indexOf('-') > 0) {
      stream.metadata['title'] = header.split('-').pop().trim()
    }

    this.index = 0

    try {
      while (true) {
        const { chunk, pos } = await this.readChunk(formatContext)

        if (chunk === '' || /^NOTE/.test(chunk) || /^STYLE/.test(chunk)) {
          continue
        }

        const lines = chunk.split(/\r?\n|\r/)

        let identifier: string
        let options: string

        // identifier
        if (lines[0].indexOf('-->') === -1) {
          identifier = lines.shift().trim()
        }

        let times = lines.shift().split('-->')
        const startTs = formatTime(times.shift())

        times = times.shift().trim().split(' ')

        const endTs = formatTime(times.shift())

        if (endTs <= startTs) {
          continue
        }

        times = times.filter((t) => t !== '')

        if (times.length) {
          options = times.join(' ')
        }

        const context = lines.join('\n').trim()

        if (!context) {
          continue
        }

        this.queue.push({
          identifier,
          options,
          context,
          startTs,
          endTs,
          pos
        })
      }
    }
    catch (error) {
      return 0
    }

  }

  public async readAVPacket(formatContext: AVIFormatContext, avpacket: pointer<AVPacket>): Promise<number> {

    if (!this.queue.length) {
      return errorType.DATA_INVALID
    }
    if (this.index >= this.queue.length) {
      return IOError.END
    }

    const stream = formatContext.streams.find((stream) => {
      return stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_SUBTITLE
    })

    const cue = this.queue[this.index++]

    avpacket.streamIndex = stream.index
    avpacket.timeBase.den = stream.timeBase.den
    avpacket.timeBase.num = stream.timeBase.num

    avpacket.dts = avpacket.pts = cue.startTs
    avpacket.duration = cue.endTs - cue.startTs

    if (cue.identifier) {
      const buffer = text.encode(cue.identifier)
      const data = avMalloc(buffer.length)
      memcpyFromUint8Array(data, buffer.length, buffer)
      addAVPacketSideData(avpacket, AVPacketSideDataType.AV_PKT_DATA_WEBVTT_IDENTIFIER, data, buffer.length)
    }
    if (cue.options) {
      const buffer = text.encode(cue.options)
      const data = avMalloc(buffer.length)
      memcpyFromUint8Array(data, buffer.length, buffer)
      addAVPacketSideData(avpacket, AVPacketSideDataType.AV_PKT_DATA_WEBVTT_SETTINGS, data, buffer.length)
    }
    const buffer = text.encode(cue.context)
    const data = avMalloc(buffer.length)
    memcpyFromUint8Array(data, buffer.length, buffer)
    addAVPacketData(avpacket, data, buffer.length)
  }

  public async seek(formatContext: AVIFormatContext, stream: AVStream, timestamp: int64, flags: int32): Promise<int64> {
    if (flags & AVSeekFlags.BYTE) {
      return static_cast<int64>(errorType.FORMAT_NOT_SUPPORT)
    }
    const index = array.binarySearch(this.queue, (item) => {
      if (item.startTs > timestamp) {
        return -1
      }
      return 1
    })
    if (index > 0) {
      logger.debug(`seek in cues, found index: ${index}, pts: ${this.queue[index].startTs}, pos: ${this.queue[index].pos}`)
      this.index = index
      return 0n
    }
    return static_cast<int64>(errorType.DATA_INVALID)
  }

  public getAnalyzeStreamsCount(): number {
    return 1
  }
}
