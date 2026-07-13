---
title: Namespaces
description: Name declarations and organize source files.
sidebar:
  order: 1
---

Every Pop source file begins with exactly one namespace declaration:

```pop
namespace Store.Payments
```

A namespace gives declarations a stable, qualified home. Dots divide a name into components, so `Store.Payments` can live beside `Store.Products` and `Store.Users`.

Declarations in the same namespace can refer to one another by their short names:

```pop
namespace Geometry

public record Point
    x: Int
    y: Int
end

public function origin(): Point
    return { x = 0, y = 0 }
end
```

The namespace declaration is file-scoped. It is not a block and therefore has no matching `end`. A file cannot switch to a second namespace halfway through.

## Qualified names

Code can name a declaration through its full path when necessary:

```pop
local point: Geometry.Point = Geometry.origin()
```

Qualified names are useful when two namespaces contain the same short declaration name or when a call site should make ownership especially clear.

Namespaces organize names at compile time. They do not create runtime objects and are not values that can be assigned to locals.
