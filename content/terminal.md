+++
title = "Terminal"
description = "User interfaces are over-rated anyway"
date = 2020-01-30T20:14:57-08:00
image = "terminal.jpg"
+++

# Terminal

## Navigating The Terminal

#### Moving Around

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
|:---:|:---:|:---:|:---:|
|⌃ Z (1)|Pause a job |SIGTSTP|20|Also known as suspending a job|
|⌃ Z (2)|Continue a job |SIGCONT|18|Pressing ⌃Z again will continue a process that was just suspended|
|^ C|Interrupt a job|SIGINT|2|Tell a process that it should not continue, the most common way to end a program|
|⌃ \\ |Quit a job|SIGQUIT|3|Similar to an interrupt, but a little stronger (can still be caught), and will produce a core dump. The strongest of the signals that can be called via keyboard shortcuts|

{: .notice--info}
**Tip:** Many people don't know that on Mac OS, there's an alternative to using **⌃ C** to end a program: **⌘ .**


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

```sh
# [View the jobID, job status, and call-command]
jobs
# [Additionally report the PID of each job]
jobs -l
```

If you begin running a process, but it looks like it will take a long time to run, there's no need to open a new terminal tab. Instead, you can run the current process in the background. First, suspend (pause) the job with **⌃Z**

If you have suspended multiple jobs, you can bring a specific job back to the foreground.
```sh
# [Resume the 2nd suspended job in the foreground]
fg %2
# [Resume the 3rd suspended job to the background]
bg %3
```

### The `ps` Program

To find out information about processes, use the `ps` program

```sh
# [View info about all active processes]
ps
```

### The `pgrep` Program

To find out the process ID of a particular program, use the `pgrep` program.

```sh
# [View the PID of all matches to the regular expression "java"]
pgrep java
# [View the id and name of every process matching the regular expression "ja"]
pgrep -l ja
```

## Managing active processes

Every process has a process ID or "*PID*" and there are a variety of commands that you can use to manage your active processes.

```sh
# [Find an active process's PID by name]
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

{: .notice--warning}
**Warning:** The snapshot that you're given with `$ df -kh` is not always recent. If you've made some big changes to the available amount of storage, the discrepancy could be very large. To get an up-to-date version of the available storage on your computer, type `$ du -chs`


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

{: .notice--info}
Normally each directory in the path is seperated by a : not a newline, but I find this to be a clearer output.

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

These are programs that are needed if you start the system with [single user mode](http://osxdaily.com/2018/10/29/boot-single-user-mode-mac/), a setting that is even more barebones than [recovery mode](http://osxdaily.com/2017/05/18/access-terminal-recovery-mode-mac/).

#### The `/local` directories

##### `/usr/local/bin`

This is for programs that are local to your user account. If you install a program here (and you should), then the other accounts on the computer won't be able to use it. Also, it's automatically in your $PATH.

##### `/usr/local/sbin`

This is the local *system* bin, which is used for programs that are needed to boot the system, but that you won't be executing directly.

### Adding a directory to `$PATH`

If you want to add a directory to `$PATH` you'll need to edit your `~/.zshrc`. To add the directory `/Users/tommytrojan/programs` to your path, you would add the following line.

```sh
export PATH=$PATH:/Users/tommytrojan/programs
```

This will append `/Users/tommytrojan/programs` to the existing value of `PATH` which is accessed by typing `$PATH`. You can check this by typing `$ echo $PATH` in your terminal.

Now, if you had that file `greet` located in your computer at `/Users/tommytrojan/programs/greet` it would run by calling `$ greet` in your terminal.

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
