---
title: Programming vocabulary
description: Learn the small set of words used throughout the beginner chapters.
sidebar:
  order: 1
---

Programming introduces many names for simple ideas. This chapter gives those names a concrete place in one Pop program. You do not need to memorize the definitions before continuing; return here when a later explanation uses an unfamiliar word.

```pop title="welcome.pop"
namespace Welcome

function greeting(name: String): String
    return `Hello, {name}!`
end

function main()
    local visitor = "Ada"
    local message = greeting(visitor)
    print(message)
end
```

## Source code and source files

**Source code** is the text you write for the compiler. Pop source files end in `.pop`, so the example could be stored as `welcome.pop`.

The source is not the final native executable. It is a precise description that the Pop compiler checks and translates.

## A namespace

Every Pop source file starts with one namespace declaration:

```pop
namespace Welcome
```

A **namespace** gives the declarations in a file a stable home. Larger applications can use names such as `Shop.Payments` and `Shop.Products` without putting every declaration into one global collection.

A namespace is not a runtime object. You cannot store `Welcome` in a local or construct it. It organizes names while Pop compiles the program.

## Declarations

A **declaration** introduces something the rest of the program can name. The example declares two functions:

```pop
function greeting(name: String): String
    return `Hello, {name}!`
end
```

```pop
function main()
    -- instructions
end
```

Records, classes, interfaces, constants, enums, and type aliases are other kinds of declaration introduced later in the book.

## Functions and calls

A **function** is named behavior. Its body contains the instructions performed when code calls it.

```pop
function greeting(name: String): String
    return `Hello, {name}!`
end
```

This function is named `greeting`. The expression below is a **call**:

```pop
greeting("Ada")
```

A declaration describes the function; a call asks it to run.

### The entry point

`main` is the **entry point** of an executable Pop program:

```pop
function main()
    print("The program started")
end
```

When you run the program, Pop begins by calling `main`. Helper functions run only when `main` or another reachable function calls them.

## Values and types

A **value** is a particular piece of data:

```pop
"Ada"
42
true
```

A **type** describes which values belong to a category and which operations are valid for them:

| Value | Type |
| --- | --- |
| `"Ada"` | `String` |
| `42` in the ordinary integer context | `Int` |
| `true` | `Boolean` |

Types are not comments in Pop. The compiler uses them to reject operations that have no defined meaning.

```pop
local score: Int = 10

-- Rejected: a String is not an Int.
-- score = "ten"
```

Pop often infers a local's type from its initial value. In `local visitor = "Ada"`, the compiler determines that `visitor` is a `String`. The type remains `String` after inference.

## Locals and assignment

A **local** is a named storage location available inside its block:

```pop
local visitor = "Ada"
```

The initializer gives the local its first value. Pop requires initialized locals, so `local visitor` by itself is not a complete declaration.

An **assignment** replaces the value stored in a mutable local:

```pop
local score = 10
score = 15
```

Assignment can change the value, but it cannot change the local's type.

## Parameters and arguments

A **parameter** is a name in a function declaration:

```pop
function greeting(name: String): String
```

Here, `name` is a `String` parameter. An **argument** is the value supplied by a particular call:

```pop
greeting("Ada")
```

Here, `"Ada"` is the argument. Pop checks that every argument matches its parameter.

Parameters are immutable bindings in rc.3. A function that needs a mutable working value can initialize a local from the parameter.

## Results and return

The type after a function's parameter list is its result type:

```pop
function greeting(name: String): String
```

This declaration promises that calling `greeting` produces a `String`. `return` supplies that result:

```pop
return `Hello, {name}!`
```

Pop does not infer function result types. A function without a result annotation performs work but does not return a value to its caller.

## Expressions and statements

An **expression** produces a value. These are expressions:

```pop
10 + 5
greeting(visitor)
if ready then "go" else "wait"
```

A **statement** performs an action in a function body. These are statements:

```pop
local message = greeting(visitor)
print(message)
score = score + 1
```

The distinction explains why some syntax can appear inside a larger expression and some syntax occupies its own line. For example, Pop has both an `if` statement for blocks of work and an `if` expression for choosing one value.

## Blocks, `end`, and indentation

A **block** groups statements. Function, `if`, `while`, and numeric `for` bodies are blocks closed by `end`.

```pop
if ready then
    print("Starting")
end
```

Indentation shows humans which statements belong together. The `end` keyword gives the compiler the structural boundary. Use consistent indentation even though whitespace alone does not close the block.

## Scope

A name's **scope** is the part of the source where that name can be used.

```pop
if ready then
    local message = "Starting"
    print(message)
end

-- message is out of scope here
```

Small scopes reduce accidental dependencies. A temporary value used only in one branch should normally remain inside that branch.

## Conditions and control flow

**Control flow** determines which statements run and how often.

An `if` chooses a path:

```pop
if score >= 10 then
    print("Passed")
else
    print("Try again")
end
```

A loop repeats a block:

```pop
for number = 1, 3 do
    print(number)
end
```

Every condition has type `Boolean`. Pop does not treat arbitrary values as truthy or falsy.

## Optional values

Sometimes an operation may not find a value. Pop expresses that possibility in the type:

```pop
local names: {String} = { "Ada", "Grace" }
local possibleName: String? = names[1]
```

`String?` means “a `String` may be present, or the value may be `nil`.” It is called an **optional** type.

The question mark is not uncertainty in the compiler. It is precise information that the program must not use the result as a guaranteed `String`.

## Arrays, tables, records, and classes

These types all group data, but they answer different questions:

| Kind | Best question |
| --- | --- |
| Array | “What value is at this one-based position?” |
| Table | “What optional value is associated with this typed key?” |
| Record | “What are the fixed named parts of this value?” |
| Class | “What object owns this identity and mutable state?” |

Choosing among them is part of modeling a program. Pop does not collapse every collection and object into one universal table representation.

## Compiler, checker, and executable

The **compiler** reads Pop source and translates valid programs. The checker is the part that resolves names and verifies types and language rules.

Use:

```sh
pop check welcome.pop
```

to validate the program without intentionally running it.

Use:

```sh
pop run welcome.pop
```

to check, compile, and run it.

Use:

```sh
pop build welcome.pop --output welcome
```

to create a native executable for later use.

## Compile-time errors and runtime traps

A **compile-time error** means Pop cannot produce a valid program from the source. A wrong argument type, unknown name, or missing `end` is reported before execution.

A **runtime trap** occurs after valid source has started executing and encounters a checked failure, such as an invalid checked array access or numeric overflow.

Pop rc.3 does not provide source-level exceptions for catching traps. The best response is normally to prevent the invalid state or use an operation whose result represents absence explicitly.

## Bubble and project

A **Bubble** is Pop's compilation and visibility boundary. A `bubble.toml` manifest describes a project, and `src/main.pop` is its conventional executable source.

You can ignore Bubbles while running the first single-file examples. They become important when a program has several source files or a public surface.

## A small reading checklist

When an example feels dense, ask:

1. Which names are declarations?
2. Which function starts the program?
3. What type does each local have?
4. Which lines are expressions, and which are statements?
5. Where does each block end?
6. Can an operation return an optional value?
7. Is a reported failure detected while compiling or while running?

Those questions are enough to unpack most examples in the first half of this book.
