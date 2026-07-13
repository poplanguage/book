---
title: Uniões etiquetadas
description: Represente um valor que pode ser um entre vários casos nomeados.
sidebar:
  order: 4
---

Uma união etiquetada define um conjunto fechado de alternativas. Cada alternativa tem um nome e pode carregar um valor:

```pop
public union SearchResult
    Found(value: String)
    Missing
end
```

Um `SearchResult` é `Found`, com um payload `String` chamado `value`, ou `Missing`, sem payload. Os casos são construídos por meio do nome da união:

```pop
local success: SearchResult = SearchResult.Found("Ada")
local failure: SearchResult = SearchResult.Missing
```

A etiqueta registra qual caso está presente. Pop verifica o payload durante a construção, portanto `SearchResult.Found(42)` é rejeitado.

## Por que usar uma união?

Uma união explicita as alternativas no sistema de tipos. Compare uma função de busca que retorna apenas `String` com outra que retorna `SearchResult`. A segunda assinatura informa a quem a chama que a ausência é um resultado normal que deve ser tratado.

Uniões também modelam estados sem depender de números mágicos ou flags booleanas com pouca relação entre si:

```pop
public union Connection
    Disconnected
    Connecting
    Connected(String)
end
```

Somente os estados listados podem existir, e apenas `Connected` carrega o nome do par.

A igualdade de uniões é estrutural quando a igualdade existe para cada tipo de payload. Valores com etiquetas de casos diferentes são desiguais. Valores com a mesma etiqueta comparam seus payloads.

Use `match` para descobrir o caso ativo e acessar seu payload com segurança.

## Uniões genéricas

Uniões etiquetadas podem declarar parâmetros de tipo. A construção de um caso fornece argumentos de chamada explícitos:

```pop
public union Choice<T>
    Value(value: T)
    Empty
end

local choice: Choice<String> = Choice.Value<<String>>("pronto")
```

Os vínculos de payload em `match` recebem o tipo substituído. O compilador especializa as representações concretas alcançáveis da união; nenhum tipo de payload dinâmico nem argumento de tipo de tempo de execução chega a um backend.
