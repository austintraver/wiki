---
title: Compute Engine
date: 2020-08-22T04:19:26
draft: true
---

# Google Cloud Compute

## Getting started

* Create a new instance:

  ```shell
  gcloud compute instances create \
    --image-family={{< var IMAGE_FAMILY >}}
    --machine-type={{< var MACHINE_TYPE >}}
    --zone={{< var ZONE >}}
    --image-project={{< var IMAGE_PROJECT >}}
    {{< var INSTANCE >}}
  ```  

  Where, for example:

  * {{< var IMAGE_FAMILY >}} is `ubuntu-2004-lts`
  * {{< var MACHINE_TYPE >}} is `f1-micro`
  * {{< var ZONE >}} is `us-west1-a`
  * {{< var IMAGE_PROJECT >}} is `ubuntu-os-cloud`
  * {{< var INSTANCE >}} is `my-instance`

* Configuring the default region:

```shell
gcloud config set compute/region {{< var REGION >}}
```

Where {{< var REGION >}} is, for example, `us-west2`

```shell
gcloud config set compute/zone {{< var ZONE >}}
```

Where {{< var ZONE >}} is, for example, `us-west2-a`

* Configuring the default zone:

## Imported VM from `.ova` File

* [Link to documentation](https://cloud.google.com/compute/docs/import/import-ovf-files#import_ova_file)

* Copy the `.ova` VM file to Cloud Storage

```shell
gsutil cp ./path/to/vm.ova 'gc://bucket/vm.ova'
```

Article: [Connecting apps to instances using SSH](https://cloud.google.com/compute/docs/tutorials/service-account-ssh)

* Create a new compute instance using the imported VM file


    ```shell
    gcloud compute instances import {{< var INSTANCE >}} \
        --os={{< var OPERATING_SYSTEM >}}
        --source-uri='gs://bucket/vm.ova'
    ```

    Where {{< var OPERATING_SYSTEM >}} is, for example, `ubuntu-1804`

* Create a network

    ```shell
    gcloud compute networks create {{< var NETWORK_ID >}} \
    --project {{< var PROJECT >}}
    ```

* Open the firewall

    ```shell
    gcloud compute firewall-rules create ssh-all \
    --project 'project_id' \
    --network 'my_network' \
    --allow 'tcp:22'
    ```

---

## Standard setup instructions

* Printing a list of Google's current-edition images

    ```shell
    gcloud compute images list --standard-images
    ```

* Listing all of the 
  [zones in a region](https://cloud.google.com/sdk/gcloud/reference/compute/zones/list)

    ```shell
    gcloud compute zones list
    ```

* Listing all machine types in a region

    ```shell
    gcloud compute machine-types list --zones {{< var REGION >}}
    ```
  
    Where {{< var REGION >}} is, for example, `us-west1`

* Listing information about a particular instances network addresses

    ```shell
    gcloud compute addresses describe {{< var INSTANCE >}} --global
    ```
  
* Provisioning a static IP address for an instance

    ```shell
    gcloud compute addresses create {{< var INSTANCE >}} --global --ip-version 'IPV4'
    ```

* Setting the 
  [machine type](https://cloud.google.com/sdk/gcloud/reference/compute/instances/set-machine-type)

    ```shell
    gcloud compute instances set-machine-type bastion --machine-type 'g1-small'
    ```
  
    Where {{< var MACHINE_TYPE >}} is, for example, `g1-small`

* Stopping a currently running instance:

    ```shell
    gcloud compute instances stop {{< var INSTANCE >}}
    ```

* Uploading SSH keys onto a remote instance using [OS login](https://cloud.
  google.
  com/compute/docs/instances/managing-instance-access#add_oslogin_keys)

    ```shell
    gcloud compute os-login ssh-keys add --key-file .ssh/id_rsa.pub --ttl 0
    ```
  
* Logging into an instance remotely using SSH:

    ```shell
    gcloud instances ssh {{< var INSTANCE >}}
    ```

## Static IP

* [Reserving an external IP address](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#gcloud)

    ```shell
    gcloud compute addresses create 'website' \
        --network-tier=PREMIUM \
        --ip-version=IPV4 \
        --global
    ```

## Google Cloud Functions


Following along Google Cloud documentation
article [Quickstart: Using the gcloud Command-Line Tool][quickstart]

[quickstart]: https://cloud.google.com/functions/docs/quickstart#functions-prepare-environment-go


```shell
gcloud functions deploy {{< var FUNCTION_NAME >}} \
	--trigger-http \
	--allow-unauthenticated \
	--runtime {{< var LANGUAGE_RUNTIME >}} 'go113'
```

* Replace {{< var FUNCTION_NAME >}} with the name of a Google Cloud Function
* Replace {{< var LANGUAGE_RUNTIME >}} with a value, such as `go113`


```text
https://us-west2-austintraver.cloudfunctions.net/Gist
```
