# Using Essential Tools

## `hostname`

  ```txt
  us-west-2.compute.internal
  ```

* Print the short host name

  ```sh
  # -s [--short]
  hostname -s
  ```

* Print the DNS domain name

  ```sh
  # -d [--domain]
  hostname -d
  ```

  ```txt
  ip-172-31-47-228
  ```

* Print the long host name (fully qualified domain name)

  ```sh
  # -l [--long] [--fqdn]
  hostname -l [--long]
  ```

  ```txt
  ip-172-31-47-228.us-west-2.compute.internal
  ```

* Print the IP address for the host

  ```sh
  # -i --ip
  hostname --ip
  ```

  ```txt
  172.31.47.228
  ```

## `last

The last command shows a list of the last logged in users

```sh
last
```

```txt
ec2-user pts/0        45.144.81.36     Thu Jun  4 21:01   still logged in   
ec2-user pts/0        45.144.81.36     Thu Jun  4 21:00 - 21:00  (00:00)    
ec2-user pts/0        45.144.81.36     Thu Jun  4 20:58 - 20:58  (00:00)    
reboot   system boot  4.14.177-139.254 Thu Jun  4 20:11 - 21:18  (01:07)    

wtmp begins Thu Jun  4 20:11:08 2020
```
