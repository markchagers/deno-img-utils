import { calcSize, readDirectory } from './img-util.ts';
import { describe, it } from 'bdd';
import { expect } from 'expect';
import type { IMetaData } from './model.ts';

describe('Utils', () => {
    it('readDirectory', async () => {
        const result = await readDirectory('./testFiles');
        expect(result).not.toEqual([]);
    });

    it('calcSize', () => {
        const entry: IMetaData = { height: 300, width: 200 };
        const result = calcSize(entry, 5000, 'area');
        expect(result).toEqual(entry);
    });
});
