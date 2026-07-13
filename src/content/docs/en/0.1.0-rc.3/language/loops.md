---
title: Repetition with loops
description: Repeat work with while, repeat-until, and numeric for.
sidebar:
  order: 6
---

Loops run a block more than once. A `while` loop checks its condition before every iteration:

```pop
namespace Countdown

function main()
    local number = 3

    while number > 0 do
        print(number)
        number = number - 1
    end

    print("Go!")
end
```

This program prints `3`, `2`, `1`, and then `Go!`. When `number > 0` becomes false, execution continues after `end`.

Because the condition is checked first, a `while` body might run zero times:

```pop
local number = 0
while number > 0 do
    print(number) -- never runs
end
```

As with `if`, a loop condition must be a `Boolean`.

## Running the body at least once

A `repeat` loop checks its condition after the body:

```pop
local number = 1

repeat
    print(number)
    number = number + 1
until number > 3
```

The body runs for `1`, `2`, and `3`. Even when the condition is already true in principle, a `repeat` body always runs once before Pop checks `until`.

A local declared in the body remains available to the `until` condition, which is useful when the condition depends on work just performed:

```pop
repeat
    local next = calculateNext()
    use(next)
until finished(next)
```

That local is not available after the loop finishes.

## Inclusive numeric ranges

Use numeric `for` when an integer moves from one bound to another:

```pop
for index = 1, 5 do
    print(index)
end
```

The range includes both bounds. An optional third expression sets the step:

```pop
for even = 2, 10, 2 do
    print(even)
end

for countdown = 3, 1, -1 do
    print(countdown)
end
```

The bounds and step are evaluated once from left to right and must have one identical fixed integer type. The loop binding is body-local and immutable. A zero step is invalid; checked progression can trap on overflow.

Generalized `for value in collection` iteration is not implemented in rc.3. Arrays can use a numeric range from `1` through `Array.length(values)`; the planned generalized form waits for the nominal `Iterable<T>` and `Iterator<T>` protocols.

## Leaving or skipping

`break` exits the innermost loop. `continue` advances it to its natural condition or range step:

```pop
for number = 1, 10 do
    if number == 3 then
        continue
    elseif number > 6 then
        break
    end

    print(number)
end
```

Both statements work in `while`, `repeat`, and numeric `for` loops. They cannot cross a nested function boundary or appear outside a loop.
