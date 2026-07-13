---
title: Decimal floating-point literals
description: Write fractional and exponent values with predictable types.
sidebar:
  order: 4
---

A numeric literal containing a decimal point or base-ten exponent is floating-point:

```pop
local half = 0.5
local avogadro = 6.02e23
local small = 2e-3
local grouped = 1_000.25
```

Without an expected type, each value above is `Float64`. An expected annotation selects the format before the literal is rounded:

```pop
local compact: Float32 = 1.25
local precise: Float64 = 1.25
```

A decimal floating-point literal never implicitly becomes an integer:

```pop
local invalid: Int = 1.0 -- type error
```

Digit separators must sit between digits. Spellings such as `1_000.25_5e1_0` are accepted, while `_1.0`, `1_.0`, `1._0`, `1e_2`, and `1__0` are rejected.

## Ordering

All four ordering operators require two values of the same numeric type:

```pop
local inside = value >= 0.0 and value <= 1.0
```

IEEE comparisons are ordered: `<`, `<=`, `>`, and `>=` are all false when either operand is NaN. Floating-point division by zero follows IEEE behavior rather than the integer division trap.

Hexadecimal floating-point syntax and ambient-locale decimal punctuation are not part of rc.3.
