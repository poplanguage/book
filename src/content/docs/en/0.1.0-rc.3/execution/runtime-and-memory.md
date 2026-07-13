---
title: Runtime and managed memory
description: Understand the native services behind strings, arrays, objects, and closures.
sidebar:
  order: 2
---

Primitive numeric and Boolean values can live directly in native storage. Strings, arrays, class objects, closures, tuples containing managed values, and tables need runtime support so their memory remains valid for as long as the program can reach them.

Pop’s native runtime uses stable handles and precise root information. Generated code tells the runtime which live locations contain managed references at safe points. The bootstrap garbage collector traces those references and reclaims unreachable managed allocations.

For ordinary Pop code, this means you do not manually free a string or class object:

```pop
function makeCounter(): Counter
    local counter = Counter {}
    return counter
end
```

The object remains alive after `makeCounter` returns because the returned reference still reaches it. When no reachable value refers to it, the collector may reclaim it.

## Shared identity

Managed class objects and arrays are reference-like. Assignment shares the same underlying object or array rather than making a deep copy. Records, by contrast, have value-like updates through `with`, although record fields may themselves contain shared managed references.

Closures retain captured state. If several closures capture the same mutable local, the compiler places that state in shared managed storage so every call observes its latest value.

## Current collector boundary

The production native foundation in this release uses the bootstrap collector. The codebase also contains relocation/conformance machinery used to test runtime contracts, but that is not a separate production collector selected by Pop source. There is no user-facing garbage-collector configuration API in 0.1.0-rc.3.

The runtime ABI is versioned. Native objects and libraries built for incompatible runtime contracts should not be mixed manually.
