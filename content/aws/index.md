---
title: AWS
description: "Amazon Web Services"
date: 2019-07-04T14:52:26-08:00
draft: false
---

# AWS

* Installing AWS on macOS:

    ```shell
    curl 'https://awscli.amazonaws.com/AWSCLIV2.pkg' -o 'aws.pkg'
    installer -pkg aws.pkg -target /
    mv '/usr/local/aws-cli' '/usr/local/opt/aws'
    ln -sf '/usr/local/opt/aws/aws' '/usr/local/bin/aws'
    ```

* Installing AWS on macOS:

    ```shell
    rm '/usr/local/opt/aws'
    rm -- /usr/local/bin/*(-@)
    ```

## Command Completion

* Enabling completion for Zsh:

    ```shell
    # Add this to `~/.zshrc`
    if (( ${+commands[aws]} )) {
      autoload bashcompinit
      bashcompinit
      complete -C '/usr/local/opt/aws/aws_completer' 'aws'
    }
    ```

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


### Common Acronyms

* IAM: Identity Access Management. Controls what users can do in their AWS environment.
* VPC: Virtual Private Cloud. The networking hub, here is where we open ports, create subnets, etc.
* AMI: Amazon Machine Image. An image of an operating system, the starting point for launching instances.
* EC2: Elastic Compute Cloud. Virtual servers running in the cloud.
* EBS: Elastic Block Store. Storing data on virtual drives.
* EFS: Elastic File Service.
* S3: Simple Storage Service.
* RDS: Relational Database Service.


## AWS Global Infrastructure


* Region: A collection of AZs.
* AZ: Availability Zone. Multiple data centers clustered in a region.


* Cloud computing allows *on-demand delivery* of computing resources on a *pay as you go* model

* AWS, GCP, and Microsoft Azure are part of the *public cloud*
    * Worth noting that companies like Rackspace offer *private cloud* services

* Five characteristics of cloud computing:
    1. On-demand self-service: provision resources without human interaction
    1. Broad network access: access resources from anywhere in the world through the internet
    1. Multi-tenancy and resource pooling
    1. Rapid elasticity and scalability
    1. High availability

* Cloud computing lets you trade capital expenses (or *CAPEX*) with operational expenses (or *OPEX*)
    * Reduces the total cost of ownership (or *TCO*)

## Types of Cloud Computing

* Infrastructure as a Service (IaaS)
    * Provides networking, computers, data storage, space
    * Example: *AWS EC2*

* Platform as a Service (PaaS)
    * Provides a platform that allows developers to build, run, and manage applications
    * Example: *Heroku*, *Elastic Beanstalk*, *Google App Engine*

* Software as a Service (SaaS)
    * Complete product that is run and managed by a service provider
    * Example: *Calendly*, *Gmail*, *Zoom*

---

* In 2019, AWS had $35.02B in annual revenue, and accounts for 47% of the cloud computing market (Microsoft in 2nd with 22%)

* [Cool website](https://infrastructure.aws)

## Regions

* Some AWS services are global-scoped
    * Identity and Access Management (IAM)
    * Route 53 (DNS Service)
    * CloudFront (Content Delivery Network)
    * WAF (Web Application Firewall)

* Most AWS services are region-scoped
    * EC2
    * Lambda

* A region is a cluster of data centers

* Each region has between 2 and 6 availability zones, usually 3
    * `us-west-2a`
    * `us-west-2b`
    * `us-west-2c`

* Each availability zone is one or more discrete data centers with redundant power, networking, and connectivity

* You can view the *AWS Region Table* to see if a service is available in a region.

### AWS Points of Presence (Edge Locations)

* AWS has over 200 edge locations, over 10 regional caches, located in 80+ cities across 20+ countries
* These *edge locations* and *regional caches* combine to form Amazon's *points of presence*

## AWS IAM

* Identity and Access Management (IAM)

* Users are people within your organization, and can be grouped

* Groups cannot contain other groups inside of them

* Users can belong to multiple groups, or no groups at all

* Users and Groups are assigned *policies*, which is a JSON document

* The *least privilege principle*, don't give a user more permissions than he needs

## EC2

EC2, Amazon's Elastic Compute Cloud, is a virtual server that can perform computations remotely. The compute capacity is easy to resize, and you only pay for the computing capacity that is used.

* Create AWS EC2 RSA Private Key

    ```shell
    aws ec2 create-key-pair > ~/.ssh/aws_key.pem \
      --key-name 'aws' \
      --query 'KeyMaterial' \
      --output 'text'

    chmod 400 ~/.ssh/aws_key.pem
    ```

* Describe the existing EC2 RSA Keys

    ```shell
    aws ec2 describe-key-pairs --key-name 'aws'
    ```

* Describe existing VPCs

    ```shell
    aws ec2 describe-vpcs
    ```

* Describe existing VPC Subnets

    ```shell
    aws ec2 describe-subnets
    ```

* Describe existing security groups

    ```shell
    aws ec2 describe-security-groups
    ```

* Create an EC2 instance

    ```shell
    aws ec2 run-instances \
      --count 1 \
      --image-id 'ami-0e34e7b9ca0ace12d' \
      --instance-type 't3.micro' \
      --key-name 'id_aws' \
      --security-group-ids 'sg-0efcc5d86ade500ec' \
      --subnet-id 'subnet-13bcff58'
    ```

Recently, AWS announced [support for Mac EC2 instances](https://aws.amazon.com/blogs/aws/new-use-mac-instances-to-build-test-macos-ios-ipados-tvos-and-watchos-apps/). What's more, these instances aren't limited to using the computer exclusively through the console. You can even [connect to your instance using VNC](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-mac-instances.html#mac-instance-vnc).

* Create an [EC2 instance running macOS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-mac-instances.html#mac-instance-launch)

    ```shell
    aws ec2 allocate-hosts --instance-type mac1.metal \
    --availability-zone us-east-1a --auto-placement on \
    --quantity 1 --region us-east-1
    ```

{{% aside warning %}}

Warning: This is very expensive! These instances require a 24-hour minimum, and [cost $25] last I checked.

{{% /aside %}}

## AWS CLI

{{% aside success %}}
**Tip:** If you ever need help for a given command, the documentation is
surprisngly robust for this program, so suppress your urge to race to
Stack Overflow! You can type `help` after any subcommand, which will summon
a manual page that explains the available functionality.
{{% /aside %}}

```shell
aws configure --profile tommy
```

The AWS Console will check for these variables in your shell environment:

1. `AWS_ACCESS_KEY_ID` otherwise specified in `~/.aws/credentials` or inside `~/.aws/config` as `aws_access_key_id`
2. `AWS_SECRET_ACCESS_KEY` otherwise specified in `~/.aws/credentials` or inside `~/.aws/config` as `aws_secret_access_key`
3. `AWS_SESSION_TOKEN` otherwise specified in `~/.aws/credentials` or inside `~/.aws/config` as `aws_session_token`
4. `AWS_PROFILE` otherwise specified with `aws --profile tommy`
5. `AWS_DEFAULT_REGION` otherwise specified with `aws --region us-east-1` or inside `~/.aws/config` as `aws_default_region`
6. `AWS_DEFAULT_OUTPUT` otherwise specified with `aws --output json` or inside `~/.aws/config` as `aws_default_output`

* Example `~/.aws/config`

    ```txt
    [profile example]
    aws_access_key_id=foo
    aws_secret_access_key=bar
    ```

* Example `~/.aws/credentials`

    ```txt
    [example]
    aws_access_key_id=foo
    aws_secret_access_key=bar
    ```

* Example `~/.zprofile` 

    ```shell
    typeset -gx AWS_DEFAULT_OUTPUT='json'
    typeset -gx AWS_DEFAULT_REGION='us-west-2'
    typeset -gx AWS_ACCESS_KEY_ID='foo'
    typeset -gx AWS_SECRET_ACCESS_KEY='bar'
    ```

{{% aside danger %}}
**Warning:** Any environment variables set in your shell, such as in the code
snippet above, will override the configurations set in `~/.aws/config`
and `~/.aws/credentials`
{{% /aside %}}

## `--query`

When the AWS CLI returns output, it's typically formatted as JSON. You can
use `--query` supplied with JMESPath, a query language for JSON.

## AWS SageMaker

AWS SageMaker allows you to make cloud-hosted Jupyter notebooks, which can
easily be connected to S3 buckets and EC2 instances available on your account.

You can use Amazon's SDK for Python, known as `boto3` to perform operations
between AWS services within a `python` script, such as a Jupyter notebook.


* Pulling a JSON file from the S3 bucket `example`

```py
# Import the AWS SDK boto3
import boto3
s3 = boto3.resource('s3')

# Print all of the available S3 buckets
for bucket in s3.buckets.all():
  print(bucket.name)

# Specify the name of the S3 bucket
bucket = s3.Bucket('example')

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

{{% aside danger %}}
**Warning:** Be sure to use the `.download_file()` method first, as you can't
access the S3 bucket's version directly
{{% /aside %}}

* Uploading a file to an S3 bucket

    ```py
    import boto3
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('tamagotchi')

    # Upload file 'example.json' from Jupyter notebook to S3 Bucket tamagotchi
    bucket.upload_file('/local/path/to/example.json', '/remote/path/to/example.json')
    ```

* Deleting the objects in an S3 bucket

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

* Deleting an S3 bucket

    ```py
    import boto3
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('tamagotchi')

    # Delete the S3 bucket named tamagotchi
    bucket.delete()
    ```

{{% aside warning %}}
**Note:** You won't be able to delete a bucket until you've first deleted all
objects within that bucket.
{{% /aside %}}

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
- Virtual Private Cloud (VPC) Endpoints

### IAM on the Command-Line

* Create an IAM group `admin`:

    ```shell
    aws iam create-group --group-name 'admin'
    ```

* List existing IAM groups:

    ```shell
    aws iam list-groups
    ```


## AWS S3

* Create an S3 Bucket

    ```shell
    aws s3 mb s3://mybucket
    ```

* Add an item to S3 Bucket

    ```shell
    aws s3 cp file.txt s3://mybucket
    ```

* Add a folder (and all its items) to S3 Bucket

    ```shell
    aws s3 cp folder/ s3://mybucket
    ```

* Add every item in a folder to S3 Bucket

    ```shell
    aws s3 cp --recursive ./folder/ s3://mybucket
    ```

* View the permissions of an object in an S3 Bucket

    ```shell
    aws s3api get-object-acl --bucket 'mybucket' --key 'file.txt'
    ```

* Grant anonymous read access to an object in an S3 Bucket

    ```shell
    aws s3api put-object-acl --bucket 'mybucket' --key 'file.txt' --acl 'public-read'
    ```

* Pull the associated torrent file

    ```shell
    aws s3api get-object-torrent --bucket 'mybucket' --key 'file.txt' !#^.torrent
    ```

* Now anyone can download the torrent file `file.txt.torrent` over HTTPS (works from web browser as well)

    ```shell
    curl 'https://mybucket.s3.amazonaws.com/file.txt?torrent' > ~/Downloads/file.txt.torrent
    ```

* Add the torrent to [transmission](https://helpful.wiki/transmission)

    ```shell
    transmission-remote -a ~/Downloads/file.txt.torrent
    ```

## AWS Lambda

* Call the lambda function named `my-lambda-function`, supplying it with three arguments

    ```shell
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

    ```shell
    aws ec2 \
        authorize-security-group-ingress \
        --group-name 'aws_security_group' \
        --protocol tcp \
        --port 22 \
        --cidr "45.144.81.36/32"
    ```

* Allocate an elastic public IP address

    ```shell
    aws ec2 allocate-address
    ```

* Describe elastic public IP addresses:

    ```shell
    aws ec2 describe-addresses --public-ips
    ```

* Associate an Elastic IP

    ```shell
    aws ec2 associate-address \
      --instance-id 'i-004183eed3bb647a9' \
      --public-ip '34.210.111.105'
    ```

* Release the IP address associated with a given allocation ID

    ```shell
    aws ec2 release-address --allocation-id 'eipalloc-0adf787bf251776d3'
    ```

## Configure

[Documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/configure/set.html)

* Launch the AWS CLI configuration wizard

    ```shell
    aws configure wizard
    ```

* Import credentials from a CSV file

    ```shell
    aws configure import --csv file://path/to/creds.csv
    ```

* Change the default region

    ```shell
    # Default profile
    aws configure set default.region us-west-2

    # Specific profile
    aws configure set region us-west-1 --profile tommy
    ```

* Change the default output to YAML

    ```shell
    aws configure set default.output yaml
    ```

* Launch the SSO configuration program

    ```shell
    aws configure sso
    ```

It's worth noting that you can specify which SSO profile name to use in
two different ways:

1. By passing a name to the `--profile` option, (e.g. `--profile tommy`)

1. By assigning a name to the environment variable `AWS_DEFAULT_PROFILE`

* Clearing SSO credentials

    ```shell
    aws sso logout
    ```

## Cloud9

AWS has an in-browser IDE called Cloud9, which you can power using an existing
EC2 instance. Supposedly it supports pair programming as well.

## Organizations

* Create a new organization

    ```shell
    aws organizations create-organization
    ```

## API Gateway

* Create a REST API called `example-api`:

    ```shell
    aws apigateway create-rest-api --name 'example-api'
    ```

    ```yaml
    apiKeySource: HEADER
    createdDate: '2020-06-02T21:03:52-07:00'
    endpointConfiguration:
      types:
      - EDGE
    id: b3aszbiwb7
    name: example-api
    ```

## SQS

* Create a new queue

    ```shell
    aws sqs --queue-name {{< var QUEUE_NAME >}}
    ```
