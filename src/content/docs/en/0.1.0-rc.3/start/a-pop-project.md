---
title: A Pop project
description: Give a Pop program a conventional project layout.
sidebar:
  order: 8
---

A single source file is enough for small examples. As a program grows, keeping its source and project information together makes it easier to run and share. Pop calls this unit a **Bubble** and describes it with a `bubble.toml` file.

Create a new directory with this layout:

```text
greeting/
├── bubble.toml
└── src/
    └── main.pop
```

Put the following project information in `bubble.toml`:

```toml title="bubble.toml"
[package]
name = "Greeting"
version = "0.1.0"
edition = "2026"
```

The package name uses PascalCase, just like the namespace in the source file. The version identifies this project, not the installed version of Pop.

Now add the program:

```pop title="src/main.pop"
namespace Greeting

function main()
    print("Hello from a Pop project!")
end
```

From the `greeting` directory, run:

```sh
pop run --manifestPath bubble.toml
```

Pop reads the manifest, discovers `src/main.pop`, builds the program under `target/debug/`, and runs it.

## The conventional layout

`src/main.pop` is the default executable source. A project may instead or additionally contain a reusable `src/lib.pop`. Extra executables can live in `src/bin/`, although the current `run` command needs the project to contain exactly one executable.

The manifest format also recognizes a `[dependencies]` table, but dependency resolution is not available in 0.1.0-rc.3. For now, use a Bubble to organize code that belongs to one project; do not expect it to download external packages.

We will use direct `.pop` files for most short examples because they keep the lesson focused. The Modules and Packages part returns to multi-file organization and the complete project layout.
