---
title: Google Cloud SDK
draft: false
---

## `gcloud` CLI

* Link to [gcloud CLI documentation](https://cloud.google.com/sdk/gcloud)

* Link to [`gcloud` cheatsheet](https://cloud.google.com/sdk/docs/cheatsheet)

### Getting Started

* Install the Google Cloud SDK

  ```sh
  curl https://sdk.cloud.google.com | bash
  ```

* Update the components

  ```sh
  gcloud components update
  ```

* Set your default project

  ```sh
  gcloud config set project PROJECT_ID
  ```

### Projects

* Create a new project `my-project`, setting it as the default for `gcloud`:

  ```sh
  gcloud projects create 'my-project' --set-as-default
  ```

* Delete the project

  ```sh
  gcloud projects delete 'my-project'
  ```

* Undelete a project

  ```sh
  gcloud projects undelete 'my-project'
  ```



### Authenticating 

* If you don't have an existing account, create one

  ```sh
  gcloud init
  ```

* Set an existing account to be the current active account
  
    ```sh
    gcloud config set account 'ttrojan@usc.edu'
    ```

* Generate credentials for the client libraries (such as Python)

    ```sh
    gcloud auth application-default login
    ```

* Generate credentials for the `bq` command-line interface

    ```sh
    gcloud auth login --no-launch-browser
    ```

* List the name of the active account

    ```sh
    gcloud auth list --filter=status:ACTIVE --format="value(account)"
    ```

* List the name of all inactive accounts starting with `tmp`

  ```sh
  gcloud auth list --filter="-status:ACTIVE account:test*" \
  --format="value(account)"
  ```

## Cloud DNS

* [Useful tutorial](https://cloud.google.com/dns/docs/tutorials/create-domain-tutorial)

```sh
gcloud dns project-info describe 'project_id'
```

```sh
gcloud dns managed-zones create --dns-name='helpful.wiki' --description='Helpful Wiki managed zone' 'helpfulwiki'
```

* Enable DNSSEC

```sh
gcloud dns managed-zones update 'helpfulwiki' --dnssec-state on
```

* Add an `A` name records to your domain

  ```sh
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

```sh
gcloud compute ssl-certificates create 'certificate' --domains='helpful.wiki' --global
```

## Static IP

* [Link to documentation](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#gcloud)


* Create a static IP for a external [HTTPS load balancer](https://cloud.google.com/load-balancing/docs/https/ext-load-balancer-backend-buckets#ip-address)

* For [Cloud CDN](https://cloud.google.com/cdn/docs/setting-up-cdn-with-bucket#ip-address)

```sh
gcloud compute addresses create 'website' \
    --network-tier=PREMIUM \
    --ip-version=IPV4 \
    --global
```

