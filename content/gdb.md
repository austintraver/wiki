+++
title = "GDB"
description = "The GNU C/C++ debugger"
date = 2020-01-30T20:14:57-08:00
image = "gdb.jpg"
+++

# GDB

## Getting Started

### macOS

0. Install GDB using Homebrew

  ```sh
  brew install gdb
  ```

1. Paste the contents of this file into `gdb.xml` on your machine

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
        <key>com.apple.security.cs.allow-jit</key>
        <true/>
        <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
        <true/>
        <key>com.apple.security.cs.allow-dyld-environment-variables</key>
        <true/>
        <key>com.apple.security.cs.disable-library-validation</key>
        <true/>
        <key>com.apple.security.cs.disable-executable-page-protection</key>
        <true/>
        <key>com.apple.security.cs.debugger</key>
        <true/>
        <key>com.apple.security.get-task-allow</key>
        <true/>
    </dict>
  </plist>
  ```

2. Generate a codesign certificate titled `gdb` in the Keychain application

3. Run the following script:

  ```sh
  codesign --entitlements ./gdb.xml -fs 'gdb' =gdb
  ```
