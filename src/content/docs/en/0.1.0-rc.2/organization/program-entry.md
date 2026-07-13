---
title: Program entry
description: Define the main function accepted by a native executable.
sidebar:
  order: 5
---

An executable Bubble has exactly one function named `main`. It may receive no arguments:

```pop
function main()
    print("Hello")
end
```

Or it may receive the command-line arguments as one `Array<String>` parameter:

```pop
function main(arguments: Array<String>)
    print(Array.length(arguments))
end
```

No other parameter shape is a valid native entry in 0.1.0-rc.2.

## Exit status

An entry with no result annotation finishes with status code zero when it reaches the end:

```pop
function main()
    print("done")
end
```

An entry may instead return an `Int`, which becomes the process exit status:

```pop
function main(): Int
    return 1
end
```

Shells conventionally interpret zero as success and a nonzero value as failure.

## Arguments

When using `pop run`, write program arguments after `--`:

```sh
pop run app.pop -- first "two words" ""
```

The entry receives three strings. The executable path itself is excluded. Order, empty arguments, and non-ASCII UTF-8 are preserved. If the operating system supplies an argument that is not valid UTF-8, the native entry traps before calling an argument-taking `main` rather than silently changing its bytes.

The entry declaration uses omitted/private visibility. Multiple `main` functions, another result type, multiple parameters, or a parameter other than `Array<String>` are rejected before native code is emitted.
