+++
title = "Rasberry Pi"
description = "What was once brought to you by a supercomputer, can now be achieved with a $20 bill"
date = 2020-02-04T07:44:58-08:00
image = "pi.jpg"
+++

# Raspberry Pi

* Setting up Raspberry Pi

```sh
<<-EOF > /Volumes/boot/wpa_supplicant.conf
country=US # Your 2-digit country code
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
    ssid="the_network_name"
    psk="the_network_password"
    key_mgmt=WPA-PSK
}
EOF
```

{:.notice--success}
**Tip:** With this file in place, Raspbian will move it in `/etc/wpa_supplicant/` when the system is booted

* Measure temperature of Raspberry Pi

```sh
vcgencmd measure_temp
# temp=51.0'C
```

* Print the MAC address of the ethernet and WiFi connections

  ```sh
  cat /sys/class/net/eth0/address
  cat /sys/class/net/wlan0/address
  ```

* Alter the MAC address of a network device

  ```sh
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

  ```sh
  - to make it permanent, within /etc/network/interfaces, add the following stanza to the eth0 block: "pre-up ip link set dev eth0 address 02:03:04:05:06:07"

# `wall`

You can use `wall` to write a message to all open terminals.

* Write `hello world` to every terminal:

  ```sh
  wall "hello world"
  ```

# `mesg`

Message is a command line messaging tool

* Enable receiving messages

  ```sh
  mesg y
  ```

* Send a message to the user `tommy` on `tty1`

  ```sh
  ls | write tommy tty1
  ```

## `date`

Change the current time on the computer

  ```sh
  # Totally not when this was written...
  sudo date -s '30 Nov 2019 04:38'
  ```

## `systemctl`

* Enable booting to the command-line

  ```sh
  sudo systemctl set-default multi-user.target
  ```

## `cec-utils`

Consumer Electronics Control (CEC) is supported by most displays, including Samsung TVs. If your Raspberry Pi is connected to a Samsung TV via HDMI, you can use these commands.

* Getting Started

  ```sh
  sudo apt install cec-utils
  ```

* Make the raspberry pi's console the active source for input

  ```sh
  cec-client -s -d 1 <<< "as"
  ```

* Turn the TV off (standby mode)

  ```sh
  cec-client -s -d 1 <<< "standby 0"
  ```

* Check the current TV status (on or off)

  ```sh
  cec-client -s -d 1 <<< "pow 0"
  ```

## `config.txt`

If you're using a 1920 x 1080 display for your raspberry pi, the text may appear too small. If you want to leverage pixel doubling to increase the UI scale (rendering each pixel as a 2x2 matrix), then add the following lines to your `/boot/config.txt`

```text
hdmi_group=1
hdmi_mode=15
```
