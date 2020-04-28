+++
title = "LaTeX"
description = "Writing things down, the fancy way!"
date = 2020-02-04T14:52:27-08:00
image = "latex.png"
+++

# TeX

TeX is a typesetting engine, which lays out the text on a document.

## LaTeX

LaTeX is a typesetting format, it adds to TeX a large set of macros one can use to layout a document.

## BasicTeX

BasicTeX is an installation package based on Tex Live, which is a TeX *distribution*. BasicTeX is deliberately small, weighing in at around 80MB, Unlike MacTeX, a larger innstallation package which is 4GB large. BasicTeX includes all the tools needed to create with the TeX typesetting engine:

	* TeX
	* LaTeX
	* pdfTeX
	* MetaFont
	* dvips
	* MetaPost
	* XeTeX
	* AMSTeX

## The Font

The font you see when reading a TeX formatted document is a unique font, initially designed by Donald Knuth, named *Computer Modern*. Although this font still exists, its successor, *Latin Modern*, is the default font used by LaTeX and the American Math Society, due to its exist

## CTAN

The *Comprehensive TeX Archive Network* (CTAN) is the main source of TeX software.

## TeX Live Manager

The TeX Live Manager is a program (`tlmgr`) for TeX package management.

* Setting the paper size to US letter (8.5" x 11")

	```sh
	sudo tlmgr paper letter
	```

## XeTeX

XeTeX is an extension of TeX that adds support for

	1. Unicode text encoding
	2. TrueType `.ttf` and OpenType `.otf` fonts

## HelloWorld in LaTeX

```tex
\documentclass{article}
\begin{document}
Hello World!
\end{document}
```

## Basic Logical Statement

```tex
\documentclass{article}
\usepackage{amsmath}
\begin{document}

$A \implies B$

\end{document}
```

## The Preamble

The preamble is defined as: everything before the `\begin{document}` portion of the LaTeX document

```tex
\documentclass[12pt, letterpaper]{article} % 12pt font, standard US paper size
 % specifies the document type
\usepackage[utf8]{inputenc}
\title{Austin's LaTeX Document}
\author{Austin Traver}
\thanks{sponsored by Splay Tree Capital}
\date{\today} % automaticically formats date
% \date{February 12 2014} also works

\begin{document}

\maketitle
We have now added a title, author, and date to our first \LaTeX{} document!

\end{document}
```

## Bold, Italics, Underlining

```tex
Some of the \textbf{greatest}
discoveries in \underline{science}
were made by \textbf{\textit{accident}}.
```

## Adding Images

```tex
\documentclass{article}
\usepackage{graphicx} % package for using graphics
\graphicspath{ {images/} } % filepath in Overleaf

\begin{document}
The universe is immense.
\includegraphics{universe} % picture inserted here
% the picture's filename is "universe"
Look at the picture above!
\end{document}
```
