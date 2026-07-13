---
title: Literais decimais de ponto flutuante
description: Escreva valores fracionários e exponenciais com tipos previsíveis.
sidebar:
  order: 4
---

Um literal numérico que contém um ponto decimal ou um expoente de base dez é de ponto flutuante:

```pop
local half = 0.5
local avogadro = 6.02e23
local small = 2e-3
local grouped = 1_000.25
```

Sem um tipo esperado, cada valor acima é `Float64`. Uma anotação esperada seleciona o formato antes de o literal ser arredondado:

```pop
local compact: Float32 = 1.25
local precise: Float64 = 1.25
```

Um literal decimal de ponto flutuante nunca se torna implicitamente um inteiro:

```pop
local invalid: Int = 1.0 -- erro de tipo
```

Os separadores de dígitos devem ficar entre dígitos. Grafias como `1_000.25_5e1_0` são aceitas, enquanto `_1.0`, `1_.0`, `1._0`, `1e_2` e `1__0` são rejeitadas.

## Ordenação

Os quatro operadores de ordenação exigem dois valores do mesmo tipo numérico:

```pop
local inside = value >= 0.0 and value <= 1.0
```

As comparações IEEE são ordenadas: `<`, `<=`, `>` e `>=` são todos falsos quando qualquer um dos operandos é NaN. A divisão de ponto flutuante por zero segue o comportamento IEEE, em vez da falha de divisão inteira.

A sintaxe hexadecimal de ponto flutuante e a pontuação decimal da localidade do ambiente não fazem parte da rc.3.
