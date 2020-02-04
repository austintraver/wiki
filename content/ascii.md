+++
title = "ASCII"
description = "127 characters we can all agree upon"
date = 2020-02-04T14:52:26-08:00
image = "ascii.png"
+++

# ASCII

Each character in the ASCII table can be represented in 7 bits. For example, the null terminator is represented as `000 0000`

The leftmost 8th bit is reserved for Unicode, which will label it as a `0` if the character is within the ASCII table

ASCII reserves the first 32 characters (0-31) as *control characters*, which are characters not intended to represent printable information.

Control characters refer to things a computer must process, such as an alert, a tab, or a null terminator. All of the control characters begin with `000`. For instance, a horizontal tab is represented as `000 1001`

## Printing characters by their hex index

```sh
# Enable interpretation of backslash escapes, disable implicit trailing newline
echo -en 'Hexademical number 0x41 is the letter \x41\n'
# => Hexademical number 0x41 is the letter A
```

## ANSI Color Codes

ANSI Color Codes are used to format output on terminals, as well as in many coding languages, such as `java`. An ANSI color code can be expressed by typing the escape character `0x1b` followed by `[` then the code number (e.g. `42`) and then the letter `m`. When you put that all together, it looks like `\x1b[42m`.The formatting will persist until the reset code is given, which is code #0. You can specify this with `\x1b[0m`

* It's worth noting special attention to the escape character, which is decimal number `27` or hex value `0x1b` because it's often typed. For instance, try entering this command in your terminal. It will print a green background.

```sh
echo -en '\x1b[42m Green \x1b[0m\n'
```

Here are some of the most useful codes:

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
| `\x1b[40m` | black background |
| `\x1b[41m` | red background |
| `\x1b[42m` | green background |
| `\x1b[43m` | yellow background |
| `\x1b[44m` | blue background |
| `\x1b[45m` | magenta background |
| `\x1b[46m` | cyan background |
| `\x1b[47m` | white background |
| `\x1b[48;5;<0-255>` | select 256-color background |
| `\x1b[49m` | default background |

## Unicode

### UTF

Unicode Transformation Format (UTF) is one of the mapping methods engineered to encode text. It does this by mapping code points to code values. Each code value is a unique sequence of bytes.

### UTF-16

The UTF-16 encoding system, is not as simple as it's name suggests. Each char is not encoded with 16 bits, as is commonly assumed. UTF-16 is a *variable-width* encoding format.

Java's `char` object is encoded using UTF-16 and so are Windows filenames, as well as the C++ RESTful API SDK written my Microsoft.

It's rarely advantageous to use UTF-16 over UTF-8. The only time it will result in a smaller file size is if the majority of text in the file consists of Chinese or Japanese characters. Even so, if there is a large amount of whitespace (which is an ASCII character) then the UTF-8 encoding would still result in a smaller file size.

### UTF-32

UTF-32, unlike its brothers, is a *fixed-width* encoding format. Every character is guaranteed to be represented by exactly 4 bytes. UTF-32 is rarely used. Requiring every character to be represented with 4 bytes results in a significant increase in file size. It is slightly faster to read than UTF-8 but the difference is barely measurable.

Lastly, UTF-32 is problematic because it results in encoding many 8-bit strings of `0`'s. Traditional software interprets this as the null terminator, which signals the end of the string, which would truncate the remaining information previously encoded by UTF-32.


### Multi-byte Encodings

Multi-byte encodings are non-ASCII. These use 2 bytes to encode a character set of up to 2<sup>16</sup> = 64,536 unique values.

Let's say you want to make a text document look less...plain. Multi-byte encodings can help you out. If you're using `vim` to write your text (as all programmers should :grin: ), you can use Vim's digraphs to help you out. If you're not sure how to Vim, head over to [this page](./vim.md).

Vim uses digraphs to encode non-ASCII characters with simple two key combos.

For example, let's say you want to add a check mark for a to-do list:

```
Cameron's To Do List:

- Hack Austin Traver's computer (Done)
- Buy a MacBook (IMPORTANT!)
```
If you type `<C-k>OK` in vim, you'll get a check mark: ✓

```
Cameron's To Do List:

✓ Hack Austin Traver's computer
★★ Buy a MacBook
```

The command syntax uses:
`\<C-k>{vim digraph}`.

You can see all multibyte characters if you type `:digraph`. Here are some useful digraphs:

### Symbols

| decimal | hex | digraph | char |
|:----:|:----:|:----:|:----:|
| 2605 | 0x09733 | \*2 | ★ |
| 2606 | 0x09734 | \*1 | ☆ |
| 2713 | 0x10003 | OK | ✓ |
| 2717 | 0x10007 | XX | ✗ |

### Some Greek Letters

| decimal | hex | digraph | char |
|:----:|:----:|:----:|:----:|
| 0916 | 0x0394 | D\* | Δ |
| 0920 | 0x0398 | H\* | Θ |
| 0928 | 0x03A0 | P\* | Π |
| 0931 | 0x03A3 | S\* | Σ |
| 0934 | 0x03A6 | F\* | Φ |
| 0937 | 0x03A9 | W\* | Ω |
| 0946 | 0x03B2 | b\* | β |
| 0952 | 0x03B8 | h\* | θ |
| 0955 | 0x03BB | l\* | λ |
| 0956 | 0x03BC | m\* | μ |
| 0960 | 0x03C0 | p\* | π |



### Some Math Symbols

| decimal | hex  | digraph | char |
|:----:|:----:|:----:|:----:|
| 8704 | 0x2200 | FA | ∀ |
| 8706 | 0x2202 | dP | ∂ |
| 8707 | 0x2203 | TE | ∃ |
| 8709 | 0x2205 | /0 | ∅ |
| 8710 | 0x2206 | DE | ∆ |
| 8711 | 0x2207 | NB | ∇ |
| 8712 | 0x2208 | (- | ∈ |
| 8719 | 0x220F | \* P |∏ |
| 8721 | 0x2211 | +Z | ∑ |
| 8730 | 0x221A | RT | √ |
| 8734 | 0x221E | 00 | ∞ |
| 8743 | 0x2227 | AN | ∧ |
| 8744 | 0x2228 | OR | ∨ |
| 8756 | 0x2234 | .: | ∴ |
| 8757 | 0x2235 | :. | ∵ |
| 8780 | 0x224C | =? | ≌ |
| 8801 | 0x2261 | =3 | ≡ |
| 8804 | 0x2264 | =< | ≤ |
| 8805 | 0x2265 | >= | ≥ |
| 8968 | 0x2308 | <7 | ⌈ |
| 8969 | 0x2309 | >7 | ⌉ |
| 8970 | 0x230A | 7< | ⌊ |
| 8971 | 0x230B | 7> | ⌋ |


### A Few Fractions

| decimal | hex  | digraph | char |
|:----:|:----:|:----:|:----:|
| 2153| 0x8531  | 12 | ½ |
| 2153| 0x8531  | 13 | ⅓ |
| 2155| 0x8533  | 15 | ⅕ |
| 2158| 0x8536  | 45 | ⅘ |
| 2159| 0x8537  | 16 | ⅙ |

Now you can write such atrocities as:

```
1. ⌊π⌋= 3 ∴ π ≡ 3

   ∞
2. ∑ n = -(⅙ ×½)
```
