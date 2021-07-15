---
title: "Zsh"
description: "Your new favorite programming language"
date: 2020-02-04T14:52:27-08:00
draft: false
---

# Zsh

## Shell Scripting Primer

There are a handful of shell scripting languages, many of which will come by default with your operating system. On both macOS and Linux based operating systems, you can count on having at least one of the following shells by default.

* `sh`: the Bourne shell, written in 1977 for Unix
* `ksh`: the Korn shell, written in 1983 by David Korn for Bell Labs
* `bash`: the Bourne Again shell, written in 1989 by Brian Fox for GNU
* `zsh`: the Z shell, written in 1990 by Paul Falstad, released open source under the MIT license

{{% aside info %}}

**TIL:** All of these shell scripting languages were written in the `C`
programming language.

{{% /aside %}}

This guide uses `zsh` as the shell language of choice, so your mileage may vary if you try to use these commands in another shell scripting language. The reason `zsh` is chosen is because it's the default shell on the macOS operating system, but more importantly, because it is my favorite shell

## Key Concepts

This guide is more of a reference than a tutorial, so expect the sections to jump around a fair bit.

People often forget the [distinction between argument, option, and parameter](https://stackoverflow.com/questions/36495669/difference-between-terms-option-argument-and-parameter)

## I/O

### `read`

### `getopt`

There exists a builtin command `getopts` but it does not accept long-form command arguments. Therefore, it is useful to use GNU's `getopt` utility function to parse command-line arguments in shell scripts.

**Useful Flags:**
* `-o` or `--options`, specify the short-form options that can be supplied to this program
* `-l` or `--long`, specify the long-form options that can be supplied to this program

For each option declared after the `--options` or `--long` flag, that option can be proceeded by 1 colon, indicating that this option has a required argument, or by 2 colons, indicating that this option has an optional argument

It's a little easier to explain with an example:

```shell
if [[ $# -eq 0 ]]; then
  print "Error: no options provided" >&2
  exit 1
fi

# Call getopt to validate the provided input.
options=$(getopt -o ho:i:w:: -l help,output:,input:,where:: -- "$@")

if [[ $? -ne 0 ]]; then
  print "Error: incorrect options provided" >&2
  exit 1
fi

eval set -- "${options}"
while true; do
  case "$1" in
  -h|--help)
    print "I'm sorry Dave, I'm afraid I can't do that"
    ;;
  -o|--output)
    ofile=$2
    shift 2
    ;;
  -i|--input)
    ifile=$2
    shift 2
    ;;
  -w|--where)
    case "$2" in
      "")
        location="not specified"
        shift 2
        ;;
      *)
        location="$2"
        shift 2
        ;;
    esac
    ;;
  --)
    shift
    break
    ;;
  esac
done

if [[ ${ifile} ]]; then
  print "Input file is ${ifile}"
fi

if [[ ${ofile} ]]; then
  print "Output file is ${ofile}"
fi

if [[ ${location} ]]; then
  print "Location is ${location}"
fi
```


## Tilde Expansion & Wildcards

* `*` matches any string of characters
* `?` matches any single character. `file.?`, for instance, would match `file.c` and `file.o` but not `file.cpp`
* `[abc]` will match a single character, either a, b, or c.

## Login Shells

A login shell is started when you open your terminal, or login to another computer via `ssh`. But here is where it gets tricky. If you open your terminal, and you see your shell prompt, opening up a new shell inside of it would **not** be a login shell.

```shell
zsh
```

And yet, the following would be a login shell, because it uses the `-l` flag to log in.

```shell
zsh -l
```

Run each of these commands below to help you test whether or not your shell is a login shell:

```shell
# Run this command first
if [[ -o login ]]; then; print yes; else; print no; fi

# Enter a non-login shell
zsh

# Run this command second
if [[ -o login ]]; then; print yes; else; print no; fi

# Exit the non-login shell that you just opened up
exit
```

A script is non-interactive, since it's executed as a command, and freezes your terminal until you finish. However, a script will be treated as interactive if it is executed with the `-i` flag. You can test this with the code below.

A shell is interactive as long as it was not started with either a non-option argument or the `-c` flag.

```shell
case "$-" in
  *i*)    print This shell is interactive ;;
  *)    print This shell is not interactive ;;
esac
```

Subshells will retain the value of variables exported to the environment. 
In order to create a subshell with a clean environment, you need to pass
specific commands to `exec` and `zsh`, as shown below:

* Create a subshell with a clean user environment

    ```shell
    exec -c -l zsh -d -f
    ```
    
    A breakdown of the arguments provided below

    `exec`

    * `-c`: clear the environment

    * `-l`: simulate login shell (prepend `-` to `argv[0]`)

    `zsh`

    * `-d`: ignore global runtime configuration files

    * `-f`: ignore user runtime configuration files

## User and System runtime configurations

It comes down to whether the files are in `/etc` or `${HOME}`.

* An rcfile located in `/etc` will load for any user on the machine.
* An rcfile located in `~/` will load for only that user.
* When a shell is a login shell, it will source `/etc/zprofile` and `~/.zprofile` in that order.
* When a shell is a interactive shell, it will source `/etc/zshrc` and `~/.zshrc` in that order.
* Regardless of the shell, `zsh` will source `/etc/zshenv` and `~/.zshenv` in that order.

* Trace execution of files sourced on startup:

    ```shell
    zsh -o SOURCE_TRACE
    ```

## Command Substitution

{{% aside success %}}

**Tip:** You can learn more about [command substitution](https://zsh.fyi/expansion#Command-Substitution) by visiting [zsh.fyi](https://zsh.fyi)

{{% /aside %}}

[command substitution]: https://zsh.fyi/expansion#Command-Substitution

Sometimes you're in a situation where you'd like to run a command, but you don't know what the input value should be yet. Yes, you could save a variable, but that wouldn't be the properly lazy way of doing things. You can treat a substitute the output of a function by placing it inside `$(here)`

Using command substitution allows us to take the output from a command, and use at as the input for a different command. In the following example, the output of the command `whoami` is substituted as input for the command `print`:

```shell
print "My name is $(whoami)"
```

{{% samp %}}

My name is ttrojan

{{% /samp %}}

## Parameter Expansion

{{% aside success %}}

**Tip:** You can learn more about [parameter expansion](https://zsh.fyi/expansion#Parameter-Expansion) by visiting [zsh.fyi](https://zsh.fyi)

{{% /aside %}}

* Example of parameter expansion

    ```shell
    name='Austin'
    print My name is ${name}
    ```

    {{% samp %}}

    My name is Austin

    {{% /samp %}}


### Expansion Modifiers

* `${parameter:-word}`
  * If parameter is unset or null, the expansion of word is substituted. Otherwise, the value of parameter is substituted.

* `${parameter:=word}`
  * If parameter is unset or null, the expansion of word is assigned to parameter. The value of parameter is then substituted. Positional parameters and special parameters may not be assigned to in this way.

* `${parameter:?word}`
  * If parameter is null or unset, the expansion of word (or a message to that effect if word is not present) is written to the standard error and the shell, if it is not interactive, exits. Otherwise, the value of parameter is substituted.

* `${parameter:+word}`
  * If parameter is null or unset, nothing is substituted, otherwise the expansion of word is substituted.

* `${(P)parameter}`

    * Normally, `${parameter}` will expand to become the value of the variable whose identifier is `parameter`. By prepending the `(P)` *parameter expansion flag*, the shell will instead perform two dereferences. The value returned will be the value of the identifier whose name is stored in `${parameter}`.

        ```shell
        for parameter in XDG_{DATA,CONFIG,CACHE}_HOME; {
            print "${parameter} -> ${(P)parameter}"
        }
        ```

        {{% samp %}}

        XDG_DATA_HOME -> ~/.local/share
        XDG_CONFIG_HOME -> ~/.config
        XDG_CACHE_HOME -> ~/.cache

        {{% /samp %}}


## Conditional Expressions

When coding, we typically expect *less than* to be represented by the `<`
character. In shell scripting, however, the `<` symbol has an entirely seperate
meaning (more on that later). To perform an equality check, we have to use `-lt`
to signify the same meaning. Also, we will use square brackets `[[ ]]` to
contain the statement, and literally specify `then` as well as the end of our if
statement. An example is provided below.

```shell
name='Austin'
if [[ ${name} == 'Austin' ]]; then
  print "His name is Austin"
else
  print "his name is not Austin"
fi
```

{{% aside info %}}

**Tip:** You can use the `;` character to signify a newline without actually
providing one. This is useful for compressing a script or writing
one-liners on your terminal.

{{% /aside %}}

* Check the user

    ```shell
    # Check if the script is being executed by the root user
    if [[ ${UID} -ne 0 ]]; then print "You are not the root user"; fi
    ```

### All Conditional Flags

|Comparator|Meaning|
|:---:|:---:|
|`-eq`|is equal to|
|`-ne`|is not equal to|
|`-lt`|is less than|
|`-le`|is less than or equal to|
|`-gt`|is greater than|
|`-ge`|is greater than or equal to|
|`-z`|is null|

{{% aside warning %}}

**Warning:** In shell scripting, you can only use `==` and `!=` to see if two
**strings** are of equal value.

{{% /aside %}}

## Arithmetic Evaluation


```shell
number=4
if (( number < 5 )); then
  print "Number is less than five"
else
  print "Number is not less than five"
fi
```

Output

{{% samp %}}

Number is less than five

{{% /samp %}}

In order to perform arithmetic operations, surround variable names, integers, and operators in a `((...))` double quotations, like this:

* Adding to `1` the number `2`

    ```shell
    value=1
    ((value+=2))
    print ${value}
    ```

    {{% samp %}}

    3

    {{% /samp %}}

If you don't do that, the variable is interpreted as a string, and the number will be *appended* to the variable's current value.

* Appending to `1` the character `2`

    ```shell
    # Appending '1' to the string '2'
    value=1
    value+=2
    print ${value}
    ```

    Output

    {{% samp %}}

    12

    {{% /samp %}}

### `ls`

#### Useful Flags

|Flag|Purpose|
|:---:|:---:|
|`-A`|Reveal hidden files (except `.` and `..`)|
|`-l`|List in long format|
|`-h`|Describe file-size in terms of `G`, `M`, `K`, etc.|
|`-k`|Describe file-size in terms of kilobytes|
|`-t`|Sort by time modified (newest -> oldest)|
|`-u`|Sort by time last accessed (newest -> oldest)
|`-S`|Sort by size (largest -> smallest)|
|`-r`|List the files in reverse lexicographical order|

### Colorized `ls`

* If you're on macOS, you're likely using BSD's `ls`. To colorize the output of `ls`, include the `-G` flag or add `typeset -xg CLICOLOR=1` to your runtime configurations.

* If you're using GNU's `ls`, supply the `--color=auto` argument to colorize the output of `ls`.

## Escaping Characters

Some characters take on a special meaning when they are escaped

|Character|Escaped Meaning|
|:---:|:---:|
|`\a`|alert (bell)|
|`\b`|backspace|
|`\e`|escape|
|`\n`|newline|
|`\r`|carriage return|
|`\t`|tab|
|`\x41`|1-byte UTF-8 character|
|`\u2318`|2-byte UTF-8 character|
|`\U0001f602`|4-byte UTF-8 character|

Some characters are special by default, and must be escaped by the escape character `\` in order for `zsh` to interpret them literally

|Character|Un-Escaped Meaning|
|:---:|:---:|
|`\`|Escape character|
|`/`|Pathname directory separator|
|`$`|Variable expression|
|`&`|Background job|
|`?`|Character wildcard|
|`*`|String wildcard|
|`(`|Start of sub-shell|
|`)`|End of sub-shell|
|`[`|Start character-set wildcard|
|`]`|End character-set wildcard|
|`{`|Start command block|
|`}`|End command block|
| `|` |Pipe|
|`!`|Logical NOT|
|`;`|Command separator|
|`'`|Strong quote|
|`"`|Weak quote|
|`~`|Home directory|
| \` |Backtick|
|`#`|Comment|

Some characters are special, but only some of the time, such as `,`, for example, in the case of brace expansion

```shell
print cod{e,er,ing}
```

{{% samp %}}

code coder coding

{{% /samp %}}


## Single Quotes

If a string is inside of single quotes, every character inside will be preserved literally, thus no escaping is possible. The only character that can't be typed is the single quote `'` which signals the end of the string.

## Double Quotes

Double quotes are a little more permissive than single quotes.

* The dollar sign `$` retains its special meaning.
* The backtick &grave; retains its special meaning.
* A back-slash `\` only retains its special meaning when escaping a `$`, &grave;, `"` or a newline character.


### Run a job in the background

When a program is run in the background, the program is forked, and run in a sub-shell as a job, running asynchronously. You can add a single ampersand `&` at the end of a command to have it run in the background.

* Run a program in the background

    ```shell
    python example.py &
    ```

* Run multiple programs in the background (with only a single command)

    ```shell
    python one.py & python3 two.py & python3 three.py &
    ```

### Run commands sequentially

You can use a double ampersand `&&` to signal for commands to run in sequential order. The second command will only run if the first command doesn't fail. A program fails if it returns a number other than 0.

* Only run the Python program `second.py` if the Node program `first.js` ended successfully

    ```shell
    node 'first.js' && python 'second.py'
    ```

You can use a double pipe `||` to signal for a command to run only if the previous command fails.

* If Bash program `attempt.rb` did not end successfully, run the Ruby program `backup.sh`

    ```shell
    bash 'attempt.rb' || ruby 'backup.sh'
    ```
 
### `/dev/null`

#### Your own personal black hole

`/dev/null` is a very useful tool. If you're ever in a situation where you need to redirect output, but you have nowhere to put it, you can redirect it to `/dev/null`. This will accept input and essentially vaporize it. You won't see anything printed to your terminal, and nothing will be saved to a file.

Run this command in your terminal to see what happens.

```shell
print "Silenced" &> /dev/null
```

However, there's an even easier way to do it. You can combine `stdout` and `stderr`, file descriptors `1` and `2` respectively using the `&>` redirection command, and then append a `-` to close both of the file descriptors.

Easier to demonstrate with an example

```shell
func() {
  print "Standard Output" >&1
  print "Standard Error" >&2
}
```

* Execute `func` with both file descriptors open

    ```shell
    func
    ```

    {{% samp %}}

    Standard Error
    Standard Output

    {{% /samp %}}

* Execute `func` with both standard output closed

    ```shell
    func 1>&-
    ```

    {{% samp %}}

    func:1: 1: bad file descriptor
    Standard Error

    {{% /samp %}}

* Execute `func` with both standard error closed

    ```shell
    func 2>&-
    ```

    {{% samp %}}

    Standard Output
    func:2: 2: bad file descriptor

    {{% /samp %}}

## Shell Arguments, Options, Flags

Sometimes you want to specify an option/flag (same thing)

Maybe `-v` should print verbose output. But other times, there's an argument associated with the flag, such as `-o file.txt`. In this case, `file.txt` is known as an *option argument*

### Parsing Command-Line Arguments

The keyword `${@}` contains the set of all arguments to a program/function

* Printing out all of the arguments to a function

    ```shell
    func() {
      for arg in ${@}; do
        print "Argument: ${arg}"
      done
    }
    ```

    ```shell
    func 'one' 'two' 'three'
    ```

    {{% samp %}}

    Argument: one
    Argument: two
    Argument: three

    {{% /samp %}}

### Reading I/O

### `read`

* Prompt for input with `Write some text: `, save to variable `variable`

    ```shell
    read -r 'variable?Write some text: '
    ```


* Prompt for password, save to variable

    ```shell
    # Save the result in the variable 'secret'
    read -rs 'secret?Password:'
    print "You entered ${secret}"
    ```

* Pass each word from piped input into array `words`

    ```shell
    print "alpha bravo charlie" | read -A words
    print -l ${words}
    # alpha
    # bravo
    # charlie
    ```

* Read each line of `file.txt` into an array

    ```shell
    text=$(<file.txt)      
    lines=(${text// /\\ })
    ```

* Save contents of `/dev/stdin` to variable `text` 

    * Fast form (command substitution + file redirection)

        ```shell
        text=$(<&0)
        ```

    * Slow form (`read` builtin)

        ```shell
        read -u 0 -d '' text
        ```


* Printing all of the files in a directory

    ```shell
    print -l ./dir/*(.)
    ```

* Print the names of subdirectories found within packages installed to `/usr/local/opt`:

    ```shell
    print -l /usr/local/opt/*/*(/:t) | sort | uniq
    ```

# Looping

## While loops

```shell
typeset -i index=0
while (( ${index} < 5 )); do
  print ${index}

  # Lame variable increment
  index=$((index+1))

  # L33t variable increment
  ((index+=1))

done
```

# Anonymous Functions

Zsh supports anonymous functions, which allow us to prevent variables from leaking in scope.

This is particularly useful when you're building a script that will be sourced
by the shell, such as `.zshenv` or `.zshrc`. Ideally, we'd prevent our script 
from polluting the shell environment with variables that are left lingering at
the end of our script's execution. We can do so by nesting our code inside of
anonymous functions.

Without using an anonymous function, the identifier used as the iterator
in a for-loop **persists beyond the evaluation** of the for-loop itself:

```shell
integer i
for i in {1..3}; do 
    print ${i}; 
done
integer -p i
```

Output

{{% samp %}} typeset -i a=3 {{% /samp %}}

By nesting our declaration of the for-loop iterator 
within an anonymous function, we can prevent the scope
of the variable from leaking into the greater namespace

```shell
(){ 
    integer i
    for i in {1..3}; 
        do print ${i}; 
    done
}
integer -p i
```

Output

{{% samp %}} integer: no such variable: i {{% /samp %}}

You can also use the pre-increment (`++i`) and post-increment (`i++`) operators
within the double parenthesis block `(( ))`

* Using the pre-increment operator:

    ```shell
    typeset -i a b
    a=10
    (( b = a++ ))
    print "a=${a}\nb=${b}"
    ```

    Output

    ```txt
    a=11
    b=10
    ```

* Using the post-increment operator:

    ```shell
    typeset -i a b
    a=10
    (( b = ++a ))
    print "a=${a}\nb=${b}"
    ```

    Output

    ```txt
    a=11
    b=11
    ```


## String Manipulation

String manipulation allows you to rename files, implement boolean logic, along
with many other uses. Every variable stored as string can be referenced with
the syntax `${string:position:length}`

## Index Slicing

* Print the first three numbers 

    ```shell
    val='0123456789'

    print ${val:0:3}
    ```

    {{% samp %}}

    012

    {{% /samp %}}


* Print every number after index 5

    ```shell
    val='0123456789'

    print ${val:5} # 56789
    ```

    {{% samp %}}

    56789

    {{% /samp %}}

* Print the last 3 numbers

    ```shell
    val='0123456789'

    print ${val:(-3)}
    ```

    {{% samp %}}

    789

    {{% /samp %}}

* Print everything except the first 2 numbers and last 3 numbers

    ```shell
    val='0123456789'

    print ${val:2:(-3)}
    ```

    {{% samp %}}

    23456

    {{% /samp %}}

* Print two numbers starting from the 6th-to-last number

    ```shell
    val='0123456789'

    print ${val:(-6):2}
    ```

    {{% samp %}}

    45

    {{% /samp %}}

* Print the last 9 letters of a scalar type variable

    ```shell
    # Not a real SID, to be clear.
    TWILIO_ACCOUNT_SID=1f024f2f13r123456789
    print ${TWILIO_ACCOUNT_SID[-9,$]}
    ```

    {{% samp %}}

    123456789

    {{% /samp %}}

## Substring Matching

If you're looking for a way to remember these, there's a trick I use:

Look down at your keyboard

  - `#` is on the left, so it cuts off the left-side.
  - `$` looks like an S, so it's the string.
  - `%` is on the right, so it cuts off the right-side.

* `string#pattern`: Delete the shortest possible match of `pattern` from the front of `string`.
* `string##pattern`: Delete the longest possible match of `pattern` from the front of `string`.
* `string%pattern`: Delete the longest possible match of `pattern` from the end of `string`.
* `string%%pattern`: Delete the longest possible match of `pattern` from the end of `string`.

```shell
string='one/two/three/four/five'
print ${string#*/} # two/three/four/five
print ${string##*/} # five
print ${string%/*} # one/two/three/four
print ${string%%/*} # one
```

## Length of a String

```shell
checksum=${(s< >)$(shasum -a 256 file.txt)[1]}
print ${(N)checksum##*}
# 64
```

## Cutting Out The Middle

Using the parameter expansion flag `(S)`, you can actually specify for the pattern to match substrings, similar to the way `grep` and `sed` work. For the `#` and `%` parameter expansion flags, they will still seek to cut from the beginning and the end respectively, but will cut out the first match found to the pattern (non-greedy) from the middle of the string. You can use `##` and `%%` to perform greedy searches.

* Remove the (S)ubstring `two` on the left

    ```shell
    string='one/two/three/two/one'
    print ${(S)string#two}
    ```

    {{% samp %}}

    one//three/two/one

    {{% /samp %}}

* Remove the (S)ubstring `two` on the right

    ```shell
    string='one/two/three/two/one'
    print ${(S)string%two}
    ```

    {{% samp %}}

    one/two/three//one

    {{% /samp %}}

* Extract the (M)atching (S)ubstring in the middle

    ```shell
    string='one/two/three/two/one'
    print ${(MS)string#/t*o/}
    ```

    {{% samp %}}

    /two/three/two/

    {{% /samp %}}

* Non-greedy match starting from the left

    ```shell
    string='the quick brown fox'
    print ${(MS)string#q*o}
    ```

    {{% samp %}}

    quick bro

    {{% /samp %}}

* Greedy match starting from the left

    ```shell
    string='the quick brown fox'
    print ${(MS)string##q*o}
    ```

    {{% samp %}}

    quick brown fox

    {{% /samp %}}


## Splitting Strings

You can index a string by its word index (1-indexed), even if there is punctuation in the sentence by using the (w) flag inside of square braces.

```shell
var='This sentence   has  inconsistent spaces'
print ${var[(w)5]}
```

{{% samp %}}

spaces

{{% /samp %}}

```shell
var='Sentence one. Sentence two.'
print ${var[(w)4]}
```

{{% samp %}}

two.

{{% /samp %}}

```shell
var='You can even get the word that comes last'
print ${var[(w)-1]}
```

{{% samp %}}

last

{{% /samp %}}

* Strip any leading/trailing whitespace from a parameter:

    ```shell
    typeset var=$'\n\t   abc   def   \t\n'
    # Strip leading/trailing whitespace from ${var}
    var=${(MS)var##[[:graph:]]*[[:graph:]]}

    # Print the value of ${var} after having removed leading/trailing whitespace
    print -n ${var}
    ```

    Output:

    {{% samp %}}

    abc   def

    {{% /samp %}}

## Referencing Command History

* `!!` the previous command and all arguments

* `!*` the previous command's arguments

* `!^` the previous command's first argument

* `!$` the previous command's last argument

* `!:2` the previous command's second argument

* `!^-`: all the arguments of the previous command *except* for the last argument

* `!:-`: the previous command except the last argument

* `!#` the current command typed thus far

* `!grep`: the most recent command starting with `grep`

* `!?string?`: the most recent command containing `string`

* `!-2`  the penultimate command

* `!#:0` the command being typed

* `!#:2` the second argument of the current command being typed

Next, attached below are expansions for arguments outside the context of command history

* `$_` an environment variable storing the last argument of the previous command

* `$$` the process ID itself

* `$*` a string containing all arguments entered on the last command

* `$1` the first argument supplied to a command (if accessing command arguments from within a function script)

* `$2` the second argument supplied to a command (if accessing command arguments from within a function or script)

* `$@` all arguments supplied to a command (if accessing command arguments from within a function or script)

* `$?` the return value of the previous command

* `$-` the current options set for the shell (the single letter option names concatenated into a string)

* Copy the last command to your [pasteboard](https://developer.apple.com/documentation/uikit/uipasteboard)

    ```shell
    pbcopy < =(<<<"!!")
    ```

* Reference the first argument of the previous command

    ```shell
    print first second third
  
    print !^
    # => "first"
    ```

* Reference the last argument of the previous command

    ```shell
    print first second third
  
    print !:$
    # => "third"
    ```

* Reference the second argument of the previous command

    ```shell
    print 'first' 'second' 'third'
  
    print !:2
    ```

    {{% samp %}}

    `print 'second'`
    second

    {{% /samp %}}

* Reference all arguments of previous command, excluding the last argument

    ```shell
    print first second third
  
    print !:^-
    # => This command would call `print 'first' 'second'`
    ```

* Reference the second-to-last command

    ```shell
    print 'three'
    print 'two'
    print 'one'
  
    !-2 # This command would call `print 'two'`
    ```


### Substituting Text in Previous Commands

```shell
# [ Option 2 ]
^brown^blue
```

{{% samp %}}

print the quick blue fox

{{% /samp %}}

Global Substitution:

Using the previous syntax, you will only replace the first instance matched. If you want to replace all matches to the pattern, use the syntax below:

* Replace the first match to a pattern:

    ```shell
    attitude="it is what it is"
    print ${attitude:s/is/be}
    ```

    {{% samp %}}

    it be what it is

    {{% /samp %}}

* Replace all matches to a pattern

    ```shell
    attitude="it is what it is"
    print ${attitude:gs/is/be}
    ```

    {{% samp %}}

    it be what it be

    {{% /samp %}}

{{% aside info %}}

**Note:** When you are referring to parts of the previous command using the
special characters `^`, `$`, `*`, `-`, or `%`, you can leave out the colon
character, `:`, used to declare substitutions, that usually follows the `!!`
character,

{{% /aside %}}


## Directory Expansion

* `~+`: Expands to `$PWD`
* `~-`: Expands to `$OLDPWD`

## Loading Bar

You can use ANSI escape codes to make a loading bar

```shell
for i in {1..100}; do
  # Print the loading as a percentage, with color formatting
  print "Loading: \x1b[38;5;${i}m${i}%%\x1b[0m\n"
  sleep 0.01
  # Return to the previous line above
  print "\x1b[1F"
done
# Return to the line below
print "\x1b[E"
```

```shell
for i in {1..255}; do
  print "\x1b[38;5;${i}mwow\x1b[0m\n"
  sleep 0.01
  print "\x1b[1F"
done
# Return to the line below
print "\x1b[E"
```

## Read Words Into Array


* Read in each word of `file.txt` into the array `${words}`

    ```txt
    (file.txt)
    the day is sunny and
    the sky is blue
    ```

    ```shell
    words=($(<file.txt))
    print "There are ${#words} words"
    print ${words}
    ```

    Output

    {{% samp %}}

    There are 10 words
    the day is sunny and the sky is blue 

    {{% /samp %}}

## Sending Signals With Kill

The builtin command `kill` is used to send signals to a process.

You can specify the signal by its number, or by its name.

## Handling Signals With Trap

```shell
TRAPINT() {
    print "TRAPINT() called: ^C was pressed"
}

TRAPQUIT() {
    print "TRAPQUIT() called: ^\\ was pressed"
}

TRAPTERM() {
    print "TRAPTERM() called: \`kill\` command received"
}

TRAPEXIT() {
    print "TRAPEXIT() called: happens at the end of the script no matter what"
}

for i in {1..5}; do
    print ${i}
    sleep 1
done
```


For all of these `TRAP[NAL]()` functions, if the final command is `return 0` (or if there is no return statement at all, then code execution will continue where the program left off, as if the signal was accepted, caught, and handled. If the return status of this function is non-zero, then the return status of the trap is retained, and the command execution that was previously taking place will be interrupted. You can do `return $((128+$1))` to return the same status as if the signal had not been trapped

## `fc` "find command"

* List the last 10 commands in history

    ```shell
    fc -l -10
    ```

* List commands number 800 through 850 in history

    ```shell
    fc -l 800 850
    ```

* List all commands in history that started with `sudo`

    ```shell
    fc -lim 'sudo *' 1
    ```

## Globbing

* Remove files that haven't been accessed in more than 1 day

    ```shell
    # For files (not directories) in `~/tmp`, list those
    # that haven't been accessed in at least 1 day
    for file in ~/tmp/**/*(.ad+1); do
      rm ${file}
    done
    # `(.)` select files, but not directories
    # (ad+1) access time, >1 (d)ays from the present moment
    ```

* Select all files in the current directory ending in a number, *no matter how many digits!* 🤯

    ```shell
    print -l ./*-<->
    ```

    {{% samp %}}
    ./file0
    ./file12
    ./file001
    {{% /samp %}}

Note that this is **not sorted numerically**. *However*, it is possible to specify this.
To do so, specify the glob qualifier `n` in your filename generation pattern, such as in the example below.

* Sort files numerically

    ```shell
    print -l ./*-<->(n)
    ```

    {{% samp %}}
    ./file0
    ./file001
    ./file12
    {{% /samp %}}

## Operator Expansion

If `name` is an associative array, the expression `${(k)name}` will expand to the list of keys contained by the array `name`

* `(k)` Print the keys of a assorted array:

    ```shell
    declare -A dict
    dict[a]=alpha
    dict[b]=bravo
    dict[c]=charlie
    print ${(k)dict}
    ```

    {{% samp %}}

    a b c

    {{% /samp %}}


* Filter a key from an associative array:

    ```shell
    typeset -A map=([a]=alpha [b]=bravo [c]=charlie) 
    typeset -a filter=(b)
    print -- ${#${(k)foo}}
    print -- ${#${(k)map:|filter}}
    ```

    The output is the following:

    ```txt
    3
    2
    ```


* `(s)` Split a string into an array, separating array entries on the occurance of a delimiter, which is removed from the elements. The delimiter can be specified by placing it within any of the following matching pairs: `(...)`, `{...}`, `[...]`, or `<...>`

    ```shell
    string="one:two:three"
    print -l ${(s<:>)string}
    ```

    {{% samp %}}

    one
    two
    three

    {{% /samp %}}

* `(j)` Join an array into a string, uniting each entry with a delimiter, which is inserted between the elements in the string. The delimiter can be specified by placing it within any of the following matching pairs:  `(...)`, `{...}`, `[...]`, or `<...>`

    ```shell
    list=(one two three)
    print ${(j<, >)list}
    ```

    {{% samp %}}

    one, two, three

    {{% /samp %}}

* `(w)`: With `${#name}`, count words in arrays or strings, optionally using the `(s<...>)` flag to specify word delimiter

    ```shell
    list=(one two three four)
    print ${(s<,>w)#string}
    ```

    {{% samp %}}

    4

    {{% /samp %}}

* `(W)`: Same as `(w)`, but where empty words between repeated delimiters are also counted 

## Globbing

`zsh` is capapable of some very powerful globbing. Without setting any options, you can recursively iterate through directories with `**/*`.

### Glob Options

* `setopt NULL_GLOB`: If a glob pattern is not matched, don't return an error, return instead an empty string.

* `setopt EXTENDED_GLOB` will enable special glob patterns, examples provided below:

    ```shell
    # Select any file in any directory, whose parent directory is not 'src', 'bin', or 'lib'
    ./*/(*~src~bin~lib)/*(.); do
    ```

Included below are some features of the extended glob option:

* `^x` Matches anything except the pattern `x`. This means that `^foo/bar` will  search  directories in the present working directory except for `./foo` for a file named `bar`

## Glob Qualifiers

This topic is covered in greater detail on
[the `zsh.fyi` article about expansion](https://zsh.fyi/expansion)

Here are some flags below:

* `(:a)`: return each globbed file's absolute path.

    ```shell
    print ./*(:a)
    # ./example.txt => /Users/tommy/example.txt
    ```

* `(:P)`: return each globbed file's absolute path, resolved of any symbolic
  links

    ```shell
    print ./*(:P)
    # ./example.txt => /Users/tommy/example.txt => /Users/tommy/real/example.txt
    ```

* `(:A)`: return each file's absolute paths, trying to resolve symbolic links, falling back on the absolute file to the symlink file itself if the directory it points to does not exist.

    ```shell
    # [ Using (:A) ]
    ln -s /fake/path ~/Desktop/example
    print ~/Desktop/example(:A)
    # => /Users/austin/Desktop/example
  
    # [ Using (:P) ]
    print ~/Desktop/example(:P)
    # => /fake/path
    ```

* `(:e)`: strip everything but the extension from each globbed file

    ```shell
    print ./*(:e)
    # ./example.txt => txt
    ```

* `(:r)`: strip the extension suffix

    ```shell
    print ./*(:r)
    # ./example.txt => ./example
    ```

* `(:t)`: strip all of the leading directories from the filepath

    ```shell
    val="./path/to/file.txt"
    print "${val} => ${val:t}"
    # ./path/to/example.txt => example.txt
    ```

* `(:h)`: strip one trailing pathname component from the filepath

    ```shell
    val="./path/to/file.txt"
    print "${val} => ${val:h}"
    ```

    ```txt
    ./path/to/file.txt => ./path/to
    ```

* Print the absolute path to the file currently being sourced/executed

    * Option one

        ```shell
        echo ${ZSH_SCRIPT}
        ```

    * Option two

        ```shell
        echo ${${(%):-%N}:A}
        ```

    Output

    {{% samp %}}

    /usr/local/bin/filename.sh

    {{% /samp %}}

* Print the absolute path to the directory containing the file currently being sourced/executed

    ```shell
    filepath=${${(%):-%N}:A:h}
    print ${filepath}
    ```

## Globbing Specific Filetypes

Below are some qualifiers related to the type of file

| Glob Qualifier |     Meaning      |
|:--------------:|:----------------:|
|      `/`       |   directories    |
|      `.`       |   plain Files    |
|      `=`       |     sockets      |
|      `*`       | executable files |
|      `%`       |   device files   |
|      `@`       |  symbolic Links  |


Below are some qualifiers related to the access permissions of the file

|            | Owner | Group | World |
|:----------:|:-----:|:-----:|:-----:|
|  Readable  |  `r`  |  `A`  |  `R`  |
|  Writable  |  `w`  |  `I`  |  `W`  |
| Executable |  `x`  |  `E`  |  `X`  |

Additionally, I've included some extra examples below


| Glob Qualifier |                   Meaning                   |
|:--------------:|:-------------------------------------------:|
|      `F`       |              Full directories               |
|      `^F`      | Empty directories *and all non-directories* |
|     `/^F`      |           Only empty directories            |
|      `s`       |            setuid files `04000`             |
|      `S`       |            setgid files `02000`             |
|      `t`       |          sticky bit files `01000`           |

```shell
# All plain files
print ./*(.)

# Anything but directories
print ./*(^/)

# Only empty directories
print ./*(/^F)

# [ Recursive Editions ]

# All plain files
print ./**/*(.)

# Anything but directories
print ./**/*(^/)
```

You can use `o` in conjunction with some other keywords to sort the results in
ascending order

* `on` Name
* `oL` Filesize
* `oa` Time Accessed
* `om` Time Modified
* `oc` Time Created

* `odon` Sort by names for files within the same directory

* `*(^-oL)'` Sort all files by file size in descending order, resolving any symbolic links

* Print all of the directories in descending order of size, in an escaped format to be re-usable by the shell

    ```shell
    print ./*(/OL:q)
    ```

* Select the largest regular file within a directory

    ```shell
    # 'L': (normally) sort by length (of file, i.e. its size), ascending
  
    # (Using ascending order, and picking the last element)
    print ./*(.DoL[-1])
  
    # (Using descending order, and picking the last element)
    # 'O': reverse order
    print ./*(.DOL[1])
    ```

* Select all files larger than 2MB in a directory

    ```shell
    # 'm' (megabytes) (and 'k' for kilobytes)
    # '-' (smaller than 2)
    print ./*(.Lm-2)
    ```

* Select the most recently modified file within a directory

    ```shell
    print ./*(.om[1])
    ```

* Select all files modified within the last hour

    ```shell
    # 'M' for Months
    # 'w' for weeks
    # 'h' for hours
    # 'm' for minutes
    # 's' for seconds
    # '-': modified less than '#' hours ago
    # '+': modified more than '#' hours ago
    print -l ./*(.mh-1)
    ```

* Open all files created within the last 2 days

    ```shell
    open ./path/to/dir/*(.c-2)
    ```

* Add each directory to the `${folders}` array, but only if it exists

    ```shell
    # Using
    # (N) enable null glob
    # (/) only match an existing directory
    typeset -a folders
    folders=( /usr(/N) /bin(/N) /asdf(/N) )
    print -l ${folders}
    ```

    {{% samp %}}

    /usr
    /bin

    {{% /samp %}}

* Select all files that aren't named `tmp`

    ```shell
    # '#': the delimiter between the expansion flag and the string
    # `$REPLY`: every file name specified by the glob ./*
    print -l ./*(e#'[[ ! -e $REPLY/tmp ]]'#)
    ```

## Checking if a Command Exists

### Using [equals expansion][]

[equals expansion]: https://zsh.fyi/options#Expansion-and-Globbing

A simple way to perform a check is by using [equals expansion][] (e.g. {{< var =FILENAME >}}), which will search the directories in <var>path</var> for an executable file named {{< var FILENAME >}}

```shell
if [[ =brew ]]; then
    print "Command is an executable file"
else
    print "Command not found"
fi
```


### Using [parameter expansion][]

[parameter expansion]: https://zsh.fyi/expansion#Parameter-Expansion
  
```shell
# [ Right way, note the (( parentheses )) ]
if (( ${+commands[brew]} )); then
    print "Command exists"
else
    print "Command not found"
fi
```

{{% aside warning %}}

**Note:** if there exists an alias by this name, it will return the alias
definition instead of the path to the executable file. Furthermore, if the
command is not found, `zsh` will write to `stderr` to let you know.

{{% /aside %}}



## Count the Number of Words in a String

* Count the number of characters in a string

    ```shell
    sentence="Hello world"
    print ${#string} # => 13
    ```

* Count the number of words in a string

    ```shell
    sentence="Hello world"
    print ${(w)#string} # => 2
    ```

## Reading Words

Below is an example of how to print a list of all words present in a file
`words.txt` removed of any duplicates

```txt
<words.txt>
the day is sunny the the
the sunny is is
```

* Reading in the file `words.txt` into array `words`

    ```shell
    # Read in the file into an array of words
    words=($(<words.txt))
    ```

* Printing all the words

    ```shell
    print ${words[@]}
    ```

    {{% samp %}}

    the day is sunny the the the sunny is is

    {{% /samp %}}


* Printing the unique words

    ```shell
    print ${(u)words[@]}
    ```

    {{% samp %}}

    the day is sunny

    {{% /samp %}}

* Printing the count of each word occuring in `words.txt` in descending order

    ```shell
    words=($(<words.txt))
  
    # Create an array to store the word and its count
    declare -a count
  
    # For each (u)nique word
    for word in ${(u)words}; do
      # Add "<#> <word>" to the array
      count+=("$(grep -c ${word} <<< "${(F)words}") ${word}")
    done
  
    # Print the results, sorted (n)umerically
    # (O)pposite of ascending order
    for result in ${(On)count}; do
      print ${result}
    done
    ```

* Solution using command line tools

    ```shell
    # Short form
    tr -s ' ' '\n' < words.txt \
    | sort \
    | uniq -c \
    | sort -r
  
    # Long form
    tr --squeeze ' ' '\n' < words.txt \
    | sort \
    | uniq --count \
    | sort --reverse
    ```

* Split each word in the string by the delimiter `:`

    ```shell
    string="alpha::charlie"
  
    # excluding the empty index value in the middle
    array1=(${(s_:_)string}) # using '_' as argument separator
    array1=(${(s[:])string}) # using '[]' as argument separator
    print ${#array1} # => '2'
  
    # including the empty index value in the middle
    array2=("${(@s_:_)string}") # using '_' as argument separator
    array2=("${(@s[:])string}") # using '[]' as argument separator
    print ${#array2} # => '3'
    ```

{{% aside info %}}

**Tip:** `zsh` gives you a lot of flexibility with what syntax to separate
arguments supplied to flags. You can use `[...]` `<...>` `{...}` or `(...)`

{{% /aside %}}

* Create an array out of the lines outputted by a command

    ```shell
    print -l ${(f)"$(networksetup -getinfo Wi-Fi)"}
    ```

* Extract the second line of output from a command

    ```shell
    print ${${(f)"$(networksetup -getinfo Wi-Fi)"}[2]}
    ```

* Append `.old` to each scalar in the array

    ```shell
    files=(
        ./one.txt
        ./two.txt
        ./three.txt
    )
    print -l ${files/%/.old}
    # => ./one.txt.old
    # => ./two.txt.old
    # => ./three.txt.old
    ```

* Prepend `old.` to each scalar in the array

    ```shell
    people=(
        man
        woman
        maid
    )
    print -l ${files/#/old.}
    # => old.man
    # => old.woman
    # => old.maid
    ```



* Print each unique word in a paragraph

    ```shell
    string="this sentence is a sentence
    this line is part of the paragraph
    and this line is the end"
    words=(${=string})
    print -l ${(u)words}
    # => this sentence is a line part of the paragraph and end
    ```

* Print each word in lexicographic order

    ```shell
    string="third fourth Second First"
    words=(${=string})
    print ${(o)words}
    # => First Second Third Fourth
    ```

* Given a string that includes tabs, spaces, and newlines, return an array of just the words

    ```shell
    string=$'first\tsecond\nthird fourth fifth sixth'
    array=(${=string})
    print ${#array} # 6
    ```

* Passing escape sequences to a string

    ```shell
    print $'name:\tAustin Traver\nid:\t1234'
    # => name:  Austin Traver
    # => id:    1234
    ```

* Check if a variable is set

    ```shell
    # If variable "var" is set
    if [[ -v var ]] {
      print "Variable is set"
    } else {
      print "Variable is not set"
    }
    ```

  **Warning**: Don't expand the value of `var` (e.g. `${var}`) or the statement won't work

* Check if a variable is **either** unset, or is set, but is the empty string

    ```shell
    if [[ -z ${var} ]] {
      print "Variable 'var' is either an unset variable or is a variable whose value is set to the empty string"
    }
    ```

* C-style `for` loop

    ```shell
    for ((i=0; i<10; ++i)); do
      print ${i}
    done
    ```

## `whence`

The `whence` command is very useful, and can replace many common commands

* `whence -v` is equivalent to `type`
* `whence -p` is equivalent to `path`
* `whence -c` is equivalent to `which`
* `whence -c` is equivalent to  `where`
* `whence` is equivalent to `command -v`

### Finding Commands Matching a Pattern

You can use the `-m` option to match a pattern instead of a command name. Be sure to use a **quoted string** for your pattern, otherwise it is subject to filename expansion.

* Finding commands starting with `print`

    ```shell
    whence -m 'print*'
    ```

    ```txt
    print
    printf
    /usr/local/bin/printafm
    /usr/local/opt/coreutils/libexec/gnubin/printenv
    /usr/local/opt/coreutils/libexec/gnubin/printf
    ```

## `here-doc`

Sometimes you want to supply some text in a script across multiple lines. Furthermore, this is happening at a point where you're already in some nested layers of indented logic. Luckily `zsh` provides a way to supply a multi-line string, stripped of any leading `\t` tab characters. It's called a `here-doc` and it's referred to with the `<<-` operator.

* Storing the contents of a here-doc in `file.txt`:

    ```shell
    if [[ true ]]; then
      <<-EOF > file.txt
      1 leading tab
        2 leading tabs
          3 leading tabs
      EOF
  
    fi
    ```

* Using a here-doc to avoid printing leading tabs to stdout:

    ```shell
    if [[ true ]]; then
        cat < =( <<-EOF
            this output is split along multiple lines
            as such, but they strip any leading tabs 
            but not leading spaces
        EOF
        ) >&1
    fi
    ```

* Assigning a heredoc to a variable using Zsh:

    ```shell
    read -r -d '' {{< var VARIABLE >}} <<-EOF
            the first line
                the second line
        the third line
    EOF

    print -- ${ {{< var VARIABLE >}} }
    ```

    {{% samp %}}

    the first line
    the second line
    the third line

    {{% /samp %}}

* Printing the contents of `file.txt`:

    ```shell
    # Print the contents of 'file.txt'
    < 'file.txt' >&1
    # [ Output ]
    # ==========
    # => 1 leading tab
    # => 2 leading tabs
    # => 3 leading tabs
    ```

* Advanced example:

    ```shell
    # Output to "basicquery.txt" the following
    # stripping away any leading tabs
    <<- EOF > basicquery.txt
      Today's date is $(date)
      The user ${USER} is on host ${HOST}
      This program launched on ${TTY}
    EOF
    # Read each line of "domains.txt" into an array
    # where each element of the array is a "domain"
    # Print the output of what occurs within the
    # curly braces to "output.txt"
    for domain in ${<(./domains.txt)}; {
      print "Performing DNS query on ${domain}"
      dig ${domain}
    } > output.txt
    ```

## Here-String

A `here-string` is documented exactly twice by name in the entire `zsh` manual. Writing down how it works here, so that I know for next time...

* Supply the string `hello world\n` as standard input to the current command

    ```shell
    grep 'world' <<< 'hello world'
    ```

* Create the file `hello.txt` with the following contents

  * Contents

    ```txt
    hello
    world
  
    ```

  * Command

    ```shell
    <<< $'hello\nworld' > hello.txt
    ```

* Supply a multi-line string (including a trailing line feed) as standard input to the current command

  * Input string:

    ```txt
    1234
    5678
    ```

  * Command:

    ```shell
    cat <<< $'1234\n5678'
    ```

  * Output:

    ```txt
    hello world
    its me
    computer
    ```

* Supply a multi-line string (excluding a trailing line feed) as standard input to the current command

    ```shell
    cat =(<<<$'hello world\nits me\ncomputer')
    ```

* `here-string` with and without a trailing newline (using tmp file substitution)

    * With trailing newline
    
        ```shell
        # A simple string
        cat < <(<<<hello)

        # The output of a command
        cat < <(<<<$(print -n 'hello'))
        ```


    * Without trailing newline

        ```shell
        # A simple string
        cat < =(<<<hello)

        # The output of a command
        cat < =(<<<$(print -n 'hello'))
        ```





### Expanding Parameters in Files

If you have a super long string of text, for instance, a SQL query, you may want to save the contents of that query in a different file. It's possible you may need to store a variable in the query, and if so, you can use the `(e)` paramater expansion flag when referencing the string. This flag causes the string to have any `${variable}` words treated as if they were a normal shell variable, and not text from the file.

* Expanding parameters as if they were variables in a file:

    ```shell
    # (file.txt)
    '''
    Hello, my name is $USER
    and my favorite directory is $HOME
    '''
  
    info=${(e)$(<./file.txt)}
    print ${info}
    # [ Output ]
    # ==========
    # => Hello, my name is austin
    # => and my favorite directory is /Users/austin
    ```

## `exit` vs. `logout`

* `exit` will close all shells, interactive, non-interactive, login, non-login

* `logout` will only close out of a login shell, even if it's interactive

* `return` will stop the execution of the script that made the call, but `exit` will close the shell that sourced that file to begin with

## Brace Expansion

* Multiple mid-word character substitutions

    ```shell
    print h{a,e,i,o,u}p
    # => hap hep hip hop hup
    ```

* Repeating a string multiple times

    ```shell
    print 'woah'{,}
    # woah woah
    print 'woah'{,,}
    # woah woah woah
    print 'woah'{,,,}
    # woah woah woah woah
    ```

* Back-to-back expansions with filename generation

    ```shell
    print -- {/,/usr/}{bin/*,sbin/*}
    ```

* Generating ranges of numbers

    ```shell
    print {01..10}
    ```

    {{% samp %}}

    01 02 03 04 05 06 07 08 09 10

    {{% /samp %}}

    ```shell
    print {01..10..3}
    ```

    {{% samp %}}

    01 04 07 10

    {{% /samp %}}

    ```shell
    print {a..z}
    ```

    {{% samp %}}

    a b c d e f g h i j k l m n o p q r s t u v w x y z

    {{% /samp %}}

    ```shell
    print {a..z..3}
    ```

    {{% samp %}}

    a d g j m p s v y

    {{% /samp %}}

    ```shell
    left=1
    right=9
    print {${left}..${right}}
    ```

    {{% samp %}}

    1 2 3 4 5 6 7 8 9

    {{% /samp %}}

Brace expansion can be used in powerful ways, namely to be lazy, the most powerful force in the universe.

* Changing a file's extension  a file

    ```shell
    mv ${
    ```

* Unzipping a file into a directory of the same name

    ```shell
    unzip {,-d\ }./{{< var FILENAME>}}
    ```

    {{% samp %}}

    unzip ./{{<var FILENAME>}} -d ./{{<var FILENAME>}}

    {{% /samp %}}

## The ternary operator

Ternary operators are supported in Zsh, but only when they are used within an arithmetic evaluation, such as `(( a > b ? yes : no ))`

```shell
a=5
b=6
max=$(( a > b ? a : b ))
print "The max is ${max}"
```

{{% samp %}}

The max is 6

{{% /samp %}}

{{% aside info %}}

**Note:** Don't do this with string comparisons because inside of (( ... )) all
strings are treated as the number `0`

{{% /aside %}}

{{% aside warning %}}

**Warning:** Be careful about comparing strings, because sorting is by
lexicographical order which means that a word is sorted in the following way:
treat each number as a word in a dictionary. the value of a word would
correspond with its location in the dictionary. "a < z" because "a" would be at
a lower index number in the dictionary

{{% /aside %}}

```shell
[[ "apple" < "banana" ]] && print "yes" || print "no"
# => "yes"
```

{{% aside warning %}}

**Warning:** Inside of double brackets, the evalution is not a true ternary
operator, because the third statement will still execute if an error is thrown
by the second statement

{{% /aside %}}

```shell
[[ 1 -eq 1 ]] && asdf || print "Not true"
```

{{% samp %}}

bash: asdf: command not found
Not true

{{% /samp %}}

{{% aside info %}}

**Workaround:** You can fix this problem by surrounding the truth evaluation by
curly brackets, and appending a `;:;` to the end of the statement. this will
cause the command to report the error when it occurs, and then return `true`
which will cause the or statement to not evaluate, since the first two
statements returned `true`

{{% /aside %}}

```shell
[[ 1 == 1 ]] && { asdf ;:; } || print "Not true"
```

{{% samp %}}

"bash: asdf: command not found"

{{% /samp %}}

# ANSI C Quotations { #ansi-c }


* Print two lines using C quotes `$'...'`

    ```shell
    print $'2\nlines'
    ```

    ```txt
    2
    lines
    ```

* Print the character corresponding with the hex value `0x41`


    ```shell
    print $'\x41'
    ```

    ```txt
    A
    ```

* Print the character corresponding with the UTF-8 character code `u+7231`

    ```shell
    print $'\u7231'
    ```

    ```txt
    爱
    ```

* Print the character corresponding with the UTF-8 character code `U+1f602`

    ```shell
    print $'\U0001f602'
    ```

    ```txt
    😂
    ```


## Regular Expressions

The `zsh/regex` module handles regular expressions. There's support for PCRE regular expressions, but by default regular expressions are assumed to be in Extended POSIX form.

You can use the `=~` operator to test a value against a pattern

```shell
pie=good
[[ $pie =~ d ]] && print 'Match found'
```



```shell
[[ $pie =~ [aeiou]d ]] && print 'Match found'
```


```shell
# No match because the regular expression has to capture the value of
# the variable, not the variable itself
[[ $pie =~ [p][i]e ]] || print 'No match found'
```


```shell
# No match because there's no literal '[aeoiu]d' inside the word "good"
[[ $pie =~ "[aeiou]d" ]] || print 'No match found'
```

The value of the match is saved to the `MATCH` variable. If you used capture 

On successful match, matched portion of the string will normally be placed in
the `MATCH` variable. If there are any capturing parentheses within the regex,
then the `match` array variable will contain those. If the match is not
successful, then the variables will not be altered.

```shell
if [[ 'My phone number is 123-456-7890' =~ '([0-9]{3})-([0-9]{3})-([0-9]{4})' ]] {
    typeset -p1 MATCH match
}
```

{{% samp %}}

typeset MATCH=123-456-7890
typeset -a match=( 
    123 
    456 
    7890 
)

{{% /samp %}}

 

## Arithmetic Evaluation

```shell
a=2
b=4
print $((a*b)) # => 8


# You can even do assignments.  The last value calculated will be the output.
b=$(( a *= 2 ))
print "b=$b a=$a"
# b=4 a=4
```

### Floating Point Arithmetic

```shell
a=$(( 1 + 1 ))
message="I don't want to brag, but I have like $(( a + 1 )) friends."
print $message
```

{{% samp %}}

I don't want to brag, but I have like 3 friends.

{{% /samp %}}

{{% aside info %}}

**Note:** this won't work for floating points, because bash will truncate the
decimals when evaluating division

{{% /aside %}}

```shell
print "6 / 8 = $(( 6 / 8 ))"
```

{{% samp %}}

6 / 8 = 0

{{% /samp %}}

```shell
print "6 / 8 = $(( 6 / 8.0 ))"
```

{{% samp %}}

6 / 8 = 0.75

{{% /samp %}}

## File Descriptors

* `<&-`: Close the standard input.

* `1>&-`: Close the standard output.

* `2>&-`: Close the standard error.

* `<&p`: Move the input from the coprocess to stdin

* `>&p`: Move the output from the coprocess to output

* `2>&1`: Redirect standard error to standard output

* `1>&2`: Redirect standard output to standard error

* `&> file.txt`: Redirect both standard output and standard error to `file.txt`

* Redirect output and error to different files

    ```shell
    func() {
      print 'output' >&1
      print 'error' >&2
    }
  
    # [ Version 1 ]
    func 1>out.txt 2>err.txt
  
    # [ Version 2 ]
    1> out.txt 2> err.txt func
    ```

### Custom File Descriptor

You can create your own file descriptor number and have it direct to any file you'd like.

* Create file descriptor `3` and point it to `/dev/null`

```shell

exec 3> ~/three.txt

print 'one' >&1
print 'two' >&2
print 'three' >&3

exec 3>&-
exec {four}>&-
```

```shell
# Open file descriptor 3, Direct output to this file descriptor
# toward the file ~/three.txt
exec 3> ~/three.txt
# Open file descriptor allocated by shell to unused
# file descriptor >= 10. Direct output to this file descriptor
# toward the file ~/fd.txt
exec {fd}> ~/fd.txt
# (alternative: sysopen -w -u 3 /dev/null)

shout() {
  print 'File descriptor 1' >&1
  print 'File descriptor 2' >&2
  print 'File descriptor 3' >&3
  print 'File descriptor fd' >&$fd
}

shout
# => (1:) 'File descriptor 1'
# => (2:) 'File descriptor 2'

# Close file descriptor 3
exec 3>&-
# Close file descriptor fd
exec {fd}>&-

shout
# => (1:) 'File descriptor 1'
# => (2:) 'File descriptor 2'
# => (3:) 'error: bad file descriptor'
# => (12:) 'error: bad file descriptor'
```

Technically this is a little dangerous, especially for file descriptors 3-8, (for instance, #5 is used when spawning child processes), so it's best to do the alternative "variable name" method, shown below

* Create a file descriptor variable named `fd` and have the shell assign a free file descriptor (starting from 10+) and save it as the value of that variable

* `{abc}>&1`: create a file descriptor "abc" that is a duplicate of file descriptor 1

* `>&$abc`: write to the file descriptor "abc"

* `<&$abc`: read from the file descriptor "abc"

* `{abc}>&-`: close file descriptor "abc"


```shell
# Open file descriptor `fd` that redirects to 'output.txt'
exec {fd}> ~/output.txt

print "{fd} points to file descriptor ${fd}"
# => "{fd} points to file descriptor 12"

print $'alpha\nbravo\ncharlie' >&$fd

# Close file descriptor 'fd'
exec {fd}>&−

print $'alpha\nbravo\ncharlie' >&$fd
```

## Disowning a Job

If you have a command that you'd like to continue running, even after the shell
has been closed, you can use the `disown` builtin command. There is an explicit
syntax, and a short-hand syntax.

* Disowning the job process id `%1`

    ```shell
    # Explicit syntax
    disown %1
    ```

    ```shell
    # Shorthand syntax
    %1&|
    ```

## Delete Dangling Symlinks

Sometimes symbolic links point to files that don't exist, it's useful to delete them, and `zsh` makes that super simple by using glob qualifiers.

* `(@)`: Only symlinks
* `(-@)`: Only broken symlinks
* `(D)`: Match `.hidden` dot files

* Deleting all dangling symlinks:

    ```shell
    # '-@' only broken symlinks
    # 'D' include .dotfiles
    rm -- ./*(-@D)
    ```

## Remove Element From Array

Sometimes you have an array of elements, and you need to remove a value from the array, but you don't know the index that this value is located at.

* Removing an element from an array

    ```shell
    # Array with four elements
    array=(alpha bravo charlie delta)
  
    # Getting the index of 'charlie'
    print ${array[(i)charlie]}
    # => "3"
  
    # Removing an element at an index (without leaving it as an empty slot)
    ${array[3]}=()
  
    # Doing it in one line
    array[${array[(i)charlie]}]=()
    ```

{{% aside info %}}

**Good News:** There's a much less ugly way to do this in `zsh` version 5.0
using the `${array:|filter}` syntax. It's documented in "Parameter Expansion" of
`man zshexpn`

{{% /aside %}}

* Removing an element from an array

    ```shell
    # Array with four elements
    array=(alpha bravo charlie delta)
  
    # Array 'filter' with elements 'bravo' and 'charlie'
    filter=(bravo charlie)
  
    # Remove from 'array' any element contained in the array 'filter'
    excluded=(${array:|filter})
    # (alpha delta)
  
    # Remove from 'array' any element *not* contained in the array 'filter'
    included=(${array:*filter})
    # (bravo charlie)
    ```
  

You can also remove elements from an array based on patterns. This filter takes on the syntax 
`${array:#{{< var PATTERN >}}}` where {{< var PATTERN >}} is the same as the form used in
[filename generation][].

[filename generation]: https://zsh.fyi/expansion#filename-generation

* Remove from `array` any element that *matches* the pattern:

    ```shell
    # *r*: strings containing the letter 'r'
    array=('number one' two three)
    output=(${array:#*w*})
    typeset -p output
    ```

    {{< samp >}}typeset -a output=( 'number one' three ){{< /samp >}}
  
* Remove from 'array' any element that *does not match* the pattern `pattern\*`

    ```shell
    # *r*: strings containing the letter 'w'
    array=('number one' two three)
    output=(${(M)array:#*w*})
    typeset -p output
    ```

    {{< samp >}}typeset -a output=( two ){{< /samp >}}


* Remove any line from 'whois' that doesn't start with 'CIDR'

    ```shell
    ip='8.8.8.8'
    print -- ${(M)${(@)${(f)${"$(whois ${ip})"}}}:#CIDR*}
    ```

    {{<samp >}}CIDR:           8.0.0.0/9{{< /samp >}}

## Background Jobs

* Put a job in the background upon launch

    ```shell
    # Receive stdout
    ./executable arg1 arg2 &
  
    # Do not receive stdout
    ./executable arg1 arg2 > /dev/null &
  
    # Immediately disown the process, but still receive stdout and stderr
    ./executable arg1 arg2 &!
  
    # Immediately disown the process, receive neither stdout nor stderr
    ./executable arg1 arg2 &> /dev/null &!
    ```

## Checking For a Command

The `commands` variable in `zsh` is an associative array whose keys are all of the commands that can be used, and whose values are the corresponding filepaths to where those commands are located. The `+` operator when applied to an associative array will have the variable expand to `1` if the key is found, and `0` if the key is not found.

* Check if a command is not available

    ```shell
    if (( ! ${+commands[gpg]} )); then
      print "Command not found"
    else
      print "Command was found"
    fi
    ```

## Parsing Command Options

The `zparseopts` module can be used to create a function or program that can accept command-line options. For more information about how to use it, you can search for `zparseopts` in `man 1 zshmodules`

Attached below you will see a wrapper I wrote for the `transmission` command line interface, as there is no way to cleanly alias the `transmission` command without writing a wrapper like this, as it installs as five separate commands.

```shell
# Parse the following command-line arguments as options

# Note on `-a`:
# Specify the name of where to save parsed options
# In this case, into an array named `option`

# Note on `-D`:
# if an option is detected, remove it from
# the positional parameters of the calling shell

zparseopts -D -a option \
    'c' '-create' \
    'd' '-daemon' \
    'e' '-edit' \
    'r' '-remote' \
    'q' '-quit'
case ${option[1]} in
    -c | --create)
    transmission-create ${@}
    ;;
    -d | --daemon)
    transmission-daemon ${@}
    ;;
    -e | --edit)
    transmission-edit ${@}
    ;;
    -r | --remote)
    transmission-remote ${@}
    ;;
    -q | --quit)
    transmission-remote --exit
    exit 0
esac
```


## `typeset`

The `typeset` builtin declares the type of a variable identified by a 
{{< var name >}} that is optionally assigned a value {{< var value >}}.
When an assignment is not made, the value of {{< var name >}} is printed
as follows:

```shell
typeset -i a=1
a+=1

typeset a
```

Output

```txt
a=1
```

```shell
typeset b=1
typeset b=1
```

### Flags to state variable type

* `-F [ name[=value] ... ]`: set {{< var name >}} as floating point (decimal notation)
* `-E [ name[=value] ... ]`: set {{< var name >}} as floating point (scientific notation)
* `-i [ name[=value] ... ]`: set {{< var name >}} as an integer
* `-a [ name[=value] ... ]`: set {{< var name >}} as an array
* `-A [ name[=value] ... ]`: set {{< var name >}} as an associative array

### Flags to state variable properties

* `typeset -r [ name[=value] ... ]`: mark {{< var name >}} as read-only
* `typeset +r [ name[=value] ... ]`: remove the read-only property of {{< var NAME >}}
* `typeset -x [ name[=value] ... ]`: mark {{< var name >}} as exported
* `typeset -g [ name[=value] ... ]`: mark {{< var name >}} as global
* `typeset -U [ name[=value] ... ]`: convert array-type variable {{< var name >}} such that it always contains unique-elements only

### Flags to modify command output

* `typeset -l [ name[=value] ... ]`: print value of {{< var name >}} in lower-case whenever expanded
* `typeset -u [ name[=value] ... ]`: print value of {{< var name >}} in upper-case whenever expanded
* `typeset -H [ name[=value] ... ]`: suppress output for `typeset {{< var name >}}` if variable {{< var name >}} has already been assigned a value
* `typeset -p [ name[=value] ... ]`: print {{< var name >}} in the form of a typeset command with an assignment, regardless of other flags and options. Note: the `−H` flag will still be respected; no value will be shown for these parameters.

* `typeset -p1 [ name[=value] ... ]`: print {{< var name >}} in the form of a typeset command with an assignment, regardless of other flags and options. Note: arrays and associative arrays are printed with newlines between indented elements for readability.


#### Matching a Certain Type

* Printing all variables of a certain `typeset`:

    ```shell
    # All variables with their types
    typeset +
    # All variables that are floating point
    typeset -E +
    # View the assignment of a variable
    typeset USER
    ```

#### Matching a Certain Pattern

* Print environment variables whose names match the pattern

```shell
typeset +m 'foo*'
```

{{% samp %}}

foo
foo_fighters
food

{{% /samp %}}

* Print variable and its corresponding value for environment variables whose names match the pattern

```shell
typeset -m 'foo*'
```

{{% samp %}}

foo=bar
foo_fighters=awesome
food=(my life)

{{% /samp %}}

* Print variables' `typeset` options, its name, and its assigned value, for each matching the pattern:

```shell
typeset -p -m 'foo*'
```

{{% samp %}}

typeset foo=bar
typeset foo_fighters=awesome
typeset -a food=( my life )

{{% /samp %}}

* Print all keys in an associative array that **don't** start with `foo`

    ```shell
    print ${(k)example:#foo*}
    ```

* Print all keys in an associative array that **do** start with `foo`

    ```shell
    print ${(Mk)example:#foo*}
    ```

* Print all values in an associative array that **don't** start with `foo`

    ```shell
    print ${(v)example:#foo*}
    ```

* Print all values in an associative array that **do** start with `foo`

    ```shell
    print ${(Mv)example:#foo*}
    ```

### Pairing Scalars and Arrays

If you're using a shell scripting language, you often have to export directories to the environment, such as for `PATH`, which requires a list of directories separated by a colon.

Zsh gives you the ability to link two variables together, a scalar and an array. You can specify the delimiter that separates elements, and once you have, adding items to the array will add items to the scalar. An example is provided below:

* Linking a scalar and an array

    ```shell
    typeset -T COLORS colors ':'
    colors=(red)
    colors+=(blue green)
    print ${COLORS}
    # => "red:blue:green"
    ```

## Printing Colors

Printing colors can be done with SGR escape codes, explained on the
[ASCII](/ascii) page, but you can also do it with the prompt string format
specifier syntax outlined below:

For each of the following examples, we'll format the scalar `text`

```shell
text="Hello world"
```

* Set the <u><b>f</b></u>oreground color of `text` to red

    ```shell
    print -P "%F{1}${text}%f"
    ```

    {{% samp %}}

    Hello world

    {{% /samp %}}

* Set the bac<u><b>k</b></u>ground color of `text` to blue

    ```shell
    print -P "%K{blue}${text}%k"
    ```

    {{% samp %}}

    Hello world

    {{% /samp %}}

* Format `text` to be <u><b>u</b></u>nderlined

    ```shell
    print -P "%U${text}%u"
    ```

    {{% samp %}}

    Hello world

    {{% /samp %}}

* Format `text` to be <u><b>b</u></b>olded

    ```shell
    print -P "%B${text}%b"
    ```

    {{% samp %}}

    Hello world

    {{% /samp %}}

Additionally, you can use `%S` for <u><b>s</b></u>tandout formatting, which
swaps the foreground and background colors.

{{% aside info %}}

Printing `%E` will clear from the cursor to the <u><b>e</b></u>nd of the line.

{{% /aside %}}

## Custom Keybindings

Use the `zle` module for binding custom keys, code written using `zle` can be
sourced in your configuration files.

* Enabling vi-mode

    ```shell
    bindkey -v
    ```

* Creating custom key-binding using `zle` module:

    ```shell
    custom-command() {
      print -n 'Hello world'
      zle accept-line
    }
    # Register this command with the Zsh Line Editor
    zle -N custom-command
  
    # Bind this key to <Option-Shift-S> in Zsh vi-mode
    bindkey -M viins '\ES' custom-command
    ```

* Binding the `<Return>` key or `<C-m>` to not execute the current line

    ```shell
    # in Zsh
    bindkey -M viins '\C-m' self-insert-unmeta
    ```

# Completions

[Useful Oreilly Resource](https://learning.oreilly.com/library/view/learning-shell-scripting/9781783282937/ch05.html)

## `compsys`

* The new system to use is `compsys`. It has a manpage `zshcompsys(1)` as well. 

* The old system was called `compctl` and its manpage is in `zshcompctl(1)`. The
  first paragraph is dedicated to recommending you just head back over to the
  new `zshcompsys(1)` system.

## Completion Functions

Let's say our program is called `hello`.

Here's what will happen:

1. You write a completion function, typically `_<cmd-name>`

```shell
_hello() {
  # You write your code here
}
```

2. You bind your function to a command

```shell
compdef _hello hello
```

- **Whenever** you press `<Tab>` after `hello`, `_hello` will be called.

Whenever you want to throw out possible completions, you'll use one of the following utility functions(in this post):

### compadd

* Reference: `man zshcompwid`

If you want to have this:

```shell
hello <Tab>
# => cmd1    cmd2    cmd3
```

You'll write this:

```shell
comdadd cmd1 cmd2 cmd3
```

### _describe

If you want to have this:

```shell
hello <Tab>
# => cmd1    --  description1
# => cmd2    --  description2
```

You'll write this:

```shell
_describe 'command' "('cmd1:description1' 'cmd2:description2')"
```

**Note**: In both of above commands, we didn't consider which argument no. it is, means even `hello cmd1 <Tab>` will give same output. Next command will solve this problem.

### `_arguments`

Now this is a powerful one. You can control multiple arguments.

By multiple arguments I mean `hello arg1 arg2` not `hello arg1|arg2`

Here's the basic syntax: `_arguments <something> <something> ...` where `<something>` can either be:

- `'-o[description]'` for an *option*
- `'<argument number>:<message>:<what to do>'` for an *argument*

First one is self-explanatory, whenever called it'll output the description:

```shell
hello <Tab>
-o  --  description
```

For the second one, `<argument number>` is self-explanatory. I'll leave `message` empty to demonstrate a minimal example. For `<what to do>`, it can be quite a few things, two of which are provided below:

1. List of arguments possible at given `argument number`. For example, if two arguments(`world` and `universe`) are possible at argument one(`hello world|universe`), we can write:

    ```shell
    _arguments '1: :(world universe)' <something> ...
    ```

1. Set variable `state` to an identifier. For example, if we want to call another function at argument no. 2, we can write:

    ```shell
    typeset state
    _arguments '2: :->identifier'
    case ${state} in
      identifier)
        #do some special work when we want completion for 2nd argument
        ;;
    esac
    ```

That might be confusing, lets sum up `_arguments` by an example:

Lets say, our program has possible args like:

```shell
hello [cat|head] <file at /var/log> one|two
```

Its completion function can be:

```shell
_hello() {
    local state
    _arguments '1: :(cat head)' '2: :->log' '3: :->cache'
    case ${state} in
        log)
            # This is for demonstration purpose only, you'll use _files utility to list a directories
            _describe 'command' "($(ls $1))"
            ;;
        cache)
            # This could be done above also, in _arguments, you know how :)
            compadd one two
            ;;
    esac
}
```

## Job Control


There are several ways to refer to jobs in the shell. A job can be referred to by the process ID of any process of the job or by one of the following:

* `%2`
  The last job with job ID `2`

* `%vi`
  The last job whose command line begins with `vi`

* `%?grep`
  The last job whose command line contains `grep`

* `%%`
  The current job.

* `%+`
  Equivalent to `%%`.

* `%-`
  The previous job.

## Zsh Modules

Zsh comes with many useful modules, but none are loaded by default. This is done in order to prevent optional features from needlessly slowing down the shell's startup time.

### zsh/nearcolor

* Print the closest match to violet (`#AFAFFF`) among the 256 terminal colors

    ```shell
    zmodload zsh/nearcolor
    print -P '%F{#AFAFFF}Violet%f`
    ```


## Multios

* See output on `stdout` but save to `file.txt` as well

```shell
date >&1 >file
```


## Operating System Commands

There are some ANSI escape sequences that allow you to write Operating System Commands (OSCs)

* Set the title of the terminal tab to `TAB`

    ```shell
    # The `1` specifies to change the tab title
    print '\x1b]1;TAB\x07'
    ```

* Set the title of the terminal window to `WINDOW`

    ```shell
    # The `2` specifies to change the window title
    print '\x1b]2;WINDOW\x07'
    ```

## Default Zsh Options

Included below, more for my reference, but could be helpful for anyone

```shell
# Print an error if a glob pattern is badly formed
setopt BAD_PATTERN

# Print an error if a glob pattern does not match any files
setopt NOMATCH

# Treat unset parameters as '' in subs, 0 in math, otherwise error
setopt UNSET

# Consider parentheses trailing a glob as qualifiers
setopt BARE_GLOB_QUAL

# Match regular expressions in `=~` case sensitively
setopt CASE_MATCH

# Perform =file expansion
setopt EQUALS

# Perform history expansion with `!`
setopt BANG_HIST

# Calling `typeset -x` implicitly calls `typeset -g -x`
setopt GLOBAL_EXPORT

# Allows a short-form syntax for `if`, `while`, `for`, etc.
setopt SHORT_LOOPS

# Run all background jobs at a lower priority
setopt BG_NICE

# Report the status of background jobs (typically it isn't done until <CR>)
setopt NOTIFY

# Confirm before logoff w/ background/suspended jobs
setopt CHECK_JOBS
setopt CHECK_RUNNING_JOBS

# Send the HUP signal to running jobs when the shell exits
setopt HUP

# Treat '%' specially in prompt strings
setopt PROMPT_PERCENT

# Set $0 equal to name of script for funcs & script
setopt FUNCTION_ARGZERO
```

## Short Form Syntax

Zsh supports the traditional syntax for conditional statements and for loops. However, they also provide some more modern versions of each, as demonstrated below:

* One line `if` statement, single command:

    ```shell
    if [[ ${USER} == 'austin' ]] print "That's him"
    ```

* Multi-line `if` statement, any number of commands:

    ```shell
    if [[ ${USER} == 'austin' ]] {
      print "That's him"
    } elif [[ ${USER} == 'valerie' ]]
      print "That's her" 
    } else {
      print "That's nobody important"
    }
    ```

* Multi-line `for` loop, any number of statements

    ```shell
    words=('one' 'two' 'three' )
  
    for word in ${words}; {
      print ${word}
    }
    ```


* Syntax for short-form of `while` loop

    ```shell
    # Keep sleeping until the server starts running
    while [[ $(curl http://127.0.0.1 -- &> /dev/null)$? -eq 7 ]] {
      sleep 0.2
    }
    print "Server is now running"
    ```

## Silent Functions

You can specify that a function can be silent *in its declaration*! If you know you're going to make a helper function that you don't want to ever see output from, you can define it using the syntax outlined in the example below:

* Create a silent function

    ```shell
    func() {
      print 'Never seen'
      return 0
    } &> /dev/null
    ```

## Zsh Time Profiling

```shell
zmodload zsh/zprof
# Start up functions in ~/.zshrc
zprof
```

{{% samp %}}

  calls         time             self                    name
--------------------------------------------------------------------
1)  2  22.18    11.09   45.03%  22.18   11.09   45.03%  compaudit
2)  1  32.66    32.66   66.29%  10.48   10.48   21.27%  compinit
3)  5   0.77     0.15    1.56%   0.77    0.15    1.56%  add-zsh-hook
4)  1   0.45     0.45    0.90%   0.45    0.45    0.90%  bashcompinit
5)  1   0.28     0.28    0.56%   0.28    0.28    0.56%  is-at-least
6)  1   0.15     0.15    0.31%   0.15    0.15    0.31%  (anon)
7)  1   0.09     0.09    0.19%   0.09    0.09    0.19%  compdef
8)  1   0.18     0.18    0.37%   0.09    0.09    0.18%  complete

{{% /samp %}}

## Zsh Completion Audit

To fix any ownership problems experienced during zsh completion, you can run the script below

```shell
for line in $(compaudit &>1); do
    if [[ -e ${line} ]]; then
        sudo chown ${UID}:${GID} ${line}
        sudo chmod -v 755 ${line}
    fi
end
```

## Pretty-Printing Associative Array

* Print the key-value pairs found in `my_pairs`

    ```shell
    typeset -p1 my_pairs
    ```

    {{% samp %}}

    typeset -A my_pairs=(
      key1=val1
      key2=val2
      key3=val3
    )

    {{% /samp %}}


## Zsh Hashed Commands

Instead of searching the path each time for a command, Zsh hashes commands

### `hash`

* Rebuild the hash table for commands found in the user `path`:

    ```shell
    hash -f
    ```

### `enable`

* enable a builtin command

    ```shell
    enable whoami
    ```

* enable an alias

    ```shell
    enable -a lsa
    ```

* enable a function

    ```shell
    enable -f func
    ```

### `disable`

* Disable a builtin command

    ```shell
    disable whoami
    ```

* Disable an alias

    ```shell
    disable -a lsa
    ```

* Disable a function

    ```shell
    disable -f func
    ```


### `unhash`

You can use the `unhash` tool to remove almost any type of command from your current shell.

* Remove a command

    ```shell
    unhash whoami
    ```

* Remove an alias

    ```shell
    unhash -a lsa
    ```

* Remove a function

    ```shell
    unhash -f func
    ```

### Terminal

Below are some messy notes from a previous page I had dedicated to terminals, which, for the time being, is being placed here as a dedicated terminal page is difficult to expand upon when there's also a dedicated shell scripting page.


## Navigating The Terminal

### Common Movement Shortcuts

|Shortcut|Output|
|:---:|:---:|
|⌃ A|Go to the beginning of the line|
|⌃ E|Go to the end of the line|
|⌥ F|Move forward one word|
|⌥ B|Move back one word|

#### Clearing Text

|Shortcut|Output|
|:---:|:---:|
|⌘ K|Erase the entire terminal|
|⌘ L|Erase the last command's terminal output|


#### Modifying Chars

|Shortcut|Output|
|:---:|:---:|
|⌃ F|Move forward 1 char|
|⌃ B|Move backward 1 char|
|⌃ H|Delete char left of cursor|
|⌃ D|Delete char right of cursor|
|⌃ T|Swap the last two chars|

#### Modifying Words

|Shortcut|Output|
|:---:|:---:|
|⌥ L|lowercase word right of cursor|
|⌥ U|uppercase word right of cursor|
|⌥ C|title-case word of cursor|
|⌃ Y|Paste the word that was deleted|
|⌥ T|Push the word left of the cursor forward by one word|

#### Modifying Lines

|Shortcut|Output|
|:---:|:---:|
|⌃ K|Erase line right of cursor|
|⌃ U|Erase line left of cursor|
|⌃ W|Erase argument left of cursor|
|⌃ Y|Paste what was just erased|
|⌃ A|Go to the beginning of the line|
|⌃ E|Go to the end of the line|


#### Undo Action

|Shortcut|Output|
|:---:|:---:|
|⌃ -|Undo last keystroke|

#### Command Selection

|Shortcut|Output|
|:---:|:---:|
|⌃ P|Select previous command|
|⌃ N|Select next command|
|⌃ R (1)|Recall a previous command|
|⌃ R (2)|Recall the next match|
|⌃ G|Exit from command recall mode|
|⌥ R|Restore altered command back to it's original state|
|⌃ J|Submit command|

#### Completion Shortcuts

There are a bunch of shortcuts that will help you complete the filename, or the command name, etc., but let's be real here. You're just going to keep using `tab` anyway. Save your energy for learning some of the other great shortcuts on here.


#### Misc Input

Many of the keys you normally press can be entered with a control key combo instead.

|Shortcut|Output|
|:---:|:---:|
|⌃ I|`tab`|
|⌃ J|`newline`|
|⌃ M|`enter`|
|⌃ [|`escape`|
|⌃ D|`$ exit` closes the entire terminal session|


|Shortcut|Output|
|:---:|:---:|
|⌃ <|Go to beginning of history|
|⌃ >|Go to end of history

#### Signals

Ranked from weakest to strongest

|Shortcut|Output|Signal|Number|Notes|
|:---:|:---:|:---:|:---:|:---:|
|⌃ Z (1)|Pause a job |SIGTSTP|20|Also known as suspending a job|
|⌃ Z (2)|Continue a job |SIGCONT|18|Pressing ⌃Z again will continue a process that was just suspended|
|^ C|Interrupt a job|SIGINT|2|Tell a process that it should not continue, the most common way to end a program|
|⌃ \\ |Quit a job|SIGQUIT|3|Similar to an interrupt, but a little stronger (can still be caught), and will produce a core dump. The strongest of the signals that can be called via keyboard shortcuts|

{{% aside info %}}

**Tip:** Many people don't know that on Mac OS, there's an alternative to using
**⌃ C** to end a program: **⌘ .**

{{% /aside %}}


## Signals

Various signals can be sent in UNIX to interact with a program. Many of these contain keyboard shortcuts, but first it is important to go over the most common types of signals. Programs can customize how they react to signals by catching, handling, or ignoring them.

To view all signals, type `$ trap -l`

To view all signal keyboard shortcuts, type `$ stty -e` or `$ stty all`

### Signal Definitions

* **SIGTERM (15):** Tells a program to stop, in order to allow the program to handle its termination gracefully. Can be caught, handled, or ignored.

* **SIGINT (2):** Used to interrupt a program that is running. It is the same as the **SIGTERM** signal, but it explicitly refers to an interruption that was called from the terminal. Can be caught, handled, or ignored.

* **SIGQUIT (3):** Similar to **SIGTERM** but it will generate a core dump. Can be caught, handled, or ignored.

* **SIGSTOP (17):** Temporarily stop a program. Cannot be caught, handled, or ignored.

* **SIGTSTP (18):** Sends the program a signal, telling it to temporarily stop. Unlike **SIGSTOP**, it can be caught, handled, or ignored.


### The Foreground & Background

### The `jobs` Program

The `jobs` program lets you see information about the current jobs running from this terminal.

* View the jobID, job status, and call-command

    ```shell
    jobs
    ```


* Additionally report the PID of each job

    ```shell
    jobs -l
    ```

If you begin running a process, but it looks like it will take a long time to run, there's no need to open a new terminal tab. Instead, you can run the current process in the background. First, suspend (pause) the job with **⌃Z**

If you have suspended multiple jobs, you can bring a specific job back to the foreground/background as follows

* Resume the 2nd suspended job as a foreground process

    ```shell
    fg %2
    ```

* Resume the 3rd suspended job as a background process

    ```shell
    bg %3
    ```

### The `ps` Program

* View info about all active processes

    ```shell
    ps
    ```

### The `pgrep` Program

To find out the process ID of a particular program, use the `pgrep` program.

* View the PID of all matches to the regular expression "java"

    ```shell
    pgrep java
    ```

* View the id and name of every process matching the regular expression "ja"

    ```shell
    pgrep -l ja
    ```

## Managing active processes

Every process has a process ID or "*PID*" and there are a variety of commands that you can use to manage your active processes.

* Find an active process's PID by name

    ```shell
    pgrep <process_name>
    ```

### The `kill` Program

Using the `kill` program, you can send any active process a signal.

* Kill a processes by PID

    ```shell
    kill -9 <process_id>
    ```

* Kill a process by name

    ```shell
    pkill "java"
    ```

* Kill a process running on a specific port

    ```shell
    kill $(lsof -t -i :4000)
    ```

* Send the SIGTERM (15) to process 123

    ```shell
    kill -15 123
    ```

* Send the SIGTERM (15) signal to process 123 & process 456

    ```shell
    kill -TERM 123 456
    ```

* Send the SIGINT (2) signal to process 123

    ```shell
    kill -2 123
    ```

* Send the SIGSTOP () signal to process 123

    ```shell
    kill -TSTP 123
    ```

* Send the SIGINT (2) signal to job ID # 1

    ```shell
    kill -2 %1
    ```

### The `pkill` Program

Similar to `kill` except instead of killing processes by id, it kills processes by name.

```shell
# [Send the SIGTERM signal to all programs matching "java"]
pkill -15 java
# [Send the SIGTSTP signal to all programs named exactly "java"]
pkill -TSTP -x java
```

## Managing Disk Space

### The `df` Program

The `df` program, can be used to "display free" storage available on the computer.


```shell
# Get a report of the last recorded amount of memory
$ df -kh
# Refresh this value
$ du -chs
```

#### Useful `df` flags

* `-k` Use 1 *kilobyte* as the default size-unit, instead of half a kilobyte (not sure why this isn't standard...)
* `-h` Print the response in *human* readable output.
* `-c`
* `-s`

{{% aside warning %}}

**Warning:** The snapshot that you're given with `$ df -kh` is not always
recent. If you've made some big changes to the available amount of storage, the
discrepancy could be very large. To get an up-to-date version of the available
storage on your computer, type `$ du -chs`

{{% /aside %}}


## Customization

### Custom Bash Prompt

The bash prompt is actually a collection of several prompts.

* PS1: The primary bash prompt, defaults to include the following bash escape sequences.

  * `\h`: The hostname `Austins-Macbook-Pro`
  * `\W`: The basename of the current working directory `~`
  * `\u`: The username `austintraver`
  * `\$`: A `$` char, unless the UID is not 0, then it's `#`

  Personally I like the way it looks when I `ssh` into my virtual private server. If you want to try it out, you can run the following command in your terminal.

*  Modify the machine's hostname (on macOS):

    ```shell
    sudo scutil --set HostName {{< var HOSTNAME >}}
    ```

## Directory Structure

### `$PATH`

When you type the name of a function on the command line, it usually requires that you tell it the language and the directory. (e.g. `$ python3 greet.py`)

However, if the executable file is located in one of the directories specified by your `$PATH`, then it will automatically find and run the program without you needing to provide those specifications. It searches every directory specified in your `PATH` and runs the first file it finds with a matching name.

### Seeing which directories are in your $PATH

```shell
# This one only works on zsh
print -l ${path}

# This one works on bash as well
echo -e ${PATH//:/\\n}
```

{{% aside info %}}

Normally each directory in the path is seperated by a colon `:` not a newline, but I
find this to be a clearer output.

{{% /aside %}}

### Using `#!` the "hashbang"

Sometimes you open up a file and it contains the first line, or something similar, to the one I've written below in a program called `greet` that prints `Hello world!`

#### `greet`

```py
#!/usr/local/bin/python3
print("hello world")
```

That first line uses a *hashbang*. What it does, is it tells your computer what program to use when trying to run the code specified in the lines below. In this case, it says to use the `python3` program located in the directory `/usr/local/bin`

Assuming this was a file in your present working directory with executable permissions (if it isn't, type `$ chmod +x greet` in your terminal) then you could type `$ ./greet` and this file would run fine. You didn't need to specify that it needed to run with `$ python3 greet`

```shell
# [Hard way]
/usr/local/bin/python3 greet
# [Medium way]
python3 greet
# [Easy way]
./greet
```


### Typical $PATH directories

#### The `root` directories

Note that `/` itself is the root directory, these are directories inside the `root` directory

#### The `/bin` directories

These are programs that are needed if you start the system with *single user mode*. Single user mode is a startup mode even more barebones than *recovery mode*.

#### The `/local` directories

##### `/usr/local/bin`

This is for programs that are local to your user account. If you install a program here (and you should), then the other accounts on the computer won't be able to use it. Also, it's automatically in your `${path}`

##### `/usr/local/sbin`

This is the local *system* bin, which is used for programs that are needed to boot the system, but that you won't be executing directly.

### The command path

  If you want to add a directory to `${path}` you'll need to edit your `~/.zshrc`. To add the directory `/Users/tommytrojan/programs` to your path, you would add the following line.

* Add a folder of executable programs to the command path

    ```shell
    path=(~/tommytrojan/programs ${path})
    ```

This will append `/Users/tommytrojan/programs` to the existing value of `${path}` which is accessed by typing `${path}`. 

## The `export` keyword

We used the `export` keyword when we updated the $PATH in our `.zshrc` but it's important to understand what it does. The `export` keyword will save a variable in the shell, but it will also save the variable in any sub-shells. That means if you called a function from your terminal, and that function checked for a variable `$(PATH)` it would still "remember" what that variable's value was set to be.

## The Root User

On UNIX systems, the root user has capabilities that are disabled when you are logged in as a regular user. Type the command below to run a shell as the root user

```shell
sudo -i
```

From here, you can type any command without having to use the sudo command.


## Opening applications

### on MacOS

But there are very useful flags you can use, to type these out in the future

* Open the Postman.app file explicitly

    ```shell
    open ~/Applications/Postman
    ```

* Open the application "Postman"

    ```shell
    open -a Postman
    ```

* Open a website in Safari

    ```shell
    open -a Safari 'https://google.com'
    ```

* Open with the default text editor

    ```shell
    open -t textfile.txt
    ```

* Launch a new instance of the application

    ```shell
    open -n sample.png
    ```

### on Linux

Opening an application on Linux is as easy as typing
```shell
# [Launch any application located in $PATH]
appname
```

## The Welcome Message

### Silencing the Welcome Message

Usually when you open your mac, you'll see a message such as

*"Last login: Fri May  3 21:14:20 on ttys000"*

But you can disable this message by adding a `.hushlogin` file to your home directory.
```shell
# [Silence the login message]
touch ~/.hushlogin
```

Alternatively, you can customize the message by modifying the contents of the file located in `/etc/motd`

## Hidden Programs

On Mac OS, there are some really cool hidden programs that most people don't know about.

### `caffeinate`

Many people don't know about `caffeinate`, a program you can use to prevent your computer from falling asleep.

Wake up a sleeping remote computer with `ssh`

```shell
# For a moment
ssh tommy@remote.net 'caffeinate -u -t 1'
```

#### Useful Flags

* The `-t` flag specifies how many seconds to stay awake
* The `-w` flag will wait until the program with the given PID finishes before reenabling sleep.
* The `-u` flag will signal wake via user activity, keeping a computer awake as if someone jiggled the mouse or pressed a key.


## Following Symlink Directories

Add this line to your `.inputrc` so that when you type `cd` and try to tab-complete to a symbolic link to a directory, it will include the trailing `/` at the end.

```
set mark-symlinked-directories on
```

## Advanced Tab Completion

If you are typing out a command, and you include environment variables (e.g. `$PATH`) or an event designator (e.g. `!!`) then you can press <TAB> after typing it, and the terminal will immediately replace that reference with the actual argument that it evaluates to.

```shell
echo $HOME<TAB>
echo /Users/austin
```

## Speak from Terminal

```shell
# Speaking from terminal
say 'hello world'

# Singing from terminal
say -v 'good news' di di di di di di
```

## Arithmetic Expansion

* If there are between 1 and 3 arguments supplied to the function, print the number of arguments supplied to the function

    ```shell
    func() {
      if (( 1 <= ${#} && ${#} <= 3 )) {
        print ${#}
      }
    }
    ```

## Boolean Shell Builtins

* `true` is a shell builtin that returns `0` when called

* `false` is a shell builtin that returns `1` when called

This is an example where the shell will print `success` if the commands `whoami`
and `hostname` both return status code `0`.

```shell
if whoami && hostname; then
    print 'success'
fi
```

{{% samp %}}

ttrojan
challenger
success

{{% /samp %}}


You don't have to use real commands, you could use the shell builtin `true`,
which always returns status code `0`. (In fact, *it's all that `true` actually
does!*)

```shell
if true && true; then
    print 'success'
fi
```

{{% samp %}}success{{% /samp %}}

## Operator Precedence

Proof that `||` has operator precedence over `&&`

* Example 1:

    ```shell
    if true && false || true; then
      print 'success'
    else
      print 'failure'
    fi
    ```

  {{% samp %}}success{{% /samp %}}
  
* Example 2:

    ```shell
    if true || false && true; then
      print 'success'
    else
      print 'failure'
    fi
    ```

    {{% samp %}}success{{% /samp %}}

---



## `zmv`

The `zmv` command is an alternative to `mv`, and can be loaded into the shell
environment using the `autoload` command.

* Loading the `zmv` command:

    ```shell
    autoload zmv
    ```
 
### Usage

* Rename a section of a filename, i. e. `example.1.{txt,conf,db}` or `12345.1.{wav,ogg,mp3}` and
  change the `1` to a `2` in the filename:

    ```shell
    # would rename x.0001.y to x.2.y.
    zmv -n '(*.)(<->)(.[^.]#)' '$1$(($2+1))$3' 
    zmv -n '(*.0#)(<->)(.[^.]#)' '$1$(($2+1))$3'
    ```

* Change files to lowercase:

    ```shell
    zmv '*' '${(L)f}'
    ```

* Serially rename all files (e.g.: `foo.foo` -> `1.foo`, `fnord.foo` -> `2.foo`, etc.):

    ```shell
    ls *
    # 1.c  asd.foo  bla.foo  fnord.foo  foo.fnord  foo.foo
    c=1 zmv '*.foo' '$((c++)).foo'
    ls *
    # 1.c  1.foo  2.foo  3.foo  4.foo  foo.fnord
    ```

* Rename `file.with.many.dots.txt` by substituting dots (except for the last
  one!) with a single space:

    ```shell
    touch {1..20}-file.with.many.dots.txt
    zmv '(*.*)(.*)' '${1//./ }$2'
    ```

* Remove the first 4 chars from a filename

    ```shell
    zmv -n '*' '$f[5,-1]' # NOTE: The "5" is NOT a mistake in writing!
    ```

* Rename names of all files under the current directory to lowercase, but keep
  the directory names themselves intact.

  ```shell
  zmv -Qv '(**/)(*)(.D)' '$1${(L)2}'
  ```

* Replace all 4th character, which is "1",  with "2" and so on:

    ```shell
    autoload -U zmv
    zmv '(???)1(???[1-4].txt)' '${1}2${2}'
    ```

* Remove the first 15 characters from each filename:

    ```shell
    touch 111111111111111{a-z}
    zmv '*' '$f[16,-1]'
    ```

* Replace spaces (any number of them) with a single dash in filenames:

    ```shell
    zmv -n '(**/)(* *)' '$1${2//( #-## #| ##)/-}'
    ```

* Clean up filenames and remove special characters:

    ```shell
    zmv -n '(**/)(*)' '$1${2//[^A-Za-z0-9._]/_}'
    ```

* Lowercase all extensions (i.e.: `*.JPG`) including those found in 
  subdirectories:

    ```shell
    zmv '(**/)(*).(#i)jpg' '$1$2.jpg'
    ````

* Remove leading zeros from file extension:

    ```shell
    ls
    # filename.001  filename.003  filename.005  filename.007  filename.009
    # filename.002  filename.004  filename.006  filename.008  filename.010

    zmv '(filename.)0##(?*)' '$1$2'

    ls
    # filename.1  filename.10  filename.2  filename.3  filename.4  filename.5  
    # filename.6 ...
    ```

* Renumber files:

    ```shell
    ls *
    # foo_10.jpg  foo_2.jpg  foo_3.jpg  foo_4.jpg ...
    zmv -fQ 'foo_(<0->).jpg(.nOn)' 'foo_$(($1 + 1)).jpg'
    ls *
    # foo_10.jpg  foo_11.jpg  foo_3.jpg  foo_4.jpg ...
    ```

* Adding leading zeros to a filename:

    ```shell
    # 1.jpg -> 001.jpg, ...
    zmv '(<1->).jpg' '${(l:3::0:)1}.jpg'
    ```

* Add leading zeroes to files with a filename with at least 30 characters:

    ```shell
    typeset c=1 
    zmv "${(l:30-4::?:)}*.foo" '$((c++)).foo'
    ```

* Replace all spaces within filenames into underlines:

    ```shell
    zmv '* *' '$f:gs/ /_'
    ```

* Change the suffix from `*.sh` to `*.pl`:

    ```shell
    zmv -W '*.sh' '*.pl'
    ```

* Add a `.txt` extension to all the files within `${HOME}`:

    ```shell
    zmv -Q '/home/**/*(D-.)' '$f.txt'
    ```
 
    * `-.` is to only rename regular files or symlinks to regular files
    * `D` is to also rename hidden files (files with names that start with `.`)
 
* Only rename files that don't have an extension:
  
    ```shell
    zmv -Q './**/^?*.*(D-.)' '$f.txt'
    ```

* Recursively change filenames with characters contained in the character set 
  `[?=+<>;",*-]'`:

    ```shell
    chars='[][?=+<>;",*-]'
    zmv '(**/)(*)' '$1${2//$~chars/%}'
    ```

* Removing single quote from filenames (recursively):

    ```shell
    zmv -Q "(**/)(*'*)(D)" "\$1\${2//'/}"
    ```

* When a new file arrives (named file.txt) rename all files in order. For example,
  `file119.txt` becomes `file120.txt`, `file118.txt` becomes `file119.txt` 
  and so on ending with `file.txt` being changed to become `file1.txt`:

    ```shell
    zmv -fQ 'file([0-9]##).txt(On)' 'file$(($1 + 1)).txt'
    ```

* Convert all filenames to be entirely lowercase:

    ```shell
    zmv '(*)' '${(L)1}'
    ```

* Convert all filenames to be entirely uppercase:

    ```shell
    zmv '(*)' '${(U)1}'
    ```
  
* Remove the suffix `*.sh` from all shell script files:

    ```shell
    zmv '(*).sh' '$1'
    ```

* Uppercase only the first letter of all `*.mp3` files:

    ```shell
    zmv '([a-z])(*).mp3' '${(C)1}$2.mp3'
    ```

* Copy the target `README.md` file into same directory as each `Makefile`:

    ```shell
    zmv -C '(**/)Makefile' '${1}README.md'
    ```

* Removing the single quotation character `'` from filenames:

    ```shell
    zmv -Q "(*'*)(D)" "\$1\${2//'/}"
    ```

* Rename `pic1.jpg`, `pic2.jpg`, etc., into `pic0001.jpg`, `pic0002.jpg`, etc.:

    ```shell
    zmv 'pic(*).jpg' 'pic${(l:4::0:)1}.jpg'
    zmv 'pic(*).jpg' '$1/pic${(l:4::0:)2}.jpg'
    ```
