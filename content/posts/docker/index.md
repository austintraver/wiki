---
title: "Docker"
description: "How to containerize literally everything"
date: 2020-02-04T14:52:26-08:00
---

# Docker

Docker is a really cool technology. If you need a video tutorial to jump in and get started, Peter McKee, a senior software engineer at Docker made a great video to help you [get started with Docker](https://youtu.be/iqqDU2crIEQ)

## Getting Started

* Installing Docker on macOS

    ```sh
    brew cask install docker
    ```

* Optionally, [add command completion for the shell](https://docs.docker.com/compose/completion/)

Open the application in the menu bar to have Docker run its initial configurations, and then log in to the docker hub. From here, you're all set up and can proceed to use Docker from the command line.

* Logging into Docker

    ```sh
    docker login
    ```

* Logging out of Docker

    ```sh
    docker logout
    ```

* Pulling an image from Docker Hub

    ```sh
    docker pull ubuntu
    ```

* List currently installed images

    ```sh
    docker images
    ```

* [Rename a docker container](https://docs.docker.com/engine/reference/commandline/container_rename/)

* Start running a docker image

    ```sh
    docker run ubuntu echo 'hello'
    ```

{{% aside danger %}}
**Warning:** Every time you use the `run` command it creates a new container, so if you type `run ubuntu` three times you will have three `ubuntu` containers.
{{% /aside %}}

* See if any processes are running

    ```sh
    docker ps
    ```

* Start running the container in interactive mode, establishing a connection to the container with a console

    ```sh
    docker run -it ubuntu /bin/zsh
    ```

* Start a docker container, specifying a name for the container

    ```sh
    docker run --name example -it ubuntu /bin/bash
    ```

* Continue running the container that you previously exited

    ```sh
    docker start example
    ```

* Execute a command on a currently running docker container

    ```sh
    docker exec -it example '/bin/bash'
    ```

* Stop a container

    ```sh
    docker stop example
    ```

* [Kill a running container](https://docs.docker.com/engine/reference/commandline/container_kill/)

    ```sh
    container_id='384bf99f07c8'

    docker container kill ${container_id}
    ```

* List the currently running containers

    ```sh
    # [ Short Form ]
    docker ps

    # [ Long Form ]
    docker container ls
    ```

* List all containers

    ```sh
    docker ps -a
    ```

* Remove a container (not the image that created it)

    ```sh
    docker rm example
    ```

* Remove an image from docker

    ```sh
    docker rmi ubuntu
    ```

{{% aside info %}}
**Tip:** You can also specify the first 2 characters of its container ID if the name associated with the docker container is too verbose to type out in its entirety. You can't, however, type just part of the containers name. This shortcut only applies to the container ID.
{{% /aside %}}
