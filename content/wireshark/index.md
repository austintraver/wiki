---
title: Wireshark
description: "Your best-bud for network forensics"
date: 2020-02-04T14:52:27-08:00
---

# Wireshark

Scan for multicast DNS `.local` domains on your local network

```shell
tshark -n -T fields -e dns.qry.name -Y "udp.srcport eq 5353"
```
