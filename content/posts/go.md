---
title: Go
description: "The latest language"
date: 2020-02-16T05:59:50-08:00
image: "go.jpg"
draft: false
---

## Getting Started

```sh
# macOS
brew install go
# Debian
apt install golang-go
```


## Your First Program

* Writing your first program

    ```go
    /* ~/go/src/hello.go */
    package main

    import "fmt"

    func main() {
        fmt.Printf("Hello world\n")
    }
    ```

* Running your first program

    ```sh
    go run hello.go
    ```

## Packages

Programs in go are made up of multiple packages, and will run starting from the code defined in the `main` package.

* Program with multiple imported packages

    ```go
    /* ~/go/src/problems.go */
    package main

    import (
        "fmt"
        "math"
    )

    func main() {
        problems = 99
        fmt.Printf("I got %d problems but a glitch aint %d.", problems, (100-problems))
    }
    ```

## Vim Plugin

If you want to edit your Go projects in Vim, there's a very healthy ecosystem to support you.

```vim
" Install the libraries needed for `vim-go`
:GoInstallBinaries
" Getting help
:help vim-go
```

I've included some useful commands below:

```vim
" Run the code in the current buffer
:GoRun

" Compile the code
:GoBuild

" Install the coe
:GoInstall

" Test the code
:GoTest

" Test a single function
:GoTestFunc

" See dependencies of the current package
:GoDeps

" See all source files in cwd
:GoFiles

" Rename an identifier
:GoRename

" Format the document according to the go style guide
:GoFmt

" Resolve all needed package imports & remove all unused packages
:GoImports

" Import the package `math` #study #rise&grind
:GoImport math

" Drop the package `math` #jk2cool4school
:GoDrop math

" Pull up documentation for the function `Printf` package `fmt`
:GoDoc fmt Printf
```
