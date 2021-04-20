---
title: "Docker"
description: "How to containerize literally everything"
date: 2020-02-04T14:52:26-08:00
---

# Docker

Docker is a really cool technology. If you need a video tutorial to jump in and
get started, Peter McKee, a senior software engineer at Docker made a great
video to help you
[get started with Docker](https://youtu.be/iqqDU2crIEQ). To learn more, watch
Michael Irwin's talk at DockerCon 2019,
["Containers for Beginners"](https://www.youtube.com/watch?v=6gJs0F8V3tM&list=PLkA60AVN3hh8hNjc0fQ5_uJYIrS7s1JLW)
the first installment of Docker's "Docker 101" series on YouTube.

Liz Rice's talk on [creating Docker containers from scratch](https://youtu.be/8fi7uSYlOdc)

## Getting Started

* Installing Docker on macOS

    ```shell script
    brew cask install docker
    ```

* [Installing Docker on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

    ```shell script
    sudo -i
    curl -fsSL https://get.docker.com | bash -
    ```

* Optionally, add the [docker completion script] for [zsh][zsh completion]

Open the application in the menu bar to have Docker run its initial configurations, and then log in to the docker hub. From here, you're all set up and can proceed to use Docker from the command line.

## Command Line Operations

* Logging into Docker

    ```shell script
    docker login
    ```

* Logging out of Docker

    ```shell script
    docker logout
    ```

* Pulling an image named {{< var IMAGE >}} from Docker Hub

    ```shell script
    docker pull {{< var IMAGE >}}
    ```

* List currently installed images

    ```shell script
    docker images
    ```

* [Rename a docker container](https://docs.docker.com/engine/reference/commandline/container_rename/)

* Start running a docker image {{< var IMAGE >}} and execute the command `echo`

    ```shell script
    docker run {{< var IMAGE >}} echo 'hello'
    ```

{{% aside danger %}}

**Warning:** Every time you use the `run` command it creates a new container, so if you type `run ubuntu` three times you will have three `ubuntu` containers.

{{% /aside %}}

* See if any processes are running

    ```shell script
    docker ps
    ```

* View all processes, whether active or finished

    ```shell script
    docker ps --all
    ```

* Start a docker container named {{< var CONTAINER >}} based on the image named {{< var IMAGE >}}, specifying a name for the container

    ```shell script
    docker run \
        --name {{< var CONTAINER >}} \
        --interactive \
        --tty {{< var IMAGE >}} \
        /bin/bash
    ```

* Continue running the container named {{< var CONTAINER >}} that you previously exited

    ```shell script
    docker start {{< var CONTAINER >}}
    ```

* Execute a command on a currently running docker container named {{< var CONTAINER >}}

    ```shell script
    docker exec --interactive --tty {{< var CONTAINER >}} '/bin/bash'
    ```

* Stop a container named {{< var CONTAINER >}}

    ```shell script
    docker stop {{< var CONTAINER >}}
    ```

* [Kill a running container](https://docs.docker.com/engine/reference/commandline/container_kill/)

    ```shell script
    container_id='384bf99f07c8'

    docker container kill ${container_id}
    ```

* List the currently running containers

    ```shell script
    # [ Short Form ]
    docker ps

    # [ Long Form ]
    docker container ls
    ```

* List all containers

    ```shell script
    docker ps -a
    ```

* Remove a container named {{< var CONTAINER >}} (not the image that created it)

    ```shell script
    docker rm {{< var CONTAINER >}}
    ```

* Removing an image named {{< var IMAGE >}} from the local machine

    ```shell script
    docker rmi {{< var IMAGE >}}
    ```

* Building an image named {{< var IMAGE >}} from a Dockerfile

    ```shell script
    docker build . \
        --tag '{{< var USERNAME >}}/{{< var IMAGE >}}' \
        --squash
    ```

## Publication

* Publishing an image named {{< var IMAGE >}} to the Docker Hub container registry

    ```shell script
    docker publish {{< var USERNAME >}}/{{< var IMAGE >}}
    ```

A few additional steps are required to [publishing a container to GitHub's container registry](https://docs.github.com/en/packages/guides/connecting-a-repository-to-a-container-image#connecting-a-repository-to-a-container-image-on-the-command-line).

{{% aside info %}}

**Tip:** You can also specify the first 2 characters of its container ID if the name associated with the docker container is too verbose to type out in its entirety. You can't, however, type just part of the containers name. This shortcut only applies to the container ID.

{{% /aside %}}

[zsh completion]: https://zsh.fyi/completion-system.html#completion-system
[docker completion script]: https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker



## SSH Connections

* As represented in a `compose.yaml` file

```
version: '3'
services:
  my_service_name:
    build: .
    environment:
      - SSH_AUTH_SOCK="${SSH_AUTH_SOCK}"
    volumes:
      - ${SSH_AUTH_SOCK}:${SSH_AUTH_SOCK}
```

* As a call to `docker`

```
docker run \
    --rm \
    --tty \
    --interactive \
    -v ${SSH_AUTH_SOCK}:${SSH_AUTH_SOCK} \
    --env SSH_AUTH_SOCK=${SSH_AUTH_SOCK} \
    {{< var CONTAINER_TAG >}}
```
