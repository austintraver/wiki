---
title: Ubuntu
description: "A linux distro we can all agree on"
date: 2020-04-23T10:32:49-07:00
draft: true
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


## Snap

* Finding the specific version of a package

    ```shell script
    snap info cmake
    ```

* Installing a specific version of a package

    ```shell script
    sudo snap install cmake --channel=3.17/stable --classic
    ```
