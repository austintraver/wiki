+++
title = "LaTeX"
description = "Writing things down, the fancy way!"
date = 2020-01-30T20:14:57-08:00
image = "latex.png"
+++

# LaTeX

## HelloWorld in LaTeX

```latex
\documentclass{article}
\begin{document}
Hello World!
\end{document}
```

## The Preamble

The preamble is defined as: everything before the `​\begin{document}`​ portion of the LaTeX document

```latex
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

```latex
Some of the \textbf{greatest}
discoveries in \underline{science}
were made by \textbf{\textit{accident}}.
```

## Adding Images

```latex
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
