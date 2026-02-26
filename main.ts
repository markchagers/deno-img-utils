import { checkThumb, readDirectory } from './img-util.ts';
import { presets } from './presets.ts';

const preset = Deno.args[0];
const pres = presets.find((p) => p.name === preset) ?? presets[0];

await readDirectory(pres.src).then((result) => {
    for (const [_i, entry] of result.entries()) {
        entry.trgPath = pres.trg;
        checkThumb(entry, pres.size, pres.sizeType, pres.trgFmt);
    }
});
