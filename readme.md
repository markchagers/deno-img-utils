# Image handling routines for use with Deno

I created this repo for a few scripts that I use to convert images with Deno

Use the tasks in deno.json to execute the scripts:

## iconvrt

This script will convert those pesky .inetloc files that sometimes result
from dragging an image from a safari window to the desktop

first argument is the path to directory that contains those files

```
deno task icvrt <path>
```

## main

The main.ts file is the entry point for a routine to copy and convert source files.
Because I have several sets of input parameters that I reuse regularly, I set up a simple preset system.

### presets

A preset contains parameters for the conversion:

- name: to identify a preset
- src: the source path of the files to process
- trg: the output filepath
- size: a number
- sizeType, the way to interpret the size parameter. Possible values: 'side' or 'area'.
  - 'area': the resulting image will be that number x 1000 pixels large, with it's original aspect ratio. 
  - 'side': the image will be scaled to fit in a square that number of pixels wide and high. 
- trgFmt: the file format of the target images, can be 'webp' or 'jpg'

Source images smaller than the target size will not be scaled up.

Rename the file `presets-example.ts` to `presets.ts` and fill in your own workflow parameters.

You can then specify a preset as the first parameter when running the task:

```
deno task main <preset.name>
```

## start test lint

Development scripts

```
deno task start  // dev server with file watch

deno task test  // what you probably expect

deno task lint  // what you probably expect
```

## tests

Are currently fairly rudimentary 

The directory `testFiles` is used for test images
