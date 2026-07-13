---
title: Olá, Mundo!
description: Escreva e execute seu primeiro programa Pop.
sidebar:
  order: 6
---

Agora que Pop está instalado, é hora de escrever seu primeiro programa. Manteremos a saudação tradicional, mas deixaremos a rc.3 mostrar um pouco de personalidade.

Este livro usa comandos de terminal em seus exemplos, mas Pop não exige um editor específico. Use o editor ou a IDE com que você se sentir mais à vontade.

## Criando um diretório de projeto

Primeiro, crie um diretório para os programas que você escreverá durante a leitura deste livro. Depois, crie um diretório para o programa Olá, Mundo:

```sh
mkdir -p ~/pop-projects/hello
cd ~/pop-projects/hello
```

Arquivos-fonte de Pop usam a extensão `.pop`. Crie um arquivo chamado `hello.pop`, abra-o em seu editor e digite o programa da Listagem 1-1.

```pop title="hello.pop"
namespace Hello

function main()
    local release = "0.1.0-rc.3"
    print(`🫧 Olá de Pop {release}!`)
    print("Tipos fortes. Código nativo. Sintaxe pequena.")
end
```

_Listagem 1-1: Um pequeno programa de boas-vindas da rc.3_

Salve o arquivo e volte ao terminal. Confirme que ainda está dentro do diretório `hello` e execute:

```sh
pop run hello.pop
```

Você deve ver:

```text
🫧 Olá de Pop 0.1.0-rc.3!
Tipos fortes. Código nativo. Sintaxe pequena.
```

Se você vir essas linhas, parabéns! Você escreveu e executou seu primeiro programa Pop.

## Anatomia de um programa Pop

Vamos examinar o programa, uma parte de cada vez. A primeira linha é:

```pop
namespace Hello
```

Um namespace dá um nome ao código de um arquivo. Todo arquivo-fonte de Pop começa com uma declaração de namespace. Chamamos este de `Hello`, mas um programa maior poderia usar nomes como `Game`, `Store.Payments` ou `MyApp.Users`.

Em seguida, temos:

```pop
function main()

end
```

Essas linhas definem uma função chamada `main`. Uma função é um grupo nomeado de instruções. `main` é especial porque Pop inicia um programa executável executando essa função.

Os parênteses depois de `main` são o lugar onde uma função recebe valores de quem a chama. Este programa não precisa de nenhum valor, portanto os parênteses estão vazios. A palavra-chave `end` marca o fim da função.

Dentro de `main`, primeiro armazenamos o nome da versão em um valor local:

```pop
local release = "0.1.0-rc.3"
```

Pop infere que `release` tem o tipo `String`. A próxima linha usa interpolação com crases para colocar esse valor dentro de uma string maior:

```pop
print(`🫧 Olá de Pop {release}!`)
```

`print` exibe o texto resultante no terminal. A interpolação é um dos novos recursos de string da rc.3; um capítulo posterior aborda suas regras exatas. O segundo `print` mostra que strings comuns entre aspas duplas continuam sendo a escolha mais simples para textos fixos.

Observe que Pop não usa ponto e vírgula no fim dessas linhas. A indentação torna o programa mais fácil de ler, enquanto `end` informa a Pop onde a função termina.

Não se preocupe em memorizar todos os termos ainda. Retomaremos funções, argumentos, strings e namespaces à medida que construirmos programas maiores.

## Verificando um programa

O comando `run` verifica o código-fonte, gera-o e inicia o programa resultante. Às vezes, você quer apenas verificar se o código-fonte é válido. Para isso, use `pop check`:

```sh
pop check hello.pop
```

Quando o programa é válido, esse comando termina sem imprimir nada. Tente remover o `end` de fechamento e executar o comando novamente. Pop informará onde esperava que a função terminasse. Restaure `end` antes de continuar.

## Gerando um executável

Você também pode compilar o programa sem executá-lo:

```sh
pop build hello.pop --output hello
```

Isso cria um executável chamado `hello`. Execute-o diretamente:

```sh
./hello
```

Ele imprime o mesmo resultado:

```text
🫧 Olá de Pop 0.1.0-rc.3!
Tipos fortes. Código nativo. Sintaxe pequena.
```

Pop é uma linguagem compilada antecipadamente. O comando `build` transforma seu arquivo-fonte em um executável nativo que pode ser executado depois. Nos primeiros capítulos, normalmente usaremos `pop run`, pois ele mantém curto o ciclo de editar e executar.

Em seguida, alteraremos este programa para que ele possa receber informações da linha de comando.
