---
title: FFmpeg
description: "Encoding video/audio straight from the command line"
date: 2020-02-04T14:52:27-08:00
---

# FFmpeg

* Installing ffmpeg on macOS

    ```sh
    brew install ffmpeg
    ```

## Filetype Conversions

Conversions between filetypes is usually as easy as the following example

* Encode an MP3 audio file `input.mp3` as an AIFF file, and save it as `output.aiff`

  ```sh
  ffmpeg -i input.mp3 output.aiff
  ```

* Encode an MP4 video file `input.mp4` as a GIF file, and save it as `output.gif`

  ```sh
  ffmpeg -i input.mp4 output.gif
  ```

* Encode an audiobook AAX file `input.aax` as a M4B file, and save it as `output.m4b`

    ```sh
    # Assuming you know the activation bytes of your file...
    ffmpeg -activation_bytes ${ACTIVATION_BYTES} -i 'book.aax' -c copy 'book.m4b'
    ```

* Encode each MP3 audio file in the current folder as an M4A file, save it with the same name, (i.e., `example.mp3` → `example.m4a`)

  ```sh
  # For each audiobook in the folder
  for audiobook in *.mp3; do
    ffmpeg -i ${audiobook} -c:a aac -c:v copy ${audiobook:r}.m4a;
  done
  ```

## Useful Arguments

* `-f <format>`: Forcibly specify the input/output format, (usually set automatically)
* `-y`: Automatically overwrite files without asking
* `-i <ifile>`: Specify an input filename
* `-loglevel panic`: Reduce the verbosity of `ffmpeg` (in this case, silence it)
* `-activation_bytes <hash>`: The hexadecimal activation bytes used to decrypt Audible's DRM

* Overwrite the file `exists.mp4` without prompting for confirmation

  ```sh
  touch exists.mp4
  ffmpeg -i 'input.mp4' -y 'exists.mp4'
  ```

## Merging audio files

* Merge all files ending with `.mp3` into a single file named `merged.mp3`

```sh
ls *.mp3 | sort | sed 's/^/file /g' > 'files.txt'
ffmpeg -f 'concat' -i 'files.txt' -c copy 'merged.mp3'
```

## Extract cover art from a media file

* Create file `cover_art.jpg` from the audio file `input.m4b`

  ```sh
  ffmpeg -i 'input.m4b' -map 0:v -map -0:V -c copy 'cover_art.jpg'
  ```

## Convert mkv to mp4

  ```sh
  for file in ~/episodes/*.mkv; do
    ffmpeg -i ${file} ${file:0:(-4)}.mp4;
  done
  ```

## Concatenate Multiple `.mp3` Files


  ```sh
  # Create a string to specify which files to concatenate
  typeset ifile="concat:one.mp3|two.mp3|three.mp3"

  # Concatenate the files
  ffmpeg -i ${ifile} -c:a copy -map_metadata 0:1 ofile.mp3
  ```

## Taking a Photo using only a Command Line

  ```sh
	ffmpeg \
		-f 'avfoundation' \
		-video_size '1280x720' \
		-framerate 30 \
		-i 0 \
		-vframes 1 \
	./output.jpg
  ```
