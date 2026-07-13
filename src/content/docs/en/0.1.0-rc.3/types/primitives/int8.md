---
title: Int8
description: Use an 8-bit signed integer with checked arithmetic.
sidebar:
  order: 3
---

`Int8` stores whole numbers from `-128` through `127`. Use it when an external format or layout specifically requires a signed 8-bit field.

```pop
local temperature: Int8 = -12
local warmer = temperature + 2
local label = `temperature={warmer}`
```

Arithmetic keeps the exact `Int8` type and traps on overflow. Both operands must be `Int8`; Pop does not silently promote one side.

```pop
local wide: Int = 100
local compact = Int8(wide)
```

`Int8(value)` performs a checked conversion and traps with `NumericConversion` when the value is outside the range.
