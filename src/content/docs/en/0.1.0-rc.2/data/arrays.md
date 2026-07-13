---
title: Arrays
description: Store a fixed-length sequence of values of one type.
sidebar:
  order: 1
---

An array stores an ordered sequence whose elements all have the same type. In Pop source, `{T}` and `Array<T>` are two spellings for the same array type:

```pop
local names: {String} = { "Ada", "Grace", "Linus" }
local scores: Array<Int> = { 10, 20, 30 }
```

An array literal needs an expected type. The annotation tells Pop which element type to use and also gives an empty literal enough context:

```pop
local empty: {String} = {}
```

Writing only `local values = {1, 2, 3}` is rejected in 0.1.0-rc.2 because an untyped array literal does not select its own array type.

## Length and indexing

Pop arrays use one-based positions: the first element is at index `1`.

```pop
local names: {String} = { "Ada", "Grace" }
local count = Array.length(names) -- 2
local first = names[1]            -- String?
```

Ordinary indexing returns an optional value. An index smaller than `1` or greater than the length produces `nil` instead of reading invalid memory.

When the program has already established that a position is valid, `Array.get` returns the element directly and traps on an invalid index:

```pop
if Array.length(names) > 0 then
    local first = Array.get(names, 1)
    print(first)
end
```

Choose ordinary indexing when absence is part of the operation, and checked `Array.get` when an invalid position means the program has violated its own invariant.

## Creating and changing arrays

`Array.create` constructs an array with a chosen length and repeats an initial value:

```pop
local scores = Array.create<<Int>>(3, 0)
```

The `<<Int>>` supplies the generic element type. A negative length traps.

Array elements can be assigned in place:

```pop
scores[1] = 10
scores[2] = 20
```

Indexed assignment is checked and traps if the index is outside the array. Arrays have fixed length: assignment replaces an element but does not append or remove one.

`Array.fill(scores, 0)` replaces every element with the same value. The Pop-facing Standard library does not yet provide dynamic list operations or iterators, even though some future-facing type names are reserved internally.

Arrays are managed by the native runtime. Assigning an array to another local shares the same array; it does not copy every element. Array equality is not defined in this release.
