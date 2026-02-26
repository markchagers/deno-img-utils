export const sourceFormats = ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'webp'];
export type TSourceFileFormat = (typeof sourceFormats)[number];

const garbageRemoval = /[ ,`;]+/g;

/** Represents a file on disc */
export class DirEntry {
    /**
     * Holds the individual parts of a complete file path
     * Use the static method `fromPathName` to construct a new DirEntry
     *
     * @param srcPath The file path (without the name)
     * @param name The file name (without extension)
     * @param extension The file extension (without leading .)
     * @param correctedName The name with problematic characters removed, or undefined if not different from the name
     */
    constructor(
        readonly srcPath: string,
        readonly name: string,
        readonly extension: TSourceFileFormat,
        readonly correctedName?: string,
        public trgPath?: string,
    ) {}

    /**
     * Construct a new DirEntry object from the path and the full filename
     *
     * @param base The directory the file lives in
     * @param name The Name of the file including extension
     * @returns A DirEntry object
     */
    static fromPathName = (base: string, fullName: string) => {
        const ext: string = fullName.substring(fullName.lastIndexOf('.') + 1);
        const name = fullName.substring(0, fullName.lastIndexOf('.'));
        const clean = name.replace(garbageRemoval, '_');
        const correctedName = name !== clean ? clean : undefined;

        return new DirEntry(base, name, ext, correctedName);
    };
}
