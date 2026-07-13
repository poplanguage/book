---
title: Leitura de diagnósticos
description: Use os códigos de erro, trechos, rótulos e observações de Pop para corrigir um programa.
sidebar:
  order: 3
---

Quando Pop rejeita um código-fonte, ela informa um diagnóstico com código, mensagem e localização no código. Rótulos adicionais apontam para declarações ou expressões relacionadas, e observações explicam restrições que não cabem na mensagem principal.

Os intervalos de códigos de diagnóstico agrupam trabalhos relacionados:

| Intervalo | Área |
| --- | --- |
| `POP000x` | sintaxe e estrutura do código-fonte |
| `POP100x` | nomes, importações e visibilidade |
| `POP200x` | tipos e operações |
| `POP400x` | avaliação em tempo de compilação e atributos |
| `POP6400`–`POP6401` | avisos de XML da documentação |

Comece pelo primeiro diagnóstico na ordem do código-fonte. A ausência de um `end`, por exemplo, pode fazer com que declarações posteriores pareçam malformadas. Corrigir primeiro o problema estrutural mais antigo costuma remover várias mensagens decorrentes dele.

## Erros e avisos

Um erro impede que a etapa de compilação solicitada seja concluída. Um aviso informa uma construção suspeita ou insegura para processamento sem necessariamente rejeitar o programa. O XML da documentação usa avisos para que uma marcação malformada ou insegura possa ser corrigida enquanto a declaração Pop ao redor continua compreensível.

## Pequenos experimentos

Quando uma mensagem não estiver clara, reduza o programa ao menor arquivo que ainda a produza. Mantenha o namespace, a declaração relevante e uma chamada. Executar `pop check reduced.pop` oferece um ciclo de retorno mais rápido e menos ruidoso do que compilar repetidamente um executável grande.

Ao relatar um problema do compilador, inclua a versão de Pop, o código de diagnóstico, o código-fonte reduzido e o comando exato. Os diagnósticos e a sintaxe aceita podem diferir entre versões do livro.
