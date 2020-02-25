+++
title = "GPG"
description = "Encryption using the GNU privacy guard"
date = 2020-02-04T14:52:27-08:00
image = "gpg.jpg"
+++

## Getting Started

```sh
brew install gpg
```

## GPG vs PGP

GNU Privacy Guard (GPG) is open source software which implements OpenPGP standard RFC4880, which specifies a protocol for how to encrypt and decrypt files. Pretty Good Privacy (PGP) is proprietary software written by Symantec, and is another implementation of OpenPGP. Both are compatible with each other, and the reason why is where it gets confusing.

In 1997, Symantec released OpenPGP, an open source set of standards for encryption software. Even though PGP is not open source, OpenPGP is. The GNU Privacy Guard GPG implements the set of standards outlined in OpenPGP.

For this reason, it is effectively synonymous to say "GPG key" and "PGP key" since they're both "OpenPGP keys". With this in mind, technically a "key-pair" is what refers to a public and private key, in the industry it’s common for "key" to mean "key-pair"

At this point, GPG has been around a long time. It's currently on version 2, which is not compatible with version 1. However, version 1 is only required if you're trying to decrypt PGP keys from 20+ years ago.

## Anatomy of a GPG Key

* User ID (UID): The name and email corresponding with a key.
* Key ID: A hexadecimal string that identifies a key.
* Key Certificate: An assertion that a certain key belongs to a certain entity.
* Key-Pair: A private key and it's corresponding public key.
* Private Key: A key that can be used to decrypt any messages previously encrypted with the corresponding public key.
* Public Key: A key that can be used to encrypt messages that  can only be decrypted with the corresponding private key.

## Generating a new key

```sh
gpg --quick-generate-key
gpg --generate-key
gpg --full-generate-key
```

## Listing all keys in the keyring

```sh
gpg -K
```

## Listing the public keys in the keyring

```sh
gpg -k
```


## Importing keys

* Import a key file directly

```sh
gpg --import example.key
```
* Download someone's public GPG key from GitHub

```sh
user="tommytrojan" # their GitHub username
curl https://api.github.com/users/${user}/gpg_keys | jp '[0].raw_key' | gpg --import
```

## Exporting keys

* Exporting the public key specified by its email address to STDOUT

  ```sh
  gpg --armor --export example@pm.me > example.asc
  ```

* Exporting the public key specified by its comment "GitHub" to `/dev/stdout`

  ```sh
  gpg -a --export GitHub
  ```

* Exporting the public key to a file as binary data

  ```sh
  gpg --output ./example.key --export example@pm.me
  ```

* Exporting the public key to a file as armored ASCII

  ```sh
  gpg -o example.asc -a --export example@pm.me
  ```

* Export the private key as binary file

  ```sh
  gpg --export-secret-keys example@pm.me > ./example.key
  ```

* Export the private key as armored ASCII

  ```sh
  gpg -a --export-secret-keys example@pm.me > ./example.asc
  ```

{{% notice info %}}
**Tip:** Use the `-a` flag when exporting keys. This flag will encrypt the file into a readable cipher of jumbled ASCII text, instead of a binary file filed with 0s and 1s.
{{% /notice %}}

* By default, exporting a key will be directed to the standard output. It is common convention to give a binary key file the `.key` extension and ASCII armored key files the `.asc` extension.

## Changing a key's passphrase

Sometimes you want to change the passphrase that you're prompted for when using a particular secret key. Maybe you're using the same password for the key as you are for your computer (and if so, shame on you, who would do such a thing? Definitely not me, that's for sure).

* Change the password of a private key

  ```sh
  gpg --passwd tommy@pm.me
  ```

## Encrypting a file

Use the `-r` flag to specify the recipient of the file. You can use this flag multiple times to specify more than one recipient. If you specify multiple recipients, any of the corresponding secret keys will be able to decrypt the file.

* Encrypt a file for a single recipient

  ```sh
  gpg -r John -se file.txt
  ```

* Encrypt a file for multiple recipients

  ```sh
  gpg -r John -r Cam -se file.txt
  ```

{{% notice info %}}
**Tip:** It might be a good idea to specify your own key ID so that you can decrypt the file later on as well.
{{% /notice %}}


## Decrypting a file

* Decrypt the file `example.txt.gpg`

  ```sh
  gpg -d example.txt.gpg
  ```

{{% notice info %}}
  **Tip:** If you have multiple private keys, you don't need to specify which one to decrypt a file. `gpg` can figure out which key to use.
{{% /notice %}}


## Signing a message

It's important to sign a file with your key when you're encrypting it for your recipient. This signature tells `gpg` to provide a proof of origin, specifying where the file came from.

Signatures serve a useful purpose: Since signature is unique, if a file contains your signature, it must be from you. This helps add trust to someone when they're decrypting a file.

Imagine there is a hacker, who gains access to your email. He knows your friend's public key, so he sends a message to your friend with malicious intent, claiming to be you.

Your friend, who sees that the message came from your email address, decrypts the file, and is tricked into believing that the file was sent from you. Since the file lacks a signature, he has no way of knowing who encrypted it using his public key.

Your private key is the only one that can provide this unique signature. If a file is signed with a private key, you're certifying that it came from you.  If, later down the line, the file you encrypted was altered by a hacker in a "man in the middle" attack, your original signature and the current state of the file would no longer match up. If someone wanted to check and see that the file was from you, it would no longer appear to be so.

## Specifying which key to sign with

If you have multiple private keys on your keyring, you may want to encrypt a document using a particular key. Use the `-u` flag to tell `gpg` which key to use for signing the encrypted file.

* Encrypt the file `file.txt` for recipient `friend@pm.me`, and sign it using the private key of `example@pm.me`

  ```sh
  gpg -u example@pm.me -r friend@pm.me -se file.txt
  ```


## Trusting a key

If you import somebody's public key, that doesn't mean you trust them, it just tells `gpg` about the key. If your friend gives you his key, you should tell `gpg` that you trust it by adding your key signature to the public key.

{{% notice warning %}}
**Note:** The vocab thrown around on the internet can be a little confusing so it's important to clarify some terms here. Declaring that you trust a key is known as "certification", "certifying a key", "key signing", or "signing a key".
{{% /notice %}}

```sh
# import a friend's key
gpg --import friend.key
# list keyring's public key info (to find the associated key ID)
gpg -k
# sign a friend's key
gpg --sign-key friend@pm.me
```

This isn't inherently useful, but it becomes useful if you send that public key back to them. It would mean that if your friend sends a file to your boss, who also trusts your key, then he can trust your friend's signature as well.

Why can he trust your friend? Because you signed off on it with your key, thereby telling `gpg` that you believe your friend's key is trustworthy. If your boss trusts you, and you trust your friend, then your boss trusts your friend too.


## Outputting to a specific filename

Use the `-o` flag to specify output to a particular file, instead of the default output.

By default, encrypting `example.txt` will create `example.txt.gpg` but this can be altered by specifying the output file with the `-o` flag.


```sh
gpg -o boring_paperwork.gpg -se illegal_activities.txt
```


## Generating a key-pair

```sh
$ gpg --full-generate-key --no-emit-version
```

## Listing Keys

```sh
# list fingerprints for keys
$ gpg --fingerprint

# list all public keys
$ gpg -k

# list all secret keys
$ gpg -K
```

## Fingerprints & Key IDs

A public key fingerprint is a short sequence of bytes used to identify a longer public key. Fingerprints are created by applying a cryptographic hash function to a public key. Since fingerprints are shorter than the keys they refer to, they can be used to simplify certain key management tasks.

Some operations on keys require you to provide a fingerprint or key ID.
The keys are prefixed with the hex-value indicator, "0x"

* a short key ID is the last 8 chars, e.g.: `0xA4FF2279`
* a long key ID is the last 16 chars, e.g.: `0x4E1F799AA4FF2279`

## Deleting Keys

```sh
# Delete a friend's public key
gpg --delete-keys friend@noreply.github.com
# Delete your secret & public key-pair
gpg --delete-secret-and-public-keys me@noreply.github.com
```


### `ssh` with `gpg` key

* Add this to your shell startup file.

  ```sh
  # Enable support for GPG encryption of echo command
  export GPG_TTY=$(tty)

  # Launch the GPG agent, unless one is already running
  gpg-agent --daemon &>/dev/null

  # Identifies the path of a UNIX-domain socket
  # Used to communicate with the SSH agent
  export SSH_AUTH_SOCK="$(gpgconf --list-dirs agent-ssh-socket)"
  ```

* Add an authentication subkey to your keyring

  ```sh
  gpg --expert --edit-key <keyID>
  addkey
  # press 8 <Enter>
  # press S <Enter>
  # press E <Enter>
  # press A <Enter>
  # press Q <Enter>
  # press 4096 <Enter>
  # press 0 <Enter>
  ```

* Copy your authentication subkey's keygrip to `~/.gnupg/sshcontrol`

  ```sh
  gpg -k --with-keygrip
  # 4EC68884AECA658DD0523C66E6C70FD9A1B61790
  ```

  * The authentication subkey is the one whose header line resembles the pattern `rsa4096/0x85B21AADAE7C8359 2019-07-10 [A]`

* Add this line to the file `~/.gnupg/gpg-agent.conf`

  ```txt
  enable-ssh-support
  ```

* Check if SSH can detect this key

  ```sh
  # View the MD5 fingerprint of the SSH key
  ssh-add -l -E md5
  ```

* Check if these two commands produce matching output

  ```sh
  ssh-add -L
  gpg --export-ssh-key <keyID>
  ```

* If you ever need to kill the GPG agent, you can do so by running this command

  ```sh
  gpgconf --kill gpg-agent
  ```

* Checking the message digest of a key file

  ```sh
  gpg --print-mds key.asc
  gpg --print-md md5 key.asc
  gpg --print-md sha256 key.asc
  gpg --print-md sha1 key.asc
  ```

### Ways to Specify User ID


user ID can be specified many ways

* By email (partial or full)
  e.g. `usc.edu`
  e.g. `@ttrojan`
  e.g. `<ttrojan@usc.edu>`

* By name (partial or full)
  e.g. `Tommy`
  e.g. `Tommy Trojan`

* By short key ID (optionally prefix the key-id with 0x (8 hex digits long)
	e.g. `2B2F8910`
  e.g. `022B2F8910`

* By long key ID (optionally prefix the key-id with 0x (16 hex digits long)
	e.g. `2F6F37E42B2F8910`
	e.g. `0x2F6F37E42B2F8910`

* By fingerprint (optionally prefix with 0x)
	e.g. `438FB6FEFCA0744F279E42192F6F37E42B2F8910`
	e.g. `0x438FB6FEFCA0744F279E42192F6F37E42B2F8910`

* By keygrip (must be prepended with an ampersand
  e.g. `&D75F22C3F86E355877348498CDC92BD21010A480`

* By exact match of an OpenPGP UserID
  e.g. `=Tommy Trojan <ttrojan@usc.edu>`

### Hash Algorithms

* MD5 stands for *Merkle–Damgård 5*, but it's easier to pretend it stands for *"Message Digest 5"*

* MD5's digest length is 128 bits
* SHA1's digest length is 160 bits
* SHA256's digest length is 256 bits
* SHA512's digest length is 512 bits

### Expired Keys

* Remove the expiration date of a key (even if it already happened)

```sh
# Disable expiration for a key, even if it's already expired
gpg --quick-set-expire <key fingerprint> 0
```

* Remove all expired keys from your keyring

```sh
# TODO fix
gpg -k --with-colons \
	| grep '^...:e' \
	| awk -F ':' '{ print $5 }' \
	| awk -v ORS=' ' 'NF' \
	| read -A array; gpg --delete-secret-and-public-keys ${array}
```

## GPG and SSH

* Launching a GPG agent that can support SSH compatibility

```sh
# Launch the GPG agent if one isn't already running
# if there is an existing one running already, then ignore the message
# that the GPG agent reports
gpg-agent --enable-ssh-support --daemon &> /dev/null

```

* Transfering control of the SSH socket from the SSH agent to the GPG agent

```sh
# Allow GPG's socket to manage the `ssh` authentication process
export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)
```

* Export GPG key as an SSH public key

  ```sh
  # Using GPG
  gpg --export-ssh-key ttrojan@usc.edu > ~/.ssh/id_rsa.pub
  ```

## Scripting

Pasted below is useful content that explains the output provided when the `--with-colons` argument is called:

```
** Description of the fields
*** Field 1 - Type of record

    - pub :: Public key
    - crt :: X.509 certificate
    - crs :: X.509 certificate and private key available
    - sub :: Subkey (secondary key)
    - sec :: Secret key
    - ssb :: Secret subkey (secondary key)
    - uid :: User id
    - uat :: User attribute (same as user id except for field 10).
    - sig :: Signature
    - rev :: Revocation signature
    - rvs :: Revocation signature (standalone) [since 2.2.9]
    - fpr :: Fingerprint (fingerprint is in field 10)
    - pkd :: Public key data [*]
    - grp :: Keygrip
    - rvk :: Revocation key
    - tfs :: TOFU statistics [*]
    - tru :: Trust database information [*]
    - spk :: Signature subpacket [*]
    - cfg :: Configuration data [*]

    Records marked with an asterisk are described at [[*Special%20field%20formats][*Special fields]].

*** Field 2 - Validity

    This is a letter describing the computed validity of a key.
    Currently this is a single letter, but be prepared that additional
    information may follow in some future versions. Note that GnuPG <
    2.1 does not set this field for secret key listings.

    - o :: Unknown (this key is new to the system)
    - i :: The key is invalid (e.g. due to a missing self-signature)
    - d :: The key has been disabled
	   (deprecated - use the 'D' in field 12 instead)
    - r :: The key has been revoked
    - e :: The key has expired
    - - :: Unknown validity (i.e. no value assigned)
    - q :: Undefined validity.  '-' and 'q' may safely be treated as
           the same value for most purposes
    - n :: The key is not valid
    - m :: The key is marginal valid.
    - f :: The key is fully valid
    - u :: The key is ultimately valid.  This often means that the
           secret key is available, but any key may be marked as
           ultimately valid.
    - w :: The key has a well known private part.
    - s :: The key has special validity.  This means that it might be
           self-signed and expected to be used in the STEED system.

    If the validity information is given for a UID or UAT record, it
    describes the validity calculated based on this user ID.  If given
    for a key record it describes the validity taken from the best
    rated user ID.

    For X.509 certificates a 'u' is used for a trusted root
    certificate (i.e. for the trust anchor) and an 'f' for all other
    valid certificates.

    In "sig" records, this field may have one of these values as first
    character:

    - ! :: Signature is good.
    - - :: Signature is bad.
    - ? :: No public key to verify signature or public key is not usable.
    - % :: Other error verifying a signature

    More values may be added later.  The field may also be empty if
    gpg has been invoked in a non-checking mode (--list-sigs) or in a
    fast checking mode.  Since 2.2.7 '?' will also be printed by the
    command --list-sigs if the key is not in the local keyring.

*** Field 3 - Key length

    The length of key in bits.

*** Field 4 - Public key algorithm

    The values here are those from the OpenPGP specs or if they are
    greater than 255 the algorithm ids as used by Libgcrypt.

*** Field 5 - KeyID

    This is the 64 bit keyid as specified by OpenPGP and the last 64
    bit of the SHA-1 fingerprint of an X.509 certifciate.

*** Field 6 - Creation date

    The creation date of the key is given in UTC.  For UID and UAT
    records, this is used for the self-signature date.  Note that the
    date is usually printed in seconds since epoch, however, we are
    migrating to an ISO 8601 format (e.g. "19660205T091500").  This is
    currently only relevant for X.509.  A simple way to detect the new
    format is to scan for the 'T'.  Note that old versions of gpg
    without using the =--fixed-list-mode= option used a "yyyy-mm-tt"
    format.

*** Field 7 - Expiration date

    Key or UID/UAT expiration date or empty if it does not expire.

*** Field 8 - Certificate S/N, UID hash, trust signature info

    Used for serial number in crt records.  For UID and UAT records,
    this is a hash of the user ID contents used to represent that
    exact user ID.  For trust signatures, this is the trust depth
    separated by the trust value by a space.

*** Field 9 -  Ownertrust

    This is only used on primary keys.  This is a single letter, but
    be prepared that additional information may follow in future
    versions.  For trust signatures with a regular expression, this is
    the regular expression value, quoted as in field 10.

*** Field 10 - User-ID

    The value is quoted like a C string to avoid control characters
    (the colon is quoted =\x3a=).  For a "pub" record this field is
    not used on --fixed-list-mode.  A UAT record puts the attribute
    subpacket count here, a space, and then the total attribute
    subpacket size.  In gpgsm the issuer name comes here.  A FPR
    record stores the fingerprint here.  The fingerprint of a
    revocation key is stored here.

*** Field 11 - Signature class

    Signature class as per RFC-4880.  This is a 2 digit hexnumber
    followed by either the letter 'x' for an exportable signature or
    the letter 'l' for a local-only signature.  The class byte of an
    revocation key is also given here, by a 2 digit hexnumber and
    optionally followed by the letter 's' for the "sensitive"
    flag.  This field is not used for X.509.

    "rev" and "rvs" may be followed by a comma and a 2 digit hexnumber
    with the revocation reason.

*** Field 12 - Key capabilities

    The defined capabilities are:

    - e :: Encrypt
    - s :: Sign
    - c :: Certify
    - a :: Authentication
    - ? :: Unknown capability

    A key may have any combination of them in any order.  In addition
    to these letters, the primary key has uppercase versions of the
    letters to denote the _usable_ capabilities of the entire key, and
    a potential letter 'D' to indicate a disabled key.

*** Field 13 - Issuer certificate fingerprint or other info

    Used in FPR records for S/MIME keys to store the fingerprint of
    the issuer certificate.  This is useful to build the certificate
    path based on certificates stored in the local key database it is
    only filled if the issuer certificate is available. The root has
    been reached if this is the same string as the fingerprint. The
    advantage of using this value is that it is guaranteed to have
    been built by the same lookup algorithm as gpgsm uses.

    For "uid" records this field lists the preferences in the same way
    gpg's --edit-key menu does.

    For "sig", "rev" and "rvs" records, this is the fingerprint of the
    key that issued the signature.  Note that this may only be filled
    if the signature verified correctly.  Note also that for various
    technical reasons, this fingerprint is only available if
    --no-sig-cache is used.  Since 2.2.7 this field will also be set
    if the key is missing but the signature carries an issuer
    fingerprint as meta data.

*** Field 14 - Flag field

    Flag field used in the --edit menu output

*** Field 15 - S/N of a token

    Used in sec/ssb to print the serial number of a token (internal
    protect mode 1002) or a '#' if that key is a simple stub (internal
    protect mode 1001).  If the option --with-secret is used and a
    secret key is available for the public key, a '+' indicates this.

*** Field 16 - Hash algorithm

    For sig records, this is the used hash algorithm.  For example:
    2 = SHA-1, 8 = SHA-256.

*** Field 17 - Curve name

    For pub, sub, sec, and ssb records this field is used for the ECC
    curve name.

*** Field 18 - Compliance flags

    Space separated list of asserted compliance modes and
    screening result for this key.

    Valid values are:

    - 8  :: The key is compliant with RFC4880bis
    - 23 :: The key is compliant with compliance mode "de-vs".
    - 6001 :: Screening hit on the ROCA vulnerability.

*** Field 19 - Last update

    The timestamp of the last update of a key or user ID.  The update
    time of a key is defined a lookup of the key via its unique
    identifier (fingerprint); the field is empty if not known.  The
    update time of a user ID is defined by a lookup of the key using a
    trusted mapping from mail address to key.

*** Field 20 - Origin

    The origin of the key or the user ID.  This is an integer
    optionally followed by a space and an URL.  This goes along with
    the previous field.  The URL is quoted in C style.

*** Field 21 - Comment

    This is currently only used in "rev" and "rvs" records to carry
    the the comment field of the recocation reason.  The value is
    quoted in C style.
```

## Batching Key Generation

You can use a batch file to automate the generation of a large number of keys. Here is an example batch file.

```sh
Key-Type: RSA
Key-Length: 4096
Key-Usage: cert

Creation-Date: 20200101T000000
Expire-Date: 0

Name-Email: austintraver@users.noreply.github.com
Name-Real: Austin Traver

# Subkey-Type: RSA
# Subkey-Length: 4096
# Subkey-Usage: sign

# Don't require a password
%no-protection

%commit
```
