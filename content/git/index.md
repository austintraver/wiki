---
title: Git
description: "Version control for the stuff-messer-upper in all of us"
date: 2020-02-04T14:52:27-08:00
---

# Git

In Git, we use version control to create discrete saved states, known as
*commits*, of our project. Each of these commits is part of a broader repository
for a project. A *remote repository* refers to a non-locally stored copy of the
repository. This remote contains all the data in the project since the last time
anyone *pushed* the *commits* they've made to this remote repository. By
default, we name this *remote repository* "origin."

* Each repository contains a set of *commits* which each contain a snapshot of
  the project at a given point in time, each of those is called a *tree*.

* Each *tree* is the structure of files and directories at a given point in
  time.

* If a commit has no parents, it is called a *root commit*

* If a commit has multiple parents, it is called a *merge commit*

## Getting Started

* Download `git` and `hub` on macOS

    ```shell script
    # Install both `git` and `hub` to the local machine
    brew install git hub
    ```

* Add `hub` as an alias for `git` in your
  [zsh](/zsh) runtime configurations

    ```shell script
    < =(<<<'alias hub=zsh') >> ~/.zshrc
    source ~/.zshrc
    ```

{{% aside success %}}
**Good News!** GitHub's original open source `hub` CLI is
not where the fun ends. GitHub has announced `gh`, their official,
fully-supported
[command-line interface for GitHub](https://cli.github.com/manual)
{{% /aside %}}

* Create a public (`-p`) gist for `manpager.sh` with description (`-d`) `Read
  manpages inside vi`, reading from standard input (`-`)

    ```shell script
    gh gist create -p \
      -f 'manpager.sh' \
      -d 'Read manpages inside vi' \
      - < ./Desktop/file.sh
    ```

{{% aside warning %}}
**Note:** For the rest of these examples, we're assuming
that the user has a GitHub account with the username `tommy`
{{% /aside %}}

* Creating a local git repository

    ```shell script
    # v.1: Create a git repository in the current directory: `project/`
    git init
    # v.2: Create a repo, and GitHub repo, set it as the upstream
    git init -g
    ```

* Creating a remote GitHub repository

    ```shell script
    # v3: Create a public GitHub repository of this existing git repo
    git create

    # v4: Create a private GitHub repository of this existing git repo
    git create -p
    git create --private

    # v5: Create a GitHub repository of the current directory,
    # but name the repo "idea" and add the description "My new idea"
    git create idea -d "My new idea"
    git create idea --description "My new idae"

    # v6
    gh repo create {{< var REPO_NAME >}} [-d {{< var DESCRIPTION >}} ] {--private | --public} [--enable-wiki --enable-issues ...]
    ```

* Adding a remote repository as a branch to track

    ```shell script
    # Add a remote repository named "origin"
    git remote add origin
    # => git remote add ssh://git@github.com/tommy/project
    ```

* Updating the URL of a remote repository

    ```shell script
    git remote set-url origin 'git@github.com:/user/repo.git'
    ```

* Pushing commits to a remote repository

    ```shell script
    # Implicit push of current branch "master" to default remote "origin"
    git push
    # Explicit push of branch "master" to remote "origin"
    git push origin master
    # Push the current branch to the same name on the remote
    git push origin HEAD

    # Push the current branch to the remote ref master in the origin repo
    git push origin HEAD:master

    ```

## Objects in Git

### Blob

A *blob* is an opaque chunk of binary data, which represents an entire file. Any
time a file is updated, a brand new blob is created, with the entire contents of
the file. In this way, git is not storage efficient, but it is reliable. If any
blob is corrupted, the other blobs will let you generate the file.

... A sidenote I'm adding here in 2020, two years after I wrote the note above:
It's called a blob because it's a **binary large object** 🤦🏻‍♂️ that's
pretty clever I gotta be honest

### Tree

A *tree* is a portion of the repository's content at a given point in time.

### Tag

A *tag* is a name for a particular commit that a human can read. By default, a
tag is not part of a given commit.

## Branches

In git, a pointer is known as a *ref*. A *branch* contains a *ref* to a *tip*,
and includes all commits that can be reached from the *tip*. The *tip* is the
last commit that was made on a given branch.

The HEAD ref refers to the current branch that the user is working on.

* View what branch you are working on

    ```shell script
    # View all local branches
    git branch -l
    git branch --list

    # View all remote branches
    git branch -r
    git branch --remote

    # View all local & remote branches
    git branch -a
    git branch --all

    # View detailed information about branch status
    git branch --all --verbose
    ```

* Changing a branch's name

    ```shell script
    git branch -m <oldname> <newname>
    ```

* Adding a local branch that tracks a remote branch

    ```shell script
    # Add local branch named `feature` that tracks `tina/project` on GitHub
    git remote -m feature
    git branch feature tina/project
    ```

* Setting the upstream for a branch

    ```shell script
    # Short form
    git branch -u <upstream>,

    # Long form
    git branch  --set-upstream-to=<upstream>
    ```

The branch you are working on has a `*` to identify it.

## The Git Index

When you type `$ git add .` all the files that have been changed are added to
the staging area before a commit, otherwise known as the *index*. The index
contains the entire set of files that will be committed, not just those that
have been changed. After typing `$ git commit` the index *becomes* the next
commit.

Typing `$ git diff` shows the changes that are *not staged* for commit. It shows
you the changes that you have yet to add.

Typing `$ git diff --staged` shows you the changes that *are staged* for commit.
In other words, it shows you the difference between the index and the most
recent commit.

## Merging Branches

You can *branch* off of a current branch, which will create a *new* branch
starting from the *head* (most recent commit) of a current branch, for example:
`master`.

After you have made your changes, you can *merge* the changes back into the
original branch. To do this, first switch into the original branch, and then
type

* Create a new branch that starts from the current commit of `master`, name this
  branch `feature`

    ```shell script
    # Create a new branch and check it out
    git checkout -b 'feature'

    # Reset the working index, create a new branch, and check it out
    git checkout -B 'feature'
    ```

* Add all the changes and commit them

    ```shell script
    git add . && git commit -m 'Make changes'
    ```

* Switch to the previous branch

    ```shell script
    git checkout -
    ```

* Merge the changes of the branch `feature`

    ```shell script
    # Merge the head of 'feature' with that of the current branch 'master'
    git merge 'feature'
    ```

* Abandoning All Changes in Staging Area

    ```shell script
    # Perform a dry-run of the removal
    git rm -n --cached -r *

    # Actually remove the files cached in the staging area
    git rm --cached -r *
    ```

## Commits

* The structure of a commit message

  * **Note:** the first line, the subject, (first line) must be *at most* 50
    columns

  * **Note:** the lines of the body must be *at most* 72 columns

  * Example commit message following these rules:

    ```txt
    Create instances of objects

    * Made a list of numbers in the main method
    * Added a set of values
    * Changed the structure of the binary search tree
    ```

## Commiting Even Faster

Using the `-a` and `-m` flags in conjunction, you can make a commit to a git
repository in a single line. This flag will stage and commit all files that have
been modified, but will not stage any files that are currently untracked.

```shell script
git commit -am "My commit"
```

### Using the OS X Keychain

If you clone repos with `HTTPS` instead of `SSH`, you're required to specify
your username and password every time. That obviously gets old really quickly.
If you're on a mac, you can integrate git with the OS X Keychain so that it
remembers your username and password for future commands.

```shell script
git config --global credential.helper osxkeychain
```

You won't be prompted to specify a username and password. You'll be asked for it
the next time you pull using HTTPS from GitHub

If you ever need to reset this information (for instance, after changing your
GitHub password), use the `erase` command

```shell script
git credential-osxkeychain erase
```

The next time you clone using HTTPS, you will be prompted for your username and
password again.

{{% aside warning %}}
**Warning:** Press return twice. If you don't have any
pre-existing information stored, this may not seem intuitive. If you try to
erase an empty configuration, git will look as if it was running a program. It
actually printed the existing configuration, but that configuration was empty,
so it printed a blank configuration file. `git` is still waiting for user input,
so simply press return again to confirm your erase command.
{{% /aside %}}

![Imgur](https://i.imgur.com/Qj23AFd.jpg)

## Branches

A note on the figure above, node **A** is the *root commit* in this repository.
This is a directed graph, where edges are directed toward the *parent commit*

A *branch* is a collection of all the commits in a graph that trace back to a
tip. The nodes above labeled **F**, **4**, and **Z** are the *tips* of each of
their respective branches.

{{% aside info %}}

**Note:** A single commit can be part of multiple branches.

{{% /aside %}}

* **release**: {A, B, C, X, Y, Z}

* **master**: {A, B, C, D, E, F, 1, 2}

* **topic**: {A, B, 1, 2, 3, 4}

Even after you merge two branches (in the case above, E is created from merging
D and 2) both branches continue to exist.

The first branch is called the *master branch* It has this name by default, and
it does not have any special properties.

### Local Branches

* Delete a branch from the local repository

    ```shell script
    # Short form
    git branch -d <branch>

    # Long form
    git branch --delete <branch>
    ```

### Remote Branches

* Push all local branches to the remote repository

    ```shell script
    git push --all <remote>
    ```

* Delete a branch from a remote repository

    ```shell script
    # Short form
    git push <remote> -d <branch>

    # Long form
    git push <remote> --delete <branch>
    ```

* Delete remote branches that are not present locally

    ```shell script
    git push --prune <remote>
    ```

* Delete all local branches

## Configurations

Your configuration file is stored in a few places.

1. `/usr/local/etc/gitconfig` **System** configuration file, for all users.

* Can be edited with `git config --system --edit`

1. `$XDG_CONFIG_HOME/git/config` **Global** configuration file

* If that is not found, it is set to `~/.config/git/config`

* If that is not found, it is set to `~/.gitconfig`

* Can be edited with `git config --global --edit`

1. `$GIT_DIR/config`

* If that is not found, it is set to `~/.git/config`

* Can be edited with `git config --local --edit`

* View the file associated with the current configurations set

    ```shell script
    git config --list --show-origin
    ```

* View the file associated with a particular configuration

    ```shell script
    git config --show-origin --get-all core.autocrlf
    ```

* Create a custom location for the global `.git/ignore` file

    ```shell script
    git config --global core.excludesfile ~/custom/path/to/my_gitignore
    ```

You can get great suggestions for what should be in a `.gitignore` file, either
locally or globally, by going to
[gitignore.io](https://gitignore.io)

## Abandoning Changes

Abandon all unstaged changes for every file, so that it matches the current head

The Repository, and Committing

The git repository

If you committed something you weren't supposed to, and would like to undo your
changes, use one of these commands

* Roll back the last commit, overwriting the contents of files to their previous
  values the moment directly before the commit was made.

    ```shell script
    git reset --soft HEAD^
    ```

* Roll back the last two commits, overwriting the contents of files to their
  previous values the moment directly more the second-to-last commit was made.

    ```shell script
    git reset --soft HEAD~2
    ```

`"HEAD^` means "the commit before HEAD since you just changed HEAD with the
commit that was made". Other than `HEAD^`, you can specify `HEAD~2` to reference
the *3rd-to-last* commit, and so on. You can go actually go back as many commits
as you would like, you just type in ~3, ~4 etc.

* Abandon all staged and unstaged changes

    ```shell script
    git reset --hard HEAD
    ```

Abandoning all unstaged changes for a specific file

    ```shell script
    git checkout file.txt
    ```

## `hub`

If you host your repositories on GitHub, you should download their command line
tool `hub` which provides useful functionality for managing your GitHub remote
repository directly from your command line.

```shell script
brew install hub
```

Then, add `eval "$(hub alias -s)"` to your `.zshrc` file.

* View open pull-requests for a repository

    ```shell script
    git pr list
    ```

* Check out pull-request #1 (create a new branch with the contents of the pull
  request)

    ```shell script
    git pr checkout 1
    ```

* Submit a pull-request from your remote's branch to their remote branch

    ```shell script
    git pull-request -h myremote:master -b theirs:master -m "Vague commit message"
    ```

* Add two forks as remote branches to the repository

    ```shell script
    git fetch userone,usertwo
    ```

## Creating Signed Commits

Each commit in git is signed by the author of the commit with their
cryptographic signature. Usually, this is SSH, but it can be GPG as well.

* Make a signed commit

    ```shell script
    git commit --gpg-sign
    ```

* Verify the signature of a commit

    ```shell script
    git verify-commit HEAD
    ```

* Merge all commits, but only if all of its commits were signed

    ```shell script
    # Short form
    git merge --verify -S develop

    # Long form
    git merge --verify-signatures --gpg-sign develop
    ```

* Sign the previous commit

    ```shell script
    git commit --amend --no-edit -n -S
    ```

* Sign every commit since `<commit>`

    ```shell script
    git filter-branch --commit-filter 'git commit-tree -S "$@";' <commit>..HEAD
    ```

If you'd like to have GitHub show a `Verified` tag next to your commits, specify
to `git` on your local machine that you'd like to sign your commits locally

```shell script
# List all keys as well as their corresponding key ID
gpg -k --keyid-format LONG
# Specify the key ID for git to use for signing commits
git config --global user.signingkey C1C27DC14DB20F99
# Automatically sign commits
git config --global commit.gpgsign true
```

{{% aside warning %}}
**Note:** You must use a GPG key that uses the RSA 4096
algorithm. To generate a key, follow below
{{% /aside %}}

```shell script
gpg --full-generate-key
```

{..notice--warning :""} **Note:** You'll have to let GitHub know about this new
key. To do so, copy the key ID to your clipboard and paste it inside the GitHub
profile section for GPG keys.

```shell script
gpg -k
gpg --armor --export GitHub | pbcopy
```

## Adding Custom Aliases

```
git config --global alias.stage 'add'
git config --global alias.unstage 'reset'
```

## Direct `git` commands toward different directory

```
git -C ~/dotfiles status
```

## Resolve Merge Conflicts With `vimdiff`

```shell script
git config --global --replace-all git.mergetool vimdiff
git config --global --replace-all merge.conflictstyle diff3
git config --global --replace-all mergetool.prompt false
```

* `]c` - Jump to the next change.

* `[c` - Jump to the previous change.

* `:diffg LO` accept the change from the `local` branch

* `:diffg BA` accept the change from the `base` (ancestor) branch

* `:diffg RE` accept the change from the `remote` branch

Add this to your `~/.vimrc` so that when `vimdiff` is active, you can simply
select window 1, 2, or 3

```vim
if &diff
    map <leader>1 :diffget LOCAL<CR>
    map <leader>2 :diffget BASE<CR>
    map <leader>3 :diffget REMOTE<CR>
endif
```

## Resolve merge conflicts with `code`

Add this to your `~/.gitconfig`

```gitconfig
[merge]
  tool = codemerge
  guitool = codemerge
  conflictstyle = merge
[mergetool "codemerge"]
  cmd = code --wait --diff $MERGED
  trustexitcode = true
  keepbackup = false
```

## View diff with `code`

Add this to your `~/.gitconfig`

```gitconfig
[diff]
  tool = codediff
[difftool "codediff"]
  cmd = code --wait --diff $LOCAL $REMOTE
```

## Environment Variables

* `GIT_AUTHOR_NAME`: the human-readable name in the “author” field.

* `GIT_AUTHOR_EMAIL`: the email for the “author” field.

* `GIT_AUTHOR_DATE`: the timestamp used for the “author” field.

* `GIT_COMMITTER_NAME`: sets the human name for the “committer” field.

* `GIT_COMMITTER_EMAIL`: the email address for the “committer” field.

* `GIT_COMMITTER_DATE`: the timestamp used for the “committer” field.

## Rename Case-Sensitive Files

If you're developing on a macOS environment, and rename a file directory from
`File.txt` to `file.txt`, `git` will not recognize the change. In order to
perform a case-sensitive rename of a version-controlled file, you'll need to do
it in two steps.

```shell script
git mv 'Directory' 'temp'
git mv 'temp' 'directory'
```

## Showing Which Files Are Under Version Control

```shell script
git ls-files
# [ Output ]
# __main__.py
# backtest/backtest.py
# functions/metrics.py
# symbols/spx.yml
# utils/__init__.py
# utils/fetcher.py
```

## Git Commit Messages

* Didn't really know where to put this, but was impressed that it's built in:
  After you've finished writing your commit message, `git` will automatically
  compress consecutive newlines in your commit, and remove any leading or
  trailing whitespace from the commit that was made.

## `git rebase`

* Sign all commits that can be reached from the current head

    ```shell script
    git rebase -i --root --exec 'git commit --amend --no-edit --no-verify -S'
    ```

* Remove every instance of a file from the repository's commit history

  ```shell script
  git filter-branch --index-filter \
    'git rm --cached -f -r --ignore-unmatch <file>' \
    --tag-name-filter cat -- --all
  ```

## `git log`

* Print the hash and description for each commit that ever modified a file named `settings.json`

    ```shell script
    git log --oneline --follow --full-history -- '**/settings.json'
    ```

* Print a graph of the changes made over time across branches and commits to `settings.json`

    ```shell script
    git log --graph -- '**/settings.json'
    ```

* For maximum prettiness, add my personal color format to your Git configuration file

    ```ini
    [color]
    ui = always
    pager = yes
    [blame]
    date = iso-local
    [log]
    date = iso-local
        follow = true
    # showSignature = true
    [format]
    pretty = "%x1b[1;37m(%cs) %x1b[0;3;33m%h %x1b[0;34m[%an]%x1b[0m: %x1b[4;3m%s%n%+b"
    ```

## Git Large File Storage

Git isn't a utility designed for tracking binary files, such as a compiled C
program, or a tarball of an archived directory. For this, one needs to use a
helper utility, called `git-lfs`. This adds `lfs` as a sub-command to `git` and
stores pointers to the binary files in the repository. `git-lfs` is, most
importantly of all, supported by GitHub.

* Prepare a repository for `git lfs` commands

    ```shell script
    git lfs install
    ```

* Track all files ending with `.tgz` file extension

    ```shell script
    git lfs track '*.tgz'
    git add '.gitattributes'
    ```

## Git Submodules

Sometimes you need to use somebody's project as part of your project. It'd be
wasteful to copy all of the revisions of their code base into your git
repository, as you won't be the one making/reversing those edits. Thankfully the
`git submodule` command allows us to use other repositories within our own.

* Initialize repository for submodule support

    ```shell script
    git submodule init
    ```

* Add a submodule to a repository

    ```shell script
    repo='git@github.com:austintraver/homebrew-tap.git'
    git submodule add ${repo} rel/path/to/dest
    ```

* View the status of all submodules

    ```shell script
    git submodule summary
    ```

* To see a list of all patterns currently being tracked by `git-lfs`, run git
  lfs track (with no arguments)

    ```shell script
    git lfs track
    # Listing tracked paths
    # *.bin (.gitattributes)
    ```

## The `log` Subcommand

* View the date that a file was last added/commited

    ```shell script
    git log -1 --format="%ai" -- /path/to/file
    ```

* View the date that files were first added/committed

    ```shell script
    git log --format="format:%ci" --name-only --diff-filter=A
    ```

## GitHub Notes

You can now use `@me` as a filter when performing a search on GitHub. For
example, `is:issue state:open assignee:@me`

## GitHub Wikis

You can clone wikis to your local machine, and then make changes to them as you
would any other code base.

* Cloning the wiki for the `fighton` repo made by user `ttrojan`

    ```shell script
    git clone 'https://github.com/ttrojan/fighton.wiki.git'
    ```

