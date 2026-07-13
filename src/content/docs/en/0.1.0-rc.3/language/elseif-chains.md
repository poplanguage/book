---
title: Elseif chains
description: Test several Boolean conditions with one final end.
sidebar:
  order: 6
---

An `elseif` chain keeps several statement branches at one indentation level:

```pop
if score >= 90 then
    print("excellent")
elseif score >= 60 then
    print("passed")
elseif score > 0 then
    print("keep trying")
else
    print("no score")
end
```

Pop checks conditions from top to bottom. It stops after the first true condition, so later conditions and their effects do not run. The optional `else` handles the remaining case. One final `end` closes the entire chain.

Every condition must be `Boolean`; there is no number, string, object, or `nil` truthiness.

## Branch scopes

Each arm has its own local scope:

```pop
if first then
    local message = "first"
    print(message)
elseif second then
    local message = "second"
    print(message)
end
```

Neither `message` exists after the chain. Reusing the local name is safe because the bindings belong to different branches.

Use `elseif` for statement blocks. When each arm only chooses one value, an `if` expression is often shorter:

```pop
local label = if ready then "ready" else "waiting"
```
