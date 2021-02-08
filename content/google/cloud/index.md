---
title: Google Cloud SDK
draft: false
---

## `gcloud` CLI

* Link to [gcloud CLI documentation](https://cloud.google.com/sdk/gcloud)

* Link to [`gcloud` cheatsheet](https://cloud.google.com/sdk/docs/cheatsheet)

### Getting Started

* Install the Google Cloud SDK

    ```shell script
    curl https://sdk.cloud.google.com | bash
    ```

* Update the components

    ```shell script
    gcloud components update
    ```

### Projects

* Create a new project {{< var PROJECT_ID >}}, setting it as the default for
  `gcloud`:

    ```shell script
    gcloud projects create {{< var PROJECT_ID >}} \
      [--name {{< var PROJECT_NAME >}}] \
      --set-as-default
    ```

* Set your default project to existing project {{< var PROJECT_ID >}}

    ```shell script
    gcloud config set project {{< var PROJECT_ID >}}
    ```


* Delete the project

    ```shell script
    gcloud projects delete 'my-project'
    ```

* Undelete a project

    ```shell script
    gcloud projects undelete 'my-project'
    ```

* Set `example` as the default project

    ```shell script
    gcloud projects set project 'example'
    ```


### Authenticating 

* If you don't have an existing account, create one

    ```shell script
    gcloud init
    ```

* Set an existing account to be the current active account
  
    ```shell script
    gcloud config set account 'ttrojan@usc.edu'
    ```

* Generate credentials for the client libraries (such as Python)

    ```shell script
    gcloud auth application-default login
    ```

* Generate credentials for the `bq` command-line interface

    ```shell script
    gcloud auth login --no-launch-browser
    ```

* List the name of the active account

    ```shell script
    gcloud auth list --filter=status:ACTIVE --format="value(account)"
    ```

* List the name of all inactive accounts starting with `tmp`

    ```shell script
    gcloud auth list --filter="-status:ACTIVE account:test*" \
    --format="value(account)"
    ```

## Cloud DNS

* [Useful tutorial](https://cloud.google.com/dns/docs/tutorials/create-domain-tutorial)

* Describe the project information for `project_id`

    ```shell script
    gcloud dns project-info describe 'project_id'
    ```

* Create a managed zone

    ```shell script
    gcloud dns managed-zones create --dns-name='helpful.wiki' --description='Helpful Wiki managed zone' 'helpfulwiki'
    ```

* Enable DNSSEC

    ```shell script
    gcloud dns managed-zones update 'helpfulwiki' --dnssec-state on
    ```

* Add an `A` name records to your domain

    ```shell script
    # Preset the variables
    project="project-id"
    zone="zone-id"
    domain="website.com"

    # Begin a transaction
    gcloud dns --project=${project} \
      record-sets transaction \
      start \
      --zone=${zone}

    # Add the IPs to a new A name record with a 1-hour TTL
    gcloud dns --project=${project} \
      record-sets transaction \
      add '1.2.3.4' '2.3.4.5' --name="${domain}." --ttl=3600 --type='A' 
      --zone=${zone}

    # Execute the transation
    gcloud dns --project=${project} \
      record-sets transaction \
      execute \
      --zone=${zone}
    ```

## SSL

* Create a certificate for `helpful.wiki`, and name it `certificate`

    ```shell script
    gcloud compute ssl-certificates create 'certificate' --domains='helpful.wiki' --global
    ```

## Static IP

* [Link to documentation](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#gcloud)


* Create a static IP for a external [HTTPS load balancer](https://cloud.google.com/load-balancing/docs/https/ext-load-balancer-backend-buckets#ip-address)

* For [Cloud CDN](https://cloud.google.com/cdn/docs/setting-up-cdn-with-bucket#ip-address)

    ```shell script
    gcloud compute addresses create 'website' \
        --network-tier=PREMIUM \
        --ip-version=IPV4 \
        --global
    ```

## Cloud SQL

Google's article [Creating and managing MySQL databases](https://cloud.google.com/sql/docs/mysql/create-manage-databases) covers this material pretty well, I've included some commands below

Note, the `--async` flag returns immediately, without waiting for the operation to complete

* [Creating an instance](https://cloud.google.com/sql/docs/mysql/create-instance)


    ```shell script
    instance_name='my_instance'
    tier='db-f1-micro'
    region='us-west1'
    version='MYSQL_8_0'

    gcloud sql instances create ${instance_name} --tier=${tier} region=${region} --database-version=${version}
    ```

* [Deleting an instance](https://cloud.google.com/sql/docs/mysql/create-manage-databases#delete)

    ```shell script
    instance_name='my_instance'

    gcloud sql instances delete ${instance_name} --async
    ```

* [Creating a database](https://cloud.google.com/sql/docs/mysql/create-manage-databases#gcloud)

    ```shell script
    instance_name='my_instance'
    database_name='my_database'

    gcloud sql databases create ${database_name} --instance=${instance_name} --async
    ```

* [Deleting a database](https://cloud.google.com/sql/docs/mysql/create-manage-databases#delete)

    ```shell script
    instance_name='my_instance'
    database_name='my_database'

    gcloud sql databases delete ${database_name} --instance=${instance_name} --async
    ```


* [Exporting SQL data](https://cloud.google.com/sql/docs/mysql/import-export/exporting)

    ```shell script
    bucket='gs://helpfulwiki'
    instance_name='my_instance'
    database_name='my_database'
    gcloud sql export sql ${instance_name} "${bucket}/sqldata.gz" --database=${database}
    ```

    * Be sure to follow [best practices for importing and exporting](https://cloud.google.com/sql/docs/mysql/import-export)

---

I'd also take a look at Google's article about [creating and managing MySQL users](https://cloud.google.com/sql/docs/mysql/create-manage-users). If you see references to `%` as the host, it denotes an unrestricted host name. They wrote a good post on [MySQL users](https://cloud.google.com/sql/docs/mysql/users) as well.

{{% aside warning %}}

**Note**: If you connect to your instance using IP addresses, you must add your client IP address as an Authorized Address, even if your host name is unrestricted. For help on how to do so, read Google's article about [configuring public IP connectivity](https://cloud.google.com/sql/docs/mysql/configure-ip)

{{% /aside %}}

* Assigning a password to the root user

    ```shell script
    gcloud sql users set-password 'root' --password='root' --instance='my_instance' --host='%'
    ```

* Changing the password of a regular user

    ```shell script
    gcloud sql users set-password 'username' --instance='my_instance' --host='1.2.3.4' --prompt-for-password
    ```

* Enabling access via a public IP

    ```shell script
    gcloud sql instances patch 'my_instance' --assign-ip
    ```

* Configuring which public IPs can access the instance

    ```shell script
    gcloud sql instances patch 'my_instance' --authorized-networks='1.2.3.4, 5.6.7.8'
    ```

* Creating a user

    ```shell script
    gcloud sql users create 'username' --host='1.2.3.4' --instance='my_instance' --prompt-for-password
    ```

* Listing existing users

    ```shell script
    gcloud sql users list --instance='my_instance'
    ```

* Deleting a user

    ```shell script
    gcloud sql users delete atraver --host='1.2.3.4' --instance='my_instance'
    ```

* Configure a user's access

    * Google's article about [MySQL users](https://cloud.google.com/sql/docs/mysql/users)

Check out Google's article about [connecting with MySQL Workbench](https://cloud.google.com/sql/docs/mysql/admin-tools#workbench), as well as their article about [exporting data to a SQL dump file in Cloud Storage](https://cloud.google.com/sql/docs/postgres/import-export/exporting#exporting_data_to_a_sql_dump_file_in)

* Export contents of database `mydatabase` Cloud SQL instance `myinstance` to Cloud Storage bucket `gs://mybucket`

    * First, enable WRITE access for the Cloud SQL instance's service account:

        ```shell script
        gcloud sql instances describe 'myinstance' | grep 'serviceAccountEmailAddress'
        # => p11111-hp11gs@gcp-sa-cloud-sql.iam.gserviceaccount.com
        service_account='p11111-hp11gs@gcp-sa-cloud-sql.iam.gserviceaccount.com'

        gsutil acl ch -u "${service_account}:W" gs://mybucket
        ```
    
    * Next, export the data

    ```shell script
    gcloud sql export sql 'myinstance' gs://mybucket/sqldump.gz --database='mydatabase'
    ```

Google wrote a great article about [starting, stopping, and restarting instances](https://cloud.google.com/sql/docs/mysql/start-stop-restart-instance)

* Starting an instance

    ```shell script
    gcloud sql instances patch 'myinstance' --activation-policy 'ALWAYS'
    ```

* Stopping an instance

    ```shell script
    gcloud sql instances patch 'myinstance' --activation-policy 'NEVER'
    ```

* Restarting an instance

    ```shell script
    gcloud sql instances restart 'myinstance'
    ```

* Opening up port 445 (SMB protocol) to all addresses

    ```shell script
    gcloud compute firewall-rules create {{< var RULE_NAME >}} \
        --priority 1000 \
        --allow 'tcp:445' \
        --source-ranges '0.0.0.0/0'
    ```

---
