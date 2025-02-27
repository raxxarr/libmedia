import AVFilterNode, { AVFilterNodeOptions } from './AVFilterNode'
import AVFrame, { AVFrameRef } from 'avutil/struct/avframe'
import { createAVFrame, destroyAVFrame, refAVFrame } from 'avutil/util/avframe'
import { IOError } from 'common/io/error'
import * as is from 'common/util/is'

export interface RangeFilterNodeOptions extends AVFilterNodeOptions {
  start: int64
  end: int64
}

export default class RangeFilterNode extends AVFilterNode {
  declare options: RangeFilterNodeOptions

  constructor(options: RangeFilterNodeOptions) {
    super(options, 1, 1)
  }

  public async ready() {
    
  }

  public async destroy() {
    
  }

  public async process(inputs: (pointer<AVFrame> | VideoFrame)[], outputs: (pointer<AVFrame> | VideoFrame)[]) {
    let avframe = inputs[0]

    if (is.number(avframe) && avframe < 0) {
      outputs[0] = avframe
      return
    }

    let pts = is.number(avframe) ? avframe.pts : static_cast<int64>(avframe.timestamp)

    if (pts < this.options.start) {
      while (true) {
        const next = await this.inputInnerNodePort[0].request<pointer<AVFrame> | VideoFrame>('pull')
        if (is.number(next) && next < 0) {
          outputs[0] = next
          return
        }
        pts = is.number(next) ? next.pts : static_cast<int64>(next.timestamp)
        if (pts >= this.options.start) {
          outputs[0] = next
          return
        }
        else {
          if (is.number(next)) {
            this.options.avframePool ? this.options.avframePool.release(reinterpret_cast<pointer<AVFrameRef>>(next)) : destroyAVFrame(next)
          }
          else {
            next.close()
          }
        }
      }
    }
    else if (pts > this.options.end && this.options.end >= this.options.start) {
      outputs[0] = reinterpret_cast<pointer<AVFrame>>(IOError.END)
      return
    }
    else {
      if (is.number(avframe)) {
        const out = this.options.avframePool ? this.options.avframePool.alloc() : createAVFrame()
        refAVFrame(out, avframe)
        outputs[0] = out
      }
      else {
        outputs[0] = avframe.clone()
      }
    }
  }
}