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

    ```shell
    # macOS
    brew install go
    ```

* on Debian

    ```shell
    apt install golang-go
    ```

You can actually check out the [official tour of Go](https://tour.golang.org/basics/1), which you can run locally.

```shell
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

    ```shell
    go run hello.go
    ```

    {{% samp %}}

    Hello world

    {{% /samp %}}

* If you'd like to separate the compilation and execution steps, use the `build` subcommand

    ```shell
    go build hello.go

    ./hello.go
    ```

    {{% samp %}}

    Hello world

    {{% /samp %}}


A heads up, oddly enough, the type comes *after* the variable name [article on Go's declaration syntax](https://blog.golang.org/declaration-syntax)

## Strings

[Creating a string representation](https://tour.golang.org/methods/17) of an interface:

```go
type Person struct {
	Name string
	Age  int
}

func (p Person) String() string {
    return fmt.Sprintf("The person named %v is %v years old", p.Name, p.Age)
}
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

You can [install go code](https://golang.org/doc/code.html) that you've written using the `install` subcommand.

For convenience, go commands accept paths relative to the working directory, and default to the package in the current working directory if no other path is given. So in our working directory, the following commands are all equivalent:

```shell
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

---

## Have a slice

Slices are a bit tricky, but Rob Pike explains it well in his blog post: <https://blog.golang.org/slices>

Also, felt this was worth writing down for my own safe-keeping:

> It is idiomatic to use a pointer receiver for a method that modifies a slice.
>
> --Rob Pike

--

## Arrays

Arrays are used less often than slices, but sometimes you find yourself in a situation where you'd like
to create a fixed size array, using the values contained within a slice. Here is the idiomatic way
for you to do precisely that:

```go
var fixed [3]int

sliced := []int{1, 2, 3, 5, 8, 13}

copy(fixed[:], sliced)
```

This syntax takes advantage of the faxt that `copy` will only copy the minimum of `len(src)` and `len(dst)` bytes.

---

## Scanners

If you need to read a file in line by line, the most idiomatic way to do so is by using `bufio.Scanner`

```go
file := os.Open("file.txt")
scanner := bufio.NewScanner(file)
scanner.Split(bufio.ScanLines)
var txtlines []string

for scanner.Scan() {
    txtlines = append(txtlines, scanner.Text())
}

file.Close()

for _, eachline := range txtlines {
    fmt.Println(eachline)
}
```

## JSON Marshalling

Make an HTTP request, receive JSON in the body of the response, and unmarshall that JSON
into a Go struct named `result`:

```go
response, err := http.Get("example.com/api/gimmejson")
if err != nil {
    return
}
defer func(Body io.ReadCloser) {
    err = Body.Close()
    if err != nil {
        return
    }
}(response.Body)

data, err := io.ReadAll(response.Body)
if err != nil {
    return
}
err = json.Unmarshal(data, result)
return
```

## Style

Below are some notes I took while reading "The Go Programming Language"

The letters of acronyms and initialisms like ASCII and HTML are always rendered in the same case, so you might
want to call a function `htmlEscape`, `HTMLEscape`, or `escapeHTML`, but should avoid calling it `escapeHtml`.

A *declaration* names a program entity and specifies some or all of its properties. In Go, the four main types
of declarations are `var`, `const`, `type`, and `func`, but every `.go` file begins with a `package` declaration,
followed by `import` declarations, and finally, zero-or-more *package-level* declarations.

In Go, there is no such thing as an uninitialized variable. If a value is not provided for a variable at its declaration, 
the variable will have its value initialized to the *zero-value* corresponding to that variable's underlying type.

The `:=` operator performs *short variable* declaration. Unlike the `=` operator, which performs assignment, the `:=` operator performs declaration, which is distinct from assignment.

* The *expression* `&x` should be read as "address of `x`"

* The *expression* `*int` should be read as "pointer to `int`"

The zero value for a pointer of any type is `nil`. If there is a variable `p`, which is a pointer type variable, the test `p != nil` is true
if `p` points to a variable. Two pointers are equal if and only if they point to the same variable, or are both equal to `nil`.

The expression `new(T)` creates an *unnamed variable* of type `T`, initializes it to the *zero-value* of type T, and returns its address, which
is a value of type `*T`.
