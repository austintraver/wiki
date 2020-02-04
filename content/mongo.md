+++
title = "MongoDB"
description = "The database for you and me"
date = 2020-01-30T20:14:57-08:00
image = "mongo.png"
+++

# MongoDB

## Getting Started

#### Mac OS

```
brew install mongodb
```

#### Ubuntu

```
apt install mongodb
```

## Connecting to a MongoDB Atlas Server

`$ mongo "mongodb+srv://cluster0-h3iy9.mongodb.net/test" --username root`

#### Mac OS

The config file is located at `/usr/local/etc/mongod.conf`

#### Ubuntu

The config file is located at `/etc/mogndob.conf`

# The MongoDB Shell

## Databases

* Show the name of the current database

  ```
  db
  ```

* Switch to the database `example`

  ```
  use example
  ```

{: .notice--info}
**Tip:** If the database doesn't yet exist, switching to it will implicitly create it.

* List all available databases

  ```
  show dbs
  ```

{: .notice--warning}
**Warning:** If you switch to a new database and don't add anything, the command above won't show you the current database you are using since there isn't anything inside of it.



## Basic Operations in the Shell

There are 4 basic operations
1. Create
2. Read
3. Update
4. Delete

### Create

Use the `insert` function to add a document to a collection.

Documents can be represented in JavaScript Object Notation `JSON` and then inserted, which helps add simplicity.

* Insert `post` object into the `blog` collection

  ```js
  post = {
    "title": "Hello World",
    "content": "That's all folks.",
    "date": new Date()
  }
  db.blog.insert(post)
  ```

### Delete

* Remove the document containing the username `tommy` from the `users` collection

  ```js
  db.users.remove({
    username: "tommy"
  })
  ```