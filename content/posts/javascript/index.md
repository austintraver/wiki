---
title: Javascript
date: 2020-03-02T01:28:22-08:00
description: 'You are building your own maze, in a way, and you might just get lost in it'
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

* Append an element to a list

  ```js
  let node = document.createElement("li");                 // Create a <li> node
  let textnode = document.createTextNode("water");         // Create a text node
  node.appendChild(textnode);                              // Append the text to <li>
  document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
  ```


## Event Listeners

An important concept in JavaScript is the ability to [listen for and handle events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events). When we *register* an **event listener**, we give the browser an instruction to wait for a particular action to occur in the browser, and the  the **event handler** contains the actual lines of code that will run when the event *fires*

(Aside: Web events are not part of the core JavaScript language, they are defined as part of the APIs built into the browser.)

### The [document `readyState` property](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState)

There are three values for `document.readyState`

* `loading`: The document is still loading
* `interactive`: The document has finished loading **everything except images, stylesheets, and frames**
* `complete`: The document has finished loading everything **including images, stylesheets, and frames**

When the value of this property changes, a [`readystatechange` event](https://developer.mozilla.org/en-US/docs/Web/API/Document/readystatechange_event) fires on the document object.

### The [document `DOMContentLoaded` event](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) { #DOMContentLoaded }

The DOMContentLoaded event fires when the initial HTML document has been
completely loaded and parsed, without waiting for stylesheets, images, and
subframes to finish loading.

{{% aside danger %}}
**Be careful:** `DOMContentLoaded` may fire before your script has a chance to
run, so it is wise to check before adding a listener.
{{% /aside %}}

* Call the function `initialize()` when the document has finished loading:

  ```js
  const initialize = () => {
    window.alert('DOM content has loaded')
  }

  /* If the document is not finished loading */
  if (document.readyState === 'loading') {
    /* Call initialize() as soon as the document has finished loading */
    document.addEventListener('DOMContentLoaded', initialize)
  }
  /* If the document has already finished loading */
  else {
    initalize()
  }
  ```


### The [window `load` event](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) { #load }

The load event is fired when the whole page has loaded, including all dependent
resources such as stylesheets and images. This is in contrast to
`DOMContentLoaded`, which is fired as soon as the page DOM has been loaded,
without waiting for resources to finish loading.

* Log a message after the window finishing loading the page

    ```js
    window.addEventListener('load', (event) => {
      console.log('The page has loaded');
    })
    ```

### The [`<script>` tag's `defer` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer)

Scripts with the `defer` attribute will prevent the `DOMContentLoaded` event
from firing until the script has loaded and finished evaluating.

It's also worth noting that scripts with the `defer` attribute will execute in
the order in which they appear in the document.

* If you're importing a
[module script](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules),
you don't need to include the `defer` attribute, a module script will defer
by default.


## Forms

* Access elements in a form that was just submitted

```js
form.addEventListener('submit', (event) => {
  let data = event.target.elements
  contacts.push({
    firstName: data['fname'].value,
    lastName: data['lname'].value,
    email: data['email'].value
  })
  event.preventDefault()
  return false
})
```

## The URL API { #url }

* Getting the `pathname` of the URL

  ```js
  let url = new URL('https://api.example.com/path')
  console.log(url)
  ```

  Output

  ```txt
  /path
  ```

* Setting the pathname

  ```js
  let url = new URL('https://api.example.com')
  url.pathname = '/details'

  console.log(url.href)
  ```

  Output

  ```txt
  https://api.example.com/details
  ```

* Setting a search parameter in the query string

  ```js
  let url = new URL('https://api.example.com/path?key=old')
  url.searchParams.set('key','new')
  console.log(url.search) // Line #1 of output
  console.log(url.searchParams.toString()) // Line #2 of output
  ```

  Output

  ```txt
  ?key=new
  key=new
  ```

* Appending a search parameter to the query string

  ```js
  let url = new URL('https://api.example.com/search')
  url.searchParams.append('query', 'hello world')

  console.log(url.href)
  ```

  Output

  ```txt
  https://api.example.com/search?query=hello+world
  ```

* Assigning a set of search parameters to the query string

  ```js
  let url = new URL('https://api.example.com/v2')
  url.pathname = '/list'
  url.search = new URLSearchParams({
    topic: 'coffee',
    limit: 20
  })

  console.log(url.href)
  ```

  Output

  ```txt
  https://api.example.com/list?topic=coffee&limit=20
  ```

* Creating a map object out of the key-value pairs in the query string

    ```js
    let params = new URL(window.location.href).searchParams
    let newform = new Map()
    for (let [key, value] of params.entries()) {
      newform[key] = value;
    }
    ```

## The Fetch API { #fetch }

There's [a great example](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) posted on Mozilla MDN, I'd consider checking it out.

* Example of a POST request using fetch

  ```js
  const data = { username: 'ttrojan' }

  fetch('https://example.com/profile', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  ```

# WebKit

* Notes from WebKit's article ["Console Command Line API"](https://webkit.org/web-inspector/console-command-line-api/)

    * `$_` stores the result of the last Console evaluation
    * `$0` equals the value of the currently selected DOM node in the Elements tab.
    * `$(#content)` is equivalent to `document.querySelector('#content')`

# Objects and Properties

I was reading Mozilla's article ["Objects and properties"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Objects_and_properties) and wanted to take notes on the content I found interesting.

To create an object, use an
[**object initializer**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects),
a list of properties, separated by commas, enclosed in curly braces

# Events

One of the hot methodologies in the JavaScript world is event delegation, and
for good reason.  Event delegation allows you to avoid adding event listeners
to specific nodes;  instead, the event listener is added to one parent.  That
event listener analyzes bubbled events to find a match on child elements.  The
base concept is fairly simple but many people don't understand just how event
delegation works.  Let me explain the how event delegation works and provide
pure JavaScript example of basic event delegation.

Let's also say that something needs to happen when the user clicks each child
element. You could add a separate event listener to each individual `<li>`
element, but what if `<li>` elements are frequently added and removed from
the list?  Adding and removing event listeners would be a nightmare, especially
if addition and removal code is in different places within your app. The better
solution is to add an event listener to the parent `<ul>` element. But if you
add the event listener to the parent, how will you know which element was
clicked?

Simple:  when the event bubbles up to the `<ul>` element, you check the event object's target property to gain a reference to the actual clicked node.  Here's a very basic JavaScript snippet which illustrates event delegation:Start by adding a click event listener to the parent element.  When the event listener is triggered, check the event element to ensure it's the type of element to react to.  If it is an `<li>` element, boom:  we have what we need!  If it's not an element that we want, the event can be ignored.  This example is pretty simple -- `<ul>` and `<li>` is a straight-forward comparison.  Let's try something more difficult.  Let's have a parent `<div>` with many children but all we care about is an A tag with the classA CSS class:

Start by adding a click event listener to the parent element.  When the event listener is triggered, check the event element to ensure it's the type of element to react to.  If it is an `<li>` element, boom:  we have what we need!  If it's not an element that we want, the event can be ignored.  This example is pretty simple -- `<ul>` and `<li>` is a straight-forward comparison.  Let's try something more difficult.  Let's have a parent `<div>` with many children but all we care about is an A tag with the classA CSS class:

Using the [Element.matches](https://davidwalsh.name/element-matches-selector) API, we can see if the element matches our desired target.

## Triggering Events

* Simulate a click on the browser with a function call:

    ```js
    function simulateClick() {
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        })
        // Evaluates to true if none of the handlers called preventDefault
        const dispatched = document.querySelector('#checkbox').dispatchEvent(event)
        if (dispatched) {
            alert("Event was not cancelled")
        }
        else {
            // None of the handlers called preventDefault.
            alert("Event was cancelled")
        }
    }
    ```

# The Clipboard API

The use of the clipboard requires permission, which you can get [using the Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API/Using_the_Permissions_API).

## Reading

Use the `Clipboard` object's [`readText()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText) and [`read()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read) methods.

* Read from the user's clipboard

    ```js
    let element = document.getElementById('p#contents')

    // Reveals the content of the user's clipboard
    async function reveal() {
        let text = await navigator.clipboard.readText()
        let 
    }



    let element = document.getElementById('p#result')
    navigator.clipboard.readText().then((pasteboard) => {
    element.innerText = pasteboard
    })
    ```


## Writing

{{% aside info %}}
The `clipboard-write` [permission](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) is granted automatically for the actively open page on the web browser
{{% /aside %}}

Use the `Clipboard` object's [
