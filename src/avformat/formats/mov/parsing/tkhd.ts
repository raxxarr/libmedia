/*
 * libmedia mp4 tkhd box parser
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

import IOReader from 'common/io/IOReader'
import Stream from '../../../AVStream'
import { Atom, MOVContext, MOVStreamContext } from '../type'
import * as logger from 'common/util/logger'

// @ts-ignore
@deasync
export default async function read(ioReader: IOReader, stream: Stream, atom: Atom, movContext: MOVContext) {
  const streamContext = stream.privData as MOVStreamContext

  const now = ioReader.getPos()

  const version = await ioReader.readUint8()
  // flags
  streamContext.flags = await ioReader.readUint24()

  if (version === 1) {
    stream.metadata['creationTime'] = await ioReader.readUint64()
    stream.metadata['modificationTime'] = await ioReader.readUint64()
    streamContext.trackId = await ioReader.readUint32()
    ioReader.skip(4)
    streamContext.duration = await ioReader.readUint64()
  }
  else {
    stream.metadata['creationTime'] = static_cast<int64>(await ioReader.readUint32())
    stream.metadata['modificationTime'] = static_cast<int64>(await ioReader.readUint32())
    streamContext.trackId = await ioReader.readUint32()
    ioReader.skip(4)
    streamContext.duration = static_cast<int64>(await ioReader.readUint32())
  }

  ioReader.skip(4 * 2)

  streamContext.layer = await ioReader.readInt16()
  streamContext.alternateGroup = await ioReader.readInt16()
  streamContext.volume = await ioReader.readInt16() >> 8

  ioReader.skip(2)

  streamContext.matrix = new Uint32Array(9)
  for (let i = 0; i < 9; i++) {
    streamContext.matrix[i] = await ioReader.readUint32()
  }
  streamContext.width = (await ioReader.readUint32()) >> 16
  streamContext.height = (await ioReader.readUint32()) >> 16

  const remainingLength = atom.size - Number(ioReader.getPos() - now)
  if (remainingLength > 0) {
    await ioReader.skip(remainingLength)
  }
  else if (remainingLength < 0) {
    logger.error(`read tkhd error, size: ${atom.size}, read: ${atom.size - remainingLength}`)
  }
}