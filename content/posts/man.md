+++
title = "Man"
description = "Manual pages from the command line"
date = 2020-02-04T14:52:27-08:00
image = "man.png"
+++

# man

## Using Manpages

* If you're trying to write a manpage, you should consult the macro package for `man`, which can be done with `man 7 groff_man`

* If you're trying to use manpages, you should take a look at `man` `catman` `mandb`, `manpath`, and `man.conf`


### Useful `man` commands

* View where a manpage is loaded from

  ```sh
  man -w netstat
  ```

  ```txt
  /usr/share/man/man1/netstat.1
  ```

* Viewing where a catpage is loaded from

  ```sh
  man -W netstat
  ```

  ```txt
  /usr/local/var/cache/man/cat1/netstat.1.gz
  ```

### macOS

* The `man` application that comes stock in macOS is very old, it's best to update it by installing the edition provided by homebrew

```sh
brew install man-db
```

* Since this Homebrew package is installed *Keg-only*, you'll also need to add this line to your `~/.zshrc`:

```sh
path=(/usr/local/opt/man-db/libexec/bin ${path})
```

### Opening manpages using NeoVim

* Add this line to your `~/.zshrc` to have `nvim` be the default pager for opening up your manpages.

```sh
MANPAGER='nvim +Man!'
```

### Caching manpages

Some manpages take forever to load, even on modern computers. The main culprit that inspired this post was `zshall(1)`, which takes 8 seconds to load on my machine. I was able to get it down to 2 seconds by caching a processed version of each manpage on my computer. Even with over 8,000 manpages, the total size of the cache only ended up being 20MB large.

### `MANPATH`

You shouldn't need to set the `MANPATH` environment variable, but here are some useful commands

* Viewing the path that `man` will search for catpages

```sh
manpath
```

* Viewing the path that `man` will search for catpages

```sh
manpath -c
```

* Creating a database to index manpages:

  ```sh
  # As root
  mandb -c
  ```

* Creating the catpages for manpages (requires prior call to `mandb`)

  ```sh
  # As root
  catman
  ```

* Purging *stray cats* (cached catpages of manpages that no longer exist)

  ```sh
  # As root
  mandb
  ```

## Random Notes

* Filenames should be italicized
* Italicize filenames `.I file.txt`
* Bold references to other manpages `.BR grep (1)`

* When you type `man grep`, what's really happening is:

  ```sh
  # command:
  man 1 grep

  # actual pipeline:
  cat /usr/share/man/man1/grep.1 \
    | /usr/bin/tbl \
    | /usr/bin/troff -Wall -mtty-char -mmandoc -Tutf8 \
    | /usr/bin/grotty \
    | /usr/bin/less
  ```

## Making a PDF of a manpage

```sh
# Saving the produced manpage before opening it
man -t grep > ./grep.ps
open -a 'Preview' ./grep.ps

# Directly opening the file through a pipe
man -t grep | open -f -a 'Preview'
```

## Useful statements macros

* `.\"`: Comment, doesn't render on the document

* `.B`: Bold
* `.I`: Italic

* `.TH`: Title heading
* `.SH`: Section heading
* `.P`: Paragraph

## Making a table

* `.TS`: Start of a table
* `.TE`: End of a table
## Useful macros

* `\&.`: A literal "." that must start at the beginning of a line
* `\(co`: Copyright Symbol
* `\(tm`: Trademark Symbol

## Anatomy of a Manpage

1. `TH`: Title heading

  - Structure: `.TH <TITLE> [manpage section] [date of last modification] [subtitle]`

  - Example:

  ```groff
  .TH "LS" "1" "March 2019" "GNU coreutils" "List Files"
  ```

2. `SH`: Section Heading

  - Structure: `.SH`

  - Example:

  ```groff

  ```

## Manpage Formatting

* Optional arguments are between `[brackets]`

  ```txt
  who [am i]
  ```

* Mandatory choose-one style options are `{ inside | braces }`

* `...` means including one-or-more of the preceding item is permitted


