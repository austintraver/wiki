---
title: Homebrew
description: "The package manager for macOS"
date: 2020-02-04T14:52:27-08:00

---

# Homebrew

## Getting Started

### Installing `brew` Itself

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Installing software with `brew`

#### Installing Programs

Use the `search` command to search for a program, and see if it exists on `brew` (it always does)

```sh
brew search wget
```

Use the `install` command to download a program

```sh
brew install wget
```

#### Installing Applications

Use the `cask` command to install applications directly onto your computer

```sh
brew cask install google-chrome
brew cask install microsoft-office
brew cask install java
```

#### Multiple Installations with 1 Command

```sh
brew install wget watch tree
```

#### What all has been installed?

To see a list of programs that were installed by `brew`, as well as their dependencies, use the `list` command

```sh
brew list
```

### Dependencies

#### What does this program depend on?

See the dependencies for `wget`

```sh
brew deps wget
```

#### What depends on this program?

See all packages that depend on `python3`

```sh
brew uses python3 --installed
```

{{% aside warning %}}
**Warning:** If you don't specify `--installed` it will show you every application that uses this program, even ones you haven't installed on your computer.
{{% /aside %}}

#### What can I uninstall?

List all programs that nothing depends on.

```sh
brew leaves
```

Uninstall a program

```sh
brew uninstall wget
```


#### Where are my programs & applications installed?

`brew` will symlink all of the files that you have installed to `/usr/local/bin` which is automatically part of your `${PATH}` variable. Therefore, if you install `wget` then you can call it directly from your terminal, because the program will execute once it is found at `/usr/local/bin/wget`

You can get more information than that, however. For instance, the command below shows you where a file was installed 

```sh
brew --prefix wget
```

```txt
/usr/local/opt/wget
```

Note that although the returned output is correct, it's truly a symlink to the directory `/usr/local/Cellar/wget/0.8.5`

#### Where is `brew` itself installed?

`brew` is usually installed at `/Users/username/Library/Caches/Homebrew`. You can check for yourself by typing

```sh
brew --cache
```

## The `services` Command

Sometimes you want to install an application that needs to run at launch, such as a server. For example, let's install two common database servers, MongoDB and MySQL

```sh
# [Install MongoDB & MySQL]
brew install mongodb && brew install mysql
# [Brew service list]
brew services list
```

Using the `services` command, `brew` makes it easy to configure when you want the server to start.

#### View current server configurations

```sh
brew services list
```

#### Starting a server

```sh
# [Configure the server to always start at runtime]
brew services start mongodb
# [Start the server, but just this once]
brew services run mongodb
```

#### Stopping a server

```sh
brew services stop mongodb
```

{ .notice--warning}
**Note:** This will also prevent it from starting automatically the next time you login. The next time you want it to start you'll have to use one of the two commands above.

## `/usr/local/opt`

If you try to install `ruby` with `brew` then you will notice it's not in `/usr/local/bin` like most programs. The reason is because `brew` doesn't want it to interfere with the native Mac OS version. Instead, it puts it in a different directory called `/usr/local/opt`. The directories inside of this folder are symlinks to the current version of the binary that's installed. It adds a layer of protection, and makes sure that the version used is always the most current.

## Making Your Own Homebrew Packages

So you want to distribute your tools to the masses, yes? Build something super cool that you'd like to share with others? Well luckily that's pretty easy thing to do these days (once you know how). If you've been using `brew` to install packages, you've probably just been using one master nexus of formulae, known as Homebrew's *core tap*.

Before we go further, I have to define some terms used in the Homebrew ecosystem:

**Formula**: A ruby file that outlines how a package is to be installed.
**Tap**: A public repository containing Homebrew formulae. To have a tap named `anything`, the repository should be called `homebrew-anything`.

1. Make a tap repository on GitHub called `homebrew-tap`
  - It can be `homebrew-anything` but `tap` is a pretty self-explanitory name.

2. Add a formula for what you want to have installed. As an example, I'm creating a formula called `drain.rb`. When this formula is used, it will add a command `drain` to your terminal, which allows you to free up ports that are currently in-use. It will also install the manual file, which can be seen by typing `man drain` after it is installed.

```rb
class Drain < Formula
  desc "A command line tool to free up clogged ports"
  # Every formula needs a homepage
  homepage "https://github.com/austintraver/homebrew-tap/Packages/drain"
  # This is the url pointing to where the file gets downloaded from
  # in this case, it's `./Archive/drain-1.0.tgz` from the repository
  url "https://github.com/austintraver/homebrew-tap/raw/master/Archive/drain-1.0.tgz"
  sha256 "70d98fbe00ac67b8c3a19037c3e53db80b7cc048f60cd479bf74d1073a30463d"
  version "1.0"

  # Here is where you can list dependencies on other Homebrew packages
  depends_on "coreutils"
  depends_on "python"

  # Bottle is currently not needed, (but explained in a section below)
  bottle :unneeded

  def install
    # Add the command "drain" to /usr/local/bin
    bin.install "bin/drain"

    # Add the manual for drain to /usr/local/share/man/man1/drain.1
    man.mkpath
    man1.install "man/drain.1"
  end

end
```

## Bottles

Bottles are pre-compiled binary versions of packages. Installing a program via its bottle is much faster than compiling the files on your local machine. If you have a package that you would like to build a bottle for, you can follow along the following process.

In this example, we're going to assume that you've created a formula that installs `gcc` on macOS, as `gcc` takes notoriously long to build locally (upwards of 45 minutes).

* Install `gcc` from custom formula, and build it from source, preparing the package for bottling:

  ```sh
  brew install --build-bottle ./path/to/gcc.rb
  ```

* Bottle `gcc`, after having installed it using the previous command

  ```sh
  brew bottle gcc
  # [ Output ]
  # ./gcc--9.2.catalina.bottle.1.tar.gz
  # bottle do
  #   rebuild 1
  #   sha256 "b4d47ffd6774d6ed57e0a237a105364a377347abd667f6c8bb451a122a428f97" => :catalina
  # end
  ```

After the previous step, you'll have a file `gcc--9.2.catalina.bottle.tar.gz` in your present working directory. Assuming you want to keep the bottle as part of your tap, put it in the folder `./homebrew-tap/Bottles/`.

* Moving `gcc` bottle into the appropriate location in the repository

  ```sh
  # Note the name change!!!
  mv 'gcc--9.2.catalina.bottle.tar.gz' ./homebrew-tap/Bottles/gcc-9.2.catalina.bottle.tar.gz
  ```

{{% aside danger %}}
  **Warning:** By default, the name of the bottle is a little off. You need to make sure there is exactly one hyphen `-` between the name of the formula and the formula's version number.
{{% /aside %}}

Next, you'll need to add the output from the bottling command to your recipe. The `sha256` value represents the checksum of the archive you just created. You can verify that it matches the bottle file with `sha -a 256 ./path/to/bottle.tar.gz`

* Adding the bottle specifications to the file

  ```rb
  class Gcc < Formula
    desc "GNU compiler collection"
    homepage "https://gcc.gnu.org/"
    url "https://ftp.gnu.org/gnu/gcc/gcc-9.2.0/gcc-9.2.0.tar.xz"
    sha256 "ea6ef08f121239da5695f76c9b33637a118dcf63e24164422231917fa61fb206"
    version '9.2'

    # Example requirement: require that command-line tools are installed
    pour_bottle? do
      reason "The bottle needs the Xcode CLT to be installed."
      satisfy { MacOS::CLT.installed? }
    end

    # This is the bottle specification section
    bottle do
      # Username: `austintraver`
      # Repo name: `homebrew-tap`
      # Path to the file inside the repo: ./homebrew-tap/Bottles/gcc-9.2.catalina.bottle.1.tar.gz
      root_url "https://github.com/austintraver/homebrew-tap/raw/master/Bottles"
      sha256 "cae3defff6e1739bb162313429876af16dabfb9a0dd346b7045d293f51a35590" => :catalina
    end

    # ...
    # ...
    # ...

  end
  ```

Next, we'll need to actually add the file to the repository. Since this is a binary file, we shouldn't perform a traditional `git add` as we would for a traditional file. We'll be using the `lfs` subcommand for `git`. This is an extension of `git` supported by GitHub for large file storage. You can add it with `brew install git-lfs` or `apt install git-lfs`.

* Initialize the repository for `git lfs` support.

  ```sh
  git lfs install --local
  ```

{{% aside danger %}}
  **Warning:** If you don't include the `--local` flag, `git-lfs` will modify your global git configuration, which will cause Homebrew to throw errors when it is updating your tap. If you've already made the mistake, you can reverse it by entering the command `git lfs uninstall` followed by the command `git lfs install --local`
{{% /aside %}}

* Add any compressed `tar` archives to large file storage

  ```sh
  git lfs track '*.tar.gz'
  ```

* Add `.gitattributes` to the commit, to enact the changes made

  ```sh
  git add .gitattributes
  ```

* Commit and push the updated formula and bottle

  ```sh
  git commit -m "Add bottle for GCC" && git push
  ```
