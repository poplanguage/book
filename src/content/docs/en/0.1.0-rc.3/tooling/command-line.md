---
title: Command-line reference
description: Use every command exposed by the 0.1.0-rc.3 driver.
sidebar:
  order: 1
---

The Pop driver exposes four commands in this release.

## `pop check`

Check a source entry without linking an executable:

```sh
pop check source.pop
```

Use this for fast syntax, resolution, type, compile-time, and MIR verification feedback.

## `pop build`

Build a native executable and choose its path:

```sh
pop build source.pop --output application
```

The output option is required. Native linking uses the Standard and runtime archives shipped beside the Pop executable.

## `pop run`

Build and immediately run a direct source entry:

```sh
pop run source.pop
```

Pass arguments to the program after `--`:

```sh
pop run source.pop -- first "two words"
```

Run the single binary discovered by a project manifest:

```sh
pop run --manifestPath path/to/bubble.toml
```

The option uses the spelling `--manifestPath` in this release.

## `pop transpile`

Translate the supported runtime-free subset to C:

```sh
pop transpile source.pop --to c
```

Only `c` is available as a transpilation target, and not every valid Pop program belongs to that subset.

## Commands not yet available

The driver does not expose `new`, `test`, `format`, `doc`, `add`, `install`, or `publish`. Some supporting crates and project conventions exist for future tooling, but they are not commands a reader can use in 0.1.0-rc.3.
