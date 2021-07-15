---
title: 'Regular Expressions'
description: 'Anything but regular...'
date: 2020-02-04T14:52:27-08:00
draft: false
---

# Regular Expressions

A
[regular expression](https://en.wikipedia.org/wiki/Regular_expression), also
known as a **RegEx**, is a shorthand descriptor of a pattern to match against
text located somewhere within a file. There are many flavors of regular
expressions, which can frustrate those new to learning the language. The `grep`
command uses BASIC Regular syntax.

## The origins of `grep`

Ken Thompson, author of `grep` was using
[`ed`](https://en.wikipedia.org/wiki/Ed_(text_editor)) at the time (this was
before Bill Joy et. al had written `ex` and later `vi`), and needed to make a
bunch of substitutions, and he kept having to do it. He wanted to edit a bunch
of lines (he couldn't see them, because this was the era before text-user
interfaces (TUIs) were a thing. So he needed to, before editing some lines at
the same time, globally print them first to know what he was matching. He needed
globally for his regular expression to print `g/re/p`.

* [How grep got its name](https://thoughtbot.com/blog/how-grep-got-its-name)

* [the Jargon File](http://www.catb.org/~esr/jargon/html/G/grep.html)

## [Character Classes](https://en.wikipedia.org/wiki/Regular_expression#Character_classes)

Character classes are the `[` ... `]` set of characters

* `[0-4]` will match the digits 0, 1, 2, 3, 4

* `[A-Z]` will not match the `a` in `apple`, but will match the `A` in `Apple`.

Negation can be specified by prefixing the character class with the `^`
character.

* `[^abc]` will not match any line that contains a char that isn't `a`, `b`, or
  `c`

* `[^c]at` will match "hat" and "bat" but not "cat"



## Different Flavors, Different Syntax

These are some differences between various flavors. For example, in MacOS,
`grep` supports `\d` to represent digits, but supposedly GNU's version of `grep`
does not. `grep` supports using `\<` and `\>` to represent word boundaries, but
Perl compatible regular expressions use `\b` to represent a word boundary.
Furthermore, Perl compatible regular expressions support capture arguments, but
`grep` does not.


### Special Characters

| RegEx |     Meaning      |
|:-----:|:----------------:|
|  \d   |      digit       |
|  \D   |    non-digit     |
|  \w   |   alphanumeric   |
|  \W   | non-alphanumeric |
|  \s   |    whitespace    |
|  \t   |       tab        |
|  \n   |     newline      |
|  \r   | carriage return  |

### Changes

The following meta-characters have either been added, or no longer require being
escaped to use their special properties. To search for the literal character,
prepend them with a backslash.

```shell
# [Search for line containing 'this' or 'that']
grep -E 'this|that' file.txt
# [Search for a line containing 'abcabc']
grep -E '(abc){2}' file.text
```

Luckily, `vim`, `sed`, and `grep` all support the same `-E` flag to use extended
regular expressions.

```shell
# [Use ex to replace hello with world on line 1]
vim -E -nsc '1s/this|that/world/e' -cx file.txt
# [Use sed to replace hello with world on line 1]
sed -E -i -e '1/this|that/world/' file.txt
```

## Metacharacters

Although lots of documentation will say the following *meta-characters* are unsupported in `grep` they work fine in the standard `grep` for MacOS.

* `\d` digit
* `\D` non-digit
* `\s` whitespace (non-newline)
* `\S` non-whitespace
* `\w` alphanumeric (all in `\a`, `\d` and also `_`)
* `\W` non-alphanumeric

## RegEx History

### DFA or NFA

Technically a regex is not a regular expression. It might as well be, as far as
everyday use is concerned, but this is the history.

In the 1950s, famous mathematician Stephen Kleene, known today as the father of
Regular Expressions, outlined the set of operations that a machine must support
in order to be declared as a *Deterministic Finite Automaton* (DFA).

A DFA is capable of understanding expressions such as "the character A must be
matched with 0 or more times". The syntax to declare this regular expression was
`A*` (sound familiar?)

That star is now referred to as a Kleene star, named after the very
mathematician who laid the groundwork for regular expressions.

Eventually the functionality of regular expressions was expanded, such by the
`perl` language in the 1980s leading to some modern regular expression programs
becoming classified as *Non-Deterministic Finite Automatons* (NFAs)

## RegEx Scrapbook

Here is where I'll be saving regular expressions I wanted to be able to refer
back to at some point

* Select all Markdown fenced code blocks that are indented using 2 spaces

    ```txt
    /  ```.*$\n\(  .*$\n\)\+  ```$
    ``` 
