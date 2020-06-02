+++
title = "AWS"
description = "Amazon Web Services"
date = 2020-02-04T14:52:26-08:00
image = "aws.jpg"
+++

# AWS

## Getting Started

### Installing AWS

* On macOS:

  ```sh
  curl 'https://awscli.amazonaws.com/AWSCLIV2.pkg' -o 'aws.pkg'
  installer -pkg aws.pkg -target /
  mv '/usr/local/aws-cli' '/usr/local/opt/aws'
  ln -sf '/usr/local/opt/aws/aws' '/usr/local/bin/aws'
  ```

### Enabling Command Completion

* On macOS:

  Add the following to your `~/.zshrc`

  ```sh
  if (( ${+commands[aws]} )) {
    autoload bashcompinit
    bashcompinit
    complete -C '/usr/local/opt/aws/aws_completer' 'aws'
  }
  ```

### Uninstalling AWS

* On macOS:

  ```sh
  rm '/usr/local/opt/aws'
  rm -- /usr/local/bin/*(-@)
  ```

* IAM: Identity Access Management. Controls what users can do in their AWS environment.
* VPC: Virtual Private Cloud. The networking hub, here is where we open ports, create subnets, etc.
* AMI: Amazon Machine Image. An image of an operating system, the starting point for launching instances.
* EC2: Elastic Compute Cloud. Virtual servers running in the cloud.
* EBS: Elastic Block Store. Storing data on virtual drives.
* EFS: Elastic File Service.
* S3: Simple Storage Service.
* RDS: Relational Database Service.

## AWS Services

1. Computing
  - EC2
  - Lambda
  - Elastic Beanstalk

2. Networking
  - VPC
  - Route 53

3. Storage
  - S3
  - Cloudfront
  - Glacier
  - EFS

4. Security
  - IAM
  - KMS


## AWS Global Infrastructure


* Region: A collection of AZs.
* AZ: Availability Zone. Multiple data centers clustered in a region.

## EC2

EC2, Amazon's Elastic Compute Cloud, is a virtual server that can perform computations remotely. The compute capacity is easy to resize, and you only pay for the computing capacity that is used.

## AWS CLI

{{% notice success %}}
**Tip:** If you ever need help for a given command, the documentation is surprisngly robust for this program, so suppress that urge to go to Stack Overflow! You can type `help` after any subcommand and a manual page will appear to explain the available functionality.
{{% /notice %}}

```sh
aws configure --profile tommy
```

The AWS Console will check for these variables in your shell environment:

1. `AWS_ACCESS_KEY_ID` otherwise specified in `~/.aws/credentials` or inside `~/.aws/config` as `aws_access_key_id`
2. `AWS_SECRET_ACCESS_KEY` otherwise specified in `~/.aws/credentials` or inside `~/.aws/config` as `aws_secret_access_key`
3. `AWS_SESSION_TOKEN` otherwise specified in `~/.aws/credentials` or inside `~/.aws/config` as `aws_session_token`
4. `AWS_PROFILE` otherwise specified with `aws --profile tommy`
5. `AWS_DEFAULT_REGION` otherwise specified with `aws --region us-east-1` or inside `~/.aws/config` as `aws_default_region`
6. `AWS_DEFAULT_OUTPUT` otherwise specified with `aws --output json` or inside `~/.aws/config` as `aws_default_output`

This is an example addition to `~/.aws/config`

```
[profile example]
aws_access_key_id=foo
aws_secret_access_key=bar
```
This is an example addition to `~/.aws/credentials`

```
[example]
aws_access_key_id=foo
aws_secret_access_key=bar
```

This is an example addition to `~/.profile`

```sh
export AWS_DEFAULT_OUTPUT='json'
export AWS_DEFAULT_REGION='us-west-2'
export AWS_ACCESS_KEY_ID='foo'
export AWS_SECRET_ACCESS_KEY='bar'
```

{{% notice danger %}}
**Warning:** Any environment variables set in your shell, such as in the code snippet above, will override the configurations set in `~/.aws/config` and `~/.aws/credentials`
{{% /notice %}}

## `--query`

When output is returned by AWS, it's in the form of JSON. Query uses JMESPath, a query language for JSON, with library support in all popular programming languages.

## AWS SageMaker

AWS SageMaker allows you to make cloud-hosted Jupyter notebooks, which can easily be connected to S3 buckets and EC2 instances available on your account.

You can use Amazon's SDK for Python, known as `boto3` to perform operations between AWS services within a `python` script, such as a Jupyter notebook. This is an example of pulling a JSON file from the S3 bucket `tamagotchi` to the SageMaker notebook `neopets`

```py
# Import the AWS SDK boto3
import boto3
s3 = boto3.resource('s3')

# Print all of the available S3 buckets
for bucket in s3.buckets.all():
  print(bucket.name)

# Specify the name of the S3 bucket
bucket = s3.Bucket('tamagotchi')

# List all of the objects in a bucket
for obj in bucket.objects.all():
  print(obj.key)

# Download the S3 file, and save it to the Jupyter notebook
bucket.download_file('/s3bucket/path/to/sample.json', '/path/to/sample.json')

# Open the file inside the Jupyter notebook
my_file = open('/path/to/sample.json')
import json
my_object = json.load(my_file)

# View properties of the object
print(my_object)
```

{{% notice danger %}}
**Warning:** Be sure to use the `.download_file()` method first, as you can't access the S3 bucket's version directly, (or so I believe).
{{% /notice %}}

Uploading a file to an S3 bucket can be done as follows:

```py
import boto3
s3 = boto3.resource('s3')
bucket = s3.Bucket('tamagotchi')

# Upload file 'example.json' from Jupyter notebook to S3 Bucket tamagotchi
bucket.upload_file('/local/path/to/example.json', '/remote/path/to/example.json')
```

Deleting the objects in an S3 bucket can be done as follows:

```py
import boto3
s3 = boto3.resource('s3')
bucket = s3.Bucket('tamagotchi')
request = {
  "Objects": [
    {
      "Key": "sample.json"
    }
  ],
  "Quiet": True
}

# Delete all of the objects specified by keys in the "Objects" array
response = bucket.delete_objects(request)
```

Deleting an S3 bucket can be done as follows:

```py
import boto3
s3 = boto3.resource('s3')
bucket = s3.Bucket('tamagotchi')

# Delete the S3 bucket named tamagotchi
bucket.delete()
```

{{% notice warning %}}
**Note:** You won't be able to delete a bucket until all of the objects within it have been deleted as well.
{{% /notice %}}

## IAM

Vocabulary:

- Amazon Resource Number (ARN)
- Identity Access Management (IAM)


IAM Policy Structure has a few key components:

- Principal: The entity to allow or deny access to. `arn:aws:iam:123456789012:user/username`
- Action: The type of access to allow or deny `s3:GetObject`
- Resource: The AWS resource the action will be performed on.
- Condition: The conditions in which the request is valid, such as the IP as coming from.

By default, all permissions are denied. It must be specifically allowed. If the action you are trying to perform is being denied, it could be a result of the policy's surrounding any of the above components. Maybe the current ARN doesn't have permission for that action, or it would if a different condition was in place.

Types of Policies:

- AWS Organizations: Contain Service control policies (SCPs)
- AWS Identity Access Management
- AWS Security Token Service (STS)
- Virual Private Cloud (VPC) Endpoints

## AWS S3

* Create an S3 Bucket

  ```sh
  aws s3 mb s3://mybucket
  ```

* Add an item to S3 Bucket

  ```sh
  aws s3 cp file.txt s3://mybucket
  ```

* Add a folder (and all its items) to S3 Bucket

  ```sh
  aws s3 cp folder/ s3://mybucket
  ```

* Add all of the items in a folder to S3 Bucket

  ```sh
  aws s3 cp --recursive ./folder/ s3://mybucket
  ```

* View the permissions of an object in an S3 Bucket

  ```sh
  aws s3api get-object-acl --bucket 'mybucket' --key 'file.txt'
  ```

* Grant anonymous read access to an object in an S3 Bucket

  ```sh
  aws s3api put-object-acl --bucket 'mybucket' --key 'file.txt' --acl 'public-read'
  ```

* Pull the associated torrent file

  ```sh
  aws s3api get-object-torrent --bucket 'mybucket' --key 'file.txt' !#^.torrent
  ```

* Now anyone can download the torrent file `file.txt.torrent` over HTTPS (works from web browser as well)

  ```sh
  curl 'https://mybucket.s3.amazonaws.com/file.txt?torrent' > ~/Downloads/file.txt.torrent
  ```

* Add the torrent to [transmission](https://helpful.wiki/transmission)

  ```sh
  transmission-remote -a ~/Downloads/file.txt.torrent
  ```

## AWS Lambda

* Call the lambda function named `my-lambda-function`, supplying it with three arguments

  ```sh
  aws lambda invoke \
    --function-name 'my-lambda-function' \
    --payload \
      '{
        "name": "Tommy",
        "age": 18,
        "job": "student"
      }' \
    /dev/stdin
  ```

## EC2

* Whitelist Port `22` for IP `45.144.81.36` on the account's EC2 instances

    ```sh
    aws ec2 \
        authorize-security-group-ingress \
        --group-name 'aws_security_group' \
        --protocol tcp \
        --port 22 \
        --cidr "45.144.81.36/32"
    ```

* Allocate an elastic public IP address

    ```sh
    aws ec2 allocate-address
    ```

* Describe elastic public IP addresses:

  ```sh
  aws ec2 describe-addresses --public-ips
  ```

* Release the IP address associated with a given allocation ID

  ```sh
  aws ec2 release-address --allocation-id 'eipalloc-0adf787bf251776d3'
  ```

## Configure

[Documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/configure/set.html)

* Launch the AWS CLI configuration wizard

    ```sh
    aws configure wizard
    ```

* Import credentials from a CSV file

    ```sh
    aws configure import --csv file://path/to/creds.csv
    ```

* Change the default region

    ```sh
    # Default profile
    aws configure set default.region us-west-2

    # Specific profile
    aws configure set region us-west-1 --profile tommy
    ```

* Change the default output to YAML

    ```sh
    aws configure set default.output yaml
    ```

* Launch the SSO configuration program

    ```sh
    aws configure sso
    ```

It's worth noting that you can specify which SSO profile name to use in two different ways:

    1. By passing a name to the `--profile` option, (e.g. `--profile tommy`)

    2. By assigning a name to the environment variable `AWS_DEFAULT_PROFILE`

* Clearing SSO credentials

    ```sh
    aws sso logout
    ```

## Cloud9

AWS has an in-browser IDE called Cloud9, which you can power using an existing EC2 instance. Supposedly it supports pair programming as well.

## Organizations

* Create a new organization

```sh
aws organizations create-organization
```
