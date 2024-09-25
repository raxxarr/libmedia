(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LibMux"] = factory();
	else
		root["LibMux"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/avformat/AVFormatContext.ts":
/*!*****************************************!*\
  !*** ./src/avformat/AVFormatContext.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVFormatContext: () => (/* binding */ AVFormatContext),
/* harmony export */   createAVOFormatContext: () => (/* binding */ createAVOFormatContext)
/* harmony export */ });
/* unused harmony export createAVIFormatContext */
/* harmony import */ var _AVStream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AVStream */ "./src/avformat/AVStream.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/*
 * libmedia AVFormatContext
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


class AVFormatContextInterval {
    packetBuffer;
    constructor() {
        this.packetBuffer = [];
    }
}
class AVFormatContext {
    metadataHeaderPadding = -1;
    metadata;
    streams;
    options;
    privateData;
    processPrivateData;
    iformat;
    oformat;
    // @ts-ignore
    ioReader;
    ioWriter;
    errorFlag;
    interval;
    streamIndex;
    getDecoderResource = null;
    constructor() {
        this.streams = [];
        this.errorFlag = 0;
        this.streamIndex = 0;
        this.interval = new AVFormatContextInterval();
        this.options = {};
        this.privateData = {};
        this.metadata = {};
    }
    get format() {
        if (this.iformat) {
            return this.iformat.type;
        }
        else if (this.oformat) {
            return this.oformat.type;
        }
        return -1 /* AVFormat.UNKNOWN */;
    }
    getStreamById(id) {
        return this.streams.find((stream) => stream.id === id);
    }
    getStreamByIndex(index) {
        return this.streams.find((stream) => stream.index === index);
    }
    getStreamByMediaType(mediaType) {
        return this.streams.find((stream) => stream.codecpar?.codecType === mediaType);
    }
    createStream() {
        const stream = new _AVStream__WEBPACK_IMPORTED_MODULE_0__["default"]();
        stream.index = this.streamIndex++;
        stream.id = stream.index;
        this.removeStreamByIndex(stream.index);
        this.streams.push(stream);
        return stream;
    }
    addStream(stream) {
        this.removeStreamByIndex(stream.index);
        this.streams.push(stream);
    }
    removeStream(stream) {
        this.removeStreamByIndex(stream.index);
    }
    removeStreamById(id) {
        const index = this.streams.findIndex((stream) => stream.id === id);
        if (index > -1) {
            const st = this.streams.splice(index, 1);
            if (st[0]) {
                st[0].destroy();
            }
        }
    }
    removeStreamByIndex(i) {
        const index = this.streams.findIndex((stream) => stream.index === i);
        if (index > -1) {
            const st = this.streams.splice(index, 1);
            if (st[0]) {
                st[0].destroy();
            }
        }
    }
    destroy() {
        if (this.oformat) {
            this.oformat.destroy(this);
        }
        if (this.iformat) {
            this.iformat.destroy(this);
        }
        if (this.interval.packetBuffer.length) {
            this.interval.packetBuffer.forEach((avpacket) => {
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_1__.destroyAVPacket)(avpacket);
            });
        }
        this.streams.forEach((stream) => {
            stream.destroy();
        });
        this.streams = [];
        this.interval = null;
        this.ioReader = this.ioWriter = null;
        this.oformat = this.iformat = null;
    }
}
/**
 * 创建 AVIFormatContext
 *
 * @returns
 */
function createAVIFormatContext() {
    return new AVFormatContext();
}
/**
 * 创建 AVOFormatContext
 *
 * @returns
 */
function createAVOFormatContext() {
    return new AVFormatContext();
}


/***/ }),

/***/ "./src/avformat/AVStream.ts":
/*!**********************************!*\
  !*** ./src/avformat/AVStream.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AVStream)
/* harmony export */ });
/* harmony import */ var cheap_std_make__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/make */ "./src/cheap/std/make.ts");
/* harmony import */ var cheap_std_unmake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/std/unmake */ "./src/cheap/std/unmake.ts");
/* harmony import */ var avutil_struct_avcodecparameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/struct/avcodecparameters */ "./src/avutil/struct/avcodecparameters.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_struct_rational__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/struct/rational */ "./src/avutil/struct/rational.ts");





/**
 * from FFmpeg
 *
 */
class AVStream {
    /**
     * stream index in AVFormatContext
     */
    index = avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE;
    /**
     * Format-specific stream ID.
     * decoding: set by libavformat
     * encoding: set by the user, replaced by libavformat if left unset
     */
    id = avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE;
    privData = null;
    codecpar = (0,cheap_std_make__WEBPACK_IMPORTED_MODULE_0__["default"])(avutil_struct_avcodecparameters__WEBPACK_IMPORTED_MODULE_2__["default"], new avutil_struct_avcodecparameters__WEBPACK_IMPORTED_MODULE_2__["default"]());
    /**
     * An array of side data that applies to the whole stream (i.e. the
     * container does not allow it to change between packets).
     *
     * There may be no overlap between the side data in this array and side data
     * in the packets. I.e. a given side data is either exported by the muxer
     * (demuxing) / set by the caller (muxing) in this array, then it never
     * appears in the packets, or the side data is exported / sent through
     * the packets (always in the first packet where the value becomes known or
     * changes), then it does not appear in this array.
     *
     * - demuxing: Set by libavformat when the stream is created.
     * - muxing: May be set by the caller before write_header().
     *
     */
    sideData = {};
    /**
     * number of frames in this stream if known or 0
     */
    nbFrames = BigInt(0);
    metadata = {};
    /**
     * Decoding: duration of the stream, in stream time base.
     * If a source file does not specify a duration, but does specify
     * a bitrate, this value will be estimated from bitrate and file size.
     *
     * Encoding: May be set by the caller before avformat_write_header() to
     * provide a hint to the muxer about the estimated duration.
     */
    duration = avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT;
    /**
     * Decoding: pts of the first frame of the stream in presentation order, in stream time base.
     * Only set this if you are absolutely 100% sure that the value you set
     * it to really is the pts of the first frame.
     * This may be undefined (AV_NOPTS_VALUE).
     * @note The ASF header does NOT contain a correct start_time the ASF
     * demuxer must NOT set this.
     */
    startTime = avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT;
    /**
     * 第一个 packet 的 dts
     */
    firstDTS = BigInt(0);
    /**
     * AV_DISPOSITION_* bit field
     */
    disposition = 0 /* AVDisposition.NONE */;
    /**
     *
     * 封装时间基
     *
     * decoding: set by libavformat
     * encoding: May be set by the caller before avformat_write_header() to
     *           provide a hint to the muxer about the desired timebase. In
     *           avformat_write_header(), the muxer will overwrite this field
     *           with the timebase that will actually be used for the timestamps
     *           written into the file (which may or may not be related to the
     *           user-provided one, depending on the format).
     */
    timeBase = (0,cheap_std_make__WEBPACK_IMPORTED_MODULE_0__["default"])(avutil_struct_rational__WEBPACK_IMPORTED_MODULE_4__.Rational);
    /**
     * 帧索引，可用于 seek
     */
    sampleIndexes = [];
    /**
     * pos 到 sample index 的映射
     */
    sampleIndexesPosMap = new Map();
    destroy() {
        if (this.codecpar) {
            this.codecpar.destroy();
            (0,cheap_std_unmake__WEBPACK_IMPORTED_MODULE_1__["default"])(this.codecpar);
            this.codecpar = null;
        }
        if (this.timeBase) {
            (0,cheap_std_unmake__WEBPACK_IMPORTED_MODULE_1__["default"])(this.timeBase);
            this.timeBase = null;
        }
        this.sampleIndexes.length = 0;
        this.sampleIndexesPosMap.clear();
    }
}


/***/ }),

/***/ "./src/avformat/bsf/AVBSFilter.ts":
/*!****************************************!*\
  !*** ./src/avformat/bsf/AVBSFilter.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AVBSFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var avutil_struct_avcodecparameters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/struct/avcodecparameters */ "./src/avutil/struct/avcodecparameters.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_codecparameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/util/codecparameters */ "./src/avutil/util/codecparameters.ts");




class AVBSFilter {
    inCodecpar;
    inTimeBase;
    outCodecpar;
    init(codecpar, timeBase) {
        this.inCodecpar = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__.avMallocz)(168);
        (0,avutil_util_codecparameters__WEBPACK_IMPORTED_MODULE_3__.copyCodecParameters)(this.inCodecpar, codecpar);
        this.inTimeBase = {
            den: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](timeBase + 4),
            num: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](timeBase)
        };
        return 0;
    }
    destroy() {
        if (this.inCodecpar) {
            (0,avutil_util_codecparameters__WEBPACK_IMPORTED_MODULE_3__.freeCodecParameters)(this.inCodecpar);
            this.inCodecpar = 0;
        }
    }
}


/***/ }),

/***/ "./src/avformat/bsf/aac/Raw2ADTSFilter.ts":
/*!************************************************!*\
  !*** ./src/avformat/bsf/aac/Raw2ADTSFilter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Raw2ADTSFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");







class Raw2ADTSFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    cache;
    cached;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.createAVPacket)();
        return 0;
    }
    destroy() {
        super.destroy();
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.destroyAVPacket)(this.cache);
        this.cache = 0;
        this.cached = false;
    }
    sendAVPacket(avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) || !cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            return;
        }
        const size = 7 + cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28);
        const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(size);
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapUint8Array)(bufferPointer, size);
        // syncword 0xfff
        buffer[0] = 0xff;
        buffer[1] = 0xf0;
        // ID
        buffer[1] |= 8;
        // Protection Absent
        buffer[1] |= 1;
        // profile
        buffer[2] = ((cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 48) - 1) & 0x03) << 6;
        // Sampling Frequency Index
        buffer[2] |= (_codecs_aac__WEBPACK_IMPORTED_MODULE_2__.MPEG4SamplingFrequencyIndex[cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136)] & 0x0f) << 2;
        // Channel Configuration 第三位
        buffer[2] |= (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 116) & 0x04) >> 2;
        // Channel Configuration 后两位
        buffer[3] = (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 116) & 0x03) << 6;
        // Frame Length 高 2 位
        buffer[3] |= (buffer.length >> 11) & 0x03;
        // Frame Length 中 8 位
        buffer[4] = (buffer.length >> 3) & 0xff;
        // Frame Length 低 3 位
        buffer[5] = (buffer.length & 0x07) << 5;
        // Buffer Fullness 全 1
        buffer[5] |= 0x1f;
        buffer[6] = 0xfc;
        buffer.set((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)), 7);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.copyAVPacketProps)(this.cache, avpacket);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.addAVPacketData)(this.cache, bufferPointer, size);
        this.cached = true;
    }
    receiveAVPacket(avpacket) {
        if (this.cached) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.unrefAVPacket)(avpacket);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.refAVPacket)(avpacket, this.cache);
            this.cached = false;
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_6__.EOF;
        }
    }
}


/***/ }),

/***/ "./src/avformat/bsf/aac/Raw2LATMFilter.ts":
/*!************************************************!*\
  !*** ./src/avformat/bsf/aac/Raw2LATMFilter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Raw2LATMFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");










const defaultAACRaw2LATMFilterOptions = {
    mod: 20
};
const LATM_HEADER = new Uint8Array([0x56, 0xe0, 0x00]);
class Raw2LATMFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    cache;
    cached;
    bitWriter;
    counter;
    options;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_8__.extend({}, defaultAACRaw2LATMFilterOptions, options);
    }
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.createAVPacket)();
        this.cached = false;
        this.counter = 0;
        this.bitWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_9__["default"]();
        return 0;
    }
    destroy() {
        super.destroy();
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.destroyAVPacket)(this.cache);
        this.cache = 0;
    }
    writeHeader() {
        this.bitWriter.writeU1(this.counter === 0 ? 0 : 1);
        // StreamMuxConfig
        if (this.counter === 0) {
            // audioMuxVersion
            this.bitWriter.writeU1(0);
            // allStreamsSameTimeFraming
            this.bitWriter.writeU1(1);
            // numSubFrames
            this.bitWriter.writeU(6, 0);
            // numProgram
            this.bitWriter.writeU(4, 0);
            // numLayer
            this.bitWriter.writeU(3, 0);
            // profile
            this.bitWriter.writeU(5, (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 48) - 1) & 0x1f);
            // samplingFreqIndex
            this.bitWriter.writeU(4, _codecs_aac__WEBPACK_IMPORTED_MODULE_3__.MPEG4SamplingFrequencyIndex[cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136)] & 0x0f);
            // channelConfig
            this.bitWriter.writeU(4, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 116) & 0x0f);
            // padding
            this.bitWriter.writeU(3, 0);
            // frameLengthType
            this.bitWriter.writeU(3, 0);
            // latmBufferFullness
            this.bitWriter.writeU(8, 0xff);
            // otherDataPresent
            this.bitWriter.writeU1(0);
            // crcCheckPresent
            this.bitWriter.writeU1(0);
        }
        this.counter++;
        this.counter %= this.options.mod;
    }
    copyBytes(data) {
        for (let i = 0; i < data.length; i++) {
            this.bitWriter.writeU(8, data[i]);
        }
    }
    sendAVPacket(avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) || !cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            return;
        }
        this.bitWriter.clear();
        const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
        if (element) {
            const { profile, sampleRate, channels } = (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_3__.getAVCodecParameters)((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](element + 4)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 48, profile);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 136, sampleRate);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 116, channels);
            this.counter = 0;
        }
        this.writeHeader();
        let i = 0;
        for (; i <= cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28) - 255; i += 255) {
            this.bitWriter.writeU(8, 255);
        }
        this.bitWriter.writeU(8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28) - i);
        const packetBuffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        if ((packetBuffer[0] & 0xe1) === 0x81) {
            /*
             * Convert byte-aligned DSE to non-aligned.
             * Due to the input format encoding we know that
             * it is naturally byte-aligned in the input stream,
             * so there are no padding bits to account for.
             * To avoid having to add padding bits and rearrange
             * the whole stream we just remove the byte-align flag.
             * This allows us to remux our FATE AAC samples into latm
             * files that are still playable with minimal effort.
             */
            this.bitWriter.writeU(8, packetBuffer[0] & 0xfe);
            this.copyBytes(packetBuffer.subarray(1));
        }
        else {
            this.copyBytes(packetBuffer);
        }
        this.bitWriter.padding();
        const len = this.bitWriter.getPointer();
        const size = 3 + len;
        const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(size);
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.mapUint8Array)(bufferPointer, size);
        buffer.set(LATM_HEADER, 0);
        buffer[1] |= (len >> 8) & 0x1f;
        buffer[2] |= len & 0xff;
        buffer.set(this.bitWriter.getBuffer().subarray(0, len), 3);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.copyAVPacketProps)(this.cache, avpacket);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.addAVPacketData)(this.cache, bufferPointer, size);
        this.cached = true;
    }
    receiveAVPacket(avpacket) {
        if (this.cached) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.unrefAVPacket)(avpacket);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.refAVPacket)(avpacket, this.cache);
            this.cached = false;
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.EOF;
        }
    }
}


/***/ }),

/***/ "./src/avformat/bsf/h2645/Avcc2AnnexbFilter.ts":
/*!*****************************************************!*\
  !*** ./src/avformat/bsf/h2645/Avcc2AnnexbFilter.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Avcc2AnnexbFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var _codecs_vvc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../codecs/vvc */ "./src/avformat/codecs/vvc.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
var cheap__fileName__8 = "src/avformat/bsf/h2645/Avcc2AnnexbFilter.ts";











class Avcc2AnnexbFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    cache;
    cached;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.createAVPacket)();
        this.cached = false;
        return 0;
    }
    destroy() {
        super.destroy();
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.destroyAVPacket)(this.cache);
        this.cache = 0;
    }
    sendAVPacket(avpacket) {
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapSafeUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 80) === 2 /* h264.BitFormat.ANNEXB */ || (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_8__.isAnnexb)(buffer)) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.refAVPacket)(this.cache, avpacket);
        }
        else {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.copyAVPacketProps)(this.cache, avpacket);
            let convert;
            const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            let extradata = null;
            if (element) {
                extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapSafeUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](element + 4));
            }
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                convert = _codecs_h264__WEBPACK_IMPORTED_MODULE_4__.avcc2Annexb(buffer, extradata);
            }
            else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                convert = _codecs_hevc__WEBPACK_IMPORTED_MODULE_5__.avcc2Annexb(buffer, extradata);
            }
            else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                convert = _codecs_vvc__WEBPACK_IMPORTED_MODULE_6__.avcc2Annexb(buffer, extradata);
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_9__.fatal(`not support for codecId: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4)}`, cheap__fileName__8, 92);
            }
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.cache + 80, 2 /* h264.BitFormat.ANNEXB */);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.addAVPacketData)(this.cache, convert.bufferPointer, convert.length);
            if (convert.key) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.cache + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.cache + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            }
        }
        this.cached = true;
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.cached) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.unrefAVPacket)(avpacket);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.refAVPacket)(avpacket, this.cache);
            this.cached = false;
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
        }
    }
}


/***/ }),

/***/ "./src/avformat/bsf/opus/Raw2MpegtsFilter.ts":
/*!***************************************************!*\
  !*** ./src/avformat/bsf/opus/Raw2MpegtsFilter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Raw2MpegtsFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _codecs_opus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../codecs/opus */ "./src/avformat/codecs/opus.ts");







class Raw2MpegtsFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    cache;
    cached;
    opusPendingTrimStart;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.createAVPacket)();
        this.cached = false;
        this.opusPendingTrimStart = (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 148) > 0 ? cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 148) : 0)
            * 48000 / cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136);
        return 0;
    }
    destroy() {
        super.destroy();
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.destroyAVPacket)(this.cache);
        this.cache = 0;
    }
    sendAVPacket(avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) || !cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            return;
        }
        const packetBuffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        const opusSamples = _codecs_opus__WEBPACK_IMPORTED_MODULE_6__.getBufferSamples(packetBuffer);
        let sideData = null;
        const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.getAVPacketSideData)(avpacket, 11 /* AVPacketSideDataType.AV_PKT_DATA_SKIP_SAMPLES */);
        if (element) {
            sideData = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](element + 4));
        }
        let trimEnd = 0;
        if (sideData && sideData.length >= 10) {
            const value = (sideData[4] << 24) | (sideData[5] << 16) | (sideData[6] << 8) | sideData[9];
            trimEnd = value * 48000 / cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136);
        }
        let ctrlHeaderSize = packetBuffer.length + 2 + packetBuffer.length / 255 + 1;
        if (this.opusPendingTrimStart) {
            ctrlHeaderSize += 2;
        }
        if (trimEnd) {
            ctrlHeaderSize += 2;
        }
        const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_4__.avMalloc)(ctrlHeaderSize);
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__.mapUint8Array)(bufferPointer, ctrlHeaderSize);
        buffer[0] = 0x7f;
        buffer[1] = 0xe0;
        if (this.opusPendingTrimStart) {
            buffer[1] |= 0x10;
        }
        if (trimEnd) {
            buffer[1] |= 0x08;
        }
        let n = packetBuffer.length;
        let i = 2;
        do {
            buffer[i] = Math.min(n, 255);
            n -= 255;
            i++;
        } while (n >= 0);
        let trimStart = 0;
        if (this.opusPendingTrimStart) {
            trimStart = Math.min(this.opusPendingTrimStart, opusSamples);
            buffer[i] = (trimStart & 0xff00) >> 8;
            buffer[i + 1] = trimStart & 0xff;
            i += 2;
            this.opusPendingTrimStart -= trimStart;
        }
        if (trimEnd) {
            trimEnd = Math.min(trimEnd, opusSamples - trimStart);
            buffer[i] = (trimEnd & 0xff00) >> 8;
            buffer[i + 1] = trimEnd & 0xff;
            i += 2;
        }
        buffer.set(packetBuffer, i);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.copyAVPacketProps)(this.cache, avpacket);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.addAVPacketData)(this.cache, bufferPointer, ctrlHeaderSize);
        this.cached = true;
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.cached) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.unrefAVPacket)(avpacket);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.refAVPacket)(avpacket, this.cache);
            this.cached = false;
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_5__.DATA_INVALID;
        }
    }
}


/***/ }),

/***/ "./src/avformat/codecs/aac.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/aac.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AACProfile2Name: () => (/* binding */ AACProfile2Name),
/* harmony export */   MPEG4SamplingFrequencyIndex: () => (/* binding */ MPEG4SamplingFrequencyIndex),
/* harmony export */   getAVCodecParameters: () => (/* binding */ getAVCodecParameters)
/* harmony export */ });
/* unused harmony exports MPEG4SamplingFrequencies, MPEG4Channels, parseAVCodecParameters, avCodecParameters2Extradata */
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia aac util
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

const AACProfile2Name = {
    [1 /* MPEG4AudioObjectTypes.AAC_MAIN */]: 'Main',
    [2 /* MPEG4AudioObjectTypes.AAC_LC */]: 'LC',
    [3 /* MPEG4AudioObjectTypes.AAC_SSR */]: 'LC',
    [4 /* MPEG4AudioObjectTypes.AAC_LTP */]: 'LC',
    [5 /* MPEG4AudioObjectTypes.AAC_SBR */]: 'HE',
    [6 /* MPEG4AudioObjectTypes.AAC_SCALABLE */]: 'HE'
};
const MPEG4SamplingFrequencyIndex = {
    96000: 0,
    88200: 1,
    64000: 2,
    48000: 3,
    44100: 4,
    32000: 5,
    24000: 6,
    22050: 7,
    16000: 8,
    12000: 9,
    11025: 10,
    8000: 11,
    7350: 12
};
const MPEG4SamplingFrequencies = [
    96000,
    88200,
    64000,
    48000,
    44100,
    32000,
    24000,
    22050,
    16000,
    12000,
    11025,
    8000,
    7350,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE
];
const MPEG4Channels = [
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    1,
    2,
    3,
    4,
    5,
    6,
    7
];
/**
 * 解析 AAC AudioSpecificConfig
 *
 *             frequency
 *              44100Hz        fill bit
 *               4 bit          3 bit
 *              -------         -----
 *    0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0
 *    ---------         -------
 *      5 bit            4 bit
 *     AAC LC           fl, fr
 *    profile           channel
 *
 * url: https://wiki.multimedia.cx/index.php/MPEG-4_Audio#Audio_Specific_Config
 *
 */
function getAVCodecParameters(extradata) {
    let profile = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let sampleRate = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let channels = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    if (extradata.length >= 2) {
        profile = (extradata[0] >> 3) & 0x1f;
        sampleRate = MPEG4SamplingFrequencies[((extradata[0] & 0x07) << 1)
            | (extradata[1] >> 7)] ?? 48000;
        channels = MPEG4Channels[(extradata[1] >> 3) & 0x0f] ?? 2;
    }
    return {
        profile,
        sampleRate,
        channels
    };
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata) {
        const { profile, sampleRate, channels } = getAVCodecParameters(extradata);
        stream.codecpar.profile = profile;
        stream.codecpar.sampleRate = sampleRate;
        stream.codecpar.chLayout.nbChannels = channels;
    }
}
function avCodecParameters2Extradata(codecpar) {
    const samplingFreqIndex = MPEG4SamplingFrequencyIndex[codecpar.sampleRate];
    const channelConfig = codecpar.chLayout.nbChannels;
    const extradata = new Uint8Array(2);
    extradata[0] = ((codecpar.profile & 0x1f) << 3) | ((samplingFreqIndex & 0x0e) >> 1);
    extradata[1] = ((samplingFreqIndex & 0x01) << 7) | ((channelConfig & 0x0f) << 3);
    return extradata;
}


/***/ }),

/***/ "./src/avformat/codecs/av1.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/av1.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AV1Profile2Name: () => (/* binding */ AV1Profile2Name)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, AV1LevelIdx, getLevelByResolution, parseAVCodecParameters, parseExtraData, parseSequenceHeader, splitOBU, generateExtradata */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/av1syntax */ "./src/avutil/util/av1syntax.ts");
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");
/* harmony import */ var avutil_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/pixelFormatDescriptor */ "./src/avutil/pixelFormatDescriptor.ts");





const AV1Profile2Name = {
    [0 /* AV1Profile.Main */]: 'Main',
    [1 /* AV1Profile.High */]: 'High',
    [2 /* AV1Profile.Professional */]: 'Professional'
};
const LevelCapabilities = [
    { level: 20, maxResolution: 2359296 },
    { level: 21, maxResolution: 4460544 },
    { level: 30, maxResolution: 10653696 },
    { level: 31, maxResolution: 17040384 },
    { level: 40, maxResolution: 21233664 },
    { level: 41, maxResolution: 21233664 },
    { level: 50, maxResolution: 35651584 },
    { level: 51, maxResolution: 35651584 },
    { level: 52, maxResolution: 35651584 },
    { level: 53, maxResolution: 35651584 },
    { level: 60, maxResolution: 142606336 },
    { level: 61, maxResolution: 142606336 },
    { level: 62, maxResolution: 142606336 },
    { level: 63, maxResolution: 142606336 }
];
const AV1LevelIdx = [20, 21, 22, 23, 30, 31, 32, 33, 40, 41, 42, 43, 50, 51, 52, 53, 60, 61, 62, 63, 70, 71, 72, 73];
function getLevelByResolution(width, height, fps) {
    const resolution = width * height;
    for (const level of LevelCapabilities) {
        if (resolution <= level.maxResolution) {
            return level.level;
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 4) {
        const params = parseExtraData(extradata);
        stream.codecpar.profile = params.profile;
        stream.codecpar.level = params.level;
    }
}
/**
 * - 1 bit marker
 * - 7 bit version
 * - 3 bit profile
 * - 5 bit level
 * - 1 bit tier
 * - 1 bit bitdepth > 8
 * - 1 bit bitdepth == 12
 * - 1 bit monochrome
 * - 1 bit chroma_subsampling_x
 * - 1 bit chroma_subsampling_y
 * - 2 bit chroma_sample_position
 * - 8 bit padding
 *
 * @param header
 */
function parseExtraData(extradata) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"](extradata.length);
    bitReader.appendBuffer(extradata);
    // marker
    bitReader.readU1();
    // version
    bitReader.readU(7);
    const profile = bitReader.readU(3);
    const level = bitReader.readU(5);
    const tier = bitReader.readU1();
    let bitDepth = bitReader.readU1() ? 10 : 8;
    if (bitReader.readU1()) {
        bitDepth = 12;
    }
    const monochrome = bitReader.readU1();
    const chromaSubsamplingX = bitReader.readU1();
    const chromaSubsamplingY = bitReader.readU1();
    const chromaSamplePosition = bitReader.readU(2);
    return {
        profile,
        level,
        tier,
        bitDepth,
        monochrome,
        chromaSubsamplingX,
        chromaSubsamplingY,
        chromaSamplePosition
    };
}
/* eslint-disable camelcase */
function parseSequenceHeader(header) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"](header.length);
    bitReader.appendBuffer(header);
    bitReader.readU1();
    bitReader.readU(4);
    const extensionFlag = bitReader.readU1();
    const hasSizeFlag = bitReader.readU1();
    // obu_reserved_1bit
    bitReader.readU1();
    if (extensionFlag) {
        bitReader.readU(8);
    }
    if (hasSizeFlag) {
        avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.leb128(bitReader);
    }
    const seq_profile = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 3);
    const still_picture = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    const reduced_still_picture_header = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let timing_info_present_flag = 0;
    let decoder_model_info_present_flag = 0;
    let initial_display_delay_present_flag = 0;
    let operating_points_cnt_minus_1 = 0;
    let operating_point_idc = [0];
    let seq_level_idx = [0];
    let seq_tier = [0];
    let decoder_model_present_for_this_op = [0];
    let initial_display_delay_present_for_this_op = [0];
    let initial_display_delay_minus_1 = [0];
    let buffer_delay_length_minus_1 = 0;
    let decoder_buffer_delay = [0];
    let encoder_buffer_delay = [0];
    let low_delay_mode_flag = [0];
    if (reduced_still_picture_header) {
        seq_level_idx[0] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
    }
    else {
        timing_info_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (timing_info_present_flag) {
            let num_units_in_display_tick = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 32);
            let time_scale = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 32);
            let equal_picture_interval = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            if (equal_picture_interval) {
                let num_ticks_per_picture_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.uvlc(bitReader);
            }
            let decoder_model_info_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            if (decoder_model_info_present_flag) {
                buffer_delay_length_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
                let num_units_in_decoding_tick = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 32);
                let buffer_removal_time_length_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
                let frame_presentation_time_length_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
            }
        }
        else {
            decoder_model_info_present_flag = 0;
        }
        let initial_display_delay_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        let operating_points_cnt_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
        for (let i = 0; i <= operating_points_cnt_minus_1; i++) {
            operating_point_idc[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 12);
            seq_level_idx[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
            if (seq_level_idx[i] > 7) {
                seq_tier[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            }
            else {
                seq_tier[i] = 0;
            }
            if (decoder_model_info_present_flag) {
                decoder_model_present_for_this_op[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                if (decoder_model_present_for_this_op[i]) {
                    let n = buffer_delay_length_minus_1 + 1;
                    decoder_buffer_delay[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
                    encoder_buffer_delay[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
                    low_delay_mode_flag[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                }
            }
            else {
                decoder_model_present_for_this_op[i] = 0;
            }
            if (initial_display_delay_present_flag) {
                initial_display_delay_present_for_this_op[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                if (initial_display_delay_present_for_this_op[i]) {
                    initial_display_delay_minus_1[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
                }
            }
        }
    }
    let frame_width_bits_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
    let frame_height_bits_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
    let n = frame_width_bits_minus_1 + 1;
    let max_frame_width_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
    n = frame_height_bits_minus_1 + 1;
    let max_frame_height_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
    let frame_id_numbers_present_flag = 0;
    let delta_frame_id_length_minus_2 = 0;
    let additional_frame_id_length_minus_1 = 0;
    if (reduced_still_picture_header) {
        frame_id_numbers_present_flag = 0;
    }
    else {
        frame_id_numbers_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    if (frame_id_numbers_present_flag) {
        delta_frame_id_length_minus_2 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
        additional_frame_id_length_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 3);
    }
    let use_128x128_superblock = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_filter_intra = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_intra_edge_filter = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_interintra_compound = 0;
    let enable_masked_compound = 0;
    let enable_warped_motion = 0;
    let enable_dual_filter = 0;
    let enable_order_hint = 0;
    let enable_jnt_comp = 0;
    let enable_ref_frame_mvs = 0;
    let seq_force_screen_content_tools = 2;
    let seq_force_integer_mv = 2;
    let OrderHintBits = 0;
    if (!reduced_still_picture_header) {
        let enable_interintra_compound = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_masked_compound = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_warped_motion = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_dual_filter = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_order_hint = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (enable_order_hint) {
            enable_jnt_comp = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            enable_ref_frame_mvs = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        }
        else {
            enable_jnt_comp = 0;
            enable_ref_frame_mvs = 0;
        }
        let seq_choose_screen_content_tools = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (seq_choose_screen_content_tools) {
            seq_force_screen_content_tools = 2;
        }
        else {
            seq_force_screen_content_tools = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        }
        if (seq_force_screen_content_tools > 0) {
            let seq_choose_integer_mv = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            if (seq_choose_integer_mv) {
                seq_force_integer_mv = 2;
            }
            else {
                seq_force_integer_mv = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            }
        }
        else {
            seq_force_integer_mv = 2;
        }
        if (enable_order_hint) {
            const order_hint_bits_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 3);
            OrderHintBits = order_hint_bits_minus_1 + 1;
        }
        else {
            OrderHintBits = 0;
        }
    }
    let enable_superres = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_cdef = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_restoration = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let high_bitdepth = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let twelve_bit = 0;
    let bit_depth = 0;
    let mono_chrome = 0;
    if (seq_profile == 2 && high_bitdepth) {
        twelve_bit = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        bit_depth = twelve_bit ? 12 : 10;
    }
    else if (seq_profile <= 2) {
        bit_depth = high_bitdepth ? 10 : 8;
    }
    if (seq_profile == 1) {
        mono_chrome = 0;
    }
    else {
        mono_chrome = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    const color_description_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let color_primaries = 0;
    let transfer_characteristics = 0;
    let matrix_coefficients = 0;
    if (color_description_present_flag) {
        color_primaries = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 8);
        transfer_characteristics = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 8);
        matrix_coefficients = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 8);
    }
    else {
        color_primaries = 2;
        transfer_characteristics = 2;
        matrix_coefficients = 2;
    }
    let color_range = 0;
    let subsampling_x = 0;
    let subsampling_y = 0;
    let chroma_sample_position = 0;
    let separate_uv_delta_q = 0;
    if (mono_chrome) {
        color_range = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        subsampling_x = 1;
        subsampling_y = 1;
        chroma_sample_position = 0;
        separate_uv_delta_q = 0;
    }
    else if (color_primaries == 1
        && transfer_characteristics == 13
        && matrix_coefficients == 0) {
        color_range = 1;
        subsampling_x = 0;
        subsampling_y = 0;
        separate_uv_delta_q = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    else {
        color_range = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (seq_profile == 0) {
            subsampling_x = 1;
            subsampling_y = 1;
        }
        else if (seq_profile == 1) {
            subsampling_x = 0;
            subsampling_y = 0;
        }
        else {
            if (bit_depth == 12) {
                subsampling_x = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                if (subsampling_x) {
                    subsampling_y = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                }
                else {
                    subsampling_y = 0;
                }
            }
            else {
                subsampling_x = 1;
                subsampling_y = 0;
            }
        }
        if (subsampling_x && subsampling_y) {
            chroma_sample_position = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 2);
        }
        separate_uv_delta_q = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    let film_grain_params_present = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    return {
        width: max_frame_width_minus_1 + 1,
        height: max_frame_height_minus_1 + 1,
        profile: seq_profile,
        level: AV1LevelIdx[seq_level_idx[0]],
        tier: seq_tier[0],
        bitDepth: bit_depth,
        monoChrome: mono_chrome,
        colorRange: color_range,
        colorPrimaries: color_primaries,
        transferCharacteristics: transfer_characteristics,
        matrixCoefficients: matrix_coefficients,
        subsamplingX: subsampling_x,
        subsamplingY: subsampling_y,
        chromaSamplePosition: chroma_sample_position
    };
}
function splitOBU(buffer) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"]();
    bitReader.appendBuffer(buffer);
    const list = [];
    while (bitReader.remainingLength()) {
        const now = bitReader.getPos();
        // obu_forbidden_bit
        bitReader.readU1();
        const type = bitReader.readU(4);
        const extensionFlag = bitReader.readU1();
        const hasSizeFlag = bitReader.readU1();
        // obu_reserved_1bit
        bitReader.readU1();
        if (extensionFlag) {
            bitReader.readU(8);
        }
        const size = hasSizeFlag ? avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.leb128(bitReader) : buffer.length - 1 - extensionFlag;
        const headerSize = bitReader.getPos() - now;
        list.push(buffer.subarray(now, now + headerSize + size));
        bitReader.skip(size * 8);
    }
    return list;
}
function generateExtradata(codecpar, buffer) {
    const bitWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_3__["default"](4);
    // marker
    bitWriter.writeU1(1);
    // version
    bitWriter.writeU(7, 1);
    const header = splitOBU(buffer).find((buffer) => {
        return ((buffer[0] >>> 3) & 0x0f) === 1 /* OBUType.SEQUENCE_HEADER */;
    });
    if (header) {
        const params = parseSequenceHeader(header);
        bitWriter.writeU(3, params.profile);
        bitWriter.writeU(5, params.level);
        bitWriter.writeU(1, params.tier);
        bitWriter.writeU(1, params.bitDepth > 8 ? 1 : 0);
        bitWriter.writeU(1, params.bitDepth === 12 ? 1 : 0);
        bitWriter.writeU(1, params.monoChrome);
        bitWriter.writeU(1, params.subsamplingX);
        bitWriter.writeU(1, params.subsamplingY);
        bitWriter.writeU(1, params.chromaSamplePosition);
    }
    else {
        const desc = avutil_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_4__.PixelFormatDescriptorsMap[cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 28)];
        bitWriter.writeU(3, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 48));
        bitWriter.writeU(5, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 52));
        bitWriter.writeU(1, 0);
        bitWriter.writeU(1, desc.comp[0].depth > 8 ? 1 : 0);
        bitWriter.writeU(1, desc.comp[0].depth === 12 ? 1 : 0);
        bitWriter.writeU(1, 0);
        bitWriter.writeU(1, 1);
        bitWriter.writeU(1, 1);
        bitWriter.writeU(1, 0);
    }
    // padding
    bitWriter.writeU(8, 0);
    return bitWriter.getBuffer();
}


/***/ }),

/***/ "./src/avformat/codecs/h264.ts":
/*!*************************************!*\
  !*** ./src/avformat/codecs/h264.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H264Profile2Name: () => (/* binding */ H264Profile2Name),
/* harmony export */   avcc2Annexb: () => (/* binding */ avcc2Annexb)
/* harmony export */ });
/* unused harmony exports NALULengthSizeMinusOne, LevelCapabilities, getLevelByResolution, extradata2SpsPps, spsPps2Extradata, annexbExtradata2AvccExtradata, annexb2Avcc, parseAvccExtraData, parseAnnexbExtraData, parseAVCodecParameters, parserSPS */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/expgolomb */ "./src/avutil/util/expgolomb.ts");
var cheap__fileName__0 = "src/avformat/codecs/h264.ts";


/*
 * libmedia h264 util
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










const NALULengthSizeMinusOne = 3;
const H264Profile2Name = {
    [66 /* H264Profile.kBaseline */]: 'Constrained Baseline',
    [77 /* H264Profile.kMain */]: 'Main',
    [100 /* H264Profile.kHigh */]: 'High',
    [110 /* H264Profile.kHigh10 */]: 'High10',
    [122 /* H264Profile.kHigh422 */]: 'High422',
    [244 /* H264Profile.kHigh444 */]: 'High444'
};
const LevelCapabilities = [
    { level: 10, maxResolution: 25344, maxFrameRate: 15 },
    { level: 11, maxResolution: 25344, maxFrameRate: 30 },
    { level: 12, maxResolution: 101376, maxFrameRate: 30 },
    { level: 13, maxResolution: 101376, maxFrameRate: 30 },
    { level: 20, maxResolution: 101376, maxFrameRate: 30 },
    { level: 21, maxResolution: 202752, maxFrameRate: 30 },
    { level: 22, maxResolution: 414720, maxFrameRate: 30 },
    { level: 30, maxResolution: 414720, maxFrameRate: 30 },
    { level: 31, maxResolution: 921600, maxFrameRate: 30 },
    { level: 32, maxResolution: 1310720, maxFrameRate: 60 },
    { level: 40, maxResolution: 2097152, maxFrameRate: 30 },
    { level: 41, maxResolution: 2097152, maxFrameRate: 60 },
    { level: 42, maxResolution: 2228224, maxFrameRate: 60 },
    { level: 50, maxResolution: 8912896, maxFrameRate: 30 },
    { level: 51, maxResolution: 8912896, maxFrameRate: 60 },
    { level: 52, maxResolution: 8912896, maxFrameRate: 120 },
    { level: 60, maxResolution: 35651584, maxFrameRate: 30 },
    { level: 61, maxResolution: 35651584, maxFrameRate: 60 },
    { level: 62, maxResolution: 35651584, maxFrameRate: 120 }
];
function getLevelByResolution(width, height, fps) {
    const resolution = width * height;
    for (const level of LevelCapabilities) {
        if (resolution <= level.maxResolution && fps <= level.maxFrameRate) {
            return level.level;
        }
    }
}
/**
 *
 * avcc 格式的 extradata 转 annexb sps pps
 *
 * bits
 * - 8   version ( always 0x01 )
 * - 8   avc profile ( sps[0][1] )
 * - 8   avc compatibility ( sps[0][2] )
 * - 8   avc level ( sps[0][3] )
 * - 6   reserved ( all bits on )
 * - 2   NALULengthSizeMinusOne
 * - 3   reserved ( all bits on )
 * - 5   number of SPS NALUs (usually 1)
 * - repeated once per SPS:
 *   - 16         SPS size
 *   - variable   SPS NALU data
 * - 8 number of PPS NALUs (usually 1)
 * - repeated once per PPS:
 *   - 16       PPS size
 *   - variable PPS NALU data
 *
 * - ext (profile !== 66 && profile !== 77 && profile !== 88)
 *  - 6 reserved ( all bits on )
 *  - 2 chroma_format_idc
 *  - 5 reserved ( all bits on )
 *  - 3 bit_depth_luma_minus8
 *  - 5 reserved ( all bits on )
 *  - 3 bit_depth_chroma_minus8
 *  - 8 number of SPS_EXT NALUs
 *    - 16 SPS_EXT size
 *    - variable   SPS_EXT NALU data
 *
 */
function extradata2SpsPps(extradata) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](extradata);
    bufferReader.skip(5);
    const spss = [];
    const ppss = [];
    const spsExts = [];
    const spsLength = bufferReader.readUint8() & 0x1f;
    for (let i = 0; i < spsLength; i++) {
        const length = bufferReader.readUint16();
        spss.push(bufferReader.readBuffer(length));
    }
    const ppsLength = bufferReader.readUint8();
    for (let i = 0; i < ppsLength; i++) {
        const length = bufferReader.readUint16();
        ppss.push(bufferReader.readBuffer(length));
    }
    if (bufferReader.remainingSize() > 4) {
        bufferReader.skip(3);
        const spsExtLength = bufferReader.readUint8();
        if (spsExtLength > 0) {
            for (let i = 0; i < spsExtLength; i++) {
                const length = bufferReader.readUint16();
                spsExts.push(bufferReader.readBuffer(length));
            }
        }
    }
    return {
        spss,
        ppss,
        spsExts
    };
}
function spsPps2Extradata(spss, ppss, spsExts = []) {
    if (spss.length > 32) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn(`h264 metadata\'s sps max length is 32, but get ${spss.length}`, cheap__fileName__0, 199);
        spss = spss.slice(0, 32);
    }
    if (spss.length > 256) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn(`h264 metadata\'s pps max length is 256, but get ${spss.length}`, cheap__fileName__0, 203);
        spss = spss.slice(0, 256);
    }
    let length = 7;
    length = spss.reduce((prev, sps) => {
        return prev + 2 + sps.length;
    }, length);
    length = ppss.reduce((prev, pps) => {
        return prev + 2 + pps.length;
    }, length);
    const sps = spss[0];
    const params = parserSPS(sps);
    if (params.profile !== 66 && params.profile !== 77 && params.profile !== 88) {
        length += 4;
        if (spsExts.length) {
            length = spsExts.reduce((prev, ext) => {
                return prev + 2 + ext.length;
            }, length);
        }
    }
    const buffer = new Uint8Array(length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(sps[1]);
    bufferWriter.writeUint8(sps[2]);
    bufferWriter.writeUint8(sps[3]);
    bufferWriter.writeUint8(0xfc | NALULengthSizeMinusOne);
    // sps
    bufferWriter.writeUint8(0xe0 | (spss.length & 0x1f));
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
        bufferWriter.writeUint16(sps.length);
        bufferWriter.writeBuffer(sps);
    });
    // pps
    bufferWriter.writeUint8(ppss.length);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
        bufferWriter.writeUint16(pps.length);
        bufferWriter.writeBuffer(pps);
    });
    if (params.profile !== 66 && params.profile !== 77 && params.profile !== 88) {
        bufferWriter.writeUint8(0xfc | params.chromaFormatIdc);
        bufferWriter.writeUint8(0xf8 | params.bitDepthLumaMinus8);
        bufferWriter.writeUint8(0xf8 | params.bitDepthChromaMinus8);
        if (spsExts.length) {
            common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spsExts, (ext) => {
                bufferWriter.writeUint16(ext.length);
                bufferWriter.writeBuffer(ext);
            });
        }
    }
    return buffer;
}
function annexbExtradata2AvccExtradata(data) {
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.splitNaluByStartCode)(data);
    if (nalus.length > 1) {
        const spss = [];
        const ppss = [];
        const spsExts = [];
        nalus.forEach((nalu) => {
            const type = nalu[0] & 0x1f;
            if (type === 7 /* H264NaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 8 /* H264NaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
            else if (type === 13 /* H264NaluType.kSPSExt */) {
                spsExts.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            return spsPps2Extradata(spss, ppss, spsExts);
        }
    }
}
/**
 *
 * annexb 格式的 NALU 转 avcc NALU
 *
 */
function annexb2Avcc(data) {
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.splitNaluByStartCode)(data);
    let extradata;
    let key = false;
    if (nalus.length > 1) {
        const spss = [];
        const ppss = [];
        const spsExts = [];
        nalus.forEach((nalu) => {
            const type = nalu[0] & 0x1f;
            if (type === 7 /* H264NaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 8 /* H264NaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
            else if (type === 13 /* H264NaluType.kSPSExt */) {
                spsExts.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            extradata = spsPps2Extradata(spss, ppss, spsExts);
        }
        nalus = nalus.filter((nalu) => {
            const type = nalu[0] & 0x1f;
            return type !== 9 /* H264NaluType.kSliceAUD */
                && type !== 8 /* H264NaluType.kSlicePPS */
                && type !== 7 /* H264NaluType.kSliceSPS */
                && type !== 13 /* H264NaluType.kSPSExt */;
        });
    }
    const length = nalus.reduce((prev, nalu) => {
        return prev + NALULengthSizeMinusOne + 1 + nalu.length;
    }, 0);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(length);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.mapUint8Array)(bufferPointer, length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu) => {
        if (NALULengthSizeMinusOne === 3) {
            bufferWriter.writeUint32(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 2) {
            bufferWriter.writeUint24(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 1) {
            bufferWriter.writeUint16(nalu.length);
        }
        else {
            bufferWriter.writeUint8(nalu.length);
        }
        bufferWriter.writeBuffer(nalu.subarray(0));
        const type = nalu[0] & 0x1f;
        if (type === 5 /* H264NaluType.kSliceIDR */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length,
        key,
        extradata
    };
}
/**
 * avcc 格式的 NALU 转 annexb NALU
 *
 */
function avcc2Annexb(data, extradata) {
    const naluLengthSizeMinusOne = extradata ? (extradata[4] & 0x03) : NALULengthSizeMinusOne;
    let spss = [];
    let ppss = [];
    let spsExts = [];
    let key = false;
    if (extradata) {
        const result = extradata2SpsPps(extradata);
        spss = result.spss;
        ppss = result.ppss;
        spsExts = result.spsExts;
        key = true;
    }
    const nalus = [];
    const seis = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = data.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length);
        bufferReader.skip(length);
        const naluType = nalu[0] & 0x1f;
        if (naluType === 6 /* H264NaluType.kSliceSEI */) {
            seis.push(nalu);
        }
        else if (naluType !== 9 /* H264NaluType.kSliceAUD */) {
            nalus.push(nalu);
        }
    }
    let length = spss.reduce((prev, sps) => {
        return prev + 4 + sps.length;
    }, 0);
    length = ppss.reduce((prev, pps) => {
        return prev + 4 + pps.length;
    }, length);
    length = spsExts.reduce((prev, ext) => {
        return prev + 4 + ext.length;
    }, length);
    length = seis.reduce((prev, sei) => {
        return prev + 4 + sei.length;
    }, length);
    length = nalus.reduce((prev, nalu, index) => {
        return prev + (index ? 3 : 4) + nalu.length;
    }, length);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(length + 6);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"]((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.mapUint8Array)(bufferPointer, length + 6));
    // AUD
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(0x09);
    bufferWriter.writeUint8(0xf0);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(seis, (sei) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(sei);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(sps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(pps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spsExts, (ext) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(ext);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu, index) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        if (!index) {
            bufferWriter.writeUint8(0x00);
        }
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(nalu);
        const type = nalu[0] & 0x1f;
        if (type === 5 /* H264NaluType.kSliceIDR */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length: length + 6,
        key
    };
}
function parseAvccExtraData(avpacket, stream) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if ((0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.isAnnexb)(data)) {
        return;
    }
    const naluLengthSizeMinusOne = stream.metadata.naluLengthSizeMinusOne ?? NALULengthSizeMinusOne;
    let spss = [];
    let ppss = [];
    let spsExts = [];
    let others = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = data.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length);
        bufferReader.skip(length);
        const naluType = nalu[0] & 0x1f;
        if (naluType === 7 /* H264NaluType.kSliceSPS */) {
            spss.push(nalu);
        }
        else if (naluType === 8 /* H264NaluType.kSlicePPS */) {
            ppss.push(nalu);
        }
        else if (naluType === 13 /* H264NaluType.kSPSExt */) {
            spsExts.push(nalu);
        }
        else {
            others.push(nalu);
        }
    }
    if (spss.length || ppss.length) {
        const extradata = spsPps2Extradata(spss, ppss, spsExts);
        const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(extradata.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
    }
}
function parseAnnexbExtraData(avpacket, force = false) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) && !force) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if (!(0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.isAnnexb)(data)) {
        return;
    }
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.splitNaluByStartCode)(data);
    if (nalus.length > 1) {
        const spss = [];
        const ppss = [];
        const spsExts = [];
        nalus.forEach((nalu) => {
            const type = nalu[0] & 0x1f;
            if (type === 7 /* H264NaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 8 /* H264NaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
            else if (type === 13 /* H264NaluType.kSPSExt */) {
                spsExts.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            const extradata = spsPps2Extradata(spss, ppss, spsExts);
            const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(extradata.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        stream.metadata.naluLengthSizeMinusOne = (extradata[4] & 0x03);
        const { spss } = extradata2SpsPps(extradata);
        if (spss.length) {
            const { profile, level, width, height } = parserSPS(spss[0]);
            stream.codecpar.profile = profile;
            stream.codecpar.level = level;
            stream.codecpar.width = width;
            stream.codecpar.height = height;
        }
    }
}
function parserSPS(sps) {
    if (!sps || sps.length < 3) {
        return;
    }
    let offset = 0;
    if (sps[0] === 0x00
        && sps[1] === 0x00
        && sps[2] === 0x00
        && sps[3] === 0x01) {
        offset = 4;
    }
    const buffer = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.naluUnescape)(sps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    // forbidden_zero_bit
    bitReader.readU1();
    // nal_ref_idc
    bitReader.readU(2);
    // nal_unit_type
    bitReader.readU(5);
    const profile = bitReader.readU(8);
    // constraint_set0_flag
    bitReader.readU1();
    // constraint_set1_flag
    bitReader.readU1();
    // constraint_set2_flag
    bitReader.readU1();
    // constraint_set3_flag
    bitReader.readU1();
    // constraint_set4_flag
    bitReader.readU1();
    // constraint_set4_flag
    bitReader.readU1();
    // reserved_zero_2bits
    bitReader.readU(2);
    const level = bitReader.readU(8);
    // seq_parameter_set_id
    avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    // 摄像机出图大部分格式是 4:2:0
    let chromaFormatIdc = 1;
    let bitDepthLumaMinus8 = 0;
    let bitDepthChromaMinus8 = 0;
    if (profile == 100 || profile == 110 || profile == 122
        || profile == 244 || profile == 44 || profile == 83
        || profile == 86 || profile == 118 || profile == 128
        || profile == 138 || profile == 139 || profile == 134 || profile == 135) {
        chromaFormatIdc = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        if (chromaFormatIdc === 3) {
            // separate_colour_plane_flag
            bitReader.readU1();
        }
        // bit_depth_luma_minus8
        bitDepthLumaMinus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        // bit_depth_chroma_minus8
        bitDepthChromaMinus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        // qpprime_y_zero_transform_bypass_flag
        bitReader.readU1();
        let seqScalingMatrixPresentFlag = bitReader.readU1();
        if (seqScalingMatrixPresentFlag) {
            const seqScalingListPresentFlag = new Array(8);
            for (let i = 0; i < ((chromaFormatIdc != 3) ? 8 : 12); i++) {
                seqScalingListPresentFlag[i] = bitReader.readU1();
            }
        }
    }
    // log2_max_frame_num_minus4
    avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    const picOrderCntType = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    if (picOrderCntType === 0) {
        // log2_max_pic_order_cnt_lsb_minus4
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    }
    else if (picOrderCntType === 1) {
        // delta_pic_order_always_zero_flag
        bitReader.readU1();
        // offset_for_non_ref_pic
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readSE(bitReader);
        // offset_for_top_to_bottom_field
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readSE(bitReader);
        const numRefFramesInPicOrderCntCycle = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        for (let i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
            avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readSE(bitReader);
        }
    }
    // max_num_ref_frames
    avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    // gaps_in_frame_num_value_allowed_flag
    bitReader.readU1();
    const picWidthInMbsMinus1 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    const picHeightInMapUnitsMinus1 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    const frameMbsOnlyFlag = bitReader.readU1();
    let width = (picWidthInMbsMinus1 + 1) * 16;
    let height = (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16;
    if (!frameMbsOnlyFlag) {
        // mb_adaptive_frame_field_flag
        bitReader.readU1();
    }
    // direct_8x8_inference_flag
    bitReader.readU1();
    const frameCroppingFlag = bitReader.readU1();
    if (frameCroppingFlag) {
        const frameCropLeftOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        const frameCropRightOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        const frameCropTopOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        const frameCropBottomOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        let cropUnitX = 1;
        let cropUnitY = 2 - frameCroppingFlag;
        if (chromaFormatIdc === 1) {
            cropUnitX = 2;
            cropUnitY = 2 * (2 - frameCroppingFlag);
        }
        else if (frameCroppingFlag === 2) {
            cropUnitX = 2;
            cropUnitY = 2 - frameCroppingFlag;
        }
        width -= cropUnitX * (frameCropLeftOffset + frameCropRightOffset);
        height -= cropUnitY * (frameCropTopOffset + frameCropBottomOffset);
    }
    return {
        profile,
        level,
        width,
        height,
        chromaFormatIdc,
        bitDepthLumaMinus8,
        bitDepthChromaMinus8
    };
}


/***/ }),

/***/ "./src/avformat/codecs/hevc.ts":
/*!*************************************!*\
  !*** ./src/avformat/codecs/hevc.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HEVCProfile2Name: () => (/* binding */ HEVCProfile2Name),
/* harmony export */   avcc2Annexb: () => (/* binding */ avcc2Annexb)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, getLevelByResolution, extradata2VpsSpsPps, vpsSpsPps2Extradata, annexbExtradata2AvccExtradata, annexb2Avcc, parseAvccExtraData, parseAnnexbExtraData, parseAVCodecParameters, parserSPS */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/expgolomb */ "./src/avutil/util/expgolomb.ts");


/*
 * libmedia hevc util
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









const HEVCProfile2Name = {
    [1 /* HEVCProfile.Main */]: 'Main',
    [2 /* HEVCProfile.Main10 */]: 'Main10',
    [3 /* HEVCProfile.MainStillPicture */]: 'MainStillPicture',
    [4 /* HEVCProfile.Main444 */]: 'Main444'
};
const LevelCapabilities = [
    { level: 10, maxLumaSamplesPerSecond: 552960, maxLumaPictureSize: 36864, maxBitRate: { main: 128, main10: 150 } },
    { level: 20, maxLumaSamplesPerSecond: 3686400, maxLumaPictureSize: 122880, maxBitRate: { main: 1500, main10: 1875 } },
    { level: 21, maxLumaSamplesPerSecond: 7372800, maxLumaPictureSize: 245760, maxBitRate: { main: 3000, main10: 3750 } },
    { level: 30, maxLumaSamplesPerSecond: 16588800, maxLumaPictureSize: 552960, maxBitRate: { main: 6000, main10: 7500 } },
    { level: 31, maxLumaSamplesPerSecond: 33177600, maxLumaPictureSize: 983040, maxBitRate: { main: 10000, main10: 12500 } },
    { level: 40, maxLumaSamplesPerSecond: 66846720, maxLumaPictureSize: 2228224, maxBitRate: { main: 12000, main10: 15000 } },
    { level: 41, maxLumaSamplesPerSecond: 133693440, maxLumaPictureSize: 2228224, maxBitRate: { main: 20000, main10: 25000 } },
    { level: 50, maxLumaSamplesPerSecond: 267386880, maxLumaPictureSize: 8912896, maxBitRate: { main: 25000, main10: 40000 } },
    { level: 51, maxLumaSamplesPerSecond: 534773760, maxLumaPictureSize: 8912896, maxBitRate: { main: 40000, main10: 60000 } },
    { level: 52, maxLumaSamplesPerSecond: 1069547520, maxLumaPictureSize: 35651584, maxBitRate: { main: 60000, main10: 100000 } },
    { level: 60, maxLumaSamplesPerSecond: 1069547520, maxLumaPictureSize: 35651584, maxBitRate: { main: 60000, main10: 100000 } },
    { level: 61, maxLumaSamplesPerSecond: 2139095040, maxLumaPictureSize: 89128960, maxBitRate: { main: 120000, main10: 240000 } },
    { level: 62, maxLumaSamplesPerSecond: 4278190080, maxLumaPictureSize: 356515840, maxBitRate: { main: 240000, main10: 480000 } }
];
function getLevelByResolution(profile, width, height, fps, bitrate) {
    bitrate /= 1000;
    const selectedProfile = profile === 1 /* HEVCProfile.Main */ ? 'main' : 'main10';
    const lumaSamplesPerSecond = width * height * fps;
    for (const level of LevelCapabilities) {
        if (lumaSamplesPerSecond <= level.maxLumaSamplesPerSecond && width * height <= level.maxLumaPictureSize && bitrate <= level.maxBitRate[selectedProfile]) {
            return level.level;
        }
    }
}
const NALULengthSizeMinusOne = 3;
/**
 *
 * avcc 格式的 extradata 转 annexb vps sps pps
 *
 * bits
 * - 8   configurationVersion( 固定   1)
 * - 2   general_profile_space
 * - 1   general_tier_flag
 * - 5   general_profile_idc
 * - 32  general_profile_compatibility_flags
 * - 48  general_constraint_indicator_flags (6 个 字节）
 * - 8   general_level_idc
 * - 4   reserved1 (1111)
 * - 4   min_spatial_segmentation_idc_L
 * - 8   min_spatial_segmentation_idc_H
 * - 6   reserved2 (111111)
 * - 2   parallelismType
 * - 6   reserved3 (111111)
 * - 2   chromaFormat
 * - 5   reserved4 (11111)
 * - 3   bitDepthLumaMinus8
 * - 5   reserved5(11111)
 * - 3   bitDepthChromaMinus8
 * - 16  avgFrameRate
 * - 2   constantFrameRate
 * - 3   numTemporalLayers
 * - 1   temporalIdNested
 * - 2   lengthSizeMinusOne
 * - 8   numOfArrays
 * - repeated of array (vps/sps/pps)
 * - 1   array_completeness
 * - 1   reserved (0)
 * - 6   NAL_unit_type
 * - 16  numNalus
 * - repeated once per NAL
 * - 16  nalUnitLength
 * - N   NALU data
 *
 */
function extradata2VpsSpsPps(extradata) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](extradata, true);
    bufferReader.skip(22);
    let vpss = [];
    let spss = [];
    let ppss = [];
    const arrayLen = bufferReader.readUint8();
    for (let i = 0; i < arrayLen; i++) {
        const naluType = bufferReader.readUint8() & 0x3f;
        const count = bufferReader.readUint16();
        const list = [];
        for (let j = 0; j < count; j++) {
            const len = bufferReader.readUint16();
            list.push(bufferReader.readBuffer(len));
        }
        if (naluType === 32 /* HEVCNaluType.kSliceVPS */) {
            vpss = list;
        }
        else if (naluType === 33 /* HEVCNaluType.kSliceSPS */) {
            spss = list;
        }
        else if (naluType === 34 /* HEVCNaluType.kSlicePPS */) {
            ppss = list;
        }
    }
    return {
        vpss,
        spss,
        ppss
    };
}
function vpsSpsPps2Extradata(vpss, spss, ppss) {
    const sps = spss[0];
    let length = 23;
    if (vpss.length) {
        // type + count
        length += 3;
        length = vpss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (spss.length) {
        // type + count
        length += 3;
        length = spss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (ppss.length) {
        // type + count
        length += 3;
        length = ppss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    const buffer = new Uint8Array(length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer, true);
    const spsData = parserSPS(sps);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(sps[1]);
    bufferWriter.writeUint8(sps[2]);
    bufferWriter.writeUint8(sps[3]);
    bufferWriter.writeUint8(sps[4]);
    bufferWriter.writeUint8(sps[5]);
    // general_constraint_indicator_flags
    bufferWriter.writeUint8(sps[6]);
    bufferWriter.writeUint8(sps[7]);
    bufferWriter.writeUint8(sps[8]);
    bufferWriter.writeUint8(sps[9]);
    bufferWriter.writeUint8(sps[10]);
    bufferWriter.writeUint8(sps[11]);
    bufferWriter.writeUint8(spsData.level);
    // min_spatial_segmentation_idc
    bufferWriter.writeUint8((1020) | 0);
    bufferWriter.writeUint8(0);
    // parallelismType
    bufferWriter.writeUint8((16320) | 0);
    // chromaFormat
    bufferWriter.writeUint8((16320) | spsData.chromaFormatIdc);
    // bitDepthLumaMinus8
    bufferWriter.writeUint8((8160) | spsData.bitDepthLumaMinus8);
    // bitDepthChromaMinus8
    bufferWriter.writeUint8((8160) | spsData.bitDepthChromaMinus8);
    // avgFrameRate
    bufferWriter.writeUint16(0);
    // constantFrameRate numTemporalLayers temporalIdNested lengthSizeMinusOne
    bufferWriter.writeUint8((0) | (8) | ((sps[0] & 0x01) << 2) | NALULengthSizeMinusOne);
    // numOfArrays
    let numOfArrays = 0;
    if (vpss.length) {
        numOfArrays++;
    }
    if (spss.length) {
        numOfArrays++;
    }
    if (ppss.length) {
        numOfArrays++;
    }
    bufferWriter.writeUint8(numOfArrays);
    // vps
    if (vpss.length) {
        bufferWriter.writeUint8((128) | 32 /* HEVCNaluType.kSliceVPS */);
        bufferWriter.writeUint16(vpss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(vpss, (vps) => {
            bufferWriter.writeUint16(vps.length);
            bufferWriter.writeBuffer(vps);
        });
    }
    // sps
    if (spss.length) {
        bufferWriter.writeUint8((128) | 33 /* HEVCNaluType.kSliceSPS */);
        bufferWriter.writeUint16(spss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
            bufferWriter.writeUint16(sps.length);
            bufferWriter.writeBuffer(sps);
        });
    }
    // pps
    if (ppss.length) {
        bufferWriter.writeUint8((128) | 34 /* HEVCNaluType.kSlicePPS */);
        bufferWriter.writeUint16(ppss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
            bufferWriter.writeUint16(pps.length);
            bufferWriter.writeBuffer(pps);
        });
    }
    return buffer;
}
function annexbExtradata2AvccExtradata(data) {
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length > 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 32 /* HEVCNaluType.kSliceVPS */) {
                vpss.push(nalu);
            }
            else if (type === 33 /* HEVCNaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 34 /* HEVCNaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
        });
        if (vpss.length && spss.length && ppss.length) {
            return vpsSpsPps2Extradata(vpss, spss, ppss);
        }
    }
}
/**
 *
 * annexb 格式的 NALU 转 avcc NALU
 *
 */
function annexb2Avcc(data) {
    let extradata;
    let key = false;
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length > 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 32 /* HEVCNaluType.kSliceVPS */) {
                vpss.push(nalu);
            }
            else if (type === 33 /* HEVCNaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 34 /* HEVCNaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
        });
        if (vpss.length && spss.length && ppss.length) {
            extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            nalus = nalus.filter((nalu) => {
                const type = (nalu[0] >>> 1) & 0x3f;
                return type !== 32 /* HEVCNaluType.kSliceVPS */
                    && type !== 33 /* HEVCNaluType.kSliceSPS */
                    && type !== 34 /* HEVCNaluType.kSlicePPS */
                    && type !== 35 /* HEVCNaluType.kSliceAUD */;
            });
        }
    }
    const length = nalus.reduce((prev, nalu) => {
        return prev + NALULengthSizeMinusOne + 1 + nalu.length;
    }, 0);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(length);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(bufferPointer, length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu) => {
        if (NALULengthSizeMinusOne === 3) {
            bufferWriter.writeUint32(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 2) {
            bufferWriter.writeUint24(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 1) {
            bufferWriter.writeUint16(nalu.length);
        }
        else {
            bufferWriter.writeUint8(nalu.length);
        }
        bufferWriter.writeBuffer(nalu.subarray(0));
        const type = (nalu[0] >>> 1) & 0x3f;
        if (type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */
            || type === 20 /* HEVCNaluType.kSliceIDR_N_LP */
            || type === 21 /* HEVCNaluType.kSliceCRA_NUT */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length,
        extradata,
        key
    };
}
/**
 * avcc 格式的 NALU 转 annexb NALU
 *
 */
function avcc2Annexb(data, extradata) {
    const naluLengthSizeMinusOne = extradata ? (extradata[21] & 0x03) : NALULengthSizeMinusOne;
    let vpss = [];
    let spss = [];
    let ppss = [];
    let key = false;
    if (extradata) {
        const result = extradata2VpsSpsPps(extradata);
        vpss = result.vpss;
        spss = result.spss;
        ppss = result.ppss;
        key = true;
    }
    const nalus = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        nalus.push(bufferReader.readBuffer(length));
    }
    let length = vpss.reduce((prev, vps) => {
        return prev + 4 + vps.length;
    }, 0);
    length = spss.reduce((prev, sps) => {
        return prev + 4 + sps.length;
    }, length);
    length = ppss.reduce((prev, pps) => {
        return prev + 4 + pps.length;
    }, length);
    length = nalus.reduce((prev, nalu, index) => {
        return prev + (index ? 3 : 4) + nalu.length;
    }, length);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(length + 7);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(bufferPointer, length + 7);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    // AUD
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(35 /* HEVCNaluType.kSliceAUD */ << 1);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0xf0);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(vpss, (vps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(vps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(sps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(pps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu, index) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        if (!index) {
            bufferWriter.writeUint8(0x00);
        }
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(nalu);
        const type = (nalu[0] >>> 1) & 0x3f;
        if (type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */
            || type === 20 /* HEVCNaluType.kSliceIDR_N_LP */
            || type === 21 /* HEVCNaluType.kSliceCRA_NUT */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length: length + 7,
        key
    };
}
function parseAvccExtraData(avpacket, stream) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if ((0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.isAnnexb)(data)) {
        return;
    }
    const naluLengthSizeMinusOne = stream.metadata.naluLengthSizeMinusOne ?? NALULengthSizeMinusOne;
    let vpss = [];
    let spss = [];
    let ppss = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = data.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length);
        bufferReader.skip(length);
        const naluType = (nalu[0] >>> 1) & 0x3f;
        if (naluType === 33 /* HEVCNaluType.kSliceSPS */) {
            spss.push(nalu);
        }
        else if (naluType === 34 /* HEVCNaluType.kSlicePPS */) {
            ppss.push(nalu);
        }
        else if (naluType === 32 /* HEVCNaluType.kSliceVPS */) {
            vpss.push(nalu);
        }
    }
    if (spss.length || ppss.length || vpss.length) {
        const extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
        const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(extradata.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
    }
}
function parseAnnexbExtraData(avpacket, force = false) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) && !force) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if (!(0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.isAnnexb)(data)) {
        return;
    }
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length > 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 32 /* HEVCNaluType.kSliceVPS */) {
                vpss.push(nalu);
            }
            else if (type === 33 /* HEVCNaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 34 /* HEVCNaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
        });
        if (vpss.length && spss.length && ppss.length) {
            const extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(extradata.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        stream.metadata.naluLengthSizeMinusOne = (extradata[21] & 0x03);
        const { spss } = extradata2VpsSpsPps(extradata);
        if (spss.length) {
            const { profile, level, width, height } = parserSPS(spss[0]);
            stream.codecpar.profile = profile;
            stream.codecpar.level = level;
            stream.codecpar.width = width;
            stream.codecpar.height = height;
        }
    }
}
function parserSPS(sps) {
    if (!sps || sps.length < 3) {
        return;
    }
    let offset = 0;
    if (sps[0] === 0x00
        && sps[1] === 0x00
        && sps[2] === 0x00
        && sps[3] === 0x01) {
        offset = 4;
    }
    let profile = 0;
    let level = 0;
    let width = 0;
    let height = 0;
    let bitDepthLumaMinus8 = 0;
    let bitDepthChromaMinus8 = 0;
    let chromaFormatIdc = 1;
    let generalProfileSpace = 0;
    let generalTierFlag = 0;
    let generalProfileCompatibilityFlag = 0;
    let constraintFlags = 0;
    const buffer = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.naluUnescape)(sps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    // forbidden_zero_bit
    bitReader.readU1();
    // nalu type
    bitReader.readU(6);
    // layerId
    bitReader.readU(6);
    // tid
    bitReader.readU(3);
    // sps_video_parameter_set_id
    bitReader.readU(4);
    // The value of sps_max_sub_layers_minus1 shall be in the range of 0 to 6, inclusive.
    const spsMaxSubLayersMinus1 = bitReader.readU(3);
    // sps_temporal_id_nesting_flag
    bitReader.readU1();
    if (spsMaxSubLayersMinus1 <= 6) {
        // profile_tier_level(sps_max_sub_layers_minus1)
        // general_profile_space
        generalProfileSpace = bitReader.readU(2);
        // general_tier_flag
        generalTierFlag = bitReader.readU1();
        // general_profile_idc
        profile = bitReader.readU(5);
        // general_profile_compatibility_flag[32]
        generalProfileCompatibilityFlag = bitReader.readU(32);
        /**
         * 1 general_progressive_source_flag
         * 1 general_interlaced_source_flag
         * 1 general_non_packed_constraint_flag
         * 1 general_frame_only_constraint_flag
         * 44 general_reserved_zero_44bits
         */
        constraintFlags = bitReader.readU(48);
        // general_level_idc
        level = bitReader.readU(8);
        const subLayerProfilePresentFlag = new Array(6);
        const subLayerLevelPresentFlag = new Array(6);
        for (let i = 0; i < spsMaxSubLayersMinus1; i++) {
            subLayerProfilePresentFlag[i] = bitReader.readU1();
            subLayerLevelPresentFlag[i] = bitReader.readU1();
        }
        if (spsMaxSubLayersMinus1 > 0) {
            for (let i = spsMaxSubLayersMinus1; i < 8; i++) {
                // reserved_zero_2bits
                bitReader.readU(2);
            }
        }
        for (let i = 0; i < spsMaxSubLayersMinus1; i++) {
            if (subLayerProfilePresentFlag[i]) {
                // sub_layer_profile_space[i]
                bitReader.readU(2);
                // sub_layer_tier_flag[i]
                bitReader.readU(1);
                // sub_layer_profile_idc[i]
                bitReader.readU(5);
                // sub_layer_profile_compatibility_flag[i][32]
                bitReader.readU(32);
                // sub_layer_progressive_source_flag[i]
                bitReader.readU(1);
                // sub_layer_interlaced_source_flag[i]
                bitReader.readU(1);
                // sub_layer_non_packed_constraint_flag[i]
                bitReader.readU(1);
                // sub_layer_frame_only_constraint_flag[i]
                bitReader.readU(1);
                // sub_layer_reserved_zero_44bits[i]
                bitReader.readU(44);
            }
            if (subLayerLevelPresentFlag[i]) {
                // sub_layer_level_idc[i]
                bitReader.readU(8);
            }
        }
        // "The  value  of sps_seq_parameter_set_id shall be in the range of 0 to 15, inclusive."
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        chromaFormatIdc = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        if (chromaFormatIdc === 3) {
            // separate_colour_plane_flag
            bitReader.readU(1);
        }
        width = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        height = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        const conformanceWindowFlag = bitReader.readU1();
        let confWinLeftOffset = 0;
        let confWinRightOffset = 0;
        let confWinTopOffset = 0;
        let confWinBottomOffset = 0;
        if (conformanceWindowFlag) {
            confWinLeftOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
            confWinRightOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
            confWinTopOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
            confWinBottomOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        }
        bitDepthLumaMinus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        bitDepthChromaMinus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        let SubWidthC = 2;
        let SubHeightC = 2;
        if (chromaFormatIdc === 0) {
            SubWidthC = SubHeightC = 0;
        }
        else if (chromaFormatIdc === 2) {
            SubWidthC = 2;
            SubHeightC = 1;
        }
        else if (chromaFormatIdc === 3) {
            SubWidthC = SubHeightC = 1;
        }
        const cropUnitX = SubWidthC * (1 << (bitDepthLumaMinus8 + 1));
        const cropUnitY = SubHeightC * (1 << (bitDepthLumaMinus8 + 1));
        width -= cropUnitX * (confWinLeftOffset + confWinRightOffset);
        height -= cropUnitY * (confWinTopOffset + confWinBottomOffset);
    }
    return {
        profile,
        level,
        width,
        height,
        chromaFormatIdc,
        bitDepthLumaMinus8,
        bitDepthChromaMinus8,
        generalProfileSpace,
        generalTierFlag,
        generalProfileCompatibilityFlag,
        constraintFlags
    };
}


/***/ }),

/***/ "./src/avformat/codecs/mp3.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/mp3.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MP3Profile2Name: () => (/* binding */ MP3Profile2Name)
/* harmony export */ });
/* unused harmony exports getSampleRateByVersionIndex, getFrameSizeByVersionLayer, getBitRateByVersionLayerIndex, getProfileByLayer, parseAVCodecParameters */
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia mp3 util
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

const MpegAudioV10SampleRateTable = [44100, 48000, 32000, 0];
const MpegAudioV20SampleRateTable = [22050, 24000, 16000, 0];
const MpegAudioV25SampleRateTable = [11025, 12000, 8000, 0];
const MpegAudioV10FrameSizeTable = [0, 1152, 1152, 384];
const MpegAudioV20FrameSizeTable = [0, 576, 1152, 384];
const MpegAudioV25FrameSizeTable = [0, 576, 1152, 384];
const MpegAudioV1L1BitRateTable = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1];
const MpegAudioV1L2BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1];
const MpegAudioV1L3BitRateTable = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1];
const MpegAudioV2L1BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, -1];
const MpegAudioV2L2L3BitRateTable = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1];
function getSampleRateByVersionIndex(version, samplingFreqIndex) {
    switch (version) {
        case 0:
            // MPEG 2.5
            return MpegAudioV25SampleRateTable[samplingFreqIndex];
        case 2:
            // MPEG 2
            return MpegAudioV20SampleRateTable[samplingFreqIndex];
        case 3:
            // MPEG 1
            return MpegAudioV10SampleRateTable[samplingFreqIndex];
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getFrameSizeByVersionLayer(version, layer) {
    switch (version) {
        case 0:
            // MPEG 2.5
            return MpegAudioV25FrameSizeTable[layer];
        case 2:
            // MPEG 2
            return MpegAudioV20FrameSizeTable[layer];
        case 3:
            // MPEG 1
            return MpegAudioV10FrameSizeTable[layer];
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getBitRateByVersionLayerIndex(version, layer, index) {
    switch (layer) {
        // layer3
        case 1:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L2L3BitRateTable[index];
                case 3:
                    return MpegAudioV1L3BitRateTable[index];
            }
            break;
        // layer2
        case 2:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L2L3BitRateTable[index];
                case 3:
                    return MpegAudioV1L2BitRateTable[index];
            }
        // layer1
        case 3:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L1BitRateTable[index];
                case 3:
                    return MpegAudioV1L1BitRateTable[index];
            }
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getProfileByLayer(layer) {
    switch (layer) {
        case 1:
            // Layer 3
            return 34;
        case 2:
            // Layer 2
            return 33;
        case 3:
            // Layer 1
            return 32;
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
const MP3Profile2Name = {
    [32 /* MP3Profile.Layer1 */]: 'Layer1',
    [33 /* MP3Profile.Layer2 */]: 'Layer2',
    [34 /* MP3Profile.Layer3 */]: 'Layer3'
};
function parseAVCodecParameters(stream, buffer) {
    if (buffer && buffer.length >= 4) {
        const ver = (buffer[1] >>> 3) & 0x03;
        const layer = (buffer[1] & 0x06) >> 1;
        // const bitrateIndex = (buffer[2] & 0xF0) >>> 4
        const samplingFreqIndex = (buffer[2] & 0x0C) >>> 2;
        const channelMode = (buffer[3] >>> 6) & 0x03;
        const channelCount = channelMode !== 3 ? 2 : 1;
        const profile = getProfileByLayer(layer);
        const sampleRate = getSampleRateByVersionIndex(ver, samplingFreqIndex);
        stream.codecpar.profile = profile;
        stream.codecpar.sampleRate = sampleRate;
        stream.codecpar.chLayout.nbChannels = channelCount;
    }
}


/***/ }),

/***/ "./src/avformat/codecs/opus.ts":
/*!*************************************!*\
  !*** ./src/avformat/codecs/opus.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBufferSamples: () => (/* binding */ getBufferSamples)
/* harmony export */ });
/* unused harmony exports durations, parseAVCodecParameters, avCodecParameters2Extradata */
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/*
 * libmedia opus util
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



const durations = [
    /* Silk NB */
    480, 960, 1920, 2880,
    /* Silk MB */
    480, 960, 1920, 2880,
    /* Silk WB */
    480, 960, 1920, 2880,
    /* Hybrid SWB */
    480, 960,
    /* Hybrid FB */
    480, 960,
    /* CELT NB */
    120, 240, 480, 960,
    /* CELT NB */
    120, 240, 480, 960,
    /* CELT NB */
    120, 240, 480, 960,
    /* CELT NB */
    120, 240, 480, 960
];
function getBufferSamples(buffer) {
    let toc = 0, frameDuration = 0, nframes = 0;
    if (buffer.length < 1) {
        return 0;
    }
    toc = buffer[0];
    frameDuration = durations[toc >> 3];
    switch (toc & 3) {
        case 0:
            nframes = 1;
            break;
        case 1:
            nframes = 2;
            break;
        case 2:
            nframes = 2;
            break;
        case 3:
            if (buffer.length < 2) {
                return 0;
            }
            nframes = buffer[1] & 63;
            break;
    }
    return nframes * frameDuration;
}
/**
 * opus extradata
 *
 * - 8 bytes Magic Signature: OpusHead
 * - 1 bytes unsigned, 对应值 0x01 version
 * - 1 bytes unsigned, channels 它可能和编码声道数不一致， 它可能被修改成 packet-by-packet, 对应值 0x01
 * - 2 bytes unsigned, preSkip 这是要从开始播放时的解码器输出， 从页面的颗粒位置减去以计算其 PCM 样本位置。
 * - 4 bytes unsigned, sampleRate 原始输入采样率
 * - 2 bytes signed, outputGain 这是解码时要应用的增益， 20 * log10 缩放解码器输出以实现所需的播放音量
 * - 1 bytes unsigned, channelMappingFamily 指示输出渠道的顺序和语音含义。该八位位组的每个当前指定的值表示一个映射系列，它定义了一组允许的通道数，以及每个允许的通道数的通道名称的有序集合
 * - channelMappingTable 可选， 当 Channel Mapping Family 为 0 时被省略。
 *  - 1 bytes, streamCount, unsigned ogg packet 里面编码了多少路 stream
 *  - 1 bytes, coupledStreamCount, unsigned 标识有多少路流是双声声道，必须小于 streamCount
 *  - C bytes, C 为总输出声道数 coupledStreamCount + streamCount
 *
 */
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 19) {
        const reader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](extradata, false);
        reader.skip(9);
        stream.codecpar.chLayout.nbChannels = reader.readUint8();
        stream.codecpar.initialPadding = reader.readUint16();
        stream.codecpar.sampleRate = reader.readUint32();
        stream.codecpar.seekPreroll = Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_2__.avRescaleQ)(BigInt(80), {
            den: 1000,
            num: 1
        }, {
            den: 48000,
            num: 1
        }));
    }
}
function avCodecParameters2Extradata(codecpar) {
    const extradata = new Uint8Array(19);
    const writer = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__["default"](extradata, false);
    writer.writeString('OpusHead');
    writer.writeUint8(0x01);
    writer.writeUint8(codecpar.chLayout.nbChannels);
    writer.writeUint16(codecpar.initialPadding);
    writer.writeUint32(codecpar.sampleRate);
    return extradata;
}


/***/ }),

/***/ "./src/avformat/codecs/vp9.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/vp9.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VP9Profile2Name: () => (/* binding */ VP9Profile2Name)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, getLevelByResolution, parseAVCodecParameters, parseExtraData, generateExtradata */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../avutil/struct/rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/pixelFormatDescriptor */ "./src/avutil/pixelFormatDescriptor.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");








const VP9Profile2Name = {
    [0 /* VP9Profile.Profile0 */]: 'Profile0',
    [1 /* VP9Profile.Profile1 */]: 'Profile1',
    [2 /* VP9Profile.Profile2 */]: 'Profile2',
    [3 /* VP9Profile.Profile3 */]: 'Profile3'
};
const LevelCapabilities = [
    { level: 10, maxResolution: 196608, maxFrameRate: 30 },
    { level: 11, maxResolution: 196608, maxFrameRate: 60 },
    { level: 20, maxResolution: 518400, maxFrameRate: 30 },
    { level: 21, maxResolution: 518400, maxFrameRate: 60 },
    { level: 30, maxResolution: 2073600, maxFrameRate: 30 },
    { level: 31, maxResolution: 2073600, maxFrameRate: 60 },
    { level: 40, maxResolution: 3686400, maxFrameRate: 30 },
    { level: 41, maxResolution: 3686400, maxFrameRate: 60 },
    { level: 50, maxResolution: 8294400, maxFrameRate: 30 },
    { level: 51, maxResolution: 8294400, maxFrameRate: 60 },
    { level: 60, maxResolution: 8847360, maxFrameRate: 30 },
    { level: 61, maxResolution: 8847360, maxFrameRate: 60 },
    { level: 70, maxResolution: 35389440, maxFrameRate: 30 },
    { level: 71, maxResolution: 35389440, maxFrameRate: 60 }
];
function getLevelByResolution(width, height, fps) {
    const resolution = width * height;
    for (const level of LevelCapabilities) {
        if (resolution <= level.maxResolution && fps <= level.maxFrameRate) {
            return level.level;
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        const params = parseExtraData(extradata);
        stream.codecpar.profile = params.profile;
        stream.codecpar.level = params.level;
    }
}
/**
 * - 1 byte profile
 * - 1 byte level
 * - 4 bit bitdepth
 * - 3 bit chroma_subsampling
 * - 1 bit full_range_flag
 * - 1 byte color_primaries
 * - 1 byte color_trc
 * - 1 byte color_space
 *
 * @param extradata
 */
function parseExtraData(extradata) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_3__["default"](extradata.length);
    bitReader.appendBuffer(extradata);
    const profile = bitReader.readU(8);
    const level = bitReader.readU(8);
    let bitDepth = bitReader.readU(4);
    const chromaSubsampling = bitReader.readU(3);
    const fullRangeFlag = bitReader.readU1();
    const colorPrimaries = bitReader.readU(8);
    const colorTrc = bitReader.readU(8);
    const colorSpace = bitReader.readU(8);
    return {
        profile,
        level,
        bitDepth,
        chromaSubsampling,
        fullRangeFlag,
        colorPrimaries,
        colorTrc,
        colorSpace
    };
}
function getVpccFeature(codecpar) {
    let profile = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 48);
    let level = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 52);
    if (level === avutil_constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE) {
        level = getLevelByResolution(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 56), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 60), (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_6__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__["default"])(codecpar + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__.Rational)));
    }
    const desc = avutil_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_5__.PixelFormatDescriptorsMap[cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 28)];
    let bitDepth = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 40);
    let chromaSubsampling = 1 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_COLLOCATED_WITH_LUMA */;
    if (desc) {
        bitDepth = desc.comp[0].depth;
        if (desc.log2ChromaW === 1 && desc.log2ChromaH === 1) {
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 100) === 1 /* AVChromaLocation.AVCHROMA_LOC_LEFT */) {
                chromaSubsampling = 0 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_VERTICAL */;
            }
        }
        else if (desc.log2ChromaW === 1 && desc.log2ChromaH === 0) {
            chromaSubsampling = 2 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_422 */;
        }
        else if (desc.log2ChromaW === 0 && desc.log2ChromaH === 0) {
            chromaSubsampling = 3 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_444 */;
        }
    }
    const fullRange = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 84) === 2 /* AVColorRange.AVCOL_RANGE_JPEG */ ? 1 : 0;
    if (profile === avutil_constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE && bitDepth) {
        if (chromaSubsampling == 0 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_VERTICAL */
            || chromaSubsampling == 1 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_COLLOCATED_WITH_LUMA */) {
            profile = (bitDepth == 8) ? 0 /* VP9Profile.Profile0 */ : 2 /* VP9Profile.Profile2 */;
        }
        else {
            profile = (bitDepth == 8) ? 1 /* VP9Profile.Profile1 */ : 3 /* VP9Profile.Profile3 */;
        }
    }
    return {
        profile,
        level,
        bitDepth,
        chromaSubsampling,
        fullRange
    };
}
function generateExtradata(codecpar) {
    const ioWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_7__["default"](new Uint8Array(8));
    const vpcc = getVpccFeature(codecpar);
    ioWriter.writeUint8(vpcc.profile);
    ioWriter.writeUint8(vpcc.level);
    ioWriter.writeUint8((vpcc.bitDepth << 4) | (vpcc.chromaSubsampling << 1) | vpcc.fullRange);
    ioWriter.writeUint8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 88));
    ioWriter.writeUint8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 92));
    ioWriter.writeUint8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 96));
    ioWriter.writeUint16(0);
    return ioWriter.getWroteBuffer();
}


/***/ }),

/***/ "./src/avformat/codecs/vvc.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/vvc.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avcc2Annexb: () => (/* binding */ avcc2Annexb)
/* harmony export */ });
/* unused harmony exports extradata2VpsSpsPps, vpsSpsPps2Extradata, annexbExtradata2AvccExtradata, annexb2Avcc, parseAvccExtraData, parseAnnexbExtraData, parseAVCodecParameters, parserSPS, parseExtraData */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/expgolomb */ "./src/avutil/util/expgolomb.ts");
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");


/*
 * libmedia vvc util
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










const NALULengthSizeMinusOne = 3;
function parsePTL(bitReader) {
    const olsIdx = bitReader.readU(9);
    const numSublayers = bitReader.readU(3);
    const constantFrameRate = bitReader.readU(2);
    const chromaFormatIdc = bitReader.readU(2);
    const bitDepthMinus8 = bitReader.readU(3);
    bitReader.readU(5);
    // VvcPTLRecord
    bitReader.readU(2);
    const num_bytes_constraint_info = bitReader.readU(6);
    const generalProfileIdc = bitReader.readU(7);
    const generalTierFlag = bitReader.readU(1);
    const generalLevelIdc = bitReader.readU(8);
    const ptlFrameOnlyConstraintFlag = bitReader.readU(1);
    const ptlMultilayerEnabledFlag = bitReader.readU(1);
    const generalConstraintInfo = [];
    const sublayerLevelIdc = [];
    if (num_bytes_constraint_info) {
        for (let i = 0; i < num_bytes_constraint_info - 1; i++) {
            generalConstraintInfo[i] = bitReader.readU(8);
        }
        generalConstraintInfo[num_bytes_constraint_info - 1] = bitReader.readU(6);
    }
    else {
        bitReader.readU(6);
    }
    if (numSublayers > 1) {
        let ptl_sublayer_present_mask = 0;
        for (let j = numSublayers - 2; j >= 0; --j) {
            const val = bitReader.readU(1);
            ptl_sublayer_present_mask |= val << j;
        }
        for (let j = numSublayers; j <= 8 && numSublayers > 1; ++j) {
            bitReader.readU(1);
        }
        for (let j = numSublayers - 2; j >= 0; --j) {
            if (ptl_sublayer_present_mask & (1 << j)) {
                sublayerLevelIdc[j] = bitReader.readU(8);
            }
        }
    }
    const ptl_num_sub_profiles = bitReader.readU(8);
    const generalSubProfileIdc = [];
    if (ptl_num_sub_profiles) {
        for (let i = 0; i < ptl_num_sub_profiles; i++) {
            generalSubProfileIdc.push(bitReader.readU(8));
        }
    }
    const maxPictureWidth = bitReader.readU(16);
    const maxPictureHeight = bitReader.readU(16);
    const avgFramerate = bitReader.readU(16);
    return {
        olsIdx,
        numSublayers,
        bitDepthMinus8,
        chromaFormatIdc,
        constantFrameRate,
        generalProfileIdc,
        generalTierFlag,
        generalLevelIdc,
        ptlFrameOnlyConstraintFlag,
        ptlMultilayerEnabledFlag,
        generalConstraintInfo,
        sublayerLevelIdc,
        generalSubProfileIdc,
        maxPictureWidth,
        maxPictureHeight,
        avgFramerate
    };
}
/**
 *
 * vvcc 格式的 extradata 转 annexb vps sps pps
 *
 * bits
 * - 5   reserved (11111)
 * - 2   lengthSizeMinusOne
 * - 1   ptl_present_flag
 * if ptl_present_flag
 *   - 9   ols_idx
 *   - 3  num_sublayers
 *   - 2  constant_frame_rate
 *   - 2  chroma_format_idc
 *   - 3  bit_depth_minus8
 *   - 5  reserved (11111)
 *   VvcPTLRecord
 *   - 2 reserved (11)
 *   - 6 num_bytes_constraint_info
 *   - 7 general_profile_idc
 *   - 1 general_tier_flag
 *   - 8 general_level_idc
 *   - 1 general_level_idc
 *   - 1 ptl_multilayer_enabled_flag
 *   if num_bytes_constraint_info > 0
 *      for (i = 0; i < num_bytes_constraint_info - 1; i++)
 *        - 8 general_constraint_info[i]
 *      - 6 general_constraint_info[num_bytes_constraint_info - 1]
 *   else
 *      - 6 reserved
 *   if num_sublayers > 1
 *      - num_sublayers - 2 ptl_sublayer_level_present_flag
 *      - 8 - num_sublayers + 1 ptl_reserved_zero_bit
 *      for (i = num_sublayers -2; i >= 0; i--)
 *        if ptl_sublayer_present_mask & (1 << i)
 *          - 8 sublayer_level_idc[i]
 *    - 8 ptl_num_sub_profiles
 *    if ptl_num_sub_profiles
 *      for (i = 0; i < ptl_num_sub_profiles; i++)
 *        - 32 general_sub_profile_idc[i]
 *    - 16 max_picture_width
 *    - 16 max_picture_height
 *    - 16 avg_frame_rate
 * - 8   numOfArrays
 * - repeated of array (vps/sps/pps)
 * - 1   array_completeness
 * - 2   reserved (0)
 * - 5   NAL_unit_type
 * if nalu_type != VVC_NALU_DEC_PARAM && nalu_type != VVC_NALU_OPI
 *    - 16  numNalus
 * else
 *   numNalus = 1
 * - repeated once per NAL
 * - 16  nalUnitLength
 * - N   NALU data
 *
 */
function extradata2VpsSpsPps(extradata) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](extradata, true);
    const ptlPresentFlag = bufferReader.readUint8() & 0x01;
    if (ptlPresentFlag) {
        const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"]();
        bitReader.appendBuffer(extradata.subarray(1));
        parsePTL(bitReader);
        bufferReader.skip(bitReader.getPos());
    }
    let vpss = [];
    let spss = [];
    let ppss = [];
    const arrayLen = bufferReader.readUint8();
    for (let i = 0; i < arrayLen; i++) {
        const naluType = bufferReader.readUint8() & 0x1f;
        let count = 1;
        if (naluType !== 13 /* VVCNaluType.kDCI_NUT */ && naluType !== 12 /* VVCNaluType.kOPI_NUT */) {
            count = bufferReader.readUint16();
        }
        const list = [];
        for (let j = 0; j < count; j++) {
            const len = bufferReader.readUint16();
            list.push(bufferReader.readBuffer(len));
        }
        if (naluType === 14 /* VVCNaluType.kVPS_NUT */) {
            vpss = list;
        }
        else if (naluType === 15 /* VVCNaluType.kSPS_NUT */) {
            spss = list;
        }
        else if (naluType === 16 /* VVCNaluType.kPPS_NUT */) {
            ppss = list;
        }
    }
    return {
        vpss,
        spss,
        ppss
    };
}
function vpsSpsPps2Extradata(vpss, spss, ppss) {
    const sps = spss[0];
    let ptl;
    if (sps) {
        const spsParams = parserSPS(sps);
        const biWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_11__["default"]();
        biWriter.writeU(9, 0);
        biWriter.writeU(3, spsParams.spsMaxSublayersMinus1 + 1);
        biWriter.writeU(2, 1);
        biWriter.writeU(2, spsParams.chromaFormatIdc);
        biWriter.writeU(3, spsParams.bitDepthMinus8);
        biWriter.writeU(5, 0b11111);
        biWriter.writeU(2, 0b11);
        biWriter.writeU(6, spsParams.generalConstraintInfo.length);
        biWriter.writeU(7, spsParams.profile);
        biWriter.writeU1(spsParams.tierFlag);
        biWriter.writeU(8, spsParams.level);
        biWriter.writeU1(spsParams.ptlFrameOnlyConstraintFlag);
        biWriter.writeU1(spsParams.ptlMultilayerEnabledFlag);
        if (spsParams.generalConstraintInfo.length) {
            for (let i = 0; i < spsParams.generalConstraintInfo.length - 1; i++) {
                biWriter.writeU(8, spsParams.generalConstraintInfo[i]);
            }
            biWriter.writeU(6, spsParams.generalConstraintInfo[spsParams.generalConstraintInfo.length - 1]);
        }
        else {
            biWriter.writeU(6, 0b111111);
        }
        if (spsParams.spsMaxSublayersMinus1 + 1 > 1) {
            let ptl_sublayer_level_present_flags = 0;
            for (let i = spsParams.spsMaxSublayersMinus1 - 1; i >= 0; i--) {
                ptl_sublayer_level_present_flags = (ptl_sublayer_level_present_flags << 1 | spsParams.ptlSublayerLevelPresentFlag[i]);
            }
            biWriter.writeU(8, ptl_sublayer_level_present_flags);
        }
        for (let i = spsParams.spsMaxSublayersMinus1 - 1; i >= 0; i--) {
            if (spsParams.ptlSublayerLevelPresentFlag[i]) {
                biWriter.writeU(8, spsParams.sublayerLevelIdc[i]);
            }
        }
        biWriter.writeU(8, spsParams.generalSubProfileIdc.length);
        for (let i = 0; i < spsParams.generalSubProfileIdc.length; i++) {
            biWriter.writeU(32, spsParams.sublayerLevelIdc[i]);
        }
        biWriter.writeU(16, spsParams.width);
        biWriter.writeU(16, spsParams.height);
        biWriter.writeU(16, 0);
        biWriter.padding();
        ptl = biWriter.getBuffer().subarray(0, biWriter.getPointer());
    }
    let length = 1 + (ptl ? ptl.length : 0);
    if (vpss.length) {
        // type + count
        length += 3;
        length = vpss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (spss.length) {
        // type + count
        length += 3;
        length = spss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (ppss.length) {
        // type + count
        length += 3;
        length = ppss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    const buffer = new Uint8Array(length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer, true);
    bufferWriter.writeUint8(NALULengthSizeMinusOne << 1 | (ptl ? 1 : 0) | 0xf8);
    if (ptl) {
        bufferWriter.writeBuffer(ptl);
    }
    // numOfArrays
    let numOfArrays = 0;
    if (vpss.length) {
        numOfArrays++;
    }
    if (spss.length) {
        numOfArrays++;
    }
    if (ppss.length) {
        numOfArrays++;
    }
    bufferWriter.writeUint8(numOfArrays);
    // vps
    if (vpss.length) {
        bufferWriter.writeUint8((128) | 14 /* VVCNaluType.kVPS_NUT */);
        bufferWriter.writeUint16(vpss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(vpss, (vps) => {
            bufferWriter.writeUint16(vps.length);
            bufferWriter.writeBuffer(vps);
        });
    }
    // sps
    if (spss.length) {
        bufferWriter.writeUint8((128) | 15 /* VVCNaluType.kSPS_NUT */);
        bufferWriter.writeUint16(spss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
            bufferWriter.writeUint16(sps.length);
            bufferWriter.writeBuffer(sps);
        });
    }
    // pps
    if (ppss.length) {
        bufferWriter.writeUint8((128) | 16 /* VVCNaluType.kPPS_NUT */);
        bufferWriter.writeUint16(ppss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
            bufferWriter.writeUint16(pps.length);
            bufferWriter.writeBuffer(pps);
        });
    }
    return buffer;
}
function annexbExtradata2AvccExtradata(data) {
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length > 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
        });
        if (vpss.length && spss.length && ppss.length) {
            return vpsSpsPps2Extradata(vpss, spss, ppss);
        }
    }
}
/**
 *
 * annexb 格式的 NALU 转 avcc NALU
 *
 */
function annexb2Avcc(data) {
    let extradata;
    let key = false;
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length > 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
        });
        if (vpss.length && spss.length && ppss.length) {
            extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            nalus = nalus.filter((nalu) => {
                const type = (nalu[0] >>> 1) & 0x3f;
                return type !== 14 /* VVCNaluType.kVPS_NUT */
                    && type !== 15 /* VVCNaluType.kSPS_NUT */
                    && type !== 16 /* VVCNaluType.kPPS_NUT */
                    && type !== 20 /* VVCNaluType.kAUD_NUT */;
            });
        }
    }
    const length = nalus.reduce((prev, nalu) => {
        return prev + NALULengthSizeMinusOne + 1 + nalu.length;
    }, 0);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(length);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(bufferPointer, length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu) => {
        if (NALULengthSizeMinusOne === 3) {
            bufferWriter.writeUint32(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 2) {
            bufferWriter.writeUint24(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 1) {
            bufferWriter.writeUint16(nalu.length);
        }
        else {
            bufferWriter.writeUint8(nalu.length);
        }
        bufferWriter.writeBuffer(nalu.subarray(0));
        const type = (nalu[0] >>> 1) & 0x3f;
        if (type === 8 /* VVCNaluType.kIDR_N_LP */
            || type === 7 /* VVCNaluType.kIDR_W_RADL */
            || type === 9 /* VVCNaluType.kCRA_NUT */
            || type === 10 /* VVCNaluType.kGDR_NUT */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length,
        extradata,
        key
    };
}
/**
 * avcc 格式的 NALU 转 annexb NALU
 *
 */
function avcc2Annexb(data, extradata) {
    const naluLengthSizeMinusOne = extradata ? ((extradata[0] >>> 1) & 0x03) : NALULengthSizeMinusOne;
    let vpss = [];
    let spss = [];
    let ppss = [];
    let key = false;
    if (extradata) {
        const result = extradata2VpsSpsPps(extradata);
        vpss = result.vpss;
        spss = result.spss;
        ppss = result.ppss;
        key = true;
    }
    const nalus = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        nalus.push(bufferReader.readBuffer(length));
    }
    let length = vpss.reduce((prev, vps) => {
        return prev + 4 + vps.length;
    }, 0);
    length = spss.reduce((prev, sps) => {
        return prev + 4 + sps.length;
    }, length);
    length = ppss.reduce((prev, pps) => {
        return prev + 4 + pps.length;
    }, length);
    length = nalus.reduce((prev, nalu, index) => {
        return prev + (index ? 3 : 4) + nalu.length;
    }, length);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(length + 7);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(bufferPointer, length + 7);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    // AUD
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(20 /* VVCNaluType.kAUD_NUT */ << 3);
    bufferWriter.writeUint8(0xf0);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(vpss, (vps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(vps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(sps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(pps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu, index) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        if (!index) {
            bufferWriter.writeUint8(0x00);
        }
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(nalu);
        const type = (nalu[0] >>> 1) & 0x3f;
        if (type === 8 /* VVCNaluType.kIDR_N_LP */
            || type === 7 /* VVCNaluType.kIDR_W_RADL */
            || type === 9 /* VVCNaluType.kCRA_NUT */
            || type === 10 /* VVCNaluType.kGDR_NUT */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length: length + 7,
        key
    };
}
function parseAvccExtraData(avpacket, stream) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if ((0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.isAnnexb)(data)) {
        return;
    }
    const naluLengthSizeMinusOne = stream.metadata.naluLengthSizeMinusOne ?? NALULengthSizeMinusOne;
    let vpss = [];
    let spss = [];
    let ppss = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = data.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length);
        bufferReader.skip(length);
        const naluType = (nalu[0] >>> 1) & 0x3f;
        if (naluType === 15 /* VVCNaluType.kSPS_NUT */) {
            spss.push(nalu);
        }
        else if (naluType === 16 /* VVCNaluType.kPPS_NUT */) {
            ppss.push(nalu);
        }
        else if (naluType === 14 /* VVCNaluType.kVPS_NUT */) {
            vpss.push(nalu);
        }
    }
    if (spss.length || ppss.length || vpss.length) {
        const extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
        const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(extradata.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
    }
}
function parseAnnexbExtraData(avpacket, force = false) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) && !force) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if (!(0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.isAnnexb)(data)) {
        return;
    }
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length > 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
        });
        if (vpss.length && spss.length && ppss.length) {
            const extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(extradata.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        stream.metadata.naluLengthSizeMinusOne = (extradata[0] >>> 1) & 0x03;
        const { spss } = extradata2VpsSpsPps(extradata);
        if (spss.length) {
            const { profile, level, width, height } = parserSPS(spss[0]);
            stream.codecpar.profile = profile;
            stream.codecpar.level = level;
            stream.codecpar.width = width;
            stream.codecpar.height = height;
        }
    }
}
function parserSPS(sps) {
    if (!sps || sps.length < 3) {
        return;
    }
    let offset = 0;
    if (sps[0] === 0x00
        && sps[1] === 0x00
        && sps[2] === 0x00
        && sps[3] === 0x01) {
        offset = 4;
    }
    let profile = 0;
    let level = 0;
    let width = 0;
    let height = 0;
    let bitDepthMinus8 = 0;
    let chromaFormatIdc = 1;
    let generalProfileSpace = 0;
    let tierFlag = 0;
    let ptlFrameOnlyConstraintFlag = 0;
    let ptlMultilayerEnabledFlag = 0;
    const generalConstraintInfo = [];
    const ptlSublayerLevelPresentFlag = [];
    const sublayerLevelIdc = [];
    const generalSubProfileIdc = [];
    const buffer = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.naluUnescape)(sps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    // forbidden_zero_bit
    bitReader.readU1();
    // nuh_reserved_zero_bit
    bitReader.readU1();
    // layerId
    bitReader.readU(6);
    // nalu type
    bitReader.readU(5);
    // tid
    bitReader.readU(3);
    // sps_seq_parameter_set_id && sps_video_parameter_set_id
    bitReader.readU(8);
    const spsMaxSublayersMinus1 = bitReader.readU(3);
    chromaFormatIdc = bitReader.readU(2);
    const sps_log2_ctu_size_minus5 = bitReader.readU(2);
    const sps_ptl_dpb_hrd_params_present_flag = bitReader.readU(1);
    if (sps_ptl_dpb_hrd_params_present_flag) {
        profile = bitReader.readU(7);
        tierFlag = bitReader.readU(1);
        level = bitReader.readU(8);
        ptlFrameOnlyConstraintFlag = bitReader.readU(1);
        ptlMultilayerEnabledFlag = bitReader.readU(1);
        const gci_present_flag = bitReader.readU(1);
        if (gci_present_flag) {
            for (let j = 0; j < 8; j++) {
                generalConstraintInfo[j] = bitReader.readU(8);
            }
            generalConstraintInfo[8] = bitReader.readU(7);
            const gci_num_reserved_bits = bitReader.readU(8);
            bitReader.readU(gci_num_reserved_bits);
        }
        bitReader.skipPadding();
        for (let i = spsMaxSublayersMinus1 - 1; i >= 0; i--) {
            ptlSublayerLevelPresentFlag[i] = bitReader.readU(1);
        }
        bitReader.skipPadding();
        for (let i = spsMaxSublayersMinus1 - 1; i >= 0; i--) {
            if (ptlSublayerLevelPresentFlag[i]) {
                sublayerLevelIdc[i] = bitReader.readU(8);
            }
        }
        const ptl_num_sub_profiles = bitReader.readU(8);
        if (ptl_num_sub_profiles) {
            for (let i = 0; i < ptl_num_sub_profiles; i++) {
                generalSubProfileIdc[i] = bitReader.readU(32);
            }
        }
    }
    // sps_gdr_enabled_flag
    bitReader.readU1();
    const sps_ref_pic_resampling_enabled_flag = bitReader.readU1();
    if (sps_ref_pic_resampling_enabled_flag) {
        // sps_res_change_in_clvs_allowed_flag
        bitReader.readU1();
    }
    const sps_pic_width_max_in_luma_samples = width = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const sps_pic_height_max_in_luma_samples = height = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    if (bitReader.readU1()) {
        // sps_conf_win_left_offset
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // sps_conf_win_right_offset
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // sps_conf_win_top_offset
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // sps_conf_win_bottom_offset
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    }
    if (bitReader.readU1()) {
        const sps_num_subpics_minus1 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        const ctb_log2_size_y = sps_log2_ctu_size_minus5 + 5;
        const ctb_size_y = 1 << ctb_log2_size_y;
        const tmp_width_val = sps_pic_width_max_in_luma_samples / (1 << ctb_log2_size_y);
        const tmp_height_val = sps_pic_height_max_in_luma_samples / (1 << ctb_log2_size_y);
        const wlen = Math.ceil(Math.log2(tmp_width_val));
        const hlen = Math.ceil(Math.log2(tmp_height_val));
        let sps_subpic_id_len = 0;
        let sps_subpic_same_size_flag = 0;
        let sps_independent_subpics_flag = 0;
        // sps_num_subpics_minus1
        if (sps_num_subpics_minus1 > 0) {
            sps_independent_subpics_flag = bitReader.readU1();
            sps_subpic_same_size_flag = bitReader.readU1();
        }
        for (let i = 0; sps_num_subpics_minus1 > 0 && i <= sps_num_subpics_minus1; i++) {
            if (!sps_subpic_same_size_flag || i == 0) {
                if (i > 0 && sps_pic_width_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(wlen);
                }
                if (i > 0 && sps_pic_height_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(hlen);
                }
                if (i < sps_num_subpics_minus1 && sps_pic_width_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(wlen);
                }
                if (i < sps_num_subpics_minus1 && sps_pic_height_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(hlen);
                }
            }
            if (!sps_independent_subpics_flag) {
                // sps_subpic_treated_as_pic_flag && sps_loop_filter_across_subpic_enabled_flag
                bitReader.readU(2);
            }
        }
        sps_subpic_id_len = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader) + 1;
        // sps_subpic_id_mapping_explicitly_signalled_flag
        if (bitReader.readU(1)) {
            // sps_subpic_id_mapping_present_flag
            if (bitReader.readU(1)) {
                for (let i = 0; i <= sps_num_subpics_minus1; i++) {
                    // sps_subpic_id[i]
                    bitReader.readU(sps_subpic_id_len);
                }
            }
        }
    }
    bitDepthMinus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    return {
        profile,
        level,
        width,
        height,
        chromaFormatIdc,
        bitDepthMinus8,
        generalProfileSpace,
        tierFlag,
        generalConstraintInfo,
        generalSubProfileIdc,
        ptlFrameOnlyConstraintFlag,
        ptlMultilayerEnabledFlag,
        spsMaxSublayersMinus1,
        ptlSublayerLevelPresentFlag,
        sublayerLevelIdc
    };
}
function parseExtraData(extradata) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"]();
    bitReader.appendBuffer(extradata);
    const ptlPresentFlag = bitReader.readU(8) & 0x01;
    if (ptlPresentFlag) {
        return parsePTL(bitReader);
    }
    return {};
}


/***/ }),

/***/ "./src/avformat/dump.ts":
/*!******************************!*\
  !*** ./src/avformat/dump.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dumpCodecName: () => (/* binding */ dumpCodecName),
/* harmony export */   dumpFormatName: () => (/* binding */ dumpFormatName)
/* harmony export */ });
/* unused harmony exports dumpTime, dumpInt64, dumpBitrate, dumpKey, default */
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../avutil/struct/rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _AVFormatContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AVFormatContext */ "./src/avformat/AVFormatContext.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/stringEnum */ "./src/avutil/stringEnum.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_string__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/util/string */ "./src/common/util/string.ts");
/* harmony import */ var common_function_toString__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/function/toString */ "./src/common/function/toString.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var _codecs_av1__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./codecs/av1 */ "./src/avformat/codecs/av1.ts");
/* harmony import */ var _codecs_vp9__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./codecs/vp9 */ "./src/avformat/codecs/vp9.ts");
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./codecs/mp3 */ "./src/avformat/codecs/mp3.ts");


















function dumpTime(time) {
    if (time < 0) {
        time = BigInt(0);
    }
    const ms = (Number(time % BigInt(1000) & 0xffffffffn) >> 0);
    const secs = (Number(time / BigInt(1000) % BigInt(60) & 0xffffffffn) >> 0);
    const mins = (Number(time / BigInt(1000) / BigInt(60) % BigInt(60) & 0xffffffffn) >> 0);
    const hours = (Number(time / BigInt(1000) / BigInt(3600) & 0xffffffffn) >> 0);
    return common_util_string__WEBPACK_IMPORTED_MODULE_10__.format('%02d:%02d:%02d.%03d', hours, mins, secs, ms);
}
function dumpInt64(v) {
    if (v < BigInt(10000)) {
        return (0,common_function_toString__WEBPACK_IMPORTED_MODULE_11__["default"])((Number(v & 0xffffffffn) >> 0));
    }
    return (Number(v / BigInt(1000) & 0xffffffffn) >> 0) + 'k';
}
function dumpBitrate(v) {
    if (v < BigInt(10000)) {
        return (0,common_function_toString__WEBPACK_IMPORTED_MODULE_11__["default"])((Number(v & 0xffffffffn) >> 0)) + ' bps/s';
    }
    return (Number(v / BigInt(1000) & 0xffffffffn) >> 0) + ' kbps/s';
}
function dumpKey(obj, value, defaultValue = 'unknown') {
    let name = defaultValue;
    common_util_object__WEBPACK_IMPORTED_MODULE_5__.each(obj, (v, k) => {
        if (value === v) {
            name = k;
            return false;
        }
    });
    return name;
}
function dumpCodecName(codecType, codecId) {
    if (codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
        return dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.AudioCodecString2CodecId, codecId);
    }
    else if (codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
        return dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.VideoCodecString2CodecId, codecId);
    }
    return 'unknown';
}
function dumpFormatName(format) {
    return dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.Format2AVFormat, format);
}
function dumpProfileName(codecId, profile) {
    switch (codecId) {
        case 86018 /* AVCodecID.AV_CODEC_ID_AAC */:
            return _codecs_aac__WEBPACK_IMPORTED_MODULE_12__.AACProfile2Name[profile] || 'LC';
        case 86017 /* AVCodecID.AV_CODEC_ID_MP3 */:
            return _codecs_mp3__WEBPACK_IMPORTED_MODULE_17__.MP3Profile2Name[profile] || 'Layer3';
        case 27 /* AVCodecID.AV_CODEC_ID_H264 */:
            return _codecs_h264__WEBPACK_IMPORTED_MODULE_13__.H264Profile2Name[profile] || 'High';
        case 173 /* AVCodecID.AV_CODEC_ID_HEVC */:
            return _codecs_hevc__WEBPACK_IMPORTED_MODULE_14__.HEVCProfile2Name[profile] || 'Main';
        case 225 /* AVCodecID.AV_CODEC_ID_AV1 */:
            return _codecs_av1__WEBPACK_IMPORTED_MODULE_15__.AV1Profile2Name[profile] || 'Main';
        case 167 /* AVCodecID.AV_CODEC_ID_VP9 */:
            return _codecs_vp9__WEBPACK_IMPORTED_MODULE_16__.VP9Profile2Name[profile] || 'Profile0';
    }
}
function dumpAVStreamInterface(stream, index, prefix) {
    const mediaType = dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.mediaType2AVMediaType, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar));
    const list = [];
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar) === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
        const profileName = dumpProfileName(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 48));
        const codecName = dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.AudioCodecString2CodecId, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 4));
        list.push(`${codecName}${profileName ? ` (${profileName})` : ''}`);
        list.push(`${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 136)} Hz`);
        let channel = `${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 116)} channels`;
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 116) === 1) {
            channel = 'mono';
        }
        else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 116) === 2) {
            channel = 'stereo';
        }
        list.push(channel);
        list.push(dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.SampleFmtString2SampleFormat, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 28)));
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](stream.codecpar + 32) > BigInt(0)) {
            list.push(`${dumpBitrate(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](stream.codecpar + 32))}`);
        }
    }
    else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar) === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
        const profileName = dumpProfileName(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 48));
        const codecName = dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.VideoCodecString2CodecId, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 4));
        list.push(`${codecName}${profileName ? ` (${profileName})` : ''}`);
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 28) !== avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE) {
            const pixfmt = dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.PixfmtString2AVPixelFormat, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 28));
            const range = dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.colorRange2AVColorRange, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 84), 'tv');
            const space = dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.colorSpace2AVColorSpace, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 96), 'bt709');
            list.push(`${pixfmt}(${range}, ${space})`);
        }
        const dar = {
            num: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 56) * cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 64),
            den: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 60) * cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 68)
        };
        (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avReduce)(dar);
        list.push(`${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 56)}x${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 60)} [SAR: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 64)}:${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar + 68)} DAR ${dar.num}:${dar.den}]`);
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](stream.codecpar + 32) > BigInt(0)) {
            list.push(`${dumpBitrate(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](stream.codecpar + 32))}`);
        }
        if ((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(stream.codecpar + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational)) > 0) {
            list.push(`${(0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(stream.codecpar + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational)).toFixed(2)} fps`);
            list.push(`${(0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(stream.codecpar + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational)).toFixed(2)} tbr`);
        }
        list.push(`${dumpInt64(BigInt(Math.floor((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avQ2D)({
            num: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.timeBase + 4),
            den: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.timeBase)
        }))))} tbn`);
    }
    else {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](stream.codecpar + 32) > BigInt(0)) {
            list.push(`${dumpBitrate(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](stream.codecpar + 32))}`);
        }
    }
    if (stream.disposition) {
        let disposition = '';
        if (stream.disposition & 1 /* AVDisposition.DEFAULT */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 1 /* AVDisposition.DEFAULT */)}) `;
        }
        if (stream.disposition & 2 /* AVDisposition.DUB */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 2 /* AVDisposition.DUB */)}) `;
        }
        if (stream.disposition & 4 /* AVDisposition.ORIGINAL */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 4 /* AVDisposition.ORIGINAL */)}) `;
        }
        if (stream.disposition & 8 /* AVDisposition.COMMENT */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 8 /* AVDisposition.COMMENT */)}) `;
        }
        if (stream.disposition & 16 /* AVDisposition.LYRICS */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 16 /* AVDisposition.LYRICS */)}) `;
        }
        if (stream.disposition & 32 /* AVDisposition.KARAOKE */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 32 /* AVDisposition.KARAOKE */)}) `;
        }
        if (stream.disposition & 64 /* AVDisposition.FORCED */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 64 /* AVDisposition.FORCED */)}) `;
        }
        if (stream.disposition & 128 /* AVDisposition.HEARING_IMPAIRED */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 128 /* AVDisposition.HEARING_IMPAIRED */)}) `;
        }
        if (stream.disposition & 256 /* AVDisposition.VISUAL_IMPAIRED */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 256 /* AVDisposition.VISUAL_IMPAIRED */)}) `;
        }
        if (stream.disposition & 512 /* AVDisposition.CLEAN_EFFECTS */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 512 /* AVDisposition.CLEAN_EFFECTS */)}) `;
        }
        if (stream.disposition & 1024 /* AVDisposition.ATTACHED_PIC */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 1024 /* AVDisposition.ATTACHED_PIC */)}) `;
        }
        if (stream.disposition & 2048 /* AVDisposition.TIMED_THUMBNAILS */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 2048 /* AVDisposition.TIMED_THUMBNAILS */)}) `;
        }
        if (stream.disposition & 65536 /* AVDisposition.CAPTIONS */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 65536 /* AVDisposition.CAPTIONS */)}) `;
        }
        if (stream.disposition & 131072 /* AVDisposition.DESCRIPTIONS */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 131072 /* AVDisposition.DESCRIPTIONS */)}) `;
        }
        if (stream.disposition & 262144 /* AVDisposition.METADATA */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 262144 /* AVDisposition.METADATA */)}) `;
        }
        if (stream.disposition & 524288 /* AVDisposition.DEPENDENT */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 524288 /* AVDisposition.DEPENDENT */)}) `;
        }
        if (stream.disposition & 1048576 /* AVDisposition.STILL_IMAGE */) {
            disposition += `(${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.disposition2AVDisposition, 1048576 /* AVDisposition.STILL_IMAGE */)}) `;
        }
        if (disposition) {
            list.push(disposition);
        }
    }
    let dump = `${prefix}Stream #${index}:${stream.index} ${mediaType}: ${list.join(', ')}\n`;
    if (Object.keys(stream.metadata).length) {
        dump += `${prefix}  Metadata:\n`;
        common_util_object__WEBPACK_IMPORTED_MODULE_5__.each(stream.metadata, (value, key) => {
            if (!common_util_is__WEBPACK_IMPORTED_MODULE_7__.object(value) || !common_util_is__WEBPACK_IMPORTED_MODULE_7__.array(value)) {
                dump += `${prefix}    ${key}: ${value}\n`;
            }
        });
    }
    return dump;
}
function dumpAVFormatContextInterface(formatContext, index, input) {
    let dump = `${input.tag} #${index}, ${dumpKey(avutil_stringEnum__WEBPACK_IMPORTED_MODULE_6__.Format2AVFormat, formatContext.format)}, from '${input.from}:'\n`;
    if (Object.keys(formatContext.metadata).length) {
        dump += `  Metadata:\n`;
        common_util_object__WEBPACK_IMPORTED_MODULE_5__.each(formatContext.metadata, (value, key) => {
            if (!common_util_is__WEBPACK_IMPORTED_MODULE_7__.object(value) || !common_util_is__WEBPACK_IMPORTED_MODULE_7__.array(value)) {
                dump += `    ${key}: ${value}\n`;
            }
        });
    }
    let duration = BigInt(0);
    let bitrate = BigInt(0);
    let start = -BigInt(1);
    formatContext.streams.forEach((stream) => {
        const d = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avRescaleQ)(stream.duration, (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(stream.timeBase, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_MILLI_TIME_BASE_Q);
        const s = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avRescaleQ)(stream.startTime, (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(stream.timeBase, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_MILLI_TIME_BASE_Q);
        if (d > duration) {
            duration = d;
        }
        if (s < start || start === -BigInt(1)) {
            start = s;
        }
        bitrate += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](stream.codecpar + 32);
    });
    dump += `  Duration: ${dumpTime(duration)}, start: ${dumpTime(start)}, bitrate: ${dumpBitrate(bitrate)}\n`;
    formatContext.streams.forEach((stream, i) => {
        dump += dumpAVStreamInterface(stream, index, '  ');
    });
    return dump;
}
function dump(formatContexts, inputs) {
    let dump = '';
    formatContexts.forEach((formatContext, index) => {
        if (formatContext instanceof _AVFormatContext__WEBPACK_IMPORTED_MODULE_4__.AVFormatContext) {
            const streams = [];
            for (let i = 0; i < formatContext.streams.length; i++) {
                const stream = formatContext.streams[i];
                streams.push({
                    index: stream.index,
                    id: stream.id,
                    codecpar: stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress],
                    nbFrames: stream.nbFrames,
                    metadata: stream.metadata,
                    duration: stream.duration,
                    startTime: stream.startTime,
                    disposition: stream.disposition,
                    timeBase: stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]
                });
            }
            formatContext = {
                metadata: formatContext.metadata,
                format: formatContext.format,
                streams
            };
        }
        dump += dumpAVFormatContextInterface(formatContext, index, inputs[index]);
    });
    return dump;
}


/***/ }),

/***/ "./src/avformat/formats/OFormat.ts":
/*!*****************************************!*\
  !*** ./src/avformat/formats/OFormat.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OFormatSupportedCodecs: () => (/* binding */ OFormatSupportedCodecs),
/* harmony export */   "default": () => (/* binding */ OFormat)
/* harmony export */ });
/*
 * libmedia abstract format encoder
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
class OFormat {
    type = -1 /* AVFormat.UNKNOWN */;
    destroy(formatContext) { }
}
const OFormatSupportedCodecs = {
    [9 /* AVFormat.AAC */]: [86018 /* AVCodecID.AV_CODEC_ID_AAC */],
    [7 /* AVFormat.AVI */]: [
        86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
        86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
        86018 /* AVCodecID.AV_CODEC_ID_AAC */,
        12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
        27 /* AVCodecID.AV_CODEC_ID_H264 */
    ],
    [11 /* AVFormat.FLAC */]: [86028 /* AVCodecID.AV_CODEC_ID_FLAC */],
    [0 /* AVFormat.FLV */]: [
        86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
        86018 /* AVCodecID.AV_CODEC_ID_AAC */,
        86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
        69645 /* AVCodecID.AV_CODEC_ID_ADPCM_SWF */,
        86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */,
        65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
        65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */,
        12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
        27 /* AVCodecID.AV_CODEC_ID_H264 */,
        173 /* AVCodecID.AV_CODEC_ID_HEVC */,
        225 /* AVCodecID.AV_CODEC_ID_AV1 */,
        167 /* AVCodecID.AV_CODEC_ID_VP9 */,
        196 /* AVCodecID.AV_CODEC_ID_VVC */
    ],
    [4 /* AVFormat.IVF */]: [139 /* AVCodecID.AV_CODEC_ID_VP8 */, 167 /* AVCodecID.AV_CODEC_ID_VP9 */],
    [5 /* AVFormat.MATROSKA */]: [
        86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
        86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
        86018 /* AVCodecID.AV_CODEC_ID_AAC */,
        86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
        86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
        86032 /* AVCodecID.AV_CODEC_ID_ALAC */,
        86020 /* AVCodecID.AV_CODEC_ID_DTS */,
        86056 /* AVCodecID.AV_CODEC_ID_EAC3 */,
        65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */,
        65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
        65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
        139 /* AVCodecID.AV_CODEC_ID_VP8 */,
        167 /* AVCodecID.AV_CODEC_ID_VP9 */,
        225 /* AVCodecID.AV_CODEC_ID_AV1 */,
        27 /* AVCodecID.AV_CODEC_ID_H264 */,
        173 /* AVCodecID.AV_CODEC_ID_HEVC */,
        196 /* AVCodecID.AV_CODEC_ID_VVC */,
        12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
        94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */
    ],
    [6 /* AVFormat.WEBM */]: [
        86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
        86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
        139 /* AVCodecID.AV_CODEC_ID_VP8 */,
        167 /* AVCodecID.AV_CODEC_ID_VP9 */,
        225 /* AVCodecID.AV_CODEC_ID_AV1 */,
        94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */
    ],
    [1 /* AVFormat.MOV */]: [
        86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
        86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
        86018 /* AVCodecID.AV_CODEC_ID_AAC */,
        86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
        86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
        86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
        86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
        167 /* AVCodecID.AV_CODEC_ID_VP9 */,
        225 /* AVCodecID.AV_CODEC_ID_AV1 */,
        27 /* AVCodecID.AV_CODEC_ID_H264 */,
        173 /* AVCodecID.AV_CODEC_ID_HEVC */,
        196 /* AVCodecID.AV_CODEC_ID_VVC */,
        12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
        94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
        94213 /* AVCodecID.AV_CODEC_ID_MOV_TEXT */
    ],
    [8 /* AVFormat.MP3 */]: [86017 /* AVCodecID.AV_CODEC_ID_MP3 */],
    [2 /* AVFormat.MPEGTS */]: [
        86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
        86018 /* AVCodecID.AV_CODEC_ID_AAC */,
        86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
        86019 /* AVCodecID.AV_CODEC_ID_AC3 */, ,
        86020 /* AVCodecID.AV_CODEC_ID_DTS */,
        86065 /* AVCodecID.AV_CODEC_ID_AAC_LATM */,
        86056 /* AVCodecID.AV_CODEC_ID_EAC3 */,
        12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
        225 /* AVCodecID.AV_CODEC_ID_AV1 */,
        27 /* AVCodecID.AV_CODEC_ID_H264 */,
        173 /* AVCodecID.AV_CODEC_ID_HEVC */,
        196 /* AVCodecID.AV_CODEC_ID_VVC */
    ],
    [3 /* AVFormat.OGGS */]: [
        86021 /* AVCodecID.AV_CODEC_ID_VORBIS */
    ],
    [10 /* AVFormat.WAV */]: [],
    [12 /* AVFormat.WEBVTT */]: [94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */]
};


/***/ }),

/***/ "./src/avformat/formats/OMpegtsFormat.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/OMpegtsFormat.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OMpegtsFormat)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../avutil/struct/rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _mpegts_function_createMpegtsContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mpegts/function/createMpegtsContext */ "./src/avformat/formats/mpegts/function/createMpegtsContext.ts");
/* harmony import */ var _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mpegts/struct */ "./src/avformat/formats/mpegts/struct.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mpegts/ompegts */ "./src/avformat/formats/mpegts/ompegts.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var _mpegts_function_createMpegtsStreamContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mpegts/function/createMpegtsStreamContext */ "./src/avformat/formats/mpegts/function/createMpegtsStreamContext.ts");
/* harmony import */ var _bsf_aac_Raw2ADTSFilter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../bsf/aac/Raw2ADTSFilter */ "./src/avformat/bsf/aac/Raw2ADTSFilter.ts");
/* harmony import */ var _bsf_aac_Raw2LATMFilter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../bsf/aac/Raw2LATMFilter */ "./src/avformat/bsf/aac/Raw2LATMFilter.ts");
/* harmony import */ var _bsf_opus_Raw2MpegtsFilter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../bsf/opus/Raw2MpegtsFilter */ "./src/avformat/bsf/opus/Raw2MpegtsFilter.ts");
/* harmony import */ var _bsf_h2645_Avcc2AnnexbFilter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../bsf/h2645/Avcc2AnnexbFilter */ "./src/avformat/bsf/h2645/Avcc2AnnexbFilter.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__3 = "src/avformat/formats/OMpegtsFormat.ts";





















const defaultOMpegtsFormatOptions = {
    pesMaxSize: (15) * 184 + 170,
    delay: 1.4,
    latm: false,
    patPeriod: 0.1
};
class OMpegtsFormat extends _OFormat__WEBPACK_IMPORTED_MODULE_6__["default"] {
    type = 2 /* AVFormat.MPEGTS */;
    context;
    sdtPacket;
    patPacket;
    pmtPacket;
    options;
    firstDtsCheck;
    firstVideoCheck;
    lastPatDst;
    patPeriod;
    constructor(options = {}) {
        super();
        this.context = (0,_mpegts_function_createMpegtsContext__WEBPACK_IMPORTED_MODULE_4__["default"])();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_9__.extend({}, defaultOMpegtsFormatOptions, options);
        this.options.pesMaxSize = this.options.pesMaxSize ? (this.options.pesMaxSize + 14 + 183) / 184 * 184 - 14 : 0;
        this.firstDtsCheck = false;
        this.firstVideoCheck = false;
        this.patPeriod = BigInt(Math.floor(this.options.patPeriod * avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE));
    }
    init(context) {
        context.ioWriter.setEndian(true);
        return 0;
    }
    destroy(context) {
        super.destroy(context);
        common_util_array__WEBPACK_IMPORTED_MODULE_8__.each(context.streams, (stream) => {
            const streamContext = stream.privData;
            if (streamContext.filter) {
                streamContext.filter.destroy();
                streamContext.filter = null;
            }
        });
    }
    writeHeader(context) {
        this.context.pat = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.PAT();
        this.context.pat.program2PmtPid.set(1, 4096);
        this.context.pmt = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.PMT();
        this.context.pmt.programNumber = 1;
        common_util_array__WEBPACK_IMPORTED_MODULE_8__.each(context.streams, (stream) => {
            stream.timeBase.den = 90000;
            stream.timeBase.num = 1;
            const pid = this.context.startPid++;
            if (this.context.pmt.pcrPid <= 0) {
                this.context.pmt.pcrPid = pid;
            }
            let streamType = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getStreamType(stream);
            const streamContext = (0,_mpegts_function_createMpegtsStreamContext__WEBPACK_IMPORTED_MODULE_10__["default"])();
            stream.privData = streamContext;
            const tsPacket = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.TSPacket();
            tsPacket.pid = pid;
            tsPacket.adaptationFieldControl = 0x01;
            streamContext.tsPacket = tsPacket;
            streamContext.pid = pid;
            let filter = null;
            switch (streamType) {
                case 15 /* mpegts.TSStreamType.AUDIO_AAC */:
                    if (this.options.latm) {
                        streamContext.latm = true;
                        streamType = 17 /* mpegts.TSStreamType.AUDIO_AAC_LATM */;
                        filter = new _bsf_aac_Raw2LATMFilter__WEBPACK_IMPORTED_MODULE_12__["default"]();
                    }
                    else {
                        filter = new _bsf_aac_Raw2ADTSFilter__WEBPACK_IMPORTED_MODULE_11__["default"]();
                    }
                    break;
                case 27 /* mpegts.TSStreamType.VIDEO_H264 */:
                case 36 /* mpegts.TSStreamType.VIDEO_HEVC */:
                    filter = new _bsf_h2645_Avcc2AnnexbFilter__WEBPACK_IMPORTED_MODULE_14__["default"]();
                    break;
                case 6 /* mpegts.TSStreamType.PRIVATE_DATA */:
                    if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                        filter = new _bsf_opus_Raw2MpegtsFilter__WEBPACK_IMPORTED_MODULE_13__["default"]();
                    }
                    break;
            }
            if (filter) {
                filter.init(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress], stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]);
            }
            streamContext.filter = filter;
            this.context.pmt.pid2StreamType.set(pid, streamType);
            const pes = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.PES();
            pes.pid = pid;
            pes.streamType = streamType;
            pes.streamId = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getStreamId(stream);
            streamContext.pes = pes;
        });
        this.patPacket = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.SectionPacket();
        this.pmtPacket = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.SectionPacket();
        this.sdtPacket = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.SectionPacket();
        this.sdtPacket.pid = 17 /* mpegts.TSPid.SDT */;
        this.sdtPacket.adaptationFieldControl = 0x01;
        this.patPacket.pid = 0 /* mpegts.TSPid.PAT */;
        this.patPacket.adaptationFieldControl = 0x01;
        this.pmtPacket.pid = 4096;
        this.pmtPacket.adaptationFieldControl = 0x01;
        this.sdtPacket.payload = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getSDTPayload();
        this.patPacket.payload = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getPATPayload(this.context.pat);
        this.pmtPacket.payload = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getPMTPayload(this.context.pmt, context.streams);
        _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(context.ioWriter, this.sdtPacket, this.context);
        _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(context.ioWriter, this.patPacket, this.context);
        _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(context.ioWriter, this.pmtPacket, this.context);
        return 0;
    }
    writeAVPacket(formatContext, avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_20__.warn(`packet\'s size is 0: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__3, 211);
            return;
        }
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_20__.warn(`can not found the stream width the packet\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__3, 218);
            return;
        }
        if (!this.firstDtsCheck) {
            if ((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase)
                < BigInt(Math.floor(this.options.delay * 90000))) {
                this.context.delay = BigInt(Math.floor(this.options.delay * 90000)) - (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase);
            }
            this.firstDtsCheck = true;
            this.lastPatDst = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q);
        }
        if (this.patPeriod > BigInt(0)
            && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q) - this.lastPatDst > this.patPeriod) {
            _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(formatContext.ioWriter, this.sdtPacket, this.context);
            _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(formatContext.ioWriter, this.patPacket, this.context);
            _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(formatContext.ioWriter, this.pmtPacket, this.context);
            this.lastPatDst = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q);
        }
        const streamContext = stream.privData;
        let buffer = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__.getAVPacketData)(avpacket);
        if (streamContext.filter) {
            if (!this.firstVideoCheck
                && !(0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__.hasAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */)
                && stream.codecpar.extradata
                && (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                    || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                    || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                    || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */)) {
                this.firstVideoCheck = true;
                const extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_19__.avMalloc)(stream.codecpar.extradataSize);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_16__.memcpy)(extradata, stream.codecpar.extradata, stream.codecpar.extradataSize);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradata, stream.codecpar.extradataSize);
            }
            streamContext.filter.sendAVPacket(avpacket);
            streamContext.filter.receiveAVPacket(avpacket);
            buffer = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__.getAVPacketData)(avpacket);
        }
        if (!buffer.length) {
            return 0;
        }
        buffer = buffer.slice();
        let currentWrote = false;
        if (streamContext.pesSlices.total + buffer.length > this.options.pesMaxSize
            || stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            if (streamContext.pesSlices.total === 0) {
                streamContext.pesSlices.total = buffer.length;
                streamContext.pesSlices.buffers.push(buffer);
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                    streamContext.pes.dts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) + this.context.delay;
                }
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                    streamContext.pes.pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) + this.context.delay;
                }
                currentWrote = true;
            }
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
                streamContext.pes.randomAccessIndicator = 1;
            }
            _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writePES(formatContext.ioWriter, streamContext.pes, streamContext.pesSlices, stream, this.context);
            streamContext.pesSlices.total = 0;
            streamContext.pesSlices.buffers = [];
        }
        if (!currentWrote) {
            if (streamContext.pesSlices.total === 0) {
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                    streamContext.pes.dts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) + this.context.delay;
                }
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                    streamContext.pes.pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) + this.context.delay;
                }
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
                    streamContext.pes.randomAccessIndicator = 1;
                }
            }
            streamContext.pesSlices.total += buffer.length;
            streamContext.pesSlices.buffers.push(buffer);
        }
        return 0;
    }
    writeTrailer(context) {
        common_util_array__WEBPACK_IMPORTED_MODULE_8__.each(context.streams, (stream) => {
            const streamContext = stream.privData;
            if (streamContext.pesSlices.total) {
                _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writePES(context.ioWriter, streamContext.pes, streamContext.pesSlices, stream, this.context);
            }
            streamContext.pesSlices.total = 0;
            streamContext.pesSlices.buffers = [];
        });
        context.ioWriter.flush();
        return 0;
    }
    flush(context) {
        context.ioWriter.flush();
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/crc32.ts":
/*!*******************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/crc32.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateCRC32: () => (/* binding */ calculateCRC32)
/* harmony export */ });
/*
 * libmedia calculate crc32
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
function calculateCRC32(data) {
    const generatorPolynomial = 0x04C11DB7;
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i] << 24;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x80000000) {
                crc = (crc << 1) ^ generatorPolynomial;
            }
            else {
                crc <<= 1;
            }
        }
    }
    return crc >>> 0;
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/createMpegtsContext.ts":
/*!*********************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/createMpegtsContext.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMpegtsContext)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _struct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../struct */ "./src/avformat/formats/mpegts/struct.ts");
/*
 * libmedia create mpegts context
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


function createMpegtsContext() {
    return {
        currentProgram: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        currentPmtPid: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        tsPacketSize: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        hasPAT: false,
        hasPMT: false,
        tsSliceQueueMap: new Map(),
        pat: new _struct__WEBPACK_IMPORTED_MODULE_1__.PAT(),
        pmt: new _struct__WEBPACK_IMPORTED_MODULE_1__.PMT(),
        program2Pmt: new Map(),
        ioEnd: false,
        startPid: 0x100,
        delay: BigInt(0)
    };
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/createMpegtsStreamContext.ts":
/*!***************************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/createMpegtsStreamContext.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMpegtsStreamContext)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia create mpegts stream context
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

function createMpegtsStreamContext() {
    return {
        pid: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        filter: null,
        tsPacket: null,
        pes: null,
        continuityCounter: 0,
        pesSlices: {
            total: 0,
            buffers: []
        },
        latm: false
    };
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/mpegts.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/mpegts/mpegts.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ISO_639_LANGUAGE_DESCRIPTOR: () => (/* binding */ ISO_639_LANGUAGE_DESCRIPTOR),
/* harmony export */   REGISTRATION_DESCRIPTOR: () => (/* binding */ REGISTRATION_DESCRIPTOR),
/* harmony export */   TS_DVHS_PACKET_SIZE: () => (/* binding */ TS_DVHS_PACKET_SIZE),
/* harmony export */   TS_FEC_PACKET_SIZE: () => (/* binding */ TS_FEC_PACKET_SIZE),
/* harmony export */   TS_PACKET_SIZE: () => (/* binding */ TS_PACKET_SIZE)
/* harmony export */ });
/* unused harmony exports TS_MAX_PACKET_SIZE, NB_PID_MAX, USUAL_SECTION_SIZE, MAX_SECTION_SIZE, PROBE_PACKET_MAX_BUF, PROBE_PACKET_MARGIN, MAX_RESYNC_SIZE, MAX_PES_PAYLOAD, MAX_MP4_DESCR_COUNT, StreamType2AVCodecId */
/*
 * libmedia mpegts identify defined
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
const TS_FEC_PACKET_SIZE = 204;
const TS_DVHS_PACKET_SIZE = 192;
const TS_PACKET_SIZE = 188;
const TS_MAX_PACKET_SIZE = 204;
const NB_PID_MAX = 8192;
const USUAL_SECTION_SIZE = 1024;
const MAX_SECTION_SIZE = 4096;
const PROBE_PACKET_MAX_BUF = 8192;
const PROBE_PACKET_MARGIN = 5;
/**
 * maximum size in which we look for synchronization if
 * synchronization is lost
 */
const MAX_RESYNC_SIZE = 65536;
const MAX_PES_PAYLOAD = 204800;
const MAX_MP4_DESCR_COUNT = 16;
const REGISTRATION_DESCRIPTOR = 0x05;
const ISO_639_LANGUAGE_DESCRIPTOR = 0x0a;
const StreamType2AVCodecId = {
    [15 /* TSStreamType.AUDIO_AAC */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86018 /* AVCodecID.AV_CODEC_ID_AAC */],
    [17 /* TSStreamType.AUDIO_AAC_LATM */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86018 /* AVCodecID.AV_CODEC_ID_AAC */],
    [3 /* TSStreamType.AUDIO_MPEG1 */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86017 /* AVCodecID.AV_CODEC_ID_MP3 */],
    [4 /* TSStreamType.AUDIO_MPEG2 */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86017 /* AVCodecID.AV_CODEC_ID_MP3 */],
    [27 /* TSStreamType.VIDEO_H264 */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 27 /* AVCodecID.AV_CODEC_ID_H264 */],
    [16 /* TSStreamType.VIDEO_MPEG4 */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */],
    [36 /* TSStreamType.VIDEO_HEVC */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 173 /* AVCodecID.AV_CODEC_ID_HEVC */],
    [51 /* TSStreamType.VIDEO_VVC */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 196 /* AVCodecID.AV_CODEC_ID_VVC */],
    [129 /* TSStreamType.AUDIO_AC3 */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86019 /* AVCodecID.AV_CODEC_ID_AC3 */],
    [135 /* TSStreamType.AUDIO_EAC3 */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */]
};


/***/ }),

/***/ "./src/avformat/formats/mpegts/ompegts.ts":
/*!************************************************!*\
  !*** ./src/avformat/formats/mpegts/ompegts.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPATPayload: () => (/* binding */ getPATPayload),
/* harmony export */   getPMTPayload: () => (/* binding */ getPMTPayload),
/* harmony export */   getSDTPayload: () => (/* binding */ getSDTPayload),
/* harmony export */   getStreamId: () => (/* binding */ getStreamId),
/* harmony export */   getStreamType: () => (/* binding */ getStreamType),
/* harmony export */   writePES: () => (/* binding */ writePES),
/* harmony export */   writeSection: () => (/* binding */ writeSection)
/* harmony export */ });
/* unused harmony export writeTSPacket */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _mpegts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mpegts */ "./src/avformat/formats/mpegts/mpegts.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_crc32__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./function/crc32 */ "./src/avformat/formats/mpegts/function/crc32.ts");
var cheap__fileName__0 = "src/avformat/formats/mpegts/ompegts.ts";







function getAdaptationFieldLength(tsPacket) {
    if (tsPacket.adaptationFieldControl !== 0x02 && tsPacket.adaptationFieldControl !== 0x03) {
        return 0;
    }
    if (tsPacket.adaptationFieldControl === 0x02) {
        return _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4;
    }
    let len = 2;
    if (tsPacket.adaptationFieldInfo.pcrFlag) {
        len += 6;
    }
    if (tsPacket.adaptationFieldInfo.opcrFlag) {
        len += 6;
    }
    if (tsPacket.adaptationFieldInfo.splicingPointFlag) {
        len += 1;
    }
    if (tsPacket.adaptationFieldInfo.transportPrivateDataFlag) {
        len += tsPacket.adaptationFieldInfo.transportPrivateData
            ? tsPacket.adaptationFieldInfo.transportPrivateData.length
            : 0;
    }
    if (tsPacket.adaptationFieldInfo.adaptationFieldExtensionFlag) {
        len += tsPacket.adaptationFieldInfo.extension ? tsPacket.adaptationFieldInfo.extension.length : 0;
    }
    if (len > 256) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn('adaptationField size is too large', cheap__fileName__0, 68);
    }
    return len;
}
function getPESHeaderLength(pes) {
    let len = 6;
    const streamId = pes.streamId;
    if (streamId !== 188 /* mpegts.TSStreamId.PROGRAM_STREAM_MAP */
        && streamId !== 190 /* mpegts.TSStreamId.PADDING_STREAM */
        && streamId !== 191 /* mpegts.TSStreamId.PRIVATE_STREAM_2 */
        && streamId !== 240 /* mpegts.TSStreamId.ECM_STREAM */
        && streamId !== 241 /* mpegts.TSStreamId.EMM_STREAM */
        && streamId !== 255 /* mpegts.TSStreamId.PROGRAM_STREAM_DIRECTORY */
        && streamId !== 242 /* mpegts.TSStreamId.DSMCC_STREAM */
        && streamId !== 248 /* mpegts.TSStreamId.TYPE_E_STREAM */) {
        len += 3;
        if (pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT) {
            len += 5;
        }
        if (pes.dts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.dts !== pes.pts) {
            len += 5;
        }
    }
    return len;
}
function writePESPayload(ioWriter, pes, payload, stream, mpegtsContext) {
    const streamContext = stream.privData;
    const tsPacket = streamContext.tsPacket;
    if (pes.pid === mpegtsContext.pmt.pcrPid) {
        tsPacket.adaptationFieldControl = 0x03;
        tsPacket.adaptationFieldInfo.pcrFlag = 1;
        tsPacket.adaptationFieldInfo.pcr = pes.dts * BigInt(300);
    }
    tsPacket.adaptationFieldInfo.randomAccessIndicator = pes.randomAccessIndicator;
    if (pes.randomAccessIndicator) {
        tsPacket.adaptationFieldControl = 0x03;
    }
    let adaptationFieldLength = getAdaptationFieldLength(tsPacket);
    let continuityCounter = streamContext.continuityCounter;
    if (4 + adaptationFieldLength + payload.length <= _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
        tsPacket.payloadUnitStartIndicator = 0x01;
        tsPacket.payload = payload;
        tsPacket.continuityCounter = (continuityCounter++) % 16;
        writeTSPacket(ioWriter, tsPacket, mpegtsContext);
        streamContext.continuityCounter = continuityCounter % 16;
        return;
    }
    let len = _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - (4 + adaptationFieldLength);
    let pos = 0;
    while (pos < payload.length) {
        let next = Math.min(pos + len, payload.length);
        if (pos === 0) {
            tsPacket.payloadUnitStartIndicator = 0x01;
        }
        else {
            tsPacket.payloadUnitStartIndicator = 0x00;
        }
        if (tsPacket.adaptationFieldControl === 0x01 && (next - pos + 4 === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 1)) {
            // padding 至少需要 2 字节
            next--;
        }
        tsPacket.payload = payload.subarray(pos, next);
        tsPacket.continuityCounter = (continuityCounter++) % 16;
        writeTSPacket(ioWriter, tsPacket, mpegtsContext);
        if (pos === 0) {
            tsPacket.adaptationFieldInfo.randomAccessIndicator = 0;
            tsPacket.adaptationFieldControl = 0x01;
            tsPacket.adaptationFieldInfo.pcrFlag = 0;
            adaptationFieldLength = getAdaptationFieldLength(tsPacket);
            len = _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - (4 + adaptationFieldLength);
        }
        pos = next;
    }
    streamContext.continuityCounter = continuityCounter % 16;
}
function getStreamType(stream) {
    const context = stream.privData || {};
    switch (stream.codecpar.codecId) {
        case 1 /* AVCodecID.AV_CODEC_ID_MPEG1VIDEO */:
        case 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */:
            return 2 /* mpegts.TSStreamType.VIDEO_MPEG2 */;
        case 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */:
            return 16 /* mpegts.TSStreamType.VIDEO_MPEG4 */;
        case 27 /* AVCodecID.AV_CODEC_ID_H264 */:
            return 27 /* mpegts.TSStreamType.VIDEO_H264 */;
        case 87 /* AVCodecID.AV_CODEC_ID_CAVS */:
            return 66 /* mpegts.TSStreamType.VIDEO_CAVS */;
        case 173 /* AVCodecID.AV_CODEC_ID_HEVC */:
            return 36 /* mpegts.TSStreamType.VIDEO_HEVC */;
        case 196 /* AVCodecID.AV_CODEC_ID_VVC */:
            return 51 /* mpegts.TSStreamType.VIDEO_VVC */;
        case 116 /* AVCodecID.AV_CODEC_ID_DIRAC */:
            return 209 /* mpegts.TSStreamType.VIDEO_DIRAC */;
        case 70 /* AVCodecID.AV_CODEC_ID_VC1 */:
            return 234 /* mpegts.TSStreamType.VIDEO_VC1 */;
        case 86016 /* AVCodecID.AV_CODEC_ID_MP2 */:
        case 86017 /* AVCodecID.AV_CODEC_ID_MP3 */:
            return stream.codecpar.sampleRate < 32000
                ? 4 /* mpegts.TSStreamType.AUDIO_MPEG2 */
                : 3 /* mpegts.TSStreamType.AUDIO_MPEG1 */;
        case 86018 /* AVCodecID.AV_CODEC_ID_AAC */:
            return context.latm
                ? 17 /* mpegts.TSStreamType.AUDIO_AAC_LATM */
                : 15 /* mpegts.TSStreamType.AUDIO_AAC */;
        case 86065 /* AVCodecID.AV_CODEC_ID_AAC_LATM */:
            return 17 /* mpegts.TSStreamType.AUDIO_AAC_LATM */;
        case 86019 /* AVCodecID.AV_CODEC_ID_AC3 */:
            return 129 /* mpegts.TSStreamType.AUDIO_AC3 */;
        case 86076 /* AVCodecID.AV_CODEC_ID_OPUS */:
        case 225 /* AVCodecID.AV_CODEC_ID_AV1 */:
            return 6 /* mpegts.TSStreamType.PRIVATE_DATA */;
        case 86060 /* AVCodecID.AV_CODEC_ID_TRUEHD */:
            return 131 /* mpegts.TSStreamType.AUDIO_TRUEHD */;
        case 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */:
            return 135 /* mpegts.TSStreamType.AUDIO_EAC3 */;
        case 86020 /* AVCodecID.AV_CODEC_ID_DTS */:
            return 130 /* mpegts.TSStreamType.AUDIO_DTS */;
        case 94209 /* AVCodecID.AV_CODEC_ID_DVB_SUBTITLE */:
        case 98311 /* AVCodecID.AV_CODEC_ID_SMPTE_KLV */:
            return 6 /* mpegts.TSStreamType.PRIVATE_DATA */;
        default:
            return 6 /* mpegts.TSStreamType.PRIVATE_DATA */;
    }
}
function getStreamId(stream) {
    if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
        if (stream.codecpar.codecId === 116 /* AVCodecID.AV_CODEC_ID_DIRAC */) {
            return 253 /* mpegts.TSStreamId.EXTENDED_STREAM_ID */;
        }
        else {
            return 224 /* mpegts.TSStreamId.VIDEO_STREAM_0 */;
        }
    }
    else if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */
        && (stream.codecpar.codecId === 86016 /* AVCodecID.AV_CODEC_ID_MP2 */
            || stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */
            || stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */)) {
        return 192 /* mpegts.TSStreamId.AUDIO_STREAM_0 */;
    }
    else if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */
        && stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
        return 253 /* mpegts.TSStreamId.EXTENDED_STREAM_ID */;
    }
    else if (stream.codecpar.codecType === 2 /* AVMediaType.AVMEDIA_TYPE_DATA */) {
        return 252 /* mpegts.TSStreamId.METADATA_STREAM */;
    }
    else {
        return 189 /* mpegts.TSStreamId.PRIVATE_STREAM_1 */;
    }
}
function getPATPayload(pat) {
    const buffer = new Uint8Array(1024);
    buffer[1] = 0x00;
    buffer[2] = 0xb0;
    // transport_stream_id 1 
    buffer[5] = 1;
    // current_next_indicator
    buffer[6] = (192) | 0x01;
    let pos = 9;
    if (pat.networkPid > -1) {
        pos += 2;
        buffer[pos++] = (224) | ((pat.networkPid >> 8) & 0x1f);
        buffer[pos++] = (pat.networkPid & 0xff);
    }
    pat.program2PmtPid.forEach((pid, programNumber) => {
        buffer[pos++] = (programNumber >> 8) & 0xff;
        buffer[pos++] = programNumber & 0xff;
        buffer[pos++] = (224) | (pid >> 8) & 0x1f;
        buffer[pos++] = pid & 0xff;
    });
    const crcPos = pos;
    pos += 4;
    for (let i = pos; i < _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4; i++) {
        buffer[i] = 0xff;
    }
    const len = (pos - 1) - 3;
    buffer[2] |= ((len >> 8) & 0x0f);
    buffer[3] = len & 0xff;
    // CRC32
    const crc32 = (0,_function_crc32__WEBPACK_IMPORTED_MODULE_6__.calculateCRC32)(buffer.subarray(1, crcPos));
    buffer[crcPos] = (crc32 >> 24) & 0xff;
    buffer[crcPos + 1] = (crc32 >> 16) & 0xff;
    buffer[crcPos + 2] = (crc32 >> 8) & 0xff;
    buffer[crcPos + 3] = crc32 & 0xff;
    return buffer.slice(0, _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4);
}
function getPMTPayload(pmt, streams) {
    const buffer = new Uint8Array(1024);
    buffer[1] = 0x02;
    buffer[2] = 0xb0;
    buffer[4] = ((pmt.programNumber >> 8) & 0x0f);
    buffer[5] = pmt.programNumber & 0xff;
    // current_next_indicator
    buffer[6] = (192) | 0x01;
    let pos = 9;
    buffer[pos++] = (224) | (pmt.pcrPid >> 8) & 0x1f;
    buffer[pos++] = pmt.pcrPid & 0xff;
    const programInfoLengthPos = pos;
    pos += 2;
    function putRegistrationDescriptor(tag) {
        buffer[pos++] = _mpegts__WEBPACK_IMPORTED_MODULE_1__.REGISTRATION_DESCRIPTOR;
        buffer[pos++] = 4;
        buffer[pos++] = tag >> 24;
        buffer[pos++] = tag >> 16;
        buffer[pos++] = tag >> 8;
        buffer[pos++] = tag;
    }
    let len = 0xf000 | (pos - programInfoLengthPos - 2);
    buffer[programInfoLengthPos] = len >> 8;
    buffer[programInfoLengthPos + 1] = len;
    for (let i = 0; i < streams.length; i++) {
        const streamType = getStreamType(streams[i]);
        buffer[pos++] = streamType;
        const streamContext = streams[i].privData;
        buffer[pos++] = (224) | (streamContext.pid >> 8) & 0x1f;
        buffer[pos++] = streamContext.pid & 0xff;
        const descLengthPos = pos;
        pos += 2;
        const codecId = streams[i].codecpar.codecId;
        switch (streams[i].codecpar.codecType) {
            case 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */: {
                if (codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('AC-3'));
                }
                if (codecId === 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('EAC3'));
                }
                if (codecId === 65562 /* AVCodecID.AV_CODEC_ID_S302M */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('BSSD'));
                }
                if (codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('Opus'));
                    buffer[pos++] = 0x7f;
                    buffer[pos++] = 2;
                    buffer[pos++] = 0x80;
                    buffer[pos++] = streams[i].codecpar.chLayout.nbChannels;
                }
                // language und
                buffer[pos++] = _mpegts__WEBPACK_IMPORTED_MODULE_1__.ISO_639_LANGUAGE_DESCRIPTOR;
                buffer[pos++] = 4;
                buffer[pos++] = 117;
                buffer[pos++] = 110;
                buffer[pos++] = 100;
                buffer[pos++] = 0;
                break;
            }
            case 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */: {
                if (codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('AV01'));
                    if (streams[i].codecpar.extradata) {
                        buffer[pos++] = 0x80;
                        buffer[pos++] = streams[i].codecpar.extradataSize;
                        for (let j = 0; j < streams[i].codecpar.extradataSize; j++) {
                            buffer[pos++] = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[2](streams[i].codecpar.extradata + j);
                        }
                    }
                }
            }
        }
        let len = 0xf000 | (pos - descLengthPos - 2);
        buffer[descLengthPos] = len >> 8;
        buffer[descLengthPos + 1] = len;
    }
    const crcPos = pos;
    pos += 4;
    for (let i = pos; i < _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4; i++) {
        buffer[i] = 0xff;
    }
    len = (pos - 1) - 3;
    buffer[2] |= ((len >> 8) & 0x0f);
    buffer[3] = len & 0xff;
    // CRC32
    const crc32 = (0,_function_crc32__WEBPACK_IMPORTED_MODULE_6__.calculateCRC32)(buffer.subarray(1, crcPos));
    buffer[crcPos] = (crc32 >> 24) & 0xff;
    buffer[crcPos + 1] = (crc32 >> 16) & 0xff;
    buffer[crcPos + 2] = (crc32 >> 8) & 0xff;
    buffer[crcPos + 3] = crc32 & 0xff;
    return buffer.slice(0, _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4);
}
function getSDTPayload() {
    const buffer = new Uint8Array(1024);
    buffer[1] = 0x42;
    buffer[2] = 0xf0;
    // transport_stream_id 1 
    buffer[5] = 1;
    // current_next_indicator
    buffer[6] = (192) | 0x01;
    let pos = 9;
    // original_network_id
    buffer[pos++] = 0xff;
    buffer[pos++] = 1;
    buffer[pos++] = 0xff;
    /*
     * put service
     * service id
     */
    buffer[pos++] = 0;
    buffer[pos++] = 1;
    /* currently no EIT info */
    buffer[pos++] = 252;
    const descListLenPtr = pos;
    pos += 2;
    // write only one descriptor for the service name and provider */
    buffer[pos++] = 0x48;
    const descLenPtr = pos++;
    // service_type
    buffer[pos++] = 1;
    const providerName = 'format-js';
    const serviceName = 'Service01';
    buffer[pos++] = providerName.length;
    for (let i = 0; i < providerName.length; i++) {
        buffer[pos] = providerName.charCodeAt(i);
        pos++;
    }
    buffer[pos++] = serviceName.length;
    for (let i = 0; i < serviceName.length; i++) {
        buffer[pos] = serviceName.charCodeAt(i);
        pos++;
    }
    buffer[descLenPtr] = pos - descLenPtr - 1;
    // fill descriptor length 
    let value = (32768) | (0) | (pos - descListLenPtr - 2);
    buffer[descListLenPtr] = (value >> 8) & 0xff;
    buffer[descListLenPtr + 1] = value & 0xff;
    const crcPos = pos;
    pos += 4;
    for (let i = pos; i < _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4; i++) {
        buffer[i] = 0xff;
    }
    const len = (pos - 1) - 3;
    buffer[2] |= ((len >> 8) & 0x0f);
    buffer[3] = len & 0xff;
    // CRC32
    const crc32 = (0,_function_crc32__WEBPACK_IMPORTED_MODULE_6__.calculateCRC32)(buffer.subarray(1, crcPos));
    buffer[crcPos] = (crc32 >> 24) & 0xff;
    buffer[crcPos + 1] = (crc32 >> 16) & 0xff;
    buffer[crcPos + 2] = (crc32 >> 8) & 0xff;
    buffer[crcPos + 3] = crc32 & 0xff;
    return buffer.slice(0, _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4);
}
function writeTSPacket(ioWriter, tsPacket, mpegtsContext) {
    // TODO
    if (mpegtsContext.tsPacketSize === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_DVHS_PACKET_SIZE) {
        // skip ATS field (2-bits copy-control + 30-bits timestamp) for m2ts
        ioWriter.skip(4);
    }
    if (!tsPacket.payload || tsPacket.payload.length === 0) {
        tsPacket.adaptationFieldControl = 0x02;
    }
    if (tsPacket.adaptationFieldControl === 0x01
        && (tsPacket.payload.length + 4) < _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
        tsPacket.adaptationFieldControl = 0x03;
    }
    const pos = ioWriter.getPos();
    ioWriter.writeUint8(0x47);
    let byte = 0;
    if (tsPacket.payloadUnitStartIndicator) {
        // Payload unit start indicator
        byte |= (64);
    }
    byte |= (tsPacket.transportPriority << 5);
    // pid 高 5 位
    byte |= (tsPacket.pid >> 8);
    ioWriter.writeUint8(byte);
    // pid 低 8 位
    ioWriter.writeUint8(tsPacket.pid & 0xff);
    byte = ((tsPacket.transportScramblingControl & 0x03) << 6);
    byte |= ((tsPacket.adaptationFieldControl & 0x03) << 4);
    byte |= (tsPacket.continuityCounter & 0x0f);
    ioWriter.writeUint8(byte);
    let adaptationFieldLength = getAdaptationFieldLength(tsPacket);
    let paddingLen = _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4 - adaptationFieldLength;
    if (tsPacket.payload?.length) {
        paddingLen -= tsPacket.payload.length;
    }
    if (tsPacket.adaptationFieldControl === 0x02 || tsPacket.adaptationFieldControl === 0x03) {
        const now = ioWriter.getPos();
        ioWriter.writeUint8(adaptationFieldLength - 1 + paddingLen);
        byte = ((tsPacket.adaptationFieldInfo.discontinuityIndicator & 0x01) << 7);
        byte |= ((tsPacket.adaptationFieldInfo.randomAccessIndicator & 0x01) << 6);
        byte |= ((tsPacket.adaptationFieldInfo.elementaryStreamPriorityIndicator & 0x01) << 5);
        byte |= ((tsPacket.adaptationFieldInfo.pcrFlag & 0x01) << 4);
        byte |= ((tsPacket.adaptationFieldInfo.opcrFlag & 0x01) << 3);
        byte |= ((tsPacket.adaptationFieldInfo.splicingPointFlag & 0x01) << 2);
        byte |= ((tsPacket.adaptationFieldInfo.transportPrivateDataFlag & 0x01) << 1);
        byte |= (tsPacket.adaptationFieldInfo.adaptationFieldExtensionFlag & 0x01);
        ioWriter.writeUint8(byte);
        if (tsPacket.adaptationFieldInfo.pcrFlag) {
            const pcrLow = Number(tsPacket.adaptationFieldInfo.pcr % BigInt(300));
            const pcrHigh = Number((tsPacket.adaptationFieldInfo.pcr - BigInt(Math.floor(pcrLow))) / BigInt(300));
            ioWriter.writeUint8((pcrHigh >> 25) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 17) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 9) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 1) & 0xff);
            ioWriter.writeUint8((pcrHigh << 7) | (pcrLow >> 8) | 0x7e);
            ioWriter.writeUint8(pcrLow);
        }
        if (tsPacket.adaptationFieldInfo.opcrFlag) {
            const pcrLow = Number(tsPacket.adaptationFieldInfo.pcr % BigInt(300));
            const pcrHigh = Number((tsPacket.adaptationFieldInfo.pcr - BigInt(Math.floor(pcrLow))) / BigInt(300));
            ioWriter.writeUint8((pcrHigh >> 25) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 17) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 9) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 1) & 0xff);
            ioWriter.writeUint8((pcrHigh << 7) | (pcrLow >> 8) | 0x7e);
            ioWriter.writeUint8(pcrLow);
        }
        if (tsPacket.adaptationFieldInfo.splicingPointFlag) {
            ioWriter.writeUint8(tsPacket.adaptationFieldInfo.spliceCountDown);
        }
        if (tsPacket.adaptationFieldInfo.transportPrivateDataFlag) {
            if (tsPacket.adaptationFieldInfo.transportPrivateData
                && tsPacket.adaptationFieldInfo.transportPrivateData.length) {
                ioWriter.writeUint8(tsPacket.adaptationFieldInfo.transportPrivateData.length);
                ioWriter.writeBuffer(tsPacket.adaptationFieldInfo.transportPrivateData);
            }
            else {
                ioWriter.writeUint8(0);
            }
        }
        if (tsPacket.adaptationFieldInfo.adaptationFieldExtensionFlag) {
            if (tsPacket.adaptationFieldInfo.extension && tsPacket.adaptationFieldInfo.extension.length) {
                ioWriter.writeUint8(tsPacket.adaptationFieldInfo.extension.length);
                ioWriter.writeBuffer(tsPacket.adaptationFieldInfo.extension);
            }
            else {
                ioWriter.writeUint8(0);
            }
        }
        const wroteAdaptationFieldLength = Number(ioWriter.getPos() - now);
        if (wroteAdaptationFieldLength < adaptationFieldLength) {
            ioWriter.skip(adaptationFieldLength - wroteAdaptationFieldLength);
        }
        while (paddingLen > 0) {
            ioWriter.writeUint8(0xff);
            paddingLen--;
        }
    }
    if ((tsPacket.adaptationFieldControl === 0x01 || tsPacket.adaptationFieldControl === 0x03)) {
        if (tsPacket.payload?.length) {
            ioWriter.writeBuffer(tsPacket.payload);
        }
    }
    if (Number(ioWriter.getPos() - pos) !== _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`write error data size to ts packet, need ${_mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE}, wrote: ${Number(ioWriter.getPos() - pos)}`, cheap__fileName__0, 641);
    }
    // TODO
    if (mpegtsContext.tsPacketSize === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_FEC_PACKET_SIZE) {
        // 16 crc
        ioWriter.skip(16);
    }
}
function writePts(buffer, pos, fourBits, pts) {
    let value = fourBits << 4 | ((Number(pts >> BigInt(30)) & 0x07) << 1) | 1;
    buffer[pos++] = value;
    value = ((Number(pts >> BigInt(15)) & 0x7fff) << 1) | 1;
    buffer[pos++] = (value >> 8) & 0xff;
    buffer[pos++] = value & 0xff;
    value = (Number(pts & BigInt(0x7fff)) << 1) | 1;
    buffer[pos++] = (value >> 8) & 0xff;
    buffer[pos++] = value & 0xff;
}
function writePES(ioWriter, pes, pesSlices, stream, mpegtsContext) {
    const streamId = pes.streamId;
    const header = new Uint8Array(getPESHeaderLength(pes));
    header[2] = 0x01;
    header[3] = streamId;
    let len = pesSlices.total;
    if (streamId !== 188 /* mpegts.TSStreamId.PROGRAM_STREAM_MAP */
        && streamId !== 190 /* mpegts.TSStreamId.PADDING_STREAM */
        && streamId !== 191 /* mpegts.TSStreamId.PRIVATE_STREAM_2 */
        && streamId !== 240 /* mpegts.TSStreamId.ECM_STREAM */
        && streamId !== 241 /* mpegts.TSStreamId.EMM_STREAM */
        && streamId !== 255 /* mpegts.TSStreamId.PROGRAM_STREAM_DIRECTORY */
        && streamId !== 242 /* mpegts.TSStreamId.DSMCC_STREAM */
        && streamId !== 248 /* mpegts.TSStreamId.TYPE_E_STREAM */) {
        let flags = 0;
        let headerLen = 0;
        if (pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT) {
            headerLen += 5;
            flags |= 0x80;
        }
        if (pes.dts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.dts !== pes.pts) {
            headerLen += 5;
            flags |= 0x40;
        }
        let value = 0x80;
        /* data alignment indicator is required for subtitle and data streams */
        if (stream.codecpar.codecType === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */
            || stream.codecpar.codecType === 2 /* AVMediaType.AVMEDIA_TYPE_DATA */) {
            value |= 0x04;
        }
        header[6] = value;
        header[7] = flags;
        header[8] = headerLen;
        len += (headerLen + 3);
        if (pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT) {
            writePts(header, 9, flags >> 6, pes.pts);
        }
        if (pes.dts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.dts !== pes.pts) {
            writePts(header, 14, 1, pes.dts);
        }
    }
    if (len <= avutil_constant__WEBPACK_IMPORTED_MODULE_5__.UINT16_MAX && stream.codecpar.codecType !== 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
        header[4] = (len >> 8) & 0xff;
        header[5] = len & 0xff;
    }
    writePESPayload(ioWriter, pes, (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_4__["default"])(Uint8Array, [header, ...pesSlices.buffers]), stream, mpegtsContext);
}
function writeSection(ioWriter, packet, mpegtsContext) {
    const adaptationFieldLength = getAdaptationFieldLength(packet);
    let continuityCounter = packet.continuityCounter;
    if (4 + adaptationFieldLength + packet.payload.length <= _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
        packet.payloadUnitStartIndicator = 0x01;
        packet.continuityCounter = (continuityCounter++) % 16;
        writeTSPacket(ioWriter, packet, mpegtsContext);
        packet.continuityCounter = continuityCounter % 16;
        return;
    }
    const len = _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - (4 + adaptationFieldLength);
    let pos = 0;
    const payload = packet.payload;
    while (pos < payload.length) {
        let next = Math.min(pos + len, payload.length);
        if (pos === 0) {
            packet.payloadUnitStartIndicator = 0x01;
        }
        else {
            packet.payloadUnitStartIndicator = 0x00;
        }
        const currentLen = next - pos;
        if (currentLen + 4 === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
            packet.adaptationFieldControl = 0x01;
        }
        else if (adaptationFieldLength === 0 && currentLen + 4 + 1 === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
            // adaptationFieldLength 需要至少 2 byte
            next--;
        }
        packet.payload = payload.subarray(pos, next);
        packet.continuityCounter = (continuityCounter++) % 16;
        writeTSPacket(ioWriter, packet, mpegtsContext);
        pos = next;
    }
    packet.continuityCounter = continuityCounter % 16;
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/struct.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/mpegts/struct.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PAT: () => (/* binding */ PAT),
/* harmony export */   PES: () => (/* binding */ PES),
/* harmony export */   PMT: () => (/* binding */ PMT),
/* harmony export */   SectionPacket: () => (/* binding */ SectionPacket),
/* harmony export */   TSPacket: () => (/* binding */ TSPacket)
/* harmony export */ });
/* unused harmony exports TSPacketAdaptationFieldInfo, TSSliceQueue, ESDescriptor */
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia mpegts struct defined
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

class TSPacketAdaptationFieldInfo {
    discontinuityIndicator = 0;
    randomAccessIndicator = 0;
    elementaryStreamPriorityIndicator = 0;
    pcrFlag = 0;
    opcrFlag = 0;
    splicingPointFlag = 0;
    transportPrivateDataFlag = 0;
    adaptationFieldExtensionFlag = 0;
    pcr = BigInt(0);
    opcr = BigInt(0);
    spliceCountDown = 0;
    transportPrivateData = null;
    extension = null;
}
class TSPacket {
    pos = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
    payloadUnitStartIndicator = 0;
    transportPriority = 0;
    pid = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    adaptationFieldControl = 0;
    continuityCounter = 0;
    transportScramblingControl = 0;
    adaptationFieldInfo = new TSPacketAdaptationFieldInfo();
    payload = null;
}
class TSSliceQueue {
    slices = [];
    totalLength = 0;
    expectedLength = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    randomAccessIndicator = 0;
    pid = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    streamType = 0 /* TSStreamType.NONE */;
    pos = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
}
class PAT {
    versionNumber = 0;
    networkPid = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    program2PmtPid = new Map();
}
class SectionPacket extends TSPacket {
}
class ESDescriptor {
    tag;
    buffer;
}
class PMT {
    versionNumber = 0;
    programNumber = 0;
    pcrPid = 0;
    pid2StreamType = new Map();
    pid2ESDescriptor = new Map();
}
class PES {
    pid = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    streamType = 0 /* TSStreamType.NONE */;
    streamId = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    dts = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
    pts = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
    pos = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
    payload = null;
    data = null;
    randomAccessIndicator = 0;
}


/***/ }),

/***/ "./src/avformat/function/mktag.ts":
/*!****************************************!*\
  !*** ./src/avformat/function/mktag.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mktag)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src/avformat/function/mktag.ts";
/*
 * libmedia string tag to uint32 in little end
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

function mktag(tag) {
    if (tag.length !== 4) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`tag length is not 4, tag: ${tag}`, cheap__fileName__0, 30);
    }
    let value = 0;
    for (let i = 0; i < 4; i++) {
        value = (value << 8) | tag.charCodeAt(i);
    }
    return value;
}


/***/ }),

/***/ "./src/avformat/mux.ts":
/*!*****************************!*\
  !*** ./src/avformat/mux.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flush: () => (/* binding */ flush),
/* harmony export */   open: () => (/* binding */ open),
/* harmony export */   writeAVPacket: () => (/* binding */ writeAVPacket),
/* harmony export */   writeHeader: () => (/* binding */ writeHeader),
/* harmony export */   writeTrailer: () => (/* binding */ writeTrailer)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _formats_OFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formats/OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _dump__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dump */ "./src/avformat/dump.ts");
var cheap__fileName__0 = "src/avformat/mux.ts";








const defaultMuxOptions = {
    paddingZero: false
};
function open(formatContext, options = {}) {
    const opts = common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, defaultMuxOptions, options);
    if (!formatContext.ioWriter) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.fatal('need ioWriter', cheap__fileName__0, 52);
    }
    if (!formatContext.oformat) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.fatal('need oformat', cheap__fileName__0, 55);
    }
    formatContext.options = opts;
    formatContext.processPrivateData = {
        first: new Map()
    };
    let supportCodecs = _formats_OFormat__WEBPACK_IMPORTED_MODULE_4__.OFormatSupportedCodecs[formatContext.oformat.type];
    if (supportCodecs) {
        for (let i = 0; i < formatContext.streams.length; i++) {
            const codecId = formatContext.streams[i].codecpar.codecId;
            if (formatContext.oformat.type === 10 /* AVFormat.WAV */) {
                if (codecId < 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */
                    || codecId > 69683 /* AVCodecID.AV_CODEC_ID_ADPCM_XMD */) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`format ${(0,_dump__WEBPACK_IMPORTED_MODULE_7__.dumpFormatName)(formatContext.oformat.type)} not support codecId ${(0,_dump__WEBPACK_IMPORTED_MODULE_7__.dumpCodecName)(formatContext.streams[i].codecpar.codecType, codecId)}`, cheap__fileName__0, 71);
                    return avutil_error__WEBPACK_IMPORTED_MODULE_6__.CODEC_NOT_SUPPORT;
                }
            }
            else if (!common_util_array__WEBPACK_IMPORTED_MODULE_5__.has(supportCodecs, codecId)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`format ${(0,_dump__WEBPACK_IMPORTED_MODULE_7__.dumpFormatName)(formatContext.oformat.type)} not support codecId ${(0,_dump__WEBPACK_IMPORTED_MODULE_7__.dumpCodecName)(formatContext.streams[i].codecpar.codecType, codecId)}`, cheap__fileName__0, 76);
                return avutil_error__WEBPACK_IMPORTED_MODULE_6__.CODEC_NOT_SUPPORT;
            }
        }
    }
    return formatContext.oformat.init(formatContext);
}
function writeHeader(formatContext) {
    formatContext.oformat.writeHeader(formatContext);
    return 0;
}
function writeAVPacket(formatContext, avpacket) {
    const privateData = formatContext.processPrivateData;
    if (!privateData.first.has(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32))) {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) > BigInt(0)) {
            privateData.first.set(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16));
        }
        else {
            privateData.first.set(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32), BigInt(0));
        }
    }
    if (formatContext.options.paddingZero) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) - privateData.first.get(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8) - privateData.first.get(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)));
    }
    return formatContext.oformat.writeAVPacket(formatContext, avpacket);
}
function writeTrailer(formatContext) {
    formatContext.oformat.writeTrailer(formatContext);
    return 0;
}
function flush(formatContext) {
    formatContext.oformat.flush(formatContext);
}


/***/ }),

/***/ "./src/avutil/constant.ts":
/*!********************************!*\
  !*** ./src/avutil/constant.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AV_MILLI_TIME_BASE_Q: () => (/* binding */ AV_MILLI_TIME_BASE_Q),
/* harmony export */   AV_TIME_BASE: () => (/* binding */ AV_TIME_BASE),
/* harmony export */   AV_TIME_BASE_Q: () => (/* binding */ AV_TIME_BASE_Q),
/* harmony export */   NOPTS_VALUE: () => (/* binding */ NOPTS_VALUE),
/* harmony export */   NOPTS_VALUE_BIGINT: () => (/* binding */ NOPTS_VALUE_BIGINT),
/* harmony export */   UINT16_MAX: () => (/* binding */ UINT16_MAX)
/* harmony export */ });
/* unused harmony exports AV_MILLI_TIME_BASE, AV_TIME_BASE1_Q, INT8_MAX, INT16_MAX, INT32_MAX, INT8_MIN, INT16_MIN, INT32_MIN, UINT8_MAX, UINT32_MAX */
/* harmony import */ var _struct_rational__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./struct/rational */ "./src/avutil/struct/rational.ts");
/*
 * libmedia constant
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

const NOPTS_VALUE_BIGINT = -BigInt(1);
const NOPTS_VALUE = -1;
const AV_TIME_BASE = 1000000;
const AV_MILLI_TIME_BASE = 1000;
/**
 * 微秒时间基
 */
const AV_TIME_BASE_Q = new _struct_rational__WEBPACK_IMPORTED_MODULE_0__.Rational({ den: AV_TIME_BASE, num: 1 });
/**
 * 毫秒时间基
 */
const AV_MILLI_TIME_BASE_Q = new _struct_rational__WEBPACK_IMPORTED_MODULE_0__.Rational({ den: AV_MILLI_TIME_BASE, num: 1 });
/**
 * 秒时间基
 */
const AV_TIME_BASE1_Q = new _struct_rational__WEBPACK_IMPORTED_MODULE_0__.Rational({ den: 1, num: 1 });
const INT8_MAX = 127;
const INT16_MAX = 32767;
const INT32_MAX = 2147483647;
const INT8_MIN = -128;
const INT16_MIN = -32768;
const INT32_MIN = -INT32_MAX - 1;
const UINT8_MAX = 255;
const UINT16_MAX = 65535;
const UINT32_MAX = 4294967295;


/***/ }),

/***/ "./src/avutil/error.ts":
/*!*****************************!*\
  !*** ./src/avutil/error.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CODEC_NOT_SUPPORT: () => (/* binding */ CODEC_NOT_SUPPORT),
/* harmony export */   DATA_INVALID: () => (/* binding */ DATA_INVALID),
/* harmony export */   EOF: () => (/* binding */ EOF)
/* harmony export */ });
/* unused harmony exports FORMAT_NOT_SUPPORT, INVALID_ARGUMENT, NO_MEMORY, INVALID_OPERATE, EAGAIN */
/*
 * libmedia error defined
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
const FORMAT_NOT_SUPPORT = -1;
const DATA_INVALID = -2;
const INVALID_ARGUMENT = -3;
const NO_MEMORY = -4;
const INVALID_OPERATE = -5;
const EAGAIN = -6;
const EOF = -7;
const CODEC_NOT_SUPPORT = -8;


/***/ }),

/***/ "./src/avutil/pixelFormatDescriptor.ts":
/*!*********************************************!*\
  !*** ./src/avutil/pixelFormatDescriptor.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PixelFormatDescriptorsMap: () => (/* binding */ PixelFormatDescriptorsMap)
/* harmony export */ });
/*
 * libmedia pixel format descriptor
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
const PixelFormatDescriptorsMap = {
    /**
     * 1 字节
     */
    [0 /* AVPixelFormat.AV_PIX_FMT_YUV420P */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            }
        ]
    },
    [12 /* AVPixelFormat.AV_PIX_FMT_YUVJ420P */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            }
        ]
    },
    [4 /* AVPixelFormat.AV_PIX_FMT_YUV422P */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            }
        ]
    },
    [13 /* AVPixelFormat.AV_PIX_FMT_YUVJ422P */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            }
        ]
    },
    [5 /* AVPixelFormat.AV_PIX_FMT_YUV444P */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            }
        ]
    },
    [14 /* AVPixelFormat.AV_PIX_FMT_YUVJ444P */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            }
        ]
    },
    [23 /* AVPixelFormat.AV_PIX_FMT_NV12 */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 1,
                step: 2,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 1,
                step: 2,
                offset: 1,
                shift: 0,
                depth: 8
            }
        ]
    },
    /**
     * 2 字节 yuv420
     */
    [59 /* AVPixelFormat.AV_PIX_FMT_YUV420P9BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            }
        ]
    },
    [60 /* AVPixelFormat.AV_PIX_FMT_YUV420P9LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            }
        ]
    },
    [61 /* AVPixelFormat.AV_PIX_FMT_YUV420P10BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            }
        ]
    },
    [62 /* AVPixelFormat.AV_PIX_FMT_YUV420P10LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            }
        ]
    },
    [122 /* AVPixelFormat.AV_PIX_FMT_YUV420P12BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            }
        ]
    },
    [123 /* AVPixelFormat.AV_PIX_FMT_YUV420P12LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            }
        ]
    },
    [124 /* AVPixelFormat.AV_PIX_FMT_YUV420P14BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            }
        ]
    },
    [125 /* AVPixelFormat.AV_PIX_FMT_YUV420P14LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            }
        ]
    },
    [46 /* AVPixelFormat.AV_PIX_FMT_YUV420P16BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            }
        ]
    },
    [45 /* AVPixelFormat.AV_PIX_FMT_YUV420P16LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            }
        ]
    },
    /**
     * 2 字节 yuv422
     */
    [69 /* AVPixelFormat.AV_PIX_FMT_YUV422P9BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            }
        ]
    },
    [70 /* AVPixelFormat.AV_PIX_FMT_YUV422P9LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            }
        ]
    },
    [63 /* AVPixelFormat.AV_PIX_FMT_YUV422P10BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            }
        ]
    },
    [64 /* AVPixelFormat.AV_PIX_FMT_YUV422P10LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            }
        ]
    },
    [126 /* AVPixelFormat.AV_PIX_FMT_YUV422P12BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            }
        ]
    },
    [127 /* AVPixelFormat.AV_PIX_FMT_YUV422P12LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            }
        ]
    },
    [128 /* AVPixelFormat.AV_PIX_FMT_YUV422P14BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            }
        ]
    },
    [129 /* AVPixelFormat.AV_PIX_FMT_YUV422P14LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            }
        ]
    },
    [48 /* AVPixelFormat.AV_PIX_FMT_YUV422P16BE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            }
        ]
    },
    [47 /* AVPixelFormat.AV_PIX_FMT_YUV422P16LE */]: {
        nbComponents: 3,
        log2ChromaW: 1,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            }
        ]
    },
    /**
     * 2 字节 yuv444
     */
    [65 /* AVPixelFormat.AV_PIX_FMT_YUV444P9BE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            }
        ]
    },
    [66 /* AVPixelFormat.AV_PIX_FMT_YUV444P9LE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 9
            }
        ]
    },
    [67 /* AVPixelFormat.AV_PIX_FMT_YUV444P10BE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            }
        ]
    },
    [68 /* AVPixelFormat.AV_PIX_FMT_YUV444P10LE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 10
            }
        ]
    },
    [130 /* AVPixelFormat.AV_PIX_FMT_YUV444P12BE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            }
        ]
    },
    [131 /* AVPixelFormat.AV_PIX_FMT_YUV444P12LE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 12
            }
        ]
    },
    [132 /* AVPixelFormat.AV_PIX_FMT_YUV444P14BE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            }
        ]
    },
    [133 /* AVPixelFormat.AV_PIX_FMT_YUV444P14LE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 14
            }
        ]
    },
    [50 /* AVPixelFormat.AV_PIX_FMT_YUV444P16BE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 1 /* PixelFormatFlags.BIG_ENDIAN */ | 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            }
        ]
    },
    [49 /* AVPixelFormat.AV_PIX_FMT_YUV444P16LE */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 16 /* PixelFormatFlags.PLANER */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 16
            }
        ]
    },
    [26 /* AVPixelFormat.AV_PIX_FMT_RGBA */]: {
        nbComponents: 4,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 32 /* PixelFormatFlags.RGB */ | 128 /* PixelFormatFlags.ALPHA */,
        comp: [
            {
                plane: 0,
                step: 4,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 1,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 2,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 3,
                shift: 0,
                depth: 8
            }
        ]
    },
    [119 /* AVPixelFormat.AV_PIX_FMT_RGB0 */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 32 /* PixelFormatFlags.RGB */,
        comp: [
            {
                plane: 0,
                step: 4,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 1,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 2,
                shift: 0,
                depth: 8
            }
        ]
    },
    [28 /* AVPixelFormat.AV_PIX_FMT_BGRA */]: {
        nbComponents: 4,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 32 /* PixelFormatFlags.RGB */ | 128 /* PixelFormatFlags.ALPHA */,
        comp: [
            {
                plane: 0,
                step: 4,
                offset: 2,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 1,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 3,
                shift: 0,
                depth: 8
            }
        ]
    },
    [121 /* AVPixelFormat.AV_PIX_FMT_BGR0 */]: {
        nbComponents: 3,
        log2ChromaW: 0,
        log2ChromaH: 0,
        flags: 32 /* PixelFormatFlags.RGB */,
        comp: [
            {
                plane: 0,
                step: 4,
                offset: 2,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 1,
                shift: 0,
                depth: 8
            },
            {
                plane: 0,
                step: 4,
                offset: 0,
                shift: 0,
                depth: 8
            }
        ]
    },
    [33 /* AVPixelFormat.AV_PIX_FMT_YUVA420P */]: {
        nbComponents: 4,
        log2ChromaW: 1,
        log2ChromaH: 1,
        flags: 16 /* PixelFormatFlags.PLANER */ | 128 /* PixelFormatFlags.ALPHA */,
        comp: [
            {
                plane: 0,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 1,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 2,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            },
            {
                plane: 3,
                step: 1,
                offset: 0,
                shift: 0,
                depth: 8
            }
        ]
    }
};


/***/ }),

/***/ "./src/avutil/stringEnum.ts":
/*!**********************************!*\
  !*** ./src/avutil/stringEnum.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudioCodecString2CodecId: () => (/* binding */ AudioCodecString2CodecId),
/* harmony export */   Format2AVFormat: () => (/* binding */ Format2AVFormat),
/* harmony export */   PixfmtString2AVPixelFormat: () => (/* binding */ PixfmtString2AVPixelFormat),
/* harmony export */   SampleFmtString2SampleFormat: () => (/* binding */ SampleFmtString2SampleFormat),
/* harmony export */   VideoCodecString2CodecId: () => (/* binding */ VideoCodecString2CodecId),
/* harmony export */   colorRange2AVColorRange: () => (/* binding */ colorRange2AVColorRange),
/* harmony export */   colorSpace2AVColorSpace: () => (/* binding */ colorSpace2AVColorSpace),
/* harmony export */   disposition2AVDisposition: () => (/* binding */ disposition2AVDisposition),
/* harmony export */   mediaType2AVMediaType: () => (/* binding */ mediaType2AVMediaType)
/* harmony export */ });
/* unused harmony exports Ext2Format, Ext2IOLoader, colorPrimaries2AVColorPrimaries, colorTrc2AVColorTransferCharacteristic */
const Ext2Format = {
    'flv': 0 /* AVFormat.FLV */,
    'mp4': 1 /* AVFormat.MOV */,
    'mov': 1 /* AVFormat.MOV */,
    'ts': 2 /* AVFormat.MPEGTS */,
    'ivf': 4 /* AVFormat.IVF */,
    'opus': 3 /* AVFormat.OGGS */,
    'ogg': 3 /* AVFormat.OGGS */,
    'm3u8': 2 /* AVFormat.MPEGTS */,
    'm3u': 2 /* AVFormat.MPEGTS */,
    'mpd': 1 /* AVFormat.MOV */,
    'mp3': 8 /* AVFormat.MP3 */,
    'mkv': 5 /* AVFormat.MATROSKA */,
    'mka': 5 /* AVFormat.MATROSKA */,
    'webm': 6 /* AVFormat.WEBM */,
    'aac': 9 /* AVFormat.AAC */,
    'flac': 11 /* AVFormat.FLAC */,
    'wav': 10 /* AVFormat.WAV */
};
const Ext2IOLoader = {
    'm3u8': 2 /* IOType.HLS */,
    'm3u': 2 /* IOType.HLS */,
    'mpd': 3 /* IOType.DASH */
};
const VideoCodecString2CodecId = {
    'copy': 0 /* AVCodecID.AV_CODEC_ID_NONE */,
    'h264': 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    'avc': 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    'hevc': 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    'h265': 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    'vvc': 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    'h266': 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    'av1': 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    'vp9': 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    'vp8': 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    'mpeg4': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */
};
const AudioCodecString2CodecId = {
    'copy': 0 /* AVCodecID.AV_CODEC_ID_NONE */,
    'aac': 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    'mp3': 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    'opus': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'flac': 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    'speex': 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    'vorbis': 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    'g711a': 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
    'g711u': 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */
};
const PixfmtString2AVPixelFormat = {
    'yuv420p': 0 /* AVPixelFormat.AV_PIX_FMT_YUV420P */,
    'yuv422p': 4 /* AVPixelFormat.AV_PIX_FMT_YUV422P */,
    'yuv444p': 5 /* AVPixelFormat.AV_PIX_FMT_YUV444P */,
    'yuv420p10le': 62 /* AVPixelFormat.AV_PIX_FMT_YUV420P10LE */,
    'yuv422p10le': 64 /* AVPixelFormat.AV_PIX_FMT_YUV422P10LE */,
    'yuv444p10le': 68 /* AVPixelFormat.AV_PIX_FMT_YUV444P10LE */,
    'yuv420p10be': 61 /* AVPixelFormat.AV_PIX_FMT_YUV420P10BE */,
    'yuv422p10be': 63 /* AVPixelFormat.AV_PIX_FMT_YUV422P10BE */,
    'yuv444p10be': 67 /* AVPixelFormat.AV_PIX_FMT_YUV444P10BE */,
};
const SampleFmtString2SampleFormat = {
    'u8': 0 /* AVSampleFormat.AV_SAMPLE_FMT_U8 */,
    'u8p': 5 /* AVSampleFormat.AV_SAMPLE_FMT_U8P */,
    's16': 1 /* AVSampleFormat.AV_SAMPLE_FMT_S16 */,
    's16p': 6 /* AVSampleFormat.AV_SAMPLE_FMT_S16P */,
    's32': 2 /* AVSampleFormat.AV_SAMPLE_FMT_S32 */,
    's32p': 7 /* AVSampleFormat.AV_SAMPLE_FMT_S32P */,
    's64': 10 /* AVSampleFormat.AV_SAMPLE_FMT_S64 */,
    's64p': 11 /* AVSampleFormat.AV_SAMPLE_FMT_S64P */,
    'float': 3 /* AVSampleFormat.AV_SAMPLE_FMT_FLT */,
    'floatp': 8 /* AVSampleFormat.AV_SAMPLE_FMT_FLTP */,
    'double': 4 /* AVSampleFormat.AV_SAMPLE_FMT_DBL */,
    'doublep': 9 /* AVSampleFormat.AV_SAMPLE_FMT_DBLP */,
};
const Format2AVFormat = {
    'flv': 0 /* AVFormat.FLV */,
    'mp4': 1 /* AVFormat.MOV */,
    'mov': 1 /* AVFormat.MOV */,
    'ts': 2 /* AVFormat.MPEGTS */,
    'mpegts': 2 /* AVFormat.MPEGTS */,
    'ivf': 4 /* AVFormat.IVF */,
    'opus': 3 /* AVFormat.OGGS */,
    'ogg': 3 /* AVFormat.OGGS */,
    'm3u8': 2 /* AVFormat.MPEGTS */,
    'm3u': 2 /* AVFormat.MPEGTS */,
    'mpd': 1 /* AVFormat.MOV */,
    'mp3': 8 /* AVFormat.MP3 */,
    'mkv': 5 /* AVFormat.MATROSKA */,
    'matroska': 5 /* AVFormat.MATROSKA */,
    'mka': 5 /* AVFormat.MATROSKA */,
    'webm': 6 /* AVFormat.WEBM */,
    'aac': 9 /* AVFormat.AAC */,
    'flac': 11 /* AVFormat.FLAC */,
    'wav': 10 /* AVFormat.WAV */
};
const colorRange2AVColorRange = {
    'tv': 1 /* AVColorRange.AVCOL_RANGE_MPEG */,
    'pc': 2 /* AVColorRange.AVCOL_RANGE_JPEG */
};
const colorSpace2AVColorSpace = {
    'bt709': 1 /* AVColorSpace.AVCOL_SPC_BT709 */,
    'fcc': 4 /* AVColorSpace.AVCOL_SPC_FCC */,
    'bt470bg': 5 /* AVColorSpace.AVCOL_SPC_BT470BG */,
    'smpte170m': 6 /* AVColorSpace.AVCOL_SPC_SMPTE170M */,
    'smpte240m': 7 /* AVColorSpace.AVCOL_SPC_SMPTE240M */,
    'ycgco': 8 /* AVColorSpace.AVCOL_SPC_YCGCO */,
    'gbr': 0 /* AVColorSpace.AVCOL_SPC_RGB */,
    'bt2020ncl': 9 /* AVColorSpace.AVCOL_SPC_BT2020_NCL */
};
const colorPrimaries2AVColorPrimaries = {
    'bt709': 1 /* AVColorPrimaries.AVCOL_PRI_BT709 */,
    'bt470m': 4 /* AVColorPrimaries.AVCOL_PRI_BT470M */,
    'bt470bg': 5 /* AVColorPrimaries.AVCOL_PRI_BT470BG */,
    'smpte170m': 6 /* AVColorPrimaries.AVCOL_PRI_SMPTE170M */,
    'smpte240m': 7 /* AVColorPrimaries.AVCOL_PRI_SMPTE240M */,
    'smpte428': 10 /* AVColorPrimaries.AVCOL_PRI_SMPTE428 */,
    'film': 8 /* AVColorPrimaries.AVCOL_PRI_FILM */,
    'smpte431': 11 /* AVColorPrimaries.AVCOL_PRI_SMPTE431 */,
    'smpte432': 12 /* AVColorPrimaries.AVCOL_PRI_SMPTE432 */,
    'bt2020': 9 /* AVColorPrimaries.AVCOL_PRI_BT2020 */,
    'jedec-p22': 22 /* AVColorPrimaries.AVCOL_PRI_JEDEC_P22 */,
    'ebu3213': 22 /* AVColorPrimaries.AVCOL_PRI_EBU3213 */
};
const colorTrc2AVColorTransferCharacteristic = {
    'bt709': 1 /* AVColorTransferCharacteristic.AVCOL_TRC_BT709 */,
    'gamma22': 4 /* AVColorTransferCharacteristic.AVCOL_TRC_GAMMA22 */,
    'gamma28': 5 /* AVColorTransferCharacteristic.AVCOL_TRC_GAMMA28 */,
    'smpte170m': 6 /* AVColorTransferCharacteristic.AVCOL_TRC_SMPTE170M */,
    'smpte240m': 7 /* AVColorTransferCharacteristic.AVCOL_TRC_SMPTE240M */,
    'srgb': 13 /* AVColorTransferCharacteristic.AVCOL_TRC_IEC61966_2_1 */,
    'xvycc': 11 /* AVColorTransferCharacteristic.AVCOL_TRC_IEC61966_2_4 */,
    'bt2020-10': 14 /* AVColorTransferCharacteristic.AVCOL_TRC_BT2020_10 */,
    'bt2020-12': 15 /* AVColorTransferCharacteristic.AVCOL_TRC_BT2020_12 */
};
const mediaType2AVMediaType = {
    'Audio': 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
    'Video': 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */,
    'Subtitle': 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */,
    'Attachment': 4 /* AVMediaType.AVMEDIA_TYPE_ATTACHMENT */,
    'Data': 2 /* AVMediaType.AVMEDIA_TYPE_DATA */
};
const disposition2AVDisposition = {
    'default': 1 /* AVDisposition.DEFAULT */,
    'dub': 2 /* AVDisposition.DUB */,
    'original': 4 /* AVDisposition.ORIGINAL */,
    'comment': 8 /* AVDisposition.COMMENT */,
    'lyrics': 16 /* AVDisposition.LYRICS */,
    'karaoke': 32 /* AVDisposition.KARAOKE */,
    'forced': 64 /* AVDisposition.FORCED */,
    'hearing impaired': 128 /* AVDisposition.HEARING_IMPAIRED */,
    'visual impaired': 256 /* AVDisposition.VISUAL_IMPAIRED */,
    'clean effects': 512 /* AVDisposition.CLEAN_EFFECTS */,
    'attached pic': 1024 /* AVDisposition.ATTACHED_PIC */,
    'timed thumbnails': 2048 /* AVDisposition.TIMED_THUMBNAILS */,
    'captions': 65536 /* AVDisposition.CAPTIONS */,
    'descriptions': 131072 /* AVDisposition.DESCRIPTIONS */,
    'metadata': 262144 /* AVDisposition.METADATA */,
    'dependent': 524288 /* AVDisposition.DEPENDENT */,
    'still image': 1048576 /* AVDisposition.STILL_IMAGE */
};


/***/ }),

/***/ "./src/avutil/struct/audiosample.ts":
/*!******************************************!*\
  !*** ./src/avutil/struct/audiosample.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVChannelLayout: () => (/* binding */ AVChannelLayout)
/* harmony export */ });
/* unused harmony export AVChannelCustom */
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/function/definedMetaProperty */ "./src/cheap/function/definedMetaProperty.ts");


class AVChannelCustom {
    id;
    name;
    opaque;
}
(function (prototype) {
    var map = new Map();
    map.set("id", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("name", { 0: 4, 1: 0, 2: 0, 3: 1, 4: 16, 5: 0, 6: 0, 7: 4, 8: 0 });
    map.set("opaque", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 20, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 24);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(AVChannelCustom.prototype);
class AVChannelLayout {
    /**
     * Channel order used in this layout.
     * This is a mandatory field.
     */
    order;
    /**
     * Number of channels in this layout. Mandatory field.
     */
    nbChannels;
    /**
     * Details about which channels are present in this layout.
     * For AV_CHANNEL_ORDER_UNSPEC, this field is undefined and must not be
     * used.
     */
    u;
    /**
     * For some private data of the user.
     */
    opaque;
}
(function (prototype) {
    var map = new Map();
    map.set("order", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("nbChannels", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 4, 8: 0 });
    map.set("u", { 0: (function (prototype) {
            var map = new Map();
            map.set("mask", { 0: 10, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
            map.set("map", { 0: AVChannelCustom, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
            (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
            (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 8);
            (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 8);
            (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
            return prototype;
        })({}), 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 8, 8: 0 });
    map.set("opaque", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 16, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 8);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 24);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(AVChannelLayout.prototype);


/***/ }),

/***/ "./src/avutil/struct/avbuffer.ts":
/*!***************************************!*\
  !*** ./src/avutil/struct/avbuffer.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVBufferRef: () => (/* binding */ AVBufferRef)
/* harmony export */ });
/* unused harmony exports AVBuffer, AVBufferPool, BufferPoolEntry */
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/function/definedMetaProperty */ "./src/cheap/function/definedMetaProperty.ts");
/* harmony import */ var _cheap_thread_mutex_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cheap/thread/mutex.ts */ "./src/cheap/thread/mutex.ts");
/* harmony import */ var _util_mem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/mem */ "./src/avutil/util/mem.ts");
var cheap__BufferPoolEntry__16;



/*
 * libmedia AVBuffer defined
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

class AVBuffer {
    /**
     * data described by this buffer
     */
    data = 0;
    /**
     * size of data in bytes
     */
    size = 0;
    /**
     *  number of existing AVBufferRef instances referring to this buffer
     */
    refcount = 0;
    /**
     * a callback for freeing the data
     */
    free = 0;
    /**
     * an opaque pointer, to be used by the freeing callback
     */
    opaque = 0;
    /**
     * A combination of AV_BUFFER_FLAG_*
     */
    flags = 0 /* AVBufferFlags.NONE */;
    /**
     * A combination of BUFFER_FLAG_*
     */
    flagsInternal = 0;
}
(function (prototype) {
    var map = new Map();
    map.set("data", { 0: 2, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("size", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 4, 8: 0 });
    map.set("refcount", { 0: 9, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 8, 8: 0 });
    map.set("free", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 12, 8: 0 });
    map.set("opaque", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 16, 8: 0 });
    map.set("flags", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 20, 8: 0 });
    map.set("flagsInternal", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 24, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 28);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(AVBuffer.prototype);
function avbufferDefaultFree(opaque, data) {
    (0,_util_mem__WEBPACK_IMPORTED_MODULE_3__.avFree)(data);
}
class AVBufferRef {
    buffer = 0;
    /**
     * The data buffer. It is considered writable if and only if
     * this is the only reference to the buffer, in which case
     * av_buffer_is_writable() returns 1.
     */
    data = 0;
    /**
     * Size of data in bytes.
     */
    size = 0;
}
(function (prototype) {
    var map = new Map();
    map.set("buffer", { 0: AVBuffer, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("data", { 0: 2, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 4, 8: 0 });
    map.set("size", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 8, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 12);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(AVBufferRef.prototype);
class AVBufferPool {
    mutex;
    pool = 0;
    /**
     *  number of existing AVBufferRef instances referring to this buffer
     */
    refcount = 0;
    /**
     * Size of data in bytes.
     */
    size = 0;
    /**
     * an opaque pointer, to be used by the freeing callback
     */
    opaque = 0;
    alloc = 0;
    alloc2 = 0;
    poolFree = 0;
}
(function (prototype) {
    var map = new Map();
    map.set("mutex", { 0: _cheap_thread_mutex_ts__WEBPACK_IMPORTED_MODULE_2__.Mutex, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("pool", { 0: cheap__BufferPoolEntry__16, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 4, 8: 0 });
    map.set("refcount", { 0: 9, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 8, 8: 0 });
    map.set("size", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 12, 8: 0 });
    map.set("opaque", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 16, 8: 0 });
    map.set("alloc", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 20, 8: 0 });
    map.set("alloc2", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 24, 8: 0 });
    map.set("poolFree", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 28, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 32);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(AVBufferPool.prototype);
class BufferPoolEntry {
    data = 0;
    /**
     * an opaque pointer, to be used by the freeing callback
     */
    opaque = 0;
    /**
     * a callback for freeing the data
     */
    free = 0;
    pool = 0;
    next = 0;
    /*
     * An AVBuffer structure to (re)use as AVBuffer for subsequent uses
     * of this BufferPoolEntry.
     */
    buffer;
}
(function (prototype) {
    var map = new Map();
    map.set("data", { 0: 2, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("opaque", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 4, 8: 0 });
    map.set("free", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 8, 8: 0 });
    map.set("pool", { 0: AVBufferPool, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 12, 8: 0 });
    map.set("next", { 0: BufferPoolEntry, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 16, 8: 0 });
    map.set("buffer", { 0: AVBuffer, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 20, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 48);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(BufferPoolEntry.prototype);
cheap__BufferPoolEntry__16 = BufferPoolEntry;


/***/ }),

/***/ "./src/avutil/struct/avcodecparameters.ts":
/*!************************************************!*\
  !*** ./src/avutil/struct/avcodecparameters.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AVCodecParameters)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/function/definedMetaProperty */ "./src/cheap/function/definedMetaProperty.ts");
/* harmony import */ var _avpacket_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./avpacket.ts */ "./src/avutil/struct/avpacket.ts");
/* harmony import */ var _rational_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rational */ "./src/avutil/struct/rational.ts");
/* harmony import */ var _audiosample_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./audiosample.ts */ "./src/avutil/struct/audiosample.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");
/* harmony import */ var _util_codecparameters__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/codecparameters */ "./src/avutil/util/codecparameters.ts");





/*
 * libmedia AVCodecParameters defined
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




/**
 * FFmpeg AVCodecParameters 定义
 */
class AVCodecParameters {
    /**
     * General type of the encoded data.
     */
    codecType = -1 /* AVMediaType.AVMEDIA_TYPE_UNKNOWN */;
    /**
     * Specific type of the encoded data (the codec used).
     */
    codecId = 0 /* AVCodecID.AV_CODEC_ID_NONE */;
    /**
     * Additional information about the codec (corresponds to the AVI FOURCC).
     */
    codecTag = 0;
    /**
     * Extra binary data needed for initializing the decoder, codec-dependent.
     *
     * Must be allocated with av_malloc() and will be freed by
     * avcodec_parameters_free(). The allocated size of extradata must be at
     * least extradata_size + AV_INPUT_BUFFER_PADDING_SIZE, with the padding
     * bytes zeroed.
     */
    extradata = 0;
    extradataSize = 0;
    /**
     * Additional data associated with the entire stream.
     *
     * Should be allocated with av_packet_side_data_new() or
     * av_packet_side_data_add(), and will be freed by avcodec_parameters_free().
     */
    codedSideData = 0;
    /**
     * Amount of entries in @ref coded_side_data.
     */
    nbCodedSideData = 0;
    /**
     * - video: the pixel format, the value corresponds to enum AVPixelFormat.
     * - audio: the sample format, the value corresponds to enum AVSampleFormat.
     */
    format = _constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE;
    /**
     * The average bitrate of the encoded data (in bits per second).
     */
    bitRate = BigInt(0);
    /**
     * The number of bits per sample in the codedwords.
     *
     * This is basically the bitrate per sample. It is mandatory for a bunch of
     * formats to actually decode them. It's the number of bits for one sample in
     * the actual coded bitstream.
     *
     * This could be for example 4 for ADPCM
     * For PCM formats this matches bits_per_raw_sample
     * Can be 0
     */
    bitsPerCodedSample = 0;
    /**
     * This is the number of valid bits in each output sample. If the
     * sample format has more bits, the least significant bits are additional
     * padding bits, which are always 0. Use right shifts to reduce the sample
     * to its actual size. For example, audio formats with 24 bit samples will
     * have bits_per_raw_sample set to 24, and format set to AV_SAMPLE_FMT_S32.
     * To get the original sample use "(int32_t)sample >> 8"."
     *
     * For ADPCM this might be 12 or 16 or similar
     * Can be 0
     */
    bitsPerRawSample = 0;
    /**
     * Codec-specific bitstream restrictions that the stream conforms to.
     */
    profile = _constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE;
    level = _constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE;
    /**
     * Video only. The dimensions of the video frame in pixels.
     */
    width = 0;
    height = 0;
    /**
     * Video only. The aspect ratio (width / height) which a single pixel
     * should have when displayed.
     *
     * When the aspect ratio is unknown / undefined, the numerator should be
     * set to 0 (the denominator may have any value).
     */
    sampleAspectRatio = new _rational_ts__WEBPACK_IMPORTED_MODULE_3__.Rational({ den: 1, num: 1 });
    /**
     * Video only. Number of frames per second, for streams with constant frame
     * durations. Should be set to { 0, 1 } when some frames have differing
     * durations or if the value is not known.
     *
     * @note This field correponds to values that are stored in codec-level
     * headers and is typically overridden by container/transport-layer
     * timestamps, when available. It should thus be used only as a last resort,
     * when no higher-level timing information is available.
     */
    framerate = new _rational_ts__WEBPACK_IMPORTED_MODULE_3__.Rational({ den: 1, num: 0 });
    /**
     * Video only. The order of the fields in interlaced video.
     */
    fieldOrder = 0 /* AVFieldOrder.AV_FIELD_UNKNOWN */;
    /**
     * Video only. Additional colorspace characteristics.
     */
    colorRange = 0 /* AVColorRange.AVCOL_RANGE_UNSPECIFIED */;
    colorPrimaries = 2 /* AVColorPrimaries.AVCOL_PRI_UNSPECIFIED */;
    colorTrc = 2 /* AVColorTransferCharacteristic.AVCOL_TRC_UNSPECIFIED */;
    colorSpace = 2 /* AVColorSpace.AVCOL_SPC_UNSPECIFIED */;
    chromaLocation = 0 /* AVChromaLocation.AVCHROMA_LOC_UNSPECIFIED */;
    /**
     * Video only. Number of delayed frames.
     */
    videoDelay = 0;
    /**
     * Audio only. The channel layout and number of channels.
     */
    chLayout;
    /**
     * Audio only. The number of audio samples per second.
     */
    sampleRate = _constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE;
    /**
     * Audio only. The number of bytes per coded audio frame, required by some
     * formats.
     *
     * Corresponds to nBlockAlign in WAVEFORMATEX.
     */
    blockAlign = 0;
    /**
     * Audio only. Audio frame size, if known. Required by some formats to be static.
     */
    frameSize = 0;
    /**
     * Audio only. The amount of padding (in samples) inserted by the encoder at
     * the beginning of the audio. I.e. this number of leading decoded samples
     * must be discarded by the caller to get the original audio without leading
     * padding.
     */
    initialPadding = 0;
    /**
     * Audio only. The amount of padding (in samples) appended by the encoder to
     * the end of the audio. I.e. this number of decoded samples must be
     * discarded by the caller from the end of the stream to get the original
     * audio without any trailing padding.
     */
    trailingPadding = 0;
    /**
     * Audio only. Number of samples to skip after a discontinuity.
     */
    seekPreroll = 0;
    /**
     * 码流格式
     * 对于 h264/h265 标记是 annexb 还是 avcc 格式
     */
    bitFormat = 0;
    destroy() {
        (0,_util_codecparameters__WEBPACK_IMPORTED_MODULE_6__.freeCodecParameters)(this[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]);
        this[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] = 0;
    }
}
(function (prototype) {
    var map = new Map();
    map.set("codecType", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("codecId", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 4, 8: 0 });
    map.set("codecTag", { 0: 8, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 8, 8: 0 });
    map.set("extradata", { 0: 2, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 12, 8: 0 });
    map.set("extradataSize", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 16, 8: 0 });
    map.set("codedSideData", { 0: _avpacket_ts__WEBPACK_IMPORTED_MODULE_2__.AVPacketSideData, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 20, 8: 0 });
    map.set("nbCodedSideData", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 24, 8: 0 });
    map.set("format", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 28, 8: 0 });
    map.set("bitRate", { 0: 17, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 32, 8: 0 });
    map.set("bitsPerCodedSample", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 40, 8: 0 });
    map.set("bitsPerRawSample", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 44, 8: 0 });
    map.set("profile", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 48, 8: 0 });
    map.set("level", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 52, 8: 0 });
    map.set("width", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 56, 8: 0 });
    map.set("height", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 60, 8: 0 });
    map.set("sampleAspectRatio", { 0: _rational_ts__WEBPACK_IMPORTED_MODULE_3__.Rational, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 64, 8: 0 });
    map.set("framerate", { 0: _rational_ts__WEBPACK_IMPORTED_MODULE_3__.Rational, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 72, 8: 0 });
    map.set("fieldOrder", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 80, 8: 0 });
    map.set("colorRange", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 84, 8: 0 });
    map.set("colorPrimaries", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 88, 8: 0 });
    map.set("colorTrc", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 92, 8: 0 });
    map.set("colorSpace", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 96, 8: 0 });
    map.set("chromaLocation", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 100, 8: 0 });
    map.set("videoDelay", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 104, 8: 0 });
    map.set("chLayout", { 0: _audiosample_ts__WEBPACK_IMPORTED_MODULE_4__.AVChannelLayout, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 112, 8: 0 });
    map.set("sampleRate", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 136, 8: 0 });
    map.set("blockAlign", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 140, 8: 0 });
    map.set("frameSize", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 144, 8: 0 });
    map.set("initialPadding", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 148, 8: 0 });
    map.set("trailingPadding", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 152, 8: 0 });
    map.set("seekPreroll", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 156, 8: 0 });
    map.set("bitFormat", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 160, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 8);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 168);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(AVCodecParameters.prototype);


/***/ }),

/***/ "./src/avutil/struct/avpacket.ts":
/*!***************************************!*\
  !*** ./src/avutil/struct/avpacket.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVPacketSideData: () => (/* binding */ AVPacketSideData)
/* harmony export */ });
/* unused harmony exports default, AVPacketRef */
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/function/definedMetaProperty */ "./src/cheap/function/definedMetaProperty.ts");
/* harmony import */ var _avbuffer_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./avbuffer.ts */ "./src/avutil/struct/avbuffer.ts");
/* harmony import */ var _rational_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rational */ "./src/avutil/struct/rational.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");






class AVPacketSideData {
    data = 0;
    size = _constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE;
    type = -1 /* AVPacketSideDataType.AV_PKT_DATA_UNKNOWN */;
}
(function (prototype) {
    var map = new Map();
    map.set("data", { 0: 2, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("size", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 4, 8: 0 });
    map.set("type", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 8, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 12);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(AVPacketSideData.prototype);
/**
 * FFmpeg AVPacket 定义
 */
class AVPacket {
    /**
     * A reference to the reference-counted buffer where the packet data is
     * stored.
     * May be NULL, then the packet data is not reference-counted.
     */
    buf = 0;
    /**
     * Presentation timestamp in AVStream->time_base units; the time at which
     * the decompressed packet will be presented to the user.
     * Can be AV_NOPTS_VALUE if it is not stored in the file.
     * pts MUST be larger or equal to dts as presentation cannot happen before
     * decompression, unless one wants to view hex dumps. Some formats misuse
     * the terms dts and pts/cts to mean something different. Such timestamps
     * must be converted to true pts/dts before they are stored in AVPacket.
     */
    pts = _constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE_BIGINT;
    /**
     * Decompression timestamp in AVStream->time_base units; the time at which
     * the packet is decompressed.
     * Can be AV_NOPTS_VALUE if it is not stored in the file.
     */
    dts = _constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE_BIGINT;
    data = 0;
    size = 0;
    streamIndex = _constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE;
    /**
     * A combination of @AVPacketFlags values
     */
    flags = 0;
    /**
     * Additional packet data that can be provided by the container.
     * Packet can contain several types of side information.
     */
    sideData = 0;
    sideDataElems = 0;
    /**
     * Duration of this packet in AVStream->time_base units, 0 if unknown.
     * Equals next_pts - this_pts in presentation order.
     */
    duration = _constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE_BIGINT;
    pos = _constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE_BIGINT;
    /**
     * for some private data of the user
     */
    opaque = 0;
    /**
     * AVBufferRef for free use by the API user. FFmpeg will never check the
     * contents of the buffer ref. FFmpeg calls av_buffer_unref() on it when
     * the packet is unreferenced. av_packet_copy_props() calls create a new
     * reference with av_buffer_ref() for the target packet's opaque_ref field.
     *
     * This is unrelated to the opaque field, although it serves a similar
     * purpose.
     */
    opaqueRef = 0;
    /**
     * 编码时间基
     *
     * 封装时用户设置
     */
    timeBase = new _rational_ts__WEBPACK_IMPORTED_MODULE_3__.Rational({ den: _constant__WEBPACK_IMPORTED_MODULE_4__.AV_TIME_BASE, num: 1 });
    /**
     * 码流格式
     * 对于 h264/h265 标记是 annexb 还是 avcc 格式
     */
    bitFormat = 0;
}
(function (prototype) {
    var map = new Map();
    map.set("buf", { 0: _avbuffer_ts__WEBPACK_IMPORTED_MODULE_2__.AVBufferRef, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("pts", { 0: 17, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 8, 8: 0 });
    map.set("dts", { 0: 17, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 16, 8: 0 });
    map.set("data", { 0: 2, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 24, 8: 0 });
    map.set("size", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 28, 8: 0 });
    map.set("streamIndex", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 32, 8: 0 });
    map.set("flags", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 36, 8: 0 });
    map.set("sideData", { 0: AVPacketSideData, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 40, 8: 0 });
    map.set("sideDataElems", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 44, 8: 0 });
    map.set("duration", { 0: 17, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 48, 8: 0 });
    map.set("pos", { 0: 17, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 56, 8: 0 });
    map.set("opaque", { 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 64, 8: 0 });
    map.set("opaqueRef", { 0: _avbuffer_ts__WEBPACK_IMPORTED_MODULE_2__.AVBufferRef, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 68, 8: 0 });
    map.set("timeBase", { 0: _rational_ts__WEBPACK_IMPORTED_MODULE_3__.Rational, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 72, 8: 0 });
    map.set("bitFormat", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 80, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 8);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 88);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(AVPacket.prototype);
class AVPacketRef extends AVPacket {
    refCount;
}
(function (prototype) {
    var map = new Map();
    map.set("refCount", { 0: 16, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 88, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 8);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 96);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(AVPacketRef.prototype);


/***/ }),

/***/ "./src/avutil/struct/rational.ts":
/*!***************************************!*\
  !*** ./src/avutil/struct/rational.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rational: () => (/* binding */ Rational)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/function/definedMetaProperty */ "./src/cheap/function/definedMetaProperty.ts");


/*
 * libmedia Rational defined
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
class Rational {
    /**
     * 分子
     */
    num = 1;
    /**
     * 分母
     */
    den = 1;
    constructor(init) {
        if (init) {
            this.den = init.den;
            this.num = init.num;
        }
    }
}
(function (prototype) {
    var map = new Map();
    map.set("num", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("den", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 4, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 8);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(Rational.prototype);


/***/ }),

/***/ "./src/avutil/util/av1syntax.ts":
/*!**************************************!*\
  !*** ./src/avutil/util/av1syntax.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ f),
/* harmony export */   leb128: () => (/* binding */ leb128),
/* harmony export */   uvlc: () => (/* binding */ uvlc)
/* harmony export */ });
/* unused harmony exports le, su, ns, L, NS */
/*
 * libmedia av1 syntax util
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
function f(bitReader, n) {
    let x = 0;
    for (let i = 0; i < n; i++) {
        x = 2 * x + bitReader.readU1();
    }
    return x;
}
function uvlc(bitReader) {
    let leadingZeros = 0;
    while (true) {
        let done = f(bitReader, 1);
        if (done) {
            break;
        }
        leadingZeros++;
    }
    if (leadingZeros >= 32) {
        return (1) - 1;
    }
    const value = f(bitReader, leadingZeros);
    return value + (1 << leadingZeros) - 1;
}
function le(bitReader, n) {
    let t = 0;
    for (let i = 0; i < n; i++) {
        let byte = f(bitReader, 8);
        t += (byte << (i * 8));
    }
    return t;
}
function leb128(bitReader) {
    let value = 0;
    let Leb128Bytes = 0;
    for (let i = 0; i < 8; i++) {
        let leb128Byte_ = f(bitReader, 8);
        value |= ((leb128Byte_ & 0x7f) << (i * 7));
        Leb128Bytes += 1;
        if (!(leb128Byte_ & 0x80)) {
            break;
        }
    }
    return value;
}
function su(bitReader, n) {
    let value = f(bitReader, n);
    let signMask = 1 << (n - 1);
    if (value & signMask) {
        value = value - 2 * signMask;
    }
    return value;
}
function ns(bitReader, n) {
    let w = Math.floor(Math.log2(n)) + 1;
    let m = (1 << w) - n;
    let v = f(bitReader, w - 1);
    if (v < m) {
        return v;
    }
    let extraBit = f(bitReader, 1);
    return (v << 1) - m + extraBit;
}
function L(bitReader, n) {
    let x = 0;
    for (let i = 0; i < n; i++) {
        x = 2 * x + bitReader.readU1();
    }
    return x;
}
function NS(bitReader, n) {
    let w = Math.floor(Math.log2(n)) + 1;
    let m = (1 << w) - n;
    let v = L(bitReader, w - 1);
    if (v < m) {
        return v;
    }
    let extraBit = L(bitReader, 1);
    return (v << 1) - m + extraBit;
}


/***/ }),

/***/ "./src/avutil/util/avbuffer.ts":
/*!*************************************!*\
  !*** ./src/avutil/util/avbuffer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avbufferCreate: () => (/* binding */ avbufferCreate),
/* harmony export */   avbufferRealloc: () => (/* binding */ avbufferRealloc),
/* harmony export */   avbufferRef: () => (/* binding */ avbufferRef),
/* harmony export */   avbufferReplace: () => (/* binding */ avbufferReplace),
/* harmony export */   avbufferUnref: () => (/* binding */ avbufferUnref)
/* harmony export */ });
/* unused harmony exports bufferCreate, avbufferAlloc, avbufferAllocz, bufferReplace, avbufferIsWritable, avbufferGetOpaque, avbufferGetRefCount, avbufferMakeWritable, bufferPoolFlush, bufferPoolFree, poolReleaseBuffer */
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _cheap_thread_mutex_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/thread/mutex */ "./src/cheap/thread/mutex.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _mem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_thread_atomics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cheap/thread/atomics */ "./src/cheap/thread/atomics.ts");
/* harmony import */ var _struct_avbuffer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../struct/avbuffer */ "./src/avutil/struct/avbuffer.ts");
/* harmony import */ var cheap_stack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cheap/stack */ "./src/cheap/stack.ts");





/*
 * libmedia avbuffer util
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






const BUFFER_FLAG_REALLOCATABLE = 1;
function bufferCreate(buf, data, size, free = 0, opaque = 0, flags = 0) {
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](buf, data);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](buf + 4, size);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](buf + 12, free);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](buf + 16, opaque);
    cheap_thread_atomics__WEBPACK_IMPORTED_MODULE_6__.store(buf + 8, 1, 9, 2);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](buf + 20, flags);
    const ref = (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMallocz)(12);
    if (!ref) {
        return 0;
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](ref, buf);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](ref + 4, data);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](ref + 8, size);
    return ref;
}
function avbufferCreate(data, size, free = 0, opaque = 0, flags = 0) {
    const buf = (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMallocz)(28);
    if (!buf) {
        return 0;
    }
    const ref = bufferCreate(buf, data, size, free, opaque, flags);
    if (!ref) {
        (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(buf);
        return 0;
    }
    return ref;
}
function avbufferAlloc(size) {
    const data = (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(size);
    return avbufferCreate(data, size);
}
function avbufferAllocz(size) {
    const p = avbufferAlloc(size);
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memset)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](p + 4), 0, size);
    return p;
}
function avbufferRef(buf) {
    const ref = (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMallocz)(12);
    // @ts-ignore
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(ref, buf, 12);
    cheap_thread_atomics__WEBPACK_IMPORTED_MODULE_6__.add(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf) + 8, 1, 9, 2);
    return ref;
}
function bufferReplace(dst, src) {
    const buf = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst));
    if (src) {
        // @ts-ignore
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src), 12);
        (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFreep)(src);
    }
    else {
        (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFreep)(dst);
    }
    if (cheap_thread_atomics__WEBPACK_IMPORTED_MODULE_6__.sub(buf + 8, 1, 9, 2) === 1) {
        const freeAvbuffer = !(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](buf + 24) & 2 /* BufferFlags.BUFFER_FLAG_NO_FREE */);
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf + 16)) {
            poolReleaseBuffer(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf + 16), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf));
        }
        else {
            (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf));
        }
        if (freeAvbuffer) {
            (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(buf);
        }
    }
}
function avbufferUnref(buf) {
    if (!buf || !cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf)) {
        return;
    }
    bufferReplace(buf, 0);
}
function avbufferIsWritable(buf) {
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf) + 20) & 1 /* AVBufferFlags.READONLY */) {
        return 0;
    }
    return cheap_thread_atomics__WEBPACK_IMPORTED_MODULE_6__.load(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf) + 8, 9, 2) === 1 ? 1 : 0;
}
function avbufferGetOpaque(buf) {
    return cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf) + 16);
}
function avbufferGetRefCount(buf) {
    return cheap_thread_atomics__WEBPACK_IMPORTED_MODULE_6__.load(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf) + 8, 9, 2);
}
function avbufferMakeWritable(pbuf) {
    const buf = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](pbuf);
    if (!buf) {
        return -1;
    }
    if (avbufferIsWritable(buf)) {
        return 0;
    }
    const newbuf = avbufferAlloc(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](buf + 8));
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](newbuf + 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf + 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](buf + 8));
    let newbufp = cheap_stack__WEBPACK_IMPORTED_MODULE_8__.malloc(4);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](newbufp, newbuf);
    bufferReplace(pbuf, newbufp);
    cheap_stack__WEBPACK_IMPORTED_MODULE_8__.free(4);
    return 0;
}
function avbufferReplace(pdst, src) {
    const dst = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](pdst);
    if (!src) {
        avbufferUnref(pdst);
        return 0;
    }
    if (dst && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst + 4) === cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 4)) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + 4, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 4));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 8));
        return 0;
    }
    const tmp = avbufferRef(src);
    avbufferUnref(pdst);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](pdst, tmp);
    return 0;
}
function avbufferRealloc(pdst, size) {
    if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](pdst)) {
        const data = (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avRealloc)(0, size);
        const buf = avbufferCreate(data, size);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](pdst, buf);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf) + 24, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf) + 24) | BUFFER_FLAG_REALLOCATABLE);
        return 0;
    }
    const ref = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](pdst);
    const buf = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](ref);
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](ref + 8) === size) {
        return 0;
    }
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](buf + 24) & BUFFER_FLAG_REALLOCATABLE)
        || !avbufferIsWritable(ref)
        || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](ref + 4) !== cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf)) {
        let newRef = cheap_stack__WEBPACK_IMPORTED_MODULE_8__.malloc(4);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](newRef, 0);
        const ret = avbufferRealloc(newRef, size);
        if (ret < 0) {
            cheap_stack__WEBPACK_IMPORTED_MODULE_8__.free(4);
            return ret;
        }
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](newRef) + 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf), Math.min(size, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](buf + 4)));
        bufferReplace(pdst, newRef);
        cheap_stack__WEBPACK_IMPORTED_MODULE_8__.free(4);
        return 0;
    }
    const tmp = (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avRealloc)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf), size);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](ref + 4, tmp), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](buf, tmp);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](ref + 8, size), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](buf + 4, size);
    return 0;
}
function bufferPoolFlush(pool) {
    while (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](pool + 4)) {
        const buf = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](pool + 4);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](pool + 4, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf + 16));
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf + 4)) {
            poolReleaseBuffer(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf + 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf));
        }
        else {
            (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf));
        }
        (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(buf);
    }
}
function bufferPoolFree(pool) {
    bufferPoolFlush(pool);
    _cheap_thread_mutex_ts__WEBPACK_IMPORTED_MODULE_3__.destroy(pool);
    (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(pool);
}
function poolReleaseBuffer(opaque, data) {
    const buf = opaque;
    const pool = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf + 12);
    _cheap_thread_mutex_ts__WEBPACK_IMPORTED_MODULE_3__.lock(pool);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](buf + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](pool + 4));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](pool + 4, buf);
    _cheap_thread_mutex_ts__WEBPACK_IMPORTED_MODULE_3__.unlock(pool);
    if (cheap_thread_atomics__WEBPACK_IMPORTED_MODULE_6__.sub(pool + 8, 1, 9, 2) === 1) {
        bufferPoolFree(pool);
    }
}


/***/ }),

/***/ "./src/avutil/util/avpacket.ts":
/*!*************************************!*\
  !*** ./src/avutil/util/avpacket.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAVPacketData: () => (/* binding */ addAVPacketData),
/* harmony export */   addAVPacketSideData: () => (/* binding */ addAVPacketSideData),
/* harmony export */   copyAVPacketProps: () => (/* binding */ copyAVPacketProps),
/* harmony export */   createAVPacket: () => (/* binding */ createAVPacket),
/* harmony export */   destroyAVPacket: () => (/* binding */ destroyAVPacket),
/* harmony export */   freeAVPacketSideData: () => (/* binding */ freeAVPacketSideData),
/* harmony export */   getAVPacketData: () => (/* binding */ getAVPacketData),
/* harmony export */   getAVPacketSideData: () => (/* binding */ getAVPacketSideData),
/* harmony export */   hasAVPacketSideData: () => (/* binding */ hasAVPacketSideData),
/* harmony export */   refAVPacket: () => (/* binding */ refAVPacket),
/* harmony export */   unrefAVPacket: () => (/* binding */ unrefAVPacket)
/* harmony export */ });
/* unused harmony exports initAVPacketData, deleteAVPacketSideData, getAVPacketDefault, copyAVPacketSideData, copyAVPacketData */
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _struct_avpacket_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../struct/avpacket */ "./src/avutil/struct/avpacket.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _mem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");
/* harmony import */ var _avbuffer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./avbuffer */ "./src/avutil/util/avbuffer.ts");





/*
 * libmedia avpacket util
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





const AV_INPUT_BUFFER_PADDING_SIZE = 64;
function getAVPacketData(avpacket, safe) {
    return safe ? (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapSafeUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)) : (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28));
}
function initAVPacketData(avpacket, length) {
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](avpacket + 24, (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(length));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 28, length);
    return (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28));
}
function getAVPacketSideData(avpacket, type) {
    for (let i = 0; i < cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44); i++) {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12 + 8) === type) {
            return cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + (i * 12);
        }
    }
    return 0;
}
function hasAVPacketSideData(avpacket, type) {
    for (let i = 0; i < cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44); i++) {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12 + 8) === type) {
            return true;
        }
    }
    return false;
}
function addAVPacketSideData(avpacket, type, data, length) {
    for (let i = 0; i < cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44); i++) {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12 + 8) === type) {
            (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12, data);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12 + 4, length);
            return;
        }
    }
    const len = (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44) + 1) * 12;
    const sideData = (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMallocz)(len);
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44)) {
        for (let i = 0; i < cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44); i++) {
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(sideData + (i * 12), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + (i * 12), 12);
        }
    }
    const ele = sideData + (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44) * 12);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](ele, data);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](ele + 8, type);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](ele + 4, length);
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40)) {
        (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40));
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](avpacket + 40, sideData);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 44, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44) + 1);
}
function deleteAVPacketSideData(avpacket, type) {
    let index = -1;
    for (let i = 0; i < cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44); i++) {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12 + 8) === type) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44) === 1) {
            (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40)));
            (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](avpacket + 40, 0);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 44, 0);
        }
        else {
            const len = (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44) - 1) * 12;
            const sideData = (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMallocz)(len);
            for (let i = 0; i < cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44); i++) {
                if (i !== index) {
                    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(sideData + (i * 12), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + (i * 12), 12);
                }
                else {
                    (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12));
                }
            }
            (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](avpacket + 40, sideData);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 44, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44) - 1);
        }
    }
}
function createAVPacket() {
    const avpacket = (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMallocz)(88);
    getAVPacketDefault(avpacket);
    return avpacket;
}
function destroyAVPacket(avpacket) {
    unrefAVPacket(avpacket);
    (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(avpacket);
}
function freeAVPacketSideData(pSideData, pnbSideData) {
    const sideData = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](pSideData);
    const nbSideData = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](pnbSideData);
    if (sideData) {
        for (let i = 0; i < nbSideData; i++) {
            (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](sideData + i * 12));
        }
        (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFreep)(pSideData);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](pnbSideData, 0);
    }
}
function getAVPacketDefault(avpacket) {
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](avpacket + 24, 0);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 28, 0);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](avpacket + 40, 0);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 44, 0);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 32, _constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 56, _constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE_BIGINT);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 48, _constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE_BIGINT);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 36, 0);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 16, _constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE_BIGINT);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 8, _constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE_BIGINT);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 76, _constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 72, 1);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 80, 0);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](avpacket, 0);
}
function copyAVPacketSideData(dst, src) {
    freeAVPacketSideData(dst + 40, dst + 44);
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 44)) {
        let size = 12;
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + 40, (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMallocz)(size * cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 44)));
        for (let i = 0; i < cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 44); i++) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst + 40) + i * 12 + 4, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 40) + i * 12 + 4));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst + 40) + i * 12 + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 40) + i * 12 + 8));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst + 40) + i * 12, (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 40) + i * 12 + 4)));
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst + 40) + i * 12), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 40) + i * 12), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 40) + i * 12 + 4));
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 44, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 44));
    }
}
function copyAVPacketProps(dst, src) {
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 32, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 32));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](dst + 56, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](src + 56));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](dst + 48, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](src + 48));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 36));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](dst + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](src + 16));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](dst + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](src + 8));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + 64, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 64));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 76, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 76));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 72, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 72));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 80, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 80));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + 68, 0);
    (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferReplace)(dst + 68, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 68));
    copyAVPacketSideData(dst, src);
    return 0;
}
function allocAVPacket(buf, size) {
    (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferRealloc)(buf, size + AV_INPUT_BUFFER_PADDING_SIZE);
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memset)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](buf) + 4) + size, 0, AV_INPUT_BUFFER_PADDING_SIZE);
    return 0;
}
function refAVPacket(dst, src) {
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst)) {
        (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferUnref)(dst);
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst, 0);
    copyAVPacketProps(dst, src);
    if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src) && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28)) {
        allocAVPacket(dst, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28));
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28)) {
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst) + 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28));
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + 24, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst) + 4));
    }
    else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src)) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst, (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferRef)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src)));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + 24, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 24));
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 28, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28));
    return 0;
}
function unrefAVPacket(avpacket) {
    freeAVPacketSideData(avpacket + 40, avpacket + 44);
    (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferUnref)(avpacket + 68);
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket)) {
        (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferUnref)(avpacket);
    }
    else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24)) {
        (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24));
    }
    getAVPacketDefault(avpacket);
}
function copyAVPacketData(dst, src) {
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst)) {
        (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferUnref)(dst);
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst, 0);
    if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src) && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28)) {
        allocAVPacket(dst, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28));
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28)) {
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst) + 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28));
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + 24, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst) + 4));
    }
    else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src)) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst, (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferRef)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src)));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + 24, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 24));
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 28, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28));
}
function addAVPacketData(avpacket, data, size) {
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket)) {
        (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferUnref)(avpacket);
    }
    else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24)) {
        (0,_mem__WEBPACK_IMPORTED_MODULE_5__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24));
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](avpacket, (0,_avbuffer__WEBPACK_IMPORTED_MODULE_7__.avbufferCreate)(data, size + AV_INPUT_BUFFER_PADDING_SIZE));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](avpacket + 24, data);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 28, size);
}


/***/ }),

/***/ "./src/avutil/util/channel.ts":
/*!************************************!*\
  !*** ./src/avutil/util/channel.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unInitChannelLayout: () => (/* binding */ unInitChannelLayout)
/* harmony export */ });
/* unused harmony export getChannelLayoutNBChannels */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/avutil/util/common.ts");
/* harmony import */ var _mem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");




function getChannelLayoutNBChannels(layout) {
    return (0,_common__WEBPACK_IMPORTED_MODULE_1__.popCount64)(layout);
}
function unInitChannelLayout(channelLayout) {
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](channelLayout) == 2 /* AVChannelOrder.AV_CHANNEL_ORDER_CUSTOM */) {
        (0,_mem__WEBPACK_IMPORTED_MODULE_2__.avFreep)(channelLayout + 8);
    }
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.memset)(channelLayout, 0, 24);
}


/***/ }),

/***/ "./src/avutil/util/codecparameters.ts":
/*!********************************************!*\
  !*** ./src/avutil/util/codecparameters.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copyCodecParameters: () => (/* binding */ copyCodecParameters),
/* harmony export */   freeCodecParameters: () => (/* binding */ freeCodecParameters)
/* harmony export */ });
/* unused harmony export resetCodecParameters */
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _struct_audiosample_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../struct/audiosample.ts */ "./src/avutil/struct/audiosample.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _struct_rational_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../struct/rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var _mem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var _channel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./channel */ "./src/avutil/util/channel.ts");
/* harmony import */ var _avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");
/* harmony import */ var _struct_avpacket__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../struct/avpacket */ "./src/avutil/struct/avpacket.ts");












function copyCodecParametersSideData(pDst, pnbDst, src, nbSrc) {
    if (!src) {
        return;
    }
    const dst = (0,_mem__WEBPACK_IMPORTED_MODULE_6__.avMallocz)(nbSrc * 12);
    for (let i = 0; i < nbSrc; i++) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + i * 12 + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + i * 12 + 8));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + i * 12 + 4, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + i * 12 + 4));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + i * 12, (0,_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + i * 12 + 4)));
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(dst + i * 12, src + i * 12, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + i * 12 + 4));
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](pnbDst, nbSrc);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](pDst, dst);
    return 0;
}
function copyCodecParameters(dst, src) {
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 4, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 4));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[8](dst + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[8](src + 8));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 28, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 28));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](dst + 32, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](src + 32));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 40, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 40));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 44, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 44));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 48, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 48));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 52, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 52));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 56, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 56));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 60, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 60));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 68, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 68));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 64, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 64));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 80, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 80));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 84, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 84));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 88, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 88));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 92, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 92));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 96, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 96));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 100, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 100));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 104, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 104));
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(dst + 112, src + 112, 24);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 136, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 136));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 140, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 140));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 144, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 144));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 148, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 148));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 152, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 152));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 156, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 156));
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(dst + 72, src + 72, 8);
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 12)) {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst + 12)) {
            (0,_mem__WEBPACK_IMPORTED_MODULE_6__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst + 12));
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](dst + 12, (0,_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 16)));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](dst + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 16));
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](dst + 12), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 12), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 16));
    }
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 20)) {
        copyCodecParametersSideData(dst + 20, dst + 24, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](src + 20), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](src + 24));
    }
}
function resetCodecParameters(par) {
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](par + 12)) {
        (0,_mem__WEBPACK_IMPORTED_MODULE_6__.avFreep)(par + 12);
    }
    (0,_channel__WEBPACK_IMPORTED_MODULE_7__.unInitChannelLayout)(par + 112);
    (0,_avpacket__WEBPACK_IMPORTED_MODULE_8__.freeAVPacketSideData)(par + 20, par + 24);
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memset)(par, 0, 168);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par, -1 /* AVMediaType.AVMEDIA_TYPE_UNKNOWN */);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 4, 0 /* AVCodecID.AV_CODEC_ID_NONE */);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 28, -1);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 112, 0 /* AVChannelOrder.AV_CHANNEL_ORDER_UNSPEC */);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 80, 0 /* AVFieldOrder.AV_FIELD_UNKNOWN */);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 84, 0 /* AVColorRange.AVCOL_RANGE_UNSPECIFIED */);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 88, 2 /* AVColorPrimaries.AVCOL_PRI_UNSPECIFIED */);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 92, 2 /* AVColorTransferCharacteristic.AVCOL_TRC_UNSPECIFIED */);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 96, 2 /* AVColorSpace.AVCOL_SPC_UNSPECIFIED */);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 100, 0 /* AVChromaLocation.AVCHROMA_LOC_UNSPECIFIED */);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 64, 0);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 68, 1);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 72, 0);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 72, 1);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 48, _constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](par + 52, _constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE);
}
function freeCodecParameters(par) {
    if (!par) {
        return;
    }
    resetCodecParameters(par);
    (0,_mem__WEBPACK_IMPORTED_MODULE_6__.avFree)(par);
}


/***/ }),

/***/ "./src/avutil/util/common.ts":
/*!***********************************!*\
  !*** ./src/avutil/util/common.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   popCount64: () => (/* binding */ popCount64)
/* harmony export */ });
/* unused harmony exports popCount, milliSecond2Second, alignFunc */
/*
 * libmedia common util
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
function popCount(x) {
    x -= (x >> 1) & 0x55555555;
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0F0F0F0F;
    x += x >> 8;
    return (x + (x >> 16)) & 0x3F;
}
function popCount64(x) {
    return popCount(Number(x & 0xffffffffn)) + popCount(Number(x >> BigInt(32) & 0xffffffffn));
}
function milliSecond2Second(time) {
    const integer = time / BigInt(1000);
    const decimal = time - integer * BigInt(1000);
    return Number(integer) + Number(decimal) / 1000;
}
function alignFunc(value, alignment) {
    return (value + alignment - 1) & ~(alignment - 1);
}


/***/ }),

/***/ "./src/avutil/util/expgolomb.ts":
/*!**************************************!*\
  !*** ./src/avutil/util/expgolomb.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readSE: () => (/* binding */ readSE),
/* harmony export */   readUE: () => (/* binding */ readUE)
/* harmony export */ });
/* unused harmony exports readTE, writeUE, writeSE, writeTE */
/*
 * libmedia expgolomb util
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
const UESizeTable = [
    // 0 的二进制所需的比特个数
    1,
    // 1 的二进制所需的比特个数    
    1,
    // 2~3 的二进制所需的比特个数   
    2, 2,
    // 4~7 的二进制所需的比特个数
    3, 3, 3, 3,
    // 8~15 的二进制所需的比特个数
    4, 4, 4, 4, 4, 4, 4, 4,
    // 16~31 的二进制所需的比特个数
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    // 32~63 的二进制所需的比特个数
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    // 64~127 的二进制所需的比特个数
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    // 128~255 的二进制所需的比特个数
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
];
/**
 * ue(v) 指数哥伦布解码
 */
function readUE(bitReader) {
    let result = 0;
    // leadingZeroBits
    let i = 0;
    while (i < 32 && bitReader.readU1() === 0) {
        i++;
    }
    // 计算 read_bits ( leadingZeroBits )
    result = bitReader.readU(i);
    // 计算 codeNum，1 << i 即为 2 的 i 次幂
    result += (1 << i) - 1;
    return result;
}
/**
 * se(v) 有符号指数哥伦布解码
 */
function readSE(bitReader) {
    let result = readUE(bitReader);
    // 判断 result 的奇偶性
    if (result & 0x01) {
        // 如果为奇数，说明编码前 > 0
        result = (result + 1) / 2;
    }
    else {
        // 如果为偶数，说明编码前 <= 0
        result = -result / 2;
    }
    return result;
}
/**
 * te(v) 截断指数哥伦布解码
 */
function readTE(bitReader, x) {
    let result = 0;
    // 判断取值上限
    if (x === 1) {
        // 如果为 1 则将读取到的比特值取反
        result = 1 - bitReader.readU1();
    }
    else if (x > 1) {
        // 否则按照 ue(v) 进行解码
        result = readUE(bitReader);
    }
    return result;
}
/**
 * ue(v) 指数哥伦布编码
 */
function writeUE(bitWriter, value) {
    let size = 0;
    if (value === 0) {
        // 0 直接编码为 1
        bitWriter.writeU1(1);
    }
    else {
        let tmp = ++value;
        // 判断所需比特个数是否大于 16 位
        if (tmp >= 0x00010000) {
            size += 16;
            tmp >>= 16;
        }
        // 判断此时所需比特个数是否大于 8 位
        if (tmp >= 0x100) {
            size += 8;
            tmp >>= 8;
        }
        // 最终 tmp 移位至 8 位以内，去查表
        size += UESizeTable[tmp];
        // 最终得出编码 value 所需的总比特数：2 * size - 1
        bitWriter.writeU(2 * size - 1, value);
    }
}
/**
 * se(v) 有符号指数哥伦布编码
 */
function writeSE(bitWriter, value) {
    if (value <= 0) {
        writeUE(bitWriter, -value * 2);
    }
    else {
        writeUE(bitWriter, value * 2 - 1);
    }
}
/**
 * te(v) 截断指数哥伦布编码
 */
function writeTE(bitWriter, x, value) {
    if (x === 1) {
        bitWriter.writeU1(1 & ~value);
    }
    else if (x > 1) {
        writeUE(bitWriter, value);
    }
}


/***/ }),

/***/ "./src/avutil/util/mem.ts":
/*!********************************!*\
  !*** ./src/avutil/util/mem.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avFree: () => (/* binding */ avFree),
/* harmony export */   avFreep: () => (/* binding */ avFreep),
/* harmony export */   avMalloc: () => (/* binding */ avMalloc),
/* harmony export */   avMallocz: () => (/* binding */ avMallocz),
/* harmony export */   avRealloc: () => (/* binding */ avRealloc)
/* harmony export */ });
/* harmony import */ var cheap_heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/heap */ "./src/cheap/heap.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__1 = "src/avutil/util/mem.ts";



/*
 * libmedia mem util
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


function avMalloc(len) {
    const p = cheap_heap__WEBPACK_IMPORTED_MODULE_0__.Allocator.malloc(len);
    if (!p) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal('can not alloc buffer', cheap__fileName__1, 32);
    }
    return p;
}
function avMallocz(len) {
    const p = cheap_heap__WEBPACK_IMPORTED_MODULE_0__.Allocator.malloc(len);
    if (!p) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal('can not alloc buffer', cheap__fileName__1, 40);
    }
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.memset)(p, 0, len);
    return p;
}
function avFree(p) {
    cheap_heap__WEBPACK_IMPORTED_MODULE_0__.Allocator.free(p);
}
function avFreep(p) {
    cheap_heap__WEBPACK_IMPORTED_MODULE_0__.Allocator.free(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](p));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](p, 0);
}
function avRealloc(p, size) {
    return cheap_heap__WEBPACK_IMPORTED_MODULE_0__.Allocator.realloc(p, size);
}


/***/ }),

/***/ "./src/avutil/util/nalu.ts":
/*!*********************************!*\
  !*** ./src/avutil/util/nalu.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAnnexb: () => (/* binding */ isAnnexb),
/* harmony export */   naluUnescape: () => (/* binding */ naluUnescape),
/* harmony export */   splitNaluByStartCode: () => (/* binding */ splitNaluByStartCode)
/* harmony export */ });
/* unused harmony exports splitNaluByLength, joinNaluByStartCode, joinNaluByLength, naluEscape */
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/*
 * libmedia nalu util
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



function isAnnexb(data) {
    return data.length > 4
        && data[0] === 0
        && data[1] === 0
        && (data[2] === 1
            || data[2] === 0 && data[3] === 1);
}
function getNextNaluStart(data, offset) {
    let t = 0;
    for (let i = offset; i < data.length; i++) {
        switch (data[i]) {
            case 0:
                t++;
                break;
            case 1:
                if (t >= 2) {
                    return {
                        offset: i - Math.min(t, 3),
                        startCode: Math.min(t + 1, 4)
                    };
                }
                t = 0;
                break;
            default:
                t = 0;
        }
    }
    return {
        offset: -1,
        startCode: 0
    };
}
function splitNaluByStartCode(buffer) {
    const list = [];
    let offset = 0;
    let current = getNextNaluStart(buffer, offset);
    let next = {
        offset: -1,
        startCode: 0
    };
    while (next = getNextNaluStart(buffer, current.offset + current.startCode), next.offset > -1) {
        list.push(buffer.subarray(current.offset + current.startCode, next.offset, true));
        current = next;
    }
    list.push(buffer.subarray(current.offset + current.startCode, undefined, true));
    return list;
}
function splitNaluByLength(buffer, naluLengthSizeMinusOne) {
    const list = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](buffer);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = buffer.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length, true);
        bufferReader.skip(length);
        list.push(nalu);
    }
    return list;
}
function joinNaluByStartCode(nalus, output, slice = false) {
    if (!output) {
        let length = nalus.reduce((prev, nalu, index) => {
            return prev + ((index && slice) ? 3 : 4) + nalu.length;
        }, 0);
        output = new Uint8Array(length);
    }
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__["default"](output);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu, index) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        if (!index && slice) {
            bufferWriter.writeUint8(0x00);
        }
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(nalu);
    });
    return output;
}
function joinNaluByLength(nalus, naluLengthSizeMinusOne, output) {
    if (!output) {
        const length = nalus.reduce((prev, nalu) => {
            return prev + naluLengthSizeMinusOne + 1 + nalu.length;
        }, 0);
        output = new Uint8Array(length);
    }
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__["default"](output);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu) => {
        if (naluLengthSizeMinusOne === 3) {
            bufferWriter.writeUint32(nalu.length);
        }
        else if (naluLengthSizeMinusOne === 2) {
            bufferWriter.writeUint24(nalu.length);
        }
        else if (naluLengthSizeMinusOne === 1) {
            bufferWriter.writeUint16(nalu.length);
        }
        else {
            bufferWriter.writeUint8(nalu.length);
        }
        bufferWriter.writeBuffer(nalu);
    });
    return output;
}
function naluUnescape(data, start = 0, end) {
    if (!end) {
        end = data.length;
    }
    const buffer = new Uint8Array(data.length);
    let zeroCount = 0;
    let pos = 0;
    for (let i = 0; i < data.length; i++) {
        if (i >= start && i < end) {
            if (data[i] === 0) {
                zeroCount++;
            }
            else {
                if (data[i] === 3 && zeroCount === 2 && i + 1 < data.length && data[i + 1] <= 3) {
                    i++;
                    if (i === data.length) {
                        break;
                    }
                    else {
                        if (data[i] === 0) {
                            zeroCount = 1;
                        }
                        else {
                            zeroCount = 0;
                        }
                    }
                }
                else {
                    zeroCount = 0;
                }
            }
        }
        buffer[pos++] = data[i];
    }
    return buffer.slice(0, pos);
}
function naluEscape(data, start = 0, end) {
    if (!end) {
        end = data.length;
    }
    const indexes = [];
    let zeroCount = 0;
    for (let i = start; i < end; i++) {
        if (i >= end) {
            break;
        }
        if (data[i] === 0) {
            zeroCount++;
        }
        else {
            if (data[i] <= 3 && zeroCount === 2) {
                indexes.push(i);
            }
            zeroCount = 0;
        }
    }
    if (indexes.length) {
        const buffer = new Uint8Array(data.length + indexes.length);
        let pos = 0;
        let subData = data.subarray(0, indexes[0]);
        buffer.set(subData, pos);
        pos += subData.length;
        buffer[pos++] = 3;
        for (let i = 1; i < indexes.length; i++) {
            subData = data.subarray(indexes[i - 1], indexes[i]);
            buffer.set(subData, pos);
            pos += subData.length;
            buffer[pos++] = 3;
        }
        subData = data.subarray(indexes[indexes.length - 1], data.length);
        buffer.set(subData, pos);
        pos += subData.length;
        return buffer;
    }
    else {
        return data;
    }
}


/***/ }),

/***/ "./src/avutil/util/rational.ts":
/*!*************************************!*\
  !*** ./src/avutil/util/rational.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avQ2D: () => (/* binding */ avQ2D),
/* harmony export */   avReduce: () => (/* binding */ avReduce),
/* harmony export */   avRescaleQ: () => (/* binding */ avRescaleQ)
/* harmony export */ });
/* unused harmony exports avRescaleQ2, avQ2D2, avReduce2 */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_math_gcd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/math/gcd */ "./src/common/math/gcd.ts");



/**
 * 将一个时间戳由一个时间基转换到另一个时间基
 *
 * @param a 待转换时间戳
 * @param bp 待转换时间戳的时间基
 * @param cq 目标时间基
 */
function avRescaleQ(a, bq, cq) {
    const b = a * BigInt(bq.num >>> 0) * BigInt(cq.den >>> 0);
    const c = BigInt(bq.den >>> 0) * BigInt(cq.num >>> 0);
    return b / c;
}
/**
 * 将一个时间戳由一个时间基转换到另一个时间基
 *
 * @param a 待转换时间戳
 * @param bp 待转换时间戳的时间基
 * @param cq 目标时间基
 */
function avRescaleQ2(a, bq, cq) {
    const b = a * BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](bq) >>> 0) * BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](cq + 4) >>> 0);
    const c = BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](bq + 4) >>> 0) * BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](cq) >>> 0);
    return b / c;
}
/**
 * 将一个时间基转换成 double
 *
 * @param a
 */
function avQ2D(a) {
    return a.num / a.den;
}
/**
 * 将一个时间基转换成 double
 *
 * @param a
 */
function avQ2D2(a) {
    return cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a) / cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a + 4);
}
/**
 * 化简 Rational
 *
 * @param a
 */
function avReduce(a) {
    const gcdValue = (0,common_math_gcd__WEBPACK_IMPORTED_MODULE_2__["default"])(a.num, a.den);
    if (gcdValue <= 1) {
        return;
    }
    a.den /= gcdValue;
    a.num /= gcdValue;
}
/**
 * 化简 Rational
 *
 * @param a
 */
function avReduce2(a) {
    const gcdValue = (0,common_math_gcd__WEBPACK_IMPORTED_MODULE_2__["default"])(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a + 4));
    if (gcdValue <= 1) {
        return;
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](a + 4, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a + 4) / gcdValue);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](a, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a) / gcdValue);
}


/***/ }),

/***/ "./src/cheap/allocator/AllocatorJS.ts":
/*!********************************************!*\
  !*** ./src/cheap/allocator/AllocatorJS.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AllocatorJS)
/* harmony export */ });
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _thread_mutex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../thread/mutex */ "./src/cheap/thread/mutex.ts");
/* harmony import */ var _staticData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../staticData */ "./src/cheap/staticData.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src/cheap/allocator/AllocatorJS.ts";





const ALIGNMENT_IN_BYTES = 8;
const ALIGNMENT_MASK = ALIGNMENT_IN_BYTES - 1;
const POINTER_SIZE_IN_BYTES = 4;
const BYTES_TO_QUADS_SHIFT = 2;
const MIN_FREEABLE_SIZE_IN_BYTES = 16;
const MIN_FREEABLE_SIZE_IN_QUADS = bytesToQuads(MIN_FREEABLE_SIZE_IN_BYTES);
const MAX_HEIGHT = 32;
const HEADER_SIZE_IN_QUADS = 1 + (MAX_HEIGHT * 2);
const HEADER_OFFSET_IN_QUADS = 1;
const HEIGHT_OFFSET_IN_QUADS = 0;
const NEXT_OFFSET_IN_QUADS = 2;
const POINTER_SIZE_IN_QUADS = 1;
const POINTER_OVERHEAD_IN_QUADS = 2;
const FIRST_BLOCK_OFFSET_IN_QUADS = HEADER_OFFSET_IN_QUADS + HEADER_SIZE_IN_QUADS + POINTER_OVERHEAD_IN_QUADS;
const FIRST_BLOCK_OFFSET_IN_BYTES = FIRST_BLOCK_OFFSET_IN_QUADS * POINTER_SIZE_IN_BYTES;
const OVERHEAD_IN_BYTES = (FIRST_BLOCK_OFFSET_IN_QUADS + 1) * POINTER_SIZE_IN_BYTES;
class AllocatorJS {
    buffer;
    byteOffset;
    heapOffset;
    heapLength;
    int32Array;
    updates;
    options;
    shared;
    handles;
    constructor(options, init = true) {
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_0__.extend({
            growSize: 1048576,
            maxHeapSize: 2097152000
        }, options);
        this.handles = [];
        this.buffer = options.buffer;
        this.shared = false;
        if (this.options.memory || this.buffer instanceof ArrayBuffer || this.buffer instanceof SharedArrayBuffer) {
            this.byteOffset = options.byteOffset ?? 0;
            this.heapOffset = alignHeapOffset(this.byteOffset + quadsToBytes(MAX_HEIGHT), options.byteLength ?? this.buffer.byteLength);
            this.heapLength = alignHeapLength((options.byteLength ?? this.buffer.byteLength) - this.heapOffset);
            this.int32Array = new Int32Array(this.buffer, this.heapOffset, bytesToQuads(this.heapLength));
            this.updates = new Int32Array(this.buffer, this.byteOffset, MAX_HEIGHT);
            if (typeof SharedArrayBuffer === 'function' && this.buffer instanceof SharedArrayBuffer) {
                this.shared = true;
            }
        }
        else {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal('Expected buffer to be an instance of Buffer or ArrayBuffer', cheap__fileName__0, 109);
        }
        if (init) {
            this.updates.fill(HEADER_OFFSET_IN_QUADS);
            prepare(this.int32Array);
            checkListIntegrity(this.int32Array);
        }
    }
    addUpdateHandle(handle) {
        if (!common_util_array__WEBPACK_IMPORTED_MODULE_1__.has(this.handles, handle)) {
            this.handles.push(handle);
        }
    }
    removeUpdateHandle(handle) {
        common_util_array__WEBPACK_IMPORTED_MODULE_1__.remove(this.handles, handle);
    }
    malloc_(size) {
        size = align(size, ALIGNMENT_MASK);
        if (size < MIN_FREEABLE_SIZE_IN_BYTES) {
            size = MIN_FREEABLE_SIZE_IN_BYTES;
        }
        const minimumSize = bytesToQuads(size);
        const block = this.findFreeBlock(this.int32Array, minimumSize);
        if (block <= HEADER_OFFSET_IN_QUADS) {
            return 0;
        }
        const blockSize = readSize(this.int32Array, block);
        if (blockSize - (minimumSize + POINTER_OVERHEAD_IN_QUADS) >= MIN_FREEABLE_SIZE_IN_QUADS) {
            split(this.int32Array, block, minimumSize, blockSize, this.updates);
        }
        else {
            remove(this.int32Array, block, blockSize, this.updates);
        }
        return quadsToBytes(block) + this.heapOffset;
    }
    /**
     * Allocate a given number of bytes and return the offset.
     * If allocation fails, returns 0.
     */
    malloc(size) {
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.lock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex, !false);
            this.checkBuffer();
        }
        const address = this.malloc_(size);
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.unlock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex);
        }
        return address;
    }
    calloc_(num, size) {
        let numberOfBytes = num * size;
        if (numberOfBytes < MIN_FREEABLE_SIZE_IN_BYTES) {
            numberOfBytes = MIN_FREEABLE_SIZE_IN_BYTES;
        }
        else {
            numberOfBytes = align(numberOfBytes, ALIGNMENT_MASK);
        }
        const address = this.malloc_(numberOfBytes);
        if (address === 0) {
            // Not enough space
            return 0;
        }
        const offset = bytesToQuads(address - this.heapOffset);
        this.int32Array.subarray(offset, offset + bytesToQuads(numberOfBytes)).fill(0);
        return address;
    }
    calloc(num, size) {
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.lock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex, !false);
            this.checkBuffer();
        }
        const address = this.calloc_(num, size);
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.unlock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex);
        }
        return address;
    }
    realloc_(address, size) {
        if (address === 0) {
            return this.malloc_(size);
        }
        const originAddress = address;
        if (size === 0) {
            this.free_(originAddress);
            return 0;
        }
        address = address - this.heapOffset;
        let originBlock = bytesToQuads(address);
        let block = originBlock;
        let padding = 0;
        if (isAlign(this.int32Array, originBlock)) {
            block = this.int32Array[originBlock - 1];
            padding = originBlock - block;
        }
        const blockSize = readSize(this.int32Array, block) - padding;
        const minimumSize = bytesToQuads(align(size, ALIGNMENT_MASK));
        if (blockSize >= minimumSize) {
            return originAddress;
        }
        else {
            const newAddress = this.malloc_(size);
            if (newAddress === 0) {
                this.free_(originAddress);
                return 0;
            }
            this.int32Array.set(this.int32Array.subarray(originBlock, originBlock + blockSize), bytesToQuads(newAddress - this.heapOffset));
            this.free_(originAddress);
            return newAddress;
        }
    }
    realloc(address, size) {
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.lock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex, !false);
            this.checkBuffer();
        }
        address = this.realloc_(address, size);
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.unlock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex);
        }
        return address;
    }
    alignedAlloc_(alignment, size) {
        if (alignment <= ALIGNMENT_IN_BYTES) {
            // malloc 以 ALIGNMENT_IN_BYTES 字节对齐
            return this.malloc_(size);
        }
        const address = this.malloc_(size + alignment - 1 + POINTER_SIZE_IN_BYTES);
        if (address === 0) {
            return 0;
        }
        const alignmentAddress = (address + alignment - 1 + POINTER_SIZE_IN_BYTES) & ~(alignment - 1);
        this.int32Array[bytesToQuads(alignmentAddress - this.heapOffset) - POINTER_SIZE_IN_QUADS] = bytesToQuads(address - this.heapOffset);
        return alignmentAddress;
    }
    alignedAlloc(alignment, size) {
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.lock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex, !false);
            this.checkBuffer();
        }
        const address = this.alignedAlloc_(alignment, size);
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.unlock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex);
        }
        return address;
    }
    free_(address) {
        if (address === 0) {
            return;
        }
        address = address - this.heapOffset;
        let block = bytesToQuads(address);
        if (isAlign(this.int32Array, block)) {
            block = this.int32Array[block - POINTER_SIZE_IN_QUADS];
        }
        if (isFree(this.int32Array, block)) {
            return;
        }
        const blockSize = readSize(this.int32Array, block);
        const preceding = getFreeBlockBefore(this.int32Array, block);
        const trailing = getFreeBlockAfter(this.int32Array, block);
        if (preceding !== 0) {
            if (trailing !== 0) {
                insertMiddle(this.int32Array, preceding, block, blockSize, trailing, this.updates);
            }
            else {
                insertAfter(this.int32Array, preceding, block, blockSize, this.updates);
            }
        }
        else if (trailing !== 0) {
            insertBefore(this.int32Array, trailing, block, blockSize, this.updates);
        }
        else {
            insert(this.int32Array, block, blockSize, this.updates);
        }
    }
    /**
     * Free a number of bytes from the given address.
     */
    free(address) {
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.lock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex, !false);
            this.checkBuffer();
        }
        this.free_(address);
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.unlock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex);
        }
    }
    /**
     * Return the size of the block at the given address.
     */
    sizeof(address) {
        if (address === 0) {
            return 0;
        }
        address -= this.heapOffset;
        let block = bytesToQuads(address);
        if (isAlign(this.int32Array, block)) {
            block = this.int32Array[block - POINTER_SIZE_IN_QUADS];
        }
        return quadsToBytes(readSize(this.int32Array, block));
    }
    /**
     * 获取堆分配信息
     *
     * @returns
     */
    inspect() {
        this.checkBuffer();
        return inspect(this.int32Array, this.heapOffset);
    }
    findFreeBlock(int32Array, minimumSize) {
        let block = findFreeBlock(int32Array, minimumSize);
        if (block === HEADER_OFFSET_IN_QUADS) {
            if (this.options.growAllowed && this.heapLength < this.options.maxHeapSize) {
                const block = this.int32Array.length + 1;
                let int32Array;
                let updates;
                let byteOffset = 0;
                let heapLength = 0;
                let heapOffset = 0;
                if (this.options.onResize) {
                    const result = this.options.onResize(this.int32Array, this.int32Array.byteLength + align(Math.max(this.options.growSize, quadsToBytes(minimumSize)), ALIGNMENT_MASK));
                    byteOffset = result.byteOffset ?? 0;
                    heapOffset = alignHeapOffset(byteOffset + quadsToBytes(MAX_HEIGHT), result.byteLength ?? result.buffer.byteLength);
                    heapLength = alignHeapLength((result.byteLength ?? result.buffer.byteLength) - heapOffset);
                    int32Array = new Int32Array(result.buffer, heapOffset, bytesToQuads(heapLength));
                    updates = new Int32Array(result.buffer, byteOffset, MAX_HEIGHT);
                }
                else {
                    const buffer = new ArrayBuffer(this.int32Array.length + bytesToQuads(this.options.growSize));
                    heapOffset = alignHeapOffset(byteOffset + quadsToBytes(MAX_HEIGHT), buffer.byteLength);
                    heapLength = alignHeapLength(buffer.byteLength - heapOffset);
                    int32Array = new Int32Array(buffer, heapOffset, bytesToQuads(heapLength));
                    int32Array.set(this.int32Array, 0);
                    updates = new Int32Array(buffer, byteOffset, MAX_HEIGHT);
                }
                this.byteOffset = byteOffset;
                this.heapOffset = heapOffset;
                this.buffer = int32Array.buffer;
                this.heapLength = heapLength;
                this.int32Array = int32Array;
                this.updates = updates;
                const blockSize = int32Array.length - (block - 1) - POINTER_OVERHEAD_IN_QUADS;
                writeFreeBlockSize(int32Array, blockSize, block);
                const preceding = getFreeBlockBefore(int32Array, block);
                if (preceding !== 0) {
                    insertAfter(int32Array, preceding, block, blockSize, this.updates);
                }
                else {
                    insert(int32Array, block, blockSize, this.updates);
                }
                if (this.handles.length) {
                    common_util_array__WEBPACK_IMPORTED_MODULE_1__.each(this.handles, (func) => {
                        func(this.buffer);
                    });
                }
                return this.findFreeBlock(this.int32Array, minimumSize);
            }
            return block;
        }
        else {
            return block;
        }
    }
    getBuffer() {
        return this.buffer;
    }
    isAlloc(pointer) {
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.lock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex, !false);
            this.checkBuffer();
        }
        const block = bytesToQuads(pointer - this.heapOffset);
        let next = this.int32Array[HEADER_OFFSET_IN_QUADS + NEXT_OFFSET_IN_QUADS];
        // sometime get undefined from the last free node in v8
        // but it's is all right |=_=
        while (next && next !== HEADER_OFFSET_IN_QUADS) {
            if (block >= next && block < next + this.int32Array[next - POINTER_SIZE_IN_QUADS]) {
                if (this.shared) {
                    (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.unlock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex);
                }
                return false;
            }
            next = this.int32Array[next + NEXT_OFFSET_IN_QUADS];
        }
        if (this.shared) {
            (0,_thread_mutex__WEBPACK_IMPORTED_MODULE_2__.unlock)(_staticData__WEBPACK_IMPORTED_MODULE_3__.heapMutex);
        }
        return true;
    }
    checkBuffer() {
        if (this.options.memory && this.options.memory.buffer !== this.buffer) {
            this.buffer = this.options.memory.buffer;
            this.heapLength = alignHeapLength(this.buffer.byteLength - this.heapOffset);
            this.int32Array = new Int32Array(this.buffer, this.heapOffset, bytesToQuads(this.heapLength));
        }
    }
}
/**
 * Prepare the given int32Array and ensure it contains a valid header.
 */
function prepare(int32Array) {
    if (!verifyHeader(int32Array)) {
        writeInitialHeader(int32Array);
    }
}
/**
 * Verify that the int32Array contains a valid header.
 */
function verifyHeader(int32Array) {
    return int32Array[HEADER_OFFSET_IN_QUADS - 1] === HEADER_SIZE_IN_QUADS
        && int32Array[HEADER_OFFSET_IN_QUADS + HEADER_SIZE_IN_QUADS] === HEADER_SIZE_IN_QUADS;
}
/**
 * Write the initial header for an empty int32Array.
 */
function writeInitialHeader(int32Array) {
    const header = HEADER_OFFSET_IN_QUADS;
    const headerSize = HEADER_SIZE_IN_QUADS;
    const block = FIRST_BLOCK_OFFSET_IN_QUADS;
    const blockSize = int32Array.length - (header + headerSize + POINTER_OVERHEAD_IN_QUADS + POINTER_SIZE_IN_QUADS);
    writeFreeBlockSize(int32Array, headerSize, header);
    int32Array[header + HEIGHT_OFFSET_IN_QUADS] = 1;
    int32Array[header + NEXT_OFFSET_IN_QUADS] = block;
    for (let height = 1; height < MAX_HEIGHT; height++) {
        int32Array[header + NEXT_OFFSET_IN_QUADS + height] = HEADER_OFFSET_IN_QUADS;
    }
    writeFreeBlockSize(int32Array, blockSize, block);
    int32Array[block + HEIGHT_OFFSET_IN_QUADS] = 1;
    int32Array[block + NEXT_OFFSET_IN_QUADS] = header;
}
/**
 * Check the integrity of the freelist in the given array.
 */
function checkListIntegrity(int32Array) {
    let block = FIRST_BLOCK_OFFSET_IN_QUADS;
    while (block < int32Array.length - POINTER_SIZE_IN_QUADS) {
        const size = readSize(int32Array, block);
        /* istanbul ignore if  */
        if (size < POINTER_OVERHEAD_IN_QUADS || size >= int32Array.length - FIRST_BLOCK_OFFSET_IN_QUADS) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal(`Got invalid sized chunk at ${quadsToBytes(block)} (${quadsToBytes(size)} bytes).`, cheap__fileName__0, 568);
        }
        else if (isFree(int32Array, block)) {
            checkFreeBlockIntegrity(int32Array, block, size);
        }
        else {
            checkUsedBlockIntegrity(int32Array, block, size);
        }
        block += size + POINTER_OVERHEAD_IN_QUADS;
    }
    return true;
}
function checkFreeBlockIntegrity(int32Array, block, blockSize) {
    /* istanbul ignore if  */
    if (int32Array[block - 1] !== int32Array[block + blockSize]) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal(`Block length header does not match footer (${quadsToBytes(int32Array[block - 1])} vs ${quadsToBytes(int32Array[block + blockSize])}).`, cheap__fileName__0, 584);
    }
    const height = int32Array[block + HEIGHT_OFFSET_IN_QUADS];
    /* istanbul ignore if  */
    if (height < 1 || height > MAX_HEIGHT) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal(`Block ${quadsToBytes(block)} height must be between 1 and ${MAX_HEIGHT}, got ${height}.`, cheap__fileName__0, 589);
    }
    for (let i = 0; i < height; i++) {
        const pointer = int32Array[block + NEXT_OFFSET_IN_QUADS + i];
        /* istanbul ignore if  */
        if (pointer >= FIRST_BLOCK_OFFSET_IN_QUADS && !isFree(int32Array, pointer)) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal(`Block ${quadsToBytes(block)} has a pointer to a non-free block (${quadsToBytes(pointer)}).`, cheap__fileName__0, 595);
        }
    }
    return true;
}
function checkUsedBlockIntegrity(int32Array, block, blockSize) {
    /* istanbul ignore if  */
    if (int32Array[block - 1] !== int32Array[block + blockSize]) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal(`Block length header does not match footer (${quadsToBytes(int32Array[block - 1])} vs ${quadsToBytes(int32Array[block + blockSize])}).`, cheap__fileName__0, 604);
    }
    else {
        return true;
    }
}
/**
 * Inspect the freelist in the given array.
 */
function inspect(int32Array, byteOffset) {
    const blocks = [];
    const header = readListNode(int32Array, HEADER_OFFSET_IN_QUADS, byteOffset);
    let block = FIRST_BLOCK_OFFSET_IN_QUADS;
    let used = 0;
    while (block < int32Array.length - POINTER_SIZE_IN_QUADS) {
        const size = readSize(int32Array, block);
        /* istanbul ignore if  */
        if (size < POINTER_OVERHEAD_IN_QUADS || size >= int32Array.length) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal(`Got invalid sized chunk at ${quadsToBytes(block)} (${quadsToBytes(size)})`, cheap__fileName__0, 624);
        }
        if (isFree(int32Array, block)) {
            // @flowIssue todo
            blocks.push(readListNode(int32Array, block, byteOffset));
        }
        else {
            used += quadsToBytes(size);
            blocks.push({
                type: 'used',
                block: block,
                offset: quadsToBytes(block) + byteOffset,
                size: quadsToBytes(size)
            });
        }
        block += size + POINTER_OVERHEAD_IN_QUADS;
    }
    return { header, blocks, total: quadsToBytes(int32Array.length), used };
}
/**
 * Convert quads to bytes.
 */
function quadsToBytes(num) {
    return (num << BYTES_TO_QUADS_SHIFT) >>> 0;
}
/**
 * Convert bytes to quads.
 */
function bytesToQuads(num) {
    return num >>> BYTES_TO_QUADS_SHIFT;
}
/**
 * Align the given value to 8 bytes.
 */
function align(value, alignment) {
    return ((value + alignment) & ~alignment) >>> 0;
}
/**
 * align heap
 *
 * @param offset heap start offset
 * @param byteLength  buffer length
 * @returns
 */
function alignHeapOffset(offset, byteLength) {
    const length = byteLength - offset;
    // 保证 heapLength 为 ALIGNMENT_IN_BYTES 对齐
    let heapOffset = offset + (align(length, ALIGNMENT_MASK) === length
        ? 0
        : (length - align(length, ALIGNMENT_MASK) + ALIGNMENT_IN_BYTES));
    return heapOffset;
}
function alignHeapLength(length) {
    // header 所占 int length 为奇数，则总长度也需要为奇数保证 body 为偶数
    if (!((HEADER_OFFSET_IN_QUADS + HEADER_SIZE_IN_QUADS) % 2)) {
        length -= POINTER_SIZE_IN_BYTES;
    }
    return length;
}
/**
 * Read the list pointers for a given block.
 */
function readListNode(int32Array, block, byteOffset) {
    const height = int32Array[block + HEIGHT_OFFSET_IN_QUADS];
    const pointers = [];
    for (let i = 0; i < height; i++) {
        pointers.push(int32Array[block + NEXT_OFFSET_IN_QUADS + i]);
    }
    return {
        type: 'free',
        block,
        offset: quadsToBytes(block) + byteOffset,
        height,
        pointers,
        size: quadsToBytes(int32Array[block - 1])
    };
}
/**
 * Read the size (in quads) of the block at the given address.
 */
function readSize(int32Array, block) {
    const n = int32Array[block - 1];
    const mask = n >> 31;
    return (n + mask) ^ mask;
}
/**
 * Write the size of the block at the given address.
 * Note: This ONLY works for free blocks, not blocks in use.
 */
function writeFreeBlockSize(int32Array, size, block) {
    int32Array[block - 1] = size;
    int32Array[block + size] = size;
}
/**
 * Populate the `UPDATES` array with the offset of the last item in each
 * list level, *before* a node of at least the given size.
 */
function findPredecessors(int32Array, minimumSize, UPDATES) {
    const listHeight = int32Array[HEADER_OFFSET_IN_QUADS + HEIGHT_OFFSET_IN_QUADS];
    let node = HEADER_OFFSET_IN_QUADS;
    for (let height = listHeight; height > 0; height--) {
        let next = node + NEXT_OFFSET_IN_QUADS + (height - 1);
        while (int32Array[next] >= FIRST_BLOCK_OFFSET_IN_QUADS && int32Array[int32Array[next] - 1] < minimumSize) {
            node = int32Array[next];
            next = node + NEXT_OFFSET_IN_QUADS + (height - 1);
        }
        UPDATES[height - 1] = node;
    }
}
/**
 * Find a free block with at least the given size and return its offset in quads.
 */
function findFreeBlock(int32Array, minimumSize) {
    let block = HEADER_OFFSET_IN_QUADS;
    for (let height = int32Array[HEADER_OFFSET_IN_QUADS + HEIGHT_OFFSET_IN_QUADS]; height > 0; height--) {
        let next = int32Array[block + NEXT_OFFSET_IN_QUADS + (height - 1)];
        while (next !== HEADER_OFFSET_IN_QUADS && int32Array[next - POINTER_SIZE_IN_QUADS] < minimumSize) {
            block = next;
            next = int32Array[block + NEXT_OFFSET_IN_QUADS + (height - 1)];
        }
    }
    block = int32Array[block + NEXT_OFFSET_IN_QUADS];
    if (block === HEADER_OFFSET_IN_QUADS) {
        return block;
    }
    else {
        return block;
    }
}
/**
 * Split the given block after a certain number of bytes and add the second half to the freelist.
 */
function split(int32Array, block, firstSize, blockSize, UPDATES) {
    const second = (block + firstSize + POINTER_OVERHEAD_IN_QUADS);
    const secondSize = (blockSize - (second - block));
    remove(int32Array, block, blockSize, UPDATES);
    int32Array[block - 1] = -firstSize;
    int32Array[block + firstSize] = -firstSize;
    int32Array[second - 1] = -secondSize;
    int32Array[second + secondSize] = -secondSize;
    insert(int32Array, second, secondSize, UPDATES);
}
/**
 * Remove the given block from the freelist and mark it as allocated.
 */
function remove(int32Array, block, blockSize, UPDATES) {
    findPredecessors(int32Array, blockSize, UPDATES);
    let node = int32Array[UPDATES[0] + NEXT_OFFSET_IN_QUADS];
    while (node !== block && node !== HEADER_OFFSET_IN_QUADS && int32Array[node - 1] <= blockSize) {
        for (let height = int32Array[node + HEIGHT_OFFSET_IN_QUADS] - 1; height >= 0; height--) {
            if (int32Array[node + NEXT_OFFSET_IN_QUADS + height] === block) {
                UPDATES[height] = node;
            }
        }
        node = int32Array[node + NEXT_OFFSET_IN_QUADS];
    }
    let listHeight = int32Array[HEADER_OFFSET_IN_QUADS + HEIGHT_OFFSET_IN_QUADS];
    for (let height = 0; height < listHeight; height++) {
        const next = int32Array[UPDATES[height] + NEXT_OFFSET_IN_QUADS + height];
        if (next !== block) {
            break;
        }
        int32Array[UPDATES[height] + NEXT_OFFSET_IN_QUADS + height] = int32Array[block + NEXT_OFFSET_IN_QUADS + height];
    }
    while (listHeight > 0 && int32Array[HEADER_OFFSET_IN_QUADS + NEXT_OFFSET_IN_QUADS + (listHeight - 1)] === HEADER_OFFSET_IN_QUADS) {
        listHeight--;
        int32Array[HEADER_OFFSET_IN_QUADS + HEIGHT_OFFSET_IN_QUADS] = listHeight;
    }
    // invert the size sign to signify an allocated block
    int32Array[block - 1] = -blockSize;
    int32Array[block + blockSize] = -blockSize;
}
/**
 * Determine whether the block at the given address is free or not.
 */
function isFree(int32Array, block) {
    /* istanbul ignore if  */
    if (block < HEADER_SIZE_IN_QUADS) {
        return false;
    }
    const size = int32Array[block - POINTER_SIZE_IN_QUADS];
    if (size < 0) {
        return false;
    }
    else {
        return true;
    }
}
/**
 * Determine whether the block at the given address is free or not.
 */
function isAlign(int32Array, block) {
    /* istanbul ignore if  */
    if (block < HEADER_SIZE_IN_QUADS) {
        return false;
    }
    const origin = int32Array[block - POINTER_SIZE_IN_QUADS];
    if (origin < 0) {
        return false;
    }
    else {
        return true;
    }
}
/**
 * Get the address of the block before the given one and return the address *if it is free*,
 * otherwise 0.
 */
function getFreeBlockBefore(int32Array, block) {
    if (block <= FIRST_BLOCK_OFFSET_IN_QUADS) {
        return 0;
    }
    const beforeSize = int32Array[block - POINTER_OVERHEAD_IN_QUADS];
    if (beforeSize < POINTER_OVERHEAD_IN_QUADS) {
        return 0;
    }
    return block - (POINTER_OVERHEAD_IN_QUADS + beforeSize);
}
/**
 * Get the address of the block after the given one and return its address *if it is free*,
 * otherwise 0.
 */
function getFreeBlockAfter(int32Array, block) {
    const blockSize = readSize(int32Array, block);
    if (block + blockSize + POINTER_OVERHEAD_IN_QUADS >= int32Array.length - 2) {
        // Block is the last in the list.
        return 0;
    }
    const next = (block + blockSize + POINTER_OVERHEAD_IN_QUADS);
    const nextSize = int32Array[next - POINTER_SIZE_IN_QUADS];
    if (nextSize < POINTER_OVERHEAD_IN_QUADS) {
        return 0;
    }
    return next;
}
/**
 * Insert the given block into the freelist and return the number of bytes that were freed.
 */
function insert(int32Array, block, blockSize, UPDATES) {
    findPredecessors(int32Array, blockSize, UPDATES);
    const blockHeight = generateHeight(int32Array, block, blockSize, UPDATES);
    for (let height = 1; height <= blockHeight; height++) {
        const update = UPDATES[height - 1] + NEXT_OFFSET_IN_QUADS + (height - 1);
        int32Array[block + NEXT_OFFSET_IN_QUADS + (height - 1)] = int32Array[update];
        int32Array[update] = block;
        UPDATES[height - 1] = HEADER_OFFSET_IN_QUADS;
    }
    int32Array[block - 1] = blockSize;
    int32Array[block + blockSize] = blockSize;
    return blockSize;
}
/**
 * Insert the given block into the freelist before the given free block,
 * joining them together, returning the number of bytes which were freed.
 */
function insertBefore(int32Array, trailing, block, blockSize, UPDATES) {
    const trailingSize = readSize(int32Array, trailing);
    remove(int32Array, trailing, trailingSize, UPDATES);
    const size = (blockSize + trailingSize + POINTER_OVERHEAD_IN_QUADS);
    int32Array[block - POINTER_SIZE_IN_QUADS] = -size;
    int32Array[trailing + trailingSize] = -size;
    insert(int32Array, block, size, UPDATES);
    return blockSize;
}
/**
 * Insert the given block into the freelist in between the given free blocks,
 * joining them together, returning the number of bytes which were freed.
 */
function insertMiddle(int32Array, preceding, block, blockSize, trailing, UPDATES) {
    const precedingSize = readSize(int32Array, preceding);
    const trailingSize = readSize(int32Array, trailing);
    const size = ((trailing - preceding) + trailingSize);
    remove(int32Array, preceding, precedingSize, UPDATES);
    remove(int32Array, trailing, trailingSize, UPDATES);
    int32Array[preceding - POINTER_SIZE_IN_QUADS] = -size;
    int32Array[trailing + trailingSize] = -size;
    insert(int32Array, preceding, size, UPDATES);
    return blockSize;
}
/**
 * Insert the given block into the freelist after the given free block,
 * joining them together, returning the number of bytes which were freed.
 */
function insertAfter(int32Array, preceding, block, blockSize, UPDATES) {
    const precedingSize = (block - preceding) - POINTER_OVERHEAD_IN_QUADS;
    const size = ((block - preceding) + blockSize);
    remove(int32Array, preceding, precedingSize, UPDATES);
    int32Array[preceding - POINTER_SIZE_IN_QUADS] = -size;
    int32Array[block + blockSize] = -size;
    insert(int32Array, preceding, size, UPDATES);
    return blockSize;
}
/**
 * Generate a random height for a block, growing the list height by 1 if required.
 */
function generateHeight(int32Array, block, blockSize, UPDATES) {
    const listHeight = int32Array[HEADER_OFFSET_IN_QUADS + HEIGHT_OFFSET_IN_QUADS];
    let height = randomHeight();
    if (blockSize - 1 < height + 1) {
        height = blockSize - 2;
    }
    if (height > listHeight) {
        const newHeight = listHeight + 1;
        int32Array[HEADER_OFFSET_IN_QUADS + HEIGHT_OFFSET_IN_QUADS] = newHeight;
        int32Array[HEADER_OFFSET_IN_QUADS + NEXT_OFFSET_IN_QUADS + (newHeight - 1)] = HEADER_OFFSET_IN_QUADS;
        UPDATES[newHeight] = HEADER_OFFSET_IN_QUADS;
        int32Array[block + HEIGHT_OFFSET_IN_QUADS] = newHeight;
        return newHeight;
    }
    else {
        int32Array[block + HEIGHT_OFFSET_IN_QUADS] = height;
        return height;
    }
}
/**
 * Generate a random height for a new block.
 */
function randomHeight() {
    let height = 1;
    while (Math.random() < 0.5 && height < MAX_HEIGHT) {
        height += 1;
    }
    return height;
}


/***/ }),

/***/ "./src/cheap/allocator/Table.ts":
/*!**************************************!*\
  !*** ./src/cheap/allocator/Table.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebassemblyTable: () => (/* binding */ WebassemblyTable)
/* harmony export */ });
const INIT_SIZE = 10;
class WebassemblyTable {
    table;
    pointer;
    nodes;
    constructor() {
        this.table = new WebAssembly.Table({
            initial: 6 /* BuiltinTableSlot.SLOT_NB */ + INIT_SIZE,
            element: 'anyfunc'
        });
        this.pointer = 6 /* BuiltinTableSlot.SLOT_NB */;
        this.nodes = [{
                pointer: this.pointer,
                length: INIT_SIZE,
                free: true
            }];
    }
    getPointer() {
        return this.pointer;
    }
    alloc(count) {
        let p = this.findFree(count);
        if (p < 0) {
            const last = this.nodes[this.nodes.length - 1];
            const length = count - (last.free ? last.length : 0);
            this.table.grow(length);
            if (last.free) {
                last.length = last.length + length;
            }
            else {
                this.nodes.push({
                    pointer: last.pointer + last.length,
                    length,
                    free: true
                });
            }
            p = this.findFree(count);
        }
        const node = this.nodes[p];
        if (node.length > count) {
            this.nodes.splice(p + 1, 0, {
                pointer: node.pointer + count,
                length: node.length - count,
                free: true
            });
            node.length = count;
        }
        node.free = false;
        return node.pointer;
    }
    free(pointer) {
        let p = this.findNode(pointer);
        const node = this.nodes[p];
        if (node && !node.free) {
            const before = this.nodes[p - 1];
            const after = this.nodes[p + 1];
            if (before && before.free) {
                if (after && after.free) {
                    before.length += (node.length + after.length);
                    this.nodes.splice(p, 2);
                }
                else {
                    before.length += node.length;
                    this.nodes.splice(p, 1);
                }
            }
            else {
                if (after && after.free) {
                    node.length += after.length;
                    this.nodes.splice(p + 1, 1);
                    node.free = true;
                }
                else {
                    node.free = true;
                }
            }
        }
        if (this.nodes.length === 1 && this.nodes[0].free) {
            // 当全部 free 之后重新创建新的 Table，之前 WebAssembly 设置的函数引用在 chrome 上没有被回收，会内存泄漏
            const table = new WebAssembly.Table({
                initial: 6 /* BuiltinTableSlot.SLOT_NB */ + INIT_SIZE,
                element: 'anyfunc'
            });
            this.pointer = 6 /* BuiltinTableSlot.SLOT_NB */;
            this.nodes = [{
                    pointer: this.pointer,
                    length: INIT_SIZE,
                    free: true
                }];
            for (let i = 1; i < this.pointer; i++) {
                table.set(i, this.table.get(i));
            }
            this.table = table;
        }
    }
    get(index) {
        return this.table.get(index);
    }
    set(index, value) {
        if (index < 0 || index >= this.pointer) {
            throw new RangeError('index out of bound');
        }
        this.table.set(index, value);
    }
    inspect() {
        return this.nodes;
    }
    findFree(length) {
        let index = -1;
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].length >= length && this.nodes[i].free) {
                index = i;
                break;
            }
        }
        return index;
    }
    findNode(pointer) {
        let index = -1;
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].pointer === pointer) {
                index = i;
                break;
            }
        }
        return index;
    }
}


/***/ }),

/***/ "./src/cheap/asm/memory.ts":
/*!*********************************!*\
  !*** ./src/cheap/asm/memory.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* unused harmony exports instance, support */
/* harmony import */ var common_util_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/base64 */ "./src/common/util/base64.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_wasm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/wasm */ "./src/common/util/wasm.ts");
/* harmony import */ var _memory_asm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./memory.asm */ "./src/cheap/asm/memory.asm");
/* harmony import */ var _memory_asm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_memory_asm__WEBPACK_IMPORTED_MODULE_5__);
var cheap__fileName__0 = "src/cheap/asm/memory.ts";






/**
 * WebAssembly runtime 实例
 */
let instance;
function support() {
    return !!instance;
}
async function init(memory) {
    try {
        let wasm = (0,common_util_base64__WEBPACK_IMPORTED_MODULE_0__.base64ToUint8Array)((_memory_asm__WEBPACK_IMPORTED_MODULE_5___default()));
        common_util_wasm__WEBPACK_IMPORTED_MODULE_4__.setMemoryShared(wasm, typeof SharedArrayBuffer === 'function' && memory.buffer instanceof SharedArrayBuffer);
        instance = (await WebAssembly.instantiate(wasm, {
            env: {
                memory
            }
        })).instance;
        (0,_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.override)({
            [4 /* CTypeEnum.char */]: instance.exports.readU8,
            [5 /* CTypeEnum.atomic_char */]: instance.exports.readU8,
            [2 /* CTypeEnum.uint8 */]: instance.exports.readU8,
            [3 /* CTypeEnum.atomic_uint8 */]: instance.exports.readU8,
            [6 /* CTypeEnum.uint16 */]: instance.exports.readU16,
            [7 /* CTypeEnum.atomic_uint16 */]: instance.exports.readU16,
            [8 /* CTypeEnum.uint32 */]: (pointer) => {
                return instance.exports.read32(pointer) >>> 0;
            },
            [9 /* CTypeEnum.atomic_uint32 */]: (pointer) => {
                return instance.exports.read32(pointer) >>> 0;
            },
            [10 /* CTypeEnum.uint64 */]: (pointer) => {
                return BigInt.asUintN(64, instance.exports.read64(pointer));
            },
            [22 /* CTypeEnum.atomic_uint64 */]: (pointer) => {
                return BigInt.asUintN(64, instance.exports.read64(pointer));
            },
            [11 /* CTypeEnum.int8 */]: instance.exports.read8,
            [12 /* CTypeEnum.atomic_int8 */]: instance.exports.read8,
            [13 /* CTypeEnum.int16 */]: instance.exports.read16,
            [14 /* CTypeEnum.atomic_int16 */]: instance.exports.read16,
            [15 /* CTypeEnum.int32 */]: instance.exports.read32,
            [16 /* CTypeEnum.atomic_int32 */]: instance.exports.read32,
            [17 /* CTypeEnum.int64 */]: instance.exports.read64,
            [21 /* CTypeEnum.atomic_int64 */]: instance.exports.read64,
            [18 /* CTypeEnum.float */]: instance.exports.readf32,
            [19 /* CTypeEnum.double */]: instance.exports.readf64,
            [20 /* CTypeEnum.pointer */]: (pointer) => {
                return instance.exports.read32(pointer) >>> 0;
            }
        });
        (0,_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.override)({
            [4 /* CTypeEnum.char */]: instance.exports.write8,
            [5 /* CTypeEnum.atomic_char */]: instance.exports.write8,
            [2 /* CTypeEnum.uint8 */]: instance.exports.write8,
            [3 /* CTypeEnum.atomic_uint8 */]: instance.exports.write8,
            [6 /* CTypeEnum.uint16 */]: instance.exports.write16,
            [7 /* CTypeEnum.atomic_uint16 */]: instance.exports.write16,
            [8 /* CTypeEnum.uint32 */]: instance.exports.write32,
            [9 /* CTypeEnum.atomic_uint32 */]: instance.exports.write32,
            [10 /* CTypeEnum.uint64 */]: instance.exports.write64,
            [22 /* CTypeEnum.atomic_uint64 */]: instance.exports.write64,
            [11 /* CTypeEnum.int8 */]: instance.exports.write8,
            [12 /* CTypeEnum.atomic_int8 */]: instance.exports.write8,
            [13 /* CTypeEnum.int16 */]: instance.exports.write16,
            [14 /* CTypeEnum.atomic_int16 */]: instance.exports.write16,
            [15 /* CTypeEnum.int32 */]: instance.exports.write32,
            [16 /* CTypeEnum.atomic_int32 */]: instance.exports.write32,
            [17 /* CTypeEnum.int64 */]: instance.exports.write64,
            [21 /* CTypeEnum.atomic_int64 */]: instance.exports.write64,
            [18 /* CTypeEnum.float */]: instance.exports.writef32,
            [19 /* CTypeEnum.double */]: instance.exports.writef64,
            [20 /* CTypeEnum.pointer */]: instance.exports.write32
        });
    }
    catch (error) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_1__.warn('memory asm not support, cannot use asm memory function', cheap__fileName__0, 96);
    }
}


/***/ }),

/***/ "./src/cheap/config.ts":
/*!*****************************!*\
  !*** ./src/cheap/config.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HEAP_INITIAL: () => (/* binding */ HEAP_INITIAL),
/* harmony export */   HEAP_MAXIMUM: () => (/* binding */ HEAP_MAXIMUM),
/* harmony export */   HEAP_OFFSET: () => (/* binding */ HEAP_OFFSET),
/* harmony export */   STACK_SIZE: () => (/* binding */ STACK_SIZE),
/* harmony export */   USE_THREADS: () => (/* binding */ USE_THREADS)
/* harmony export */ });
/* unused harmony export STACK_ALIGNMENT */
/* harmony import */ var common_util_support__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/support */ "./src/common/util/support.ts");
/* harmony import */ var common_util_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/constant */ "./src/common/util/constant.ts");


/**
 * 是否使用多线程
 */
const USE_THREADS =  false && 0;
/**
 * 栈地址对齐
 * 栈地址至少是 16 字节对齐，因为 wasm 的基本类型中最大是 v128 16 字节
 */
let STACK_ALIGNMENT = 16;
/**
 * 栈大小，应为 STACK_ALIGNMENT 的整数倍
 */
let STACK_SIZE = 1048576;
/**
 * 堆保留段，可用于静态数据区分配
 */
const HEAP_OFFSET = 1024;
/**
 * 堆初始大小
 */
const HEAP_INITIAL = (common_util_constant__WEBPACK_IMPORTED_MODULE_1__.SELF.CHEAP_HEAP_INITIAL ?? 265);
/**
 * 堆最大大小
 */
const HEAP_MAXIMUM = 65536;


/***/ }),

/***/ "./src/cheap/ctypeEnumImpl.ts":
/*!************************************!*\
  !*** ./src/cheap/ctypeEnumImpl.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var common_function_isLittleEndian__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/function/isLittleEndian */ "./src/common/function/isLittleEndian.ts");
/* harmony import */ var _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");



let getAllocator;
let getView;
const littleEndian = (0,common_function_isLittleEndian__WEBPACK_IMPORTED_MODULE_0__["default"])();
function writeU8(pointer, value) {
    getView().setUint8(pointer, value);
}
function readU8(pointer) {
    return getView().getUint8(pointer);
}
function writeU16(pointer, value) {
    getView().setUint16(pointer, value, littleEndian);
}
function readU16(pointer) {
    return getView().getUint16(pointer, littleEndian);
}
function writeU32(pointer, value) {
    getView().setUint32(pointer, value, littleEndian);
}
function readU32(pointer) {
    return getView().getUint32(pointer, littleEndian);
}
function writeU64(pointer, value) {
    getView().setBigUint64(pointer, value, littleEndian);
}
function readU64(pointer) {
    return getView().getBigUint64(pointer, littleEndian);
}
function write8(pointer, value) {
    getView().setInt8(pointer, value);
}
function read8(pointer) {
    return getView().getInt8(pointer);
}
function write16(pointer, value) {
    getView().setInt16(pointer, value, littleEndian);
}
function read16(pointer) {
    return getView().getInt16(pointer, littleEndian);
}
function write32(pointer, value) {
    getView().setInt32(pointer, value, littleEndian);
}
function read32(pointer) {
    return getView().getInt32(pointer, littleEndian);
}
function write64(pointer, value) {
    getView().setBigInt64(pointer, value, littleEndian);
}
function read64(pointer) {
    return getView().getBigInt64(pointer, littleEndian);
}
function writef32(pointer, value) {
    getView().setFloat32(pointer, value, littleEndian);
}
function readf32(pointer) {
    return getView().getFloat32(pointer, littleEndian);
}
function writef64(pointer, value) {
    getView().setFloat64(pointer, value, littleEndian);
}
function readf64(pointer) {
    return getView().getFloat64(pointer, littleEndian);
}
function readPointer(pointer) {
    return getView().getUint32(pointer, littleEndian);
}
function writePointer(pointer, value) {
    return getView().setUint32(pointer, value, littleEndian);
}
function init(getAllocator_, getView_) {
    getAllocator = getAllocator_;
    getView = getView_;
    (0,_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.override)({
        [4 /* CTypeEnum.char */]: readU8,
        [5 /* CTypeEnum.atomic_char */]: readU8,
        [2 /* CTypeEnum.uint8 */]: readU8,
        [3 /* CTypeEnum.atomic_uint8 */]: readU8,
        [6 /* CTypeEnum.uint16 */]: readU16,
        [7 /* CTypeEnum.atomic_uint16 */]: readU16,
        [8 /* CTypeEnum.uint32 */]: readU32,
        [9 /* CTypeEnum.atomic_uint32 */]: readU32,
        [10 /* CTypeEnum.uint64 */]: readU64,
        [11 /* CTypeEnum.int8 */]: read8,
        [12 /* CTypeEnum.atomic_int8 */]: read8,
        [13 /* CTypeEnum.int16 */]: read16,
        [14 /* CTypeEnum.atomic_int16 */]: read16,
        [15 /* CTypeEnum.int32 */]: read32,
        [16 /* CTypeEnum.atomic_int32 */]: read32,
        [17 /* CTypeEnum.int64 */]: read64,
        [18 /* CTypeEnum.float */]: readf32,
        [19 /* CTypeEnum.double */]: readf64,
        [20 /* CTypeEnum.pointer */]: readPointer,
        [23 /* CTypeEnum.bool */]: (pointer) => {
            return !!read8(pointer);
        },
        [24 /* CTypeEnum.atomic_bool */]: (pointer) => {
            return !!read8(pointer);
        }
    });
    (0,_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.override)({
        [4 /* CTypeEnum.char */]: writeU8,
        [5 /* CTypeEnum.atomic_char */]: writeU8,
        [2 /* CTypeEnum.uint8 */]: writeU8,
        [3 /* CTypeEnum.atomic_uint8 */]: writeU8,
        [6 /* CTypeEnum.uint16 */]: writeU16,
        [7 /* CTypeEnum.atomic_uint16 */]: writeU16,
        [8 /* CTypeEnum.uint32 */]: writeU32,
        [9 /* CTypeEnum.atomic_uint32 */]: writeU32,
        [10 /* CTypeEnum.uint64 */]: writeU64,
        [11 /* CTypeEnum.int8 */]: write8,
        [12 /* CTypeEnum.atomic_int8 */]: write8,
        [13 /* CTypeEnum.int16 */]: write16,
        [14 /* CTypeEnum.atomic_int16 */]: write16,
        [15 /* CTypeEnum.int32 */]: write32,
        [16 /* CTypeEnum.atomic_int32 */]: write32,
        [17 /* CTypeEnum.int64 */]: write64,
        [18 /* CTypeEnum.float */]: writef32,
        [19 /* CTypeEnum.double */]: writef64,
        [20 /* CTypeEnum.pointer */]: writePointer,
        [23 /* CTypeEnum.bool */]: (pointer, value) => {
            write8(pointer, value ? 1 : 0);
        },
        [24 /* CTypeEnum.atomic_bool */]: ((pointer, value) => {
            write8(pointer, value ? 1 : 0);
        })
    });
}


/***/ }),

/***/ "./src/cheap/ctypeEnumRead.ts":
/*!************************************!*\
  !*** ./src/cheap/ctypeEnumRead.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CTypeEnumRead: () => (/* binding */ CTypeEnumRead),
/* harmony export */   override: () => (/* binding */ override)
/* harmony export */ });
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");

const CTypeEnumRead = {
    [4 /* CTypeEnum.char */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [5 /* CTypeEnum.atomic_char */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [2 /* CTypeEnum.uint8 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [3 /* CTypeEnum.atomic_uint8 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [6 /* CTypeEnum.uint16 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [7 /* CTypeEnum.atomic_uint16 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [8 /* CTypeEnum.uint32 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [9 /* CTypeEnum.atomic_uint32 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [10 /* CTypeEnum.uint64 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [11 /* CTypeEnum.int8 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [12 /* CTypeEnum.atomic_int8 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [13 /* CTypeEnum.int16 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [14 /* CTypeEnum.atomic_int16 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [15 /* CTypeEnum.int32 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [16 /* CTypeEnum.atomic_int32 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [17 /* CTypeEnum.int64 */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [18 /* CTypeEnum.float */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [19 /* CTypeEnum.double */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [20 /* CTypeEnum.pointer */]: function (pointer) {
        throw new Error('unimplemented');
    },
    [0 /* CTypeEnum.null */]: function (pointer) {
        throw new Error('invalid operate');
    },
    [1 /* CTypeEnum.void */]: function (pointer) {
        throw new Error('invalid operate');
    },
    [22 /* CTypeEnum.atomic_uint64 */]: function (pointer) {
        throw new Error('invalid operate');
    },
    [21 /* CTypeEnum.atomic_int64 */]: function (pointer) {
        throw new Error('invalid operate');
    },
    [23 /* CTypeEnum.bool */]: function (pointer) {
        throw new Error('invalid operate');
    },
    [24 /* CTypeEnum.atomic_bool */]: function (pointer) {
        throw new Error('invalid operate');
    }
};
function override(funcs) {
    common_util_object__WEBPACK_IMPORTED_MODULE_0__.extend(CTypeEnumRead, funcs);
}


/***/ }),

/***/ "./src/cheap/ctypeEnumWrite.ts":
/*!*************************************!*\
  !*** ./src/cheap/ctypeEnumWrite.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CTypeEnumWrite: () => (/* binding */ CTypeEnumWrite),
/* harmony export */   override: () => (/* binding */ override)
/* harmony export */ });
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");

const CTypeEnumWrite = {
    [4 /* CTypeEnum.char */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [5 /* CTypeEnum.atomic_char */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [2 /* CTypeEnum.uint8 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [3 /* CTypeEnum.atomic_uint8 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [6 /* CTypeEnum.uint16 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [7 /* CTypeEnum.atomic_uint16 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [8 /* CTypeEnum.uint32 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [9 /* CTypeEnum.atomic_uint32 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [10 /* CTypeEnum.uint64 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [11 /* CTypeEnum.int8 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [12 /* CTypeEnum.atomic_int8 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [13 /* CTypeEnum.int16 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [14 /* CTypeEnum.atomic_int16 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [15 /* CTypeEnum.int32 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [16 /* CTypeEnum.atomic_int32 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [17 /* CTypeEnum.int64 */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [18 /* CTypeEnum.float */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [19 /* CTypeEnum.double */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [20 /* CTypeEnum.pointer */]: function (pointer, value) {
        throw new Error('unimplemented');
    },
    [0 /* CTypeEnum.null */]: function (pointer, value) {
        throw new Error('invalid operate');
    },
    [1 /* CTypeEnum.void */]: function (pointer, value) {
        throw new Error('invalid operate');
    },
    [22 /* CTypeEnum.atomic_uint64 */]: function (pointer, value) {
        throw new Error('invalid operate');
    },
    [21 /* CTypeEnum.atomic_int64 */]: function (pointer, value) {
        throw new Error('invalid operate');
    },
    [23 /* CTypeEnum.bool */]: function (pointer, value) {
        throw new Error('invalid operate');
    },
    [24 /* CTypeEnum.atomic_bool */]: function (pointer, value) {
        throw new Error('invalid operate');
    }
};
function override(funcs) {
    common_util_object__WEBPACK_IMPORTED_MODULE_0__.extend(CTypeEnumWrite, funcs);
}


/***/ }),

/***/ "./src/cheap/definedStruct.ts":
/*!************************************!*\
  !*** ./src/cheap/definedStruct.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   definedStruct: () => (/* binding */ definedStruct),
/* harmony export */   revokeDefinedStruct: () => (/* binding */ revokeDefinedStruct)
/* harmony export */ });
/* harmony import */ var cheap_std_sizeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/sizeof */ "./src/cheap/std/sizeof.ts");
/* harmony import */ var _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var _typedef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./typedef */ "./src/cheap/typedef.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_function_toString__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/function/toString */ "./src/common/function/toString.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");









function definedProperty(target, key, get, set) {
    Object.defineProperty(target, key, {
        get,
        set,
        configurable: true,
        enumerable: true
    });
}
/**
 * 指针的值
 *
 * @param address
 * @returns
 */
function getPointerValue(address) {
    return function () {
        return _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20 /* CTypeEnum.pointer */](address());
    };
}
function getStruct(target, key, address, struct) {
    return function () {
        return target[`__$__${key}`] || (target[`__$__${key}`] = definedStruct(address(), struct));
    };
}
function getCTypeEnumValue(address, type) {
    return function () {
        return _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[type](address());
    };
}
function getBitFieldValue(address, type, bitLen, offset) {
    const shift = _typedef__WEBPACK_IMPORTED_MODULE_4__.CTypeEnum2Bytes[type] * 8 - offset - bitLen;
    const valueMask = Math.pow(2, bitLen) - 1;
    return function () {
        let value = _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[type](address());
        return (value >>> shift) & valueMask;
    };
}
function setPointerValue(address) {
    return function (newValue) {
        _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[8 /* CTypeEnum.uint32 */](address(), newValue);
    };
}
function setStruct(obj, key, address, struct) {
    const localKey = `__$__${key}`;
    return function (newValue) {
        const proxy = obj[localKey] || (obj[localKey] = definedStruct(address(), struct));
        common_util_object__WEBPACK_IMPORTED_MODULE_6__.each(newValue, (value, key) => {
            proxy[key] = value;
        });
        obj[localKey] = proxy;
    };
}
function setCTypeEnumValue(address, type) {
    return function (newValue) {
        _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[type](address(), newValue);
    };
}
function setBitFieldValue(address, type, bitLen, offset) {
    let zeroMask = 0;
    let len = _typedef__WEBPACK_IMPORTED_MODULE_4__.CTypeEnum2Bytes[type] * 8;
    for (let i = 0; i < bitLen; i++) {
        zeroMask |= (1 << (len - 1 - (i + offset)));
    }
    const valueMask = Math.pow(2, bitLen) - 1;
    const shift = len - offset - bitLen;
    return function (newValue) {
        const addr = address();
        const value = _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[type](addr);
        _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[type](addr, (value & ~zeroMask) | ((newValue & valueMask) << shift));
    };
}
function definedArrayStruct(address, length, type) {
    const obj = {};
    let size = (0,cheap_std_sizeof__WEBPACK_IMPORTED_MODULE_0__["default"])(type);
    for (let i = 0; i < length; i++) {
        const key = (0,common_function_toString__WEBPACK_IMPORTED_MODULE_7__["default"])(i);
        definedProperty(obj, key, getStruct(obj, key, () => {
            return address() + size * i;
        }, type), setStruct(obj, key, () => {
            return address() + size * i;
        }, type));
    }
    return obj;
}
function definedArrayCTypeEnum(address, length, type) {
    const obj = {};
    let size = (0,cheap_std_sizeof__WEBPACK_IMPORTED_MODULE_0__["default"])(type);
    for (let i = 0; i < length; i++) {
        const key = (0,common_function_toString__WEBPACK_IMPORTED_MODULE_7__["default"])(i);
        definedProperty(obj, key, getCTypeEnumValue(() => {
            return address() + size * i;
        }, type), setCTypeEnumValue(() => {
            return address() + size * i;
        }, type));
    }
    return obj;
}
function getArray(address, target, key) {
    return function () {
        const t = target[`__$__${key}`];
        t[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] = address();
        return t;
    };
}
function setArrayStruct(obj, key, address, length, type) {
    const localKey = `__$__${key}`;
    return function (newValue) {
        let proxy = obj[localKey] || definedArrayStruct(address, length, type);
        proxy[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] = address();
        common_util_array__WEBPACK_IMPORTED_MODULE_8__.each(newValue, (value, key) => {
            proxy[key] = value;
        });
        obj[localKey] = proxy;
    };
}
function setArrayCTypeEnum(obj, key, address, length, type) {
    const localKey = `__$__${key}`;
    return function (newValue) {
        let proxy = obj[localKey] || definedArrayCTypeEnum(address, length, type);
        proxy[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] = address();
        common_util_array__WEBPACK_IMPORTED_MODULE_8__.each(newValue, (value, key) => {
            proxy[key] = value;
        });
        obj[localKey] = proxy;
    };
}
function definedStruct(address, struct) {
    let prototype = common_util_is__WEBPACK_IMPORTED_MODULE_5__.func(struct) ? struct.prototype : struct;
    const obj = {};
    obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] = address;
    Object.setPrototypeOf(obj, prototype);
    while (true) {
        let keysMeta = prototype[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructKeysMeta];
        if (keysMeta) {
            keysMeta.forEach((meta, key) => {
                if (meta[3 /* KeyMetaKey.Array */]) {
                    if (meta[1 /* KeyMetaKey.Pointer */]) {
                        definedProperty(obj, key, getArray(() => {
                            return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                        }, obj, key), setArrayCTypeEnum(obj, key, () => {
                            return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                        }, meta[4 /* KeyMetaKey.ArrayLength */], 20 /* CTypeEnum.pointer */));
                    }
                    else {
                        if (common_util_is__WEBPACK_IMPORTED_MODULE_5__.func(meta[0 /* KeyMetaKey.Type */]) || common_util_is__WEBPACK_IMPORTED_MODULE_5__.object(meta[0 /* KeyMetaKey.Type */])) {
                            definedProperty(obj, key, getArray(() => {
                                return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                            }, obj, key), setArrayStruct(obj, key, () => {
                                return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                            }, meta[4 /* KeyMetaKey.ArrayLength */], meta[0 /* KeyMetaKey.Type */]));
                        }
                        else {
                            definedProperty(obj, key, getArray(() => {
                                return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                            }, obj, key), setArrayCTypeEnum(obj, key, () => {
                                return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                            }, meta[4 /* KeyMetaKey.ArrayLength */], meta[0 /* KeyMetaKey.Type */]));
                        }
                    }
                }
                else {
                    if (meta[1 /* KeyMetaKey.Pointer */]) {
                        definedProperty(obj, key, getPointerValue(() => {
                            return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                        }), setPointerValue(() => {
                            return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                        }));
                    }
                    else if (common_util_is__WEBPACK_IMPORTED_MODULE_5__.func(meta[0 /* KeyMetaKey.Type */]) || common_util_is__WEBPACK_IMPORTED_MODULE_5__.object(meta[0 /* KeyMetaKey.Type */])) {
                        definedProperty(obj, key, getStruct(obj, key, () => {
                            return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                        }, meta[0 /* KeyMetaKey.Type */]), setStruct(obj, key, () => {
                            return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                        }, meta[0 /* KeyMetaKey.Type */]));
                    }
                    else {
                        if (meta[5 /* KeyMetaKey.BitField */]) {
                            definedProperty(obj, key, getBitFieldValue(() => {
                                return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                            }, meta[0 /* KeyMetaKey.Type */], meta[6 /* KeyMetaKey.BitFieldLength */], meta[8 /* KeyMetaKey.BaseBitOffset */]), setBitFieldValue(() => {
                                return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                            }, meta[0 /* KeyMetaKey.Type */], meta[6 /* KeyMetaKey.BitFieldLength */], meta[8 /* KeyMetaKey.BaseBitOffset */]));
                        }
                        else {
                            definedProperty(obj, key, getCTypeEnumValue(() => {
                                return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                            }, meta[0 /* KeyMetaKey.Type */]), setCTypeEnumValue(() => {
                                return obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                            }, meta[0 /* KeyMetaKey.Type */]));
                        }
                    }
                }
            });
        }
        prototype = Object.getPrototypeOf(prototype);
        if (!prototype) {
            break;
        }
    }
    return obj;
}
function revokeDefinedStruct(target) {
    let prototype = Object.getPrototypeOf(target);
    while (true) {
        let keysMeta = prototype[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructKeysMeta];
        if (keysMeta) {
            keysMeta.forEach((meta, key) => {
                delete target[key];
            });
        }
        prototype = Object.getPrototypeOf(prototype);
        if (!prototype) {
            break;
        }
    }
}


/***/ }),

/***/ "./src/cheap/function/definedMetaProperty.ts":
/*!***************************************************!*\
  !*** ./src/cheap/function/definedMetaProperty.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ definedMetaProperty)
/* harmony export */ });
function definedMetaProperty(target, key, value) {
    Object.defineProperty(target, key, {
        value,
        writable: false,
        enumerable: false,
        configurable: false
    });
}


/***/ }),

/***/ "./src/cheap/heap.ts":
/*!***************************!*\
  !*** ./src/cheap/heap.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Allocator: () => (/* binding */ Allocator),
/* harmony export */   StackPointer: () => (/* binding */ StackPointer),
/* harmony export */   getHeap16: () => (/* binding */ getHeap16),
/* harmony export */   getHeap32: () => (/* binding */ getHeap32),
/* harmony export */   getHeap64: () => (/* binding */ getHeap64),
/* harmony export */   getHeap8: () => (/* binding */ getHeap8),
/* harmony export */   getHeapF32: () => (/* binding */ getHeapF32),
/* harmony export */   getHeapF64: () => (/* binding */ getHeapF64),
/* harmony export */   getHeapU16: () => (/* binding */ getHeapU16),
/* harmony export */   getHeapU32: () => (/* binding */ getHeapU32),
/* harmony export */   getHeapU64: () => (/* binding */ getHeapU64),
/* harmony export */   getHeapU8: () => (/* binding */ getHeapU8),
/* harmony export */   getView: () => (/* binding */ getView)
/* harmony export */ });
/* unused harmony exports ThreadId, isMainThread, ThreadName, StackTop, StackSize, Table, Memory, getAtomicsBuffer, allocThreadId, initThread, initMain */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var common_function_isWorker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/function/isWorker */ "./src/common/function/isWorker.ts");
/* harmony import */ var _allocator_AllocatorJS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./allocator/AllocatorJS */ "./src/cheap/allocator/AllocatorJS.ts");
/* harmony import */ var _allocator_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./allocator/Table */ "./src/cheap/allocator/Table.ts");
/* harmony import */ var common_util_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/constant */ "./src/common/util/constant.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config */ "./src/cheap/config.ts");
/* harmony import */ var _staticData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./staticData */ "./src/cheap/staticData.ts");
/* harmony import */ var _thread_atomicsImpl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./thread/atomicsImpl */ "./src/cheap/thread/atomicsImpl.ts");
/* harmony import */ var _asm_memory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./asm/memory */ "./src/cheap/asm/memory.ts");
/* harmony import */ var _thread_asm_atomics__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./thread/asm/atomics */ "./src/cheap/thread/asm/atomics.ts");
/* harmony import */ var _ctypeEnumImpl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ctypeEnumImpl */ "./src/cheap/ctypeEnumImpl.ts");
/* harmony import */ var common_function_isAudioWorklet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/function/isAudioWorklet */ "./src/common/function/isAudioWorklet.ts");
/* harmony import */ var common_util_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/util/browser */ "./src/common/util/browser.ts");













/**
 * 线程 id
 */
let ThreadId = -1;
let isMainThread = true;
/**
 * 线程名
 */
let ThreadName = '';
/**
 * 当前线程的栈顶指针
 */
let StackPointer = null;
/**
 * 栈结束位置
 */
let StackTop = null;
/**
 * 当前线程栈大小
 */
let StackSize = 0;
/**
 * 当前线程的 Table
 */
let Table = null;
/**
 * 堆分配器
 */
let Allocator = null;
/**
 * 堆
 */
let Memory = null;
/**
 * 1 字节整型读取
 * - int8
 * - -128 to 127
 */
let Heap8 = null;
/**
 * 2 字节整型读取
 * - int16
 * - -32768 to 32767
 */
let Heap16 = null;
/**
 * 4 字节整型读取
 * - int32
 * - -2147483648 to 2147483647
 */
let Heap32 = null;
/**
 * 8 字节整型读取
 * - int64
 * - 0 to 4294967295
 */
let Heap64 = null;
/**
 * 1 字节无符号整型读取
 * - uint8
 * - 0 to 255
 */
let HeapU8 = null;
/**
 * 2 字节无符号整型读取
 * - uint16
 * - 0 to 65535
 */
let HeapU16 = null;
/**
 * 4 字节无符号整型读取
 * - uint32
 * - 0 to 4294967295
 */
let HeapU32 = null;
/**
 * 8 字节无符号整型读取
 * - uint64
 * - 0 to 4294967295
 */
let HeapU64 = null;
/**
 * 32 位浮点数
 * float
 */
let HeapFloat32 = null;
/**
 * 64 位浮点数
 * double
 */
let HeapFloat64 = null;
/**
 * 堆访问器
 */
let view = null;
let AtomicBufferMap = {
    [5 /* CTypeEnum.atomic_char */]: HeapU8,
    [3 /* CTypeEnum.atomic_uint8 */]: HeapU8,
    [7 /* CTypeEnum.atomic_uint16 */]: HeapU16,
    [9 /* CTypeEnum.atomic_uint32 */]: HeapU32,
    [22 /* CTypeEnum.atomic_uint64 */]: HeapU64,
    [12 /* CTypeEnum.atomic_int8 */]: Heap8,
    [14 /* CTypeEnum.atomic_int16 */]: Heap16,
    [16 /* CTypeEnum.atomic_int32 */]: Heap32,
    [21 /* CTypeEnum.atomic_int64 */]: Heap64
};
function checkHeap() {
    if (Memory && Memory.buffer !== HeapU8.buffer) {
        return true;
    }
    return false;
}
function getHeapU8() {
    if (false) {}
    return HeapU8;
}
function getHeap8() {
    if (false) {}
    return Heap8;
}
function getHeapU16() {
    if (false) {}
    return HeapU16;
}
function getHeap16() {
    if (false) {}
    return Heap16;
}
function getHeapU32() {
    if (false) {}
    return HeapU32;
}
function getHeap32() {
    if (false) {}
    return Heap32;
}
function getHeap64() {
    if (false) {}
    return Heap64;
}
function getHeapU64() {
    if (false) {}
    return HeapU64;
}
function getHeapF32() {
    if (false) {}
    return HeapFloat32;
}
function getHeapF64() {
    if (false) {}
    return HeapFloat64;
}
function getView() {
    if (false) {}
    return view;
}
function getAtomicsBuffer(type) {
    if (false) {}
    return AtomicBufferMap[type];
}
function setAllocator(a) {
    if (Allocator) {
        Allocator.removeUpdateHandle(updateHeap);
    }
    Allocator = a;
    if (common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap) {
        common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap.Allocator = Allocator;
    }
    Allocator.addUpdateHandle(updateHeap);
    updateHeap(Allocator.getBuffer());
}
function updateHeap(heap) {
    Heap8 = new Int8Array(heap);
    Heap16 = new Int16Array(heap);
    Heap32 = new Int32Array(heap);
    Heap64 = new BigInt64Array(heap);
    HeapU8 = new Uint8Array(heap);
    HeapU16 = new Uint16Array(heap);
    HeapU32 = new Uint32Array(heap);
    HeapU64 = new BigUint64Array(heap);
    HeapFloat32 = new Float32Array(heap);
    HeapFloat64 = new Float64Array(heap);
    view = new DataView(heap);
    AtomicBufferMap = {
        [5 /* CTypeEnum.atomic_char */]: HeapU8,
        [3 /* CTypeEnum.atomic_uint8 */]: HeapU8,
        [7 /* CTypeEnum.atomic_uint16 */]: HeapU16,
        [9 /* CTypeEnum.atomic_uint32 */]: HeapU32,
        [22 /* CTypeEnum.atomic_uint64 */]: HeapU64,
        [12 /* CTypeEnum.atomic_int8 */]: Heap8,
        [14 /* CTypeEnum.atomic_int16 */]: Heap16,
        [16 /* CTypeEnum.atomic_int32 */]: Heap32,
        [21 /* CTypeEnum.atomic_int64 */]: Heap64
    };
}
function allocThreadId() {
    return Atomics.add(HeapU32, _staticData__WEBPACK_IMPORTED_MODULE_6__.threadCounter >>> 2, 1);
}
/**
 * 子线程初始化
 *
 * @param options
 */
async function initThread(options) {
    (0,_ctypeEnumImpl__WEBPACK_IMPORTED_MODULE_10__["default"])(() => {
        return Allocator;
    }, getView);
    (0,_thread_atomicsImpl__WEBPACK_IMPORTED_MODULE_7__["default"])(getAtomicsBuffer);
    Memory = options.memory;
    const allocator = new _allocator_AllocatorJS__WEBPACK_IMPORTED_MODULE_2__["default"]({
        buffer: Memory.buffer,
        memory: Memory,
        byteOffset: _config__WEBPACK_IMPORTED_MODULE_5__.HEAP_OFFSET,
        maxHeapSize: _config__WEBPACK_IMPORTED_MODULE_5__.HEAP_MAXIMUM * 64 * 1024,
        growAllowed: true,
        onResize(old, need) {
            Memory.grow((need - old.byteLength) >>> 16);
            return {
                buffer: Memory.buffer,
                byteOffset: _config__WEBPACK_IMPORTED_MODULE_5__.HEAP_OFFSET
            };
        }
    }, false);
    setAllocator(allocator);
    if (options.stackPointer) {
        StackSize = options.stackSize;
        StackTop = options.stackPointer;
        StackPointer = new WebAssembly.Global({
            value: 'i32',
            mutable: true
        }, StackTop + StackSize);
        Table = new _allocator_Table__WEBPACK_IMPORTED_MODULE_3__.WebassemblyTable();
    }
    if (typeof options.id === 'number') {
        ThreadId = options.id;
    }
    else {
        ThreadId = Atomics.add(HeapU32, _staticData__WEBPACK_IMPORTED_MODULE_6__.threadCounter >>> 2, 1);
    }
    ThreadName = options.name ?? 'anonymous';
    common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap = {
        initThread,
        Allocator,
        Table,
        ThreadId,
        ThreadName,
        Memory,
        StackSize,
        StackTop,
        StackPointer,
        isMainThread: false
    };
    isMainThread = false;
    {
        if (!options.disableAsm) {
            // @ts-ignore
            if (typeof BigInt === 'function' && BigInt !== Number
                && (common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].chrome && common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].checkVersion(common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].majorVersion, '85', true)
                    || common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].firefox && common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].checkVersion(common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].majorVersion, '78', true)
                    || common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].safari && common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].checkVersion(common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].majorVersion, '15', true)
                    || common_util_browser__WEBPACK_IMPORTED_MODULE_12__["default"].newEdge)) {
                await (0,_asm_memory__WEBPACK_IMPORTED_MODULE_8__["default"])(Memory);
            }
            if (false) {}
        }
    }
}
/**
 * 主线程初始化
 */
function initMain() {
    (0,_ctypeEnumImpl__WEBPACK_IMPORTED_MODULE_10__["default"])(() => {
        return Allocator;
    }, getView);
    (0,_thread_atomicsImpl__WEBPACK_IMPORTED_MODULE_7__["default"])(getAtomicsBuffer);
    Memory = common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap?.Memory ? common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap.Memory : new WebAssembly.Memory({
        initial: _config__WEBPACK_IMPORTED_MODULE_5__.HEAP_INITIAL,
        maximum: _config__WEBPACK_IMPORTED_MODULE_5__.HEAP_MAXIMUM,
        shared: _config__WEBPACK_IMPORTED_MODULE_5__.USE_THREADS
    });
    Allocator = common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap?.Allocator ? common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap.Allocator : new _allocator_AllocatorJS__WEBPACK_IMPORTED_MODULE_2__["default"]({
        buffer: Memory.buffer,
        memory: Memory,
        byteOffset: _config__WEBPACK_IMPORTED_MODULE_5__.HEAP_OFFSET,
        maxHeapSize: _config__WEBPACK_IMPORTED_MODULE_5__.HEAP_MAXIMUM * 64 * 1024,
        growAllowed: true,
        onResize(old, need) {
            Memory.grow((need - old.byteLength) >>> 16);
            return {
                buffer: Memory.buffer,
                byteOffset: _config__WEBPACK_IMPORTED_MODULE_5__.HEAP_OFFSET
            };
        }
    });
    Allocator.addUpdateHandle(updateHeap);
    updateHeap(Allocator.getBuffer());
    StackSize = common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap?.StackSize ? common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap.StackSize : _config__WEBPACK_IMPORTED_MODULE_5__.STACK_SIZE;
    StackTop = common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap?.StackTop ? common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap.StackTop : Allocator.malloc(StackSize);
    StackPointer = common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap?.StackPointer ? common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap.StackPointer : new WebAssembly.Global({
        value: 'i32',
        mutable: true
    }, StackTop + StackSize);
    Table = common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap?.Table ? common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap.Table : new _allocator_Table__WEBPACK_IMPORTED_MODULE_3__.WebassemblyTable();
    ThreadId = common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap?.ThreadId ? common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap.ThreadId : 0;
    ThreadName = common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap?.ThreadName ? common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap.ThreadName : 'main';
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap) {
        if (_config__WEBPACK_IMPORTED_MODULE_5__.USE_THREADS && false) {}
        else {
            HeapU32[_staticData__WEBPACK_IMPORTED_MODULE_6__.threadCounter >>> 2] = ThreadId + 1;
            let index = _staticData__WEBPACK_IMPORTED_MODULE_6__.heapMutex >>> 2;
            Heap32[index] = 0;
        }
    }
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap) {
        common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap = {
            Allocator,
            Table,
            ThreadId,
            ThreadName,
            Memory,
            StackSize,
            StackTop,
            StackPointer,
            isMainThread: true,
            threadCounter: _staticData__WEBPACK_IMPORTED_MODULE_6__.threadCounter,
            heapMutex: _staticData__WEBPACK_IMPORTED_MODULE_6__.heapMutex
        };
    }
    isMainThread = true;
}
{
    if (!(0,common_function_isWorker__WEBPACK_IMPORTED_MODULE_1__["default"])() && !(0,common_function_isAudioWorklet__WEBPACK_IMPORTED_MODULE_11__["default"])()) {
        initMain();
    }
    else {
        common_util_constant__WEBPACK_IMPORTED_MODULE_4__.SELF.CHeap = {
            initThread,
            isMainThread: false
        };
        isMainThread = false;
    }
}


/***/ }),

/***/ "./src/cheap/polyfill/bigint.ts":
/*!**************************************!*\
  !*** ./src/cheap/polyfill/bigint.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ polyfill)
/* harmony export */ });
/* harmony import */ var common_function_i32Toi64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/function/i32Toi64 */ "./src/common/function/i32Toi64.ts");
/* harmony import */ var common_function_i64Toi32__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/function/i64Toi32 */ "./src/common/function/i64Toi32.ts");
/* harmony import */ var common_util_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/constant */ "./src/common/util/constant.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");




function BigInt64Array(buffer) {
    const obj = {
        int: new Int32Array(buffer),
        uint: new Uint32Array(buffer),
        buffer,
        length: buffer.byteLength >>> 3,
        byteLength: buffer.byteLength,
        byteOffset: 0
    };
    return new Proxy(obj, {
        get: function (target, p, receiver) {
            if (common_util_is__WEBPACK_IMPORTED_MODULE_3__.string(p) && common_util_is__WEBPACK_IMPORTED_MODULE_3__.number(+p)) {
                const offset = (+p) << 1;
                const lowWord = target.uint[offset];
                const highWord = target.int[offset + 1];
                const value = BigInt(Math.floor((0,common_function_i32Toi64__WEBPACK_IMPORTED_MODULE_0__["default"])(lowWord, Math.abs(highWord))));
                return highWord >= 0 ? value : -value;
            }
            return target[p];
        },
        set: function (target, p, value, receiver) {
            if (common_util_is__WEBPACK_IMPORTED_MODULE_3__.string(p) && common_util_is__WEBPACK_IMPORTED_MODULE_3__.number(+p)) {
                let [lowWord, highWord] = (0,common_function_i64Toi32__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.abs(Number(value)));
                if (value < 0) {
                    highWord = -highWord;
                }
                const offset = (+p) << 1;
                target.uint[offset] = lowWord;
                target.int[offset + 1] = highWord;
            }
            else {
                target[p] = value;
            }
            return true;
        }
    });
}
function BigUint64Array(buffer) {
    const obj = {
        view: new Uint32Array(buffer),
        buffer,
        length: buffer.byteLength >>> 3,
        byteLength: buffer.byteLength,
        byteOffset: 0
    };
    return new Proxy(obj, {
        get: function (target, p, receiver) {
            if (common_util_is__WEBPACK_IMPORTED_MODULE_3__.string(p) && common_util_is__WEBPACK_IMPORTED_MODULE_3__.number(+p)) {
                const offset = (+p) << 1;
                const lowWord = target.view[offset];
                const highWord = target.view[offset + 1];
                return BigInt(Math.floor((0,common_function_i32Toi64__WEBPACK_IMPORTED_MODULE_0__["default"])(lowWord, highWord)));
            }
            return target[p];
        },
        set: function (target, p, value, receiver) {
            if (common_util_is__WEBPACK_IMPORTED_MODULE_3__.string(p) && common_util_is__WEBPACK_IMPORTED_MODULE_3__.number(+p)) {
                let [lowWord, highWord] = (0,common_function_i64Toi32__WEBPACK_IMPORTED_MODULE_1__["default"])(value);
                const offset = (+p) << 1;
                target.view[offset] = lowWord;
                target.view[offset + 1] = highWord;
            }
            else {
                target[p] = value;
            }
            return true;
        }
    });
}
function polyfill() {
    // @ts-ignore
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigInt) {
        // @ts-ignore
        common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigInt = Number;
    }
    // @ts-ignore
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigInt64Array) {
        // @ts-ignore
        common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigInt64Array = BigInt64Array;
    }
    // @ts-ignore
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigUint64Array) {
        // @ts-ignore
        common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigUint64Array = BigUint64Array;
    }
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.DataView.prototype.getBigInt64) {
        common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.DataView.prototype.getBigInt64 = function (byteOffset, littleEndian) {
            let lowWord = 0, highWord = 0;
            lowWord = this.getUint32(byteOffset + (littleEndian ? 0 : 4), littleEndian);
            highWord = this.getInt32(byteOffset + (littleEndian ? 4 : 0), littleEndian);
            const value = BigInt(Math.floor((0,common_function_i32Toi64__WEBPACK_IMPORTED_MODULE_0__["default"])(lowWord, Math.abs(highWord))));
            return highWord >= 0 ? value : -value;
        };
    }
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.DataView.prototype.setBigInt64) {
        common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.DataView.prototype.setBigInt64 = function (byteOffset, value, littleEndian) {
            let [lowWord, highWord] = (0,common_function_i64Toi32__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.abs(Number(value)));
            if (value < 0) {
                highWord = -highWord;
            }
            this.setUint32(byteOffset + (littleEndian ? 0 : 4), lowWord, littleEndian);
            this.setInt32(byteOffset + (littleEndian ? 4 : 0), highWord, littleEndian);
        };
    }
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.DataView.prototype.getBigUint64) {
        common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.DataView.prototype.getBigUint64 = function (byteOffset, littleEndian) {
            let lowWord = 0, highWord = 0;
            lowWord = this.getUint32(byteOffset + (littleEndian ? 0 : 4), littleEndian);
            highWord = this.getUint32(byteOffset + (littleEndian ? 4 : 0), littleEndian);
            return BigInt(Math.floor((0,common_function_i32Toi64__WEBPACK_IMPORTED_MODULE_0__["default"])(lowWord, highWord)));
        };
    }
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.DataView.prototype.setBigUint64) {
        common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.DataView.prototype.setBigUint64 = function (byteOffset, value, littleEndian) {
            const [lowWord, highWord] = (0,common_function_i64Toi32__WEBPACK_IMPORTED_MODULE_1__["default"])(Number(value));
            this.setUint32(byteOffset + (littleEndian ? 0 : 4), lowWord, littleEndian);
            this.setUint32(byteOffset + (littleEndian ? 4 : 0), highWord, littleEndian);
        };
    }
    const view = new DataView(new ArrayBuffer(8));
    // @ts-ignore
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigInt.asUintN) {
        // @ts-ignore
        common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigInt.asUintN = function (bits, int) {
            view.setBigInt64(0, int);
            if (bits === 8) {
                return view.getUint8(0);
            }
            if (bits === 16) {
                return view.getUint16(0);
            }
            if (bits === 32) {
                return view.getUint32(0);
            }
            if (bits === 64) {
                return view.getBigUint64(0);
            }
        };
    }
    // @ts-ignore
    if (!common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigInt.asIntN) {
        // @ts-ignore
        common_util_constant__WEBPACK_IMPORTED_MODULE_2__.SELF.BigInt.asIntN = function (bits, int) {
            view.setBigInt64(0, int);
            if (bits === 8) {
                return view.getInt8(0);
            }
            if (bits === 16) {
                return view.getInt16(0);
            }
            if (bits === 32) {
                return view.getInt32(0);
            }
            if (bits === 64) {
                return view.getBigInt64(0);
            }
        };
    }
}


/***/ }),

/***/ "./src/cheap/proxyStruct.ts":
/*!**********************************!*\
  !*** ./src/cheap/proxyStruct.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   proxyStruct: () => (/* binding */ proxyStruct),
/* harmony export */   revokeProxyStruct: () => (/* binding */ revokeProxyStruct)
/* harmony export */ });
/* unused harmony export findKeyMeta */
/* harmony import */ var cheap_std_sizeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/sizeof */ "./src/cheap/std/sizeof.ts");
/* harmony import */ var _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var _typedef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./typedef */ "./src/cheap/typedef.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_function_toNumber__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/function/toNumber */ "./src/common/function/toNumber.ts");









const ObjectPro = Object.getPrototypeOf({});
function findKeyMeta(prototype, key) {
    while (true) {
        let keysMeta = prototype[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructKeysMeta];
        if (keysMeta) {
            const meta = keysMeta.get(key);
            if (meta) {
                return meta;
            }
        }
        prototype = Object.getPrototypeOf(prototype);
        if (!prototype || prototype === ObjectPro) {
            return null;
        }
    }
}
function proxyArray(address, length, type, pointer) {
    const obj = {};
    obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] = address;
    let size = (0,cheap_std_sizeof__WEBPACK_IMPORTED_MODULE_0__["default"])(pointer ? 20 /* CTypeEnum.pointer */ : type);
    const proxy = new Proxy(obj, {
        get(target, propertyKey, receiver) {
            if (propertyKey === _symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress) {
                return target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress];
            }
            const index = (0,common_function_toNumber__WEBPACK_IMPORTED_MODULE_8__["default"])(propertyKey);
            if (pointer) {
                return _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20 /* CTypeEnum.pointer */](target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + index * size);
            }
            else {
                if (common_util_is__WEBPACK_IMPORTED_MODULE_5__.func(type)) {
                    return target[propertyKey];
                }
                else {
                    return _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[type](target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + index * size);
                }
            }
        },
        set(target, propertyKey, newValue, receiver) {
            if (propertyKey === _symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress) {
                target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] = newValue;
                return true;
            }
            const index = (0,common_function_toNumber__WEBPACK_IMPORTED_MODULE_8__["default"])(propertyKey);
            if (pointer) {
                _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20 /* CTypeEnum.pointer */](target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + index * size, newValue);
                target[propertyKey] = newValue;
            }
            else {
                if (common_util_is__WEBPACK_IMPORTED_MODULE_5__.func(type)) {
                    const proxy = target[propertyKey] || (target[propertyKey] = proxyStruct(target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + index * size, type));
                    common_util_object__WEBPACK_IMPORTED_MODULE_6__.each(newValue, (value, key) => {
                        proxy[key] = value;
                    });
                    target[propertyKey] = proxy;
                }
                else {
                    _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[type](target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + index * size, newValue);
                    target[propertyKey] = newValue;
                }
            }
            return true;
        }
    });
    return proxy;
}
function proxyStruct(address, struct) {
    const prototype = common_util_is__WEBPACK_IMPORTED_MODULE_5__.func(struct) ? struct.prototype : struct;
    const obj = {};
    obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] = address;
    Object.setPrototypeOf(obj, prototype);
    const { proxy, revoke } = Proxy.revocable(obj, {
        get(target, propertyKey, receiver) {
            if (common_util_is__WEBPACK_IMPORTED_MODULE_5__.string(propertyKey)) {
                const meta = findKeyMeta(prototype, propertyKey.replace(/^\$+/, ''));
                if (meta) {
                    const address = target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                    if (meta[3 /* KeyMetaKey.Array */]) {
                        const t = target[propertyKey];
                        t[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] = address;
                        return t;
                    }
                    else if (meta[1 /* KeyMetaKey.Pointer */]) {
                        let p = _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20 /* CTypeEnum.pointer */](address);
                        return p;
                    }
                    else if (common_util_is__WEBPACK_IMPORTED_MODULE_5__.func(meta[0 /* KeyMetaKey.Type */]) || common_util_is__WEBPACK_IMPORTED_MODULE_5__.object(meta[0 /* KeyMetaKey.Type */])) {
                        return target[propertyKey] || (target[propertyKey] = proxyStruct(address, meta[0 /* KeyMetaKey.Type */]));
                    }
                    else {
                        let value = _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[meta[0 /* KeyMetaKey.Type */]](address);
                        if (meta[5 /* KeyMetaKey.BitField */]) {
                            value = ((value >>> (_typedef__WEBPACK_IMPORTED_MODULE_4__.CTypeEnum2Bytes[meta[0 /* KeyMetaKey.Type */]] * 8 - meta[8 /* KeyMetaKey.BaseBitOffset */] - meta[6 /* KeyMetaKey.BitFieldLength */]))
                                & (Math.pow(2, meta[6 /* KeyMetaKey.BitFieldLength */]) - 1));
                        }
                        return value;
                    }
                }
                else {
                    return target[propertyKey];
                }
            }
            else {
                return target[propertyKey];
            }
        },
        set(target, propertyKey, newValue, receiver) {
            if (common_util_is__WEBPACK_IMPORTED_MODULE_5__.string(propertyKey)) {
                const meta = findKeyMeta(prototype, propertyKey.replace(/^\$+/, ''));
                if (meta) {
                    const address = target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructAddress] + meta[7 /* KeyMetaKey.BaseAddressOffset */];
                    if (meta[3 /* KeyMetaKey.Array */]) {
                        const proxy = target[propertyKey] || proxyArray(address, meta[4 /* KeyMetaKey.ArrayLength */], meta[0 /* KeyMetaKey.Type */], meta[1 /* KeyMetaKey.Pointer */]);
                        common_util_array__WEBPACK_IMPORTED_MODULE_7__.each(newValue, (value, key) => {
                            proxy[key] = value;
                        });
                        target[propertyKey] = proxy;
                    }
                    else {
                        if (meta[1 /* KeyMetaKey.Pointer */]) {
                            _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20 /* CTypeEnum.pointer */](address, newValue);
                            target[propertyKey] = newValue;
                        }
                        else if (common_util_is__WEBPACK_IMPORTED_MODULE_5__.func(meta[0 /* KeyMetaKey.Type */]) || common_util_is__WEBPACK_IMPORTED_MODULE_5__.object(meta[0 /* KeyMetaKey.Type */])) {
                            const proxy = target[propertyKey] || (target[propertyKey] = proxyStruct(address, meta[0 /* KeyMetaKey.Type */]));
                            common_util_object__WEBPACK_IMPORTED_MODULE_6__.each(newValue, (value, key) => {
                                proxy[key] = value;
                            });
                            target[propertyKey] = proxy;
                        }
                        else {
                            if (meta[5 /* KeyMetaKey.BitField */]) {
                                let mask = 0;
                                let len = _typedef__WEBPACK_IMPORTED_MODULE_4__.CTypeEnum2Bytes[meta[0 /* KeyMetaKey.Type */]] * 8;
                                for (let i = 0; i < meta[6 /* KeyMetaKey.BitFieldLength */]; i++) {
                                    mask |= (1 << (len - 1 - (i + meta[8 /* KeyMetaKey.BaseBitOffset */])));
                                }
                                const value = _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[meta[0 /* KeyMetaKey.Type */]](address);
                                _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[meta[0 /* KeyMetaKey.Type */]](address, (value & ~mask) | ((newValue & (Math.pow(2, meta[6 /* KeyMetaKey.BitFieldLength */]) - 1))
                                    << (len - meta[8 /* KeyMetaKey.BaseBitOffset */] - meta[6 /* KeyMetaKey.BitFieldLength */])));
                            }
                            else {
                                _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[meta[0 /* KeyMetaKey.Type */]](address, newValue);
                            }
                            target[propertyKey] = newValue;
                        }
                    }
                }
                else {
                    target[propertyKey] = newValue;
                }
            }
            else {
                target[propertyKey] = newValue;
            }
            return true;
        }
    });
    obj[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructProxyRevoke] = revoke;
    return proxy;
}
function revokeProxyStruct(target) {
    const revoke = target[_symbol__WEBPACK_IMPORTED_MODULE_3__.symbolStructProxyRevoke];
    if (revoke) {
        revoke();
    }
}


/***/ }),

/***/ "./src/cheap/stack.ts":
/*!****************************!*\
  !*** ./src/cheap/stack.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   free: () => (/* binding */ free),
/* harmony export */   malloc: () => (/* binding */ malloc)
/* harmony export */ });
/* harmony import */ var _heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heap */ "./src/cheap/heap.ts");

function malloc(size) {
    _heap__WEBPACK_IMPORTED_MODULE_0__.StackPointer.value -= size;
    return _heap__WEBPACK_IMPORTED_MODULE_0__.StackPointer.value;
}
function free(size) {
    _heap__WEBPACK_IMPORTED_MODULE_0__.StackPointer.value += size;
}


/***/ }),

/***/ "./src/cheap/staticData.ts":
/*!*********************************!*\
  !*** ./src/cheap/staticData.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   heapMutex: () => (/* binding */ heapMutex),
/* harmony export */   threadCounter: () => (/* binding */ threadCounter)
/* harmony export */ });
/* harmony import */ var common_util_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/constant */ "./src/common/util/constant.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/cheap/config.ts");
/* harmony import */ var _thread_mutex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./thread/mutex */ "./src/cheap/thread/mutex.ts");
/**
 * 静态分配区只能在此文件分配
 * 导出在其他地方使用
 */



/**
 * 静态分配区栈顶指针
 */
let pointer = (0) + 1;
function malloc(length, algin = 1) {
    let address = pointer;
    while (address % algin) {
        address = address + 1;
    }
    pointer = address + length;
    return address;
}
/**
 * 线程计数器地址
 */
const threadCounter = common_util_constant__WEBPACK_IMPORTED_MODULE_0__.SELF.CHeap?.threadCounter
    ? common_util_constant__WEBPACK_IMPORTED_MODULE_0__.SELF.CHeap.threadCounter
    : malloc(4, 4);
/**
 * 堆分配锁地址
 */
const heapMutex = common_util_constant__WEBPACK_IMPORTED_MODULE_0__.SELF.CHeap?.heapMutex
    ? common_util_constant__WEBPACK_IMPORTED_MODULE_0__.SELF.CHeap.heapMutex
    : malloc(4, 4);


/***/ }),

/***/ "./src/cheap/std/buffer/SafeUint8Array.ts":
/*!************************************************!*\
  !*** ./src/cheap/std/buffer/SafeUint8Array.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SafeUint8Array)
/* harmony export */ });
/* unused harmony export SafeBufferView */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _heap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../heap */ "./src/cheap/heap.ts");
/* harmony import */ var common_interface_ArrayLike__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/interface/ArrayLike */ "./src/common/interface/ArrayLike.ts");




class SafeBufferView {
    pointer;
    len;
    constructor(pointer, len) {
        this.pointer = pointer;
        this.len = len;
    }
    get byteLength() {
        return this.len;
    }
    get buffer() {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getHeapU8)().buffer;
    }
    get byteOffset() {
        return this.pointer;
    }
    getFloat32(byteOffset, littleEndian) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getFloat32(this.pointer + byteOffset, littleEndian);
    }
    getFloat64(byteOffset, littleEndian) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getFloat64(this.pointer + byteOffset, littleEndian);
    }
    getInt8(byteOffset) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getInt8(this.pointer + byteOffset);
    }
    getInt16(byteOffset, littleEndian) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getInt16(this.pointer + byteOffset, littleEndian);
    }
    getInt32(byteOffset, littleEndian) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getInt32(this.pointer + byteOffset, littleEndian);
    }
    getUint8(byteOffset) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getUint8(this.pointer + byteOffset);
    }
    getUint16(byteOffset, littleEndian) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getUint16(this.pointer + byteOffset, littleEndian);
    }
    getUint32(byteOffset, littleEndian) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getUint32(this.pointer + byteOffset, littleEndian);
    }
    setFloat32(byteOffset, value, littleEndian) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setFloat32(this.pointer + byteOffset, value, littleEndian);
    }
    setFloat64(byteOffset, value, littleEndian) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setFloat64(this.pointer + byteOffset, value, littleEndian);
    }
    setInt8(byteOffset, value) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setInt8(this.pointer + byteOffset, value);
    }
    setInt16(byteOffset, value, littleEndian) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setInt16(this.pointer + byteOffset, value, littleEndian);
    }
    setInt32(byteOffset, value, littleEndian) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setInt32(this.pointer + byteOffset, value, littleEndian);
    }
    setUint8(byteOffset, value) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setUint8(this.pointer + byteOffset, value);
    }
    setUint16(byteOffset, value, littleEndian) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setUint16(this.pointer + byteOffset, value, littleEndian);
    }
    setUint32(byteOffset, value, littleEndian) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setUint32(this.pointer + byteOffset, value, littleEndian);
    }
    getBigInt64(byteOffset, littleEndian) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getBigInt64(this.pointer + byteOffset, littleEndian);
    }
    getBigUint64(byteOffset, littleEndian) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().getBigUint64(this.pointer + byteOffset, littleEndian);
    }
    setBigInt64(byteOffset, value, littleEndian) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setBigInt64(this.pointer + byteOffset, value, littleEndian);
    }
    setBigUint64(byteOffset, value, littleEndian) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getView)().setBigUint64(this.pointer + byteOffset, value, littleEndian);
    }
}
class SafeUint8Array extends common_interface_ArrayLike__WEBPACK_IMPORTED_MODULE_3__["default"] {
    pointer;
    len;
    constructor(pointer, len) {
        super();
        this.pointer = pointer;
        this.len = len;
        return this.proxy;
    }
    getIndexValue(index) {
        return cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[2](this.pointer + index);
    }
    setIndexValue(index, value) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[2](this.pointer + index, value);
    }
    set(array, offset = 0) {
        (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getHeapU8)().set(array, this.pointer + offset);
    }
    subarray(begin = 0, end, safe) {
        if (safe) {
            return new SafeUint8Array(this.pointer + begin, (end ? end : this.len) - begin);
        }
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getHeapU8)().subarray(this.pointer + begin, this.pointer + (end ?? this.len));
    }
    slice(start = 0, end) {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getHeapU8)().slice(this.pointer + start, this.pointer + (end ?? this.len));
    }
    get length() {
        return this.len;
    }
    get byteLength() {
        return this.len;
    }
    get buffer() {
        return (0,_heap__WEBPACK_IMPORTED_MODULE_2__.getHeapU8)().buffer;
    }
    get byteOffset() {
        return this.pointer;
    }
    get view() {
        return new SafeBufferView(this.pointer, this.len);
    }
}


/***/ }),

/***/ "./src/cheap/std/make.ts":
/*!*******************************!*\
  !*** ./src/cheap/std/make.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ make)
/* harmony export */ });
/* harmony import */ var cheap_std_sizeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/sizeof */ "./src/cheap/std/sizeof.ts");
/* harmony import */ var cheap_heap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/heap */ "./src/cheap/heap.ts");
/* harmony import */ var _memory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_function_isDef__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/function/isDef */ "./src/common/function/isDef.ts");
/* harmony import */ var _structAccess__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./structAccess */ "./src/cheap/std/structAccess.ts");







/**
 * 创建一个 struct 实例
 *
 * @param target
 * @returns
 */
function make(struct, init) {
    const size = (0,cheap_std_sizeof__WEBPACK_IMPORTED_MODULE_0__["default"])(struct);
    const address = cheap_heap__WEBPACK_IMPORTED_MODULE_1__.Allocator.malloc(size);
    if (!address) {
        throw new TypeError('cannot alloc memory for struct');
    }
    (0,_memory__WEBPACK_IMPORTED_MODULE_2__.memset)(address, 0, size);
    const target = (0,_structAccess__WEBPACK_IMPORTED_MODULE_6__["default"])(address, struct);
    const data = new struct();
    if (init) {
        common_util_object__WEBPACK_IMPORTED_MODULE_4__.extend(data, init);
    }
    common_util_object__WEBPACK_IMPORTED_MODULE_4__.each(data, (value, key) => {
        if ((0,common_function_isDef__WEBPACK_IMPORTED_MODULE_5__["default"])(value)) {
            target[key] = value;
        }
    });
    return target;
}


/***/ }),

/***/ "./src/cheap/std/memory.ts":
/*!*********************************!*\
  !*** ./src/cheap/std/memory.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapSafeUint8Array: () => (/* binding */ mapSafeUint8Array),
/* harmony export */   mapUint8Array: () => (/* binding */ mapUint8Array),
/* harmony export */   memcpy: () => (/* binding */ memcpy),
/* harmony export */   memcpyFromUint8Array: () => (/* binding */ memcpyFromUint8Array),
/* harmony export */   memset: () => (/* binding */ memset)
/* harmony export */ });
/* unused harmony exports memmove, mapInt8Array, mapUint16Array, mapInt16Array, mapUint32Array, mapInt32Array, mapUint64Array, mapInt64Array, mapFloat32Array, mapFloat64Array, readCString, writeCString */
/* harmony import */ var _heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../heap */ "./src/cheap/heap.ts");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string */ "./src/cheap/std/string.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
/* harmony import */ var _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _buffer_SafeUint8Array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./buffer/SafeUint8Array */ "./src/cheap/std/buffer/SafeUint8Array.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./src/cheap/config.ts");






function memcpy(dst, src, size) {
    (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapU8)().set((0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapU8)().subarray(src, src + size), dst);
}
function memcpyFromUint8Array(dst, max, data) {
    (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapU8)().set(data.subarray(0, max), dst);
}
function memmove(dst, src, size) {
    (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapU8)().copyWithin(dst, src, src + size);
}
function memset(src, c, n) {
    (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapU8)().subarray(src, src + n).fill(c);
}
function mapSafeUint8Array(src, n) {
    return _config__WEBPACK_IMPORTED_MODULE_5__.USE_THREADS ? mapUint8Array(src, n) : new _buffer_SafeUint8Array__WEBPACK_IMPORTED_MODULE_4__["default"](src, n);
}
function mapUint8Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapU8)().subarray(src, src + n);
}
function mapInt8Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeap8)().subarray(src, src + n);
}
function mapUint16Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapU16)().subarray(src >>> 1, (src >>> 1) + n);
}
function mapInt16Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeap16)().subarray(src >>> 1, (src >>> 1) + n);
}
function mapUint32Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapU32)().subarray(src >>> 2, (src >>> 2) + n);
}
function mapInt32Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeap32)().subarray(src >>> 2, (src >>> 2) + n);
}
function mapUint64Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapU64)().subarray(src >>> 3, (src >>> 3) + n);
}
function mapInt64Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeap64)().subarray(src >>> 3, (src >>> 3) + n);
}
function mapFloat32Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapF32)().subarray(src >>> 2, (src >>> 2) + n);
}
function mapFloat64Array(src, n) {
    return (0,_heap__WEBPACK_IMPORTED_MODULE_0__.getHeapF64)().subarray(src >>> 3, (src >>> 3) + n);
}
function readCString(pointer, max) {
    const stringLen = (0,_string__WEBPACK_IMPORTED_MODULE_1__.strlen)(pointer);
    const len = Math.min(stringLen, max ?? stringLen);
    return common_util_text__WEBPACK_IMPORTED_MODULE_2__.decode(mapUint8Array(pointer, len));
}
function writeCString(dst, str, max, addNull = true) {
    const data = common_util_text__WEBPACK_IMPORTED_MODULE_2__.encode(str);
    let len = data.length;
    let remain = addNull ? 1 : 0;
    if (max && len - remain > max) {
        len = max - remain;
    }
    memcpyFromUint8Array(dst, len, data);
    if (addNull) {
        _ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[11 /* CTypeEnum.int8 */](dst + len, 0);
    }
}


/***/ }),

/***/ "./src/cheap/std/sizeof.ts":
/*!*********************************!*\
  !*** ./src/cheap/std/sizeof.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sizeof)
/* harmony export */ });
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var _typedef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../typedef */ "./src/cheap/typedef.ts");



function sizeof(type) {
    if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.number(type)) {
        return _typedef__WEBPACK_IMPORTED_MODULE_2__.CTypeEnum2Bytes[type] || 0;
    }
    else if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.func(type) && type.prototype[_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct]) {
        return type.prototype[_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength];
    }
    return 0;
}


/***/ }),

/***/ "./src/cheap/std/string.ts":
/*!*********************************!*\
  !*** ./src/cheap/std/string.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   strlen: () => (/* binding */ strlen)
/* harmony export */ });
/* unused harmony exports strcpy, strcat, strcmp */
/* harmony import */ var _memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");


/**
 * 获取字符串长度，不包括字符串末尾的空字符（\0）
 *
 * @param pointer
 */
function strlen(pointer) {
    let len = 0;
    while (_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[4 /* CTypeEnum.char */]((pointer = pointer + 1, pointer - 1))) {
        len++;
    }
    return len;
}
/**
 * 将一个字符串复制到另一个字符串
 *
 * @param destination
 * @param source
 */
function strcpy(destination, source) {
    const len = strlen(source) + 1;
    (0,_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(destination, len, (0,_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(source, len));
}
/**
 * 将一个字符串追加到另一个字符串的末尾
 *
 * @param destination
 * @param source
 */
function strcat(destination, source) {
    const len = strlen(source) + 1;
    const len1 = strlen(destination);
    (0,_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(destination + len1, len, (0,_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(source, len));
}
/**
 * 比较两个字符串的大小
 */
function strcmp(str1, str2) {
    const len1 = strlen(str1);
    const len2 = strlen(str2);
    const len = Math.min(len1, len2);
    for (let i = 0; i < len; i++) {
        const char1 = _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[4 /* CTypeEnum.char */](str1 + i);
        const char2 = _ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[4 /* CTypeEnum.char */](str2 + i);
        if (char1 > char2) {
            return 1;
        }
        else if (char1 < char2) {
            return -1;
        }
    }
    if (len1 > len2) {
        return 1;
    }
    else if (len1 < len2) {
        return -1;
    }
    else {
        return 0;
    }
}


/***/ }),

/***/ "./src/cheap/std/structAccess.ts":
/*!***************************************!*\
  !*** ./src/cheap/std/structAccess.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ structAccess)
/* harmony export */ });
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var _proxyStruct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../proxyStruct */ "./src/cheap/proxyStruct.ts");
/* harmony import */ var _definedStruct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../definedStruct */ "./src/cheap/definedStruct.ts");
/* harmony import */ var common_util_support__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/support */ "./src/common/util/support.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_keypath__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/util/keypath */ "./src/common/util/keypath.ts");






/**
 * 访问 struct 指针
 *
 * @param target
 * @param address
 * @returns
 */
function structAccess(address, struct) {
    if (arguments[2] && common_util_is__WEBPACK_IMPORTED_MODULE_4__.string(arguments[2])) {
        struct = struct.prototype;
        common_util_keypath__WEBPACK_IMPORTED_MODULE_5__.each(arguments[2], (key) => {
            const meta = struct[_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta];
            struct = meta.get(key)[0 /* KeyMetaKey.Type */];
        });
    }
    return common_util_support__WEBPACK_IMPORTED_MODULE_3__["default"].proxy ? (0,_proxyStruct__WEBPACK_IMPORTED_MODULE_1__.proxyStruct)(address, struct) : (0,_definedStruct__WEBPACK_IMPORTED_MODULE_2__.definedStruct)(address, struct);
}


/***/ }),

/***/ "./src/cheap/std/unmake.ts":
/*!*********************************!*\
  !*** ./src/cheap/std/unmake.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ unmake)
/* harmony export */ });
/* harmony import */ var cheap_heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/heap */ "./src/cheap/heap.ts");
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var _proxyStruct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../proxyStruct */ "./src/cheap/proxyStruct.ts");
/* harmony import */ var _definedStruct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../definedStruct */ "./src/cheap/definedStruct.ts");
/* harmony import */ var common_util_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/support */ "./src/common/util/support.ts");





/**
 * 销毁一个 struct 实例，调用 make 创建的对象必须调用 unmake，否则内存泄漏
 *
 * @param target
 */
function unmake(target) {
    const p = target[_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress];
    if (p) {
        cheap_heap__WEBPACK_IMPORTED_MODULE_0__.Allocator.free(p);
        target[_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] = 0;
        common_util_support__WEBPACK_IMPORTED_MODULE_4__["default"].proxy ? (0,_proxyStruct__WEBPACK_IMPORTED_MODULE_2__.revokeProxyStruct)(target) : (0,_definedStruct__WEBPACK_IMPORTED_MODULE_3__.revokeDefinedStruct)(target);
    }
}


/***/ }),

/***/ "./src/cheap/symbol.ts":
/*!*****************************!*\
  !*** ./src/cheap/symbol.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   symbolStruct: () => (/* binding */ symbolStruct),
/* harmony export */   symbolStructAddress: () => (/* binding */ symbolStructAddress),
/* harmony export */   symbolStructKeysMeta: () => (/* binding */ symbolStructKeysMeta),
/* harmony export */   symbolStructLength: () => (/* binding */ symbolStructLength),
/* harmony export */   symbolStructMaxBaseTypeByteLength: () => (/* binding */ symbolStructMaxBaseTypeByteLength),
/* harmony export */   symbolStructProxyRevoke: () => (/* binding */ symbolStructProxyRevoke)
/* harmony export */ });
/* unused harmony exports symbolStructKeysQueue, symbolStructKeysInstance */
const symbolStruct = Symbol('Struct');
const symbolStructLength = Symbol('StructLength');
const symbolStructMaxBaseTypeByteLength = Symbol('StructMaxBaseTypeByteLength');
const symbolStructAddress = Symbol('StructAddress');
const symbolStructKeysQueue = Symbol('StructKeysQueue');
const symbolStructKeysMeta = Symbol('StructKeysMeta');
const symbolStructKeysInstance = Symbol('StructKeysInstance');
const symbolStructProxyRevoke = Symbol('StructProxyRevoke');


/***/ }),

/***/ "./src/cheap/thread/asm/atomics.ts":
/*!*****************************************!*\
  !*** ./src/cheap/thread/asm/atomics.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports instance, isSupport, default */
/* harmony import */ var common_util_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/base64 */ "./src/common/util/base64.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var common_util_wasm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/wasm */ "./src/common/util/wasm.ts");
/* harmony import */ var _atomics_asm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./atomics.asm */ "./src/cheap/thread/asm/atomics.asm");
/* harmony import */ var _atomics_asm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_atomics_asm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _atomics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../atomics */ "./src/cheap/thread/atomics.ts");
var cheap__fileName__0 = "src/cheap/thread/asm/atomics.ts";





/**
 * WebAssembly runtime 实例
 */
let instance;
function isSupport() {
    return !!instance;
}
async function init(memory) {
    try {
        if (typeof SharedArrayBuffer === 'function' && memory.buffer instanceof SharedArrayBuffer) {
            const wasm = (0,common_util_base64__WEBPACK_IMPORTED_MODULE_0__.base64ToUint8Array)((_atomics_asm__WEBPACK_IMPORTED_MODULE_3___default()));
            common_util_wasm__WEBPACK_IMPORTED_MODULE_2__.setMemoryShared(wasm, true);
            instance = (await WebAssembly.instantiate(wasm, {
                env: {
                    memory
                }
            })).instance;
        }
        else {
            return;
        }
        (0,_atomics__WEBPACK_IMPORTED_MODULE_4__.override)({
            add: function (address, value, type) {
                switch (type) {
                    case 5:
                    case 3:
                        return (instance.exports.add8(address, value) & 0xff);
                    case 12:
                        return instance.exports.add8(address, value);
                    case 14:
                        return instance.exports.add16(address, value);
                    case 7:
                        return (instance.exports.add16(address, value) & 0xffff);
                    case 16:
                        return instance.exports.add32(address, value);
                    case 9:
                        return (instance.exports.add32(address, value) & 0xffffffff);
                    case 21:
                        return instance.exports.add64(address, value);
                    case 22:
                        return BigInt.asUintN(64, instance.exports.add64(address, value));
                }
            },
            sub: function (address, value, type) {
                switch (type) {
                    case 5:
                    case 3:
                        return (instance.exports.sub8(address, value) & 0xff);
                    case 12:
                        return instance.exports.sub8(address, value);
                    case 14:
                        return instance.exports.sub16(address, value);
                    case 7:
                        return (instance.exports.sub16(address, value) & 0xffff);
                    case 16:
                        return instance.exports.sub32(address, value);
                    case 9:
                        return (instance.exports.sub32(address, value) & 0xffffffff);
                    case 21:
                        return instance.exports.sub64(address, value);
                    case 22:
                        return BigInt.asUintN(64, instance.exports.sub64(address, value));
                }
            },
            and: function (address, value, type) {
                switch (type) {
                    case 5:
                    case 3:
                        return (instance.exports.and8(address, value) & 0xff);
                    case 12:
                        return instance.exports.and8(address, value);
                    case 14:
                        return instance.exports.and16(address, value);
                    case 7:
                        return (instance.exports.and16(address, value) & 0xffff);
                    case 16:
                        return instance.exports.and32(address, value);
                    case 9:
                        return (instance.exports.and32(address, value) & 0xffffffff);
                    case 21:
                        return instance.exports.and64(address, value);
                    case 22:
                        return BigInt.asUintN(64, instance.exports.and64(address, value));
                }
            },
            or: function (address, value, type) {
                switch (type) {
                    case 5:
                    case 3:
                        return (instance.exports.or8(address, value) & 0xff);
                    case 12:
                        return instance.exports.or8(address, value);
                    case 14:
                        return instance.exports.or16(address, value);
                    case 7:
                        return (instance.exports.or16(address, value) & 0xffff);
                    case 16:
                        return instance.exports.or32(address, value);
                    case 9:
                        return instance.exports.or32(address, value);
                    case 21:
                        return instance.exports.or64(address, value);
                    case 22:
                        return BigInt.asUintN(64, instance.exports.or64(address, value));
                }
            },
            xor: function (address, value, type) {
                switch (type) {
                    case 5:
                    case 3:
                        return (instance.exports.xor8(address, value) & 0xff);
                    case 12:
                        return instance.exports.xor8(address, value);
                    case 14:
                        return instance.exports.xor16(address, value);
                    case 7:
                        return (instance.exports.xor16(address, value) & 0xffff);
                    case 16:
                        return instance.exports.xor32(address, value);
                    case 9:
                        return instance.exports.xor32(address, value);
                    case 21:
                        return instance.exports.xor64(address, value);
                    case 22:
                        return BigInt.asUintN(64, instance.exports.xor64(address, value));
                }
            },
            store: function (address, value, type) {
                switch (type) {
                    case 5:
                    case 12:
                    case 3:
                        return instance.exports.store8(address, value);
                    case 14:
                    case 7:
                        return instance.exports.store16(address, value);
                    case 16:
                    case 9:
                        return instance.exports.store32(address, value);
                    case 21:
                    case 22:
                        return instance.exports.store64(address, value);
                }
            },
            load: function (address, type) {
                switch (type) {
                    case 5:
                    case 3:
                        return (instance.exports.load8(address) & 0xff);
                    case 12:
                        return instance.exports.load8(address);
                    case 14:
                        return instance.exports.load16(address);
                    case 7:
                        return instance.exports.load16(address);
                    case 16:
                        return instance.exports.load32(address);
                    case 9:
                        return (instance.exports.load32(address) & 0xffffffff);
                    case 21:
                        return instance.exports.load64(address);
                    case 22:
                        return BigInt.asUintN(64, instance.exports.load64(address));
                }
            },
            compareExchange: function (address, expectedValue, replacementValue, type) {
                switch (type) {
                    case 5:
                    case 3:
                        return (instance.exports.compare_exchange8(address, expectedValue, replacementValue) & 0xff);
                    case 12:
                        return instance.exports.compare_exchange8(address, expectedValue, replacementValue);
                    case 14:
                        return instance.exports.compare_exchange16(address, expectedValue, replacementValue);
                    case 7:
                        return (instance.exports.compare_exchange16(address, expectedValue, replacementValue) & 0xffff);
                    case 16:
                        return instance.exports.compare_exchange32(address, expectedValue, replacementValue);
                    case 9:
                        return (instance.exports.compare_exchange32(address, expectedValue, replacementValue) & 0xffffffff);
                    case 21:
                        return instance.exports.compare_exchange64(address, expectedValue, replacementValue);
                    case 22:
                        return BigInt.asUintN(64, instance.exports.compare_exchange64(address, expectedValue, replacementValue));
                }
            },
            exchange: function (address, value, type) {
                switch (type) {
                    case 5:
                    case 3:
                        return (instance.exports.exchange8(address, value) & 0xff);
                    case 12:
                        return instance.exports.exchange8(address, value);
                    case 14:
                        return instance.exports.exchange16(address, value);
                    case 7:
                        return (instance.exports.exchange16(address, value) & 0xffff);
                    case 16:
                        return instance.exports.exchange32(address, value);
                    case 9:
                        return (instance.exports.exchange32(address, value) & 0xffffffff);
                    case 21:
                        return instance.exports.exchange64(address, value);
                    case 22:
                        return BigInt.asUintN(64, instance.exports.exchange64(address, value));
                }
            },
            notify: function (address, count) {
                return instance.exports.notify(address, count);
            },
            wait: function (address, value) {
                return instance.exports.wait(address, value);
            },
            waitTimeout: function (address, value, timeout) {
                return instance.exports.waitTimeout(address, value, BigInt(timeout >>> 0));
            }
        });
    }
    catch (error) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_1__.warn('atomics asm not support, cannot use asm atomics function', cheap__fileName__0, 284);
    }
}


/***/ }),

/***/ "./src/cheap/thread/atomics.ts":
/*!*************************************!*\
  !*** ./src/cheap/thread/atomics.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   compareExchange: () => (/* binding */ compareExchange),
/* harmony export */   load: () => (/* binding */ load),
/* harmony export */   notify: () => (/* binding */ notify),
/* harmony export */   override: () => (/* binding */ override),
/* harmony export */   store: () => (/* binding */ store),
/* harmony export */   sub: () => (/* binding */ sub),
/* harmony export */   wait: () => (/* binding */ wait),
/* harmony export */   waitAsync: () => (/* binding */ waitAsync)
/* harmony export */ });
/* unused harmony exports and, or, xor, exchange, waitTimeout, waitTimeoutAsync */
/**
 * 给定的值加到指定位置上
 *
 * 返回该位置的旧值
 *
 */
let add;
/**
 * 给定的值与指定位置上的值相减
 *
 * 返回该位置的旧值
 *
 */
let sub;
/**
 * 给定的值与指定位置上的值进行与运算
 *
 * 返回该位置的旧值
 *
 */
let and;
/**
 * 给定的值与指定位置上的值进行或运算
 *
 * 返回该位置的旧值
 *
 */
let or;
/**
 * 给定的值与指定位置上的值进行异或运算
 *
 * 返回该位置的旧值
 *
 */
let xor;
/**
 * 给定的值存在给定位置上
 *
 * 返回该位置的旧值
 *
 */
let store;
/**
 * 读取给定位置上的值
 *
 * 返回该位置的旧值
 *
 */
let load;
/**
 * 如果指定位置的值与给定的值相等，则将其更新为新的值，并返回该元素原先的值
 *
 * 返回该位置的旧值
 *
 */
let compareExchange;
/**
 * 将指定位置的值更新为给定的值，并返回该元素更新前的值。
 *
 * 返回该位置的旧值
 *
 */
let exchange;
/**
 * 唤醒等待队列中正在指定位置上等待的线程。返回值为成功唤醒的线程数量。
 *
 * 返回被唤醒的代理的数量 0 将不会唤醒任何线程
 *
 */
let notify;
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒
 *
 * 0 "ok"、1 "not-equal"
 *
 */
let wait;
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒或超时（毫秒）
 *
 * 0 "ok"、1 "not-equal" 或 2 "time-out"
 *
 */
let waitTimeout;
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒
 *
 * 异步非阻塞，适合在主线程上使用
 *
 * 0 "ok"、1 "not-equal"
 *
 */
let waitAsync;
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒或超时
 *
 * 异步非阻塞，适合在主线程上使用
 *
 * 0 "ok"、1 "not-equal" 或 2 "time-out"
 *
 */
let waitTimeoutAsync;
function override(funcs) {
    if (funcs.add) {
        add = funcs.add;
    }
    if (funcs.sub) {
        sub = funcs.sub;
    }
    if (funcs.and) {
        and = funcs.and;
    }
    if (funcs.or) {
        or = funcs.or;
    }
    if (funcs.xor) {
        xor = funcs.xor;
    }
    if (funcs.store) {
        store = funcs.store;
    }
    if (funcs.load) {
        load = funcs.load;
    }
    if (funcs.compareExchange) {
        compareExchange = funcs.compareExchange;
    }
    if (funcs.exchange) {
        exchange = funcs.exchange;
    }
    if (funcs.notify) {
        notify = funcs.notify;
    }
    if (funcs.wait) {
        wait = funcs.wait;
    }
    if (funcs.waitTimeout) {
        waitTimeout = funcs.waitTimeout;
    }
    if (funcs.waitAsync) {
        waitAsync = funcs.waitAsync;
    }
    if (funcs.waitTimeoutAsync) {
        waitTimeoutAsync = funcs.waitTimeoutAsync;
    }
}


/***/ }),

/***/ "./src/cheap/thread/atomicsImpl.ts":
/*!*****************************************!*\
  !*** ./src/cheap/thread/atomicsImpl.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/function/getTimestamp */ "./src/common/function/getTimestamp.ts");
/* harmony import */ var common_function_nextTick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/function/nextTick */ "./src/common/function/nextTick.ts");
/* harmony import */ var _atomics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./atomics */ "./src/cheap/thread/atomics.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./src/cheap/config.ts");
/* harmony import */ var common_function_isWorker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/function/isWorker */ "./src/common/function/isWorker.ts");
/* harmony import */ var common_util_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/util/browser */ "./src/common/util/browser.ts");






let getAtomicsBuffer;
const useAtomics = _config__WEBPACK_IMPORTED_MODULE_3__.USE_THREADS || (0,common_function_isWorker__WEBPACK_IMPORTED_MODULE_4__["default"])() || (!common_util_browser__WEBPACK_IMPORTED_MODULE_5__["default"].chrome || common_util_browser__WEBPACK_IMPORTED_MODULE_5__["default"].checkVersion(common_util_browser__WEBPACK_IMPORTED_MODULE_5__["default"].majorVersion, '94', true));
/**
 * 给定的值加到指定位置上
 *
 * 返回该位置的旧值
 *
 */
function add(address, value, type, shift) {
    if (false) {}
    else {
        const buffer = getAtomicsBuffer(type);
        const index = address >>> shift;
        const old = buffer[index];
        buffer[index] += value;
        return old;
    }
}
/**
 * 给定的值与指定位置上的值相减
 *
 * 返回该位置的旧值
 *
 */
function sub(address, value, type, shift) {
    if (false) {}
    else {
        const buffer = getAtomicsBuffer(type);
        const index = address >>> shift;
        const old = buffer[index];
        buffer[index] -= value;
        return old;
    }
}
/**
 * 给定的值与指定位置上的值进行与运算
 *
 * 返回该位置的旧值
 *
 */
function and(address, value, type, shift) {
    if (false) {}
    else {
        const buffer = getAtomicsBuffer(type);
        const index = address >>> shift;
        const old = buffer[index];
        buffer[index] &= value;
        return old;
    }
}
/**
 * 给定的值与指定位置上的值进行或运算
 *
 * 返回该位置的旧值
 *
 */
function or(address, value, type, shift) {
    if (false) {}
    else {
        const buffer = getAtomicsBuffer(type);
        const index = address >>> shift;
        const old = buffer[index];
        buffer[index] |= value;
        return old;
    }
}
/**
 * 给定的值与指定位置上的值进行异或运算
 *
 * 返回该位置的旧值
 *
 */
function xor(address, value, type, shift) {
    if (false) {}
    else {
        const buffer = getAtomicsBuffer(type);
        const index = address >>> shift;
        const old = buffer[index];
        buffer[index] ^= value;
        return old;
    }
}
/**
 * 给定的值存在给定位置上
 *
 * 返回该位置的旧值
 *
 */
function store(address, value, type, shift) {
    if (false) {}
    else {
        const buffer = getAtomicsBuffer(type);
        const index = address >>> shift;
        const old = buffer[index];
        buffer[index] = value;
        return old;
    }
}
/**
 * 读取给定位置上的值
 *
 * 返回该位置的旧值
 *
 */
function load(address, type, shift) {
    if (false) {}
    else {
        const buffer = getAtomicsBuffer(type);
        const index = address >>> shift;
        const old = buffer[index];
        return old;
    }
}
/**
 * 如果指定位置的值与给定的值相等，则将其更新为新的值，并返回该位置原先的值
 *
 * 返回该位置的旧值
 *
 */
function compareExchange(address, expectedValue, replacementValue, type, shift) {
    if (false) {}
    else {
        const buffer = getAtomicsBuffer(type);
        const index = address >>> shift;
        const old = buffer[index];
        if (old === expectedValue) {
            buffer[index] = replacementValue;
        }
        return old;
    }
}
/**
 * 将指定位置的值更新为给定的值，并返回该位置更新前的值。
 *
 * 返回该位置的旧值
 *
 */
function exchange(address, value, type, shift) {
    if (false) {}
    else {
        const buffer = getAtomicsBuffer(type);
        const index = address >>> shift;
        const old = buffer[index];
        buffer[index] = value;
        return old;
    }
}
/**
 * 唤醒等待队列中正在指定位置上等待的线程。返回值为成功唤醒的线程数量。
 *
 * 返回被唤醒的代理的数量
 *
 */
function notify(address, count) {
    if (false) {}
    else {
        return;
    }
}
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒
 *
 * 0 "ok"、1 "not-equal" 或 2 "timed-out"
 *
 */
const waitMap = {
    'ok': 0,
    'not-equal': 1,
    'timed-out': 2
};
function wait(address, value) {
    return waitMap[Atomics.wait(getAtomicsBuffer(16), address >>> 2, value)];
}
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒或超时
 *
 * 0 "ok"、1 "not-equal" 或 2 "time-out"
 *
 */
function waitTimeout(address, value, timeout) {
    return waitMap[Atomics.wait(getAtomicsBuffer(16), address >>> 2, value, timeout)];
}
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒
 *
 * 0 "ok"、1 "not-equal" 或 2 "timed-out"
 *
 */
async function waitAsync(address, value) {
    if (Atomics.waitAsync) {
        const result = Atomics.waitAsync(getAtomicsBuffer(16), address >>> 2, value);
        if (result.async) {
            return waitMap[await result.value];
        }
        return waitMap[result.value];
    }
    else {
        if (load(address) !== value) {
            return 1;
        }
        else {
            while (load(address) === value) {
                // 跳过当前事件循环
                await new Promise((resolve) => {
                    (0,common_function_nextTick__WEBPACK_IMPORTED_MODULE_1__["default"])(() => {
                        resolve();
                    });
                });
            }
            return 0;
        }
    }
}
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒或超时
 *
 * 0 "ok"、1 "not-equal" 或 2 "time-out"
 *
 */
async function waitTimeoutAsync(address, value, timeout) {
    if (Atomics.waitAsync) {
        const result = Atomics.waitAsync(getAtomicsBuffer(16), address >>> 2, value, timeout);
        if (result.async) {
            return waitMap[await result.value];
        }
        return waitMap[result.value];
    }
    else {
        if (load(address) !== value) {
            return 1;
        }
        else {
            const now = (0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_0__["default"])();
            while (load(address) === value && ((0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_0__["default"])() - now < timeout)) {
                // 跳过当前事件循环
                await new Promise((resolve) => {
                    (0,common_function_nextTick__WEBPACK_IMPORTED_MODULE_1__["default"])(() => {
                        resolve();
                    });
                });
            }
            return load(address) !== value ? 0 : 2;
        }
    }
}
function init(getAtomicsBuffer_) {
    getAtomicsBuffer = getAtomicsBuffer_;
    (0,_atomics__WEBPACK_IMPORTED_MODULE_2__.override)({
        add,
        sub,
        and,
        or,
        xor,
        store,
        load,
        compareExchange,
        exchange,
        notify,
        wait,
        waitTimeout,
        waitAsync,
        waitTimeoutAsync
    });
}


/***/ }),

/***/ "./src/cheap/thread/mutex.ts":
/*!***********************************!*\
  !*** ./src/cheap/thread/mutex.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mutex: () => (/* binding */ Mutex),
/* harmony export */   destroy: () => (/* binding */ destroy),
/* harmony export */   lock: () => (/* binding */ lock),
/* harmony export */   unlock: () => (/* binding */ unlock)
/* harmony export */ });
/* unused harmony exports init, tryLock, lockAsync */
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/function/definedMetaProperty */ "./src/cheap/function/definedMetaProperty.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _atomics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./atomics */ "./src/cheap/thread/atomics.ts");
/* harmony import */ var common_function_isWorker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/function/isWorker */ "./src/common/function/isWorker.ts");





class Mutex {
    atomic;
}
(function (prototype) {
    var map = new Map();
    map.set("atomic", { 0: 16, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(Mutex.prototype);
/**
 * 初始化锁
 *
 * @param mutex
 * @returns
 */
function init(mutex) {
    _atomics__WEBPACK_IMPORTED_MODULE_3__.store(mutex, 0 /* STATUS.UNLOCK */, 16, 2);
    return 0;
}
/**
 * 加锁
 *
 * @param mutex
 * @param spin 是否自旋
 */
function lock(mutex, spin = false) {
    let status;
    // 不为 UNLOCK，说明其他线程持锁，将锁置为 LOCKED 状态
    if ((status = _atomics__WEBPACK_IMPORTED_MODULE_3__.compareExchange(mutex, 0 /* STATUS.UNLOCK */, 1 /* STATUS.LOCKED */, 16, 2)) !== 0 /* STATUS.UNLOCK */) {
        do {
            // 如果依旧得不到锁，将锁置为 WAITED 状态
            if (status == 2 /* STATUS.WAITED */
                || _atomics__WEBPACK_IMPORTED_MODULE_3__.compareExchange(mutex, 1 /* STATUS.LOCKED */, 2 /* STATUS.WAITED */, 16, 2) !== 0 /* STATUS.UNLOCK */) {
                // 主线程不能 wait，直接自旋（需要注意所有线程各自的持锁时间，避免出现忙等占用大量 cpu 时间）
                if (!spin && (0,common_function_isWorker__WEBPACK_IMPORTED_MODULE_4__["default"])()) {
                    _atomics__WEBPACK_IMPORTED_MODULE_3__.wait(mutex, 2 /* STATUS.WAITED */);
                }
            }
        } 
        // 再次尝试获取锁
        while ((status = _atomics__WEBPACK_IMPORTED_MODULE_3__.compareExchange(mutex, 0 /* STATUS.UNLOCK */, 2 /* STATUS.WAITED */, 16, 2)) !== 0 /* STATUS.UNLOCK */);
    }
    return 0;
}
/**
 * 尝试加锁
 *
 * @param mutex
 */
function tryLock(mutex) {
    if (_atomics__WEBPACK_IMPORTED_MODULE_3__.compareExchange(mutex, 0 /* STATUS.UNLOCK */, 1 /* STATUS.LOCKED */, 16, 2) === 0 /* STATUS.UNLOCK */) {
        return 0;
    }
    // EBUSY
    return 16 /* POSIXError.EBUSY */;
}
/**
 * 异步加锁
 *
 * @param mutex
 */
async function lockAsync(mutex) {
    let status;
    // 不为 UNLOCK，说明其他线程持锁，将锁置为 LOCKED 状态
    if ((status = _atomics__WEBPACK_IMPORTED_MODULE_3__.compareExchange(mutex, 0 /* STATUS.UNLOCK */, 1 /* STATUS.LOCKED */, 16, 2)) !== 0 /* STATUS.UNLOCK */) {
        do {
            // 如果依旧得不到锁，将锁置为 WAITED 状态
            if (status == 2 /* STATUS.WAITED */
                || _atomics__WEBPACK_IMPORTED_MODULE_3__.compareExchange(mutex, 1 /* STATUS.LOCKED */, 2 /* STATUS.WAITED */, 16, 2) !== 0 /* STATUS.UNLOCK */) {
                await _atomics__WEBPACK_IMPORTED_MODULE_3__.waitAsync(mutex, 2 /* STATUS.WAITED */);
            }
        } 
        // 再次尝试获取锁
        while ((status = _atomics__WEBPACK_IMPORTED_MODULE_3__.compareExchange(mutex, 0 /* STATUS.UNLOCK */, 2 /* STATUS.WAITED */, 16, 2)) !== 0 /* STATUS.UNLOCK */);
    }
    return 0;
}
/**
 * 释放锁
 *
 * @param mutex
 */
function unlock(mutex) {
    let status = _atomics__WEBPACK_IMPORTED_MODULE_3__.sub(mutex, 1, 16, 2);
    // 此时拥有锁，状态为 LOCKED 或 WAITED
    if (status !== 1 /* STATUS.LOCKED */) {
        // 释放锁
        _atomics__WEBPACK_IMPORTED_MODULE_3__.store(mutex, 0 /* STATUS.UNLOCK */, 16, 2);
        // 唤醒一个 wait 的线程
        _atomics__WEBPACK_IMPORTED_MODULE_3__.notify(mutex, 1);
    }
    return 0;
}
/**
 * 销毁锁
 *
 * @param mutex
 * @returns
 */
function destroy(mutex) {
    _atomics__WEBPACK_IMPORTED_MODULE_3__.store(mutex, 0 /* STATUS.UNLOCK */, 16, 2);
    return 0;
}


/***/ }),

/***/ "./src/cheap/typedef.ts":
/*!******************************!*\
  !*** ./src/cheap/typedef.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CTypeEnum2Bytes: () => (/* binding */ CTypeEnum2Bytes)
/* harmony export */ });
/* unused harmony export CTypeEnumPointerShiftMap */
const CTypeEnum2Bytes = {
    [2 /* CTypeEnum.uint8 */]: 1,
    [3 /* CTypeEnum.atomic_uint8 */]: 1,
    [4 /* CTypeEnum.char */]: 1,
    [5 /* CTypeEnum.atomic_char */]: 1,
    [6 /* CTypeEnum.uint16 */]: 2,
    [7 /* CTypeEnum.atomic_uint16 */]: 2,
    [8 /* CTypeEnum.uint32 */]: 4,
    [9 /* CTypeEnum.atomic_uint32 */]: 4,
    [10 /* CTypeEnum.uint64 */]: 8,
    [11 /* CTypeEnum.int8 */]: 1,
    [12 /* CTypeEnum.atomic_int8 */]: 1,
    [13 /* CTypeEnum.int16 */]: 2,
    [14 /* CTypeEnum.atomic_int16 */]: 2,
    [15 /* CTypeEnum.int32 */]: 4,
    [16 /* CTypeEnum.atomic_int32 */]: 4,
    [17 /* CTypeEnum.int64 */]: 8,
    [18 /* CTypeEnum.float */]: 4,
    [19 /* CTypeEnum.double */]: 8,
    [20 /* CTypeEnum.pointer */]: 4,
    [0 /* CTypeEnum.null */]: 4,
    [1 /* CTypeEnum.void */]: 4,
    [22 /* CTypeEnum.atomic_uint64 */]: 8,
    [21 /* CTypeEnum.atomic_int64 */]: 8,
    [23 /* CTypeEnum.bool */]: 1,
    [24 /* CTypeEnum.atomic_bool */]: 1
};
const CTypeEnumPointerShiftMap = {
    [2 /* CTypeEnum.uint8 */]: 0,
    [3 /* CTypeEnum.atomic_uint8 */]: 0,
    [4 /* CTypeEnum.char */]: 0,
    [5 /* CTypeEnum.atomic_char */]: 0,
    [6 /* CTypeEnum.uint16 */]: 1,
    [7 /* CTypeEnum.atomic_uint16 */]: 1,
    [8 /* CTypeEnum.uint32 */]: 2,
    [9 /* CTypeEnum.atomic_uint32 */]: 2,
    [10 /* CTypeEnum.uint64 */]: 4,
    [11 /* CTypeEnum.int8 */]: 0,
    [12 /* CTypeEnum.atomic_int8 */]: 0,
    [13 /* CTypeEnum.int16 */]: 1,
    [14 /* CTypeEnum.atomic_int16 */]: 1,
    [15 /* CTypeEnum.int32 */]: 2,
    [16 /* CTypeEnum.atomic_int32 */]: 2,
    [17 /* CTypeEnum.int64 */]: 4,
    [18 /* CTypeEnum.float */]: 2,
    [19 /* CTypeEnum.double */]: 4,
    [20 /* CTypeEnum.pointer */]: 2,
    [1 /* CTypeEnum.void */]: 2,
    [0 /* CTypeEnum.null */]: 2,
    [22 /* CTypeEnum.atomic_uint64 */]: 4,
    [21 /* CTypeEnum.atomic_int64 */]: 4,
    [23 /* CTypeEnum.bool */]: 0,
    [24 /* CTypeEnum.atomic_bool */]: 0
};


/***/ }),

/***/ "./src/common/function/checkVersion.ts":
/*!*********************************************!*\
  !*** ./src/common/function/checkVersion.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkVersion)
/* harmony export */ });
/* harmony import */ var _toNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toNumber */ "./src/common/function/toNumber.ts");
/**
 * @file 判断版本
 */

/**
 * 判断给定版本是否符合条件
 *
 * @param version 待检查版本
 * @param checkVersion 版本基准
 * @param equal 是否判等
 *
 * @returns 是否符合条件
 */
function checkVersion(version, checkVersion, equal = false) {
    const checkVersionArr = checkVersion.split('.');
    const versionArr = version.split('.');
    for (let i = 0; i < versionArr.length; i++) {
        if (equal && i == (versionArr.length - 1) && (0,_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(versionArr[i]) >= (0,_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(checkVersionArr[i])) {
            return versionArr.length >= checkVersionArr.length;
        }
        if ((0,_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(versionArr[i]) > (0,_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(checkVersionArr[i])) {
            return true;
        }
        else if ((0,_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(versionArr[i]) < (0,_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(checkVersionArr[i])) {
            return false;
        }
        if (i === checkVersionArr.length - 1 && i === versionArr.length - 1) {
            return equal;
        }
        if (i === checkVersionArr.length - 1) {
            return true;
        }
        else if (i === versionArr.length - 1) {
            return false;
        }
    }
    return true;
}


/***/ }),

/***/ "./src/common/function/concatTypeArray.ts":
/*!************************************************!*\
  !*** ./src/common/function/concatTypeArray.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ concatTypeArray)
/* harmony export */ });
/**
 * @file 合并 TypeArray
 */
function concatTypeArray(constructor, arrays) {
    if (!arrays.length) {
        return null;
    }
    if (arrays.length === 1) {
        return arrays[0];
    }
    let totalLength = 0;
    let array;
    for (array of arrays) {
        totalLength += array.length;
    }
    let result = new constructor(totalLength);
    let offset = 0;
    for (array of arrays) {
        result.set(array, offset);
        offset += array.length;
    }
    return result;
}


/***/ }),

/***/ "./src/common/function/execute.ts":
/*!****************************************!*\
  !*** ./src/common/function/execute.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ execute)
/* harmony export */ });
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/is */ "./src/common/util/is.ts");
/* harmony import */ var _util_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/constant */ "./src/common/util/constant.ts");
/**
 * @file 使用指定上下文执行函数
 */


/**
 * 任性地执行一个函数，不管它有没有、是不是
 *
 * @param fn 调用的函数
 * @param context 执行函数时的 this 指向
 * @param args 调用函数的参数，多参数时传入数组
 * @return 调用函数的返回值
 */
function execute(fn, context, args) {
    if (_util_is__WEBPACK_IMPORTED_MODULE_0__.func(fn)) {
        return _util_is__WEBPACK_IMPORTED_MODULE_0__.array(args)
            ? fn.apply(context, args)
            : context !== _util_constant__WEBPACK_IMPORTED_MODULE_1__.UNDEFINED
                ? fn.call(context, args)
                : args !== _util_constant__WEBPACK_IMPORTED_MODULE_1__.UNDEFINED
                    ? fn(args)
                    : fn();
    }
}


/***/ }),

/***/ "./src/common/function/getTimestamp.ts":
/*!*********************************************!*\
  !*** ./src/common/function/getTimestamp.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTimestamp)
/* harmony export */ });
function getTimestamp() {
    return Date.now();
}


/***/ }),

/***/ "./src/common/function/i32Toi64.ts":
/*!*****************************************!*\
  !*** ./src/common/function/i32Toi64.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ i32Toi64)
/* harmony export */ });
/**
 *
 * 将高位 i32 和低位 i32 转成 i64，（ number 最大安全整数为 pow(2, 53) - 1, 53 位）
 *
 * @param low
 * @param high
 * @returns
 */
const UINT32_MAX = Math.pow(2, 32);
function i32Toi64(low, high) {
    return (low >>> 0) + high * UINT32_MAX;
}


/***/ }),

/***/ "./src/common/function/i64Toi32.ts":
/*!*****************************************!*\
  !*** ./src/common/function/i64Toi32.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ i64Toi32)
/* harmony export */ });
/**
 *
 * 将 value 分成高 32 位和低 32 位
 *
 * @returns
 */
const UINT32_MAX = Math.pow(2, 32);
function i64Toi32(value) {
    const high = Math.floor(value / UINT32_MAX);
    const low = value >>> 0;
    return [low, high];
}


/***/ }),

/***/ "./src/common/function/isAudioWorklet.ts":
/*!***********************************************!*\
  !*** ./src/common/function/isAudioWorklet.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAudioWorklet)
/* harmony export */ });
function isAudioWorklet() {
    // @ts-ignore
    return typeof registerProcessor === 'function' && typeof sampleRate === 'number' && typeof currentFrame === 'number' && typeof currentTime === 'number';
}


/***/ }),

/***/ "./src/common/function/isDef.ts":
/*!**************************************!*\
  !*** ./src/common/function/isDef.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isDef)
/* harmony export */ });
/* harmony import */ var _util_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/constant */ "./src/common/util/constant.ts");
/**
 * @file 判断是否定义
 */

/**
 * 判断是否定义
 *
 * @param target 待判定变量
 */
function isDef(target) {
    return target !== _util_constant__WEBPACK_IMPORTED_MODULE_0__.UNDEFINED;
}


/***/ }),

/***/ "./src/common/function/isLittleEndian.ts":
/*!***********************************************!*\
  !*** ./src/common/function/isLittleEndian.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isLittleEndian)
/* harmony export */ });
/* harmony import */ var _isDef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isDef */ "./src/common/function/isDef.ts");

let _isLittleEndian;
function isLittleEndian() {
    if ((0,_isDef__WEBPACK_IMPORTED_MODULE_0__["default"])(_isLittleEndian)) {
        return _isLittleEndian;
    }
    const buf = new ArrayBuffer(2);
    const view = new DataView(buf);
    // little-endian write
    view.setInt16(0, 256, true);
    // platform-spec read, if equal then LE
    _isLittleEndian = (new Int16Array(buf))[0] === 256;
    return _isLittleEndian;
}


/***/ }),

/***/ "./src/common/function/isNative.ts":
/*!*****************************************!*\
  !*** ./src/common/function/isNative.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isNative)
/* harmony export */ });
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/is */ "./src/common/util/is.ts");
/* harmony import */ var _toString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toString */ "./src/common/function/toString.ts");
/* harmony import */ var _util_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/string */ "./src/common/util/string.ts");
/**
 * @file 判断是否是 native 方法
 */



/**
 * 判断是否是 native 方法
 *
 * @param target 待判定函数
 */
function isNative(target) {
    return _util_is__WEBPACK_IMPORTED_MODULE_0__.func(target) && _util_string__WEBPACK_IMPORTED_MODULE_2__.has((0,_toString__WEBPACK_IMPORTED_MODULE_1__["default"])(target), '[native code]');
}


/***/ }),

/***/ "./src/common/function/isWorker.ts":
/*!*****************************************!*\
  !*** ./src/common/function/isWorker.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isWorker)
/* harmony export */ });
/* harmony import */ var _isDef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isDef */ "./src/common/function/isDef.ts");
/* harmony import */ var _isAudioWorklet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isAudioWorklet */ "./src/common/function/isAudioWorklet.ts");


function isWorker() {
    return !(typeof window === 'object' && (0,_isDef__WEBPACK_IMPORTED_MODULE_0__["default"])(window.document)) && !(0,_isAudioWorklet__WEBPACK_IMPORTED_MODULE_1__["default"])();
}


/***/ }),

/***/ "./src/common/function/nextTick.ts":
/*!*****************************************!*\
  !*** ./src/common/function/nextTick.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isNative__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNative */ "./src/common/function/isNative.ts");
/* harmony import */ var _util_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/constant */ "./src/common/util/constant.ts");
/**
 * @file 下一个时间片
 */


let nextTick;
// IE (10+) 和 node
if (typeof setImmediate === _util_constant__WEBPACK_IMPORTED_MODULE_1__.RAW_FUNCTION && (0,_isNative__WEBPACK_IMPORTED_MODULE_0__["default"])(setImmediate)) {
    nextTick = setImmediate;
}
/*
 * 用 MessageChannel 去做 setImmediate 的 polyfill
 * 原理是将新的 message 事件加入到原有的 dom events 之后
 * 兼容性 IE10+ 和其他标准浏览器
 */
if (typeof MessageChannel === _util_constant__WEBPACK_IMPORTED_MODULE_1__.RAW_FUNCTION && (0,_isNative__WEBPACK_IMPORTED_MODULE_0__["default"])(MessageChannel)) {
    nextTick = function (fn) {
        const channel = new MessageChannel();
        channel.port1.onmessage = fn;
        channel.port2.postMessage(1);
    };
}
else if (typeof setTimeout === 'function') {
    nextTick = setTimeout;
}
// 没有 setTimeout 是环境，比如 WorkletGlobalScope，先固定一个插槽
else {
    nextTick = function (fn) {
        setTimeout(fn);
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nextTick);


/***/ }),

/***/ "./src/common/function/toNumber.ts":
/*!*****************************************!*\
  !*** ./src/common/function/toNumber.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toNumber)
/* harmony export */ });
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/is */ "./src/common/util/is.ts");
/* harmony import */ var _util_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/constant */ "./src/common/util/constant.ts");
/**
 * @file 强转为 number
 */


/**
 * 强转为 number
 *
 * @param target 待转换值
 * @param defaultValue 默认值
 *
 * @returns 转换之后的值
 */
function toNumber(target, defaultValue) {
    return _util_is__WEBPACK_IMPORTED_MODULE_0__.numeric(target)
        ? +target
        : defaultValue !== _util_constant__WEBPACK_IMPORTED_MODULE_1__.UNDEFINED
            ? defaultValue
            : 0;
}


/***/ }),

/***/ "./src/common/function/toString.ts":
/*!*****************************************!*\
  !*** ./src/common/function/toString.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toString)
/* harmony export */ });
/* harmony import */ var _util_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/constant */ "./src/common/util/constant.ts");
/**
 * @file 强转为 string
 */

/**
 * 强转为 string
 *
 * @param target 待转换的值
 * @param defaultValue 默认值
 * @returns 转换之后的值
 */
function toString(target, defaultValue) {
    return target != _util_constant__WEBPACK_IMPORTED_MODULE_0__.NULL && target.toString
        ? target.toString()
        : defaultValue !== _util_constant__WEBPACK_IMPORTED_MODULE_0__.UNDEFINED
            ? defaultValue
            : _util_constant__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STRING;
}


/***/ }),

/***/ "./src/common/interface/ArrayLike.ts":
/*!*******************************************!*\
  !*** ./src/common/interface/ArrayLike.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ArrayLike)
/* harmony export */ });
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/is */ "./src/common/util/is.ts");

class ArrayLike {
    proxy;
    constructor() {
        this.proxy = new Proxy(this, {
            get(target, p, receiver) {
                if (_util_is__WEBPACK_IMPORTED_MODULE_0__.numeric(p)) {
                    return target.getIndexValue(+p);
                }
                else {
                    return target[p];
                }
            },
            set(target, p, newValue, receiver) {
                if (_util_is__WEBPACK_IMPORTED_MODULE_0__.numeric(p)) {
                    target.setIndexValue(+p, newValue);
                }
                else {
                    target[p] = newValue;
                }
                return true;
            }
        });
    }
}


/***/ }),

/***/ "./src/common/io/BitReader.ts":
/*!************************************!*\
  !*** ./src/common/io/BitReader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BitReader)
/* harmony export */ });
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src/common/io/BitReader.ts";

class BitReader {
    buffer;
    pointer;
    bitsLeft;
    size;
    endPointer;
    error;
    onFlush;
    /**
     * @param data 待读取的字节
     * @param bigEndian 是否按大端字节序读取，默认大端字节序（网络字节序）
     */
    constructor(size = 1048576) {
        this.pointer = 0;
        this.bitsLeft = 8;
        this.size = size;
        this.endPointer = 0;
        this.error = 0;
        this.buffer = new Uint8Array(this.size);
    }
    /**
     * 不影响原读取操作的情况下，读取 1 个比特
     */
    peekU1() {
        let result = 0;
        if (this.remainingLength() < 1 || this.remainingLength() === 1 && this.bitsLeft === 0) {
            this.flush();
        }
        let pointer = this.pointer;
        let bitsLeft = this.bitsLeft;
        if (bitsLeft === 0) {
            pointer++;
            bitsLeft = 8;
        }
        result = (this.buffer[pointer] >> (bitsLeft - 1)) & 0x01;
        return result;
    }
    /**
     * 读取 1 个比特
     */
    readU1() {
        let result = 0;
        if (this.remainingLength() < 1 || this.remainingLength() === 1 && this.bitsLeft === 0) {
            this.flush();
        }
        this.bitsLeft--;
        result = (this.buffer[this.pointer] >> this.bitsLeft) & 0x01;
        if (this.bitsLeft === 0) {
            this.pointer++;
            this.bitsLeft = 8;
        }
        return result;
    }
    /**
     * 读取 n 个比特
     *
     * @param n
     */
    readU(n) {
        let result = 0;
        for (let i = 0; i < n; i++) {
            result |= (this.readU1() << (n - i - 1));
        }
        return result;
    }
    /**
     * 获取剩余可读字节数
     *
     * @returns
     */
    remainingLength() {
        return this.endPointer - this.pointer;
    }
    getPos() {
        return this.pointer;
    }
    skip(n) {
        const byte = (n - (n % 8)) / 8;
        this.pointer += byte;
        const bitsLeft = n % 8;
        if (this.bitsLeft <= bitsLeft) {
            this.pointer++;
            this.bitsLeft = 8 - (bitsLeft - this.bitsLeft);
        }
        else {
            this.bitsLeft -= bitsLeft;
        }
    }
    flush() {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOReader error, flush failed because of no flush callback');
        }
        if (this.bitsLeft === 0) {
            this.pointer++;
        }
        if (this.size - this.remainingLength() <= 0) {
            return;
        }
        if (this.pointer < this.endPointer) {
            this.buffer.set(this.buffer.subarray(this.pointer, this.endPointer), 0);
            const len = this.onFlush(this.buffer.subarray(this.endPointer - this.pointer, this.size));
            if (len < 0) {
                this.error = len;
                throw Error('IOReader error, flush failed');
            }
            this.endPointer = this.endPointer - this.pointer + len;
            this.pointer = 0;
        }
        else {
            const len = this.onFlush(this.buffer);
            this.endPointer = len;
            this.pointer = 0;
            this.bitsLeft = 8;
            if (len < 0) {
                this.error = len;
                throw Error('IOReader error, flush failed');
            }
        }
    }
    getBuffer() {
        return this.buffer;
    }
    appendBuffer(buffer) {
        if (this.size - this.endPointer >= buffer.length) {
            this.buffer.set(buffer, this.endPointer);
            this.endPointer += buffer.length;
        }
        else {
            this.buffer.set(this.buffer.subarray(this.pointer, this.endPointer), 0);
            this.endPointer = this.endPointer - this.pointer;
            this.pointer = 0;
            if (this.size - this.endPointer >= buffer.length) {
                this.buffer.set(buffer, this.endPointer);
                this.endPointer += buffer.length;
            }
            else {
                const len = Math.min(this.size - this.endPointer, buffer.length);
                this.buffer.set(buffer.subarray(0, len), this.endPointer);
                this.endPointer += len;
                _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('BSReader, call appendBuffer but the buffer\'s size is lagger then the remaining size', cheap__fileName__0, 190);
            }
        }
    }
    clear() {
        this.pointer = this.endPointer = 0;
        this.bitsLeft = 8;
        this.error = 0;
    }
    skipPadding() {
        if (this.bitsLeft < 8) {
            this.bitsLeft = 8;
            this.pointer++;
        }
    }
}


/***/ }),

/***/ "./src/common/io/BitWriter.ts":
/*!************************************!*\
  !*** ./src/common/io/BitWriter.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BitWriter)
/* harmony export */ });
/**
 * bit 写存器
 */
/**
 * 写字节流工具
 */
class BitWriter {
    buffer;
    pointer;
    bitPointer;
    size;
    error;
    onFlush;
    /**
     * @param data 待写的 Uint8Array
     */
    constructor(size = 1048576) {
        this.pointer = 0;
        this.bitPointer = 0;
        this.size = size;
        this.error = 0;
        this.buffer = new Uint8Array(this.size);
    }
    /**
     * 写一个 bit
     *
     * @param bit
     */
    writeU1(bit) {
        if (this.remainingLength() < 1 || this.remainingLength() === 1 && this.bitPointer >= 8) {
            this.flush();
        }
        if (bit & 0x01) {
            this.buffer[this.pointer] |= (1 << (7 - this.bitPointer));
        }
        else {
            this.buffer[this.pointer] &= ~(1 << (7 - this.bitPointer));
        }
        this.bitPointer++;
        if (this.bitPointer === 8) {
            this.pointer++;
            this.bitPointer = 0;
        }
    }
    /**
     * 写 n 个比特
     *
     * @param n
     */
    writeU(n, v) {
        for (let i = 0; i < n; i++) {
            this.writeU1(v >> (n - i - 1) & 0x01);
        }
    }
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingLength() {
        return this.size - this.pointer;
    }
    flush() {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('BSWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            if (this.bitPointer && this.pointer > 1) {
                const ret = this.onFlush(this.buffer.subarray(0, this.pointer - 1));
                if (ret !== 0) {
                    this.error = ret;
                    throw Error('BSWriter error, flush failed');
                }
                this.buffer[0] = this.buffer[this.pointer];
            }
            else if (this.bitPointer === 0) {
                const ret = this.onFlush(this.buffer.subarray(0, this.pointer));
                if (ret !== 0) {
                    this.error = ret;
                    throw Error('BSWriter error, flush failed');
                }
            }
        }
        this.pointer = 0;
    }
    padding() {
        while (this.bitPointer !== 0) {
            this.writeU1(0);
        }
    }
    clear() {
        this.pointer = 0;
        this.bitPointer = 0;
        this.error = 0;
    }
    getBuffer() {
        return this.buffer;
    }
    getPointer() {
        return this.pointer;
    }
}


/***/ }),

/***/ "./src/common/io/BufferReader.ts":
/*!***************************************!*\
  !*** ./src/common/io/BufferReader.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BufferReader)
/* harmony export */ });
/* harmony import */ var _function_concatTypeArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
/**
 * 读字节流工具
 */


class BufferReader {
    data;
    buffer;
    byteStart;
    pos;
    size;
    littleEndian;
    /**
     * @param data 待读取的字节
     * @param bigEndian 是否按大端字节序读取，默认大端字节序（网络字节序）
     */
    constructor(data, bigEndian = true) {
        this.buffer = data;
        this.data = data instanceof Uint8Array ? new DataView(data.buffer) : data.view;
        this.byteStart = data instanceof Uint8Array ? data.byteOffset : 0;
        this.pos = 0;
        this.size = data.byteLength;
        this.littleEndian = !bigEndian;
    }
    /**
     * 读取 8 位无符号整数
     *
     * @returns
     */
    readUint8() {
        return this.data.getUint8(this.pos++ + this.byteStart);
    }
    /**
     * 读取 16 位无符号整数
     *
     * @returns
     */
    readUint16() {
        const value = this.data.getUint16(this.pos + this.byteStart, this.littleEndian);
        this.pos += 2;
        return value;
    }
    /**
     * 读取 24 位无符号整数
     *
     * @returns
     */
    readUint24() {
        const high = this.readUint16();
        const low = this.readUint8();
        return high << 8 | low;
    }
    /**
     * 读取 32 位无符号整数
     *
     * @returns
     */
    readUint32() {
        const value = this.data.getUint32(this.pos + this.byteStart, this.littleEndian);
        this.pos += 4;
        return value;
    }
    /**
     * 读取 64 位无符号整数
     *
     * @returns
     */
    readUint64() {
        const high = BigInt(this.readUint32());
        const low = BigInt(this.readUint32());
        if (this.littleEndian) {
            return low << BigInt(32) | high;
        }
        else {
            return high << BigInt(32) | low;
        }
    }
    /**
     * 读取 8 位有符号整数
     *
     * @returns
     */
    readInt8() {
        return this.data.getInt8(this.pos++ + this.byteStart);
    }
    /**
     * 读取 16 位有符号整数
     *
     * @returns
     */
    readInt16() {
        const value = this.data.getInt16(this.pos + this.byteStart, this.littleEndian);
        this.pos += 2;
        return value;
    }
    /**
     * 读取 32 位有符号整数
     *
     * @returns
     */
    readInt32() {
        const value = this.data.getInt32(this.pos + this.byteStart, this.littleEndian);
        this.pos += 4;
        return value;
    }
    /**
     * 读取 64 位有符号整数
     *
     * @returns
     */
    readInt64() {
        const high = BigInt(this.readInt32());
        const low = BigInt(this.readInt32());
        if (this.littleEndian) {
            return low << BigInt(32) | high;
        }
        else {
            return high << BigInt(32) | low;
        }
    }
    /**
     * 读取单精度浮点数
     *
     * @returns
     */
    readFloat() {
        const value = this.data.getFloat32(this.pos + this.byteStart, this.littleEndian);
        this.pos += 4;
        return value;
    }
    /**
     * 读取双精度浮点数
     *
     * @returns
     */
    readDouble() {
        const value = this.data.getFloat64(this.pos + this.byteStart, this.littleEndian);
        this.pos += 8;
        return value;
    }
    /**
     * 读取指定长度的字节，并以 16 进制字符串返回
     *
     * @param length 默认 1
     * @returns
     */
    readHex(length = 1) {
        let hexStr = '';
        for (let i = 0; i < length; i++) {
            const hex = this.readUint8().toString(16);
            hexStr += (hex.length === 1 ? '0' + hex : hex);
        }
        return hexStr;
    }
    /**
     * 读取指定长度的字符串
     *
     * @param length 默认 1
     * @returns
     */
    readString(length = 1) {
        let str = '';
        if (length) {
            let start = this.pos;
            for (let i = 0; i < length; i++) {
                if (this.buffer[this.pos + i] === 0) {
                    start++;
                }
                else {
                    break;
                }
            }
            str = _util_text__WEBPACK_IMPORTED_MODULE_1__.decode(this.buffer.subarray(start, start + length));
        }
        this.pos += length;
        return str;
    }
    /**
     * 读取一行字符
     */
    readLine() {
        let str = '';
        for (let i = this.pos; i < this.size; i++) {
            if (this.buffer[i] === 0x0a || this.buffer[i] === 0x0d) {
                str += this.readString(i - this.pos);
                break;
            }
        }
        for (let i = this.pos; i < this.size; i++) {
            if (this.buffer[i] === 0x0a || this.buffer[i] === 0x0d) {
                this.readUint8();
            }
            else {
                break;
            }
        }
        return str;
    }
    /**
     * 获取当前读取指针
     *
     * @returns
     */
    getPos() {
        return BigInt(this.pos);
    }
    /**
     * seek 读取指针
     *
     * @param pos
     */
    seek(pos) {
        if (pos > this.size) {
            pos = this.size;
        }
        this.pos = Math.max(0, pos);
    }
    /**
     * 跳过指定字节长度
     *
     * @param length
     */
    skip(length) {
        this.seek(this.pos + length);
    }
    /**
     * 返回指定字节长度
     *
     * @param length
     */
    back(length) {
        this.seek(this.pos - length);
    }
    /**
     * 获取剩余可读字节数
     *
     * @returns
     */
    remainingSize() {
        return this.size - this.pos;
    }
    /**
     * 读取指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    readBuffer(length) {
        length = Math.min(length, this.remainingSize());
        const buffer = this.buffer.slice(this.pos, this.pos + length);
        this.pos += length;
        return buffer;
    }
    /**
     * 追加 buffer
     *
     * @param buffer
     */
    appendBuffer(buffer) {
        this.buffer = (0,_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_0__["default"])(Uint8Array, [
            this.buffer.slice(),
            buffer.slice()
        ]);
        this.data = new DataView(this.buffer.buffer);
        this.size += buffer.byteLength;
        this.byteStart = 0;
    }
    resetBuffer(data, bigEndian = true) {
        this.buffer = data;
        this.data = data instanceof Uint8Array ? new DataView(data.buffer) : data.view;
        this.byteStart = data instanceof Uint8Array ? data.byteOffset : 0;
        this.pos = 0;
        this.size = data.byteLength;
        this.littleEndian = !bigEndian;
    }
}


/***/ }),

/***/ "./src/common/io/BufferWriter.ts":
/*!***************************************!*\
  !*** ./src/common/io/BufferWriter.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BufferWriter)
/* harmony export */ });
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
var cheap__fileName__0 = "src/common/io/BufferWriter.ts";
/**
 * 写字节流工具
 */


class BufferWriter {
    data;
    buffer;
    byteStart;
    pos;
    size;
    littleEndian;
    /**
     * @param data 待写的 Uint8Array
     * @param bigEndian 是否按大端字节序写，默认大端字节序（网络字节序）
     */
    constructor(data, bigEndian = true) {
        this.buffer = data;
        this.data = data instanceof Uint8Array ? new DataView(data.buffer) : data.view;
        this.byteStart = data instanceof Uint8Array ? data.byteOffset : 0;
        this.pos = 0;
        this.size = data.byteLength;
        this.littleEndian = !bigEndian;
    }
    /**
     * 写 8 位无符号整数
     */
    writeUint8(value) {
        this.data.setUint8(this.pos++ + this.byteStart, value);
    }
    /**
     * 读取 16 位无符号整数
     */
    writeUint16(value) {
        this.data.setUint16(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 2;
    }
    /**
     * 写 24 位无符号整数
     */
    writeUint24(value) {
        const high = value & 0xf00;
        const middle = value & 0x0f0;
        const low = value & 0x00f;
        if (this.littleEndian) {
            this.writeUint8(low);
            this.writeUint8(middle);
            this.writeUint8(high);
        }
        else {
            this.writeUint8(high);
            this.writeUint8(middle);
            this.writeUint8(low);
        }
    }
    /**
     * 写 32 位无符号整数
     */
    writeUint32(value) {
        this.data.setUint32(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 4;
    }
    /**
     * 写 64 位无符号整数
     */
    writeUint64(value) {
        const low = value & BigInt(0xffffffff);
        const high = (value & (BigInt(0xffffffff) << BigInt(32))) >> BigInt(32);
        if (this.littleEndian) {
            this.writeUint32(Number(low));
            this.writeUint32(Number(high));
        }
        else {
            this.writeUint32(Number(high));
            this.writeUint32(Number(low));
        }
    }
    /**
     * 写 8 位有符号整数
     *
     * @returns
     */
    writeInt8(value) {
        this.data.setInt8(this.pos++ + this.byteStart, value);
    }
    /**
     * 写 16 位有符号整数
     */
    writeInt16(value) {
        this.data.setInt16(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 2;
    }
    /**
     * 写 32 位有符号整数
     */
    writeInt32(value) {
        this.data.setInt32(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 4;
    }
    /**
     * 写 64 位有符号整数
     */
    writeInt64(value) {
        const low = value & BigInt(0xffffffff);
        const high = (value & (BigInt(0xffffffff) << BigInt(32))) >> BigInt(32);
        if (this.littleEndian) {
            this.writeInt32(Number(low));
            this.writeInt32(Number(high));
        }
        else {
            this.writeInt32(Number(high));
            this.writeInt32(Number(low));
        }
    }
    /**
     * 写单精度浮点数
     *
     * @returns
     */
    writeFloat(value) {
        this.data.setFloat32(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 4;
    }
    /**
     * 写双精度浮点数
     */
    writeDouble(value) {
        this.data.setFloat64(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 8;
    }
    /**
     * 获取当前写指针
     *
     * @returns
     */
    getPos() {
        return this.pos;
    }
    /**
     * seek 写指针
     *
     * @param pos
     */
    seek(pos) {
        if (pos > this.size) {
            pos = this.size;
        }
        this.pos = Math.max(0, pos);
    }
    /**
     * 跳过指定字节长度
     *
     * @param length
     */
    skip(length) {
        this.seek(this.pos + length);
    }
    /**
     * 返回指定字节长度
     *
     * @param length
     */
    back(length) {
        this.seek(this.pos - length);
    }
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingSize() {
        return this.size - this.pos;
    }
    /**
     * 写指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    writeBuffer(buffer) {
        let length = buffer.length;
        if (this.remainingSize() < length) {
            length = this.remainingSize();
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`the remaining buffer size is smaller then the wrote buffer, hope set ${buffer.length}, but set ${length}`, cheap__fileName__0, 211);
        }
        this.buffer.set(buffer, this.pos);
        this.pos += buffer.length;
    }
    /**
     * 写一个字符串
     */
    writeString(str) {
        const buffer = _util_text__WEBPACK_IMPORTED_MODULE_1__.encode(str);
        this.writeBuffer(buffer);
        return buffer.length;
    }
    getWroteBuffer() {
        return this.buffer.subarray(0, this.pos);
    }
    resetBuffer(data, bigEndian = true) {
        this.buffer = data;
        this.data = data instanceof Uint8Array ? new DataView(data.buffer) : data.view;
        this.byteStart = data instanceof Uint8Array ? data.byteOffset : 0;
        this.pos = 0;
        this.size = data.byteLength;
        this.littleEndian = !bigEndian;
    }
}


/***/ }),

/***/ "./src/common/io/IOWriterSync.ts":
/*!***************************************!*\
  !*** ./src/common/io/IOWriterSync.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOWriterSync)
/* harmony export */ });
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
/**
 * 写字节流工具
 */

class IOWriterSync {
    data;
    buffer;
    pointer;
    pos;
    size;
    littleEndian;
    error;
    onFlush;
    onSeek;
    /**
     * @param data 待写的 Uint8Array
     * @param bigEndian 是否按大端字节序写，默认大端字节序（网络字节序）
     */
    constructor(size = 1048576, bigEndian = true, map) {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.size = size;
        this.littleEndian = !bigEndian;
        this.error = 0;
        if (map && map.view) {
            this.size = map.length;
            this.buffer = map;
            this.data = map.view;
        }
        else if (map && !map.byteOffset) {
            this.size = map.length;
            this.buffer = map;
            this.data = new DataView(this.buffer.buffer);
        }
        else {
            if (map) {
                throw new Error('not support subarray of ArrayBuffer');
            }
            this.buffer = new Uint8Array(this.size);
            this.data = new DataView(this.buffer.buffer);
        }
    }
    /**
     * 写 8 位无符号整数
     */
    writeUint8(value) {
        if (this.remainingLength() < 1) {
            this.flush();
        }
        this.data.setUint8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 读取 16 位无符号整数
     */
    writeUint16(value) {
        if (this.remainingLength() < 2) {
            this.flush();
        }
        this.data.setUint16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 24 位无符号整数
     */
    writeUint24(value) {
        if (this.remainingLength() < 3) {
            this.flush();
        }
        const high = (value & 0xff0000) >> 16;
        const middle = (value & 0x00ff00) >> 8;
        const low = value & 0x0000ff;
        if (this.littleEndian) {
            this.writeUint8(low);
            this.writeUint8(middle);
            this.writeUint8(high);
        }
        else {
            this.writeUint8(high);
            this.writeUint8(middle);
            this.writeUint8(low);
        }
    }
    /**
     * 写 32 位无符号整数
     */
    writeUint32(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setUint32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位无符号整数
     */
    writeUint64(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setBigUint64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写 8 位有符号整数
     *
     * @returns
     */
    writeInt8(value) {
        if (this.remainingLength() < 1) {
            this.flush();
        }
        this.data.setInt8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 写 16 位有符号整数
     */
    writeInt16(value) {
        if (this.remainingLength() < 2) {
            this.flush();
        }
        this.data.setInt16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 32 位有符号整数
     */
    writeInt32(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setInt32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位有符号整数
     */
    writeInt64(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setBigInt64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写单精度浮点数
     *
     * @returns
     */
    writeFloat(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setFloat32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写双精度浮点数
     */
    writeDouble(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setFloat64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 获取当前写指针
     *
     * @returns
     */
    getPointer() {
        return this.pointer;
    }
    getPos() {
        return this.pos;
    }
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingLength() {
        return this.size - this.pointer;
    }
    /**
     * 写指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    writeBuffer(buffer) {
        if (!buffer.length) {
            return;
        }
        let length = buffer.length;
        if (this.remainingLength() < length) {
            let index = 0;
            while (length > 0) {
                this.flush();
                const len = Math.min(this.size, length);
                this.buffer.set(buffer.subarray(index, index + len), this.pointer);
                this.pointer += len;
                this.pos += BigInt(len);
                index += len;
                length -= len;
            }
        }
        else {
            this.buffer.set(buffer, this.pointer);
            this.pointer += length;
            this.pos += BigInt(length);
        }
    }
    /**
     * 写一个字符串
     */
    writeString(str) {
        const buffer = _util_text__WEBPACK_IMPORTED_MODULE_0__.encode(str);
        this.writeBuffer(buffer);
        return buffer.length;
    }
    encodeString(str) {
        return _util_text__WEBPACK_IMPORTED_MODULE_0__.encode(str);
    }
    flush() {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = this.onFlush(this.buffer.subarray(0, this.pointer));
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    flushToPos(pos) {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = this.onFlush(this.buffer.subarray(0, this.pointer), pos);
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    seek(pos) {
        if (!this.onSeek) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, seek failed because of no seek callback');
        }
        this.flush();
        const ret = this.onSeek(pos);
        if (ret !== 0) {
            this.error = ret;
            throw Error('IOWriter error, seek failed');
        }
        this.pos = pos;
    }
    seekInline(pos) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, Math.min(this.size, pos));
        this.pos += BigInt(this.pointer - pointer);
    }
    skip(length) {
        const pointer = this.pointer;
        this.pointer = Math.min(this.size, this.pointer + length);
        this.pos += BigInt(this.pointer - pointer);
    }
    back(length) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, this.pointer - length);
        this.pos += BigInt(this.pointer - pointer);
    }
    getBuffer() {
        return this.buffer.subarray(0, this.pointer);
    }
    setEndian(bigEndian) {
        this.littleEndian = !bigEndian;
    }
    reset() {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.error = 0;
    }
    getBufferSize() {
        return this.size;
    }
}


/***/ }),

/***/ "./src/common/math/gcd.ts":
/*!********************************!*\
  !*** ./src/common/math/gcd.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gcd)
/* harmony export */ });
/**
 * // 计算最大公约数（GCD）
 *
 * @param a
 * @param b
 * @returns
 */
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}


/***/ }),

/***/ "./src/common/util/array.ts":
/*!**********************************!*\
  !*** ./src/common/util/array.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   each: () => (/* binding */ each),
/* harmony export */   has: () => (/* binding */ has),
/* harmony export */   remove: () => (/* binding */ remove)
/* harmony export */ });
/* unused harmony exports push, unshift, indexOf, last, pop, toArray, toObject, join, falsy, exclude, binarySearch */
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./src/common/util/is.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./src/common/util/constant.ts");
/* harmony import */ var _function_execute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../function/execute */ "./src/common/function/execute.ts");
/**
 * @file 数组操作
 */



/**
 * 遍历数组
 *
 * @param array
 * @param callback 返回 false 可停止遍历
 * @param reversed 是否逆序遍历
 */
function each(array, callback, reversed) {
    if (!array) {
        return;
    }
    const { length } = array;
    if (length) {
        if (reversed) {
            for (let i = length - 1; i >= 0; i--) {
                if (callback(array[i], i) === _constant__WEBPACK_IMPORTED_MODULE_1__.FALSE) {
                    break;
                }
            }
        }
        else {
            for (let i = 0; i < length; i++) {
                if (callback(array[i], i) === _constant__WEBPACK_IMPORTED_MODULE_1__.FALSE) {
                    break;
                }
            }
        }
    }
}
function nativePush(array, item) {
    array[array.length] = item;
}
function nativeUnshift(array, item) {
    array.unshift(item);
}
/**
 * 添加
 *
 * @param array
 * @param value
 * @param action
 */
function addItem(array, value, action) {
    if (_is__WEBPACK_IMPORTED_MODULE_0__.array(value)) {
        each(value, function (item) {
            action(array, item);
        });
    }
    else {
        action(array, value);
    }
}
/**
 * 往后加
 *
 * @param array
 * @param target
 */
function push(array, target) {
    addItem(array, target, nativePush);
}
/**
 * 往前加
 *
 * @param array
 * @param target
 */
function unshift(array, target) {
    addItem(array, target, nativeUnshift);
}
/**
 * 数组项在数组中的位置
 *
 * @param array 数组
 * @param target 数组项
 * @param strict 是否全等判断，默认是全等
 * @return 如果未找到，返回 -1
 */
function indexOf(array, target, strict) {
    let result = _constant__WEBPACK_IMPORTED_MODULE_1__.MINUS_ONE;
    each(array, function (item, index) {
        if (strict === _constant__WEBPACK_IMPORTED_MODULE_1__.FALSE ? item == target : item === target) {
            result = index;
            return _constant__WEBPACK_IMPORTED_MODULE_1__.FALSE;
        }
    });
    return result;
}
/**
 * 获取数组最后一项
 *
 * @param array 数组
 * @return
 */
function last(array) {
    const { length } = array;
    if (length > 0) {
        return array[length - 1];
    }
}
/**
 * 弹出数组最后一项
 *
 * 项目里用的太多，仅用于节省字符
 *
 * @param array 数组
 * @return 弹出的数组项
 */
function pop(array) {
    const { length } = array;
    if (length > 0) {
        return array.pop();
    }
}
/**
 * 删除数组项
 *
 * @param array 数组
 * @param item 待删除项
 * @param strict 是否全等判断，默认是全等
 * @return 删除的数量
 */
function remove(array, target, strict) {
    let result = 0;
    each(array, function (item, index) {
        if (strict === _constant__WEBPACK_IMPORTED_MODULE_1__.FALSE ? item == target : item === target) {
            array.splice(index, 1);
            result++;
        }
    }, _constant__WEBPACK_IMPORTED_MODULE_1__.TRUE);
    return result;
}
/**
 * 数组是否包含 item
 *
 * @param array 数组
 * @param target 可能包含的数组项
 * @param strict 是否全等判断，默认是全等
 * @return
 */
function has(array, target, strict) {
    return indexOf(array, target, strict) >= 0;
}
/**
 * 把类数组转成数组
 *
 * @param array 类数组
 * @return
 */
function toArray(array) {
    return _is__WEBPACK_IMPORTED_MODULE_0__.array(array)
        ? array
        : (0,_function_execute__WEBPACK_IMPORTED_MODULE_2__["default"])(_constant__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARRAY.slice, array);
}
/**
 * 把数组转成对象
 *
 * @param array 数组
 * @param key 数组项包含的字段名称，如果数组项是基本类型，可不传
 * @param value
 * @return
 */
function toObject(array, key, value) {
    let result = {};
    each(array, function (item) {
        result[key ? item[key] : item] = value || item;
    });
    return result;
}
/**
 * 把数组合并成字符串
 *
 * @param array
 * @param separator
 * @return
 */
function join(array, separator) {
    return array.join(separator);
}
/**
 * 用于判断长度大于 0 的数组
 *
 * @param array
 * @return
 */
function falsy(array) {
    return !_is__WEBPACK_IMPORTED_MODULE_0__.array(array) || !array.length;
}
/**
 * 排除数组元素返回新数组
 *
 * @param source
 * @param exc
 * @returns
 */
function exclude(source, exc) {
    const items = [];
    each(source, (item, index) => {
        if (!has(exc, item)) {
            items.push(item);
        }
    });
    return items;
}
/**
 * 二分查找
 *
 * @param array
 * @param callback 相等返回 0， 往左边查返回 -1， 往右边查返回 1
 * @returns
 */
function binarySearch(array, callback) {
    let left = 0;
    let right = array.length - 1;
    let index = -1;
    while (left <= right) {
        let mid = ((left + right) / 2) >>> 0;
        const ret = callback(array[mid]);
        if (ret === 0) {
            index = mid;
            break;
        }
        else if (ret === 1) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
            index = mid;
        }
    }
    return index;
}


/***/ }),

/***/ "./src/common/util/base64.ts":
/*!***********************************!*\
  !*** ./src/common/util/base64.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64ToUint8Array: () => (/* binding */ base64ToUint8Array)
/* harmony export */ });
/* unused harmony exports base64Decode, list, map */
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./src/common/util/array.ts");

const base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
/**
 * utf8 编码
 * @param text
 */
function utf8Decode(text) {
    let string = '', i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0;
    while (i < text.length) {
        c = text.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if ((c > 191) && (c < 224)) {
            c2 = text.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = text.charCodeAt(i + 1);
            c3 = text.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}
/**
 * base64 解密
 */
function base64Decode(text) {
    let output = '';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
    text = text.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    // 不是 4 的倍数补齐 =
    while (text.length % 4) {
        text += '=';
    }
    while (i < text.length) {
        enc1 = base64.indexOf(text.charAt(i++));
        enc2 = base64.indexOf(text.charAt(i++));
        enc3 = base64.indexOf(text.charAt(i++));
        enc4 = base64.indexOf(text.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output += String.fromCharCode(chr1);
        if (enc3 !== 64) {
            output += String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
            output += String.fromCharCode(chr3);
        }
    }
    return utf8Decode(output);
}
function atobCustom(encodedString) {
    function decodeBase64(char) {
        const index = base64.indexOf(char);
        return index === -1 ? 0 : index;
    }
    let decodedString = '';
    for (let i = 0; i < encodedString.length;) {
        const enc1 = decodeBase64(encodedString[i++]);
        const enc2 = decodeBase64(encodedString[i++]);
        const enc3 = decodeBase64(encodedString[i++]);
        const enc4 = decodeBase64(encodedString[i++]);
        const chr1 = (enc1 << 2) | (enc2 >> 4);
        const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        const chr3 = ((enc3 & 3) << 6) | enc4;
        decodedString += String.fromCharCode(chr1);
        if (enc3 !== 64) {
            decodedString += String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
            decodedString += String.fromCharCode(chr3);
        }
    }
    return decodedString;
}
function base64ToUint8Array(string) {
    const binaryData = typeof atob === 'function' ? atob(string) : atobCustom(string);
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }
    return uint8Array;
}
const list = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1',
    '2', '3', '4', '5', '6', '7',
    '8', '9', '+', '/'
];
const _map = {};
_array__WEBPACK_IMPORTED_MODULE_0__.each(list, (char, index) => {
    _map[char] = index;
});
const map = _map;


/***/ }),

/***/ "./src/common/util/browser.ts":
/*!************************************!*\
  !*** ./src/common/util/browser.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/array */ "./src/common/util/array.ts");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "./src/common/util/is.ts");
/* harmony import */ var _function_checkVersion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../function/checkVersion */ "./src/common/function/checkVersion.ts");
/**
 * @file browser
 */



function getMajorVersion(version) {
    if (!_is__WEBPACK_IMPORTED_MODULE_1__.string(version)) {
        return '';
    }
    return version.split('.').shift() || '';
}
/**
 * UA 检测浏览器
 *
 * 返回结果如下：
 *
 * {
 *    name: 'ie',     // 判断多个浏览器时，便于用 name 去 switch
 *    ie: true,       // 判断某一个浏览器时，便于 if (ie) { ... }
 *    version: '8.0'  // 版本号，string 类型
 * }
 *
 */
// http://www.fynas.com/ua/search
const list = [
    ["alipay" /* BrowserType.ALIPAY */, /alipay/],
    ["wechat" /* BrowserType.WECHAT */, /micromessenger/],
    ["dingtalk" /* BrowserType.DING_TALK */, /dingtalk[ \/]([\d_.]+)/],
    ["baiduApp" /* BrowserType.BAIDU_APP */, /baiduboxapp/],
    ["baidu" /* BrowserType.BAIDU */, /baidubrowser/],
    ["baidu" /* BrowserType.BAIDU */, /bdbrowser/],
    ["uc" /* BrowserType.UC */, /ucbrowser/],
    ["uc" /* BrowserType.UC */, /ucweb/],
    ["qq" /* BrowserType.QQ */, /qqbrowser/],
    ["qqApp" /* BrowserType.QQ_APP */, /qq/],
    ["ie" /* BrowserType.IE */, /iemobile[ \/]([\d_.]+)/],
    // IE10- 所有版本都有的信息是 MSIE x.0
    ["ie" /* BrowserType.IE */, /msie[ \/]([\d_.]+)/],
    ["ie" /* BrowserType.IE */, /trident[ \/]([\d_.]+)/, 4],
    ["edge" /* BrowserType.EDGE */, /edge[ \/]([\d_.]+)/],
    ["newEdge" /* BrowserType.NEW_EDGE */, /edg[ \/]([\d_.]+)/],
    ["chrome" /* BrowserType.CHROME */, /chrome[ \/]([\d_.]+)/],
    ["firefox" /* BrowserType.FIREFOX */, /firefox[ \/]([\d_.]+)/],
    ["opera" /* BrowserType.OPERA */, /opera(?:.*version)?[ \/]([\d_.]+)/],
    ["safari" /* BrowserType.SAFARI */, /version[ \/]([\d_.]+) safari/],
    // 新版 Safari UA
    ["safari" /* BrowserType.SAFARI */, /version[ \/]([\d_.]+) \S* safari/],
    ["safari" /* BrowserType.SAFARI */, /safari/]
];
const getMajorVersionMap = {};
const checkVersionMap = {};
/**
 * 获取 UA 的结构化信息
 *
 * @inner
 * @param {string} ua
 * @return {Object}
 */
function parseUA(ua) {
    let name;
    let version;
    (0,_util_array__WEBPACK_IMPORTED_MODULE_0__.each)(list, (item) => {
        let match = item[1].exec(ua);
        if (match) {
            name = item[0];
            version = match[1];
            if (version) {
                version = version.replace(/_/g, '.');
                if (item[2]) {
                    version = (parseInt(version, 10) + item[2]) + '.0';
                }
            }
            return false;
        }
    });
    return {
        name: name || '',
        version: version || '',
        majorVersion: (getMajorVersionMap[name] || getMajorVersion)(version),
        checkVersion: checkVersionMap[name] || _function_checkVersion__WEBPACK_IMPORTED_MODULE_2__["default"]
    };
}
const browser = parseUA((typeof navigator === 'object' && navigator.userAgent || '').toLowerCase());
if (browser.name) {
    browser[browser.name] = true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (browser);


/***/ }),

/***/ "./src/common/util/constant.ts":
/*!*************************************!*\
  !*** ./src/common/util/constant.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_ARRAY: () => (/* binding */ EMPTY_ARRAY),
/* harmony export */   EMPTY_FUNCTION: () => (/* binding */ EMPTY_FUNCTION),
/* harmony export */   EMPTY_STRING: () => (/* binding */ EMPTY_STRING),
/* harmony export */   FALSE: () => (/* binding */ FALSE),
/* harmony export */   GLOBAL: () => (/* binding */ GLOBAL),
/* harmony export */   MINUS_ONE: () => (/* binding */ MINUS_ONE),
/* harmony export */   NULL: () => (/* binding */ NULL),
/* harmony export */   RAW_DOT: () => (/* binding */ RAW_DOT),
/* harmony export */   RAW_FUNCTION: () => (/* binding */ RAW_FUNCTION),
/* harmony export */   RAW_UNDEFINED: () => (/* binding */ RAW_UNDEFINED),
/* harmony export */   RAW_WILDCARD: () => (/* binding */ RAW_WILDCARD),
/* harmony export */   SELF: () => (/* binding */ SELF),
/* harmony export */   TRUE: () => (/* binding */ TRUE),
/* harmony export */   UNDEFINED: () => (/* binding */ UNDEFINED),
/* harmony export */   WINDOW: () => (/* binding */ WINDOW)
/* harmony export */ });
/* unused harmony exports RAW_TRUE, RAW_FALSE, RAW_NULL, RAW_THIS, RAW_VALUE, RAW_LENGTH, RAW_SLASH, RAW_TAG, KEYPATH_PARENT, KEYPATH_CURRENT, DOCUMENT, EMPTY_OBJECT */
/**
 * @file 为了压缩，定义的常量
 */
const TRUE = true;
const FALSE = false;
const NULL = null;
const UNDEFINED = void 0;
const MINUS_ONE = -1;
const RAW_TRUE = 'true';
const RAW_FALSE = 'false';
const RAW_NULL = 'null';
const RAW_UNDEFINED = 'undefined';
const RAW_THIS = 'this';
const RAW_VALUE = 'value';
const RAW_LENGTH = 'length';
const RAW_FUNCTION = 'function';
const RAW_WILDCARD = '*';
const RAW_DOT = '.';
const RAW_SLASH = '/';
const RAW_TAG = 'tag';
const KEYPATH_PARENT = '..';
const KEYPATH_CURRENT = RAW_THIS;
/**
 * Single instance for window in browser
 */
const WINDOW = typeof window !== RAW_UNDEFINED ? window : UNDEFINED;
/**
 * Single instance for document in browser
 */
const DOCUMENT = typeof document !== RAW_UNDEFINED ? document : UNDEFINED;
/**
 * Single instance for global in nodejs or browser
 */
// @ts-ignore
const GLOBAL = typeof globalThis !== RAW_UNDEFINED ? globalThis : (typeof __webpack_require__.g !== RAW_UNDEFINED ? __webpack_require__.g : WINDOW);
/**
 * Single instance for self in nodejs or browser
 */
// @ts-ignore
const SELF = typeof self !== RAW_UNDEFINED ? self : GLOBAL;
/**
 * Single instance for noop function
 */
const EMPTY_FUNCTION = function () {
    /** common */
};
/**
 * 空对象，很多地方会用到，比如 `a || EMPTY_OBJECT` 确保是个对象
 */
const EMPTY_OBJECT = Object.freeze({});
/**
 * 空数组
 */
const EMPTY_ARRAY = Object.freeze([]);
/**
 * 空字符串
 */
const EMPTY_STRING = '';


/***/ }),

/***/ "./src/common/util/is.ts":
/*!*******************************!*\
  !*** ./src/common/util/is.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   array: () => (/* binding */ array),
/* harmony export */   func: () => (/* binding */ func),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   numeric: () => (/* binding */ numeric),
/* harmony export */   object: () => (/* binding */ object),
/* harmony export */   string: () => (/* binding */ string)
/* harmony export */ });
/* unused harmony exports bigint, boolean, range, arrayBuffer */
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/common/util/constant.ts");
/**
 * @file 判断
 */

/**
 * Check if value is a function.
 *
 * @param value
 * @return
 */
function func(value) {
    return typeof value === _constant__WEBPACK_IMPORTED_MODULE_0__.RAW_FUNCTION;
}
/**
 * Check if value is an array.
 *
 * @param value
 * @return
 */
function array(value) {
    return Array.isArray(value);
}
/**
 * Check if value is an object.
 *
 * @param value
 * @return
 */
function object(value) {
    // 低版本 IE 会把 null 当作 object
    return value !== _constant__WEBPACK_IMPORTED_MODULE_0__.NULL && typeof value === 'object';
}
/**
 * Check if value is a string.
 *
 * @param value
 * @return
 */
function string(value) {
    return typeof value === 'string';
}
/**
 * Check if value is a number.
 *
 * @param value
 * @return
 */
function number(value) {
    return typeof value === 'number' && !isNaN(value);
}
/**
 * Check if value is a bigint.
 *
 * @param value
 * @return
 */
function bigint(value) {
    return typeof value === 'bigint';
}
/**
 * Check if value is boolean.
 *
 * @param value
 * @return
 */
function boolean(value) {
    return typeof value === 'boolean';
}
/**
 * Check if value is numeric.
 *
 * @param value
 * @return
 */
function numeric(value) {
    return number(value)
        || (string(value) && !isNaN(parseFloat(value)) && isFinite(+value));
}
const hasOwn = {}.hasOwnProperty;
/**
 * 判断是不是普通字面量对象
 *
 * @param {*} target
 * @return {boolean}
 */
function isPlainObject(target) {
    if (!object(target) || target.nodeType || target === target.window) {
        return false;
    }
    if (target.constructor
        && !hasOwn.call(target, 'constructor')
        && !hasOwn.call(target.constructor.prototype || {}, 'isPrototypeOf')) {
        return false;
    }
    let key;
    for (key in target) {
        /* empty */
    }
    return key === undefined || hasOwn.call(target, key);
}
/**
 * 判断 value 是否在指定范围中
 *
 * @param value 待判断值
 * @param min 范围左区间
 * @param max 范围右区间
 */
function range(value, min, max) {
    return value >= min && value <= max;
}
/**
 * Check if value is ArrayBuffer.
 *
 * @param value
 * @returns
 */
function arrayBuffer(value) {
    return value instanceof ArrayBuffer;
}


/***/ }),

/***/ "./src/common/util/keypath.ts":
/*!************************************!*\
  !*** ./src/common/util/keypath.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   each: () => (/* binding */ each)
/* harmony export */ });
/* unused harmony exports match, join, isFuzzy, matchFuzzy, rootPath */
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string */ "./src/common/util/string.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./src/common/util/constant.ts");
/**
 * @file 路径操作
 */


const dotPattern = /\./g, asteriskPattern = /\*/g, doubleAsteriskPattern = /\*\*/g, splitCache = {}, patternCache = {};
/**
 * 判断 keypath 是否以 prefix 开头，如果是，返回匹配上的前缀长度，否则返回 -1
 *
 * @param keypath
 * @param prefix
 * @return
 */
function match(keypath, prefix) {
    if (keypath === prefix) {
        return prefix.length;
    }
    prefix += _constant__WEBPACK_IMPORTED_MODULE_1__.RAW_DOT;
    return _string__WEBPACK_IMPORTED_MODULE_0__.startsWith(keypath, prefix)
        ? prefix.length
        : _constant__WEBPACK_IMPORTED_MODULE_1__.MINUS_ONE;
}
/**
 * 遍历 keypath 的每个部分
 *
 * @param keypath
 * @param callback 返回 false 可中断遍历
 */
function each(keypath, callback) {
    /*
     * 如果 keypath 是 toString 之类的原型字段
     * splitCache[keypath] 会取到原型链上的对象
     */
    const list = splitCache.hasOwnProperty(keypath)
        ? splitCache[keypath]
        : (splitCache[keypath] = keypath.split(_constant__WEBPACK_IMPORTED_MODULE_1__.RAW_DOT));
    for (let i = 0, lastIndex = list.length - 1; i <= lastIndex; i++) {
        if (callback(list[i], i === lastIndex) === _constant__WEBPACK_IMPORTED_MODULE_1__.FALSE) {
            break;
        }
    }
}
/**
 * 路径组合
 *
 * @param keypath1
 * @param keypath2
 */
function join(keypath1, keypath2) {
    return keypath1 && keypath2
        ? keypath1 + _constant__WEBPACK_IMPORTED_MODULE_1__.RAW_DOT + keypath2
        : keypath1 || keypath2;
}
/**
 * 是否是模糊匹配
 *
 * @param keypath
 */
function isFuzzy(keypath) {
    return _string__WEBPACK_IMPORTED_MODULE_0__.has(keypath, _constant__WEBPACK_IMPORTED_MODULE_1__.RAW_WILDCARD);
}
/**
 * 模糊匹配 keypath
 *
 * @param keypath 待匹配路径
 * @param pattern 匹配规则
 */
function matchFuzzy(keypath, pattern) {
    let cache = patternCache[pattern];
    if (!cache) {
        const str = pattern
            .replace(dotPattern, '\\.')
            .replace(asteriskPattern, '(\\w+)')
            .replace(doubleAsteriskPattern, '([\.\\w]+?)');
        cache = patternCache[pattern] = new RegExp(`^${str}$`);
    }
    const result = keypath.match(cache);
    if (result) {
        return result[1];
    }
}
/**
 * 返回 keypath 的根路径
 *
 * @param keypath
 */
function rootPath(keypath) {
    return keypath && keypath.split(_constant__WEBPACK_IMPORTED_MODULE_1__.RAW_DOT).shift();
}


/***/ }),

/***/ "./src/common/util/logger.ts":
/*!***********************************!*\
  !*** ./src/common/util/logger.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   error: () => (/* binding */ error),
/* harmony export */   fatal: () => (/* binding */ fatal),
/* harmony export */   warn: () => (/* binding */ warn)
/* harmony export */ });
/* unused harmony exports TRACE, DEBUG, INFO, WARN, ERROR, FATAL, setLevel, trace, debug, info, log, enableUploadLog, disableUploadLog, canUploadLog, setUploadLevel, getUploadLevel */
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/common/util/constant.ts");
/* harmony import */ var _function_toString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../function/toString */ "./src/common/function/toString.ts");
/**
 * @file 日志
 */


const TRACE = 0;
const DEBUG = 1;
const INFO = 2;
const WARN = 3;
const ERROR = 4;
const FATAL = 5;
const nativeConsole = typeof console !== _constant__WEBPACK_IMPORTED_MODULE_0__.RAW_UNDEFINED ? console : _constant__WEBPACK_IMPORTED_MODULE_0__.NULL, 
/**
 * 当前是否是源码调试，如果开启了代码压缩，empty function 里的注释会被干掉
 */
defaultLogLevel = /common/.test((0,_function_toString__WEBPACK_IMPORTED_MODULE_1__["default"])(_constant__WEBPACK_IMPORTED_MODULE_0__.EMPTY_FUNCTION)) ? INFO : WARN, 
/**
 * console 样式前缀
 * ie 和 edge 不支持 console.log 样式
 */
stylePrefix = _constant__WEBPACK_IMPORTED_MODULE_0__.WINDOW && /edge|msie|trident/i.test(_constant__WEBPACK_IMPORTED_MODULE_0__.WINDOW.navigator.userAgent) || true
    ? _constant__WEBPACK_IMPORTED_MODULE_0__.EMPTY_STRING
    : 0, 
/**
 * 日志打印函数
 */
printLog = nativeConsole
    ? stylePrefix
        ? function (tag, msg, style) {
            nativeConsole.log(stylePrefix + tag, style, msg);
        }
        : function (tag, msg) {
            nativeConsole.log(tag, msg);
        }
    : _constant__WEBPACK_IMPORTED_MODULE_0__.EMPTY_FUNCTION;
/**
 * 全局调试开关
 */
function getLogLevel() {
    if (_constant__WEBPACK_IMPORTED_MODULE_0__.GLOBAL) {
        const logLevel = _constant__WEBPACK_IMPORTED_MODULE_0__.SELF['COMMON_LOG_LEVEL'];
        if (logLevel >= TRACE && logLevel <= FATAL) {
            return logLevel;
        }
    }
    return defaultLogLevel;
}
/**
 * 设置日志输出级别
 *
 * @param level 日志输出级别
 */
function setLevel(level) {
    _constant__WEBPACK_IMPORTED_MODULE_0__.SELF['COMMON_LOG_LEVEL'] = level;
}
function getStyle(backgroundColor) {
    return `background-color:${backgroundColor};border-radius:12px;color:#fff;font-size:10px;padding:3px 6px;`;
}
function trace(msg, file, line) {
    if (getLogLevel() <= TRACE) {
        printLog(`[${arguments[1]}][line ${arguments[2]}] [trace]`, msg, getStyle('#999'));
    }
}
function debug(msg, file, line) {
    if (getLogLevel() <= DEBUG) {
        printLog(`[${arguments[1]}][line ${arguments[2]}] [debug]`, msg, getStyle('#999'));
    }
}
function info(msg, file, line) {
    if (getLogLevel() <= INFO) {
        printLog(`[${arguments[1]}][line ${arguments[2]}] [info]`, msg, getStyle('#2db7f5'));
    }
}
function warn(msg, file, line) {
    if (getLogLevel() <= WARN) {
        printLog(`[${arguments[1]}][line ${arguments[2]}] [warn]`, msg, getStyle('#f90'));
    }
}
function error(msg, file, line) {
    if (getLogLevel() <= ERROR) {
        printLog(`[${arguments[1]}][line ${arguments[2]}] [error]`, msg, getStyle('#ed4014'));
    }
}
function fatal(msg, file, line) {
    if (getLogLevel() <= FATAL) {
        error(msg, file, line);
        throw new Error(`[${arguments[1]}][line ${arguments[2]}] [fatal]: ${msg}`);
    }
}
function log(level, msg, file, line) {
    if (level === TRACE) {
        trace(msg, arguments[2], arguments[3]);
    }
    else if (level === DEBUG) {
        debug(msg, arguments[2], arguments[3]);
    }
    else if (level === INFO) {
        info(msg, arguments[2], arguments[3]);
    }
    else if (level === WARN) {
        warn(msg, arguments[2], arguments[3]);
    }
    else if (level === ERROR) {
        error(msg, arguments[2], arguments[3]);
    }
    else if (level === FATAL) {
        fatal(msg, arguments[2], arguments[3]);
    }
}
/**
 * @internal
 * 是否上传，全局配置
 */
let enableUpload = true;
/**
 * @internal
 * 日志上传等级，全局配置
 */
let uploadLevel = WARN;
/**
 * 打开日志上传
 *
 */
function enableUploadLog() {
    enableUpload = true;
}
/**
 * 关闭日志上传
 */
function disableUploadLog() {
    enableUpload = false;
}
/**
 * 是否可以上传日志
 */
function canUploadLog() {
    return enableUpload;
}
/**
 * 设置日志上传等级
 */
function setUploadLevel(level) {
    uploadLevel = level;
}
/**
 * 获取日志上传等级
 */
function getUploadLevel() {
    return uploadLevel;
}


/***/ }),

/***/ "./src/common/util/object.ts":
/*!***********************************!*\
  !*** ./src/common/util/object.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   each: () => (/* binding */ each),
/* harmony export */   extend: () => (/* binding */ extend)
/* harmony export */ });
/* unused harmony exports keys, sort, clear, merge, copy, get, set, has, falsy, diff, param, toArray, update */
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./src/common/util/is.ts");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./src/common/util/array.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constant */ "./src/common/util/constant.ts");
/* harmony import */ var _keypath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keypath */ "./src/common/util/keypath.ts");
/* harmony import */ var _function_isDef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../function/isDef */ "./src/common/function/isDef.ts");
/**
 * @file 对象操作
 */





/**
 * 获取对象的 key 的数组
 *
 * @param object
 * @return
 */
function keys(object) {
    if (!(0,_function_isDef__WEBPACK_IMPORTED_MODULE_4__["default"])(object)) {
        return [];
    }
    return Object.keys(object);
}
function sortKeyByAsc(a, b) {
    return a.length - b.length;
}
function sortKeyByDesc(a, b) {
    return b.length - a.length;
}
/**
 * 排序对象的 key
 *
 * @param object
 * @param desc 是否逆序，默认从小到大排序
 * @return
 */
function sort(object, desc) {
    return keys(object).sort(desc ? sortKeyByDesc : sortKeyByAsc);
}
/**
 * 遍历对象
 *
 * @param object
 * @param callback 返回 false 可停止遍历
 */
function each(object, callback) {
    for (let key in object) {
        if (callback(object[key], key) === _constant__WEBPACK_IMPORTED_MODULE_2__.FALSE) {
            break;
        }
    }
}
/**
 * 清空对象所有的键值对
 *
 * @param object
 */
function clear(object) {
    each(object, function (_, key) {
        delete object[key];
    });
}
function _extend(original, object) {
    if (!_is__WEBPACK_IMPORTED_MODULE_0__.object(original)) {
        return object;
    }
    else if (!_is__WEBPACK_IMPORTED_MODULE_0__.object(object)) {
        return original;
    }
    each(object, function (value, key) {
        original[key] = value;
    });
    return original;
}
/**
 * 扩展对象
 *
 * @return
 */
function extend(original, object, object2) {
    return _extend(_extend(original, object), object2);
}
/**
 * 合并对象
 *
 * @return
 */
function merge(object1, object2) {
    return object1 && object2
        ? extend(extend({}, object1), object2)
        : object1 || object2;
}
/**
 * 拷贝对象
 *
 * @param object
 * @param deep 是否需要深拷贝
 * @return
 */
function copy(object, deep) {
    let result = object;
    if (_is__WEBPACK_IMPORTED_MODULE_0__.array(object)) {
        if (deep) {
            result = [];
            _array__WEBPACK_IMPORTED_MODULE_1__.each(object, function (item, index) {
                result[index] = copy(item, deep);
            });
        }
        else {
            result = object.slice();
        }
    }
    else if (_is__WEBPACK_IMPORTED_MODULE_0__.object(object)) {
        result = {};
        each(object, function (value, key) {
            result[key] = deep ? copy(value, deep) : value;
        });
    }
    return result;
}
/**
 * 从对象中查找一个 keypath
 *
 * 返回值是空时，表示没找到值
 *
 * @param object
 * @param keypath
 * @return
 */
function get(object, keypath, defaultValue) {
    let result;
    _keypath__WEBPACK_IMPORTED_MODULE_3__.each(keypath, function (key, isLast) {
        if (object != _constant__WEBPACK_IMPORTED_MODULE_2__.NULL) {
            // 先直接取值
            let value = object[key], 
            // 紧接着判断值是否存在
            hasValue = value !== _constant__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED;
            if (isLast) {
                if (hasValue) {
                    result = value;
                }
                else {
                    result = _constant__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED;
                }
            }
            else {
                object = value;
            }
        }
        else {
            result = _constant__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED;
            return _constant__WEBPACK_IMPORTED_MODULE_2__.FALSE;
        }
    });
    // 没找到使用默认值
    if (result === _constant__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED) {
        result = defaultValue;
    }
    return result;
}
/**
 * 为对象设置一个键值对
 *
 * @param object
 * @param keypath
 * @param value
 * @param autofill 是否自动填充不存在的对象，默认自动填充
 */
function set(object, keypath, value, autofill) {
    _keypath__WEBPACK_IMPORTED_MODULE_3__.each(keypath, function (key, isLast) {
        if (isLast) {
            object[key] = value;
        }
        else if (object[key]) {
            object = object[key];
        }
        else if (autofill) {
            object = object[key] = {};
        }
        else {
            return _constant__WEBPACK_IMPORTED_MODULE_2__.FALSE;
        }
    });
}
/**
 * 对象是否包含某个 key
 *
 * @param object
 * @param key
 * @return
 */
function has(object, key) {
    // 不用 hasOwnProperty，性能差
    return object[key] !== _constant__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED;
}
/**
 * 是否是空对象
 *
 * @param object
 * @return
 */
function falsy(object) {
    return !_is__WEBPACK_IMPORTED_MODULE_0__.object(object)
        || _is__WEBPACK_IMPORTED_MODULE_0__.array(object)
        || !keys(object).length;
}
/**
 * 获取两个对象的 value 不同的 key
 *
 * @param obj1
 * @param obj2
 */
function diff(obj1, obj2) {
    let differences = [];
    each(obj1, (value, key) => {
        if (_is__WEBPACK_IMPORTED_MODULE_0__.array(value) || _is__WEBPACK_IMPORTED_MODULE_0__.isPlainObject(value)) {
            if (obj2[key] == null || diff(value, obj2[key]).length > 0) {
                differences.push(key);
            }
        }
        else if (value !== obj2[key]) {
            differences.push(key);
        }
    });
    return differences;
}
/**
 * 序列化对象
 *
 * @param data
 */
function param(data) {
    let result = [];
    const add = (key, value) => {
        value = _is__WEBPACK_IMPORTED_MODULE_0__.func(value) ? value() : (value == null ? '' : value);
        result[result.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    };
    if (_is__WEBPACK_IMPORTED_MODULE_0__.array(data) || _is__WEBPACK_IMPORTED_MODULE_0__.isPlainObject(data)) {
        if (_is__WEBPACK_IMPORTED_MODULE_0__.array(data)) {
            _array__WEBPACK_IMPORTED_MODULE_1__.each(data, (value, key) => {
                add(key, value);
            });
        }
        else {
            each(data, (value, key) => {
                add(key, value);
            });
        }
    }
    return result.join('&').replace(/%20/g, '+');
}
/**
 * 将 object 的 value 变成数组
 */
function toArray(data) {
    const result = [];
    each(data, (value) => {
        result.push(value);
    });
    return result;
}
/**
 *
 * 更新两个同一类型的对象
 *
 * @param obj1
 * @param obj2
 * @returns
 */
function update(obj1, obj2) {
    if (!_is__WEBPACK_IMPORTED_MODULE_0__.object(obj1) || !_is__WEBPACK_IMPORTED_MODULE_0__.object(obj2)) {
        return;
    }
    each(obj2, (value, key) => {
        if (_is__WEBPACK_IMPORTED_MODULE_0__.object(value) && _is__WEBPACK_IMPORTED_MODULE_0__.object(obj1[key])) {
            update(obj1[key], value);
        }
        else {
            obj1[key] = obj2[key];
        }
    });
    return obj1;
}


/***/ }),

/***/ "./src/common/util/string.ts":
/*!***********************************!*\
  !*** ./src/common/util/string.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: () => (/* binding */ format),
/* harmony export */   has: () => (/* binding */ has),
/* harmony export */   startsWith: () => (/* binding */ startsWith)
/* harmony export */ });
/* unused harmony exports capitalize, trim, slice, indexOf, lastIndexOf, endsWith, charAt, codeAt, upper, lower, falsy */
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./src/common/util/is.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./src/common/util/constant.ts");
/* harmony import */ var _function_toString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../function/toString */ "./src/common/function/toString.ts");
/**
 * @file string 操作
 */



const capitalizePattern = /^[a-z]/, capitalizeCache = {};
/**
 * 首字母大写
 *
 * @param str
 * @return
 */
function capitalize(str) {
    if (!capitalizeCache[str]) {
        capitalizeCache[str] = str.replace(capitalizePattern, upper);
    }
    return capitalizeCache[str];
}
/**
 * 清除两侧空白符
 *
 * @param str
 * @return 清除两侧空白符的字符串
 */
function trim(str) {
    return falsy(str)
        ? _constant__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STRING
        : str.trim();
}
/**
 * 截取字符串
 *
 * @param str
 * @param start
 * @param end
 * @return
 */
function slice(str, start, end) {
    return _is__WEBPACK_IMPORTED_MODULE_0__.number(end)
        ? start === end
            ? _constant__WEBPACK_IMPORTED_MODULE_1__.EMPTY_STRING
            : str.slice(start, end)
        : str.slice(start);
}
/**
 * 获取子串的起始位置
 *
 * @param str
 * @param part
 * @param start
 * @return
 */
function indexOf(str, part, start) {
    return str.indexOf(part, start !== _constant__WEBPACK_IMPORTED_MODULE_1__.UNDEFINED ? start : 0);
}
/**
 * 获取子串的起始位置
 *
 * @param str
 * @param part
 * @param end
 * @return
 */
function lastIndexOf(str, part, end) {
    return str.lastIndexOf(part, end !== _constant__WEBPACK_IMPORTED_MODULE_1__.UNDEFINED ? end : str.length);
}
/**
 * str 是否以 part 开头
 *
 * @param str
 * @param part
 * @return
 */
function startsWith(str, part) {
    return indexOf(str, part) === 0;
}
/**
 * str 是否以 part 结束
 *
 * @param str
 * @param part
 * @return
 */
function endsWith(str, part) {
    const offset = str.length - part.length;
    return offset >= 0 && lastIndexOf(str, part) === offset;
}
/**
 * 获取某个位置的字符
 */
function charAt(str, index) {
    return str.charAt(index || 0);
}
/**
 * 获取某个位置的字符编码
 */
function codeAt(str, index) {
    return str.charCodeAt(index || 0);
}
/**
 * 大写格式
 */
function upper(str) {
    return str.toUpperCase();
}
/**
 * 小写格式
 */
function lower(str) {
    return str.toLowerCase();
}
/**
 * str 是否包含 part
 *
 * @param str
 * @param part
 * @return 是否包含
 */
function has(str, part) {
    return indexOf(str, part) >= 0;
}
/**
 * 判断长度大于 0 的字符串
 *
 * @param str
 * @return
 */
function falsy(str) {
    return !_is__WEBPACK_IMPORTED_MODULE_0__.string(str) || !str.length;
}
/**
 * 格式化输出
 *
 * @param string
 * @param args
 * @returns
 */
function format(string, ...args) {
    let i = 0;
    const length = args.length;
    return string.replace(/(%[sdvx%])|(%0(\d)+[dx])/g, (str) => {
        if (i >= length) {
            // missing argument
            return str;
        }
        const arg = args[i++];
        if (/%0(\d)+[dx]/g.test(str)) {
            const length = parseInt(str.substring(1));
            let result = str[str.length - 1] === 'd' ? (0,_function_toString__WEBPACK_IMPORTED_MODULE_2__["default"])(Number(arg)) : Number(arg).toString(16);
            if (length > result.length) {
                result = new Array(length - result.length).fill('0').join('') + result;
            }
            return result;
        }
        switch (str) {
            case '%%':
                return '%';
            case '%s':
                return String(arg);
            case '%d':
                return (0,_function_toString__WEBPACK_IMPORTED_MODULE_2__["default"])(Number(arg));
            case '%v':
                return '';
            case '%x':
                return Number(arg).toString(16);
        }
        return str;
    });
}


/***/ }),

/***/ "./src/common/util/support.ts":
/*!************************************!*\
  !*** ./src/common/util/support.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "./src/common/util/browser.ts");

function supportedFeatures() {
    let blob = typeof Blob === 'function';
    let wasm = typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function';
    let fetchSupported = typeof fetch === 'function';
    let documentSupport = typeof document === 'object';
    let canvas = documentSupport && document.createElement('canvas');
    let webgl = canvas && !!canvas.getContext('webgl');
    let offscreenCanvas = typeof OffscreenCanvas === 'function';
    let worker = typeof Worker === 'function';
    let arrayBuffer = typeof ArrayBuffer === 'function';
    let atomics = typeof Atomics === 'object';
    let audioContext = typeof AudioContext === 'function' || typeof webkitAudioContext === 'function';
    let audioWorklet = typeof AudioWorklet === 'function';
    let videoDecoder = typeof VideoDecoder === 'function';
    let videoEncoder = typeof VideoEncoder === 'function';
    let audioDecoder = typeof AudioDecoder === 'function';
    let audioEncoder = typeof AudioEncoder === 'function';
    let shareArrayBuffer = typeof SharedArrayBuffer === 'function';
    let mse = typeof MediaSource == 'function' || typeof ManagedMediaSource === 'function';
    let proxy = typeof Proxy === 'function';
    let thread = worker && shareArrayBuffer && atomics && proxy;
    let jspi = typeof WebAssembly.Suspending === 'function' && typeof WebAssembly.promising === 'function';
    // safari 低于 11 不支持
    if (_browser__WEBPACK_IMPORTED_MODULE_0__["default"].safari && !_browser__WEBPACK_IMPORTED_MODULE_0__["default"].checkVersion(_browser__WEBPACK_IMPORTED_MODULE_0__["default"].majorVersion, '11', true)) {
        wasm = false;
    }
    // chrome 94 以上才支持 webcodec
    if (_browser__WEBPACK_IMPORTED_MODULE_0__["default"].chrome && !_browser__WEBPACK_IMPORTED_MODULE_0__["default"].checkVersion(_browser__WEBPACK_IMPORTED_MODULE_0__["default"].majorVersion, '94', true)) {
        videoDecoder = false;
        audioDecoder = false;
    }
    // safari 17 之前渲染 VideoFrame 有问题
    if (_browser__WEBPACK_IMPORTED_MODULE_0__["default"].safari && !_browser__WEBPACK_IMPORTED_MODULE_0__["default"].checkVersion(_browser__WEBPACK_IMPORTED_MODULE_0__["default"].majorVersion, '17', true)) {
        videoDecoder = false;
    }
    let webgpu = typeof navigator === 'object' && typeof navigator.gpu === 'object';
    let workerMSE = typeof MediaSourceHandle === 'function';
    let webAssemblyGlobal = wasm && typeof WebAssembly.Global === 'function';
    return {
        browser: _browser__WEBPACK_IMPORTED_MODULE_0__["default"],
        blob,
        wasm,
        fetch: fetchSupported,
        webgl,
        worker,
        mse,
        arrayBuffer,
        audioContext,
        audioWorklet,
        videoDecoder,
        videoEncoder,
        audioDecoder,
        audioEncoder,
        atomics,
        shareArrayBuffer,
        thread,
        webgpu,
        offscreenCanvas,
        workerMSE,
        webAssemblyGlobal,
        jspi,
        proxy,
        simd: (_browser__WEBPACK_IMPORTED_MODULE_0__["default"].chrome || _browser__WEBPACK_IMPORTED_MODULE_0__["default"].newEdge) && _browser__WEBPACK_IMPORTED_MODULE_0__["default"].checkVersion(_browser__WEBPACK_IMPORTED_MODULE_0__["default"].majorVersion, '91', true)
            || _browser__WEBPACK_IMPORTED_MODULE_0__["default"].firefox && _browser__WEBPACK_IMPORTED_MODULE_0__["default"].checkVersion(_browser__WEBPACK_IMPORTED_MODULE_0__["default"].majorVersion, '89', true)
            || _browser__WEBPACK_IMPORTED_MODULE_0__["default"].safari && _browser__WEBPACK_IMPORTED_MODULE_0__["default"].checkVersion(_browser__WEBPACK_IMPORTED_MODULE_0__["default"].version, '16.4', true),
        wasmBaseSupported: fetchSupported && wasm && webgl && audioContext && arrayBuffer && webAssemblyGlobal
    };
}
const support = supportedFeatures();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);


/***/ }),

/***/ "./src/common/util/text.ts":
/*!*********************************!*\
  !*** ./src/common/util/text.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
const encoder = typeof TextEncoder === 'function' ? new TextEncoder() : null;
const decoder = typeof TextDecoder === 'function' ? new TextDecoder() : null;
function encode(data) {
    if (encoder) {
        return encoder.encode(data);
    }
    const array = [];
    for (let i = 0; i < data.length; ++i) {
        let u = data.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
            let u1 = data.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
        }
        if (u <= 127) {
            array.push(u);
        }
        else if (u <= 2047) {
            array.push(192 | u >> 6);
            array.push(128 | u & 63);
        }
        else if (u <= 65535) {
            array.push(224 | u >> 12);
            array.push(128 | u >> 6 & 63);
            array.push(128 | u & 63);
        }
        else {
            array.push(240 | u >> 18);
            array.push(128 | u >> 12 & 63);
            array.push(128 | u >> 6 & 63);
            array.push(128 | u & 63);
        }
    }
    return new Uint8Array(array);
}
function decode(data) {
    if (data instanceof Uint8Array && decoder && !(typeof SharedArrayBuffer === 'function' && data.buffer instanceof SharedArrayBuffer)) {
        return decoder.decode(data);
    }
    let result = '';
    for (let i = 0; i < data.length;) {
        let u0 = data[i++ >>> 0];
        if (!(u0 & 128)) {
            result += String.fromCharCode(u0);
            continue;
        }
        let u1 = data[i++ >>> 0] & 63;
        if ((u0 & 224) == 192) {
            result += String.fromCharCode((u0 & 31) << 6 | u1);
            continue;
        }
        let u2 = data[i++ >>> 0] & 63;
        if ((u0 & 240) == 224) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        }
        else {
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | data[i++ >>> 0] & 63;
        }
        if (u0 < 65536) {
            result += String.fromCharCode(u0);
        }
        else {
            let ch = u0 - 65536;
            result += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
    }
    return result;
}


/***/ }),

/***/ "./src/common/util/wasm.ts":
/*!*********************************!*\
  !*** ./src/common/util/wasm.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setMemoryShared: () => (/* binding */ setMemoryShared)
/* harmony export */ });
/* unused harmony exports readULeb128, readULeb128Async, readSLeb128, readSLeb128Async, writeSleb128, writeSleb128Async, writeUleb128, writeUleb128Async */
/* harmony import */ var _io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io/BufferReader */ "./src/common/io/BufferReader.ts");

function readULeb128(reader) {
    let result = 0;
    let shift = 0;
    while (true) {
        const byte = reader.readUint8();
        result |= (byte & 0x7f) << shift;
        shift += 7;
        if (!(byte & 0x80)) {
            break;
        }
    }
    return result;
}
async function readULeb128Async(reader) {
    let result = 0;
    let shift = 0;
    while (true) {
        const byte = await reader.readUint8();
        result |= (byte & 0x7f) << shift;
        shift += 7;
        if (!(byte & 0x80)) {
            break;
        }
    }
    return result;
}
function readSLeb128(reader) {
    let result = 0;
    let shift = 0;
    let byte;
    while (true) {
        byte = reader.readUint8();
        result |= (byte & 0x7f) << shift;
        shift += 7;
        if (!(byte & 0x80)) {
            break;
        }
    }
    // 符号扩展，将最高有效位的符号位扩展到高位
    if (byte & 0x40) {
        // 如果最高有效位是 1（负数），则将高位全部置为 1
        result |= (~0 << shift);
    }
    return result;
}
async function readSLeb128Async(reader) {
    let result = 0;
    let shift = 0;
    let byte;
    while (true) {
        byte = await reader.readUint8();
        result |= (byte & 0x7f) << shift;
        shift += 7;
        if (!(byte & 0x80)) {
            break;
        }
    }
    // 符号扩展，将最高有效位的符号位扩展到高位
    if (byte & 0x40) {
        // 如果最高有效位是 1（负数），则将高位全部置为 1
        result |= (~0 << shift);
    }
    return result;
}
function writeSleb128(writer, value) {
    let more = true;
    while (more) {
        let byte = value & 0x7f;
        value >>= 7;
        // 如果还有未编码的位，设置高位为 1
        if ((value === 0 && (byte & 0x40) === 0) || (value === -1 && (byte & 0x40) !== 0)) {
            more = false;
        }
        else {
            byte |= 0x80;
        }
        writer.writeUint8(byte);
    }
}
async function writeSleb128Async(writer, value) {
    let more = true;
    while (more) {
        let byte = value & 0x7f;
        value >>= 7;
        // 如果还有未编码的位，设置高位为 1
        if ((value === 0 && (byte & 0x40) === 0) || (value === -1 && (byte & 0x40) !== 0)) {
            more = false;
        }
        else {
            byte |= 0x80;
        }
        await writer.writeUint8(byte);
    }
}
function writeUleb128(writer, value) {
    do {
        let byte = value & 0x7f;
        value >>= 7;
        // 如果还有未编码的位，设置高位为 1
        if (value !== 0) {
            byte |= 0x80;
        }
        writer.writeUint8(byte);
    } while (value !== 0);
}
async function writeUleb128Async(writer, value) {
    do {
        let byte = value & 0x7f;
        value >>= 7;
        // 如果还有未编码的位，设置高位为 1
        if (value !== 0) {
            byte |= 0x80;
        }
        await writer.writeUint8(byte);
    } while (value !== 0);
}
function setMemoryShared(wasm, shared) {
    const reader = new _io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](wasm, true);
    reader.skip(8);
    while (reader.remainingSize()) {
        const sectionId = reader.readUint8();
        const size = readULeb128(reader);
        if (sectionId === 2 /* SectionId.Import */) {
            let count = readULeb128(reader);
            while (count--) {
                const moduleLen = readULeb128(reader);
                reader.skip(moduleLen);
                const fieldLen = readULeb128(reader);
                reader.skip(fieldLen);
                const externalKind = reader.readUint8();
                switch (externalKind) {
                    case 0 /* ExternalKind.Function */: {
                        // type index of the function signature
                        readULeb128(reader);
                        break;
                    }
                    case 3 /* ExternalKind.Global */: {
                        // content_type
                        readSLeb128(reader);
                        // mutability
                        readULeb128(reader);
                        break;
                    }
                    case 2 /* ExternalKind.Memory */: {
                        const pos = Number(reader.getPos());
                        if (shared) {
                            wasm[pos] = wasm[pos] | 2;
                        }
                        else {
                            wasm[pos] = wasm[pos] & ~2;
                        }
                        return;
                    }
                    case 1 /* ExternalKind.Table */: {
                        // elem_type
                        readSLeb128(reader);
                        const flags = readULeb128(reader);
                        readULeb128(reader);
                        if (flags & 0x01) {
                            // maximum
                            readULeb128(reader);
                        }
                        break;
                    }
                }
            }
            return;
        }
        else {
            reader.skip(size);
        }
    }
}


/***/ }),

/***/ "./src/cheap/asm/memory.asm":
/*!**********************************!*\
  !*** ./src/cheap/asm/memory.asm ***!
  \**********************************/
/***/ ((module) => {

module.exports = "AGFzbQEAAAABKQhgAn9/AGACf34AYAJ/fQBgAn98AGABfwF/YAF/AX5gAX8BfWABfwF8AhIBA2VudgZtZW1vcnkCAwGAgAQDDw4AAAABAgMEBAQEBAUGBweIAQ4Gd3JpdGU4AAAHd3JpdGUxNgABB3dyaXRlMzIAAgd3cml0ZTY0AAMId3JpdGVmMzIABAh3cml0ZWY2NAAFBXJlYWQ4AAYGcmVhZFU4AAcGcmVhZDE2AAgHcmVhZFUxNgAJBnJlYWQzMgAKBnJlYWQ2NAALB3JlYWRmMzIADAdyZWFkZjY0AA0KfQ4JACAAIAE6AAALCQAgACABOwEACwkAIAAgATYCAAsJACAAIAE3AwALCQAgACABOAIACwkAIAAgATkDAAsHACAALAAACwcAIAAtAAALBwAgAC4BAAsHACAALwEACwcAIAAoAgALBwAgACkDAAsHACAAKgIACwcAIAArAwAL";

/***/ }),

/***/ "./src/cheap/thread/asm/atomics.asm":
/*!******************************************!*\
  !*** ./src/cheap/thread/asm/atomics.asm ***!
  \******************************************/
/***/ ((module) => {

module.exports = "AGFzbQEAAAABLAdgAX8Bf2ABfwF+YAJ/fwF/YAJ/fgF+YAN/f38Bf2ADf35+AX5gA39/fgF/AhIBA2VudgZtZW1vcnkCAwGAgAQDKCcAAAABAgICAwICAgMCAgIDAgICAwICAgMCAgIDAgICAwQEBAUCAgYHhgMnBWxvYWQ4AAAGbG9hZDE2AAEGbG9hZDMyAAIGbG9hZDY0AAMGc3RvcmU4AAQHc3RvcmUxNgAFB3N0b3JlMzIABgdzdG9yZTY0AAcEYWRkOAAIBWFkZDE2AAkFYWRkMzIACgVhZGQ2NAALBHN1YjgADAVzdWIxNgANBXN1YjMyAA4Fc3ViNjQADwRhbmQ4ABAFYW5kMTYAEQVhbmQzMgASBWFuZDY0ABMDb3I4ABQEb3IxNgAVBG9yMzIAFgRvcjY0ABcEeG9yOAAYBXhvcjE2ABkFeG9yMzIAGgV4b3I2NAAbCWV4Y2hhbmdlOAAcCmV4Y2hhbmdlMTYAHQpleGNoYW5nZTMyAB4KZXhjaGFuZ2U2NAAfEWNvbXBhcmVfZXhjaGFuZ2U4ACASY29tcGFyZV9leGNoYW5nZTE2ACESY29tcGFyZV9leGNoYW5nZTMyACISY29tcGFyZV9leGNoYW5nZTY0ACMGbm90aWZ5ACQEd2FpdAAlC3dhaXRUaW1lb3V0ACYKugMnCAAgAP4SAAALCAAgAP4TAQALCAAgAP4QAgALCAAgAP4RAwALDAAgACAB/hkAACABCwwAIAAgAf4aAQAgAQsMACAAIAH+FwIAIAELDAAgACAB/hgDACABCwoAIAAgAf4gAAALCgAgACAB/iEBAAsKACAAIAH+HgIACwoAIAAgAf4fAwALCgAgACAB/icAAAsKACAAIAH+KAEACwoAIAAgAf4lAgALCgAgACAB/iYDAAsKACAAIAH+LgAACwoAIAAgAf4vAQALCgAgACAB/iwCAAsKACAAIAH+LQMACwoAIAAgAf41AAALCgAgACAB/jYBAAsKACAAIAH+MwIACwoAIAAgAf40AwALCgAgACAB/jwAAAsKACAAIAH+PQEACwoAIAAgAf46AgALCgAgACAB/jsDAAsKACAAIAH+QwAACwoAIAAgAf5EAQALCgAgACAB/kECAAsKACAAIAH+QgMACwwAIAAgASAC/koAAAsMACAAIAEgAv5LAQALDAAgACABIAL+SAIACwwAIAAgASAC/kkDAAsKACAAIAH+AAIACwwAIAAgAUJ//gECAAsMACAAIAEgAv4BAgAL";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./src/export/mux.ts ***!
  \***************************/
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avformat_mux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avformat/mux */ "./src/avformat/mux.ts");
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var avformat_formats_OMpegtsFormat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avformat/formats/OMpegtsFormat */ "./src/avformat/formats/OMpegtsFormat.ts");
/* harmony import */ var avformat_AVFormatContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avformat/AVFormatContext */ "./src/avformat/AVFormatContext.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var _cheap_polyfill_bigint__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../cheap/polyfill/bigint */ "./src/cheap/polyfill/bigint.ts");
var cheap__fileName__0 = "src/export/mux.ts";












class LibMux {
    ctx;
    processingId;
    pendingEOF = false;
    partBufferList = [];
    queue = new Queue();
    onResult;
    config;
    constructor(config) {
        console.log('LibMux init');
        (0,_cheap_polyfill_bigint__WEBPACK_IMPORTED_MODULE_11__["default"])();
        this.config = config;
        this.onResult = config.onResult.bind(this);
    }
    remuxTS(source) {
        this.queue.enqueue({
            dataSource: source,
            executor: () => {
                if (this.ctx) {
                    this.reset();
                }
                this.init(this.config, source);
                this.pendingEOF = false;
                this.processingId = source.id;
                this.interleaveWriteAV(source);
                this.pendingEOF = true;
                // 写完所有 avpacket 之后结束封装
                avformat_mux__WEBPACK_IMPORTED_MODULE_3__.writeTrailer(this.ctx);
            }
        });
    }
    flush() {
        avformat_mux__WEBPACK_IMPORTED_MODULE_3__.flush(this.ctx); // format.flush
        this.partBufferList = [];
    }
    destroy() {
        this.flush();
        this.ctx.destroy();
        this.ctx = null;
        this.queue.clear();
        this.queue = null;
    }
    reset() {
        this.flush();
        this.ctx.destroy();
        this.ctx = null;
    }
    // 音视频交错写入
    interleaveWriteAV(source) {
        const avSamples = mergeSortedArrays(source.videoTrack.samples, source.audioTrack.samples);
        avSamples.forEach(sample => {
            if (sample.pes) {
                this.writeVideo(sample, source.videoTrack.inputTimeScale);
            }
            else {
                this.writeAudio(sample, source.audioTrack.inputTimeScale);
            }
        });
    }
    writeVideo(sample, timeScale) {
        let avpacketConfig = {
            pts: toBI(sample.pts),
            dts: toBI(sample.dts),
            data: sample.pes,
            size: sample.pes.byteLength,
            streamIndex: this.ctx.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */).id,
            timeBase: { num: 1, den: timeScale },
            bitFormat: 2,
            flags: sample.key ? 1 : 0
        };
        let avpacket = getAvpacket(avpacketConfig);
        avformat_mux__WEBPACK_IMPORTED_MODULE_3__.writeAVPacket(this.ctx, avpacket);
    }
    writeAudio(sample, timeScale) {
        let avpacketConfig = {
            pts: toBI(sample.pts),
            dts: toBI(sample.pts),
            data: sample.unit,
            size: sample.unit.byteLength,
            streamIndex: this.ctx.getStreamByMediaType(1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */).id,
            timeBase: { num: 1, den: timeScale },
            flags: 1
        };
        let avpacket = getAvpacket(avpacketConfig);
        avformat_mux__WEBPACK_IMPORTED_MODULE_3__.writeAVPacket(this.ctx, avpacket);
    }
    init(config, source) {
        if (config.outputFormat !== 2 /* AVFormat.MPEGTS */) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('outputFormat is not MPEGTS', cheap__fileName__0, 140);
            return;
        }
        ;
        const ioWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_4__["default"]();
        const oformat = new avformat_formats_OMpegtsFormat__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.ctx = (0,avformat_AVFormatContext__WEBPACK_IMPORTED_MODULE_6__.createAVOFormatContext)();
        this.ctx.ioWriter = ioWriter;
        this.ctx.oformat = oformat;
        this.partBufferList = [];
        ioWriter.onFlush = (buffer, pos) => {
            this.partBufferList.push(buffer.slice(0));
            if (this.pendingEOF) {
                this.onResult({ id: this.processingId, data: (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, this.partBufferList) });
                this.partBufferList = [];
            }
            return 0;
        };
        ioWriter.onSeek = (pos) => {
            // seek 到写文件 pos 处
            return 0;
        };
        this.addStream(config, source);
        avformat_mux__WEBPACK_IMPORTED_MODULE_3__.open(this.ctx);
        avformat_mux__WEBPACK_IMPORTED_MODULE_3__.writeHeader(this.ctx);
    }
    addStream(config, source) {
        if (config.hasVideo) {
            const stream = this.ctx.createStream();
            // 配置 stream 参数，具体查看 codecpar 需要添加哪些参数
            stream.codecpar.codecId = 27 /* AVCodecID.AV_CODEC_ID_H264 */;
            stream.codecpar.codecType = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
        }
        if (config.hasAudio) {
            const atrack = source.audioTrack;
            const stream = this.ctx.createStream();
            stream.codecpar.codecId = 86018 /* AVCodecID.AV_CODEC_ID_AAC */; // AVCodecID.AV_CODEC_ID_AAC
            stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
            stream.codecpar.sampleRate = atrack.samplerate || 44100;
            stream.codecpar.chLayout.nbChannels = atrack.channelCount || 2;
            stream.codecpar.profile = this.getAACprofile(atrack.codec);
        }
    }
    getAACprofile(codec) {
        let profile = codec.match(/mp4a.40.(\d+)/)?.[1];
        let result = 0 /* MPEG4AudioObjectTypes.NULL */;
        switch (profile) {
            case '1':
                result = 1 /* MPEG4AudioObjectTypes.AAC_MAIN */;
                break;
            case '2':
                result = 2 /* MPEG4AudioObjectTypes.AAC_LC */;
                break;
            case '3':
                result = 3 /* MPEG4AudioObjectTypes.AAC_SSR */;
                break;
            case '4':
                result = 4 /* MPEG4AudioObjectTypes.AAC_LTP */;
                break;
            case '5':
                result = 5 /* MPEG4AudioObjectTypes.AAC_SBR */;
                break;
            case '6':
                result = 6 /* MPEG4AudioObjectTypes.AAC_SCALABLE */;
                break;
            case '32':
                result = 32 /* MPEG4AudioObjectTypes.LAYER1 */;
                break;
            case '33':
                result = 33 /* MPEG4AudioObjectTypes.LAYER2 */;
                break;
            case '34':
                result = 34 /* MPEG4AudioObjectTypes.LAYER3 */;
                break;
            default:
                result = 2 /* MPEG4AudioObjectTypes.AAC_LC */;
        }
        return result;
    }
}
class Queue {
    list = [];
    constructor() {
    }
    enqueue(task) {
        this.list.push(task);
        if (this.list.length === 1 /* start */) {
            this.executeNext();
        }
    }
    dequeue() {
        return this.list.shift();
    }
    clear() {
        this.list = [];
    }
    executeNext() {
        const task = this.dequeue();
        if (!task)
            return;
        task.executor(); // executor must be sync function
        console.log('task done, execute next...');
        this.executeNext();
    }
}
function getAvpacket(detail) {
    let avpacket = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.createAVPacket)();
    // unrefAVPacket(avpacket);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[20](avpacket, detail.buf);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, detail.pts);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, detail.dts);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 28, detail.size);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, detail.streamIndex);
    // avpacket.duration = detail.duration;
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, BigInt(0));
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, detail.timeBase.num); // 不能给 timeBase 重新赋值，因为它编译后是一个 Proxy，需要直接修改属性
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, detail.timeBase.den);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, detail.bitFormat); // annex-b
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, detail.flags);
    const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(detail.size);
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__.memcpyFromUint8Array)(data, detail.size, detail.data);
    (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketData)(avpacket, data, detail.size);
    return avpacket;
}
// number to bigint
function toBI(val) {
    return BigInt(Math.floor(val));
}
/**
 * 归并排序，高效合并两个有序数组
 * @param ary1
 * @param ary2
 * @returns
 */
function mergeSortedArrays(ary1 /* video */, ary2) {
    let result = [];
    let i = 0, j = 0;
    // 合并两个已经排序的数组
    while (i < ary1.length && j < ary2.length) {
        if (ary1[i].dts < ary2[j].pts /* audio only has pts */) {
            result.push(ary1[i]);
            i++;
        }
        else {
            result.push(ary2[j]);
            j++;
        }
    }
    // 添加余下的元素
    while (i < ary1.length)
        result.push(ary1[i++]);
    while (j < ary2.length)
        result.push(ary2[j++]);
    return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LibMux);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=mux.js.map