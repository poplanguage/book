---
title: Expressions and operators
description: Produce values with arithmetic, comparison, logic, and calls.
sidebar:
  order: 3
---

An expression is a piece of code that produces a value. Literals such as `4`, `true`, and `"Pop"` are expressions. Names, function calls, and operations are expressions too.

```pop
local base = 20
local result = base * 2 + 2
```

Pop evaluates multiplication before addition, so `result` is `42`. Parentheses can make a different order explicit:

```pop
local result = base * (2 + 2)
```

## Arithmetic

Pop provides the familiar numeric operators:

| Operator | Meaning |
| --- | --- |
| `+` | addition |
| `-` | subtraction |
| `*` | multiplication |
| `/` | division |
| `%` | integer remainder |

Both operands must have the same numeric type. Pop does not silently mix, for example, `Int32` and `Int64`. The `%` operator is available only for integers.

Integer arithmetic is checked. Overflow, division by zero, and the signed minimum divided by `-1` stop execution with a trap instead of producing a wrapped value.

The unary `-` operator negates a signed number. Unsigned integers cannot be negated.

## Comparing values

Comparison operators produce a `Boolean`:

```pop
local same = left == right
local different = left ~= right
local smaller = left < right
local atMost = left <= right
local greater = left > right
local atLeast = left >= right
```

`==` tests equality and `~=` tests inequality. Ordering with `<`, `<=`, `>`, and `>=` is available for two numbers of the same type.

Equality is deliberately type-directed. It works for `nil`, booleans, integers, strings, and supported composite values. Arrays, tables, and functions do not have general value equality in this release. Classes compare their identity: two names are equal when they refer to the same object.

## Boolean logic

Use `and`, `or`, and `not` with Boolean values:

```pop
local canEnter = hasTicket and not banned
local needsHelp = lost or injured
```

`and` stops as soon as its left side is `false`, because the complete expression cannot become true. `or` stops as soon as its left side is `true`. This short-circuit behavior is useful when the right side should run only when needed.

## Strings and conversion

Use `..` for string concatenation, backticks for interpolation, and `String(value)` for explicit primitive formatting:

```pop
local count = 3
local joined = "count=" .. String(count)
local interpolated = `count={count}`
```

The arithmetic `+` operator intentionally remains numeric-only. Numeric target calls perform explicit conversion:

```pop
local count: Int = 42
local compact = Int8(count)
local decimal = Float64(count)
```

Integer narrowing and invalid float-to-integer conversions trap rather than wrap or guess.

## Conditional values

An `if` expression produces a lazily selected value:

```pop
local description = if available then "ready" else "missing"
```

Its condition is `Boolean`, exactly one branch executes, and both branches have one static type.
