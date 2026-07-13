---
title: Floating-point types
description: Work with Float32 and Float64 in the current release.
sidebar:
  order: 3
---

`Float32` and `Float64` store IEEE 754 floating-point values. `Float` is an alias for `Float64`.

Floating-point values are useful for measurements and calculations in which fractional results and rounding are expected. They should not be used when an exact decimal amount—such as money—must remain exact.

## Literals in 0.1.0-rc.2

The parser in this release accepts decimal digits as numeric literals but does not yet accept a decimal point or exponent. A literal can still become a floating-point value when its expected type is explicit:

```pop
local width: Float32 = 12
local distance: Float64 = 1_000
```

Source forms such as `1.5` and `2e3` are not available in this version. This limitation makes floating-point types useful mainly at typed boundaries and in compiler/runtime-facing code until richer literal and conversion support is exposed.

## Arithmetic behavior

Floating-point values support `+`, `-`, `*`, and `/` when both operands have the same exact type. Results are rounded to that type’s precision.

Unlike integer division, floating-point division by zero follows IEEE 754 behavior and can produce infinity rather than a Pop division-by-zero trap.

Ordering with `<` and `>` is supported for matching floating-point types. Default `==` and `~=` are not available for floats in this release. That avoids presenting exact bit-level floating-point equality as ordinary value equality.

There is no implicit conversion between `Float32`, `Float64`, and integer types.
