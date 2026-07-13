---
title: Type grammar
description: Reference the source forms accepted for implemented types.
sidebar:
  order: 4
---

## Named and generic types

Types may be named directly or qualified through a namespace:

```pop
String
Geometry.Point
```

Generic arguments use angle brackets in type syntax:

```pop
Array<String>
Table<String, Int>
```

Generic call arguments use doubled angle brackets so they remain distinct from comparison operators:

```pop
Array.create<<Int>>(4, 0)
identity<<String>>("Pop")
```

Functions, records, and tagged unions may declare type parameters. In rc.3, calls must supply every type argument explicitly; record literals obtain their concrete generic type from an annotation or other expected context.

## Optional and union types

Append `?` when a value may also be `nil`:

```pop
String?
```

The general union spelling joins alternatives with `|`:

```pop
String | Int | nil
```

This type union is distinct from a declared tagged `union`: a tagged union gives alternatives named cases and optional payloads.

## Arrays and tables

Array types have equivalent short and named forms:

```pop
{String}
Array<String>
```

Typed tables likewise have two forms:

```pop
{[String]: Int}
Table<String, Int>
```

## Tuples and functions

A tuple lists positional element types:

```pop
(String, Int, Boolean)
```

A function type lists named parameters and an optional result:

```pop
function(value: Int): String
function(message: String)
```

A parenthesized function result declares an exact fixed result pack:

```pop
function(value: Int): (Int, String)
```

## Type aliases

A namespace alias gives an existing type another source name:

```pop
public type Scores = {[String]: Int}
```

The initial alias form is non-generic. It erases to its target before HIR and adds no new runtime identity.

Parentheses group compound types when necessary. Type spelling does not cause implicit conversions: aliases aside, values must satisfy the exact expected type or an explicitly permitted union/interface relationship.
