---
title: Jupyter Notebook
description: "A notebook for your Python scripts"
date: 2019-07-14T09:48:23-08:00
---

# Jupyter Notebook

## Getting Started

```sh
pip install notebook ipywidgets
```

## Changing Password

* The proper way

    1. First, enter a Python shell

      ```sh
      python
      ```

    1. Run the `passwd()` function in the notebook library

        ```py
        from notebook.auth import passwd
        passwd
        # Enter password:
        # Verify password:
        # => 'sha1:67c9e60bb8b6:9ffede0825894254b2e042ea597d771089e11aed'
        ```

    1. Edit your `jupyter_notebook_config.py` file

        ```py
        # The password should be of the form 'type:salt:hash'
        c.NotebookApp.password = 'sha1:0827b2390e3d:b54ee3e38895aaccc182705ad174bfb3c6e86a10'
        ```

* The lazy way

    1. Edit your `jupyter_notebook_config.py` file

      ```py
      from jupyter.auth import passwd
      c.NotebookApp.password = passwd('lol_nobody_will_see_this')
      ```


* Launching a Jupyter notebook at `127.0.0.1` on port `8888`

    ```sh
    jupyter notebook --no-browser
    ```

## Plotly

* Installing plotly

    ```sh
    pip install plotly # lol go figure
    ```

* Render a bar graph figure

    ```py
    import plotly.graph_objects.Figure
    figure = Figure(data=go.Bar(y=[2, 3, 1]))
    figure.show()
    ```