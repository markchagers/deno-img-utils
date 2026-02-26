import sharp from 'sharp';
import { DirEntry, sourceFormats } from './dir-entry.ts';
import type { IMetaData, TSizeType, TTargetFileFormat } from './model.ts';

const readDirectory = async (path: string) => {
    console.log('readdir: ', path);
    const result: DirEntry[] = [];
    const pathEntries = Deno.readDir(path);
    if (pathEntries) {
        for await (const entry of pathEntries) {
            if (entry.isFile) {
                const newEntry = DirEntry.fromPathName(path, entry.name);
                if (sourceFormats.includes(newEntry.extension)) {
                    result.push(newEntry);
                }
            }
        }
    }
    return result;
};

const checkPath = async (trg: string) => {
    const base = trg.substring(0, trg.lastIndexOf('/'));
    await Deno.mkdir(base, { recursive: true });
};

const deleteThumbs = (paths: string[]) => {
    paths.forEach(async (p) => {
        await Deno.remove(p);
    });
};

const makeThumb = async (
    src: string,
    trg: string,
    size: number,
    trgFmt: TTargetFileFormat,
    sizeType: TSizeType,
) => {
    await checkPath(trg).then(() => {
        const sharpImg = sharp(src);
        sharpImg.metadata().then((metadata) => {
            const { width, height } = calcSize(metadata, size, sizeType);
            const resized = sharpImg.resize({
                width,
                height,
                fit: 'fill',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            });
            if (trgFmt === 'webp') {
                resized.webp({ quality: 90, alphaQuality: 100 }).toFile(trg);
            } else if (trgFmt === 'jpg') {
                resized.jpeg({ quality: 90 }).toFile(trg);
            }
        });
    });
};

const calcSize = (
    metadata: IMetaData,
    size: number,
    sizeType: TSizeType,
): IMetaData => {
    let height = metadata.height;
    let width = metadata.width;
    if (sizeType === 'side' && size <= Math.max(width, height)) {
        // never resize up
        height = metadata.height > metadata.width
            ? size
            : Math.round((size * metadata.height) / metadata.width);
        width = metadata.height > metadata.width
            ? Math.round((size * metadata.width) / metadata.height)
            : size;
    } else if (sizeType === 'area') {
        const totalArea = size * 1000; // arbitrary factor
        const actualArea = metadata.height * metadata.width;
        const factor = Math.sqrt(totalArea / actualArea);
        if (factor < 1) {
            // never resize up
            height = Math.round(metadata.height * factor);
            width = Math.round(metadata.width * factor);
        }
    }
    console.log(metadata.width, metadata.height, width, height, width * height);

    return { width, height };
};

const checkThumb = async (
    entry: DirEntry,
    size: number,
    sizeType: TSizeType,
    format: TTargetFileFormat,
) => {
    const trg = `${entry.trgPath}${
        entry.correctedName ?? entry.name
    }.${format}`;
    const src = `${entry.srcPath}${entry.name}.${entry.extension}`;
    await Deno.stat(trg)
        .then(async (result) => {
            if (result) {
                const srcStat = await Deno.stat(src);
                const trgStat = await Deno.stat(trg);
                if (
                    (trgStat.mtime?.getTime() ?? 0) <
                        (srcStat.mtime?.getTime() ?? 0)
                ) {
                    await makeThumb(src, trg, size, format, sizeType);
                }
            }
        })
        .catch(async (_reason) => {
            await makeThumb(src, trg, size, format, sizeType);
        });
};

export {
    calcSize,
    checkPath,
    checkThumb,
    deleteThumbs,
    makeThumb,
    readDirectory,
};
