---
title: Ruby
description: "Write it fast, run it slow"
date: 2020-02-04T14:52:27-08:00
---

# Ruby

**If you're looking for a programming language that values productivity over optimization, then Ruby is definitely for you.**

+ Ruby syntax is intuitive and has striking resemblance to the English language.
	+ So, if you are like me and did poorly in English class as a child, this is a win-win to brush up on grammar rules and Ruby.
	+ Otherwise, have a fun time learning Ruby and mastering it in no time.


## Getting Started

```sh
# macOS
brew install ruby
# Debian
apt install ruby-full
```

{{% aside danger %}}
**Warning:** You're not done! `brew` won't add `ruby` to `/usr/local/bin`. Instead, it adds it to `/usr/local/opt/ruby/bin/ruby`. Currently, calls made to `ruby` and `gem` will default to the system's version of ruby, instead of the one installed with `brew`. To fix this, add `/usr/local/opt/ruby/bin` to the beginning of your `${PATH}`
{{% /aside %}}

## Input/Output

*aka I/O - it's not rocket science, just computer science*

Basic input is read in from the command line

```ruby
var_name = gets.chomp  #command line input
```

There are two types of print statements in ruby:

1. print - no newline
2. puts - adds a newline after output

```ruby
var_string = "Welcome to the wiki"
print var_string	#1. no newline
puts var_string		#2. w/ newline
```

## String Manipulation

Ruby includes given methods for various string manipulation techniques. Calling any of the following methods with the last character as '!' modifies the string in place vs. creating a copy.

1. Create uppercase string - *.upcase*

```ruby
to_upper = "John".upcase
to_upper.upcase!
```
2. Create lowercase string - *.downcase*

```ruby
to_lower = "Cameron".downcase
to_lower.downcase!
```
3. Create reverse string - *.reverse*

```ruby
rev = "Austin".reverse
rev.reverse!
```
4. Create string with first char capitalized- *.capitalize*

```ruby
first_capped = "Chase".upcase
first_capped.upcase!
```

## Conditional Statements


`if`/`elsif`/`else` blocks check if statements evaluate as true.

```ruby
a = "Yes"
b = "No"

if a == "Yes"
	print "a wins"
elsif b == "No"
	print "b wins"
else
	print "NGL ... so confused RN Bruh"
end
```

`unless`/`else` blocks check if statements evaluate as false.

```ruby
a = false
unless a
	print "a loses"
else
	print "a wins"
end
```

Ruby also supports ternary conditional expressions and case statements. The following three code blocks are identical in practice.

*In my opinion, ternary conditional expressions tend to have a cleaner syntax.*

```ruby
#global variable for consistency --> Not Good in Practice
a = true

#Classic Conditional Expression
if a == true
	print "a wins"
else
	print "a loses"
end

#Ternary Conditional Expression
print a == true ? "a wins" : "a loses"

#Case Conditional Statement
case a
	when a == true
		puts "a wins"
	else
		puts "a loses"
end
```

## Data Structures

*Coming Soon Friends...*

## Managing Gems

### Updating Gems

Check if any gems need to be updated

```sh
gem outdated
gem update <gem_name>
```

By default, ruby will keep old versions of gems, so after updating, it's good to run the `cleanup` command

```sh
gem cleanup
```

### Uninstalling Gems

Find where a gem is installed

```sh
gem which <gem_name>
```

Uninstall a single gem

```sh
gem uninstall <gem_name>
```

Uninstall all gems with no confirmation

```sh
gem uninstall -aIx
```

## Bundler

Nowadays bundler is built into Ruby 2.6, so keep on using it.

## Jekyll

### Previewing the website

It's a good idea to make sure the website looks correct before pushing your repository to GitHub. You can do that by running the following command inside the root directory of your project

```sh
bundle exec jekyll serve
```

You can close the server by issuing the following command in any directory

```sh
pkill jekyll
```

## Variable Substitution

You can substitute variables inside of strings using the `#{varname}` syntax:

```rb
name = "tommy"
puts "Hello, #{name}!"
# => `Hello, tommy!`
```

## Heredoc

```rb
# Use `<<-` to preserve leading whitespace
puts <<-EOF
  one
    two
      three
    four
  five
EOF
```

Since Ruby 2.3, the `<<~` heredoc strips leading whitespace

```rb
# Use `<<~` to strip leading whitespace
def make_doc(body)
  <<~EOF
  <html lang="en-US">
    <body>
      #{body}
    </body>
  </html>
  EOF
end
```
