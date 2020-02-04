+++
title = "SSH"
description = "The secure shell"
date = 2020-01-30T20:14:57-08:00
image = "ssh.jpg"
+++

# SSH


## Enabling `ssh`

```sh
# Enable SSH
sudo systemsetup -f -setremotelogin on
# Disable SSH
sudo systemsetup -f -setremotelogin off
# Check if SSH is enabled/disabled
sudo systemsetup -getremotelogin
```

{: .notice--info}
**Tip:** Add the `-f` flag to `--force` your `systemsetup` to disable a confirmation prompt when running your command. After all, confirmation messages are failsafes and those are only for people who make mistakes.

* Generating an `ssh` key on your computer

  ```sh
  ssh-keygen
  ```

* Converting a private GPG authorization secret RSA subkey (RFC 4880 compliant) to a PEM-encoded private SSH PKCS #1 v2.2 authorization key (RFC 8017 compliant)

  ```sh
  gpg --export-secret-subkeys <auth_key_id>! | openpgp2ssh <auth_key_id> > ~/.ssh/id_rsa
  ```

  {: .notice--success}
  **Tip:** If you don't have that command, [it's this perl script](https://github.com/dkg/monkeysphere/blob/master/src/share/keytrans)

Once you have that key, you ought to convert it into make a bunch of different types

* Making a PKCS #1 v2.2 private key (RFC 8017)

  ```sh
  cp ~/.ssh/id_rsa ~/.ssh/id_pkcs1
  ssh-keygen -p -m pem -f ~/.ssh/id_pkcs1
  head !$
  # -----BEGIN RSA PRIVATE KEY----- #
  ```

* Making a PKCS #8 private key (RFC 5958)

  ```sh
  cp ~/.ssh/id_rsa ~/.ssh/id_pkcs8
  ssh-keygen -p -m pem -f ~/.ssh/id_pkcs8
  head !$
  # -----BEGIN PRIVATE KEY----- #
  ```

* Making an SSH v2 private key (RFC 4716)

  ```sh
  cp ~/.ssh/id_rsa ~/.ssh/id_ssh
  ssh-keygen -p -m rfc4716 ~/.ssh/id_ssh
  head !$
  # -----BEGIN OPENSSH PRIVATE KEY----- #
  ```

### Public Key Conversions

* Obtaining the public key corresponding with an RSA private key `id_rsa.pub` (RFC 4253)

  ```sh
  # Note: this key format is supported by the SSH server
  #       running on macOS, Linux, and Windows
  ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
  ```

* Making an SSH2 public key (RFC 4716)

  ```sh
  # Note: this key format is rarely used in practice
  ssh-keygen -y -m rfc4716 -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
  ```

* View the ASCII *randomart* of an SSH key

  ```sh
  ssh-keygen -lv -f ~/.ssh/id_rsa
  ```

## Copying your `ssh` keys to someone else's computer

There are two ways for you to have your ssh key added to another person's computer. Say you are the user `tommy` and you want `tina` to give you permission to enter her computer without a password.

```sh
# Option one: from tommy's computer
ssh-copy-id tina@172.20.10.7

# Option two: from tina's computer
curl https://github.com/tommy.keys >> ~/.ssh/authorized_keys
```

## Using `ssh` to log into a known user

* The `-l` flag specifies the user to log in as on the remote server.

* Signing into remote.net as the user `tommy`

  ```sh
  # using @
  ssh tommy@remote.net
  # using -l
  ssh -l tommy -p 22 remote.net
  # using a URI
  ssh ssh://tommy@remote.net:22
  ```

## Opening applications on remote computer

You can use the `DISPLAY=0.0` command to tell your `ssh` session to open the application on the remote computer. You won't be able to see the app being opened, but it will launch on the remote computer.

Opening a single application
```sh
DISPLAY=:0.0 open -a Safari
```

{: .notice--info}
Use the `export` keyword in your shell to open all applications on your remote computer

```sh
export DISPLAY=:0.0
open -a Safari
open -a Mail
```

## Seeing if anyone is logged into your computer

```sh
# shows the IP address of all local/remote users (including you!)
who

# (prints just your active session)
who am i

# (kills the session associated with ttys001)
pkill ttys001
```

## Transferring clipboard content from local machine to remote machine

```sh
# local machine -> remote machine
pbpaste | ssh tommy@usc.edu pbcopy
```

## IP

I wrote a program called `$ myip` which will tell you your current public and private IP address. If you'd like to use it, copy the script below into your terminal.

```sh
# Method 1
brew tap austintraver/taps
brew install myip

# Method 2
brew install austintraver/taps/myip
```

Now, you can type `myip` on your terminal, and it will print your current public & private IP address.

## Sockets

When you combine an IP address and a port number, the pair is known as a *socket*. An example of a *local socket* is `127.0.0.1:1234`. An example of a *remote socket* is `41.82.15.112:5678`

In order for a connection attempt to a socket to succeed, something must be "listening" on that socket.

The port that a SSH server listens with in order to accept incoming connections is known as the *target port*.

The port that a SSH client listens with to receive information from the SSH server is known as the *source port*.

Therefore, the *source socket* or *client socket* is the combination of the client's IP address and the *source port*. The *target socket* or *remote socket* is the combination of the server's IP address and the *target port*

Multiple clients can connect using the same target socket.

## `ssh` Tunneling

Tunneling, also known as "port forwarding" reroutes a connection to pass through a `ssh` connection. `ssh` uses the `TCP/IP` protocol on port 22 as a transport mechanism. It's useful not only for forwarding `ssh` data, but also for encrypting data passed through `SMTP`, `IMAP`, `HTTP`, etc.

A *bastion* refers to a small computer, hosted remotely, that works as a *jump box* to help you reach the computer that has initiated a "reverse tunnel" or "inbound port forwarding" to that bastion.

## Configuring your SSH Client

{: .notice--info}
**Tip:** If you need to better understand what a given setting means for your SSH server, you can type `$ man ssh_config`

## Configuring your SSH Server

The config file for a computer's SSH server (used to handle incoming SSH connections) is located at `/etc/ssh/sshd_config`

If you open up this file (use sudo) you'll notice that most of the settings are commented out. If a setting is commented out, that means that it's a default setting. If you uncomment it, nothing would change, so don't go nuts uncommenting files. It's useful to leave the comments. That way, when a preference is not commented out, you know it's a setting you've manually reconfigured.

{: .notice--info}
**Tip:** If you need to better understand what a given setting means for your SSH server, you can type `$ man sshd_config`

## Enabling/Disabling Access to Users

If you're having trouble connecting to a user on a server, modify the `AllowUsers` setting in `sshd_config`. To configure remote users login permissions for local users `tommy`, `tina`, and `billy`, add this line to the super user's `sshd_config`

```
AllowUsers tommy tina
DenyUsers billy
```

You can also allow login functionality to all users within a certain group by modifying the `AllowGroups` setting. To configure login permission for all users in the `trojan` and `bruin` groups, add this line to the super user's `sshd_config`

```
AllowGroups trojans
DenyGroups bruins
```

## Accepting remote connections

You'll have to edit the `sshd_config` file to support incoming connections from a remote user.

Go into the bastion, and add/change the line in `/etc/ssh/sshd_config` that says `#GatewayPorts no` to `GatewayPorts yes`

Then, on your local machine (not the bastion) give your computer the following instructions:

* Build reverse tunnel, allowing users to enter your computer if they first jump through the bastion host

  ```sh
  # When connections are made to
  # user: "jump"
  # port: 1337
  # ip: 12.34.56.78
  ssh -fNR 1337:127.0.0.1:22 jump@12.34.56.78
  # ...forward it to my local machine (127.0.0.1), on port 22
  ```

* Make an SSH connection, jumping from bastion host port 22, to bastion host port 1337 (which forwards to the remote machine)

  ```sh
  # Connect to the machine that opened the connection
  ssh -J jump@remote.net ssh://user@127.0.0.1:1337
  ```

## Restarting the SSH Server

* On macOS

  ```sh
  sudo launchctl kickstart -kp system/com.openssh.sshd
  ```

* On Linux

  ```sh
  sudo service ssh restart
  ```

## Running Local Machine Commands

You don't have to exit the session if you forgot to send over a file, or need to run a local command. Simply press 'enter', followed by '~', followed by 'C' and you will be given a prompt on your local machine.

```
ssh> !scp ~/Desktop/forgot.txt jump@remote.net:~/Desktop
```

If you want to change `~` to be a different key, you can change it in the file `~/.ssh/config`

```txt
Host *
  EscapeChar C
```

Now, you could type "⏎ C C !" to open up the `>ssh` prompt and issue commands on your local machine

## `scp`

The Secure Copy Protocol or SCP is designed to make sending and receiving files from the terminal as secure as possible. You can use the `scp` program in the terminal to send and receive files as follows:

```sh
# Upload local file
scp ~/Downloads/file.txt john@172.20.10.7:~/Downloads/file.txt
# Download remote file
scp john@170.20.10.7:~/Desktop/file.txt ~/Documents/
```

{: .notice--success}
**Tip:** If you need to edit a file on a remote computer, you can actually use `scp` to do so, as follows

```sh
# Option 1: Specifying the path relative to the user's home directory
vi scp://jump@remote.net:22/Desktop/file.txt
# Option 2: Specifying the absolute path
vi scp://jump@remote.net:22//home/jump/Desktop/file.txt
```

## Allow others to view your jupyter notebook

```sh
ssh -fNR 42069:127.0.0.1:8888 jump@remote.net
```

## SOCKS5 Proxy

If you're in a pinch and you need a VPN, but all you have to work with is a server, you can still get most of the advantages of feigning your location by using a SOCKS5 proxy. On macOS, the commands are as follows:

  ```sh
  ssh -fN -D 127.0.0.1:6789 user@remote.net
  sudo networksetup -setsocksfirewallproxy Wi-Fi 127.0.0.1 6789
  sudo networksetup -setsocksfirewallproxystate Wi-Fi on
  ```
