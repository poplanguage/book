---
title: Gramática de tipos
description: Consulte as formas de código-fonte aceitas para os tipos implementados.
sidebar:
  order: 4
---

## Tipos nomeados e genéricos

Os tipos podem ser nomeados diretamente ou qualificados por meio de um namespace:

```pop
String
Geometry.Point
```

Argumentos genéricos usam sinais de menor e maior na sintaxe de tipos:

```pop
Array<String>
Table<String, Int>
```

Argumentos de chamadas genéricas usam sinais de menor e maior duplicados para permanecerem distintos dos operadores de comparação:

```pop
Array.create<<Int>>(4, 0)
identity<<String>>("Pop")
```

Funções, registros e uniões discriminadas podem declarar parâmetros de tipo. Na rc.3, as chamadas devem fornecer explicitamente todos os argumentos de tipo; os literais de registro obtêm seu tipo genérico concreto de uma anotação ou de outro contexto esperado.

## Tipos opcionais e uniões

Acrescente `?` quando um valor também puder ser `nil`:

```pop
String?
```

A forma geral de união combina alternativas com `|`:

```pop
String | Int | nil
```

Essa união de tipos é diferente de uma `union` discriminada declarada: uma união discriminada fornece às alternativas casos nomeados e payloads opcionais.

## Arrays e tabelas

Os tipos de array possuem formas curta e nomeada equivalentes:

```pop
{String}
Array<String>
```

Tabelas tipadas também possuem duas formas:

```pop
{[String]: Int}
Table<String, Int>
```

## Tuplas e funções

Uma tupla relaciona tipos de elementos posicionais:

```pop
(String, Int, Boolean)
```

Um tipo de função relaciona parâmetros nomeados e um resultado opcional:

```pop
function(value: Int): String
function(message: String)
```

Um resultado de função entre parênteses declara um pacote exato e fixo de resultados:

```pop
function(value: Int): (Int, String)
```

## Aliases de tipo

Um alias de namespace fornece outro nome no código-fonte a um tipo existente:

```pop
public type Scores = {[String]: Int}
```

A forma inicial de alias não é genérica. Ela é apagada para seu destino antes da HIR e não acrescenta uma nova identidade em tempo de execução.

Parênteses agrupam tipos compostos quando necessário. A grafia do tipo não causa conversões implícitas: exceto pelos aliases, os valores devem satisfazer o tipo esperado exato ou uma relação de união/interface explicitamente permitida.
