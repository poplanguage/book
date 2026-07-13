---
title: Numeric for ranges
description: Count over inclusive fixed-integer ranges.
sidebar:
  order: 7
---

The first rc.3 `for` form walks an inclusive integer range:

```pop
for index = 1, 5 do
    print(index)
end
```

This prints `1` through `5`. The last bound is included when the progression reaches it.

## Choosing a step

Omit the third expression for a step of `1`, or provide one explicitly:

```pop
for even = 2, 10, 2 do
    print(even)
end

for countdown = 5, 1, -1 do
    print(countdown)
end
```

A positive step continues while the binding is `<=` the last bound. A negative step continues while it is `>=` the last bound. A range can be empty when its direction cannot reach the bound.

## Static rules

The first bound, last bound, and optional step:

- are evaluated exactly once, from left to right, before the loop;
- must have one identical fixed integer type;
- cannot use a floating-point type;
- use checked progression arithmetic.

The loop binding is immutable and exists only inside the body:

```pop
for index: Int8 = 1, 3 do -- type annotation is not part of the range grammar
    index = 2              -- also invalid: the binding cannot be assigned
end
```

Write the bounds with the desired context instead:

```pop
local first: Int8 = 1
local last: Int8 = 3

for index = first, last do
    print(String(index))
end
```

A statically known zero step is rejected. A runtime zero step traps with `InvalidRangeStep` before the first iteration.

## Arrays today

Arrays are one-based, so an index range covers their positions cleanly:

```pop
for index = 1, Array.length(names) do
    print(Array.get(names, index))
end
```

rc.3 does not implement `for name in names`. Generalized iteration remains deferred until the nominal `Iterable<T>` and `Iterator<T>` protocols are complete; there is no dynamic iterator fallback.
