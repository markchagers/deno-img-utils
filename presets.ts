import type { IPreset } from './model.ts';

export const presets: IPreset[] = [
    {
        name: 'webthumbs',
        src: '~/dev/audi/werkfolder/site/',
        trg: '~/dev/audi/src/public/img/site/',
        size: 256,
        sizeType: 'side',
        trgFmt: 'jpg',
    },
    {
        name: 'largeimgs',
        size: 6000,
        sizeType: 'area',
        src: '~/NoBackup/tempfiles/aigen/',
        trg: '~/NoBackup/tempfiles/test/',
        trgFmt: 'jpg',
    },
    {
        name: 'mediumimgs',
        size: 4000,
        sizeType: 'area',
        src: '~/Pictures/fam/raw/',
        trg: '~/NoBackup/tempfiles/test/',
        trgFmt: 'jpg',
    },
];
