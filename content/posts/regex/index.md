---
title: 'Regular Expressions'
url: /regex
description: 'Anything but regular...'
date: 2020-02-04T14:52:27-08:00
draft: false
---

# Regular Expressions

A regular expressions, also known as a **RegEx** can be used to locate information in a file. There are many flavors of regular expressions, such as `grep` and `egrep` and `pcregrep`. Depending on which you use, the syntax will be slightly different. I prefer `pcregrep` as it's the closest to the regular expression engines used in languages like `python`, `nodejs`, and `java`.

## Different Flavors, Different Syntax

These are some differences between various flavors.
* MacOS `grep` supports `\d` to represent digits, but GNU `grep` does not.
* `grep` supports `\<complete\>` word searches, but `pcregrep` represents this with `\bcomplete\b`.
* `pcregrep` supports capture arguments, but `grep` does not. For instance, only `pcregrep` would allow you to return the `123` from `var=123` with the regular expression below

```sh
# returns '123'
echo "var=123" | pcregrep -o1 '=(\d{3})' file.txt
```

## Meta-characters

#### `.` any character
* e.g. `.at` will match `aat` `1at` and `!at`

#### `^` beginning of line, or "not"
(it depends on the context, explained below)
* e.g. `^\d` will match any line starting with a number.

#### `[` ... `]` set of characters

* e.g. `[^abc]` will not match any line that contains a char that isn't `a` `b` and `c`
* e.g. `[^c]at` will match "hat" and "bat" but not "cat"
Sets also support brackets
* e.g. `[0-4]` will match the digits 0, 1, 2, 3, 4

* `[A-Z]` will not match the word "apple" but it will match "Apple"

#### `{` ... `}` repetition of characters
* e.g. `[abc]{3}` will match 'aaa' or 'aba' or 'ccb'
* e.g. `a{2,4}` will match 'baa' and 'baaaa'
* e.g. `a{2,}` will match 2 or more consecutive 'a' chars
* e.g. `a{,3}` will match up to 3 consecutive 'a' chars

#### `(` ... `)` capture groups
* e.g. `(abc){3}` will match with 'abcabcabc'

#### `$` end of line
* e.g. `;$` will match any line ending with a semicolon.

#### `&`
#### `*`

In order to refer to these chars literally, you have to escape them e.g. `\.`

All other characters you can refer to literally, and some will perform a special function if they are first escaped with a `\`

### Special Characters

|RegEx|Meaning|Does Match|Also Matches|Doesn't Match|
|:---:|:---:|:---:|:---:|:---:|
|\d|digit|1|2|a|
|\D|non-digit|a|>|3|
|\w|alphanumeric|a|1|>|
|\W|non-alphanumeric|>|#|1|
|\s|whitespace|||
|\t|tab|||
|\n|newline|||
|\r|carriage return|||

### Changes

The following meta-characters have either been added, or no longer require being escaped to use their special properties. To search for the literal character, prepend them with a backslash.


```sh
# [Search for line containing 'this' or 'that']
egrep 'this|that' file.txt
# [Search for a line containing 'abcabc']
egrep '(abc){2}' file.text
```



# `grep`

`grep` was written in 1974 by Ken Thompson as part of the original UNIX operating system. Before `grep`, people using the original file editing software `ed` would often have to type `ed g/re/p` to perform a *global regular expression print*. This would print out any lines that matched the criteria and perform the operations specified.

Luckily, `vim` and `sed` both support the same `-E` flag to use extended regular expressions.

```sh
# [Use ex to replace hello with world on line 1]
vim -E -nsc '1s/this|that/world/e' -cx file.txt
# [Use sed to replace hello with world on line 1]
gsed -E -i -e '1/this|that/world/' file.txt
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

Technically a regex is not a regular expression. It might as well be, as far as everyday use is concerned, but this is the history.

In the 1950s, famous mathematician Stephen Kleene, known today as the father of Regular Expressions, outlined the set of operations that a machine must support in order to be declared as a *Deterministic Finite Automaton* (DFA).

A DFA is capable of understanding expressions such as "the character A must be matched with 0 or more times". The syntax to declare this regular expression was `A*` (sound familiar?)

That star is now referred to as a Kleene star, named after the very mathematician who laid the groundwork for regular expressions.

Eventually the functionality of regular expressions was expanded, such by the `perl` language in the 1980s leading to some modern regular expression programs becoming classified as  *Non-Deterministic Finite Automatons* (NFAs)

## RegEx Scrapbook

Here is where I'll be saving regular expressions I wanted to be able to refer back to at some point

* Select all Markdown fenced code blocks that are indented using 2 spaces

    ```txt
    /  ```.*$\n\(  .*$\n\)\+  ```$
    ``` 
