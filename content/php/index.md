---
title: Php
description: "A very descriptive description indeed"
date: 2020-10-17T22:03:55-07:00
draft: false
---

# PHP

Welcome to the page on PHP. First things first, you'll need to [install PHP][php
installation].

## PHP and Docker

PHP has a lot of dependencies, causing some to prefer running PHP in a
container. You can use Docker in Phpstorm, which I learned to do by following
their post "Quickstart with Docker in PhpStorm which included both an
[article][PhpStorm Docker quickstart]
and a
[video][JetBrainsTV PhpStorm Docker]. The
containers recommended by PhpStorm for use with
[zero-configuration debugging][PhpStorm zero-configuration debugging]
can be found in the
[PhpStorm Docker registry]

## Configuration

To add custom configurations to your PHP environment, you'll need to modify [the
PHP configuration file: `php.ini`][php.ini]. To set a custom location for the
`php.ini` file, set the `PHPRC` environment variable to whatever filepath you'd
like your `php.ini` file to be located.

[php.ini]: https://www.php.net/manual/en/configuration.file.php
[PhpStorm xdebug]: https://www.jetbrains.com/help/phpstorm/2020.2/configuring-xdebug.html?#downloadAndInstall
[xdebug install]: https://xdebug.org/docs/install
[php installation]: https://www.php.net/manual/en/install.php

* Setting a custom location for `php.ini`

    ```shell script
    export PHPRC=/path/to/php.ini
    ```

* Setting a custom prompt:

    ```ini
    [php]
    cli.prompt = "(\\b) \\> "

    ; This is a comment
    ```

## Extensions

* Display the currently loaded extensions:

    ```shell script
    php -m
    ```

* Check if a particular extension is loaded

    ```shell script
    ext='json'
    php -r "var_dump(extension_loaded('${ext}'));"
    ```

* Running a Docker container of an Apache web server `php:rc-apache`
running PHP on the backend

    ```shell script
    docker run -P --name phpguy -v ${PWD}:/var/www/html php:rc-apache
    ```


## Printing values

### Echo

I learned reading the [PHP documentation on `echo`][php echo] that echo has a
shortcut syntax.

```php
I have <?=$foo?> foo.
```

### Heredocs

I recommend reading the [PHP documentation on strings][php string] they explain
it far better than I could

### MySQLi

* Installing the extension `mysqli` from a container of the Docker `php:latest` image:

    ```shell script
    docker-php-ext-install mysqli
    ```

* Establishing a database connection

    ```php
    <?php
    $hostname = "303.itpwebdev.com";
    $username = "atraver";
    $password = "want2usecli";
    $database = "atraver_project_db";

    // Create an instance connected to the database
    $mysqli = new mysqli($hostname, $username, $password, $database);
    if ($mysqli->connect_errno) {
        // Print an error message
        echo $mysqli->error;
        exit();
    }

    ?>
    ```

* Closing a database connection

    ```php
    <?php
    $mysqli->close();
    ?>
    ```

{{% aside info %}}

**Tip:** PHP will, by default, close the MySQL connection on its own when it
reaches the end of the page, it's just good to including the `close()` is just
a matter of good practice, passed down to me by professors.

{{% /aside %}}

## PhpStorm

I'm not sure if this is always the case, but when I created a Docker container
 `php:rc-apache` in PhpStorm, it deployed to port `32771` on my local machine.
 It's easier if I just have port 80 route directly to the Docker container
 of the PHP server.

To fix this, update the Run/Debug configurations for the Docker application.
The final command should look like this:

```shell script
docker run \
    -P \
    -v ${PWD}:/var/www/html \
    --name 'myphpcontainer' \
    -p 80:80 \
    --sysctl net.ipv4.ip_unprivileged_port_start=0 \
    php:rc-apache
```

## Debugging PHP with xdebug

You should really use a debugger when working on projects that use PHP. I mean,
echoing [`var_dump`][php var_dump] and [`var_export`][php var_export] can only
get you so far. For this reason, I recommend Xdebug, which seems to be the most
popular debugger. To download it, check out [the Xdebug installation
guide][xdebug install], or just copy the command below:

* Installing Xdebug

    ```shell script
    brew install php@7.4
    pecl install xdebug
    ```

Next, to edit PHP, I recommend using Jetbrain's IDE for PHP: PhpStorm. It's
worth noting that you can [set up Xdebug on PhpStorm][PhpStorm xdebug]. I found
the [JetBrainsTV PhpStorm Video Tutorial][JetBraintsTV PhpStorm tutorial]
helpful for setting up the debugger in my IDE. To get `xdebug` up and running,
you'll need to add a section titled `[xdebug]` to your `php.ini` configuration
file.

```dosini
[xdebug]
zend_extension="/usr/local/opt/php@7.4/pecl/20190902/xdebug.so"
; Turns on remote debugging across the board
xdebug.remote_enable=on
; Whatever IP address makes the request, send the request back to that host
; This works whether it's local, remote, or a Docker container
xdebug.remote_connect_back=on
; xdebug runs on port 9000
xdebug.remote_port = 9000
```

* `remote_enable=on` turns on remote debugging across the board

* `remote_connect_back=on` returns responses to requests back to the host that
  requests originated from, whether it was a local host, a remote host, or a
  Docker container.

By default, xdebug will not work unless you add the query string
`XDEBUG_SESSION=PHPSTORM` to every request made in the browser, or set it in the
browser's cookies. Shouldn't there be web extensions that make this easier for
me? Yes there should be, and yes there are! I know of extensions for
[Firefox][Xdebug addon Firefox]. Simply
[Chrome][Xdebug addon Chrome] and
[Safari][Xdebug addon Safari] press <kbd>⇧ ⌥ X</kbd> to toggle the cookie in your session.

## JSON

Making a SQL query and converting it into JSON isn't too rough.

```php
<?php
// Generate a SQL query, submit it, and save the results
// -------------------------
// Print the SQL statement
$sql = "SELECT * FROM temporary_table;";
$results = $mysqli->query($sql);
// -------------------------
// Print the query results
echo "<samp>";
var_dump($results);
echo "</samp>";
// -------------------------
// Return one result (row) as an associative array
while ($row = $results->fetch_object()) {
    $rows[] = $row;
}
?>
<!DOCTYPE html>
<html>
<head>
    <script>
        let rows = <?=json_encode($rows);?>
        console.log(rows)
    </script>
</head>
<body>
</body>
```

## HTTP Requests

An example of getting a GET request from a form
whose action is `form.php` and method is `GET`

```php
<?php

// This is an associative array
var_dump($_GET);

var_dump($_GET["email"]);

?>
```

For a PHP-hosted server, files above the *document root* means they cannot be
accessed publicly by a URL or Web Address (unless you create a script that
specifically serves them).

## MAMP

I learned PHP taking USC's course "ITP 303: Full-Stack Development", where we
were taught to use MAMP. JetBrains wrote a
[PhpStorm MAMP tutorial]

[php echo]: https://www.php.net/manual/en/function.echo.php
[PhpStorm Docker registry]: https://hub.docker.com/u/phpstorm/
[PhpStorm zero-configuration debugging]: https://www.jetbrains.com/help/phpstorm/zero-configuration-debugging.html
[JetBrainsTV PhpStorm Docker]: https://www.youtube.com/watch?v=bWbXMy_mxxE&feature=youtu.be
[PhpStorm Docker quickstart]: https://blog.jetbrains.com/phpstorm/2018/08/quickstart-with-docker-in-phpstorm/
[Xdebug addon Safari]: https://github.com/kampfq/SafariXDebugToggle
[Xdebug addon Chrome]: https://chrome.google.com/extensions/detail/eadndfjplgieldjbigjakmdgkmoaaaoc
[Xdebug addon Firefox]: https://github.com/BrianGilbert/xdebug-helper-for-firefox
[php var_export]: https://www.php.net/manual/en/function.var-export.php
[php var_dump]: https://www.php.net/manual/en/function.var-dump.php
[JetBraintsTV PhpStorm tutorial]: https://www.youtube.com/watch?v=rqDDJfG6ip4&list=PLQ176FUIyIUbfeFz-2EbDzwExRlD0Bc-w&index=2
[PhpStorm MAMP tutorial]: https://www.jetbrains.com/help/phpstorm/2020.2/installing-an-amp-package.html#tutorial-integrating-mamp-with-product
[php string]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc

## Composer

I've been told that
[Composer](https://getcomposer.org/) is a useful tool for managing PHP
dependencies. You can download it on macOS with the following command:

```shell script
brew install composer
```

