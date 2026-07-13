---
title: Operators and precedence
description: Reference the implemented unary and binary operators.
sidebar:
  order: 3
---

Operators are grouped below from lower to higher precedence. Parentheses can always make the intended grouping explicit.

| Group | Operators | Operands |
| --- | --- | --- |
| logical alternative | `or` | `Boolean` |
| logical conjunction | `and` | `Boolean` |
| equality | `==`, `~=` | types with equality support |
| ordering | `<`, `<=`, `>`, `>=` | matching numeric types |
| concatenation | `..` | two `String` values |
| additive | `+`, `-` | matching numeric types |
| multiplicative | `*`, `/`, `%` | matching numeric types; `%` integers only |
| unary | `not`, `-` | `Boolean`; signed numeric type |

`and` and `or` short-circuit. Other binary operators evaluate their operands according to ordinary expression evaluation.

Assignment uses `=` but is a statement operation, not a general value-producing binary expression. It can target a mutable local, captured local, mutable class field, array element, or table entry when the target and value types agree. Parameters and numeric `for` bindings are immutable.

Compound assignment derives from implemented operations: `+=`, `-=`, `*=`, `/=`, and `%=` update numeric targets, while `..=` updates a `String`. `%=` is integer-only. A receiver or index is evaluated once.

Member and call syntax bind more tightly than the binary groups:

```pop
value.field
value:method(argument)
functionName(argument)
array[index]
Generic.call<<Type>>(argument)
```

`String(value)` explicitly formats a string, boolean, integer, or floating-point primitive. It is a compiler-known conversion, not a universal method. Numeric target calls such as `Int32(value)` and `Float64(value)` perform checked explicit conversion.

The `|` symbol belongs to union type syntax such as `String | nil`; it is not a runtime bitwise-or operator. Bitwise operators and shifts are not implemented in 0.1.0-rc.3.
