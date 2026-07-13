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
| ordering | `<`, `>` | matching numeric types |
| additive | `+`, `-` | matching numeric types |
| multiplicative | `*`, `/`, `%` | matching numeric types; `%` integers only |
| unary | `not`, `-` | `Boolean`; signed numeric type |

`and` and `or` short-circuit. Other binary operators evaluate their operands according to ordinary expression evaluation.

Assignment uses `=` but is a statement operation, not a general value-producing binary expression. It can target a mutable local, parameter, captured local, class field, or array element when the target and value types agree.

Member and call syntax bind more tightly than the binary groups:

```pop
value.field
value:method(argument)
functionName(argument)
array[index]
Generic.call<<Type>>(argument)
```

The `|` symbol belongs to union type syntax such as `String | nil`; it is not a runtime bitwise-or operator. Bitwise operators and shifts are not implemented in 0.1.0-rc.2.
