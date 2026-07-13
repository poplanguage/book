---
title: From universal tables to deliberate data
description: Replace each Luau table role with the Pop aggregate that expresses its real contract.
sidebar:
  order: 3
---

Luau tables are intentionally versatile. Pop instead asks you to state which role a collection or object plays. This gives the checker a stable layout, key rule, mutation model, equality rule, and public contract.

## Classify the old table first

Before translating syntax, classify every Luau table:

| Luau table role | Pop direction |
| --- | --- |
| Dense positional collection | Array |
| Runtime dictionary | Typed table |
| Fixed named data | Record |
| Stateful object with identity | Class |
| Shared behavior contract | Interface |
| Closed set of names | Enum |
| Closed set of cases with different payloads | Tagged union |
| Returned module namespace | Namespace declarations |

One Luau table sometimes serves several roles at once. Split it when those roles have different lifetimes or invariants.

## Arrays are fixed homogeneous sequences

```pop
local names: {String} = { "Ada", "Grace", "Linus" }
```

Every element is `String`, positions begin at `1`, and length is fixed after construction.

Ordinary lookup represents an invalid position with an optional:

```pop
local possible: String? = names[1]
```

Use a checked read after proving the position is valid:

```pop
if Array.length(names) > 0 then
    print(Array.get(names, 1))
end
```

Assignment replaces an element and traps when the index is outside the array. It does not append. There is no rc.3 `table.insert`, dynamic list, or generalized array iterator.

## Tables are typed dictionaries

```pop
local scores: {[String]: Int} = {
    ada = 10,
}

scores["grace"] = 20
local possible: Int? = scores["ada"]
```

The key is always `String`; the stored value is always `Int`; lookup is always `Int?`.

Supported key families are Boolean, fixed integers, and `String`. Tables do not combine named object fields, positional elements, and methods. They also do not expose deletion or enumeration in rc.3.

Use a table only when keys are discovered at runtime. If the keys are a fixed part of the type's meaning, use a record.

## Records are transparent values

```pop
private record Player
    name: String
    score: Int
end

local player: Player = {
    name = "Ada",
    score = 10,
}
```

The compiler knows every field. Misspelled, missing, duplicate, and incorrectly typed fields are compile-time errors.

Records update by producing another value:

```pop
local promoted = player with {
    score = player.score + 5,
}
```

Use this model for configuration, coordinates, messages, snapshots, and other transparent data. Do not introduce class identity when value equality and copying are the intended semantics.

## Classes own identity and mutation

```pop
public class Counter
    private value: Int = 0

    public function Counter:increment()
        self.value += 1
    end

    public function Counter:current(): Int
        return self.value
    end
end
```

```pop
local counter = Counter {}
local alias = counter

alias:increment()
print(counter:current())
```

Both locals refer to the same managed object. Fields and methods belong to a nominal declaration, not to entries installed through `__index`.

Use a class for mutable state that must preserve invariants behind methods. Pop has no source metatables, metamethods, prototype chain, or general rc.3 class inheritance.

## Interfaces declare shared behavior

An interface is not an inferred structural table shape. A class implements it explicitly, giving conformance a nominal meaning.

Use an interface when callers should depend on behavior shared by different nominal classes. Use a record when callers need transparent fields. Merely having similarly named methods does not create accidental conformance.

## Enums and unions replace tag conventions

A Luau string tag can become an enum when cases have no payload:

```pop
private enum Direction
    North
    South
    East
    West
end
```

A tagged union models cases with different data:

```pop
private union Result
    Success(value: String)
    Failure(message: String)
end
```

Exhaustive matching means adding or forgetting a case is visible to the checker. You do not need a table with a mutable `kind` field and loosely related optional fields.

## Avoid mixed-role ports

Suppose a Luau table contains numeric elements, configuration fields, and methods:

```lua
local queue = { "first", "second" }
queue.limit = 20
function queue:clear() end
```

Do not force that shape into one Pop table. Model it as a class with a declared array field and a declared limit:

```pop
public class Queue
    private values: {String}
    private limit: Int

    public function Queue:limitValue(): Int
        return self.limit
    end
end
```

The current array is fixed-length, so a truly growing queue also needs a future collection API or a domain-specific fixed-capacity design. The correct response is to acknowledge that rc.3 boundary, not simulate dynamic growth with unrelated table behavior.

## Equality follows the chosen model

- primitive values use defined value equality;
- records compare corresponding fields when supported;
- classes compare object identity;
- arrays and tables do not receive structural equality in rc.3;
- functions have no equality.

Choosing a type therefore chooses what “the same” can mean. This was often implicit in a Luau table design.

## Mutation follows the chosen model

| Type | Mutation model |
| --- | --- |
| Array | replace an existing checked position |
| Table | insert or replace a typed key association |
| Record | produce an updated value with `with` |
| Class | mutate declared fields through allowed code |
| Enum | no payload state to mutate |
| Tagged union | construct another case value |

There is no generic field mutation operation shared by all aggregates.

## A decision exercise

For each Luau table in a program, write one sentence:

- “This is a sequence because…”
- “This is a dictionary because…”
- “This is a record because…”
- “This is an object because…”
- “This is a closed set of cases because…”

If you cannot finish one sentence, the table probably mixes roles. Split the responsibilities before choosing Pop syntax.

Next, [Modules, Bubbles, and native execution](./modules-and-execution/) replaces Luau's executed module and host environment model.
