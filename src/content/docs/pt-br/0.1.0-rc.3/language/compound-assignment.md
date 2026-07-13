---
title: Atribuição composta
description: Atualize uma vez um destino mutável com uma operação tipada.
sidebar:
  order: 9
---

A atribuição composta combina uma leitura, uma operação e uma escrita:

```pop
local total = 10
total += 5
total *= 2
```

A rc.3 aceita exatamente estas formas:

| Forma | Operação subjacente |
| --- | --- |
| `+=` | `+` numérico |
| `-=` | `-` numérico |
| `*=` | `*` numérico |
| `/=` | `/` numérico |
| `%=` | `%` inteiro |
| `..=` | `..` de strings |

```pop
local message = "Hello"
message ..= ", Pop"
```

O destino e o lado direito devem ter exatamente o mesmo tipo numérico ou, no caso de `..=`, ambos devem ser `String`. A operação preserva as regras comuns de estouro, divisão, resto, alocação e trap.

## Destinos

Variáveis locais e capturas mutáveis, campos mutáveis declarados de classes e elementos de arrays são aceitos:

```pop
counter.value += 1
values[index] *= scale
```

Parâmetros, vínculos de `for` numérico, campos de registros e outros locais imutáveis continuam inválidos. Na rc.3, entradas de tabelas aceitam atribuição comum, mas não atribuição composta.

Para um destino indexado, Pop avalia o array e o índice uma vez, carrega o elemento atual, avalia o lado direito, realiza a operação e só armazena o resultado depois que essas etapas são concluídas. Um índice inválido causa um trap antes da execução do lado direito.
