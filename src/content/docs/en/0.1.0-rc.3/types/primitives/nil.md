---
title: nil
description: Represent the absence of a value without truthiness or dynamic typing.
sidebar:
  order: 1
---

`nil` is both the literal spelling and the exact built-in type for “no value.” It is lowercase because it is a keyword, not a named type alias.

```pop
local missing = nil
local isMissing = missing == nil
```

An ordinary `T` cannot contain `nil`. Optional `T?` means `T | nil`; operations that may find nothing return that type:

```pop
local names: {String} = { "Ada" }
local first: String? = names[1]
local absent: String? = names[2]
```

Pop has no Lua-style truthiness. A condition must be `Boolean`, so `if absent then` is a type error. Compare with `nil` or use the typed optional operations available for the value.

`nil == nil` is true and `nil ~= nil` is false. It is never the padding for a missing multiple return: rc.3 fixed packs require exact arity.
