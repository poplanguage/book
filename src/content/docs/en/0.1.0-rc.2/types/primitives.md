---
title: Primitive types
description: The built-in scalar types of Pop 0.1.0-rc.2.
sidebar:
  order: 1
---

Every Pop value has a type. A type describes what a value represents and which operations are valid for it. The primitive types are the smallest values built into the language.

| Kind | Types |
| --- | --- |
| Nothing | `nil` |
| Logic | `Boolean` |
| Signed integers | `Int8`, `Int16`, `Int32`, `Int64` |
| Unsigned integers | `UInt8`, `UInt16`, `UInt32`, `UInt64` |
| Floating point | `Float32`, `Float64` |
| Text | `String` |
| No possible value | `Never` |

Pop also provides convenient aliases:

- `Int` is `Int64`.
- `Float` is `Float64`.
- `Byte` is `UInt8`.

These are true aliases, not separate types. A value declared as `Int` can be used wherever `Int64` is expected.

## Literal values

Literals write simple values directly in source code:

```pop
local answer = 42
local ready = true
local name = "Ada"
local missing = nil
```

The surrounding context can choose a more specific numeric type:

```pop
local small: Int8 = 42
local octet: Byte = 255
local measurement: Float64 = 42
```

Without an expected numeric type, a decimal integer literal uses `Int`.

## `Never`

`Never` is the uninhabited type: no value can have it. It describes control flow that cannot continue normally. Most programs do not name `Never` directly, but the compiler uses it while checking paths that always stop or return.

Primitive values do not become other primitive types implicitly. Pop requires both sides of arithmetic and ordering operations to have exactly the same numeric type. This keeps the width and signedness of every operation visible in the program.
