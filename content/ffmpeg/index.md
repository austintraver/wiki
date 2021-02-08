---
title: FFmpeg
description: "Encoding video/audio straight from the command line"
date: 2020-02-04T14:52:27-08:00
---

# FFmpeg

* Installing ffmpeg on macOS

    ```shell script
    brew install ffmpeg
    ```

## Filetype Conversions

Conversions between filetypes is usually as easy as the following example

* Encode an MP3 audio file `input.mp3` as an AIFF file, and save it as
  `output.aiff`

    ```shell script
    ffmpeg -i 'input.mp3' 'output.aiff'
    ```

* Convert an MP3 file `song.mp3` into M4A format:

    * Using `avconvert`:

        ```shell script
        avconvert -p 'PresetAppleM4A' -s 'song.mp3' -o 'song.m4a'
        ```

    * Using `ffmpeg`:

        ```shell script
        ffmpeg -i 'song.mp3' -c:a aac -c:v copy 'book.m4a'
        ```

* Encode an MP4 video file `input.mp4` as a GIF file, and save it as `output.gif`

    ```shell script
    ffmpeg -i 'input.mp4' 'output.gif'
    ```

* Encode an audiobook AAX file `input.aax` as a M4B file, and save it as `output.m4b`

    ```shell script
    # Assuming you know the activation bytes of your file...
    ffmpeg -activation_bytes ${ACTIVATION_BYTES} -i 'book.aax' -c copy 'book.m4b'
    ```

* Convert an MP3 file `book.mp3` into an M4B audiobook:

    * Using ffmpeg:

        ```shell script
        ffmpeg -i 'book.mp3' -c:a aac -c:v copy 'book.m4b'
        ```

        ```shell script
        mp3='book.mp3'
        m4a=${mp3:r}.m4a
        m4b=${m4a:r}.m4b
        jpeg=${mp3:r}.jpeg

        # Extract the cover art from an MP3 file
        ffmpeg \
            -i ${mp3} \
            -map 0:v \
            -map -0:V \
            -c copy \
            ${jpeg}

        # https://stackoverflow.com/questions/18710992/how-to-add-album-art-with-ffmpeg
        # Convert the audiobook from MP3 to M4B
        # preserving the existing cover art
        ffmpeg \
            -i ${mp3} \
            -i ${jpeg} \
            -map 0:0 \
            -map 1:0 \
            -c:a aac \
            -c:v copy \
            -id3v2_version 4 \
            -metadata:s:v title="Album cover" \
            -metadata:s:v comment="Cover (front)" \
            ${m4b}
        ```




* Convert each MP3 audio file in the current folder as an M4A file, save it with
  the same name, (i.e., `example.mp3` → `example.m4a`)

    ```shell script
    # For each audiobook in the folder
    for audiobook in *.mp3; do
        ffmpeg -i ${audiobook} -c:a aac -c:v copy ${audiobook:r}.m4a;
    done
    ```

## Useful Arguments

* `-f <format>`: Forcibly specify the input/output format, (usually set
  automatically)
* `-y`: Automatically overwrite files without asking
* `-i <ifile>`: Specify an input filename
* `-loglevel panic`: Reduce the verbosity of `ffmpeg` (in this case, silence it)
* `loglevel quiet -stats`: Don't print any output other than the a one-line "progress report" of the conversion that's currently underway
* `-activation_bytes <hash>`: The hexadecimal activation bytes used to decrypt
  Audible's DRM

* Overwrite the file `exists.mp4` without prompting for confirmation

    ```shell script
    touch exists.mp4
    ffmpeg -i 'input.mp4' -y 'exists.mp4'
    ```

## Merging audio files

* Concatenate multiple MP3 files together, into a single merged MP3 file

    * Example 1

        ```shell script
        ls *.mp3 | sort | sed 's/^/file /g' > 'files.txt'
        ffmpeg -f 'concat' -i 'files.txt' -c copy 'merged.mp3'
        ```

    * Example 2

        ```shell script
        # Create a string to specify which files to concatenate
        ifile="concat:one.mp3|two.mp3|three.mp3"

        # Concatenate the files
        ffmpeg -i ${ifile} -c:a copy -map_metadata 0:1 ofile.mp3
        ```

* Extract the cover art from music file `input.m4b

    ```shell script
    ffmpeg -i 'input.m4b' -map 0:v -map -0:V -c copy 'cover_art.jpg'
    ```

* Convert every MKV file in a folder to MP4 format

    ```shell script
    for file in ~/episodes/*.mkv; do
        ffmpeg -i ${file} ${file:0:(-4)}.mp4;
    done
    ```


* Use the built-in camera to take a photo

    ```shell script
    ffmpeg \
        -f 'avfoundation' \
        -video_size '1280x720' \
        -framerate 30 \
        -i 0 \
        -vframes 1 \
        './output.jpg'
    ```

* Use the built-in microphone to record audio

    ```shell script
    # `-f` force the use of AVFoundation format
    # `-i :1` record audio from the built-in microphone
    # `-t 10` record audio for 10 seconds
    ffmpeg -f avfoundation -i ":1" -t 10 'output.mp3'
    ```

* Use the system default camera and microphone to record a video

    ```shell script
    typeset -i duration=4
    typeset -i framerate=30

    ffmpeg -f 'avfoundation' \
        -video_size '1280x720' \
        -framerate ${framerate} \
        -i '0:0' \
        -vframes $((${framerate}*${duration})) \
        './output.mkv'
    ```
