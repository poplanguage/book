---
title: Constants
description: Name values that are evaluated during compilation.
sidebar:
  order: 1
---

A constant gives a name to a value known while the program is compiled:

```pop
namespace Limits

public const MAXIMUM_ATTEMPTS: Int = 3
const GREETING = "Welcome"
```

Constants live at namespace scope. Their names can be used by later declarations and executable code:

```pop
function main()
    print(GREETING)
    print(`Maximum attempts: {MAXIMUM_ATTEMPTS}`)
end
```

The type annotation is optional when Pop can determine the type from the initializer. Writing it can make a public constant’s contract clearer.

Unlike a local variable, a constant cannot be assigned a new value. Its initializer must be a compile-time expression; it cannot depend on command-line input, mutable state, runtime allocation, or an ordinary runtime-only function.

Compile-time evaluation uses the same checked numeric rules as executable code. Integer overflow, division by zero, invalid calls, and evaluation cycles are diagnosed during compilation rather than deferred to the finished program.

Constants are useful for shared limits, fixed labels, attribute arguments, and record or class field defaults. Their names use `UPPER_SNAKE_CASE`. Prefer a local when the value belongs to one execution of a function, even if that local is never reassigned.

See [Constants in runtime code](./runtime-constants/) for the exact value shapes that rc.3 substitutes into executable HIR.
