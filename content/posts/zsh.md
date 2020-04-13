+++
title = "Zsh"
description = "Your new favorite programming language"
date = 2020-02-04T14:52:27-08:00
image = "zsh.jpg"
+++

# Shell Scripting

There are a handful of shell scripting languages, many of which will come by default with your operating system. On both macOS and Linux based operating systems, you can count on having at least one of the following shells by default.

* `sh`: the Bourne shell, written in 1977 for Unix
* `ksh`: the Korn shell, written in 1983 by David Korn for Bell Labs
* `bash`: the Bourne Again shell, written in 1989 by Brian Fox for GNU
* `zsh`: the Z shell, written in 1990 by Paul Falstad, released open source under the MIT license

{{% notice info %}}
**TIL:** All of these shell scripting languages were written in the `C` programming language.
{{% /notice %}}

This guide uses `zsh` as the shell language of choice, so your mileage may vary if you try to use these commands in another shell scripting language. The reason `zsh` is chosen is because it's the default shell on the macOS operating system, but more importantly, because it is my favorite shell

## I/O

### `read`

### `getopt`

There exists a builtin command `getopts` but it does not accept long-form command arguments. Therefore, it is useful to use GNU's `getopt` utility function to parse command-line arguments in shell scripts.

**Useful Flags:**
* `-o` or `--options`, specify the short-form options that can be supplied to this program
* `-l` or `--long`, specify the long-form options that can be supplied to this program

For each option declared after the `--options` or `--long` flag, that option can be proceeded by 1 colon, indicating that this option has a required argument, or by 2 colons, indicating that this option has an optional argument

It's a little easier to explain with an example:

```sh
if [[ $# -eq 0 ]]; then
  echo "Error: no options provided" >&2
  exit 1
fi

# Call getopt to validate the provided input.
options=$(getopt -o ho:i:w:: -l help,output:,input:,where:: -- "$@")

if [[ $? -ne 0 ]]; then
  echo "Error: incorrect options provided" >&2
  exit 1
fi

eval set -- "${options}"
while true; do
  case "$1" in
  -h|--help)
    echo "I'm sorry Dave, I'm afraid I can't do that"
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
  echo "Input file is ${ifile}"
fi

if [[ ${ofile} ]]; then
  echo "Output file is ${ofile}"
fi

if [[ ${location} ]]; then
  echo "Location is ${location}"
fi
```


## Tilde Expansion & Wildcards

* `*` matches any string of characters
* `?` matches any single character. `file.?`, for instance, would match `file.c` and `file.o` but not `file.cpp`
* `[abc]` will match a single character, either a, b, or c.

## Login Shells

A login shell is started when you open your terminal, or login to another computer via `ssh`. But here is where it gets tricky. If you open your terminal, and you see your shell prompt, opening up a new shell inside of it would **not** be a login shell.

```sh
zsh
```

And yet, the following would be a login shell, because it uses the `-l` flag to log in.

```sh
zsh -l
```

Run each of these commands below to help you test whether or not your shell is a login shell:

```sh
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

```sh
case "$-" in
  *i*)	echo This shell is interactive ;;
  *)	echo This shell is not interactive ;;
esac
```


## `/etc vs. ~/`

* A dotfile located in `/etc` will load for any user on the machine.
* A dotfile located in `~/` will load for only that user.
* When a shell is a login shell, it will source `/etc/zprofile` and `~/.zprofile` in that order.
* When a shell is a interactive shell, it will source `/etc/zshrc` and `~/.zshrc` in that order.
* Regardless of the shell, `zsh` will source `/etc/zshenv` and `~/.zshenv` in that order.

You can actually tell which files were sourced by `zsh` on your command line by running the following command:

  ```sh
  zsh -o SOURCE_TRACE
  ```

## Command Substitution

For more information, see the `COMMAND SUBSTITUTION` section of `man zshexpn`

Sometimes you're in a situation where you'd like to run a command, but you don't know what the input value should be yet. Yes, you could save a variable, but that wouldn't be the properly lazy way of doing things. You can treat a substitute the output of a function by placing it inside `$(here)`

* Examples of command substitution:

  ```sh
  echo "My name is $(whoami)"
  # My name is austin
  ```

## Parameter Expansion

For more information, see the `PARAMETER EXPANSION` section of `man zshexpn`

* Example of parameter expansion

  ```sh
  name='Austin'
  echo My name is ${name}
  ```

## Conditional Expressions

When coding, we typically expect *less than* to be represented by the `<` character. In shell scripting, however, the `<` symbol has an entirely seperate meaning (more on that later). To perform an equality check, we have to use `-lt` to signify the same meaning. Also, we will use square brackets `[[ ]]` to contain the statement, and literally specify `then` as well as the end of our if statement. An example is provided below.

```sh
number=4
if [[ ${number} -lt 5]]; then
  echo "less than five"
else
  echo "not less than five"
fi
```

{{% notice info %}}
**Tip:** You can use the `;` character to signify a newline without actually providing one. This is useful for compressing a script or writing one-liners on your terminal.
{{% /notice %}}

* Check the user

```sh
# Check if the script is being executed by the root user
if [[ ${UID} -ne 0 ]]; then echo "You are not the root user"; fi
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

{{% notice warning %}}
**Warning:** In shell scripting, you can only use `==` and `!=` to see if two **strings** are of equal value.
{{% /notice %}}

## Arithmetic Evaluation

In order to perform arithmetic operations, surround variable names, integers, and operators in a `((...))` double quotations, like this:

```sh
# Appending '1' to the string '2'
value=2
value+=1
echo ${value}
# => 21

# Adding the number '1' to the number '2'
value=2
((value+=1))
echo ${value}
# => 3
```

### `ls`

### Useful Flags

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

* If you're on macOS, you're likely using BSD's `ls`. To colorize the output of `ls`, include the `-G` flag or add `export CLICOLOR=1` to your `.zshrc` file.

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

Some characters are special, but only some of the time, such as `,`, for example:

  ```sh
  echo cod{e,er,ing}
  # => "code coder coding"
  ```


## Single Quotes

If a string is inside of single quotes, every character inside will be preserved literally, thus no escaping is possible. The only character that can't be typed is the single quote `'` which signals the end of the string.

## Double Quotes

Double quotes are a little more permissive than single quotes.

* The dollar sign `$` retains its special meaning.
* The backtick &grave; retains its special meaning.
* A back-slash `\` only retains its special meaning when escaping a `$`, &grave;, `"` or a newline character.


### Run a job in the background

When a program is run in the background, the program is forked, and run in a sub-shell as a job, running asynchronously. You can add a single ampersand `&` at the end of a command to have it run in the background.

```sh
# Run example.py in the background, returns the number 1234
python3 example.py &
```

You can declare multiple programs to run in the background with a single command

```sh
python3 one.py & python3 two.py & python3 three.py &
```

### Run commands sequentially

You can use a double ampersand `&&` to signal for jobs to run in sequential order. The second command will only run if the first command doesn't fail. A program fails if it returns a number other than 0.

```sh
./program && echo 'Program returned 0'
```


### `/dev/null`

#### Your own personal black hole

`/dev/null` is a very useful tool. If you're ever in a situation where you need to redirect output, but you have nowhere to put it, you can redirect it to `/dev/null`. This will accept input and essentially vaporize it. You won't see anything printed to your terminal, and nothing will be saved to a file.

Run this command in your terminal to see what happens.

```sh
echo "Silence me!" &> /dev/null
```

However, there's an even easier way to do it. You can combine `stdout` and `stderr`, file descriptors `1` and `2` respectively using the `&>` redirection command, and then append a `-` to close both of the file descriptors.

Easier to demonstrate with an example

```sh
say_something() {
  echo "Standard Output" >&1
  echo "Standard Error" >&2
}

say_something
# => "Standard Output"
# => "Standard Error"

say_something 1>&-
# => func:1: 1: bad file descriptor
# => "Standard Error"

say_something 2>&-
# => "Standard Output"
# => zsh: write error
```

## Shell Arguments, Options, Flags

Sometimes you want to specify an option/flag (same thing)

Maybe `-v` should print verbose output. But other times, there's an argument associated with the flag, such as `-o file.txt`. In this case, `file.txt` is known as an *option argument*

### Parsing Command-Line Arguments

The keyword `${@}` contains the set of all arguments that followed the command.

```sh
for arg in "${@}"; do
  echo $arg
done
```

### Reading I/O

### `read`

* Prompt for input, save to variable

```sh
echo "Enter a number"
read num
echo "You guessed $num"
```

* Prompt for password, save to variable

```sh
# Save the result in the variable 'secret'
read -rs 'secret?Password:'
echo "You entered ${secret}"
```

* Pass each word from piped input into an array

```sh
echo "alpha bravo charlie" | read -A bases
print -l ${bases}
# alpha
# bravo
# charlie
```

* Read input from `/dev/stdin`

```sh
read -u 0
```

### Reading Files

```sh
files=/Users/austintraver/Downloads/*
for file in $files; do
  echo $file
done
```

# While loops

```sh
index=0
while [[ ${index} -lt 5 ]]; do
  echo ${index}

  # Lame variable increment
  index=$((index+1))

  # L33t variable increment
  ((index+=1))
done
```

## String Manipulation

String manipulation allows you to rename files, implement boolean logic, along with many other uses. Every variable stored as string can be referenced with the syntax `${string:position:length}`

## Index Slicing

```sh
val='0123456789'
# [ Print the first three numbers ]
print ${val:0:3} #012
# [ Print every number after index 5 ]
print ${val:5} # 56789
# [ Print the last 3 numbers ]
print ${val:(-3)} #789
# [ Print everything except the first 2 numbers and last 3 numbers ]
print ${val:2:(-3)} # 23456
# [ Print two numbers starting from the 6th-to-last number ]
print ${val:(-6):2} # 45
```

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

```sh
string='one/two/three/four/five'

echo ${string#*/} # two/three/four/five
echo ${string##*/} # five
echo ${string%/*} # one/two/three/four
echo ${string%%/*} # one

```

## Length of a String

```sh
checksum=${(s< >)$(shasum -a 256 file.txt)[1]}
print ${(N)oldsum##*}
# 64
```

## Cutting Out The Middle

Using the parameter expansion flag `(S)`, you can actually specify for the pattern to match substrings, similar to the way `grep` and `sed` work. For the `#` and `%` parameter expansion flags, they will still seek to cut from the beginning and the end respectively, but will cut out the first match found to the pattern (non-greedy) from the middle of the string. You can use `##` and `%%` to perform greedy searches.

```sh
string='one/two/three/two/one'

# Remove the (S)ubstring 'two' on the left
echo ${(S)string#two}
#       one//three/two/one

# Remove the (S)ubstring 'two' on the right
echo ${(S)string%two}
#       one/two/three//one

# Extract the (M)atching (S)ubstring in the middle
echo ${(MS)string#/t*o/}
#         /two/three/two/


string='the quick brown fox'

# Non-greedy match starting from the left
echo ${(MS)string#q*o}
#           quick bro

# Greedy match starting from the left
echo ${(MS)string##q*o}
#           quick brown fo

```


## Splitting Strings

You can index a string by its word index (1-indexed), even if there is punctuation in the sentence by using the (w) function inside of square braces.

```sh
var='This sentence   has  inconsistent spaces'
echo ${var[(w)5]} # spaces
var='Sentence one. Sentence two.'
echo ${var[(w)4]} # two.
var='You can even get the word that comes last'
echo ${var[(w)-1]} # last
```

## Referencing Command History

* `!!` repeat previous command and all arguments
* `!*` all of the arguments from the last command
* `!^` the first argument of the previous command
* `!$` the last argument supplied to the previous command
* `$_` the last argument supplied to the previous command
* `!#` the current command typed thus far
* `!-`2 the second-to-last command
* `!#:0` the command being typed
* `!#:2` the second argument of the current command being typed
* `$$` the process ID itself
* `$*` a string containing all arguments entered on the last command
* `$@` the array of the arguments entered on the last command
* `$1` the first argument supplied to a command
* `$2` the second argument supplied to a command
* `$?` the return value of the previous command
* `$-` the current options set for the shell (the single letter option names concatenated into a string)

* Reference the first argument of the previous command

  ```sh
  echo first second third

  print !:^
  # => "first"
  ```

* Reference the last argument of the previous command

  ```sh
  echo first second third

  print !:$
  # => "third"
  ```

* Reference the second argument of the previous command

  ```sh
  echo first second third

  print !:2
  # => "second"
  ```

* Reference all arguments of previous command, excluding the last argument

  ```sh
  echo first second third

  print !:^-
  # => "first second"
  ```

* Reference the second-to-last command

  ```sh
  echo 'three'
  echo 'two'
  echo 'one'
  !-2 # => echo two
  ```


### Substituting Text in Previous Commands

Single Substitution:

```sh
echo the quick brown fox
# => the quick brown fox

# [ Option 1 ]
!!:s/brown/blue
# => echo the quick blue fox

# [ Option 2 ]
^brown^blue
# => echo the quick blue fox
```

Global Substitution:

Using the previous syntax, you will only replace the first instance matched. If you want to replace all matches to the pattern, use the syntax below:

```sh
echo it is what it is
# => it is what it is

!!:gs/is/be
# => it be what it be
```

* **Note:** When you are referring to parts of the previous command using the special characters `^`, `$`, `*`, `-`, or `%`, you can leave out the colon character, `:`, used to declare substitutions, that usually follows the `!!` character,


## Parameter Expansion

* `${parameter:-word}`
  * If parameter is unset or null, the expansion of word is substituted. Otherwise, the value of parameter is substituted.

* `${parameter:=word}`
  * If parameter is unset or null, the expansion of word is assigned to parameter. The value of parameter is then substituted. Positional parameters and special parameters may not be assigned to in this way.

* `${parameter:?word}`
  * If parameter is null or unset, the expansion of word (or a message to that effect if word is not present) is written to the standard error and the shell, if it is not interactive, exits. Otherwise, the value of parameter is substituted.

* `${parameter:+word}`
  * If parameter is null or unset, nothing is substituted, otherwise the expansion of word is substituted.

## Directory Expansion

* `~+`: Expands to `$PWD`
* `~-`: Expands to `$OLDPWD`

## `command`

## Loading Bar

You can use ANSI escape codes to make a loading bar

```sh
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

```sh
for i in {1..255}; do
  print "\x1b[38;5;${i}mwow\x1b[0m\n"
  sleep 0.01
  print "\x1b[1F"
done
# Return to the line below
print "\x1b[E"
```

## Read Words Into Array

* `words.txt`

  ```text
  the day is sunny the the
  the sunny is is
  ```

  ```sh
  words=($(<words.txt))
  echo ${#words} # 10
  echo ${words}
  # => "the day is sunny the the the sunny is is"
  ```

## Handling Signals With Trap

```sh
TRAPINT() {
	echo "TRAPINT() called: ^C was pressed"
}

TRAPQUIT() {
	echo "TRAPQUIT() called: ^\\ was pressed"
}

TRAPTERM() {
	echo "TRAPTERM() called: \`kill\` command received"
}

TRAPEXIT() {
	echo "TRAPEXIT() called: happens at the end of the script no matter what"
}

for i in {1..5}; do
	echo ${i}
	sleep 1
done
```


For all of these `TRAP[NAL]()` functions, if the final command is `return 0` (or if there is no return statement at all, then code execution will continue where the program left off, as if the signal was accepted, caught, and handled. If the return status of this function is non-zero, then the return status of the trap is retained, and the command execution that was previously taking place will be interrupted. You can do `return $((128+$1))` to return the same status as if the signal had not been trapped

## `fc` "find command"

* List the last 10 commands in history

  ```sh
  fc -l -10
  ```

* List commands number 800 through 850 in history

  ```sh
  fc -l 800 850
  ```

* List all commands in history that started with `sudo`

  ```sh
  fc -lim 'sudo *' 1
  ```

## Globbing

* Remove files that haven't been accessed in more than 1 day

  ```sh
  # For files (not directories) in `~/tmp`, list those
  # that haven't been accessed in at least 1 day
  for file in ~/tmp/**/*(.ad+1); do
    rm ${file}
  done
  # `(.)` select files, but not directories
  # (ad+1) access time, >1 (d)ays from the present moment
  ```

## Operator Expansion

* `"${(k)name}"`: If `name` is an associative array, the expression `${(k)name}` will expand to the list of keys contained by the array `name`

* `(k)` Print the keys of a assorted array

```zsh
declare -A dict
dict[a]=alpha
dict[b]=bravo
dict[c]=charlie
print ${(k)dict}
# => `a b c`
```

You can split a string into an array by a delimiter with the `(s)` flag

```sh
PATH="/bin:/usr/bin:/usr/local/bin"
print -l "${(s.:.)PATH}"
# => /bin
# => /usr/bin
# => /usr/local/bin
```

* **Note:** `zsh` has a builtin function `print` which is more versatile than the standard `echo` command. For instance, the `-l` flag will print each entry in an array on a seperate line. In this case, we split a string by the `:` as a delimiter, turned that into an array, and passed it as the argument to `print`


## Globbing

`zsh` is capapable of some very powerful globbing. Without setting any options, you can recursively iterate through directories with `**/*`.

### Glob Options

* `setopt NULL_GLOB`: If a glob pattern is not matched, don't return an error, return instead an empty string.

* `setopt EXTENDED_GLOB` will enable special glob patterns, examples provided below:

  ```sh
  # Select any file in any directory, whose parent directory is not 'src', 'bin', or 'lib'
  ./*/(*~src~bin~lib)/*(.); do
  ```

Included below are some features of the extended glob option:

* `^x` Matches anything except the pattern `x`. This means that `^foo/bar` will  search  directories in the present working directory except for `./foo` for a file named `bar`

## Glob Qualifiers

Section 14.8.7 of the manual covers all of this in greater detail.

* `(:a)`: return each globbed file's absolute path.

  ```sh
  echo ./*(:a)
  # ./example.txt => /Users/tommy/example.txt
  ```

* `(:P)`: return each globbed file's absolute path, resolved of any symbolic links

  ```sh
  echo ./*(:P)
  # ./example.txt => /Users/tommy/example.txt => /Users/tommy/real/example.txt
  ```

* `(:A)`: return each file's absolute paths, trying to resolve symbolic links, falling back on the absolute file to the symlink file itself if the directory it points to does not exist.

  ```sh
  # [ Using (:A) ]
  ln -s /fake/path ~/Desktop/example
  echo ~/Desktop/example(:A)
  # => /Users/austin/Desktop/example

  # [ Using (:P) ]
  echo ~/Desktop/example(:P)
  # => /fake/path
  ```

* `(:e)`: strip everything but the extension from each globbed file

  ```sh
  echo ./*(:e)
  # ./example.txt => txt
  ```

* `(:r)`: strip the extension suffix

  ```sh
  echo ./*(:r)
  # ./example.txt => ./example
  ```

* `(:t)`: strip all of the leading directories from the filepath

  ```sh
  val="./path/to/file.txt"
  echo ${val:t}
  # ./path/to/example.txt => example.txt
  ```

* `(:h)`: strip one trailing pathname component from the filepath

  ```sh
  val="./path/to/file.txt"
  echo ${val:h}
  # ./path/to/file.txt => ./path/to
  ```

* Putting it all together

  ```sh
  echo ./*(:ar)
  # ./example.txt => /Users/atraver/example
  ```

## Globbing Specific Filetypes

* `.` Plain Files
* `/` Directories
* `*` Executable Plain Files
* `@` Symbolic Links
* `=` Sockets

```sh
# All plain files
echo ./*(.)

# Anything but directories
echo ./*(^/)

# Only empty directories
echo ./*(/^F)

# [ Recursive Editions ]

# All plain files
echo ./**/*(.)

# Anything but directories
echo ./**/*(^/)
```

### Ownership Globbing

Owner

* `r`: readable
* `w`: writable
* `x`: executable

Group

* `A`: readable
* `I`: writable
* `E`: executable

World

* `R`: readable
* `W`: writable
* `X`: executable

Ascending Order

* `on` Name
* `oL` Filesize
* `oa` Time Accessed
* `om` Time Modified
* `oc` Time Created

* `odon` Sort by names for files within the same directory

* `*(^-oL)'` Sort all files by file size in descending order, resolving any symbolic links

* Print all of the directories in descending order of size, in an escaped format to be re-usable by the shell

```sh
echo ./*(/OL:q)
```

* Select the largest regular file within a directory

```sh
# 'L': (normally) sort by length (of file, i.e. its size), ascending

# (Using ascending order, and picking the last element)
#
echo ./*(.DoL[-1])

# (Using descending order, and picking the last element)
# 'O': reverse order
echo ./*(.DOL[1])
```

* Select all files larger than 2MB in a directory

```sh
# 'm' (megabytes) (and 'k' for kilobytes)
# '-' (smaller than 2)
echo ./*(.Lm-2)
```

* Select the most recently modified file within a directory

```sh
echo ./*(.om[1])
```

* Select all files modified within the last hour

```sh
# 'M' for Months
# 'w' for weeks
# 'h' for hours
# 'm' for minutes
# 's' for seconds
# '-': modified less than '#' hours ago
# '+': modified more than '#' hours ago
print -l ./*(.mh-1)
```

* Add each directory to an array, but only if it exists

```sh
# Using
# (N) enable null glob
# (/) only match an existing directory
typeset -a my_array
my_array=( /usr(/N) /bin(/N) /asdf(/N))
print -l ${my_array}
```

```txt
/usr
/bin
```

* Select all files that aren't named `tmp`

```sh
# '#': the delimiter between the expansion flag and the string
# `$REPLY`: every file name specified by the glob ./*
print -l ./*(e#'[[ ! -e $REPLY/tmp ]]'#)
```

## Checking if a Command Exists

  ```sh
  # [ Wrong way, see below ]
  if [[ =brew ]]; then
    echo "Command exists"
  else
    echo "Command not found"
  fi

  # [ Right way, note the (( parentheses )) ]
  if (( ${+commands[brew]} )); then
    echo "Command exists"
  else
    echo "Command not found"
  fi
  ```

{{% notice warning %}}
**Note:** if there exists an alias by this name, it will return the alias definition instead of the path to the executable file. Furthermore, if the command is not found, it will print an error to the console.
{{% /notice %}}


## Count the Number of Words in a String

```sh
sentence="hi my name is"
echo ${#string} # 13 (number of characters)
echo ${(w)#string} # 4 (number of words)
```

## Reading Words

* Print each word that occurs in `words.txt`

  ```
  <words.txt>
  the day is sunny the the
  the sunny is is
  ```

  ```sh
  # Read in the file into an array of words
  words=($(<words.txt))

  # Printing all the words
  echo ${words[@]}
  # => "the day is sunny the the the sunny is is"

  # Printing the unique words
  echo ${(u)words[@]}
  # => "the day is sunny"
  ```

* Printing the count of each word occuring in `words.txt` in descending order

  ```sh
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
    echo ${result}
  done
  ```

* Solution using command line tools

  ```sh
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

  ```sh
  string="alpha::charlie"

  # excluding the empty index value in the middle
  array1=(${(s_:_)string}) # using '_' as argument separator
  array1=(${(s[:])string}) # using '[]' as argument separator
  echo ${#array1} # => '2'

  # including the empty index value in the middle
  array2=("${(@s_:_)string}") # using '_' as argument separator
  array2=("${(@s[:])string}") # using '[]' as argument separator
  echo ${#array2} # => '3'
  ```

{{% notice info %}}
**Tip:** `zsh` gives you a lot of flexibility with what syntax to separate arguments supplied to flags. You can use `[...]` `<...>` `{...}` or `(...)`
{{% /notice %}}

* Create an array out of the lines outputted by a command

  ```sh
  print -l ${(f)"$(networksetup -getinfo Wi-Fi)"}
  ```

* Extract the second line of output from a command

  ```sh
  print ${${(f)"$(networksetup -getinfo Wi-Fi)"}[2]}
  ```

* Append `.old` to each scalar in the array

    ```sh
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

    ```sh
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

  ```sh
  string="this sentence is a sentence
  this line is part of the paragraph
  and this line is the end"
  words=(${=string})
  print -l ${(u)words}
  # => this sentence is a line part of the paragraph and end
  ```

* Print each word in lexicographic order

  ```sh
  string="third fourth Second First"
  words=(${=string})
  print ${(o)words}
  # => First Second Third Fourth
  ```

* Given a string that includes tabs, spaces, and newlines, return an array of just the words

  ```sh
  string=$'first\tsecond\nthird fourth fifth sixth'
  array=(${=string})
  echo ${#array} # 6
  ```

* Passing escape sequences to a string

  ```sh
  echo $'name:\tAustin Traver\nid:\t1234'
  # => name:  Austin Traver
  # => id:    1234
  ```

* Check if a variable is set

  ```sh
  if [[ ${+var} -eq 1 ]]; then
    echo "Variable is set"
  else
    echo "Variable is not set"
  fi
  ```

* C-style `for` loop

  ```sh
  for ((i=0; i<10; ++i)); do
    echo ${i}
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

  ```sh
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

  ```sh
  if [[ true ]]; then
    <<-EOF > file.txt
    1 leading tab
      2 leading tabs
        3 leading tabs
    EOF

  fi
  ```

* Printing the contents of `file.txt`:

  ```sh
  # Print the contents of 'file.txt'
  < 'file.txt' >&1
  # [ Output ]
  # ==========
  # => 1 leading tab
  # => 2 leading tabs
  # => 3 leading tabs
  ```

### Expanding Parameters in Files

If you have a super long string of text, for instance, a SQL query, you may want to save the contents of that query in a different file. It's possible you may need to store a variable in the query, and if so, you can use the `(e)` paramater expansion flag when referencing the string. This flag causes the string to have any `${variable}` words treated as if they were a normal shell variable, and not text from the file.

* Expanding parameters as if they were variables in a file:

  ```sh
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

## Curly Braces

* Multiple mid-word character substitutions

  ```sh
  echo h{a,e,i,o,u}p
  # => hap hep hip hop hup
  ```

* Repeating a string multiple times

  ```sh
  print 'woah'{,}
  # woah woah
  print 'woah'{,,}
  # woah woah woah
  print 'woah'{,,,}
  # woah woah woah woah
  ```

* Generating ranges of numbers

```sh
echo {01..10}
# => 01 02 03 04 05 06 07 08 09 10

echo {01..10..3}
# => 01 04 07 10

echo {a..z}
# a b c d e f g h i j k l m n o p q r s t u v w x y z


echo {a..z..3}
# => a d g j m p s v y

print {a..z} '\n' {A..Z} '\n' {0..9}

left=1
right=9

echo {$left..$right}
# => 1 2 3 4 5 6 7 8 9
```

## Ternary Operator

Ternary operators are supported within a double parentheses evaluation

  ```sh
  a=5
  b=6
  max=$(( $a > $b ? a : b ))
  print $max
  # => 6
  ```

{{% notice info %}}
  **Note:** Don't do this with string comparisons because inside of (( ... )) all strings are treated as the number `0`
{{% /notice %}}

{{% notice warning %}}
  **Warning:** Be careful about comparing strings, because sorting is by lexicographical order which means that a word is sorted in the following way: treat each number as a word in a dictionary. the value of a word would correspond with its location in the dictionary. "a < z" because "a" would be at a lower index number in the dictionary
{{% /notice %}}

  ```sh
  [[ "apple" < "banana" ]] && print "yes" || print "no"
  # => "yes"
  ```

{{% notice warning %}}
  **Warning:** Inside of double brackets, the evalution is not a true ternary operator, because the third statement will still execute if an error is thrown by the second statement
{{% /notice %}}

  ```sh
  [[ 1 -eq 1 ]] && asdf || print "Not true"
  # => "bash: asdf: command not found"
  # => "Not true"
  ```

{{% notice info %}}
  **Workaround:** You can fix this problem by surrounding the truth evaluation by curly brackets, and appending a `;:;` to the end of the statement. this will cause the command to report the error when it occurs, and then return `true` which will cause the or statement to not evaluate, since the first two statements returned `true`
{{% /notice %}}

  ```sh
  [[ 1 == 1 ]] && { asdf ;:; } || print "Not true"
  # => "bash: asdf: command not found"
  ```

# ANSI C Quotations


ANSI C QUOTING with $'...' syntax

```sh
print $'2\nlines'
# => 2
# => lines

print $'\x41'
# => A

print $'\u7231'
# => 爱

print $'\U0001f602'
# => 😂
```

## Regular Expressions

You can use the `=~` operator to test a value against a pattern

```sh
pie=good

[[ $pie =~ d ]]
print $?
# => 0, it matches the regex!

[[ $pie =~ [aeiou]d ]]
print $?
# => 0, still matches

# No match because the regular expression has to capture the value of
# the variable, not the variable itself
[[ $pie =~ [p][i]e ]]
print $?
# => 1

# No match because there's no literal '[aeoiu]d' inside the word "good"
[[ $pie =~ "[aeiou]d" ]]
print $?
# => 1
```

## Arithmetic Evaluation

```sh
a=2
b=4
print $((a*b))
# => 8

# You can even do assignments.  The last value calculated will be the output.
b=$(( a *= 2 ))
print "b=$b a=$a"
# b=4 a=4
```

### Floating Point Arithmetic

```sh
a=$(( 1 + 1 ))
message="I don't want to brag, but I have like $(( a + 1 )) friends."
print $message
# => I don't want to brag, but I have like 3 friends."
```

{{% notice info %}}
**Note:** this won't work for floating points, because bash will truncate the decimals when evaluating division
{{% /notice %}}

```sh
print "6 / 8 = $(( 6 / 8 ))"
# => 6 / 8 = 0


print "6 / 8 = $(( 6 / 8.0 ))"
# => 6 / 8 = 0.75
```

## File Descriptors

* `1<&-`: Close the standard input.

* `1>&-`: Close the standard output.

* `<&p`: Move the input from the coprocess to stdin

* `>&p`: Move the output from the coprocess to output

* `2>&1`: `/dev/stderr` will be directed to `/dev/stdout`

* `1>&2`: `/dev/stdout` will be directed to `/dev/stderr`

* `&> file.txt`:  both `/dev/stdout` and `/dev/stderr`

* Redirect output and error to different files

```sh
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

```sh

exec 3> ~/three.txt

print 'one' >&1
print 'two' >&2
print 'three' >&3

exec 3>&-
exec {four}>&-
```

  ```sh
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


  ```sh
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

If you have a command that you'd like to continue running, even after the shell has been closed, you can use the `disown` builtin command. There is an explicit syntax, and a short-hand syntax.

* Disowning the job process id `%1`

  ```sh
  # Explicit syntax
  disown %1
  ```

  ```sh
  # Shorthand syntax
  %1&|
  ```

## Delete Dangling Symlinks

Sometimes symbolic links point to files that don't exist, it's useful to delete them, and `zsh` makes that super simple.

* Deleting all dangling symlinks

  ```sh
  # '-@' only broken symlinks
  # 'D' include .dotfiles
  # 'N' enable NULL_GLOB option for this pattern
  #     prevents an error if no matches are found
  rm -- *(-@DN)
  ```

## Remove Element From Array

Sometimes you have an array of elements, and you need to remove a value from the array, but you don't know the index that this value is located at.

* Removing an element from an array

  ```sh
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

{{% notice info %}}
**Good News:** There's a much less ugly way to do this in `zsh` version 5.0 using the `${array:|filter}` syntax. It's documented in "Parameter Expansion" of `man zshexpn`
{{% /notice %}}

* Removing an element from an array

  ```sh
  # Array with four elements
  array=(alpha bravo charlie delta)

  # Array 'filter' with elements 'bravo' and 'charlie'
  filter=(bravo charlie)

  # Remove from 'array' any element contained in the array 'filter'
  excluded=${array:|filter}
  # (alpha delta)

  # Remove from 'array' any element *not* contained in the array 'filter'
  included=${array:*filter}
  # (bravo charlie)

  # Remove from 'array' any element matching the pattern 'charlie'
  group=${array:#charlie}
  # (alpha bravo delta)

  # Remove from 'array' any element not matching the pattern 'CIDR*'
  ${(M)array:#CIDR*}

  # Remove any line from 'whois' that doesn't start with 'CIDR'
  ${(M)${(@)${(f)${"$(whois 52.52.124.230)"}}}:#CIDR*}
  ```

## Background Jobs

* Put a job in the background upon launch

  ```sh
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

  ```sh
  if (( ! ${+commands[gpg]} )); then
    print "Command not found"
  else
    print "Command was found"
  fi
  ```

## Parsing Command Options

The `zparseopts` module can be used to create a function or program that can accept command-line options. For more information about how to use it, you can search for `zparseopts` in `man 1 zshmodules`

Attached below you will see a wrapper I wrote for the `transmission` command line interface, as there is no way to cleanly alias the `transmission` command without writing a wrapper like this, as it installs as five separate commands.

  ```sh
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

* `typeset -x <var>`: declare `<var>` as an exported global variable
* `typeset -F <var>`: declare `<var>` as a floating type variable.
* `typeset -E <var>`: declare `<var>` as a floating type variable (scientific notation).
* `typeset -i <var>`: declare `<var>` as an integer type variable.
* `typeset -a <var>`: declare `<var>` as an array type variable.
* `typeset -A <var>`: declare `<var>` as an associative array type variable.
* `typeset -r <var>`: declare `<var>` as a read-only variable.
* `typeset -U <var>`: declare `<var>` as a unique-element only variable (for arrays)
* `typeset -l <var>`: convert `<var>` to lower-case whenever expanded
* `typeset -u <var>`: convert `<var>` to upper-case whenever expanded

### Printing Environment Variables

#### Matching a Certain Type

* Printing all variables of a certain `typeset`:

  ```sh
  # All variables with their types
  typeset +
  # All variables that are floating point
  typeset -E +
  # View the assignment of a variable
  typeset USER
  ```

#### Matching a Certain Pattern

* Print environment variables whose names match the pattern

```sh
typeset +m 'foo*'
```

```txt
foo
foo_fighters
food
```

* Print variable and its corresponding value for environment variables whose names match the pattern

```sh
typeset -m 'foo*'
```

```txt
foo=bar
foo_fighters=awesome
food=(my life)
```

* Print variables' `typeset` options, its name, and its assigned value, for each matching the pattern:

```sh
typeset -p -m 'foo*'
```

```txt
typeset foo=bar
typeset foo_fighters=awesome
typeset -a food=( my life )
```

* Print all keys in an associative array that **don't** start with `foo`

  ```sh
  print ${(k)example:#foo*}
  ```

* Print all keys in an associative array that **do** start with `foo`

  ```sh
  print ${(Mk)example:#foo*}
  ```

* Print all values in an associative array that **don't** start with `foo`

  ```sh
  print ${(v)example:#foo*}
  ```

* Print all values in an associative array that **do** start with `foo`

  ```sh
  print ${(Mv)example:#foo*}
  ```

### Pairing Scalars and Arrays

If you're using a shell scripting language, you often have to export directories to the environment, such as for `PATH`, which requires a list of directories separated by a colon.

Zsh gives you the ability to link two variables together, a scalar and an array. You can specify the delimiter that separates elements, and once you have, adding items to the array will add items to the scalar. An example is provided below:

* Linking a scalar and an array

  ```sh
  typeset -T COLORS colors ':'
  colors=(red)
  colors+=(blue green)
  print ${COLORS}
  # => "red:blue:green"
  ```

## Printing Colors

Printing colors can be done with SGR escape codes, explained on the [ASCII](/ascii) page, but you can also do it with the prompt string format specifier syntax outlined below:

  ```sh
  print -P '%F{9}[red foreground]%f'
  print -P '%K{blue}[blue background]%k'
  print -P '%U[underline]%u'
  print -P '%B[bold]%b'
  print -P '%S[standout]%s
  ```

{{% notice info %}}
Printing `%E` will clear from the cursor to the end of the line.
{{% /notice %}}

## Custom Keybindings

Use the `zle` module for binding custom keys, code written using `zle` can be sourced in your configuration files.

* Enabling vi-mode

  ```sh
  bindkey -v
  ```

* Creating custom key-binding using `zle` module:

  ```sh
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

  ```sh
  # in Zsh
  bindkey -M viins '\C-m' self-insert-unmeta
  ```

## Completion Functions

Let's say our program is called `hello`.

Here's what will happen:

1. You write a completion function, typically `_<cmd-name>`

```sh
_hello() {
  # You write your code here
}
```

2. You bind your function to a command

```sh
compdef _hello hello
```

- **Whenever** you press `<Tab>` after `hello`, `_hello` will be called.

Whenever you want to throw out possible completions, you'll use one of the following utility functions(in this post):

### compadd

* Reference: `man zshcompwid`

If you want to have this:

  ```sh
  hello <Tab>
  # => cmd1    cmd2    cmd3
  ```

You'll write this:

  ```sh
  comdadd cmd1 cmd2 cmd3
  ```

### _describe

If you want to have this:

  ```sh
  hello <Tab>
  # => cmd1    --  description1
  # => cmd2    --  description2
  ```

You'll write this:

  ```sh
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

  ```sh
  hello <Tab>
  -o  --  description
  ```

For the second one, `<argument number>` is self-explanatory. I'll leave `message` empty to demonstrate a minimal example. For `<what to do>`, it can be quite a few things, two of which are provided below:

1. List of arguments possible at given `argument number`. For example, if two arguments(`world` and `universe`) are possible at argument one(`hello world|universe`), we can write:

  ```sh
  _arguments '1: :(world universe)' <something> ...
  ```

2. Set variable `state` to an identifier. For example, if we want to call another function at argument no. 2, we can write:

  ```sh
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

  ```sh
  hello [cat|head] <file at /var/log> one|two
  ```

Its completion function can be:

  ```sh
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

  ```sh
  zmodload zsh/nearcolor
  print -P '%F{#AFAFFF}Violet%f`
  ```


## Multios

* See output on `stdout` but save to `file.txt` as well

```sh
date >&1 >file
```

