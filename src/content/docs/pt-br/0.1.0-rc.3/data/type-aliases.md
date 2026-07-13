---
title: Aliases de tipos
description: Dê a um tipo existente um nome legível no código-fonte, sem um wrapper em tempo de execução.
sidebar:
  order: 4
---

Uma declaração `type` de namespace cria um alias para outro tipo:

```pop
public type PlayerId = Int64
private type Scores = {[String]: Int}
```

O alias segue a visibilidade normal do namespace. Ele pode aparecer em assinaturas, anotações de variáveis locais e expressões de tipos aninhadas:

```pop
public function increase(id: PlayerId, scores: Scores): PlayerId
    return id + 1
end
```

Um alias é apagado recursivamente para seu alvo antes do HIR. Ele tem exatamente as mesmas operações, layout, conversões e identidade em tempo de execução que o alvo. Não é um wrapper nominal e não adiciona um construtor.

Cadeias de aliases são permitidas:

```pop
private type Score = Int
private type ScoreList = {Score}
```

Ciclos diretos e indiretos são rejeitados. A forma inicial de alias da rc.3 não tem parâmetros de tipo, portanto `Score<String>` e `type Box<T> = ...` não são aceitos.
