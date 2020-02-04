+++
title = "JSON"
description = "The lingua franca of RESTful APIs"
date = 2020-02-04T14:43:27-08:00
image = "json.png"
+++

# JSON

Java Script Object Notation (JSON) is a data format that allows applications to communicate over networks in a simple syntax. JSON is used in Javascript (duh), Node.js, MongoDB (and other NoSQL databases).

## Types of JSON documents

JSON documents can be the following two types:

| Data Type | Surrounding Characters | Example |
|:----:|:----:|:----:|
| Array |`[]`  square brackets | `[ "Hello", "JSON" ]` |
| Object |`{}` curly braces | `{"Hello":"JSON"}` |

{: .notice--warning}
**Difference with Javascript:** Since double quotes are considered standard in Javascript, JSON **requires** double quotes. Javascript code recognizes strings in objects with surrounding single quotes `'a string'` or double quotes `"also a string"`. When in doubt, use https://JSONLinter.com

## JSON Arrays

An array is simply a data structure with an ordering. All pairs except the last must be comma-separated


```json
[
  "zero",
  "one",
  "two"
]
```

## Object

Objects are simply key value pairs, like the dictionary/map data structure. All keys must be unique, and all pairs except the last must be comma-separated

```json
{
   "myString" : "value",
   "nullValue": null,
   "myBoolean": true,
   "myNumber" : 0
}
```

# JSON Schema

JSON Schema specifies the expected structure of JSON documents. This is used when a document must have a given structure, as in an API response.

Attached below is a fictitious `programmer.json` schema, outlining the valid format for a `programmer` object submitted to this API.

  ```javascript
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

  ```javascript
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

## JMESPath

If you're receiving JSON as output from a command, you might want to filter down to a specific value within the substructure of the nested document

```sh
brew install jmespath/jmespath/jp
```

Imagine you had the JSON structure below

```json
{
    "input": {
        "size": 214743,
        "type": "image/png"
    },
    "output": {
        "size": 51002,
        "type": "image/png",
        "width": 2138,
        "height": 970,
        "ratio": 0.2375,
        "url": "https://api.tinify.com/output/8bfebtke4yty8gbcthbpu9n25a8u6zt0"
    }
}
```

```sh
# [ Input ]

# Short form
jp -f file.json
# Long form
jp --filename --unquoted

# [ Output ]
# "value"
```

{: .notice--success}
**Tip:** When the output is a single string, it retains its quotes. `"output"`. If you'd prefer the output to be unquoted `output`, add `export JP_UNQUOTED=1` to your rcfile. If you'd like to manually specify when the output should be unquoted, you can add the `-u` or `--unquoted` argument to your `jp` command.
