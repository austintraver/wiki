---
title: 'CSCI 353'
description: 'Internetworking'
date: 2020-08-17
---


# Lecture 1

ISO developed the **Open Systems Interconnection (OSI) model**.

The OSI model Divides network communication into 7 layers.

1. Application (HTTP, FTP)
1. Presentation (ASCII, GIF, JPG)
1. Session (SQL)
1. Transport (TCP, UDP)
1. Network (IP)
1. Data Link (802.11)
1. Physical (Fiber)


In 1970, the transmission rate of a connection was 56 Kb/s. Today we have faster connections, a [CAT7 cable](https://en.wikipedia.org/wiki/ISO/IEC_11801#CAT7) can even transfer 10 Gb/s

A mobile hotspot is a form of [*ad-hoc networking*](https://en.wikipedia.org/wiki/Smartphone_ad_hoc_network)

Some numbers about the internet in 2020.

* 2.92 billion users
* 1 trillion URLs
* 294 billion emails per day
* 2 billion smartphones


The phyiscal layer is made of fiber, coaxial cable, radio signals

Interfaces include ethernet chips, as well as wireless chips.

Networks are built to withstand failure among its intermediary nodes. Given 100 components, where any given component is failing 1% of the time, there is a 63% that, at any given moment, at least one component is failing.


The `ipconfig` command first appeared in MacOS 10.0.


The basic components of a network include

* end systems/hosts (clients and servers)
* switches/routers
* links

The Internet Engineering Task Force (IETF) is a non-profit organization that
seeks to standardize protocols across the world.

1961-1972 early packet switching principles

sputnik was launched
in response, us founded ARPA, the advanced research project agency, and poured money into it

www was invented in 1990s


principles of internetworking

* minimalism/autonomy

* best-effort service

* stateless transmission



* 1967, The idea for the ARPAnet is first conceived.

* 1969: The first node of the ARPAnet becomes operational (UCLA).

* 1972: The APRAnet has expanded to include nodes in USC and MIT.

* 1973: UNIX is released, and in its documentation it boasts its ability to run on a computer as inexpensive as just $40,000.

* 1977: The Berkeley Software Distribution (BSD) is established.

* 1983: The TCP, IP, and SMTP protocols are formalized.

* 1990s: Hypertext, HTML, and HTTP become widespread.

* 1995: Microsoft releases Internet Explorer.

* 1998: Google is incorporated by Stanford students Larry Page and Sergey Brin.

* 2001: Apple releases macOS (Darwin).

* 2004: Blizzard launches World of Warcraft, and reports 1,000,000+ concurrent active users on its servers.
 
* 2007: Apple releases the original iPhone.

---

Woah, modem stands for *modulator demodulator*.

Digital Subscriber Line (DSL)

Digital Subscrible Line Access Multiplexer (DSLAM)

Data over DSL phone goes to internet. Voice over DSL phone goes to the telephone, but the problem with cable over a phone line is that cable is a shared medium, and a phone line is a dedicated medium.

Cable is a form of broadband.

Broadband transports multiple signals and traffic types

Among a continuous band of frequencies, bandwidth is defined as the difference between the upper and the lower frequencies.

* The **coaxial cable**
  - made of a twisted pair. It is twisted to prevent interference from the other wires.
  - composed of two concentric copper conductors
  - part of a shared medium

* The **fiber optic cable**
  - made of glass fiber
  - transmits pulses of light
    - each represents a bit
  - immune to an electromagnetic pulse (EMP)

* The **radio signals**
  - the signal is transmitted through electromagnetic spectrum
  - All of the following transmit radio signals
    - microwave ovens
    - wifi networks
    - cellular towers
    - satellite dishes


# Lecture 2

* [Resource Records](https://support.google.com/domains/answer/3251147?hl=en)

* The [Domain Name System](https://support.google.com/domains/answer/3251148?hl=en&ref_topic=3365481) (DNS) is a hierarchical naming system for domains and other Internet resources. DNS can be viewed as an address book for the Internet; a primary function of DNS is mapping domain names to host IP addresses.

* Access ISP -> Regional ISP -> Tier 1 ISP
    * Each pays the next
* But sometimes you can use an IXP to make a shortcut, to make the route shorter
    * IXP is not really a network, it's just a huge switch, providing a path from one network to another

# The CSCI 353 Layers

5. Application

    * Provides network support for apps

4. Transport

    * (Reliable) end-to-end delivery

3. Network

    * Global best-effort delivery
2. Link

    * Local best-effort delivery

1. Physical

    * Bits on wire


## Network Devices

* Router
    * Operates at *Network* **3rd** layer
    * Recreates a signal it receives
* Switch
    * Operates at *Link* **2nd** layer
    * Take a packet and forward it along based on a table created by the router
    * Can check for errors in the network and drop packets if it detects error
* Bridge
    * Operates at *Link* **2nd** layer
    * Typically has a single input and output port
* Hub
    * Operates at *Physical* **1st** layer


## Protocols

* IP (Network Layer)
    * Datagram, unreliable, best effort, connectionless
    * Routes packets "hop by hop"
    * [Cloudflare: What is the network layer?](https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/)
    * [Cloudflare: What is the Internet Protocol (IP)](https://www.cloudflare.com/learning/network-layer/internet-protocol/)
* UDP
    * Transport Layer
* TCP
    * Transport Layer



## Inter-Layer Headers

* Each layer has its own header

* A packet at the network layer is a "datagram"

* A packet at the transport layer is a "transport segment"

* a packet at the link layer is called a *frame*



## IPv4 Datagram

* Total packet length can be up to 64kB including the header and all the data


## TCP

* Three way handshake

* Syn: Synchronise
* Ack: Acknowledge
* Syn + Ack

* A -> Fin -> B
* A <- Data + Ack <- B
* A <- Fin <- B
* A -> Ack -> B

* The stream of bytes is chopped up into TCP segments
    * We need to transfer the segments multiple times if the segment is lost or corrupted in transmission
    * Segment can be small, such as SSH, typing a single byte

* Ways that TCP ensures reliable delivery
  1. acknowledgements indicate correct delivery
  1. Checksums detect corrupted data
  3. Squence numbers detect missing data
  4. Flow control prevents overrunning receiver

* TCP is for process-to-process connection
    * IP is more, "endpoint to endpoint"


* A socket is an interface between an application and a network.
    * A socket is identified by an IP address and a port number
    * socket type dictates style of communication, can be reliable or best effort
    * can be connection oriented or connectionless

* An IP address doesn't identify a device, it identifies an *interface*

* multiplexing and demultiplexing is extending host-to-host delivery to process-to-process delivery
    * this occurs at the transport layer



# Types of sockets

* `SOCK_STREAM`
 * a.k.a. TCP 

* `SOCK_DGRAM`
    * a.k.a. UDP

* `SOCK_RAW`
    * allows headers of lower level protocols to be constructed by the application

* Client-Server Model
    * a distributed application structure that partitions tasks or workloads between the providers of a resource or service, called servers, and service requesters, called clients.
    * describes how a server provides resources and services to one or more clients.
    * Examples of servers include web servers, mail servers, and file servers. 
    * Each of these servers provide resources to client devices


## Taxonomy of Communication Networks

* Broadcast Network
    * WiFi
    * Many-to-many, broadcast isn't just one hub with a bunch of spokes

## Multiplexing

* Multiplexing in Circuit-Switched Networks is a technique for sending two or more signals over the same telephone line, radio channel, or other medium

* Circuit Switched Network
    * Similar to having a reservation at a restaurant

* Frequency Division Multiplexing
    * Analog
    * Divide frequency spectrum in *frequency bands*
    * Separate frequency band per circuit
    * Several signals transmitted simultaneously
    * *Disadvantage* is that 1/4th of the same bandwidth is available for each user

* Time Division Multiplexing
    * Digital
    * Divide bandwidth in time, each timeslot is allocated to each user, the time period in which that user can be transmitting data.
    * time is divided into time frames, each frame is divided into time slots
    * *Advantage* Each user has access to the full bandwith



* Wavelength Division Multiplexing
    * Used in fiber optics, increase bandwidth by chopping up the frequencies of the visible spectrum
# Lecture 3

* Circuit switching is 
    * a way to build a network which supports the between two endpoints, and allows sharing of channels
    * in pure circuit switching, there are no packets

* Frequency division multiplexing
    * You can constantly continue sending those bits, not required to chop them up, as you would during time-division multiplexing
    * used with analog cables

* Virtual circuits
    * Built on top of packet switching



* wavelength division multiplexing is used for circuit switching and packet switching networks

* FDM, divide the whole bandwidth into parts, each part is a frequency range for a user.
    * This is common for 


* TDM
    * typically used for digital transmission

* WDM
    * typically used for fiber optics
    * kind of like FDM for fiber optics

* TCP socket identified by 4-tuple
    * Source IP
    * Source Port
    * Dest IP
    * Dest Port


# Lecture 4

## Midterm

* Midterm 1 is next week, in class, September 16
* Covers lectures 1-4
* Closed book/notes test
* Practice exam posted on Blackboard
* Exam is accessed via Blackboard
* You are allowed one 8.5" x 11" handwritten note sheet (double sided)
* (2h 15m) exam length
    * You are allowed one (5 minute) restroom break
    * Auto submits when clock strikes zero
    * How does this get handled with DSP?
    * You'll record yourself and share your screen (mic & camera on)
    * Must record to the cloud
    * You'll share a link to your Zoom recording via a Google form posted on Piazza
    * You can start it whenever you want
# Lecture 5

## Internet Names

* Machine addresses: 128.125.253.146

* DNS: Domain Name Service

## Domain Name Service

* Cloudflare covers it well in [What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/)

* DigitalOcean has a course: [An Introduction to Managing DNS](https://www.digitalocean.com/community/tutorial_series/an-introduction-to-managing-dns)

* Translates hostnames to IP addresses

* Can perform load distribution by reordering the list of IP addresses that it returns.

* The client will try every IP address in the list returned by DNS until it accesses the sought-after resource

* DNS is a *distributed*, *hierarchical*, *database*

* Dynamic DNS is covered in Cloudflare's [What is dynamic DNS (DDNS)?](https://www.cloudflare.com/learning/dns/glossary/dynamic-dns/)

## Server Hierarchy

* Highest layer: root servers, whose locations are hardwired by other servers
* Next layer: Top-level domain (TLD) servers
    * Manages TLDs such as `com`, `gov`, etc.
    * Verisign Global Registry Services manages the TLD servers for the `com` top level domain
* Bottom level: Authoritative DNS servers
    * Actually store the name-to-address mapping
    * Maintained by the corresponding *administrative authority*


* Depth of tree is arbitrarily set to 128 layers: `fifth.fourth.sub.example.com`

* A [*DNS zone*](https://www.cloudflare.com/learning/dns/glossary/dns-zone/) corresponds to an *administrative authority* that is responsible for that portion of the hierarchy.
    * For example, USC controls names `*.usc.edu`
    * Multiple managed zones can exist on the same server
    * DNS zone file is a plaintext file that contains a representation of all of the domains in the zone

# DNS Root Servers

* Check out Cloudflare's article [What is a DNS root server?](https://www.cloudflare.com/learning/dns/glossary/dns-root-server/)

* 13 servers, labeled A through M, spread across North America

# Networking Techniques

* *Anycast* is a networking technique where the same IP address range is advertised from *multiple* locations
    * Cloudflare article: [What is Anycast DNS?](https://www.cloudflare.com/learning/dns/what-is-anycast-dns/)
    * Benefits: Reduces latency, supports load balancing, increases reliability
    * Drawbacks: Doesn't support TCP, so it's only used for single-request, single-response use cases like DNS

* *Unicast* is a 1-to-1 mapping of addresses to hosts
    * Drawback: vulnerable to DoS attacks
    * Cloudflare: [What is a Denial-of-Service (DoS) attack?](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/)

* *Multicast* 
    * Host has no way to differentiate anycast and multicast traffic.

* Anycast routing finds the shortest path to a destination based on the number of hops


* BGP: Border Gateway Protocol

# Name Resolution

Name resolution starts with [a recursive resolver (also known as a DNS recursor)](https://www.cloudflare.com/learning/dns/dns-server-types/)

1. *requesting host* `trojan.usc.edu` sends a request to *local DNS server* `dns.usc.edu` for the IP address for `bruin.cs.usc.edu`

1. the *local DNS server* `dns.usc.edu` checks if it has cached the IP address
   of `bruin.cs.usc.edu`. If it's cached, the *local DNS server* sends the
   cached IP address of `bruin.cs.usc.edu` to the *requesting host*. The process
   is finished at this point, preventing the steps below from executing.

1. the *local DNS server* `dns.usc.edu` asks *root DNS server* for the IP address of the *TLD DNS server* for `edu`

1. the *root DNS server* sends the IP address of the *TLD DNS server* for `edu` to the *local DNS server*

1. The *local DNS server* `dns.usc.edu` asks the *TLD DNS server* for the IP address of the *authoritative DNS server*

1. The *TLD DNS server* sends the IP address of the *authoritative DNS server* to the *local DNS server*

1. the *local DNS server* requests the *authoritative DNS server* for the IP
   address of the machine `bruin.cs.ucla.edu`

1. the *authoritative DNS server* sends the *local DNS server* the IP address of the machine `bruin.cs.ucla.edu`

1. the *local DNS server* sends the IP address of the machine `bruin.cs.ucla.edu` to the *requesting host* (and caches it as well)

## Official 8-step Procedure

1. A user types ‘example.com’ into a web browser and the query travels into the Internet and is received by a DNS recursive resolver.
1. The resolver then queries a DNS root nameserver (.).
1. The root server then responds to the resolver with the address of a Top Level Domain (TLD) DNS server (such as .com or .net), which stores the information for its domains. When searching for example.com, our request is pointed toward the .com TLD.
1. The resolver then makes a request to the .com TLD.
1. The TLD server then responds with the IP address of the domain’s nameserver, example.com.
1. Lastly, the recursive resolver sends a query to the domain’s nameserver.
1. The IP address for example.com is then returned to the resolver from the nameserver.
1. The DNS resolver then responds to the web browser with the IP address of the domain requested initially.

# DNS Records

* Google covers the [DNS basics](https://support.google.com/a/answer/48090) pretty well.

* Cloudflare covers it well in [What is a DNS record?](https://www.cloudflare.com/learning/dns/dns-records/)

* Each piece of DNS information stored is called a *resource record* (**RR**)

* `A`: Address
    * name = hostname
    * value = IP address
  
* `NS`: Name Server
    * name = domain `usc.edu`
    * value = name of DNS server for domain
    * is used to route DNS queries further along in the query chain
  
* `CNAME`: Canonical NAME
    * name = hostname
    * value = canonical name
  
* `MX`: Mail eXchange
    * name = domain in email address
    * value = canonical name(s) of mail server(s)

# Old-school Website Management

1. Create a company "Example"
1. Get a CIDR blcok from your ISP
1. Register example.com with domain registrar
  1. Registrar inserts RR pairs ino the `.com` TLD server
    ```txt
    (mystartup.com, dns.mystartup.com, NS)
    (dns.mystartup.com, 212.44.9.129, A)
    ```
1. Store appropriate records (A & NS) at `dns.mystartup.com`

## Improving DNS Performance

* Web browser caches content
    * Also performs *negative caching*, remembering what does **not** work

# User Datagram Protocol UDP { # UDP }

* Wikipedia: [UDP datagram structure](https://en.wikipedia.org/wiki/User_Datagram_Protocol#UDP_datagram_structure)

* [UDP Spec - RFC 768](https://tools.ietf.org/rfc/rfc768.txt)
* [TCP Spec - RFC 793](https://tools.ietf.org/rfc/rfc793.html)

# Pipelining

* Allows sending multiple "in-flight", yet-to-be-acknowledged packets
* [Automatic repeat request (ARQ)](https://en.wikipedia.org/wiki/Automatic_repeat_request)
    * [Go-Back-N (GBN) ARQ](https://en.wikipedia.org/wiki/Go-Back-N_ARQ)
    * [Selective Repeat (SR)](https://en.wikipedia.org/wiki/Selective_Repeat_ARQ)

# Sliding Window

* [Sliding window protocol](https://en.wikipedia.org/wiki/Sliding_window_protocol)

* A window is a set of adjacent (consecutive) sequence numbers.

* The goal is to send *n* packets at a time.

* Sliding window is also known as *packets in flight*

* The sender and the receiver might not have the same window.
 
 * Since a TCP header is 16 bits in length, the max size of a window is 2^16

 * [Throughput](https://en.wikipedia.org/wiki/Throughput) or [Bandwidth](https://en.wikipedia.org/wiki/Bandwidth_(computing)) is the maximum rate of data transfer across a given path.

* TCP uses ACKs but not NACKs (Negative ACKs)

* TCP uses checksums

* A transmission in TCP has the receiver buffer a partitions of memory at least equal to the size of the sliding window

* IP packet
    * Each link has an MTU (Maximum Transfer Unit)
    * Each segment must fit MTU (for example, 1500 bytes with Ethernet)

* The [maximum segment size](https://en.wikipedia.org/wiki/Maximum_segment_size)

* Structure of a [TCP segment header](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_segment_structure)

* Formula `MSS = MTU - (IP header) - (TCP header)`

* TCP segments are either set when
  1. The segment is full (max segment size MSS)
  1. The segment is not full, but the data in the buffer times out, and gets sent
# Lecture 6

## Review

* DNS is application layer protocol
    * at the 

* The end to end principle
    * We want to push complexity to the network layer.
    * We want our network to be dump, and our end systems to be smart

* The [sliding window](https://en.wikipedia.org/wiki/Sliding_window_protocol) protocol

---

## General Terms Used

* Go back N GBN protocol
    * Sender transmits up to `n` unacknowledged packets
    * If frames arrive, the receiver asks the sender to retransmit the frames if:
        1. The frames are damaged
        1. The frames are lost
        1. The frames are fine, but arrived out of order
    * Receiver 

* Cumulative acknowledgement
    * The packet referred to in the "acknowledgement" is actually acknowledging the minimum packet number you *don't* have yet. If you have `3, 5, 6`

* Even though a sender received `3, 5, and 6`, it will still acknowledge `4`, causing the sender to resend `5` and `6` regardless. This was a decision made during the design of the TCP protocol.

---
# Lecture 8

## Lecture 8 Question 2

* Answer: we haven't received all the pieces necessary. The difference between the link state and the distance vectors. You need to hear from your neighbors, therer will be mutliple iterations before the algorithm converges.

## Lecture 8 Question 3

1. DV has higher messaging overhead?
The first statement is correct, there are more messages exchanged in DV than in Link State
With Link State, if you have a large network, the overhead required to recalculate the network after a change is both increasingly common and increasingly expensive

DV is more succeptible to looping. The Link State algorithm has faster convergence. DV is more robust.


## Lecture 8 Question 4

Which algorithm would you choose for inter-domain routing? Link State (LS) vs. Distance Vector (DV)? Why?
For inter-domain routing, I would choose distance vector over link state. With link state, every node in the network has a lot of information about the connections, which not only brings up privacy concerns, but also is more expensive to compute for large network topologies. With inter-domain routing, large topologies are rather common.

* BGP uses not distance vector, but a similar one, but certainly does not use link state.


RIP: Routing Information Protocol

## Lecture 8 Question 5

Joke: "The best thing about RIP jokes is that they are funny 15 more times." Why is this such a hilarious joke?

When changes are made, they propogate throughout the whole network, with the largest number of hops being 15.


## Lecture 8 Question 6

1. What could happen if routers lie?
    * A router could lie if it wanted to redirect or attract traffic, which it could use to either sniff the packets to obtain information, or just gain information on where traffic is coming and going from (valuable!)
1. How can you prevent this?
    * You can configure your network to only communicate with trusted networks.


Nearly 15% in the world, was briefly redirected through servers in China, and a lot of that traffic wasn't encrypted. Even 



---

# Lecture 10




[Message Authentication Code (MAC)](https://en.wikipedia.org/wiki/Message_authentication_code)
: A short piece of information used to [authenticate a message](https://en.wikipedia.org/wiki/Message_authentication "Message authentication") in order to confirm that the message came from the stated sender, to ensure that its authenticity had not been changed. The MAC value protects a message's [data integrity](https://en.wikipedia.org/wiki/Data_integrity "Data integrity"), as well as its [authenticity](https://en.wikipedia.org/wiki/Message_authentication "Message authentication"), by allowing verifiers (who also possess the secret key) to detect any changes to the message content.

When learning about network security, some common names, originating from the original paper on RSA are used. These include Alice and Bob, the original two characters who are trying to have a secret conversation. A couple of characters I liked that they added were Trudy and Eve. They don't want their friend Eve to be able to eavesdrop, and they don't want Trudy to be able to read the message when she intrudes on their private inbox.

It's important not to conflate *encryption* with *authentication*. They're two separate things. We use *encryption* to hide the content of a message in transit. We use *authentication* to verify the integrity of messages we receive. [^cryptography-engineering]
[^cryptography-engineering]: [Cryptography Engineering](https://play.google.com/store/books/details?pcampaignid=books_read_action&id=nnqdQsrZnJgC)

[Full Domain Hash (FDH)](https://en.wikipedia.org/wiki/Full_Domain_Hash)
: A signature scheme based on [RSA](https://en.wikipedia.org/wiki/RSA_(algorithm) "RSA (algorithm)") that follows the *hash-and-sign* paradigm. It is provably secure.
    FDH involves hashing a message using a function whose image size equals the size of the RSA modulus, and then raising the result to the secret of the
    RSA exponent.

We don't sign the message, we sign the computed hash of the message derived by
the hash function. Typically I find
[Secure Hash Algorithms](https://en.wikipedia.org/wiki/Secure_Hash_Algorithms)
are what are used for this purpose.

Pretty Good Privacy (PGP) was pretty much a singlehanded undertaking of Phil Zimmermann.

There are four [^applied-cryptography] goals in cryptography.

[^applied-cryptography]: [Applied Cryptography](http://cacr.uwaterloo.ca/hac/index.html)

1. Confidentiality: a service used to keep the content of information from all but those authorized to have it. Secrecy is a term synonymous with confidentiality and privacy.There are numerous approaches to providing confidentiality, ranging from physicalprotection to mathematical algorithms which render data unintelligible.

2. Data integrity: a service which addresses the unauthorized alteration of data. To assure data integrity, one must have the ability to detect data manipulation by unau-thorized parties.  Data manipulation includes such things as insertion, deletion, and substitution.

3. Authentication: a service related to identification. This function applies to both entities and information itself. Two parties entering into a communication should identify each other. Information delivered over a channel should be authenticated as to origin, date of origin, data content, time sent, etc. For these reasons this aspect of cryptography is usually subdivided into two major classes: entity authentication and data origin authentication.  Data origin authentication implicitly provides data integrity (for if a message is modified, the source has changed).

4. Non-repudiation: a service which prevents an entity from denying previous commitments or actions. When disputes arise due to an entity denying that certain actions were taken, a means to resolve the situation is necessary. For example, one entity may authorize the purchase of property by another entity and later deny such authorization was granted. A procedure involving a trusted third party is needed to resolvethe dispute.


Notation:

* `m`: the message

* `c`: the cyphertext

* `E()`: encryption function

* `D()`: decryption function

* `H(m)`: hash function, generates the fingerprint / checksum / digest of a
  message. All three of those words mean the same thing, but are used
  interchangeably.

* pk<sub>X</sub>: public key "X"

* sk<sub>X</sub>: secret key "X"

* K<sub>s</sub>: symmetric key

* `S()`: signature function

* `σ`: signature σ := S(sk<sub>i</sub>,H(m))

In practice, although messages can be encrypted with public-key cryptography,
the process is orders of magnitude more computationally expensive than
symmetric-key cryptography. For this reason, private keys are usually just used
to create digital signatures, (a functionality that symmetric keys are unable to
replicate), and to encrypt the symmetric key used for the remainder of the
transaction.


When Alice uses public-key encryption to send a message to Bob, he will perform
the following procedure to authenticate the sender and verify the integrity of
the message.

1. Alice generates a new symmetric key K<sub>s</sub>
1. Alice encrypts K<sub>s</sub> with Bob's public key pk<sub>B</sub>
1. Alice computes the hash H(m) of the message "m", and creates a signature "σ"
   by encrypting the hash of message "m" using her secret key sk<sub>A</sub>
1. Alice sends these two items to Bob
1. Using his secret key (sk<sub>B</sub>), Bob will decrypt the symmetric key
   K<sub>s</sub> that Alice encrypted using Bob's public key pk<sub>B</sub>.
1. Bob will then use the symmatric key K<sub>s</sub> to decrypt the signature
   "σ", and the original message "m"
1. Bob will then compute the hash of message "m" using the same hash function
   used by Alice when she created her signature.
1. Bob will then verify Alice's signature "σ". To do this, he will decrypt the
   signature "σ" using Alice's public key pk<sub>A</sub>, compare it with the
   hash of the message "m", and verify that the two values are equal.


SSL vs. TLS

When SSL was originally created, there were still some security problems. When
they were discovered[^rfc5746], new versions of SSL were created, and the scope
of SSL expanded. In 1996, SSL v3.0 was released, and was replaced by TLS 1.0 in
[RFC2246](https://tools.ietf.org/html/rfc2246) in 1999, which was itself
replaced by
[TLS 1.2](https://tools.ietf.org/html/rfc5246), published in 2008 was the
version recommended by
[RFC 7568](https://tools.ietf.org/html/rfc7568), the document that deprecates
SSL v3.0 and prohibits any version of TLS from falling back to it. TLS 1.0 was
deprecated in 1999, and TLS 1.1 was deprecated in 2006, so ideally TLS 1.2 would
not fall back to *any* of those.

TLS 1.3 was published in 2018 by
[RFC 8446](https://tools.ietf.org/html/rfc8446), making TLS 1.2 obsolete, but
not deprecated (yet).

Although by 2008, SSLv3 was deprecated, (with RFC 7568 using the phrase `MUST
NOT` rather deliberately), a separate publication,
[RFC 6176](https://tools.ietf.org/html/rfc6176) prohibits the usage of SSLv2 as
well.

[^rfc5746]: [RFC 5746](https://tools.ietf.org/html/rfc5746)

Despite this migration from SSL to TLS, all security professionals seem to
discourage the widespread usage of the term "TLS" with audiences outside of
security/engineering, likely because some people already recognize the term SSL,
and the differences aren't worth confusing people over.

### SSL/TLS Concepts

A TLS connection is a transient, peer-to-peer communications link that is
associated with one TLS session.

A TLS session is an association between a client and a server. In order to avoid
multiple handshakes between the same two parties (awkward), a single TLS session
may be shared among one or more TLS connections.

There are two steps to a SSL/TLS connection, the handshake protocol and the
record-layer protocol.

1. The handshake protocol:

    * The handshake protocol is where the users authenticate
   one another, figure out which algorithms to use for encryption and MACs, and
   which cryptographic keys to use for future communciations.

2. The record-layer protocol:

    * The record-layer protocol is the part where secure communication begins,
      using the shared key established during the handshake protocol.

Some terminology included below

[Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)
:   In [cryptography][], a **nonce** is an arbitrary number that can be used
    just once in a cryptographic communication. It is similar in spirit to a
    [nonce word][], hence the name. It is often a [random][] or
    [pseudo-random][] number issued in an [authentication protocol][] to ensure
    that old communications cannot be reused in [replay attacks][]. They can
    also be useful as [initialisation vectors][] and in
    [cryptographic hash functions][].

[nonce word]: https://en.wikipedia.org/wiki/Nonce_word 'Nonce word'
[random]: https://en.wikipedia.org/wiki/Randomness 'Randomness'
[initialisation vectors]: https://en.wikipedia.org/wiki/Initialization_vector 'Initialization vector'
[cryptographic hash functions]: https://en.wikipedia.org/wiki/Cryptographic_hash_functions 'Cryptographic hash functions'
[replay attacks]: https://en.wikipedia.org/wiki/Replay_attack 'Replay attack'
[cryptography]: https://en.wikipedia.org/wiki/Cryptography 'Cryptography'
[authentication protocol]: https://en.wikipedia.org/wiki/Authentication_protocol 'Authentication protocol'
[pseudo-random]: https://en.wikipedia.org/wiki/Pseudo-random 'Pseudo-random'


* KDF: key derivation function

* G: pseudorandom number

* N<sub>c</sub>, nonces

* N<sub>b</sub>, nonces


For a thorough look at SSL/TLS, HTTPS, and SSH, including the protocols used for
each, the parameters, diagrams, definitions, and everything else you could dream
of knowing, read chapter 17 of Cryptography and Network Security]

---

# Lab 3

[Snort resources](https://snort.org/resources). There's a Docker container for
Snort built on top of Debian.

I found
[the Snort manual](http://manual-snort-org.s3-website-us-east-1.amazonaws.com/)
to be very helpful while working on this project.

For Snort to detect attacks and alert you when attacks occur, Snort needs to
know where its rule base is. As a matter of convention, we place our custom
rules for Snort in the file `/prefix/snort/local.rules`.

The general format of a Snort rule is as follows:

```txt
{{< var ACTION >}} {{< var PROTO >}} {{< var SOURCE_HOST >}} {{< var SOURCE_IP >}} {{< var DIRECTION >}} {{< var DESTINATION_HOST >}} {{< var DESTINATION_IP >}} \[{{< var OPTIONS >}}\]
```

A Snort rule can be broken down into two logical parts

1. The rule header, which contains the following information:

    * Action to perform

    * Protocol that the rule applies to

    * Source and destination addresses and netmasks

    * Source and destination ports information

2. The rule options, which allow you to

    * Create a descriptive message to associate with the rule

    * Check a variety of other packet attributes by making use of Snort's
      extensive library of plug-ins.

When a packet comes in, its source and destination IP addresses and ports are
compared to the rules in the ruleset. If any of them are applicable to the
packet, then the options are compared to the packet. If all of these comparisons
return a match, then the specified action is taken.

Snort provides several built-in actions that you can use when crafting your rules.

* `log` - log the packet

* `alert` - generate an alert using the selected alert method, and then log the packet o pass -- ignore the packet

* `drop` -- block and log

* `sdrop` -- silently block but do not log

* `reject` - block, log and send response (TCP reset for TCP or ICMP port unreachable for UDP)

Note the last three actions would only work in inline mode.

Shown below is a sample `local.rules` file:

```txt
alert icmp any any -> any any (msg: "Testing ICMP alert"; sid:1000001;)
alert udp any any -> any any (msg: "Testing UDP alert"; sid:1000002;)
alert tcp any any -> any any (msg: "Testing TCP alert"; sid:1000003;)
```

Currently protocols supported are TCP, UDP, ICMP and IP. Direction is specified
using ASCII arrow syntax `->`. The IP address and port number on the left-hand
side of the direction operator is the source host, and the right-hand side is
the destination host. `<>` can be used to represent a bidirectional arrow
operator. Rule options are separated by `( ; )` and rule option keywords are
separated from their arguments by a `( : )`. The `msg` rule option is a simple
text string to be printed along with the alert or the log. The `sid` keyword is
used to identify Snort rules, custom defined rules should have a sid >= 1000000.
`rev` is used to mark the revision numbers in conjunction with `sid`.

* Checking the validity of a Snort ruleset

    ```shell script
    snort --v -c /usr/local/etc/snort/snort.conf -T
    ```

* Executing Snort with the updated ruleset

    ```shell script
    snort -c /usr/local/etc/snort/snort.conf -l /usr/local/var/log/snort -K ascii -i eth0
    ```

Breaking down the options used in the previous command:

* `-c`: Config file to use (in this case `snort.conf` imports `local.rules`

* `-l`: Directory to use for logging output

* `-K`: Logging mode (`pcap` (default), `ascii`, or `none`)

* `-i eth0`: The interface to listen to (`eth0`)

#### Understanding Standard Alert Output

When Snort generates an alert message, it will usually look like the following:


```txt
[**] [116:56:1] (snort_decoder): T/TCP Detected [**]
```

The first number is the Generator ID, this tells the user what component of
Snort generated this alert.

The second number is the SID or Snort ID (sometimes referred to as the Signature
ID). Rule-based SIDs are written directly into the rules with the SID option. In
this case, 56 represent a T/TCP event.

The third number is the revision ID.

