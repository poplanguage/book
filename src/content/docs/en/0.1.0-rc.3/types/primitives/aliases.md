---
title: Primitive aliases
description: Use Int, Float, and Byte without changing runtime identity.
sidebar:
  order: 15
---

Pop provides three convenient primitive aliases:

| Alias | Exact target | Typical use |
| --- | --- | --- |
| `Int` | `Int64` | ordinary whole-number work |
| `Float` | `Float64` | ordinary floating-point work |
| `Byte` | `UInt8` | byte-sized protocol or storage values |

An alias is not a wrapper and adds no conversion:

```pop
local count: Int = 42
local exactWidth: Int64 = count

local ratio: Float = 0.5
local exactFloat: Float64 = ratio

local octet: Byte = 255
local exactByte: UInt8 = octet
```

Use the explicit-width spelling when width is part of the public contract. Use the alias when it makes ordinary code easier to read.
