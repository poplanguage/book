---
title: Functions and control flow
description: Keep Luau-shaped blocks while learning Pop's exact function, result, and loop contracts.
sidebar:
  order: 2
---

Control flow is where Luau knowledge saves the most time. Function and block syntax is immediately readable, but Pop gives calls, results, conditions, and loops stricter static boundaries.

## Function declarations look familiar

```pop
function greet(name: String)
    print(`Hello, {name}!`)
end
```

The keywords and block structure are familiar. The parameter type is not optional documentation: every call must supply exactly one `String`.

```pop
greet("Ada")

-- Rejected: wrong argument type.
-- greet(42)
```

Pop does not silently fill a missing argument with `nil`, ignore an extra argument, or defer the mismatch to runtime.

## Results must be declared

Add the result type after the parameter list:

```pop
function double(value: Int): Int
    return value * 2
end
```

Every reachable path must honor that result. A function without the annotation is a no-result function even if a ported Luau body contains a value-producing idea.

For a decision that chooses one value, an `if` expression is concise:

```pop
function larger(left: Int, right: Int): Int
    return if left > right then left else right
end
```

An `if` expression requires `else`, has no trailing `end`, and both branches have the same type.

## Parameters and locals have different mutation rules

Parameters are immutable bindings in rc.3:

```pop
function normalize(value: Int): Int
    local result = value

    if result < 0 then
        result = 0
    end

    return result
end
```

This makes the received argument stable throughout the function. Use a local for state that changes during the algorithm.

## Local functions and closures still carry state

Pop supports local functions and lexical captures:

```pop
function makeCounter(): function(): Int
    local value = 0

    local function next(): Int
        value += 1
        return value
    end

    return next
end
```

The closure shares the captured local. Pop preserves its static `Int` type and managed lifetime.

Do not infer from closure support that functions are dynamic objects with arbitrary fields. Function values have declared function types, exact inputs and results, and no general equality.

## Multiple results form an exact pack

```pop
function bounds(): (Int, Int)
    return 1, 10
end

local lower, upper = bounds()
```

Pop does not freely truncate, pad, or reshape result lists. The producer and receiver agree on exact arity and types.

Multiple assignment evaluates all right-hand values before stores:

```pop
local left, right = 10, 20
left, right = right, left
```

This familiar swap remains safe because both locals have compatible static types.

## Variadic APIs need a new shape

rc.3 does not expose Luau-style variadic function signatures. Replace a variadic API with one of these designs:

- a fixed number of typed parameters;
- a typed fixed-length array when a collection is the real input;
- a record for named configuration;
- several deliberately named functions for genuinely different operations.

Do not hide unlike argument shapes in one universal table merely to reproduce `...`.

## `if` keeps its shape and changes its condition contract

```pop
if score >= 90 then
    print("excellent")
elseif score >= 60 then
    print("passed")
else
    print("try again")
end
```

The branches and shared `end` are familiar. Every condition must be `Boolean`, and each branch creates its own local scope.

Use a statement for multiple operations or early returns. Use an `if` expression when the only purpose is choosing one typed value.

## `while` and `repeat` transfer directly

```pop
local remaining = 3

while remaining > 0 do
    print(remaining)
    remaining -= 1
end
```

```pop
local attempt = 0

repeat
    attempt += 1
    print(attempt)
until attempt >= 3
```

The `while` condition is checked before its body. The `repeat` condition is checked afterward, so its body executes at least once.

The condition is still exact `Boolean`; an optional, number, or object cannot stand in for it.

## Numeric `for` is inclusive

```pop
for index = 1, 5 do
    print(index)
end
```

The upper bound is included. Supply a third expression for the step:

```pop
for even = 2, 10, 2 do
    print(even)
end

for countdown = 5, 1, -1 do
    print(countdown)
end
```

The start, bound, and step:

- are evaluated once from left to right;
- use one identical fixed integer type;
- reject a zero step;
- progress with checked arithmetic.

The loop binding is immutable and exists only inside the body.

## Generalized iteration does not transfer

These Luau forms have no direct rc.3 equivalent:

```lua
for key, value in pairs(values) do
end

for index, value in ipairs(values) do
end
```

Generalized `for value in collection` is not implemented. Tables do not expose enumeration. Fixed arrays can use their one-based positions:

```pop
for index = 1, Array.length(values) do
    local value = Array.get(values, index)
    use(value)
end
```

This is not syntactic inconvenience hiding an existing iterator protocol. The nominal `Iterable<T>` and `Iterator<T>` surface is future work, so the book does not teach imaginary adapters.

## `break` and `continue`

Both operate on the innermost active loop:

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

They cannot cross a nested function boundary. A `break` inside a local function does not target a loop surrounding the function declaration.

## Operator expectations

The familiar operators are more narrowly typed:

| Operator | Pop operands |
| --- | --- |
| `and`, `or`, `not` | `Boolean` |
| `+`, `-`, `*`, `/` | matching numeric types |
| `%` | matching integer types |
| `<`, `<=`, `>`, `>=` | matching numeric types |
| `..` | two `String` values |
| `==`, `~=` | types with defined equality |

Compound assignment derives from those operations:

```pop
count += 1
message ..= "!"
```

The target retains its original type. Table entries are not compound-assignment targets in rc.3 because lookup is optional and missing-key policy is not implicit.

## Colon methods are nominal

At the call site:

```pop
counter:increment()
```

At the declaration:

```pop
public function Counter:increment()
    self.value += 1
end
```

The class name before the colon declares the receiver type. `self` is resolved statically. There is no hidden metatable lookup that chooses a function from a mutable table at runtime.

## A porting pattern for callback code

When a Luau function accepts a callback, write the complete function type in Pop:

```pop
function applyTwice(
    value: Int,
    transform: function(Int): Int,
): Int
    return transform(transform(value))
end

function increment(value: Int): Int
    return value + 1
end

local result = applyTwice(10, increment)
```

The callback cannot unexpectedly accept another shape or return another type. If several callback contracts are needed, declare them deliberately.

## Review checklist

When translating a Luau function, check:

1. Are every parameter and result type written?
2. Does the original rely on missing or extra arguments?
3. Is a parameter reassigned?
4. Does any condition rely on truthiness?
5. Does multiple return rely on truncation or padding?
6. Does a loop rely on `pairs`, `ipairs`, or a custom iterator?
7. Does a method rely on metatable lookup?
8. Does an operator rely on coercion or a metamethod?

The block syntax may already look correct while one of these contracts is still wrong.

Next, [From universal tables to deliberate data](./data-modeling/) develops the largest design shift: replacing one table mechanism with several purpose-built Pop aggregates.
