---
title: "Microsoft Azure"
description: "Fundamentals of Microsoft's Azure cloud computing platform"
date: 2020-08-07T08:11:52-07:00
draft: false
---

# Microsoft Azure

# Common Services

I'd recommend taking a look at Microsoft's
[tour of Azure services](https://docs.microsoft.com/en-us/learn/modules/welcome-to-azure/3-tour-of-azure-services)

# Azure Command-Line Interface (CLI)

The
[Azure Command-Line Interface documentation](https://docs.microsoft.com/en-us/cli/azure/)
is pretty solid, definitely check it out. They keep a list of
[Azure services the Azure CLI can manage](https://docs.microsoft.com/en-us/cli/azure/azure-services-the-azure-cli-can-manage),
a handy reference to be aware of. I'm going to follow along in the docs, and
write notes here. Goal number one, time to
[get started with Azure CLI](https://docs.microsoft.com/en-us/cli/azure/).


## Basic Notes

Some of these are taken from learning to
[work with the Azure CLI](https://docs.microsoft.com/en-us/learn/modules/control-azure-services-with-cli/4-work-with-the-cli)

* Find the most popular commands related to the word blob

    ```shell script
    az find blob
    ```

# The Azure CLI { #az }

Azure's CLI, `az`, is a great way to turn repetitive tasks into a one-liner from
your command line. Their documentation walks you through
[installing the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-macos)
very well, so follow along their and come back when you have `az` set up.

* Logging into the Azure CLI

    ```shell script
    az login
    ```

* Loggout out of the Azure CLI

    ```shell script
    az logout --username {{< var USERNAME >}}
    ```

* Search for a command

    ```shell script
    az find secret
    ```

* Upgrade the `az` CLI

    ```shell script
    az upgrade --all --yes
    ```

* Enter interactive mode

    ```shell script
    az interactive
    ```

* [Quickstart for Bash in Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/quickstart)

# File Shares

* [Link to quickstart](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-cli)

# Virtual Machines

* [Link to quickstart](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-cli)
* [Link to learning module](https://docs.microsoft.com/en-us/learn/modules/manage-virtual-machines-with-azure-cli/)

# Functions

* [Link to quickstart](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function-azure-cli?tabs=bash%2Cbrowser&pivots=programming-language-csharp)

# Virtual Network

* [Link to quickstart](https://docs.microsoft.com/en-us/azure/virtual-network/quick-create-cli)

# SQL Database

* [Link to guide](https://docs.microsoft.com/en-us/azure/azure-sql/database/az-cli-script-samples-content-guide?tabs=single-database)

## Provisioning Storage

You can provision storage using either 
[the `az` CLI](https://docs.microsoft.com/en-us/azure/developer/python/azure-sdk-example-storage?tabs=bash#for-reference-equivalent-azure-cli-commands)
or [the python SDK](https://docs.microsoft.com/en-us/azure/developer/python/azure-sdk-example-storage)

* Python SDK:

    ```shell script
    pip install \
      azure-cli-core \
      azure-mgmt-storage \
      azure-mgmt-resource \
      azure-storage-blob \
      azure-identity
    ```


# Azure Cost Management


Below you'll find notes from a time I needed to learn how to [control spending and manage bills](https://docs.microsoft.com/en-us/learn/paths/control-spending-manage-bills/) for a team project in Microsoft Azure. Both the **Azure Advisor** and **Azure Cost Management** services provide ways to reduce the amount of money that is spent, and prevent it from being spent in the first place.

Before the project gets started, it may be a good idea to [learn to estimate costs](https://docs.microsoft.com/en-us/learn/modules/predict-costs-and-optimize-spending/2-estimate-costs-with-the-azure-pricing-calculator) with the [Azure pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator/).

### Subscriptions

Interestingly, you can't create a subscription from the command line. You'll have to go to [the Azure Portal](https://portal.azure.com) and set one up manually. Once you have, however, continue along below:

* Get a list of all subscriptions for the current account ([az account](https://docs.microsoft.com/en-us/cli/azure/account?view=azure-cli-latest))

    ```shell script
    # Short form
    az account list -o table

    # Long form
    az account list --output table
    ```

* Set the default subscription to use in the Azure CLI:

    ```shell script
    # Short form
    az account set -s {{< var SUBSCRIPTION_NAME >}}

    # Long form
    az account set --subscription {{< var SUBSCRIPTION_NAME >}}
    ```

## Configurations

Check out
[the documentation for `az configure`](https://docs.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest#az_configure)

* View a list of all current defaults

    ```shell script
    # Short form
    az configure -l

    # Long form
    az configure --list-defaults
    ```

* [Set the default location](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az_group_create)
to {{< var LOCATION >}}, (e.g. `westus`)

    ```shell script
    # Short form
    az configure -d location={{< var LOCATION >}}

    # Long form
    az configure --defaults location={{< var LOCATION >}}
    ```

### Resource Groups

* [Create an Azure resource group](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az_group_create) 
in {{< var LOCATION >}}, (e.g. `westus`)

    ```shell script
    # Short form
    az group create -n {{< var GROUP_NAME >}} [-l {{< var LOCATION >}}]

    # Long form
    az group create --name {{< var GROUP_NAME >}} [--location {{< var LOCATION >}}]
    ```

* [Set the default Azure resource group](https://docs.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest#az_configure-examples) 
to {{< var GROUP_NAME >}}

    ```shell script
    az configure --defaults group={{< var GROUP_NAME >}}
    ```

* Listing information about a resource group

    ```shell script
    resource_group='learn-ff1ca2e8-ec34-4b09-abf6-e1a70c9ce459'
    resource_type='Microsoft.Web/sites'

    az resource list \
    --resource-group ${resource_group} \
    --resource-type ${resource_type}
    ```

### Providers

* Print a list of resource providers

    ```shell script
    az provider list --output table
    ```

* Register the resource provider for the `Microsoft.Search` namespace

    ```shell script
    # `--wait` until the registration has completed
    az provider register --wait --namespace 'Microsoft.Search'
    ```

* Show the registration status of a particular namespace

    ```shell script
    az provider show --namespace 'Microsoft.Search' --output table
    ```

### Storage

* [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-cli#create-a-storage-account-1)

    ```shell script
    az storage account create \
    --name 'firestationhub' \
    --resource-group 'firestationhub' \
    --location 'westus' \
    --sku 'Standard_LRS' \
    --kind 'StorageV2'
    ```

* [Create a blob storage container](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli#create-a-container)

    ```shell script
    az storage container create \
        --account-name {{< var STORAGE_ACCOUNT >}} \
        --name {{< var CONTAINER_NAME >}} \
        --auth-mode 'login'
    ```

* Set the Azure storage account name to be read from the environment

    ```shell script
    typeset -gx AZURE_STORAGE_ACCOUNT={{< var STORAGE_ACCOUNT_NAME >}}
    ```

* [Upload a directory of files to a blob storage container](https://docs.microsoft.com/en-us/cli/azure/storage/blob?view=azure-cli-latest#az_storage_blob_upload_batch)

    ```shell script
    az storage blob upload-batch -d {{< var CONTAINER_NAME >}} -s ${PWD}
    ```

* [Authorize access to the container scoped to the resource-group layer](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-cli)

    ```shell script
    az role assignment create \
        --role 'Storage Blob Data Owner' \
        --assignee 'ttrojan@usc.edu' \
        --resource-group {{< var RESOURCE_GROUP >}}
    ```

    * If you're still stuck, take a look at [Authorize access to Blob storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli)

#### Azure Storage for File Shares

Before you go crazy, be sure to check out the
[pricing page](https://azure.microsoft.com/en-us/pricing/details/storage/files/)
before following along below. If this is a new topic for you, check out the
[intro page](https://docs.microsoft.com/en-us/azure/storage/files/storage-files-introduction)
for Azure Files as well.

1. [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-cli#create-file-share)

    ```shell script
    az storage account create \
        --name {{< var ACCOUNT_NAME >}} \
        --resource-group {{< var GROUP_NAME >}} \
        --location 'westus' \
        --kind StorageV2 \
        --sku Standard_LRS
    ```

1. [Create a file share](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-cli#create-file-share)


    ```shell script
    az storage share-rm create \
        --resource-group {{< var GROUP_NAME >}} \
        --storage-account {{< var ACCOUNT_NAME >}} \
        --name {{< var SHARE_NAME >}}
        --access-tier {{< var TIER >}}
    ```

    Where {{< var TIER >}} is one of `cool`, `hot`, or `TransactionOptimized`

After you've done these two steps, make sure you
[secure the environment](https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security?toc=/azure/storage/files/toc.json)
before you continue on to
[create a directory](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-cli#create-a-directory)
and
[upload a file](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-cli#create-a-directory).

You can
[remove the storage account](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-cli#clean-up-resources)
and its contents whenever you'd like with the following command:

* Deleting a storage account

    ```shell script
    az storage account delete \
    --resource-group {{< var GROUP_NAME >}} \
    --name {{< var ACCOUNT_NAME >}}
    ```

* Updating the storage tier to `cool`

    ```shell script
    az storage share-rm update \
        --group {{< var GROUP >}} \
        --storage-account {{< var ACCOUNT_NAME >}} \
        --name {{< var STORAGE_NAME >}} \
        --access-tier 'cool'
    ```

The next step is for me to
[create an Azure website using the CLI](https://docs.microsoft.com/en-us/learn/modules/control-azure-services-with-cli/5-exercise-create-website-using-the-cli)
but one could just as easily
[create a web app in the Azure portal](https://docs.microsoft.com/en-us/learn/modules/host-a-web-app-with-azure-app-service/2-create-a-web-app-in-the-azure-portal)
if that's less intimidating.

## Azure App Service

If you need a web server to render content, use Azure's [App Service](https://azure.microsoft.com/services/app-service/). If, per chance, you find you don't *actually* need a web server, use their [Static Web App](https://azure.microsoft.com/services/app-service/static/) service instead.

An [**App Service plan**](https://docs.microsoft.com/en-us/azure/app-service/overview-hosting-plans) defines the resources that run an **App Service app**. Every App Service app must have a corresponding App Service plan in order to run it.

A single App Service plan can host multiple App Service apps.

* Azure App Service
  * Here is a [useful walkthrough](https://docs.microsoft.com/en-us/learn/modules/welcome-to-azure/4-exercise-create-website)
  * an HTTP-based service that enables you to build and host many types of web-based solutions without managing infrastructure. For example, you can host web apps, mobile back ends, and RESTful APIs in several supported programming languages.


* List existing App Service plans

    ```shell script
    # Short form
    az appservice plan list -o table

    # Long form
    az appservice plan list --output table
    ```

* [Create a new app service](https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest#az_appservice_plan_create) {{< var SERVICE_NAME >}}

    ```shell script
    az appservice plan create \
        --name {{< var SERVICE_NAME >}} \
        --resource-group {{< var GROUP >}} \
        --subscription {{< var SUBSCRIPTION >}} \
        --sku 'FREE' 
    ```

* Get the details of a source control deployment configuration

    ```shell script
    az webapp deployment source show \
        --name {{< var WEB_APP_NAME >}} \
        --resource-group {{< var GROUP >}} \
        --subscription {{< var SUBSCRIPTION >}}
    ```

* Get the details for available web app deployment profiles

    ```shell script
    az webapp deployment list-publishing-profiles \
        --name {{< var WEB_APP_NAME >}} \
        --resource-group {{< var GROUP >}} \
        --subscription {{< var SUBSCRIPTION >}}
    ```

* [Set an environment variable](https://docs.microsoft.com/en-us/azure/app-service/configure-common#automate-app-settings-with-the-azure-cli)
  for an Azure web app

    ```shell script
    az webapp config appsettings set --settings {{< var KEY >}}={{< var VALUE >}}
    ```


* Delete an app service (and all apps within it)

    ```shell script
    az appservice plan delete --name {{< var SERVICE_NAME >}}
    ```

### Azure Web Apps

* Create a web application {{< var APP_NAME >}}

    ```shell script
    az webapp create \
        --name {{< var APP_NAME >}} \
        --resource-group {{< var GROUP >}} \
        --plan {{< var SERVICE_NAME >}}
    ```

* Set the default web application to {{< var APP_NAME >}}

    ```shell script
    az configure --defaults web={{< var APP_NAME >}}
    ```

* Configure continuous deployment from GitHub repository {{< var REPO >}} (`https://github.com/ttrojan/helloworld`)

    ```shell script
    az webapp deployment source config \
        --name {{< var APP_NAME >}} \
        --resource-group {{< var GROUP >}} \
        --repo-url {{< var REPO >}} \
        --branch 'master' \
        --git-token ${GITHUB_TOKEN}
    ```

* Start a web app

    ```shell script
    resource_group='learn-ff1ca2e8-ec34-4b09-abf6-e1a70c9ce459'
    name='sandboxappforlearning'

    az webapp start \
      --resource-group ${resource_group} \
      --name=${name}
    ```

* Stop a web app

    ```shell script
    resource_group='learn-ff1ca2e8-ec34-4b09-abf6-e1a70c9ce459'
    name='sandboxappforlearning'

    az webapp stop \
      --resource-group ${resource_group} \
      --name=${name}
    ```

* List available runtimes

    ```shell script
    az webapp list-runtimes
    ```

* View the web app in your browser

    ```shell script
    az browse --name {{< var APPLICATION_NAME >}}
    ```

Microsoft's documentation has a great article about the steps to
[configure a Node.js app for Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux)

### Cognitive Search

* Create a Cognitive Search service

    ```shell script
    az search service create \
        -n {{< var SERVICE_NAME >}} \
        -g {{< var RESOURCE_GROUP >}} \
        --sku 'Free'
    ```

You won't be able to do much else using the command-line interface past this point. Follow along in the Azure documentation to learn how to [create a search index](https://docs.microsoft.com/en-us/azure/search/search-get-started-portal)

