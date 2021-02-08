---
title: Python
description: "The best programming language"
date: 2020-02-04T14:52:27-08:00
---

# Python

* Following this will default to the newest version of Python, which is version 3. For backwards compatibility reasons, `python` will refer to Python 2. However this version will be deprecated at the end of 2019.

* On macOS

Installing Python on macOS via Homebrew, at the time of writing, will not install the most current version of Python available, despite it being released 5 months ago.

  ```shell script
  brew install python@3.8

  # Add to .zshenv
  path=(/usr/local/opt/python@3.8/libexec/bin ${path})
  ```

* On Debian

  ```shell script
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

```shell script
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

* Adding items to a set:

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

* Create a dictionary, using the elements of a set as the keys

  ```py
  names = set({'Tommy', 'Tina', 'Traveler'})
  default_value = '+1 (123) 456-7890' 
  contacts = dict({name: default_value for name in names})
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

```shell script
jupyter notebook --generate-config
```

```shell script
pass="letmein"
python -c "from notebook.auth import passwd; print(passwd('${pass}'))"
```

### Setting Up `pylint`

* On macOS

  ```shell script
  pip install pylint
  export PATH="~/Library/Python/3.7/bin:${PATH}"
  ```

* On Debian

  ```shell script
  sudo apt install pylint
  ```

```shell script
pylint --generate-rcfile > ~/.pylintrc
```

If `pylint` notifies you about a linting error that you don't like, add it as an entry, seperated by a comma, to `disable`. e.g.

```txt
disable=missing-docstring,
        invalid-name,
        bare-except
```

## Plotly

### Getting Started

Plotly is a visualization tool you can install with `pip3 install plotly`. You can create an account at [plot.ly](https://plot.ly) and generate an API key. Once you have, edit the `~/.plotly/.credentials` and insert the following information.

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

{{% aside success %}}

**Tip:** When using a jupyter notebook, use the `iplot()` method, which will plot the data inline. If you'd like the graph to be shared with others, use the `plot()` method.

{{% /aside %}}

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

{{% aside danger %}}

**Warning:** Your graph will not appear if you don't call the `init_notebook_mode()` method first!

{{% /aside %}}

The only big difference between plotting online and plotting offline is whether to use `plotly.plotly` or `plotly.offline` for your import. Both will include the `plot()` and `iplot()` methods.

## Regular Expressions

Use the `re` library for regular expressions in python. Regular expression patterns are created by calling `re.compile()` which accepts two arguments, a raw string, and flags. To specify multiple flags, specify each with the bitwise OR operator `|`

Regular Expression Flags

|  Flag  |                                                           Function                                                           |
|:------:|:----------------------------------------------------------------------------------------------------------------------------:|
| `re.A` |                                         Make the pattern match only ASCII characters                                         |
| `re.I` |                                              Make the pattern case insensitive                                               |
| `re.M` | The `^` & `$` special characters match the start/end of each line in a string, instead of the start/end of the string itself |
| `re.S` |                                     Allow the `.` character to match newline characters                                      |
| `re.X` |                             Ignore whitespace in the pattern definition, and allow for comments                              |
|        |                                                                                                                              |

[Special Characters](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior)

| Special Character |                                               Function                                               |
|:-----------------:|:----------------------------------------------------------------------------------------------------:|
|         +         |                                           Match 1 or more                                            |
|        \*         |                                           Match 0 or more                                            |
|         ?         |                                                0 or 1                                                |
|        {k}        |                       Match k consecutive occurances of the preceeding pattern                       |
|       {m,n}       | Match from m to n consecutive occurences (inclusive) of the preceeding pattern (as many as possible) |
|      {m,n}?       | Match from m to n consecutive occurrences (inclusive) of the preceeding pattern (as few as possible) |
|         .         |                              Match any character except a newline `\n`                               |
|         ^         |                                    Match the start of the string                                     |
|         $         |                                       Match the end of string                                        |
|         (         |                                  Specify the start of capture group                                  |
|         )         |                                   Specify the end of capture group                                   |


Escaped Characters


| Escaped Character |         Matches         |
|:-----------------:|:-----------------------:|
|       `\t`        |     Horizontal tab      |
|       `\v`        |      Vertical tab       |
|       `\n`        |         Newline         |
|       `\f`        |        Form feed        |
|       `\r`        |     Carriage return     |
|       `\w`        |     `[a-zA-Z0–9_]`      |
|       `\d`        |         `[0–9]`         |
|       `\s`        |     `[\t\n\r\f\v]`      |
|       `\b`        | Specify a word boundary |

Coding example

```py
# Import the RegEx library
import re

# Create a raw-string pattern
pattern = re.compile(r'http[s]?://([^/?:]+)', re.A|re.I)
# Search for the text matching the pattern in "sample"
text = 'https://helpful.wiki/python'
```

```py
match = pattern.search(text)
print(match.group(0))
```

```txt
# => https://helpful.wiki
```

```py
print(match.group(1))
```

```txt
# => helpful.wiki
```

## Dates, Times, Timestamps

ISO8601 and RFC3339 are the documents that outline how date and time should be denoted on computers. `1996-12-20T00:39:57Z` is an example of an ISO8601 timestamp. The `Z` denotes that this timestamp is in *zulu time*, the UTC timezone. The UTC timezone is *Coordinated Universal Time* and, depending on the time of year, is either 7 or 8 hours ahead of the time in California. The equivalent time in California would be represented as `1996-12-19T16:39:57-08:00`

### [`strftime` and `strptime`](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior)


The `datetime` library has a few packages:

* `datetime.date`
* `datetime.time`
* `datetime.datetime`
* `datetime.timedelta`
* `datetime.timezone`
* `datetime.tzinfo`

* Working with ISO formatted timestamp strings

    ```py
    import datetime
    import time

    event = datetime.date.fromisoformat("2018-12-31")
    # -00:00 is an illegal format but Python will interpret it successfully
    event = datetime.datetime.fromisoformat("2018-12-31T12:31:58-08:00")
    # Using whitespace seperator instead of 'T' character
    event = datetime.datetime.fromisoformat("2018-12-31 04:31:58+00:00")
    ```

* Parsing a non-ISO date into a `datetime` object

    ```py
    moment = datetime.strptime('05-19-2018', '%m-%d-%Y')
    print(moment)
    ```

    {{% samp %}}

    datetime.datetime(year=2018, month=5, day,19, hour=0, second=0)

{{% /samp %}}
    

Parsing a non-ISO timestamp into a `datetime` object

```py
moment = datetime.strptime('10-05-2017 05:00:00 PM', '%m-%d-%Y %I:%M:%S %p')
print(moment)
```

Output

```txt
datetime.datetime(year=2017, month=10, day=5, hour=17, second=0)
```

Working with daylight savings

```py
# If it's currently daylight savings
if time.daylight:
tz = time.altzone
# => 25200 (# of seconds offset from UTC)

else:
tz = time.timezone
# => 28800 (# of seconds offset from UTC)

print(time.tzname)
# => ('PST', 'PDT')
```

Working with local timezones

```py
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

Getting the local timezone information

```py
import datetime
timezone = datetime.datetime.now().astimezone().tzinfo
```

Setting the timezone

```py
import time
import os
os.environ['TZ'] = 'US/Eastern'
time.tzset()
print(time.tzname)
# => ('EST', 'EDT')
```

Printing out all available timezones

    ```py
    from zoneinfo import ZoneInfo
    from pathlib import Path
    for area in ['America', 'Europe', 'Asia', 'Africa', 'Australia', 'Antarctica', 'Etc']:
        print(area)
        for zone in Path('/usr/share/zoneinfo').glob(f'{area}/*'):
            print(f'\t/{zone.name}')
    ```

Some common timezones have been included below:

    ```py
    from zoneinfo import ZoneInfo
    # Constructing a timezone object
    tz = timezone('America/Los_Angeles')

    # Other valid timezones included below
    ZoneInfo('Pacific/Honolulu') # -10:00
    ZoneInfo('America/Juneau') # -09:00
    ZoneInfo('America/Los_Angeles') # -08:00
    ZoneInfo('America/Denver') # -07:00
    ZoneInfo('America/Chicago') # -06:00
    ZoneInfo('America/New_York') # -05:00
    ZoneInfo('Europe/London') # +00:00
    ZoneInfo('Europe/Paris') # +01:00
    ZoneInfo('Europe/Athens') # +02:00
    ZoneInfo('Europe/Moscow') # +03:00
    ZoneInfo('Asia/Tehran') # +03:30
    ZoneInfo('Asia/Dubai') # +04:00
    ZoneInfo('Asia/Kabul') # +04:30 (capitol of Afghanistan)
    ZoneInfo('Asia/Dushanbe') # +05:00 (capitol of Tajikstan)
    ZoneInfo('Asia/Kathmandu') # +05:45 (capitol of Nepal)
    ZoneInfo('Asia/Dhaka') # +06:00 (capitol of Bangladesh)
    ZoneInfo('Asia/Bangkok') # +07:00
    ZoneInfo('Asia/Shanghai') # +08:00
    ZoneInfo('Asia/Tokyo') # +09:00
    ZoneInfo('Australia/Sydney') # +10:00
    ZoneInfo('Asia/Noumea') # +11:00 (capitol of New Caledonia)
    ZoneInfo('Pacific/Fiji') # +12:00
    ```

## Custom Module Locations

If you have your own modules that you want to use, there's a way to tell `python` where to look for a module that are added by the `import` keyword.

To do this, set the environment variable `PYTHONPATH` in your shell, and export that variable. For example, `export PYTHONPATH=~/example/python/modules`. Now, all of the folders within this directory will be considered a module. For instance, if `~/example/python/modules/ex` was a folder containing python code, now you'd be able to type `import ex` in future python programs.

{{% aside danger %}}

**Warning:** If you forget to call `export`, `python` will be unable to reference the `PYTHONPATH` variable.

{{% /aside %}}


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

    ```shell script
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

```shell script
pip install pillow
```

* Create Blank White PNG File

  ```py
  from PIL import Image
  Image.new('RGB', (1000,1000), (0xff, 0xff, 0xff)).save("image.png", "PNG")
  ```

# Comprehension

## List Comprehension

  ```py
  text = "some text"
  letters = [char for char in text if x !=" "]

  print(letters)
# => ['s', 'o', 'm', 'e', 't', 'e', 'x', 't']
  ```

## Set Comprehension

* Perform set comprehension using a conditional statement:

  ```py
  cubed_even_numbers = set({value**3 for value in range(1,10) if value % 2 == 0})

  print(cubed_even_numbers)
  # => {8, 64, 512, 216}
  ```

## Iterables

Iterable is a “sequence” of data, you can iterate over using a loop. 

The easiest visible example of iterable can be a list of integers, such as `[1, 2, 3, 4, 5, 6, 7]`

However, it’s possible to iterate over other types of data like a `str()`, `dict()`, `tuple()`, `set()`, etc.

* Verify an object is iterable by checking that it has defined the `iter()` method

```py
print(hasattr(str, '__iter__'))
# => "True"

print(hasattr(bool, '__iter__'))
# => "False"
```

## Parsing Arguments

Attached below is a program I made to import CSV data exported from my Apple Card into the budgeting software YNAB

```py
import webbrowser
from datetime import datetime
from sys import exit
from json import load, dumps
from os import getenv
from sys import stdin, stdout, stderr, argv
from csv import DictReader, DictWriter
from urllib.request import Request, urlopen

from argparse import ArgumentParser, FileType

parser = ArgumentParser(
    prog='ynab',
    usage='%(prog)s [CSV_FILE]',
    description='%(prog)s: a data pipeline'
)
parser.add_argument(
    '-v',
    "--verbose",
    dest='verbose',
    action='store_true',
    help='option to print CSV to stdout'
)
options = parser.parse_args()

endpoint = 'https://api.youneedabudget.com/v1/budgets/last-used'


def get_account_id():
    account_request = Request(
        url=f'{endpoint}/accounts'
    )

    account_request.add_header('Authorization', f'Bearer {api_token}')

    account_response = urlopen(account_request)
    accounts = load(account_response)['data']['accounts']

    ynab_account_id = None

    for account in accounts:
        if account['name'] == 'Apple Card':
            ynab_account_id = account['id']

    if ynab_account_id is None:
        raise (ValueError('ynab: unable to find account "Apple Card"\n'))

    return ynab_account_id


if (api_token := getenv('YNAB_TOKEN')) is None:
    exit('ynab: expected environment variable ${YNAB_TOKEN}')

# Force input to be provided via file redirection
if stdin.isatty():
    if len(argv) == 1:
        stderr.writelines([
            'ynab: please supply the CSV file via standard input\n',
            '\tusage: `ynab < ./Downloads/apple.csv > ~/ynab.csv`\n'
        ])
        exit(2)

apple_csv = DictReader(
    f=stdin,  # The file to read from (standard input)
    fieldnames=None,  # Assume the CSV file's first row contains the field names
    dialect='unix',  # Specify the encoding method for the CSV file
)

expected_fields = [
    'Transaction Date',
    'Clearing Date',
    'Description',
    'Merchant',
    'Category',
    'Type',
    'Amount (USD)'
]

if apple_csv.fieldnames != expected_fields:
    stderr.writelines([
        'ynab: problem reading CSV header row\n',
        f'\texpected:\t{expected_fields}\n',
        f'\treceived:\t{apple_csv.fieldnames}\n'
    ])
    exit(1)

ynab_csv = DictWriter(
    f=stdout,  # The file to write to (standard output)
    fieldnames=['Date', 'Payee', 'Memo', 'Amount'],  # Specify the field names
    dialect='unix',  # Specify the encoding method for the CSV file
)

csv_transactions = list()

api_transactions = list()

account_id = get_account_id()

# Create a list of api_transactions
for row in apple_csv:

    # Format the date from 2020/01/13 to 2020-01-13
    date = datetime.strptime(
        row['Transaction Date'], '%m/%d/%Y'
    ).date().isoformat()

    # Write an entry to the CSV file
    csv_transactions.append({
        'Date': date,
        'Payee': row['Merchant'],
        'Amount': '{:.2f}'.format(float(row['Amount (USD)']) * -1),
        'Memo': ''
    })

    # Store the next transaction as a dictionary, append it to the list
    api_transactions.append({
        'account_id': account_id,
        'date': date,
        'payee_name': row['Merchant'],
        'cleared': 'cleared',
        'approved': False,
        'amount': int(float(row['Amount (USD)']) * -1_000)
    })


if options.verbose:
    # Write the header row to the CSV file (the field names)
    ynab_csv.writeheader()
    # Write each transaction in the list to a row in the CSV file
    ynab_csv.writerows(csv_transactions)

data = {
    'transactions': api_transactions
}

transaction_request = Request(
    headers={
        'Authorization': f'Bearer {api_token}',
        "Content-Type": 'application/json',
    },
    url=f'{endpoint}/transactions',
    data=dumps(data).encode('utf-8')
)

transaction_response = urlopen(transaction_request)
# print(f'ynab: successfully imported {len(api_transactions)} into YNAB')

# Open YNAB for the user on their default web browser
webbrowser.open('https://app.youneedabudget.com')
```

## Sockets

* Find the IPv4 address for hostname `google.com`

  ```shell script
  import socket
  print(socket.gethostbyname('google.com'))
  ```

  Output

  ```txt
  172.217.5.110
  ```

## Strings

There's two main ways to substitute values into the contents of the template string. You can use [formatted string literals](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals) (more commonly known simply as "f-strings"), or you can use the [old string formatting](https://docs.python.org/3/tutorial/inputoutput.html#old-string-formatting) method, which uses the modulo `%` operator, reminiscent of the C-style `printf()` syntax.

* Example using old-school string formatting:

    ```py
    # Set variables
    age_of_austin = 23
    age_of_val = 22

    # Format the string
    output = 'Austin is %d and Val is %d' % (age_of_austin, age_of_val)

    # Print the formatted string
    print(output)
    ```

    ```txt
    Austin is 23 and Val is 22
    ```

* Example using formatted string literals:

    ```py
    # Set variables
    age_of_austin=23
    age_of_val=22

    # Format the string
    output = f'Austin is {age_of_austin} and Val is {age_of_val}'

    # Print the formatted string
    print(output)
    ```

    ```txt
    Austin is 23 and Val is 22
    ```

## Python Caching

You can disable python caching entirely, preventing `.pyc` files from being written when source modules are imported.

* As an environment variable

    ```txt
    PYTHONDONTWRITEBYTECODE=1 
    ```

* As a command line argument

    ```shell script
    python -B script.py
    ```

```txt
Python won’t try to write .pyc files on the import of source modules. See also PYTHONDONTWRITEBYTECODE.
```

Starting from Python 3.8, you can configure the environment to prevent Python from reading and writing `__pycache__` directories, sourcing them instead from a separate location on the filesystem, specified by you.

* As an environment variable

    ```txt
    PYTHONPYCACHEPREFIX=path
    ```

* As a command-line option

    ```txt
    python -X pycache_prefix=path
    ```

* Setting from within `pythonrc.py`

    ```txt
    from pathlib import Path
    sys.pycache_prefix
    ```

## `plistlib`

* Convert an Apple Property List`.plist` file into a Python dictionary `dict()` object

    ```py
 
    import plistlib
    from pathlib import Path
    filepath = '/System/Applications/Utilities/Terminal.app/Contents/Info.plist'
    path = Path(filepath)
    plist = plistlib.load(path.open('rb'))
    ```

## Email

Gmail's API requires a MIME type, but teaches you [how to create a MIME message](https://developers.google.com/gmail/api/guides/sending#creating_messages) in their documentation.

* Creating a MIME type message:

    ```py
    def create_message(sender, to, subject, message_text):
    """Create a message for an email.

    Args:
        sender: Email address of the sender.
        to: Email address of the receiver.
        subject: The subject of the email message.
        message_text: The text of the email message.

    Returns:
        An object containing a base64url encoded email object.
    """
    message = MIMEText(message_text)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    return {'raw': base64.urlsafe_b64encode(message.as_string())}

    ```

* Adding attachments to a MIME type message

    ```py

    def create_message_with_attachment(
        sender, to, subject, message_text, file):
    """Create a message for an email.

    Args:
        sender: Email address of the sender.
        to: Email address of the receiver.
        subject: The subject of the email message.
        message_text: The text of the email message.
        file: The path to the file to be attached.

    Returns:
        An object containing a base64url encoded email object.
    """
    message = MIMEMultipart()
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject

    msg = MIMEText(message_text)
    message.attach(msg)

    content_type, encoding = mimetypes.guess_type(file)

    if content_type is None or encoding is not None:
        content_type = 'application/octet-stream'
    main_type, sub_type = content_type.split('/', 1)
    if main_type == 'text':
        fp = open(file, 'rb')
        msg = MIMEText(fp.read(), _subtype=sub_type)
        fp.close()
    elif main_type == 'image':
        fp = open(file, 'rb')
        msg = MIMEImage(fp.read(), _subtype=sub_type)
        fp.close()
    elif main_type == 'audio':
        fp = open(file, 'rb')
        msg = MIMEAudio(fp.read(), _subtype=sub_type)
        fp.close()
    else:
        fp = open(file, 'rb')
        msg = MIMEBase(main_type, sub_type)
        msg.set_payload(fp.read())
        fp.close()
    filename = os.path.basename(file)
    msg.add_header('Content-Disposition', 'attachment', filename=filename)
    message.attach(msg)

    return {'raw': base64.urlsafe_b64encode(message.as_string())}
    ```

* Sending messages

    ```py
    def send_message(service, user_id, message):
    """Send an email message.

    Args:
        service: Authorized Gmail API service instance.
        user_id: User's email address. The special value "me"
        can be used to indicate the authenticated user.
        message: Message to be sent.

    Returns:
        Sent Message.
    """
    try:
        message = (service.users().messages().send(userId=user_id, body=message)
                .execute())
        print 'Message Id: %s' % message['id']
        return message
    except errors.HttpError, error:
        print 'An error occurred: %s' % error
    ```
