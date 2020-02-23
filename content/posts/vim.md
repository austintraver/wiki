+++
title = "Vim"
description = "The best editor around"
date = 2020-02-04T14:52:27-08:00
image = "vim.jpg"
+++

# Vim

* `vi` was created as the GNU file editor's "visual mode"
* `ex` was created as the GNU file editor's "extended mode".

These two programs were written in C during the mid 1970s and were eventually merged together. Today, `ex` has gone on to become an integral extension of `vi`'s functionality.

* In the early 1990s, `vim` or "`vi` improved" was released, featuring a number of improvements upon the original `vi`

### `vim`'s most notable features

* autocomplete
* spell-check
* diff comparison
* file merging
* regular expressions
* code-folding
* editing files inside a .gzip, .zip, & .tar file
* editing files over SSH
* splitting/tabbing windows
* UTF-8 support
* syntax highlighting


### As of version 8.0, `vim` notably supports

* lists, dictionaries, OOD
* map(), filter()
* lambda functions
* native package manager `:h packadd`
* code-folding `:h folding`

## Learning `vim`

Vim has a tutor mode, which can be accessed by typing `$ vimtutor`
[Check out syntax examples](https://devhints.io/vim)

## `vim` Key Notation

For more help, inside vim type `:h key-notation`

Note that there are 32 control characters, which `vim` has bound to specific key-combos. For instance, **< C-a >** means **⌃ A**. At the time, there wasn't enough room to support any control+shift+char type combos, so **< C-a >** is the same thing as **< C-A >**


|Notation|Meaning|Hotkey|
|:---:|:---:|:---:|
|< BS >|⌫ backspace|**⌃ H**|
|< Tab >| `tab` |**⌃ I**|
|< Esc >|⎋ escape|**⌃ [**|
|< CR >|↩ return|**⌃ M**|

## Moving Around

#### By Character

|Key|Function|
|:---:|:---:|:---:|
|H|← 1 character|
|J|↓ 1 character|
|K|↑ 1 character|
|L|→ 1 character|

#### By Word

|Key|Function|
|:---:|:---:|:---:|
|W|→ to next word|
|E|→ to word ending|
|B|← back to word beginning|

## The Meta Key

In vim, the alt key is often referred to as the **meta key**.

Notation: **< M - x >** is the same as **⌥ X**

{{% notice warning %}}
**Warning:** If you're using MacOS, make sure your terminal has the setting "Use Option as Meta Key" enabled. However, you're not done. You still won't be able to bind
{{% /notice %}}

## Basic Launch Commands

```sh
vim -x text.txt
# start vim in encrypted mode
vim -d file1.txt file2.txt
# start vim in diff mode
vim -e text.txt
# start vim in ex mode
vim -v text.txt
# start vim in vi mode
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

Enter insert mode by typing `i` in command mode.
Exit insert mode by typing **⌃ [** or **Esc**

### `ex` Mode

Also known as nter a command in `ex` mode, enter a `:` in normal mode.

To exit `ex` mode, delete the `ex` command, or press <ESC>

# `ex`

## The history of `ex`

In the mid 1970s, GNU's file editor, `ed` needed some extensions. Instead of updating `ed` itself, Bill Joy developed an **extended** mode `ex` as well as a **visual** mode `vi`

`ex` is a **file** editor, which makes it different than the GNU's **stream** editor `sed`, which was built by Lee McMahon in the early 1970s. The advantage of `ex` is its ability to provide more functionality than what's found in `sed` and `awk`. For instance, `ex` has the ability to handle very complex chains of tasks. `ex` has support for matching statements that span across several lines.


### `ex` Mode

If you're inside `vim` you can enter ex mode by typing `:` in command mode. You will automatically exit ex mode by submitting the command or deleting the text on the line.

{{% notice info %}}
Ex mode is confusingly also referred to as command-line mode since it can be invoked directly from the command line `ex file.txt` or `vim -E file.txt`
{{% /notice %}}

### `ex` Commands

`ex` is an extension of its parent `ed` and supports a very similar syntax to `ed` and `sed`. Unlike `ed` and `sed` however, `ex` is more powerful. For instance, it supports regular expressions that span multiple lines of a file.


#### Range Selection

The first thing to specify to `ex` is the range. Some characters have a special meaning when specifying the range of lines to search.

1. `num` specifies to search just line `num` itself

```txt
(Select just line 5)
:5
```

2. `a,b` specifies lines *a* through *b* inclusive

```txt
(Select lines 2 through 4)
:2,4
```

3. `$` specifies the last line

```txt
(Select all lines from 10 and below)
:10,$
```

4. `%` specifies all lines (equivalent to `1,$`)

```txt
(Select all lines)
:%
```

5. `.` specifies the current line

```txt
(Select all lines before the current line)
:1,.
```

6. `+` specifies the next line(s)

```txt
(Select the next 10 lines, including the current line)
:.,.+10
```

7. `-` specifies the previous line(s)

```txt
(Select the previous 10 lines, including the current line)
:.-10,.
```

8. `/regex` specifies the next line containing the RegEx `regex`

```txt
(Select the first line containing `example` after the cursor current position
:/example
```

9. `?example` specifies the previous line containing the Regex `example`

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

```sh
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

* If the variable is declared with no prefix within a function, it is local to the function.
* If the variable is declared out of a function, it is global, and can be accessed while using vim either as the interactive editor or in a script

An example of setting variables using the `let` keyword

    ```vim
    " Create a script variable called dotfiles pointing to the config directory
    " this variable will not exist outside of the script it was declared in
    let s:dotfiles = fnamemodify(stdpath('config'), ':h')

    " Create a global variable which can be referenced later on if this file has been sourced
    let g:my_variable = [1, 2, 3]
    echo type(g:my_variable)
    " => 3

    " (More info on the type() function) (:h type)

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
```sh
" Enable highlighting for html, ruby, python, and bash "
let g:markdown_fenced_languages = ['html', 'ruby', 'python', 'bash=sh']
" Allow syntax highlighting for code blocks of up to 100 lines (Default is 50) "
let g:markdown_minlines = 100
```

{{% notice warning %}}
**Note:** Bash is not one of the supported languages of Markdown. Therefore, you have to map any `bash` code-blocks to be rendered as `sh` code-blocks with the syntax `bash=sh`
{{% /notice %}}

{{% notice success %}}
**Update:** If you have the latest version of vim, this is no longer necessary, the default mappings include `['c++=cpp', 'viml=vim', 'bash=sh']`
{{% /notice %}}

### Help

You can get help in vim by typing `:help topicname`

Usually this opens in a small window, so you can type **⌃ W O** which will expand the size of the window to encompass the full screen of the terminal. However, this will also close all other windows.

A better option is to have the help page open in its own full-screen tab, which you can do with the substitution below
```vim
" Old method "
:h grep
" New method "
:tab h grep
```

#### Tab navigation (normal mode)
`gt` go to next tab
`gT` go to previous tab
`4gt` go to tab 4

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

`\|` indicates alteration, e.g. `house\|home`
`\(...\)` has two functions
1. it allows for grouping, so that the `*` `\+` and `\=` operators can be used.
2. it allows you to reference it in the replacement string with `\1`, `\2`, etc.
  - e.g. `\([a-z]\).\1` would match `lol` or `kek`
`\+` indicates "one or more" e.g. `\(ha\)\+` is one or more `ha` lines. Would match with `ha` or `haha` or `hahaha`
`\=` will match zero or one of the preceding regular expression.
`{3}` matches the preceding regular expression 3 times. `\(ha\)\{3}` would match `hahaha` but not `haha` or `hahahaha`
`{,3}` matches the preceding regular expression between 0-3 times. It would match `ha` or `haha` but not
`{3,}` matches the preceding regular expression at least 5 times.


## Edit File Remotely

Since `vim` runs inside a terminal, you can use `vim` to edit a file remotely on another computer if it has your SSH key.

```sh
vim scp://user@remote.network/Documents/file.txt
```

## Save & Quit

### In `ex` mode:
* `:wq` Write to the file
  - Displays an error if no changes have been made since the file was opened.
* `:q` Close/quit the file
  - Displays an error if there are unsaved changes
* `:q!` Force-quit from the file, abandoning any unsaved changes
* `:wq!`
* `:qa` Exit from all files
  - Displays an error if there are unsaved changes
* `:qa!` Exit from all files, abandoning any unsaved changes
* `:x` Only write to the file if it has been modified, and then exit

### In Normal mode:
* `ZZ` only write to the file if it has been modified.
  - equivalent to `:x`

{{% notice warning %}}
**Warning:** Even if you haven't made any changes, `:wq` will update the file's last modified date to the current time. To avoid this, use `:x`
{{% /notice %}}

### Confirmation Prompt

If you'd rather not have an error thrown at you when you're trying to exit a file, you can have `vim` ask you if you'd like to save your changes when you try to quit from a file. Just add `set confirm` to your `.vimrc` file.

## Changing Directories With `ex` Mode

### `:cd`
* `:cd .. ` will change to the parent directory
* `:cd-` will change to the previous directory
* `:cd %:h` will change to the directory of the current file

### `:pwd`
* prints the present working directory


## Custom `ex` commands

You can add these to your `.vimrc` to add custom `ex` commands.

### User Defined Commands

User defined commands uses the `command` keyword, and has the following syntax

```
command WriteAndQuit wq
```

This will allow you to type `:WriteAndQuit` as an `ex` command and substitute `:wq` in its place.

## Override Existing Commands

Overriding pre-defined commands uses the `:ca` keyword (command abbreviate), and has the following syntax

```
ca w up
```

Now when we use the `:w` command it will be replaced with the `:up` (update) command. This is a good idea, because when you use the `:w` command, you are writing the current buffer even if there are no changes, which sets the file as modified.

However, there's a problem. If `:up` was modified, we would want it to preserve its original meaning. To do this, we'll disable remaps for the right hand side argument, with the `cnorea` (command no remap abbreviate) keyword.

`cnorea w up`

{{% notice success %}}
**Good News:** Although `vim` tells you that custom commands must start with an upper case letter, using `cnorea` allows you to bypass this rule entirely. Customize away!
{{% /notice %}}

### Editing Text Commands

Usually it's referred to as copy, cut, and paste, but in the interest of having the verb match the keybindings, the translation is as follows for `vim`

* copy is yank (yy & Y)
* cut is delete (dd)
* paste is put (p)

## Move Lines in `ex` Mode

No need to cut a group of lines and then paste it somewhere else, you can use the `:m[ove]` command to send a range of lines to be below the specified line.

```
:3,8m 23
```

## Copy Lines in `ex` Mode

You have some choices, you can use `:t` or `:co[py]`, which will paste the range of lines below the specified line.

```
:3,8t 23
```

## Telling `vim` about the filetype

If you want to enable syntax highlighting but you're in a file without a file extension, you can use the `:set` command to modify the `ft` value, and tell `vim` what file to treat it as.

```
:set ft=sh
```

## Using the shell without leaving vim

```
:sh
```

And just press <C-d> when you're done to return to vim

## Managing Viewports

If you open a help page, it opens a viewport in the top vertical half of the screen. This is a good time to learn the commands for managing multiple viewports, as it's often useful to be working on multiple documents at once.

{{% notice tip %}}
**Tip:**: You can press `K` in normal mode to open a help page on whatever word the cursor is currently on.

The typical syntax for managing a viewport in normal mode is ⌃ W <key>. Luckily you don't have to let go of the <Ctrl> key when you press the second key, as `vim` binds both `<C-w>o` and `<C-w><C-o>` to the same function by default.

{{% notice warning %}}
**Warning:** This doesn't always hold true. For instance, `<C-w><C-c>` won't close the active window, but `<C-w>c` will. The reason is that `<C-c>` is the undo command, so `vim` decided not to rebind it.
{{% /notice %}}

To see all of the bindings, type `:tab h index`

### Focusing Windows

|Shortcut|Function|
|:---:|:---:|
|⌃ w h|Focus on the window to the left|
|⌃ w j|Focus on the window below|
|⌃ w k|Focus on the window above|
|⌃ w l|Focus on the window to the right|
|⌃ w w|Focus on the next window (wraps around)|

### Moving Windows

|Shortcut|Function|
|:---:|:---:|
|⌃ w H|Move active window to the left|
|⌃ w J|Move active window to the bottom|
|⌃ w K|Move active window to the top|
|⌃ w L|Move active window to the right|


### Opening/Closing Windows

|:---:|:---:|:---:|
|⌃ w s|Horizontally split the current window|`:sp`|
|⌃ w v|Vertically split the current window|`:vsp`|
|⌃ w q|Quit the active window|`:q[uit]`|
|⌃ w c|Close the active window |`:clo[se]`|
|⌃ w o|Close all other viewports, making this viewport full-screen|`:only`|

### Navigating Tabs

|Shortcut|Function|`ex` Command|
|:---:|:---:|:---:|
|`gt`|Go to the next tab|`:tabn[ext]`|
|`3gt`|Go to the 3rd tab|`:tabn3`|
|`gT`|Go to the previous tab|`:tabp[revious]`|
|`1gt`|Go to the first tab|`:tabn1`|
|`N/A`|Go to the last tab|`:tabl[last]`|

### Opening/Closing Tabs

|`⌃ w T`|Open active window in its own tab|
|`⌃ w c`|Close the current tab|`:tabc[lose]`|
|`N/A`|Close all other tabs|`:tabo[nly]`|

{: notice--info}
**Tip:** Use `:tabe file.txt` to open `file.txt` in a new tab.


## Registers

* Register `%` contains the name of the current file

* Register `#` contains the name of the alternate file

* Register `":` contains the most recently executed command

* Register `".` contains the most recently inserted text

* Register `"/` contains the most recently searched for pattern

* Register `"_` is a black-hole register, useful for scripting when you don't want to modify the contents of current registers

* register `"+` is the computer's clipboard. If you want to copy or paste a range of code, you can use this register to do so.
    - In normal mode: type `gg"+yG` to copy the entire files contents in your clipboard
    - In ex mode: You can use the `:y[ank]` comamnd, for instance, `:%y+` will copy the current file's contents into your clipboard as well


### Writing to registers

```vim
" Modifying the most recently searched item
let @/ = "hello"
```


### `vimdiff`

On your terminal, the `vim` command has a `-d` flag which you can use to activate vim's *diff mode*.

```sh
vim -d old.txt new.txt
```

### Filepath Shortcuts

To test any of these out, you can type `echo expand('%:p')`

* `%:.` the filepath relative to the current directory `vim.md`
* `%:~` the filepath relative to the home directory `~/notes/_pages/vim.md`
* `%:p` the absolute filepath `/Users/atraver/notes/_pages/vim.md`
* `%:r` the filename root, without the extension `vim`
* `%:e` the filename extension, without the root `md`

Splitting the filepath can be done by appending `:h` or `:t` as follows:

* `%p:h` the `:h` will return everything left of the right-most `/`, in this case being `/Users/austin/notes/_pages`
* `%p:t` does the exact same thing, but will return everything right of the right-most `/`, in this case being `vim.md`

### Motions (Text Objects)

In vim, *motions*, otherwise known as *text objects* can be used to execute a modification in a way more specific than anything possible using just the mouse. They follow the following structure:

```
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

* `ct:`: Change the text from the cursor right up to the next `:` to the right.i

* `%`: Not really a motion command, but it will go to the matching `(`, `{`, `[``)`, `}`, or `]` character.

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

* `gnd` will delete the next match to the current pattern.

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

|Key Sequence|Command Executed|
|:---:|:---:|
| ma | set mark "a" at current cursor location |
| m' | set the previous context mark line |
| m&grave; | set the previous context mark |
| 'a | jump to the line of mark `a` |
| &grave;a | jump to line & column of mark `a` |
| d'a | delete from current line to mark `a` |
| d&grave;a | delete from current cursor position to position of mark `a` |
| c'a | change text from current line to line of mark `a` |
| y&grave;a | yank text to unnamed buffer from cursor to position of mark `a` |
| ]' | jump to next marked line |
| [' | jump to previous marked line |
| ]&grave; | jump to next lowercase mark |
| [&grave; | jump to previous lowercase mark |
| '' | jump back to previous line |
| &grave;&grave; | jump back to previous line & column |

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
:source fnamemodify(stdpath('config'), ':h') . '/vim' . '/config.vim'
" E484: Can't open file fnamemodify(stdpath('config'), ':h') . '/vim' . '/config.vim'

" if you try this command, it will work
:source `=fnamemodify(stdpath('config'), ':h') . '/vim' . '/config.vim'`
" Sourcing /Users/tommy/.config/vim/config.vim
```

## `netrw`

The `netrw` tool, (which stands for *Network Read/Write*) within vim is a useful way to quickly navigate across folders in your terminal. The standard workflow of constantly typing `cd` and `ls` is far from ideal. Being able to successfully navigate through your filesystem using `netrw` will allow you to develop software with expediency.

### Getting Started

* `vi .`: open up the file explorer upon launching, starting in the present working directory.
* `:Tex`: open up the file explorer in a new tab.


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
    " :p		Expands to the absolute path
    " :h		Expands to the head (the parent directory of the file)
    " :t		Expands to the tail (the file, without the preceding directories)
    " :r		Expands to the root of the filename (the filename, without the '.ext'
    " :e		Expands to the just `.ext` of the filename extension only
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
