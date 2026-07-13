---
title: Palavras-chave
description: Palavras reservadas reconhecidas pelo lexer da versão 0.1.0-rc.3.
sidebar:
  order: 2
---

As palavras a seguir são reservadas e não podem ser usadas como identificadores comuns:

```text
namespace  using      public      internal    private
export     function   local       return      end
const      record     union       class       interface
enum       attribute  type        open        implements
if         then       elseif      else        while
repeat     until      for         do          break
continue   match      when        with        nil
true       false      and         or          not
```

Ser reservada não significa que cada palavra introduza todas as formas planejadas. Na rc.3, `for` implementa intervalos numéricos, mas não o `for value in iterable` generalizado; `enum` implementa casos nominais sem payload; e `type` implementa aliases apagados não genéricos. A herança `open` não faz parte da interface executável compatível. `export` é rejeitada porque as declarações usam diretamente `public`, `internal` ou `private`.

Nomes de tipos embutidos como `Int`, `String` e `Boolean` são nomes fornecidos pela linguagem, e não palavras-chave da mesma categoria léxica.
