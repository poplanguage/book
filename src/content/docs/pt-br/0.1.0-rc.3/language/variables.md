---
title: Variáveis e vínculos locais
description: Armazene valores, infira seus tipos e atualize-os.
sidebar:
  order: 1
---

Programas se tornam úteis quando conseguem lembrar valores. Em Pop, `local` introduz um nome dentro de uma função:

```pop
namespace Scores

function main()
    local score = 10
    print(score)
end
```

O nome é `score`, e seu valor é `10`. Pop vê o inicializador e infere que `score` tem o tipo `Int`. Um inicializador é obrigatório, portanto uma declaração como `local score` não é válida.

## Escrevendo o tipo explicitamente

Você pode colocar um tipo depois do nome:

```pop
local score: Int = 10
local player: String = "Ada"
local active: Boolean = true
```

Uma anotação é útil quando você quer um tipo diferente daquele que a expressão ao redor escolheria ou quando declarar o tipo torna o código mais claro. Pop ainda verifica se o inicializador corresponde a ele.

```pop
local score: String = 10
```

Essa declaração é rejeitada porque um valor `Int` não pode inicializar uma variável `String`.

## Atualizando uma variável local

Variáveis locais podem receber um novo valor:

```pop
namespace Counter

function main()
    local count = 1
    count += 1
    print(count)
end
```

O programa imprime `2`. A atribuição altera o valor armazenado, mas nunca muda o tipo da variável:

```pop
local count = 1
count = "dois" -- erro: count é um Int
```

Pop decide o tipo de uma variável local uma única vez, em sua declaração, e verifica cada atribuição posterior em relação a esse tipo.

Múltiplas variáveis locais e atribuições também exigem aridade e tipos exatos:

```pop
local left, right = 10, 20
left, right = right, left
```

Todos os valores do lado direito são avaliados antes dos armazenamentos; portanto, isso troca as duas variáveis locais.

## Escopo

Uma variável local existe desde sua declaração até o fim do bloco que a contém. Blocos são criados por funções e construções de fluxo de controle como `if` e `while`.

```pop
if ready then
    local message = "Iniciando"
    print(message)
end

-- message não está disponível aqui
```

Manter nomes no menor escopo útil impede que uma parte do programa dependa acidentalmente de trabalho temporário realizado em outro lugar.

Parâmetros de função têm tipos declarados e valores fornecidos por quem chama, mas são vínculos imutáveis na rc.3. Crie uma variável local quando uma função precisar de um valor de trabalho mutável.
