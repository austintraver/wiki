+++
title = "SQL"
description = "The structured query language"
date = 2020-02-04T07:22:16-08:00
image = "sql.png"
+++

# SQL

## MySQL

MySQL is an open source version of SQL that allows you to store & query a database both locally and remotely.

The first few lines of code are from inside your terminal, but the rest of the commands will be run from within the MySQL shell, which opens once you've logged in.

Installing `mysql`

```sh
brew install mysql
```

Starting up the `mysql` Server

```sh
brew services start mysql
```

Stopping the `mysql` Server

```sh
brew services stop mysql
```

{: .notice--warning}
**Note:** This is assuming you installed `mysql` using `brew` (and why wouldn't you?)

Export a Database to `.sql` File

```sh
mysqldump -u [username] -p [database name] > [database name].sql
```

Execute a `sql` script on a Database

```sh
mysql -u root -p db_name < script.sql > output.tab
```

The commands below will require you to log into your `mysql` server, which you can do by typing in the following command.

### Logging into a `mysql` Server

Connecting to MySQL server from the command line

```shell
# [Local MySQL Server]
mysql -u root
# [Remote MySQL Server]
mysql \
-h myremoteserver.amazonaws.com \
-P 3306 \
--user="root"
--password="root"
# -P refers to port 3306
```

Connecting to MySQL server from `NodeJS`

```javascript
const connection = mysql.createConnection({
  host: "myremoteserver.amazonaws.com",
  user: "admin",
  password: "CorrectHorseBatteryStaple",
  database: "mydb"
})
```
## `SQL` Clauses

### `AS`

The keyword `AS` lets you alias, or define names for the values returned from a query.


```sql
SELECT COUNT(*) AS rows FROM db.name
```

## `DISTINCT`

* You can use the `DISTINCT` keyword to get the number of unique values for a key-column.

{: .notice--warning}
If you use the `DISTINCT` keyword, it will apply to *all* fields that are being selected from.

```sql
SELECT COUNT(DISTINCT year) FROM db.name
```


### `ORDER BY`

```sql
/* Order by a single field */
SELECT DISTINCT states FROM my_table ORDER BY state DESC
/* Order by multiple fields */
SELECT DISTINCT states, names FROM my_table ORDER BY states, names
```

* By default, the `ORDER BY` statement will order by `ASC` but you can still include the `ASC` if you would like to.


{: .notice--warning}
**Note:** Always put the `ORDER BY` statement at the end of your query.

### `LIMIT`

The keyword `LIMIT` can be used to set a maximum number of matches for a query to return

```sql
/* Select only the first 100 results */
SELECT * FROM my_table LIMIT 100
```

### `WHERE`

The `WHERE` clause filters down results, and is always put after the `SELECT` clause

```sql
SELECT state FROM `my_table` WHERE state='CA'
SELECT name, gender FROM `my_table` WHERE name='Austin' AND gender='M'
```

### `OR`

```sql
SELECT trip_duration from my_table WHERE
(trip_duration >= 3 AND trip_duration <= 5)
OR (trip_duration >= 7 AND trip_duration <= 9)
```

### Listing with the `,` Keyword

You can make a list of values, as if you were using multiple `OR` statements
```sql
SELECT age from my_table WHERE age = (3,5,7,9)
```

### `LIKE`

The `LIKE` operator uses the `%` character to help specify substrings to match with

* `%ex%` matches any string containing `ex`
* `ex%` matches any string beginning with `ex`
* `%ex` matches any string ending with `ex`

The `LIKE` operator uses the `_` character to match a single character

* `_r%` matches any string with `r` as the second character
* `%_r` matches any string with `r` as the second-to-last character
* `a__%` matches any string, of length 3, starting with `a`

Fancy combinations

* `a%o` matches any string that starts with `a` and ends with `o`?

### `lower()`

The `lower()` function will convert a key-column's values to lower case.

```sql
SELECT lower(name) FROM my_table WHERE name='austin'
```

* Useful when you're trying to make a query case-insensitive

### `TIMESTAMP`

The `TIMESTAMP` value-type is used to save time in SQL.

```sql
SELECT
  cast(time_of_event as DATE) as date_of_event,
  extract(year FROM year_of_event) as year_of_event,
  extract(month FROM year_of_event) as month_of_event,
  extract(week FROM year_of_event) as week_of_event,
  extract(day FROM year_of_event) as day_of_event
  extract(hour FROM year_of_event) as hour_of_event,
  extract(minute FROM year_of_event) as minute_of_event,
  extract(second FROM year_of_event) as second_of_event
```

The `extract()` function is part of `MySQL` but the support works in many languages.

### `GROUP BY`

Count the number of children named Emily in every state, for the year 1999

```sql
SELECT
  name,
  SUM(number) as sum_number
FROM
  `bigquery-public-data.usa_names.usa_1910_current`
WHERE
  year = 1999
  AND name = 'Emily'
GROUP BY
  name
```

Rank the most popular names of 2010

```sql
SELECT
  name,
  sum(number) as sum_number
FROM
  `bigquery-public-data.usa_names.usa_1910_current`
WHERE
  year = 2010
GROUP BY
  name
ORDER BY
  sum_number DESC
```

## `HAVING`

The `HAVING` clause is similar to the `WHERE` clause, but it is used when referring to data that was aggregated by the `GROUP BY` clause.

Show all female names with at least 1,000,000 occurrences

```sql
SELECT
  name,
  sum(number) as sum_number
FROM
  `bigquery-public-data.usa_names.usa_1910_current`
WHERE
  gender = 'F'
GROUP BY
  name
HAVING
  sum_number > 1000000
```

## Aggregate Functions

Grouping is useful for more than just taking the `SUM()` of a group, the syntax can also be applied to `MAX()` and `MIN()`

Find the most expensive trip taken for each payment type:

```sql
SELECT
  payment_type,
  MAX(trip_total) AS max_trip_total
FROM
  my_table
GROUP BY
  payment_type
ORDER BY
  payment_type
```

Find the shortest person in the table of medical records:

```sql
SELECT
  gender,
  MIN(height) AS min_height
FROM
  medical_records
GROUP BY
  gender
```

Find the average height in the table of medical records:

```sql
SELECT
  gender,
  AVG(height) as avg_height
FROM
  medical_records
GROUP BY
  gender
```

Find the total net worth of each industry

```sql
SELECT
  industry,
  SUM(wealth) as sum_wealth
FROM
  wealth_data
GROUP BY
  industry
```

### Combining `GROUP BY` and `WHERE`

```sql
SELECT
  payment_processor,
  SUM(purchase) as sum_purchase
FROM
  credit_card_payments
WHERE
  payment_processor IN ('Visa', 'Mastercard')
GROUP BY
  payment_processor
```

{: .notice--warning}
**Note:** The `WHERE` clause must come before the `GROUP BY` clause, because the `WHERE` clause is filtering the data set that `GROUP BY` will apply to.

### Grouping by Multiple Columns

The `GROUP BY` clause can apply to more than one column. If more than one column is specified, it will form a group among entries that share the same value in *every column* specified within the `GROUP BY` clause.

```sql
SELECT
  name,
  state,
  SUM(number) AS total_with_name
FROM
  `bigquery-public-data.usa_names.usa_1910_current`
GROUP BY
  name,
  state
ORDER BY
  total_number_of_people DESC
```

### `ROUND()`

The `ROUND()` clause can be used to reduce the granularity of a floating point number. It accepts two arguments:
1. A floating point value
2. The # of decimal points to include

```sql
SELECT
  name,
  ROUND(AVG(duration),2) AS average_duration
FROM
  swim_times
```

### `COUNT()`

* You can use `COUNT(*)` to determine the number of records in the table.
* You can use `COUNT(column_name)` to determine the number of rows in the table that contain a value for that key-column name.

{: .notice--warning}
**Note:** Make sure to use `AS` to alias the name of the column returned by this value, as by default it will return some junk name, such as `f0_`

### `JOIN`

The `JOIN` clause is used to merge two tables together

The most common types of joins are, `INNER JOIN`, `OUTER JOIN`, `LEFT JOIN`, and `RIGHT JOIN`

1. `INNER JOIN`: Returns all entries with matching values in both tables
2. `OUTER JOIN`: Returns all entries with matching values in either table
3. `LEFT JOIN` Returns all entries in the left table, and the matching records in the right table
4. `RIGHT JOIN` Returns all entries in the right table, and the matching records in the left table

Create a joined table containing every customer's name, the order ID, and the order date

```sql
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID
```



### Managing Databases

Creating a database

```sql
CREATE DATABASE my_database;
```

Showing available databases

```sql
SHOW DATABASES;
```

Deleting a database

```sql
DROP DATABASE if exists my_database;
```

Opening a database

```sql
USE my_database;
```

{: .notice--success}
**Tip:** This command even works if you're already inside a different database!

### Database Tables

Showing the tables currently in a database

```sql
SHOW TABLES;
```

Removing a table

```sql
DROP TABLE this_table;
```

Renaming a table

```sql
RENAME TABLE this_table TO new_table_name;
```

There are multiple ways that you can show/describe the Various Key-Columns in a Table

```sql
/* [Option 1] */
DESC MyTable;
/* [Option 2 ]*/
SHOW COLUMNS FROM MyTable;
/* [Option 3] */
SHOW COLUMNS FROM MyDatabase.MyTable;
/* [Option 4] */
SHOW FULL COLUMNS FROM MyTable IN MyDatabase;
/* "FULL" provides more detail */
```

Creating a table in a database

```sql
CREATE TABLE Users (
  user_id INT(4) PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  pass VARCHAR(20) NOT NULL
);
```


Specifying default values for a table's key-columns

```sql
CREATE TABLE Example (
	number INT(4) DEFAULT -1,
	word VARCHAR(10) DEFAULT '',
	# specify a number with 6 digits max, of which 2 may be decimal points
	latitude FLOAT(6,2) DEFAULT 0.00
	longitude FLOAT(6,2) DEFAULT 0.00
);
```


Inserting a single record into a table

```sql
INSERT INTO Searches (search_query) VALUES ('whoami');
```

Inserting a multiple records into a table at once

```sql
INSERT INTO Searches (search_query)
	VALUES ('also'), ('who are you'), ('and'), ('what\'s good');
```

Finding the most recent search

```sql
SELECT * FROM Searches
	WHERE search_id=(SELECT MAX(search_id) FROM Searches);
```


### Foreign Keys

Creating a table with foreign keys

```sql
CREATE TABLE Searches (
	search_id INT(4) PRIMARY KEY AUTO_INCREMENT,
	user_query VARCHAR(100) NOT NULL,
	user_id INT(4) NOT NULL references Users(user_id)
	# the foreign "Key column" (in this case userID) can have a different name than the column that it referenced
);
```

Reference a foreign key

```sql
SELECT userQuery FROM Users U, Searches S WHERE u.userID = s.userID AND s.userID = 1 ORDER BY searchID DESC;
```

Removing a foreign key from a table

```sql
ALTER TABLE this_table DROP FOREIGN KEY my_foreign_key;
```

Changing a key-column name in a table

```sql
ALTER TABLE this_table CHANGE old_column_name new_column_name VARCHAR(10);
```

Adding a key-column to a table

```sql
ALTER TABLE this_table ADD new_column_name VARCHAR(10);
```

### Managing Users

Looking up the current user using `mysql`

```sql
SELECT CURRENT_USER(); # Show current user
SELECT user FROM mysql.user; # Show all users
```

Changing a user’s password for `mysql`

```sql
SET PASSWORD FOR 'root'@'localhost' = 'root';
```


Setting timezone in `mysql`

```sql
SET GLOBAL time_zone = '+00:00'; # set SQL's global time-zone value to UTC (London);
SET time_zone = '+08:00'; # set SQL's session time-zone value to PST (California);
```

Converting a time-zone in `mysql`

```sql
SELECT CONVERT_TZ('2012-06-07 8:53:23', '-05:00', '+00:00');
/*
Convert the timestamp from it's "from_timezone" -05:00 (PST) to the "to_time
zone" UTC time. It was 8:53 in California, which was (output: 13:53) in London
 */
```

### Misc

Creating a table that uses timestamps

```sql
CREATE TABLE Searches (
	search_id INT(4) PRIMARY KEY AUTO_INCREMENT,
	search_query VARCHAR(100) NOT NULL,
	period TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


Supporting UTF-8 encoding

```sql
SELECT SCHEMA_NAME 'database', default_character_set_name 'charset', DEFAULT_COLLATION_NAME 'collation' FROM information_schema.SCHEMATA;
```

{: .notice--success}
**Update:** If you're using `mysql` version 8 or later, this option is chosen by default.

## Database Administration

* Create a user named `jeffrey` who can log in from anywhere

  ```sql
  -- Option 1, implied wildcard hostname
  CREATE USER 'jeffrey'
  -- Option 2, explicit wildcard hostname
  CREATE USER 'jeffrey'@'%'
  ```

* Create a user named `tommy` who can only log in locally

  ```sql
  CREATE USER 'tommy'@'127.0.0.1'
  ```

* Allow a user to perform all database administration commands

  ```sql
  GRANT ALL PRIVILEGES ON * . * TO 'jeffrey'
  -- Flushing the active permissions causes these changes to take effect
  FLUSH PRIVILEGES
  ```

* Change password of user `tommy`

  ```sql
  -- Change tommy's password to "letmein"
  ALTER USER 'tommy'@'127.0.0.1' IDENTIFIED BY 'letmein';
  ```

* Display information about all known users

  ```sql
  SELECT user,host,password from mysql.user;
  ```

## MySQL Configurations

Configurations to the `mysqld` daemon process that starts a server on port `3306` can be specified by making changes to the file `/etc/my.cnf` (or sometimes, `/etc/mysql/my.cnf`)

An example configuration file is included below

```txt
# This is a comment

# Read by both the client and the server
[client-server]
!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mariadb.conf.d/

# Read by the server
[mysqld]
port = 3306
bind-address = 0.0.0.0

# Comment out the line below if you want a database that does not accept remote connections
# skip-networking
```
