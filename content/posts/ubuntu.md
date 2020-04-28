+++
title = "Ubuntu"
date = 2020-04-23T10:32:49-07:00
image = "ubuntu.jpg"
+++

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

  3. Check the distribution number

  ```sh
  lsb_release -a
  ```
