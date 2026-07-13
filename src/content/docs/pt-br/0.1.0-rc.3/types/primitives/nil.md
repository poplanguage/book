---
title: nil
description: Represente a ausência de um valor sem veracidade ou tipagem dinâmica.
sidebar:
  order: 1
---

`nil` é tanto a grafia do literal quanto o tipo embutido exato para “nenhum valor”. Ele é escrito em minúsculas porque é uma palavra-chave, não um alias de tipo nomeado.

```pop
local missing = nil
local isMissing = missing == nil
```

Um `T` comum não pode conter `nil`. O opcional `T?` significa `T | nil`; operações que podem não encontrar nada retornam esse tipo:

```pop
local names: {String} = { "Ada" }
local first: String? = names[1]
local absent: String? = names[2]
```

Pop não tem veracidade ao estilo do Lua. Uma condição deve ser `Boolean`, portanto `if absent then` é um erro de tipo. Compare com `nil` ou use as operações de opcionais tipadas disponíveis para o valor.

`nil == nil` é verdadeiro e `nil ~= nil` é falso. Ele nunca é o preenchimento de um retorno múltiplo ausente: os pacotes fixos da rc.3 exigem aridade exata.
