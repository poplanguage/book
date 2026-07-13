---
title: Int32
description: Use a portable 32-bit signed integer.
sidebar:
  order: 5
---

`Int32` ranges from `-2_147_483_648` through `2_147_483_647`.

```pop
local population: Int32 = 1_500_000
local projected = population + 25_000
local asFloat = Float64(projected)
```

Ordering supports `<`, `<=`, `>`, and `>=` when both sides have the same numeric type. Equality uses `==` and `~=`.

`Int32(floatValue)` truncates toward zero and traps for NaN, infinity, or an out-of-range result. It never silently wraps.
