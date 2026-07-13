---
title: Never
description: Understand the type that has no possible value.
sidebar:
  order: 14
---

`Never` is uninhabited: no runtime value can have it. The compiler uses it for an expression or control-flow path that cannot continue normally.

There is no `Never` literal. Trying to initialize it with an ordinary value is a type error:

```pop
local impossible: Never = 1 -- type error: Int is not Never
```

Most programs never write `Never` directly. Its important type-system role is that a non-returning path can fit where another branch expects a value without introducing `nil`, a dynamic value, or an implicit union.
