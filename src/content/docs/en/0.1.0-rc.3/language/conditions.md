---
title: Decisions with if
description: Run different code according to a Boolean condition.
sidebar:
  order: 5
---

An `if` statement chooses whether a block of code should run:

```pop
if temperature > 30 then
    print("It is hot")
end
```

The condition between `if` and `then` must have type `Boolean`. Pop does not treat numbers, strings, objects, or `nil` as truthy or falsy values.

## Choosing between two paths

Add `else` when the program should run another block if the condition is false:

```pop
if score > 9 then
    print("New high score")
else
    print("Keep trying")
end
```

Exactly one branch runs. Both finish at the shared `end`.

## Testing several cases

Use `elseif` to test more conditions without extra nesting:

```pop
if score > 89 then
    print("Excellent")
elseif score > 59 then
    print("Passed")
else
    print("Try again")
end
```

Conditions are checked from top to bottom, stop after the first true condition, and share one final `end`. Each branch has its own scope.

See [Elseif chains](./elseif-chains/) for evaluation order, scopes, and a complete classification example.

## Choosing a value

An `if` expression selects between two values:

```pop
local label = if score > 59 then "passed" else "try again"
```

It requires `else`, has no trailing `end`, and evaluates exactly one branch. Both branch values must have the same static type. Pop does not use `?:` punctuation or invent a union for unlike branches.

## Names declared in branches

Each branch is a scope. A local declared inside it is available only until that branch ends:

```pop
if authenticated then
    local message = "Welcome back"
    print(message)
end

-- message is no longer in scope
```

When the branches only choose one value, prefer an `if` expression. Use a statement when branches perform several operations or return early.
