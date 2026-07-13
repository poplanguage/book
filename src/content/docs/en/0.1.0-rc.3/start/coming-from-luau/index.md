---
title: Coming from Luau
description: Keep the familiar syntax while replacing Luau assumptions with Pop's static, compiled model.
sidebar:
  order: 4
---

Pop looks familiar to a Luau reader on purpose. Both languages use `local`, `function`, `if ... then`, `while ... do`, `repeat ... until`, and blocks closed by `end`. Both use `~=` for inequality and `..` for string concatenation.

That resemblance is a reading advantage, not a compatibility promise. Pop is not a Luau dialect, does not run inside the Luau VM, and does not inherit Lua's table-centered runtime model.

The most useful first rule is:

> Keep your control-flow intuition, but rebuild your type, data, module, and runtime intuition.

## The short comparison

| Area | Luau expectation | Pop rc.3 model |
| --- | --- | --- |
| Typing | gradual typing with dynamic escape routes | static types with no `any` or dynamic fallback |
| Conditions | every value has truthiness | conditions must be `Boolean` |
| Numbers | primarily one `number` type | fixed signed, unsigned, and floating-point primitives |
| Tables | universal mutable data structure | typed key-value aggregate with a restricted role |
| Arrays | table convention that can grow | separate typed, fixed-length, one-based aggregate |
| Objects | tables, metatables, and structural shapes | records, classes, interfaces, and unions |
| Modules | execute a script through `require` and receive a value | compile files into namespaces inside a Bubble |
| Missing data | `nil`, often used to remove table fields | optional types; no table deletion in rc.3 |
| Execution | VM-hosted script environment | ahead-of-time native compilation |
| Errors | runtime errors may be caught with Luau facilities | compile-time diagnostics and non-catchable runtime traps |

## Use this guide as a mini-book

This page gives the complete map. The focused leaves develop each change with smaller comparisons, porting rules, and exercises:

1. [Types, truthiness, and values](./types-and-values/) replaces gradual and coercive assumptions with Pop's exact static model.
2. [Functions and control flow](./functions-and-control-flow/) separates familiar block syntax from exact function and loop contracts.
3. [From universal tables to deliberate data](./data-modeling/) chooses among arrays, tables, records, classes, interfaces, enums, and unions.
4. [Modules, Bubbles, and native execution](./modules-and-execution/) replaces `require`, exported tables, globals, and host-VM expectations.
5. [Porting a Luau program](./porting-a-program/) walks through the design decisions before translating syntax.

Read them in that order when Pop is your first language after Luau. If you only need to correct one expectation, jump directly to the matching leaf.

## What you do not need to relearn

Several forms transfer directly enough to reduce the initial syntax burden.

### Locals and blocks

```pop
local score = 10

if score >= 10 then
    print("passed")
else
    print("try again")
end
```

`local`, `if`, `then`, `else`, and `end` have the shape a Luau programmer expects. Scope still follows the surrounding block.

### Loop shapes

```pop
while running do
    update()
end

repeat
    retry()
until finished

for index = 1, 10 do
    print(index)
end
```

`while`, `repeat`, and inclusive numeric `for` ranges are familiar. `break` and `continue` operate on the innermost loop.

### Familiar logical and text operators

```pop
local allowed = active and not blocked
local fullName = first .. " " .. last

if left ~= right then
    print("different")
end
```

Pop uses `and`, `or`, `not`, `==`, `~=`, and `..`. Their operand rules are stricter, but the notation is recognizable.

### One-based array positions

Pop arrays begin at position `1`, which matches ordinary Luau array conventions:

```pop
local names: {String} = { "Ada", "Grace" }
local first = Array.get(names, 1)
```

What changes is that a Pop array is its own fixed-length typed aggregate, not just a table being used with consecutive integer keys.

### Multiple assignment

```pop
local left, right = 10, 20
left, right = right, left
```

All right-hand values are evaluated before stores, so swapping remains natural. Pop requires exact arity and compatible static types.

### Colon method calls

```pop
counter:increment()
```

The call-site shape is familiar. The receiver belongs to a declared class or interface contract rather than being supplied through a metatable convention.

## The first mental-model change: types are a closed contract

In Luau, annotations can gradually describe code while some values still pass through `any` or other dynamic boundaries. Pop has no `any`, `unknown`, or dynamic fallback type.

```pop
local score = 10
score = 20

-- Rejected: score was inferred as Int.
-- score = "twenty"
```

Inference saves syntax; it does not make the value dynamic. Once Pop infers `score: Int`, every later assignment must remain `Int`.

Function boundaries state their parameter and result types:

```pop
function double(value: Int): Int
    return value * 2
end
```

Pop checks callers and every reachable return. There is no mode where a failed type relationship becomes an unchecked runtime operation.

### Function results are not inferred

An omitted result annotation means the function returns no value:

```pop
function announce(message: String)
    print(message)
end
```

To return a value, write its type:

```pop
function lengthLabel(length: Int): String
    return `length={length}`
end
```

Do not port a Luau function and assume Pop will infer its public result from `return` statements.

### Parameters are immutable

Function parameters cannot be reassigned in rc.3. Create a local working value:

```pop
function countDown(start: Int)
    local current = start

    while current > 0 do
        print(current)
        current -= 1
    end
end
```

The local has one static type but remains mutable.

## Conditions are Boolean, not truthy

Luau treats only `false` and `nil` as false in a condition. Pop does not define general truthiness.

This Luau pattern does not transfer:

```lua
if count then
    print("present")
end
```

Write the actual question in Pop:

```pop
if count > 0 then
    print("positive")
end
```

The condition of `if`, `elseif`, `while`, `until`, and a conditional expression must be `Boolean`.

This rule prevents several ambiguous habits:

- `0` does not mean either true or false;
- an empty `String` is not a condition;
- an object reference is not a condition;
- an optional value cannot be used as an automatic presence test.

Prefer functions and comparisons that answer a Boolean question explicitly.

## `nil` becomes part of the type

In Luau, `nil` frequently moves through ordinary code and also removes keys from tables. In Pop, possible absence appears in an optional type:

```pop
function findScore(scores: {[String]: Int}, name: String): Int?
    return scores[name]
end
```

`Int?` means `Int | nil`. It is not interchangeable with `Int`.

Pop rc.3 has intentionally limited optional conveniences:

- full optional flow narrowing is not implemented;
- there is no general optional-unwrapping operator;
- a standalone `nil` literal does not currently widen into every optional context;
- assigning `nil` to a table key is not deletion.

Use checked operations when violating a precondition should trap, and preserve `V?` in APIs where absence is a real outcome.

## Numbers are not one universal `number`

Luau programmers commonly think in terms of the `number` type. Pop exposes exact numeric primitives:

- signed integers: `Int8`, `Int16`, `Int32`, `Int64`;
- unsigned integers: `UInt8`, `UInt16`, `UInt32`, `UInt64`;
- floating point: `Float32`, `Float64`;
- convenient aliases such as `Int` and `Byte`.

```pop
local attempts: UInt8 = 3
local population: Int64 = 8_000_000
local ratio: Float64 = 0.75
```

Mixed numeric widths do not silently become one floating-point value. Use an explicit target-type conversion:

```pop
local small: Int16 = 120
local wide = Int64(small)
local decimal = Float64(wide)
```

Conversions are checked. Integer overflow and invalid conversion follow defined trap behavior instead of inheriting VM coercion rules.

When porting code, decide what the number represents: a count, byte, identifier, measurement, or fractional value. Choose its type from that meaning.

## Strings: keep `..`, replace coercion

String concatenation remains `..`:

```pop
local fullName = first .. " " .. last
```

`+` is numeric only. It never falls back to string concatenation:

```pop
-- Rejected:
-- local message = "score: " + score
```

Use `String(value)` for a supported primitive conversion:

```pop
local message = "score: " .. String(score)
```

Or use backtick interpolation:

```pop
local message = `score: {score}`
```

The interpolation shape should feel familiar to modern Luau users. Pop still checks each embedded expression and does not call an arbitrary metamethod to stringify an object.

## Tables stop being the universal answer

This is the largest data-model change.

In Luau, one table can serve as:

- an array;
- a dictionary;
- a record-shaped value;
- mutable object state;
- a namespace returned from a module;
- an object with behavior supplied by a metatable.

Pop gives those roles separate types. Choose based on the meaning of the data.

| Need | Pop model |
| --- | --- |
| Fixed homogeneous positions | Array |
| Runtime associations by typed key | Table |
| Fixed transparent named fields | Record |
| Nominal identity and mutable state | Class |
| Shared nominal behavior | Interface |
| One value from a closed set of cases | Enum or tagged union |
| Compile-time name organization | Namespace |

Do not begin a Pop design with “which table shape should this be?” Begin with “which of these data contracts describes it?”

## Pop arrays versus Luau array tables

A Pop array has one element type and a fixed length:

```pop
local names: {String} = { "Ada", "Grace", "Linus" }
local count = Array.length(names)
```

The first position is `1`. Ordinary indexing is optional:

```pop
local possible: String? = names[1]
```

Use `Array.get` for a checked, non-optional read when the program has established the index invariant:

```pop
if Array.length(names) > 0 then
    local first: String = Array.get(names, 1)
    print(first)
end
```

Indexed assignment replaces an existing element:

```pop
names[1] = "Augusta"
```

It does not append or grow the array. rc.3 does not yet provide a dynamic `List<T>` API.

### Iteration is currently numeric

There is no generalized `for value in values` and no `ipairs` equivalent in rc.3. Visit fixed array positions with an inclusive numeric range:

```pop
for index = 1, Array.length(names) do
    print(Array.get(names, index))
end
```

## Pop tables versus Luau tables

A Pop table chooses exactly one supported key type and one value type:

```pop
local scores: {[String]: Int} = {
    ada = 10,
    grace = 20,
}
```

Insertion and replacement use brackets:

```pop
scores["linus"] = 15
scores["ada"] = 25
```

Lookup returns the optional value type:

```pop
local score: Int? = scores["ada"]
```

The table cannot gain a differently typed field later. It cannot mix an array region, named fields, methods, and arbitrary metadata.

rc.3 table keys are limited to:

- `Boolean`;
- fixed signed and unsigned integers;
- `String`.

String keys compare their text contents. Floating-point values and managed aggregate objects are not table keys.

### There is no `pairs`, deletion, or table length API yet

General table iteration is not implemented. Neither are key deletion and source-level length/capacity operations.

This Luau idiom is not a Pop deletion operation:

```lua
scores["ada"] = nil
```

In Pop rc.3, table assignment means insert or replace. See [Table lookup and mutation](../../data/table-lookup-and-mutation/) for the complete source and runtime behavior.

## Use records for fixed data shapes

A Luau program may describe a user with a table type and table literal:

```lua
type Player = {
    name: string,
    score: number,
}

local player: Player = {
    name = "Ada",
    score = 10,
}
```

In Pop, a fixed transparent shape is a record:

```pop
private record Player
    name: String
    score: Int
end

local player: Player = {
    name = "Ada",
    score = 10,
}
```

Record fields are value-oriented. Produce a changed value with `with`:

```pop
local promoted = player with {
    score = player.score + 5,
}
```

The original `player` remains unchanged. Record equality compares fields when every field supports equality.

## Use classes for identity and mutable state

Luau commonly constructs objects by attaching methods through a metatable. Pop has nominal class declarations instead:

```pop
public class Counter
    private value: Int = 0

    public function Counter:increment()
        self.value += 1
    end

    public function Counter:current(): Int
        return self.value
    end
end
```

Construct and call the class explicitly:

```pop
local counter = Counter {}
counter:increment()
print(counter:current())
```

Classes have managed reference identity. Assignment shares an object rather than copying its fields.

Pop does not expose Lua metatables, `__index`, metamethods, or prototype chains. Operator behavior cannot be changed by storing special functions under special keys. General class inheritance is also outside the rc.3 supported set; use interfaces for shared nominal behavior.

## Interfaces are nominal, not structural table shapes

Luau often accepts a value because its inferred table shape contains the required fields. Pop interfaces are explicit nominal contracts.

A class declares the interface it implements. Merely having methods with similar names is not enough. This lets the compiler resolve behavior without dynamic field lookup or accidental structural conformance.

When porting a Luau structural type:

- use a record when it is transparent data;
- use an interface when callers depend on declared behavior;
- use a class when identity and encapsulated mutation matter.

## Functions have exact arity and result packs

Calls must supply the declared arguments with matching types. Pop does not silently fill arbitrary missing parameters with `nil` or ignore extra arguments.

Multiple returns are represented as an exact fixed pack:

```pop
function bounds(): (Int, Int)
    return 1, 10
end

local lower, upper = bounds()
```

The receiving assignment must have the right arity. Tuple projection is static and one-based; there is no runtime pack reshaping in rc.3.

Variadic Luau APIs should be redesigned around a fixed signature, array, record, or explicit overload in the current Pop surface.

## Generics are explicit

Pop rc.3 supports generic functions, records, and tagged unions, but calls do not infer type arguments:

```pop
private function identity<T>(value: T): T
    return value
end

local answer = identity<<Int>>(42)
```

The declaration's `<T>` should look familiar. The call uses `<<Int>>` so type arguments remain unambiguous beside comparison operators.

Each reachable concrete use is specialized before backend execution. There is no runtime type table or dynamic generic dispatch.

## Modules become namespaces inside Bubbles

A Luau module commonly executes a file and returns a table:

```lua
local Math = {}

function Math.double(value)
    return value * 2
end

return Math
```

Pop source does not return a namespace table. A file declares a namespace and ordinary typed declarations:

```pop title="src/math.pop"
namespace App.Math

function double(value: Int): Int
    return value * 2
end
```

Another file in the Bubble can use the namespace:

```pop title="src/main.pop"
namespace App

using App.Math

function main()
    print(double(21))
end
```

`using` affects compile-time name resolution. It does not execute the other file, perform a runtime lookup, or receive a returned table.

A `bubble.toml` manifest describes the Bubble. Declarations are `internal` by default, may be `private` to one module, or may be `public` to other Bubbles. Pop has no `export` declaration modifier.

Dependency resolution and a package registry workflow are not implemented in rc.3. A manifest can organize the current project, but it does not reproduce a Luau package loader.

## There is no mutable global environment model

Do not expect names to appear because a host inserted them into a global table. Pop resolves functions, types, constants, namespaces, locals, and parameters statically.

There is also no Pop equivalent of dynamic `require` by computed string, `loadstring`, or runtime mutation of a module's exported table. Program structure must be visible to the compiler.

## Runtime and host expectations change

Standalone Luau and Roblox Luau execute inside hosts that supply a VM and host-specific APIs. Pop rc.3 builds native executables.

Consequently, Pop does not automatically provide:

- Roblox services, Instances, events, tasks, or datatypes;
- a Lua or Luau global library;
- VM reflection and dynamic code loading;
- metatable hooks;
- a host-provided module cache.

Use only the Pop Standard foundation documented for this edition. Reserved names or future library identities are not proof that an API is usable.

## Error handling is not `pcall`

Many mistakes are rejected while checking:

- wrong argument or result types;
- unknown names;
- unsupported operators;
- invalid aggregate fields;
- non-Boolean conditions;
- unsupported table key types.

Valid programs can still encounter checked runtime traps, such as overflow, division by zero, invalid conversion, or a failed checked array access.

rc.3 has no source-level exception, `pcall`, or `xpcall` mechanism for catching those traps. Model recoverable absence with optionals and validate preconditions before choosing checked operations.

## Translation example: from one Luau table to several Pop types

Consider a Luau player object:

```lua
local Player = {}
Player.__index = Player

function Player.new(name)
    return setmetatable({
        name = name,
        score = 0,
        badges = {},
    }, Player)
end

function Player:award(points)
    self.score += points
end
```

A direct syntax translation would miss Pop's stronger modeling tools. First decide what each part means:

- player identity and mutable score belong to a class;
- fixed constructor state belongs to declared fields;
- a fixed collection of badge positions may use an array;
- runtime badge associations may instead use a typed table;
- methods belong to the nominal class, not a metatable.

One rc.3 model is:

```pop
public class Player
    private name: String
    private score: Int = 0
    private badges: {String}

    public function Player:award(points: Int)
        self.score += points
    end

    public function Player:currentScore(): Int
        return self.score
    end
end

local badges: {String} = { "Founder", "Reader" }
local player = Player {
    name = "Ada",
    badges = badges,
}

player:award(10)
print(player:currentScore())
```

The source is slightly more explicit because the compiler now knows the field layout, mutation types, method receiver, and result types without executing constructor conventions.

## A migration checklist

Before translating a Luau component, answer these questions:

1. Which values can actually be absent? Give only those values optional types.
2. Which numbers are counts or indexes, and which are fractional measurements?
3. Is each table acting as an array, dictionary, record, object, module, or sum type?
4. Which table roles should become separate Pop declarations?
5. Which conditions rely on truthiness instead of a Boolean question?
6. Which functions rely on missing arguments, extra arguments, or variadic packs?
7. Which methods rely on metatables, structural lookup, or monkey patching?
8. Which modules rely on runtime execution order or returned tables?
9. Which failures are recoverable absence, and which indicate a broken invariant?
10. Which APIs come from Roblox or another Luau host rather than from the language itself?

Answering these before editing syntax prevents the most common false starts.

## Common false friends

| Familiar form | Do not assume |
| --- | --- |
| `local value = ...` | the inferred type can later change |
| `if value then` | Pop has Luau truthiness |
| `{ ... }` | every aggregate is one universal table |
| `values[index]` | the result is always present |
| `table[key] = nil` | assignment deletes a key |
| `function f(...)` | missing and extra arguments are freely reshaped |
| `object:method()` | methods come from metatable lookup |
| `using Name` | another source file executes like `require` |
| `<T>` on a declaration | calls infer the type argument |
| a reserved Standard name | the runtime API already exists |

## Recommended reading after this guide

Read these chapters next, in order:

1. [Hello, World!](../hello-world/) for the source and command workflow.
2. [Variables](../../language/variables/) and [functions](../../language/functions/) for exact static boundaries.
3. [Boolean, nil, and optionals](../../types/boolean-nil-and-optionals/) for absence without truthiness.
4. [Numeric conversions](../../types/numeric-conversions/) for the fixed numeric model.
5. [Arrays](../../data/arrays/), [tables](../../data/tables/), [records](../../data/records/), and [classes](../../data/classes/) for deliberate data modeling.
6. [Namespaces](../../organization/namespaces/), [`using`](../../organization/using-declarations/), and [visibility](../../organization/visibility/) for compile-time organization.
7. [Support matrix](../../reference/support-matrix/) before searching for familiar Luau library features.

You already know how to read much of Pop's control-flow syntax. The new work is learning to make each type, absence case, aggregate role, and program boundary explicit enough that the compiler and every reader see the same program.
