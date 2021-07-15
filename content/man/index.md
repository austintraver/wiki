---
title: Man
description: "Manual pages from the command line"
date: 2020-02-04T14:52:27-08:00
---

# man

## Getting Started

If you're on macOS, by default you'll be using a pretty old version. The new version can be installed using [Homebrew](/homebrew)

```shell
brew install man-db

# Add the man-db directory to your path
file="/usr/local/opt/man-db/libexec/bin"
>> ~/.zshrc < =(<<<"\npath=(${file} \${path})")
```


## Store cached versions of your manpages

* Creating the cached manpages (catpages) for manpages (requires prior call to `mandb`)

  ```shell
  # As root
  catman -M ${PATH}
  ```


### Useful `man` commands

* View where a manpage is loaded from

  ```shell
  man -w netstat
  ```

  ```txt
  /usr/share/man/man1/netstat.1
  ```

* Viewing where a catpage is loaded from

  ```shell
  man -W netstat
  ```

  ```txt
  /usr/local/var/cache/man/cat1/netstat.1.gz
  ```

### Opening manpages using NeoVim

* Add this line to your `~/.zshrc` to have `nvim` be the default pager for opening up your manpages.

```shell
MANPAGER='nvim +Man!'
```

### Caching manpages

Some manpages take forever to load, even on modern computers. The main culprit that inspired this post was `zshall(1)`, which takes 8 seconds to load on my machine. I was able to get it down to 2 seconds by caching a processed version of each manpage on my computer. Even with over 8,000 manpages, the total size of the cache only ended up being 20MB large.

### `MANPATH`

You shouldn't need to set the `MANPATH` environment variable, but here are some useful commands

* Viewing the path that `man` will search for catpages

```shell
manpath
```

* Viewing the path that `man` will search for catpages

```shell
manpath -c
```

* Creating a database to index manpages:

  ```shell
  # As root
  mandb -c
  ```

* Purging *stray cats* (cached catpages of manpages that no longer exist)

  ```shell
  # As root
  mandb
  ```

## Random Notes

* Filenames should be italicized
* Italicize filenames `.I file.txt`
* Bold references to other manpages `.BR grep (1)`

* When you type `man grep`, what's really happening is:

  ```shell
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

```shell
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

This is a snippet of the introductory content for the `tar(1)` manpage

```groff
.TH TAR 1 "February 4, 2019" "TAR" "GNU TAR Manual"
.SH NAME
tar \- an archiving utility
.SH SYNOPSIS
.SS Traditional usage
\fBtar\fR {\fBA\fR|\fBc\fR|\fBd\fR|\fBr\fR|\fBt\fR|\fBu\fR|\fBx\fR}\
[\fBGnSkUWOmpsMBiajJzZhPlRvwo\fR] [\fIARG\fR...]
.SS UNIX-style usage
.sp
\fBtar\fR \fB\-A\fR [\fIOPTIONS\fR] \fIARCHIVE\fR \fIARCHIVE\fR
.sp
\fBtar\fR \fB\-c\fR [\fB\-f\fR \fIARCHIVE\fR] [\fIOPTIONS\fR] [\fIFILE\fR...]
.sp
\fBtar\fR \fB\-d\fR [\fB\-f\fR \fIARCHIVE\fR] [\fIOPTIONS\fR] [\fIFILE\fR...]
.sp
\fBtar\fR \fB\-t\fR [\fB\-f\fR \fIARCHIVE\fR] [\fIOPTIONS\fR] [\fIMEMBER\fR...]
.sp
\fBtar\fR \fB\-r\fR [\fB\-f\fR \fIARCHIVE\fR] [\fIOPTIONS\fR] [\fIFILE\fR...]
.sp
\fBtar\fR \fB\-u\fR [\fB\-f\fR \fIARCHIVE\fR] [\fIOPTIONS\fR] [\fIFILE\fR...]
.sp
\fBtar\fR \fB\-x\fR [\fB\-f\fR \fIARCHIVE\fR] [\fIOPTIONS\fR] [\fIMEMBER\fR...]
.SS GNU-style usage
.sp
\fBtar\fR {\fB\-\-catenate\fR|\fB\-\-concatenate\fR} [\fIOPTIONS\fR] \fIARCHIVE\fR \fIARCHIVE\fR
.sp
\fBtar\fR \fB\-\-create\fR [\fB\-\-file\fR \fIARCHIVE\fR] [\fIOPTIONS\fR] [\fIFILE\fR...]
.sp
\fBtar\fR {\fB\-\-diff\fR|\fB\-\-compare\fR} [\fB\-\-file\fR \fIARCHIVE\fR] [\fIOPTIONS\fR] [\fIFILE\fR...]
.sp
\fBtar\fR \fB\-\-delete\fR [\fB\-\-file\fR \fIARCHIVE\fR] [\fIOPTIONS\fR] [\fIMEMBER\fR...]
.sp
```

* Optional arguments are between `[brackets]`

  ```txt
  who [am i]
  ```

* Mandatory choose-one style options are `{ inside | braces }`

* `...` means including one-or-more of the preceding item is permitted

## Learn more about manpages

If you want to learn more about how to read manpages, take a look at the following manpages

* `man`
* `catman` 
* `mandb`, 
* `manpath`
* `man.conf`

If you're trying to write a manpage, take a look at these manpages

* `groff_man(7)`: the macro package for `man`
