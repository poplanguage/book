---
title: Boolean, nil, and optional values
description: Represent decisions and values that may be absent.
sidebar:
  order: 4
---

The `Boolean` type has two values:

```pop
local visible = true
local archived = false
```

Conditions in `if`, `elseif`, `while`, `until`, and conditional expressions require a Boolean. Pop does not convert other values into conditions:

```pop
local count = 1

if count then -- error: count is Int, not Boolean
    print("one")
end
```

Write the actual test instead, such as `if count > 0 then`. See the dedicated [`Boolean`](./primitives/boolean/) and [`nil`](./primitives/nil/) pages for focused examples.

## Absence with `nil`

`nil` means that no value is present. A literal `nil` has the exact built-in type `nil`:

```pop
local missing = nil
```

`String?` describes “a `String` or `nil`.” It is shorthand for the union type `String | nil`.

Optional values prevent accidental use of a missing value. A function that needs a `String` cannot be called with a `String?` until the program has narrowed away the `nil` possibility.

Array indexing demonstrates this rule:

```pop
local names: {String} = { "Ada", "Grace" }
local possibleName = names[1]
```

Ordinary indexing has the optional result `String?`, because the requested position might be outside the array. A function can preserve that result type:

```pop
function first(values: {String}): String?
    return values[1]
end
```

`Array.get(names, 1)` instead returns `String` and traps if the position is invalid.

The 0.1.0-rc.3 checker does not implicitly widen a standalone `nil` literal into an annotated optional local, so `local nickname: String? = nil` is currently rejected. Optional values are most useful when an operation such as array indexing already produces the complete optional type. There is also no dedicated convenience unwrapping syntax; APIs that need a guaranteed value commonly use a checked operation after proving its precondition.
