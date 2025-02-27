[**libmedia**](../../../../README.md) • **Docs**

***

[libmedia](../../../../README.md) / [avformat/formats/OMpegtsFormat](../README.md) / OMpegtsFormat

# Class: OMpegtsFormat

## Extends

- `default`

## Constructors

### new OMpegtsFormat()

> **new OMpegtsFormat**(`options`): [`OMpegtsFormat`](OMpegtsFormat.md)

#### Parameters

• **options**: [`OMpegtsFormatOptions`](../interfaces/OMpegtsFormatOptions.md)= `{}`

#### Returns

[`OMpegtsFormat`](OMpegtsFormat.md)

#### Overrides

`OFormat.constructor`

#### Source

[avformat/formats/OMpegtsFormat.ts:87](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMpegtsFormat.ts#L87)

## Properties

### type

> **type**: `AVFormat` = `AVFormat.MPEGTS`

#### Overrides

`OFormat.type`

#### Source

[avformat/formats/OMpegtsFormat.ts:67](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMpegtsFormat.ts#L67)

## Methods

### destroy()

> **destroy**(`context`): `void`

#### Parameters

• **context**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`void`

#### Overrides

`OFormat.destroy`

#### Source

[avformat/formats/OMpegtsFormat.ts:104](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMpegtsFormat.ts#L104)

***

### flush()

> **flush**(`context`): `number`

#### Parameters

• **context**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`number`

#### Overrides

`OFormat.flush`

#### Source

[avformat/formats/OMpegtsFormat.ts:335](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMpegtsFormat.ts#L335)

***

### init()

> **init**(`context`): `number`

#### Parameters

• **context**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`number`

#### Overrides

`OFormat.init`

#### Source

[avformat/formats/OMpegtsFormat.ts:99](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMpegtsFormat.ts#L99)

***

### writeAVPacket()

> **writeAVPacket**(`formatContext`, `avpacket`): `number`

#### Parameters

• **formatContext**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

• **avpacket**: `pointer`\<[`AVPacket`](../../../../avutil/struct/avpacket/classes/AVPacket.md)\>

#### Returns

`number`

#### Overrides

`OFormat.writeAVPacket`

#### Source

[avformat/formats/OMpegtsFormat.ts:208](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMpegtsFormat.ts#L208)

***

### writeHeader()

> **writeHeader**(`context`): `number`

#### Parameters

• **context**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`number`

#### Overrides

`OFormat.writeHeader`

#### Source

[avformat/formats/OMpegtsFormat.ts:115](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMpegtsFormat.ts#L115)

***

### writeTrailer()

> **writeTrailer**(`context`): `number`

#### Parameters

• **context**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`number`

#### Overrides

`OFormat.writeTrailer`

#### Source

[avformat/formats/OMpegtsFormat.ts:319](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMpegtsFormat.ts#L319)
