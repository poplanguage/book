---
title: Attributes
description: Attach typed metadata to declarations.
sidebar:
  order: 3
---

An attribute is a declared, typed piece of metadata. The trusted `@AttributeUsage` metadata says where it may be attached, then the attribute declaration defines its parameters:

```pop
@AttributeUsage(
    targets = { AttributeTarget.Function },
    repeatable = false,
)
public attribute Label(value: String)
```

Apply it by placing `@` and the attribute name before a declaration:

```pop
@Label("entry")
public function start()
end
```

Attribute arguments are checked against the declaration. They may be positional or named, and parameters may provide compile-time defaults:

```pop
@AttributeUsage(
    targets = { AttributeTarget.Function },
    repeatable = false,
)
public attribute Retry(count: Int = 3)

@Retry(count = 5)
public function connect()
end
```

Because attribute values are available during compilation, their arguments must be compile-time expressions.

Without an explicit `@AttributeUsage`, a user attribute defaults to a non-repeatable namespace target. Declare its usage whenever it belongs on a record, field, function, class, interface, or another supported declaration kind.

## Restricting usage

The trusted `@AttributeUsage` attribute can restrict which kinds of declaration accept an attribute and whether it may be repeated:

```pop
@AttributeUsage(
    targets = { AttributeTarget.Function },
    repeatable = false,
)
public attribute Entry()
```

Applying `@Entry` to a record or applying it twice to one function is then diagnosed. Attribute targets are represented by the compiler-provided `AttributeTarget` cases.

## Validation and reflection

`@AttributeValidator` associates a compile-time validation function with an attribute. This supports rules that go beyond parameter types, such as requiring a positive numeric argument.

Compile-time code can ask whether a declaration has a particular attribute with `hasAttribute<<Label>>(Declaration)` and obtain it with `attribute<<Label>>(Declaration)`. The `<<...>>` syntax supplies a compile-time generic type argument.

Attributes do not automatically change runtime behavior. They provide metadata; a compiler feature or compile-time validator must give that metadata meaning. In this release, user-defined code generation macros are not implemented.
