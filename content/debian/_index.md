---
title: 'Debian'
description: 'An operating system that "just works"'
date: '2021-04-08T17:33:55-07:00'
draft: true
---

# Debian

Running Debian from Google Cloud

First, authenticate to Google Cloud and configure Docker.

```shell script
gcloud auth configure-docker
```

* Listing the currently recommended, newest versions of Debian images on Google Compute Engine

```shell script
gcloud compute images list \
    --no-standard-images \
    --project='debian-cloud'
```

* Listing previous, outdated editions of Debian images on Google Compute Engine

```shell script
gcloud compute images list \
    --no-standard-images \
    --project='debian-cloud' \
    --show-deprecated
```

* Pulling the Debian 10 image from Google's registry

```shell script
docker pull 'marketplace.gcr.io/google/debian10:latest'
```

* Creating a new instance

    ```shell script
    gcloud compute instances create {{< var INSTANCE_NAME >}}
        --image-project 'debian-cloud' \
        --image-family 'debian-10'
    ```
