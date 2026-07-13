---
title: Typed tables
description: Understand the table values available in the current release.
sidebar:
  order: 2
---

A table associates keys with values. Write its type as `{[K]: V}` or `Table<K, V>`, where `K` is the key type and `V` is the value type:

```pop
local scores: {[String]: Int} = {
    ada = 10,
    grace = 20,
}
```

In the implemented literal form, a field name such as `ada` becomes a string key when the expected table type uses `String` keys. As with arrays and record aggregates, the literal needs an expected type.

Typed table allocation and storage are implemented in the compiler and native runtime, but the general source-level table API is intentionally small in 0.1.0-rc.2. Indexing, insertion, removal, iteration, and key inspection are not exposed as complete Pop operations. Table equality is not defined either.

For data with a known set of named fields, use a record. For a fixed ordered collection, use an array. Treat tables in this release as an implemented foundation whose general-purpose collection interface is not finished yet; do not design a program around APIs that are only planned.
