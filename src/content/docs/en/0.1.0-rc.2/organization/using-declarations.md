---
title: Using declarations
description: Bring another namespace into a file with an optional alias.
sidebar:
  order: 2
---

A `using` declaration lets a file refer to visible declarations from another namespace by their short names:

```pop
namespace Application

using Geometry

function makeOrigin(): Point
    return origin()
end
```

`using` affects name resolution only. It does not load a file at runtime or execute initialization code.

## Namespace aliases

Give a namespace a shorter or more distinctive local name with `=`:

```pop
namespace Application

using Geo = Company.Project.Geometry

function makeOrigin(): Geo.Point
    return Geo.origin()
end
```

An alias is especially helpful for long qualified names and collisions.

If multiple imported namespaces expose the same short name, Pop reports an ambiguity rather than silently choosing one. Resolve it by using a full qualified name or an alias.

Only declarations visible from the current Bubble can be reached through `using`; importing a namespace does not bypass `private` or `internal` access.
