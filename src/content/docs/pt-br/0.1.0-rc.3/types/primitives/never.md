---
title: Never
description: Entenda o tipo que não tem qualquer valor possível.
sidebar:
  order: 14
---

`Never` é desabitado: nenhum valor em tempo de execução pode ter esse tipo. O compilador o utiliza para uma expressão ou um caminho de fluxo de controle que não pode continuar normalmente.

Não existe um literal `Never`. Tentar inicializá-lo com um valor comum é um erro de tipo:

```pop
local impossible: Never = 1 -- erro de tipo: Int não é Never
```

A maioria dos programas nunca escreve `Never` diretamente. Seu papel importante no sistema de tipos é permitir que um caminho que não retorna se encaixe onde outro ramo espera um valor, sem introduzir `nil`, um valor dinâmico ou uma união implícita.
