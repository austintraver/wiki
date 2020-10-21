---
title: Stripe
description: "A very descriptive description indeed"
date: 2020-10-11T18:06:19-07:00
draft: true
---

# Stripe CLI

The [Stripe CLI reference](https://stripe.com/docs/cli) is amazing. Anything 
you see here is probably something on there that I wrote down to keep here.

* Install [the Stripe CLI](https://stripe.com/docs/stripe-cli)

    ```sh
    brew tap stripe/stripe-cli
    brew install stripe
    ```

* Login with your stripe account

    ```sh
    stripe login
    ```

## `open`

The [`open`](https://stripe.com/docs/cli/open) subcommand can open up pages on your web browser

* View the CLI reference

    ```sh
    stripe open cliref
    ```

* View the documentation

    ```sh
    stripe open docs
    ```

* View the API

    ```sh
    stripe open api
    ```

* View the dashboard

    ```sh
    stripe open dashboard
    ```

## Configuration

The [`config`](https://stripe.com/docs/cli/config) subcommand is used to set configuration options for the CLI.

{{% aside info %}}
All configurations are stored in `${XDG_CONFIG_HOME}/stripe/config.toml`
{{% /aside %}}
