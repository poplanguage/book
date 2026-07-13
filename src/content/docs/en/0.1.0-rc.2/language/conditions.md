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

An `else` block may contain another `if`:

```pop
if score > 89 then
    print("Excellent")
else
    if score > 59 then
        print("Passed")
    else
        print("Try again")
    end
end
```

The first true condition selects the message. Pop 0.1.0-rc.2 does not have a separate `elseif` keyword, so nested decisions use another `if` inside `else`.

## Names declared in branches

Each branch is a scope. A local declared inside it is available only until that branch ends:

```pop
if authenticated then
    local message = "Welcome back"
    print(message)
end

-- message is no longer in scope
```

If a value will be needed after the decision, declare a local before the `if` and assign a same-typed value in each branch.
