---
title: Tabelas tipadas
description: Entenda os valores de tabela disponíveis na versão atual.
sidebar:
  order: 2
---

Uma tabela associa chaves a valores. Escreva seu tipo como `{[K]: V}` ou `Table<K, V>`, em que `K` é o tipo da chave e `V` é o tipo do valor:

```pop
local scores: {[String]: Int} = {
    ada = 10,
    grace = 20,
}
```

Na forma literal implementada, um nome de campo como `ada` se torna uma chave de string quando o tipo esperado da tabela usa chaves `String`. Assim como ocorre com arrays e agregados de registros, o literal precisa de um tipo esperado.

## Consultando valores

A indexação exige o tipo exato da chave e retorna um valor opcional porque a chave pode não existir:

```pop
local adaScore: Int? = scores["ada"]
local missing: Int? = scores["linus"]
```

Uma chave presente produz seu `Int`; uma chave ausente produz `nil`. Pop não fabrica um valor padrão.

## Inserindo e substituindo

A atribuição indexada insere uma chave ausente ou substitui um valor existente:

```pop
scores["grace"] = 21
scores["linus"] = 15
```

As expressões da tabela, da chave e do valor são executadas uma única vez cada, nessa ordem. Novas entradas preservam uma ordem de inserção determinística, enquanto substituir um valor não move sua chave. A tabela pode crescer sem mudar sua identidade nem os tipos invariantes de suas chaves e seus valores.

A atribuição a tabelas nunca trata `nil` como exclusão. Quando `V` é opcional, é possível armazenar um valor que já tenha o tipo opcional completo. O verificador da rc.3 não amplia um literal `nil` isolado para `V?`, portanto a atribuição direta `table[key] = nil` é rejeitada atualmente. A rc.3 não tem API de exclusão, inspeção de chaves nem iteração generalizada. A igualdade de tabelas não é definida.

Para dados com um conjunto conhecido de campos nomeados, use um registro. Para uma coleção ordenada fixa, use um array. Use uma tabela para uma associação mutável cujos tipos exatos de chave e valor sejam conhecidos.

Consulte [Consulta e mutação de tabelas](./table-lookup-and-mutation/) para ver exemplos específicos de chaves ausentes, inserção, substituição e valores opcionais.
