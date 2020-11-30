---
title: "Bash"
description: "The GNU shell scripting language"
date: 2020-02-04T14:52:26-08:00
draft: true
---

# Bash

The *Bourne Again Shell*, or `bash`, is a shell scripting language written by GNU, and a common default scripting language on the Linux operating system.

* Check if an executable file in the `PATH` exists

  ```shell script
  if [[ -z $(type -p <command>) ]]; then
    echo "<command> exists"
  else
    echo "<command> does not exist"
  fi
  ```

## `read`

* Read in user input

  ```shell script
  read -p "Enter username: " username
  printf "Your username is ${username}\n"
  read -p "Enter multiple words: " -a array
  for word in "${array[@]}"; do
    echo "${word}"
  done
  ```

**Useful Flags:**

* `-p PROMPT`: output the string `PROMPT` without a trailing newline before attempting to read user input
* `-s`: silence user input, preventing it from displaying on the terminal (useful when asking for passwords)
* `-t TIMEOUT`: return an error code greater than 128 if the user doesn't enter input within `TIMEOUT` seconds
* `-a ARRAY`: read each of the words from input (seperated by whitespace) as values to `ARRAY` instead of one long string
* `-d DELIM`: stop prompting the user once the first character of `DELIM` is read, instead of waiting for the user to input a newline
