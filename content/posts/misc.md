+++
title = "Misc"
description = "I had to write it down somewhere..."
date = 2020-02-04T14:52:27-08:00
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
# `mutt`

* Installing `mutt`

  ```sh
  # Using Mutt
  brew install mutt
  # Using NeoMutt
  brew install neomutt
  ```

* Example configuration file

  ```txt
  set realname = "Tommy Trojan"
  set smtp_url = "smtp://tommytrojan@smtp.mail.me.com:587/"
  set smtp_pass = "1234-abcd-1234-abcd"
  set smtp_authenticators = 'gssapi:login'
  set imap_user = "tommytrojan"
  set imap_pass = "1234-abcd-1234-abcd"
  set from = "tommytrojan@icloud.com"
  set folder = "imaps://tommytrojan@imap.mail.me.com:993"
  set spoolfile = "+INBOX"
  set postponed = "+Drafts"
  set record = "+Sent Messages"
  set trash = "+Trash"
  unset beep_new # Don't beep for new messages
  set imap_pipeline_depth = 0
  set header_cache = "$XDG_CACHE_HOME/mutt/headers"
  set message_cachedir = "$XDG_CACHE_HOME/mutt/bodies"
  set certificate_file = "$XDG_CACHE_HOME/mutt/certificates"
  set sort=reverse-date-sent
  set assumed_charset="utf-8"
  set attach_charset="utf-8"
  set charset="utf-8"
  # Don't try to add a copy to sent folder (throws error in batch mode)
  set copy = no
  # Don't include original message in reply
  unset include
  # Don't show the help menu at the top of the screen
  unset help

  # Configure keybindings
  bind index = noop
  bind index g first-entry
  bind pager g top
  bind index * noop
  bind index G last-entry
  bind pager G bottom
  bind pager <Down> next-line
  bind pager j next-line
  bind pager <Up> previous-line
  bind pager k previous-line
  bind index o display-message
  bind index n noop
  bind index m mail
  bind index,pager \Cwq quit

  # Configure inbox style
  color indicator brightblue default
  ```

## ImageMagick

* Compress a PDF to a smaller size file

  ```sh
  convert 'input.pdf' -format 'JPG' -quality 10 'output.pdf'
  ```
