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

## Getting Started

* Installing Docker on macOS

    ```shell script
    brew cask install docker
    ```

* Optionally, add the [docker completion script] for [zsh][zsh completion]

[docker completion script]: https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker

Open the application in the menu bar to have Docker run its initial configurations, and then log in to the docker hub. From here, you're all set up and can proceed to use Docker from the command line.

* Logging into Docker

    ```shell script
    docker login
    ```

* Logging out of Docker

    ```shell script
    docker logout
    ```

* Pulling an image from Docker Hub

    ```shell script
    docker pull ubuntu
    ```

* List currently installed images

    ```shell script
    docker images
    ```

* [Rename a docker container](https://docs.docker.com/engine/reference/commandline/container_rename/)

* Start running a docker image

    ```shell script
    docker run ubuntu echo 'hello'
    ```

{{% aside danger %}}

**Warning:** Every time you use the `run` command it creates a new container, so if you type `run ubuntu` three times you will have three `ubuntu` containers.

{{% /aside %}}

* See if any processes are running

    ```shell script
    docker ps
    ```

* Start running the container in interactive mode, establishing a connection to the container with a console

    ```shell script
    docker run -it ubuntu /bin/bash
    ```

* Start a docker container, specifying a name for the container

    ```shell script
    docker run --name example -it ubuntu /bin/bash
    ```

* Continue running the container that you previously exited

    ```shell script
    docker start example
    ```

* Execute a command on a currently running docker container

    ```shell script
    docker exec -it example '/bin/bash'
    ```

* Stop a container

    ```shell script
    docker stop example
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

* Remove a container (not the image that created it)

    ```shell script
    docker rm example
    ```

* Remove an image from docker

    ```shell script
    docker rmi ubuntu
    ```

{{% aside info %}}

**Tip:** You can also specify the first 2 characters of its container ID if the name associated with the docker container is too verbose to type out in its entirety. You can't, however, type just part of the containers name. This shortcut only applies to the container ID.

{{% /aside %}}

[zsh completion]: https://zsh.fyi/completion-system.html#completion-system