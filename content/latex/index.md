---
title: LaTeX
description: "Writing things down, the fancy way!"
date: 2020-02-04T14:52:27-08:00
draft: false
---

# TeX

TeX is a typesetting engine, which lays out the text on a document.

## LaTeX

LaTeX is a typesetting format, it adds to TeX a large set of macros one can use to layout a document.

## BasicTeX

BasicTeX is an installation package based on Tex Live, which is a TeX
*distribution*. BasicTeX is deliberately small, weighing in at around 80MB,
Unlike MacTeX, a larger innstallation package which is 4GB large. BasicTeX
includes all the tools needed to create with the TeX typesetting engine

    * TeX
    * LaTeX
    * pdfTeX
    * MetaFont
    * dvips
    * MetaPost
    * XeTeX
    * AMSTeX

### Building BasicTeX from source

You'll need this `texlive.profile` file before running the commands below

Also, learned some of this from following along with the article
[Install TeX Live over the internet](https://tug.org/texlive/acquire-netinstall.html)

```text

```


```shell script
open http://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
curl http://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz -o ~/Downloads/texlive.tgz
tar -xzf ~/Downloads/texlive.tgz -C ~/Downloads/texlive

cd ~/Downloads/texlive
./install-tl -no-gui -portable -no-verify-downloads -profile texlive.profile
```


* List of packages installed with BasicTeX

  ```shell script
  tlmgr info --only-installed
  ```

## The Font

The font you see when reading a TeX formatted document is a unique font, initially designed by Donald Knuth, named *Computer Modern*. Although this font still exists, its successor, *Latin Modern*, is the default font used by LaTeX and the American Math Society, due to its exist

## CTAN

The *Comprehensive TeX Archive Network* (CTAN) is the main source of TeX software.

## TeX Live Manager

The TeX Live Manager is a program (`tlmgr`) for TeX package management.

* Setting the paper size to US letter (8.5" x 11")

    ```shell script
    sudo tlmgr paper letter
    ```

## XeTeX

XeTeX is an extension of TeX that adds support for

1. Unicode text encoding
1. TrueType `.ttf` and OpenType `.otf` fonts

## HelloWorld in LaTeX

* A basic `Hello world!` example in LaTeX

    ```tex
    \documentclass{article}
    \begin{document}
    Hello world!
    \end{document}
    ```

* Structure of a basic logical statement

```tex
\documentclass{article}
\usepackage{amsmath}
\begin{document}

$A \implies B$

\end{document}
```

## The preamble

The preamble includes anything that appears in the file before the
`\begin{document}` macro

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

## A whole document

```tex
\documentclass[12pt, letterpaper, twoside]{article}
\usepackage[utf8]{inputenc}

% 12pt: a "point" (pt) is roughly 1/3 of a millimeter (0.35mm)

\title{Practice}
\author{Austin Traver}

% \today renders as "January 21, 2020"
\date{\today}

% Set the length of the initial paragraph indent to 4 chars
\setlength{\parindent}{4em}

% Set the length of space between paragraphs to 1 char
\setlength{\parskip}{1em}

% Add one inch margins to all sides
\usepackage[margin=1in]{geometry}

% Start the document
\begin{document}

% Make the title
\maketitle

% Set the length of space within lines of a paragraph to 24pt
\setlength{\baselineskip}{24pt}

Somebody once told me.

This is the text in first paragraph. This is the text in first
paragraph. This is the text in first paragraph. \par
This is the text in second paragraph. This is the text in second
paragraph. This is the text in second paragraph.

This is the text in third paragraph. Putting a double-space between two lines is the traditional way to separate paragraphs. This is the text in third paragraph.

\newtheorem{theorem}{Theorem}
\newtheorem{lemma}[theorem]{Lemma}

\section{Introduction}

% Stating a theorem
\begin{theorem}
Let $f$ be a function whose derivative exists in every point, then $f$
is a continuous function.
\end{theorem}

% Stating a lemma
\begin{lemma}
Given two line segments whose lengths are $a$ and $b$ respectively there
is a real number $r$ such that $b=ra$.
\end{lemma}


Let \( \mathcal{T} \) be a topological space, a basis is defined as

% Start of a single line
\[
     \mathcal{B} = \{B_{\alpha} \in \mathcal{T}\, |\,
     U = \cup B_{\alpha} \forall U \in \mathcal{T} \}
% End of a single line
\]


Let $r$ be the rate of return (annual)
Let $t$ be the duration of the investment (in years)

% End the document
\end{document}
```

## Useful links

* [List of LaTeX Mathematical Symbols](https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols)
