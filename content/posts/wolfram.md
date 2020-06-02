+++
title = "Wolfram"
date = 2020-03-17T21:08:37-07:00
draft = true
+++

# Wolfram Alpha

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

