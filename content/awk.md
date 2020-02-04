+++
title = "Awk"
description = "The tabular stream editor"
date = 2020-02-04T07:28:40-08:00
image = "awk.jpg"
+++

# awk

* Seperate input fields by colon, return output separated by space, save into an array

```sh
gpg -k --with-colons \
	| grep '^...:e' \
	| awk -F ':' '{ print $5 }' \
	| awk -v ORS=' ' 'NF' \
	| read -A array

gpg --delete-keys ${array}
```
