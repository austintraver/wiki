---
title: Perl
description: "The scripting language your old colleague left you stuck with debugging"
date: 2020-02-04T14:52:27-08:00
draft: true
---

# Perl

```perl
#!/usr/bin/perl

# This is a comment

print "Hello world\n";
```

## here-doc

```perl
$a = 10;
$var = <<"EOF";
This is the syntax for here document and it will continue
until it encounters a EOF in the first line.
This is case of double quote so variable value will be
interpolated. For example value of a = $a
EOF
print "$var\n";

$var = <<'EOF';
This is case of single quote so variable value will be
interpolated. For example value of a = $a
EOF
print "$var\n";
```

## Identifiers

A Perl identifier is a name used to identify a variable, function, class, module, or other object.

A Perl variable name starts with either `$`, `@` or `%` followed by `[0-9a-z_]+`
