---
title: Vi
description: "The best editor around"
date: 2020-02-04T14:52:27-08:00
draft: false
---

# Vi

## The history of Vi

### `ed`

In 1967, while studying at the University of California, Berkeley,
Butler Lampson and Peter Deutsch built the "quick (text) editor"
[qed](https://en.wikipedia.org/wiki/QED_(text_editor)),
for the Berkeley Timesharing System.

In 1969, just two years later,
Ken Thompson, who was familiar with `qed`, wrote the text editor
[`ed`](https://en.wikipedia.org/wiki/Ed_(text_editor)),
one of the first three components of the UNIX operating system.

Given the limitations at the time, `ed` has become infamous for its notoriety
as a rather hostile interface. Its terse communication is best captured by
the warning message it presented when users were about to quit the program
without saving any of their changes made to the document: `?`

### `ex`

In 1976, Bill Joy wrote `ex`, which added features that took advantage of video
terminals. Bill Joy had been inspired to improve on `ed` after visiting a friend
in London who had himself created a similar, less performant extension of `ed`.
`ex` derives its name from its origins as an extended version of `ed`.

In 1979, Bill Joy's improvements to `ex` had become quite comprehensive. It now
featured, in addition to its line editor mode, a fully visual editor mode. Users
were now able to see the text that they were editing. This improvement was so
dramatic that it eclipsed the utility of `ex`'s line editor mode, prompting the
name of the command to be changed to `vi`, as we know it today.

In 1991, a number of improvements upon the original `vi` were released. The
developers named this program `vim`, or "Vi improved." Some of the most
notable features released in this edition include autocompletion, spell-check, 
diff comparison, file-merging, code-folding, and regular expressions.

## Getting Started

The original Vim package has grown to include everything but the kitchen sink.
You'll find the amount of files and dependencies it adds to be rather excessive,
as it will force the installation of numerous massive dependencies,
along with many features you likely don't need. For this reason, many developers
have begun working on Neovim, which is more in line with the original spirit of
the Vim package. For this Wiki entry, I will be assuming that you are using
Neovim, but most of these commands should work in regular Vim as well. In either
case, I'll be referring to the program as "Vi," the original program.

* Installing Neovim

  * On Ubuntu

    ```shell script
    sudo add-apt-repository ppa:neovim-ppa/unstable
    sudo apt update
    sudo apt install neovim
    ```

  * On macOS

    ```shell script
    brew install neovim
    ```

Vi has a tutor mode, which can be accessed by typing `$ vimtutor`
[Check out syntax examples](https://devhints.io/vim)

## `vim` Key Notation

For more help, inside vim type `:help key-notation`

Note that there are 32 control characters, which `vim` has bound to specific 
key-combos. For instance, **< C-a >** means **⌃ A**. At the time, there wasn't 
enough room to support any control+shift+char type combos, so **< C-a >** is the 
same thing as **< C-A >**

| Notation |   Meaning   | Hotkey  |
|:--------:|:-----------:|:-------:|
|  < BS >  | ⌫ backspace | **⌃ H** |
| < Tab >  |    `tab`    | **⌃ I** |
| < Esc >  |  ⎋ escape   | **⌃ [** |
|  < CR >  |  ↩ return   | **⌃ M** |

## Moving Around

#### By Character

| Key |   Function    |
|:---:|:-------------:|
|  H  | ← 1 character |
|  J  | ↓ 1 character |
|  K  | ↑ 1 character |
|  L  | → 1 character |

#### By Word

| Key |         Function         |
|:---:|:------------------------:|
|  W  |      → to next word      |
|  E  |     → to word ending     |
|  B  | ← back to word beginning |

## The Meta Key

Vi often refers to the option key (<kbd>&#x2325;</kbd>) and the alt key
(<kbd>&#x2387;</kbd>) as the **meta key**, and will use `<M-x>` as the notation
to denote pressing <kbd>⌥ X</kbd>. This is mangling the meaning of
[the meta key](https://en.wikipedia.org/wiki/Meta_key) a bit. Since most
keyboards didn't have a meta key, Vi follows Emacs, and uses escape followed by
a key as if they pressed a meta key. The meaning of the meta key has changed
over time, and has had different, if not contradictory meanings. In JavaScript,
the DOM treats the command (<kbd>⌘</kbd>) and windows (<kbd>⊞</kbd>) as
[the meta key](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey).

## Basic Launch Commands

* Start vi in encrypted mode

    ```shell script
    vi -x text.txt
    ```

* Start vim in diff mode

    ```shell script
    vi -d file1.txt file2.txt
    ```

* Start vim in ex mode

    ```shell script
    vi -e text.txt
    ```

* Start vi in vi mode (woah <q>#meta</q>)

    ```shell script
    vi -v text.txt
    ```

## 3 Modes in Vim

### Normal/Command Mode

This is the place to give the editor commands and make changes.

* `x` to delete a char

* `dd` to delete a line of code

* `0` to move to the start of the line

* `$` to move to the end of the line

* `a` insert text after the cursor

* `A` insert text at the end of the line

### Insert Mode

* Type `i` to enter insert mode

* Type `<C-[>` or `<ESC>` to exit insert mode

### Cmdline Mode

* Type `:` to enter cmdline mode

* Type `<Enter>` or `<C-m>` to exit cmdline mode

* Type `<C-r>` `a` to insert the contents of register `a` with the contents of register `a`

* Type `<C-r>` `=` to insert the result of the expression

* Type `<C-\>` `e` to replace the entire contents of the command line with the result

* Type `<C-d>` to list all matches of the current pattern

#### Useful Commands

* Insert the result of the expression into the text at the cursor location

    ```vim
    " Below the current line, add a line
    " containing value of variable `g:ext`
    put =g:ext

    " Above the current line, add a line
    " containing absolute filename
    put! =&ft

    " At the end of the file,
    " add a line containing the string 'test'
    $ put ='test'
    ```

### Selection Mode

* Type `/` to begin a forward search

* Type `?` to begin a backward search

* Type `<Ctrl-G>` to move to the next match of the current search

* Type `<Ctrl-T>` to move to the previous match of the current search

  * Hint: `T` is above `G` on the keyboard

* Type `<Ctrl-L>` to add one character of the current match to the search register

### `ex` Mode

## The history of `ex`

In the mid 1970s, GNU's file editor, `ed` needed some extensions. Instead of updating `ed` itself, Bill Joy developed an **extended** mode `ex` as well as a **visual** mode `vi`

`ex` is a **file** editor, which makes it different than the GNU's **stream** editor `sed`, which was built by Lee McMahon in the early 1970s. The advantage of `ex` is its ability to provide more functionality than what's found in `sed` and `awk`. For instance, `ex` has the ability to handle very complex chains of tasks. `ex` has support for matching statements that span across several lines.

### `ex` Mode

If you're inside `vim` you can enter ex mode by typing `:` in command mode. You will automatically exit ex mode by submitting the command or deleting the text on the line.

{{% aside info %}}

Ex mode is confusingly also referred to as command-line mode since it can be invoked directly from the command line `ex file.txt` or `vim -E file.txt`

{{% /aside %}}

### `ex` Commands

`ex` is an extension of its parent `ed` and supports a very similar syntax to `ed` and `sed`. Unlike `ed` and `sed` however, `ex` is more powerful. For instance, it supports regular expressions that span multiple lines of a file.

#### Range Selection

The first thing to specify to `ex` is the range. Some characters have a special meaning when specifying the range of lines to search.

1. `num` specifies to search just line `num` itself

```txt
(Select just line 5)
:5
```

1. `a,b` specifies lines *a* through *b* inclusive

    ```txt
    (Select lines 2 through 4)
    :2,4
    ```

1. `$` specifies the last line

    ```txt
    (Select all lines from 10 and below)
    :10,$
    ```

1. `%` specifies all lines (equivalent to `1,$`)

    ```txt
    (Select all lines)
    :%
    ```

1. `.` specifies the current line

    ```txt
    (Select all lines before the current line)
    :1,.
    ```

1. `+` specifies the next line(s)

    ```txt
    (Select the next 10 lines, including the current line)
    :.,.+10
    ```

1. `-` specifies the previous line(s)

    ```txt
    (Select the previous 10 lines, including the current line)
    :.-10,.
    ```

1. `/regex` specifies the next line containing the RegEx `regex`

    ```txt
    (Select the first line containing `example` after the cursor current position
    :/example
    ```

1. `?example` specifies the previous line containing the Regex `example`

    ```txt
    (Select the first line containing `example` before the cursor's current position
    :?example
    ```

#### Command Selection

* `:% s/old/new/` swaps 1 instance of *"old"* with *"new"* found within the selection range.

* `:% s/old/new/ge` swaps **every** *"old"* found in the selection range with *"new"*

* `e` tells `vim` to suppress any errors that occur, for instance, if *"new"* is not found within the selection range.

#### Chaining Commands

You can use the `|` character to chain multiple `ex` commands together.

```txt
(Swap every "old" with "new" and prepend a # to every line)
:% s/old/new/ge|i#
```

* `|` tells `ex` to run another command

* `g/query/command` tells `ex` to execute the command on every line that matches the query

* `i` tells `ex` to insert text at the beginning of the line.

* `A` tells `ex` to append text at the end of the line.

## Launching `ex`

You have multiple ways of calling `ex`

```shell script
# Run ex on file.txt
ex file.txt
# Run ex on file.txt
vim -e file.txt
```

## Calling `ex` from the command line

If you've ever used `vim` or its parent `vi` you've probably used `ex` without even knowing it. Any command that starts with `:` is actually an `ex` command, it's specified inside of `vi` but it's executed with `ex` and mapped to the current file.

`ex` commands can be run without even entering a file. To do this, you can take advantage of the command line features that ex has implemented.

## Understanding ~/.vimrc

Your `~/.vimrc` file is a file that contains *Vimscript* code. It automatically runs the code in this file every time Vim is launched.

It's good to write as many comments as possible, as you'll one day forget what is in your `~/.vimrc` file

### Variables

#### Internal-Variables

When you see something like `g:onedark_termcolors:256` in your `~/.vimrc` it's referring to an internal variable.

Fun fact, not sure where to put it: The "rc" in ~/.vimrc stands for *run commands*

You can always check `:help internal-variables` to review the types of internal-variables but here are the most common ones.

|  buffer-variable  |  `b:`  |        Local to the current buffer         |         |                |
|  window-variable  |  `w:`  |        Local to the current window         |         |                |
| tabpage-variable  |  `t:`  |       Local to the current tab page        |         |                |
|  global-variable  |  `g:`  |                   Global                   |         |                |
|  local-variable   |  `l:`  |            Local to a function             |         |                |
|  script-variable  |  `s:`  |                 Local to a                 | :source | 'ed Vim script |
| function-argument |  `a:`  | Function argument (only inside a function) |         |                |
|   vim-variable    |  `v:`  |         Global, predefined by Vim          |         |                |

* If the variable is declared with no prefix within a function, it is local to the function.

* If the variable is declared out of a function, it is global, and can be accessed while using vim either as the interactive editor or in a script

### Examples

* Assign the value of variable `var` to the result of `<expr>`

    ```vim
    let var = printf('filetype is %s', &filetype)
    ```

* Setting variables using the `let` keyword

    ```vim
    " Create a script variable called dotfiles pointing to the config directory
    " this variable will not exist outside of the script it was declared in
    let s:dotfiles = fnamemodify(stdpath('config'), ':h')

    " Create a global variable which can be referenced later on if this file has   been sourced
    let g:my_variable = [1, 2, 3]
    echo type(g:my_variable)
    " => 3

    " (More info on the type() function) (:help type)

    "   type  | value | function({expr})
    " ----------------------------------
    " Number:     0     type(v:t_number)
    " String:     1     type(v:t_string)
    " Funcref:    2     type(v:t_func)
    " List:       3     type(v:t_list)
    " Dictionary: 4     type(v:t_dict)
    " Float:      5     type(v:t_float)
    " Boolean:    6     type(v:true) [or] type(v:false)
    " Null:       7     type(v:null)
    ```

* Configuring Vim to limit its colors to a traditional *16-color* pallet

    ```vim
    " Only use 16 colors for the color-pallet
    set t_Co=16
    ```

#### Basic Functions

* Splitting a string into a list

    ```vim
    " Create a string, some words with a ':' in between
    let my_string = "one:two:three"

    " Split the string into a list at each ':'
    let my_list = split(my_string, ':')
    " => ['one', 'two', 'three']
    ```

* Joining a list into a string

    ```vim
    let my_directories = ['.', 'Desktop', 'file.txt']
    " Join each item in the list together into a string using '/'
    let my_path = join(my_directories, '/')
    " => './Desktop/file.txt'
    ```

* Filtering duplicates out of a list, leaving only `uniq()` elements

    ```vim
    " Reducing a list to its unique elements
    let number_list = [1, 2, 2, 2, 3, 4, 4, 5]
    call uniq(number_list)
    " => [1, 2, 3, 4, 5]

    " Copying a list, but only the unique elements
    let duplicate_number_list = [1, 2, 2, 2, 3, 4, 4, 5]
    let unique_number_list = uniq(copy(duplicate_number_list))
    " => [1, 2, 3, 4, 5]
    " !Important: if you don't call copy(),
    "             you modify the contents of the original variable
    ```

### Special Characters

* In vim, the `%` character specifies the current filename.

* The `0` character specifies the beginning of the line

* The `^` character specifies the beginning of the line, but after the initial whitespace

* The `$` character specifies the end of the line

`:r filename.txt` will read the specified file into the buffer
`:r !ls` will read the files in the current working directory into the buffer
`:!` will run the last external command in your bash history
`:!!` will repeat the last command you executed
`:silent !echo "Hello"` will not ask for the user to press enter to confirm the change

### Enabling syntax highlighting in code-blocks

If you'd like your code-blocks inside markdown to support syntax highlighting, go into your `./vimrc` file and add the following line

```vim
" Enable highlighting for html, ruby, python, and bash "
let g:markdown_fenced_languages = ['html', 'ruby', 'python', 'bash=sh']
" Allow syntax highlighting for code blocks of up to 100 lines (Default is 50) "
let g:markdown_minlines = 100
```

{{% aside warning %}}

**Note:** Bash is not one of the supported languages of Markdown. Therefore, you have to map any `bash` code-blocks to be rendered as `sh` code-blocks with the syntax `bash=sh`

{{% /aside %}}

{{% aside success %}}

**Update:** If you have the latest version of vim, this is no longer necessary,
the default mappings include `['c++=cpp', 'viml=vim', 'bash=sh']`

{{% /aside %}}

### Help

You can get help in vim by typing `:help topicname`

Usually this opens in a small window, so you can type **⌃ W T** which open the current buffer in its own tab.

An alternative option is to have the help page open in its own full-screen tab, which you can do with the substitution below

```vim
" Old method "
help grep
" New method "
tab help grep
```

#### Tab navigation (normal mode)

* `gt` go to next tab

* `gT` go to previous tab

* `4gt` go to tab 4

### Key Mappings

You can specify which mode you would like to transform the operation of a given key combination.

* `map`: transform the key combination for *all* modes.

* `nmap`: transform the key combination for normal mode.

* `imap`: transform the key combination for insert mode.

* `vmap`: transform the key combination for visual and select mode.

#### Non-Recursive Mappings

The following mapping combination results in pressing `d` in insert mode outputting `wat` because the keystroke transformations execute recursively.

```vim
imap d D
imap D wat
```

`d` :arrow_right: `D` :arrow_right: `wat`

For this reason, it's good to also have non-recursive mappings.

* `noremap`: non-recursive `map`

* `nnoremap`: non-recursive `nmap`

* `inoremap`: non-recursive `imap`

* `vnoremap`: non-recursive `vmap`

### Regular Expressions

The syntax for vim regular expressions is slightly different than those used in POSIX Extended regular expressions, the ones that are used in `egrep`

#### Metacharacters

* `\|` indicates alteration, e.g. `house\|home`

* `\(...\)` has two functions

  1. it allows for grouping, so that the `*` `\+` and `\=` operators can be used.

  1. it allows you to reference it in the replacement string with `\1`, `\2`, etc.

  * e.g. `\([a-z]\).\1` would match `lol` or `kek`
    `\+` indicates "one or more" e.g. `\(ha\)\+` is one or more `ha` lines. Would match with `ha` or `haha` or `hahaha`
    `\?` will match zero or one of the preceding regular expression.
    `{3}` matches the preceding regular expression 3 times. `\(ha\)\{3}` would match `hahaha` but not `haha` or `hahahaha`
    `{,3}` matches the preceding regular expression between 0-3 times. It would match `ha` or `haha` but not
    `{3,}` matches the preceding regular expression at least 5 times.

## Edit File Remotely

You can use `vim` to edit files hosted remotely on a different computer. First,
however, you'll need to add your public SSH key to the `~/.ssh/authorized_keys`
file on the host of that computer

```shell script
vim scp://user@remote.network/Documents/file.txt
```

## Save & Quit

### In `ex` mode:

* `:wq` Write to the file

  * Displays an error if no changes have been made since the file was opened.

* `:q` Close/quit the file

  * Displays an error if there are unsaved changes

* `:q!` Force-quit from the file, abandoning any unsaved changes

* `:wq!` Attempt to write changes, but force-quit no matter what

* `:qa` Exit from all files

  * Displays an error if there are unsaved changes

* `:qa!` Exit from all files, abandoning any unsaved changes

* `:x` Only write to the file if it has been modified, and then exit

### In Normal mode:

* `ZZ` only write to the file if it has been modified, (equivalent to `:x`)

{{% aside warning %}}

**Warning:** Even if you haven't made any changes, `:wq` will update the file's last modified date to the current time. To avoid this, use `:x`

{{% /aside %}}

### Confirmation Prompt

If you'd rather not have an error thrown at you when you're trying to exit a file, you can have `vim` ask you if you'd like to save your changes when you try to quit from a file. Just add `set confirm` to your `.vimrc` file.

## Changing Directories With `ex` Mode

### `:cd`

* `:cd .. ` will change to the parent directory

* `:cd-` will change to the previous directory

* `:cd %:h` will change to the directory of the current file

The `:pwd` command prints the present working directory

## Custom `ex` commands

You can add these to your `.vimrc` to add custom `ex` commands.

### User Defined Commands

User defined commands uses the `command` keyword, and has the following syntax

```txt
:command WriteAndQuit wq
```

This will allow you to type `:WriteAndQuit` as an `ex` command and substitute `:wq` in its place.

## Override Existing Commands

Overriding pre-defined commands uses the `:ca` keyword (command abbreviate), and has the following syntax

Now when we use the `:w` command it will be replaced with the `:up` (update) command. This is a good idea, because when you use the `:w` command, you are writing the current buffer even if there are no changes, which sets the file as modified.

However, there's a problem. If `:up` was modified, we would want it to preserve its original meaning. To do this, we'll disable remaps for the right hand side argument, with the `cnorea` (command no remap abbreviate) keyword.

```txt
:cnorea w up
```

{{% aside success %}}

Good News! Although `vi` tells you that custom commands must start with an upper case letter, you can bypass this by using the `:cnorea` command. Customize away!

{{% /aside %}}

### Editing Text Commands

Usually it's referred to as copy, cut, and paste, but in the interest of having the verb match the keybindings, the translation is as follows for `vim`

* copy is yank (yy & Y)

* cut is delete (dd)

* paste is put (p)

## Move Lines in `ex` Mode

No need to cut a group of lines and then paste it somewhere else, you can use the `:m[ove]` command to send a range of lines to be below the specified line.

```txt
:3,8m 23
```

## Copy Lines in `ex` Mode

You have some choices, you can use `:t` or `:co[py]`, which will paste the range of lines below the specified line.

```txt
:3,8t 23
```

## Telling `vim` about the filetype

If you want to enable syntax highlighting but you're in a file without a file extension, you can use the `:set` command to modify the `ft` value, and tell `vim` what file to treat it as.

```txt
:set ft=sh
```

## Using the shell without leaving vim

```txt
:sh
```

And just press <C-d> when you're done to return to vim

## Managing Viewports

If you open a help page, it opens a viewport in the top vertical half of the screen. This is a good time to learn the commands for managing multiple viewports, as it's often useful to be working on multiple documents at once.

{{% aside tip %}}

**Tip:**: You can press `K` in normal mode to open a help page on whatever word the cursor is currently on.

{{% /aside %}}

The typical syntax for managing a viewport in normal mode is ⌃ W <key>. Luckily you don't have to let go of the <Ctrl> key when you press the second key, as `vim` binds both `<C-w>o` and `<C-w><C-o>` to the same function by default.

{{% aside warning %}}

**Warning:** This doesn't always hold true. For instance, `<C-w><C-c>` won't close the active window, but `<C-w>c` will. The reason is that `<C-c>` is the undo command, so `vim` decided not to rebind it.

{{% /aside %}}

To see all of the bindings, type `:tab h index`

### Focusing Windows

| Shortcut |                 Function                 |
|:--------:|:----------------------------------------:|
|  ⌃ w h    |     Focus on the window to the left      |
|  ⌃ w j    |        Focus on the window below         |
|  ⌃ w k    |        Focus on the window above         |
|  ⌃ w l    |    Focus on the window to the right      |
|  ⌃ w w    | Focus on the next window (wraps around)  |

### Moving Windows

| Shortcut |             Function             |
|:--------:|:--------------------------------:|
|  ⌃ w H   |  Move active window to the left   |
|  ⌃ w J   | Move active window to the bottom  |
|  ⌃ w K   |  Move active window to the top    |
|  ⌃ w L   | Move active window to the right   |

### Opening/Closing Windows

| KKy sequence |                      Action performed                       | Equivalent `ex` command |
|--------------|-------------------------------------------------------------|-------------------------|
| ⌃ w s         | Horizontally split the current window                       | `:sp`                   |
| ⌃ w v         | Vertically split the current window                         | `:vsp`                  |
| ⌃ w q         | Quit the active window                                      | `:q[uit]`               |
| ⌃ w c         | Close the active window                                     | `:clo[se]`              |
| ⌃ w o         | Close all other viewports, making this viewport full-screen | `:only`                 |

### Navigating Tabs

| Shortcut |        Function        |   `ex` Command   |
|:--------:|:----------------------:|:----------------:|
|   `gt`   |   Go to the next tab   |   `:tabn[ext]`   |
|  `3gt`   |   Go to the 3rd tab    |     `:tabn3`     |
|   `gT`   | Go to the previous tab | `:tabp[revious]` |
|  `1gt`   |  Go to the first tab   |     `:tabn1`     |
|  `N/A`   |   Go to the last tab   |  `:tabl[last]`   |

### Opening/Closing Tabs

|`⌃ w T`|Open active window in its own tab|
|`⌃ w c`|Close the current tab|`:tabc[lose]`|
|`N/A`|Close all other tabs|`:tabo[nly]`|

{{% aside info %}} 

**Tip:** Use `:tabe file.txt` to open `file.txt` in a new tab.

{{% /aside %}}

## Registers

### Read-Only Registers

* `":` contains the most recently executed command

* `"%` contains the name of the current file

* `".` contains the most recently inserted text

### Special Registers

* `"/` the most recently searched for pattern

* `#` the name of the alternate file

* `"_` the black-hole register, useful for scripting when you don't want to modify the contents of current registers

* `"+` is the computer's clipboard. If you want to copy or paste a range of code, you can use this register to do so.

### Registers in Insert Mode

When you're in insert mode, you can press `<C-r>`, followed by a register name, to insert the contents of that register

### Registers in Command Mode

* `<C-r>` followed by the name of a register inserts the contents of that register into the command line

* `<C-r><C-w>` will insert the `word` currently under the cursor

* `<C-r><C-a>` will insert the `WORD` currently under the cursor

* `<C-r><C-l>` will insert the `line` currently under the cursor

* `<C-r><C-p>` will insert the `file` under the cursor

* `@a` will execute the contents of register `@a` as a series of normal mode commands

* Setting the contents of the search register:

    ```vim
    let @/ = '<pattern>'
    ```

* You can repeat the last `:` command in normal mode by typing `@:`

* You can repeat the last register referenced via normal mode's `@` by typing `@@`

### Copying to Clipboard

1. Normal Mode

Use the `"` mapping to refer to the clipboard register `"+`

* Copying the contents of the active buffer to the clipboard

    ```txt
    gg"+yG
    ```

1. Command-line Mode

Use the `:y[ank]` comamnd

* Copying the contents of the active buffer to the clipboard

    ```txt
    :%y+
    ```

### Writing to registers

The `@/` register stores the last search pattern

* Modifying the most recently searched item

    ```vim
    let @/ = "\<word\>"
    ```

* Copy each match to `/pattern/` as a line in register `@a`

    ```vim
    :global /pattern/ normal "AY
    ```

* Paste the previous pattern searched for in a command

    ```vim
    " Paste the pattern stored in the "/ register
    %s_<C-r>/_
    ```

* Open the help page for the contents of register `"`

    ```vim
    " Actually input a <C-r> here
    :help <C-r>"
    ```

### `vimdiff`

On your terminal, the `vim` command has a `-d` flag which you can use to activate vim's *diff mode*.

* Launching vim in *diff mode*

    ```shell script
    vim -d old.txt new.txt
    ```

### Filepath Shortcuts

To test any of these out, you can type `echo expand('%:p')`

* `%:.` the filepath relative to the current directory `vi.md`

* `%:~` the filepath relative to the home directory `~/content/posts/vi.md`

* `%:p` the absolute filepath `/Users/atraver/content/postsp/vi.md`

* `%:r` the filename root, without the extension `vi`

* `%:e` the filename extension, without the root `md`

### `expand()` Selectors

As we saw above with `echo expand('%:p')`, we can do the same with some `expand()` selectors

```vim
" :help :<cword>

" the [c]ursor [word] in its current position
echo expand('<cword>')

" the [c]ursor [WORD] in its current position
echo expand('<cWORD>')

" for autocommands, the filename of the buffer being manipulated
echo expand('<afile>')
```

Splitting the filepath can be done by appending `:h` or `:t` as follows:

* `%p:h` the `:h` will return everything left of the right-most `/`, in this case being `/Users/austin/notes/_pages`

* `%p:t` does the exact same thing, but will return everything right of the right-most `/`, in this case being `vim.md`

### Motions (Text Objects)

In vim, *motions*, otherwise known as *text objects* can be used to execute a modification in a way more specific than anything possible using just the mouse. They follow the following structure:

```txt
<number> <command> <motion>
```

For instance, `3dk` will delete the current line, and the 3 lines above it. Vim intelligently infers the context from within the motion, allowing for the following types of command-chaining.

* `iw` specifies the *inner word*, which is the word but not the surrounding whitespace.

* `iW` specifies the same thing, but includes non-word characters, selecting everything up to the surrounding whitespace.

* `aw` specifies *a word* and will include the surrounding whitespace.

* `aW` specifies *a word*, including non-word characters up to the whitespace, and including the whitespace

* `is` specifies the *inner sentence* and will match everything in the sentence, up to but not including the surrounding whitespace.

* `as` specifies the *inner sentence* and will match everything in the sentence, including the surrounding whitespace.

* `c` The *change* command can be chained with `i`/`a` to specify boundary, and `w`/`s`/`p` to specify scope of *word*, *sentence*, or *paragraph* accordingly.

* `(` Go to the previous sentence.

* `)` Go to the next sentence.

* `{` Go to the previous paragraph.

* `}` Go to the next paragraph.

Here are some additional examples:

* `ci"`: Change the text inside the first double-quoted phrase in the line.

* `ci'`: Change the text inside the first single-quoted phrase in the line.

* `ct:`: Change the text from the cursor right up to the next `:` to the right.

* `%`: Not really a motion command, but it will go to the matching bracket: `(`
  `)` `{` `}` `[` `]`

* `[{`: Go to the previous unmatched `{` character.

* `[(`: Go to the previous unmatched `(` character.

* `]}`: Go to the next unmatched `}` character.

* `])`: Go to the next unmatched `)` character.

* `*`: Go to next match of the current word.

* `#`: Go to previous match of the current word.

* `/pattern`: Go to the beginning of the match to `pattern`.

* `/pattern/e`: Go to the end of the next match to `pattern`.

* `?pattern?e`: Go to the end of the next match to `pattern`.

* `"*diw` will delete the *inner* word, and copy it to the clipboard. `"*` being where the clipboard is stored.

* `di[` will delete everything inside the brackets. This can also be `di]` and to my knowledge they are not different.

* `da[` will delete everything inside the brackets *including the brackets*.

* `ci}` will delete everything inside of the curly braces and enter insert mode.

* `ca}` will delete everything inside of the curly braces *including the braces* and enter insert mode.

* `dit` will delete everything inside a tag block (e.g. `<div> test </div>`)

* `dat` will delete a tag block (e.g. `<div> test </div>`)

* `d/pattern` will delete everything from the cursor forward to the next match.

* `d?pattern` will delete everything from the cursor back to the last match.

* `dgn` will delete the next match search pattern match

* `cgn` will change the next search pattern match

* `gnD` will delete the entire line containing the next match to the current pattern.

* `ndw` will delete the entire word corresponding to the next instance matching the pattern.

* `d*` will delete everything between the current word and the next match of the current word in the file.

* `d#` will delete everything between the current word and the previous match of the current word in the file.

* `d$` will delete everything to the end of the line.

* `dg$` will delete everything to the end of the visual line, (if there is soft wrapping, it will not continue to delete the content of the line below).

(The following apply if you've added `vim-surround` to your packages.

* `yst."` will surround the selection from the cursor to the next `.` with double-quotes.

* `ysiw)` will surround the (word) in parentheses like so.

* `ysiw(` will surround the word in parentheses, but also add whitespace padding between the ( word ) as so.

* `ysiw<div>` will surround the <div>word</div> like so.

* `ds"` will remove the inner-most double quotes selection.

* `cs"'` will change the inner-most double quotes to single quotes.

### Searching

* Add `:set hlsearch` to your `~/.vimrc` to highlight text matching the current search pattern.

If you've searched for a word, perhaps `/pattern` then you can use some familiar motions to move around, as shown below:

* `ggn`: Go to the first match

* `GN`: Go to the last match

* `n`: Go to the next match

* `N`: Go to the previous match

### Marking

|    Sequence    |                 Command Executed                  |
|:--------------:|---------------------------------------------------|
|                |                                                   |
|       ma       | set mark "a" at current cursor location           |
|       m'       | set the previous context mark line                |
|    m&grave;    | set the previous context mark                     |
|       'a       | jump to the line of mark `a`                      |
|    &grave;a    | jump to line & column of mark `a`                 |
|      d'a       | delete from current line to mark `a`              |
|      c'a       | change text from current line to line of mark `a` |
|       ]'       | jump to next marked line                          |
|       ['       | jump to previous marked line                      |
|    ]&grave;    | jump to next lowercase mark                       |
|    [&grave;    | jump to previous lowercase mark                   |
|       ''       | jump back to previous line                        |
| &grave;&grave; | jump back to previous line & column               |
|    &grave;[    | jump to start of last change/yank                 |
|    &grave;]    | jump to end of last change/yank                   |
|    &grave;<    | jump to start of last visual area                 |
|    &grave;>    | jump to end of last visual area                   |
|    &grave;.    | jump to where the last change was made            |
|    &grave;^    | jump to where insert mode was last stopped        |

## Yanking

* `gg"*yG` will yank the entire file to the system clipboard.

## Special Insert Mode

* Insert a 1-byte character `a` literally

    ```vim
    <C-v>a
    a
    ```

* Insert a 1-byte character `a` by its hexadecimal value

    ```vim
    <C-v>x61
    " a
    ```

* Insert a 2-byte UTF-8 character `爱` by its character code

    ```vim
    <C-v>u7231
    " 爱
    ```

* Insert a 4-byte UTF-8 character 😂 by its character code

    ```vim
    <C-v>U0001f602
    " 😂
    ```

## Command Substitution

```vim
" if you try this command, you'll get an error
source fnamemodify(stdpath('config'), ':h') . '/vim' . '/config.vim'
" E484: Can't open file fnamemodify(stdpath('config'), ':h') . '/vim' . '/config.vim'

" if you try this command, it will work
source `=fnamemodify(stdpath('config'), ':h') . '/vim' . '/config.vim'`
" Sourcing /Users/tommy/.config/vim/config.vim
```

## `netrw`

The `netrw` tool, (which stands for *Network Read/Write*) within vim is a useful way to quickly navigate across folders in your terminal. The standard workflow of constantly typing `cd` and `ls` is far from ideal. Being able to successfully navigate through your filesystem using `netrw` will allow you to develop software with expediency.

* `vi .`: open up the file explorer upon launching, starting in the present working directory.

* `:Tex`: open up the file explorer in a new tab.

* `:Lex`: open up the file explorer on the left-side

* `:Rex`: return to an existing file explore window

### Moving Files

* `mf`: Mark file

* `mF`: Unmark a file

* `mp`: Print marked files

* `mt`: Mark target destination

* `mm`: Move all marked files into the marked target destination

* `mc`: Copy all marked files into the marked target destination

### Creation/Deletion

* `%`: Create file

* `d`: Create directory

* `D`: Delete file

* `R`: Rename file

* `X`: Execute current file

* `x`: Run current file using specified program

## String Manipulation

* Performing brace expansion

    ```vim
    echo split(expand("hunt{er,ed,ing}"), '\n')
    " => ['hunter', 'hunted', 'hunting']
    ```

* Performing filename expansion

    ```vim
    echo expand("~/Documents/file.txt")
    " => '/Users/austin/Documents/file.txt'
    ```

* Performing environment variable expansion

    ```vim
    echo expand("$HOME/Desktop/picture.jpg")

    let g:other_file = expand("%:p:h") . "/other.txt"
    " Modifiers:
    " %         Relative path to the current file
    " :p        Expands to the absolute path
    " :help        Expands to the head (the parent directory of the file)
    " :t        Expands to the tail (the file, without the preceding directories)
    " :r        Expands to the root of the filename (the filename, without the   '.ext'
    " :e        Expands to the just `.ext` of the filename extension only
    ```

* Querying the directories of the XDG Base Directory Specification

    ```vim
    echo stdpath("config")
    " => '/Users/austin/.config/nvim'

    echo stdpath("data")
    " => '/Users/austin/.local/share/nvim

    echo stdpath("cache")
    " => '/Users/austin/.cache/nvim
    ```

* Adding the subdirectories `/vim` and `/vim/after` to the config variable `&runtimepath`

```vim
let &runtimepath .= ','.join(split(expand($XDG_CONFIG_HOME ."/vim{,/after}"),'\n'), ',')
```

* Adding the parent directory of the subdirectory found using `stdpath`

```vim
" (the stdpath() function only exists in `nvim`)
let s:dotfiles = fnamemodify(stdpath('config'), ':h')
echo s:dotfiles
" => '/Users/austin/dot'
```

## Custom Functions & Commands

I wrote this function because I thought it wasn't built in natively, but it serves as a useful example of how to declare a function and how to declare a command.

```vim
" Function to open a wiki page for note-taking
" :help function()
function Jot(entry)
    let entry = glob('~/wiki/content/posts/' . entry)
    " Add the suffix if it hasn't yet been added
    if entry !~ "\.md"
        entry += "\.md"
    endif
    tabedit entry
endfunction

" :help command-nargs
" :help q-args
" Create a command (with tab completion) for opening wiki posts
command -nargs=1 -complete=file_in_path Jot call Jotf(<q-args>)
```

* The `<q-args>` parameter will tell Vim that you'd like to pass in the argument as a string. If you'd like Vim to think you've passed in a variable declared in the environment, use `<args>` instead.

### Quick Note on `&path` and `:find`

In the future, if you want to be able to easily edit a file in the future, you can add the directory that it list within to the `&path` variable. From there, you can simply type `:fin[d] file`.

Once that command is received, Vim will check each directory specified in `&path`, and find a match to `file` or a file that matches `file` and has a suffix specified by `&suffixadd`. If it finds a match, it will open that file for editing in a new buffer. If you'd like it to open in a new tab, you can use `:tabf[ind]` instead.

## For Loop

```vim
for number in [1, 2, 3, 4]
    echo number
endfor
```

## Help Tags

To open up the right help page for your package, sometimes you need to generate the helptags, as this isn't usually done automatically when you clone the package. To do that, run the following command

```vim
" Generate helptags for all help files in the runtime
:helptags ALL
```

## Pattern Searching

* `<C-g>`: Go to next match

* `<C-t>`: Go to previous match

## Useful Window Keybindings

Each of these commands is preceded by `\C-w`, or alternatively, the `:wincmd` command

| Hotkey | Effect |
| :---: | :---: |
| `n` | open a new window (below), open empty |
| `v` | vertical split window |
| `s` | horizontal split window |
| `p` | go to preview window |
| `z` | close preview window |
| `R` | rotate window vertically  |
| `r` | rotate window downwards |
| `r` | rotate window upwards |
| `w` | cycle through windows |
| `p` | go to last accessed window |

## Useful Pending Search Keybindings

| Hotkey |          Effect           |
|:------:|:-------------------------:|
| Ctrl-g | Move cursor to next match |
| Ctrl-t | Move cursor to prev match |

## Netrw

| Hotkey |          Effect          |
|:------:|:------------------------:|
|   mz   | compress/decompress file |

| Hotkey |                     Effect                      |
|:------:|:-----------------------------------------------:|
|  `gh`  |                Start select mode                |
|  `gv`  |         Reselect previous visual block          |
|  `gn`  |   Search forward for last used search pattern   |
|  `gN`  | Search forward for previous used search pattern |
| `dgn`  |   Delete the next match to the search pattern   |
|  `o`   |       Go diagonally across selection area       |
|  `O`   | Go to other side of the current row's selection |
|  `d`   |               Delete highlighted                |
|  `c`   |               Change highlightred               |

## Random Cool Keybindings

| Hotkey |                              Effect                               |
|:------:|:-----------------------------------------------------------------:|
|  `z=`  |                     Suggest spelling for word                     |
|  `@:`  |                      Repeat last ex command                       |
|  `ga`  | Print the UTF-8 character code for the character under the cursor |
|  `:=`  |                    Print the last line number                     |
|  `+`   | Move down to the first non-whitespace character in the row below  |

## Knowing Where to Look For Help

* `:help reference_toc`

* `:help /[`: Help on a character when used for search patterns

* `:help -r`: Help on a character passed as a command line flag

* `:help c_<CR>`: Help on the return key when pressed during command mode

* `:help :echo`: Help on the echo command

* `:help 'option'`: Help on a particular option

* Creating help files: `add-local-help` and `write-local-help` and `help-writing`

## Useful Command Flags when Opening Vim

* Reference: `:help starting.txt`

* Open each file in its own tab

    ```shell script
    # :help -p
    vim -p ./*.md
    ```

* Open each file in the same window, split horizontally

    ```shell script
    # :help -o
    vim -o ./*.md
    ```

* Open each file in the same window, split vertically

    ```shell script
    # :help -O
    vim -O ./*.md
    ```

* Open each file in its own tab

    ```shell script
    # :help -p
    vim -p ./*.md
    ```

* Open a file with the cursor starting on line 13

    ```shell script
    # :help -+
    vim '+13' file.txt
    ```

* Open a file with the cursor starting on the first match to `pattern`

    ```shell script
    vim '+/pattern' file.txt
    ```

* Open a file and immediately execute a command

* Using `+`

    ```shell script
    vim '+echo "hello"' file.txt
    ```

* Using `-c`

    ```shell script
    vim -c 'echo "hello"' file.txt
    ```

All the characters that you type are recorded in the file "scriptout", until
you exit Vim. This is useful if you want to create a script file to be used
with `vim -s` or `:source!`.

```shell script
# -h -w
# -h :complex-repeat

# Append normal mode input to the file `inputs.vim`
vim -w 'inputs.vim' file.txt

# Overwrite `inputs.vim`
vim -W 'inputs.vim' file.txt
```

* Open a file, and execute the commands as input to normal mode of the file `inputs.vim`

```shell script
vim -s 'inputs.vim'
```

## Useful Help Pages

* `:help list-functions`

* `:help key-notation`

## Navigating Compressed Files

* You can use vim to edit compressed files (e.g. `.gz`, `.tar`, and `.zip`)

* Reference `:help pi_gzip.txt`

* Reference `:help pi_tar.txt`

* Reference `:help pi_zip.txt`

## Jump Motions

Useful to check out [`:help jump-motions`](https://vimhelp.org/motion.txt.html#jump-motions)

* `ge`: Move back to the end of the previous word

* `gE`: Move back to the end of the previous WORD

* `(`: Move to the previous sentence.

* `)`: Move to the next sentence.

* `g;`: Jump to the location of the previous change

* `g,`: Jump to the location of the next change

* `]m`: Jump to next function/method

* `[m`: Jump to previous function/method

* `H`: Jump to the top of the window

* `M`: Jump to the middle of the window

## Quickly Open Help

* In normal mode, you can view a help page for the word under the cursor by pressing `K`

## Setting Keybindings

* Setting a keybinding to execute something in command mode

    ```vim
    " Only set the mapping for this <buffer>
    nnoremap <buffer> GG <CMD>echo 'woah'<CR>
    ```

## Completion

* [`:help ins-completion-menu`](https://vimhelp.org/insert.txt.html#ins-completion-menu)

* Set the maximum height of the completion menu to 10 rows

    ```shell script
    set pumheight 10
    ```

## Substitution

Examples of the `:s[ubstitute]` command:

* Substitute matches to pattern with `replacement`

    ```vim
    " One match, the current line
    substitute /pattern/replacement

    " All matches, the current line
    substitute /pattern/replacement/g

    " All matches, every line
    % substitute /pattern/replacement/g

    " One match, current line, case insensitive
    substitute /\cpattern/replacement/g

    " One match, current line, case sensitive
    substitute /\Cpattern/replacement/g
    ```

Examples of the `substitute(expression, pattern, replacement, flags)`
command:

* Substitute first match of `<expr>` with `<replacement>`

    ```vim
    let sentence = 'the quick brown fox jumped over the lazy dog'
    echo substitute(sentence, '\<the\>', 'a', '')
    ```

    ```txt
    a quick brown fox jumped over the lazy dog
    ```

* Substitute every match of `<expr>` with `<replacement>`

    ```vim
    let sentence = 'the quick brown fox jumped over the lazy dog'
    echo substitute(sentence, '\<the\>', 'a', 'g')
    ```

    ```txt
    a quick brown fox jumped over a lazy dog
    ```

### Replacement Expessions

You can use `\=` in a `:substitute` command to signify that you'd like to replace matches to the pattern with *an expression* instead of a string. To learn more, visit [`:help sub-replace-expression`](https://vimhelp.org/change.txt.html#sub-replace-expression)

* Substitute all matches with the result of `<expression>`

    ```vim
    " In this case, <expression> is expand("~")
    % substitute /pattern/\='Directory ' . expand("~")/g
    ```

### Abandoning a git commit

* Prevent `git` from committing after editing the commit message, do:

    ```vim
    :cq[uit]
    ```

Vi will exit with an error code, which aborts the pending commit entirely.

### Clearing Current File

* Edit a new, unnamed buffer

    ```vim
    ene[w]
    ```

### Setting the File Name

* Change the file name of the current buffer to `file.txt`

    ```vim
    f[ile] file.txt
    ```

* Remove the name of the current buffer

    ```vim
    0f[ile]
    ```

### View Wordcount

* View the amount of words written in the current file

    ```txt
    g <C-g>
    ```

