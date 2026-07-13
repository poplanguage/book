---
title: Conditional expressions
description: Select one lazily evaluated value with if and else.
sidebar:
  order: 6
---

An `if` expression chooses a value without declaring a mutable local first:

```pop
local label = if available then "ready" else "missing"
```

It differs from an `if` statement in three visible ways:

- each branch is one expression;
- `else` is required;
- there is no trailing `end`.

The condition must be `Boolean`. Both branches must resolve to one identical static type after ordinary permitted conversions.

```pop
local count: Int8 = if ready then 1 else 0
```

This expected `Int8` type flows into both integer literals. The compiler rejects unlike branch types instead of inventing a dynamic common type or implicit union:

```pop
local invalid = if ready then 1 else "one" -- type error
```

## Lazy evaluation

The condition runs first and exactly one branch runs:

```pop
local divisor = 0
local value = if divisor == 0 then 0 else 100 / divisor
```

The division does not execute when `divisor` is zero. The same laziness applies during compile-time evaluation and native execution.

Conditional expressions can nest in the `else` position:

```pop
local label = if score > 89 then "excellent" else if score > 59 then "passed" else "retry"
```

Use statement `elseif` when each arm contains statements. Pop does not use `?:` punctuation.
