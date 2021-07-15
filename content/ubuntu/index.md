---
title: Ubuntu
description: "A linux distro we can all agree on"
date: 2020-04-23T10:32:49-07:00
draft: false
---

## Users & Groups

* Add a new user to the machine on a Linux OS

  ```shell
  # Default shell /bin/sh
  adduser <user>

  # Custom shell /usr/bin/zsh
  adduser --shell /usr/bin/zsh
  ```

* Add a user to the `sudo` group

  ```shell
  usermod -aG sudo username
  ```

* Delete a user from the machine

  ```shell
  # Keep a backup of the user's home directory, stored in the pwd
  deluser <user> --backup --remove-all-files
  ```

* Delete a group from the machine

  ```shell
  delgroup <group>
  ```

* Change the machine's hostname

  ```shell
  hostnamectl set-hostname <hostname>
  ```

* Change a user's username

  ```shell
  # Short form
  usermod <user> -l <new_username> -md <new_home_filepath>
  # Long form
  usermod <user> --login <new_username> --move-home --home <new_home_filepath>
  ```

* Change a group's name

  ```shell
  # Short form
  groupmod <group_name> -n <new_name>

  # Long form
  groupmod <group_name> --new-name <new_name>
  ```

* Change a user's information on a Linux OS

  ```shell
  # [ Linux ]

  # Short form
  chfn <user> -f "Austin Traver"
  # Long
  chfn <user> --full-name "Austin Traver"
  ```

* View which groups the active user is associated with:

  ```shell
  groups
  ```

  The output is similar to the following:

  ```txt
  staff admin
  ```

  The first group listed in the output is the user's primary group.

* View which groups a particular user belongs to

    ```shell
    groups {{< var USER >}}
    ```

    The output is similar to the following:

    ```txt
    {{< var USER >}} : {{< var USER >}} cdrom floppy audio video admin netdev
    ```

    Where {{< var USER >}} is the name of the user provided in the command.


* Change the owner that a particular file belongs to:

    ```shell
    chgrp {{< var OWNER >}} {{< var FILE >}}
    ```

    Where {{< var OWNER >}} is the owner of the file located
    at the filepath {{< var FILE >}}

* Change the group that a particular file belongs to:

    ```shell
    chgrp {{< var GROUP >}} {{< var FILE >}}
    ```

    Where {{< var GROUP >}} is the group of the file located at 
    the filepath {{< var FILE >}}

{{% aside warning %}}

**Note**: If you need to change both the owner *and* group associated with a
given file, *you change the group first*! If you change the owner first, you will
have lost the permissions required in order to change the group a file belongs
to. As a consequence, *you will no longer be able to change the group*.

{{% /aside %}}

## Apt

* Install the development tools package

    ```shell
    apt install -y build-essential
    ```

* Install the manual pages about using GNU/Linux for development:

    ```shell
    apt install -y manpages-dev
    ```

## Snap

* Installing Snapcraft

    ```shell
    apt install -y snapd
    snap set system refresh.retain=2
    ```


* Finding the specific version of a package

    ```shell
    snap info {{< var PACKAGE >}}
    ```

    Where {{< var PACKAGE >}} is a name, such as `cmake`

* Installing a specific version of a package

    ```shell
    snap install cmake --channel=3.17/stable --classic
    ```

## SMB

Installing SMB server on Ubuntu

* Install the `samba` package from `apt`

    ```shell
    apt update
    apt install -y samba samba-common-bin smbclient cifs-utils
    ```

    ```txt
    [sambashare]
    path = /home/{{< var USER >}}/{{< var DIR >}}
    read only = no
    browsable = yes
    comment = hello world
    ```

    ```shell
    service smbd restart
    ufw allow samba
    smbpasswd -a {{< var USERNAME >}}
    ```

## Update alternatives for common commands

Ubuntu keeps track of the default programs by maintaining a list of symbolic links, under /etc/alternatives directory. Each entry here is a shortcut points to the actual program, which may have more than one option (i.e. alternatives).

* List all existing entries of known alternatives

    ```shell
    update-alternatives --get-selections
    ```

    {{% samp %}}
    ...
    java      auto     /usr/lib/jvm/java-11-openjdk-amd64/bin/java
    javac     auto     /usr/lib/jvm/java-11-openjdk-amd64/bin/javac
    ...
    {{% /samp %}}

* List all possible alternatives of a existing entries


    ```shell
    update-alternatives --list java
    ```

    {{% samp %}}
    /usr/lib/jvm/java-11-openjdk-amd64/bin/java
    /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
    {{% /samp %}}

* Add an unlisted entry to the set of possible alternatives

    ```shell
    # Note: you'll still need to specify an entry using '--set'/'--config'
    update-alternatives --install /usr/bin/editor editor /usr/bin/vi 80
    ```

* Interactivelly set a particular entry as the alternative

    ```shell
    update-alternatives --config java
    ```

* Programmatically set a particular entry as the alternative

    ```shell
    update-alternatives --set editor /usr/bin/nvim
    ```


## C/C++

* Install GCC `v7` through `v10`

    ```shell
    apt install -y build-essential g{cc,++}-{7..10}
    for v in {7..10}; do
        update-alternatives \                                 
        --install /usr/bin/gcc gcc /usr/bin/gcc-${v} $((${v}*10)) \
        --slave /usr/bin/g++ g++ /usr/bin/g++-${v} \         
        --slave /usr/bin/gcov gcov /usr/bin/gcov-${v}
    done
    ```

## Java

* Installing the [OpenJDK](https://snapcraft.io/openjdk) implementation of Java SE:

    * Using Apt

        ```shell
        apt install -y default-jre default-jdk
        ```

    * Using Snapcraft

        ```shell
        snap install openjdk
        ```

## Go

* Installing the [Go](https://snapcraft.io/go) programming language

    * Using Apt

        ```shell
        add-apt-repository -y -u ppa:longsleep/golang-backports
        apt install -y golang
        ```

    * Using Snapcraft

        ```shell
        snap install go --classic
        ```

## Python

* Installing the [Python]() programming language

    ```shell
    apt install -y software-properties-common
    add-apt-repository -y -u ppa:deadsnakes/ppa
    apt install -y python3
    ```

* Setting the command `python` to use Python 3:

    ```shell
    update-alternatives --install /usr/bin/python 'python' /usr/bin/python3 100
    ```

## LLVM

* Installing LLVM the risky way

    ```shell
    # sudo -i
    wget -O - https://apt.llvm.org/llvm.sh | bash -
    ```

## GitHub

* Installing [the GitHub CLI](https://cli.github.com/manual/)

    * Using Snap

        ```shell
        snap install gh
        snap connect gh:ssh-keys
        ```

    * Using APT

        ```shell
        apt-key adv --keyserver 'keyserver.ubuntu.com' --recv-key 'C99B11DEB97541F0'
        add-apt-repository -y -u 'https://cli.github.com/packages'
        apt install -y gh
        ```

## NodeJS

* Installing NodeJS using Snapcraft

    ```shell
    snap install node --classic
    ```

* Installing NodeJS the risky way

    ```shell
    # sudo -i
    curl -sL https://deb.nodesource.com/setup_15.x | bash -
    ```

## AWS

* Installing the AWS CLI from Pip

    ```shell
    apt install python3-pip
    pip3 install awscli --upgrade --user
    ```

## Installation

Installing Ubuntu the hard way

* On macOS:

```shell
hdiutil convert ~/Downloads/ubuntu.iso -format UDRW -o ~/Downloads/ubuntu.img
mv ~/Downloads/ubuntu.img.dmg ~/Downloads/ubuntu.img
diskutil list
diskutil unmount /dev/disk2
sudo dd if=${HOME}/Downloads/ubuntu.img of=/dev/disk2 bs=1m
diskutil eject /dev/disk2
```

# Enable automatic login

Using privileged admin account [open up terminal][] or your favorite text 
editor and edit the configuration file `/etc/gdm3/custom.conf`

Change the following snippet from

Before you begin editing, your configuration might look like this:

```conf
[daemon]
# Uncoment the line below to force the login screen to use Xorg
#WaylandEnable=false

# Enabling automatic login
#  AutomaticLoginEnable = true
#  AutomaticLogin = {{< var USERNAME >}}
```

Change the file so that it instead looks like this:

```conf
[daemon]
# Uncoment the line below to force the login screen to use Xorg
#WaylandEnable=false

# Enabling automatic login
AutomaticLoginEnable = true
AutomaticLogin = {{< var USERNAME >}}
```

You will need root/administrator privileges to perform this operation. Uncommenting the above lines will enable automatic login for the `linuxconfig` user. Change the username to suit your needs.

[open up terminal]: https://linuxconfig.org/how-to-open-a-terminal-on-ubuntu-bionic-beaver-18-04-linux

## Snap Packages

Ubuntu is migrating away from using Debian's Apt to manage packages, and toward using Canonical's [Snapcraft](https://snapcraft.io)

They wrote an article titled [How to keep your Linux disk usage nice and and tidy](https://snapcraft.io/blog/how-to-keep-your-linux-disk-usage-nice-and-tidy-and-save-space) where I learned you can reduce the number of prior package versions that Snapcraft keeps, which by default, is three.

```shell
snap set system refresh.retain=2
```

## Distribution Upgrades

Ubuntu 20.04 "Focal Fossa" has just released, so I thought I'd write a guide on how to upgrade.

* Upgrading to the latest Ubuntu distro:

0. Sign in to the `root` user

    ```shell
    sudo -i
    ```

1. Update the `/etc/apt/sources.list`, replace any entries of `bionic` or `eoal` with `focal`

    ```shell
    sed -i 's/bionic/focal/g' /etc/apt/sources.list
    ```

2. Run the `apt` commands below

    ```shell
    apt update
    apt upgrade
    apt full-upgrade
    apt install -y update-manager-core
    reboot
    do-release-upgrade -d
    ```

3. Verify successful upgrade by checking the current distribution number

    ```shell
    lsb_release -a
    ```


## Google Cloud SDK

* [Installing a Snap package](https://cloud.google.com/sdk/docs/downloads-snap) for the Google Cloud SDK:

    ```shell
    snap install google-cloud-sdk --classic
    ```

## Vim

* Installing NeoVim

    ```shell
    snap install neovim --classic
    ```
