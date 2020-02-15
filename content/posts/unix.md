+++
title = "Unix"
description = "Where it all started"
date = 2020-02-04T14:52:27-08:00
image = "unix.jpg"
+++

# Unix

{: .notice--warning}
**Note:** If you're using these snippets make sure you've installed `coreutils`

* Installing `coreutils` on macOS

  ```sh
  brew install coreutils
  export path=('/usr/local/opt/coreutils/libexec/gnubin' ${path})
  ```

## User Management

* Enable the root account

  ```sh
  sudo passwd
  ```

* Disable (`--lock`) the root account

  ```sh
  sudo passwd -l root
  ```

  {: .notice--danger}
  **Warning:** Although this account disables root login via password entry, it does not disable root login via SSH keys. To disable SSH access to the root account, set `PermitRootLogin no` in `/etc/ssh/sshd_config`


# `date`

The `date` command lets you get the date in your terminal. It contains the `-I` flag which allows you to get the date in ISO8601 format. `-Is` to print the ISO8601 date as well as the current time up to seconds.


Examples

* Print the date in ISO8601 format

  ```sh
  date -I
  ```

* Print the local date & time in ISO8601 format

  ```sh
  date -Is
  ```
* Print the UTC date & time in ISO8601 format

  ```sh
  date -uIs
  ```


# `disown`

If you have a process running in the background of your terminal, you can release it. The process will continue, retaining the original PID, but it will no longer be part of your terminal session.


```sh
# disown the process with job id %2
disown %2
```

# `stat`

You can use `stat` to get information about a file.

* Get the octal permission code

  ```sh
  stat -c '%a' <file>
  ```

* Get the owner's user name

  ```sh
  stat -c '%U' <file>
  ```

* Get the owner's user ID

  ```sh
  stat -c '%u' <file>
  ```

* Get the owner's group name

  ```sh
  stat -c '%G' <file>
  ```

* Get the owner's group ID

  ```sh
  stat -c '%g' <file>
  ```

# `du`

The `du` command stands for *disk usage*. It can tell you information about how much space a given file on your computer is taking up.

### Viewing the size of a directory

* In human-readable format

  ```sh
  du -sh ~/Desktop
  ```

* In kilobytes

  ```sh
  du -sBK ~/Desktop
  du -sk ~/Desktop
  ```

* In megabytes

  ```sh
  du -sBM ~/Desktop
  du -sm ~/Desktop
  ```

* In gigabytes

  ```sh
  du -sBG ~/Desktop
  ```

* In terabytes

  ```
  du -sBT ~/Desktop
  ```

  {: .notice--warning}
  **Note:** For file sizes, `du` rounds up to the nearest block. If there is a file that is less than 1TB in size, `du` will still report the size as `1T` when the flag `-BT` is specified.

You can also set the environment variable `DU_BLOCK_SIZE` to have a default setting for the size of blocks reported by `du`

* Configure `du` to use 1GB blocks

  ```sh
  export DU_BLOCK_SIZE=1G
  ```

# `lsof`

The `lsof` command stands for *list open files*. On the surface, this doesn't seem useful, you'd know what files are open on your computer. However, `UNIX` thinks of everything as a file. This includes *sockets*, *ports*, etc.

* Check which program is running on a given port with the command below:

  ```sh
  # Check for processes running on port 4000
  lsof -i :4000
  # Check for processes running on a range of ports, from 400 to 500
  lsof -i :400-500

  # Returns only the PID
  lsof -ti :4000
  ```

* Check for connections to a specific host

  ```sh
  # Check for connections to a specific host
  lsof -i@172.16.12.5
  # Check for connections to a specific host, but only on port 22
  lsof -i@172.16.12.5:22
  # Check for connections to a specific host on a range of ports, from 1249 to 65535
  lsof -i@172.16.12.5:1249-65535
  ```

* Check which files, sockets, ports are opened by a given PID

  ```sh
  lsof -p 4125
  ```

* Get all information about files opened by processes run by command `ruby`

  ```sh
  lsof -c ruby
  ```

* Get just the process id corresponding with processes run by command `ruby`

  ```sh
  lsof -tc ruby
  ```

* Get the process id of just processes run by user `tommy`

  ```sh
  lsof -i -u tommy
  ```

# `mkdir`

The `-m` flag allows you to specify the octal permissions code for the files inside the directory to be created.

* Make a folder whose contents can only be written by the user

  ```sh
  mkdir -m 755 folder
  ```

# `head`

By default, `head` will return the first 10 lines of the specified file. You can use the `-n` flag to specify the number of lines that should be returned.

* Print the first 5 lines of the file

  ```sh
  head -n 5 file.txt
  ```

* Print the first 5 lines of output

  ```sh
  ls | head -n 5 file.txt
  ```

* Print everything *except* the last 5 lines of the file

  ```sh
  head -n -5 file.txt
  ```

# `tail`

By default, `tail` will return the last 10 lines of the specified file. You can use the `-n` flag to specify the number of lines that should be returned.

* Print the last 5 lines of the file

  ```sh
  tail -n 5 file.txt
  ```

* Print everything *except* the first 5 lines of the file

  ```sh
  tail -n +5 file.txt
  ```

* Print the last 5 lines of the output

  ```sh
  ls | tail -n 5 file.txt
  ```

# `gzip`

Although more people are familiar with the `.zip` extention written by microsoft, there also exists the GNU zip `.gz` extension, which has a slightly higher performance benchmark in comarison to `.zip`.

* Compress `file.txt` into `file.txt.gz`

  ```sh
  gzip file.txt
  # => Removes file.txt and creates file.txt.gz
  ```

* Decompress `file.txt.gz` into `file.txt`

  ```sh
  gzip -d file.txt.gz
  ```

* Use the `-k` flag to `--keep` the original `file.txt` when creating the compressed `file.txt.gz`

  ```sh
  gzip -k file.txt
  # => Creates file.txt.gz without deleting file.txt
  ```

* Use the `-l` flag to `--list` some statistics about the compression, such as the percentage smaller the compressed file is compared to the original.

  ```sh
  gzip -l file.txt.gz
  ```
* Use the `-f` flag to `--force` the archive to be created, removing the pre-existing output file if it already exists.

  ```sh
  gzip -cf file.txt
  # => Deletes file.txt.gz if it already exists
  ```

# `dig`

The UNIX `dig` command, which stands for "Domain Information Groper" is a program used to query DNS servers for the records held by domain names.

```sh
dig @1.1.1.1 helpful.wiki A +short
# => 185.199.108.153
```

* The `@1.1.1.1` specifies the Domain Name Service provider that we want to use. In this case, it's the IP address owned by Cloudflare. If you'd like to specify a nameserver to use by default, you can edit the file `/etc/resolv.conf`

* The `helpful.wiki` is the domain that we want the records for.

* The `+short` is the flag that removes all information except the answer provided by the domain name service. Other useful flags include `+trace` which will show the path taken.

* The `A` is the argument that specifies we'd like the IP address returned to us. Other valid options include `NS` for the nameservers used by this domain, `MX` for mail exchanges, and `TXT` for text annotations.


# `tar`

`tar` is a tool used for archiving files onto tape drives, which is why the program stands for **tape archive**. Today it is still used to create a compressed copy of a directory. `tar` is used to create **tarballs**, a term used to denote an archive `.tar` file.

* The `.tar` filetype denotes a tarball
* The `.tgz` filetype denotes a compressed tarball
* `gzip` will understand how to decompress a file with the `.tgz` extension, and will return the `.tar` version of the file after it is uncompressed.


## Useful flags

| Short form | Long form | Function |
| :---: | :---: | :---: |
| `-c` | `--create` | Create a new `.tar` tarball |
| `-r` | `--append` | Append files to a existing tarball |
| `-t` | `--list` | List the contents of a tarball |
| `-u` | `--update` | Append a file to the archive, even if an existing version of that file is already in the archive |
| `-x` | `--extract` | Extract the files contained within an archive |
| N/A | `--delete` | Delete the file from the archive |
| `-k` | `--keep-old-files` | Don't replace existing files when extracting files from an archive |
| `-f` | `--file` | Specify the archive file to be created,  or the one to be extracted from |
| `-z` | `--gzip` | Filter the archive command through `gzip` |
| `-a` | `--auto` | Use the archive file's suffix to automatically determine which compression program to use
| `-v` | `--verbose` | Verbosely list files as they are being processed.
| `-w` | `--interactive` | Ask for confirmation for every action |
| `-h` | `--dereference` | Follow any symlinks and archive the files they point to | `-X` | `--exclude-from` | Exclude files matching patterns listed in the following file |
| `-C` | `--dir` | Change to a different directory before performing any operations |
| `-O` | `--to-stdout` | Extract files to standard output
| `-P` | `--absolute` | Don't strip leading slashes from file names when creating an archive |
| `-N` | `--newer` | Only store files newer than `DATE`, which, if starting with a `/` or a `.` will be calculated in reference to the file specified as `DATE`.
| N/A | `--utc` | Print file modification times in UTC |
| N/A | `--exclude-vcs` | Exclude version control systems like `.git` |
| N/A | `--excluse-vcs-ignores` | Excludes files from VCS ignore files like `.gitignore` |
| N/A | `--overwrite` | Overwrite existing files when extracting |
| N/A | `--remove-files` | Remove files from the disk after adding them to the archive |
| N/A | `--skip-old-files` | Don't replace existing files when extracting, silently skip over them |
| N/A | `--xform` / `--transform` | Use `sed` to replace the following expression when transforming the file names |
| N/A | `--strip n` | Strip `n` leading components from the file names on extraction |
| N/A | `--quoting` | Specify the style of quoting when listing directory contents, accepts `shell` as a valid argument |


## Creating an archive

When creating an archive, the `-C` or `--dir` option is very useful. It allows you to specify which directory to be in for the subsequent operations. In the case of archiving a file, by default tar will create the archive *including* every directory specified in the path. If you tried to type `tar -cf archive.tar ~/example` then it would actually create an archive of `/Users/tommy/example` where the root directory is `/Users`, containing a single directory `/tommy`, which itself contained a single directory `/example`. To avoid this, you must specify which directory `tar` should operate from. In this case, it should be the parent directory of `example` which is `/Users/tommy`.

Examples

* Create an archive of ~/example with root directory `example`

  ```sh
  # Short form
  tar -C ~ -c example -f archive.tar
  # Long form
  tar --dir /Users/tommy --create example --file archive.tar
  ```

* Create a compressed archive of `example`

  ```sh
  # Short form
  tar -C ~ -c example -f archive.tgz -a
  # Long form
  tar --dir /Users/tommy --create example --file archive.tgz -a
  ```

  {: .notice--info}
  **Tip:** `tar` can automatically determine which compression algorithm to use based on the specified style extension when using the `-a` flag

* Append a file to an archive

  ```sh
  # Short form
  tar -f archive.tar -r extra.txt
  # Long form
  tar --file archive.tar --append extra.txt
  ```

* Listing the contents of an archive

```sh
tar -f archive.tar -t
tar --file archive.tar --list
# -> example/spaced out.txt
tar --file archive.tar --list --quoting shell
```

* By default, `tar` will use escapes to denote file paths, but can optionally specify file paths using literal strings, the same way `sh` does, by adding the `--quoting shell` argument to the command.

* Unpack a tarball

  ```sh
  tar --extract --verbose --file archive.tar
  tar -xvf archive.tar
  ```

* Unpack a compressed tarball (exactly the same)

  ```sh
  tar --extract --verbose --file archive.tgz
  tar -xvf archive.tgz
  ```

* Unpack the tarball archive.tgz inside directory ~/Documents

  ```sh
  tar -xvf archive.tgz -C ~/Documents
  tar --extract --verbose --file archive.tgz --dir ~/Documents
  ```

# `tree`

Getting Started

```sh
brew install tree
```

* View the directory structure up to 4 layers deep

  ```sh
  tree -L 4
  ```

* View only directories, not files

  ```sh
  tree -d
  ```

* View only files/folders matching a wildcard pattern

  ```sh
  tree -P '.md'
  ```

* View only files/folders that _don't_ match a wildcard pattern

  ```sh
  # 1 directory
  tree -I 'node_modules'
  # >1 directory
  tree -I 'lib|bin|node_*'
  ```

# `wc`

* Count the number of characters in `file.txt`

  ```sh
  wc -m file.txt # the number of characters (supports utf-8)
  wc --chars file.txt
  ```

* Count the number of words in `file.txt`

  ```sh
  wc -w file.txt # the number of words
  wc --words file.txt
  ```

* Count the number of lines in `file.txt`

  ```sh
  wc -l file.txt # number of lines
  wc --lines file.txt
  ```

* Count the number of words using *heredoc* style notation

  ```sh
  wc -w << EOF
  one
  two
  three
  EOF
  # => 3
  ```

* Count the number of chars using *herestring* style notation

  ```sh
  wc -m <<< "你好"
  # => 3
  ```

  {: .notice--warning}
  **Note:** Herestrings implicitly append a trailing `\n` newline, which is why `wc` returns three characters.

* Count the occurences of a single char `/` from stdin

  ```sh
  echo '/Users/tommy/local/temp' | tr -cd '/' | wc -c
  ```

# `rs` and `datamash`

* Given a spreadsheet of rows and columns, transpose the rows and columns

  ```sh
  # Using BSD `rs`
  rs -T < input.txt > output.txt

  # Using GNU `datamash`
  datamash transpose --whitespace < input.txt > output.txt
  ```

# `awk`

## `FS`

* By default, `awk` delimits entries by runs of whitespace. If `FS` contains more than one character, it will delimit the line based on every occurance of the pattern.

  ```
  <pattern.awk>
  BEGIN {
    # Delimited once per comma
    FS = ","
    # Delimited once per tab
    FS = "\t"
    # Delimited once per consecutive run of tabs
    FS = "\t+"
    # Delimited on every comma, tab, and underline
    FS = "[,\t_]"
  }
  ```

* Matching a pattern to a specific column in each row

  ```
  <pattern.awk>
  # If the first entry is "me"
  $1 ~ /^me$/ {
    print "person: " $1 " blog: fire"
  }
  ```

## `man`

Typically, a manpage for a given command is located at `/usr/share/man/man1/command.1`

* View the location of the `man` page associated with `printf`

  ```sh
  # Short form
  man -w printf

  # Long form
  man --path printf
  ```

## Users & Groups

* Add a new user to the machine on a Linux OS

  ```sh
  # Default shell /bin/sh
  sudo adduser <user>

  # Custom shell /usr/bin/zsh
  sudo adduser --shell /usr/bin/zsh
  ```

* Add a user to the `sudo` group

  ```sh
  usermod -aG sudo username
  ```

* Delete a user from the machine

  ```sh
  # Keep a backup of the user's home directory, stored in the pwd
  sudo deluser <user> --backup --remove-all-files <user>
  ```

* Delete a group from the machine

  ```sh
  sudo delgroup <group>
  ```

* Change the machine's hostname

  ```sh
  sudo hostnamectl set-hostname <hostname>
  ```

* Change a user's username

  ```sh
  # Short form
  usermod <user> -l <new_username> -md <new_home_filepath>
  # Long form
  usermod <user> --login <new_username> --move-home --home <new_home_filepath>
  ```

* Change a user's information on MacOS

  ```sh
  # [ macOS ]
  sudo dscl . -change ~austin RealName 'Austin Traver' 'Fake Name'
  # confirming the change
  finger austin
  # reverting the chang
  sudo dscl . -change ~austin RealName 'Fake Name' 'Austin Traver'
  ```

* Change a user's information on a Linux OS

  ```sh
  # [ Linux ]

  # Short form
  chfn <user> -f "Austin Traver"
  # Long
  chfn <user> --full-name "Austin Traver"
  ```

* Configuring DNS nameserver resolutions

  ```
  sudo vi /etc/resolv.conf
  nameserver 1.1.1.1
  nameserver 1.0.0.1
  nameserver 2606:4700:4700::1111
  nameserver 2606:4700:4700::1001
  ```

* Adding a symlink for an executable file

{: .notice--success} **Tip:** This is a vague title, but when you do `sudo apt install yarnpkg` you can't use the command `yarn`, instead you have to use `yarnpkg` which is unfamiliar. In order to restore it to its normal state, you can run the following command:

  ```sh
  sudo update-alternatives /usr/bin/yarn yarn /usr/bin/yarnpkg 1
  ```

You can also do the same for `python3`

  ```sh
  sudo apt install python3
  sudo apt install python3-pip
  sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
  sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1
  ```

# `${PATH}`

* Pretty print the path, with each directory on its own line

  ```sh
  echo -e "${PATH//:/\\n}"
  ```

## POSIX

* POSIX stands for "Portable Operating System Interface for (UNIX)"

## File System Hierarchy

* View the manual on file system hierarchies

  ```sh
  man hier
  ```

# `curl`

## PAC Files

A *Proxy Auto-Config* **PAC** file contains a JavaScript function that decides which proxy a given network connection (URL) should use. `curl` does not support PAC files, but I'm putting this note here for now.

* the `-x` or `--proxy` specifies to `curl` to use the following argument as the `HTTP` proxy. Unless specified otherwise, it will default to using port 3128.

  ```sh
  # Using an HTTP proxy
  curl -x http://remote.net:80 http://example.com

  # Using password protected HTTP proxy
  curl -U username:password -x http://remote.net:80 http://example.com

  # Using a SOCKS5 proxy
  curl -x socks5://remote.net http://example.com
  ```

# `cron`

Example crontab using `zsh` globbing

```sh
SHELL=/usr/local/bin/zsh

# When the computer reboots,
# delete any files in ~/tmp that haven't been accessed in over a day
@reboot rm ~/tmp/**/*(.ad+1) 2> ~/tmp/cron.log

# When the computer reboots,
# delete any directories in ~/tmp that are empty
@reboot rm -rf ~/tmp/**/*(/^F) 2> ~/tmp/cron.log

# Month, Hour, Day, Month, Weekday
#   *     *     *     *       *

# @yearly
0 0 1 1 * echo 'Once a year' &> ~/log.txt

# @monthly
0 0 1 * * echo 'Once a month' &> ~/log.txt

# @weekly
0 0 * * 0 echo 'Once a week' &> ~/log.txt

# @daily
0 0 * * * echo 'Once a day' &> ~/log.txt

# @hourly
0 * * * * echo 'Once an hour' &> ~/log.txt
```

* Edit `crontab` file for the user `tommy`

  ```sh
  crontab -u tommy -e
  ```

* on Linux, each user's crontab file can be found at `/var/spool/cron/crontabs`

* on macOS, each user's crontab file can be found at `/usr/lib/cron/tabs`


## `zip`

* Create an archive containing the contents of inside `folder/`

  ```sh
  # Short form
  zip -r sandbox.zip sandbox

  # Long form
  zip --recurse-paths sandbox.zip sandbox
  ```

# `less`

* On Unix systems, the system-wide binary lesskey file is stored in `/usr/local/etc/sysless`

**Useful Flags**

* `-S`: Truncate any lines that extend beyond the length of the terminal
* `-R`: Render any ANSI escape sequences that specify SGR formatting
* `-s`: Squeeze consecutive blank lines into a single blank line

# `ln`

**Useful Flags**

* `-s`: Create a symbolic link
* `-v`: Write output to `stdout` when links are made
* `-n`: If the destination file exists, and is a symbolic link, don't follow it
* `-i`: Interactively prompt the user for a response before removing a file
* `-f`: Forcefully remove existing destination files

`coreutils` **exclusive flags**

* `-b`: If there is an existing file at the destination, make a backup of it
* `-T`: Treat the destination supplied as a file, never a target directory

# `sudo`

**Useful Flags**

* `-v`: Escalate permissions during a script, so that sudo commands can be run inside a script
* `-n`: Only run the command if you don't have to prompt for a password
* `-S`: Read the password from `stdin` and write the prompt to `stderr`
* `-s`: Run the shell specified by the `SHELL` environment variable

* Ask for permission to run `sudo` commands in a script

  ```sh
  #!/bin/zsh

  # Ask for elevated privileges with -v
  sudo -v

  sudo -n echo "Success, I have root access!"
  sudo -n echo "I am $(whoami)"

  # Discard elevated privileges with -k
  sudo -k
  ```

* Logging into the `root` user

  ```sh
  # Using the user `root`'s password
  sudo -i

  # Using the root user's password
  su
  ```

* Logging into the user `tommy`'s account

  ```sh
  sudo su -l tommy
  ```

* Execute a sudo command using a plaintext password

  ```sh
  sudo -S <<< "letmein" 2> /dev/null echo "No password"
  ```

* Allow the user `tommy` to type `sudo` commands without having to input his password

  ```sh
  # As the root user
  <<-EOF > /etc/sudoers.d/tommy
  tommy ALL = NOPASSWD: ALL
  EOF
  sudo chmod 644 /etc/sudoers.d/tommy
  sudo chown root:wheel /etc/sudoers.d/tommy
  ```

# `who`

* See which users are logged on, and from where

  ```sh
  who
  # tommy ttys001      2019-07-31 15:05
  # tommy ttys002      2019-07-31 15:21 (127.0.0.1)
  ```

# `diff`

* Show the differences between two files in side-by-side format

  ```sh
  # [ Short Form ]
  diff -y one.txt two.txt

  # [ Long Form ]
  diff --side-by-side one.txt two.txt
  ```

# `chsh`

* Change the default shell for user `tommy` to `/bin/sh`

  ```sh
  chsh -s /bin/sh tommy
  ```

# `uname`

* Print the name of the current operating system

  ```sh
  uname
  # Darwin
  ```

# `tr`

* Translate the character `\n` to `,` for the contents of `/dev/stdin`

  ```sh
  grep -o 'regex' | tr '\n' ','
  ```

# `visudo` & `vipw`

These are two special commands to manage the super user and password files on your computer

# `/etc/localtime`

The file that determines the timezone of the computer is located at `/etc/localtime`

To change what time it is, make a symbolic link from another timezone, and store it at this location.

* Set the timezone to `America/Los_Angeles`

  ```sh
  sudo ln -sf /usr/share/zoneinfo/America/Los_Angeles /etc/localtime
  ```

* Set the timezone to `Etc/UTC`

  ```sh
  sudo ln -sf /usr/share/zoneinfo/Etc/UTC /etc/localtime
  ```

## `motd`

* Disable standard message banners that appear when logging into a UNIX-like system (tested on raspbian and ubuntu)

  ```sh
  sudo chmod -x /etc/update-motd.d/*
  ```

* You can add a custom script to be run when an interactive shell is starting up by adding an executable file to `/etc/update-motd.d/*`

## `dns-sd`

The `dns-sd` diagnostic tool is useful for network scanning. If you are trying to find users to connect to via `ssh`, this is a great way to find out what their multicast DNS (mDNS) name is, such as `tommy.local`

* Browse the local network for `.local` domains to connect to via `ssh`

  ```sh
  dns-sd -Z _ssh._tcp
  ```

* Lookup detailed information about `Tommy's MacBook Pro`

  ```sh
  dns-sd -L "Tommy's MacBook Pro" _ssh._tcp
  ```
