---
title: Misc
description: "I had to write it down somewhere..."
date: 2020-02-04T14:52:27-08:00
---

# Misc

A section dedicated to other applications and tools worth getting to know.

# `keka`

[Keka](https://www.keka.io/en/) is an amazing application, that was suggested to me by one of my IT professors at USC.

* Getting Started

  ```shell script
  brew cask install keka kekadefaultapp
  ```

Then, open `keka`, configure your preferences, and set keka to be your default app. Now you can compress and decompress any file on your computer by pressing ⌃ ⇧ K

`keka` will automatically know which action to perform based on the file it received as input. It will use the configurations you specified in the app. I recommend GNU's `.gzip` files because they use an algorithm that is superior in compression to the one used in Microsoft's `.zip` filetype. Also, because `tar` uses `gzip` so it's a good idea to get started.

# `figlet`

## `figlet` I/O

### Examples

input file :arrow_right: terminal
```shell script
figlet -p < ifile.txt
```

terminal :arrow_right: terminal
```shell script
figlet Hello World
```

terminal :arrow_right: output file
```shell script
figlet -p < ifile.txt > ofile.txt
```

file :arrow_right: file
```shell script
figlet Hello World > ofile.txt
```

# `spectacle`

This is a great app that my friend Russel showed me. If you work on a laptop, managing your screen space is important. Unfortunately there aren't many built-in keybindings to resize and maximize applications. Although the gesture-based resizing is graceful and pretty, they aren't very useful because the animations are so slow.

* Getting Started

  ```shell script
  brew cask install spectacle
  ```

Open up `spectacle` in the finder, and then enable accessibility access on your computer. You're all set up to use shortcuts to resize windows on your computer.

# `lsyncd`

The `lsyncd` program allows bi-directional syncing of files between a local and remote host. If you have a folder that you make changes to often, it would be useful to just change once, update everywhere.

* Installing `lsyncd`

  ```shell script
  # macOS
  brew install lsyncd
  # Debian distro
  apt install lsyncd
  ```
# `mutt`

* Installing `mutt`

  ```shell script
  # Using Mutt
  brew install mutt
  # Using NeoMutt
  brew install neomutt
  ```

* Example configuration file

  ```txt
  set realname = "Tommy Trojan"
  set smtp_url = "smtp://tommytrojan@smtp.mail.me.com:587/"
  set smtp_pass = "1234-abcd-1234-abcd"
  set smtp_authenticators = 'gssapi:login'
  set imap_user = "tommytrojan"
  set imap_pass = "1234-abcd-1234-abcd"
  set from = "tommytrojan@icloud.com"
  set folder = "imaps://tommytrojan@imap.mail.me.com:993"
  set spoolfile = "+INBOX"
  set postponed = "+Drafts"
  set record = "+Sent Messages"
  set trash = "+Trash"
  unset beep_new # Don't beep for new messages
  set imap_pipeline_depth = 0
  set header_cache = "$XDG_CACHE_HOME/mutt/headers"
  set message_cachedir = "$XDG_CACHE_HOME/mutt/bodies"
  set certificate_file = "$XDG_CACHE_HOME/mutt/certificates"
  set sort=reverse-date-sent
  set assumed_charset="utf-8"
  set attach_charset="utf-8"
  set charset="utf-8"
  # Don't try to add a copy to sent folder (throws error in batch mode)
  set copy = no
  # Don't include original message in reply
  unset include
  # Don't show the help menu at the top of the screen
  unset help

  # Configure keybindings
  bind index = noop
  bind index g first-entry
  bind pager g top
  bind index * noop
  bind index G last-entry
  bind pager G bottom
  bind pager <Down> next-line
  bind pager j next-line
  bind pager <Up> previous-line
  bind pager k previous-line
  bind index o display-message
  bind index n noop
  bind index m mail
  bind index,pager \Cwq quit

  # Configure inbox style
  color indicator brightblue default
  ```

## ImageMagick

* Compress a PDF to a smaller size file

  ```shell script
  convert 'input.pdf' -format 'PDF' -quality 10 'output.pdf'
  ```

* Combine multiple images into a single PDF

  ```shell script
  magick *.jpg combined.pdf
  ```

## Hugo

* Generate bash autocompletions for Hugo

  ```shell script
  sudo hugo gen autocomplete --type bash --completionfile /usr/local/etc/bash_completion.d/hugo.sh
  ```

## JetBrains

Useful subcommands exist for the following IDE command-line interfaces:

* [IntelliJ Idea](https://www.jetbrains.com/help/idea/working-with-the-ide-features-from-command-line.html)
* [WebStorm](https://www.jetbrains.com/help/webstorm/working-with-the-ide-features-from-command-line.html#arguments)
* [PyCharm](https://www.jetbrains.com/help/pycharm/working-with-the-ide-features-from-command-line.html#arguments)
* [CLion](https://www.jetbrains.com/help/clion/working-with-the-ide-features-from-command-line.html#arguments)
* [DataGrip](https://www.jetbrains.com/help/datagrip/working-with-the-ide-features-from-command-line.html#arguments)

If you specify a directory with an existing project, the IDE opens this project.

If you open a directory that is not a part of a project, the IDE adds the `.idea` directory to it, making it a project.

* Open a project (this one) in Webstorm without showing the splash loading screen

  ```shell script
  webstorm ~/.wiki --nosplash --wait
  ```

### Path Variables

* [Link to JetBrains documentation](https://www.jetbrains.com/help/idea/absolute-path-variables.html)

* Pre-defined path variables include `$USER_HOME$`, `$PROJECT_DIR$`, and `$MODULE_DIR$`

### TinyPNG

* [Link to Python SDK](https://tinypng.com/developers/reference/python)


### REST APIs

An [Application Programming Interface](https://www.twilio.com/docs/glossary/what-is-an-api) or **API** is a set of rules that lets programs talk to each other, exposing data and functionality across the internet in a consistent format.

APIs accessed through HTTP typically use [Representational State Transfer](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) or **REST**. This is an architectural pattern that describes how distributed systems can expose a consistent interface. When people use the term ‘REST API,’ they are generally referring to an API accessed via HTTP protocol at a predefined set of URLs.

These URLs represent various resources - any information or content accessed at that location, which can be returned as JSON, HTML, audio files, or images. Often, resources have one or more methods that can be performed on them over HTTP, like GET, POST, PUT and DELETE.

* [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)

  * Add the HTTP header `Authorization: Basic ${token}`

  * Generate HTTP header for basic authentication by base64 encoding the username and password

    ```shell script
    username='ttrojan'
    password='fighton'
    token=$(base64 -w 0 < =(<<<${username}:${password}))
    auth="Authorization: Basic ${token}"
    ```

  * Copy it to clipboard immediately

    ```shell script
    pbcopy < =(<<<"Basic $(base64 -w 0 < =(<<<${username}:${password}))")
    ```

### Twilio

* How to [look up a phone number](https://www.twilio.com/docs/lookup/quickstart?code-sample=code-lookup-with-national-formatted-number&code-language=PHP&code-sdk-version=6.x#how-to-look-up-a-phone-number) using [the Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart)

  ```shell script
  twilio api:lookups:v1:phone-numbers:fetch --phone-number '+16507432062' --type=carrier --type=caller-name
  ```

### GitHub

When creating a linking a file hosted on GitHub, you can add a highlight to the relevant lines of code using a 

### Google Search

You can view [Google's own documentation](https://support.google.com/websearch/answer/2466433) on search operators, but they leave a lot of them out. I've included some of my favorites below:

* `intext:`

  * require results to include a keyword within the text body

* `intitle:`

  * require results to include a keyword within the title 

* `inurl:`

  * require results to include a keyword within the URL

* `related:`

  * find the landing page for websites of alternatives to `slack.com` with `related:slack.com`

* `cache:`

  * View the copy of the website from Google's cache

Also, I've written down two search operators that I'm convinced very few self-proclaimed search masters are aware of. These are two search operators that were added in 2018, that most people haven't caughten drift of just yet.

* `after:`

  * Search for results before a date with `before:`

    * For example, searching for events before 2010 would be `before:2010`

  * Search for results after a date with `after:`

    * For example, searching for events after 2018 would be `after:2018`

Clever combined usage of search operators, and be amazed by how precise [the returned results](https://www.google.com/search?q="whenever+*+says+*+they+*"&oq="whenever+*+says+*+they+*") are

  ```txt
  "whenever * says * I *"
  ```

* You can use either the `filetype:pdf` or `ext:pdf` operators, both return the same results, but the `ext:` is a little more strict about returning only files of the specified kind

They're also rolling out a new feature called [Google Collections](https://support.google.com/websearch/answer/9217379) which allows you to save images without downloading, pretty neat.

You can reverse search for images at `images.google.com`, details provided in [their support documentation](https://support.google.com/websearch/answer/1325808)

* Breakdown of the query string. For each of these query string parameters, assume the provided value is `foo+bar`, such as `param=foo+bar`. Each word is concatenated with the `+` character.

  * `as_epq`: Results must include each word, and all must be in the provided order

  * `as_oq`: Results must include one or more of the words provided

  * `as_eq`: Results most not include any of the words provided

  * `num`: Controls the number of results that appear

  * `as_filetype`: Equivalent to the `filetype:` search operator

  * `as_sitesearch`: Equivalent to the `site:` search operator

  * `as_qdr`: Limit results to those first indexed by...

    * `d`: The past day

    * `w`: The past week

    * `m`: The past month

    * `y`: The past year

  * `as_rights=cc_publicdomain`

    * Limit results to content free to use from the public domain.

  * `as_lq`
  
    * Find sites that link to the URL you put in

  * `pws`

    * Whether or not the search should be personalized, `1` to enable, `0` to disable

  * `hl`

    * Determines the language of the search interface

  * `lr`

    * Limits results to a particular language. For example, a value of `lang_en` would limit results to those that are written in English

  * `cr=countryXX`: Only show results from the country `XX` where `XX` is replaced with that country's [ISO 3166-1 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
  

# Selenium

* [Link to documentation](https://www.selenium.dev/documentation/en/webdriver/driver_requirements/)

* Enable the safari webdriver

```shell script
safaridriver --enable
```

* [Link to documentation](https://www.selenium.dev/documentation/en/webdriver/browser_manipulation/)

* Create a webdriver


```py
#Simple assignment
from selenium.webdriver import Safari

driver = Safari()

driver.get('https://google.com')

print(driver.current_url)
```


* Quit the webdriver

```py
driver.quit()
```


# WebP

A new image format for the web

* [Link to project homepage](https://developers.google.com/speed/webp/)

## [Getting Started](https://developers.google.com/speed/webp/docs/using)

The version installed from Homebrew opts out of some fun features like 
converting GIF files to WebP format. For this reason, I've decided to
learn how to build this library from source, and have included the instructions
below for others to follow along with.

{{% aside warning %}}
**Note:** This is assuming a user-level prefix
`~/.local` is an acceptable place to install C-style packages, so if you're
setting this up in a different location, results may vary.
{{% /aside %}}

* Install latest version of `libwebp`:

    ```shell script
    mkdir -p ~/.local/opt/libwebp
    url='https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.1.0-mac-10.15.tar.gz '
    curl ${url} > ~/Downloads/libwebp.tgz
    tar xf ~/Downloads/libwebp.tgz -C ~/.local/opt
    mv ~/.local/opt/libwebp{*(/),}
    < =(<<<'path=(~/.local/opt/libwebp/bin ${path})') >> ~/.zshrc
    ```

* Enable optional packages in the `libwebp` installation:

    ```shell script
    ./configure --prefix=${HOME}/.local --enable-everything

    ```

### `cwebp` Encoder

* [Link to documentation](https://developers.google.com/speed/webp/docs/cwebp)

* Compress PNG file `image.png` to WebP file `image.webp` (with quality range of 80)

  ```shell script
  cwebp -q 80 image.png -o image.webp
  ```

* Compress PNG file `image.png` to WebP file `image.webp`

    ```shell script
    # quality: 100
    # width: 1920
    # height: auto-fit
    cwebp -q 100 -resize 1920 0 image.png -o image.webp
    ```

* Compress JPG file `image.jpg` to WebP file `image.webp`

    ```shell script
    cwebp \
        -noalpha \
        -hint 'photo' \
        -jpeg_like \
        -m 6 \
        -q 90 \
        -alpha_filter 'best' \
        -metadata 'all' \
        -mt \
        'image.jpg' \
        -o 'image.webp'
    ```

{{% aside info %}}
**Clarification:** A lot of those settings aren't required, but this was the 
set of configurations I found does the best job at reducing the filesize 
without causing a noticable change in quality between the two image files
{{% /aside %}}

* Crop a `500x1000` photo so that `10px` are cut off from all four sides

    ```shell script
    cwebp \
        -crop 10 10 480 980 \
        image.jpg \
        -o image.webp
    ```

### `dwebp` Decoder

* [Link to documentation](https://developers.google.com/speed/webp/docs/dwebp)

* Decode WebP file `image.webp` to PNG file `image.png`

  ```shell script
  dwebp image.webp -o image.png
  ```

### Utility Commands

* Convert a file to WebP, with the same filename, but with `.webp` extension

    ```shell script
    cwebp ~/Downloads/file.jpg -o !{#^:r}.cwebp
    ```

* Convert the most recently created file

    ```shell script
    cwebp ~/Downloads/*(om[1]) -o image.cwebp
    ```

### Looping

* Compress a series of [images into the animated WebP format](https://developers.google.com/speed/webp/docs/img2webp)

    ```shell script
    img2webp -lossy -d 1000 -m 6 -loop 0 'one.jpg' 'two.jpg' -o ~/Downloads/mowgli.webp 
    ```

### Slack 

Slack supports URL Schemes, which they document on their [developer API site](https://api.slack.com/reference/deep-linking#client__supported-uris__open-a-direct-message)

* Link to a conversation with a specific user, in a particular workspace

    ```shell script
    user_id=W01543F37L3
    workspace_id=T019B257FQT

    open "slack://user?team=${workspace_id}&id=${user_id}"
    ```

### Fonts

* Decompress WOFF2 font face into its original file format (TTF or OTF)

    ```shell script
    brew install woff2
    woff2_decompress 'font.woff2'
    ```

Google's `Product Sans` font is gorgeous, but the font face falls under a restricted license. For this reason, I'm not able to use it. With that being said, here's how someone *could* use it. Even though it isn't advertised, the font is accessible via an API call to the `fonts.googleapis.com` host. From here, you can pull the relevant CSS, revealing the resource URLs, and request the original TTF files.

* Download the font family `Product Sans`

```shell script
# usage: `zsh ./fontastic.sh 'Open Sans'`

font_family=${1/ /+}
font_weights=({1..9}00{,b,i,bi})
base_url='https://fonts.googleapis.com/css'
query_string="family=${font_family}:${(j<,>)font_weights}"
endpoint="${base_url}?${query_string}"
fonts=($(curl -s ${endpoint} | grep -o 'https://.*\.ttf' ))
names=(${(f)"$(curl -s ${endpoint} | grep '^  src' | sed "s/^.*src: local('\([^']\+\)').*$/\1/")"})
if (( ${#fonts} > 0 )) {
	mkdir -v ${1}
	pushd ${1}
	for ((i=1;i<=${#fonts};i+=1)); {
		/usr/bin/curl -s ${fonts[$i]} -o "${names[$i]}.ttf"
	}
	popd
	print "font files have been saved to ${1:A}"
	exit 0
} else {
	print "error: no results found for font family ${1}" >&1
	exit 1
}
popd
```

# Firefox

## Search Operators

When using the address bar to search, you can [filter the results suggested](https://support.mozilla.org/en-US/kb/address-bar-autocomplete-firefox#w_changing-results-on-the-fly) using a set of special characters separated by spaces

| Character | Searches for results |
| :--- | :--- |
| ^ | within browsing history
| * | within bookmarks
| + | within bookmarks with matching tags
| % | within currently open tabs
| # | containing the provided title or tag
| $ | containing the provided keyword in its URL
| ? | in search suggestions

{{% aside info %}}

**Tip:** You don't have to provide the special character at the beginning of your query. You can also place the special character at the end of the query

{{% /aside %}}

* Search bookmarks for `mozilla`

    ```txt
    * mozilla
    ```

* Search browsing history for `react`

    ```txt
    ^ react
    ```

* Search for results containing `giphy` in the URL

    ```txt
    $ giphy
    ```

## Quick Find

Some websites use `/` as the keyboard shortcut to focus the cursor on the main search bar of the page. The problem, however, is that Firefox uses `/` as the keyboard shortcut for Quick Find, and intercepts a user when they press `/`. 

To disable the usage of `/` by Firefox

1. Go to `about:config`
1. Search for `accessibility.typeaheadfind.manual` 
1. Set its value to `false`
