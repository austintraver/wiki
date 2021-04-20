---
title: Wolfram
date: 2020-03-17T21:08:37-07:00
description: 'A multi-paradigm language for symbolic computation'
draft: false
---

# Wolfram

## Getting started

## Wolfram Language

If you are new to the Wolfram Language, or even if you aren't, honestly, you
should check out Prof. Richard Gaylord's three lecture series on titled
*Wolfram Language Fundamentals*. Trust me, it's worth it.

{{< youtube "H-rnezxOCA8" >}}

{{< youtube "5FWzvXPLw7A" >}}

{{< youtube "u1Oijydu4qI" >}}

## WolframScript

First, you'll need to install Wolfram's suite of tools to your machine. You will
need to install the following applications:

* [*WolframScript*](https://account.wolfram.com/products/downloads/wolframscript)
* *Wolfram Engine*
* *Wolfram Desktop*

After you have completed this step, search within the application's package contents,
and look for an executable file titled 
[`wolframscript`](https://reference.wolfram.com/language/ref/program/wolframscript.html).
Add the directory containing this file to your shell's search path, preferrably
doing so in your shell's runtime configuration file.

After you have authenticated to the server, you will need to provide `wolframscript` with
the path to the kernel file. It is located within your Wolfram Engine installation.

```shell script
wolframscript -config WOLFRAMSCRIPT_KERNELPATH=/Applications/Wolfram\ Desktop.app/Contents/MacOS/WolframKernel
```

Alternatively, you can set the kernel path as an environment variable

```shell script
export WOLFRAMSCRIPT_KERNELPATH=/Applications/Wolfram\ Desktop.app/Contents/MacOS/WolframKernel
```

I recommend you place your configuration files somewhere more standard, similar to what I have below:

```shell script
export WOLFRAMSCRIPT_CONFIGURATIONPATH=${XDG_CONFIG_HOME}/wolfram/config.txt
export WOLFRAMSCRIPT_AUTHORIZATIONPATH=${XDG_CONFIG_HOME}/wolfram/auth.txt
```

Next, in order for `wolframscript` to generate our credentials at the authorization
path provided above, we will need to authenticate ourselves to the cloud server.

```shell script
wolframscript -authenticate
```

From here, you're good to go!

```shell script
wolframscript -l -c '1+1'
```

The expected output of this command is:

```txt
2
```

At long last, we have found the answer.

## Getting Help

* Get information on a given Wolfram Language Symbol:

    ```wl
    Entity["WolframLanguageSymbol", "LinearSolve"]
    ```

## Determinant

```wl
Det[{{1, 2, 1}, {1, 1, 0}, {0, 1, 1}}]
```

## Cross Product

```wl
Cross[{1, 2, 3}, {3, 4, 5}]
```

## Matrix Product

```wl
{{1, 2}, {3, 4}} . {{-1, 1}, {0, 2}}
```

## Row Reduction

* Get the matrix in reduced row echelon form:

    ```wl
    RowReduce[{{1, -3, 3, -4}, {2, 3, -1, 15}, {4, -3, -1, 19}}]
    ```

## Matrix Rank

* Get the rank of a matrix

    ```wl
    MatrixRank[{{1, 2, 1}, {-2, -3, 1}, {3, 5, 0}}]
    ```

## Eigenvalues

```wl
Eigenvalues[{{3, -1}, {0, 2}}]
```

## Eigenvectors

```wl
Eigenvectors[{{-2, 5, 7}, {3, 11, 15}, {-4, -3, 10}}]
```

## Jordan Decomposition

```wl
JordanDecomposition[{{-1, 5}, {-3, 11}}]
```

## Kernel

* The kernel of a matrix is just its null space

## Null Space

  ```wl
  NullSpace[{{1, 3, 3}, {-3, -5, -3}, {3, 3, 0}}]
  ```

## Positive Definite

```wl
PositiveDefiniteMatrixQ[{{3, -3}, {-3, 5}}]
```

## Probability

### Distributions

[Wolfram Alpha Reference](https://reference.wolfram.com/language/howto/WorkWithStatisticalDistributions.html)

* Normal distribution of `μ` and `σ`

    ```wl
    NormalDistribution[\[Mu], \[Sigma]]
    ```

* Probability Distribution

    * First example

        ```wl
        PDF[NormalDistribution[\[Mu], \[Sigma]], x]
        ```

    * Second example

        ```wl
        Plot[PDF[NormalDistribution[2, 3], x], {x, -5, 10}]
        ```

## Wolfram Client Library for Python

If you'd like to stay in Python, and have the features of Wolfram Engine,
you can install the 
[Wolfram Client Library for Python](https://reference.wolfram.com/language/WolframClientForPython/docpages/install.html#installation)

```shell script
pip install wolframclient
```


```python
from wolframclient.evaluation import WolframLanguageSession
from wolframclient.language import wl, wlexpr

sesh.evaluate(wl.WolframAlpha("temperature in los angeles", "Result"))
# Quantity[55.0, 'DegreesFahrenheit']
sesh.evaluate(wl.WolframAlpha("stock price of GME", "Result"))
# (DateObject[(2021, 4, 1), 'Day', 'Gregorian', -7.0], Quantity[191.4499969482422, 'USDollars'])
sesh.evaluate(wl.WolframAlpha("value of chinese yuan in dollars", "Result"))
# Quantity[0.15, 'USDollars']
```
