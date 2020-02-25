+++
title = "C / C++"
description = "Low-level programming for high-level tryhards"
date = 2020-02-04T14:52:26-08:00
image = "c.jpg"
+++

# C / C++

C was originally developed at Bell Labs by Dennis Ritchie between 1972 and 1973 to make utilities running on Unix. Later, it was applied to re-implementing the kernel of the Unix operating system. During the 1980s, C gradually gained popularity. It has become one of the most widely used programming languages, with C compilers from various vendors available for the majority of existing computer architectures and operating systems. C has been standardized by the International Organization for Standardization (ISO).

## `<stdint.h>`

### Specifying Integer Size

Sometimes you know that you're only going to need a number that goes up to 255. It doesn't make sense to create a full `int` since that is typically encoded as 4-bytes large. A single byte is capable of coding numbers up to `255`.

Luckily, `C` and `C++` allow you to specifically declare the size of your integer, with the following syntax.

|Bytes|Bits|Signed|Unsigned|
|:---:|:---:|:---:|:---:|
|1|8|`int8_t`|`uint8_t`|
|2|16|`int16_t`|`uint16_t`|
|4|32|`int32_t`|`uint32_t`|
|8|64|`int64_t`|`uint64_t`|

You're technically using some of these without even knowing it. Assuming you're running `c++` on a 64-bit system, these following types are equivalent:

* `char` is a `int8_t`, an unsigned 1-byte integer
* `short` is a `int16_t`, a signed 2-byte integer
* `int` is a `int32_t`, a signed 4-byte integer
* `long` is a `int64_t`, a signed 8-byte integer
* `size_t` is a `uint64_t`, an unsigned 8-byte integer

## C++ Style Guide

If you develop software on a MacOS, you might want to use the style guide, which is compatible with `clang`'s auto-formatting capabilities.

The style guide notes outlined below are taken directly from Apple's `llvm` and outline some of the details I found to be the most noteworthy.

* Avoid writing `#include <iostream>` unless you really need more functionality than `<stdio.h>` is capable of providing with its trusty `printf()` function

* Avoid writing `using namespace std`. It pollutes the global namespace and can cause collisions which are frustrating to debug

* Avoid using `std::endl` as a generic substitute for `\n`. The command `std::endl` calls `os.put('\n')` and then calls `os.flush()` which is likely more computationally intensive than you desire.

* Avoid using *post-increment* operators. Favor using *pre-increment* operators. They are computationally faster and save you from painful debugging later on.

* Avoid throwing exceptions. Most exceptions can be avoided with good programming practices, and they are computationally expensive to handle.

* When coding in `C++`, favor using `std::static_cast<T>(var)` over C-style casts, (e.g. `(T) var`).


## GNU C Compilers

* `gcc` is the Gnu C compiler
* `g++` is the Gnu C++ compiler

*However*, with this being said, `gcc` is a fully functional C++ compiler, and `g++` is effectively just a mapping to `gcc -xc++ -lstdc++ -shared-libgcc`


### Setting the Version

```sh
g++ --std=c++1z # (ISO c++ standard)
g++ --std=gnu++1z # (GNU c++ standard)
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

## Printing Strings in C

### `snprintf`

* Printing a string using a char buffer:

  ```c
  #include <stdio.h>
  #include <stdint.h>

  int main() {
      uint8_t size = 100;
      char buffer[size];
      const char* format = "It takes %hhu to tango.";
      uint8_t value = 2;
      snprintf(buffer, size, format, value);
      printf(buffer);
  }
  ```

## Printing Small Values

The format specifiers to print small values are as follows

| Name | Format Specifier | C Data Type |
| :---: | :---: | :---: |
| Unsigned 1-byte Digit (Base 10) | `%hhu` | `uint8_t` |
| Unsigned 1-byte Digit (Hex) | `%hhx` | `uint8_t` |

