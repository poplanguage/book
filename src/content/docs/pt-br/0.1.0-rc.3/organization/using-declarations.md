---
title: Declarações using
description: Traga outro namespace para um arquivo, com um alias opcional.
sidebar:
  order: 2
---

Uma declaração `using` permite que um arquivo se refira às declarações visíveis de outro namespace por seus nomes curtos:

```pop
namespace Application

using Geometry

function makeOrigin(): Point
    return origin()
end
```

`using` afeta apenas a resolução de nomes. Ele não carrega um arquivo em tempo de execução nem executa código de inicialização.

## Aliases de namespace

Dê a um namespace um nome local mais curto ou mais distinto com `=`:

```pop
namespace Application

using Geo = Company.Project.Geometry

function makeOrigin(): Geo.Point
    return Geo.origin()
end
```

Um alias é especialmente útil para nomes qualificados longos e colisões.

Se vários namespaces importados expuserem o mesmo nome curto, Pop informa uma ambiguidade em vez de escolher um deles silenciosamente. Resolva-a usando um nome totalmente qualificado ou um alias.

Somente declarações visíveis a partir da Bubble atual podem ser alcançadas por `using`; importar um namespace não ignora o acesso `private` ou `internal`.
