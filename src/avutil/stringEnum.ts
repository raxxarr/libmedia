import { AVFormat } from 'avformat/avformat'
import { AVCodecID, AVMediaType } from './codec'
import { AVColorPrimaries, AVColorRange, AVColorSpace, AVColorTransferCharacteristic, AVPixelFormat } from './pixfmt'
import { AVSampleFormat } from './audiosamplefmt'
import { AVDisposition } from 'avformat/AVStream'
import { IOType } from 'avpipeline/IOPipeline'

export const Ext2Format: Record<string, AVFormat> = {
  'flv': AVFormat.FLV,
  'mp4': AVFormat.MOV,
  'mov': AVFormat.MOV,
  'ts': AVFormat.MPEGTS,
  'ivf': AVFormat.IVF,
  'opus': AVFormat.OGGS,
  'ogg': AVFormat.OGGS,
  'm3u8': AVFormat.MPEGTS,
  'm3u': AVFormat.MPEGTS,
  'mpd': AVFormat.MOV,
  'mp3': AVFormat.MP3,
  'mkv': AVFormat.MATROSKA,
  'mka': AVFormat.MATROSKA,
  'webm': AVFormat.WEBM,
  'aac': AVFormat.AAC,
  'flac': AVFormat.FLAC,
  'wav': AVFormat.WAV
}

export const Ext2IOLoader: Record<string, IOType> = {
  'm3u8': IOType.HLS,
  'm3u': IOType.HLS,
  'mpd': IOType.DASH
}

export const VideoCodecString2CodecId = {
  'copy': AVCodecID.AV_CODEC_ID_NONE,
  'h264': AVCodecID.AV_CODEC_ID_H264,
  'avc': AVCodecID.AV_CODEC_ID_H264,
  'hevc': AVCodecID.AV_CODEC_ID_HEVC,
  'h265': AVCodecID.AV_CODEC_ID_HEVC,
  'vvc': AVCodecID.AV_CODEC_ID_VVC,
  'h266': AVCodecID.AV_CODEC_ID_VVC,
  'av1': AVCodecID.AV_CODEC_ID_AV1,
  'vp9': AVCodecID.AV_CODEC_ID_VP9,
  'vp8': AVCodecID.AV_CODEC_ID_VP8,
  'mpeg4': AVCodecID.AV_CODEC_ID_MPEG4
}

export const AudioCodecString2CodecId = {
  'copy': AVCodecID.AV_CODEC_ID_NONE,
  'aac': AVCodecID.AV_CODEC_ID_AAC,
  'mp3': AVCodecID.AV_CODEC_ID_MP3,
  'opus': AVCodecID.AV_CODEC_ID_OPUS,
  'flac': AVCodecID.AV_CODEC_ID_FLAC,
  'speex': AVCodecID.AV_CODEC_ID_SPEEX,
  'vorbis': AVCodecID.AV_CODEC_ID_VORBIS,
  'g711a': AVCodecID.AV_CODEC_ID_PCM_ALAW,
  'g711u': AVCodecID.AV_CODEC_ID_PCM_MULAW
}

export const PixfmtString2AVPixelFormat = {
  'yuv420p': AVPixelFormat.AV_PIX_FMT_YUV420P,
  'yuv422p': AVPixelFormat.AV_PIX_FMT_YUV422P,
  'yuv444p': AVPixelFormat.AV_PIX_FMT_YUV444P,

  'yuv420p10le': AVPixelFormat.AV_PIX_FMT_YUV420P10LE,
  'yuv422p10le': AVPixelFormat.AV_PIX_FMT_YUV422P10LE,
  'yuv444p10le': AVPixelFormat.AV_PIX_FMT_YUV444P10LE,

  'yuv420p10be': AVPixelFormat.AV_PIX_FMT_YUV420P10BE,
  'yuv422p10be': AVPixelFormat.AV_PIX_FMT_YUV422P10BE,
  'yuv444p10be': AVPixelFormat.AV_PIX_FMT_YUV444P10BE,
}

export const SampleFmtString2SampleFormat = {
  'u8': AVSampleFormat.AV_SAMPLE_FMT_U8,
  'u8p': AVSampleFormat.AV_SAMPLE_FMT_U8P,
  's16': AVSampleFormat.AV_SAMPLE_FMT_S16,
  's16p': AVSampleFormat.AV_SAMPLE_FMT_S16P,
  's32': AVSampleFormat.AV_SAMPLE_FMT_S32,
  's32p': AVSampleFormat.AV_SAMPLE_FMT_S32P,
  's64': AVSampleFormat.AV_SAMPLE_FMT_S64,
  's64p': AVSampleFormat.AV_SAMPLE_FMT_S64P,
  'float': AVSampleFormat.AV_SAMPLE_FMT_FLT,
  'floatp': AVSampleFormat.AV_SAMPLE_FMT_FLTP,
  'double': AVSampleFormat.AV_SAMPLE_FMT_DBL,
  'doublep': AVSampleFormat.AV_SAMPLE_FMT_DBLP,
}

export const Format2AVFormat: Record<string, AVFormat> = {
  'flv': AVFormat.FLV,
  'mp4': AVFormat.MOV,
  'mov': AVFormat.MOV,
  'ts': AVFormat.MPEGTS,
  'mpegts': AVFormat.MPEGTS,
  'ivf': AVFormat.IVF,
  'opus': AVFormat.OGGS,
  'ogg': AVFormat.OGGS,
  'm3u8': AVFormat.MPEGTS,
  'm3u': AVFormat.MPEGTS,
  'mpd': AVFormat.MOV,
  'mp3': AVFormat.MP3,
  'mkv': AVFormat.MATROSKA,
  'matroska': AVFormat.MATROSKA,
  'mka': AVFormat.MATROSKA,
  'webm': AVFormat.WEBM,
  'aac': AVFormat.AAC,
  'flac': AVFormat.FLAC,
  'wav': AVFormat.WAV
}

export const colorRange2AVColorRange: Record<string, AVColorRange> = {
  'tv': AVColorRange.AVCOL_RANGE_MPEG,
  'pc': AVColorRange.AVCOL_RANGE_JPEG
}

export const colorSpace2AVColorSpace: Record<string, AVColorSpace> = {
  'bt709': AVColorSpace.AVCOL_SPC_BT709,
  'fcc': AVColorSpace.AVCOL_SPC_FCC,
  'bt470bg': AVColorSpace.AVCOL_SPC_BT470BG,
  'smpte170m': AVColorSpace.AVCOL_SPC_SMPTE170M,
  'smpte240m': AVColorSpace.AVCOL_SPC_SMPTE240M,
  'ycgco': AVColorSpace.AVCOL_SPC_YCGCO,
  'gbr': AVColorSpace.AVCOL_SPC_RGB,
  'bt2020ncl': AVColorSpace.AVCOL_SPC_BT2020_NCL
}

export const colorPrimaries2AVColorPrimaries: Record<string, AVColorPrimaries> = {
  'bt709': AVColorPrimaries.AVCOL_PRI_BT709,
  'bt470m': AVColorPrimaries.AVCOL_PRI_BT470M,
  'bt470bg': AVColorPrimaries.AVCOL_PRI_BT470BG,
  'smpte170m': AVColorPrimaries.AVCOL_PRI_SMPTE170M,
  'smpte240m': AVColorPrimaries.AVCOL_PRI_SMPTE240M,
  'smpte428': AVColorPrimaries.AVCOL_PRI_SMPTE428,
  'film': AVColorPrimaries.AVCOL_PRI_FILM,
  'smpte431': AVColorPrimaries.AVCOL_PRI_SMPTE431,
  'smpte432': AVColorPrimaries.AVCOL_PRI_SMPTE432,
  'bt2020': AVColorPrimaries.AVCOL_PRI_BT2020,
  'jedec-p22': AVColorPrimaries.AVCOL_PRI_JEDEC_P22,
  'ebu3213': AVColorPrimaries.AVCOL_PRI_EBU3213
}

export const colorTrc2AVColorTransferCharacteristic: Record<string, AVColorTransferCharacteristic> = {
  'bt709': AVColorTransferCharacteristic.AVCOL_TRC_BT709,
  'gamma22': AVColorTransferCharacteristic.AVCOL_TRC_GAMMA22,
  'gamma28': AVColorTransferCharacteristic.AVCOL_TRC_GAMMA28,
  'smpte170m': AVColorTransferCharacteristic.AVCOL_TRC_SMPTE170M,
  'smpte240m': AVColorTransferCharacteristic.AVCOL_TRC_SMPTE240M,
  'srgb': AVColorTransferCharacteristic.AVCOL_TRC_IEC61966_2_1,
  'xvycc': AVColorTransferCharacteristic.AVCOL_TRC_IEC61966_2_4,
  'bt2020-10': AVColorTransferCharacteristic.AVCOL_TRC_BT2020_10,
  'bt2020-12': AVColorTransferCharacteristic.AVCOL_TRC_BT2020_12
}

export const mediaType2AVMediaType: Record<string, AVMediaType> = {
  'Audio': AVMediaType.AVMEDIA_TYPE_AUDIO,
  'Video': AVMediaType.AVMEDIA_TYPE_VIDEO,
  'Subtitle': AVMediaType.AVMEDIA_TYPE_SUBTITLE,
  'Attachment': AVMediaType.AVMEDIA_TYPE_ATTACHMENT,
  'Data': AVMediaType.AVMEDIA_TYPE_DATA
}

export const disposition2AVDisposition: Record<string, AVDisposition> = {
  'default': AVDisposition.DEFAULT,
  'dub': AVDisposition.DUB,
  'original': AVDisposition.ORIGINAL,
  'comment': AVDisposition.COMMENT,
  'lyrics': AVDisposition.LYRICS,
  'karaoke': AVDisposition.KARAOKE,
  'forced': AVDisposition.FORCED,
  'hearing impaired': AVDisposition.HEARING_IMPAIRED,
  'visual impaired': AVDisposition.VISUAL_IMPAIRED,
  'clean effects': AVDisposition.CLEAN_EFFECTS,
  'attached pic': AVDisposition.ATTACHED_PIC,
  'timed thumbnails': AVDisposition.TIMED_THUMBNAILS,
  'captions': AVDisposition.CAPTIONS,
  'descriptions': AVDisposition.DESCRIPTIONS,
  'metadata': AVDisposition.METADATA,
  'dependent': AVDisposition.DEPENDENT,
  'still image': AVDisposition.STILL_IMAGE
}