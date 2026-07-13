---
title: Correspondência de padrões
description: Trate todos os casos de uma união etiquetada.
sidebar:
  order: 5
---

Um `match` examina uma união etiquetada e executa o ramo correspondente a seu caso atual:

```pop
function describe(result: SearchResult)
    match result
    when SearchResult.Found(name) then
        print(`Encontrado: {name}`)
    when SearchResult.Missing then
        print("Nada foi encontrado")
    end
end
```

No ramo `Found`, `name` é vinculado ao payload `String` do caso. Um caso sem payload não precisa de vínculo.

## Exaustividade

Pop exige um ramo para cada caso da união. Se `SearchResult` tiver `Found` e `Missing`, omitir qualquer um dos ramos será um erro de tempo de compilação. Essa verificação significa que adicionar um novo caso de união indica cada `match` que precisa decidir o que o novo caso significa.

Cada caso deve aparecer exatamente uma vez. Não há ramo curinga na 0.1.0-rc.3, portanto um `match` documenta diretamente o conjunto completo.

## Ignorando um payload

Use `_` quando um caso for importante, mas seu payload não:

```pop
match result
when SearchResult.Found(_) then
    print("Há um resultado")
when SearchResult.Missing then
    print("Não há resultado")
end
```

O sublinhado não cria uma variável local.

Nesta versão, a correspondência é uma instrução, não uma expressão: os ramos realizam trabalho ou retornam da função que os contém, mas o `match` completo não produz um valor por si só. Os padrões selecionam casos de união; guardas, desestruturação aninhada e padrões literais gerais não estão implementados.
