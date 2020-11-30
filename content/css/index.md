---
title: "CSS"
description: "Coding with style(sheets)"
date: 2020-02-23T02:15:43-08:00
draft: false
---

# Cascading Style Sheets

## Units

{{% aside tldr %}}

**TL;DR:** Use `em` or `px` for font sizes

{{% /aside %}}


CSS offers a number of different units for expressing length: `em`, `px`, `pt`, `cm`, `in`, etc.

Some have their history in typography, such as point (`pt`) and pica (`pc`), others are known from everyday use, such as
centimeter (`cm`) and inch (`in`). And there is also a “magic” unit that was invented specifically for CSS: the `px`.
Does that mean different properties need different units?

No, the units have nothing to do with the properties, but everything with the output media: screen or paper.

There is no restriction on which units can be used where. If a property accepts a value in `px` (`margin: 5px`) it also
accepts a value in inches or centimeters (`margin: 1.2in; margin: 0.5cm`) and vice-versa.

But in general you would use a different set of units for display on screen than for printing on paper. The following
table gives the recommended use:

| x | Preferred | Acceptable |
|:-------|:----------------------------------------|:-----------|
| Screen | `em`, `px`, `%` | `ex` |
| Print | `em`, `cm`, `mm`, `in`, `pt`, `pc`, `%` | `ex`, `px` |

The relation between the absolute units is as follows:

`1in` = `2.54cm` = `25.4mm` = `72pt` = `6pc`

The so-called *absolute* units (`cm`, `mm`, `in`, `pt` and `pc`) mean the same in CSS as everywhere else, *but only if
your output device has a high enough resolution.* On a laser printer, 1cm should be exactly 1 centimeter. But on
low-resolution devices, such as computer screens, CSS doesn't require that. And indeed, the result tends to be different
from one device to another and from one CSS implementation to another. It's better to reserve these units for
high-resolution devices and in particular for printed output. On computer screens and handheld devices, you'll probably
not get what you expect.

In the past, CSS required that implementations display absolute units correctly even on computer screens. But as the
number of incorrect implementations outnumbered correct ones and the situation didn't seem to improve, CSS abandoned
that requirement in 2011. Currently, absolute units must work correctly only on printed output and on high-resolution
devices.

CSS doesn't define what "high resolution" means. But as low-end printers nowadays start at 300 dpi and high-end screens
are at 200 dpi, the cut-off is probably somewhere in between.

There is another reason to avoid absolute units for other uses than print: You look at different screens from different
distances. `1cm` on a desktop screen looks small, but the same on a mobile phone directly in front of your eyes looks
big. It's better to use relative units, such as `em`, instead.

The `em` and `ex` units depend on the font and may be different for each element in the document. The `em` is simply the
font size. In an element with a 2in font, 1em thus means 2in. Expressing sizes, such as margins and paddings, in `em`
means they are related to the font size, and if the user has a big font (e.g., on a big screen) or a small font (e.g.,
on a handheld device), the sizes will be in proportion. Declarations such as `text-indent: 1.5em` and `margin: 1em` are
extremely common in CSS.

People rarely use the `ex`, whose purpose is to express sizes that must be related to the x-height of a font. The
x-height is, roughly, the height of lowercase letters such as *a, c, m,* or *o.* Fonts that have the same size (and thus
the same `em`) may vary wildly in the size of their lowercase letters, and when it is important that some image, e.g.,
matches the x-height, the `ex` unit is available.

The `px` unit is the magic unit of CSS. It is not related to the current font and usually not related to physical
centimeters or inches either. The `px` unit is defined to be small but visible, and such that a horizontal 1px wide line
can be displayed with sharp edges (no anti-aliasing). What is sharp, small and visible depends on the device and the way
it is used: do you hold it close to your eyes, like a mobile phone, at arms length, like a computer monitor, or
somewhere in between, like an e-book reader? The `px` is thus not defined as a constant length, but as something that
depends on the type of device and its typical use.

To get an idea of the appearance of a `px`, imagine a CRT computer monitor from the 1990s: the smallest dot it can
display measures about 1/100th of an inch (0.25mm) or a little more. The `px` unit got its name from those screen
pixels.

Nowadays there are devices that could in principle display smaller sharp dots (although you might need a magnifier to
see them). But documents from the last century that used `px` in CSS still look the same, no matter what the device.
Printers, especially, can display sharp lines with much smaller details than 1px, but even on printers, a 1px line looks
very much the same as it would look on a computer monitor. Devices change, but the `px` always has the same visual
appearance.

In fact, CSS requires that `1px` must be exactly 1/96th of an inch in all printed output. CSS considers that printers,
unlike screens, do not need to have different sizes for `px` in order to print sharp lines. In print media, a px thus
not only has the same visual appearance from one device to another, but indeed it is measurably the same.

CSS also defines that raster images (such as photos) are, by default, displayed with one image pixel mapping to 1px. A
photo with a 600 by 400 resolution will be 600px wide and 400px high. The pixels in the photo thus do not map to pixels
of the display device (which may be very small), but map to `px` units. That makes it possible to exactly align images
to other elements of a document, as long as you use `px` units in your style sheet, and not `pt`, `cm`, etc.

The `em` (pronounced as it sounds), is a unit of relative font sizing in CSS. Specifying `2em` tells an element to be
twice the size of its parent element.

{{% aside danger %}}

**Be careful!** This means that if you have nested items, each nested layer will be twice as large as the previous
layer. For this reason, it is best to use the `rem` (*root* `em`) unit, which is a constant value relative to that of
the root `<html lang="en-US">` tag. In most browsers, this defaults to 16px.

{{% /aside %}}

CSS inherited the units `pt` (point) and `pc` (pica) from typography. Printers have traditionally used those and similar
units in preference to `cm` or `in`. In CSS there is no reason to use `pt`, use whichever unit you prefer. But there
*is* a good reason to use *neither `pt` nor any other absolute unit* and only use `em` and `px`.

The magic unit of CSS, the `px`, is a often a good unit to use, especially if the style requires alignment of text to
images, or simply because anything that is 1px wide or a multiple of 1px is guaranteed to look sharp.

But for font sizes it is even better to use `em`. The idea is (1) to not set the font size of the BODY element (in
HTML), but use the default size of the device, because that is a size that the reader can comfortably read; and (2)
express font sizes of other elements in `em`: `H1 {font-size: 2.5em}` to make the H1 2½ times as big as the normal, body
font.

The only place where you could use `pt` (or `cm` or `in`) for setting a font size is in style sheets for print, if you
need to be sure the printed font is exactly a certain size. But even there using the default font size is usually
better.

The `px` unit thus shields you from having to know the resolution of the device. Whether the output is 96dpi, 100dpi,
220dpi or 1800dpi, a length expressed as a whole number of `px` always looks good and very similar across all devices.

## Fonts

### Custom Font Faces

* Declaring a new font face

    ```css
    /* Normal font style */
    @font-face {
      font-family: "example";
      font-style: normal;
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
      src: url("https://link.to/myfont.ttf");
    }
    ```

* Referencing a custom font-face

    ```css
    h2 {
      font-family: "Example Sans", sans-serif;
    }
    ```

## Pseudo Elements

A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s).
They are well documented by
[W3Schools](https://www.w3schools.com/css/css_pseudo_elements.asp),
[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements), and
[CSS-Tricks](https://css-tricks.com/pseudo-class-selectors/).

## Variables

* Declaring the variable `--red`:

    ```css
    /* Use the root pseudo element to allow access
    to this variable everywhere */
    :root {
      --red: #df7e67;
    }

    /* Use the var() function to reference the value stored in a variable */
    a:hover {
      color: var(--red);
    }
    ```

## Media Queries

CSS
[media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) allow you to modify
your site based on a user's preferences (e.g. light/dark mode), or even characteristics of their device (e.g. size,
aspect ratio).

A media query can be added to any stylesheet using the
[@media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) CSS
[at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule).

* Custom Styling for Dark-Mode Users

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

## Responsive Layout

Use the `@media` query to find out the width of the user's device, and style your CSS accordingly. I've included a
sample of the selector for the dimensions of an iPhone 8, which I found from CSS Tricks' article about
[media queries for standard devices](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/)

* Apply CSS to

    ```css
    /* ----------- iPhone 6, 6S, 7 and 8 ----------- */

    /* Portrait */
    @media screen
      and (min-width: 375px)
      and (max-width: 667px)
      and (orientation: portrait) {

    }

    /* Landscape */
    @media screen
      and (min-width: 375px)
      and (max-width: 667px)
      and (orientation: landscape) {

    }
    ```

## Backdrop Filters

A common cool effect is to have a slightly transparent, cool glassy effect behind an element. This used to be very
difficult to add, but is now rather simple thanks to
[the `backdrop-filter` property](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)

{{% aside warning %}}

**Warning:** Support for `backdrop-filter` is experimental. Before adding it to a production website, check the
[browser support table](https://caniuse.com/css-backdrop-filter)

{{% /aside %}}

* Create a frosted glass effect behind the banner:

    ```css
    div {
      border-color: white;
      border-style: solid;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(4px); /* Chrome */
      -webkit-backdrop-filter: blur(4px); /* Safari */
    }
    ```

## Anchor Tag Offsets

If you have a navigation bar on your site, links to a heading's URL fragment might not jump the user to the correct
location on the page. I fixed this problem by following CSS Tricks' article about
[padding offsets](https://css-tricks.com/hash-tag-links-padding/) for links to header id fragments.

## Responsive Design

### Tap Targets { #targets }

Notes on Google's web.dev article on
[Accessible tap targets](https://web.dev/accessible-tap-targets/)

* A tap target's size should be at least 48x48 device independent pixels in size.

* Multiple tap targets should be spaced at least 8x8 device independent pixels apart from one another.

```css
.container a {
  padding: .2em;
}

@media (pointer: coarse) {
  .container a {
    padding: .8em;
  }
}
```

### Scroll Offset

If you have a
[header with a fixed position](https://css-tricks.com/fixed-headers-on-page-links-and-overlapping-content-oh-my/), such
as a navigation bar, use the `scroll-padding-top` parameter to fix the offset. Set its value to be equal to or slightly
greater than the height of your fixed header.

```css
html {
  scroll-padding-top: 98px;
}
```

