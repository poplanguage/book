---
title: Entrada do programa
description: Defina a função main aceita por um executável nativo.
sidebar:
  order: 5
---

Uma Bubble executável possui exatamente uma função chamada `main`. Ela pode não receber argumentos:

```pop
function main()
    print("Olá")
end
```

Ou pode receber os argumentos da linha de comando em um único parâmetro `Array<String>`:

```pop
function main(arguments: Array<String>)
    print(Array.length(arguments))
end
```

Nenhum outro formato de parâmetros é uma entrada nativa válida na versão 0.1.0-rc.3.

## Status de saída

Uma entrada sem anotação de resultado termina com o código de status zero ao chegar ao fim:

```pop
function main()
    print("concluído")
end
```

Como alternativa, uma entrada pode retornar um `Int`, que se torna o status de saída do processo:

```pop
function main(): Int
    return 1
end
```

Por convenção, shells interpretam zero como sucesso e um valor diferente de zero como falha.

## Argumentos

Ao usar `pop run`, escreva os argumentos do programa depois de `--`:

```sh
pop run app.pop -- first "two words" ""
```

A entrada recebe três strings. O próprio caminho do executável é excluído. A ordem, os argumentos vazios e o UTF-8 não ASCII são preservados. Se o sistema operacional fornecer um argumento que não seja UTF-8 válido, a entrada nativa gera uma falha antes de chamar uma `main` que recebe argumentos, em vez de alterar silenciosamente os bytes.

A declaração de entrada usa visibilidade omitida/privada. Várias funções `main`, outro tipo de resultado, vários parâmetros ou um parâmetro diferente de `Array<String>` são rejeitados antes da emissão do código nativo.
