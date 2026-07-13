---
title: Keywords
description: Reserved words recognized by the 0.1.0-rc.3 lexer.
sidebar:
  order: 2
---

The following words are reserved and cannot be used as ordinary identifiers:

```text
namespace  using      public      internal    private
export     function   local       return      end
const      record     union       class       interface
enum       attribute  type        open        implements
if         then       elseif      else        while
repeat     until      for         do          break
continue   match      when        with        nil
true       false      and         or          not
```

Reservation does not mean every word introduces every planned form. In rc.3, `for` implements numeric ranges but not generalized `for value in iterable`; `enum` implements nominal payload-free cases; and `type` implements non-generic erased aliases. `open` inheritance is not part of the supported executable surface. `export` is rejected because declarations use `public`, `internal`, or `private` directly.

Built-in type names such as `Int`, `String`, and `Boolean` are language-provided names rather than keywords in the same lexical category.
