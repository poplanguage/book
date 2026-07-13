---
title: Primitive types
description: The built-in scalar types of Pop 0.1.0-rc.3.
sidebar:
  order: 1
---

Every Pop value has a type. A type describes what a value represents and which operations are valid for it. The primitive types are the smallest values built into the language. This page explains what “primitive” means in Pop and is the landing page for the focused primitive leaves nested beneath it.

## What makes a type primitive?

A primitive type is defined directly by the language rather than assembled from user-declared fields, cases, or methods. The compiler already knows:

- which values belong to the type;
- how literals receive the type;
- which operators accept it;
- how equality and ordering behave;
- which explicit conversions are legal;
- how the value crosses function, HIR, MIR, and runtime boundaries.

For example, you do not declare the fields of `Int32` or write the implementation of integer addition before using it:

```pop
local left: Int32 = 20
local right: Int32 = 22
local answer: Int32 = left + right
```

The compiler recognizes both operands as `Int32`, selects checked `Int32` addition, and gives the expression the same `Int32` type.

A record is not primitive because your source declares its fields:

```pop
private record Point
    x: Int
    y: Int
end
```

An array is not primitive because it is an aggregate containing a sequence of element values. A class is not primitive because it is a nominal managed object with declared fields and methods.

### Primitive does not mean “unmanaged”

“Primitive” describes the language contract, not one universal storage strategy. Integer and Boolean values have direct scalar representations. `String` is still a primitive source type even though its text storage is managed by the runtime. `nil` represents absence, while `Never` has no possible runtime value at all.

Do not use “primitive” to assume a value's byte size, stack location, allocation behavior, or machine instruction. Those are backend details unless a chapter explicitly makes them part of the language contract.

### Primitive does not mean “implicitly convertible”

The primitive families do not collapse into one loose scalar category. `Int32`, `Int64`, and `Float64` are distinct types. Pop does not silently widen them merely because all three are built in.

```pop
local count: Int32 = 42
local wide: Int64 = Int64(count)
local measurement: Float64 = Float64(wide)
```

Explicit conversions preserve the chosen numeric model and make range checks visible in source.

## The primitive families

| Kind | Primitive pages |
| --- | --- |
| Nothing | [`nil`](./nil/) |
| Logic | [`Boolean`](./boolean/) |
| Signed integers | [`Int8`](./int8/), [`Int16`](./int16/), [`Int32`](./int32/), [`Int64`](./int64/) |
| Unsigned integers | [`UInt8`](./uint8/), [`UInt16`](./uint16/), [`UInt32`](./uint32/), [`UInt64`](./uint64/) |
| Floating point | [`Float32`](./float32/), [`Float64`](./float64/) |
| Text | [`String`](./string/) |
| No possible value | [`Never`](./never/) |

Each leaf explains the type's domain, literals, operations, conversions, traps, appropriate uses, and current rc.3 boundaries.

### Absence: `nil`

`nil` is a primitive type with one literal value, also written `nil`. It normally appears as one member of an optional type:

```pop
function findName(names: {[Int]: String}, id: Int): String?
    return names[id]
end
```

`String?` is shorthand for `String | nil`. The optional is a union containing a primitive, not a special truthiness mode.

### Logic: `Boolean`

`Boolean` has exactly `true` and `false`. Conditions require it:

```pop
local ready: Boolean = true

if ready then
    print("Starting")
end
```

Pop does not turn integers, strings, managed objects, or optional values into Boolean conditions.

### Signed integers

Signed integer types represent negative, zero, and positive whole numbers within a fixed range:

```pop
local temperature: Int8 = -5
local balance: Int64 = -2500
```

Choose a signed type when the domain genuinely includes values below zero. Arithmetic is checked against the selected width.

### Unsigned integers

Unsigned integer types represent zero and positive whole numbers:

```pop
local channel: UInt8 = 3
local fileSize: UInt64 = 4096
```

An unsigned type communicates that negative values do not belong to the domain. It does not remove overflow checks at the upper boundary.

### Floating point

`Float32` and `Float64` represent floating-point values and accept decimal literals:

```pop
local opacity: Float32 = 0.75
local distance: Float64 = 1250.5
```

Floating-point values are approximate binary representations. They are not substitutes for every whole-number domain, and they are not valid table keys in rc.3.

### Text: `String`

`String` stores text:

```pop
local name: String = "Ada"
local message = `Hello, {name}!`
```

Use `..` to concatenate two strings and `String(value)` to format a supported primitive deliberately. Pop has no separate `Character` primitive in rc.3.

### No value: `Never`

`Never` is uninhabited: no expression can finish normally by producing a `Never` value. The compiler uses it when reasoning about control flow that cannot continue.

Most beginner programs never write `Never`, but understanding it prevents a common misconception: it is not another spelling for `nil`, and it is not a bottom-like dynamic placeholder. `nil` is a real absence value; `Never` has no value.

## Primitives and aliases

Pop also provides convenient aliases:

- `Int` is `Int64`.
- `Float` is `Float64`.
- `Byte` is `UInt8`.

These are true aliases, not separate types. A value declared as `Int` can be used wherever `Int64` is expected. See [Primitive aliases](./aliases/) for examples.

An alias does not create a new range, representation, overload set, or nominal identity:

```pop
local ordinary: Int = 42
local exact: Int64 = ordinary
```

Use aliases for the conventional general case. Use exact names when a width is part of a protocol, storage format, public contract, or domain limit.

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

Without an expected numeric type, a decimal integer literal uses `Int`. A literal containing a decimal point or base-ten exponent uses `Float64` unless context selects `Float32`.

The literal is source syntax, while its type comes from context and the language defaults. The same token can therefore initialize different exact numeric types when each value is representable:

```pop
local tiny: Int8 = 10
local ordinary: Int = 10
local unsigned: UInt32 = 10
local floating: Float32 = 10
```

String, Boolean, and `nil` literals have their corresponding primitive types directly.

## Operations stay inside resolved types

For ordinary numeric binary operations, both operands use one matching type:

```pop
local left: Int16 = 20
local right: Int16 = 22
local answer = left + right
```

This is rejected rather than silently widened:

```pop
local narrow: Int16 = 20
local wide: Int64 = 22

-- local answer = narrow + wide
```

Choose the result domain and convert explicitly:

```pop
local answer = Int64(narrow) + wide
```

The same principle applies to ordering. Equality is available only where the resolved operand types define it.

## Primitive values inside larger types

Primitives become the leaves of richer models:

```pop
private record User
    id: UInt64
    name: String
    active: Boolean
end
```

```pop
local temperatures: {Float32} = { 18.5, 20.0, 19.25 }
local scores: {[String]: Int} = {}
```

The aggregate supplies structure; the primitive types define the individual field, element, key, and value domains.

Optionals and unions can also contain primitives:

```pop
local possibleScore: Int? = scores["Ada"]
```

The primitive does not lose its rules when nested. If an operation needs `Int`, an `Int?` must not be treated as though presence were guaranteed.

## Choosing a primitive deliberately

Ask what the value means before choosing its type:

| Question | Likely direction |
| --- | --- |
| Is it only true or false? | `Boolean` |
| Can the whole number be negative? | signed integer |
| Is the whole number never negative? | unsigned integer |
| Does the value require fractional representation? | `Float32` or `Float64` |
| Is it human-readable text? | `String` |
| Can a value be absent? | an optional such as `String?` |
| Can execution produce no value at all? | compiler reasoning may involve `Never` |

Use a width large enough for the domain. Do not choose a smaller integer merely because the current example value fits, and do not use floating point merely to avoid selecting an integer width.

## How the compiler carries primitives

When Pop checks a primitive expression, it resolves one exact type and operation before backend execution. HIR retains typed language meaning. MIR lowers that meaning into concrete scalar, string, optional, conversion, or trap operations. The interpreter and native backend must agree on the result.

For checked addition:

```pop
local answer: Int8 = left + right
```

the backend cannot silently use an unchecked larger integer and discard overflow. For `String` concatenation, it cannot reinterpret `+` as text behavior. The source type determines the operation all the way down.

Backend storage layouts may differ while preserving the same visible rules. This distinction is why the individual leaves describe source guarantees separately from useful implementation detail.

## What is not a primitive in rc.3?

These are important built-in or user-defined types, but not primitive scalar types:

- arrays and tables;
- tuples and function types;
- records and classes;
- interfaces;
- enums and tagged unions;
- type aliases themselves;
- namespaces, Modules, Bubbles, Packages, and Workspaces.

Some are aggregates, some are nominal declarations, some describe callable behavior, and some organize a program rather than representing runtime values.

## Reading the primitive leaves

If you are new to typed programming, begin with:

1. [`Boolean`](./boolean/)
2. [`Int64`](./int64/) and [aliases](./aliases/)
3. [`Float64`](./float64/)
4. [`String`](./string/)
5. [`nil`](./nil/)

Then read the exact-width integer pages when a domain or API needs them. Read `Never` after functions and control flow; it makes more sense once you have seen returns and paths that cannot continue.

If you already know fixed-width types, use the family table to jump directly to the type whose rc.3 literals, conversions, and trap behavior you need.

## `Never`

`Never` is the uninhabited type: no value can have it. It describes control flow that cannot continue normally. Most programs do not name `Never` directly, but the compiler uses it while checking paths that always stop or return.

Primitive values do not become other primitive types implicitly. Pop requires both sides of arithmetic and ordering operations to have exactly the same numeric type. Use an explicit target-type call such as `Int32(value)` or `Float64(value)` for checked numeric conversion, and `String(value)` for deterministic primitive formatting.
