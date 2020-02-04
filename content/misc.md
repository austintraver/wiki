+++
title = "Misc"
description = "I had to write it down somewhere..."
date = 2020-01-30T20:14:57-08:00
image = "misc.png"
+++

# Misc

A section dedicated to other applications and tools worth getting to know.

# `keka`

[Keka](https://www.keka.io/en/) is an amazing application, that was suggested to me by one of my IT professors at USC.

* Getting Started

  ```sh
  brew cask install keka kekadefaultapp
  ```

Then, open `keka`, configure your preferences, and set keka to be your default app. Now you can compress and decompress any file on your computer by pressing ⌃ ⇧ K

`keka` will automatically know which action to perform based on the file it received as input. It will use the configurations you specified in the app. I recommend GNU's `.gzip` files because they use an algorithm that is superior in compression to the one used in Microsoft's `.zip` filetype. Also, because `tar` uses `gzip` so it's a good idea to get started.

# `figlet`

## `figlet` I/O

### Examples

input file :arrow_right: terminal
```sh
figlet -p < ifile.txt
```

terminal :arrow_right: terminal
```sh
figlet Hello World
```

terminal :arrow_right: output file
```sh
figlet -p < ifile.txt > ofile.txt
```

file :arrow_right: file
```sh
figlet Hello World > ofile.txt
```

# `spectacle`

This is a great app that my friend Russel showed me. If you work on a laptop, managing your screen space is important. Unfortunately there aren't many built-in keybindings to resize and maximize applications. Although the gesture-based resizing is graceful and pretty, they aren't very useful because the animations are so slow.

* Getting Started

  ```sh
  brew cask install spectacle
  ```

Open up `spectacle` in the finder, and then enable accessibility access on your computer. You're all set up to use shortcuts to resize windows on your computer.

# `lsyncd`

The `lsyncd` program allows bi-directional syncing of files between a local and remote host. If you have a folder that you make changes to often, it would be useful to just change once, update everywhere.

* Installing `lsyncd`

  ```sh
  # macOS
  brew install lsyncd
  # Debian distro
  apt install lsyncd
  ```
