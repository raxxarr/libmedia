[**libmedia**](../../../../README.md) • **Docs**

***

[libmedia](../../../../README.md) / [avformat/formats/OMovFormat](../README.md) / OMovFormat

# Class: OMovFormat

## Extends

- `default`

## Constructors

### new OMovFormat()

> **new OMovFormat**(`options`): [`OMovFormat`](OMovFormat.md)

#### Parameters

• **options**: `MovFormatOptions`= `{}`

#### Returns

[`OMovFormat`](OMovFormat.md)

#### Overrides

`OFormat.constructor`

#### Source

[avformat/formats/OMovFormat.ts:75](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMovFormat.ts#L75)

## Properties

### options

> **options**: `MovFormatOptions`

#### Source

[avformat/formats/OMovFormat.ts:71](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMovFormat.ts#L71)

***

### type

> **type**: `AVFormat` = `AVFormat.MOV`

#### Overrides

`OFormat.type`

#### Source

[avformat/formats/OMovFormat.ts:67](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMovFormat.ts#L67)

## Methods

### destroy()

> **destroy**(`formatContext`): `void`

#### Parameters

• **formatContext**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`void`

#### Overrides

`OFormat.destroy`

#### Source

[avformat/formats/OMovFormat.ts:94](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMovFormat.ts#L94)

***

### flush()

> **flush**(`formatContext`): `number`

#### Parameters

• **formatContext**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`number`

#### Overrides

`OFormat.flush`

#### Source

[avformat/formats/OMovFormat.ts:744](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMovFormat.ts#L744)

***

### init()

> **init**(`formatContext`): `number`

#### Parameters

• **formatContext**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`number`

#### Overrides

`OFormat.init`

#### Source

[avformat/formats/OMovFormat.ts:83](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMovFormat.ts#L83)

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

[avformat/formats/OMovFormat.ts:462](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMovFormat.ts#L462)

***

### writeHeader()

> **writeHeader**(`formatContext`): `number`

#### Parameters

• **formatContext**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`number`

#### Overrides

`OFormat.writeHeader`

#### Source

[avformat/formats/OMovFormat.ts:154](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMovFormat.ts#L154)

***

### writeTrailer()

> **writeTrailer**(`formatContext`): `number`

#### Parameters

• **formatContext**: [`AVOFormatContext`](../../../AVFormatContext/interfaces/AVOFormatContext.md)

#### Returns

`number`

#### Overrides

`OFormat.writeTrailer`

#### Source

[avformat/formats/OMovFormat.ts:637](https://github.com/zhaohappy/libmedia/blob/a88305ff5d10e91621f2d71d24c72fc85681b8f7/src/avformat/formats/OMovFormat.ts#L637)
