+++
title = "Yarn"
description = "A softer introduction to NodeJS package management"
date = 2020-02-04T14:42:27-08:00
image = "yarn.jpg"
+++

# `yarn`

## Getting Started

### What is `yarn`?

`yarn` is a more secure node package manager, developed by facebook. It has some cool features, like using parallel processing to install packages, and caching packages on your local machine to prevent needless re-downloading.

### Installing `yarn`

```sh
# on macOS
brew install yarn

# on Debian distro
# curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
# echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
# sudo apt update
# sudo apt install yarn
sudo apt install yarnpkg
sudo update-alternatives --install /usr/bin/yarn yarn /usr/bin/yarnpkg 1
echo "export NODE_PATH=/usr/lib/nodejs:/usr/share/nodejs" >> ~/.zshrc
```

### Upgrading `yarn`

```sh
brew upgrade yarn
apt upgrade yarnpkg
```

## Using `yarn`

### Configurations

You can use `$ yarn config set` to declare configurations that will be used when creating a new project with `$ yarn init`

```sh
yarn config set init-license MIT
yarn config set name 'Austin Traver'
```

You can check what a current configurations using `$ yarn config get`

```sh
yarn config get init-license
```

You can remove a configuration with `$ yarn config delete <keyname>`

```sh
yarn config delete init-license
```

### Starting a new project

```sh
mkdir project
cd project
yarn init
```

### Joining an existing project

If you have just downloaded someone’s repository, and it already includes a `package.json` file, type `yarn install` inside the repository to download all of the packages for this project


### Managing project dependencies

```sh
# [Install package to local project]
yarn add packagename
# [Install package globally to computer]
yarn global add create-react-app
# [Upgrade all existing dependencies]
yarn upgrade
# [Remove a dependency no longer needed]
yarn remove
# [Install all current project dependencies]
yarn install
```


### What is `yarn.lock`?

The `yarn.lock` file stores the exact version number of all of the dependencies for your project. Do not modify it.


## Misc

### Storing user credentials

```sh
yarn login
```

This will allow you to store your user credentials for the node package registry. Before this will work, you must first create an account on npmjs.com

### Finding out where `yarn` is installed
```sh
yarn global bin
```

This will return the location that `yarn` is located. If you installed `yarn` with `brew` then it will return `/usr/local/bin`

### Getting the version number of a dependency

```sh
yarn info mypackage version
```

### Publishing Yarn Packages

```sh
yarn login
yarn --registry
yarn publish <folder>
```

You'll need to create a `package.json` in the directory you're hosting the project in. It will need to include the dependencies, a name, a version number, and description.

You'll need to supply a `bin` field in your `package.json` so that `yarn` and `npm` can add the binary executable to the `$PATH` when the user installs the package globally.

```json
{
  "name": "merge",
  "version": "1.0.1",
  "bin":
}
```

### Custom Installation Location

By default, `$ yarn global add <package>` installs a symlink to the package, and stores that symlink in `/usr/local/bin/<package>` but you can customize this with `$ yarn config set prefix`

#### Set yarn global package directory

Add symlinks to globally added packages in `~/.yarn/bin/<package>`

```sh
yarn config set prefix ~/.yarn
```

#### Check yarn global package directory

You can use the `$ yarn global bin` command to see where symlinks for globally added packages are. By default, this is `/usr/local/bin`

```sh
yarn global bin
```

#### Check where the node packages are actually installed

`yarn` by default houses global node modules in `~/.config/yarn/global`

```sh
yarn global dir
```

## Switch from Node to Yarn

If you have a project that was previously using a `package-lock.json` file, but you want to switch from `npm` to `yarn`, there is now a way to do that. Yarn is able to parse that file and generate an equivalent `yarn.lock` file. From there, you will be able to use `yarn add` instead of `npm install`.

  ```sh
  yarn import
  ```
