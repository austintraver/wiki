+++
title = "Java"
description = "Because you have to learn it sooner or later"
date = 2020-02-04T14:52:27-08:00
image = "java.jpg"
+++

* Download `java`

  ```sh
  # macOS
  brew cask install java
  # Debian distro
  apt install default-jdk-headless
  ```

## Running Java in the Terminal

* running a `.java` file

  ```sh
  java <file.java>
  ```

* running a `.jar` file

  ```sh
  java -jar <archive.jar>
  ```

* running `jshell`, Java's **Read Evaluate Print Loop** (REPL)

  ```sh
  jshell
  System.out.println("It works")
  ```

## System Properties

Java’s `​System.getProperty()`​ method allows you to essentially pass in flags to the command line. Every property is a name-value string pair, and you can pass each one in with the following "-D" syntax

```sh
# passing in System Properties
$ java \
  -Dstreet=sesame \
  -Dnetwork=pbs animals.birds.BigBird
```

Within the Java file, you would access the input in the following way

```java
String street = System.getProperty("street"); // "sesame"
String network = SystemgetProperty("network"); // "pbs"
```

## The Classpath

A path is an environment variable, it tells an application where it should look for a certain resource. For your shell, it's `PATH`, for Java, it's `CLASSPATH`.

On a Unix system, you can set the environment variable `CLASSPATH` like so:

* Setting the `CLASSPATH` for Java imports globally:

  ```sh
  # 3 classpath locations. the user's home directory, a jar in another user's directory, and '.' the current directory
  export CLASSPATH = ~/path/to/packages:.
  ```

{{% notice warning %}}
  **Warning:** Don't forget to add the trailing `.` at the end of your list of imports, because that is how to specify the current directory as part of the classpath.
{{% /notice %}}

  Any package directories, located within `~/path/to/packages`, (e.g. `~/path/to/packages/example/Greet.class`) can now be imported with `import example.Greet`

Alternatively, you can use the `-cp` argument when running or compiling a program with `java` or `javac` on your terminal.

* Setting the classpath for Java imports manually:

  ```sh
  # [ Example 1 ]
  java -cp ~/path/to/packages Test.java

  # [ Example 2 ]
  # First, compile the java class inside the "src" directory
  # but create, the .class file in the "bin" directory
  javac src/Practice.java -d bin/
  # Second, run the newly compiled class "Practice"
  # which is located in the "bin" directory
  java -cp ./bin Practice
  ```

## javap

The `​javap`​ command on bash lets you print a description of a compiled class. It will return a description if it is found in the classpath, so if the value returned isn’t expected, you know there must be a problem with your classpath

* Input

  ```sh
  javap java.util.Stack
  ```

* Output

  ```txt
  Compiled from "Stack.java"
  public class java.util.Stack<E> extends java.util.Vector<E> {
    public java.util.Stack();
    public E push(E);
    public synchronized E pop();
    public synchronized E peek();
    public boolean empty();
    public synchronized int search(java.lang.Object);
  }
  ```

## javac

The `​javac`​ command lets you compile a *.java* source file into a *.class* bytecode file. By default, it will store both files in the same directory, so it’s best to use the "-d" option to specify the directory the *.class* file should go into

```sh
# compile one file
$ javac -d /home/austin/Desktop BigBird.java
# compile 2 files
$ javac -d /home/austin/Desktop BigBird.java CookieMonster.java
```

* `-d`: force java to walk the entire tree and check every dependency (fixing this problem) but this will slow down compile time.

## jar

The Java Archive `​jar` utility is very similar in structure to Unix’s Tape Archive `​tar` utility.

Some examples of ways to use the `​jar`​ command are included below.

```sh
# create a jar file
$ jar -cvf Practice.jar bin/Practice.class
# list the contents within a jar
$ jar -tvf Practice.jar
# extract the contents of a jar
$ jar -xvf Practice.jar
```

In archive syntax, the meanings of those flags are as follows:

* `​-c`:​ create archive containing the specified contents
* `-​t`​: tell us what an archive’s contents are
* `​-x`​: extract the contents of an archive
* `​-v`​: verbose output about file information (fileside, modificaiton time, compression ratio)
* `​-f`​: the next input after 'f' will be a filename

{{% notice info %}}
**Tip:** These are the same flags used in the `tar` program on your terminal! No need to remember new flags.
{{% /notice %}}

### The Java API

Every Java implementation contains the following core packages. This is effectively the STL for Java, outlined below

* java.text (text classes)
* java.lang (langauge classes)
* java.io (input output)
* java.net (network classes)
* java.util.concurrent (thread utilities)
* java.util.regex (regular expressions)

## Strings

In Java, strings are immutable. If you call a method that looks like it is changing the string, it is actually returning an entirely different string object.

Basic syntax outlined below

```java
String words = "to be or not to be";
int numChars = words.length();
String firstname = "John";
String lastname = "Smith";
String fullname = firstname + " " + lastname;

// although in C++, strings can span multiple lines...
// ...they can't in Java without this type of workaroudn syntax
String multiline = "Roses are red\n" +
                   "Violets are blue";
```

### C-Style Strings

These still exist in Java, and you can use the following syntax to create a C-style string, or even construct a java.String from a C-style string.

```java
// create a C-string
char[] cstring1 = new char[] {'p','h','d'};
// convert it to C-string to a  java.String
String jeffrey_miller = new String(cstring1);
// convert the java.String to a new C-string
char[] cstring2 = jeffrey_miller.toCharArray();
```

### Primitive Objects -\> Strings

Using the `​valueOf()`​ public static method from java.String we can actually turn primitive objects into a String pretty easily

```java
String one = String.valueOf(1); // "1"
String pi = String.valueOf(3.14f); // "3.14"
String happy = String.valueOf(true); // "true"
```

Every Object has a built n `​.toString()`​ method, so we can also convert an object itself to a string.

```java
Date today = new Date();
// method 1
String ex1 = String.valueOf(today);
// method 2
String ex2 = today.toString();
// method 3
String ex3 = "" + new Date();
```

### Comparing Strings

1. You have two methods you can call on a string object. The `​.equals()`​ method and the `​.equalsIgnoreCase()`​ method

2. Be careful with the `​==`​ method. The code below would return "true" in C++, but "false" in Java, as the `==` operator compares identity in Java.

3. The `​compareTo()`​ method compares the lexical value of two strings. It checks if the input is alphabetically earlier or later in the dictionary to it.

```java
// [part 1]
String one = "hello";
String two = "HELLO";
boolean same1 = one.equals(two); // false
boolean same2 = one.equalsIgnoreCase(two); // true

// [part 2]
String foo1 = "FOO";
String foo2 = String.valueOf(new char[] {'F','O','O'});
boolean same = (foo1 == foo2); // false

// part[3]
String str1 = "abc";
String str2 = "abcd";
String str3 = "123";

// comparisons
str1.compareTo(str2); // -1 (earlier in dictionary)
str2.compareTo(str1); // 1 (further in dictionary)
str3.compareTo(str1); // -48 (str3 comes before)
str3.compareTo(str3); // 0 (equal)
```

### Searching Strings

Strings come with many useful methods built-in:

* `startsWith()` and `endsWith()` provide an easy way to splice a string without dealing with array indeces.
* `​indexOf()`​ lets you find the index of a substring. You can include a string, not just a char, and it will return the index of the first matching char in the substring.
* `​charAt()`​ returns the char of the String at a given index.
* `​contains()`​ checks if a string contains a substring

```java
String name = "Matthew Smith";
boolean name.startsWith("Matt"); // true
boolean name.endsWith("Smith"); // true
int index = name.indexOf("hew"); // 4
char letter = name.charAt(4); // 'h'
```

### Modifying Strings

* `​replace()`: replaces all substrings matching the input String
* `​replaceAll()`​ accepts a regular expression, and replaces all matches
* `​replaceFirst()`​ accepts a regular expression, and replaces the first match
* `​length()`​​ returns the length of a string
* `split()`​ returns an array of strings, given a regular expression as an input

```java
String example = "aBcDe";
System.out.print(example.toUpperCase()); // "ABCDE"
System.out.print(example.toLowerCase()); // "abcde"
System.out.print(example.substring(2,5)); // "cDe"

String template = "Do you know NAME? I hear NAME is great.";
String output = template.replace("NAME","Aaron");
// "Do you know Aaron? I hear Aaron is great."
```

## Date & Time

```java
import java.util.*;
import java.text.*;

public class temp {
  public static void main (String[] args) {
    // Declare an rfc formatting object
    Format rfc = new SimpleDateFormat("yyyy-MM-dd HH:mm:ssXXX");

    // Print the current time, in rfc3339 formatting
    Date now = new Date();
    System.out.println(rfc.format(now));
    // => 2019-08-01 07:00:26-07:00

    // Construct a DateTime from rfc3339 formatting
    Date moment = rfc.parse("2018-01-02 13:01:44+00:00")
    System.out.println()

  }
}
```

{{% notice success %}}
**Update:** As of `java` 8.0, there is a `java.time` library, which provides a much more convenient implementation than manually defining the string syntax.
{{% /notice %}}

```java
import java.time.*;
import java.time.format.*;
```

### Date

```java
LocalDate date1 = LocalDate.now();
LocalDate date2 = LocalDate.parse("2018-04-05");

int year = date2.getYear(); // 2018
int month = date2.getMonthValue(); // 4
int day = date2.getDayOfMonth(); // 5

if (date1.isAfter(date2)){
  // true
}

System.out.println(date2.format(
  DateTimeFormatter.ISO_LOCAL_DATE));
// "2018-04-05"
```

### Time

```java
LocalTime time1 = LocalTime.now();
LocalTime time2 = LocalTime.parse("14:30:02");

OffsetTime time3 = OffsetTime.now();
OffsetTime time4 = OffsetTime.parse("14:30:02-08:00");

int hour = time2.getHour(); // 14
int minute = time2.getMinute(); // 30
int second = time2.getSecond(); // 2

LocalTime earliest = LocalTime.MIN;
LocalTime latest = LocalTime.MAX;

if (earliest.isBefore(latest)){
  // true
}

System.out.println(time2.format(
  DateTimeFormatter.ISO_LOCAL_TIME));
// "14:30:02"
System.out.println(time4.format(
  DateTimeFormatter.ISO_OFFSET_TIME));
// "14:30:02-08:00"
```

### DateTime

```java
LocalDateTime moment1 = LocalDateTime.now();
LocalDateTime moment2 = LocalDateTime.parse("2018-08-04T14:32:11");

OffsetDateTime moment3 = OffsetDateTime.now();
OffsetDateTime moment4 = OffsetDateTime.parse("2018-08-04T14:32:11-08:00");

year = moment2.getYear(); // 2018
month = moment2.getMonthValue(); // 8
day = moment2.getDayOfMonth(); // 4
hour = moment2.getHour(); // 14
minute = moment2.getMinute(); // 32
second = moment2.getSecond(); // 11

if (moment1.isBefore(moment2)) {
  // false
}

System.out.println(moment2.format(
  DateTimeFormatter.ISO_LOCAL_DATE_TIME));
// 2018-08-04T14:32:11
System.out.println(moment4.format(
  DateTimeFormatter.ISO_OFFSET_DATE_TIME));
// 2018-08-04T14:32:11-08:00
```

A java array is an actual class, the `​Java.array`​ class, and can be created one of two ways.

```java
// preferred java style
int[] myArray;
// acceptable C-style
int myArray[];
```

You don’t have to specify the size of your array initially. As it stands, this is just an uninitialized object. You can instantiate the array in the following ways

```java
int[] ArrayOne = new Array[10];
int size = 10;
int[] ArrayTwo = new Array[size];
int[] ArrayThree = {1, 3, 5, 7, 9};
```

Effectively, these two statements below are the same, by default, such that each index within the arrays is set to be `​null`​

```java
int[] A = new int[3];
int[] A = {null, null, null};
```

## Arrays

* Arrays are not limited to a single type, you can have an array of Objects too:

  ```java
  Object[] objects = {10, "ten", null};
  ```

### `​.length`​

* Unlike in `c++`, arrays in `java` are aware of their length, just like in `python`:

  ```java
  int[] myArray = {1, 2, 3, 4};
  int foo = myArray.length; // 4
  ```

### The "For-Each" Loop

* You can iterate through arrays in `java` the same way you do in `c++`

  ```java
  int[] myArray = {1, 2, 3, 4, 5};
  for (int element : myArray){
    System.out.print(element); // 12345
  }
  ```

{{% notice warning %}}
  **Note:** you can’t modify the values of element using this syntax. Calling `​element += 1`​ would not change the values in the array
{{% /notice %}}

### Copying an Array

Using `​System.arraycopy()`​ we can copy the values of the source array to the destination array

```java
String[] arrayOne = {"the", "quick", "brown", "fox"};
String[] arrayTwo = new String[3];
System.arraycopy(arrayOne, 1, arrayTwo, 0, 3);
// arrayTwo is now {"quick", "brown", "fox"}
```

### Multidimensional Arrays

The syntax in `java` is much cleaner than it is in `c++`

```java
Color[][][] rgb = new Color[256][256][256];
rgb[0][0][0] = Color.black;
rgb[255][255][0] = Color.yellow;
```

## Scanner

Contained in the library `​java.util.Scanner`​

Throws an `​InputMismatchException`​ if it find an invalid next item when parsing.

## Formatter

Contained in the `​java.util.Formatter`​ class

Uses the `​.format()`​ method, so `​String.format(String input)`​ will allow you to use the following syntax, similar to Python

`​%s`​ refers to a String value

`​%d`​ refers to an int value

​Will throw `IllegalFormatConversionException`​ if the input does not match the specified value type.

```java
String name = "Austin";
int age = 21;
String message = "My name is %s and I am %d years old.";

String output = String.format(message, name, age);
// My name is Austin and I am 21 years old.
```

## Streams

Streams are contained in the library `​java.io.*`​. A stream is a flow of data, between a `​writer`​ and a `​reader`.

* `InputStream` and `OutputStream`: abstract classes, so to construct one, you must construct one of the classes that instantiates it.

#### Implementations of `InputStream` and `OutputStream`

* `FileInputStream` & `FileOutputStream`
* `ObjectInputStream` & `ObjectOutputStream`
* `PipedInputStream` & `PipedOutputStream`
* `ByteArrayInputStream` & `ByteArrayOutputStream`

## `​I/O`

Uses the `​System.in`​ and `​System.out`​ values to specify where to handle I/O on the terminal

The `​Reader`​ and `​Writer`​ classes will allow us to read in data if we are sure it is from a .txt file

We will use the inherited `BufferedReader`​ and `​BufferedWriter`​ classes to improve the runtime of each.

```java
Reader stdin = new BufferedReader(System.in); // reads in data from std::cin
Writer stdout = new BufferedWriter(System.out); // writes output to std::cout
```

{{% notice danger %}}
**Warning:** be sure to call the `​close()`​ method on a stream when you are done using it.
{{% /notice %}}

### Customizing stdin, stdout, stderr

```java
import java.lang.*;
import java.io.*;

public class Example {

  public static void main(String[] args) throws Exception {

  // initalize a PrintStream that writes to "stdout.txt"
  System.setOut(new PrintStream(new FileOutputStream("stdout.txt")));
  // write to stdout
  System.out.printf("This is stdout\n");

  // initalize a PrintStream that writes to "stderr.txt"
  System.setErr(new PrintStream(new FileOutputStream("stderr.txt")));
  // write to stderr
  System.err.printf("This is stderr\n");

  // initalize an input stream from "stdin.txt"
  System.setIn(new FileInputStream("stdin.txt"));
  }
}
```

### Resolving the Home Directory

```java
import java.lang.*;
import java.io.*;

public class Example {

  public static void main(String[] args) throws Exception {

    String home = System.getProperty("user.home");
    // => "/Users/tommy"

    String old = "~/Documents/file.txt"
    // => "~/Documents/file.txt"

    String new = old.replaceFirst("^~", Matcher.quoteReplacement(home));
    // => "/Users/tommy/Documents/file.txt"
  }
}
```

#### printf()

You can print formatted text to stdout with the following syntax

```java
System.out.printf("The lucky number is, %d", 21);
// prints: The lucky number is 21
```

#### `java.io.File`

This class doesn’t actually contain the API for reading and writing data, just as a way to create the object of a file that can be accessed by readers and writers.

```java
File myFile = new File("/Users/austintraver/Desktop/helloworld.txt");
boolean test1 = myFile.isFile(); // true
File myDirectory = new File("/Users/austintraver/Desktop");
boolean test2 = myFile.isDirectory(); // true

File relativePathDirectory = new File("../gamedata");
boolean test3 = myFile.isAbsolute(); // false
File relativeFile = newFile(relativePathDirectory, "filename.txt");
```

If any of these files are not found, the program will **not** throw a `​FileNotFoundException`​. You can, however, use the `​.exists()`​ method to make sure that your code structure is valid. You can also use the `​.isFile()`​ method, the `.isDirectory()`​ method, and the `​.isAbsolute()`​ method. The following attributes of the file can also be returned to you:

* `​.getName()`​ returns a `String` for the filename, but does not include the directory information
* `.getPath()`​ returns a `String` for the path, relative or absolute
* `.getAbsolutePath()`​ returns a `String` representing the absolute path (a little funky when converted from a relative path)
* `.getParent()`​ returns a `File` representing the parent directory of the `File`

```java
File ifile = new File("../gamedata/sample.txt");
ifile.getAbsolutePath(); // /Users/austintraver/repo/src/../gamedata/sample.txt
ifile.getPath(); // ../gamedata/sample.txt
```

Be careful, because these will still print even if the file does not return true for `​`​the `.exists()`​ method, the `​.isFile()`​ method, etc.

The `​.length()`​ method will return an integer representing the size of a file (in bytes)

The `​.list()`​ method will return a `​String[]`​ object.

If you want a `​File[]`​ object, use the `​.listFiles()`​ method.

Note, this list will not be sorted.

#### Creating, Deleting, Changing Directories

* `​File.mkdir()`​ will create a single directory, so the intermediate path must already exist. Returns `false` if it fails to create the directory
* `​File.mkdirs()`​ will create as many directories as it needs. Returns `false` if it fails to create the directory.
* `File.renameTo()`​ can change the name of a file or directory
* `​File.delete()`​ can delete a file or directory
* `​File.canRead()`​ checks if a file is readable
* `​File.canWrite()`​ checks if a file is writable
* `File.​toUrl()`​ generates a URL object for the file or directory

#### Reading a File

To read in from a file, you will use a `​FileReader`​ object
To write to a file, you will use a `​FileWriter`​ object

```java
try {
  File directory = new File("../gamedata");
  File ifile = new File(directory, "sample.txt");
  FileReader fr = new FileReader(ifile);
  BufferedReader br = new BufferedReader(fr);
  String line = br.readLine();
  while(line != null) {
    System.out.printf("Next line is %s\n", line);
    line = br.readLine();
  }
} catch (FileNotFoundException fnfe) {
    System.out.printf("IOException: %s", fnfe.getMessage());
} finally {
    br.close()
  }
}
```

#### Writing a File

Use the `​FileWriter`​ object, which accepts two arguments, a `​File`​ and a `​boolean`​ that specifies if we should append. The `​BufferedWriter`​ class can be used to speed up the execution of `FileWriter` methods.

* `​.write(String input)`​: writes the string `input` to the file
* `​.close()`​ flushes the stream and closes the writer

```java
try {
  File directory = new File("../gamedata");
  File ofile = new File(directory, "test.txt");
  // "true" specifies for this writer to *append* to the file
  BufferedWriter writer = new BufferedWriter(
    new FileWriter(ofile, true));
  String line = "test";
  writer.write(line);
  writer.close();
} catch (FileNotFoundException fnfe) {
  System.out.printf("FileNotFoundException: %s\n", fnfe.getMessage());
} catch (IOException ioe) {
  System.out.printf("IOException: %s\n", ioe.getMessage());
}
```

### Making an ArrayList of Files

The constructor for the `ArrayList` will only accept a `Collection`​ as an input.

Use the `​List`​ method `​.listFiles()`​ which returns a `​List[]`​ object, pass that into the `​Arrays`​ static method `.asList`​ which accepts an `​Array[Object]`​ as an argument.

```java
File inputdir = new File("../gamedata");
ArrayList<File> files = new ArrayList<File>(
  Arrays.asList(inputdir.listFiles()));
```

### Selecting a random element in a list, and then removing it

Take advantage of the `​Random`​ class. You can create a `​Random`​ object and use the `​.nextInt(lo,hi)`​​ method to call it.

```java
List<String> myList = Lists.newArrayList("one", "two", "three", "four");
Random rand = new Random();
while (myList.size() > 0) {
  int index = rand.nextInt(myList.size());
}
```

## JDBC

Sun Microsystems developed JDBC, a single API for database access. JDBC allows a Java programmer to connect to any SQL database. Results from the database are returned as Java objects. The procedure to use JDBC goes as follows

  ```java
  // import the JDBC library
  import java.sql.*;

  public class Example {
    // [Member Variables] for class 'Example', used in calls to SQL Database

    // Connection,
    Connection connection = null;
    Statement select = null;
    PreparedStatement prepared_statement = null;
    String sqlServer = "jdbc:mysql://localhost";
    String sqlDatabase = "WeatherMeister";
    String sqlUsername = "root";
    String sqlPassword = "root";
    String connectionURL = sqlServer+"/"+sqlDatabase;

    // given the userID, return all recorded database
    public static String getSearchHistory(int userID) {
      try {
        // try to connect to the database with this username and password
        connection = DriverManager.getConnection(connectionURL, sqlUsername, sqlPassword);
        // using our connection in the database, create a statement
        // we can use this statement to execute a query to the database
        statement = connection.createStatement();
        statement.executeQuery("SELECT * FROM WeatherMeister.Users where userID < 10");
        statement.executeQuery("SELECT * FROM WeatherMeister.Users where userID < 10");
      }
    }
  }
  ```

### `​java.sql.DriverManager`

This is a static class that allows us to create a connection. It has two useful methods

1. ​`getDrivers()`​: show what available drivers we have.
2. `​getConnection(String url, String username, String password)`​: returns a Connection object, which represents our connection to the database. This will throw a `SQLException` if it can not find a driver that exists, or it cannot connect to the database.

### `​java.sql.Connection`

A connection object represents a conection to a specific database in the SQL server. We can use it to send multiple consecutive queries to the same database. A SQL connection is created from the `DriverManager` class's `getConnection()` method.

### `​java.sql.Statement`

​A statement object represents a SQL statement. You can create a statement object by calling the `Connection` class's `createStatement()` method

A statement object can be used to execute a query to the server. To execute a query to be sent to the server, call the `Connection` class's `​executeQuery()`​ method. The return type of this method is a `ResultSet` object, explained below.

​The statement object can also be used to update data in the server. To execute a update to be sent to the server, call the `​executeUpdate()`​ method. The return type of this method is an int, which represents the number of rows affected by the `​INSERT`​ , `​UPDATE`​ , or `​DELETE`​​ call that was made.

### `​java.sql.ResultSet`

​An object returned by calling a `​Statement`​ object’s `​executeQuery()`​`​`​ method. This object will contain the information that the SQL database returned from our `executeQuery()`​ call. We can access the data from each key-column by specifying either the key-column name or the key-column index, (starting at 1). Also, it’s important to call the `​wasNull()`​ method after calling `​executeQuery()` to see if a valid result was returned.

```java
import java.sql.* ;

// Create a connection to the database
​Connection connection = DriverManager.getConnection(
  "jdbc:mysql://localhost/DatabaseName", "myUsername", "myPassword");

// Create a statement object capable of executing queries and updates
Statement statement = connection.createStatement();

// Create a result object to store what is returned by statements
ResultSet result = null;

// Execute a query on the database
result = statement.executeQuery(
  "SELECT * FROM myTable WHERE userID > 10")​;

// Execute an update on the database
​result = statement.executeUpdate(
  "INSERT INTO myTable VALUES ('Barack','Obama'), ('Donald', ’Trump')");

// Print the result, assuming it was not null
if (!result.wasNull()){
  System.out.print(result.getString());
}

// Close the connection to the database
connection.close();
```

{{% notice info %}}
**Tip:** a single call to a Connection object’s `​close()`​ method will implicitly call the `​close()`​ method on any existing `Statement` objects that exist. Closing those will implicitly call close on any `​ResultSet`​ objects that exist. Therefore, the only cleanup to perform at the end of a function is to call `connection.close()`
{{% /notice %}}

### Datatypes `SQL` vs. `java`

| `SQL` Type | `java` Type |
| :---: | :---: |
| `BIT` | `boolean` |
| `INT` | `int` |
| `REAL` | `float` |
| `FLOAT` | `double` |
| `DOUBLE` | `double` |
| `VARCHAR` | `java.lang.String` |
| `DATE` | `java.sql.Date` |
| `TIME` | `java.sql.Time` |
| `TIMESTAMP` | `java.sql.Timestamp` |

{{% notice info %}}
**Tip:** to convert `SQL` to `java` in terms of time, use the `java.sql.Timestamp` class, as it's capable of converting a `java.util.Date` object down to nanosecond granularity.
{{% /notice %}}

## Networking

The `​java.net`​ package contains the classes that pertain to communications and working with networked resources.

* `Socket`
* `ServerSocket`
* `DatagramSocket`

### Sockets

​Sockets are an interface, which allows for a stream of data to be transmitted between two hosts (or two localhosts).

The ​`​Socket`​ classes allow to work with low-level internet protocols, as well as high level web-oriented APIs that work with "uniform resource locators" (URLs). Most forms of I/O use streams, and a Socket is no exception. It’s just another type of stream.

Java’s most basic type of socket is the simple `​Socket`​ class, which uses a *reliable*, *lossless*, and *connection-oriented* protocol known as the **Transmission Control Protocol** (TCP). After establishing a connection, two applications can send streams of data back and forth. The connection will remain online even if no data is being transmitted from either side.

### ​Datagrams

A datagram is a unit of transfer sent from one network to another. Unlike other protocols, datagrams are sent without a connection established between the two networks. It’s like sending mail without a return address. No way of knowing if it delivered, no backup plan if the address it is being sent to doesn’t exist.

The `​DatagramSocket`​ class uses a connectionless, unreliable protocol, known as the *User Datagram Protocol* (UDP)

### ServerSocket

The *client* is the one who initiates the conversation, and the *server* is the one who accepts the request.

A client can create a `​Socket`​ and initiate a conversation with a server application at any time, but a server must create a `​ServerSocket`​ in advance in order to be able to listen to new requests.

A `​ServerSocket`​ will contain multiple `​Socket`​ objects within it, one for each connection that it currently contains.

### Forming a Connection

Each `​Socket`​ needs a *hostname* and a *port number* in order to connect with a server. The hostname can be "usc.edu" or just the ip address "128.125.253.136"

* **Port Number**: An identifier, used to differentiate between the multiple clients that are currently interacting with the same host.

* **Exceptions**: Constructing a Socket can throw two exceptions:
  1. `​UnkownHostException`​ if the server can’t be found
  2. `​IOException`​ if it can’t connect to what it found

A `​Socket`​ can create the `​InputStream`​ and `​OutputStream`​ objects by calling its methods `​.getInputStream()`​ and `​.getOutputStream()`​ respectively.

These streams transfer binary data, so it’s useful to wrap them with the

```java
try {
  // Create a socket for port 25, the SMTP port
  Socket mySocket = new Socket("usc.edu", 25);

  // Use that socket to create a reader and a writer
  BufferedReader istream = new BufferedReader(mySocket.getInputStream());
  BufferedWriter ostream = new BufferedWriter(mySocket.getOutputStream());

  // Write something to the output stream
  ostream.write("Hello!\n");

  // Read something from the input stream
  String response = istream.readLine();

  // Handle any exceptions that may occur
} catch (IOException ioe) {
  System.out.prinf("Error: %s", ioe.getMessage());
} catch (UnknownHostException uhe) {
  System.out.prinf("Error: %s", uhe.getMessage());
}
```

### `ServerThread` Implementation

```java
public class ServerThread extends Thread {

  // Create a web server, an input stream, and an output stream
  private BufferedReader bufferedReader;
  private PrintStream printStream;
  private WebServer webServer;

  // Create a directory to serve the html from
  private final String htmlDir = "/Users/tommy/Desktop/";

  public ServerThread(Socket socket, WebServer webServer) {

    // Create a reader and a writer, attach it to this webserver
    this.webServer = webServer;
    this.bufferedReader = new BufferedReader(
      new InputStreamReader(socket.getInputStream()));
    this.printStream = new PrintStream(
      new BufferedOutputStream(socket.getOutputStream()));

    // Start thread.
    // Start in constructor to ensure we can instantiate
    // BufferedReader and PrintWriter
    this.start();
  }

  private void sendFile(File file) {

    // === BEGIN HTTP Headers ===
    this.printStream.print("HTTP/1.1 200 OK\n");
    this.printStream.print("Content-Type: text/html; charset=utf-8");
    this.printStream.print("\r\n\r\n"); // Terminate HTTP Headers
    // === END HTTP Headers ===

    InputStream inputStream = new FileInputStream(file);

    int b = inputStream.read(); // 1 byte
    while (b != -1) {
      printStream.write(b);
      b = inputStream.read();
    }
    // Flush the stream now that we're done reading input
    printStream.flush();
  }

  private void notFound() {

    // === BEGIN HTTP Headers ===
    printStream.print("HTTP/1.1 404 Not Found\n");
    printStream.print("Content-Type: text/html; charset=utf-8");
    printStream.print("\r\n\r\n"); // Terminate HTTP Headers
    // === END HTTP Headers ===

    InputStream inputStream = new FileInputStream(
      this.htmlDir + "/error.html");

    int b = inputStream.read()
    while (b != -1) {
      printStream.write(b);
      b = inputStream.read();
    }
    // Flush the stream now that we're done reading input
    printStream.flush();
  }

  public void run() {

    // Grab first header to see HTTP method
    // And file requested
    String line = this.bufferedReader.readLine();
    String[] data = line.split(" ");

    // Attempt to grab file
    File file = new File(this.htmlDir + data[1]);

    if (file.exists()) {
      this.sendFile(file);
    }
    else {
      this.notFound();
    }
  }
}

```

### Sending Files To Client From A Web Servers

```java
ServerSocket serverSocket = null;
// 6789 is the port number of the ServerSocket
serverSocket = new ServerSocket(6789);
// Wait for a browser HTTP GET request
while (true) {
  // 'Socket' is a bidirectional connection between the client and the server
  Socket socket = serverSocket.accept();
  // Create a thread connecting this server to the socket
  ServerThread serverThread = new ServerThread(socket,this);
}
```

### Custom Iterator

I created an instantiator of the `Iterator` interface, called `Range`, which allows you to iterate through a range of numbers in a similar syntax to Python. If you're trying to implement a custom `Iterator`, then this code will be useful to get started.

```java
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.lang.IllegalArgumentException;

public class Range implements Iterable<Integer> {
  public final int start, stop, step;

  // Construct a range of numbers starting at "0", ending at "stop"
  public Range(int stop) {

    this.start = 0;
    this.stop = stop;
    this.step = 1;

  }

  // Construct a range of numbers, starting at "start", ending at "stop"
  public Range(int start, int stop) {

    this.start = start;
    this.stop = stop;
    this.step = 1;

  }

  // Construct a range of numbers with a "step" component
  public Range(int start, int stop, int step) {

    // Handle edge case, step of magnitude `0` is specified
    if (step == 0) {
      throw new IllegalArgumentException("Range() arg 3 must not be zero");
    }

    this.start = start;
    this.stop = stop;
    this.step = step;
  }

  // Return an Iterator through the Range of Integers
  public RangeIterator iterator() {

    return new RangeIterator(this);

  }

}

class RangeIterator implements Iterator<Integer> {

  // Constructor will provide an immutable Range object
  private final Range range;
  // The `current` value being iterated through
  private Integer current;

  // Constructor, establishes the Range and initial value
  public RangeIterator(Range range) {

    this.range = range;
    this.current = range.start;

  }

  // Check if there is a next element to iterate to
  public boolean hasNext() {

    // For positive step, check that the upper bound has not been reached
    if (this.range.step > 0) {
      return (this.current + this.range.step < this.range.stop);
    }

    // For negative step, check that the lower bound has not been reached
    else {
      return (this.current + this.range.step > this.range.stop);
    }

  }

  // Iterate to the next element, return its value
  public Integer next() {

    if (this.hasNext()) {
      this.current += this.range.step;
      return (this.current);
    }

    // Edge case, there is no next element and this method was called
    else {
      throw new NoSuchElementException("Range() has no next element");
    }

  }

}
```

## HashMap

```java
import java.util.*;
import java.io.*;

// Import these two functions into the namespace to save typing
import static java.lang.System.out;
import static java.lang.System.err;

public class test {
  public static void main(String[] args) {

    HashMap<Character, String> map = new HashMap<Character, String>();

    map.isEmpty(); // true

    map.put('a', "alpha");
    map.size(); // 1

    map.get('a'); // "alpha"

    map.put('b', "beta");
    map.replace('b', "bravo");

    HashMap<Character, String> innerMap = new HashMap<Character, String>();
    innerMap.put('c', "charlie");
    innerMap.put('d', "delta");

    // Put all of the objects in the inner HashMap into the outer HashMap
    map.putAll(innerMap);
    out.printf("%d\n", map.size());

    // Make a set out of all the keys of the HashMap
    HashSet<Character> set = new HashSet<Character>(map.keySet());

    set.isEmpty(); // false
    set.size() // 4
    set.remove('c');
    set.contains('a'); // true
    set.clear(); // empties the set
    set.add('e'); // add a new element to the set


  }
}
```

## Double-Brace Constructor Syntax

You can construct Java collection objects using the double brace `{{ }}` syntax, which makes the initialization of the values more concise.

```java
  HashMap<String, Object> map = new HashMap<String, String>(){{
      put("title", "Ancient Map");
      put("description", "A rusty old map.");
      put("price", 19.99);
  }};
```


# Unique IDs

The builtin `UUID` class from `java.util.UUID`, provides a convenient way to generate a unique 128-bit identifier for an object. This is useful when you're serializing an object, and inserting it into a database, where you need a way to reference it at a later point in time by your application.

* Create a unique ID

  ```java
  import java.util.UUID
  UUID id = UUID.randomUUID();
  ```

## MongoDB

Putting this here for future reference, doing MongoDB databases in Java is tricky.

```java
package com.mongodb;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.diagnostics.logging.Loggers;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Connection {

    public static void main(String[] args) {
        Logger.getLogger(Loggers.PREFIX).setLevel(Level.WARNING);
        String connectionString = System.getProperty("mongodb.uri");
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            List<Document> databases = mongoClient.listDatabases().into(new ArrayList<>());
            databases.forEach(db -> System.out.println(db.toJson()));
        }
    }
}
```

```java
package com.mongodb;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.InsertManyOptions;
import com.mongodb.diagnostics.logging.Loggers;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;

import static java.util.Arrays.asList;

public class Create {

    private static final Random rand = new Random();

    public static void main(String[] args) {
        Logger.getLogger(Loggers.PREFIX).setLevel(Level.WARNING);
        try (MongoClient mongoClient = MongoClients.create(System.getProperty("mongodb.uri"))) {

            MongoDatabase sampleTrainingDB = mongoClient.getDatabase("sample_training");
            MongoCollection<Document> gradesCollection = sampleTrainingDB.getCollection("grades");

            insertOneDocument(gradesCollection);
            insertManyDocuments(gradesCollection);
        }
    }

    private static void insertOneDocument(MongoCollection<Document> gradesCollection) {
        gradesCollection.insertOne(generateNewGrade(10000d, 1d));
        System.out.println("One grade inserted for studentId 10000.");
    }

    private static void insertManyDocuments(MongoCollection<Document> gradesCollection) {
        List<Document> grades = new ArrayList<>();
        for (int classId = 1; classId <= 10; classId++) {
            grades.add(generateNewGrade(10001d, classId));
        }

        gradesCollection.insertMany(grades, new InsertManyOptions().ordered(false));
        System.out.println("Ten grades inserted for studentId 10001.");
    }

    private static Document generateNewGrade(double studentId, double classId) {
        List<Document> scores = asList(
          new Document("type", "exam").append("score", rand.nextDouble() * 100),
          new Document("type", "quiz").append("score", rand.nextDouble() * 100),
          new Document("type", "homework").append("score", rand.nextDouble() * 100),
          new Document("type", "homework").append("score", rand.nextDouble() * 100)
        );
        return new Document("_id", new ObjectId())
          .append("student_id", studentId)
          .append("class_id", classId)
          .append("scores", scores);
    }
}

```
