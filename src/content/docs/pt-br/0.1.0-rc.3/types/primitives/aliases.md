---
title: Aliases de primitivas
description: Use Int, Float e Byte sem alterar a identidade em tempo de execução.
sidebar:
  order: 15
---

Pop oferece três aliases de primitivas convenientes:

| Alias | Tipo exato | Uso típico |
| --- | --- | --- |
| `Int` | `Int64` | trabalhos comuns com números inteiros |
| `Float` | `Float64` | trabalhos comuns com ponto flutuante |
| `Byte` | `UInt8` | valores do tamanho de um byte em protocolos ou armazenamento |

Um alias não é um wrapper e não acrescenta nenhuma conversão:

```pop
local count: Int = 42
local exactWidth: Int64 = count

local ratio: Float = 0.5
local exactFloat: Float64 = ratio

local octet: Byte = 255
local exactByte: UInt8 = octet
```

Use a grafia com largura explícita quando a largura fizer parte do contrato público. Use o alias quando ele tornar o código comum mais fácil de ler.
