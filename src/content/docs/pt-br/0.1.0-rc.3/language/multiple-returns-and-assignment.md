---
title: Múltiplos retornos e atribuição
description: Trabalhe com pacotes de tipos fixos e exatos, em vez do ajuste dinâmico de Lua.
sidebar:
  order: 10
---

Uma anotação de resultado entre parênteses declara um pacote fixo exato:

```pop
private function split(value: Int): (Int, String)
    return value / 2, String(value % 2)
end
```

O tipo de cada elemento e a aridade exata são conhecidos antes da HIR. Não há resultado variádico dinâmico, preenchimento com `nil` para valores ausentes nem descarte de valores excedentes.

## Desestruturando uma chamada

Declare uma variável local para cada resultado:

```pop
local quotient: Int, remainder: String = split(9)
print(`quotient={quotient}, remainder={remainder}`)
```

Cada vínculo pode ter sua própria anotação opcional. Uma incompatibilidade de quantidade ou tipo é um erro em tempo de compilação.

## Trocando valores

A atribuição múltipla avalia todos os valores do lado direito antes de realizar os armazenamentos:

```pop
local left = 10
local right = 20
left, right = right, left
```

Os destinos são localizados da esquerda para a direita, os valores são avaliados da esquerda para a direita e os armazenamentos ocorrem da esquerda para a direita. Receptores e índices com efeitos são avaliados uma vez.

## Projeção estática de tupla

Um pacote fixo pode permanecer como um único valor. Use um índice literal com base um para projetar o tipo exato de seu elemento:

```pop
local result = split(9)
local quotient = result[1]
local remainder = result[2]
```

O índice deve ser um literal inteiro positivo dentro do intervalo. `result[index]`, `result[0]` e uma posição fora do intervalo são erros em tempo de compilação, em vez de buscas dinâmicas em tuplas.
