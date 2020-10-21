---
title: Php
description: "A very descriptive description indeed"
date: 2020-10-17T22:03:55-07:00
draft: false
---

# PHP

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

    ```sh
    docker run -P --name phpguy -v ${PWD}:/var/www/html php:rc-apache
    ```

### MySQLi

* Installing the extension `mysqli` from a container of the Docker `php:latest` image:

    ```sh
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

```sh
docker run \
    -P \
    -v ${PWD}:/var/www/html \
    --name 'myphpcontainer' \
    -p 80:80 \
    --sysctl net.ipv4.ip_unprivileged_port_start=0 \
    php:rc-apache
```


## JSON

Making a SQL query and converting it into JSON isn't too rough.

```php
<?php

// Generate a SQL query, submit it, and save the results
// -------------------------
// Print the SQL statement
$sql = "SELECT * FROM temporary_table;";
// -------------------------
// Print the query results
echo "<samp>";
$results = $mysqli->query($sql);
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
        let rows = <?php echo json_encode($rows); ?>
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
