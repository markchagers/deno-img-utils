import type { IPreset } from './model.ts';

// Use this file to create a presets file for recurring workflows
// rename it to 'presets.ts' and fill in your own workflow preferences
export const presets: IPreset[] = [
    {
        name: 'some name',
        src: '/path/to/source/images/',
        trg: '/path/to/output/folder/',
        size: 256,
        sizeType: 'side',
        trgFmt: 'webp',
    },
    {
        name: 'some other name',
        src: '/path/to/another/source/',
        trg: '/path/to/another/folder/',
        size: 4000,
        sizeType: 'area',
        trgFmt: 'jpg',
    },
];
