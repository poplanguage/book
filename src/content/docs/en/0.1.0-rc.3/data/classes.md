---
title: Classes and methods
description: Combine object identity, mutable fields, and receiver behavior.
sidebar:
  order: 6
---

Records model transparent values. A class instead creates objects with identity and can keep mutable state behind methods.

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

Inside an instance method, the class name before `:` declares the receiver type, and `self` refers to the receiving object. The private field can be read and assigned by the class’s own methods.

Compound field assignment evaluates the receiver once and preserves the same checked operation as `self.value = self.value + 1`.

## Constructing an object

A class construction names the class and supplies its fields. Fields with compile-time defaults may be omitted:

```pop
local counter = Counter {}
```

Call an instance method with a colon:

```pop
counter:increment()
print(counter:current())
```

The colon makes the receiver explicit: `counter` is the object on which the method operates. Dot syntax is used for fields and for functions associated with a type rather than an object.

## Identity

Class values refer to managed objects. Assigning one to another local does not copy its fields:

```pop
local first = Counter {}
local second = first
second:increment()
print(first:current()) -- 1
```

`first` and `second` refer to the same object. Class equality compares this identity, not a field-by-field snapshot.

## Encapsulation

Fields and methods may be `public`, `internal`, or `private`. Private state lets a class maintain rules that callers cannot bypass. A method can validate an operation before changing a field, while callers work through a stable public interface.

Classes in this release are nominal: their declared identity matters even when another class happens to contain the same fields. General source-level inheritance is not part of the supported 0.1.0-rc.3 feature set. Use interfaces to describe shared behavior.
