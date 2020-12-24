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

Each character in the ASCII table can be represented in 7 bits. For example, the null terminator is represented as `000
0000`

The leftmost 8th bit is reserved for Unicode, which will label it as a `0` if the character is within the ASCII table

ASCII reserves the first 32 characters (0-31) as *control characters*, which are characters not intended to represent
printable information.

Control characters refer to things a computer must process, such as an alert, a tab, or a null terminator. All of the
control characters begin with `000`. For instance, a horizontal tab is represented as `000 1001`

## The Racket with Brackets

After diving down a Wikipedia rabbit hole, I finally figured out what to call all of the punctuation used when coding.
**Brace yourselves** (ha.)

Although by default, "bracket" refers to `[these]` brackets, every type of bracket has a name, and a descriptor, as
shown in the table below:

| Spoken Name | Technical Name | Character |
|:-----------:|:--------------:|:---------:|
|   Bracket   | Square bracket |  `[` `]`  |
|    Brace    | Curly bracket  |  `{` `}`  |
| Parenthesis | Round bracket  |  `(` `)`  |
|   Chevron   | Angle bracket  |  `<` `>`  |

## Modifier Keys

### The precedence of modifier keys

* In Apple's list of
    [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/macos/user-interaction/keyboard/#defining-keyboard-shortcuts)
    they specify the order of modifier key symbols should adhere to the following precedence

1. ⌃

1. ⌥

1. ⇧

1. ⌘

1. fn

## ANSI Colors

ANSI escape codes are a standard for in-band signaling to control the cursor location, color, and other options on text
terminals. The ANSI x3.64 standard was released in 1979 and later updated by the 5th edition ECMA-48 standard in 1991,
ISO/IEC 6429 in 1992, and ISO-8613-3 in 1995. ANSI escape codes are started using \\e\[ and contain numeric codes
separated by semicolons. The escape code is terminated with an 'm'. **ANSI Color Codes**.

### ANSI Color Escape Sequences

| **Code**                       | **Effect** | **Note**                                   |
|:-------------------------------|:-----------|:-------------------------------------------|
| `\x1b[`                        | CSI        | Control Sequence Indicator                 |
| CSI *n* m                      | ANSICOLOR  | ANSI color code (Select Graphic Rendition) |
| CSI 38 ; 5 ; *n* m             | 256COLOR   | Foreground 8-bit 256 color code            |
| CSI 48 ; 5 ; *n* m             | 256COLOR   | Background 8-bit 256 color code            |
| CSI 38 ; 2 ; *r* ; *g* ; *b* m | TRUECOLOR  | Foreground 24-bit RGB color code           |
| CSI 48 ; 2 ; *r* ; *g* ; *b* m | TRUECOLOR  | Background 24-bit RGB color code           |

### The 16 ANSI Colors

<table>
<thead>
  <tr>
    <th style="text-align:left;">Color</th>
    <th style="text-align:left;">Code</th>
    <th style="text-align:left;">Hex Value</th>
    <th style="text-align:center;">Code</th>
    <th style="text-align:left;">Hex Value</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style="text-align:left;">Black</td>
    <td style="text-align:left;">0</td>
    <td style="background-color: #000000; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #000000</code>
    </td>
    <td style="text-align:center;">8</td>
    <td style="background-color: #555555; text-align:center;" >
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #555555</code>
    </td>
  </tr>
  <tr>
    <td style="text-align:left;">Red</td>
    <td style="text-align:left;">1</td>
    <td style="background-color: #aa0000; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #aa0000</code>
    </td>
    <td style="text-align:center;">9</td>
    <td style="background-color: #ff5555; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #ff5555</code>
    </td>
  </tr>
  <tr>
    <td style="text-align:left;">Green</td>
    <td style="text-align:left;">2</td>
    <td style="background-color: #00aa00; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #00aa00</code>
    </td>
    <td style="text-align:center;">10</td>
    <td style="background-color: #55ff55; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #55ff55</code>
    </td>
  </tr>
  <tr>
    <td style="text-align:left;">Yellow</td>
    <td style="text-align:left;">3</td>
    <td style="background-color: #aaaa00; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #aaaa00</code>
    </td>
    <td style="text-align:center;">11</td>
    <td style="background-color: #ffff55; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #ffff55</code>
    </td>
  </tr>
  <tr>
    <td style="text-align:left;">Blue</td>
    <td style="text-align:left;">4</td>
    <td style="background-color: #0000aa; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #0000aa</code>
    </td>
    <td style="text-align:center;">12</td>
    <td style="background-color: #5555ff; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #5555ff</code>
    </td>
  </tr>
  <tr>
    <td style="text-align:left;">Magenta</td>
    <td style="text-align:left;">5</td>
    <td style="background-color: #aa00aa; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #aa00aa</code>
    </td>
    <td style="text-align:center;">13</td>
    <td style="background-color: #ff55ff; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #ff55ff</code>
    </td>
  </tr>
  <tr>
    <td style="text-align:left;">Cyan</td>
    <td style="text-align:left;">6</td>
    <td style="background-color: #00aaaa; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #00aaaa</code>
    </td>
    <td style="text-align:center;">14</td>
    <td style="background-color: #55ffff; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #55ffff</code>
    </td>
  </tr>
  <tr>
    <td style="text-align:left;">White</td>
    <td style="text-align:left;">7</td>
    <td style="background-color: #aaaaaa; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #ffffff;"> #aaaaaa</code>
    </td>
    <td style="text-align:center;">15</td>
    <td style="background-color: #ffffff; text-align: center;">
      <code style="padding: unset; background-color: unset; color: #000000;"> #ffffff</code>
    </td>
  </tr>
</tbody>
</table>

  </tbody>
</table>

<br />

## The xterm 256 colors

In 1999, Thomas Dickey, an xterm maintainer, using a patch created by Todd Larason to add support for 256 colors. These
colors form a compatible extension to the OG 16 ANSI colors and has been adopted by most terminal emulators, including
the macOS Terminal application, which runs on `xterm`, as well as MUD clients.

To send a 256 color foreground color one must print `\e[38;5;{{< var COLOR >}}m` where {{< var COLOR >}} is a number
between 0 and 255.

For background colors, it's pretty much the same, but the escape sequence starts with `48`, instead of `38`. Therefore,
one must print `\e[48;5;{{< var COLOR >}}m` where {{< var COLOR >}} is a number between 0 and 255.

<table>
  <tbody>
  <tr>
    <td><b>Name</b></td>
    <td><b>Code</b></td>
    <td><b>Dim</b></td>
    <td><b>Code</b></td>
    <td><b>Bold</b></td>
  </tr>
  <tr>
    <td>Azure</td>
    <td>025</td>
    <td style="background-color: #0066BB; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">0066bb</code></td>
    <td>033</td>
    <td style="background-color: #0088FF; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">0088ff</code></td>
  </tr>
  <tr>
    <td>Blue</td>
    <td>019</td>
    <td style="background-color: #0000BB; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">0000bb</code></td>
    <td>021</td>
    <td style="background-color: #0000FF; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">0000ff</code></td>
  </tr>
  <tr>
    <td>Cyan</td>
    <td>037</td>
    <td style="background-color: #00BBBB; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">00bbbb</code></td>
    <td>051</td>
    <td style="background-color: #00FFFF; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">00ffff</code></td>
  </tr>
  <tr>
    <td>Ebony</td>
    <td>016</td>
    <td style="background-color: #000000; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">000000</code></td>
    <td>059</td>
    <td style="background-color: #666666; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">666666</code></td>
  </tr>
  <tr>
    <td>Green</td>
    <td>034</td>
    <td style="background-color: #00BB00; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">00bb00</code></td>
    <td>046</td>
    <td style="background-color: #00FF00; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">00ff00</code></td>
  </tr>
  <tr>
    <td>Jade</td>
    <td>035</td>
    <td style="background-color: #00BB66; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">00bb66</code></td>
    <td>048</td>
    <td style="background-color: #00FF88; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">00ff88</code></td>
  </tr>
  <tr>
    <td>Lime</td>
    <td>070</td>
    <td style="background-color: #66BB00; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">66bb00</code></td>
    <td>118</td>
    <td style="background-color: #88FF00; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">88ff00</code></td>
  </tr>
  <tr>
    <td>Magenta</td>
    <td>127</td>
    <td style="background-color: #BB00BB; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">bb00bb</code></td>
    <td>201</td>
    <td style="background-color: #FF00FF; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">ff00ff</code></td>
  </tr>
  <tr>
    <td>Orange</td>
    <td>130</td>
    <td style="background-color: #BB6600; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">bb6600</code></td>
    <td>208</td>
    <td style="background-color: #FF8800; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">ff8800</code></td>
  </tr>
  <tr>
    <td>Pink</td>
    <td>125</td>
    <td style="background-color: #BB0066; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">bb0066</code></td>
    <td>198</td>
    <td style="background-color: #FF0088; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">ff0088</code></td>
  </tr>
  <tr>
    <td>Red</td>
    <td>124</td>
    <td style="background-color: #BB0000; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">bb0000</code></td>
    <td>196</td>
    <td style="background-color: #FF0000; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">ff0000</code></td>
  </tr>
  <tr>
    <td>Silver</td>
    <td>102</td>
    <td style="background-color: #888888; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">888888</code></td>
    <td>188</td>
    <td style="background-color: #DDDDDD; color: #000000;">
      <code style="padding: unset; background-color: unset;">dddddd</code></td>
  </tr>
  <tr>
    <td>Tan</td>
    <td>094</td>
    <td style="background-color: #886600; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">886600</code></td>
    <td>178</td>
    <td style="background-color: #DDBB00; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">ddbb00</code></td>
  </tr>
  <tr>
    <td>Violet</td>
    <td>055</td>
    <td style="background-color: #6600BB; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">6600bb</code></td>
    <td>093</td>
    <td style="background-color: #8800FF; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">8800ff</code></td>
  </tr>
  <tr>
    <td>White</td>
    <td>145</td>
    <td style="background-color: #BBBBBB; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">bbbbbb</code></td>
    <td>231</td>
    <td style="background-color: #FFFFFF; color: #000000;">
      <code style="padding: unset; background-color: unset;">ffffff</code></td>
  </tr>
  <tr>
    <td>Yellow</td>
    <td>142</td>
    <td style="background-color: #BBBB00; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">bbbb00</code></td>
    <td>226</td>
    <td style="background-color: #FFFF00; color: #ffffff;">
      <code style="padding: unset; background-color: unset;">ffff00</code></td>
  </tr>
  </tbody>
</table>

## ~~50~~ 24 shades of gray { #sgr-gray }

(Couldn't help it.) To display code 232 through 255 using 24 bit RGB colors the following hexadecimal values are
suggested for the 24 shade grayscale: start out at 8 for the first color and increment the value by 10 for each
increment. \x08, \x12, \x1C, \x26, etc.

## Select Graphic Rendition (SGR)

SGR Color Codes are used to format output on terminals, as well as in many coding languages, such as `java`. An SGR
color code can be expressed by typing the escape character `0x1b` followed by `[` then the code number (e.g. `42`) and
then the letter `m`. When you put that all together, it looks like `\x1b[42m`.The formatting will persist until the
reset code is given, which is code #0. You can specify this with `\x1b[0m`

* It's worth noting special attention to the escape character, which is decimal number `27` or hex value `0x1b` because
    it's often typed. For instance, try entering this command in your terminal. It will print a green background.

```shell script
echo -e -n '\x1b[42m Green \x1b[0m\n'
```

Here are some of the most useful codes:

### Font Style

| Escape Code |                Function                |
|:-----------:|:--------------------------------------:|
|  `\x1b[0m`  | reset all fonts, formats, colors, etc. |
|  `\x1b[1m`  |            enable bold font            |
|  `\x1b[2m`  |           enable faded font            |
|  `\x1b[3m`  |           enable italic font           |
|  `\x1b[4m`  |         enable underlined font         |
|  `\x1b[5m`  |          enable blinking font          |
|  `\x1b[7m`  |          enable inverted-font          |
| `\x1b[22m`  |           disable bold font            |
| `\x1b[23m`  |          disable italic font           |
| `\x1b[24m`  |        disable underlined font         |
| `\x1b[25m`  |         disable blinking font          |
| `\x1b[27m`  |         disable inverted-font          |

### Foreground Color

|      Color       |     Foreground      |     Background      |
|:----------------:|:-------------------:|:-------------------:|
|      black       |     `\x1b[30m`      |     `\x1b[40m`      |
|       red        |     `\x1b[31m`      |     `\x1b[41m`      |
|      green       |     `\x1b[32m`      |     `\x1b[42m`      |
|      yellow      |     `\x1b[33m`      |     `\x1b[43m`      |
|       blue       |     `\x1b[34m`      |     `\x1b[44m`      |
|     magenta      |     `\x1b[35m`      |     `\x1b[45m`      |
|       cyan       |     `\x1b[36m`      |     `\x1b[46m`      |
|      white       |     `\x1b[37m`      |     `\x1b[47m`      |
| select 256-color | `\x1b[38;5;<0-255>` | `\x1b[48;5;<0-255>` |
|     default      |     `\x1b[39m`      |     `\x1b[49m`      |

### The 256 colors of xterm

The first 16 colors have RGB tuples predetermined by ANSI that don't follow the same formula as the others

```shell script
typeset -A rgb256

let index=0
# First two rows, colors [0..15]
for ((row = 0; row <= 1; row += 1)); do
    for ((blue = 0; blue <= 1; blue += 1)); do
        for ((green = 0; green <= 1; green += 1)); do
            for ((red = 0; red <= 1; red += 1)); do

            done
        done
    done
done
# Second row, colors [8..15]
```

predeter

```shell script
XColorTable() {
  i=16
  for ((r = 0; r <= 255; r+=40)); do
    for ((g = 0; g <= 255; g+=40)); do
      for ((b = 0; b <= 255; b+=40)); do
        echo "Color$((i++)) = (${r}, ${g}, ${b})"
        if ((b == 0)); then
            b=55;
        fi
      done
      if ((b == 0)); then
        g=55;
      fi
    done
    if ((r == 0)); then
        r=55;
    fi
  done
  for ((m = 8; m <= 238; m+=10)); do # Do Monochrome
    echo "Color$((i++)) = (${m}, ${m}, ${m})"
  done
}
```

### SGR Cursor Movements

#### Cursor/Screen Color

| Escape Code |           Function            |
|:-----------:|:-----------------------------:|
|    `\Ec`    | Reset screen to initial state |

#### Modifying Content

|   Escape Code    |                                Function                                 |
|:----------------:|:-----------------------------------------------------------------------:|
| `\E[J` / `\E[0J` |                   Clear from cursor to end of screen                    |
|     `\E[1J`      |                Clear from cursor to beginning of stream                 |
|     `\E[2J`      |                           Clear entire screen                           |
|     `\E[3J`      | Clear entire screen and delete all lines saved in the scrollback buffer |
| `\E[K` / `\E[0K` |                    Erase from cursor to end of line                     |
|     `\E[1K`      |                 Erase start-of-line up until the cursor                 |
|     `\E[2K`      |                          Erase the entire line                          |
|     `\E[2X`      |              Erase 2 characters (replaced with whitespace)              |
|     `\E[2P`      |         Delete 2 characters (left-shift the text that follows)          |
|     `\E[2M`      |                             Delete 2 lines                              |
|     `\E[2@`      |           Insert 2 spaces (right-shift the text that follows)           |
|     `\E[2L`      |           Insert 2 lines (right-shift the text that follows)            |

#### Modify Screen

| Escape Code |      Function       |
|:-----------:|:-------------------:|
|   `\E[2S`   |  Scroll up 2 lines  |
|   `\E[2T`   | Scroll down 2 lines |

#### Cursor Movement

| Escape Code |                   Function                   |
|:-----------:|:--------------------------------------------:|
|   `\E[2A`   |          Shift cursor up by 2 rows           |
|   `\E[2B`   |           Shift cursor down 2 rows           |
|   `\E[2C`   |         Shift cursor right 2 columns         |
|   `\E[2D`   |         Shift cursor left 2 columns          |
|   `\E[2E`   | Shift cursor to the 1st column, 2 rows below |
|   `\E[2F`   | Shift cursor to the 1st column, 2 rows above |
|   `\E[2G`   |    Move cursor to column 2 (current row)     |
|   `\E[2d`   |    Move cursor to row 2 (current column)     |
|  `\E[i;jH`  |      Move cursor to row `i`, column `j`      |

#### Misc.

| Escape Code |              Function               |
|:-----------:|:-----------------------------------:|
|   `\E[nb`   | Repeat previous character `n` times |
|    `\E7`    |        Save cursor position         |
|    `\E8`    |       Restore cursor position       |

* Repeat the last character 2 times

    ```shell script
    print -N '1234567890' '\E[2b'
    ```

    {{% samp %}}

    123456789000

{{% /samp %}}

* Replace a character

    ```shell script
    print -N {9..1} '\E[3D' '_' '\E[2C'
    ```

    {{% samp %}}

    1_3456789

{{% /samp %}}

* Total black magic since I forgot what the instruction set was

    ```shell script
    print -N '#####' $'\E7\E[2G1\E82'
    ```

    {{% samp %}}

    #1###2

{{% /samp %}}

* Go to the 2nd row, add a 1, return, add a 2

    ```shell script
    print -N '#####' '\E7' '\E[2G' '1' '\E8' '2'
    ```

    {{% samp %}}

    #1###2

{{% /samp %}}

* Go back 2 columns, up 1 row, add a '0', return

    ```shell script
    print -N '####\n####' '\E7' '\E[2D' '\E[1A' '0' '\E8'
    ```

* Go back 3 columns, and erase 2 characters

    ```shell script
    print -N 'hello' '\E[3D' '\E[2X'
    ```

    {{% samp %}}

    he o

{{% /samp %}}

* Go back three columns, and remove two characters

    ```shell script
    print -N 'hello '\E[3D '\E[2P'
    ```

    {{% samp %}}

    heo

{{% /samp %}}

* Replace the '+' in the 1st column, 2nd-to-last row with '-'

    ```shell script
    print -N +{5..1}$'\n' '\E7' '\E[2A' '-' '\E8'
    ```

    {{% samp %}}

    +5
    +4
    +3
    -2
    +1

{{% /samp %}}

* Add two blank lines

    ```shell script
    print -N +{5..1}$'\n' '\E[3A' '\E[2L' '\E[2B' '\E[3B'
    ```

    {{% samp %}}

    +5
    +4


    +3
    +2
    +1

{{% /samp %}}

{{% aside warning %}}

**Warning:** If you're moving around vertically, be sure to surround your statement with `\E7` and `\E8` or else you'll
likely truncate your output. Any text located beyond the cursor's final position *will be deleted*

{{% /aside %}}

{{% aside warning %}}

**Warning:** If you're adding space vertically, be sure to move your cursor down by the same amount of rows when you've
finished inserting. If you don't, your output will be truncated.

{{% /aside %}}

* The program I wrote for practice, `globetrot`:

    ```shell script
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

Unicode Transformation Format (UTF) is one of the mapping methods engineered to encode text. It does this by mapping
code points to code values. Each code value is a unique sequence of bytes.

### UTF-16

The UTF-16 encoding system, is not as simple as it's name suggests. Each char is
not encoded with 16 bits, as is commonly assumed. UTF-16 is a *variable-width*
encoding format.

Java's `char` object is encoded using UTF-16 and so are Windows filenames, as
well as the C++ RESTful API SDK written my Microsoft, as well as the macOS
operating system.

It's rarely advantageous to use UTF-16 over UTF-8. The only time it will result
in a smaller file size is if the majority of text in the file consists of
Chinese or Japanese characters. Even so, if there is a large amount of
whitespace (which is an ASCII character) then the UTF-8 encoding would still
result in a smaller file size. The standard norm is increasingly becoming UTF-8,
and the trend shows no sign of slowing down.

### UTF-32

UTF-32, unlike its brothers, is a *fixed-width* encoding format. Every character
is guaranteed to be represented by exactly 4 bytes. UTF-32 is rarely used.
Requiring every character to be represented with 4 bytes results in a
significant increase in file size. It is slightly faster to read than UTF-8 but
the difference is barely measurable.

Lastly, UTF-32 is problematic because it results in encoding many 8-bit strings
of `0`'s. Traditional software interprets this as the null terminator, which
signals the end of the string, which would truncate the remaining information
previously encoded by UTF-32.

