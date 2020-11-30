---
title: Google Workspace
description: An integrated suite of cloud-native collaboration and productivity apps
date: 2020-09-19T03:22:57-07:00
draft: false
---

# Google Workspace

## Docs

You can
[share links to PDF versions of your Docs files](https://support.google.com/a/users/answer/9308985)
by appending `/export?format=pdf` to the URL

```txt
http://docs.google.com/document/d/{{< var ID >}}/export?format=pdf
```


## Sheets

You can
[share links to PDF versions of your Sheets files](https://support.google.com/a/users/answer/9308985)
by appending `/export?format=pdf` to the URL

```txt
http://docs.google.com/document/d/{{< var ID >}}/export?format=pdf
```

## Slides

Similarly, you can also share links to PDF versions of your Slides documents by
appending `/export/pdf` to the URL

```txt
https://docs.google.com/presentation/d/{{< var ID >}}/export/pdf
```

### Presentation Mode

#### [Keyboard Shortcuts](https://support.google.com/docs/answer/1696717)

* `n`: Go to the next presented item

* `p`: Go to the previous presented item

* `l`: Toggle laser pointer

* `s`: Open speaker notes

* `a`: Open audience tools

* `w`: Cover content with empty white slide

* `b`: Cover content with empty black slide

* **⌘ ⇧ F**: View slides in full-screen mode

## Drive

### [Search Operators](https://support.google.com/drive/answer/2375114)

### Quotes

You can use quotes to find documents that contain an exact word or phrase. For
example, if you wanted to search for a memo with the phrase "new normal"... you
could search `memo "new normal"`

### The minus operator

You can use the minus operator `-` to find documents that exclude a particular
word. For example, if you want "salsa," but not "dancing"... you could search
`salsa -dancing`

### `owner:`

You can find documents owned by a person with the `owner:` operator. For
example, you can find documents owned by Tommy Trojan with
`owner:ttrojan@usc.edu`.

### `from:`

You can find documents shared by a person with the `from:` operator. For
example, you can find documents shared by Tommy Trojan with
`from:ttrojan@usc.edu`.

### `creator:`

You can find documents in a shared drive created by a specific person using the
`creator:` operator. For example, to find documents created by Tommy Trojan with
`creator:ttrojan@usc.edu`.

### `to:`

You can find documents that have been shared with a specific person or group
using the `to:` operator. For example, you could search for documents shared to
Tommy Trojan with `to:ttrojan@usc.edu`

### `is:`

* `is:starred` matches items that are starred

* `is:trashed` matches items that are trashed

### `before:` and `after:`

You can use `before:` and `after:` to find items that were edited before or
after a certain day. Format the date using the ISO 8601 `YYYY-MM-DD` format. For
example, you could search for documents `before:2020-01-01` or
`after:2020-01-01`.

### `title:`

To search for a document with the "Conference 2014" in the title... you can
search `title:Conference 2014`

#### `type:`

I've compiled a list of valid types to search for, included below:

* `type:folder`
* `type:document`
* `type:spreadsheet`
* `type:presentation`
* `type:pdf`
* `type:image`
* `type:video`
* `type:drawing`
* `type:form`
* `type:site`
* `type:script`
* `type:table`

## Google Calendar

The hidden
[syncselect](https://calendar.google.com/syncselect) page lets you configure
which calendars should appear and sync across your devices
