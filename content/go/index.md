---
title: Go
date: 2020-02-16T05:59:50-08:00
description: 'In Go, the code does exactly what it says on the page.'
draft: false
---

# The Go Language

## Getting Started

First, [download go](https://golang.org/dl/) for your machine, or using a package manager. There's [installation instructions](https://golang.org/doc/install) if you want to do any additional configuration.

* on macOS

    ```shell script
    # macOS
    brew install go
    ```

* on Debian

    ```shell script
    apt install golang-go
    ```

You can actually check out the [official tour of Go](https://tour.golang.org/basics/1), which you can run locally.

```shell script
go get golang.org/x/tour
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

    ```shell script
    go run hello.go
    ```

    {{% samp %}}

    Hello world

    {{% /samp %}}

* If you'd like to separate the compilation and execution steps, use the `build` subcommand

    ```shell script
    go build hello.go

    ./hello.go
    ```

    {{% samp %}}

    Hello world

    {{% /samp %}}


A heads up, oddly enough, the type comes *after* the variable name [article on Go's declaration syntax](https://blog.golang.org/declaration-syntax)

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

You can [install go code](https://golang.org/doc/code.html) that you've written using the `install` subcommand.

For convenience, go commands accept paths relative to the working directory, and default to the package in the current working directory if no other path is given. So in our working directory, the following commands are all equivalent:

```shell script
# Option 1
go install example.com/user/hello

# Option 2
go install .

# Option 3
go install
```

---

There's an interesting article about [callback functions using `defer`](https://blog.golang.org/defer-panic-and-recover)

---

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
