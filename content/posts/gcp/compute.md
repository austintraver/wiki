---
title: Compute Engine
date: 2020-08-22T04:19:26
draft: true
---

## Imported VM from `.ova` File

* [Link to documentation](https://cloud.google.com/compute/docs/import/import-ovf-files#import_ova_file)

* Copy the `.ova` VM file to Cloud Storage

```sh
gsutil cp ./path/to/vm.ova 'gc://bucket/vm.ova'
```

* Create a new compute instance using the imported VM file

* [Link to documentation](https://cloud.google.com/compute/docs/tutorials/service-account-ssh)

```sh
gcloud compute instances import 'instance_name' \
    --os='ubuntu-1804'
    --source-uri='gs://bucket/vm.ova'
```

* Create a network

```sh
gcloud compute networks create 'vm_network' \
  --project 'project_id'

```

* Open the firewall

```sh
gcloud compute firewall-rules create ssh-all \
  --project 'project_id' \
  --network 'my_network' \
  --allow 'tcp:22'
```
