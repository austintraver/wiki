+++
title = "CSS"
description = "Coding with style(sheets)"
date = 2020-02-23T02:15:43-08:00
draft = false
image = "css.jpg"
+++

## Font Size

The `em` (pronounced as it sounds), is a unit of relative font sizing in CSS. Specifying `2em` tells an element to be twice the size of its parent element.

{{% notice danger %}}
**Be careful!** This means that if you have nested items, they will continue doubling in size. For this reason, it is best to use the `rem` (*root* `em`) unit, which is a constant value relative to that of the root `<html>` tag. In most browsers, this defaults to 16px.
{{% /notice %}}

## Variables

* Declaring and using a variable

  ```css
  /* Use the root pseudoselector to allow access to this variable everywhere */
  :root {
    --red: #df7e67;
  }

  /* Use the var() function to reference the value stored in a variable */
  a:hover {
    color: var(--red);
  }
  ```

## Custom Font Faces

* Declaring a new font face

  ```css
  /* Normal font style */
  @font-face {
    font-family: "example";
    font-style: normal;
    font-weight: lighter;
    src: url("https://link.to/myfont.ttf");
  }

  /* Italic font style */
  @font-face {
    font-family: "example";
    font-style: italic;
    font-weight: normal;
    src: url("https://link.to/myfont.ttf");
  }

  /* Bold font style */
  @font-face {
    font-family: "example";
    font-style: normal;
    font-weight: bolder;
    src: url("https://link.to/myfont.ttf");
  }
  ```

* Referencing a custom font-face

  ```css
  h2 {
    font-family: "example";
  }
  ```


## Custom Styling for Dark-Mode Users

```css
/* Apply styling only to dark-mode users */
@media(prefers-color-scheme: dark) {
  body {
    /* Add a dark gray background */
    background-color: rgb(40,44,51);
    /* Make fonts render in white */
    color: white;
  }
}
```

## Frosted Glass behind Element

A common cool effect is to have a slightly transparent, cool glassy effect behind an element. This used to be very difficult to add, but is now very simple thanks to the `backdrop-filter` property.

```css
/* Create a frosted glass effect behind the banner */
div#banner {
  border-color: white;
  border-style: solid;
  text-align: center;
  background-color: rgb(255, 255, 255, 50%);
  backdrop-filter: 4px;
}
```