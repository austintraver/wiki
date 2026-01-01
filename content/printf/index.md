---
title: printf
description: "Printing formatted strings in literally every programming language"
date: 2020-02-04T14:52:27-08:00
---

# `printf()`

The `printf()` function was originally part of `C` but it's included in `C++` as well. You don't even have to `#include <iostream>` to use it, as it's declared in the `<stdio.h>` header used by `C`.

{{% aside success %}}

The syntax that is used to format output with `C`'s `printf()` is supported in many coding languages, including `awk`, `c++`, `Go`, `Java`, `Lua`, `MATLAB`, `Perl`, `PHP`, `Python`, `R`, `Ruby`, `bash`, and `zsh`

{{% /aside %}}

## Parameters

1. A C string that contains the text to be written to `stdout`

2. (optional) embedded *format specifiers*, which will be replaced by the values specified in subsequent additional arguments and formatted as requested.

### Format Specifiers

A *format specifier* follows the prototype as follows: `%[flags][width][.precision][length]specifier`

{{% aside warning %}}

Where the *specifier character* at the end is the most significant component, since it defines the type and the interpretation of its corresponding argument:

{{% /aside %}}

| Specifier | Output | Example |
| :---: | :---: | :---: |
| `d` / `i` | Signed decimal integer | `392` |
| `u` | Unsigned decimal integer| `7235` |
| `o` | Unsigned octal| `610` |
| `x` | Unsigned hexadecimal integer| `7fa` |
| `X` | Unsigned hexadecimal integer (uppercase)| `7FA` |
| `f` | Decimal floating point, lowercase| `392.65` |
| `F` | Decimal floating point, uppercase| `392.65` |
| `e` | Scientific notation (mantissa/exponent), lowercase| `3.9265e+2` |
| `E` | Scientific notation (mantissa/exponent), uppercase| `3.9265E+2` |
| `g` | Use the shortest representation: `%e` or `%f` | `392.65` |
| `G` | Use the shortest representation: `%E` or `%F` | `392.65` |
| `a` | Hexadecimal floating point, lowercase| `-0xc.90fep-2` |
| `A` | Hexadecimal floating point, uppercase| `-0XC.90FEP-2` |
| `c` | Character| `a` |
| `s` | String of characters| `sample` |
| `p` | Pointer address| `b8000000` |
| `%` | A `%` followed by another `%` character will write a single `%` to the stream. | `%` |

The *format specifier* can also contain sub-specifiers:

1. *flags*
2. *width*
3. `.`*precision*
4. *modifiers*

| Flag | Description |
| :---: | :---: |
| `-` | Left-justify within the given field width; Right justification is the default (see *width* sub-specifier) |
| `+` | Forces to precede the result with a plus or minus sign (`+` or `-`) even for positive numbers. By default, only negative numbers are preceded with a `-` sign |
|  *(space)* | If no sign is going to be written, a blank space is inserted before the value |
| `#` |  With `o`, `x`, or `X`, precede the outputted value with `0`, `0x`, or `0X` respectively for values different than zero |
| `#` |  With `a`, `A`, `e`, `E`, `f`, `F`, `g` or `G`, force the output to contain a decimal point even if no more digits follow |
| `0` | Left-pads the number with zeroes (`0`) instead of spaces when padding is specified (see *width* sub-specifier) |


#### Width

| Width | Description |
| :---: | :---: |
| *(number)* | Minimum number of characters to be printed. If the value to be printed is shorter than this number, the result is padded with blank spaces. The value is not truncated even if the result is larger
| `*` | The *width* is not specified in the *format* string, but as an additional integer value argument preceding the argument that has to be formatted


#### Precision

* Format: `.precision`, where precision depends on the flag in use, explained below:

| Flag | Details |
| :---: | :---: |
| `d`, `i`, `o`, `u`, `x`, `X` | Specifies the minimum number of digits to be written. If the value to be written is shorter than this number, the result is padded with leading zeros. The value is not truncated even if the result is longer. A *precision* of `0` means that no character is written for the value `0` |
| `a`, `A`, `e`, `E`, `f`, `F` | Specifies the number of digits to be printed *after* the decimal point (default: 6) |
| `g` and `G` | Specifies the maximum number of significant digits to be printed |
| `s` | Specifies the maximum number of characters to be printed. By default all characters are printed until the ending null character is encountered If the period is specified without an explicit value for *precision*, `0` is assumed |
| `.*` | The *precision* is not specified in the *format* string, but as an additional integer value argument preceding the argument that has to be formatted |
| `.` | A lone `.` with no number following it is equivalent to inputting `.0` |

#### Modifiers

* The *length* sub-specifier modifies the length of the data type.

* This is a chart showing the types used to interpret the corresponding arguments with and without *length* specifier

* The first column denotes the `length` specifiers, which indicate the size of the underlying data type to be formatted.

| length | `d i` | `u o x X` | `f F e E g G a A` | `c` | `s` | `p` | `n` |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| *(none)* | `int` | | `unsigned int` | | `double` | | `int` | | `char*` | | `void*` | | `int*` |
| `hh` | `signed char` | | `unsigned char` | | | | | | | | | | `signed char*` |
| `h` | `short int` | | `unsigned short int` | | | | | | | | | | `short int*` |
| `l` | `long int` | | `unsigned long int` | | | | `wint_t` | | `wchar_t*` | | | | `long int*` |
| `ll` | `long long int` | | `unsigned long long int` | | | | | | | | | | `long long int*` |
| `j` | `intmax_t` | | `uintmax_t` | | | | | | | | | | `intmax_t*` |
| `z` | `size_t` | | `size_t` | | | | | | | | | | `size_t*` |
| `t` | `ptrdiff_t` | | `ptrdiff_t` | | | | | | | | | | `ptrdiff_t*` |
| `L` | | | | | `long double` | | | | | | | |

{{% aside info %}}

Regarding the `c` specifier: it takes an `int` `win_t` as argument, but performs the proper conversion to `char`/`wchar_t` before formatting it for output

{{% /aside %}}

### Additional Arguments

* Depending on the *format* string, the function may expect a sequence of additional arguments, each containing a value to be used to replace a *format specifier* in the *format* string (or a pointer to a storage location, for `n`)

* There should be at least as many of these arguments as the number of values specified in the *format specifiers*. Additional arguments are ignored by the function.

### Return Value

* On success, the total number of characters written is returned.

* If a writing error occurs, the *error indicator* `ferror` is set and a negative number is returned.

* If a multibyte character encoding error occurs while writing wide characters, `errno` is set to `EILSEQ` and a negative number is returned.

## Escape Sequences

`printf()` allows you to specify certain characters by escaping them. The most common example is `\n` which is used to represent a newline. Here is a table of characters, their escape sequence, and their corresponding hex value. That hex value corresponds with the character's location in the ASCII table.

| Escape Sequence | Hex Sequence | Character Represented |
| :---: | :---: | :---: |
| `\a` | `\x07` | Alert (Bell) |
| `\b` | `\x08` | Backspace |
| `\e` | `\x1b` | Escape Character |
| `\f` | `\x0c` | Formfeed (Page Break) |
| `\n` | `\x0a` | Newline |
| `\r` | `\x0d` | Carriage Return |
| `\t` | `\x09` | Horizontal Tab |
| `\v` | `\x0b` | Vertical Tab |
| `\\` | `\x5c` | Backslash |
| `\'` | `\x27` | Single Quote |
| `\"` | `\x22` | Double Quote |
| `\?` | `\x3f` | Question mark |

{{% aside warning %}}

**Note:** These escape sequences will only be interpreted in the original format string. They will not be interpreted in the subsequent argument strings unless the `%b` format specifier is used.

{{% /aside %}}


### Argument Index Specifiers

The `printf` command allows for the reuse of arguments, which can come in handy when you're trying to save space in a command. To use an argument specifier, the must be the very next character that comes after the `%` character, and must have a `$` character appended after it. e.g. `%1$s` would print the first argument.

```shell
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

{{% aside warning %}}

**Note:** Be sure to include a `\n` at the end of the format string, because a newline is not included by default.

{{% /aside %}}

### Examples

#### `C` / `C++`

* Examples using `printf()` (`C/C++`)

  ```cpp
  printf ("Characters: %c %c \n", 'a', 65);
    /* Characters: a A */
  printf ("Decimals: %d %ld\n", 1977, 650000L);
    /* Decimals: 1977 650000 */
  printf ("Preceding with blanks: %10d \n", 1977);
    /* Preceding with blanks:       1977 */
  printf ("Preceding with zeros: %010d \n", 1977);
    /* Preceding with zeros: 0000001977 */
  printf ("Some different radices: %d %x %o %#x %#o \n", 100, 100, 100, 100, 100);
    /* Some different radices: 100 64 144 0x64 0144 */
  printf ("floats: %4.2f %+.0e %E \n", 3.1416, 3.1416, 3.1416);
    /* floats: 3.14 +3e+000 3.141600E+000 */
  printf ("Width trick: %*d \n", 5, 10);
    /* Width trick:    10 */
  ```

* Examples representing Hex/Unicode characters (`C`/`C++`)

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

#### `zsh`

* Setting up a number to take up 10 columns, but only print 3 decimal places (`zsh`):

  ```shell
  printf '| %10.3f | \n | %10.3f | \n' 3.1234 5.6
  # =>    |      3.123 |
  # =>    |      5.600 |
  ```

* More examples of modifiers (`zsh`):

  ```shell
  printf '| %10s | %20s | %10s | \n' 'Value1' 'Value2' 'Value3'
  # =>    |     Value1 |               Value2 |     Value3 |

  printf '| %-10s | %-20s | %-10s | \n' 'Value1' 'Value2' 'Value3'
  # =>    | Value1     | Value2               | Value3     |

  printf 'Number % d\nNumber % d\n' 123 -123
  # =>    Number  123
  # =>    Number -123

  printf 'Number %+d\nNumber %+d\n' 123 -123
  # =>    Number +123
  # =>    Number -123

  printf 'The letter %c is ASCII hex number %#x\n' 'A' 65
  # =>    The letter A is ASCII hex number 0x41

  printf 'My GPA is certainly not a %#f\n' 4
  # =>    My GPA is certainly not a 4.000000

  printf 'Hex number %#x\n' 95
  # =>    Hex number 0x5f

  printf '%-10s%-+#10.2f\n%-10s%-+#10.2f\n' 'Positive:' 2 'Negative:' -2
  # =>    Positive: +2.00
  # =>    Negative: -2.00
  ```

* More examples of `printf` (`zsh`):

  ```shell
  printf 'My name is %s\n' 'Austin'
  # =>    My name is Austin

  printf 'This includes %b in the argument string\n' '\nNewline values'
  # =>    This includes
  # =>    Newline values in the argument string

  printf 'The first letter of the alphabet is %c\n' 'a'
  # =>    The first letter of the alphabet is a

  printf 'The first number is the number %d\n' 1
  # =>    The first number is the number 1

  printf 'The first 3 digits of pi are %f\n' 3.14
  # =>    The first 3 digits of pi are 3.140000

  printf 'The decimal %g has its trailing zeroes truncated\n' 31.200000
  # =>    The decimal 31.2 has its trailing zeroes truncated

  printf 'Avogadros number is %e\n' 602214000000000000000000
  # =>    Avogadros number is 6.022140e+23

  printf 'The number 10 in hex is %x\n' 10
  # =>    The number 10 in hex is a

  printf 'This is %d%% luck, %d%% skill, %d%% concentrated power of will\n' 10 20 15
  # =>    This is 10% luck, 20% skill, 15% concentrated power of will

  printf '/%s\ ' {1..5}
  # => /1\/2\/3\/4\/5\

  printf '/%.s\' {1..5}
  # => /\/\/\/\/\

  ```

* Printing `uint8_t` in base-10 and base-16

  ```c
  uint8_t value = 9;
  printf("Dec\t%hhu\n", value);
  printf("Dec\t%hhx\n", value);
  ```
