---
title: Repetition with loops
description: Repeat work with while and repeat-until.
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

This release has no implemented `break` or `continue` statement. Express early stopping through the loop condition, and place conditional work inside an `if` when an iteration should skip part of its body.
