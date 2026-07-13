---
title: Namespaces
description: Dê nomes às declarações e organize os arquivos-fonte.
sidebar:
  order: 1
---

Todo arquivo-fonte Pop começa com exatamente uma declaração de namespace:

```pop
namespace Store.Payments
```

Um namespace fornece às declarações um local estável e qualificado. Os pontos dividem um nome em componentes, portanto `Store.Payments` pode existir ao lado de `Store.Products` e `Store.Users`.

Declarações no mesmo namespace podem se referir umas às outras por seus nomes curtos:

```pop
namespace Geometry

public record Point
    x: Int
    y: Int
end

public function origin(): Point
    return { x = 0, y = 0 }
end
```

A declaração de namespace tem escopo de arquivo. Ela não é um bloco e, portanto, não possui um `end` correspondente. Um arquivo não pode mudar para um segundo namespace no meio de seu conteúdo.

## Nomes qualificados

Quando necessário, o código pode nomear uma declaração por seu caminho completo:

```pop
local point: Geometry.Point = Geometry.origin()
```

Nomes qualificados são úteis quando dois namespaces contêm o mesmo nome curto de declaração ou quando o local de chamada deve deixar a propriedade especialmente clara.

Namespaces organizam nomes em tempo de compilação. Eles não criam objetos em tempo de execução e não são valores que possam ser atribuídos a variáveis locais.
