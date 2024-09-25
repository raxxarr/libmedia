import * as logger from 'common/util/logger'
import * as mux from 'avformat/mux'
import { MPEG4AudioObjectTypes } from 'avformat/codecs/aac'
import IOWriterSync from 'common/io/IOWriterSync'
import OMpegtsFormat from 'avformat/formats/OMpegtsFormat'
import { AVOFormatContext, createAVOFormatContext } from 'avformat/AVFormatContext'
import { avMalloc } from 'avutil/util/mem'
import { addAVPacketData, createAVPacket } from 'avutil/util/avpacket'
import { memcpyFromUint8Array } from 'cheap/std/memory'
import { AVFormat } from 'avformat/avformat'
import { AVCodecID, AVMediaType } from 'avutil/codec'
import concatTypeArray from 'common/function/concatTypeArray'

interface IMuxConfig {
  outputFormat: AVFormat;
  hasVideo: boolean;
  hasAudio: boolean;
  onResult: (params: { id: string; data: Uint8Array }) => void;
}
interface ISample {
  pts: number;
  dts: number;
  pes: Uint8Array; // video
  unit: Uint8Array; // audio
  key: boolean;
}
// demuxed video track
interface ITrack {
  inputTimeScale: number;
  samples: ISample[];
  codec: string;
  samplerate?: number; // audio only
  channelCount?: number; // audio only
}

interface IRemuxInput {
  id: string;
  videoTrack: ITrack;
  audioTrack: ITrack;
}
class LibMux {
  private ctx: AVOFormatContext;
  private processingId: string;
  private pendingEOF: boolean = false;
  private partBufferList: Uint8Array[] = [];
  private queue = new Queue<IRemuxInput>();
  private onResult: IMuxConfig['onResult'];
  private config: IMuxConfig;

  constructor(config: IMuxConfig) {
    this.config = config;
    this.onResult = config.onResult.bind(this);
  }

  public remuxTS(source: IRemuxInput) {
    this.queue.enqueue({
      dataSource: source,
      executor: () => {
        if (this.ctx) { this.reset() }
        this.init(this.config, source);

        this.pendingEOF = false;
        this.processingId = source.id;

        this.interleaveWriteAV(source);

        this.pendingEOF = true;
        // 写完所有 avpacket 之后结束封装
        mux.writeTrailer(this.ctx);
      }
    });
  }

  public flush() {
    mux.flush(this.ctx); // format.flush
    this.partBufferList = [];
  }

  public destroy() {
    this.flush();
    this.ctx.destroy();
    this.ctx = null;
    this.queue.clear();
    this.queue = null;
  }

  private reset() {
    this.flush();
    this.ctx.destroy();
    this.ctx = null;
  }

  // 音视频交错写入
  private interleaveWriteAV(source: IRemuxInput) {
    const avSamples = mergeSortedArrays(source.videoTrack.samples, source.audioTrack.samples);
    avSamples.forEach(sample => {
      if (sample.pes) {
        this.writeVideo(sample, source.videoTrack.inputTimeScale);
      } else {
        this.writeAudio(sample, source.audioTrack.inputTimeScale);
      }
    })
  }

  private writeVideo(sample: ISample, timeScale: number) {
    let avpacketConfig = {
      pts: toBI(sample.pts),
      dts: toBI(sample.dts),
      data: sample.pes,
      size: sample.pes.byteLength,
      streamIndex: this.ctx.getStreamByMediaType(AVMediaType.AVMEDIA_TYPE_VIDEO).id,
      timeBase: { num: 1, den: timeScale },
      bitFormat: 2, // annex-b
      flags: sample.key ? 1: 0
    };
    let avpacket = getAvpacket(avpacketConfig);
    mux.writeAVPacket(this.ctx, avpacket)
  }

  private writeAudio(sample: ISample, timeScale: number) {
    let avpacketConfig = {
      pts: toBI(sample.pts),
      dts: toBI(sample.pts),
      data: sample.unit,
      size: sample.unit.byteLength,
      streamIndex: this.ctx.getStreamByMediaType(AVMediaType.AVMEDIA_TYPE_AUDIO).id,
      timeBase: { num: 1, den: timeScale },
      flags: 1
    };
    let avpacket = getAvpacket(avpacketConfig);
    mux.writeAVPacket(this.ctx, avpacket)
  }

  private init(config: IMuxConfig, source: IRemuxInput) {
    if (config.outputFormat !== AVFormat.MPEGTS) {
      logger.error('outputFormat is not MPEGTS');
      return;
    };

    const ioWriter = new IOWriterSync();
    const oformat = new OMpegtsFormat();
    this.ctx = createAVOFormatContext();
    this.ctx.ioWriter = ioWriter;
    this.ctx.oformat = oformat;

    this.partBufferList = [];
    ioWriter.onFlush = (buffer, pos) => {
      this.partBufferList.push(buffer.slice(0));
      if (this.pendingEOF) {
        this.onResult({ id: this.processingId, data: concatTypeArray<Uint8ArrayConstructor>(Uint8Array, this.partBufferList) });
        this.partBufferList = [];
      }
      return 0
    }

    ioWriter.onSeek = (pos) => {
      // seek 到写文件 pos 处
      return 0
    }

    this.addStream(config, source);

    mux.open(this.ctx);
    mux.writeHeader(this.ctx);
  }

  private addStream(config: IMuxConfig, source: IRemuxInput) {
    if (config.hasVideo) {
      const stream = this.ctx.createStream();
      // 配置 stream 参数，具体查看 codecpar 需要添加哪些参数
      stream.codecpar.codecId = AVCodecID.AV_CODEC_ID_H264;
      stream.codecpar.codecType = AVMediaType.AVMEDIA_TYPE_VIDEO;
    }

    if (config.hasAudio) {
      const atrack = source.audioTrack;
      const stream = this.ctx.createStream()
      stream.codecpar.codecId = AVCodecID.AV_CODEC_ID_AAC; // AVCodecID.AV_CODEC_ID_AAC
      stream.codecpar.codecType = AVMediaType.AVMEDIA_TYPE_AUDIO;
      stream.codecpar.sampleRate = atrack.samplerate || 44100;
      stream.codecpar.chLayout.nbChannels = atrack.channelCount || 2;
      stream.codecpar.profile = this.getAACprofile(atrack.codec);
    }
  }

  private getAACprofile(codec: string) {
    let profile = codec.match(/mp4a.40.(\d+)/)?.[1];
    let result = MPEG4AudioObjectTypes.NULL;
    switch (profile) {
      case '1':
        result = MPEG4AudioObjectTypes.AAC_MAIN;
        break
      case '2':
        result = MPEG4AudioObjectTypes.AAC_LC;
        break
      case '3':
        result = MPEG4AudioObjectTypes.AAC_SSR;
        break
      case '4':
        result = MPEG4AudioObjectTypes.AAC_LTP;
        break
      case '5':
        result = MPEG4AudioObjectTypes.AAC_SBR;
        break;
      case '6':
        result = MPEG4AudioObjectTypes.AAC_SCALABLE;
        break;
      case '32':
        result = MPEG4AudioObjectTypes.LAYER1;
        break
      case '33':
        result = MPEG4AudioObjectTypes.LAYER2;
        break;
      case '34':
        result = MPEG4AudioObjectTypes.LAYER3;
        break;
      default:
        result = MPEG4AudioObjectTypes.AAC_LC;
    }
    return result;
  }
}

interface IQueueTask<K> {
  executor: () => void;
  dataSource: K;
}
class Queue<T=any> {
  list: IQueueTask<T>[] = [];

  constructor() {

  }

  public enqueue(task: IQueueTask<T>) {
    this.list.push(task);
    if (this.list.length === 1/* start */) {
      this.executeNext();
    }
  }

  public dequeue() {
    return this.list.shift();
  }

  public clear() {
    this.list = [];
  }

  private executeNext() {
    const task = this.dequeue();
    if (!task) return;
    task.executor(); // executor must be sync function
    console.log('task done, execute next...')
    this.executeNext();
  }
}

function getAvpacket(detail: any) {
  let avpacket = createAVPacket();
  // unrefAVPacket(avpacket);
  avpacket.buf = detail.buf;
  avpacket.pts = detail.pts;
  avpacket.dts = detail.dts;
  avpacket.size = detail.size;
  avpacket.streamIndex = detail.streamIndex;
  // avpacket.duration = detail.duration;
  avpacket.duration = 0n;
  avpacket.timeBase.num = detail.timeBase.num; // 不能给 timeBase 重新赋值，因为它编译后是一个 Proxy，需要直接修改属性
  avpacket.timeBase.den = detail.timeBase.den;
  avpacket.bitFormat = detail.bitFormat; // annex-b
  avpacket.flags = detail.flags;

  const data = avMalloc(detail.size)
  memcpyFromUint8Array(data, detail.size, detail.data)
  addAVPacketData(avpacket, data, detail.size)
  return avpacket;
}

// number to bigint
function toBI(val: number) {
  return BigInt(Math.floor(val));
}

/**
 * 归并排序，高效合并两个有序数组
 * @param ary1 
 * @param ary2 
 * @returns 
 */
function mergeSortedArrays(ary1: any[]/* video */, ary2: any[]) {
  let result = [];
  let i = 0, j = 0;

  // 合并两个已经排序的数组
  while (i < ary1.length && j < ary2.length) {
      if (ary1[i].dts < ary2[j].pts/* audio only has pts */) {
          result.push(ary1[i]);
          i++;
      } else {
          result.push(ary2[j]);
          j++;
      }
  }

  // 添加余下的元素
  while (i < ary1.length) result.push(ary1[i++]);
  while (j < ary2.length) result.push(ary2[j++]);

  return result;
}


export default LibMux;