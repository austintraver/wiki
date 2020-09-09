---
title: LaTeX
description: "Writing things down, the fancy way!"
date: 2020-02-04T14:52:27-08:00
image: "latex.png"
---

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

* List of packages installed with BasicTeX

  ```sh
  tlmgr info --only-installed
  ```

  ```txt
  i ae: Virtual fonts for T1 encoded CMR-fonts
  i amscls: AMS document classes for LaTeX
  i amsfonts: TeX fonts from the American Mathematical Society
  i amsmath: AMS mathematical facilities for LaTeX
  i anysize: A simple package to set up document margins
  i arabxetex: An ArabTeX-like interface for XeLaTeX
  i atbegshi: Execute stuff at \shipout time
  i attachfile2: Attach files into PDF
  i attachfile2.x86_64-darwin: x86_64-darwin files of attachfile2
  i atveryend: Hooks at the very end of a document
  i automata: Finite state machines, graphs and trees in MetaPost
  i auxhook: Hooks for auxiliary files
  i awesomebox: Draw admonition blocks in your documents, illustrated with FontAwesome icons
  i babel: Multilingual support for Plain TeX or LaTeX
  i babel-basque: Babel contributed support for Basque
  i babel-czech: Babel support for Czech
  i babel-danish: Babel contributed support for Danish
  i babel-dutch: Babel contributed support for Dutch
  i babel-english: Babel support for English
  i babel-finnish: Babel/Polyglossia support for Finnish
  i babel-french: Babel contributed support for French
  i babel-german: Babel support for documents written in German
  i babel-hungarian: Babel support for Hungarian (Magyar)
  i babel-italian: Babel support for Italian text
  i babel-norsk: Babel support for Norwegian
  i babel-polish: Babel support for Polish
  i babel-portuges: Babel support for Portuges
  i babel-spanish: Babel support for Spanish
  i babel-swedish: Babel support for typesetting Swedish
  i babelbib: Multilingual bibliographies
  i bbcard: Bullshit bingo, calendar and baseball-score cards
  i beamer: A LaTeX class for producing presentations and slides
  i bibtex: Process bibliographies for LaTeX, etc
  i bibtex.x86_64-darwin: x86_64-darwin files of bibtex
  i bidi-atbegshi: Bidi-aware shipout macros
  i bidicontour: Bidi-aware coloured contour around text
  i bidipagegrid: Bidi-aware page grid in background
  i bidipresentation: Experimental bidi presentation
  i bidishadowtext: Bidi-aware shadow text
  i bigintcalc: Integer calculations on very large numbers
  i bitset: Handle bit-vector datatype
  i blockdraw_mp: Block diagrams and bond graphs, with MetaPost
  i bookmark: A new bookmark (outline) organization for hyperref
  i booktabs: Publication quality tables in LaTeX
  i bpolynomial: Drawing polynomial functions of up to order 3
  i breqn: Automatic line breaking of displayed equations
  i businesscard-qrcode: Business cards with QR-Code
  i caption: Customising captions in floating environments
  i carlisle: David Carlisle's small packages
  i cite: Improved citation handling in LaTeX
  i cm: Computer Modern fonts
  i cmap: Make PDF files searchable and copyable
  i cmarrows: MetaPost arrows and braces in the Computer Modern style
  i collection-basic: Essential programs and files
  i collection-latex: LaTeX fundamental packages
  i collection-latexrecommended: LaTeX recommended packages
  i collection-metapost: MetaPost and Metafont packages
  i collection-xetex: XeTeX and packages
  i colorprofiles: Collection of free ICC profiles
  i colortbl: Add colour to LaTeX tables
  i cqubeamer: LaTeX Beamer Template for Chongqing University
  i crop: Support for cropmarks
  i ctable: Flexible typesetting of table and figure floats using key/value directives
  i ctablestack: Catcode table stable support
  i dehyph: German hyphenation patterns for traditional orthography
  i drv: Derivation trees with MetaPost
  i dviincl: Include a DVI page into MetaPost output
  i dvipdfmx: An extended version of dvipdfm
  i dvipdfmx.x86_64-darwin: x86_64-darwin files of dvipdfmx
  i dvips: A DVI to PostScript driver
  i dvips.x86_64-darwin: x86_64-darwin files of dvips
  i ec: Computer modern fonts in T1 and TS1 encodings
  i emp: "Encapsulate" MetaPost figures in a document
  i enctex: A TeX extension that translates input on its way into TeX
  i epsincl: Include EPS in MetaPost figures
  i epstopdf-pkg: Call epstopdf "on the fly"
  i eso-pic: Add picture commands (or backgrounds) to every page
  i etex: An extended version of TeX, from the NTS project
  i etex-pkg: E-TeX support package
  i etexcmds: Avoid name clashes with e-TeX commands
  i etoolbox: e-TeX tools for LaTeX
  i euenc: Unicode font encoding definitions for XeTeX
  i euler: Use AMS Euler fonts for math
  i eurosym: Metafont and macros for Euro sign
  i expressg: Diagrams consisting of boxes, lines, and annotations
  i exteps: Include EPS figures in MetaPost
  i extsizes: Extend the standard classes' size options
  i fancybox: Variants of \fbox and other games with boxes
  i fancyhdr: Extensive control of page headers and footers in LaTeX2e
  i fancyref: A LaTeX package for fancy cross-referencing
  i fancyvrb: Sophisticated verbatim text
  i featpost: MetaPost macros for 3D
  i feynmf: Macros and fonts for creating Feynman (and other) diagrams
  i feynmp-auto: Automatic processing of feynmp graphics
  i filehook: Hooks for input files
  i fix2col: Fix miscellaneous two column mode features
  i fixlatvian: Improve Latvian language support in XeLaTeX
  i fiziko: A MetaPost library for physics textbook illustrations
  i float: Improved interface for floating objects
  i font-change-xetex: Macros to change text and mathematics fonts in plain XeTeX
  i fontbook: Generate a font book
  i fontspec: Advanced font selection in XeLaTeX and LuaLaTeX
  i fontwrap: Bind fonts to specific unicode blocks
  i footnotehyper: hyperref aware footnote.sty
  i fp: Fixed point arithmetic
  i garrigues: MetaPost macros for the reproduction of Garrigues' Easter nomogram
  i geometry: Flexible and complete interface to document dimensions
  i gettitlestring: Clean up title references
  i glyphlist: Adobe Glyph List and TeX extensions
  i gmp: Enable integration between MetaPost pictures and LaTeX
  i graphics: The LaTeX standard graphics bundle
  i graphics-cfg: Sample configuration files for LaTeX color and graphics
  i graphics-def: Colour and graphics option files
  i grfext: Manipulate the graphics package's list of extensions
  i grffile: Extended file name support for graphics (legacy package)
  i hatching: MetaPost macros for hatching interior of closed paths
  i hologo: A collection of logos with bookmark support
  i hycolor: Implements colour for packages hyperref and bookmark
  i hyperref: Extensive support for hypertext in LaTeX
  i hyph-utf8: Hyphenation patterns expressed in UTF-8
  i hyphen-base: core hyphenation support files
  i hyphen-basque: Basque hyphenation patterns.
  i hyphen-czech: Czech hyphenation patterns.
  i hyphen-danish: Danish hyphenation patterns.
  i hyphen-dutch: Dutch hyphenation patterns.
  i hyphen-english: English hyphenation patterns.
  i hyphen-finnish: Finnish hyphenation patterns.
  i hyphen-french: French hyphenation patterns.
  i hyphen-german: German hyphenation patterns.
  i hyphen-hungarian: Hungarian hyphenation patterns.
  i hyphen-italian: Italian hyphenation patterns.
  i hyphen-norwegian: Norwegian Bokmal and Nynorsk hyphenation patterns.
  i hyphen-polish: Polish hyphenation patterns.
  i hyphen-portuguese: Portuguese hyphenation patterns.
  i hyphen-spanish: Spanish hyphenation patterns.
  i hyphen-swedish: Swedish hyphenation patterns.
  i hyphenex: US English hyphenation exceptions file
  i ifplatform: Conditionals to test which platform is being used
  i iftex: Am I running under pdfTeX, XeTeX or LuaTeX?
  i index: Extended index for LaTeX including multiple indexes
  i infwarerr: Complete set of information/warning/error message macros
  i intcalc: Expandable arithmetic operations with integers
  i interchar: Managing character class schemes in XeTeX
  i jknapltx: Miscellaneous packages by Joerg Knappen
  i knuth-lib: A small library of Metafont sources
  i knuth-local: Knuth's local information
  i koma-script: A bundle of versatile classes and packages
  i kpathsea: Path searching library for TeX-related files
  i kpathsea.x86_64-darwin: x86_64-darwin files of kpathsea
  i kvdefinekeys: Define keys for use in the kvsetkeys package
  i kvoptions: Key value format for package options
  i kvsetkeys: Key value parser with default handler support
  i l3backend: LaTeX3 backend drivers
  i l3experimental: Experimental LaTeX3 concepts
  i l3kernel: LaTeX3 programming conventions
  i l3packages: High-level LaTeX3 concepts
  i latex: A TeX macro package that defines LaTeX
  i latex-base-dev: Development pre-release of the LaTeX kernel
  i latex-bin: LaTeX executables and man pages
  i latex-bin.x86_64-darwin: x86_64-darwin files of latex-bin
  i latex-fonts: A collection of fonts used in LaTeX distributions
  i latexbug: Bug-classification for LaTeX related bugs
  i latexconfig: configuration files for LaTeX-related formats
  i latexmp: Interface for LaTeX-based typesetting in MetaPost
  i letltxmacro: Let assignment for LaTeX macros
  i lineno: Line numbers on paragraphs
  i listings: Typeset source code listings using LaTeX
  i lm: Latin modern fonts in outline formats
  i lm-math: OpenType maths fonts for Latin Modern
  i ltxcmds: Some LaTeX kernel commands for general use
  i ltxmisc: Miscellaneous LaTeX packages, etc
  i lua-alt-getopt: Process application arguments the same way as getopt_long
  i luahbtex: LuaTeX with HarfBuzz library for glyph shaping
  i luahbtex.x86_64-darwin: x86_64-darwin files of luahbtex
  i lualibs: Additional Lua functions for LuaTeX macro programmers
  i luaotfload: OpenType 'loader' for Plain TeX and LaTeX
  i luaotfload.x86_64-darwin: x86_64-darwin files of luaotfload
  i luatex: The LuaTeX engine
  i luatex.x86_64-darwin: x86_64-darwin files of luatex
  i luatexbase: Basic resource management for LuaTeX code
  i lwarp: Converts LaTeX to HTML
  i lwarp.x86_64-darwin: x86_64-darwin files of lwarp
  i makecmds: The new \makecommand command always (re)defines a command
  i makeindex: Makeindex development sources
  i makeindex.x86_64-darwin: x86_64-darwin files of makeindex
  i mathspec: Specify arbitrary fonts for mathematics in XeTeX
  i mathtools: Mathematical tools to use with amsmath
  i mcf2graph: Draw chemical structure diagrams with Metafont/MetaPost
  i mdwtools: Miscellaneous tools by Mark Wooding
  i memoir: Typeset fiction, non-fiction and mathematical books
  i metafont: A system for specifying fonts
  i metafont.x86_64-darwin: x86_64-darwin files of metafont
  i metago: MetaPost output of Go positions
  i metalogo: Extended TeX logo macros
  i metaobj: MetaPost package providing high-level objects
  i metaplot: Plot-manipulation macros for use in MetaPost
  i metapost: A development of Metafont for creating graphics
  i metapost-colorbrewer: An implementation of the colorbrewer2.org colours for MetaPost
  i metapost.x86_64-darwin: x86_64-darwin files of metapost
  i metauml: MetaPost library for typesetting UML diagrams
  i mflogo: LaTeX support for Metafont logo fonts
  i mfnfss: Packages to typeset oldgerman and pandora fonts in LaTeX
  i mfpic: Draw Metafont/post pictures from (La)TeX commands
  i mfpic4ode: Macros to draw direction fields and solutions of ODEs
  i mfware: Supporting tools for use with Metafont
  i mfware.x86_64-darwin: x86_64-darwin files of mfware
  i microtype: Subliminal refinements towards typographical perfection
  i modes: A collection of Metafont mode_def's
  i mp3d: 3D animations
  i mparrows: MetaPost module with different types of arrow heads
  i mpattern: Patterns in MetaPost
  i mpcolornames: Extend list of predefined colour names for MetaPost
  i mpgraphics: Process and display MetaPost figures inline
  i mptopdf: mpost to PDF, native MetaPost graphics inclusion
  i mptopdf.x86_64-darwin: x86_64-darwin files of mptopdf
  i mptrees: Probability trees with MetaPost
  i ms: Various LaTeX packages by Martin Schroder
  i na-position: Tables of relative positions of curves and asymptotes or tangents in Arabic documents
  i natbib: Flexible bibliography support
  i newfloat: Define new floating environments
  i ntgclass: "European" versions of standard classes
  i oberdiek: A bundle of packages submitted by Heiko Oberdiek
  i parskip: Layout with zero \parindent, non-zero \parskip
  i pdfescape: Implements pdfTeX's escape features using TeX or e-TeX
  i pdflscape: Make landscape pages display as landscape
  i pdfpages: Include PDF documents in LaTeX
  i pdftex: A TeX extension for direct creation of PDF
  i pdftex.x86_64-darwin: x86_64-darwin files of pdftex
  i pdftexcmds: LuaTeX support for pdfTeX utility functions
  i pgf: Create PostScript and PDF graphics in TeX
  i philokalia: A font to typeset the Philokalia Books
  i piechartmp: Draw pie-charts using MetaPost
  i plain: The Plain TeX format
  i polyglossia: An alternative to babel for XeLaTeX and LuaLaTeX
  i psfrag: Replace strings in encapsulated PostScript figures
  i pslatex: Use PostScript fonts by default
  i psnfss: Font support for common PostScript fonts
  i pspicture: PostScript picture support
  i ptext: A 'lipsum' for Persian
  i quran: An easy way to typeset any part of The Holy Quran
  i quran-de: German translations to the quran package
  i ragged2e: Alternative versions of "ragged"-type commands
  i rcs: Use RCS (revision control system) tags in LaTeX documents
  i realscripts: Access OpenType subscript and superscript glyphs
  i refcount: Counter operations with label references
  i repere: Diagrams for school mathematics
  i rerunfilecheck: Checksum based rerun checks on auxiliary files
  i revtex: Styles for various Physics Journals
  i roex: Metafont-PostScript conversions
  i roundrect: MetaPost macros for highly configurable rounded rectangles (optionally with text)
  i sansmath: Maths in a sans font
  i scheme-basic: basic scheme (plain and latex)
  i scheme-infraonly: infrastructure-only scheme (no TeX at all)
  i scheme-minimal: minimal scheme (plain only)
  i scheme-small: small scheme (basic + xetex, metapost, a few languages)
  i section: Modifying section commands in LaTeX
  i seminar: Make overhead slides
  i sepnum: Print numbers in a "friendly" format
  i setspace: Set space between lines
  i shapes: Draw polygons, reentrant stars, and fractions in circles with MetaPost
  i simple-resume-cv: Template for a simple resume or curriculum vitae (CV), in XeLaTeX
  i simple-thesis-dissertation: Template for a simple thesis or dissertation (Ph.D. or master's degree) or technical report, in XeLaTeX
  i slideshow: Generate slideshow with MetaPost
  i splines: MetaPost macros for drawing cubic spline interpolants
  i stringenc: Converting a string between different encodings
  i suanpan: MetaPost macros for drawing Chinese and Japanese abaci
  i subfig: Figures broken into subfigures
  i symbol: URW "Base 35" font pack for LaTeX
  i synctex: engine-level feature synchronizing output and source
  i synctex.x86_64-darwin: x86_64-darwin files of synctex
  i tetragonos: Four-Corner codes of Chinese characters
  i tex: A sophisticated typesetting engine
  i tex-ini-files: Model TeX format creation files
  i tex.x86_64-darwin: x86_64-darwin files of tex
  i texlive-common: TeX Live documentation (common elements)
  i texlive-docindex: top-level TeX Live doc.html, etc.
  i texlive-en: TeX Live manual (English)
  i texlive-msg-translations: translations of the TeX Live installer and TeX Live Manager
  i texlive-scripts: TeX Live infrastructure programs
  i texlive-scripts.x86_64-darwin: x86_64-darwin files of texlive-scripts
  i texlive.infra: basic TeX Live infrastructure
  i texlive.infra.x86_64-darwin: x86_64-darwin files of texlive.infra
  i textcase: Case conversion ignoring mathematics, etc
  i textpath: Setting text along a path with MetaPost
  i threeddice: Create images of dice with one, two, or three faces showing, using MetaPost
  i thumbpdf: Thumbnails for pdfTeX and dvips/ps2pdf
  i thumbpdf.x86_64-darwin: x86_64-darwin files of thumbpdf
  i times: URW "Base 35" font pack for LaTeX
  i tipa: Fonts and macros for IPA phonetics characters
  i tlshell: GUI frontend (tcl/tk-based) for tlmgr
  i tlshell.x86_64-darwin: x86_64-darwin files of tlshell
  i tools: The LaTeX standard tools bundle
  i translator: Easy translation of strings in LaTeX
  i typehtml: Typeset HTML directly from LaTeX
  i ucharcat: Implementation of the (new in 2015) XeTeX \Ucharcat command in lua, for LuaTeX
  i ucharclasses: Font actions in XeTeX according to what is being processed
  i ulem: Package for underlining
  i underscore: Control the behaviour of "_" in text
  i unicode-bidi: Experimental unicode bidi package for XeTeX
  i unicode-data: Unicode data and loaders for TeX
  i unicode-math: Unicode mathematics support for XeTeX and LuaTeX
  i uniquecounter: Provides unlimited unique counter
  i unisugar: Define syntactic sugar for Unicode LaTeX
  i updmap-map: auto-generated font map files
  i upquote: Show "realistic" quotes in verbatim
  i url: Verbatim with URL-sensitive line breaks
  i xcolor: Driver-independent color extensions for LaTeX and pdfLaTeX
  i xdvi: A DVI previewer for the X Window System
  i xdvi.x86_64-darwin: x86_64-darwin files of xdvi
  i xebaposter: Create beautiful scientific Persian/Latin posters using TikZ
  i xechangebar: An extension of package changebar that can be used with XeLaTeX
  i xecjk: Support for CJK documents in XeLaTeX
  i xecolor: Support for color in XeLaTeX
  i xecyr: Using Cyrillic languages in XeTeX
  i xeindex: Automatic index generation for XeLaTeX
  i xelatex-dev: (shortdesc missing)
  i xelatex-dev.x86_64-darwin: x86_64-darwin files of xelatex-dev
  i xesearch: A string finder for XeTeX
  i xespotcolor: Spot colours support for XeLaTeX
  i xetex: An extended variant of TeX for use with Unicode sources
  i xetex-itrans: Itrans input maps for use with XeLaTeX
  i xetex-pstricks: Running PSTricks under XeTeX
  i xetex-tibetan: XeTeX input maps for Unicode Tibetan
  i xetex.x86_64-darwin: x86_64-darwin files of xetex
  i xetexconfig: crop.cfg for XeLaTeX
  i xetexfontinfo: Report font features in XeTeX
  i xetexko: Typeset Korean with Xe(La)TeX
  i xevlna: Insert non-breakable spaces using XeTeX
  i xkeyval: Extension of the keyval package
  i xltxtra: "Extras" for LaTeX users of XeTeX
  i xunicode: Generate Unicode characters from accented glyphs
  i zapfding: URW "Base 35" font pack for LaTeX
  ```

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
