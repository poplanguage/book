---
title: Compile-time functions
description: Evaluate pure helper logic while the program is compiled.
sidebar:
  order: 2
---

The trusted `@CompileTime` attribute marks a function that may run during compilation:

```pop
@CompileTime
function doubled(value: Int): Int
    return value * 2
end

const BUFFER_SIZE: Int = doubled(512)
```

Here the call is evaluated by the compiler, and `BUFFER_SIZE` becomes `1024` before runtime code is emitted. Runtime uses of the constant receive that already evaluated `Int`; there is no runtime lookup or mutable global.

Compile-time functions can support constant declarations, field defaults, attribute arguments, and attribute validators. Their parameters and results still use ordinary Pop types, and their bodies are type-checked like other functions.

## Closed compile-time calls

A compile-time function cannot call arbitrary runtime code. Every Pop function it calls must also be marked `@CompileTime`:

```pop
function runtimeOnly(): Int
    return 42
end

@CompileTime
function invalid(): Int
    return runtimeOnly() -- rejected
end
```

This closed call graph keeps compile-time execution independent of runtime-only effects. The compiler also detects recursive evaluation cycles and enforces resource limits so a bad constant computation cannot run forever.

Conditional expressions preserve lazy evaluation at compile time:

```pop
@CompileTime
function choose(flag: Boolean): Int
    return if flag then 42 else 1 / 0
end

const ANSWER = choose(true)
```

The unselected division is not evaluated.

Compile-time functions are removed from the runtime MIR when they exist only for compilation. Do not use `@CompileTime` as a performance hint for an ordinary runtime helper; use it when the function’s intended environment truly is the compiler.
