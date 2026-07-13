---
title: Explicit generics
description: Specialize generic functions, records, and tagged unions in rc.3.
sidebar:
  order: 11
---

Functions can declare invariant type parameters with Luau-shaped angle syntax:

```pop
private function identity<T>(value: T): T
    return value
end

local number = identity<<Int>>(42)
local name = identity<<String>>("Ada")
```

Calls use doubled angle brackets so type arguments cannot be confused with comparison operators. rc.3 requires every type argument explicitly; it does not infer `T` from the value yet.

## Generic records

Record declarations use the same type-parameter form. A record literal receives its concrete type from expected context:

```pop
private record Box<T>
    value: T
end

local box: Box<Int> = {
    value = 7,
}
```

## Generic tagged unions

Union case construction supplies explicit type arguments:

```pop
private union Choice<T>
    Value(value: T)
    Empty
end

local choice: Choice<String> = Choice.Value<<String>>("ready")
```

Matching uses the ordinary resolved cases; payload bindings receive the substituted type.

## rc.3 execution model

HIR retains the generic identity and semantic arguments. MIR fully specializes every reachable concrete instance and deduplicates equivalent instantiations. Backends receive only concrete typed functions and layouts—never runtime type arguments, dynamic dictionaries, or string lookup.

Generic cross-Bubble metadata, type-argument inference, constraints, and typed code sharing are not implemented in this release.
