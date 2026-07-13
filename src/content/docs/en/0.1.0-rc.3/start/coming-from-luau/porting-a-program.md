---
title: Porting a Luau program
description: Redesign a Luau component for Pop one contract at a time instead of translating punctuation.
sidebar:
  order: 5
---

A successful port preserves intended behavior, not every original mechanism. Translating line by line usually carries Luau assumptions into places where Pop deliberately has another model.

## Step 1: write the behavior in plain language

Before editing syntax, state:

- what enters the component;
- what it returns or changes;
- which outcomes are ordinary absence;
- which states are invalid;
- which external host APIs it needs.

If the behavior cannot be described without “this table happens to contain…”, identify the table's real roles first.

## Step 2: inventory dynamic assumptions

Search the Luau component for:

- `any` and unannotated external values;
- truthy conditions;
- missing or extra call arguments;
- variadic packs;
- mixed-role tables;
- metatables and metamethods;
- `pairs` and `ipairs`;
- assignment of `nil` to delete keys;
- computed `require`;
- host globals and Roblox services;
- `pcall` or exception-style recovery.

Each item needs a design choice, not a spelling substitution.

## Step 3: choose exact values and absence

Convert each input and result into a Pop type. Replace one universal `number` with the appropriate integer or float. Mark only genuine missing outcomes as optional.

```pop
function findScore(
    scores: {[String]: Int},
    name: String,
): Int?
    return scores[name]
end
```

Do not replace absence with `0` unless zero truly means the same thing in the domain.

## Step 4: split table roles

Use arrays for fixed homogeneous positions, tables for runtime typed associations, records for fixed data, and classes for identity and mutable invariants.

For closed states, prefer an enum or tagged union over string tags scattered through a table.

## Step 5: make dependencies explicit

Replace runtime module discovery and globals with namespaces, `using`, and function parameters. Create state from `main` or another explicit composition function.

```pop
namespace App

using App.Scores

function main()
    local board = ScoreBoard {}
    run(board)
end
```

The exact class fields depend on the component, but the ownership and startup order are now visible.

## Step 6: translate control flow

Keep `if`, `elseif`, `while`, `repeat`, numeric `for`, `break`, and `continue` where their contracts match.

Rewrite truthiness into Boolean questions. Replace `pairs` and `ipairs` with supported operations; fixed arrays use numeric positions, while rc.3 typed tables do not expose enumeration.

## Step 7: state function boundaries

Write every parameter and result type. Replace variadic and arity-flexible functions with fixed signatures, arrays, or records.

Keep multiple returns only when they form one exact fixed pack:

```pop
function bounds(): (Int, Int)
    return 1, 10
end
```

## Step 8: separate recoverable data from traps

Use optional or union results for outcomes callers should handle. Prevent invalid checked operations with precondition tests.

Do not port a `pcall` block by assuming Pop can catch a runtime trap. rc.3 exceptions are not implemented.

## Worked redesign: a small score service

The Luau version uses one table for module exports, mutable state, and a dictionary:

```lua
local Scores = {}
local values = {}

function Scores.set(name, score)
    values[name] = score
end

function Scores.get(name)
    return values[name]
end

return Scores
```

First identify the roles:

- `Scores` is a returned module namespace;
- `values` is mutable dictionary state;
- `set` mutates shared state;
- `get` may not find a key.

In Pop, namespace organization and state are separate:

```pop
namespace App.Scores

public class ScoreBoard
    private values: {[String]: Int}

    public function ScoreBoard:set(name: String, score: Int)
        self.values[name] = score
    end

    public function ScoreBoard:get(name: String): Int?
        return self.values[name]
    end
end
```

Create the state deliberately:

```pop
namespace App

using App.Scores

function main()
    local values: {[String]: Int} = {}
    local board = ScoreBoard {
        values = values,
    }

    board:set("Ada", 10)
    local score: Int? = board:get("Ada")

    print("Score stored; lookup remains optional.")
end
```

The new model states facts the Luau runtime previously discovered:

- one `ScoreBoard` has identity;
- its storage maps `String` to `Int`;
- mutation accepts exact types;
- lookup can miss;
- the namespace is not the state object;
- startup creates the state explicitly.

## When a direct port is impossible

Some components depend on facilities rc.3 does not provide: dynamic lists, table iteration, coroutines, exceptions, dependency downloading, dynamic code loading, or Roblox host APIs.

Do not counterfeit those facilities through unrelated language features. Choose one honest outcome:

- reduce the component to the supported subset;
- redesign around fixed data and explicit control flow;
- provide a real native or Standard integration outside this book's current surface;
- postpone the port until the required foundation exists.

An explicit boundary is more useful than code that looks translated but cannot preserve behavior.

## Final port review

Before considering the component complete, verify conceptually:

- every local keeps one inferred or declared type;
- every condition is `Boolean`;
- every function has exact parameters and results;
- every optional represents real absence;
- every aggregate has one deliberate role;
- every module dependency is compile-time visible;
- every mutation has an owner;
- every runtime trap represents an invariant violation;
- every used API exists in rc.3 rather than only in Luau or a host.

Then use `pop check` frequently as you implement one boundary at a time. The compiler is most helpful when each edit introduces one new decision.
