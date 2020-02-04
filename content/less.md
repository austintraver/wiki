+++
title = "Less"
description = "Because less is literally more, I'm not joking"
date = 2020-02-04T14:43:27-08:00
image = "less.jpg"
+++

# `less`

## Navigating `man` Pages

When you type `$ man grep` on your terminal, the navigation is different than it is when you look at a file in Safari. For instance, you might be wondering how to close the man file. If you jumped for `⌃ C` then you're not alone. However, pressing `q` is the keybinding to exit when inside a `man` page.

The reason that the keybindings are different, is because a `man` page is rendered using a terminal pager called `less`.

Therefore the keybindings when you type `$ man grep` are identical to the keybindings when you type `$ less bigfile.txt`

If you don't know the `less` keybindings, then congratulations! I didn't either so I've provided them below.

### Navigation Keys

Conveniently, they are pretty compatible with `vim`. The `K` & `J` keys are used to scroll down & up respectively, which is the same as vim's binding to move the cursor down & up. Since less is read-only, the cursor is always pegged at the last row. However, `vim`'s scrolling keys `⌃ E` and `^ K` work in `less` as well (but the CTRL key is optional).



|Key-Binding|Command|
|:---:|:---:|
|E or J|Scroll down 1 line|
|Y or K|Scroll up 1 line|
|<|Jump to the beginning of the file|
|>|Jump to the end of the file|
|5 G|Go to line 5|


### Search Commands

You can type `/info` to search the current screen and below for `info`.

|Key-Binding|Command|
|:---:|:---:|
|`/info`|Search for the regex `info` on the current page, and the lines below it|
|`?info`|Search for the regex `info` on the current page, and the lines above it|
|N|Find the next instance of `info`|
|⇧ N|Find the previous instance of `info`|

{: .notice--info}
**Tip:** This search functionality supports regular expressions, which lets you make more powerful searches.

## Why is it called `less`?

As the aphorism goes, "less is more". This saying is true in our daily lives, but it's also true for your computer.

In the 1980s, a popular terminal pager called `more` was frequently used to read in text line-by-line on a computer's terminal. The problem with `more`, however, was that `more` is not able to scroll backwards. As a result, Mark Nudelman wrote a "backwards `more`" program.

This program, he cleverly named `less` because "`less` is `more`".

## The `LESS` environment variable

Any options you want to add to `less` on every invocation can be done by adding these options to the environment variable `LESS`. Each option can be separated by a `$` for clarity. An example is provided below.

Configure `less` to always squeeze multiple newlines and center search results

  ```sh
  export LESS='$ s $ -j .5 $'
  ```

## Centering Search Results

If you don't like how searching for a string in `less` causes it to appear at the top of the pager, there's a setting that centers it. Add the option `-j.5` to the command to cause this, or add it to the environment variable

```
less -j.5 ./example.txt
```
