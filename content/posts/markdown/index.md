---
title: Markdown
description: "A lazy solution to writing less HTML"
date: 2020-02-04T14:52:27-08:00
---

# Markdown

## What is Markdown?

Markdown is a lightweight markup language used by Github. It’s designed to be easy to convert to HTML and simulate rich-text in a plain-text environment.

Markdown is useful because it's supported by GitHub and Quiver. For instance, you can write *italic* or **bold** text.

Other places have documented this stuff better than I have, so I'd look elsewhere if you're interested in [mastering markdown](https://guides.github.com/features/mastering-markdown/)

* Creating an ordered list

  ```md
  1. Alpha
  1. Bravo
  1. Charlie
  ```

  Output

  1. Alpha
  1. Bravo
  1. Charlie

* Creating an unordered list

  ```md
  * Alpha
  * Bravo
  * Charlie
  ```

  Output

  * Alpha
  * Bravo
  * Charlie

* Creating a quotation

  ```md
  > e=mc^2
  > - Funny Hair Science Man
  ```

  Output

  > e=mc^2 - Funny Hair Science Man

* Creating a blockquote

  ```md
  > It was the best of times
  > it was the worst of times
  ```

  Output

  > It was the best of times
  > it was the worst of times

* Nested quotes

  ```md
  > This is the most recent message
  > 
  > Best,
  > Alpha
  > 
  > > This is the reply to the original message
  > > 
  > > Best,
  > > Bravo
  > >
  > > > This is the original message
  > > > 
  > > > Best,
  > > > Alpha
  > > > 
  ```

  Output

  > This is the most recent message
  > 
  > Best,
  > Alpha
  > 
  > > This is the reply to the original message
  > > 
  > > Best,
  > > Bravo
  > >
  > > > This is the original message
  > > > 
  > > > Best,
  > > > Alpha
  > > > 


```java
  // it's even formatted as real java code
if (three_backticks) {
  inside = code_block
}
```

Similarly, this is `inline code`

## Making Tables

You can create tables by assembling a list of words and seperating them by the `|` character.

The first row should include some hyphens `-` to underline it.

```md
Header One | Header Two
---------- | ----------
It doesn't matter how long this content is | Reason: pipe seperates each block!
After you add a newline | You can write the next row in the table!
```

Output

Header One | Header Two
---------- | ----------
It doesn't matter how long this content is | Reason: pipe seperates each block!
After you add a newline | You can write the next row in the table!

## Text-Alignment in Tables

You can change the way a table's text aligns by appending a `:` to the dashes below your title

```md
| Left-aligned | Center-aligned | Right-aligned |
| :---         |      :---:     |  ---:         |
| Check        | This           | Out           |
```

| Left-aligned | Center-aligned | Right-aligned |
| :---         |      :---:     |  ---:         |
| Check        | This           | Out           |

## Escaping Characters in Markdown

Some characters are special by default, and must be escaped by the escape character `\` in order for Markdown to interpret them literally. This is only required when Markdown would otherwise interpret the character specially, for instance, to type `*literal asterisks*` one must type `\* literal asterisks\*`

|Character|Name|
|:---:|:---:|
|`\`|escape|
| &grave; |code block|
|`*`|emphasis|
|`_`|emphasis|
|`{}`|heading ID|
|`[]`|task list|
|`()`|link embed|
|`#`|heading|
|`+`|plus sign|
|`-`|minus sign (hyphen)
|`.`|dot|
|`!`|image embed|
|`|`|table column|

### Escaping angle brackets `<>`

Angle brackets `<>` are a little trickier to render, since a markdown page is converted into HTML, which treats angle brackets as parts of a tag. Luckily, GitHub Flavored Markdown (GFM) supports escaping curly brackets.

To write \<tag\> in GFM, type `\<tag\>`. This even works with whitespace in the middle. To write \<two words\> in GFM type `\<two words\>`.

In Hugo, they support [element IDs for headings](https://gohugo.io/content-management/cross-references/#heading-ids) on a page.

Specifying custom heading IDs can be done as follows:

* Generating a custom heading ID

  ```md
  ## This Section {#this-section}
  ## Other Content {id="other-content"}
  ```

  Output

  ```html
  <h2 id="foo">Reference A</h2>
  <h2 id="bar">Reference B</h2>
  ```