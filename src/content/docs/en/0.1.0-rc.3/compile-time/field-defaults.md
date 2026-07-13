---
title: Field defaults
description: Supply compile-time defaults for record and class fields.
sidebar:
  order: 4
---

Record and class fields may provide a default initializer:

```pop
public record Settings
    retries: Int = 3
    verbose: Boolean = false
    label: String = `retries={3}`
end
```

When an aggregate is created in a context expecting `Settings`, omitted fields use their defaults:

```pop
function defaults(): Settings
    return {}
end
```

A caller may override either field:

```pop
function verboseSettings(): Settings
    return { verbose = true }
end
```

Defaults are evaluated at compile time. This guarantees that constructing a value does not hide an arbitrary runtime call and that the default is available consistently wherever the type is used.

The initializer can use literals, primitive formatting/string composition, conditional expressions, constants, and valid compile-time functions. It cannot read runtime state:

```pop
function currentRetries(): Int
    return 5
end

public record Invalid
    retries: Int = currentRetries() -- rejected: runtime-only call
end
```

Defaults do not make a field optional in the type-system sense. After construction, `settings.retries` is still an `Int`, not an `Int?`. A default only lets construction omit that field.

Use defaults for unsurprising values that are valid for every construction. Keep a field required when forcing the caller to choose makes mistakes less likely.
