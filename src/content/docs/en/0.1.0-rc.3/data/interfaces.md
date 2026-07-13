---
title: Interfaces
description: Define nominal behavior that classes can implement.
sidebar:
  order: 7
---

An interface names behavior without choosing the object’s fields or implementation:

```pop
public interface Named
    function name(): String
end
```

A class opts in with `implements` and provides a matching public instance method:

```pop
public class User implements Named
    private value: String

    public function User:name(): String
        return self.value
    end
end
```

The class name before `:` marks the implementation as an instance method. Its explicit parameter and result types must exactly match the interface declaration; the receiver itself is not written in the interface signature. Interface methods are public instance signatures: they do not contain bodies, fields, or independent visibility modifiers.

## Programming to behavior

A function can receive the interface instead of one concrete class:

```pop
function greet(value: Named)
    print("Hello")
    print(value:name())
end
```

Any class that explicitly implements `Named` can be used at that boundary. The compiler verifies the implementation and dispatches the receiver call through the interface’s method slot.

Pop interfaces are nominal, not duck typed. Merely defining a method called `name` is not enough; the class declaration must say `implements Named`. This explicit relationship prevents an accidental method-name match from becoming part of a public contract.

Default interface methods, fields, and structural conformance are not implemented in 0.1.0-rc.3.
