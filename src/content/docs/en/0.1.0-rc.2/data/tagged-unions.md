---
title: Tagged unions
description: Represent a value that can be one of several named cases.
sidebar:
  order: 4
---

A tagged union defines a closed set of alternatives. Each alternative has a name and may carry a value:

```pop
public union SearchResult
    Found(value: String)
    Missing
end
```

A `SearchResult` is either `Found` with a `String` payload named `value` or `Missing` with no payload. The cases are constructed through the union name:

```pop
local success: SearchResult = SearchResult.Found("Ada")
local failure: SearchResult = SearchResult.Missing
```

The tag records which case is present. Pop checks the payload at construction, so `SearchResult.Found(42)` is rejected.

## Why use a union?

A union makes alternatives explicit in the type system. Compare a search function returning only `String` with one returning `SearchResult`. The second signature tells its caller that absence is a normal outcome that must be handled.

Unions also model states without relying on magic numbers or loosely related Boolean flags:

```pop
public union Connection
    Disconnected
    Connecting
    Connected(String)
end
```

Only the listed states can exist, and only `Connected` carries the peer name.

Union equality is structural when equality exists for every payload type. Values with different case tags are unequal. Values with the same tag compare their payloads.

Use `match` to discover the active case and safely access its payload.
