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

## Current operations

The `+` operator does not concatenate strings in 0.1.0-rc.2. The Pop-facing Standard library also does not yet expose formatting, interpolation, or general conversion of numbers and booleans to text. Keep strings as complete values, or print separate values on separate lines.

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

Alongside `print(Int)`, this is the only general output operation exposed to Pop source in 0.1.0-rc.2. APIs for concatenation, slicing, searching, changing case, parsing numbers, and inspecting Unicode characters are not yet part of the Pop-facing Standard library.

This distinction matters when porting examples from another language: `String` is a real implemented primitive with equality and managed UTF-8 storage, but it is not yet accompanied by a large text utility library.
