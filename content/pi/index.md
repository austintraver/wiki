---
title: "Raspberry Pi"
description: "What was once brought to you by a supercomputer, can now be achieved with a $20 bill"
date: 2020-02-04T14:52:27-08:00
---

# Raspberry Pi

## Headless Installation

This is mostly taken from the article [Setting up a Raspberry Pi headless](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md) 

First, you'll need to format the SD card to [install Raspberry Pi OS](https://www.raspberrypi.org/software/). 

Once you've done that, you'll need to mount the SD card to your computer once more. The volume should mount as `boot`. 

We're going to create a file named `wpa_supplicant.conf` and add it to the root of the `/boot` Volume mounted on our computer.

```conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country={{< var COUNTRY >}}
network={
    ssid="{{< var SSID >}}"
    psk="{{< var PSK >}}"
}
```

If your WiFi doesn't have a password, you'll need to make some changes, as shown below.

```conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country={{< var COUNTRY >}}
network={
    ssid="{{< var SSID >}}"
    key_mgmt=NONE
}
```

You'll need to replace the following values:

* `SSID`: the name of the WiFi network
* `PSK`: the password of the WiFi network
* `COUNTRY`: The 2-letter [ISO 3166-1 country code](https://en.wikipedia.org/wiki/ISO_3166-1)

When the Raspberry Pi boots from this SD card, Raspberry Pi OS will move the contents of this file into `/etc/wpa_supplicant/`

Also, you'll probably want to enable SSH access, which is disabled by default. To do so, create an empty file `ssh` in the root folder of the `/boot` Volume mounted on our host machine.

```shell
touch /Volumes/boot/ssh
```

Now you can access the Raspberry Pi with the following credentials

* Username: `pi`
* Password: `raspberry`
* Hostname: `raspberrypi`

Visit the official documentation to learn more about [remote access to Raspberry Pi](https://www.raspberrypi.org/documentation/remote-access/ip-address.md), or [how to configure your Raspberry Pi](https://www.raspberrypi.org/documentation/configuration/)

### Customizing Video Resolution

* Link to [documentation](https://www.raspberrypi.org/documentation/configuration/config-txt/video.md)

If you're using a 1920 x 1080 display for your raspberry pi, the text may appear too small. If you want to leverage pixel doubling to increase the UI scale (rendering each pixel as a 2x2 matrix), then add the following lines to your `/boot/config.txt`

```txt
hdmi_group=1
hdmi_mode=15
```

## VNC

Documentation on Virtual Network Computing (VNC) implementation can be found [here](https://www.raspberrypi.org/documentation/remote-access/vnc/README.md)

## SMB

Documentation on the Server Message Block (SMB) implementation can be found [here](https://www.raspberrypi.org/documentation/remote-access/samba.md)

## Useful Tricks

* Measure temperature of Raspberry Pi

    ```shell
    vcgencmd measure_temp
    # temp=51.0'C
    ```

* Print the MAC address of the ethernet and WiFi connections

    ```shell
    cat /sys/class/net/eth0/address
    cat /sys/class/net/wlan0/address
    ```

* Alter the MAC address of a network device

    ```shell
    # Bring the network interface "eth0" offline
    ip link set dev eth0 down
    # Alter the address of the network interface "eth0"
    ip link set dev eth0 address a2:b4:c6:d8:e0:1d:2e
    # Bring the network interface "eth0" online
    ip link set dev eth0 up
    # Check the address
    ip link show eth0
    ```

* Make the changed MAC address permanent

    ```shell
    - to make it permanent, within /etc/network/interfaces, add the following stanza to the eth0 block: "pre-up ip link set dev eth0 address 02:03:04:05:06:07"
    ```

* Write `hello world` to every terminal:

    ```shell
    wall "hello world"
    ```

* Enable receiving messages

    ```shell
    mesg y
    ```

* Send a message to the user `tommy` on `tty1`

    ```shell
    ls | write tommy tty1
    ```

* Change the current time on the computer

    ```shell
    # Totally not when this was written...
    sudo date -s '30 Nov 2019 04:38'
    ```

* Enable booting to the command-line

    ```shell
    sudo systemctl set-default multi-user.target
    ```

## `cec-utils`

Consumer Electronics Control (CEC) is supported by most displays, including Samsung TVs. If your Raspberry Pi is connected to a Samsung TV via HDMI, you can use these commands.

* Getting Started

    ```shell
    sudo apt install cec-utils
    ```

* Make the raspberry pi's console the active source for input

    ```shell
    cec-client -s -d 1 <<< "as"
    ```

* Turn the TV off (standby mode)

    ```shell
    cec-client -s -d 1 <<< "standby 0"
    ```

* Check the current TV status (on or off)

    ```shell
    cec-client -s -d 1 <<< "pow 0"
    ```


## Connecting to Airport Time Capsule

Create `/etc/fstab`

```txt
proc            /proc           proc    defaults          0       0
PARTUUID=c8e1868f-01  /boot           vfat    defaults          0       2
PARTUUID=c8e1868f-02  /               ext4    defaults,noatime  0       1
# a swapfile is not a swap partition, no line here
#   use  dphys-swapfile swap[on|off]  for that
//{{< var TMC_IP_ADDRESS >}}/{{< var TMC_MOUNT_FOLDER >}} /mnt/{{< var RPI_MOUNT_FOLDER>}} cifs user={{< var TMC_NAME >}},pass={{< var TMC_PASSWORD >}},rw,uid=1000,iocharset=utf8,sec=ntlm,vers=1.0 0 0
```

## Backups

```shell
mount -t cifs //chronos.local/Alexandria /mnt/delorean 
rsync -axHv --exclude-from exclude.txt --delete-during / /mnt/delorean/rpi/
```
