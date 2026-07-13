---
title: Runtime e memória gerenciada
description: Entenda os serviços nativos por trás de strings, arrays, objetos e closures.
sidebar:
  order: 2
---

Valores numéricos primitivos e valores Boolean podem residir diretamente no armazenamento nativo. Strings, arrays, objetos de classe, closures, tuplas que contêm valores gerenciados e tabelas precisam do suporte do runtime para que sua memória permaneça válida enquanto o programa puder alcançá-los.

O runtime nativo de Pop usa identificadores estáveis e informações precisas sobre raízes. O código gerado informa ao runtime quais locais ativos contêm referências gerenciadas nos pontos seguros. O coletor de lixo inicial rastreia essas referências e recupera alocações gerenciadas que não são mais alcançáveis.

Para código Pop comum, isso significa que você não libera manualmente uma string ou um objeto de classe:

```pop
function makeCounter(): Counter
    local counter = Counter {}
    return counter
end
```

O objeto continua ativo depois que `makeCounter` retorna porque a referência retornada ainda o alcança. Quando nenhum valor alcançável se referir a ele, o coletor poderá recuperá-lo.

## Identidade compartilhada

Objetos de classe gerenciados e arrays se comportam como referências. Uma atribuição compartilha o mesmo objeto ou array subjacente, em vez de criar uma cópia profunda. Registros, por outro lado, possuem atualizações com comportamento de valor por meio de `with`, embora seus campos possam conter referências gerenciadas compartilhadas.

Closures mantêm o estado capturado. Se várias closures capturarem a mesma variável local mutável, o compilador colocará esse estado em um armazenamento gerenciado compartilhado para que cada chamada observe seu valor mais recente.

## Limite atual do coletor

A base nativa de produção desta versão usa o coletor inicial. A base de código também contém mecanismos de realocação e conformidade usados para testar contratos do runtime, mas eles não constituem um coletor de produção separado selecionado pelo código-fonte Pop. Não há uma API de configuração do coletor de lixo voltada ao usuário na versão 0.1.0-rc.3.

A ABI do runtime possui versionamento. Objetos e bibliotecas nativas compilados para contratos de runtime incompatíveis não devem ser combinados manualmente.
