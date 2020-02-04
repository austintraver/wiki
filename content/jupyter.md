+++
title = "Jupyter"
description = "A notebook for your Python scripts"
date = 2020-02-04T07:37:39-08:00
image = "jupyter.jpg"
+++

# jupyter

## Getting Started

```sh
pip install notebook ipywidgets
```

## Changing Password

1. First, enter a Python shell

  ```sh
  python
  ```

2. Run the `passwd()` function in the notebook library

  ```py
  from notebook.auth import passwd
  passwd
  # Enter password:
  # Verify password:
  # => 'sha1:67c9e60bb8b6:9ffede0825894254b2e042ea597d771089e11aed'
  ```

3. Edit your `jupyter_notebook_config.py` file

  ```py
  # The password should be of the form 'type:salt:hash'
  c.NotebookApp.password = 'sha1:0827b2390e3d:b54ee3e38895aaccc182705ad174bfb3c6e86a10'
  ```


## Changing Password (the lazy way)

1. Edit your `jupyter_notebook_config.py` file

  ```py
  from jupyter.auth import passwd
  c.NotebookApp.password = passwd('lol_nobody_will_see_this')
  ```


## Launching a Notebook

```sh
# Launch a jupyter notebook at http://127.0.0.1:8888
jupyter notebook --no-browser &!
```

## Plotly

* Installing plotly

```sh
pip install plotly # go figure
```

* Sample code

```py
import plotly.graph_objects.Figure
figure = Figure(data=go.Bar(y=[2, 3, 1]))
figure.show()
```
