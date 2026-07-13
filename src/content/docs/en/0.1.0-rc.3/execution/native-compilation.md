---
title: Native compilation
description: Follow a Pop program from source to a native executable.
sidebar:
  order: 1
---

`pop build` produces a native executable ahead of time:

```sh
pop build app.pop --output app
```

The compiler first parses the source and resolves names, visibility, constants, generic arguments, and types into a high-level intermediate representation (HIR). It then specializes reachable generics, lowers valid code to canonical MIR, verifies that representation, and sends it to the LLVM backend. LLVM emits an object file, and the driver links it with Pop’s Standard and native runtime archives.

String composition, numeric conversion, table access, enum cases, fixed packs, and loop control all reach LLVM through typed backend-neutral HIR/MIR contracts. The backend does not re-parse source names or invent dynamic operations.

The important user-facing consequence is that syntax, name, and type errors are reported before an executable is produced. A successful executable no longer needs the Pop compiler to parse its source when it starts.

## Checking without building

Use `pop check` when you need diagnostics but not an executable:

```sh
pop check app.pop
```

This runs the front end and verification stages without completing native linking. It is useful for editor tasks and quick feedback.

## Running directly

`pop run app.pop` follows the build path and then starts the program. Arguments after `--` are passed to `main`:

```sh
pop run app.pop -- first second
```

The release archives include the two native libraries needed by the linker. Keep `libpop_standard.a` and `libpop_runtime_native.a` beside the real Pop executable when moving an installation.

Pop 0.1.0-rc.3 targets Linux native executables in its release distribution. It is not a bytecode interpreter or a cross-platform virtual-machine package.
