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

const BufferSize: Int = doubled(512)
```

Here the call is evaluated by the compiler, and `BufferSize` becomes `1024` before runtime code is emitted.

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

Compile-time functions are removed from the runtime MIR when they exist only for compilation. Do not use `@CompileTime` as a performance hint for an ordinary runtime helper; use it when the function’s intended environment truly is the compiler.
