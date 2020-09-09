---
title: Ubuntu
description: "A linux distro we can all agree on"
date: 2020-04-23T10:32:49-07:00
image: "ubuntu.jpg"
---

# Distribution Upgrades

Ubuntu 20.04 "Focal Fossa" has just released, so I thought I'd write a guide on how to upgrade.

* Upgrading to the latest Ubuntu distro:

  0. Sign in to the `root` user

  ```sh
  sudo -i
  ```

  1. Update the `/etc/apt/sources.list`, replace any entries of `bionic` or `eoal` with `focal`

  ```sh
  sed -i 's/bionic/focal/g' /etc/apt/sources.list
  ```

  2. Run the `apt` commands below

  ```sh
  apt update
  apt upgrade
  apt full-upgrade
  apt install update-manager-core
  reboot
  do-release-upgrade -d
  ```

  3. Verify successful upgrade by checking the current distribution number

  ```sh
  lsb_release -a
  ```

## Users & Groups

* Add a new user to the machine on a Linux OS

  ```sh
  # Default shell /bin/sh
  sudo adduser <user>

  # Custom shell /usr/bin/zsh
  sudo adduser --shell /usr/bin/zsh
  ```

* Add a user to the `sudo` group

  ```sh
  usermod -aG sudo username
  ```

* Delete a user from the machine

  ```sh
  # Keep a backup of the user's home directory, stored in the pwd
  sudo deluser <user> --backup --remove-all-files
  ```

* Delete a group from the machine

  ```sh
  sudo delgroup <group>
  ```

* Change the machine's hostname

  ```sh
  sudo hostnamectl set-hostname <hostname>
  ```

* Change a user's username

  ```sh
  # Short form
  usermod <user> -l <new_username> -md <new_home_filepath>
  # Long form
  usermod <user> --login <new_username> --move-home --home <new_home_filepath>
  ```

* Change a group's name

  ```sh
  # Short form
  groupmod <group_name> -n <new_name>

  # Long form
  groupmod <group_name> --new-name <new_name>
  ```

* Change a user's information on a Linux OS

  ```sh
  # [ Linux ]

  # Short form
  chfn <user> -f "Austin Traver"
  # Long
  chfn <user> --full-name "Austin Traver"
  ```

* View which groups a user is associated with

  ```sh
  # For the current user (first group is the primary group)
  groups
  # => staff admin

  # For any other user
  groups <user>
  ```

