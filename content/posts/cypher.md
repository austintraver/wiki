---
title: Cypher
date: 2020-07-20T15:56:04-07:00
description: "The only Graph query language that doesn't suck."
image: "cypher.jpg"
draft: true
---

# Useful Commands

* Count up all nodes with the label `Account`

```cypher
MATCH (n:Account) RETURN COUNT(n);
```

* Change the label of every `Account` node to `Customer`

```cypher
MATCH 
  (n:Account) 
WITH 
  COLLECT(n) 
AS 
  accounts 
CALL 
  apoc.refactor.rename.label('Account', 'Customer', accounts) 
YIELD 
  errorMessages 
AS 
  errors 
RETURN 
  errors;
```

* Delete all nodes of a given label

```cypher
MATCH (n:Bubble) DELETE n
```

* List the users on a server

```cypher
:server user list
```

* Add a user to the server

```cypher
:server user add
```

* List the system information

```cypher
:sysinfo
```

* List the databases

```cypher
:dbs
```


