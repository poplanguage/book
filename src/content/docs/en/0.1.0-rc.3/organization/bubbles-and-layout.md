---
title: Bubbles and project layout
description: Understand Pop's compilation unit and conventional source tree.
sidebar:
  order: 4
---

A **Bubble** is Pop’s compilation and visibility unit. A project manifest describes a package, and conventional paths identify its library, executable, tests, examples, and benchmarks.

```text
project/
├── bubble.toml
└── src/
    ├── lib.pop
    ├── main.pop
    └── bin/
        ├── admin.pop
        └── worker/
            └── main.pop
```

The discovered source roles are:

- `src/lib.pop` — the package library Bubble;
- `src/main.pop` — the default binary Bubble;
- `src/bin/*.pop` — additional flat binaries;
- `src/bin/<name>/main.pop` — additional directory-based binaries;
- flat files under `tests/`, `examples/`, and `benchmarks/` — conventional auxiliary Bubbles.

In 0.1.0-rc.3, manifest execution builds library and binary Bubbles and requires exactly one binary to run. Discovery of the other roles exists, but a complete test/benchmark command workflow is not exposed by the driver.

## The manifest

The implemented manifest requires:

```toml
[package]
name = "Example.App"
version = "0.1.0"
edition = "2026"
```

Package names contain dot-separated PascalCase components. Version values use dotted decimal components, and the edition contains decimal digits. Values in the implemented parser are quoted strings.

The parser recognizes a simple `[dependencies]` section, but package execution rejects non-empty dependencies because resolution and downloading are not implemented. A Bubble is therefore useful today as a local compilation boundary, not yet as a package-registry unit.

## Direct files and projects

`pop check file.pop`, `pop run file.pop`, and `pop build file.pop --output app` compile a direct source entry. `pop run --manifestPath bubble.toml` uses project discovery. Start with a direct file for experiments; use a manifest when the conventional layout helps organize a program.
