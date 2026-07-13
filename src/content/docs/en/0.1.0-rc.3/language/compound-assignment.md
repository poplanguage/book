---
title: Compound assignment
description: Update a mutable target once with a typed operation.
sidebar:
  order: 9
---

Compound assignment combines a read, an operation, and a write:

```pop
local total = 10
total += 5
total *= 2
```

rc.3 supports these exact forms:

| Form | Underlying operation |
| --- | --- |
| `+=` | numeric `+` |
| `-=` | numeric `-` |
| `*=` | numeric `*` |
| `/=` | numeric `/` |
| `%=` | integer `%` |
| `..=` | string `..` |

```pop
local message = "Hello"
message ..= ", Pop"
```

The target and right side must have the exact same numeric type, or both be `String` for `..=`. The operation preserves the ordinary overflow, division, remainder, allocation, and trap rules.

## Targets

Mutable locals and captures, mutable declared class fields, and array elements are supported:

```pop
counter.value += 1
values[index] *= scale
```

Parameters, numeric `for` bindings, record fields, and other immutable places remain invalid. Table entries support ordinary assignment in rc.3, but not compound assignment.

For an indexed target, Pop evaluates the array and index once, loads the current element, evaluates the right side, performs the operation, and stores only after those steps succeed. An invalid index traps before the right side runs.
