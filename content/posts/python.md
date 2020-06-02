+++
title = "Python"
description = "The best programming language"
date = 2020-02-04T14:52:27-08:00
image = "python.png"
+++

# Python

## Getting started

* Following this will default to the newest version of Python, which is version 3. For backwards compatibility reasons, `python` will refer to Python 2. However this version will be deprecated at the end of 2019.

* On macOS

Installing Python on macOS via Homebrew, at the time of writing, will not install the most current version of Python available, despite it being released 5 months ago.

  ```sh
  brew install python@3.8

  # Add to .zshenv
  path=(/usr/local/opt/python@3.8/libexec/bin ${path})
  ```

* On Debian

  ```sh
  sudo apt install python3.8
  sudo apt install python3-pip
  sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
  sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1
  ```


### Silencing the `python` Console Welcome Message

Normally, when you open the `python` console, the following welcome message will appear when you enter.

```txt
Python 3.7.3 (default, Jun 19 2019, 07:38:49)
[Clang 10.0.1 (clang-1001.0.46.4)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
```

To disable it, use the following command to enter the `python` console:

```sh
python -q
```

## `set()`

A set in Python is implemented as a hash table. It has O(1) lookup and insertion time.

* Creating a set and inserting values:

  ```py
  # Creating an empty set
  bag = {}
  bag = set()
  # Creating a set from a list of items
  bag = {1, 2}
  bag = set([1, 2])
  ```

Adding items to a set:

```py
bag = {1, 2}
array = [1, 2, 3, 4, 4, 5]

# Adding 1 item with add()
set.add(3)

# Adding a list of items using update()
bag.update(array)

# Adding a set of items using |=
bag |= set(array)
```

* Testing for membership in dicts/sets:

  ```py
  hashmap = {
      'a': 1,
      'b', 2,
      'c', 3
  }

  keys = hashmap.keys()

  # Test that {'a', 'b', 'c'} is a proper subset of hashmap's keys
  print({'a', 'b', 'c'} < hashmap.keys())
  # => False

  # Test that {'a', 'b', 'c'} is a proper superset of hashmap's keys
  print({'a', 'b', 'c'} > hashmap.keys())

  # Test that 'a' and 'b' are a valid subset of hashmap's keys
  print({'a', 'b'} <= hashmap.keys())
  # => True

  # Test that {'a', 'b', 'c'} is a superset of hashmap's keys
  print({'a', 'b', 'c'} >= hashmap.keys())
  ```

## `os.path()`

```py
from os.path import *
from glob import glob

home = expanduser('~')
# => /Users/tommy

sym_folder = join(home, 'tmp')
# => /Users/tommy/tmp

abs_folder = realpath(sym_folder)
# => /Users/tommy/real/location/folder

files = glob(expanduser('~/notes/*.md'))
# => ['/Users/tommy/notes/file1.md', '/Users/tommy/notes/file2.md']
```

## Jupyter Notebook

A Jupyter Notebook `brew install jupyter` is an open source web application that allows you to create and share documents containing snippets of pre-executed code.

The Jupyter Notebook supports the following languages, among others:

* `python`
* `ruby`
* `nodejs`
* `c`
* `c++`
* `bash`
* `zsh`
* `go`
* `perl`
* `php`
* `redis`

The Jupyter Notebook will also render `LaTeX` and `Markdown`, allowing for flexible formatting of data.

* You can execute `bash` scripts in your Jupyter notebook, simply by pre-pending any given cell with `%%bash` on the first row.

* to add configuration files to your local machine's jupyter notebook, type the following command. This will generate the folder `~/.jupyter` and insert a file into it called `jupyter_notebook_config.py`.

```sh
jupyter notebook --generate-config
```

```sh
pass="letmein"
python -c "from notebook.auth import passwd; print(passwd('${pass}'))"
```

### Setting Up `pylint`

* On macOS

  ```sh
  pip install pylint
  export PATH="~/Library/Python/3.7/bin:${PATH}"
  ```

* On Debian

  ```sh
  sudo apt install pylint
  ```

```sh
pylint --generate-rcfile > ~/.pylintrc
```

If `pylint` notifies you about a linting error that you don't like, add it as an entry, seperated by a comma, to `disable`. e.g.

```
disable=missing-docstring,
        invalid-name,
        bare-except
```

## Plotly

### Getting Started

Plotly is a visualization tool you can install with `pip3 install plotly`. You can create an account at [plot.ly](plot.ly) and generate an API key. Once you have, edit the `~/.plotly/.credentials` and insert the following information.

```json
{
  "username": "tommytrojan",
  "api_key": "Fou4dE18o4TUtCz91n6O"
}
```

### Plotting Data

#### Plotting Online

```py
import pandas as pd
import plotly.plotly as py
import plotly.figure_factory as ff

df = pd.read_csv("earnings.csv")
table = ff.create_table(df)
py.iplot(table, filename='table1')
```

{{% notice success %}}
**Tip:** When using a jupyter notebook, use the `iplot()` method, which will plot the data inline. If you'd like the graph to be shared with others, use the `plot()` method.
{{% /notice %}}

#### Plotting Offline

```py
import plotly.offline as py
import plotly.graph_objs as go
from plotly.offline import init_notebook_mode, plot, iplot
init_notebook_mode()

data = go.Bar(x=df.height, y=df.weight)
figure = [data]
py.iplot(data, filename='height_weight')
```

{{% notice danger %}}
**Warning:** Your graph will not appear if you don't call the `init_notebook_mode()` method first!
{{% /notice %}}

The only big difference between plotting online and plotting offline is whether to use `plotly.plotly` or `plotly.offline` for your import. Both will include the `plot()` and `iplot()` methods.

## Regular Expressions

Use the `re` library for regular expressions in python. Regular expression patterns are created by calling `re.compile()` which accepts two arguments, a raw string, and flags. To specify multiple flags, specify each with the bitwise OR operator `|`

Regular Expression Flags

| Flag | Function |
| :---: | :---: |
| `re.A` | Make the pattern match only ASCII characters |
| `re.I` | Make the pattern case insensitive
| `re.M` | The `^` & `$` special characters match the start/end of each line in a string, instead of the start/end of the string itself |
| `re.S` | Allow the `.` character to match newline characters |
| `re.X` | Ignore whitespace in the pattern definition, and allow for comments |

| Special Character | Function |
| :---: | :---: |
|+ |Match 1 or more|
|\* |Match 0 or more|
|?| 0 or 1|
|{k}| Match k consecutive occurances of the preceeding pattern |
|{m,n}| Match from m to n consecutive occurences (inclusive) of the preceeding pattern (as many as possible) |
|{m,n}? | Match from m to n consecutive occurrences (inclusive) of the preceeding pattern (as few as possible) |
|. |Match any character except a newline `\n`|
|^| Match the start of the string|
|$| Match the end of string|
|(| Specify the start of capture group|
|)| Specify the end of capture group|

| Escaped Character | Matches |
|:---:|:---:|
|`\t`| Horizontal tab|
|`\v`| Vertical tab|
|`\n`| Newline
|`\f`| Form feed |
|`\r`| Carriage return |
|`\w`| `[a-zA-Z0–9_]`|
|`\d`| `[0–9]`|
|`\s`| `[\t\n\r\f\v]`|
|`\b`| Specify a word boundary |

```py
# Import the RegEx library
import re

# Create a raw-string pattern
pattern = re.compile(r'http[s]?://([^/?:]+)', re.A|re.I)
# Search for the text matching the pattern in "sample"
text = 'https://helpful.wiki/python'

match = pattern.search(text)
print(match.group(0))
# => https://helpful.wiki
print(match.group(1))
# => helpful.wiki
```

## Dates, Times, Timestamps

ISO8601 and RFC3339 are the documents that outline how date and time should be denoted on computers. `1996-12-20T00:39:57Z` is an example of an ISO8601 timestamp. The `Z` denotes that this timestamp is in *zulu time*, the UTC timezone. The UTC timezone is *Coordinated Universal Time* and, depending on the time of year, is either 7 or 8 hours ahead of the time in California. The equivalent time in California would be represented as `1996-12-19T16:39:57-08:00`

The `datetime` library has a few packages:

* `datetime.date`
* `datetime.time`
* `datetime.datetime`
* `datetime.timedelta`
* `datetime.timezone`
* `datetime.tzinfo`

```py
import datetime
import time

event = datetime.date.fromisoformat("2018-12-31")
# -00:00 is an illegal format but Python will interpret it successfully
event = datetime.datetime.fromisoformat("2018-12-31T12:31:58-08:00")
# Using whitespace seperator instead of 'T' character
event = datetime.datetime.fromisoformat("2018-12-31 04:31:58+00:00")

# If it's currently daylight savings
if time.daylight:
  tz = time.altzone
  # => 25200 (# of seconds offset from UTC)

else:
  tz = time.timezone
  # => 28800 (# of seconds offset from UTC)

print(time.tzname)
# => ('PST', 'PDT')

print(time.localtime)
# => time.struct_time(tm_year=2019, tm_mon=7, tm_mday=17, tm_hour=11, tm_min=42, tm_sec=15, tm_wday=2, tm_yday=198, tm_isdst=1)

moment = datetime.datetime.utcnow()

print(moment.isoformat(timespec='seconds'))
# => 2019-07-17T11:25:07

print(moment.isoformat(timespec='milliseconds'))
# => 2019-07-31T02:21:15.125

print(moment.isoformat(sep=' ', timespec='microseconds'))
# => 2019-07-3102:21:15.125991
```

Setting the timezone

* **Note**: This requires installing the `pendulum` library, as `python` does not have a built in library for time zone information.

```py
import time
import os
os.environ['TZ'] = 'US/Eastern'
time.tzset()
print(time.tzname)
# => ('EST', 'EDT')
```

* Print all timezones

```py
from datetime import datetime
from pendulum import timezone, timezones

for zone in timezones:
  print(zone)
```

* Some common timezones:

```py
[
  timezone("Pacific/Honolulu"), # -10:00
  timezone("America/Juneau"), # -09:00
  timezone("America/Los_Angeles"), # -08:00
  timezone("America/Denver"), # -07:00
  timezone("America/Chicago"), # -06:00
  timezone("America/New_York"), # -05:00
  timezone("Europe/London"), # +00:00
  timezone("Europe/Paris"), # +01:00
  timezone("Europe/Athens"), # +02:00
  timezone("Europe/Moscow"), # +03:00
  timezone("Asia/Tehran"), # +03:30
  timezone("Asia/Dubai"), # +04:00
  timezone("Asia/Kabul"), # +04:30 (capitol of Afghanistan)
  timezone("Asia/Dushanbe"), # +05:00 (capitol of Tajikstan)
  timezone("Asia/Kathmandu"), # +05:45 (capitol of Nepal)
  timezone("Asia/Dhaka"), # +06:00 (capitol of Bangladesh)
  timezone("Asia/Bangkok"), # +07:00
  timezone("Asia/Shanghai"), # +08:00
  timezone("Asia/Tokyo"), # +09:00
  timezone("Australia/Sydney"), # +10:00
  timezone("Asia/Noumea"), # +11:00 (capitol of New Caledonia)
  timezone("Pacific/Fiji") # +12:00
]
```

* Other useful commands

```py
moment = datetime.now()

print(moment.astimezone(zone).isoformat())

```

## Custom Module Locations

If you have your own modules that you want to use, there's a way to tell `python` where to look for a module that are added by the `import` keyword.

To do this, set the environment variable `PYTHONPATH` in your shell, and export that variable. For example, `export PYTHONPATH=~/example/python/modules`. Now, all of the folders within this directory will be considered a module. For instance, if `~/example/python/modules/ex` was a folder containing python code, now you'd be able to type `import ex` in future python programs.

{{% notice danger %}}
**Warning:** If you forget to call `export`, `python` will be unable to reference the `PYTHONPATH` variable.
{{% /notice %}}


## Sockets

### Server-Side TCP Socket

```py
import socket
    # Create a TCP socket
    mysocket = socket.socket(
        type=socket.SOCK_STREAM
    )

    # Create an address tuple, the interface to bind to, and a port number
    address = ('0.0.0.0', 1234)

    # Bind the socket to the address
    mysocket.bind(address)

    # Listen, allowing 1 pending connection
    mysocket.listen(1)

    # Listen until the process is killed
    while True:

        # Save the accepted connection
        connection, address = mysocket.accept()

        print(f"Accepted connection from {address}")

        # Continue until the transmission has no more data
        while True:
            data, orig_address = connection.recvfrom(4096)

            # If there's no data being transmitted, exit
            if not data:
                break
            else:
                # For now, reply to the same connection, echoing the message
                reply = f"echo \'{data.decode()}\'".encode()
                connection.sendto(reply, address)

        # Close the connection now that the message has been replied to
        connection.close()

print("exit")
```

```py
from socket import socket

    mysocket = socket.socket()

    address = ('127.0.0.1', 1234)

    # Connect the socket to the server
    mysocket.connect(address)

    # Send a message to the server, registering the name of the client
    message = f'register {args.name}'

    # Send the message to the connection
    mysocket.sendto(message.encode(), address)

    # Save the reply from the response, as well as the address
    reply, address = mysocket.recvfrom(4096)

    # Decode the reply's binary encoding, store as UTF-8 string
    reply = reply.decode()

    print(reply)

    mysocket.close()

    ofile = open(args.logfile, 'w')
    ofile.write('connected to server and registered\n')
    ofile.write('waiting for messages...\n')
    ofile.write('exit')
```

### Pandas

```py
from pandas import DataFrame, Series, read_json
barset["EMA12"] = barset["o"].ewm(span=12).mean()
barset.to_json('ofile.json', date_format='iso', date_unit='s', orient='index')
df = read_json('ofile1.json', orient='index', date_unit='s')
print(df.head())
```

### Type Hints

```py
from typing import List, Set, Dict, Tuple, Optional, Callable, Iterator, Union

# For simple built-in types, just use the name of the type
x: int = 1
x: float = 1.0
x: bool = True
x: str = "test"
x: bytes = b"test"

# For collections, the name of the type is capitalized, and the
# name of the type inside the collection is in brackets
x: List[int] = [1]
x: Set[int] = {6, 7}

# Same as above, but with type comment syntax
x = [1]  # type: List[int]

# For mappings, we need the types of both keys and values
x: Dict[str, float] = {'field': 2.0}

# For tuples, we specify the types of all the elements
x: Tuple[int, str, float] = (3, "yes", 7.5)

# Use Optional[] for values that could be None
x: Optional[str] = some_function()
# Mypy understands a value can't be None in an if-statement
if x is not None:
    print(x.upper())
# If a value can never be None due to some invariants, use an assert
assert x is not None
print(x.upper())
# This is how you annotate a function definition
def stringify(num: int) -> str:
    return str(num)

# And here's how you specify multiple arguments
def plus(num1: int, num2: int) -> int:
    return num1 + num2

# Add default value for an argument after the type annotation
def f(num1: int, my_float: float = 3.5) -> float:
    return num1 + my_float

# This is how you annotate a callable (function) value
x: Callable[[int, float], float] = f

# A generator function that yields ints is secretly just a function that
# returns an iterator of ints, so that's how we annotate it
def g(n: int) -> Iterator[int]:
    i = 0
    while i < n:
        yield i
        i += 1

# You can of course split a function annotation over multiple lines
def send_email(address: Union[str, List[str]],
               sender: str,
               cc: Optional[List[str]],
               bcc: Optional[List[str]],
               subject='',
               body: Optional[List[str]] = None
               ) -> bool:
```

## Subprocesses

Using the `subprocess` library, you can execute other commands from within your script, and capture the standard input and standard output of those commands

* Capturing the standard input and output of the command `hello`

  * Shell script

    ```sh
    #!/bin/zsh
    # `hello` program

    # Print one & two, separated by newline, to stdout
    print 'one\ntwo' >&1

    # Print 'three' to stderr
    echo 'three' >&2
    ```

  * Python script

    ```py
    from subprocess import run

    # Capture the output in a variable named 'result'
    result = run(args=['hello'], capture_output=True)

    # Decode the output
    standard_output = result.stdout.decode()
    print(standard_output)
    # => 'one'
    # => 'two'

    # Decode the error
    standard_error = result.stderr.decode()
    print(standard_error)
    # => 'three'
    ```

* Writing a program that prints to `stdout` and `stderr`

  ```py
  from sys import stdout, stderr

  # Method 1
  print('standard output', file=stdout)
  print('standard error', file=stderr)

  # Method 2
  stdout.write("standard output\n")
  stderr.write("standard error\n")
  ```

## Filepaths

```py
from pathlib import Path

filepath = Path.home() / 'Downloads' / 'meme.jpg'
```

## Function Parameters

There is a new function parameter syntax / to indicate that some function parameters must be specified positionally and cannot be used as keyword arguments

```py
def f(a, b, /, c, d, *, e, f):
    print(a, b, c, d, e, f)
```

One use case for this notation is that it allows pure Python functions to fully emulate behaviors of existing C coded functions. For example, the built-in `divmod()` function does not accept keyword arguments:

```py
def divmod(a, b, /):
    "Emulate the built in divmod() function"
    return (a // b, a % b)
```

## Python Image Library

```sh
pip install pillow
```

* Create Blank White PNG File

  ```py
  from PIL import Image
  Image.new('RGB', (1000,1000), (0xff, 0xff, 0xff)).save("image.png", "PNG")
  ```
