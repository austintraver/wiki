---
title: "Google BigQuery"
description: "Fully managed, highly scalable data warehousing"
date: 2020-07-22T17:43:22-07:00
draft: true
---

BigQuery is a serverless, scalable, multi-cloud data warehouse.

## [Pricing](https://cloud.google.com/bigquery/pricing)

* Storage
  * First 10 `GiB` are free
  * Anything beyond that costs `$0.02/GiB` per month

* Queries
  * First 1024 `GiB` of query data processed is free
  * Anything beyond that costs `$0.005/GiB` after that

* Loading
  * Loading data into BigQuery is free


## The `bq` CLI

* Link to [BigQuery `.bigqueryrc` documentation](https://cloud.google.com/bigquery/docs/bq-command-line-tool#setting_default_values_for_command-line_flags)


In the examples below, sometimes I'm going to use command-line arguments, other times I won't, you'll see that you're allowed to specify project ID, dataset ID, and table ID, all in the same string, in the following format:

```shell
PROJECT_ID:DATASET_ID.TABLE_ID
```

### `show`

* Examining the details of a table using the `show` subcommand:

  ```shell
  bq show bigquery-public-data:samples.shakespeare
  ```

  Output

  ```txt
  Table bigquery-public-data:samples.shakespeare

    Last modified                  Schema                 Total Rows   Total Bytes   Expiration
  ----------------- ------------------------------------ ------------ ------------- ------------
    26 Aug 14:43:49   |- word: string (required)           164656       6432064
                      |- word_count: integer (required)
                      |- corpus: string (required)
                      |- corpus_date: integer (required)
  ```

### `ls`

* List the datasets in project `my-project` using the `ls` subcommand:

  ```shell
  bq ls 'my-project:'
  ```

  Output

  ```txt
   datasetId
  -----------
  samples
  ```

### `mk`

* Creating a new dataset using the `mk` subcommand:

  ```shell
  bq mk 'my-dataset'
  ```

  Output

  ```txt
  Dataset 'my-project:my-dataset' successfully created.
  ```

* Exporting data to Google Cloud Storage, [link to documentation](https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#setting_up_a_cloud_storage_transfer)

  ```shell
  bq mk \
    --transfer_config \
    --project_id 'my-project' \
    --data_source 'google_cloud_storage' \
    --display_name 'name' \
    --target_dataset 'dataset' \
    --params='parameters'
  ```

### `load`

The `load` subcommand creates or updates a table and loads data in a single step.

* By default, the newly loaded data will be appended to the table. Use the `--replace` flag to have the load overwrite the existing table

* By default, data is assumed to be encoding in `UTF-8` format

* Load a CSV file `my-data.csv` with JSON schema `my-schema.json` to project `my-project`, dataset `my-dataset`, table `my-table`, **replacing the contents of the table if it already exists**

  ```shell
  bq load \
      --location 'US' \
      --project_id 'my-project' \
      --dataset_id 'my-dataset' \
      'my-table' \
      'my-data.csv' \
      --source_format 'CSV' \
      --skip_leading_rows 1 \
      --schema './schema.json' \
      --replace
  ```

### `rm`

* [Delete a single table](https://cloud.google.com/bigquery/docs/managing-tables#deleting_a_table), `my-table` in the dataset `my-dataset`

  ```shell
  # With confirmation
  bq rm -t 'my-project:my-dataset.my-table'

  # Without confirmation
  bq rm -f -t 'my-project:my-dataset.my-table'
  ```

* [Delete every table](https://cloud.google.com/bigquery/docs/managing-datasets#deleting_a_dataset) in the dataset `my-dataset`

  ```shell
  # With confirmation
  bq rm -r -d 'my-dataset'

  # Without confirmation
  bq rm -r -f -d 'my-project:my-dataset'
  ```

### `show`

* Downloading the JSON schema for `my-table` from the command line:

  ```shell
  bq show \
    --schema \
    --format=prettyjson \
    --project_id 'my-project' \
    'my-dataset.my-table'
  ```

### `extract`

* Exporting a table in BigQuery to a compressed JSON file in Google Cloud Storage

  From the `bq` CLI:

  ```shell
  bq extract \
    'my-project:my-dataset.my-table' \
    'gs://bucket/filename.ext' \
    --destination_format 'NEWLINE_DELIMITED_JSON' \
    --compression 'GZIP' \
    --print_header 'true'
  ```

  From the Python SDK

  ```py
  from google.cloud import bigquery
  client = bigquery.Client()

  project_id = 'my-project'
  dataset_id = 'my-dataset'
  table_id = 'my-table'
  bucket_id = 'my-bucket'
  file_id = 'my-file.json.gz'

  destination = f'gs://{bucket_id}/{file_id}'
  dataset = bigquery.DatasetReference(project_id, dataset_id)
  table = dataset.table(table_id)

  # API request
  extract_job = client.extract_table(
      table,
      destination,
      # Location must match that of the source table.
      location='US',
  ) 
  extract_job.result()  # Waits for job to complete.

  print(f'Exported {project_id}:{dataset_id}.{table_id} to {destination}') 
  ```

## `gsutil`

* Make a bucket `bucket-ttrojan` in the project `project-ttrojan`

  ```shell
  gsutil mb -p 'project-ttrojan' 'gs://bucket-ttrojan'
  ```
