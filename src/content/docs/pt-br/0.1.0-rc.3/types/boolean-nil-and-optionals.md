---
title: Valores booleanos, nil e opcionais
description: Represente decisões e valores que podem estar ausentes.
sidebar:
  order: 4
---

O tipo `Boolean` tem dois valores:

```pop
local visible = true
local archived = false
```

As condições em `if`, `elseif`, `while`, `until` e expressões condicionais exigem um valor booleano. Pop não converte outros valores em condições:

```pop
local count = 1

if count then -- erro: count é Int, não Boolean
    print("um")
end
```

Em vez disso, escreva o teste propriamente dito, como `if count > 0 then`. Consulte as páginas específicas de [`Boolean`](./primitives/boolean/) e [`nil`](./primitives/nil/) para ver exemplos direcionados.

## Ausência com `nil`

`nil` significa que nenhum valor está presente. Um literal `nil` tem exatamente o tipo embutido `nil`:

```pop
local missing = nil
```

`String?` descreve “uma `String` ou `nil`”. É uma abreviação do tipo união `String | nil`.

Valores opcionais evitam o uso acidental de um valor ausente. Uma função que precisa de uma `String` não pode ser chamada com uma `String?` até que o programa tenha eliminado, por estreitamento, a possibilidade de `nil`.

A indexação de arrays demonstra essa regra:

```pop
local names: {String} = { "Ada", "Grace" }
local possibleName = names[1]
```

A indexação comum tem o resultado opcional `String?`, pois a posição solicitada pode estar fora do array. Uma função pode preservar esse tipo de resultado:

```pop
function first(values: {String}): String?
    return values[1]
end
```

Por outro lado, `Array.get(names, 1)` retorna `String` e causa uma falha se a posição for inválida.

O verificador da 0.1.0-rc.3 não amplia implicitamente um literal `nil` isolado para uma variável local opcional anotada, portanto `local nickname: String? = nil` é rejeitado no momento. Valores opcionais são mais úteis quando uma operação, como a indexação de array, já produz o tipo opcional completo. Também não há uma sintaxe conveniente e específica para desembrulhar valores; APIs que precisam de um valor garantido normalmente usam uma operação verificada depois de provar sua pré-condição.
