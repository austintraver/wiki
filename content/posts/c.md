---
title: "C / C++"
description: "Low-level programming for high-level tryhards"
date: 2020-02-04T14:52:26-08:00
image: "c.png"
---

# C / C++

C was originally developed at Bell Labs by Dennis Ritchie between 1972 and 1973 to make utilities running on Unix. Later, it was applied to re-implementing the kernel of the Unix operating system. During the 1980s, C gradually gained popularity. It has become one of the most widely used programming languages, with C compilers from various vendors available for the majority of existing computer architectures and operating systems. C has been standardized by the International Organization for Standardization (ISO).

## `<stdint.h>`

### Specifying Integer Size

Sometimes you know that you're only going to need a number that goes up to 255. It doesn't make sense to create a full `int` since that is typically encoded as 4-bytes large. A single byte is capable of coding numbers up to `255`.

Luckily, C allows you to specifically declare the size of your integer, with the following syntax.

|Bytes|Bits|Signed Type|Unsigned Type|
|:---:|:---:|:---:|:---:|
|1|8|`int8_t`|`uint8_t`|
|2|16|`int16_t`|`uint16_t`|
|4|32|`int32_t`|`uint32_t`|
|8|64|`int64_t`|`uint64_t`|

You're technically using some of these without even knowing it. Assuming you're running C on a 64-bit system, these following types are equivalent:

* `char` is a `int8_t`, an unsigned 1-byte integer
* `short` is a `int16_t`, a signed 2-byte integer
* `int` is a `int32_t`, a signed 4-byte integer
* `long` is a `int64_t`, a signed 8-byte integer
* `size_t` is a `uint64_t`, an unsigned 8-byte integer

## GNU C Compilers

* `gcc` is the Gnu C compiler
* `g++` is the Gnu C++ compiler

*However*, with this being said, `gcc` is a fully functional C++ compiler, and `g++` is effectively just a mapping to `gcc -xc++ -lstdc++ -shared-libgcc`


### Setting the Version

* In C

  * Using `clang`:

    ```sh
    clang -std=c17
    ```

* In C++

  * Using `clang++`:

    ```sh
    clang++ -std=c++2a
    ```

  * Using `g++`:

    ```sh
    g++ -std=c++1z # (ISO c++ standard)
    g++ -std=gnu++1z # (GNU c++ standard)
    ```

### Optimizations

* Optimize compilation for the Raspberry Pi 4

  ```sh
  export CFLAGS="-march=cortex-a72 -mcpu=cortex-a72 -mfloat-abi=hard -mfpu=neon-fp-armv8 -mneon-for-64bits"
  ```

### Checking Processor

  ```sh
  gcc -march=native -Q --help=target | grep -- '-march=' | cut -f3 | head -n 1
  # on macOS:        'haswell'
  # on AWS EC2:      'skylake-avx512'
  # on Raspberry Pi: 'cortex-a72'
  ```

## Input/Output

Import the `<stdio.h>` library to get started

### Formatted Strings

* The `snprintf()` function can be used to write a formatted string to a buffer. The arguments supplied are as follows:
  1. `char* buffer`
  2. `int size`
  3. `const char* format`
  4. `<arg1>`, `<arg2>`, `...`

* The `puts()` function writes a C-string to `stdout`, stopping at the first null terminator `\0` found. It additionall appends a newline `\n` to the output. To print to a particular stream instead of `stdout`, and/or to avoid the insertion of a trailing newline, `\n` instead of `stdout`, use the `fputs()` function instead.

* Printing a formatted string to `stdout`:

  ```c
  #include <stdio.h>
  #include <stdint.h>

  int main() {
      uint8_t size = 100;
      char buffer[size];
      const char* format = "It takes %hhu to tango.";
      uint8_t value = 2;
      snprintf(buffer, size, format, value);
      puts(buffer);
  }
  ```

# Initialization


## Initializer List

You can use *Initializer Lists* to zero out elements.

* Initializing each element of an array to `0`:

  ```c
  char[8] buffer = {0};
  ```

Initializing a 2D array with initializer lists even supports implied zero values, see below.

* Initializing a 2D array of known values:

  ```c
  #include <stdio.h>
  #include <stdint.h>

  int main(int argc, char** argv) {
    /* Create a 4x2 matrix */
    uint8_t matrix[4][3] = {
      { 0, 1 }, // 0
      { 2, 3 }, // 0
      { 4, 5 }, // 0
      { 6, 7,      8 }
    };
    for (uint8_t i=0; i<4; i+=1) {
      for (uint8_t j=0; j<3; j+=1) {
        printf("%hhu ", matrix[i][j]);
      }
      printf("\n");
    }
    return 0;
  }
  ```

  ```txt
  0 1 0 
  2 3 0 
  4 5 0 
  6 7 8 
  ```

## Useful `<stdio.h>` Commands

* `gets()`: Reads a c-string from stdin

* `fputc`: Writes a character to a stream

* `fgetc`: Reads a character from a stream

* `remove`: Removes a file

* `rename`: Renames a file

* `fopen`: Opens a file

* `fwrite`: Writes a file

* `fclose`: Closes a file

* `setbuf`: Sets the stream buffer

## C++ Style Guide

If you develop software on a MacOS, you might want to use the style guide, which is compatible with `clang`'s auto-formatting capabilities.

The style guide notes outlined below are taken directly from Apple's `llvm` and outline some of the details I found to be the most noteworthy.

* Avoid writing `#include <iostream>` unless you really need more functionality than `<stdio.h>` is capable of providing with its trusty `printf()` function

* Avoid writing `using namespace std`. It pollutes the global namespace and can cause collisions which are frustrating to debug

* Avoid using `std::endl` as a generic substitute for `\n`. The command `std::endl` calls `os.put('\n')` and then calls `os.flush()` which is likely more computationally intensive than you desire.

* Avoid using *post-increment* operators. Favor using *pre-increment* operators. They are computationally faster and save you from painful debugging later on.

* Avoid throwing exceptions. Most exceptions can be avoided with good programming practices, and they are computationally expensive to handle.

* When coding in `C++`, favor using `std::static_cast<T>(var)` over C-style casts, (e.g. `(T) var`).


