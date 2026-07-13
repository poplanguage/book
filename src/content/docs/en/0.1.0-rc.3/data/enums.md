---
title: Enums
description: Model a closed nominal set of payload-free cases.
sidebar:
  order: 5
---

An enum declares a closed set of named values:

```pop
public enum Color
    Red
    Green
    Blue
end
```

Refer to a case through its enum type:

```pop
local selected: Color = Color.Blue
local isBlue = selected == Color.Blue
```

Enums are nominal. Two declarations with the same case names are still different types, and equality or inequality requires both operands to have the exact same enum type.

## Representation and limits

Declaration order assigns a compact zero-based `UInt32` discriminant internally, but there is no implicit conversion between an enum and an integer. Enums support `==` and `~=`; ordering and arithmetic are rejected.

Use an enum when alternatives have no payload. Use a [tagged union](./tagged-unions/) when cases carry different data. rc.3 does not implement custom discriminants, flags enums, case iteration, or explicit integer conversion.
