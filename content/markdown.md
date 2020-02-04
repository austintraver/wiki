+++
title = "Markdown"
description = "A lazy solution to writing less HTML"
date = 2020-02-04T14:43:27-08:00
image = "markdown.png"
+++

# Markdown

## What is Markdown?

Markdown is a lightweight markup language used by Github. It’s designed to be easy to convert to HTML and simulate rich-text in a plain-text environment.

## Markdown in Quiver

Markdown is useful because it's supported by GitHub and Quiver. For instance, you can write *italic* or **bold** text.

You can also
1. Make
2. Ordered
3. Lists

Similarly, you can
* Make
* Unordered
* Lists

> This is a quote

[Link](https://guides.github.com/features/mastering-markdown/) is a useful place to go if you forget any of this.

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

```markdown
Header One | Header Two
---------- | ----------
It doesn't matter how long this content is | Reason: pipe seperates each block!
After you add a newline | You can write the next row in the table!
```

:arrow_down:

Header One | Header Two
---------- | ----------
It doesn't matter how long this content is | Reason: pipe seperates each block!
After you add a newline | You can write the next row in the table!


## Github Flavored Markdown

The `$ grip` program, available on brew, makes it easy to render & view GitHub Flavored Markdown on your local machine.

```sh
# [Launching a markdown file in the browser]
grip . # run grip on the current directory's README.md
grip ~/repos/scrabble # run grip on a particular directory's README.md
grip filename.md # also supports specifying particular .md files
# [Exporting the formatted HTML]
grip ifile.md --export ofile.html # bypass the server hosting, export html file
```

## Practice

Does this support *Github Flavored Markdown*?

**Let's find out**

# Practice

```sh
echo "no way, this is awesome"
cat $filename tags tag
```

## Markdown Tables

:arrow_down:
When specifying the header row, 3 `-` chars will suffice to signify each header.

```md
|This Incredibly|Long Header|Title Bar|
|---|---|---|
|step 1|step 2|step 3|
```
Will be formatted rendered as:

|This Incredibly|Long Header|Title Bar|
|---|---|---|
|step 1|step 2|step 3|

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

## Notices

I do not believe that this is currently a feature of GitHub flavored markdown, but it works on GitHub pages. There are a variety of tags you can place above a section of code in order to format the way that it appears to a user. This allows the section to pop out to the reader.

This code snippet will be processed and formatted to become the notices that you see further below.

```plaintext
{: .notice--primary}
This is an **primary** style notice.

{: .notice--info}
This is an **info** style notice.

{: .notice--warning}
This is an **warning** style notice.

{: .notice--success}
This is an **success** style notice.
```

{: .notice--primary}
This is an **primary** style notice.

{: .notice--info}
This is an **info** style notice.

{: .notice--warning}
This is an **warning** style notice.

{: .notice--success}
This is an **success** style notice.

{: .notice--danger}
This is an **danger** style notice.

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
