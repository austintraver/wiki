+++
title = "Wolfram"
date = 2020-03-17T21:08:37-07:00
draft = true
+++


```wl
Export[
  "output.svg",
  WolframAlpha[
    "integrate 1/(1+cos(x)^2)",
    {
      {
        "IndefiniteIntegral", 2
      },
        "Content"
    },
    PodStates -> {"IndefiniteIntegral__Step-by-step solution"}
  ]
]
```
