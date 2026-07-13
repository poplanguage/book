---
title: Choose your learning path
description: Take a beginner, experienced-programmer, or Luau-focused route through The Pop Book.
sidebar:
  order: 2
---

You do not need the same introduction as every other reader. Someone writing a first program needs different explanations from someone who already knows Luau, Rust, C, or another language.

All paths eventually meet in the language chapters. Choose the beginning that matches you now; you can return to skipped chapters whenever a term feels unfamiliar.

## If this is your first programming language

Read the opening chapters in order:

1. [Programming vocabulary](./programming-vocabulary/) introduces source files, values, types, functions, expressions, statements, and compiler errors.
2. [Installation](../installation/) gets the rc.3 compiler onto your computer.
3. [Hello, World!](../hello-world/) creates, checks, runs, and builds one complete program.
4. [Reading command-line arguments](../command-line-arguments/) lets information outside the source affect the program.
5. [A Pop project](../a-pop-project/) turns a loose source file into a Bubble with a conventional layout.

After Getting Started, continue with these foundations:

1. [Variables and local bindings](../../language/variables/)
2. [Functions](../../language/functions/)
3. [Expressions and operators](../../language/expressions-and-operators/)
4. [Decisions with `if`](../../language/conditions/)
5. [Repetition with loops](../../language/loops/)
6. [Primitive types](../../types/primitives/)
7. [Arrays](../../data/arrays/), [records](../../data/records/), and [typed tables](../../data/tables/)

Do not try to memorize the reference section yet. Write the examples, change one thing, run them again, and let the compiler show which rules matter.

## If you already program in another language

Read [Hello, World!](../hello-world/) and [A Pop project](../a-pop-project/) to learn the file and command conventions. Then scan these chapters for Pop-specific rules:

- [Variables](../../language/variables/): locals infer once; parameters are immutable.
- [Functions](../../language/functions/): parameters and returned values cross exact typed boundaries.
- [Conditions](../../language/conditions/): only `Boolean` is a condition.
- [Numeric types](../../types/integers/): Pop uses fixed numeric types and checked explicit conversions.
- [Boolean, nil, and optionals](../../types/boolean-nil-and-optionals/): absence is represented in the type.
- [Arrays](../../data/arrays/), [tables](../../data/tables/), and [records](../../data/records/): these are separate data models.
- [Namespaces](../../organization/namespaces/) and [Bubbles](../../organization/bubbles-and-layout/): source organization is resolved at compile time.
- [Support matrix](../../reference/support-matrix/): prerelease boundaries are stated explicitly.

Readers coming from a dynamically typed language should spend extra time on optionals, fixed-width numbers, and aggregate types. Readers coming from a systems language will likely find the static model familiar, but should still learn Pop's managed arrays, tables, classes, and compiler-known compile-time features.

## If you are coming from Luau

Read [Coming from Luau](../coming-from-luau/) before translating an existing mental model into Pop.

Pop deliberately uses several Luau-shaped forms: `local`, `function`, `if ... then`, `while ... do`, blocks closed by `end`, `~=` for inequality, `..` for string concatenation, and colon method calls. That familiarity helps you read code immediately.

It does not make Pop a Luau runtime or a gradually typed Lua dialect. The important differences are deeper than punctuation:

- Pop has no dynamic escape type.
- Tables are one typed aggregate among several, not the universal object model.
- Arrays are typed and fixed-length.
- Conditions require `Boolean`; there is no general truthiness.
- Functions, modules, visibility, errors, and execution have different contracts.
- Pop compiles a Bubble ahead of time instead of executing a module script through `require`.

The Luau guide marks what you can keep, what you need to relearn, and what you should stop expecting.

## A productive learning loop

For each new feature, use the same small loop:

1. Copy the complete example into a `.pop` file.
2. Run `pop check file.pop`.
3. Run it with `pop run file.pop`.
4. Change one value, type, condition, or call.
5. Predict whether the change should compile.
6. Check your prediction and read the first diagnostic.

Changing one fact at a time makes compiler feedback useful. If you rewrite the entire example before checking it, one mistake can hide several later lessons.

### Read the first diagnostic first

A missing `end` or closing delimiter can make later source look invalid. Start with the earliest diagnostic, fix it, and check again. Do not assume that every reported location represents a separate problem.

### Keep examples small

Use one source file until a lesson is specifically about Bubbles or namespaces. Small programs make the relationship between a line of source and its result easy to see.

### State types when they teach something

Pop can infer initialized locals:

```pop
local score = 10
```

During learning, an explicit annotation can expose the rule being practiced:

```pop
local score: Int = 10
local possibleScore: Int? = scores["Ada"]
```

You do not need to annotate every local forever. Use annotations where they clarify a boundary, especially optionals, aggregates, and numeric widths.

## A practice ladder

Build these programs in order. Each adds one new idea without requiring a large Standard library.

### 1. Personalized greeting

Read a command-line name and format it into a backtick string.

You practice `main`, arrays, checked indexing, and interpolation.

### 2. Number classifier

Given an integer, print whether it is negative, zero, or positive.

You practice explicit types, comparisons, `if`, and `elseif`.

### 3. Countdown

Count from a starting integer down to `1`.

You practice mutable locals, numeric `for`, or `while`.

### 4. Score record

Declare a record containing a player's name and score, then produce an updated copy with `with`.

You practice expected aggregate types and value-oriented updates.

### 5. Score table

Store scores under `String` keys, replace one entry, and return an `Int?` lookup from a helper.

You practice typed mutation and honest absence.

### 6. Small stateful class

Build a counter with a private field and public methods.

You practice managed identity, encapsulation, and colon method calls.

### 7. Multi-file Bubble

Move one data type and helper into another namespace in the same Bubble.

You practice project layout, visibility, and `using` declarations.

## What to postpone

You can write useful introductory programs without understanding:

- HIR and MIR;
- garbage collector object maps;
- compile-time function restrictions;
- generic specialization;
- the experimental C backend;
- every primitive width;
- every command-line dump.

Those chapters exist for readers who want to see how Pop works, but they are not prerequisites for variables, decisions, loops, or functions.

Do not postpone the support matrix indefinitely. Pop is a release candidate with a deliberately small Standard library, so knowing what is not implemented prevents you from searching for an API that this edition does not have.

## What success looks like

You are ready to leave Getting Started when you can:

- identify the namespace and `main` function in a source file;
- declare and update a typed local;
- explain why an `if` condition must be `Boolean`;
- distinguish a value `V` from an optional `V?`;
- choose an array, table, record, or class deliberately;
- run `check`, `run`, and `build` for the right purpose;
- read the first compiler diagnostic without treating it as a failure to learn.

The goal is not to remember all of Pop. It is to build a correct mental model that later chapters can extend.
