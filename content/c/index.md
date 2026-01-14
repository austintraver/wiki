---
title: "C / C++"
description: "Low-level programming for high-level tryhards"
date: 2020-02-04T14:52:26-08:00
---

# C / C++

C was originally developed at Bell Labs by Dennis Ritchie between 1972 and 1973
to make utilities running on Unix. Later, it was applied to re-implementing the
kernel of the Unix operating system. During the 1980s, C gradually gained
popularity. It has become one of the most widely used programming languages,
with C compilers from various vendors available for the majority of existing
computer architectures and operating systems. C has been standardized by the
International Organization for Standardization (ISO).

## `<stdint.h>`

### Specifying Integer Size

Sometimes you know that you're only going to need a number that goes up to 255.
It doesn't make sense to create a full `int` since that is typically encoded as
4-bytes large. A single byte is capable of coding numbers up to `255`.

Luckily, C allows you to specifically declare the size of your integer, with the following syntax.

|Bytes|Bits|Signed Type|Unsigned Type|
|:---:|:---:|:---:|:---:|
|1|8|`int8_t`|`uint8_t`|
|2|16|`int16_t`|`uint16_t`|
|4|32|`int32_t`|`uint32_t`|
|8|64|`int64_t`|`uint64_t`|

You're technically using some of these without even knowing it. Assuming you're
running C on a 64-bit system, these following types are equivalent:

* `char` is a `int8_t`, an unsigned 1-byte integer
* `short` is a `int16_t`, a signed 2-byte integer
* `int` is a `int32_t`, a signed 4-byte integer
* `long` is a `int64_t`, a signed 8-byte integer
* `size_t` is a `uint64_t`, an unsigned 8-byte integer

## GNU C Compilers

* `gcc` is the Gnu C compiler
* `g++` is the Gnu C++ compiler

*However*, with this being said, `gcc` is a fully functional C++ compiler, and
`g++` is effectively just a mapping to `gcc -xc++ -lstdc++ -shared-libgcc`


### Setting the Version

* In C

    * Using `clang`:

        ```shell
        clang -std=c17
        ```

* In C++

    * Using `clang++`:

        ```shell
        clang++ -std=c++2a
        ```

    * Using `g++`:

        ```shell
        g++ -std=c++1z # (ISO c++ standard)
        g++ -std=gnu++1z # (GNU c++ standard)
        ```

### Checking Processor

    ```shell
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

* The `puts()` function writes a C-string to `stdout`, stopping at the first null terminator `\0` found. It additional appends a newline `\n` to the output. To print to a particular stream instead of `stdout`, and/or to avoid the insertion of a trailing newline, `\n` instead of `stdout`, use the `fputs()` function instead.

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

### Parsing Strings

I've found a very smooth way to split strings is by iterating through tokens
generated to match a regular expression. See below:

```cpp
#include <regex>
#include <string>
#include <iostream>

int main() {
  std::string content("1 - line #1\r\n2 - line #2\r\n3 - line #3");
  // generate an iterator through each line token, excluding the <CR><LF>
  // note: exclusion of the token itself is denoted by the `-1` provided as the 4th
  // argument to the constructor of the std::regex_token_iterator
  std::regex crlf("\\r\\n");
  auto line{std::sregex_token_iterator{content.begin(),
    content.end(),
    crlf,
    -1}};
  while (line != std::sregex_token_iterator()) {
    std::cout << "------" << std::endl;
    std::cout << "[" << *line << "]" << std::endl;
    std::string buffer(line->str());
    // for the number, omit the (-1) previously provided
    // which will cause this to tokenize the matches to the
    // regular expression itself
    std::regex blackspace("\\S+");
    auto text{std::sregex_token_iterator{buffer.begin(),
      buffer.end(),
      blackspace,
      }};
    while (text != std::sregex_token_iterator()) {
      std::cout << "\t" << "(" << *text << ")" << std::endl;
      ++text;
    }
    ++line;
  }
  std::cout << "------" << std::endl;
}
```

{{% samp %}}

------
[1 - line #1]
	(1)
	(-)
	(line)
	(#1)
------
[2 - line #2]
	(2)
	(-)
	(line)
	(#2)
------
[3 - line #3]
	(3)
	(-)
	(line)
	(#3)
------

{{% /samp %}}


### Splitting Strings

There's no `split()` function for strings... until now!

* Split a string on each occurrence of a regular expression pattern:

    ```cpp
    std::vector<std::string> split(const std::string &text, const std::regex &regex) {
        return std::vector<std::string>{
            std::sregex_token_iterator{
                text.begin(), 
                text.end(), 
                regex, 
                -1
            }, 
            std::sregex_token_iterator()
        };
    }
    ```

* Split text on every occurrence of a carriage return, followed by a newline

    ```cpp
    std::regex crlf{"\\r\\n"};
    for (auto& i : split(text, crlf)) {
        std::cout << "[" << i << "]" << std::endl;
    }
    ```

### Slurping Files

* Read a file and store its content in a string variable:

    ```cpp
    std::ifstream ifile("file.txt");
    std::stringstream ss;
    ss << ifile.rdbuf();
    std::string text(ss.str());
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

* `gets`: Reads a c-string from stdin

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


## Formatting time and date { #time-and-date }

A peer in my operating systems class asked:

> Since there is no specific format required, I just wanted to check if this
> format is acceptable for date:

```
1:35, 1-24-2021 // represents 1:35 AM UTC, January 24 2021
13:35, 1-24-2021 // represents 1:35 PM UTC, January 24 2021
```

I'm not a CP/TA for CSCI 350, but I know of multiple classes where points are
taken off for students who encode time this way.

For example, the string representation of `1:02 AM UTC, March 4, 0005`, using
this format, would be:

```txt
1:2, 3-4-5
```

Which would be a bit confusing. To solve this, ISO came together in 1988 and
created a timestamp format, and published it under [ISO 8601][], with the most
common implementation being that documented in [RFC 3339][]. Typically for
computers, time as a string will be compliant with these formats.

The main reason: A list of `ISO 8601` compliant timestamps, when sorted
lexicographically, **are also in chronological order**

That example written above in an `ISO 8601` compliant format would be

`0005-04-03T01:02:00+00:00`

*In `C/C++`* You can use [strftime()][strftime] to create ISO 8601 / RFC 3339
compliant timestamp strings.

Sources:
* my burning hatred for dealing with date/time
* data engineering internship

[ISO 8601]: https://en.wikipedia.org/wiki/ISO_8601
[RFC 3339]: https://tools.ietf.org/html/rfc3339#section-5.8
[strftime]: http://www.cplusplus.com/reference/ctime/strftime/

{{< youtube "-5wpm-gesOY" >}}

## Inheritance

```cpp
class example {
    demo();
};

class::demo(){}
```

In the example above, the `::` is called the scope resolution operator, which
points out to the compiler that the function `demo()` is a member to the class
`example`.

## CMake

### Adding GoogleTest to a C++ project

It's late, so I'm putting this here so I don't forget it.

Project file `CMakeList.txt`, at the root of the project

```cmake
cmake_minimum_required(VERSION 3.17)
project(my-project)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

if (DEFINED ENV{GTEST_CMAKE})
	message("GTEST_CMAKE:" $ENV{GTEST_CMAKE})
	if(EXISTS $ENV{DOTFILES}/cmake/gtest.cmake)
		configure_file($ENV{GTEST_CMAKE} gtest/download/CMakeLists.txt)
	endif()
endif()

execute_process(COMMAND ${CMAKE_COMMAND} -G "${CMAKE_GENERATOR}" .
		RESULT_VARIABLE result
		WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/gtest/download)
if (result)
	message(FATAL_ERROR "CMake step for googletest failed: ${result}")
endif ()
execute_process(COMMAND ${CMAKE_COMMAND} --build .
		RESULT_VARIABLE result
		WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/gtest/download)
if (result)
	message(FATAL_ERROR "Build step for googletest failed: ${result}")
endif ()

# Add googletest directly to our build. This defines
# the gtest and gtest_main targets.
add_subdirectory(${CMAKE_CURRENT_BINARY_DIR}/gtest/src
		${CMAKE_CURRENT_BINARY_DIR}/gtest/build
		EXCLUDE_FROM_ALL)

# Now simply link against gtest or gtest_main as needed. Eg
add_executable(example example.cpp)
target_link_libraries(example gtest_main)
add_test(NAME example_test COMMAND example)
```

Environment variable `${GTEST_CMAKE}`, stored anywhere on the filesystem

```cmake
cmake_minimum_required(VERSION 2.8.12)
project(gtest NONE)
include(ExternalProject)
# Replace "ON" with "OFF" to disable either gmock or gtest
set(BUILD_GMOCK ON CACHE BOOL "" FORCE)
set(BUILD_GTEST ON CACHE BOOL "" FORCE)
ExternalProject_Add(googletest
		GIT_REPOSITORY https://github.com/google/googletest.git
		GIT_TAG master
		SOURCE_DIR "${CMAKE_CURRENT_BINARY_DIR}/gtest/src"
		BINARY_DIR "${CMAKE_CURRENT_BINARY_DIR}/gtest/build"
		CONFIGURE_COMMAND ""
		BUILD_COMMAND ""
		INSTALL_COMMAND ""
		TEST_COMMAND ""
		)
```

---

{{% aside info %}}

**Update**: You don't have to do this anymore. CMake has created some built in convenience functions in recent versions of CMake have built-in convenience functions to save you from having to pollute your C/C++ projects with all of this boilerplate. A cleaner example has been provided below.

{{%/ aside %}}

* Modern way to import Google Test into your CMake project.


```cmake
# ===========================================================================
# Google Test
include(FetchContent)
set(FETCHCONTENT_BASE_DIR ${CMAKE_BINARY_DIR}/opt)
set(BUILD_GMOCK OFF CACHE BOOL "" FORCE)
set(BUILD_GTEST ON CACHE BOOL "" FORCE)
fetchcontent_declare(
        googletest
        GIT_REPOSITORY https://github.com/google/googletest.git
        GIT_SHALLOW
        GIT_PROGRESS
)
fetchcontent_makeavailable(googletest)
# ===========================================================================

# From here, importing a file that uses <gtest/gest.h> should be about 
# as simple as this, though # I don't fully understand the implications of the
# PUBLIC/PRIVATE/INTERFACE parameter as of yet.

add_executable(t_node t_node.cpp)
target_link_libraries(t_node PUBLIC gtest)
```

#### Pre-compiled headers

Leaving this here as well, for my own memory

```cmake
target_precompile_headers(ajt INTERFACE ajt.hh
        <string>
        <vector>
        <fstream>
        <sstream>
        <iostream>
        <map>
        <set>
        <unordered_map>
        <unordered_set>
        <regex>
        <exception>)
```

#### Header-only libraries

```cmake
add_library(http INTERFACE http.hh)
target_precompile_headers(http)

add_library(request INTERFACE request.hh)
target_link_libraries(request INTERFACE http)
target_precompile_headers(request REUSE_FROM http)

add_library(response INTERFACE response.hh)
target_link_libraries(response INTERFACE http)
target_precompile_headers(response REUSE_FROM http)

add_executable(network remotehosting.cpp)
target_link_libraries(remotehosting INTERFACE request response)
```

---

## Namespace Aliasing

Leaving this here because I want to use it at some point, but when
I'm not doing a graded assignment

```cpp
#include <string>
#include <vector>
#include <list>
#include <regex>
#include <set>
#include <map>
#include <unordered_set>
#include <unordered_map>
#include <queue>
#include <sstream>
#include <fstream>
#include <iostream>

namespace etc {

    template <typename K, typename V>
    using map = std::unordered_map<K, V>;

    template<typename K, typename V>
    using multimap = std::unordered_multimap<K,V>;

    template<typename K, typename V>
    using treemap = std::map<K, V>;

    template<typename K, typename V>
    using multitreemap = std::multimap<K, V>;

    template <typename T>
    using set = std::unordered_set<T>;

    template<typename T>
    using multiset = std::unordered_multiset<T>;

    template<typename T>
    using treeset = std::set<T>;

    template<typename T>
    using multitreeset = std::multiset<T>;

    template<typename T>
    using list = std::vector<T>;

    template<typename T>
    using linkedlist = std::list<T>;

    template<typename T>
    using heap = std::priority_queue<T>;

}
```

### Utility Functions

* Determine the size of a file

    ```cpp
    #include <sys/stat.h>

    /**
    * Determines the size of a file
    *
    * @param filepath - the absolute or relative path to the file
    * @return the size of the file, or (-1), in the event of an error
    */
    static size_t filesize(const char* filepath) {
        struct stat result{};
        return (stat(filepath, &result) == 0) ? result.st_size : -1;
    }
    ```

* Reading and writing to file descriptors using C++ streams

```cpp
#include <fstream>
#include <sstream>
#include <iotream>

int main() {
    // read from standard input
    std::ifstream ifile("/dev/fd/0");
    // write to standard output
    std::ofstream ofile("/dev/fd/1");
    std::stringstream sfile;
    // slurp the input into a string stream
    sfile << ifile.rdbuf();
    // output the string contained by the stream
    ofile << sfile.str();
}

```

* Checking if a file is empty

```cpp
std::ifstream ifile;
ifile.open({{< var FILEPATH >}});
// if the file is empty, return an empty string
if (ifile.peek() == std::ifstream::traits_type::eof()) {
    return std::string{};
}
```

## Operator Overloading

In the example below, I create a class `number`, and overload the addition
operator, such that instead of adding `1` and `2` together, the numbers
are instead *concatenated*, causing the value of `number` `charlie` to equal `3`.

```cpp
#include <iostream>
#include <string>

struct number {
  number(int val): val(val) {}

  number operator+(number rhs) {
    return number(std::stoi(std::string(std::to_string(this->val) + std::to_string(rhs.val))));
  }

  friend std::ostream& operator<<(std::ostream& os, const number& num) {
    os << num.val;
    return os;
  }

  int val;
};

int main(int argc, char** argv) {
  number alpha(1);
  number bravo(2);
  number charlie = alpha + bravo;
  std::cout << charlie << std::endl;
}
```

Output

```txt
12
```


## GCC

### Flags

#### Common Flags

`-E`
:   Have GCC run the pre-processer and output the resulting source code.

`-S`
:   Have GCC run the assembler and output the intermediate assembly code.

`-C`
:   Have GCC produce only the final result after compiled code

`-I {{< var DIR >}}`
:   When the codebase refers to files in a `#include` directive, check the contents of `{{< var DIR >}}` for a matching filename. 

`-D{{< var MACRO >}}={{< var DEFINITION >}}`
:   Define a macro `{{< var MACRO >}}` with definition `{{< var DEFINITION >}}`, same as saying `#define {{< var MACRO >}} = {{< var DEFINITION >}}` in your source files.

`-B{{< var PREFIX >}}`
:   This option specifies where to find the executables, libraries, include files, and data files of the compiler itself.

`-l {{< var LIBRARY >}}` 
:   Search the library named `{{< var LIBRARY >}}` when linking.  (The second alternative with the library as a separate argument is only for POSIX compliance and is not recommended.)

`-L{{< var LIBRARY >}}`
:   When we link a library with the `-l` flag, check the contents of the directory {{< var LIBRARY >}} for a match. (e.g.: a valid match to `-Lfolder`-lbla` would be `folder/libbla.so`)


#### Useful Flags

`-s`
:   Remove all symbol table and relocation information from the executable.

`-nostdinc++`
:   Do not search for header files in the standard directories specific to C++ .

`-nostdinc`
:   Do not search for header files in the standard directories specific to C. 

`-march=native` +  `-mtune=native`
:   Enables optimizations which work specifically on your cpu and might not on others.

`-pthread`
:   Define additional macros required for using the POSIX threads library.  You should use
this option consistently for both compilation and linking.  This option is supported on
GNU/Linux targets, most other Unix derivatives, and also on x86 Cygwin and MinGW
targets.

`-qopenmp-simd`: Enable vector optimization to improve performance of the parallel STL

`-fPIC`
:   Compile the codebase into *position independent code*, useful for making shared libraries.

`-fPIE`
:   Compile the codebase into a *position independent executable* useful for securing code.

`-fsanitize=pointer-compare`
:   Ensure that their's no comparasson between two pointers from different objects using the relational operators. The option must be combined with -fsanitize=address

`-fsanitize=address`: 
:   Enable the address sanitizer to check for possible memory errors.

`-fdiagnostics-color=aut`
:   Use color in diagnostic messages only when the standard error is a terminal

`-fdiagnostics-show-template-tree`
:   Have the compiler errors more specifically identify mismatches between two templates, including a colorized tree as a visual aid.

`-fsanitize=thread`
:   Enable ThreadSanitizer, a fast data race detector.  Memory access instructions are instrumented to detect data race bugs.

`-fsanitize=leak`
:   Enable LeakSanitizer, a memory leak detector.  This option only matters for linking of executables and the executable is linked against a library that overrides "malloc" and other allocator functions.

`-fdiagnostics-show-template-tree`
:   Have the compiler errors more specifically identify mismatches between two templates, including a colorized tree as a visual aid.

`-fstack-check`
:   Generate code to verify that you do not go beyond the boundary of the stack.  You
    should specify this flag if you are running in an environment with multiple threads,
    but you only rarely need to specify it in a single-threaded environment since stack
    overflow is automatically detected on nearly all systems if there is only one stack.


`-c` or `-S` or `-E`
:   prevent the linker from running at the end.

Later on, I hope to add information on the following: `-ftabstop`  `-fdirectives-only` `-M` `-MD` `-MMD` `-ftrack-macro-expansion` `-fpch-deps` `-fpch-preprocess` `-fworking-directory` `-C` `-CC` `-H` `-fdebug-cpp` `-nostdlib` `-nolibc` `-nodefaultlibs` `-nostartfiles` `-r` `-s` `-static` -shared
     

#### Warning Flags

`-Wall`
:   Enable a sensible list of default warnings.

`-Werror`
:   Treat the detection of warnings as a failure of the build process.

`-Wmissing-include-dirs`
:   Warn if a user-supplied include directory does not exist.

`-Wundef`
:   Warn if an undefined identifier is evaluated in an "#if" directive.  Such identifiers are replaced with zero.

`-Wredundant-decls`
:   Warn if anything is declared more than once in the same scope, 
even in cases where multiple declaration is valid and changes nothing.

`-Winvalid-pch`
:   Warn if a precompiled header is found in the search path but cannot be used.

`-Wlarger-than={{< var BYTE_SIZE >}}
:   Warn whenever an object is defined whose size exceeds {{< var BYTE_SIZE >}}.

`-Weffc++`
:   Warn about violations of the following style guidelines from 
Scott Meyers' Effective C++ series of books:
    *   Define a copy constructor and an assignment operator for classes with 
    dynamically-allocated memory. 
    *   Prefer initialization to assignment in constructors.
    *   Have `operator=` return a reference to `*this`.
    *   Don't try to return a reference when you must return an object.
    *   Distinguish between prefix `++i` and postfix `i++` forms of increment and decrement operators.
    *   Caution against overload the `&&`, `||`, or `,` operators.


#### Debug Flags

`-ggdb`
:   Produce debugging information for use by GDB.  This means to use the most expressive
           format available (DWARF, stabs, or the native format if neither of those are
           supported), including GDB extensions if at all possible.

`-gdwarf`
:   Produce debugging information in DWARF format (if that is supported).
