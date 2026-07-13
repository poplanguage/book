---
title: UInt32
description: Use a portable 32-bit unsigned integer.
sidebar:
  order: 9
---

`UInt32` stores values from `0` through `4_294_967_295`.

```pop
local flags: UInt32 = 1_024
local doubled = flags * 2
local description = `value={doubled}`
```

rc.3 implements arithmetic and ordering, but not bitwise operators or shifts. Use `UInt32` for an integer value with this representation, not as a promise of a bit-mask API.

`Int64(flags)` is an exact checked integer conversion because every `UInt32` value fits in `Int64`.
