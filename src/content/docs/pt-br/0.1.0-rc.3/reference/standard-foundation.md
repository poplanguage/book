---
title: Base Standard
description: Consulte as operações voltadas a Pop realmente disponíveis nesta versão.
sidebar:
  order: 5
---

Pop 0.1.0-rc.3 distribui `libpop_standard.a` como parte da distribuição nativa. Suas funções gerais voltadas a Pop são deliberadamente reduzidas:

```pop
print(value: Int)
print(value: String)
```

Ambas escrevem o valor seguido por uma quebra de linha e não retornam valor. A sobrecarga é escolhida a partir do tipo do argumento.

Na rc.3, a composição de strings é implementada como operações tipadas da linguagem e do runtime, em vez de APIs Standard abrangentes:

```pop
local joined = "count=" .. String(count)
local summary = `count={count}, ready={ready}`
```

`String(value)` e a interpolação aceitam somente strings, booleanos e primitivos numéricos. Elas não oferecem formatação universal de objetos nem reflexão em tempo de execução.

Arrays possuem operações compatíveis com compilador/runtime usadas ao longo deste livro:

```pop
Array.create<<T>>(length: Int, initial: T): Array<T>
Array.length(array: Array<T>): Int
Array.get(array: Array<T>, index: Int): T
Array.fill(array: Array<T>, value: T)
```

As posições de arrays começam em um. `create` causa um trap para um comprimento negativo; `get` causa um trap fora do intervalo válido; `fill` preserva o comprimento fixo.

A consulta e a atribuição em tabelas tipadas usam a indexação da linguagem:

```pop
local value: Int? = scores["Ada"]
scores["Grace"] = 42
```

Elas não são consultas dinâmicas de membros e não transformam tabelas em namespaces ou objetos.

## Nomes que ainda não são APIs

O compilador conhece identidades iniciais como `Result<T, E>`, `List<T>`, `Set<T>`, `Range<T>`, `Task<T>`, `Guid`, `Iterable<T>`, `Iterator<T>`, `Equal<T>`, `Order<T>`, `Hash<T>`, `Close` e `AsyncClose`. Essas identidades dão suporte ao trabalho de implementação, mas não são acompanhadas por operações completas voltadas a Pop nesta versão.

Da mesma forma, módulos Rust internos para texto, sequências e matemática não se tornam automaticamente APIs Standard chamáveis a partir do código Pop. Esta referência relaciona apenas as operações que um programa realmente pode usar por meio do compilador e da base nativa da versão 0.1.0-rc.3.
