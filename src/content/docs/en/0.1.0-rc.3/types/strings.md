---
title: Strings
description: Store, compare, and print UTF-8 text.
sidebar:
  order: 5
---

`String` represents valid UTF-8 text. Write a string literal between double quotation marks:

```pop
local language = "Pop"
local greeting = "Olá, mundo!"
local symbol = "🫧"
```

Non-ASCII text is preserved. The compiler and runtime do not replace valid Unicode text with a byte-oriented approximation.

## Escapes

Quoted strings accept portable escapes such as `\\`, `\"`, `\n`, `\r`, `\t`, `\0`, `\x41`, and `\u{1FAE7}`:

```pop
local twoLines = "first\nsecond"
local quoted = "say \"Pop\""
local bubble = "\u{1FAE7}"
```

## Concatenation

The Luau-shaped `..` operator joins two strings:

```pop
local directory = "src"
local path = directory .. "/main.pop"
```

The numeric `+` operator intentionally does not concatenate strings. Convert a primitive explicitly before joining it:

```pop
local count = 3
local message = "count=" .. String(count)
```

`String(value)` formats `String`, `Boolean`, and every integer or floating-point primitive. It is not a universal `toString` operation and rejects arrays, tables, records, classes, and functions.

## Interpolation

Backticks interpolate the same closed primitive set. Expressions inside braces are evaluated from left to right:

```pop
local count = 3
local enabled = true
local summary = `count={count}, enabled={enabled}`
```

Use `\{`, `\}`, and `\`` for literal interpolation punctuation inside backticks. `${value}` is not Pop syntax.

## Equality

`==` compares string contents, and `~=` tests that the contents differ:

```pop
local expected = "Pop"
local actual = "Pop"
local same = expected == actual -- true
```

The comparison is by UTF-8 value, not by the identity of the managed string objects.

## Printing

The Standard foundation provides `print(String)`, which writes the string followed by a newline:

```pop
print("one line")
print("another line")
```

Alongside `print(Int)`, this is the complete general output overload surface in rc.3. Concatenation, interpolation, and primitive formatting are language operations; library APIs for slicing, searching, changing case, parsing numbers, and inspecting Unicode characters are not yet exposed.

String composition may allocate managed storage. Formatting is deterministic and locale-independent: booleans use `true`/`false`, integers use base ten, and floating-point values use portable spellings including `nan`, `inf`, and `-inf`.

The [String composition and formatting](./string-composition-and-formatting/) leaf collects the practical choice between `..`, backticks, and `String(value)`.
