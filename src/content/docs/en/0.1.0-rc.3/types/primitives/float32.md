---
title: Float32
description: Use a 32-bit IEEE 754 floating-point value.
sidebar:
  order: 11
---

`Float32` stores a 32-bit IEEE 754 floating-point value. An annotation makes a decimal literal use this format:

```pop
local ratio: Float32 = 0.5
local scientific: Float32 = 2.5e3
local doubled = ratio * 2.0
```

Arithmetic rounds to `Float32`. Division by zero follows IEEE behavior and can produce infinity. Ordering with NaN is always false.

```pop
local count: Int = 7
local ratio = Float32(count)
local wide = Float64(ratio)
```

Integer-to-float conversion uses IEEE round-to-nearest, ties-to-even. Widening `Float32` to `Float64` is exact.
