---
title: 'make'
draft: true
---

# Makefile

Textbook: [Managing Projects with GNU Make]

## Textbook Notes

[Chapter 1]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch01.html
[what Makefiles contain]: https://www.gnu.org/software/make/manual/make.html#Makefile-Contents
[using implicit rules]: https://www.gnu.org/software/make/manual/make.html#Implicit-Rules
[special variable]: https://www.gnu.org/software/make/manual/make.html#Special-Variables
[arguments to specify the goals]: https://www.gnu.org/software/make/manual/make.html#Goals
[Chapter 2]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch02.html
[Chapter 3]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch03.html
[Chapter 4]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch04.html
[Chapter 5]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch05.html
[Chapter 6]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch06.html
[Chapter 7]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch07.html
[Chapter 8]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch08.html
[Chapter 9]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch09.html
[Chapter 10]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch07.html
[Chapter 11]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch08.html
[Chapter 12]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch09.html

### [Chapter 1][]

Below is an example of a simple *makefile*

```make
hello: hello.c
    gcc hello.c -o hello
```

When no parameters are provided, `make` will build the first *target* it sees,
which in this case, is `hello`.

goal
:   a target that `make` strives ultimately to update. By default, `make` will
    start with the first target, and this is known as the *default goal*. There
    are various [arguments to specify the goals] to override the behavior, as
    well as the `.DEFAULT_GOAL` [special variable]

[rule][Rules]
:   a specification contained within a *makefile* that declares when and how a
    *target* of a rule is to be remade. A *rule* contains *targets*,
    *prerequisites*, and *recipes*. On the first line of a rule, there are
    *targets*, and *prerequisites*, separated by a colon. An optional list of
    *recipes* can be provided in a newline-delimited format, each of which is
    indented by a leading tab character, in the lines below.

[target][Rules]
:   The file that is to be made by the corresponding *prerequisites*. Appears on
    the left-hand side of the first line of a given *rule*. There are
    [targets with special meanings]

[prerequisite][Rules]
:   A file that is used as input to create the target. If a *prerequisite* is
    found to have been modified more recently than its *targets*, these
    *targets* will be considered out-of-date and will be subsequently rebuilt.
    There are multiple [types of prerequisites].

[recipe][Rules]
:   An action that `make` carries out. A recipe may have more than one command,
    either on the same line or each on its own line. **Please note:** you need
    to put a tab character at the beginning of every recipe line! This is an
    obscurity that catches the unwary. If you prefer to prefix your recipes with
    a character other than tab, you can set the `.RECIPEPREFIX` variable to an
    alternate character


[rule syntax]: https://www.gnu.org/software/make/manual/make.html#Rule-Syntax
[targets with special meanings]: https://www.gnu.org/software/make/manual/make.html#Special-Targets
[types of prerequisites]: https://www.gnu.org/software/make/manual/make.html#Prerequisite-Types
[Rules]: https://www.gnu.org/software/make/manual/make.html#Rules

### What a Rule Looks Like





default goal
:   the first target declared within a *makefile*

default rule
:   the first rule declared with a *makefile*

### [Chapter 2][]
### [Chapter 3][]

At a high level, [what Makefiles contain] can be encapsulated by the following five components:
*explicit rules*, *implicit rules*, *variable definitions*, *directives*, and
*comments*.

See [rule syntax] for more information. See also: [using implicit rules]

### [Chapter 4][]
### [Chapter 5][]
### [Chapter 6][]
### [Chapter 7][]
### [Chapter 8][]
### [Chapter 9][]
### [Chapter 10][]
### [Chapter 11][]
### [Chapter 12][]


### Automatic Variables {#automatic_variables}

*Automatic variables* are set by `make`
after a rule is matched. They provide access to elements from the
target and prerequisite lists so you don't have to explicitly specify
any filenames. They are very useful for avoiding code duplication, but
are critical when defining more general pattern rules (discussed later).

There are seven "core" automatic variables:

`$@`

:   The filename representing the target.

`$%`

:   The filename element of an archive member specification.

`$<`

:   The filename of the first prerequisite.

`$?`

:   The names of all prerequisites that are newer than the target, separated by spaces.

`$^`

:   The filenames of all the prerequisites, separated by spaces. This list has
    duplicate filenames removed since for most uses, such as compiling,
    copying, etc., duplicates are not wanted.

`$+`

:   Similar to `$^`, this is the names of all the prerequisites separated by spaces, except that `$+`
    includes duplicates. This variable was created for specific situations
    such as arguments to linkers where duplicate values have meaning.

`$*`

:   The
    stem of the target filename. A stem is typically a filename without its
    suffix. (We'll discuss how stems are computed later in the section [Pattern Rules][].) Its use outside of pattern rules is discouraged.



[Pattern Rules]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/ch02.html#pattern_rules 'Pattern Rules'
[Managing Projects with GNU Make]: https://learning.oreilly.com/library/view/managing-projects-with/0596006101/


Managing Programs and Files

* `?=` is the *conditional assignment* operator

## Structuring the installation

GNU outlines which directories a project should have, and what their names are, in the [GNU standards document](https://www.gnu.org/prep/standards/standards.html#Directory-Variables)

With that being said, I commonly see these folders

* `/src`
* `/bin`
* `/include`
* `/lib`
* `/libexec`
* `/share`
* `/etc`
* `/sbin`
* `/var`

And less commonly, I'll see these as well:


* `/test`
* `/misc`
* `/doc`
* `/data`

