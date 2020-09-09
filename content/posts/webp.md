---
title: WebP
description: A new image format for the web
date: 2020-08-18T17:20:48-07:00
draft: true
---

* [Link to project homepage](https://developers.google.com/speed/webp/)

## [Getting Started](https://developers.google.com/speed/webp/docs/using)

### `cwebp` Encoder

* [Link to documentation](https://developers.google.com/speed/webp/docs/cwebp)

* Compress PNG file `image.png` to WebP file `image.webp` (with quality range of 80)

  ```sh
  cwebp -q 80 image.png -o image.webp
  ```

### `dwebp` Decoder

* [Link to documentation](https://developers.google.com/speed/webp/docs/dwebp)

* Decode WebP file `image.webp` to PNG file `image.png`

  ```sh
  dwebp image.webp -o image.png
  ```
