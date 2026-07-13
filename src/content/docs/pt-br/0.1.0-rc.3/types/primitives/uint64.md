---
title: UInt64
description: Use um inteiro sem sinal de 64 bits e preserve seu intervalo explicitamente.
sidebar:
  order: 10
---

`UInt64` armazena valores de `0` a `18_446_744_073_709_551_615`.

```pop
local sequence: UInt64 = 4_000_000_000
local next = sequence + 1
print(`sequência={next}`)
```

Nenhum tipo inteiro com sinal contém todo o intervalo de `UInt64`. Portanto, `Int64(sequence)` realiza uma conversão verificada e pode causar uma falha. `Float64(sequence)` sempre pode ser representado como um ponto flutuante finito, mas pode ser arredondado porque `Float64` não consegue representar exatamente todos os inteiros de 64 bits.
