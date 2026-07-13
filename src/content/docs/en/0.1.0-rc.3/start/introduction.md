---
title: Introduction
description: Meet Pop and see what you will build throughout this book.
sidebar:
  order: 1
---

Welcome to _The Pop Book_, an introduction to Pop Lang 0.1.0-rc.3. Pop is a statically typed, compiled language with a small, readable syntax. It uses familiar ideas such as functions, records, classes, and interfaces, while keeping blocks easy to recognize with the `end` keyword.

:::caution[This is a prerelease]
Pop 0.1.0-rc.3 is a release candidate, not a stable language release. Syntax, compiler behavior, the Standard library, project files, and command-line options can change substantially before 1.0. Code from another Pop version may not work exactly as shown here. Keep the version selector on **0.1.0-rc.3** while reading this edition.
:::

Here is a complete Pop program:

```pop
namespace Welcome

function main()
    local language = "Pop"
    local release = "0.1.0-rc.3"
    print(`🫧 Hello from {language} {release}!`)
end
```

You do not need to understand every line yet. By the end of the first part, you will know how to write programs like this, store values, make decisions, repeat work, and organize behavior into functions.

Later parts introduce Pop’s types and ways of modeling data. Dedicated leaves cover every primitive. You will use numeric ranges, conditional values, multiple returns, explicit generics, typed tables, records, enums, tagged unions, classes, and interfaces; learn how namespaces divide a program; and see how closures can carry state. The final parts are a precise guide to the language implemented in this release, including compile-time features, native execution, and the command-line tools.

## Who this book is for

The opening chapters assume only that you can create a text file and enter a command in a terminal. Programming terms are introduced when they become useful. If you already know another language, the examples should make Pop’s syntax and rules clear without requiring you to read compiler documentation.

Start with [Choose your learning path](../learning-paths/) rather than guessing which chapters you should skip. First-time programmers get a vocabulary guide and a gradual practice route. Experienced programmers get a shorter route through Pop-specific rules.

If you know Luau, read [Coming from Luau](../coming-from-luau/) before relying on familiar syntax. Pop keeps several readable Luau-shaped forms, but replaces gradual typing, truthiness, universal tables, runtime modules, and metatables with static contracts and separate data models.

This book covers the features available in Pop 0.1.0-rc.3. Pop is still a release candidate, so its standard library and package tooling are small. The book points out those boundaries directly instead of teaching APIs that do not exist yet.

Choose a path, then install Pop and write your first program.
