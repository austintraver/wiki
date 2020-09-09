---
title: "Uniform Resource Identifiers"
description: "When the man in uniform tries to ID your resource, you'll be glad you read this."
date: 2020-07-23T22:20:14-07:00
image: "uri.png"
draft: false
---

## URI Syntax

Every URI consists of a hierarchical sequence of five components

1. `scheme`
1. `authority`
1. `path`
1. `query`
1. `fragment`

These components can be seen in the diagram below

```txt
   
  scheme   authority       path                  query          fragment 
   ┌┴──┐   ┌───┴───┐┌───────┴────────┐ ┌───────────┴─────────┐ ┌───┴────┐
   https://127.0.0.1/dir/path/file.txt?key1=value1&key2=value2#anchor-tag
  └─────────────────────────────────┬────────────────────────────────────┘ 
                                   URI
 
```

  * `scheme`: `https`
  * `authority`: `127.0.0.1`
  * `path`: `/dir/path/file.txt`
  * `query`: `key1=value1&key2=value2`
  * `fragment`: `anchor-tag`


### Scheme

* The `scheme` component declares which protocol is to be used. For instance, on the web, the scheme `https` in the URI `https://helpful.wiki` specifies HTTPS as the application transfer protocol


### Authority

* The `authority` component has three subcomponents

  1. `userinfo`
  1. `host`
  1. `port`

```txt
  
           userinfo         host     port
        ┌─────┴─────┐ ┌──────┴─────┐ ┌──┐
  ssh://user:password@sub.domain.tld:1337
        └────────────────┬──────────────┘ 
                     authority 
  
```

#### `userinfo`

* The `userinfo` component, part of the `authority` component, itself has two subcomponents

  1. `username`
  1. `password`

```txt
  
    username  password         
        ┌┴─┐┌──┴────┐ 
  ssh://user:password@127.0.0.1:1337
        └──────┬────┘ └───┬───┘ └┬─┘ 
           userinfo      host   port  
  
```

#### `host`

* The `host` component, part of the `authority` component, takes three forms

  1. Registered Name
  1. IPv4 Address in *dotted-decimal form*
    * This is the formal name for the `#.#.#.#` convention
  1. IPv6 Address

* Example of a host identified by its registered name `sub.domain.com`:

  ```txt
          registered name
          ┌──────┴─────┐
  https://sub.domain.com
          └─────┬──────┘
               host
  ```

* Example of a host identified by its IPv4 address:

  ```txt
          IPv4 address 
          ┌───┴───┐
  https://127.0.0.1/index.html
          └───┬───┘
             host
  ```

* Example of a host identified by its IPv6 address, surrounded in `[square brackets]`:

  ```txt
                        IPv6 address
          ┌─────────────────┴───────────────────┐ 
  http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html
         └─────────────────┬─────────────────────┘   
                          host
  ```

* According to [RFC 3986](https://tools.ietf.org/html/rfc3986#page-22), the port is not part of the host

* For HTTP requests...

  1. Services in the name of one host can be provided by many servers, which have different IP addresses.

  1. One server, with one IP address, can provide services in the name of many hosts. This is known as virtual hosting

* Host names are mapped to IP addresses by a server known as a DNS server, or domain name server. DNS stands for Domain Name Service. In a large network, many DNS servers may collaborate to provide the mapping between host names and IP addresses.

  * [Source: IBM](https://www.ibm.com/support/knowledgecenter/SSGMCP_4.1.0/com.ibm.cics.ts.internet.doc/topics/dfhtl28.html)

```txt
https://app.website.com/path/?key1=val1&key2=val2
```



## Domain Names

* The domain name `app.website.com` is made of three labels, each separated by a `.` character

  1. `app`
  1. `website`
  1. `com`

* Technically, there is a fourth one, [the zero-length root label](https://tools.ietf.org/html/rfc3490#ref-STD13), `.`, which can be explicit, as in the `.` at the end of `sub.domain.tld.`, but it can also be implicit, its hidden from the valid URL `sub.domain.tld`

* The **second-level domain** (SLD) would be `example` for the URL `example.com`

* The **subdomain** would be `app` for the URL `app.product.net`
            
```txt
          root domain name
            ┌────┴───┐
https://sub.domain.net/dir/path/doc.html
        └┬┘ └─┬──┘ └┬┘ 
    subdomain SLD  TLD
```


```txt

   username  password         
       ┌┴─┐┌──┴────┐ ┌─────┴──────┐ ┌─┴─┐
sftp://user:password@sub.domain.tld:1337
       └──────┬────┘ └─────┬──────┘ └─┬─┘
          userinfo        host       port

```


```txt
URI prefix        authority
┌──┴──┐┌──────────────┴────────────────┐
sftp://user:password@sub.domain.tld:1337/dir/path/doc.html
└─────────────────┬────────────────────┘
                
```


Some additional examples of URIs are included below:

```txt
  
          userinfo       host      port
          ┌──┴───┐ ┌──────┴──────┐ ┌┴┐
  https://john.doe@www.example.com:123/forum/questions/?tag=networking&order=newest#top
  └─┬─┘   └───────────┬──────────────┘└───────┬───────┘ └───────────┬─────────────┘ └┬┘
  scheme          authority                  path                 query           fragment
  
  
```

```txt

  mailto:John.Doe@example.com
  └─┬──┘ └────┬─────────────┘
  scheme     path

```
  
```txt

  tel:+1-816-555-1212
  └┬┘ └──────┬──────┘
  scheme    path

```

```txt
  
  telnet://192.0.2.16:80/
  └─┬──┘   └─────┬─────┘└┘
  scheme     authority  path
  
```

## Sockets

* A [network socket](https://en.wikipedia.org/wiki/Network_socket) is externally identified to other hosts by its socket address, which is the triad of transport protocol, IP address, and port number.

* A socket address is a tuple consisting of three elements

  1. transport protocol (e.g. `TCP`)
  2. IP address (e.g. `127.0.0.1`)
  3. port number (e.g. `80`)

### [Socket pairs](https://en.wikipedia.org/wiki/Network_socket#Socket_pairs)

Communicating local and remote sockets are called **socket pairs**. Each socket pair is described by a unique tuple consisting of 4 elements
  1. source IP
  2. source port number
  1. destination IP
  1. destination port number

In other words, a socket pair consists of two socket addresses, one local, and one remote.


## The `file` URI scheme

* Example of a URI specifying a resource on the local host

```txt
 file:/Users/ttrojan/Downloads/file.txt
 └┬─┘ └───────┬───────────────────────┘ 
 scheme      path      
                                                                                          
