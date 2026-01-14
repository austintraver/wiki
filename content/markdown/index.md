---
title: Markdown
description: "A lazy solution to writing less HTML"
date: 2020-02-04T14:52:27-08:00
---

# Markdown

## Introduction

Markdown is a lightweight markup language used by Github. It’s designed to be easy to convert to HTML and simulate rich-text in a plain-text environment.

Markdown is useful to know because you'll soon find you can use it in many
places you might not expect to be able to. What you write on [GitHub][GitHub markdown] and
[StackOverflow][StackOverflow markdown](https://stackoverflow.com/help/formatting). For instance, you
can write *italic* or **bold** text.

[StackOverflow markdown]: https://stackoverflow.com/help/formatting
[GitHub markdown]: https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax

Other places have documented Markdown, so I'd look elsewhere if you're interested in [mastering Markdown][]. Consider this page more of a place to "reference" Markdown, rather than learn it. 

To learn Markdown, check out these resources:

* [Communicating using Markdown](https://lab.github.com/githubtraining/communicating-using-markdown)
* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

## Lists

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

## Quotations

* Creating a quotation

    ```md
    > e=mc^2
    >
    > -- Funny Hair Science Man
    ```
  
    Output
  
    > e=mc^2
    >
    > -- Funny Hair Science Man

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

## Tables

Tables are an extension of the original Markdown spec. They are, however, supported on GitHub.


You can create tables by assembling a list of words and separating them by the `|` character.

The first row should include some hyphens `-` to underline it.

```md
| Header One | Header Two |
| ---------- | ---------- |
| This content can be as long as you want | Reason: it won't separate until it sees this pipe: &vert; |
| After you add a newline | You can write the next row in the table! |
```

Output

| Header One | Header Two |
| ---------- | ---------- |
| This content can be as long as you want | Reason: it won't separate until it sees this pipe: &vert; |
| After you add a newline | You can write the next row in the table! |

You can change the way a table's text aligns by appending a `:` to the dashes below your title

```md
| Left-aligned | Center-aligned | Right-aligned |
| :---         |      :---:     |  ---:         |
| Check        | This           | Out           |
```

| Left-aligned | Center-aligned | Right-aligned |
| :---         |      :---:     |  ---:         |
| Check        | This           | Out           |

To learn more, see [Organizing information with tables][]

[Organizing information with tables]: https://docs.github.com/en/github/writing-on-github/organizing-information-with-tables

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

Hugo supports [element IDs for headings](https://gohugo.io/content-management/cross-references/#heading-ids)
on a page.

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

## Footnotes

[Footnotes]: https://www.markdownguide.org/extended-syntax/#footnotes
[Markdown Extra]: https://michelf.ca/projects/php-markdown/extra/#footnotes
[Commonmark]: https://spec.commonmark.org/0.29/
[GFM]: https://github.github.com/gfm/
[Goldmark]: https://github.com/yuin/goldmark/#built-in-extensions

[Footnotes][] are an extension to Markdown, but is less commonly implemented
than other extensions. They are supported by PHP's [Markdown Extra][] but not
by [Commonmark][], nor by [GitHub Flavored Markdown (GFM)][GFM]. It can enabled
in [hugo](https://gohugo.io/getting-started/configuration-markup/#goldmark)'s
configurations for [Goldmark][], the library used by hugo to generate 
HTML from Markdown.

An example is provided below:


```markdown
This example uses the IEEE Reference List[^1] format 
to create a footnote for a citation[^2] of a web article.

[^1]: "Reference List." Purdue Owl. <https://owl.purdue.edu/owl/research_and_citation/ieee_style/reference_list.html>
[^2]: "Citation." Wikipedia. <https://wikipedia.org/wiki/Citation>
```

Output:

This example uses the IEEE Reference List[^1] format 
to create a footnote for a citation[^2] of a web article.

[^1]: "Reference List." Purdue Owl. <https://owl.purdue.edu/owl/research_and_citation/ieee_style/reference_list.html>
[^2]: "Citation." Wikipedia. <https://wikipedia.org/wiki/Citation>
