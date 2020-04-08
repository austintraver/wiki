+++
title = "MongoDB"
description = "The database for you and me"
date = 2020-02-04T14:52:27-08:00
image = "mongo.png"
+++

# MongoDB

## Getting Started

### Installing MongoDB

* On Mac OS

  ```sh
  brew tap mongodb/brew
  brew install mongodb-community
  ```

* On Ubuntu

  ```sh
  # Install GPG as a pre-requisite step
  sudo apt-get install gnupg

  # Add MongoDB's public GPG key to the `apt` program
  wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

  # Add the MongoDB repository to the `apt` program's 'sources.list.d' directory
  print "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

  # Update `apt` to register these changes
  sudo apt-get update

  # Install the latest version
  sudo apt-get install -y mongodb-org
  ```

* Launching MongoDB

  * On Ubuntu

    ```sh
    sudo systemctl start mongod
    ```

* Stopping MongoDB

  * On Ubuntu

    ```sh
    sudo systemctl stop mongod
    ```

* Restarting MongoDB

  * On Ubuntu

    ```sh
    sudo systemctl restart mongod
    ```

* Setting up MongoDB to run on startup

  * On macOS

    ```sh
    brew services start mongodb/brew/mongodb-community
    ```

  * On Ubuntu

    ```sh
    sudo systemctl enable mongod
    ```

* The config file is located at `/usr/local/etc/mongod.conf`

* The config file is located at `/etc/mongodb.conf`

### Configuring MongoDB

MongoDB config files are written in YAML, an example `mongodb.conf` file is provided below

## Connecting to a MongoDB Atlas Server

```sh
# Using a single URI
mongo mongodb+srv://tommy:fighton@cluster-name.mongodb.net/dbname

# Using a URI and two flags
# Short Form
mongo 'mongodb+srv://cluster-name.mongodb.net/dbname' -u 'tommy' -p 'fighton'
# Long Form
mongo 'mongodb+srv://cluster-name.mongodb.net/dbname' --username 'tommy' --password 'fighton'
```


# The MongoDB Shell

## Databases

* Show the name of the current database

  ```txt
  db
  ```

* Switch to the database `example`

  ```txt
  use example
  ```

{{% notice info %}}
**Tip:** If the database doesn't yet exist, switching to it will implicitly create it.
{{% /notice %}}

* List all available databases

  ```txt
  show dbs
  ```

{{% notice warning %}}
**Warning:** If you switch to a new database and don't add anything, the command above won't show you the current database you are using since there isn't anything inside of it.
{{% /notice %}}



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
