+++
title = "Man"
description = "Manual pages from the command line"
date = 2020-02-04T14:43:27-08:00
image = "man.png"
+++

# man

If you're trying to write a manpage, you should consult the macro package for `man`, which can be done with `man 7 groff_man`

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

Example:

  ```groff
  .PP
  .TS
  l l l.
  Macro	Meaning	Subsection
  .T&
  lB l l.
  _
  \&.B	Bold	Font style macros
  \&.BI	Bold, italic alternating	Font style macros
  \&.BR	Bold, roman alternating	Font style macros
  \&.EE	Example end	Document structure macros
  \&.EX	Example begin	Document structure macros
  \&.I	Italic	Font style macros
  \&.IB	Italic, bold alternating	Font style macros
  \&.IP	Indented paragraph	Paragraph macros
  \&.IR	Italic, roman alternating	Font style macros
  \&.LP	(Left) paragraph	Paragraph macros
  \&.ME	Mail-to end	Hyperlink and email macros
  \&.MT	Mail-to start	Hyperlink and email macros
  \&.OP	(Command-line) option	Command synopsis macros
  \&.P	Paragraph	Paragraph macros
  \&.PP	Paragraph	Paragraph macros
  \&.RB	Roman, bold alternating	Font style macros
  \&.RE	Relative-indent end	Document structure macros
  \&.RI	Roman, italic alternating	Font style macros
  \&.RS	Relative-indent start	Document structure macros
  \&.SB	Small bold	Font style macros
  \&.SH	Section heading	Document structure macros
  \&.SM	Small	Font style macros
  \&.SS	Subection heading	Document structure macros
  \&.SY	Synopsis start	Command synopsis macros
  \&.TH	Title heading	Document structure macros
  \&.TP	Tagged paragraph	Paragraph macros
  \&.TQ	Tagged paragraph continuation	Paragraph macros
  \&.UE	URL end	Hyperlink and email macros
  \&.UR	URL start	Hyperlink and email macros
  \&.YS	Synopsis end	Command synopsis macros
  .TE
  ```

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
