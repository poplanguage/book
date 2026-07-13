---
title: Table lookup and mutation
description: Build typed tables, retrieve optional values, insert and replace entries, and follow a table operation through the rc.3 compiler and runtime.
---

A table stores associations between keys and values. You choose one key type and one value type, and the compiler checks every lookup and mutation against that choice.

```pop
local scores: {[String]: Int} = {
    ada = 10,
    grace = 20,
}

scores["linus"] = 15
scores["ada"] = 11

local ada: Int? = scores["ada"]
local missing: Int? = scores["unknown"]
```

The first assignment inserts a new entry. The second replaces the value associated with an existing key. Both lookups return `Int?`, including the lookup for `"ada"`: the type checker does not prove that a runtime key is present merely because the source contains a matching table field.

This chapter develops that example from the source syntax down to the current rc.3 runtime representation.

## The table mental model

Think of a table as a collection of key-value pairs:

```text
"ada"   -> 11
"grace" -> 20
"linus" -> 15
```

Each key identifies at most one value. Assigning a value to a key that is not present inserts a pair. Assigning to a key that is already present changes that pair's value.

A table is different from an array:

- an array is indexed by a position from `0` to `length - 1`;
- a table is indexed by a supported key value;
- an array lookup has bounds to check;
- a missing table key produces `nil` through an optional result.

Tables are also different from records. A record has a fixed set of fields known from its declaration. A table may acquire new keys while the program runs.

## Reading a table type

The table type syntax is:

```pop
{[K]: V}
```

`K` is the key type and `V` is the value type. For example:

```pop
local namesById: {[Int]: String} = {}
local enabledByName: {[String]: Boolean} = {}
local bytesByFlag: {[Boolean]: UInt8} = {}
```

The named form expresses the same type:

```pop
local namesById: Table<Int, String> = {}
```

The brace form is usually easier to recognize beside a table literal. The named form can be useful inside a longer type.

Table types are invariant. The key and value types must match exactly; the compiler does not reinterpret one table type as another.

```pop
local narrow: {[String]: Int32} = {}

-- This is not an implicit widening conversion.
-- local wide: {[String]: Int64} = narrow
```

That rule protects mutation. If `wide` could refer to the same table as `narrow`, code using `wide` could store an `Int64` that cannot be read safely through the `Int32` view.

## Constructing a table

An empty aggregate needs an expected table type:

```pop
local scores: {[String]: Int} = {}
```

Without the annotation, `{}` does not say whether it is a record, table, or another aggregate shape. Pop does not guess from later statements.

For a table with `String` keys, named fields are convenient literal syntax:

```pop
local ports: {[String]: UInt16} = {
    http = 80,
    https = 443,
}
```

In a table context, `http = 80` creates the same association that later bracket operations address as `ports["http"]`.

For other key types, begin with an empty typed table and insert entries explicitly:

```pop
local names: {[Int]: String} = {}

names[1] = "Ada"
names[2] = "Grace"
```

This makes the key expression and its exact type visible.

## Supported key types

rc.3 accepts a deliberately closed set of table key types:

| Key family | Examples |
| --- | --- |
| Boolean | `Boolean` |
| Signed integers | `Int8`, `Int16`, `Int32`, `Int64`, `Int` |
| Unsigned integers | `UInt8`, `UInt16`, `UInt32`, `UInt64`, `Byte` |
| Text | `String` |

The integer aliases are accepted because they resolve to fixed integer primitives. The key expression must still have the table's exact key type.

Floating-point numbers are not table keys in rc.3. Neither are arrays, records, classes, tables, functions, or unions. Rejecting unsupported keys at compile time keeps key equality deterministic and prevents a table from depending on an unspecified structural comparison.

### String keys compare text

Two separate `String` values containing the same text address the same entry. Table lookup does not depend on whether the two strings occupy the same managed allocation.

```pop
local labels: {[String]: Int} = {}
local key = String(42)

labels[key] = 1
local found: Int? = labels["42"]
```

The runtime compares string contents for table keys. That differs from the identity relationship of general managed objects.

## Looking up a value

Use brackets to retrieve the value associated with a key:

```pop
local scores: {[String]: Int} = {
    ada = 10,
}

local score = scores["ada"]
```

The type of `score` is `Int?`, not `Int`.

For a table `{[K]: V}`, lookup has the conceptual type:

```text
table-get({[K]: V}, K) -> V?
```

The optional result represents both outcomes:

- the key exists, so the result contains its `V` value;
- the key is absent, so the result is `nil`.

Missing keys are therefore ordinary data, not traps. A table lookup has no array-style out-of-bounds failure.

### Why every lookup is optional

The compiler generally cannot prove which runtime mutations have occurred before a lookup. Consider a helper that receives a table and a name:

```pop
private function findScore(
    scores: {[String]: Int},
    name: String,
): Int?
    return scores[name]
end
```

The function works for any `String`. Its signature must describe the missing-key case even if some callers normally pass a known name.

rc.3 does not yet provide full optional flow narrowing or a checked table lookup operation. In practical APIs, preserve the `V?` result until code that can deliberately handle absence.

### Optional values do not mean deletion

A table may itself have an optional value type:

```pop
local labels: {[String]: String?} = {}
local inherited: String? = labels["base"]

labels["copy"] = inherited
```

Storing an existing `String?` value is allowed. It creates or replaces an entry; it does not remove the key.

Direct standalone `nil` does not currently widen into an optional value during table assignment:

```pop
-- Rejected in rc.3:
-- labels["draft"] = nil
```

There is no deletion syntax in rc.3. Do not use optional storage as if it were a hidden delete operation.

## Inserting and replacing values

Table mutation uses the same bracket syntax on the left side of assignment:

```pop
local scores: {[String]: Int} = {}

scores["ada"] = 10 -- insert
scores["ada"] = 12 -- replace
scores["grace"] = 15 -- insert
```

The compiler checks two independent facts:

1. the expression between brackets has type `K`;
2. the expression on the right has type `V`.

For `{[String]: Int}`, both of these are rejected:

```pop
local scores: {[String]: Int} = {}

-- Wrong key type.
-- scores[1] = 10

-- Wrong value type.
-- scores["ada"] = "ten"
```

A mutation never changes the table's declared type. An empty table is not an untyped bag that learns a new shape from each insertion.

### Compound assignment is not a table operation

rc.3 supports compound assignment for locals, captures, class fields, and array elements. It does not support table entries as compound targets.

```pop
local scores: {[String]: Int} = {
    ada = 10,
}

-- Not supported in rc.3:
-- scores["ada"] += 1
```

There is an additional semantic issue: `scores["ada"]` is `Int?`, so incrementing it would also require an explicit policy for a missing key. rc.3 leaves that policy to future table APIs rather than inventing a fallback.

## Tables have reference identity

A table is a managed object. Assigning it to another local copies a reference to the same table, not all its entries.

```pop
local scores: {[String]: Int} = {
    ada = 10,
}

local sameScores = scores
sameScores["ada"] = 25

local updated: Int? = scores["ada"]
```

`updated` observes the mutation made through `sameScores`. The same behavior applies when a table is passed to a function:

```pop
private function recordScore(
    scores: {[String]: Int},
    name: String,
    score: Int,
)
    scores[name] = score
end
```

The function mutates the caller's table object. There is no implicit copy-on-call.

This is useful for shared mutable indexes, but it also means you should make mutation visible in an API's name and purpose.

## Evaluation order

Pop evaluates a table operation's parts once and in source order.

For lookup:

```pop
local value = makeTable()[makeKey()]
```

the table expression is evaluated first, then the key expression. Neither expression is repeated internally.

For mutation:

```pop
makeTable()[makeKey()] = makeValue()
```

the order is:

1. evaluate the table expression;
2. evaluate the key expression;
3. evaluate the value expression;
4. perform the insertion or replacement.

This order matters when any expression calls a function, allocates a value, or changes program state. A backend must preserve it.

## A complete table API example

The following program separates mutation from lookup and makes the optional result explicit:

```pop
namespace examples.scoreboard

private function recordScore(
    scores: {[String]: Int},
    name: String,
    score: Int,
)
    scores[name] = score
end

private function findScore(
    scores: {[String]: Int},
    name: String,
): Int?
    return scores[name]
end

function main()
    local scores: {[String]: Int} = {
        ada = 10,
        grace = 18,
    }

    recordScore(scores, "linus", 15)
    recordScore(scores, "ada", 25)

    local ada: Int? = findScore(scores, "ada")
    local unknown: Int? = findScore(scores, "unknown")

    print("Scores recorded; lookup results stay optional.")
end
```

The important boundary is visible in `findScore`: a table can be mutated with an `Int`, while a lookup returns `Int?`. No dynamic fallback or fabricated default turns absence into `0`.

## How the compiler sees a lookup

For this source:

```pop
local score = scores[name]
```

the rc.3 pipeline performs these steps:

1. Resolve `scores` to a table type such as `{[String]: Int}`.
2. Check that `name` has the exact key type, `String`.
3. Assign the lookup expression the result type `Int?`.
4. Preserve a typed table-get operation in HIR.
5. Lower it to the backend-neutral MIR table-get operation.
6. Let the selected execution backend perform the runtime lookup.

Mutation follows the parallel path:

```pop
scores[name] = score
```

The checker validates `name: String` and `score: Int`, HIR retains a table-set operation, and MIR represents the insertion or replacement explicitly.

Keeping table operations explicit matters. A backend does not have to reconstruct table semantics from a generic call or an untyped memory operation.

## How the current rc.3 runtime stores a table

The bootstrap native runtime uses a managed table object with metadata and interleaved entry slots:

```text
table handle
    |
    v
+-------------------------------+
| length | capacity | type maps |
+-------------------------------+
| key 0  | value 0              |
+-------------------------------+
| key 1  | value 1              |
+-------------------------------+
| ...                           |
+-------------------------------+
```

`length` is the number of occupied pairs. `capacity` is the number of pairs for which storage is currently reserved. The type maps describe whether key and value slots contain managed references that the collector must trace.

### Lookup in the bootstrap runtime

The current native implementation scans entries from the beginning until it finds an equal key:

```text
for each occupied pair:
    if stored key equals requested key:
        return stored value

return nil
```

Scalar key types compare their canonical value representation. `String` keys compare text contents.

This linear scan is an rc.3 bootstrap implementation detail, not a source-language complexity guarantee. Programs should not depend on tables always using a linear representation. The closed key rules allow later runtimes to choose a different representation without changing lookup results.

### Mutation in the bootstrap runtime

Table set performs a similar scan:

- if the key is found, replace its value in place;
- if the key is absent, append a new key-value pair;
- if there is no spare capacity, grow the backing storage first.

Replacing a value does not move the entry. New entries are appended in insertion order. rc.3 does not yet expose general table iteration, so insertion order is mainly part of deterministic runtime behavior rather than a source-level traversal API.

The current growth calculation is `max(current capacity, 2) * 2`. Consequently, the first insertion into a zero-capacity table reserves room for four entries, and later full tables grow geometrically. This is an internal policy and may change independently of Pop source semantics.

### Growth preserves identity

Growing a table may move its backing storage, but it does not create a new source-level table value. Existing aliases still refer to the same managed table identity.

```text
scores -----+
            +--> stable managed handle --> possibly grown storage
sameScores -+
```

That stable handle is why mutations remain visible through every alias after growth.

### Managed keys and values

Tables may hold scalar data and managed values. The runtime records the precise slot positions that contain references. For a `{[String]: SomeClass}` table, both the key slot and value slot need tracing; for `{[Int]: UInt8}`, neither slot is a managed reference.

When storage grows, the collector rebuilds this precise layout for the larger allocation and preserves the live entries. Runtime stores use the collector-aware storage path so references written into table slots remain visible to garbage collection.

If allocation during table creation or growth fails, the runtime follows the normal out-of-memory panic path. Missing lookup, by contrast, is represented by `nil` and is not a panic.

## Semantic guarantees and implementation details

It helps to separate what Pop code may rely on from how the bootstrap runtime currently achieves it.

| Source-level rule | Current rc.3 implementation |
| --- | --- |
| A key identifies at most one value. | Set scans for an equal key before appending. |
| Missing lookup returns `nil` through `V?`. | Native lookup returns the optional nil representation after a failed scan. |
| String keys compare by text. | The runtime performs a content comparison. |
| Assignment aliases the same table. | Aliases share a stable managed handle. |
| Growth must preserve entries and identity. | The collector grows interleaved storage behind that handle. |
| Evaluation happens once in source order. | HIR and MIR keep table get/set as ordered operations. |

The right column is valuable when reading compiler code or debugging a backend. It is not permission for application code to depend on allocation sizes, scan order, or raw slot layout.

## Choosing between tables and other aggregates

Use a table when keys are discovered while the program runs:

```pop
local usersById: {[Int]: String} = {}
usersById[userId] = userName
```

Use an array when the key is a dense zero-based position:

```pop
local names: [String] = ["Ada", "Grace"]
local first = names[0]
```

Use a record when the fields are fixed and have meaningful names:

```pop
record User
    name: String
    score: Int
end
```

Use a class when you need nominal identity, methods, and mutable declared fields. A table should not replace a record or class merely to avoid declaring the data model.

## Current rc.3 boundaries

The rc.3 table foundation intentionally remains small. It has:

- typed construction;
- optional lookup;
- insertion;
- replacement;
- reference identity;
- interpreter and LLVM/native execution support.

It does not yet have:

- deletion;
- key or value enumeration;
- general table iteration;
- a source-level length or capacity operation;
- checked lookup that directly yields `V`;
- a caller-provided missing-key default;
- table-entry compound assignment;
- structural table equality;
- compile-time table construction or mutation;
- C-backend execution support.

The experimental C backend fails closed when it encounters unsupported table operations. It does not silently substitute different behavior.

## Common mistakes

### Omitting the expected type

```pop
-- Too little information:
-- local values = {}

local values: {[String]: Int} = {}
```

### Expecting a non-optional lookup

```pop
local values: {[String]: Int} = {}

-- Lookup can miss.
-- local value: Int = values["answer"]

local value: Int? = values["answer"]
```

### Mixing key types

```pop
local values: {[Int]: String} = {}

values[1] = "one"
-- values["2"] = "two"
```

### Treating assignment as deletion

Table set always means insert or replace. rc.3 has no delete operation, including for optional-valued tables.

### Assuming a hash-table performance contract

The Pop type is called a table because it models typed key-value associations. rc.3 does not promise a particular hashing strategy or asymptotic lookup complexity.

## Exercises

1. Create a `{[UInt16]: String}` table, insert two port names, replace one, and annotate both lookup results.
2. Pass a table to a helper that inserts an entry, then look up that key through the original local to observe shared identity.
3. Rewrite a small record-shaped table as a record. Notice which keys become declared fields and which optional lookups disappear.
4. Try a `Float64` key and read the compiler diagnostic. Then replace it with an integer or `String` representation chosen deliberately for the domain.
5. Design a function that returns `V?` instead of inventing a default for a missing table key.

The central rule is simple: a table mutation accepts exactly `K` and `V`, while a lookup returns `V?`. The compiler preserves that rule through HIR and MIR, and the runtime implements it with deterministic managed storage.
