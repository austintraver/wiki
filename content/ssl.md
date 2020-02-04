+++
title = "SSL"
description = "the Secure Socket Layer"
date = 2020-01-30T20:14:57-08:00
image = "ssl.jpg"
+++

# `ssl`

These days, pretty much every website has to use *Secure Socket Layer* or **SSL** technology to secure network traffic, but it wasn't always this case. In 2016, 14% of popular websites forced `HTTPS` connections, but a year later, that number had already more than doubled to 31%. Today, more than half of websites require `HTTPS` to be used when making a connection, which allows data sent back and forth to travel in a secure manner, using an encrypted connection that no adversary can listen in on.

## Encodings

There are two common ways that the files containing certificates and keys are encoded.

The first is called *Privacy Enhanced Mail* or **PEM** encoding, which uses a base-64 ASCII encoding of the ASN.1 format. Its implementation was specified in RFC 7468. That ASN.1 format is also used for the *Distinguished Encoding Rules* or **DER** encoding, which is the shortest possible binary representation of the underlying cryptographic data.


## `openssl`

* Create a Certificate Signing Request using `gpgsm`

  ```sh
  gpgsm --generate-key --output request.csr
  # Select the option to use an existing key, keeping your keygrip handy


  # When it asks you for some info, provide something similar to the line below
  'CN=austin.jp,C=US,ST=California,L=Los Angeles,O=austin.jp'
  ```

* Create a Certificate Signing Request using `openssl`

  ```sh
  # Using PKCS #1 private key
  openssl req -new -key id_pkcs1 > request.csr

  # Using PKCS #8 private key
  openssl req -new -key id_pkcs8 > request.csr
  ```

* Submit a Certificate Signing Request

  ```sh
  sudo certbot certonly --standalone --csr </path/to/request.csr>
  ```

* Generate a Revocation Certificate

  ```sh
  gpg --gen-revoke ttrojan@usc.edu > revocation.crt
  ```

## `certbot`

The `certbot` command, provided by GNU Let's Encrypt, allows you to obtain a signature for use with SSL. You can either allow the `certbot` program to create its own private key locally, or provide one manually. `certbot` can submit a *Certificate Signing Request* or **CSR** to a *Certificate Authority* or **CA**.

* Receive a certificate by submitting a CSR to `Lets Encrypt`

  ```sh
  certbot certonly --standalone --csr request.csr
  ```

After you've done this, you'll receive three files

* `0000_cert.pem`
* `0000_chain.pem`
* `0001_chain.pem`

Go ahead and delete the first two, you'll only need `0001_chain.pem`, which is a simple concenation of the previous two files. It's the combination of the server certificate and the intermediate certificate, which when used together, allow you to verify your identity

  ```sh
  rm 0000_cert.pem 0000_chain.pem
  mv 0001_chain.pem fullchain.crt
  ```

* Spin up an Express server hosting a React application

  ```js
  import fs from "fs";
  import http from "http";
  import https from "https";

  import express from 'express';
  const app = express();

  const options = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('fullchain.crt')
  };

  /* Serve the static website in ./build */
  app.use(express.static('build'));

  /* Listen on port 80 for HTTP requests */
  http.createServer(app).listen(80);

  /* Listen on port 443 for HTTPS requests */
  https.createServer(options, app).listen(443);
  ```

And you're done! You're now hosting a website over HTTPS 🥳
