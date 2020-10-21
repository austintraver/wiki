---
title: "Awk"
description: "The tabular stream editor"
date: 2020-10-04T14:52:26-08:00
draft: true
---

# awk

* Separate input fields by a colon, return the output separated by space,
  and save it into an array

  ```sh
  gpg -k --with-colons \
    | grep '^...:e' \
    | awk -F ':' '{ print $5 }' \
    | awk -v ORS=' ' 'NF' \
    | read -A array

  gpg --delete-keys ${array}
  ```

