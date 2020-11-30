---
title: Less
description: "The UNIX terminal pager program"
date: 2019-04-24T12:39:27-08:00
draft: false
---

# `less`

## Why it's called `less`?

So why is it called less? Well, you may have heard the aphorism "less is more."
This saying is true in our daily lives, but did you know it's also true for your
computer?

In the 1980s, a popular terminal pager called `more` was frequently used to read
in text line-by-line on a computer's terminal. The problem with `more`, however,
was that `more` is not able to scroll backwards. As a result, Mark Nudelman
wrote a "backwards `more`" program, which he named `less`. When asked why he
chose the name, he cleverly replied:

> because `less` is `more` - Mark Nudelman

When you type `$ man grep` on your terminal, the navigation is different from
how onw would, say, inspect a file in Safari. For instance, you might be
wondering how to close the man file. If you jumped for `⌃ C` then you're not
alone. However, pressing `q` is the keybinding to exit from the `less` pager,
which is the program used to render the text output by the `man` command.

For this reason, the keybindings that work for the page produced by the command
`$ man grep` will not change if you viewed, say, `example.txt` with the command
`$ less example.txt`

If you don't know the `less` keybindings, then congratulations! I didn't either.
For your convenience and mine, I've provided them below.

### Navigation Keys

Conveniently, they are pretty compatible with `vi`. You can use the `K` & `J`
keys to move down & up, the same way you would in `vi`. Since pagers are a
read-only environment, `less` pegs the cursor at the last row. Alternatively,
you can use `vi`'s scrolling keys (`⌃ E` and `^ K`) if you prefer, as these
work in `less` as well.


|Key-Binding|Command|
|:---:|:---:|
|E or J|Scroll down 1 line|
|Y or K|Scroll up 1 line|
|<|Jump to the beginning of the file|
|>|Jump to the end of the file|
|5 G|Go to line 5|


### Search Commands

You can type `/pattern` to search the current screen and below for matches to
`pattern`. Pattern matching is performed using POSIX basic regular expression
syntax.

|   Input    |            Result             |
|:----------:|:-----------------------------:|
| `/pattern` | Forward search for `pattern`  |
| `?pattern` | Backward search for `pattern` |
|     N      |     Go to the next match      |
|    ⇧ N     |    Find the previous match    |

## Options

Any options you want to add to `less` on every invocation can be done by adding
these options to the environment variable `LESS`. Each option can be separated
by a `$` for clarity.

* Configure `less` to always squeeze multiple newlines and center search results

    ```shell script
    export LESS='$ s $ -j .5 $'
    ```

## Centering Search Results

If you don't like how searching for a string in `less` causes it to appear at
the top of the pager, there's a setting that centers it. Add the option `-j.5`
to the command to cause this, or add it to the `LESS` environment variable.

```shell script
less -j.5 ./example.txt
```
