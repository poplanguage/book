---
title: Int64
description: Use a 64-bit signed integer, the representation behind Int.
sidebar:
  order: 6
---

`Int64` ranges from `-9_223_372_036_854_775_808` through `9_223_372_036_854_775_807`. `Int` is an exact alias for it and is the default type of an unannotated integer literal.

```pop
local count: Int64 = 42
local ordinary: Int = count
local next = ordinary + 1
```

Use `Int` for ordinary program counters and quantities. Spell `Int64` when the width itself is part of a public format or native boundary.

```pop
local text = String(count)
local measurement = Float64(count)
```

Large `Int64` values can round when converted to a floating-point format; the conversion uses the target IEEE representation.
