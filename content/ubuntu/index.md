---
title: Ubuntu
description: "A linux distro we can all agree on"
date: 2020-04-23T10:32:49-07:00
draft: false
---

# Distribution Upgrades

Ubuntu 20.04 "Focal Fossa" has just released, so I thought I'd write a guide on how to upgrade.

* Upgrading to the latest Ubuntu distro:

0. Sign in to the `root` user

    ```shell script
    sudo -i
    ```

1. Update the `/etc/apt/sources.list`, replace any entries of `bionic` or `eoal` with `focal`

    ```shell script
    sed -i 's/bionic/focal/g' /etc/apt/sources.list
    ```

2. Run the `apt` commands below

    ```shell script
    apt update
    apt upgrade
    apt full-upgrade
    apt install update-manager-core
    reboot
    do-release-upgrade -d
    ```

3. Verify successful upgrade by checking the current distribution number

    ```shell script
    lsb_release -a
    ```

## Users & Groups

* Add a new user to the machine on a Linux OS

  ```shell script
  # Default shell /bin/sh
  sudo adduser <user>

  # Custom shell /usr/bin/zsh
  sudo adduser --shell /usr/bin/zsh
  ```

* Add a user to the `sudo` group

  ```shell script
  usermod -aG sudo username
  ```

* Delete a user from the machine

  ```shell script
  # Keep a backup of the user's home directory, stored in the pwd
  sudo deluser <user> --backup --remove-all-files
  ```

* Delete a group from the machine

  ```shell script
  sudo delgroup <group>
  ```

* Change the machine's hostname

  ```shell script
  sudo hostnamectl set-hostname <hostname>
  ```

* Change a user's username

  ```shell script
  # Short form
  usermod <user> -l <new_username> -md <new_home_filepath>
  # Long form
  usermod <user> --login <new_username> --move-home --home <new_home_filepath>
  ```

* Change a group's name

  ```shell script
  # Short form
  groupmod <group_name> -n <new_name>

  # Long form
  groupmod <group_name> --new-name <new_name>
  ```

* Change a user's information on a Linux OS

  ```shell script
  # [ Linux ]

  # Short form
  chfn <user> -f "Austin Traver"
  # Long
  chfn <user> --full-name "Austin Traver"
  ```

* View which groups a user is associated with

  ```shell script
  # For the current user (first group is the primary group)
  groups
  # => staff admin

  # For any other user
  groups <user>
  ```

## Apt

* Install the development tools package

    ```shell script
    sudo apt update
    sudo apt install build-essential
    ```

* Install the manual pages about using GNU/Linux for development:

    ```shell script
    apt-get install manpages-dev
    ```

## Snap

* Finding the specific version of a package

    ```shell script
    snap info cmake
    ```

* Installing a specific version of a package

    ```shell script
    sudo snap install cmake --channel=3.17/stable --classic
    ```

## SMB

Installing SMB server on Ubuntu

* Install the `samba` package from `apt`

    ```shell script
    sudo apt update
    sudo apt install samba samba-common-bin smbclient cifs-utils
    ```

    ```txt
    [sambashare]
    path = /home/{{< var USER >}}/{{< var DIR >}}
    read only = no
    browsable = yes
    comment = hello world
    ```

    ```shell script
    sudo service smbd restart
    sudo ufw allow samba
    sudo smbpasswd -a {{< var USERNAME >}}
    ```

## Update alternatives for common commands

Ubuntu keeps track of the default programs by maintaining a list of symbolic links, under /etc/alternatives directory. Each entry here is a shortcut points to the actual program, which may have more than one option (i.e. alternatives).

* List all existing entries of known alternatives

    ```shell script
    update-alternatives --get-selections
    ```

    {{% samp %}}
    ...
    java      auto     /usr/lib/jvm/java-11-openjdk-amd64/bin/java
    javac     auto     /usr/lib/jvm/java-11-openjdk-amd64/bin/javac
    ...
    {{% /samp %}}

* List all possible alternatives of a existing entries


    ```shell script
    update-alternatives --list java
    ```

    {{% samp %}}
    /usr/lib/jvm/java-11-openjdk-amd64/bin/java
    /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
    {{% /samp %}}

* Add an unlisted entry to the set of possible alternatives

    ```shell script
    # Note: you'll still need to specify an entry using '--set'/'--config'
    update-alternatives --install /usr/bin/editor editor /usr/bin/vi 80
    ```

* Interactivelly set a particular entry as the alternative

    ```shell script
    update-alternatives --config java
    ```

* Programmatically set a particular entry as the alternative

    ```shell script
    update-alternatives --set editor /usr/bin/nvim
    ```


## C/C++

* Install GCC `v7` through `v10`

    ```shell script
    sudo apt install -y build-essential g{cc,++}-{7..10}
    for v in {7..10}; do
        sudo update-alternatives \                                 
        --install /usr/bin/gcc gcc /usr/bin/gcc-${v} $((${v}*10)) \
        --slave /usr/bin/g++ g++ /usr/bin/g++-${v} \         
        --slave /usr/bin/gcov gcov /usr/bin/gcov-${v}
    done
    ```

# Java

* Installing the [openJDK](https://snapcraft.io/openjdk) implementation of Java SE:

    ```shell script
    sudo snap install openjdk --candidate
    ```

# Go

* Installing the [Go](https://snapcraft.io/go) programming language

    ```shell script
    sudo snap install go --classic
    ```

# Python

* Installing the [Python]() programming language

    ```shell script
    sudo apt install software-properties-common
    sudo add-apt-repository ppa:deadsnakes/ppa
    sudo apt install python3.9
    ```

# GitHub

* Installing [the GitHub CLI](https://cli.github.com/manual/)

    * Using Snap

        ```shell script
        sudo snap install --edge gh
        snap connect gh:ssh-keys
        ```

    * Using APT

        ```shell script
        sudo apt-key adv --keyserver 'keyserver.ubuntu.com' --recv-key 'C99B11DEB97541F0'
        sudo apt-add-repository 'https://cli.github.com/packages'
        sudo apt update
        sudo apt install gh
        ```

# Samba

* Installing Samba

    ```shell script
    sudo apt install samba
    ```

# NodeJS

* Installing NodeJS

    ```shell script
    v=15; curl -sL https://deb.nodesource.com/setup_${v}.x | sudo -E bash -
    ```

# Installing Ubuntu the hard way

* On macOS:

```shell script
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

before

```conf
[daemon]
# Uncoment the line below to force the login screen to use Xorg
#WaylandEnable=false

# Enabling automatic login
#  AutomaticLoginEnable = true
#  AutomaticLogin = user1
```

after

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

```shell script
sudo snap set system refresh.retain=2
```
