---
title: Modules, Bubbles, and native execution
description: Replace require, exported tables, mutable globals, and host-VM expectations with Pop's compiled organization.
sidebar:
  order: 4
---

Luau modules participate in runtime execution: `require` runs or retrieves a module and receives its returned value. Pop organizes declarations before runtime and compiles a Bubble into an executable program.

## A namespace is not a returned table

```pop title="src/math.pop"
namespace App.Math

function double(value: Int): Int
    return value * 2
end
```

The namespace gives `double` a qualified home. It is not constructed at runtime and cannot be stored in a local.

Another file can use it:

```pop title="src/main.pop"
namespace App

using App.Math

function main()
    print(double(21))
end
```

`using` changes name resolution. It does not execute `math.pop`, return a value, or perform a dynamic lookup.

## Files belong to Modules and Bubbles

Pop's organization proceeds through explicit compiler boundaries:

```text
Item -> Module -> Bubble -> Package -> Workspace
```

Functions, records, classes, and constants are Items. Source ownership gives those Items a Module boundary. A Bubble is the compilation and visibility unit described by `bubble.toml`.

This hierarchy is not a nested table of runtime exports. It tells the compiler where a declaration belongs and who may name it.

## Visibility replaces export-table conventions

Declarations are `internal` by default:

```pop
function helper()
end
```

Use `private` for the declaring Module and `public` for other Bubbles:

```pop
private function implementationDetail()
end

public function supportedApi()
end
```

There is no source-level `export` modifier. Returning a table is not how declarations become visible.

## No computed `require`

Pop must resolve reachable code while compiling. It does not load a source module from a runtime-computed string:

```lua
local feature = require(path .. featureName)
```

Choose the dependency through declarations and typed control flow instead. If several implementations share behavior, an interface may describe their common nominal contract.

## No mutable global environment

Do not expect a host to populate arbitrary global names. Pop resolves locals, parameters, declarations, namespaces, types, and constants statically.

Shared runtime state belongs in a deliberately passed managed object or another typed value. Constants are compile-time declarations, not mutable entries in `_G`.

This makes dependency direction visible: a function receives what it uses rather than discovering it through ambient table mutation.

## A Bubble manifest

The conventional project layout is:

```text
app/
├── bubble.toml
└── src/
    ├── main.pop
    └── math.pop
```

```toml title="bubble.toml"
[package]
name = "App"
version = "0.1.0"
edition = "2026"
```

Run it from the project directory:

```sh
pop run --manifestPath bubble.toml
```

rc.3 recognizes dependency metadata but does not yet resolve and download external packages. The manifest is a real project boundary, not a complete package registry workflow.

## Ahead-of-time execution

`pop build` produces a native executable through the LLVM path:

```sh
pop build src/main.pop --output app
./app
```

The executable does not require the Luau VM to interpret the source. Types and reachable generic specializations are resolved before backend execution.

This execution model rules out several Luau assumptions:

- dynamic source loading;
- replacing functions in an export table after loading;
- discovering fields by arbitrary runtime name;
- relying on module execution for implicit registration;
- inspecting a universal VM value representation.

## Roblox APIs are host APIs, not language syntax

Roblox Luau programs receive services, Instances, events, tasks, and Roblox datatypes from their host. Pop does not automatically provide equivalents merely because some syntax is familiar.

Separate a port into two questions:

1. Which logic is ordinary typed computation?
2. Which behavior depends on Roblox or another Luau host?

The first portion may translate into Pop functions and data models. The second needs an actual Pop library or integration; renaming the API does not create one.

## Diagnostics and traps replace dynamic recovery assumptions

Wrong names, types, calls, aggregate fields, and operators are normally compile-time diagnostics.

Checked runtime failures include overflow, division by zero, invalid explicit conversion, and violated checked collection preconditions. rc.3 does not provide `pcall`, `xpcall`, or catchable source exceptions.

Represent recoverable absence as data—often `T?` or a tagged union. Treat a trap as a failed program invariant, because source cannot catch and reinterpret it in this release.

## Backend boundaries remain honest

The LLVM/native path supports the documented rc.3 language. The MIR interpreter is an internal conformance engine. The C backend is experimental and accepts only a runtime-free subset.

Unsupported C-backend constructs fail closed. Pop does not silently execute a different meaning just to emit C.

## Porting a service-style module

A Luau service module often combines:

- singleton mutable state;
- exported methods;
- initialization during `require`;
- host lookups;
- callbacks registered for side effects.

Split that design in Pop:

- represent state with a class instance;
- expose typed functions or interface behavior;
- create the instance explicitly from `main`;
- pass dependencies through parameters;
- perform startup in an explicit function call;
- keep namespace declarations free of hidden runtime initialization.

The result may have more visible wiring, but its order and dependencies are checkable without executing module files to discover them.

Next, [Porting a Luau program](./porting-a-program/) combines the type, control-flow, data, and module decisions into one workflow.
