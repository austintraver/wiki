+++
title = "Node"
description = "JavaScript meets back-end server hosting"
date = 2020-02-04T14:52:27-08:00
image = "awk.jpg"
+++

# Node.js

Node.js provides server-side functionality in familiar Javascript syntax and an asynchronous model.  To be clear, Node.js is not a programming language. It adds features to Javascript that allow developers to write server-side code in familiar front-end language.


## How It Works

As an interpreted language (like Python), Javascript requires a runtime engine to be run. How Node js functions as a server side language is its runtime engine allows it to interact with a server. In the browser, a Javascript engine provides access to Web Platform APIs and the window HTML (DOM). Node uses Google's V8 Javascript engine instead to access files, send data, and provide other server capabilities. The V8 engine powers Chrome, but there are other engines out there:

1. Firefox uses [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)
2. Safari uses [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore)
3. IE uses [who on 🌍 cares](https://github.com/Microsoft/ChakraCore)

Let me explain in a simple diagram:

```
   +-------------+               +---------------+
   |   BROWSER   |               |    SERVER     |
   |  Client JS  |               |    Node JS    |
   |-------------|               |---------------|
   |    Other    |               | V8 JS Engine  |
   |  JS Engine  |               |     (C++)     |
   +------+-+----+               +-------+--+----+
          | ^                            |  ^
          | |                            |  |
          | |                            |  |
          | +----+----------------+<-----+  |
          |      |   WEB SERVER   |         |
          +----> +----------------+---------+

```

The Chrome V8 Javascript engine provides C++ bindings for Javascript. The V8 Engine then passes events and data between the server and client.

Let's take a small example. Javascript has no concept of accessing system files, but in Node.js, we gain this functionality through modules. We'll get to modules later, but here's a small example of what you can do with Node.js using the built in filesystem module `fs`.

Create the following file, `helloworld.js`:
```js
const fs = require("fs")
console.log(fs.writeFileSync("file.md", "**Hello World!** Bet your browser JS can't do this!"))
```

Then in the console, run the file by typing `$ node helloworld.js`. This will create the file `file.md` with the text: `Hello World! Bet your browser JS can't do this!`.

Alternatively, you can run this in the `node` console. In your terminal, typing `node` creates a shell utilizing a REPL:
* Read
* Evaluate
* Print
* Loop

What this means is that as expressions are evaluated, their return value is printed in the console. You can invoke the REPL by just typing `node` in your terminal. Then, you can test what expressions are doing. Which is useful for debugging expressions and playing around with Javascript.

```
$ node
> a = 3
4
> ++_
5
```

{{% notice info %}}
**Warning:** In this example, we used `_` , which refers to the previous expression. However, this feature has been deprecated, and you'll get an annoying warning if you try to use it.
{{% /notice %}}

You'll notice that the return value is printed below each statement executed.

```sh
> v = "Vim"
'Vim'
> e = "Emacs"
'Emacs'
> console.log("I'm a pro since I use ", v)
I'm a pro since I use Vim
undefined
```
In the next example, we'll use dictionary and list data structures:
```
> listOfEditors = [v, e]
[ 'Vim', 'Emacs' ]
> editors = {}
{}
> editors[v] = "superior"
'superior'
> editors[e] = "inferior"
'inferior'
> editors
{ Vim: 'superior', Emacs: 'inferior }
```
You can exit the REPL by pressing `^D` or `^C^C`.


The `process` variable, only accessible to you in Node, not in the browser. `process` is a list of current tasks that Node is executing. Typing `process` in the REPL will dump a huge list and `process.exit()` command also exits the REPL.
```sh
$ node
> process
```

## Module System


Modules in Nodejs are essentially Javascript libraries. There are quite a few built-in libraries available by default in Nodejs, including (thanks to [W3 Schools](https://www.w3schools.com/nodejs/ref_modules.asp) for the rundown):

- `assert`	Provides a set of assertion tests
- `buffer`:	To handle binary data
- `child_process`:	To run a child process
- `cluster`:	To split a single Node process into multiple processes
- `crypto`:	To handle OpenSSL cryptographic functions
- `dgram`:	Provides implementation of UDP datagram sockets
- `dns`:	To do DNS lookups and name resolution functions
- `domain`:	Deprecated. To handle unhandled errors
- `events`:	To handle events
- `fs`:	To handle the file system
- `http`:	To make Node.js act as an HTTP server
- `https`:	To make Node.js act as an HTTPS server.
- `net`:	To create servers and clients
- `os`:	Provides information about the operation system
- `path`:	To handle file paths
- `punycode`:	Deprecated. A character encoding scheme
- `querystring`:	To handle URL query strings
- `readline`:	To handle readable streams one line at the time
- `stream`:	To handle streaming data
- `string_decoder`:	To decode buffer objects into strings
- `timers`:	To execute a function after a given number of milliseconds
- `tls`:	To implement TLS and SSL protocols
- `tty`:	Provides classes used by a text terminal
- `url`:	To parse URL strings
- `util`:	To access utility functions
- `v8`:	To access information about V8 (the JavaScript engine)
- `vm`:	To compile JavaScript code in a virtual machine
- `zlib`:	To compress or decompress files

**How to Import and Use a Module**:

To use a module, you simply *require* using the format:
```js
require('<module name>')
```

For example, to import and use the file system module `fs` just like we did above:

```js
const fs = require('fs')
fs.writeFileSync('helloNode.txt', '**That was easy!**™️🤓')
```

It's Nodejs convention to use the module name for variable used to call its functions.

**How to Import Your Own Modules**

## Importing Modules

To import and use code you wrote in another file, use the `require()` function, passing in the parameter of the filepath

* Importing code from the file `hello.js`

  ```js
  const helloWorld = require('./hello.js')
  ```

## The Core

Nodejs requires a few critical components that allow it to provide its functionality. These components are:

1. the Global objects
2. Timer methods
3. Socket and Stream functionality
4. the Utilities object
5. Events

These objects are also what separate Nodejs applications from vanilla Javascript code.


### Global objects
There are three primary global objects available in Nodejs. They are:

1. `global`
2. `process`
3. `Buffer`

Each of these objects are in a Node application's namespace, meaning a `require` statement is _not required_ (bad pun intended).

Variables and required objects are accessible within the application's namespace. This access is restricted to the variables within the application, meaning you are unable to change the value of variables in other other modules. This prevents accidental collisions when code from another module runs.

The process object provides access to the Node installation, the three methods of standard I/O (stdin, stderr, stdout), and application memory usage.

The Buffer object handles binary data. You can read any type of data through a buffer, including a file, input stream, or network connection. A Buffer object take up to two parameters:

`Buffer(<input-data>, <encoding>)`

- `<encoding>` (default: **UTF-8**) optional parameter

### Timers

Timers in Nodejs allow programmers to delay and schedule execution of functions. The timer module includes the functions:

- `setTimeout `
- `clearTimeout `
- `setInterval `
- `clearInterval`



### Sockets and Streams

There are four major types of streamed connections in Nodejs:
1. TCP - `net` module
2. HTTP - `http` module
3. UDP/Datagram Socket - `dgram` module
4. Readline/Child_Process - `readline`, `child_process` modules

Using a TCP connection, we can recieve messages from client's standard input on the server program. The `process` is used directly here to access standard I/O streams.


For example:


* Example of a TCP Server:

  ```js

  var net = require('net')

  var server = net.createServer( (conn) => {
          console.log('connected')

          conn.on('data', (data) => {
                  console.log(data + ' from ' + conn.remoteAddress + ' ' +
                          conn.remotePort)
                  conn.write('Repeating: ' + data)
          })

          conn.on('close', () => {
                  console.log('client closed connection')
          })
  }).listen(8124)

  console.log('listening on port 8124')


  ```

* Example of a TCP Client:

  ```js

  var net = require('net')

  var client = new net.Socket()
  client.setEncoding('utf8') // opional

  // connect to server
  client.connect ('8124', 'localhost', () => {
          console.log('connected to server')
          client.write('Who needs a browser to communicate?!')
  })

  // prepare for input from terminal
  process.stdin.resume()

  // when receive data, send to the server
  process.stdin.on('data', (data) => {
          client.write(data)
  })

  // when receive data back, print to console
  client.on('data', (data) => {
          console.log(data)
  })

  // when serves closed
  client.on('close', () => {
          console.log('connection is closed')
  })
  ```

## Working with I/O

The `.pipe(<stream>)` is used to send the ouput of one stream to another.

* Sending the output of one process to another:

  ```js
  process.stdin.pipe(process.stdout)
  ```

### Reading streams with `readline`
The readline module allows the reading of standard I/O streams line by line during program execution. When the programmer is done reading a stream, they must be closed. The REPL is implemented by piping your terminal input `stdin`, executing Javascript commands and piping `stdout` back to your terminal.

### Using system streams with `child_process`

Using the `child_process` module, a Node application can make system calls and recieve input from standard I/O. We do this in Node by defining a child process and redirecting its input and output by defining functions for whenever specific input is recieved.

For example, let's take the command `ls`:

* Defining a function call

  ```js
  // format: `spawn("<name>" , [ "flag1", "flag2", ...])`
  const { spawn } = require('child_process')
  const ls = spawn('ls', ['-la'])
  ```

You can specify how the function interacts with I/O by using the `.on()` method

Specifying how `ls()` interacts with `stdin`, `stdout`, and `stderr`:

  ```js
  ls.stdout.on('data', (data) => {
    console.log(`The output of ls is ${data}`)
  })

  ls.stderr.on('data', (data) => {
    console.log(`ls exited with error ${data}`)
  })

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  }
  ```



The program below illustrates an elaborate way to execute the command: `ls | grep "fork"`

* Simulating the execution of the shell command `ls | grep "fork"`

  ```js
  const {spawn} = require('child_process');
  const ls = spawn('ls')
  const grep = spawn('grep', ['fork']);

  ls.stdout.on('data', (data) => {
    grep.stdin.write(data);
  });

  ls.stderr.on('data', (data) => {
    grep.stderr.write(`Error: ${data}`)
  })

  ls.on('close', (code) => {
    grep.stdin.end()
  });

  grep.stdout.on('data', (data) => {
    grep.stdout.write(data.toString())
  })
  ```

### Utilities

The utilities object enables inheritance in Node. An object can be inherited by another object using the `inherits` function:

`util.inherits(<source-object>, <target-object>)`

### Events & EventEmitter

As mentioned previously, event based programming is fundamental to the Node philosophy. The `events` module allows programmers to define actions for events much like `try/catch` blocks in Java and C++ or `try/except` blocks in Python. This method of programming puts the programmer in an event driven mindset to focus on all the events that a program must handle. Node modules are written to minimize the amount of boilerplate code written and shift focus to the actions.

Here are the steps to define an event:

1. require: `require('events')`
2. instantiate
3. define the **callback**
4. define the **event**

* Defining and triggering an event:

  ```js
  // import specific module function to use
  var eventEmitter = require('events').EventEmitter
  var counter = 0

  // create an event emitter object
  var em = new eventEmitter()

  // define a callback when the event 'timed' occurs
  em.on('timed', (data) => console.log('timed ' + data))

  // trigger the event for example
  setInterval( () => em.emit('timed', counter++), 3000)
  ```

# JavaScript

## Data Types

JavaScript has primitive data types, which are immutable

1. Number
2. String
3. Boolean
4. Null
5. Undefined
6. Symbol

JavaScript also has some built-in objects

1. Array
2. Date
3. RegExp
4. Map & WeakMap
5. Set & WeakSet

### Specifying Integer Type

* Specifying integers using different formats:

  ```js
  let val = 10
  let hex = 0x2f // (47)
  let exponential = 1.2e4 // (1.2 * 10^4)
  let max = Infinity
  let min = -Infinity
  ```

### Number Properties

* Specifying values using the properties of `Number`:

  ```js
  let maxValue = Number.MAX_VALUE
  let minValue = Number.MIN_VALUE

  let maxInt = Number.MAX_SAFE_INTEGER
  let minInt = Number.MIN_SAFE_INTEGER
  ```

## Special Characters

|Code|Description|
|:---:|:---:|
|`\n`|newline|
|`\r`|carriage return|
|`\t`|horizontal tab|
|`\'`|single quote|
|`\$`|dollar sign|
|`\\`|back-slash|
|`\b`|backspace|
|`\f`|form feed|
|`\v`|vertical tab|
|\&grave;|grave symbol|

### String Substitutions

* Using the backtick syntax to substitue a variable's value inside of a string.

```js
const temp = 22.5
console.log(`The value is ${temp}`)
```

### `null` and `undefined`

* A variable is `undefined` when it is initialized without being assigned a value.
* A variable is only `null` when it is assigned as such

## Objects

* Creating an object:

  ```js
  const person = {
    name: "Austin",
    age: 21
  }
  ```

## UTF-8

A variable can be defined using normal letters, as well as UTF-8 characters

* Creating a variable using UTF-8 characters

  ```js
  const 你好 = "Hello"
  console.log(你好)
  // => "Hello"
  ```

## Arrow Functions

Arrow functions allow us to give a function an identifier.

```js
// After this has been written, we can now call the identifier and give it input
const squareIt = (x) => x * x

squareIt(10) // '100'
```

## Equality '==' vs. '==='

* `===` is known as the *identity operator*
* `==` is known as the *equality operator*

The identity operator `===` will compare both types and values between two variables. JavaScript objects are compared by reference, not by value. An object is equal to itself, but not equal to a different object with the same value.

* Examples of the two operators being different:

  ```js
  true === '1' // false
  true == '1' // true

  true === 1 // false
  true == 1 // true

  null === undefined // false
  null == undefined // true
  ```

* Examples of the two operators being the same:

  ```js
  [1, 2] === [1, 2] // false
  [1, 2] == [1, 2] // false

  0 === 0.0 // true
  0 == 0.0 // true
  ```


Some edge cases worth noting:

* The equality operator `==` will attempt to convert the two variables
* Not a number or `NaN` is not equal in comparison to anything, even with itself

  ```js
  NaN === NaN // false
  NaN == NaN // false
  x = NaN
  x === NaN // false
  x !== x // true
  ```

## the "in" operator

The `in` operator evaluates to true if the left-side value is the name of a property of the right-side object

```js
const data = [7, 8, 9]
"0" in data // true: array has an element "0"
1 in data // true: numbers are converted into strings
7 in data // false: no 7th element in this array
```

## GitHub Package Registry

Add the following two lines to your `~/.npmrc`

```txt
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
registry = https://npm.pkg.github.com
```

Add the `read:packages` and `write:packages` permissions to your `GITHUB_TOKEN` environment variable in the [GitHub tokens page](https://github.com/settings/tokens)

### Install a Package

To add [this Package](https://github.com/Codertocat/hello-world-npm/packages/10696) registered on the GitHub NPM Registry, enter the following command

```sh
npm install @codertocat/hello-world-npm
```

Alternatively, you can add the package as a dependency to the project's `package.json`

```json
{
  "name": "testjs",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@codertocat/hello-world-npm": "^1.0.2"
  }
}
```

### Publish a Package

Add the following to your package's `package.json`

```json
{
  "publishConfig": {
    "registry":"https://npm.pkg.github.com/"
  }
}
```

### Files

* Convert relative path `./file.txt` to absolute path `/Users/tommy/file.txt`

  ```js
  let absolute_filepath = path.resolve('./file.txt')
  // => /Users/tommy/file.txt
  ```



* Convert local file `./file.txt` to `file://` URI form:

  ```js
  let uri = url.pathToFileURL('./file.txt')
  console.log(uri)
  /*
  [ Output ]
  URL {
    href: 'file:///Users/austin/hooman/node.html',
    origin: 'null',
    protocol: 'file:',
    username: '',
    password: '',
    host: '',
    hostname: '',
    port: '',
    pathname: '/Users/austin/hooman/node.html',
    search: '',
    searchParams: URLSearchParams {},
    hash: ''
  }
  */
  ```