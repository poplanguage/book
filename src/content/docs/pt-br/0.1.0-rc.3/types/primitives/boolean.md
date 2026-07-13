---
title: Boolean
description: Expresse valores verdadeiros ou falsos e condições exatas.
sidebar:
  order: 2
---

`Boolean` tem exatamente dois valores: `true` e `false`.

```pop
local ready: Boolean = true
local finished = false
local shouldRun = ready and not finished
```

`and`, `or` e `not` aceitam somente booleanos. `and` e `or` usam curto-circuito, portanto uma expressão desnecessária à direita não é executada.

Toda condição de `if`, `elseif`, `while` e `until` deve ser `Boolean`:

```pop
if ready then
    print("pronto")
else
    print("aguardando")
end
```

Booleanos aceitam `==` e `~=`. Eles podem ser formatados explicitamente com `String(ready)` ou diretamente dentro de uma string entre crases, como `` `pronto={ready}` ``.
