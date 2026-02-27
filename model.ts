export type TTargetFileFormat = 'jpg' | 'webp';
export type TSizeType = 'side' | 'area';

export interface IMetaData {
    width: number;
    height: number;
}

export interface IPreset {
    name: string;
    src: string;
    trg: string;
    size: number;
    sizeType: TSizeType;
    trgFmt: TTargetFileFormat;
}
