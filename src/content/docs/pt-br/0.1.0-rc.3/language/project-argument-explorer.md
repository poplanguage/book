---
title: "Projeto: um explorador de argumentos"
description: Combine variáveis, funções, condições, arrays e laços em um único programa.
sidebar:
  order: 8
---

Aprendemos os principais blocos de construção de um pequeno programa Pop. Vamos combiná-los em uma ferramenta de linha de comando que conta seus argumentos e imprime cada um deles.

Crie `explore.pop` com o código da Listagem 2-1:

```pop title="explore.pop"
namespace Explorer

function showArguments(arguments: Array<String>)
    for index = 1, Array.length(arguments) do
        print(Array.get(arguments, index))
    end
end

function main(arguments: Array<String>)
    local count = Array.length(arguments)

    print(`Quantidade de argumentos: {count}`)

    if count > 0 then
        print("Argumentos")
        showArguments(arguments)
    else
        print("Nenhum argumento foi fornecido")
    end
end
```

_Listagem 2-1: Contando e exibindo argumentos da linha de comando_

Execute-o com alguns valores:

```sh
pop run explore.pop -- Pop "two words" 42
```

O resultado é:

```text
Quantidade de argumentos: 3
Argumentos
Pop
two words
42
```

O `42` final ainda é uma string, pois todo argumento da linha de comando chega como texto. `print` escolhe sua sobrecarga de string com base nesse tipo.

## Acompanhando o programa

A execução começa em `main`. Ela obtém o comprimento do array e armazena esse `Int` em `count`. Em seguida, o `if` escolhe entre chamar `showArguments` e imprimir o caso vazio.

`showArguments` usa um `for` numérico inclusivo. Ele começa em `1`, porque as posições dos arrays de Pop usam base um, e termina no comprimento do array. O vínculo de laço `index` é criado para cada iteração e não pode receber atribuição.

O comprimento não muda durante o laço porque os arrays têm comprimento fixo. Isso mantém válida toda posição usada em `Array.get`.

## Experimente

Altere o programa para imprimir `Primeiro argumento` e apenas o primeiro item antes de imprimir a lista completa. Lembre-se de fazer isso somente dentro do ramo `count > 0`, onde sabemos que a posição `1` existe.

Depois, adicione uma variável local chamada `remaining`, inicializada com `count - 1`, e imprima-a. Essas pequenas alterações praticam a leitura de um valor, a execução de aritmética inteira verificada e a manutenção do acesso ao array dentro da condição que o torna seguro.
