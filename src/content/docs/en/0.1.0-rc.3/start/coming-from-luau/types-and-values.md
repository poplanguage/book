---
title: Types, truthiness, and values
description: Replace Luau's gradual and coercive assumptions with Pop's closed static value model.
sidebar:
  order: 1
---

Luau lets a project add static information gradually. Pop starts from a different contract: every reachable value and operation must have a resolved static meaning before execution.

This is not merely “Luau with more annotations.” It changes which programs can be expressed and where uncertainty must appear.

## Inference is not dynamic typing

Both languages can infer a local:

```pop
local score = 10
```

In Pop, that inference permanently chooses a type for the local. The declaration behaves as though the type were written:

```pop
local score: Int = 10
```

Later assignments may change the stored `Int`, but not the type:

```pop
score = 25

-- Rejected:
-- score = "twenty-five"
```

There is no `any` escape that postpones this operation until runtime. If several values genuinely represent different cases, model those cases with an enum or tagged union instead of erasing their types.

## Type names are Pop types

Some common ideas use different names:

| Luau type | Usual Pop direction |
| --- | --- |
| `boolean` | `Boolean` |
| `string` | `String` |
| `number` | choose an integer or floating-point primitive |
| `nil` | `nil`, normally as part of `T?` |
| `{T}` array-shaped table | `{T}` or `Array<T>`, with fixed length |
| `{[K]: V}` | `{[K]: V}` or `Table<K, V>`, with stricter keys and operations |
| structural table object | record, class, or interface |
| `any` / `unknown` | no direct Pop equivalent |

Similar punctuation does not imply identical runtime behavior. In particular, Pop's `{String}` is a dedicated array type rather than shorthand for a general table convention.

## Conditions answer one Boolean question

Luau conditionals accept values of every type and interpret only `false` and `nil` as false. Pop conditions accept `Boolean` only.

Instead of:

```lua
if count then
    print(count)
end
```

state the intended question:

```pop
if count > 0 then
    print(count)
end
```

This distinction matters because the Luau form hides several possible meanings:

- “is the count positive?”
- “is the count nonzero?”
- “was a count supplied?”
- “did an operation succeed?”

Those questions may require different types and comparisons. Pop makes the program choose.

### Logical operators stay Boolean

In Luau, `and` and `or` are often used to select and propagate arbitrary operand values. In Pop, they are Boolean operators:

```pop
local shouldStart = enabled and ready
local shouldStop = failed or cancelled
```

Use an `if` expression to choose a non-Boolean value:

```pop
local label = if ready then "ready" else "waiting"
```

Both branches must have one exact static type.

## Absence has a visible type

A Pop optional type states that a value may be absent:

```pop
function lookup(
    scores: {[String]: Int},
    name: String,
): Int?
    return scores[name]
end
```

The result `Int?` is shorthand for `Int | nil`. A caller cannot pass it directly where an `Int` is required.

This differs from letting `nil` appear through any value path. The function signature identifies the uncertainty at its source.

### rc.3 optional boundaries

The foundation is intentionally limited in this release:

- full flow narrowing is not implemented;
- there is no general `?` propagation or unwrapping operator;
- a standalone `nil` literal is not implicitly widened into every annotated optional;
- optional-valued table assignment is not deletion.

Prefer an API whose result honestly stays optional, or use a checked operation after establishing its precondition. Do not invent a fake default merely to make the question mark disappear.

## Choose the numeric meaning

Luau's common `number` model does not tell the reader whether a value is an index, byte count, signed balance, or fractional measurement. Pop provides fixed numeric primitives.

```pop
local retryCount: UInt8 = 3
local balance: Int64 = -250
local completion: Float64 = 0.75
```

Signed integers:

```text
Int8  Int16  Int32  Int64
```

Unsigned integers:

```text
UInt8  UInt16  UInt32  UInt64
```

Floating point:

```text
Float32  Float64
```

`Int` and `Byte` are convenient aliases documented in the primitive section.

### Conversions are explicit

Different widths do not silently merge:

```pop
local small: Int16 = 120
local wide: Int64 = Int64(small)
local decimal: Float64 = Float64(wide)
```

Target-type calls make the conversion visible and checked. A value outside the target's range traps rather than wrapping or relying on an implicit coercion.

When porting a number, ask:

1. Can it be negative?
2. Can it contain a fraction?
3. What range is valid for the domain?
4. Does it cross a public function or data boundary?

The answers select a type more reliably than copying the original annotation.

## String operations are explicit

Keep `..` for two strings:

```pop
local fullName = first .. " " .. last
```

Use backtick interpolation when values appear inside a larger message:

```pop
local message = `{name} has {score} points`
```

Use `String(value)` for a supported primitive conversion:

```pop
local message = "score=" .. String(score)
```

Do not use `+` for strings. It remains a numeric operator, and Pop does not call a metamethod or universal `tostring` fallback.

## Equality is type-directed

`==` and `~=` remain recognizable, but equality support belongs to the operands' resolved types.

Primitive values use their defined value equality. Records compare structurally when every field supports equality. Classes compare managed identity. Arrays, tables, and functions do not receive an invented structural equality in rc.3.

That means a Luau comparison should be reviewed for intent:

- compare record data when value equality is meaningful;
- compare a class when object identity is meaningful;
- write a deliberate element comparison when a collection's contents matter.

## Constants are not mutable globals

Pop constants are declarations whose values are evaluated under the compile-time system. A usable runtime constant still has a fixed declared identity and type.

They do not create a mutable global environment where any source file can add or replace names. Runtime state belongs in locals, managed objects, and values passed through typed functions.

## A conversion exercise

Start with this Luau fragment:

```lua
local value = getValue()

if value then
    print("value=" .. value)
end
```

Do not translate it yet. First answer:

1. What exact values can `getValue` return?
2. Is absence possible, or is the condition testing a numeric/string property?
3. What type does `print` need?
4. Is conversion to text part of the function's contract or only presentation?

Possible Pop designs include:

- `getValue(): Int` plus `if value > 0 then`;
- `hasValue(): Boolean` and a separate checked value operation;
- `getValue(): Int?` preserved as optional through the calling API;
- `getLabel(): String` if the operation's real purpose is presentation.

The correct translation depends on meaning that Luau allowed the source to leave implicit.

## What to keep and what to replace

Keep:

- local inference for obvious initializers;
- `Boolean`, numeric, and text operations once their types are known;
- `==`, `~=`, `and`, `or`, and `not` where operands are supported;
- `..` and backtick interpolation for text composition.

Replace:

- changing a local from one type to another;
- `any` as an integration shortcut;
- truthiness as a substitute for a domain question;
- one universal `number` assumption;
- implicit string coercion;
- untracked `nil` paths.

Next, [Functions and control flow](./functions-and-control-flow/) shows which Luau-shaped blocks transfer and where Pop requires exact arity, results, and iteration behavior.
