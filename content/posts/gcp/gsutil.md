---
title: Google Cloud Storage
draft: true
---

## `gsutil`

* Be sure to [enable billing for the project](https://console.cloud.google.com/billing/projects)

* Learn how to [modify access-control lists](https://cloud.google.com/storage/docs/gsutil/commands/acl#ch-examples) before trying anything below

* Enable WRITE access to bucket `gs://bucketname` for owners of the project `example`

    ```sh
    gsutil acl ch -p owners-example:W gs://bucketname
    ```

* Create a publicly accessible bucket

    ```sh
    gsutil mb -b on 'gs://example.site'
    ```

* [Change a bucket to be publicly accessible](https://cloud.google.com/storage/docs/access-control/making-data-public#buckets)

    ```sh
    gsutil iam ch allUsers:objectViewer 'gs://example.site'
    ```

* Synchronise the contents of a directory

    ```sh
    gsutil rsync -R ./site/docs 'gs://example.site'
    ```

