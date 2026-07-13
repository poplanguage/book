---
title: Dumps do compilador
description: Inspecione a saída HIR, MIR e LLVM durante a verificação de um programa.
sidebar:
  order: 2
---

Usuários avançados podem pedir que `pop check` imprima formas intermediárias do compilador com `--dump`:

```sh
pop check source.pop --dump hir
pop check source.pop --dump mir
pop check source.pop --dump ll
```

Os tipos de dump são:

| Tipo | Exibe |
| --- | --- |
| `hir` | estrutura de alto nível do programa, resolvida e tipada |
| `mir` | operações transformadas e verificadas usadas pelos mecanismos de execução |
| `ll` | IR LLVM gerada para compilação nativa |

A opção pode ser repetida quando mais de uma representação for útil:

```sh
pop check source.pop --dump hir --dump mir
```

Dumps são diagnósticos do compilador, não formatos estáveis de serialização. Sua organização pode mudar entre versões de Pop, e as ferramentas de uma versão posterior não devem consumir como API o dump textual de uma versão anterior.

Quando a verificação falha, o compilador informa diagnósticos em vez de publicar uma representação parcial enganosa. Corrija o primeiro erro do código-fonte antes de confiar em um dump produzido nas etapas posteriores.

A HIR costuma ser o melhor lugar para estudar resolução de tipos/nomes, argumentos genéricos, identidades de enum e conceitos tipados do código-fonte. A MIR é melhor para funções concretas especializadas, operações tipadas de string/tabela, projeção de tuplas de pacote fixo, conversões verificadas, junções de fluxo de controle, arestas de loops e interação com o runtime. A IR LLVM é a mais baixa e específica ao destino entre as três.
