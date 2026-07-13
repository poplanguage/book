---
title: Int16
description: Use um inteiro com sinal de 16 bits com conversão explícita.
sidebar:
  order: 4
---

`Int16` armazena números inteiros de `-32_768` a `32_767`.

```pop
local altitude: Int16 = 1_250
local adjusted = altitude - 50
print(`altitude ajustada={adjusted}`)
```

`+`, `-`, `*`, `/` e `%` usam aritmética `Int16` verificada. A divisão por zero, o resto por zero e um resultado irrepresentável causam uma falha.

```pop
local source: Int32 = 30_000
local altitude = Int16(source)
```

A chamada ao tipo de destino torna o estreitamento explícito e verifica o intervalo em tempo de execução.
