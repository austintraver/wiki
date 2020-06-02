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
  *i*)	print This shell is interactive ;;
  *)	print This shell is not interactive ;;
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
  print "My name is $(whoami)"
  ```

  ```txt
  My name is austin
  ```

## Parameter Expansion

To learn more, see the `PARAMETER EXPANSION` section of `man zshexpn`

* Example of parameter expansion

  ```sh
  name='Austin'
  print My name is ${name}
  ```

  ```txt
  My name is Austin
  ```

## Conditional Expressions

When coding, we typically expect *less than* to be represented by the `<` character. In shell scripting, however, the `<` symbol has an entirely seperate meaning (more on that later). To perform an equality check, we have to use `-lt` to signify the same meaning. Also, we will use square brackets `[[ ]]` to contain the statement, and literally specify `then` as well as the end of our if statement. An example is provided below.

```sh
name='Austin'
if [[ ${name} == 'Austin' ]]; then
  print "His name is Austin"
else
  print "his name is not Austin"
fi
```

## Arithmetic Evaluation

```sh
number=4
if (( number < 5 )); then
  print "Number is less than five"
else
  print "Number is not less than five"
fi
```

```txt
Number is less than five
```


{{% notice info %}}
**Tip:** You can use the `;` character to signify a newline without actually providing one. This is useful for compressing a script or writing one-liners on your terminal.
{{% /notice %}}

* Check the user

```sh
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

{{% notice warning %}}
**Warning:** In shell scripting, you can only use `==` and `!=` to see if two **strings** are of equal value.
{{% /notice %}}

## Arithmetic Evaluation


In order to perform arithmetic operations, surround variable names, integers, and operators in a `((...))` double quotations, like this:

* Adding to `1` the number `2`

  ```sh
  value=1
  ((value+=2))
  print ${value}
  ```

  ```txt
  3
  ```

If you don't do that, the variable is interpreted as a string, and the number will be *appended* to the variable's current value.

* Appending to `1` the character `2`

  ```sh
  # Appending '1' to the string '2'
  value=1
  value+=2
  print ${value}
  ```

  ```txt
  12
  ```

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

  ```sh
  print cod{e,er,ing}
  ```

  ```txt
  code coder coding
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

* Run a program in the background

  ```sh
  python example.py &
  ```

* Run multiple programs in the background (with only a single command)

  ```sh
  python one.py & python3 two.py & python3 three.py &
  ```

### Run commands sequentially

You can use a double ampersand `&&` to signal for commands to run in sequential order. The second command will only run if the first command doesn't fail. A program fails if it returns a number other than 0.

* Only run the Python program `second.py` if the Node program `first.js` ended successfully

  ```sh
  node 'first.js' && python 'second.py'
  ```

You can use a double pipe `||` to signal for a command to run only if the previous command fails.

* If Bash program `attempt.rb` did not end successfully, run the Ruby program `backup.sh`

  ```sh
  bash 'attempt.rb' || ruby 'backup.sh'
  ```
 
### `/dev/null`

#### Your own personal black hole

`/dev/null` is a very useful tool. If you're ever in a situation where you need to redirect output, but you have nowhere to put it, you can redirect it to `/dev/null`. This will accept input and essentially vaporize it. You won't see anything printed to your terminal, and nothing will be saved to a file.

Run this command in your terminal to see what happens.

```sh
print "Silenced" &> /dev/null
```

However, there's an even easier way to do it. You can combine `stdout` and `stderr`, file descriptors `1` and `2` respectively using the `&>` redirection command, and then append a `-` to close both of the file descriptors.

Easier to demonstrate with an example

```sh
func() {
  print "Standard Output" >&1
  print "Standard Error" >&2
}
```

* Execute `func` with both file descriptors open

  ```sh
  func
  ```

  ```txt
  Standard Error
  Standard Output
  ```

* Execute `func` with both standard output closed

  ```sh
  func 1>&-
  ```

  ```txt
  func:1: 1: bad file descriptor
  Standard Error
  ```

* Execute `func` with both standard error closed

  ```sh
  func 2>&-
  ```

  ```txt
  Standard Output
  func:2: 2: bad file descriptor
  ```

## Shell Arguments, Options, Flags

Sometimes you want to specify an option/flag (same thing)

Maybe `-v` should print verbose output. But other times, there's an argument associated with the flag, such as `-o file.txt`. In this case, `file.txt` is known as an *option argument*

### Parsing Command-Line Arguments

The keyword `${@}` contains the set of all arguments to a program/function

* Printing out all of the arguments to a function

  ```sh
  func() {
    for arg in ${@}; do
      print "Argument: ${arg}"
    done
  }
  ```

  ```sh
  func 'one' 'two' 'three'
  ```

  ```txt
  Argument: one
  Argument: two
  Argument: three
  ```

### Reading I/O

### `read`

* Prompt for input, save to variable

```sh
print "Enter a number"
read num
print "You guessed $num"
```

* Prompt for password, save to variable

```sh
# Save the result in the variable 'secret'
read -rs 'secret?Password:'
print "You entered ${secret}"
```

* Pass each word from piped input into an array

```sh
print "alpha bravo charlie" | read -A bases
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
  print $file
done
```

# While loops

```sh
index=0
while [[ ${index} -lt 5 ]]; do
  print ${index}

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
print ${string#*/} # two/three/four/five
print ${string##*/} # five
print ${string%/*} # one/two/three/four
print ${string%%/*} # one
```

## Length of a String

```sh
checksum=${(s< >)$(shasum -a 256 file.txt)[1]}
print ${(N)oldsum##*}
# 64
```

## Cutting Out The Middle

Using the parameter expansion flag `(S)`, you can actually specify for the pattern to match substrings, similar to the way `grep` and `sed` work. For the `#` and `%` parameter expansion flags, they will still seek to cut from the beginning and the end respectively, but will cut out the first match found to the pattern (non-greedy) from the middle of the string. You can use `##` and `%%` to perform greedy searches.

* Remove the (S)ubstring `two` on the left

  ```sh
  string='one/two/three/two/one'
  print ${(S)string#two}
  ```

  ```txt
  one//three/two/one
  ```

* Remove the (S)ubstring `two` on the right

  ```sh
  string='one/two/three/two/one'
  print ${(S)string%two}
  ```

  ```txt
  one/two/three//one
  ```

* Extract the (M)atching (S)ubstring in the middle

  ```sh
  string='one/two/three/two/one'
  print ${(MS)string#/t*o/}
  ```

  ```txt
  /two/three/two/
  ```

* Non-greedy match starting from the left

  ```sh
  string='the quick brown fox'
  print ${(MS)string#q*o}
  ```

  ```txt
  quick bro
  ```

* Greedy match starting from the left

  ```sh
  string='the quick brown fox'
  print ${(MS)string##q*o}
  ```

  ```txt
  quick brown fox
  ```


## Splitting Strings

You can index a string by its word index (1-indexed), even if there is punctuation in the sentence by using the (w) flag inside of square braces.

```sh
var='This sentence   has  inconsistent spaces'
print ${var[(w)5]}
```

```txt
spaces
```

```sh
var='Sentence one. Sentence two.'
print ${var[(w)4]}
```

```txt
two.
```

```sh
var='You can even get the word that comes last'
print ${var[(w)-1]}
```

```txt
last
```

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

* `$@` the array of the arguments entered on the last command

* `$1` the first argument supplied to a command

* `$2` the second argument supplied to a command

* `$?` the return value of the previous command

* `$-` the current options set for the shell (the single letter option names concatenated into a string)

* Reference the first argument of the previous command

  ```sh
  print first second third

  print !^
  # => "first"
  ```

* Reference the last argument of the previous command

  ```sh
  print first second third

  print !:$
  # => "third"
  ```

* Reference the second argument of the previous command

  ```sh
  print 'first' 'second' 'third'

  print !:2
  # => This command would call `print 'second'`
  ```

* Reference all arguments of previous command, excluding the last argument

  ```sh
  print first second third

  print !:^-
  # => This command would call `print 'first' 'second'`
  ```

* Reference the second-to-last command

  ```sh
  print 'three'
  print 'two'
  print 'one'

  !-2 # This command would call `print 'two'`
  ```


### Substituting Text in Previous Commands

```sh
# [ Option 2 ]
^brown^blue
```

```txt
print the quick blue fox
```

Global Substitution:

Using the previous syntax, you will only replace the first instance matched. If you want to replace all matches to the pattern, use the syntax below:

* Replace the first match to a pattern:

  ```sh
  attitude="it is what it is"
  print ${attitude:s/is/be}
  ```

  ```txt
  it be what it is
  ```

* Replace all matches to a pattern

  ```sh
  attitude="it is what it is"
  print ${attitude:gs/is/be}
  ```

  ```txt
  it be what it be
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


* Read in each word of `file.txt` into the array `${words}`

  ```txt
  (file.txt)
  the day is sunny and
  the sky is blue
  ```

  ```sh
  words=($(<file.txt))
  print "There are ${#words} words"
  print ${words}
  ```

  ```txt
  There are 10 words
  the day is sunny and the sky is blue 
  ```

## Sending Signals With Kill

The builtin command `kill` is used to send signals to a process.

You can specify the signal by its number, or by its name.

```sh

```

## Handling Signals With Trap

```sh
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

If `name` is an associative array, the expression `${(k)name}` will expand to the list of keys contained by the array `name`

* `(k)` Print the keys of a assorted array

  ```sh
  declare -A dict
  dict[a]=alpha
  dict[b]=bravo
  dict[c]=charlie
  print ${(k)dict}
  ```

  ```txt
  a b c
  ```

* `(s)` Split a string into an array by a delimiter

  ```sh
  PATH="/bin:/usr/bin:/usr/local/bin"
  print "${(s.:.)PATH}"
  ```

  ```txt
  /bin /usr/bin /usr/local/bin
  ```

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
  print ./*(:a)
  # ./example.txt => /Users/tommy/example.txt
  ```

* `(:P)`: return each globbed file's absolute path, resolved of any symbolic links

  ```sh
  print ./*(:P)
  # ./example.txt => /Users/tommy/example.txt => /Users/tommy/real/example.txt
  ```

* `(:A)`: return each file's absolute paths, trying to resolve symbolic links, falling back on the absolute file to the symlink file itself if the directory it points to does not exist.

  ```sh
  # [ Using (:A) ]
  ln -s /fake/path ~/Desktop/example
  print ~/Desktop/example(:A)
  # => /Users/austin/Desktop/example

  # [ Using (:P) ]
  print ~/Desktop/example(:P)
  # => /fake/path
  ```

* `(:e)`: strip everything but the extension from each globbed file

  ```sh
  print ./*(:e)
  # ./example.txt => txt
  ```

* `(:r)`: strip the extension suffix

  ```sh
  print ./*(:r)
  # ./example.txt => ./example
  ```

* `(:t)`: strip all of the leading directories from the filepath

  ```sh
  val="./path/to/file.txt"
  print "${val} => ${val:t}"
  # ./path/to/example.txt => example.txt
  ```

* `(:h)`: strip one trailing pathname component from the filepath

  ```sh
  val="./path/to/file.txt"
  print "${val} => ${val:h}"
  ```

  ```txt
  ./path/to/file.txt => ./path/to
  ```

## Globbing Specific Filetypes

* `.` Plain Files
* `/` Directories
* `*` Executable Plain Files
* `@` Symbolic Links
* `=` Sockets

```sh
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
  print ./*(/OL:q)
  ```

* Select the largest regular file within a directory

  ```sh
  # 'L': (normally) sort by length (of file, i.e. its size), ascending

  # (Using ascending order, and picking the last element)
  #
  print ./*(.DoL[-1])

  # (Using descending order, and picking the last element)
  # 'O': reverse order
  print ./*(.DOL[1])
  ```

* Select all files larger than 2MB in a directory

  ```sh
  # 'm' (megabytes) (and 'k' for kilobytes)
  # '-' (smaller than 2)
  print ./*(.Lm-2)
  ```

* Select the most recently modified file within a directory

  ```sh
  print ./*(.om[1])
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

* Add each directory to the `${folders}` array, but only if it exists

  ```sh
  # Using
  # (N) enable null glob
  # (/) only match an existing directory
  typeset -a folders
  folders=( /usr(/N) /bin(/N) /asdf(/N) )
  print ${folders}
  ```

  ```txt
  /usr /bin
  ```

* Select all files that aren't named `tmp`

  ```sh
  # '#': the delimiter between the expansion flag and the string
  # `$REPLY`: every file name specified by the glob ./*
  print -l ./*(e#'[[ ! -e $REPLY/tmp ]]'#)
  ```

## Checking if a Command Exists

* Using *equals expansion*

  ```sh
  # [ Wrong way, see below ]
  if [[ =brew ]]; then
    print "Command exists"
  else
    print "Command not found"
  fi

  # [ Right way, note the (( parentheses )) ]
  if (( ${+commands[brew]} )); then
    print "Command exists"
  else
    print "Command not found"
  fi
  ```

{{% notice warning %}}
**Note:** if there exists an alias by this name, it will return the alias definition instead of the path to the executable file. Furthermore, if the command is not found, it will print an error to the console.
{{% /notice %}}


## Count the Number of Words in a String

* Count the number of characters in a string

  ```sh
  sentence="Hello world"
  print ${#string} # => 13
  ```

* Count the number of words in a string

  ```sh
  sentence="Hello world"
  print ${(w)#string} # => 2
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
  print ${words[@]}
  # => "the day is sunny the the the sunny is is"

  # Printing the unique words
  print ${(u)words[@]}
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
    print ${result}
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
  print ${#array1} # => '2'

  # including the empty index value in the middle
  array2=("${(@s_:_)string}") # using '_' as argument separator
  array2=("${(@s[:])string}") # using '[]' as argument separator
  print ${#array2} # => '3'
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
  print ${#array} # 6
  ```

* Passing escape sequences to a string

  ```sh
  print $'name:\tAustin Traver\nid:\t1234'
  # => name:  Austin Traver
  # => id:    1234
  ```

* Check if a variable is set

  ```sh
  if [[ ${+var} -eq 1 ]]; then
    print "Variable is set"
  else
    print "Variable is not set"
  fi
  ```

* C-style `for` loop

  ```sh
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

## Brace Expansion

* Multiple mid-word character substitutions

  ```sh
  print h{a,e,i,o,u}p
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
  print {01..10}
  ```

  ```txt
  01 02 03 04 05 06 07 08 09 10
  ```

  ```sh
  print {01..10..3}
  ```

  ```txt
  01 04 07 10
  ```

  ```sh
  print {a..z}
  ```

  ```txt
  a b c d e f g h i j k l m n o p q r s t u v w x y z
  ```

  ```sh
  print {a..z..3}
  ```

  ```txt
  a d g j m p s v y
  ```

  ```sh
  print {a..z} '\n' {A..Z} '\n' {0..9}
  ```

  ```sh
  left=1
  right=9
  print {$left..$right}
  ```

  ```txt
  1 2 3 4 5 6 7 8 9
  ```

## Ternary Operator

Ternary operators are supported in Zsh, but only when they are used within an arithmetic evaluation, such as `(( a > b ? yes : no ))`

  ```sh
  a=5
  b=6
  max=$(( a > b ? a : b ))
  print "The max is ${max}"
  ```

  ```txt
  The max is 6
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
  ```

  ```txt
  bash: asdf: command not found
  Not true
  ```

{{% notice info %}}
  **Workaround:** You can fix this problem by surrounding the truth evaluation by curly brackets, and appending a `;:;` to the end of the statement. this will cause the command to report the error when it occurs, and then return `true` which will cause the or statement to not evaluate, since the first two statements returned `true`
{{% /notice %}}

  ```sh
  [[ 1 == 1 ]] && { asdf ;:; } || print "Not true"
  # => "bash: asdf: command not found"
  ```

# ANSI C Quotations


* Print two lines using C quotes `$'...'`

  ```sh
  print $'2\nlines'
  ```

  ```txt
  2
  lines
  ```


  ```sh
  print $'\x41'
  # => A
  ```


```sh
print $'\u7231'
# => 爱
```


  ```sh
  print $'\U0001f602'
  # => 😂
  ```


## Regular Expressions

You can use the `=~` operator to test a value against a pattern

```sh
pie=good
[[ $pie =~ d ]] && print 'Match found'
```



```sh
[[ $pie =~ [aeiou]d ]] && print 'Match found'
```


```sh
# No match because the regular expression has to capture the value of
# the variable, not the variable itself
[[ $pie =~ [p][i]e ]] || print 'No match found'
```


```sh
# No match because there's no literal '[aeoiu]d' inside the word "good"
[[ $pie =~ "[aeiou]d" ]] || print 'No match found'
```

## Arithmetic Evaluation

```sh
a=2
b=4
print $((a*b)) # => 8


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
```

```txt
I don't want to brag, but I have like 3 friends.
```

{{% notice info %}}
**Note:** this won't work for floating points, because bash will truncate the decimals when evaluating division
{{% /notice %}}

```sh
print "6 / 8 = $(( 6 / 8 ))"
```

```txt
6 / 8 = 0
```

```sh
print "6 / 8 = $(( 6 / 8.0 ))"
```

```txt
6 / 8 = 0.75
```

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

Sometimes symbolic links point to files that don't exist, it's useful to delete them, and `zsh` makes that super simple by using glob qualifiers.

* `(@)`: Only symlinks
* `(-@)`: Only broken symlinks
* `(D)`: Match `.hidden` dot files

* Deleting all dangling symlinks:

  ```sh
  # '-@' only broken symlinks
  # 'D' include .dotfiles
  rm -- ./*(-@D)
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


## Operating System Commands

There are some ANSI escape sequences that allow you to write Operating System Commands (OSCs)

* Set the title of the terminal tab to `TAB`

  ```sh
  # The `1` specifies to change the tab title
  print '\x1b]1;TAB\x07'
  ```

* Set the title of the terminal window to `WINDOW`

  ```sh
  # The `2` specifies to change the window title
  print '\x1b]2;WINDOW\x07'
  ```

## Default Zsh Options

Included below, more for my reference, but could be helpful for anyone

```sh
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

  ```sh
  if [[ ${USER} == 'austin' ]] print "That's him"
  ```

* Multi-line `if` statement, any number of commands:

  ```sh
  if [[ ${USER} == 'austin' ]] {
    print "That's him"
  } elif [[ ${USER} == 'valerie' ]]
    print "That's her" 
  } else {
    print "That's nobody important"
  }
  ```

* Multi-line `for` loop, any number of statements

  ```sh
  words=('one' 'two' 'three' )

  for word in ${words}; {
    print ${word}
  }
  ```


* Syntax for short-form of `while` loop

  ```sh
  # Keep sleeping until the server starts running
  while [[ $(curl http://127.0.0.1 -- &> /dev/null)$? -eq 7 ]] {
    sleep 0.2
  }
  print "Server is now running"
  ```

## Silent Functions

You can specify that a function can be silent *in its declaration*! If you know you're going to make a helper function that you don't want to ever see output from, you can define it using the syntax outlined in the example below:

* Create a silent function

  ```sh
  func() {
    print 'Never seen'
    return 0
  } &> /dev/null
  ```

## Zsh Time Profiling

```sh
zmodload zsh/zprof
# Start up functions in ~/.zshrc
zprof
```

```txt
num  calls            time                       self            name
-------------------------------------------------------------------------------
 1)    2      22.18    11.09   45.03%     22.18    11.09   45.03%  compaudit
 2)    1      32.66    32.66   66.29%     10.48    10.48   21.27%  compinit
 3)    1       9.37     9.37   19.02%      9.20     9.20   18.67%  _zsh_highlight_load
 4)    1       5.59     5.59   11.34%      5.59     5.59   11.34%  _zsh_highlight_bind
 5)    5       0.77     0.15    1.56%      0.77     0.15    1.56%  add-zsh-hook
 6)    1       0.45     0.45    0.90%      0.45     0.45    0.90%  bashcompinit
 7)    1       0.28     0.28    0.56%      0.28     0.28    0.56%  is-at-least
 8)    1       0.15     0.15    0.31%      0.15     0.15    0.31%  (anon)
 9)    1       0.09     0.09    0.19%      0.09     0.09    0.19%  compdef
10)    1       0.18     0.18    0.37%      0.09     0.09    0.18%  complete
```

## Zsh Completion Audit

To fix any ownership problems experienced during zsh completion, you can run the script below

```sh
sudo chown ${UID}:${GID} $(compaudit)
```

## Pretty-Printing Associative Array

* Print the key-value pairs found in `my_pairs`

  ```sh
  typeset -p1 my_pairs
  ```

  ```txt
  typeset -A my_pairs=(
    key1=val1
    key2=val2
    key3=val3
  )
  ```

## Zsh Hashed Commands

Instead of searching the path each time for a command, Zsh hashes commands

### `hash`

* Rebuild the hash table for commands found in the user `path`:

  ```sh
  hash -f
  ```

### `enable`

* enable a builtin command

  ```sh
  enable whoami
  ```

* enable an alias

  ```sh
  enable -a lsa
  ```

* enable a function

  ```sh
  enable -f func
  ```

### `disable`

* Disable a builtin command

  ```sh
  disable whoami
  ```

* Disable an alias

  ```sh
  disable -a lsa
  ```

* Disable a function

  ```sh
  disable -f func
  ```


### `unhash`

You can use the `unhash` tool to remove almost any type of command from your current shell.

* Remove a command

  ```sh
  unhash whoami
  ```

* Remove an alias

  ```sh
  unhash -a lsa
  ```

* Remove a function

  ```sh
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

{{% notice info %}}
**Tip:** Many people don't know that on Mac OS, there's an alternative to using **⌃ C** to end a program: **⌘ .**
{{% /notice %}}


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

    ```sh
    jobs
    ```


* Additionally report the PID of each job

    ```sh
    jobs -l
    ```

If you begin running a process, but it looks like it will take a long time to run, there's no need to open a new terminal tab. Instead, you can run the current process in the background. First, suspend (pause) the job with **⌃Z**

If you have suspended multiple jobs, you can bring a specific job back to the foreground/background as follows

* Resume the 2nd suspended job as a foreground process

    ```sh
    fg %2
    ```

* Resume the 3rd suspended job as a background process

    ```sh
    bg %3
    ```

### The `ps` Program

* View info about all active processes

    ```sh
    ps
    ```

### The `pgrep` Program

To find out the process ID of a particular program, use the `pgrep` program.

* View the PID of all matches to the regular expression "java"

    ```sh
    pgrep java
    ```

* View the id and name of every process matching the regular expression "ja"

    ```sh
    pgrep -l ja
    ```

## Managing active processes

Every process has a process ID or "*PID*" and there are a variety of commands that you can use to manage your active processes.

* Find an active process's PID by name

    ```sh
    pgrep <process_name>
    ```

### The `kill` Program

Using the `kill` program, you can send any active process a signal.

```sh
# [Kill a processes by PID]
kill -9 <process_id>
# [Kill a process by name]
pkill "java"
# [Kill a process running on a specific port]
kill $(lsof -t -i :4000)
# [Send the SIGTERM (15) to process 123]
kill -15 123
# [Send the SIGTERM (15) signal to process 123 & process 456]
kill -TERM 123 456
# [Send the SIGINT (2) signal to process 123]
kill -2 123
# [Send the SIGSTOP () signal to process 123]
kill -TSTP 123
# [Send the SIGINT (2) signal to job ID # 1]
kill -2 %1
```

### The `pkill` Program

Similar to `kill` except instead of killing processes by id, it kills processes by name.

```sh
# [Send the SIGTERM signal to all programs matching "java"]
pkill -15 java
# [Send the SIGTSTP signal to all programs named exactly "java"]
pkill -TSTP -x java
```

## Managing Disk Space

### The `df` Program

The `df` program, can be used to "display free" storage available on the computer.


```sh
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

{{% notice warning %}}
**Warning:** The snapshot that you're given with `$ df -kh` is not always recent. If you've made some big changes to the available amount of storage, the discrepancy could be very large. To get an up-to-date version of the available storage on your computer, type `$ du -chs`
{{% /notice %}}


## Customization

### Custom Bash Prompt

The bash prompt is actually a collection of several prompts.

* PS1: The primary bash prompt, defaults to include the following bash escape sequences.
  * `\h`: The hostname `Austins-Macbook-Pro`
  * `\W`: The basename of the current working directory `~`
  * `\u`: The username `austintraver`
  * `\$`: A `$` char, unless the UID is not 0, then it's `#`

  Personally I like the way it looks when I `ssh` into my virtual private server. If you want to try it out, you can run the following command in your terminal.

  Modify the bash prompt

  ```sh
  sudo scutil --set LocalHostName newname
  ```

## Directory Structure

### `$PATH`

When you type the name of a function on the command line, it usually requires that you tell it the language and the directory. (e.g. `$ python3 greet.py`)

However, if the executable file is located in one of the directories specified by your `$PATH`, then it will automatically find and run the program without you needing to provide those specifications. It searches every directory specified in your `PATH` and runs the first file it finds with a matching name.

### Seeing which directories are in your $PATH

```sh
echo -e ${PATH//:/\\n}
```

{{% notice info %}}
Normally each directory in the path is seperated by a : not a newline, but I find this to be a clearer output.
{{% /notice %}}

### Using `#!` the "hashbang"

Sometimes you open up a file and it contains the first line, or something similar, to the one I've written below in a program called `greet` that prints `Hello world!`

#### `greet`
```python
#!/usr/local/bin/python3
print("Hello world!")
```

That first line uses a *hashbang*. What it does, is it tells your computer what program to use when trying to run the code specified in the lines below. In this case, it says to use the `python3` program located in the directory `/usr/local/bin`

Assuming this was a file in your present working directory with executable permissions (if it isn't, type `$ chmod +x greet` in your terminal) then you could type `$ ./greet` and this file would run fine. You didn't need to specify that it needed to run with `$ python3 greet`

```sh
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

  ```sh
  path=(~/tommytrojan/programs ${path})
  ```

This will append `/Users/tommytrojan/programs` to the existing value of `${path}` which is accessed by typing `${path}`. 

## The `export` keyword

We used the `export` keyword when we updated the $PATH in our `.zshrc` but it's important to understand what it does. The `export` keyword will save a variable in the shell, but it will also save the variable in any sub-shells. That means if you called a function from your terminal, and that function checked for a variable `$(PATH)` it would still "remember" what that variable's value was set to be.

## The Root User

On UNIX systems, the root user has capabilities that are disabled when you are logged in as a regular user. Type the command below to run a shell as the root user

```sh
sudo -i
```

From here, you can type any command without having to use the sudo command.


## Opening applications

### on MacOS

But there are very useful flags you can use, to type these out in the future

```sh
# [Open the Postman.app file explicitly]
open ~/Applications/Postman
# [Open the application "Postman"]
open -a Postman
# [Open a website in Safari]
open -a Safari 'https://google.com'
# [Open with the default text editor]
open -t textfile.txt
# Launch a new instance of the application
open -n sample.png
```

### on Linux

Opening an application on Linux is as easy as typing
```sh
# [Launch any application located in $PATH]
appname
```

## The Welcome Message

### Silencing the Welcome Message

Usually when you open your mac, you'll see a message such as

*"Last login: Fri May  3 21:14:20 on ttys000"*

But you can disable this message by adding a `.hushlogin` file to your home directory.
```sh
# [Silence the login message]
touch ~/.hushlogin
```

Alternatively, you can customize the message by modifying the contents of the file located in `/etc/motd`

## Hidden Programs

On Mac OS, there are some really cool hidden programs that most people don't know about.

### `caffeinate`

Many people don't know about `caffeinate`, a program you can use to prevent your computer from falling asleep.

Wake up a sleeping remote computer with `ssh`

```sh
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

```sh
echo $HOME<TAB>
echo /Users/austin
```

## Speak from Terminal

```sh
# Speaking from terminal
say 'hello world'

# Singing from terminal
say -v 'good news' di di di di di di
```
