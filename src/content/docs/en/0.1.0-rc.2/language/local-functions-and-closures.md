---
title: Local functions and closures
description: Define behavior inside a function and capture surrounding values.
sidebar:
  order: 7
---

A function can be local to another function. This is useful when a small operation belongs to one algorithm and should not become part of the namespace:

```pop
namespace Calculations

function main()
    local function square(value: Int): Int
        return value * value
    end

    print(square(6))
end
```

The local `square` function exists only inside `main`.

## Capturing a surrounding value

A local function may use values declared around it:

```pop
function main()
    local factor = 3

    local function scale(value: Int): Int
        return value * factor
    end

    print(scale(7))
end
```

The function **captures** `factor`, so calling `scale(7)` returns `21`. A function together with the surrounding state it captures is called a **closure**.

Captured values remain available for as long as the closure needs them. If a captured local is assigned, calls share the updated storage rather than receiving unrelated copies:

```pop
function main()
    local count = 0

    local function next(): Int
        count = count + 1
        return count
    end

    print(next())
    print(next())
end
```

This prints `1` and then `2`.

## Anonymous functions

Function syntax can also produce a function value without giving it a namespace-level name:

```pop
local double: function(value: Int): Int = function(value: Int): Int
    return value * 2
end

print(double(5))
```

The annotation shows the function type: it accepts one `Int` named `value` and returns an `Int`. Calling a function value uses the same parentheses as an ordinary function call.

Closures are managed values. They can outlive the call that created them, and the runtime keeps captured state alive while it remains reachable. Recursive local functions are supported as well, although an iterative solution is often easier to read for simple counting tasks.
