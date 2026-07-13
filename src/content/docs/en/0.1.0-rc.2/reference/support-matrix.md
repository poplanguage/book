---
title: 0.1.0-rc.2 support matrix
description: Distinguish implemented language features from partial and unavailable ones.
sidebar:
  order: 1
---

This matrix summarizes the user-facing state of Pop 0.1.0-rc.2. “Implemented” means the feature is checked and executable in its documented path. “Limited” means a real foundation exists but its public surface is incomplete.

## Language

| Feature | Status | Boundary |
| --- | --- | --- |
| Functions and typed parameters/results | Implemented | result annotations are not inferred |
| Initialized local inference and assignment | Implemented | assignment never changes the inferred type |
| `if`, `while`, `repeat` | Implemented | Boolean conditions; no `break` or `continue` |
| Local functions and closures | Implemented | captured mutable state is shared |
| Fixed-width integers and floats | Implemented | float literal syntax is limited to typed digit literals |
| Strings | Implemented | small Standard API: equality and printing; no concatenation |
| Tuples and function values | Implemented | no function equality |
| Arrays | Implemented | fixed length, one-based, limited operations |
| Typed tables | Limited | typed literals/storage exist; general table API does not |
| Records and `with` | Implemented | aggregate literals require expected context |
| Tagged unions and exhaustive `match` | Implemented | no wildcards, guards, or expression result |
| Classes | Implemented | nominal identity; no supported general inheritance |
| Interfaces | Implemented | explicit nominal implementation; no default bodies |
| Constants and compile-time functions | Implemented | closed, effect-limited compile-time call graph |
| Typed attributes | Implemented | no general code-generating macro system |
| Enums and type aliases | Not user-ready | parser-facing structure is not a complete executable feature |
| `for` loops | Not implemented | word is reserved, body semantics are unavailable |
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
