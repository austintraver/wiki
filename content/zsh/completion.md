---
title: 'Completion'
date: '2020-10-28T22:34:29-07:00'
draft: true
---

# Introduction

The official documentation for writing zsh completion functions is difficult to understand, and doesn’t give many examples. At the time of writing this document I was able to find a few other tutorials on the web, however those tutorials only explain a small portion of the capabilities of the completion system. This document aims to cover areas not explained elsewhere, with examples, so that you can learn how to write more advanced completion functions. I do not go into all the details, but will give enough information and examples to get you up and running. If you need more details you can look it up for yourself in the official documentation.

Please make any scripts that you create publicly available for others (e.g. by forking this repo and making a pull request). Also if you have any more information to add or improvements to make to this tutorial, please do.


# Getting Started

## Automatically load completion functions for a command

If completion functions are within a file, and that file is within one of the directories present in the `${fpath}` array, the completions will automatically load for the command the moment the user attempts to trigger a completion for the given command. 

The first line of a completion function file is special, and is as follows

```txt
#compdef {{< var COMMAND >}}
```

As a matter of convention, the file for {{< var COMMAND >}} would have the same name, prepended with an underscore. For example, if {{< var COMMAND >}} was `hugo`, the completion file would be named `_hugo` and placed in one of the directories specified by the `${fpath}` array.

If you're writing your own custom completions, it's easier to debug the completion functions by linking them manually, more on this in the next section.

## Manually specifying the completion function for a command

```shell script
compdef {{< var \_COMMAND >}} {{< var COMMAND >}}
```
