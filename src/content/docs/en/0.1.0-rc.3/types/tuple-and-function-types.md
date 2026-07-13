---
title: Tuple and function types
description: Group positional values and describe callable values.
sidebar:
  order: 6
---

A tuple groups a fixed number of values by position. Each position may have a different type:

```pop
local entry: (String, Int) = ("Ada", 42)
```

The type `(String, Int)` says that the first item is a `String` and the second is an `Int`. The tuple’s length and the type at each position are part of its type, so `(String, Int)` differs from `(Int, String)` and from `(String, Int, Boolean)`.

Tuples are useful for small, temporary groupings in which positional meaning is obvious. Prefer a record when fields deserve names or the value forms part of a public model.

Tuple equality is available when equality exists for every element. Values are compared position by position.

Tuple and fixed-pack elements use one-based static projection:

```pop
local entry: (String, Int) = ("Ada", 42)
local name = entry[1]
local score = entry[2]
```

The index must be an in-range integer literal, so each projected type is known at compile time. A computed index is rejected.

Function result syntax such as `(Int, String)` uses the same tuple-like representation for an exact fixed pack. See [Multiple returns and assignment](../language/multiple-returns-and-assignment/).

## Function types

Functions can be stored and passed as values. A function type describes its parameters and results:

```pop
function(value: Int): Int
```

The following local holds an anonymous function matching that type:

```pop
local increment: function(value: Int): Int = function(value: Int): Int
    return value + 1
end

local result = increment(41)
```

Parameter names are written in function types, followed by their types. A function with no result omits the result annotation:

```pop
function(message: String)
```

Function types must match exactly when one callable value is assigned to another. Function values do not support `==` or `~=` because closure identity is not exposed as ordinary value equality.
