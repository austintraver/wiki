+++
title = "Javascript"
image = "javascript.jpg"
date = 2020-03-02T01:28:22-08:00
draft = false
+++

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
