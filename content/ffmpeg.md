+++
title = "FFmpeg"
description = "Encoding video/audio straight from the command line"
date = 2020-02-04T07:32:16-08:00
image = "ffmpeg.png"
+++

# FFmpeg

# `ffmpeg`

## Getting Started

```sh
brew install ffmpeg
```

### Conversion between filetypes

* Convert `input.mp3` to `output.aiff`

  ```sh
  ffmpeg -i input.mp3 output.aiff
  ```

### Making GIFs

* Convert a video file `input.mp4` into `output.gif`

  ```sh
  ffmpeg -i input.mp4 output.gif
  ```

## Useful Arguments

* `-f <format>`: Forcibly specify the input/output format, (usually set automatically)
* `-y`: Automatically overwrite files without asking
* `-i <ifile>`: Specify an input filename
* `-loglevel panic`: Reduce the verbosity of `ffmpeg` (in this case, silence it)
* `-activation_bytes <hash>`: The hexadecimal activation bytes used to decrypt Audible's DRM

## Examples of flag usage

* Override the file without asking with `-y`

  ```sh
  ffmpeg -i 'input.mp4' -y 'exists.mp4'
  ```

## Merging audio files

* Merge all files ending with `.mp3` into a single file named `merged.mp3`

```sh
ls *.mp3 | sort | sed 's/^/file /g' > 'files.txt'
ffmpeg -f 'concat' -i 'files.txt' -c copy 'merged.mp3'
```

## Convert `.aax` files to `.m4a`

Assuming you know the activation bytes of your file...

* Convert the audiobook `input.aax` to `output.m4b`

  ```sh
  ffmpeg -activation_bytes 123abc -i input.aax -c copy output.m4b
  ```

## Extract cover art from a media file

* Create file `cover_art.jpg` from the audio file `input.m4b`

  ```sh
  ffmpeg -i 'input.m4b' -map 0:v -map -0:V -c copy 'cover_art.jpg'
  ```

## Convert mkv to mp4

  ```sh
  for file in ~/episodes/*.mkv; do ffmpeg -i ${file} ${file:0:(-4)}.mp4; done
  ```
