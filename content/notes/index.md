---
title: "Notes"
description: "This is descriptive"
draft: true
date: 2020-10-29
---

# OSA Scripting

[JavaScript for Automation cookbook](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki)

[JSX in Node.js](https://www.npmjs.com/package/jxa)

[About Mac Scripting](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/index.html#//apple_ref/doc/uid/TP40016239-CH56-SW1)

[Using the Systemwide Script Menu](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/UsetheSystem-WideScriptMenu.html)

[Debugging with Safari](https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-11.html#//apple_ref/doc/uid/TP40014508-CH110-SW1)

[JXA Notes on a blog](http://www.galvanist.com/posts/2020-03-28-jxa_notes)

[Modifier Keys reference](https://eastmanreference.com/complete-list-of-applescript-key-codes)

Daring Fireball articles:

* [Copy Message URI blog post](https://daringfireball.net/2007/12/message_urls_leopard_mail)

* [Scripting Safari URLs](https://daringfireball.net/2003/01/scripting_safari_urls)

* [Writing AppleScripts That Dynamically Target Either Safari or WebKit](https://daringfireball.net/2009/01/applescripts_targetting_safari_or_webkit)

* [Scripting File and Creator Types](https://daringfireball.net/2004/02/scripting_file_and_creator_types)

# macOS Bluetooth Audio Quality

If your audio quality sucks when listening to AirPods, what caused it was
Bluetooth listening to microphone input from your AirPods. Force it to listen to
the macOS built-in microphone and the quality of the music you're listening to
immediately increased. Check that dictation isn't also listening for microphone
input, or else you still won't experience the boost in audio quality.

**Pro tip!** You can hold the option key while clicking on the audio input
settings in the menu bar, and you can control the microphone input source from
there.

**Pro tip!** You can hold the option key while clicking on the bluetooth input
settings in the menu bar, and you can see the bluetooth settings

**Pro tip!** You can hold shift-option while clicking on the bluetooth input
settings in the menu bar, and you will be able to reset the Bluetooth module,
factory reset all Apple devices, or remove all Bluetooth devices.

*Okay Austin this actually worked*

* Disable AAC codec, making Bluetooth quality drop to a poor quality

    ```shell script
    sudo defaults write bluetoothaudiod "Enable AAC codec" -bool false
    ```

However, the following **did not** reverse the poor quality, when the microphone
was on

        ```shell script
        sudo defaults write bluetoothaudiod "Enable AAC codec" -bool true
        ```

Article excerpt attached below

> Audio quality via a Bluetooth device can be a great mystery, partly because
> Bluetooth only mandates in its basic audio standard, A2DP (Advanced Audio
> Distribution Profile), a low-quality audio encoding algorithm. An audio
> encoder takes a data stream and transforms it into whatever the best or
> agreed-upon quality both sides can take, often limited by the particular chips
> on each device and bandwidth available.
>
> That means that the lowest-common denominator may prevail, even when both the
> sending and receiving devices have a variety of higher-quality options
> available that don’t match up or aren’t correctly invoked.
>
> Depending on a host of factors, both a Bluetooth streaming device (sending or
> receiving audio) and a Mac may agree on an encoder that makes music sound like
> it’s playing over a landline telephone call.
>
> That shouldn’t happen, because iPhones, iPads, and Macs have offered
> high-quality encoders for many years that are compatible with a wide range of
> Bluetooth audio equipment from third parties, as well as Apple and Beats
> hardware. But we’ve heard from readers and found discussed repeatedly online
> problems getting the best results on a Mac. This happened in my house just the
> other day, when my trombone-playing older kid was having a Bluetooth mic peak
> out—the sound overwhelmed the mic—when he was trying to record himself.
>
> The answer is complex. So much so that someone with the handle ValdikSS had to
> devote thousands of words in a well-illustrated article at Habr to do justice
> to the details.
>
> The long and the short is that some integrated devices that couple a mic with
> a speaker or earphones—as in earbuds, headphones with mic input, a headset
> with a projecting mic, or a speakerphone—can force audio quality way down when
> paired with a Mac and with some other hosts.
>
> As ValdikSS notes, this duplex mode of sending and transmitting simultaneously
> is a problem. “When this mode is used, both the voice from the microphone and
> the audio are transmitted to the headphones with the same
> quality…Unfortunately, as of 2019, the quality of voice transmission via
> Bluetooth is still poor, and it is not clear why Bluetooth SIG is not doing
> anything about it.” (The SIG is the trade organization that sets standards and
> runs certification problems.)
>
  ---

# Save an application's icon as a PNG

* Select the application that you wan’t to take the icon from.

* Select get info from the file menu you or press ⌘ I

* Select the icon in the upper right corner and copy it. Edit menu then copy or
    ⌘ c.

* Now open a new document in Preview, by default it will include the icon
    present in your clipboard

* Save the file as a PNG, make sure `Alpha` is enabled

---

# NPM Binaries

* `npm link` will create symbolic links between your packages binaries and the
    applicaiton itself.

* Check out the npm documentation to learn how to do this using
    [the `bin` field](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#bin)
    of `package.json`

* There's also support for adding manpages, using
    [the `man` field](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#man)

---

# NPM Top-Level Await

As of NPM 14.8, support for top level `await` commands has been added. Thank
god.

To make your package support top level `await`, you'll need to declare your code
as an ES module. To do so, add `"type": "module"` to the `package.json` file, or
change the file extenion from `.js` to `.mjs`

If this is a lone JavaScript file, not part of a package, you have to rename the
file from `main.js` to `main.mjs`

---

# Pocket

* Saving a file to pocket

    ```shell script
    open 'pocket://add?url=<url>
    ```

* Open pocket and save the article

    ```shell script
    open 'pocket://add?url=http://help.getpocket.com/customer/portal/articles/862848'
    ```

---

---

# Calendar Choices

Feature comparison of the three main calendar services attached below

|                             | iCal | Google | Outlook |
|:----------------------------|:----:|:------:|:-------:|
| Repeating events            |  ✅   |   ✅    |    ✅    |
| Travel time to events       |  ✅   |   ✅    |    ✅    |
| Invitees for events         |  ✅   |   ✅    |    ✅    |
| Calendar delegation         |  ❌   |   ✅    |    ✅    |
| Multiple event alerts       |  ✅   |   ✅    |    ❌    |
| Zoom calendar integration   |  ❌   |   ✅    |    ✅    |
| Show availability to others |  ❌   |   ✅    |    ✅    |
| Private (hidden) events     |  ❌   |   ❌    |    ✅    |
| Show as busy/free           |  ❌   |   ✅    |    ❌    |
| Attach file to event        |  ❌   |   ❌    |    ❌    |
| Attach URL to event         |  ❌   |   ❌    |    ❌    |

# Removing DRM with Calibre

This guide is for
[v6.8.0 of Apprentice Harper's DeDRM tool](https://github.com/apprenticeharper/DeDRM_tools/releases/tag/v6.8.0)
so it requires using
[v4.23.0](https://download.calibre-ebook.com/4.23.0/) of Calibre. I'm trying to
figure out how to remove DRM from ebooks from my CLI, and am following along at
the GitHub repo wiki, on a post with title
["Using the DeDRM plugin with the Calibre command line interface"](https://github.com/apprenticeharper/DeDRM_tools/blob/master/CALIBRE_CLI_INSTRUCTIONS.md)

After you've installed Calibre, be sure to add its executables to your
`${path}`, which are located here

```txt
/Applications/calibre.app/Contents/MacOS
```

```shell script
unzip ./DeDRM_tools_6.8.0.zip -d ./DeDRM_tools
cd ./DeDRM_tools

calibre-customize --add DeDRM_Plugin.zip
calibre-customize --add Obok_Plugin.zip
```

---

Finding EPUB file format books

If you're trying to legally download books from the Pirate Bay, the ones that
are part of the intellectual commons, then you would search for
[category 601 on the Pirate Bay website](https://thepiratebay.org/search.php?q=category:601)

---

[O'reilly search operators](https://www.oreilly.com/online-learning/support/content.html)

```txt
publisher:"O’Reilly Media Inc"
```

---

# Waterproof devices

Waterproof is not a regulated term. The technical term is the *Ingress Protection Rating*, or *IPXX rating*. The two `X` components each have a numerical score attached to them. The first X is dust resistance, from 0 to 6. The second X is water resistance, from 0 to 9

For example, a product with IP67 certification will tolerate being submerged in up to 1.5 meters of water for up to 30 minutes.

A product with IP68 certification will tolerate being submerged in up to 2 meters of water for up to 30 minutes

---

# HEVC

[High Efficiency Video Coding](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding)
also known as **H.265** and **MPEG-H Part 2**, is a
[video compression standard][] designed as part of the [MPEG-H][] project as a
successor to the widely used [Advanced Video Coding][] (AVC, H.264, or
[MPEG-4][] Part 10). In comparison to AVC, HEVC offers from 25% to 50% better
[data compression][] at the same level of video quality, or substantially
improved video quality at the same [bit rate][].

[Advanced Video Coding]: https://en.wikipedia.org/wiki/Advanced_Video_Coding 'Advanced Video Coding'
[bit rate]: https://en.wikipedia.org/wiki/Bit_rate 'Bit rate'
[data compression]: https://en.wikipedia.org/wiki/Data_compression 'Data compression'
[MPEG-4]: https://en.wikipedia.org/wiki/MPEG-4 'MPEG-4'
[video compression standard]: https://en.wikipedia.org/wiki/Video_coding_format 'Video coding format'
[MPEG-H]: https://en.wikipedia.org/wiki/MPEG-H 'MPEG-H'
[8K UHD]: https://en.wikipedia.org/wiki/Ultra-high-definition_television 'Ultra-high-definition television'


To learn more, I recommend taking a look at
[Apple's introduction to HEIF and HEVC](https://developer.apple.com/wwdc17/503);
it's what inspired me to write this post.

HEVC supports resolutions up to 8192×4320, which encompasses resolutions as high
as [8K UHD][], the highest resolution defined in the
[UHDTV](https://en.wikipedia.org/wiki/Ultra-high-definition_television) standard

H.265 is similar to H.264, both process videos and frames in blocks, and both
use temporal and spatial compression techniques. H.265 does a particularly good
job compressing high definition media.

For general video content, there's typically a 40% improvement in compression
compared to H.264. For iOS camera capture, however, it's a 2x improvement,
allowing you to store twice as much media on your device.

The Main 10 profile allows you to encode and decode video with 10-bit precision,
allowing you to represent more grayscales and more colors.

For compatibility with Apple devices, set the *codec type* to `hvc1`, and use
either the `Main`, `Main Still Picture`, or the `Main 10` profile.

HEVC supports both the ISO MPEG-4 `.mp4` file format, as well as the QuickTime
Movie `.mov` file format

H.265 works well for *both* images and videos, allowing HEVC to replace
H.264/AVC for videos, and
[HEIF to replace JPEG](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format#JPEG_and_HEIF)
for images

HEIC is supported in macOS 10.13+, iOS 11+, Ubuntu 20.04+, Android 9+, and
Windows 10

# High Efficiency Image File Format

[High Efficiency Image File Format (HEIF)](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)
is a [container format][] for individual images and image sequences. The
standard covers multimedia files that can also include other media streams, such
as timed text, audio and video. An HEIF image using HEVC requires only about
half the storage space as the equivalent quality [JPEG][]. HEIF also supports
[animation][], and is capable of encoding the contents of a [GIF][] at a
fraction of the size.

HEIF typically uses HEVC for compression (and Apple uses HEVC exclusively). When
a HEIF file is encoded using HEVC, it uses the `image/heic` MIME type, the
`.heic` file extension, and the `public.heic`
[Uniform Type Identifier (UTI)](https://en.wikipedia.org/wiki/Uniform_Type_Identifier)

[JPEG]: https://en.wikipedia.org/wiki/JPEG 'JPEG'
[GIF]: https://en.wikipedia.org/wiki/Animated_GIF 'Animated GIF'
[animation]: https://en.wikipedia.org/wiki/Animation 'Animation'
[container format]: https://en.wikipedia.org/wiki/Digital_container_format 'Digital container format'


# Advanced Audio Coding { #aac }

[**Advanced Audio Coding** (**AAC**)](https://en.wikipedia.org/wiki/Advanced_Audio_Coding)
is an [audio coding standard][] for [lossy][] [digital audio][] [compression][].
Designed to be the successor of the [MP3][] format, AAC generally achieves
higher sound quality than MP3 at the same bit rate.

AAC has been standardized by [ISO][] and [IEC][] as part of the [MPEG-2][] and
[MPEG-4][] specifications. Part of AAC, [HE-AAC][] ("AAC+"), is part of
[MPEG-4 Audio][].

[HE-AAC]: https://en.wikipedia.org/wiki/High-Efficiency_Advanced_Audio_Coding 'High-Efficiency Advanced Audio Coding'
[MPEG-2]: https://en.wikipedia.org/wiki/MPEG-2 'MPEG-2'
[compression]: https://en.wikipedia.org/wiki/Audio_data_compression 'Audio data compression'
[IEC]: https://en.wikipedia.org/wiki/International_Electrotechnical_Commission 'International Electrotechnical Commission'
[audio coding standard]: https://en.wikipedia.org/wiki/Audio_coding_standard 'Audio coding standard'
[digital audio]: https://en.wikipedia.org/wiki/Digital_audio 'Digital audio'
[MP3]: https://en.wikipedia.org/wiki/MP3 'MP3'
[MPEG-4 Audio]: https://en.wikipedia.org/wiki/MPEG-4_Audio 'MPEG-4 Audio'
[ISO]: https://en.wikipedia.org/wiki/International_Organization_for_Standardization 'International Organization for Standardization'
[lossy]: https://en.wikipedia.org/wiki/Lossy_data_compression 'Lossy data compression'

AAC was the default audio format for the Blackberry, Playstation 3, Nintendo
Wii, iTunes, and the iPod.
