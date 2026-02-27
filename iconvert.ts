import { decodeBase64 } from 'base64';

// This script will convert those pesky .inetloc files that sometimes result
// from dragging an image from a safari window to the desktop

// first argument is the path to directory that contains those files
const dirname = Deno.args[0];

for await (const dirEntry of Deno.readDir(dirname)) {
    const name = dirEntry.name;
    if (!name.endsWith('.inetloc')) {
        continue;
    }
    const decoder = new TextDecoder('utf-8');
    const data = await Deno.readFile(`${dirname}/${name}`);
    const fileContents = decoder.decode(data);
    const base64data = /<key>URL<\/key>\s*<string>(.+?)<\/string>/.exec(fileContents);
    if (base64data) {
        const parts = /data:image\/(\w+);base64,(.+)$/.exec(base64data[1]);
        if (parts) {
            const ext = parts[1];
            const imgData = parts[2];
            const outfile = `${dirname}/${name.slice(0, name.lastIndexOf('.'))}.${ext}`;
            const img = decodeBase64(imgData);
            await Deno.writeFile(outfile, img, { mode: 0o644 });
        }
    }
}
