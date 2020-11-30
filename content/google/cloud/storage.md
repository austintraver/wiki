---
title: Google Cloud Storage
draft: true
---

# Google Cloud Storage

To add Google Cloud Storage to a Firebase Application, check out their
[web application quick start](https://firebase.google.com/docs/storage/web/start).

## `gsutil`

* Be sure to [enable billing for the project](https://console.cloud.google.com/billing/projects)

* Learn how to [modify access-control lists](https://cloud.google.com/storage/docs/gsutil/commands/acl#ch-examples) before trying anything below

* Enable WRITE access to bucket `gs://bucketname` for owners of the project `example`

    ```shell script
    gsutil acl ch -p owners-example:W gs://bucketname
    ```

* Create a publicly accessible bucket

    ```shell script
    gsutil mb -b on 'gs://example.site'
    ```

* [Change a bucket to be publicly accessible](https://cloud.google.com/storage/docs/access-control/making-data-public#buckets)

    ```shell script
    gsutil iam ch allUsers:objectViewer 'gs://example.site'
    ```

* Synchronise the contents of a directory

    ```shell script
    gsutil rsync -R ./site/docs 'gs://example.site'
    ```

