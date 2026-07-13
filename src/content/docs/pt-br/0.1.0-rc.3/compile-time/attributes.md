---
title: Atributos
description: Anexe metadados tipados a declarações.
sidebar:
  order: 3
---

Um atributo é uma parte declarada e tipada de metadados. O metadado confiável `@AttributeUsage` indica onde ele pode ser anexado, e então a declaração do atributo define seus parâmetros:

```pop
@AttributeUsage(
    targets = { AttributeTarget.Function },
    repeatable = false,
)
public attribute Label(value: String)
```

Aplique-o colocando `@` e o nome do atributo antes de uma declaração:

```pop
@Label("entrada")
public function start()
end
```

Os argumentos do atributo são verificados em relação à declaração. Eles podem ser posicionais ou nomeados, e os parâmetros podem fornecer valores padrão em tempo de compilação:

```pop
@AttributeUsage(
    targets = { AttributeTarget.Function },
    repeatable = false,
)
public attribute Retry(count: Int = 3)

@Retry(count = 5)
public function connect()
end
```

Como os valores dos atributos ficam disponíveis durante a compilação, seus argumentos devem ser expressões de tempo de compilação.

Sem um `@AttributeUsage` explícito, um atributo do usuário tem como padrão um alvo de namespace não repetível. Declare seu uso sempre que ele se aplicar a um registro, campo, função, classe, interface ou outro tipo de declaração compatível.

## Restringindo o uso

O atributo confiável `@AttributeUsage` pode restringir quais tipos de declaração aceitam um atributo e se ele pode ser repetido:

```pop
@AttributeUsage(
    targets = { AttributeTarget.Function },
    repeatable = false,
)
public attribute Entry()
```

Aplicar `@Entry` a um registro ou aplicá-lo duas vezes a uma função passa, então, a gerar um diagnóstico. Os alvos de atributos são representados pelos casos de `AttributeTarget` fornecidos pelo compilador.

## Validação e reflexão

`@AttributeValidator` associa uma função de validação em tempo de compilação a um atributo. Isso permite regras que vão além dos tipos dos parâmetros, como exigir um argumento numérico positivo.

O código de tempo de compilação pode verificar se uma declaração tem determinado atributo com `hasAttribute<<Label>>(Declaration)` e obtê-lo com `attribute<<Label>>(Declaration)`. A sintaxe `<<...>>` fornece um argumento de tipo genérico em tempo de compilação.

Os atributos não alteram automaticamente o comportamento em tempo de execução. Eles fornecem metadados; um recurso do compilador ou um validador de tempo de compilação precisa dar significado a esses metadados. Nesta versão, macros de geração de código definidos pelo usuário não estão implementados.
