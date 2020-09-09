---
title: Google Cloud Storage
draft: false
---

## `gsutil`

* Be sure to [enable billing for the project](https://console.cloud.google.com/billing/projects)

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

