+++
title = "Wireshark"
description = "Your best-bud for network forensics"
date = 2020-01-30T20:14:57-08:00
image = "wireshark.jpg"
+++

# Wireshark

Scan for multicast DNS `.local` domains on your local network

```sh
tshark -n -T fields -e dns.qry.name -Y "udp.srcport eq 5353"
```