---
title: Pattern matching
description: Handle every case of a tagged union.
sidebar:
  order: 5
---

A `match` examines a tagged union and runs the branch for its current case:

```pop
function describe(result: SearchResult)
    match result
    when SearchResult.Found(name) then
        print("Found")
        print(name)
    when SearchResult.Missing then
        print("Nothing was found")
    end
end
```

In the `Found` branch, `name` is bound to the case’s `String` payload. A case without a payload needs no binding.

## Exhaustiveness

Pop requires a branch for every case in the union. If `SearchResult` has `Found` and `Missing`, leaving out either branch is a compile-time error. This check means adding a new union case points you to every match that must decide what the new case means.

Each case must appear exactly once. There is no wildcard branch in 0.1.0-rc.2, so a match documents the complete set directly.

## Ignoring a payload

Use `_` when a case matters but its payload does not:

```pop
match result
when SearchResult.Found(_) then
    print("There is a result")
when SearchResult.Missing then
    print("There is no result")
end
```

The underscore does not create a local variable.

Matching in this release is a statement rather than an expression: branches perform work or return from their containing function, but the complete `match` does not itself produce a value. Patterns select union cases; guards, nested destructuring, and general literal patterns are not implemented.
