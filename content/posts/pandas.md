---
title: Pandas
description: "The big-data Python library powering literally everything"
date: 2020-02-04T14:52:27-08:00
image: "pandas.jpg"
---

# Pandas

```py
import pandas as pd
import sys

# Define a dictionary containing employee data
df = pd.DataFrame(
  index=['a', 'b', 'c'],
  columns=['time', 'date', 'name']
  )

# access the first row
df.loc['a']
# equivalent
df.iloc[0]

# select the date column from all rows, starting after the row labeled 'b'
df.loc['b': , 'date']
# equivalent
df.iloc[1: , 1]

# select all rows from the column labeled "time"
df['time']
# equivalent
df.loc[:, 'time']

# select columns from two columns, 'time' and 'date'
print(df.index)

# select the 1st & 3rd rows only, and the column 'date'
bool_array = [True, False, True]
df.loc[bool_array , 'date']

# select the 1st & 3rd columns only, and all rows
df.loc[: , bool_array]
```
