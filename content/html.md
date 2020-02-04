+++
title = "HTML"
description = "Writing stuff down the hard way"
date = 2020-02-04T14:52:27-08:00
image = "html.png"
+++

# HTML

## Referencing Characters

Imagine the following situation: you're writing an HTML page, and you want to type the expression `<div>`. Perhaps that's the exact situation I'm in as I write this page...

```html
<!-- See why this won't work? -->
<h1>
  A section on <div>
</h1>
```

Sometimes you want to specify a character that has a special meaning, such as `>` in the example above. To prevent errors from occurring when rendering your page, HTML gives you the option to specify character entities by a reference code.

### Referencing by Code Point Numbers

You can refer to any character with its corresponding *code point numbers*. I've included some examples for referencing some ASCII characters by their code points, but you can refer to any character in Unicode's UTF-8 Universal Character Set (UCS) by specifying its corresponding code points.

### Referencing by Character Entity

As of HTML5, there is support for using *character entity references* as an alternative to code point numbers. A character entity reference, when stated, replaces itself with the character you are trying to specify.


#### Syntax Example

Writing the `$` character (ASCII Code Point \#36):

* Decimal Notation: `&#36;`
* Hex Notation: `&#x24;`
* Character Entity Notation: `&dollar;`

If you write any of these three sequences somewhere in your HTML file, it will will never appear on the page, instead being replaced by the `$` character.

## Table

|Char|Decimal Code Point|Hex Code Point|Character Entity|
|:---:|:---:|:---:|:---:|
| ! |`&#33;`|`&#x21;`|`&excl;`|
| " |`&#34;`|`&#x22;`|`&quot;`|
| # |`&#35;`|`&#x23;`|`&num;`|
| $ |`&#36;`|`&#x24;`|`&dollar;`|
| % |`&#37;`|`&#x25;`|`&percnt;`|
| & |`&#38;`|`&#x26;`|`&amp;`|
| ' |`&#39;`|`&#x27;`|`&apos;`|
| ( |`&#40;`|`&#x28;`|`&lpar;`|
| ) |`&#41;`|`&#x29;`|`&rpar;`|
| * |`&#42;`|`&#x2a;`|`&ast;`|
| + |`&#43;`|`&#x2b;`|`&plus;`|
| , |`&#44;`|`&#x2c;`|`&comma;`|
| . |`&#46;`|`&#x2e;`|`&period;`|
| / |`&#47;`|`&#x2f;`|`&sol;`|
| : |`&#58;`|`&#x3a;`|`&colon;`|
| ; |`&#59;`|`&#x3b;`|`&semi;`|
| < |`&#60;`|`&#x3c;`|`&lt;`|
| = |`&#61;`|`&#x3d;`|`&equals;`|
| > |`&#62;`|`&#x3e;`|`&gt;`|
| ? |`&#63;`|`&#x3f;`|`&quest;`|
| @ |`&#64;`|`&#x40;`|`&commat;`|
| [ |`&#91;`|`&#x5b;`|`&lbrack;`|
| &#x5c; |`&#92;`|`&#x5c;`|`&bsol;`|
| ] |`&#93;`|`&#x5d;`|`&rbrack;`|
| ^ |`&#94;`|`&#x5e;`|`&Hat;`|
| _ |`&#95;`|`&#x5f;`|`&lowbar;`|
| &#x60; |`&#96;`|`&#x60;`|`&grave;`|
| { |`&#123;`|`&#x7b;`|`&lbrace;`|
| &#124; |`&#124;`|`&#x7c;`|`&vert;`|
| } |`&#125;`|`&#x7d;`|`&rbrace;`|

## Sample HTML Page

```html
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
```

```html
<head>
  <link rel="stylesheet" type="text/css" href="https://austin.jp/style.css" title="style">
  <meta property="og:title" content="austin.jp">
  <meta property="og:image" content="https://austin.jp/teddy.png">
</head>
```

Including the `og:image` meta property allows you to have an embedded image for your website when you send iMessages.

[!Teddy Bear](https://imgur.com/a/nyf0yGc)
