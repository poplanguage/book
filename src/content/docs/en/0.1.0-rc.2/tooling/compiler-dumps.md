---
title: Compiler dumps
description: Inspect HIR, MIR, and LLVM output while checking a program.
sidebar:
  order: 2
---

Advanced users can ask `pop check` to print intermediate compiler forms with `--dump`:

```sh
pop check source.pop --dump hir
pop check source.pop --dump mir
pop check source.pop --dump ll
```

The dump kinds are:

| Kind | Shows |
| --- | --- |
| `hir` | resolved, typed high-level program structure |
| `mir` | lowered and verified operations used by execution engines |
| `ll` | LLVM IR generated for native compilation |

The option may be repeated when more than one representation is useful:

```sh
pop check source.pop --dump hir --dump mir
```

Dumps are compiler diagnostics, not stable serialization formats. Their layout may change between Pop releases, and a later version’s tools should not consume a previous version’s textual dump as an API.

When checking fails, the compiler reports diagnostics instead of publishing a misleading partial representation. Fix the earliest source error before relying on a dump produced from later stages.

HIR is usually the best place to study type and name resolution. MIR is better for control flow, checked operations, and runtime interaction. LLVM IR is the lowest and most target-specific of the three.
