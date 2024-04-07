/*
 * libmedia Annexb2AvccFilter
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

import AVPacket, { AVPacketFlags } from 'avutil/struct/avpacket'
import AVBSFilter from '../AVBSFilter'
import AVCodecParameters from 'avutil/struct/avcodecparameters'
import { Rational } from 'avutil/struct/rational'
import { addAVPacketData, addAVPacketSideData, copyAVPacketProps, createAVPacket,
  destroyAVPacket, refAVPacket, unrefAVPacket
} from 'avutil/util/avpacket'

import * as h264 from '../../codecs/h264'
import * as hevc from '../../codecs/hevc'
import { mapSafeUint8Array, memcpyFromUint8Array } from 'cheap/std/memory'
import { AVCodecID, AVPacketSideDataType } from 'avutil/codec'
import * as errorType from 'avutil/error'
import { isAnnexb } from 'avutil/util/nalu'
import { avMalloc } from 'avutil/util/mem'
import * as logger from 'common/util/logger'

export default class Annexb2AvccFilter extends AVBSFilter {

  private cache: pointer<AVPacket>
  private cached: boolean

  public init(codecpar: pointer<AVCodecParameters>, timeBase: pointer<Rational>): number {
    super.init(codecpar, timeBase)
    this.cache = createAVPacket()
    this.cached = false

    return 0
  }

  public destroy(): void {
    super.destroy()
    destroyAVPacket(this.cache)
    this.cache = nullptr
  }

  public sendAVPacket(avpacket: pointer<AVPacket>): number {

    const buffer = mapSafeUint8Array(avpacket.data, avpacket.size)

    if (avpacket.bitFormat === h264.BitFormat.AVCC || !isAnnexb(buffer)) {
      refAVPacket(this.cache, avpacket)
    }
    else {

      copyAVPacketProps(this.cache, avpacket)

      let convert: {
        bufferPointer: pointer<uint8>,
        length: size,
        extradata: Uint8Array,
        key: boolean
      }

      if (this.inCodecpar.codecId === AVCodecID.AV_CODEC_ID_H264
        || this.inCodecpar.codecId === AVCodecID.AV_CODEC_ID_MPEG4
      ) {
        convert = h264.annexb2Avcc(buffer)
      }
      else if (this.inCodecpar.codecId === AVCodecID.AV_CODEC_ID_HEVC) {
        convert = hevc.annexb2Avcc(buffer)
      }
      else {
        logger.fatal(`not support for codecId: ${this.inCodecpar.codecId}`)
      }

      this.cache.bitFormat = h264.BitFormat.AVCC

      addAVPacketData(this.cache, convert.bufferPointer, convert.length)

      if (convert.key) {
        this.cache.flags |= AVPacketFlags.AV_PKT_FLAG_KEY
      }

      if (convert.extradata) {
        const extradata = avMalloc(convert.extradata.length)
        memcpyFromUint8Array(extradata, convert.extradata.length, convert.extradata)
        addAVPacketSideData(this.cache, AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA, extradata, convert.extradata.length)
      }
    }
    this.cached = true
    return 0
  }

  public receiveAVPacket(avpacket: pointer<AVPacket>): number {
    if (this.cached) {
      unrefAVPacket(avpacket)
      refAVPacket(avpacket, this.cache)
      this.cached = false
      return 0
    }
    else {
      return errorType.DATA_INVALID
    }
  }
}