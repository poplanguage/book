---
title: Arrays
description: Armazene uma sequência de tamanho fixo de valores de um único tipo.
sidebar:
  order: 1
---

Um array armazena uma sequência ordenada cujos elementos têm todos o mesmo tipo. No código-fonte Pop, `{T}` e `Array<T>` são duas grafias para o mesmo tipo de array:

```pop
local names: {String} = { "Ada", "Grace", "Linus" }
local scores: Array<Int> = { 10, 20, 30 }
```

Um literal de array precisa de um tipo esperado. A anotação informa a Pop qual tipo de elemento usar e também dá contexto suficiente a um literal vazio:

```pop
local empty: {String} = {}
```

Escrever apenas `local values = {1, 2, 3}` é rejeitado na 0.1.0-rc.3 porque um literal de array não tipado não seleciona seu próprio tipo de array.

## Tamanho e indexação

Os arrays de Pop usam posições iniciadas em um: o primeiro elemento fica no índice `1`.

```pop
local names: {String} = { "Ada", "Grace" }
local count = Array.length(names) -- 2
local first = names[1]            -- String?
```

A indexação comum retorna um valor opcional. Um índice menor que `1` ou maior que o tamanho produz `nil` em vez de ler memória inválida.

Quando o programa já estabeleceu que uma posição é válida, `Array.get` retorna o elemento diretamente e causa uma falha em caso de índice inválido:

```pop
if Array.length(names) > 0 then
    local first = Array.get(names, 1)
    print(first)
end
```

Escolha a indexação comum quando a ausência fizer parte da operação e `Array.get` verificado quando uma posição inválida significar que o programa violou sua própria invariante.

## Criando e modificando arrays

`Array.create` constrói um array com um tamanho escolhido e repete um valor inicial:

```pop
local scores = Array.create<<Int>>(3, 0)
```

O `<<Int>>` fornece o tipo genérico do elemento. Um tamanho negativo causa uma falha.

É possível atribuir valores aos elementos do array no próprio local:

```pop
scores[1] = 10
scores[2] = 20
scores[1] += 5
```

A atribuição indexada é verificada e causa uma falha se o índice estiver fora do array. Arrays têm tamanho fixo: a atribuição substitui um elemento, mas não adiciona nem remove nenhum.

`Array.fill(scores, 0)` substitui cada elemento pelo mesmo valor. Uma atribuição indexada composta realiza uma leitura verificada e não opcional, aplica a operação tipada e grava o resultado; o array e o índice são avaliados uma única vez.

Use um intervalo numérico inclusivo para visitar todas as posições:

```pop
for index = 1, Array.length(scores) do
    print(Array.get(scores, index))
end
```

A biblioteca Standard voltada para Pop ainda não fornece operações de lista dinâmica nem iteração generalizada com `for value in values`. Os arrays continuam tendo tamanho fixo; o crescimento futuro pertence a `List<T>`, não a um redimensionamento oculto de arrays.

Os arrays são gerenciados pelo ambiente de execução nativo. Atribuir um array a outra variável local compartilha o mesmo array; isso não copia todos os elementos. A igualdade de arrays não é definida nesta versão.
