---
title: Saída C experimental
description: Transpile para C11 o subconjunto que não depende do runtime.
sidebar:
  order: 4
---

O driver pode traduzir um subconjunto limitado de Pop para código-fonte C11:

```sh
pop transpile app.pop --to c
```

Esse backend é experimental e intencionalmente menor que a compilação nativa com LLVM. Ele é útil para inspecionar transformações simples e para programas que não dependem do runtime; não é uma segunda implementação completa de todos os recursos de Pop.

O núcleo compatível inclui um subconjunto escalar deliberadamente restrito: operações numéricas tipadas, chamadas diretas de funções, condicionais, algumas operações/saídas de string e uma entrada sem argumentos que não retorna valor ou retorna um status `Int`. Algumas operações MIR da rc.3 possuem transformação para C, mas isso não torna o backend equivalente ao LLVM nesta versão.

Recursos fora do conjunto declarado de capacidades são rejeitados em vez de traduzidos incorretamente. Isso inclui registros gerenciados, uniões discriminadas, enums, dados genéricos, classes, closures, arrays e tabelas, além de operações que exigem alocação, rastreamento ou pontos seguros incompatíveis.

Sempre considere o diagnóstico do transpilador como a fonte definitiva para um programa específico. Não há garantia de que um código aceito por `pop check` ou pelo backend LLVM faça parte do subconjunto C.

A saída C ainda exige um compilador C11 para ser transformada em executável. Nesta versão, Pop não promete compatibilidade de ABI no nível do código-fonte entre o C gerado e código C arbitrário escrito manualmente.
