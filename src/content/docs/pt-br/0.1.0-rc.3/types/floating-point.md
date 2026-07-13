---
title: Tipos de ponto flutuante
description: Trabalhe com Float32 e Float64 na versão atual.
sidebar:
  order: 3
---

`Float32` e `Float64` armazenam valores de ponto flutuante IEEE 754. `Float` é um alias de `Float64`.

Valores de ponto flutuante são úteis para medições e cálculos nos quais se esperam resultados fracionários e arredondamento. Eles não devem ser usados quando um valor decimal exato — como dinheiro — precisar permanecer exato.

## Literais

Um ponto decimal ou expoente de base dez produz um literal de ponto flutuante. Sem um tipo esperado, ele é `Float64`; uma anotação pode selecionar `Float32`:

```pop
local width: Float32 = 12.5
local distance = 1_000.25
local large = 6.02e23
local small = 2e-3
```

## Comportamento aritmético

Valores de ponto flutuante aceitam `+`, `-`, `*` e `/` quando ambos os operandos têm exatamente o mesmo tipo. Os resultados são arredondados para a precisão desse tipo.

Ao contrário da divisão inteira, a divisão de ponto flutuante por zero segue o comportamento IEEE 754 e pode produzir infinito, em vez de uma falha de divisão por zero do Pop.

A ordenação aceita `<`, `<=`, `>` e `>=` para tipos de ponto flutuante correspondentes. Toda comparação de ordenação com NaN é falsa. Os operadores padrão `==` e `~=` não estão disponíveis para pontos flutuantes nesta versão.

Não há conversão implícita entre `Float32`, `Float64` e tipos inteiros. Use a sintaxe explícita do tipo de destino:

```pop
local count: Int = 7
local measurement = Float64(count)
local whole = Int32(measurement) -- trunca em direção a zero; falha se estiver fora do intervalo
```

Continue com [Literais decimais de ponto flutuante](./decimal-floating-point-literals/) e [Conversões numéricas](./numeric-conversions/) para consultar as regras detalhadas.
