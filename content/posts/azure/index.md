---
title: "Microsoft Azure"
description: "Fundamentals of Microsoft's Azure cloud computing platform"
date: 2020-08-07T08:11:52-07:00
draft: false
---

# Microsoft Azure

# Common Services

I'd recommend taking a look at Microsoft's [tour of Azure services](https://docs.microsoft.com/en-us/learn/modules/welcome-to-azure/3-tour-of-azure-services)

# Azure Command-Line Interface (CLI)

The [Azure Command-Line Interface documentation](https://docs.microsoft.com/en-us/cli/azure/) is pretty solid, definitely check it out. They keep a list of [Azure services the Azure CLI can manage](https://docs.microsoft.com/en-us/cli/azure/azure-services-the-azure-cli-can-manage), a handy reference to be aware of. I'm going to follow along in the docs, and write notes here. Goal number one, time to [get started with Azure CLI](https://docs.microsoft.com/en-us/cli/azure/).


## Basic Notes

Some of these are taken from learning to [work with the Azure CLI](https://docs.microsoft.com/en-us/learn/modules/control-azure-services-with-cli/4-work-with-the-cli)

* Find the most popular commands related to the word blob

    ```sh
    az find blob
    ```

# The Azure CLI { #az }

Azure's CLI, `az`, is a great way to turn repetitive tasks into a one-liner from your command line. Their documentation walks you through [installing the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-macos)

* Logging into the Azure CLI

    ```sh
    az login
    ```

* Loggout out of the Azure CLI

    ```sh
    az logout --username {{< var USERNAME >}}
    ```

* Search for a command

    ```sh
    az find secret
    ```

* Upgrade the `az` CLI

    ```sh
    az upgrade --all --yes
    ```

* Enter interactive mode

    ```sh
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

    ```sh
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

    ```sh
    az account list --output table
    ```

* Set the default subscription to use in the Azure CLI:

    ```sh
    # Short form
    az account set -s {{< var SUBSCRIPTION_NAME >}}

    # Long form
    az account set --subscription {{< var SUBSCRIPTION_NAME >}}
    ```

Configurations Locations

* Documentation for [az configure](https://docs.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest#az_configure)

* View a list of all current defaults

    ```sh
    # Short form
    az configure -l

    # Long form
    az configure --list-defaults
    ```

* [Set the default location](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az_group_create)
to {{< var LOCATION >}}, (e.g. `westus`)

    ```sh
    # Short form
    az configure -d

    # Long form
    az configure --defaults location={{< var LOCATION >}}
    ```

### Resource Groups

* [Create an Azure resource group](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az_group_create) 
in {{< var LOCATION >}}, (e.g. `westus`)

    ```sh
    az group create --name {{< var GROUP_NAME >}} [--location {{< var LOCATION >}}]
    ```

* [Set the default Azure resource group](https://docs.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest#az_configure-examples) 
to {{< var GROUP_NAME >}}

    ```sh
    az configure --defaults group={{< var GROUP_NAME >}}
    ```

* Listing information about a resource group

    ```sh
    resource_group='learn-ff1ca2e8-ec34-4b09-abf6-e1a70c9ce459'
    resource_type='Microsoft.Web/sites'

    az resource list \
    --resource-group ${resource_group} \
    --resource-type ${resource_type}
    ```

### Providers

* Print a list of resource providers

    ```sh
    az provider list --output table
    ```

* Register the resource provider for the `Microsoft.Search` namespace

    ```sh
    # `--wait` until the registration has completed
    az provider register --wait --namespace 'Microsoft.Search'
    ```

* Show the registration status of a particular namespace

    ```sh
    az provider show --namespace 'Microsoft.Search' --output table
    ```

### Storage

* [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-cli#create-a-storage-account-1)

    ```sh
    az storage account create \
    --name 'firestationhub' \
    --resource-group 'firestationhub' \
    --location 'westus' \
    --sku 'Standard_LRS' \
    --kind 'StorageV2'
    ```

* [Create a blob storage container](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli#create-a-container)

    ```sh
    az ad signed-in-user show --query objectId -o tsv | az role assignment create \
        --role "Storage Blob Data Contributor" \
        --assignee @- \
        --scope "/subscriptions/{{< var SUBSCRIPTION >}}/resourceGroups/{{< var RESOURCE_GROUP >}}/providers/Microsoft.Storage/storageAccounts/{{< var STORAGE_ACCOUNT >}}"

    az storage container create \
        --account-name {{< var STORAGE_ACCOUNT >}} \
        --name {{< var CONTAINER_NAME >}} \
        --auth-mode 'login'
    ```

* [Upload a directory of files to a blob storage container](https://docs.microsoft.com/en-us/cli/azure/storage/blob?view=azure-cli-latest#az_storage_blob_upload_batch)

    ```sh
    typeset -gx AZURE_STORAGE_ACCOUNT={{< var STORAGE_ACCOUNT_NAME >}}
    az storage blob upload-batch -d {{< var CONTAINER_NAME >}} -s ${PWD}
    ```

* [Authorize access to Blob storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli)

The next step is for me to [create an Azure website using the CLI](https://docs.microsoft.com/en-us/learn/modules/control-azure-services-with-cli/5-exercise-create-website-using-the-cli) but one could just as easily [create a web app in the Azure portal](https://docs.microsoft.com/en-us/learn/modules/host-a-web-app-with-azure-app-service/2-create-a-web-app-in-the-azure-portal) if that's less intimidating.

## Azure App Service

If you need a web server to render content, you can use [Azure App Service](https://azure.microsoft.com/services/app-service/), but if you don't need a web server, you can use [Azure Service Static Web App](https://azure.microsoft.com/services/app-service/static/). If you don't need a web server to render content, 

An [**App Service plan**](https://docs.microsoft.com/en-us/azure/app-service/overview-hosting-plans) defines the resources that run an **App Service app**. Every App Service app must have a corresponding App Service plan in order to run it.

A single App Service plan can host multiple App Service apps.

* Azure App Service
  * Here is a [useful walkthrough](https://docs.microsoft.com/en-us/learn/modules/welcome-to-azure/4-exercise-create-website)
  * an HTTP-based service that enables you to build and host many types of web-based solutions without managing infrastructure. For example, you can host web apps, mobile back ends, and RESTful APIs in several supported programming languages.


* List existing App Service plans

    ```sh
    az appservice plan list --output table
    ```

* [Create a new app service](https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest#az_appservice_plan_create) {{< var SERVICE_NAME >}}

    ```sh
    az appservice plan create \
        --name {{< var SERVICE_NAME >}} \
        --resource-group {{< var GROUP >}} \
        --sku 'FREE' 
    ```

* Delete an app service (and all apps within it)

    ```sh
    az appservice plan delete --name {{< var SERVICE_NAME >}}
    ```

### Azure Web Apps

* Create a web application {{< var APP_NAME >}}

    ```sh
    az webapp create \
        --name {{< var APP_NAME >}} \
        --resource-group {{< var GROUP >}} \
        --plan {{< var SERVICE_NAME >}}
    ```

* Set the default web application to {{< var APP_NAME >}}

    ```sh
    az configure --defaults web={{< var APP_NAME >}}
    ```

* Configure continuous deployment from GitHub repository {{< var REPO >}} (`https://github.com/ttrojan/helloworld`)

    ```sh
    az webapp deployment source config \
        --name {{< var APP_NAME >}} \
        --resource-group {{< var GROUP >}} \
        --repo-url {{< var REPO >}} \
        --branch 'master' \
        --git-token ${GITHUB_TOKEN}
    ```

* Start a web app

    ```sh
    resource_group='learn-ff1ca2e8-ec34-4b09-abf6-e1a70c9ce459'
    name='sandboxappforlearning'

    az webapp start \
      --resource-group ${resource_group} \
      --name=${name}
    ```

* Stop a web app

    ```sh
    resource_group='learn-ff1ca2e8-ec34-4b09-abf6-e1a70c9ce459'
    name='sandboxappforlearning'

    az webapp stop \
      --resource-group ${resource_group} \
      --name=${name}
    ```

* List available runtimes

    ```sh
    az webapp list-runtimes
    ```

* View the web app in your browser

    ```sh
    az browse --name {{< var APPLICATION_NAME >}}
    ```

Microsoft's documentation has a great article about the steps to [configure a Node.js app for Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux)

{{% aside info %}}
**Tip:** You can also state the desired node version in your package.json. Azure applies this setting during deployment. For example, the following package.json entry tells Azure to use at least Node 7.0.0

```json
"engines": {
    "node": ">7.0.0"
},
```
{{% /aside %}}


### Cognitive Search

* Create a Cognitive Search service

    ```sh
    az search service create \
        -n {{< var SERVICE_NAME >}} \
        -g {{< var RESOURCE_GROUP >}} \
        --sku 'Free'
    ```

You won't be able to do much else using the command-line interface past this point. Follow along in the Azure documentation to learn how to [create a search index](https://docs.microsoft.com/en-us/azure/search/search-get-started-portal)
