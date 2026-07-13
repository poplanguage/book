---
title: Variables and local bindings
description: Store values, infer their types, and update them.
sidebar:
  order: 1
---

Programs become useful when they can remember values. In Pop, `local` introduces a name inside a function:

```pop
namespace Scores

function main()
    local score = 10
    print(score)
end
```

The name is `score`, and its value is `10`. Pop sees the initializer and infers that `score` has type `Int`. An initializer is required, so a declaration such as `local score` is not valid.

## Writing the type explicitly

You can place a type after the name:

```pop
local score: Int = 10
local player: String = "Ada"
local active: Boolean = true
```

An annotation is useful when you want a type other than the one the surrounding expression would choose, or when stating the type makes the code clearer. Pop still checks that the initializer matches it.

```pop
local score: String = 10
```

This declaration is rejected because an `Int` value cannot initialize a `String` variable.

## Updating a local

Local variables can be assigned a new value:

```pop
namespace Counter

function main()
    local count = 1
    count += 1
    print(count)
end
```

The program prints `2`. Assignment changes the stored value, but it never changes the variable’s type:

```pop
local count = 1
count = "two" -- error: count is an Int
```

Pop decides the type of a local once, at its declaration, and checks every later assignment against that type.

Multiple locals and assignment also require exact arity and types:

```pop
local left, right = 10, 20
left, right = right, left
```

All right-hand values are evaluated before the stores, so this swaps the two locals.

## Scope

A local exists from its declaration to the end of the block that contains it. Blocks are created by functions and control-flow constructs such as `if` and `while`.

```pop
if ready then
    local message = "Starting"
    print(message)
end

-- message is not available here
```

Keeping names inside the smallest useful scope prevents one part of a program from accidentally depending on temporary work performed elsewhere.

Function parameters have declared types and values supplied by the caller, but are immutable bindings in rc.3. Create a local when a function needs a mutable working value.
