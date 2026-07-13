---
title: Tipos de tupla e função
description: Agrupe valores posicionais e descreva valores chamáveis.
sidebar:
  order: 6
---

Uma tupla agrupa uma quantidade fixa de valores por posição. Cada posição pode ter um tipo diferente:

```pop
local entry: (String, Int) = ("Ada", 42)
```

O tipo `(String, Int)` indica que o primeiro item é uma `String` e o segundo é um `Int`. O tamanho da tupla e o tipo em cada posição fazem parte do tipo dela, portanto `(String, Int)` é diferente de `(Int, String)` e de `(String, Int, Boolean)`.

Tuplas são úteis para agrupamentos pequenos e temporários nos quais o significado posicional é óbvio. Prefira um registro quando os campos merecerem nomes ou quando o valor fizer parte de um modelo público.

A igualdade de tuplas está disponível quando existe igualdade para todos os elementos. Os valores são comparados posição por posição.

Elementos de tupla e de pacotes fixos usam projeção estática com índices começando em um:

```pop
local entry: (String, Int) = ("Ada", 42)
local name = entry[1]
local score = entry[2]
```

O índice deve ser um literal inteiro dentro do intervalo válido, para que o tipo de cada projeção seja conhecido em tempo de compilação. Um índice calculado é rejeitado.

A sintaxe de resultado de função, como `(Int, String)`, usa a mesma representação semelhante a uma tupla para um pacote fixo exato. Consulte [Múltiplos retornos e atribuição](../language/multiple-returns-and-assignment/).

## Tipos de função

Funções podem ser armazenadas e passadas como valores. Um tipo de função descreve seus parâmetros e resultados:

```pop
function(value: Int): Int
```

A variável local a seguir contém uma função anônima correspondente a esse tipo:

```pop
local increment: function(value: Int): Int = function(value: Int): Int
    return value + 1
end

local result = increment(41)
```

Os nomes dos parâmetros são escritos nos tipos de função, seguidos pelos respectivos tipos. Uma função sem resultado omite a anotação de resultado:

```pop
function(message: String)
```

Os tipos de função devem corresponder exatamente quando um valor chamável é atribuído a outro. Valores de função não aceitam `==` ou `~=` porque a identidade da closure não é exposta como igualdade comum de valores.
