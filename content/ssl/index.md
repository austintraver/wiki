---
title: SSL
description: "the Secure Socket Layer"
date: 2020-02-04T14:52:27-08:00
---

# SSL 

These days, pretty much every website has to use *Secure Socket Layer* or **SSL** technology to secure network traffic, but it wasn't always this case. In 2016, 14% of popular websites forced `HTTPS` connections, but a year later, that number had already more than doubled to 31%. Today, more than half of websites require `HTTPS` to be used when making a connection, which allows data sent back and forth to travel in a secure manner, using an encrypted connection that no adversary can listen in on.

It's hard to know where to start with an introduction to this material, but I'll
be making references to the family of standards used in SSL, which are called
the [Public-Key Cryptography Standards (PKCS)][PKCS].

[PKCS]: https://en.wikipedia.org/wiki/PKCS

I've read a few textbooks to try and better understand SSL, and the place I felt
it was explained best was Chapter 8.6 of the ["Computer Networking: A Top-Down
Approach (7th Edition)"][Computer Networking] by James F. Kurose and Keith W.
Ross.

[Computer Networking]: https://www.amazon.com/dp/1292153598/

## Encodings

There are two common ways to encode the files containing certificates and keys:

1. *Privacy Enhanced Mail* or **PEM** encoding, which uses a base-64 ASCII
   encoding of the ASN.1 format. Its implementation was specified in RFC 7468.

1. *Distinguished Encoding Rules* or **DER** encoding, which is the shortest
   possible binary representation of the underlying cryptographic data. Much
   like PEM encoding, it too uses the ASN.1 format.


## `openssl`

### Configurations

* Find the path to the SSL's configuration file:

    ```shell script
    openssl ca
    ```

{{% aside warning %}}

The configuration file only applies to the `ca` `req` and `x509` subcommands

{{% /aside %}}

### Certificates

This is a walkthrough for creating [certificate signing requests (CSRs)](https://en.wikipedia.org/wiki/Certificate_signing_request) using either `gpgsm` or `openssl`.

* Creating a certificate signing request using `gpgsm`

    ```shell script
    gpgsm --generate-key --output request.csr
    # Select the option to use an existing key, keeping your keygrip handy
    # When it asks you for some info, provide something similar to the line below
    'CN=austin.jp,C=US,ST=California,L=Los Angeles,O=austin.jp'
    ```

Creating a Certificate Signing Request require a key. This key can be encoded in a variety of formats, including [PKCS #1](https://en.wikipedia.org/wiki/PKCS_1) and [PKCS #8](https://en.wikipedia.org/wiki/PKCS_8). using `openssl`

  ```shell script
  # Using PKCS #1 private key
  openssl req -new -key id_pkcs1 > {{< var REQUEST.CSR >}}

  # Using PKCS #8 private key
  openssl req -new -key id_pkcs8 > {{< var REQUEST.CSR >}}
  ```

* Submitting a Certificate Signing Request

    ```shell script
    certbot certonly --standalone --csr {{< var REQUEST.CSR >}}
    ```

If this certificate was ever compromised, you would issue a revocation certificate. I'm not sure what you do next, however, it's unclear to me whether you'd want to update a [certificate revocation list](https://en.wikipedia.org/wiki/Certificate_revocation_list) or to update the certificate authority's responder facilitating [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) transmissions.

* Generating a Revocation Certificate

    ```shell script
    gpg --gen-revoke ttrojan@usc.edu > revocation.crt
    ```

## `certbot`

The `certbot` command, provided by GNU Let's Encrypt, allows you to obtain a signature for use with SSL. You can either allow the `certbot` program to create its own private key locally, or provide one manually. `certbot` can submit a *Certificate Signing Request* or **CSR** to a *Certificate Authority* or **CA**.

* Receive a certificate by submitting a CSR to `Lets Encrypt`

    ```shell script
    certbot certonly --standalone --csr request.csr
    ```

After you've done this, you'll receive three files

* `0000_cert.pem`
* `0000_chain.pem`
* `0001_chain.pem`

Go ahead and delete the first two, you'll only need `0001_chain.pem`, which is a simple concenation of the previous two files. It's the combination of the server certificate and the intermediate certificate, which when used together, allow you to verify your identity

    ```shell script
    rm 0000_cert.pem 0000_chain.pem
    mv 0001_chain.pem fullchain.crt
    ```

