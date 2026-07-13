---
title: Boolean
description: Express true-or-false values and exact conditions.
sidebar:
  order: 2
---

`Boolean` has exactly two values: `true` and `false`.

```pop
local ready: Boolean = true
local finished = false
local shouldRun = ready and not finished
```

`and`, `or`, and `not` accept only booleans. `and` and `or` short-circuit, so an unnecessary right-hand expression does not run.

Every `if`, `elseif`, `while`, and `until` condition must be `Boolean`:

```pop
if ready then
    print("ready")
else
    print("waiting")
end
```

Booleans support `==` and `~=`. They can be formatted explicitly with `String(ready)` or directly inside a backtick string such as `` `ready={ready}` ``.
