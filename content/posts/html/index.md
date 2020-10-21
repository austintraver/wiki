---
title: HTML
description: "Writing stuff down the hard way"
date: 2020-02-04T14:52:27-08:00
---

# HTML

## Getting Started

* A basic HTML page about bears

```html
<!doctype HTML>
<html>
<head>
</head>
<body>
  <h1>The Brown Bear</h1>
  <div id="introduction">
    <h2>About Brown Bears</h2>
    <p>The brown bear (<em>Ursus arctos</em>) is native to parts of northern Eurasia and North America. Its conservation status is currently <strong>Least Concern</strong>.<br /><br /> There are many subspecies within the brown bear species, including the Atlas bear and the Himalayan brown bear.</p>
    <h3>Species</h3>
    <ul>
      <li>Arctos</li>
      <li>Collarus</li>
      <li>Horribilis</li>
      <li>Nelsoni (extinct)</li>
    </ul>
    <h3>Features</h3>
    <p>Brown bears are not always completely brown. Some can be reddish or yellowish. They have very large, curved claws and huge paws. Male brown bears are often 30% larger than female brown bears. They can range from 5 feet to 9 feet from head to toe.</p>
  </div>
  <div id="habitat">
    <h2>Habitat</h2>
    <h3>Countries with Large Brown Bear Populations</h3>
    <ol>
      <li>Russia</li>
      <li>United States</li>
      <li>Canada</li>
    </ol>
    <h3>Countries with Small Brown Bear Populations</h3>
    <p>Some countries with smaller brown bear populations include Armenia, Belarus, Bulgaria, China, Finland, France, Greece, India, Japan, Nepal, Poland, Romania, Slovenia, Turkmenistan, and Uzbekistan.</p>
  </div>
  <div id="media">
    <h2>Media</h2>
    <img src="https://helpful.wiki/images/brownbear.jpg" alt="A Brown Bear"/>
        <video src="https://helpful.wiki/videos/brownbear.mp4" controls>Video not supported</video>
  </div>
</body>
</html>
```

## Character Entities

Imagine the following situation: you're writing an HTML page, and you want to type the expression `<div>`. Perhaps that's the exact situation I'm in as I write this page...

```html
<!-- See why this won't work? -->
<h1>
  A section on <div>
</h1>
```

Sometimes you want to specify a character that has a special meaning, such as `>` in the example above. To prevent errors from occurring when rendering your page, HTML gives you the option to specify character entities by a reference code.

### Code Point Numbers

You can refer to any character with its corresponding *code point numbers*. I've included some examples for referencing some ASCII characters by their code points, but you can refer to any character in Unicode's UTF-8 Universal Character Set (UCS) by specifying its corresponding code points.

### Character Entity References

As of HTML5, there is support for using [character entity references](https://www.w3schools.com/html/html_entities.asp) as an alternative to code point numbers. A character entity reference, when stated, replaces itself with the character you are trying to specify.

W3C's [character entity reference chart](https://dev.w3.org/html5/html-author/charref) is a good place to look to quickly find a particular character entity.

### Examples

Writing the `$` character (ASCII Code Point \#36):

* Decimal Notation: `&#36;`
* Hex Notation: `&#x24;`
* Character Entity Notation: `&dollar;`

If you write any of these three sequences somewhere in your HTML file, it will will never appear on the page, instead being replaced by the `$` character.

## Table

|Char|Decimal Code Point|Hex Code Point|Character Entity|
|:---:|:---:|:---:|:---:|
|&excl;|`&#33;`|`&#x21;`|`&excl;`|
|&quot;|`&#34;`|`&#x22;`|`&quot;`|
|&num;|`&#35;`|`&#x23;`|`&num;`|
|&dollar;|`&#36;`|`&#x24;`|`&dollar;`|
|&percnt;|`&#37;`|`&#x25;`|`&percnt;`|
|&amp;|`&#38;`|`&#x26;`|`&amp;`|
|&apos;|`&#39;`|`&#x27;`|`&apos;`|
|&lpar;|`&#40;`|`&#x28;`|`&lpar;`|
|&rpar;|`&#41;`|`&#x29;`|`&rpar;`|
|&ast;|`&#42;`|`&#x2a;`|`&ast;`|
|&plus;|`&#43;`|`&#x2b;`|`&plus;`|
|&comma;|`&#44;`|`&#x2c;`|`&comma;`|
|&period;|`&#46;`|`&#x2e;`|`&period;`|
|&sol;|`&#47;`|`&#x2f;`|`&sol;`|
|&colon;|`&#58;`|`&#x3a;`|`&colon;`|
|&semi;|`&#59;`|`&#x3b;`|`&semi;`|
|&lt;|`&#60;`|`&#x3c;`|`&lt;`|
|&equals;|`&#61;`|`&#x3d;`|`&equals;`|
|&gt;|`&#62;`|`&#x3e;`|`&gt;`|
|&quest;|`&#63;`|`&#x3f;`|`&quest;`|
|&commat;|`&#64;`|`&#x40;`|`&commat;`|
|&lbrack;|`&#91;`|`&#x5b;`|`&lbrack;`|
| &#x5c; |`&#92;`|`&#x5c;`|`&bsol;`|
|&rbrack;|`&#93;`|`&#x5d;`|`&rbrack;`|
|&Hat;|`&#94;`|`&#x5e;`|`&Hat;`|
|&lowbar;|`&#95;`|`&#x5f;`|`&lowbar;`|
| &#x60; |`&#96;`|`&#x60;`|`&grave;`|
|&lbrace;|`&#123;`|`&#x7b;`|`&lbrace;`|
| &vert; |`&#124;`|`&#x7c;`|`&vert;`|
|&rbrace;|`&#125;`|`&#x7d;`|`&rbrace;`|

```html
<head>
  <link rel="stylesheet" type="text/css" href="style.css" title="style">
  <meta property="og:title" content="example.com">
  <meta property="og:image" content="https://example.com/image.png">
</head>
```

## Open Graph

If you're trying to create rich previews for your web page, Facebook's [Open Graph protocol](https://ogp.me) is the de-facto standard for how to structure your page's metadata.

For instance, Apple's iMessage allows you to have an embedded image for your website when you send iMessages. Specify the source image as the value of the `og:image` attribute within a `<meta>` tag somewhere in your web page's head.

The [metatags.io](https://metatags.io) website provides a helpful playground to practice adding the metadata.

For more advanced debugging, check out Google's [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

[!Teddy Bear](https://imgur.com/a/nyf0yGc)

## Navigation Bars

* Use the `<nav>` element

* It may be simpler to use the CSS provided by the [Bootstrap navbar component](https://getbootstrap.com/docs/4.5/components/navbar/)

## HTML Tags

Anatomy of an HTML element

```txt

   [opening tag]          [closing tag] 
┌───────┴─────────┐            ┌┴─┐
<p class="example">Hello world!</p>
   └─┬─┘ └───┬───┘ └────┬─────┘
[attribute] [value] [enclosed text content]

```

### Tag Attributes

#### `title`

The `title` attribute determines what text (if any) is displayed when a user hovers over an element on your page

* Create a link that reveals `click me!` when a user hovers over it

  ```html
  <a href="https://helpful.wiki/html" title="click me!">Link to this page</a>
  ```

## Search Engine Optimization

I've heard [Backlinko's guide to SEO](https://backlinko.com/on-page-seo) is the most comprehensive, but I'd also check out [Google's Search Engine Optimization (SEO) starter guide](https://support.google.com/webmasters/answer/7451184)


## HTML Style Guide

Taking some notes on the [Google developer documentation style guide](https://developers.google.com/style/code-syntax#required-items), leaving them here.

* Required item: {{< var VARIABLE_NAME >}}

* Optional item: \[{{< var OPTIONAL_ITEM >}}\]

* Mutually exlusive items: \{{{< var ALPHA >}} | {{< var BRAVO >}}\}

* Non-mandatory option with parameter: `[--option={{<var PARAMETER >}}]`