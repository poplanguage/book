---
title: UInt8
description: Use an unsigned byte-sized integer.
sidebar:
  order: 7
---

`UInt8` stores values from `0` through `255`. `Byte` is an exact alias for it.

```pop
local red: UInt8 = 220
local green: Byte = 128
local brighter = red + 1
```

Unsigned integers do not support unary `-`. Arithmetic is checked, so adding `1` to `255` traps instead of wrapping to zero.

```pop
local value: Int = 200
local octet = UInt8(value)
```

The conversion traps if the source is negative or greater than `255`.
