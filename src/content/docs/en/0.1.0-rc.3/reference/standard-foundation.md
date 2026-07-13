---
title: Standard foundation
description: Reference the Pop-facing operations actually available in this release.
sidebar:
  order: 5
---

Pop 0.1.0-rc.3 ships `libpop_standard.a` as part of the native distribution. Its Pop-facing general functions are deliberately small:

```pop
print(value: Int)
print(value: String)
```

Both write the value followed by a newline and return no value. The overload is chosen from the argument type.

rc.3 string composition is implemented as typed language/runtime operations rather than broad Standard APIs:

```pop
local joined = "count=" .. String(count)
local summary = `count={count}, ready={ready}`
```

`String(value)` and interpolation accept only strings, booleans, and numeric primitives. They do not provide universal object formatting or runtime reflection.

Arrays have compiler/runtime-supported operations used throughout this book:

```pop
Array.create<<T>>(length: Int, initial: T): Array<T>
Array.length(array: Array<T>): Int
Array.get(array: Array<T>, index: Int): T
Array.fill(array: Array<T>, value: T)
```

Array positions are one-based. `create` traps for a negative length; `get` traps outside the valid range; `fill` preserves the fixed length.

Typed table lookup and assignment use language indexing:

```pop
local value: Int? = scores["Ada"]
scores["Grace"] = 42
```

These are not dynamic member lookup and do not turn tables into namespaces or objects.

## Names that are not APIs yet

The compiler knows bootstrap identities such as `Result<T, E>`, `List<T>`, `Set<T>`, `Range<T>`, `Task<T>`, `Guid`, `Iterable<T>`, `Iterator<T>`, `Equal<T>`, `Order<T>`, `Hash<T>`, `Close`, and `AsyncClose`. These identities support implementation work but do not come with complete Pop-facing operations in this version.

Likewise, host-side Rust modules for text, sequence, and mathematics are not automatically callable Standard APIs from Pop source. This reference lists only operations that a program can actually use through the 0.1.0-rc.3 compiler and native foundation.
