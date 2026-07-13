---
title: Numeric conversions
description: Convert explicitly between fixed numeric types with checked semantics.
sidebar:
  order: 5
---

Convert an existing numeric value by calling the target type:

```pop
local count: Int = 42
local compact = Int8(count)
local unsigned = UInt32(count)
local measurement = Float64(count)
```

This is compiler-known syntax, not an ordinary overload or runtime lookup. It accepts exactly one numeric operand. Pop does not perform implicit widening between existing values.

## Integer to integer

The result must fit the target's exact range:

```pop
local wide: Int = 1_000
local compact = UInt8(wide) -- traps: greater than 255
```

Changing width or signedness is always explicit. Out-of-range conversion traps with `NumericConversion`; it never wraps.

## Integer to floating point

The conversion uses IEEE round-to-nearest, ties-to-even in the target format:

```pop
local count: UInt64 = 9_007_199_254_740_993
local approximate = Float64(count)
```

Large integers may round because a floating-point format cannot represent every integer in its range.

## Floating point to integer

Conversion truncates toward zero:

```pop
local positive = Int32(12.75)  -- 12
local negative = Int32(-12.75) -- -12
```

NaN, infinity, and out-of-range results trap with `NumericConversion`.

## Floating point width

`Float32` to `Float64` is exact. `Float64` to `Float32` rounds to the target representation:

```pop
local compact: Float32 = 1.25
local wide = Float64(compact)
local compactAgain = Float32(wide)
```

Converting a value to its own canonical numeric type preserves it.
