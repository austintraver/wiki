+++
title = "printf"
description = "Printing formatted strings in literally every programming language"
date = 2020-02-04T14:43:27-08:00
image = "printf.jpg"
+++

# `printf`

The `printf()` function was originally part of `C` but it's included in `C++` as well. You don't even have to `#include <iostream>` to use it.

The syntax that is used to format output with `C`'s `printf()` is supported in many coding languages, including `awk`, `c++`, `Go`, `Java`, `Lua`, `MATLAB`, `Perl`, `PHP`, `Python`, `R`, `Ruby`, `bash`, and `zsh`

The `printf` command allows us to format output printed to a shell or written to a file. It also allows for an expansive set of escape sequences.

| Sequence | Description |
| :---: | :---: |
| `\a` | alert / bell |
| `\b` | backspace |
| `\c` | null terminator, signals the end of the string |
| `\f` | formfeed |
| `\n` | newline |
| `\r` | carriage return |
| `\t` | horizontal tab |
| `\v` | vertical tab |
| `\\` | backslash |

{: .notice--warning}
**Note:** These escape sequences will only be interpreted in the original format string. They will not be interpreted in the subsequent argument strings unless the `%b` format specifier is used.

### Argument Index Specifiers

The `printf` command allows for the reuse of arguments, which can come in handy when you're trying to save space in a command. To use an argument specifier, the must be the very next character that comes after the `%` character, and must have a `$` character appended after it. e.g. `%1$s` would print the first argument.

```sh
printf '%1$s has been moved to %1$s.old\n' file.txt
```

### Format Specifiers

The `printf` command's real utility is in its format specifiers, which allow you to replace sections of the format string with the argument strings that follow it.

| Format Specifier | Description |
| :---: | :---: |
| `%s` | String value |
| `%b` | String value, processes escape sequences in the argument string |
| `%c` | ASCII character |
| `%d` | Integer |
| `%f` | Floating point number |
| `%g` | Floating point number w/out trailing zeroes |
| `%e` | Floating point number in scientific notation |
| `%x` | Hex number |
| `%%` | Literal `%` |

Here are some examples

```sh
printf 'My name is %s\n' 'Austin'
printf 'This includes %b in the argument string\n' '\nNewline values'
printf 'The first letter of the alphabet is %c\n' 'a'
printf 'The first number is the number %d\n' 1
printf 'The first 3 digits of pi are %f\n' 3.14
printf 'The decimal %g has its trailing zeroes truncated\n' 31.200000
printf 'Avogadros number is %e\n' 602214000000000000000000
printf 'The number 10 in hex is %x\n' 10
printf 'This is %d%% luck, %d%% skill, %d%% concentrated power of will\n' 10 20 15
```

{: .notice--warning}
**Note:** Be sure to include a `\n` at the end of the format string, because a newline is not included by default.

### Width & Precision

You can use the `.` character to format the output both in terms of width and precision. The format is `%width.precision`. For instance, if you wanted to print exactly 3 decimal points, you could write the float as `%.3f` and if you wanted that number to encompass 10 characters in the output, you would type `%10.3f`. Here's an example:

```sh
printf '|%10.3f|\n|%10.3f|\n' 3.1234 5.6
```

### Format Flags

You can use format flags to adjust the way the string is printed. For instance, you can use `-` to right-justify a formatted value. I've written a table of the 5 formatting flags below:

| Format Specifier | Description |
| :---: | :---: |
| `-` | Left-justify the formatted value |
| `<Space>` | Prefix positive numbers with a space, and negative numbers with a `-` sign |
| `+` | Prefix a number with a `+` if it's positive or a `-` if it's negative |
| `#` | Prefix hex numbers from `%x` with `0x`, include at least one decimal point with `%e` and `%f` |

Here are some examples

```sh
printf '|%10s|%20s|%10s|\n' 'Value1' 'Value2' 'Value3'
printf '|%-10s|%-20s|%-10s|\n' 'Value1' 'Value2' 'Value3'
printf 'Number % d\nNumber % d\n' 123 -123
printf 'Number %+d\nNumber %+d\n' 123 -123
printf 'The letter %c is ASCII hex number %#x\n' 'A' 65
printf 'My GPA is certainly not a %#f\n' 4
```

Putting it all together...

```sh
printf 'Hex number %#x\n' 95
printf '%-10s%-+#10.2f\n%-10s%-+#10.2f\n' 'Positive:' 2 'Negative:' -2
```

### Escape Sequences

`printf()` allows you to specify certain characters by escaping them. The most common example is `\n` which is used to represent a newline. Here is a table of characters, their escape sequence, and their corresponding hex value. That hex value corresponds with the character's location in the ASCII table.

|Escape Sequence|Hex Sequence|Character Represented|
|:---:|:---:|:---:|
|`\a`|`\x07`|Alert (Bell)|
|`\b`|`\x08`|Backspace|
|`\e`|`\x1b`|Escape Character|
|`\f`|`\x0c`|Formfeed (Page Break)|
|`\n`|`\x0a`|Newline|
|`\r`|`\x0d`|Carriage Return|
|`\t`|`\x09`|Horizontal Tab|
|`\v`|`\x0b`|Vertical Tab|
|`\\`|`\x5c`|Backslash|
|`\'`|`\x27`|Single Quote|
|`\"`|`\x22`|Double Quote|
|`\?`|`\x3f`|Question mark|

### Representing Hex & Unicode Characters in `C` and `C++`

**The version of "Hello World" they never taught you in CS103...**
```cpp
int main() {
  printf("Hello World\n");
}
```

```cpp
/* Print a decimal in its hex representation */
printf("The decimal 10 in hex is %x\n", 10);
// => "The decimal 10 in hex is a"


/* Print an ASCII character according to its hexadecimal notation */
printf("The hex number 0x40 is the character: \x40\n");
// => "The hex number 0x40 is the character A"


/* Print a 2-byte character according to its Unicode value */
printf("Water in chinese is \u6c34\n");
// => "Water in chinese is 水"


/* Print a 4-byte character according to its Unicode value */
printf("That's so funny! \U0001f602\n");
// => "That's so funny! 😂
```
