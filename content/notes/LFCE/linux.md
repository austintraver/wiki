# Using Essential Tools

## `hostname`

  ```txt
  us-west-2.compute.internal
  ```

* Print the short host name

  ```sh
  # -s [--short]
  hostname -s
  ```

* Print the DNS domain name

  ```sh
  # -d [--domain]
  hostname -d
  ```

  ```txt
  ip-172-31-47-228
  ```

* Print the long host name (fully qualified domain name)

  ```sh
  # -l [--long] [--fqdn]
  hostname -l [--long]
  ```

  ```txt
  ip-172-31-47-228.us-west-2.compute.internal
  ```

* Print the IP address for the host

  ```sh
  # -i --ip
  hostname --ip
  ```

  ```txt
  172.31.47.228
  ```

## `last

The last command shows a list of the last logged in users

```sh
last
```

```txt
ec2-user pts/0        45.144.81.36     Thu Jun  4 21:01   still logged in   
ec2-user pts/0        45.144.81.36     Thu Jun  4 21:00 - 21:00  (00:00)    
ec2-user pts/0        45.144.81.36     Thu Jun  4 20:58 - 20:58  (00:00)    
reboot   system boot  4.14.177-139.254 Thu Jun  4 20:11 - 21:18  (01:07)    

wtmp begins Thu Jun  4 20:11:08 2020
```

## Misc Notes

Linux Filesystem

`/var`
	log files

`mount`

`/usr`
	for program files


`/mount`
	you can connect a storage device to a separate directory


NFS (network file system)
	can be mounted into the filesystem hierarchy

`/sbin`
	root commands

`/boot`
	for booting, may be on a separate partition
	your linux kernel will be on there

`/dev`
* devices 
 `/sda`
		your hard drive
	`/sda1`
		partition

`/etc`
	configuration files
	OS-RELEASE
		the current linux release

/home
	user home directories

/media
/mnt
	used for connecting devices

/proc
	interface to the linux kernel
	cpuinfo
		cpu info file
	meminfo
		memory info file

/root

/run
	processes that need to write temporary files place them here

/srv
	typically empty,
	service files
	store document files for a web server or ftp server

/sys
	for hardware information

/tmp
	the old directory for temporary files

/var
	a wide variety of files created by the operating system
	/log
		the logs written by hte OS
		messages(.)
			this is a big file on centOS
			"14:23:45 user has logged in to system"


inode
	every file has exactly one inode
	the inode stores all the info you see in `ls -l`
	includes the blocks, the location of the files stored on disk
	two files can point to the same file, neither is the "original" file


hard links can't go across storage devices (mounted volumes / partitions)
hard links can only go to files, not to directories



ls -i (shows the inode number)



tac (does cat, but in reversed order)
	line by line

if you want to reverse each line, top->bottom,
	(< file.txt | rev)




cut: filter output from a text file

cut -d ':'
	look for fields delimited by a column

tr [:lower:] [:upper:]


(delete line 2 of a file)
sed -i -e '2d' myfile.txt



sort -n 	sort numerically
	(otherwise the order is off, because it doesn't sort by numerical order)


user land
	users and processes
	processes do system calls and have permissions
--
kernel land
	the environment with no restrictions
	drivers and hardware access is done here

the root user lives in kernel land
	files with no permissions can still be accessed by root


usermod -aG wheel user
	if a user is part of wheel, they can run commands with sudo
	(this works on centOS and redhat)
	(will only be processed when the user logs back in)
	the group is called wheel because if someone is "the big wheel" he's the boss

on ubuntu the groupname isn't wheel it's admin


modify sudo configurations with sudo visudo

%wheel ALL=(ALL)	ALL
(allows people in group wheel to run all commands without possword)

%wheel ALL=(ALL) NOPASSWD: ALL
(allows people in group wheel to run all commands without password)


lori ALL=/bin/passwd
	this means lori is allowed to set passwords (and that's all she can do)



chvt
	change virtual terminal
	(on linux you have 6 virtual terminals)
	you can use alt f2 f3 to switch between the views

