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

## Looking up values

Indexing requires the exact key type and returns an optional value because the key may be missing:

```pop
local adaScore: Int? = scores["ada"]
local missing: Int? = scores["linus"]
```

A present key produces its `Int`; a missing key produces `nil`. Pop does not manufacture a default value.

## Inserting and replacing

Indexed assignment inserts a missing key or replaces an existing value:

```pop
scores["grace"] = 21
scores["linus"] = 15
```

The table, key, and value expressions each run exactly once in that order. New entries preserve deterministic insertion order, while replacing a value does not move its key. The table can grow without changing its identity or invariant key/value types.

Table assignment never treats `nil` as deletion. When `V` is optional, a value that already has the complete optional type can be stored. The rc.3 checker does not widen a standalone `nil` literal to `V?`, so direct `table[key] = nil` is currently rejected. rc.3 has no deletion, key-inspection, or generalized iteration API. Table equality is not defined.

For data with a known set of named fields, use a record. For a fixed ordered collection, use an array. Use a table for a mutable association whose exact key and value types are known.

See [Table lookup and mutation](./table-lookup-and-mutation/) for focused examples of missing keys, insertion, replacement, and optional values.
