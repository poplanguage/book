---
title: Int16
description: Use a 16-bit signed integer with explicit conversion.
sidebar:
  order: 4
---

`Int16` stores whole numbers from `-32_768` through `32_767`.

```pop
local altitude: Int16 = 1_250
local adjusted = altitude - 50
print(`adjusted altitude={adjusted}`)
```

`+`, `-`, `*`, `/`, and `%` use checked `Int16` arithmetic. Division by zero, remainder by zero, and an unrepresentable result trap.

```pop
local source: Int32 = 30_000
local altitude = Int16(source)
```

The target-type call makes narrowing explicit and checks the range at runtime.
