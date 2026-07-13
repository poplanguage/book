---
title: Experimental C output
description: Transpile the runtime-free subset to C11.
sidebar:
  order: 4
---

The driver can translate a limited subset of Pop into C11 source:

```sh
pop transpile app.pop --to c
```

This backend is experimental and intentionally smaller than native LLVM compilation. It is useful for inspecting simple lowering and for runtime-free programs; it is not a second complete implementation of every Pop feature.

The supported core includes a deliberately narrow scalar subset: typed numeric operations, direct function calls, conditionals, selected string operations/output, and a no-argument entry that returns no value or an `Int` status. Some rc.3 MIR operations have C lowering, but that does not make the backend release-equivalent to LLVM.

Features outside the declared capability set are rejected rather than translated incorrectly. This includes managed records, tagged unions, enums, generic data, classes, closures, arrays and tables, and operations needing unsupported allocation, tracing, or safe points.

Always treat the transpiler’s diagnostic as authoritative for a particular program. Code accepted by `pop check` or the LLVM backend is not guaranteed to be in the C subset.

The C output still needs a C11 compiler if you want to turn it into an executable. Pop does not promise source-level ABI compatibility between the generated C and arbitrary hand-written C code in this release.
