---
title: "JSON"
description: "The lingua franca of RESTful APIs"
date: 2020-02-04T14:52:27-08:00
draft: false
---

# JSON

Java Script Object Notation (JSON) is a data format that allows applications
to communicate over networks in a simple syntax. JSON is used in Javascript
(duh), Node.js, MongoDB (and other NoSQL databases).

## Types of JSON documents

JSON documents can be the following two types:

| Data Type | Surrounding Characters | Example |
|:----:|:----:|:----:|
| Array |`[]`  square brackets | `[ "Hello", "JSON" ]` |
| Object |`{}` curly braces | `{"Hello":"JSON"}` |

{{% aside warning %}}
**Difference with Javascript:** Since double quotes are more prevalent in
Javascript, JSON **requires** double quotes. Javascript code recognizes strings
in objects with surrounding single quotes `'a string'` or double quotes
`"also a string"`.
{{% /aside %}}

## JSON Arrays

An array is simply a data structure with an ordering. All pairs except the
last must be separated by commas


```json
[
  "zero",
  "one",
  "two"
]
```

## Object

Objects are simply key value pairs, like the dictionary/map data structure.
All keys must be unique, and all pairs except the last must be separated
by commas.

```json
{
   "myString" : "value",
   "nullValue": null,
   "myBoolean": true,
   "myNumber" : 0
}
```

# JSON Schema

JSON Schema specifies the expected structure of JSON documents. This is used
when a document must have a given structure, as in an API response.

Attached below is a fictitious `programmer.json` schema, outlining the valid
format for a `programmer` object submitted to this API.

```json
{
      "type": "object",
      "properties": {
              "firstName": { "type" : "string" },
              "lastName": { "type" : "string"},
              "age" : { "type" : "integer"},
              "editor" : {
                      "name" : { "type" : "string" },
                      "isVim" : { "type" : "boolean" }
              },
              "projects" : { "type" : "array" }
      },
      "required": ["firstName", "lastName", "editor"]
}
```

A valid programmer, `aaron.json` would be formatted as follows:

```json
{
      "firstName" : "Aaron",
      "lastName" : "Cote",
      "age" : null,
      "editor" : {
              "name" :"Eclipse",
              "isVim" : false
      },
      "projects": []
}
```

