+++
title = "macOS"
description = "The best OS a parents' money can buy"
date = 2020-02-04T14:52:27-08:00
image = "macos.jpg"
+++

# Mac OS

## Useful Shortcuts

If you find these hard to remember, there's a useful application called CheatSheet that you can use:

  ```sh
  brew cask install cheatsheet
  ```

After it's installed, you can hold ⌘ and the list of keyboard shortcuts for the current application will appear.

### Navigation

|Shortcut|Function|
|:---:|:---:|
|⌘ ⇧ [|Switch to previous tab|
|⌘ ⇧ ]|Switch to next tab|
|⌘ [|Go back to previous page|
|⌘ ]|Go forward to next page|
|⌘ &grave;|Cycle through open windows of current app|
|⌘ [tab]|Cycle through open apps|
|⌃ ↓|View all open windows of current app|⏶
|⌃ ↑|View all open windows of every app|

### Sleep, Restart, Shut Down, Log Out

| Shorcut | Function |
| :---: | :---: |
| ⌥ ⌘ ⏏︎ | Sleep |
| ⌃ ⌘ Q | Lock Screen |
| ⌃ ⌘ ⏏︎ | Restart |
| ⌃ ⌥ ⌘ ⏏︎ | Shut down |
| ⌥ ⇧ ⌘ Q | Log out |

### Document Editing

These work when editing text using Safari, Notes, and Mail, and any Mac OS application in general. They aren't arbitrary, they're the `emacs` hotkeys, and work on many applications, not just ones on Mac OS.

|Shortcut|Function|
|:---:|:---:|
|⌃ A|Move to the beginning of the line|
|⌃ E|Move to the end of the line|
|⌃ H|Delete the character left of the the cursor|
|⌃ D|Delete the character right of the cursor|
|⌃ U|Delete all text left of the cursor|
|⌃ K|Delete all text right of the cursor|
|⌃ O|Add a newline without moving the cursor|
|⌃ T|Swap the characters left and right of the cursor|

### Cursor Movement

If you're ever stuck without arrow keys (it could happen!) you can take advantage of these 4 shortcuts.

|Shortcut|Function|
|:---:|:---:|
|⌃ F|Move cursor →|
|⌃ B|Move cursor ←|
|⌃ P|Move cursor ↑|
|⌃ N|Move cursor ↓|

{: .notice--info}
**Tip:** These look arbitrary, but they use a helpful pneumonic, hidden as it may be. Forward, Backward, Previous, Next.

### Secret

|Shortcut|Function|
|:---:|:---:|
|⌘ ,|Open preferences window|
|⌘ ⇧ /|Open help menu for current app|
|⌘ ⌃ F|Open app in full-screen|
|⌥ ⌘ I|Open inspect element|

{: .notice--info}
**Tip:** You can open inspect element in many more apps than you think. Give it a try!


* Disable sleep entirely

  ```sh
  sudo systemsetup -setcomputersleep Never
  ```

* Immediately put the computer to sleep

  ```sh
  pmset sleepnow
  ```

* Schedule for the computer to regularly wake up (or boot) on weekdays @ 7:45AM

  ```sh
  pmset repeat wakeorpoweron MTWRF 07:45:00
  ```

* Schedule for the computer to sleep on 12/24 @ 8:00AM

  ```sh
  pmset schedule sleep "12/24/2019 08:00:00"
  ```

* Schedule for the computer to wake on 12/24 @ 8:00PM

  ```sh
  pmset schedule wake "12/24/2019 20:00:00"
  ```

* Restart the computer immediately

  ```sh
  sudo reboot now
  ```

* Shut down the computer immediately

  ```sh
  sudo shutdown now
  ```

* Dangerously shut the computer down immediately

  ```sh
  sudo halt
  ```

### Finder

|Shortcut|Function|
|:---:|:---:|
|⌘ ⌫|Send file to trash|
|⌥ ⌘ ⌫|Completely delete a file|
|⌥ ⌘ ⇧ ⌫|Empty the trash|
|⌘ ⇧ N|Create a new folder|
|⌥ ⌘ V|Transfer copied file/folder to the current folder|
|⌘ ⇧ .|Show hidden files/folders|
|⌘ E|Eject selected disk/drive|

#### Navigating Folders

|Shortcut|Function|
|:---:|:---:|
|⌘ ↑|Open the parent folder|
|⌘ ↓|Open the file/folder|
|⌘ →|Open the folder (list view)|
|⌘ ←|Close the folder (list view)|

#### Opening Folders

|Shortcut|Function|
|:---:|:---:|
|⌘ ⇧ G|Go to folder|
|⌘ ⇧ D|Open the Desktop folder|
|⌘ ⇧ O|Open the Documents folder|
|⌥ ⌘ L|Open the Downloads folder|
|⌘ ⇧ H|Open the Home folder|
|⌘ ⇧ A|Open the Applications folder|
|⌘ ⇧ R|Open the AirDrop folder|
|⌘ ⇧ I|Open the iCloud folder|

#### Adjusting the Finder Window

|Shortcut|Function|
|:---:|:---:|
|⌘ ⌥ P|Show/hide the path bar|
|⌘ ⌥ S|Show/hide the side bar|
|⌘ ⌥ T|Show/hide the toolbar|
|⌘ ⇧ T|Show/hide the tab bar|
|⌘ /|Show/hide the status bar|
|⌘ ⇧ P|Show/hide preview of selected file|
|⌘ 1|View folder's items as icons|
|⌘ 2|View folder's items as list|
|⌘ 3|View folder's items as columns|
|⌥ ⌘ ⌃ 1|Sort files by name|
|⌥ ⌘ ⌃ 2|Sort files by type|
|⌥ ⌘ ⌃ 4|Sort by date added|
|⌥ ⌘ ⌃ 5|Sort by date modified|

### Safari

|Shortcut|Function|
|:---:|:---:|
|⌘ ⇧ \\ |Show all tabs|
|⌘ L|Select the current page's URL|
|⌘ ⇧ R|Open in reader-view|
|⌘ ⇧ I|Mail link of current page|
|⌥ [click]|Download linked file|
|⌘ [click]|Open link in a new tab|
|⌘ D|Add current page to bookmarks|
|⌘ ⇧ D|Add current page to reading list|
|⌥ ⌘ L|Open the downloads folder|
|⌥ ⌘ E|Reset the cache|
|⌘ ⇧ C|Start/stop select element|
|⌥ ⌘ C|Open JavaScript Console|
|⌥ ⌘ I|Open/close inspect element (also closes JavaScript console)|
|⌥ ⌘ R|Hard refresh page|

### Mail

|Shortcut|Function|
|:---:|:---:|
|⌘ ⇧ N|Get new messages|
|⌘ N|Write new message|
|⌥ ⌘ F|Search mail for message|
|⌘ ⇧ D|Send message|
|⌥ ⌘ J|Empty junk mailbox|
|⌘ ⇧ ⌫|Empty trash mailbox|
|⌘ 1|View inbox|
|⌘ 2|View drafts|
|⌘ 3|View sent|
|⌘ 4|View junk|
|⌘ 5|View trash|

### Misc

|Shortcut|Function|
|:---:|:---:|
|⌥ ⌘ D|Show/Hide the dock|


{: .notice--info}
**Tip:** You can add the control `⌃` character to your usual screenshot command, to have screenshots save directly to your clipboard.

#### Change screenshot capture type

By default, screenshots save to `.png` but you can change this setting to  `.jpg` or `.pdf`

Set default screen capture as `.jpg`

```sh
defaults write com.apple.screencapture type jpg && killall SystemUIServer
```

#### Change screenshot capture location

By default, screenshots save to `~/Desktop`. I prefer them to be saved to `~/Downloads`. You can change the screenshot capture location by running this command.

```sh
defaults write com.apple.screencapture location /Users/austin/Downloads && killall SystemUIServer
```

{: .notice--warning}
**Warning:** I had a little bit of trouble with this command. I don't think it works anymore. As of Mac OS Mojave, you have to press ⌘ ⇧ 5, click `options` and then select **Other Location...** to choose a new default save location for screenshots.

#### Screenshot directly from terminal

There's a hidden terminal command `screencapture` that you can use to capture a screenshot of your current window.

Capture the screen, save to `example.png`

  ```sh
  screencapture example.png
  ```

* Capture the screen, save to the clipboard

  ```sh
  screencapture -c
  ```

* Capture the screen, disable the "click" sound effect

  ```sh
  screencapture -x example.png
  ```

* Capture the screen, (but after 10 second delay)

  ```sh
  screencapture -T 10 example.png &
  ```

#### Start screen recording from the terminal

You can even use `screencapture` to record video. The `-V` flag specifies to capture a video and the `-A` flag specifies to capture audio as well.

* Record the screen for 10 seconds

  ```sh
  screencapture -V 10 example.mp4 &
  ```

{: .notice--info}
This is mostly just for fun, it's not as practical as the other ways to go about doing the same thing. If you don't want to use the terminal type ⌘ ⇧ 5 which will give you a host of options to choose from. This is a new feature in OS X Mojave.

### Change default screenshot location

I like to put my screenshots in the `~/Downloads` directory. Luckily there's a terminal command for that.

* Set the directory of all future screenshots.

  ```sh
  defaults write com.apple.screencapture location ~/Downloads && killall SystemUIServer
  ```

## Audio

### Custom Sound Effects

You can change the alert sound on your Mac to any `.aiff` file. Your alert sounds are located in `~/Library/Sounds`.

* Convert a `.mp3` to `.aiff`

  ```sh
  ffmpeg -i Input.mp3 Output.aiff
  cp Output.aiff ~/Library/Sounds/Custom.aiff
  ```

## Move cursor with the mouse in terminal

This is a cool trick I just discovered. Start typing out a command on the terminal, and then hold ⌥

Now try clicking on a different part of the command you're entering. It will move the cursor to that location!

## Update Software in the Terminal

You can actually update the software on your computer directly from the terminal.

* List available software updates

  ```sh
  softwareupdate -l
  ```

* The `-l` flag is the *list* option

* Install all updates

  ```sh
  # Short form
  sudo softwareupdate -iaR

  # Long form
  sudo softwareupdate --install --all --restart
  ```

* The `-i` flag is the *install* option
* The `-a` flag is the *all* option
* The `-r` flag is the *restart* option, so the computer will restart and install the updates after they are downloaded

## Fonts

* The default terminal font, **SF Mono**, is by default hidden from the Font Book, and is available exclusively for use in the terminal app. To copy SF Mono to your computer's **Font Book**, run this command.

  ```sh
  cp -R /System/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/* /Library/Fonts
  ```

## Disable User Photo

* Although the GUI doesn't give us an option to disable user-pictures, you can do it with the terminal commands below.

  ```sh
  # Delete the image chosen during OS installation
  sudo dscl . delete /Users/${USER} Picture

  # Delete an image chosen by the user later on
  sudo dscl . delete /Users/${USER} JPEGPhoto
  ```

## Setting Keyboard Shortcuts from Terminal

Store your keyboard shortcuts in the directory `~/Library/KeyBindings/DefaultKeyBinding.dict`. Note that you have to first create `~/Library/KeyBindings` since it won't exist at first.

* `@` : ⌘
* `^` : ⌃
* `~` : ⌥
* `$` : ⇧

* `←` : `\U2190`
* `↑` : `\U2191`
* `→` : `\U2192`
* `↓` : `\U2193`

{: .notice--warning}
**Note:** Any shortcuts you make using this method will not appear in the keyboard shortcut settings page in your computer.

## Fix Permissions

If you mess up your `/etc` files, like I did when I accidentally made every file executable, you can run this command to reset all of the permissions.

* Reset system file permissions to default

  ```sh
  diskutil resetUserPermissions / $(id -u)
  ```

If you mess up your `/etc/sudoers` file, you'll have to boot into single-user mode with `⌘ S` during power on. From there, you can enter the following commands.

* Reset sudoers file

  ```sh
  mount -uw /
  chown root:wheel /etc/sudoers
  chmod 440 /etc/sudoers
  reboot
  ```

## `defaults`

`defaults` is a powerful tool to utilize when exporting and importing settings across machines. Although there is no built-in method to sync keyboard shortcuts across computers, you can use the `defaults` program to set various keyboard shortcuts. When doing so, refer to the syntax below for how to denote modifier keys:

{: .notice--success}
**Tip:** You can replace `NSGlobalDomain` with the `-g` flag to specify that the `defaults` command is global in scope.

* Disabling key repeat

  ```sh
  defaults write -g InitialKeyRepeat -int 10
  ```

* Resetting key repeat to default settings

  ```sh
  defaults write -g InitialKeyRepeat -int 15 # 225 ms
  defaults write -g KeyRepeat -int 2 # 30 ms
  ```

## Customize Launch Application for File Extension

The file that controls which app launches for a file is located here:

  ```
  ~/Library/Preferences/com.apple.LaunchServices/com.apple.launchservices.secure.plist
  ```

## Default Application

You can install the command `duti` on homebrew to configure the default application that opens when you click on a file with a particular file extension. I've included an example below:

* Setting default application used for `.c` files.

  ```sh
  # Set apple as the default editor for .c files
  duti -s com.apple.Xcode public.c editor
  # Check the current handlers performed by a UTI
  duti -l com.apple.Safari
  # Describe information about the default app for extension `mp4`
  duti -x mp4
  ```

## Delete FaceTime Popup

```sh
pkill -9 FaceTimeNotificationService
```

## macOS notes

* Notes are stored in a SQLite database, located on your computer at `~/Library/Containers/com.apple.Notes/Data/Library/Notes/`

## SVG to PNG

```sh
# Convert `example.svg` into a 1000x1000 .png file
qlmanage -ts 1000 -o . example.svg
```

## `networksetup`

The `networksetup` command allows you to configure your System Preference's *Network* settings directly from your terminal.

* Get the current DNS servers

  ```sh
  networksetup -getdnsservers Wi-Fi
  ```

* Configure the DNS servers

  ```sh
  networksetup -setdnsservers Wi-Fi 1.1.1.1 1.0.0.1 2606:4700:4700::1111 2606:4700:4700::1001
  ```

* Get the local machine's MAC address

  ```sh
  networksetup -getmacaddress Wi-Fi | awk '{print $3}'
  ```

* Configure the SOCKS proxy

  ```sh
  ssh -fNCD 3339 bastion@remote.site
  networksetup -setsocksfirewallproxy Wi-Fi 127.0.0.1 3339
  ```

* Enable the SOCKS proxy

  ```sh
  networksetup -setsocksfirewallproxystate Wi-Fi on
  ```

* Disable the SOCKS proxy

  ```sh
  networksetup -setsocksfirewallproxystate Wi-Fi off
  ```

## `airport`

There is a hidden command, called airport. To use it, add the following directory to your `${PATH}`

  ```txt
  /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport
  ```

* Scan available WiFi networks

  ```sh
  airport -s
  ```

* Disconnect from the current WiFi network

  ```sh
  airport -z
  ```

* List preferred wireless networks

  ```sh
  networksetup -listpreferredwirelessnetworks en0
  ```

* Remove a preferred wireless network

  ```sh
  networksetup -removepreferredwirelessnetwork en0 <network>
  ```

* Connect to a WiFi Network

  ```sh
  networksetup -setairportnetwork en0 <WiFi name> <password>
  ```

## `scutil`

* Get the computer's name

  ```sh
  scutil --get ComputerName
  ```

* Set the computer's name

  ```sh
  scutil --set ComputerName "Tommy's MacBook Pro"
  ```

* Get the host name

  ```sh
  scutil --get HostName
  ```

* Set the host name

  ```sh
  scutil --set HostName "nova"
  ```

* Get the localhost name (used for Bonjour)

  ```sh
  scutil --get LocalHostName
  ```

* Set the localhost name (used for Bonjour)

  ```sh
  scutil --set LocalHostName "nova"
  ```

## `tmutil`

* If you have a Time Capsule, you can use the `tmutil` utility to interface with Time Machine from your terminal.

* Backups are stored in the following location:

  ```sh
  tmutil latestbackup
  # => /Volumes/Time Machine Backups/Backups.backupdb/My Macbook Pro/2019-08-07-061700
  ```

{: .notice--warning}
**Note:** You have to run all of these as root, so before using `tmutil`, start with `sudo -i`

* Turn on Time Machine

  ```sh
  tmutil enable
  ```

* Turn off Time Machine

  ```sh
  tmutil disable
  ```

* Start backing up to the Time Capsule

  ```sh
  tmutil startbackup
  ```

* Stop backing up to the Time Capsule

  ```sh
  tmutil stopbackup
  ```

### Saving Local Snapshots

By default, Time Machine will create *local snapshots*, locally stored backup volumes when it can't connect to your Time Capsule.

* Enable Local Snapshots

  ```sh
  tmutil disablelocal
  ```

* Disable Local Snapshots

  ```sh
  tmutil enablelocal
  ```

### Excluding Certain Files & Folders

By default, Time Machine will back up everything on your drive. You may, however, have data from large directories stored elsewhere. If so, it might be a good idea to exclude that directory from Time Machine's backups, in the interest of saving space.

* Exclude files in the directory `~/Downloads` from backups

  ```sh
  tmutil addexclusion ~/Downloads
  ```

* Re-enable backups for files in the directory `~/Downloads`

  ```sh
  tmutil removeexclusion ~/Downloads
  ```

{: .notice--warning}
**Note:** By default, Time Machine will continue to ignore the files in an excluded directory *even if you move the directory somewhere else*. To have an absolute path excluded instead, use the `-p` flag.

* Exclude files in the absolute path `~/Downloads` from backups

  ```sh
  tmutil addexclusion -p ~/Downloads
  ```

* Re-enable backups for files in the absolute path `~/Downloads`

  ```sh
  tmutil removeexclusion -p ~/Downloads
  ```

You can also check if a given file, directory, or volume is excluded

* Check if a file is excluded

  ```sh
  tmutil isexcluded ~/Downloads
  # => [Included] /Users/austin/Downloads
  ```

### Restoring Files

  ```sh
  tmutil restore
  ```

## `launchctl`

macOS has a more robust alternative to `cron` which allows daemon processes to be triggered on a systematic fashion. Using the `launchctl` (launch control) command, you can create daemon processes that will automatically run by the system.

These files take the form of plist files and are found in several system directories:

* /Library/LaunchAgents
* /Library/LaunchDaemons
* /System/Library/LaunchAgents
* /System/Library/LaunchDaemons
* ${HOME}/Library/LaunchAgents

If you write or install personal plist files, they will ideally go in the home directory. A good example file to begin understanding the syntax can be located in `/System/Library/LaunchDaemons/ssh.plist`, which is the file used to launch the `ssh` daemon server that listens for incoming `ssh` connections.

Sample launch agent, located in `~/Library/LaunchAgents/com.example.transmission.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>Label</key>
		<string>com.example.transmission</string>
		<key>ProgramArguments</key>
		<array>
      <!-- The absolute path to the executable file -->
			<string>/opt/bin/transmission-daemon</string>

      <!-- The first argument supplied to the program -->
			<string>--config-dir</string>

      <!-- The second argument supplied to the program -->
			<string>/Users/austin/.config/transmission/settings.json</string>

		</array>
	</dict>
</plist>
```

If you're setting up processes in `/Library/LaunchDaemons`, which are run as the `root` user, then make sure to set the file permissions appropriately using `chown root:wheel <file>` and `chmod 644 <file>`

* View `launchctl` information about a daemon process by its `PID`:

  ```sh
  sudo launchctl profinfo <PID>
  ```

* View information about all services pertaining to a user's `UID`:

  ```sh
  launchctl print user/$UID
  ```

* View information about a particular *running* service under a user's `UID`:

  ```sh
  # ~/Library/LaunchAgents/com.tommy.foo.plist
  launchctl print com.tommy.foo
  ```

* For all daemon processes owned by the current user, print `true` if they are disabled

  ```sh
  launchctl print-disabled user/$UID
  ```

  {: .notice--warning}
  **Note:** `launchtl` keeps an un-erasable record of disabled/enabled launch daemons. If you make a typo when adding daemon, and disable it, there is no way to erase it as an entry.

* Enable a daemon service

  ```sh
  launchctl enable user/$UID/com.tommy.foo
  ```

* Disable a daemon service

  ```sh
  launchctl disable user/$UID/com.tommy.foo
  ```

* Launch a daemon service

  ```sh
  launchctl kickstart
  ```

* Launch any executable file with arguments as a launchctl

  ```sh
  launchctl submit -l -- /path/to/executable 'arg1' 'arg2' 'arg3'
  ```

## Create User from Command Line

Adding a new user to a Mac computer from a Terminal window requires you to define the user’s name, set a password, create the user’s home directory and configure their system permissions.

1. Create a user named `tommy`

  ```sh
  dscl . -create /Users/tommy
  ```

2. Set `tommy`'s shell to `/bin/zsh`

  ```sh
  dscl . create '/Users/tommy' UserShell '/bin/zsh'
  ```

3. Set Tommy's have the home directory `/Users/tommy`

  ```sh
  dscl . create '/Users/tommy' NFSHomeDirectory '/Users/tommy'
  createhomedir -u tommy -c
  ```

4. Set tommy's RealName to `Tommy Trojan`

  ```sh
  dscl . create '/Users/tommy' RealName 'Tommy Trojan'
  ```

5. Give tommy a `UID` number, (for instance, 502)

  ```sh
  dscl . -create '/Users/tommy' UniqueID 502
  ```

6. Give tommy the primary group ID of `20` (the default for the `staff` group on macOS)

  ```sh
  dscl . -create '/Users/username' PrimaryGroupID 20
  ```

7. Give tommy the password `fighton`

  ```sh
  dscl . -passwd /Users/tommy 'fighton'
  ```

8. Add tommy to the list of user's that can be logged into with `ssh`

  ```sh
  dseditgroup -o edit -t user -a tommy com.apple.access_ssh
  ```

9. Optionally add `tommy` to the list of `admin` users on the computer

  ```sh
  dseditgroup -o edit -d tommy -t user admin
  ```

## Hidden Users

* Allow the creation of secret users, hidden if their UID is 500 or lower

  ```sh
  sudo defaults write /Library/Preferences/com.apple.loginwindow Hide500Users -bool YES
  ```

* Make the user `tommy` a hidden user

  ```sh
  # Enabling hidden status
  sudo dscl . create '/Users/tommy' IsHidden 1

  # Disabling hidden status
  sudo dscl . create '/Users/tommy' IsHidden 0
  ```

* Disable the `Other...` user from appearing in the login screen

  ```sh
  sudo defaults write /Library/Preferences/com.apple.loginwindow SHOWOTHERUSERS_MANAGED -bool false
  ```

* Add `tommy` to the list of hidden users

  ```sh
  sudo defaults write /Library/Preferences/com.apple.loginwindow HiddenUsersList -array-add "tommy"
  ```

* Hide the public share folder for the user whose long name is `Tommy Trojan`

  ```sh
  sudo dscl . delete "/SharePoints/Hidden Tommy Trojan's Public Folder"
  ```

* Force the user `tommy` to set a new password

  ```sh
  sudo dscl . passwd '/Users/tommy' ''
  sudo pwpolicy -u username -setpolicy 'newPasswordRequired=1'
  sudo rm -r ~tommy/Library/Keychains/*
  ```

* Get a list of all users short names

  ```sh
  sudo dscl . -list /Users
  ```

* Get detailed info on a particular user

  ```sh
  sudo dscl . -read /Users/<username>
  ```

* Get a specific value from a user

  ```sh
  dscl . -read /Users/<username> <key>
  ```

* Get detailed info on *all* users

  ```sh
  dscl . -readall /Users
  ```

* Get a specific value from all users

  ```sh
  dscl . -readall /Users <key>
  ```

* Get concise information about all users

  ```sh
  dscl . ls /Users
  ```

* Get all of the groups that user `root` is associated with

  ```sh
  dscl . -search /Groups GroupMembership root
  ```

* Get the name os all of the groups

  ```sh
  dscl . ls /Groups
  ```

* Check if the user `tommy` is a member of the group `admin`

  ```sh
  dseditgroup -o checkmember -m tommy admin
  ```

* Add `tommy` to the list of users who are members of the `admin` group

  ```sh
  dseditgroup -o edit -a tommy -t user admin
  ```

  {: .notice--info}
  **Tip:** This is the command that is equivalent to checking the box "Allow user to administer this computer" on the Users & Groups page

* Remove `tommy` from the list of users who are members of the `admin` group

  ```sh
  dseditgroup -o edit -d tommy -t user admin
  ```

## Single User Mode

* Reboot the computer into single user mode

  ```sh
  sudo launchctl reboot -s system
  ```

## Power Sound

Playing the power sound

  ```sh
  afplay /System/Library/CoreServices/PowerChime.app/Contents/Resources/connect_power.aif
  ```

## System Integrity Protection

If you need to make changes to the file system, it might require disabling system integrity protection. By default, the following directories are protected:

1. `/System`
2. `/usr`
3. `/bin`
4. `/sbin`
5. `/var`

There are three directories that are not protected:

1. `/Applications`
2. `/Library`
3. `/usr/local`

* Disabling system integrity protection

  ```sh
  csrutil disable
  ```

* Enabling system integrity protection

  ```sh
  csrutil enable
  ```

* Checking system integrity protection

  ```sh
  csrutil status
  ```

## Configuring the Login Page

* Show additional info by clicking the clock in the top-right corner

  ```sh
  sudo defaults write /Library/Preferences/com.apple.loginwindow AdminHostInfo IPAddress
  ```

* Adding a welcome message to the login page

  ```sh
  # [ Adding the message ]
  sudo defaults write /Library/Preferences/com.apple.loginwindow LoginwindowText -string 'Welcome back'

  # [ Removing the message ]
  sudo defaults delete /Library/Preferences/com.apple.loginwindow LoginwindowText
  ```

* Adding a script to run at login

  ```sh
  sudo defaults write com.apple.loginwindow LoginHook /path/to/script
  ```

  {: .notice--warning}
  **Note:** It's preferrable to have these processes launch as LaunchAgents, but LoginHooks still work in the latest version of macOS.

* Adding a graphic+text banner to appear upon login

  ```sh
  sudo cp ./banner /Library/Security/PolicyBanner
  ```

* Disable buttons on the login page

  ```sh
  sudo defaults write /Library/Preferences/com.apple.loginwindow ShutDownDisabled -bool true
  sudo defaults write /Library/Preferences/com.apple.loginwindow RestartDisabled -bool true
  sudo defaults write /Library/Preferences/com.apple.loginwindow SleepDisabled -bool true
  ```

* Reenable buttons on the login page

  ```sh
  sudo defaults write /Library/Preferences/com.apple.loginwindow ShutDownDisabled -bool false
  sudo defaults write /Library/Preferences/com.apple.loginwindow RestartDisabled -bool false
  sudo defaults write /Library/Preferences/com.apple.loginwindow SleepDisabled -bool false
  ```

* Disable the user icons from the login page (this sets the "username & password" format as the default for the login page)

  ```sh
  sudo defaults write /Library/Preferences/com.apple.loginwindow SHOWFULLNAME -bool true
  ```

  {: .notice--success}
  **Tip:** You can also just press `option-return` to toggle this view-mode if you'd rather not enable it by default


## `diskutil`

Something learned from `man hdiutil`:
  `/dev/rdisk` nodes are character-special devices, but are "raw" in the BSD sense and force block-aligned I/O. They are closer to the physical disk than the buffer cache. `/dev/disk` nodes, on the other hand, are buffered block-special devices and are used primarily by the kernel's filesystem code. In layman's terms `/dev/rdisk` goes almost directly to disk and `/dev/disk` goes via a longer more expensive route

* View available storage devices

  ```sh
  diskutil list
  ```

* Erase a hard drive's partitions

  ```sh
  sudo diskutil partitionDisk /dev/disk2 1 MBR "Free Space" "%noformat%" 100%
  ```

* Copy image to a new hard drive

  ```sh
  diskutil unmount /dev/disk2s1
  sudo dd bs=1M if='/path/to/file.img' of='/dev/rdisk2' conv=sync
  ```

* Copy the current hard drive into an image

  ```sh
  # Exporting an SD card save
  sudo dd bs=4M if=/dev/sdb of=raspbian.img

  # Importing an SD card save
  sudo dd bs=4M if=raspbian.img of=/dev/sdb
  ```

* Eject a device

  ```sh
  sudo diskutil eject /dev/rdisk2
  ```

* Enable vpn connection on port 3340

  ```sh
  kill $(lsof -ti :3340) &> /dev/null
  ssh -fNCD 3340 'ssh://bastion@52.52.124.230:22'
  networksetup -setsocksfirewallproxystate Wi-Fi on
  return 0
  ```

* Disable vpn connection on port 3340

  ```sh
	kill $(lsof -ti :3340) &> /dev/null
	networksetup -setsocksfirewallproxystate Wi-Fi off
	return 0
  ```

## macOS Books

New to macOS Catalina is the Books application, which provides a cleaner interface for handling audiobooks on your Mac.

* Audiobooks are stored in `~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks/Books/Audiobooks`

## macOS Notes

* Notes are stored in a sqlite database, located on your computer at `~/Library/Containers/com.apple.Notes/Data/Library/Notes/`

## Printing

* Scan for printers on the network that support the `IPP` protocol

  ```sh
  dns-sd -Z _ipp._tcp .
  ```

* Ping the printer to see if it responds

  ```sh
  ping BRN3C2AF4C9463F.local
  ```

* Setup the printer, name him `Brother`

  ```sh
  lpadmin -p 'Brother' -E -v 'ipp://brother.local' -m everywhere
  ```

  - `-p 'Brother'`: Name the printer "Brother"
  - `-E`: Use TLS encryption when communicating across the network
  - `-v 'ipp://brother.local'`: Print to the URI `ipp://brother.local`
  - `-m everywhere`: Use the IPP protocol

* Make this printer the default

  ```sh
  lpoptions -E -d 'Brother'
  # Creates ~/.cups/lpoptions with one line: "Default Brother"
  ```

* Print a file

  ```sh
  lp ~/path/to/file.pdf
  ```

* Check the current printer configurations

  ```sh
  lpstat -v
  ```
