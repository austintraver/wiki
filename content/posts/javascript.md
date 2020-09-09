---
title: Javascript
image: "javascript.jpg"
date: 2020-03-02T01:28:22-08:00
draft: false
---

# Syntax

## Object [Property Accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors)

```js
const person1 = {};
person1['firstname'] = 'Mario';
person1['lastname'] = 'Rossi';

console.log(person1.firstname);
// expected output: "Mario"

const person2 = {
  firstname: 'John',
  lastname: 'Doe'
};

console.log(person2['lastname']);
// expected output: "Doe"
```

## Iteration

You can use [the `for ...  of` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) to iterate over an iterable object.

By default, if your iterator variable's mutability is not assigned with the `const`/`let` keywords, it is assumed to be a mutable variable.

* Loop over each element of the array:

  ```js
  const list = ['a', 'b', 'c'];

  for (element of list) {
    console.log(element)
  }
  ```

  Output

  ```txt
  a
  b
  c
  ```

* Loop over each element of the set:

  ```js
  const set = new Set([1, 1, 2, 2, 3, 3]);

  for (item of set) {
    console.log(item)
  }
  ```

  Output

  ```txt
  1
  2
  3
  ```

## Date & Time

* Construct a date from a string

```js
moment = new Date('2020-01-01')
```

* Construct a timestamp from a string

```js
// ISO 8601 format
moment = new Date('2020-01-01T04:05:06')

// RFC 3339 format
moment = new Date('2020-01-01 04:05:06')

// (year, month, day, hour, minute, seconds)
moment = new Date(2020, 1, 1, 4, 5, 6)

// UNIX Epoch
moment = new Date(1580544000000)
```

* Format a timestamp for a given region

```js
moment = new Date('2020-01-01')
formatter = new Intl.DateTimeFormat('en-US')
output = formatter.format(moment)
console.log(output)
```

Output

```txt
1/1/20
```

## Modifying the Document

* Modify the document to have an element placed at the top of the body

  ```js
  // Capture the 'target' element in a variable
  let target = document.getElementById("move-me")

  // Move it to the top of the document
  document.body.prepend(target)
  ```

* Remove an element from the document by id:

  ```js
  document.getElementById('pt-notifications-alert').remove()
  ```

* Remove all elements from the document of a certain class:

  ```js
  document.querySelectorAll('.portal').forEach(e => e.remove());
  ```

* Remove specific child of a certain element

  ```js
  document.querySelectorAll('#mw-navigation h2').forEach(e => e.remove());
  ```

## Event Listeners

  ```js
  const stylize = () => {
    /* do stuff */
  }
  document.addEventListener("load", stylize);
  ```


* Append an element to a list

  ```js
  let node = document.createElement("li");                 // Create a <li> node
  let textnode = document.createTextNode("water");         // Create a text node
  node.appendChild(textnode);                              // Append the text to <li>
  document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
  ```
