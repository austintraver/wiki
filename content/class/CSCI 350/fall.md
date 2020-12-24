---
title: CSCI 350
description: "Operating Systems"
date: 2020-08-17
draft: true
---

# Lecture 1

Date: 2020-08-17

There are 5 project grace days, which are classic CS style grace days

* The stack is faster to access than the heap

* The heap and stack grow in different directions


## [AT&T Archives: The UNIX Operating System](https://www.youtube.com/watch?v=tc4ROCJYbm0)

* Novel ideas from UNIX
    * If I type the name of a file, have the shell treat it as a command
    * I/O redirection allows you to create a pipeline of commands, one into another
        * "input/output redirection is handled not by the program, but by the shell"
        * "peripherals like the printer and disk drive are treated as files"
        * `sort | uniq`
        * `command > out.txt`
        * `command < in.txt`
    * A file is just a location in memory, and a size in bytes

## OS Challenges

* Reliability
* Availability
* Security
* Performance
    * Latency
    * Throughput
    * Overhead
    * Fairness
    * Predictability
* Portability

## Process

* A process is launched by running an executable program
  * A process is an *instance* of a program
* There are two main components of a process
  * Address Space
    * Code
    * Data
    * Stack
    * Heap
    * Kernel Stack
  * State
    * Process Control Block
    * Registers
    * Program Counter
    * List of Open Files


## Stack & Heap

* Stack and Heap grow in opposite directions
* The stack is faster to access than the heap
* The stack is in charge of the recursive function calls and statically allocated data
* The heap is in charge of dynamically allocated memory at runtime

## xv6 Process States

`proc.h`:
  `enum procstate {UNUSED, EMBRYO, SLEEPING, RUNNABLE, RUNNING, ZOMBIE};`


## System Calls

* A system call is the interface between a user app and a service provided by the OS
  * A system call is basically the OS's API (e.g. `libc`)

* Examples
  * POSIX API for POSIX systems (macOS)
  * Java API for Java JVM

---

# Lecture 2

## Context Switching

* the act of switching the CPU from one active process to a different process
* 3 steps:
  * 1. save state of current process
  * 2. load state of other process
  * 3. continue execution of that loaded process

## Processor State

* The current content of the CPU registers

## Kernel Organization

1. Monolithic
  * macOS, Linux, Windows
  * it's fast because the kernel manages everything except applications, which are added in user mode.
  * it's not reliable, it's not secure, just has good performance.
2. Layered
  * file system, virtual memory, etc., all separated from each other.


* HAL Hardware Abstraction Layer


# Dynamically Installed Device Drivers

* Goal: accommodate a wide variety of physical I/O devices

# Virtual Machines

* Host: the underlying hardware system or OS
* Hypervisor: manages the resources of the underlying hardware and provides an abstraction of one or more virtual machines
* Guest: the software running within the OS
    * All guest software (including the guest OS) run in user mode

* Network Interface Controller NIC: a computer hardware component that connects a computer to a computer network. Early network interface controllers were commonly implemented on expansion cards that plugged into a computer bus

* Containers are popular because they use fewer resources than virtual machines, the package code and dependencies are bundled together, typically run by application system kernel. A light weight standalone virtual machine. Docker is a container technology from 2012, open source, very popular. Container image becomes container at runtime. They run in the docker image, they virtualize the operating system, instead of virtualizing the hardware.


# Hardware Interrupts

* NMI, Non-Mask Interrupt: can't be blocked
    * No other interrupts can interrupt it.
    * Must complete the handler, even another NMI can't interrupt the NMI handler.
* Hardware interrupts, peripheral device sends a signal through a specified pin to the processor

* Have an interrupt table, stores the code for that happens during a specified interrupt.
  * Stored in kernel memory

# CPU Fetch-Execute Cycle

* Interrupts can happen while we are executing an instruction. We won't stop mid-instruction execution to handle an interrupt.

---

# Lecture 3

## Mode Switch v. Context Switch

### Mode Switch

* User -> Kernel
  * user makes a sys call
  * an interrupt happens
  * an exception  
* Kernel -> User
  * new process starts
  * new thread starts
  * return from interrupt
  * return from exception
  * finished up doing a sys call
  * When you're done start a new process
  * UNIX signal (user level upcall)


### Context Switch

* Must save state into PCB
* Then load state into PCP
* Then continue execution


### Etc

* If a context switch happens, it wasn't necessarily also a mode switch
* Sometimes there's a mode switch without a context switch
* Sometimes there's a mode switch and a context switch

* A context switch can cause a mode switch

### Interrupts

* An interrupt is a signal

* Synchronous interrupts (traps)
  * Generated by the software

* Asynchronous interrupts
  * Generated by the hardware
  * Two types: maskable & non-maskable
  1. Maskable
    * Can be disabled
  2. Non-Maskable
    * No way to disable those

  * In Intel, there are two pins, INTR and NMI

* PIC: programmable interrupt controller

* There's a separate kernel stack for each process

* On a multi-processor environment, each processor has its own interrupt listeners & handlers

---

# Lecture 4

---

# Lecture 5

2020-09-29

* Midterm 1 regrades are due 7 days after the grade is posted

  * Initiate a request as a private post on Piazza

# Multiprocessing

* Both *threads* and *processes* constitute **tasks**

* CPU Burst: some amount of work, a set of instructions, that the CPU needs to do.

---

# Lecture 6

---

# Lecture 7

[Zoom recording](https://usc.zoom.us/rec/share/vWeBeqJW5DiJxwk0wCRKbPINCfJqCKXSrg0gqKHcClAQ_LX37q-GEZB_sbyqWwT3.K1oQZK22QqAfNKoQ)

[Lecture questions](https://docs.google.com/forms/d/e/1FAIpQLSfshlbWKVROa6W0aakThtBAYMergWAOKGXYrVdvOujHhVCyhQ/viewform?usp=sf_link)

## Questions

1. Forgot
2. Forgot
    * **important** The professor said this question would be on the midterm
3. Forgot
4. Lecture 7 Question 4
    1. How can two processes share segments?
    1. What are some possible issues with segmented memory management, and how can they be fixed?
5. Lecture 7 Question 5
    1. The size of a page is always a power of 2. Give two reasons why.
    1. Consider a logical virtual address space of 8 pages, each 1024 bytes in size, where the logical address space is mapped onto a physical memory of 32 frames
        1. How many bits are there in the logical address?
            1. Answer: 13 bits. `2^3` for the page number, `2^10` for the location within the page. **this question will appear on the midterm**
        1. How many bits are there in the physical address?
            1. There are `32-13` in the physical address. We need 10 to represent each part within a page. 5 bits to represent each of the `2^5` frames, 10 its to represent each of the `2^10` bytes within the page.

            1. If the page size isn't a power of two, it is more expensive computationally to determine the logical and physical addresses. There would also be page numbers possible to set in the address, that don't actually exist.

2. For the logical address, we need 3 bits to represent which page among the 2^3 pages, and 10 bits to represent what byte within the 2^10 bytes on a page. For the physical address, we need 10 bits to reference every single byte within a 2^10 size page, and we need 5 bits for the 2^5 page frames

Every page table will h



## Review

A comparison of synchronization primitives

|      Primitive       | Blocking | Signaling | Mutual Exclusion | Ownership |
|----------------------|----------|-----------|------------------|-----------|
| Mutex                | yes      | no        | yes              | yes       |
| Spinlock             | no       | no        | yes              | yes       |
| Conditional Variable | yes      | yes       | no               | no        |
| Semaphore            | yes      | yes       | if only 1        | no        |


* Blocking: The transition of a process from the ready state to the waiting state. In other words, it is put to sleep.

* If a process tries to acquire a mutex and is unable to, that process will be blocked.

* The thread that acquires a mutex, or a spinlock, is the *owner* of that thread.

A spinlock keeps executing a process over and over again that doesn't do anything, while waiting for some condition to change in between each of the checks that it performs. Taking this design consideration into mind, you do not want to use a spinlock on a single-core architecture.

If the computer's processor has multiple cores, and if the *critical period* is of a very short duration, it may be less expensive to use a spinlock.


## Deadlocks

We can avoid deadlocks by using Dijkstra's [Banker algorithm](https://en.wikipedia.org/wiki/Banker's_algorithm), which ensures that we always maintain a safe state, while still allowing for greater concurrency.

## Memory Management


## Address Translation# Lecture 8

Topic: File Systems

Traditional file system implementations were optimized for magnetic hard disk drives (HDD)

Today's file systems are optimized for solid state disks (SSDs), and are known as *Copy-on-Write File Systems*

You will not be tested on anything that isn't covered **after today**


## Paging vs. Segmentation

* Both are techniques for non-contiguous memory allocation

Contiguous memory allocation

* Dinosaur Book **Chapter 8.3**

    * *Operating System Concepts* (Silbershatz, Galvin, Gagne)

## Solid State Disks (SSDs)

A solid state disk is just a device with is full of flash memory chips.

Has no moving parts, if you drop a HDD, you can break the head easily
Eliminates seek and rotational delay

Data is divided into blocks, and blocks are divided into pages

Data written in 4KB pages, but data erased in 256KB blocks

Writes must be to "clean" cells. Can only write empty pages in a block. 
Erasing a block takes ~1.5ms

How does the controller maintain a pool of empty blocks?
The controller maintains a pool of empty blocks by coalescing the used pages (read, erase, write), and additionally, by reserving some percentage of total capacity.

Heavily used blocks wear out pretty quickly.

## FTL

FTL maps logival block adddress to physical address

## FAT

Advantages:

* Simple
* Easy to find free blocks
* Easy to append to a file

Disadvantages

* Poor locality
* Random access is pretty slow
* Fragmentation
    * File blocks for a given file may be scattered
    * Files in the same directory may be scattered
    * MSDOS defrag tool
* Limited Metadata, no access control info
* No support for reliability, hard links
* Max file size is 4GB

## Fast File System (FFS) { #ffs }

Advantages

* Efficient storage for lookup for random access in large files 
* Locality for large files
* Locality for large metadata and data

Disadvantages

* Inefficient for tiny files, since files with barely any data still need an inode and a data block
* Inefficient encoding when file is mostly contiguous on disk
* Need to reserve some free space to prevent fragmentation 

Midterm definitely has questions on FAT and FFS

---

# Lecture 9

2020-11-05

[Folder](https://drive.google.com/drive/u/0/folders/1QO9_GlBlNgNZrYoZSNWbeux61GKcb5Fd)

[Lecture Slides](https://docs.google.com/presentation/d/1N5lKlgmJc0hmtKwuWkI22AdohJGKuTSQXnsUbwqVssQ/)

[Lecture Video](https://drive.google.com/file/d/1npvnHjdhPOIF_o3m8J8vmw7xUNfqlw21/view)


# The file system

The file system is an abstraction providede by the operating system to allow users and programs to access secondary storage

The directory structure helps us organize the files.

Each file has a file name `foo.txt`

The directory structure translates the file name into the file number

A directory as a type of file.

---

# Lecture 10

[Google Fuschia](https://en.wikipedia.org/wiki/Google_Fuchsia).
:   **Fuchsia** is an [open-source][] [capability-based][]
    [operating system][]currently being developed by [Google][]. It first became
    known to the public when the project appeared on a self hosted form of
    [git][] in August 2016 without any official announcement. The name means
    "Pink + Purple = Fuchsia (a new Operating System)", which is a reference to
    [Pink][] (Apple's first effort at an [object-oriented][],
    [microkernel][]-based operating system) and [Purple][] (the original
    [iPhone][]'s codename).

[Pink]: https://en.wikipedia.org/wiki/Apple_Pink 'Apple Pink'
[Google]: https://en.wikipedia.org/wiki/Google 'Google'
[git]: https://en.wikipedia.org/wiki/Git 'Git'
[open-source]: https://en.wikipedia.org/wiki/Open-source_software 'Open-source software'
[microkernel]: https://en.wikipedia.org/wiki/Microkernel 'Microkernel'
[Purple]: https://en.wikipedia.org/wiki/List_of_Apple_codenames#iPhone 'List of Apple codenames'
[iPhone]: https://en.wikipedia.org/wiki/IPhone 'IPhone'
[capability-based]: https://en.wikipedia.org/wiki/Capability-based_security 'Capability-based security'
[operating system]: https://en.wikipedia.org/wiki/Operating_system 'Operating system'
[object-oriented]: https://en.wikipedia.org/wiki/Object-oriented_operating_system 'Object-oriented operating system'


In contrast to prior Google-developed operating systems such as [Chrome OS][] and [Android][], which are based on the [Linux kernel][], Fuchsia is based on a new kernel called Zircon.

[Linux kernel]: https://en.wikipedia.org/wiki/Linux_kernel 'Linux kernel'
[Chrome OS]: https://en.wikipedia.org/wiki/Chrome_OS 'Chrome OS'
[Android]: https://en.wikipedia.org/wiki/Android_(operating_system) 'Android (operating system)'

* [Fuschia website](https://fuchsia.dev/fuchsia-src)
* [Fuscia guides](https://fuchsia.dev/fuchsia-src/development)


To prevent trojans, we would remove permissions to write-down, especially for
low-integrity options.

* MAC is all about labels. By default, you can assign low-integrity labels for
  external files, and high-integrity labels for system binaries.

* Linux enforces MAC, while they do implement MAC, they are low-assurance, which
  means you cannot trust them. They have vulnerabilities which can be exploited
  to completely bypass any access control.

Vulnerabilities are weaknesses in the system that might be exploited.
Vulnerabilities can arise from flaws in design, errors in implementation, or
mistakes in operational.

* Threats represent the possible dangers possible by virtue of an existing
  vulnerability

* Attackers take advantage of vulnerabilities using exploits.

* Security policies are enforced by a *security mechanism*

Forms of *prevention*:

* Firewalls
* Encryption
* Access control

Forms of *detection*:

* Intrusion
* Auditing
* Watermarking

Forms of *reaction*:

* Automated response
* Forensics
* Restoration from backups

To come up with a good security policy, we perform *risk analysis*.

## Reference Monitor

reference monitor
:   a set of design requirements on a reference validation mechanism, which
    enforces an access control policy over subjects' (e.g., processes and users)
    ability to perform operations (e.g., read and write) on objects (e.g., files
    and sockets) on a system. There are four requirements of the *reference
    validation mechanism*. A reference monitor must be:

    1. *irrefutable (evaluable)*: i.e., able to be analyzed, possible to
       test/verify the completeness, otherwise the reference validation
       mechanism might be flawed in a way that causes the security policy to be
       unenforced.
    1. *inexorable (non-bypassable)*: an attacker cannot bypass the mechanism
       and violate the security policy.
    1. *inevitable (always invoked)*: otherwise it is possible for the reference
       validation mechanism to not perform in the moment it needs to, which
       allows an attacker to violate the security policy.
    1. *invulnerable ( [tamper-proof][])*: otherwise an attacker can undermine
       the reference validation mechanism itself and violate the security policy
       as a consequence.

[tamper-proof]: https://en.wikipedia.org/wiki/Tamper_resistance 'Tamper resistance'

Apparently the *reference monitor* is one of the oldest ideas in cybersecurity,
but because of this, it's often a topic missed by those who work in security,
and people often "reinvent the wheel" and come up with security policies that
try to "be" a reference monitor.

The key components of a reference monitor:

* **subjects:**
* **objects:**
* **authorization database:**
* **audit trail**

Every object in a UNIX system (nearly all of which are files) have 9 bits
associated with it

* 3 bits represent owner-level access rights
* 3 bits represent group-level access rights
* 3 bits represent world-level access


We use reference monitoring to:

* Control access of *individuals* to *information*
* Provide evidence that a system is secure and compliant with its stated
  policies
* Verify the system enforces its access control policies

We must make choices in order to verify that a system satisfies a policy

* What is the interpretation of this abstract policy?
* What is the interpretation of *subjects*, *objects*, *authorization database*,
  and *audit trail*

## Approaches to designing an operating system

From the 80s, we had systems that were so secure that it made them
hard/inconvenient to use.

As that shifted, it became easier to use, more convenient, but *also more
insecure as a consequence*

[Defense in depth](https://en.wikipedia.org/wiki/Defense_in_depth_(computing))
:   placing multiple layers of security controls throughout an
    [information technology][] system in order to provide redundancy in the
    event a [security control][] fails or a vulnerability is exploited that can
    cover aspects of *personnel* , *procedural* , *technical* and *physical*
    security for the duration of the system's life cycle.

[information technology]: https://en.wikipedia.org/wiki/Information_technology 'Information technology'
[security control]: https://en.wikipedia.org/wiki/Security_controls 'Security controls'


How do we determine trust?

1. *security policy:* An overall strategy holding everything together, provides
   a definition of security, outlining what is authorized, and what is
   not authorized.
1. *security mechanisms:* methods and tools designed to detect/prevent/recover
   from a security attack, and enforce a security policy.
1. *assurance:* Determining how much to trust a system to enforce policy, based
   on evidence. High assurance systems use formal proofs to ensure that the
   security policy was properly implemented by providing solid evidence that
   there is a [one-to-one correspondence][]

[one-to-one correspondence]: https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/isss2002.pdf

**Question:** Why does defense in depth work in scale, but not when an attacker
is attacking a single person?

**Answer:** If you want to get money because of the ransomware attack you have
this exploit right that you prepare so that you can subvert the system and
create you know files. And then I asked for mine. Now if you've had an
organization who prepared well in advance. For example, they have all kinds of
phone, you know, they may make a patch the software. Maybe this will maybe
doesn't exist anymore or Suppose there is a whole and softer, but they did
suddenly like a backups that particular data and therefore, even though that is
encrypted. They can be restored to see they really prepared, which is what most
of work is for an attacker. It might be easy. It's who you know target somebody
else who are not that will prepare and the result and results will be basically
will get mine. It doesn't matter which company gives you money. As long as you
get some money.


**Question:** What is a *trusted system*?

**Answer:** When peoople refer to "secure" systems, they usually mean to say
"trusted" systems. The word "secure" is too absolute, it either is or it isn't.
Trusted has a more flexible definition. A trusted system achieves this
"characteristic" if it meets the necessary security requirements, operates on
graded degrees of trustworthines, and provides an acceptable justification for
the user's confidence.

[Trusted Computer System Evaluation Criteria][TCSEC]
:   Known as "The Orange Book," or DoD 5200.28-STD, TCSEC is a US
    [Department of Defense][] (DoD) standard that sets basic requirements for
    assessing the effectiveness of [computer security][] controls built into a
    [computer system][]. The TCSEC was part of the [Rainbow Books][] used to
    evaluate, classify, and select computer systems being considered for the
    processing, storage, and retrieval of sensitive or classified information.
    In 2005, the TCSEC was replaced by the ISO 154008 [Common Criteria for
    Information Technology Security Evaluation][Common Criteria].

[TCSEC]: https://en.wikipedia.org/wiki/Trusted_Computer_System_Evaluation_Criteria
[Department of Defense]: https://en.wikipedia.org/wiki/United_States_Department_of_Defense 'United States Department of Defense'
[computer security]: https://en.wikipedia.org/wiki/Computer_security 'Computer security'
[computer system]: https://en.wikipedia.org/wiki/Computer_system 'Computer system'
[Rainbow Books]: https://fas.org/irp/nsa/rainbow/std001.htm
[Common Criteria]: https://en.wikipedia.org/wiki/Common_Criteria

Common Criteria

* Part 1: [Introduction and General Model](https://www.commoncriteriaportal.org/files/ccfiles/CCPART1V3.1R5.pdf)
* Part 2: [Security Functional Components](https://www.commoncriteriaportal.org/files/ccfiles/CCPART2V3.1R5.pdf)
* Part 3: [Security Assurance Components](https://www.commoncriteriaportal.org/files/ccfiles/CCPART3V3.1R5.pdf)
* [Common Methodology](https://www.commoncriteriaportal.org/files/ccfiles/CEMV3.1R5.pdf)
* [Cheatsheet](https://www.jtsec.es/common-criteria-cheatsheet.pdf)
* [Reference Card](http://www.school-of-technology.de/resources/ccQRC.pdf)


### Summary

* The security of information flow is enforced solely by **the MAC policy**
* The tool of choice for a witted adversary is *subversion*
* It's impossible to build "secure" products without a policy and reference
  monitor
* The security of the system is defined by the security policy
* Security kernel is the only known verifiable protection technology


### Lecture 10 Questions

1. How could a future OS look like?

    I think security will begin to become a larger concern in the future.
    Despite the popularity of monolithic kernels, I'd say that the robust
    performance of today's CPUs will help justify a more secure operating system
    at the cost of maximum possible performance


2. What is the best way to subvert any software?

    The best way to subvert any software is to change it. (Answer from lecture
    expands on this: modify the compiler used to generate the software, a
    backdoor attack known as "the Thompson attack", which got its name from Ken
    Thompson, the UNIX-author Go-author who came up with it, and won the 1983
    Turing award for doing so.


3. Interpret the resource monitor components and principles for an old-fashioned
   library?

    The objects would be books in the library stacks The subjects would be the
    members of the library (such as students), and the librarian, who could
    serve as the sysadmin The authorization database could be a "library card",
    which members could show to check out a book, and the librarian would check
    if the library card permits the member from checking out more books if
    they've already checked out too many books. The audit trail would be the
    stamps on books checked in and checked out of the library, and have these
    stamps logged somewhere off the book as well.


4. Which approach to securing systems will work better to protect a system: security as an addon, or security by design?

    If the goal is to protect a system, the "security-by-design" approach to
    securing systems will do a better job than "security as an addon." Security
    as an add on tends to only get its "add-ons" as a patch over a vulnerability
    that has already been discovered or exploited. Whereas with a
    security-by-design system, that exploit may have been designed to never be
    possible in the first place.

5. When will "defense in depth" work, and when will it fail?

    A layer that is properly allowing good actions to proceed, but is preventing
    bad actions from proceeding, the "defense in depth" strategy will work. It
    could fail if it either allows bad actors to bypass the layers, or when it
    fails to allow good actors to navigate through the layers.

6.  Consider a system that implements RM with **high assurance**. An attacker
    seeks to gain access to sensitive data managed by the system. An attacker
    can attempt to either:

    1. subvert the applications that run on the implementation of the reference
       monitor
    2. subvert the implementation of the reference monitor itself

    For each case, discuss which principles of the reference monitor can help
    protect the sensitive data:

    The three principles of the reference monitor are that it is *tamperproof*,
    *non-bypassable*, and *verifiable*

    For (1), your sensitive data could be protected by the reference monitor by
    the principle of inexorability (non-bypassability), and for (2), the data is
    protected by the principle of invulnerability (tamper-proofness).





---

# xv6

## Setup

* Install QEMU

    ```shell script
    brew install qemu
    ```

* Install the GCC compiler toolchain for x86 ELF

    ```shell script
    brew install x86_64-elf-gcc
    ```

* Clone the [mit-pdos/xv6] repository

    ```shell script
    git clone git://github.com/mit-pdos/xv6-riscv.git
    ```

* Enter the directory containing `x86`

    ```shell script
    cd x86
    ```

* Update the value of the `TOOLPREFIX` environment variable to `x86_64-elf-` in
  the `Makefile` (near line 30)

  ```Makefile
  TOOLPREFIX = x86_64-elf-
  ```

* Update the value of the `QEMU` environment variable to `qemu-system-x86_64` in
  the Makefile

  ```Makefile
  QEMU = qemu-system-x86_64
  ```

* Build the `qemu` project, (launches xv6 via QEMU)

    ```shell script
    make qemu
    ```

If you experience any bugs, try to clean the directory with `make clean`.

If you'd like to exit out from QEMU's emulation of xv6, press <kbd>⌃A</kbd> <kbd>X</kbd>

[mit-pdos/xv6]: https://github.com/mit-pdos/xv6-public

The Makefile provided with xv6 has several [phony targets][] for running the
system:

`make qemu`
:   Build everything and run xv6 with QEMU, with a VGA console in a new window
    and the serial console in the terminal where you typed this command. Close
    the VGA window or press Ctrl-C or Ctrl-A X to stop.

`make qemu-nox`
:   Run xv6 without the VGA console.

`make qemu-gdb`
:   Run xv6 with GDB port open. Refer to the [GDB section][].

`make qemu-nox-gdb`
:   Run xv6 with GDB port open, without the VGA console.

[GDB section]: http://www.cs.columbia.edu/~junfeng/13fa-w4118/tools.html#gdb
[phony targets]: http://www.gnu.org/software/make/manual/html_node/Phony-Targets.html


If you get stuck in a boot-loop, you can [Remove BYTE directives from kernel
linker script to fix triple fault on boot](https://github.com/mit-pdos/xv6-public/pull/115/files#diff-55d14b8f75c28e552594dabebe4d7d09f913bf53121a8b5f008a7f0b36e5dfec)



---

# File Systems




[Apple File System (APFS)](https://support.apple.com/lt-lt/guide/disk-utility/dsku19ed921c/mac)
is the new system built by Apple for macOS devices

HFS+ was the system built by Apple for macOS devices


NTFS: "New Technology File System"

* Has been used by Windows since 1993

They released a newer one,
[Resilient File System (ReFS)](https://docs.microsoft.com/en-us/windows-server/storage/refs/refs-overview)
is the newer version, is used on Windows Server but hasn't been ready to
introduce to the masses any time sooner than "some day" since 2012


In the future, I'd like to take more notes on this article that taught me about
[diagnosing and treating time machine problems in terminal](https://eclecticlight.co/2017/02/16/diagnosing-and-treating-time-machine-problems-in-terminal/)
and
[this one](https://www.real-world-systems.com/docs/tmutil.1.html)

```shell script
sudo defaults write /System/Library/Launch Daemons/com.apple.backupd-auto StartInterval -int 1800
```
