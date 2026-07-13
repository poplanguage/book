---
title: Float64
description: Use the default 64-bit floating-point format.
sidebar:
  order: 12
---

`Float64` is the default type of a literal containing a decimal point or exponent. `Float` is an exact alias.

```pop
local distance = 12.75
local scale = 6.02e23
local tiny = 2e-3
```

`Float64` supports `+`, `-`, `*`, `/`, unary `-`, and all four ordering operators with another `Float64`.

```pop
local whole = Int32(distance) -- 12
local text = String(distance)
```

Float-to-integer conversion truncates toward zero and traps for NaN, infinity, or an out-of-range result. Primitive string formatting is locale-independent.
