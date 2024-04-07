/*
 * libmedia mux util
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

import AVPacket from 'avutil/struct/avpacket'
import { AVOFormatContext } from './AVformatContext'
import * as object from 'common/util/object'
import * as logger from 'common/util/logger'

export type MuxOptions = {
  paddingZero?: boolean
}

interface MuxPrivateData {
  first: Map<number, bigint>
}

const defaultMuxOptions: MuxOptions = {
  paddingZero: false
}

export function open(formatContext: AVOFormatContext, options: MuxOptions = {}) {
  const opts = object.extend({}, defaultMuxOptions, options)
  if (!formatContext.ioWriter) {
    logger.fatal('need ioWriter')
  }
  if (!formatContext.oformat) {
    logger.fatal('need oformat')
  }
  formatContext.options = opts

  formatContext.privateData = {
    first: new Map()
  }

  return formatContext.oformat.init(formatContext)
}

export function writeHeader(formatContext: AVOFormatContext): void {
  formatContext.oformat.writeHeader(formatContext)
}

export function writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number {
  const privateData = formatContext.privateData as MuxPrivateData
  if (!privateData.first.has(avpacket.streamIndex)) {
    if (avpacket.dts > 0n) {
      privateData.first.set(avpacket.streamIndex, avpacket.dts)
    }
    else {
      privateData.first.set(avpacket.streamIndex, 0n)
    }
  }
  if ((formatContext.options as MuxOptions).paddingZero) {
    avpacket.dts -= privateData.first.get(avpacket.streamIndex)
    avpacket.pts -= privateData.first.get(avpacket.streamIndex)
  }

  return formatContext.oformat.writeAVPacket(formatContext, avpacket)
}

export function writeTrailer(formatContext: AVOFormatContext): void {
  formatContext.oformat.writeTrailer(formatContext)
}

export function flush(formatContext: AVOFormatContext) {
  formatContext.oformat.flush(formatContext)
}