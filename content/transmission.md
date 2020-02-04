+++
title = "Transmission"
description = "The P2P transfer daemon"
date = 2020-02-04T14:43:27-08:00
image = "transmission.jpg"
+++

# Transmission

{: .notice--danger}
**Disclaimer:** Pirating videos is not only bad, it's illegal. As a result, you should never run the commands below. This is an educational blog post, and I'm educating you guys on exactly what you *shouldn't* do.

## Getting Started

You'll need a few applications on your computer, such as VLC and Homebrew.

* On MacOS

  ```sh
  brew cask install vlc
  brew install python transmission-cli watch
  pip install pirate-get
  ```

* On Linux

  ```sh
  apt install transmission-cli transmission-daemon watch
  pip install pirate-get
  ```


This will install the required programs that you need to use this software.
* `vlc` will play the movies
* `python3` will run the pirating web-scraper
* `transmission-remote` will handle the p2p transfer of data
* `watch` will show the file downloading

{: .notice--warning}
**Warning:** Make sure that after you've completed these commands, you actually launch the daemon for `transmission`. To do this, type the following. If you don't, you'll get an error message `Transmission is not running.`

```sh
brew services start transmission-cli
```

## Searching for a video

To search for the movie you aren't supposed to be pirating, use the `pirate-get` program with the `-t` flag.

Download videos from the TV-Show Seinfeld

```sh
pirate-get -t 'seinfeld'
```

After this page loads, you will see various options to choose from. Simply type the `LINK` index you want to download, and press enter. If you want multiple files, you can download all of them by separating each link number with a space, e.g. `0 2 16` would download link \#0, link \#2, and link \#16


## Viewing downloads

View a real-time status of all transmission files

```sh
watch -n 0.1 'transmission-remote -l'
```

{: .notice--info}
**Tip:** You can close this window by pressing [⌃ C] (or [⌘ .] on Mac OS)

## Playing videos

```sh
vlc -f ~/Downloads/the_downloaded_file_name
```

## Removing Files

```sh
# list all torrent files
transmission-remote -l
# remove and delete torrent ID 2
transmission-remote -t 2 -rad
```

## Starting and Stopping the Daemon

* Starting the daemon

```sh
transmission-daemon
```

* Stopping the daemon

```sh
transmission-remote --exit
```

## Configuration File

Configurations are stored at `~/.config/transmission-daemon`, you can write the following command to dump an initial config file to that location:

```sh
transmission-daemon --dump-settings &> ~/.config/transmission-daemon
```

{: .notice--danger}
**Warning:** Be careful that you don't also have a `~/.config/settings.json`, because `transmission-daemon` will prefer these settings over those in `~/.config/transmission-daemon`

## Specifying a Custom Configuration File Directory

```sh
# Have transmission read the config file from ~/dot/transmission/settings.json
transmission-daemon --config-dir ~/dot/transmission
```

## Print detailed information about a torrent

```sh
transmission-remote -t1 -i
```

## Getting the magnet for a torrent

```sh
# Showing just the magnet
transmission-show -m ~/.config/transmission/torrents/file.txt.torrent
```
