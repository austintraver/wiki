---
title: "URIs and URLs"
description: "A string of characters that unambiguously locates a resource"
date: 2020-07-23T22:20:14-07:00
draft: false
---

# So which is it? URI or URL?

I wrote this page because I kept forgetting the answers to questions like
"What's the difference between a URI and a URL? What's a URN again? Was that
part called the 'base url' or was it called the 'root url'?" and so on.

If you're *determined* to find the correct words to break down the components of
a URI, it ends up being way harder than you'd think, because it's so hard to be
sure the answer you find *was* correct is *still* correct. The right answer
keeps changing! [RFC 1630][] defines the syntax for Uniform Resource
*Identifiers* (URIs)s and [RFC 1738][] defines the syntax for Uniform Resource
*Locators* (URLs), but it didn't stay that way, here, because [RFC 1808][] is
adds a syntax for *Relative URLs* and [RFC 2396][] updates the syntax for the
URIs defined in [RFC 1808][] and [RFC 1738][]. This wasn't the only update
either. [RFC 2732][] updates the syntax for URIs *once again*. At this point,
it's such a mess, so [RFC 3986][] is written to restore order and declare a
definitive syntax.

Don't dive down the rabbit hole yet (or ever, honestly.) Because if you open up
[RFC 3986][] you'll find that at the top of page one, [RFC 3986][] itself ends
up being updated by publications later on like [RFC 6874][], [RFC 7320][], and
[RFC 8820][]. It turns out, these updates don't really update the syntax much
(if at all), they're moreso clarifications made about some of the more ambiguous
parts of [RFC 3986][] and general guidelines for the people reading it. As far
as I know, [RFC 3986][] is still the ultimate "source of truth" for this topic.

[RFC 1630]: https://tools.ietf.org/html/rfc1630
[RFC 1738]: https://tools.ietf.org/html/rfc1738
[RFC 1808]: https://tools.ietf.org/html/rfc1808
[RFC 2396]: https://tools.ietf.org/html/rfc2396
[RFC 2732]: https://tools.ietf.org/html/rfc2732
[RFC 3986]: https://tools.ietf.org/html/rfc3986
[RFC 6874]: https://tools.ietf.org/html/rfc6874
[RFC 7320]: https://tools.ietf.org/html/rfc7320
[RFC 8820]: https://tools.ietf.org/html/rfc8820

But at the end of the day, anybody reading this got here from a Google search
isn't here to read through an entire RFC publication. I wrote this page so that
I'd never have to read through it (again), but I will be quoting it extensively.

## Uniform Resources

![](./venn-diagram.png)

<cite>
<a title="Peter Krauss, Mysid, Rjgodoy, CC BY-SA 3.0
&lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons"
href="https://commons.wikimedia.org/wiki/File:URI_Venn_Diagram.png">
</a>
</cite>

There are three types of uniform resources

1. Uniform Resource *Identifiers* (**URI**s)
1. Uniform Resource *Locators* (**URL**s)
1. Uniform Resources *Names* (**URN**s)

## The syntax of a URI

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

| Component | Value |
| :--- | :--- |
| Scheme | `https` |
| Authority | `127.0.0.1` |
| Path | `/dir/path/file.txt` |
| Query | `key1=value1&key2=value2` |
| Fragment | `anchor-tag` |


### Scheme

The `scheme` component declares which protocol is to be used. For instance, on the web, the scheme `https` in the URI `https://helpful.wiki` specifies HTTPS as the application transfer protocol. To learn more, I recommend taking a look at Wikipedia's [List of URI schemes](https://en.wikipedia.org/wiki/List_of_URI_schemes).


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

## Network devices

### Nodes

A [node](https://en.wikipedia.org/wiki/Network_node) refers to any device that participates in a network. Valid examples of nodes include modems, switches, and hosts.

### Hosts

A host is a computer connected to a network, including the Internet. A host that is connected to the Internet has one or more IP addresses assigned to it. A host is a type of node, one that participates in user applications. either as a server, client, or both. 

### Servers

A server is a type of host that offers resources to the other hosts. 

## Domain names

The [domain name](https://en.wikipedia.org/wiki/Domain_name) consists of one or more parts. Each of these parts is called a *label*, and they are concatenated together, delimited with the dot `.` character. For instance, the domain name `api.website.com` is made of three labels, `api`, `example`, and `com`. 

### Subdomains

A subdomain is a subtree within a domain. The name of a subdomain will include the name of the domain it belongs to. For example, `www.example.com` is a subdomain of the `example.com` domain. What many don't realize is that `example.com` is also a subdomain! It's a subdomain of the of `com` [top level domain](https://en.wikipedia.org/wiki/Top-level_domain). All domains are a subdomain of root. The domain name `api.website.com` is the [subdomain](https://en.wikipedia.org/wiki/Subdomain) of the  `website.com`.

### Fully qualified domain names

Although in practice it is often omitted, this domain name is still a partially qualified domain name, even though it includes the `.com` top level domain. The reason is, it's missing the root level domain, specified by [the zero-length root label](https://tools.ietf.org/html/rfc3490#ref-STD13). The the trailing `.` in `example.com.` tells the DNS server that the domain name provided is an fully qualified domain name, all the way up to the root domain. In practice, though it can be *explicit*, as shown in `example.com.`, more often than not, a DNS will not get tripped up by an *implicit* fully qualified domain name, such as `sub.domain.tld`.

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

   username  password  fully qualified domain name       
       ┌┴─┐┌──┴────┐ ┌─────┴──────┐
sftp://user:password@sub.domain.tld:1337
       └──────┬────┘ └─────┬──────┘ └─┬─┘
          userinfo        host       port

```


```txt

URI prefix        authority
┌──┴──┐┌──────────────┴────────────────┐
sftp://user:password@sub.domain.tld:1337/dir/path/doc.html
└─────────────────┬────────────────────┘
                 host
```


Some additional examples of URIs are included below:

```txt
  
          userinfo       host      port
          ┌──┴───┐ ┌──────┴──────┐ ┌┴┐
  https://ttrojan@www.example.com:123/forum/questions/?tag=networking&order=newest#top
  └─┬─┘   └───────────┬──────────────┘└───────┬───────┘ └───────────┬─────────────┘ └┬┘
  scheme          authority                  path                 query           fragment
  
  
```

```txt

  mailto:ttrojan@example.com
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
```

## URL Schemes

### FaceTime

The facetime URL scheme is used to initiate a FaceTime call to a specified user. You can use the phone number or email address of a user to initiate the call. When a user taps a FaceTime link in a webpage, iOS confirms that the user really wants to initiate a FaceTime call before proceeding. When an app opens a URL with the facetime scheme, iOS opens the FaceTime app and initiates the call without prompting the user. When opening FaceTime URLs on macOS, the system always prompts the user before initiating a call.

You can specify FaceTime links explicitly in both web and native iOS apps using the facetime URL scheme. The following examples show the strings formatted for Safari and for a native app

* Making a FaceTime video call

    * Using their phone number

    ```txt
    facetime:+15551234567
    ```

  * Using their Apple ID

    ```txt
    facetime://user@example.com
    ```

* Making a FaceTime Audio phone call

  * Using their phone number

    ```txt
    facetime-audio:+15551234567
    ```

    * Using their Apple ID

        ```txt
        facetime-audio://user@example.com
        ```

### The `mailto:` URL scheme


You can create a link to a user where, when they click on it, the subject and body are pre-populated

```txt
mailto:{{< var RECIPIENT >}}?subject={{< var SUBJECT >}}&body={{< var BODY >}}
```

Replace the following, being sure to [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding) values as necessary

* {{< var RECIPIENT >}}: `ttrojan@usc.edu`
* {{< var SUBJECT >}}: `Breaking%20news`
* {{< var BODY >}}: `You%20are%20a%20hacker`

### The `message:` URL scheme { #message }

#### Linking to existing emails

In the macOS Mail app, go to **Preferences -> Viewing -> Show message headers -> Custom...** and add a new entry: `Message-ID`. Now, whenever you view an email, you'll see the message ID below the typical *To:*, *From:*, etc. displayed below the message subject. 

To create a link to a message, right click the message ID, select **Copy**, open up Terminal, and run the following command:

```shell script
email="message:%3c$(pbpaste)%3e"
print ${email}
pbcopy < =(<<<${email})
```

The commands above URL encode the angle brackets that must surround a message ID. This is an arbitrary specification of the `message:` URL scheme. To add the angle brackets that surround the `<` message ID `>`, you'll have to add the URL encoded strings `%3c` and `%3e` to the beginning and ending of the path respectively. In your terminal, you could do so using the following command:

## REST APIs

All API paths are relative to a **base URL**, for example, `/users`, when specified, would truly refer to `<scheme>://<host>/<basePath>/users`, see the example below:

```txt
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/
```
