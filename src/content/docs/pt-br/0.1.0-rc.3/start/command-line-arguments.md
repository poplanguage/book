---
title: Lendo argumentos da linha de comando
description: Permita que um programa Pop receba texto da linha de comando.
sidebar:
  order: 7
---

O programa Olá, Mundo sempre imprime a mesma mensagem. Podemos torná-lo um pouco mais útil permitindo que a pessoa que o executa escolha um nome.

Substitua o conteúdo de `hello.pop` pela Listagem 1-2:

```pop title="hello.pop"
namespace Hello

function main(arguments: Array<String>)
    if Array.length(arguments) > 0 then
        local name = Array.get(arguments, 1)
        print(`Olá, {name}!`)
    else
        print("Olá, pessoa desconhecida")
    end
end
```

_Listagem 1-2: Cumprimentando o nome fornecido na linha de comando_

Execute o programa e coloque um argumento depois de `--`:

```sh
pop run hello.pop -- Ada
```

O programa imprime:

```text
Olá, Ada!
```

O `--` separa as opções destinadas ao comando `pop` dos argumentos destinados ao seu programa. Tente executar o programa sem um argumento:

```sh
pop run hello.pop
```

Desta vez, ele imprime `Olá, pessoa desconhecida`.

## Recebendo argumentos

Nosso primeiro `main` usava parênteses vazios. A nova declaração pede a Pop que forneça à função um array de strings:

```pop
function main(arguments: Array<String>)
```

`arguments` é o nome que escolhemos para o valor. `Array<String>` significa uma coleção ordenada cujos elementos são strings. Pop não inclui o nome do próprio arquivo do programa nesse array; portanto, o primeiro item é o primeiro valor escrito depois de `--`.

Antes de ler um item, o programa verifica se o array contém algo:

```pop
if Array.length(arguments) > 0 then
```

`Array.length(arguments)` fornece a quantidade de itens. A expressão `if` executa o bloco seguinte somente quando esse número é maior que zero. Caso contrário, o bloco `else` é executado.

Dentro do primeiro ramo, esta linha obtém o primeiro item:

```pop
local name = Array.get(arguments, 1)
```

`local` cria um nome que pode ser usado no bloco atual. Os arrays de Pop são numerados a partir de `1`, portanto o índice `1` é o primeiro item. `Array.get` espera uma posição válida; nossa verificação de comprimento garante isso.

Por fim, uma string entre crases combina a saudação e o nome fornecido:

```pop
print(`Olá, {name}!`)
```

A interpolação com crases aceita strings estaticamente tipadas, booleanos, inteiros e valores de ponto flutuante. Argumentos da linha de comando são sempre strings, mesmo quando o texto parece um número. Aprenderemos em detalhes como arrays, condições e tipos funcionam nos capítulos seguintes.
