---
title: Floating-point types
description: Work with Float32 and Float64 in the current release.
sidebar:
  order: 3
---

`Float32` and `Float64` store IEEE 754 floating-point values. `Float` is an alias for `Float64`.

Floating-point values are useful for measurements and calculations in which fractional results and rounding are expected. They should not be used when an exact decimal amount—such as money—must remain exact.

## Literals

A decimal point or base-ten exponent makes a floating-point literal. Without an expected type it is `Float64`; an annotation can select `Float32`:

```pop
local width: Float32 = 12.5
local distance = 1_000.25
local large = 6.02e23
local small = 2e-3
```

## Arithmetic behavior

Floating-point values support `+`, `-`, `*`, and `/` when both operands have the same exact type. Results are rounded to that type’s precision.

Unlike integer division, floating-point division by zero follows IEEE 754 behavior and can produce infinity rather than a Pop division-by-zero trap.

Ordering supports `<`, `<=`, `>`, and `>=` for matching floating-point types. Every ordering comparison with NaN is false. Default `==` and `~=` are not available for floats in this release.

There is no implicit conversion between `Float32`, `Float64`, and integer types. Use explicit target-type syntax:

```pop
local count: Int = 7
local measurement = Float64(count)
local whole = Int32(measurement) -- truncates toward zero; traps if out of range
```

Continue with [Decimal floating-point literals](./decimal-floating-point-literals/) and [Numeric conversions](./numeric-conversions/) for the detailed rules.
