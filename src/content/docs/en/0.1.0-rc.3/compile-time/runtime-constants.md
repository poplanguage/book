---
title: Constants in runtime code
description: Use one deterministic compile-time value inside executable functions.
sidebar:
  order: 2
---

A namespace constant is evaluated once by the front end and can be named by ordinary runtime code:

```pop
namespace Limits

private const MAXIMUM_ATTEMPTS: Int = 3

function main()
    print(`maximum attempts={MAXIMUM_ATTEMPTS}`)
end
```

The compiler substitutes the already checked `Int` value into typed HIR. It does not create mutable module storage, a runtime name lookup, or an implicit global.

## Compile-time function values

The initializer can call eligible compile-time functions:

```pop
@CompileTime
private function doubled(value: Int): Int
    return value * 2
end

private const BUFFER_SIZE = doubled(512)

function main()
    print(`buffer size={BUFFER_SIZE}`)
end
```

`doubled` runs during compilation and every runtime use receives `1024`.

## Runtime-usable shapes

rc.3 can substitute these immutable values:

- `nil`, `Boolean`, integers, floating-point values, and `String`;
- fixed tuples recursively composed from those primitives.

Mutable or identity-bearing aggregates are not runtime constant shapes yet. Visibility still applies when another Module or Bubble refers to the declaration.
