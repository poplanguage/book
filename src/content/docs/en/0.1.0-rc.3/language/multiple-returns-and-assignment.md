---
title: Multiple returns and assignment
description: Work with exact fixed type packs instead of dynamic Lua adjustment.
sidebar:
  order: 10
---

A parenthesized result annotation declares an exact fixed pack:

```pop
private function split(value: Int): (Int, String)
    return value / 2, String(value % 2)
end
```

Every element type and the exact arity are known before HIR. There is no dynamic variadic result, missing-value `nil` padding, or discarded extra value.

## Destructuring a call

Declare one local for each result:

```pop
local quotient: Int, remainder: String = split(9)
print(`quotient={quotient}, remainder={remainder}`)
```

Each binding may have its own optional annotation. A mismatch in count or type is a compile-time error.

## Swapping values

Multiple assignment evaluates every right-hand value before performing stores:

```pop
local left = 10
local right = 20
left, right = right, left
```

Targets are located left to right, values are evaluated left to right, and stores occur left to right. Effectful receivers and indexes are evaluated once.

## Static tuple projection

A fixed pack can remain one value. Use a one-based literal index to project its exact element type:

```pop
local result = split(9)
local quotient = result[1]
local remainder = result[2]
```

The index must be a positive in-range integer literal. `result[index]`, `result[0]`, and an out-of-range slot are compile-time errors rather than dynamic tuple lookup.
