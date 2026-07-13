---
title: Traps and runtime failures
description: Recognize checked failures that stop a program.
sidebar:
  order: 3
---

Static checking prevents many invalid operations, but some facts are known only while a program runs. Pop uses traps for violated runtime checks.

The native runtime distinguishes these core trap reasons:

- integer overflow;
- division by zero;
- bounds violation;
- an impossible internal state.

For example, this passes type checking because both values are `UInt8`, but it traps when the addition exceeds the type’s maximum:

```pop
local value: UInt8 = 255
local next = value + 1
```

Likewise, `Array.get(values, index)` and indexed assignment trap when `index` is outside the one-based array bounds.

Ordinary array indexing is the non-trapping alternative for reads: `values[index]` returns `nil` when no element exists. Choosing between the two forms communicates whether absence is an expected outcome or an invariant violation.

## Traps are not recoverable results

Pop 0.1.0-rc.2 does not expose a source-level exception mechanism for catching these traps. A trap stops normal program execution. Validate user input and array positions before using operations whose preconditions may not hold.

Runtime invariants and out-of-memory conditions are separate fatal failures rather than ordinary Pop values. Although names such as `Result<T, E>` exist in the compiler’s bootstrap type universe, a general Pop-facing result library and exception-handling framework are not implemented in this release.
