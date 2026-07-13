---
title: UInt64
description: Use a 64-bit unsigned integer and preserve its range explicitly.
sidebar:
  order: 10
---

`UInt64` stores values from `0` through `18_446_744_073_709_551_615`.

```pop
local sequence: UInt64 = 4_000_000_000
local next = sequence + 1
print(`sequence={next}`)
```

No signed integer type contains the entire `UInt64` range. `Int64(sequence)` therefore performs a checked conversion and may trap. `Float64(sequence)` is always representable as a finite float but may round because `Float64` cannot represent every 64-bit integer exactly.
