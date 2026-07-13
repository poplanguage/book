---
title: MIR interpreter
description: Understand the reference execution engine used for conformance.
sidebar:
  order: 5
---

Alongside LLVM code generation, Pop contains an interpreter for verified MIR. It executes the compiler’s lowered representation directly and is used to test language semantics, traps, managed values, and agreement between execution engines.

The interpreter is valuable to the implementation because tests compare its results with native behavior without making source parsing the only oracle. rc.3 differential coverage includes numeric conversion, string composition and formatting, conditional values, numeric ranges and loop control, fixed packs, typed table access/mutation, enums, constants, and specialized generics.

There is no public `pop interpret` command in 0.1.0-rc.3. `pop run` builds and runs a native executable. The MIR interpreter belongs to compiler conformance and advanced implementation work, so user programs should not depend on interpreter-specific behavior.

Likewise, the VM crate in this version is a placeholder rather than an available bytecode target. The supported user path is native LLVM compilation, with the C11 transpiler available for its documented subset.
