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

export const getLargeImgPreset = (): IPreset => ({
    name: 'Large Images',
    size: 6000,
    sizeType: 'area',
    src: '/Users/mark/NoBackup/tempfiles/aigen/',
    trg: '/Users/mark/NoBackup/tempfiles/test/',
    trgFmt: 'jpg',
});
