---
title: 0.1.0-rc.3 support matrix
description: Distinguish implemented language features from partial and unavailable ones.
sidebar:
  order: 1
---

This matrix summarizes the user-facing state of Pop 0.1.0-rc.3. “Implemented” means the feature is checked and executable in its documented path. “Limited” means a real foundation exists but its public surface is incomplete.

## Language

| Feature | Status | Boundary |
| --- | --- | --- |
| Functions and typed parameters/results | Implemented | result annotations are not inferred |
| Initialized local inference and assignment | Implemented | assignment never changes the inferred type |
| `if`, `elseif`, conditional values | Implemented | exact Boolean conditions and common branch type |
| `while`, `repeat`, numeric `for` | Implemented | inclusive integer ranges; `break` and `continue` |
| Generalized `for value in iterable` | Not implemented | awaits nominal `Iterable<T>` / `Iterator<T>` protocols |
| Local functions and closures | Implemented | captured mutable state is shared |
| Fixed-width integers and floats | Implemented | decimal floats, full ordering, checked explicit conversions |
| Strings | Implemented | escapes, `..`, backtick interpolation, primitive formatting |
| Fixed packs, tuples, multiple assignment | Implemented | exact arity; static one-based tuple projection |
| Function values | Implemented | no function equality |
| Arrays | Implemented | fixed length, one-based, limited operations |
| Typed tables | Implemented | optional lookup and insertion/replacement; no deletion or iteration API |
| Records and `with` | Implemented | aggregate literals require expected context |
| Tagged unions and exhaustive `match` | Implemented | no wildcards, guards, or expression result |
| Classes | Implemented | nominal identity; no supported general inheritance |
| Interfaces | Implemented | explicit nominal implementation; no default bodies |
| Constants and compile-time functions | Implemented | closed, effect-limited compile-time call graph |
| Typed attributes | Implemented | no general code-generating macro system |
| Enums and type aliases | Implemented | payload-free nominal enums; non-generic erased aliases |
| Explicit generics | Implemented | functions, records, and unions; no type-argument inference |
| Exceptions | Not implemented | runtime traps cannot be caught in Pop source |

## Standard and tooling

| Feature | Status | Boundary |
| --- | --- | --- |
| `print(String)` and `print(Int)` | Implemented | newline output only |
| General String/List/Set/Range APIs | Not implemented | some names exist as bootstrap identities only |
| Native LLVM build and run | Implemented | Linux release archives |
| C11 transpiler | Limited | runtime-free subset only |
| MIR interpreter | Internal | conformance engine, no public CLI command |
| `bubble.toml` project run | Limited | one binary, no dependency resolution |
| Formatter, LSP, docs, test CLI | Not user-ready | early library crates only |
| Package registry/publishing | Not implemented | no `add` or `publish` command |

Reserved words and internal type identities are not promises of source-level functionality. Use the chapters in this version of the book and `pop --help` rather than future-oriented names as the compatibility contract.
