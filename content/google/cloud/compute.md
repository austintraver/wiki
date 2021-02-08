---
title: Compute Engine
date: 2020-08-22T04:19:26
draft: true
---

## Imported VM from `.ova` File

* [Link to documentation](https://cloud.google.com/compute/docs/import/import-ovf-files#import_ova_file)

* Copy the `.ova` VM file to Cloud Storage

```shell script
gsutil cp ./path/to/vm.ova 'gc://bucket/vm.ova'
```

Article: [Connecting apps to instances using SSH](https://cloud.google.com/compute/docs/tutorials/service-account-ssh)

* Create a new compute instance using the imported VM file


    ```shell script
    gcloud compute instances import 'instance_name' \
        --os='ubuntu-1804'
        --source-uri='gs://bucket/vm.ova'
    ```

* Create a network

    ```shell script
    gcloud compute networks create 'vm_network' \
    --project 'project_id'
    ```

* Open the firewall

    ```shell script
    gcloud compute firewall-rules create ssh-all \
    --project 'project_id' \
    --network 'my_network' \
    --allow 'tcp:22'
    ```

---

## Standard setup instructions

* List all current-edition images of Ubuntu OS

    ```shell script
    gcloud compute images list --filter 'ubuntu' --standard-images
    ```

* [List all zones in a region](https://cloud.google.com/sdk/gcloud/reference/compute/zones/list)

    ```shell script
    gcloud compute zones list
    ```

* List all machine types in region US West 1A

    ```shell script
    gcloud compute machine-types list --zones 'us-west1-a'
    ```

* Acquire a static IP address

    ```shell script
    gcloud compute addresses create {{< var NAME >}} --global --ip-version 'IPV4'
    ```

* List information about a static IP address

    ```shell script
    gcloud compute addresses describe {{< var NAME >}} --global
    ```

* [Set the machine type](https://cloud.google.com/sdk/gcloud/reference/compute/instances/set-machine-type)

    ```shell script
    gcloud compute instances set-machine-type bastion --machine-type 'g1-small'
    ```

* [Import SSH keys using OS login](https://cloud.google.com/compute/docs/instances/managing-instance-access#add_oslogin_keys)

    ```shell script
    gcloud compute os-login ssh-keys add --key-file .ssh/id_rsa.pub --ttl 0
    ```

* Stop an instance

    ```shell script
    gcloud compute instances stop {{< var NAME >}}
    ```

* SSH into an instance

    ```shell script
    gcloud instances ssh {{< var NAME >}}
    ```
