---
title: UInt16
description: Use a 16-bit unsigned integer.
sidebar:
  order: 8
---

`UInt16` stores values from `0` through `65_535`.

```pop
local port: UInt16 = 8_080
local nextPort = port + 1
print(`port={nextPort}`)
```

Use `UInt16` when a protocol or binary representation requires this width. A nonnegative business rule alone is not a reason to replace validation with an unsigned type.

```pop
local wide: UInt32 = 65_000
local port = UInt16(wide)
```

Narrowing is explicit and checked.
