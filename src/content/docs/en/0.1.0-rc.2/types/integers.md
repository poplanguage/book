---
title: Integer types
description: Choose integer widths and understand checked arithmetic.
sidebar:
  order: 2
---

Integers represent whole numbers. Pop provides four signed widths and four unsigned widths.

| Type | Minimum | Maximum |
| --- | ---: | ---: |
| `Int8` | -128 | 127 |
| `Int16` | -32,768 | 32,767 |
| `Int32` | -2,147,483,648 | 2,147,483,647 |
| `Int64` / `Int` | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 |
| `UInt8` / `Byte` | 0 | 255 |
| `UInt16` | 0 | 65,535 |
| `UInt32` | 0 | 4,294,967,295 |
| `UInt64` | 0 | 18,446,744,073,709,551,615 |

Use `Int` for ordinary whole-number work. Choose a fixed width when a file format, protocol, native interface, or memory layout requires it. Unsigned types are appropriate when the represented format is explicitly unsigned; they are not a substitute for validating that a value is nonnegative.

## Writing integer literals

Integer literals use decimal digits. Underscores may separate groups for readability:

```pop
local population = 8_100_000_000
local mask: UInt8 = 255
```

The underscore does not change the value. This release does not implement hexadecimal, octal, or binary literal prefixes.

A negative value is written by applying unary `-` to a literal or another signed expression:

```pop
local temperature = -12
```

Unsigned values do not support unary negation.

## Checked arithmetic

Pop checks `+`, `-`, and `*` against the range of their exact type. If a result cannot be represented, execution traps:

```pop
local maximum: UInt8 = 255
local overflow = maximum + 1 -- traps
```

Division and remainder trap when the divisor is zero. Signed division also traps when dividing the minimum value by `-1`, because the positive result is one larger than the type can represent.

No arithmetic promotion is performed. Both operands must already have the same type:

```pop
local left: Int32 = 10
local right: Int64 = 20
local total = left + right -- type error
```

General numeric conversion functions are not exposed by the Standard library in 0.1.0-rc.2, so choose compatible types at the boundaries of your program.
