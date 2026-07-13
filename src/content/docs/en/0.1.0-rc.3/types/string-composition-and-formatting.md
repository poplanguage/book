---
title: String composition and formatting
description: Choose concatenation, interpolation, or explicit primitive formatting.
sidebar:
  order: 7
---

rc.3 offers three related, statically typed tools for building text.

## Join two strings with `..`

Use concatenation when the operands are already strings:

```pop
local directory = "src"
local path = directory .. "/main.pop"
```

Both operands must be `String`. `"count=" .. 3` is a type error, and `+` remains numeric-only.

## Interpolate primitives with backticks

Use backticks for readable mixed text:

```pop
local count = 3
local ready = true
local summary = `count={count}, ready={ready}`
```

Interpolation accepts only `String`, `Boolean`, integer primitives, and floating-point primitives. Segments evaluate once from left to right. Arrays, tables, records, classes, functions, and arbitrary objects are rejected.

Backticks use `{expression}`, not JavaScript `${expression}`. Escape literal punctuation with `\{`, `\}`, and `\``.

## Format one primitive with `String(value)`

Use explicit formatting when another operation needs a complete string value:

```pop
local count = 3
local prefix = "count="
local summary = prefix .. String(count)
```

Formatting is deterministic and locale-independent. There is no inherited `toString`, runtime type inspection, or dynamic fallback.

String composition and non-identity formatting may allocate. `String(existingString)` is identity.
