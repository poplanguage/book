---
title: Visibility
description: Control where declarations and members may be used.
sidebar:
  order: 3
---

Visibility determines which code may name a declaration or member. Pop provides three implemented levels:

| Visibility | Accessible from |
| --- | --- |
| `public` | other Bubbles |
| `internal` | the same Bubble |
| `private` | the declaring module |

For ordinary declarations, omitting a visibility modifier gives internal visibility:

```pop
function helper()
    -- available inside this Bubble
end

public function start()
    -- may form part of the Bubble's public surface
end
```

Use `public` intentionally for behavior or types that another Bubble should depend on. Keep implementation helpers internal or private so they can change without affecting callers.

Fields and methods on classes use the same visibility words:

```pop
public class Account
    private balance: Int = 0

    public function currentBalance(): Int
        return self.balance
    end
end
```

Here callers can ask for the balance but cannot assign the field directly.

The `main` entry point is a special case: for a directly built executable, its omitted visibility is accepted as the private program entry. Writing a public or internal `main` is not a way to expose an alternate entry.

`export` is recognized as a reserved word in this release but is rejected as a declaration modifier. Use `public` for source-level visibility.
