---
title: "ASCII"
description: "127 characters we can all agree upon"
date: 2019-08-28T14:52:26-08:00
draft: false
---

# ASCII

---

![ASCII Table](table.webp)

---

Each character in the ASCII table can be represented in 7 bits. For example, the null terminator is represented as `000 0000`

The leftmost 8th bit is reserved for Unicode, which will label it as a `0` if the character is within the ASCII table

ASCII reserves the first 32 characters (0-31) as *control characters*, which are characters not intended to represent printable information.

Control characters refer to things a computer must process, such as an alert, a tab, or a null terminator. All of the control characters begin with `000`. For instance, a horizontal tab is represented as `000 1001`

## The Racket with Brackets

After diving down a Wikipedia rabbit hole, I finally figured out what to call all of the punctuation used when coding. **Brace yourselves** (ha.)

Although by default, "bracket" refers to `[these]` brackets, every type of bracket has a name, and a descriptor, as shown
in the table below:

| Spoken Name | Technical Name | Character |
| :---: | :---: | :---: |
| Bracket | Square bracket | `[` `]` |
| Brace | Curly bracket | `{` `}` |
| Parenthesis | Round bracket | `(` `)` |
| Chevron | Angle bracket | `<` `>` |

## Modifier Keys

### The precedence of modifier keys

* In Apple's list of [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/macos/user-interaction/keyboard/#defining-keyboard-shortcuts) they specify the order of modifier key symbols should adhere to the following precedence

1. ⌃
1. ⌥
1. ⇧
1. ⌘
1. fn

## SGR Color Codes

## Select Graphic Rendition (SGR)

SGR Color Codes are used to format output on terminals, as well as in many coding languages, such as `java`. An SGR color code can be expressed by typing the escape character `0x1b` followed by `[` then the code number (e.g. `42`) and then the letter `m`. When you put that all together, it looks like `\x1b[42m`.The formatting will persist until the reset code is given, which is code #0. You can specify this with `\x1b[0m`

* It's worth noting special attention to the escape character, which is decimal number `27` or hex value `0x1b` because it's often typed. For instance, try entering this command in your terminal. It will print a green background.

```sh
echo -e -n '\x1b[42m Green \x1b[0m\n'
```

Here are some of the most useful codes:

### Font Style

|Escape Code|Function|
|:---:|:---:|
|`\x1b[0m` | reset all fonts, formats, colors, etc.  |
| `\x1b[1m` | enable bold font |
| `\x1b[2m` | enable faded font |
| `\x1b[3m` | enable italic font |
| `\x1b[4m` | enable underlined font |
| `\x1b[5m` | enable blinking font |
| `\x1b[7m` | enable inverted-font |
| `\x1b[22m` | disable bold font |
| `\x1b[23m` | disable italic font |
| `\x1b[24m` | disable underlined font |
| `\x1b[25m` | disable blinking font |
| `\x1b[27m` | disable inverted-font |


### Foreground Color

|Escape Code|Function|
|:---:|:---:|
| `\x1b[30m` | black foreground |
| `\x1b[31m` | red foreground |
| `\x1b[32m` | green foreground |
| `\x1b[33m` | yellow foreground |
| `\x1b[34m` | blue foreground |
| `\x1b[35m` | magenta foreground |
| `\x1b[36m` | cyan foreground |
| `\x1b[37m` | white foreground |
| `\x1b[38;5;<0-255>` | select 256-color foreground |
| `\x1b[39m` | default foreground |


### Background Color

|Escape Code|Function|
|:---:|:---:|
| `\E[40m` | black background |
| `\E[41m` | red background |
| `\E[42m` | green background |
| `\E[43m` | yellow background |
| `\E[44m` | blue background |
| `\E[45m` | magenta background |
| `\E[46m` | cyan background |
| `\E[47m` | white background |
| `\E[48;5;<0-255>` | select 256-color background |
| `\E[49m` | default background |


### Cursor/Screen Color

|Escape Code|Function|
|:---:|:---:|
| `\Ec`| Reset screen to initial state |

#### Modifying Content

|Escape Code|Function|
|:---:|:---:|
| `\E[J` / `\E[0J` | Clear from cursor to end of screen |
| `\E[1J` | Clear from cursor to beginning of stream |
| `\E[2J` | Clear entire screen |
| `\E[3J` | Clear entire screen and delete all lines saved in the scrollback buffer |
| `\E[K` / `\E[0K` | Erase from cursor to end of line |
| `\E[1K` | Erase start-of-line up until the cursor |
| `\E[2K` | Erase the entire line |
| `\E[2X` | Erase 2 characters (replaced with whitespace) |
| `\E[2P` | Delete 2 characters (left-shift the text that follows) |
| `\E[2M` | Delete 2 lines |
| `\E[2@` | Insert 2 spaces (right-shift the text that follows) |
| `\E[2L` | Insert 2 lines (right-shift the text that follows) |


#### Modify Screen

|Escape Code|Function|
|:---:|:---:|
| `\E[2S` | Scroll up 2 lines |
| `\E[2T` | Scroll down 2 lines |


#### Cursor Movement

|Escape Code|Function|
|:---:|:---:|
| `\E[2A`| Shift cursor up by 2 rows |
| `\E[2B`| Shift cursor down 2 rows |
| `\E[2C`| Shift cursor right 2 columns |
| `\E[2D`| Shift cursor left 2 columns |
| `\E[2E`| Shift cursor to the 1st column, 2 rows below |
| `\E[2F`| Shift cursor to the 1st column, 2 rows above |
| `\E[2G`| Move cursor to column 2 (current row) |
| `\E[2d` | Move cursor to row 2 (current column) |
| `\E[i;jH` | Move cursor to row `i`, column `j` |

#### Misc.

|Escape Code|Function|
|:---:|:---:|
| `\E[nb`| Repeat previous character `n` times |
| `\E7` | Save cursor position |
| `\E8` | Restore cursor position |


* Repeat the last character 2 times

    ```sh
    print -N '1234567890' '\E[2b'
    ```

    <pre><samp>
    123456789000
    </samp></pre>

* Replace a character

    ```sh
    print -N {9..1} '\E[3D' '_' '\E[2C'
    ```

    <pre><samp>
    1_3456789
    </samp></pre>


* Total black magic since I forgot what the instruction set was

    ```sh
    print -N '#####' $'\E7\E[2G1\E82'
    ```

    <pre><samp>
    #1###2
    </samp></pre>

* Go to the 2nd row, add a 1, return, add a 2

    ```sh
    print -N '#####' '\E7' '\E[2G' '1' '\E8' '2'
    ```

    <pre><samp>
    #1###2
    </samp></pre>

* Go back 2 columns, up 1 row, add a '0', return

    ```sh
    print -N '####\n####' '\E7' '\E[2D' '\E[1A' '0' '\E8'
    ```

* Go back 3 columns, and erase 2 characters

    ```sh
    print -N 'hello' '\E[3D' '\E[2X'
    ```
    <pre><samp>
    he o
    </samp></pre>

* Go back three columns, and remove two characters

    ```sh
    print -N 'hello '\E[3D '\E[2P'
    ```

    <pre><samp>
    heo
    </samp></pre>

* Replace the '+' in the 1st column, 2nd-to-last row with '-'

    ```sh
    print -N +{5..1}$'\n' '\E7' '\E[2A' '-' '\E8'
    ```

    <pre><samp>
    +5
    +4
    +3
    -2
    +1
    </samp></pre>

* Add two blank lines

    ```sh
    print -N +{5..1}$'\n' '\E[3A' '\E[2L' '\E[2B' '\E[3B'
    ```

   <pre><samp>
    +5
    +4


    +3
    +2
    +1
    </samp></pre>

{{% aside warning %}}
**Warning:** If you're moving around vertically, be sure to surround your statement with `\E7` and `\E8` or else you'll likely truncate your output. Any text located beyond the cursor's final position *will be deleted*
{{% /aside %}}

{{% aside warning %}}
**Warning:** If you're adding space vertically, be sure to move your cursor down by the same amount of rows when you've finished inserting. If you don't, your output will be truncated.
{{% /aside %}}


* The program I wrote for practice, `globetrot`:

    ```sh
    for row in {2..${LINES}}; do
      # Print a row of '#' characters
      print -f '#'%.s {1..${COLUMNS}}
      # Erase the left-most and right-most characters
      #     (save) (left 1) (erase 1) (col 1) (erase 1) (return)
      print -N '\E7' '\E[1D' '\E[X' '\E[1G' '\E[1X' '\E8' '\n'
    done
    # Erase all characters on the first row
    print -N '\E7' '\E[1d' '\E[2K' '\E8'
    # Erase all characters on the last row
    print -N '\E[1A' '\E[2K' '\E[1B'
  
    typeset -i i
    typeset -i j
  
    # Walk the '@' symbol across the first row [left -> right]
    for (( j=1; j <= ${COLUMNS}; j+=1 )); do
      print -N '\E7' "\E[1;${j}H" '\E[2K' '@' '\E8'
      sleep 0.01
    done
  
    # Anchor the symbol to the last column
    ((j=${COLUMNS}))
  
    # Walk the '@' symbol along the last column [top -> bottom]
    for (( i=2; i < ${LINES}; i+=1 )); do
      # Erase the previous '@'
      print -N '\E7' "\E[$((i-1));${j}H" '\E[X' '\E8'
      # Create the next '@'
      print -N '\E7' "\E[${i};${j}H" '@' '\E8'
      sleep 0.01
    done
  
    ((i=${LINES}-1))
  
    # Walk the '@' symbol along the last row, [right -> left]
    for (( j=${COLUMNS}-1; j>=0; j-=1 )); do
      # Erase the previous '@'
      print -N '\E7' "\E[${i};$((j+1));H" '\E[X' '\E8'
      # Create the next '@'
      print -N '\E7' "\E[${i};${j}H" '@' '\E8'
      sleep 0.01;
    done
  
    # Anchor the symbol to the first column
    ((j=1))
  
    # Walk the '@' symbol along the first column [bottom -> top]
    for (( i=${LINES}-2; i >= 0; i-=1 )); do
      # Erase the previous '@'
      print -N '\E7' "\E[$((i+1));${j}H" '\E[X' '\E8'
      # Create the next '@'
      print -N '\E7' "\E[${i};${j}H" '@' '\E8'
      sleep 0.01
    done
    ```


## Unicode

### Unicode Transformation Format (UTF)

Unicode Transformation Format (UTF) is one of the mapping methods engineered to encode text. It does this by mapping code points to code values. Each code value is a unique sequence of bytes.

### UTF-16

The UTF-16 encoding system, is not as simple as it's name suggests. Each char is not encoded with 16 bits, as is commonly assumed. UTF-16 is a *variable-width* encoding format.

Java's `char` object is encoded using UTF-16 and so are Windows filenames, as well as the C++ RESTful API SDK written my Microsoft, as well as the macOS operating system.

It's rarely advantageous to use UTF-16 over UTF-8. The only time it will result in a smaller file size is if the majority of text in the file consists of Chinese or Japanese characters. Even so, if there is a large amount of whitespace (which is an ASCII character) then the UTF-8 encoding would still result in a smaller file size. The standard norm is increasingly becoming UTF-8, and the trend shows no sign of slowing down.

### UTF-32

UTF-32, unlike its brothers, is a *fixed-width* encoding format. Every character is guaranteed to be represented by exactly 4 bytes. UTF-32 is rarely used. Requiring every character to be represented with 4 bytes results in a significant increase in file size. It is slightly faster to read than UTF-8 but the difference is barely measurable.

Lastly, UTF-32 is problematic because it results in encoding many 8-bit strings of `0`'s. Traditional software interprets this as the null terminator, which signals the end of the string, which would truncate the remaining information previously encoded by UTF-32.
