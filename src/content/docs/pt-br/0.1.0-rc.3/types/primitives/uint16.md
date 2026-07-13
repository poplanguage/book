---
title: UInt16
description: Use um inteiro sem sinal de 16 bits.
sidebar:
  order: 8
---

`UInt16` armazena valores de `0` a `65_535`.

```pop
local port: UInt16 = 8_080
local nextPort = port + 1
print(`porta={nextPort}`)
```

Use `UInt16` quando um protocolo ou uma representação binária exigir essa largura. Uma regra de negócio de não negatividade, por si só, não é motivo para substituir a validação por um tipo sem sinal.

```pop
local wide: UInt32 = 65_000
local port = UInt16(wide)
```

O estreitamento é explícito e verificado.
