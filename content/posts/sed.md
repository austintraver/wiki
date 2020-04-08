+++
title = "Sed"
description = "The stream editor"
date = 2020-02-04T14:52:27-08:00
image = "sed.jpg"
+++

# `sed`

`sed` is a program that was developed for the original UNIX operating systems. As a result, there's some differences between the Berkeley Software Distribution (BSD) edition used by Apple's MacOS computers, and the GNU edition used by Linux operating systems.

## Getting Started

I've found the one on MacOS to not only be frustrating, but to be incompatible with most of the advice you'll be reading about on StackOverflow. And let's face it, if you can't copy other people's code, you're doomed (why else would you be here?)

Type this below to install the GNU `sed` known as `sed` onto your computer. And add `/usr/local/opt/gnu-sed/libexec/gnubin/sed` to your `${PATH}`

```sh
brew install gnu-sed
```

You can run the commands below by typing `sed` in place of `sed` but I'd recommend adding a [bash alias](https://helpful.wiki/bash).

## Using Sed

### Making changes to a file

The `-i` flag is used to tell `sed` to directly overwrite the file. It requires a string placed after it, which specifies the filename appended to the old version.

```sh
sed -i '.old' 's/original/replacement/' myfile.txt
# myfile.txt.old will contain the original string
```

{{% notice warning %}}
**Note:** When it comes to substitution commands, both the input and the replacement must be nested inside of `/` chars `s/like/this/`
{{% /notice %}}

### Replacing text in a file

```sh
sed -i 's/before/after' file.txt
```

### Replacing multiple matches at once

By default, `sed`'s `s` will not replace every single instance. To run it globally, use the `/g` flag at the end of the command:

```sh
# [removing damn and replacing it with darn]
sed -i 's/damn/darn/g' swearing.txt
```

### Specifying multiple instructions

```sh
# [Method 1: using '-e']
sed -i -e 's/local/remote/g' -e 's/real/virtual/g' file.txt
# [Method 2: using ';']
sed -i 's/local/remote/g;s/real/virtual/g' file.txt
```

{{% notice warning %}}
**Note:** There can be some compatibility problems with using `;` and it's recommended to use the `-e` flag when attempting to put multiple commands in a single `sed` execution.
{{% /notice %}}

### Extended Regular Expressions

You can use extended regular expression syntax with the `-E` flag.

```sh
sed -E 's_[0-9]{3,4}_###_g' <<< "(650)941-8758"
# => (###)###-###
```

### Prepending/Appending to Files

You can prepend a line using `1i` and append using `$a`

* Prepending a line to the start of `file.txt`:

  ```sh
  # The whitespace after '1i' is not interpreted
  sed -i '1i New last line' file.txt
  ```

* Appending a line to the end of `file.txt`:

  ```sh
  # The whitespace after '$a' is not interpreted
  sed -i '$a New last line' file.txt
  ```
