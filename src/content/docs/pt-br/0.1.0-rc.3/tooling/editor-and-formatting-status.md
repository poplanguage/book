---
title: Estado dos editores e da formatação
description: Saiba quais integrações de desenvolvimento estão disponíveis nesta versão.
sidebar:
  order: 4
---

O código-fonte Pop é texto UTF-8 simples, portanto qualquer editor de texto pode ser usado. Configure arquivos `.pop` como Pop quando uma extensão fornecer a gramática da linguagem; caso contrário, use um modo simples de texto sem formatação.

O workspace da versão 0.1.0-rc.3 contém bibliotecas iniciais para um formatador, um servidor de linguagem, um gerador de documentação e um executor de testes. Esses crates ainda não fornecem comandos públicos completos nem integrações com editores. Em particular:

- não há um comando `pop format` lançado;
- não há um executável de servidor de linguagem utilizável para configurar em um editor;
- não há um gerador `pop doc` lançado;
- não há um comando público `pop test`.

Não instale ferramentas alheias ao projeto apenas porque seus nomes aparecem no workspace da implementação. A lista de comandos impressa por `pop --help` é a fonte definitiva para esta versão.

Até que a formatação seja automatizada, siga o estilo usado neste livro: quatro espaços dentro de blocos, um componente da declaração por linha quando isso melhorar a legibilidade, ausência de ponto e vírgula e um `end` alinhado à construção que ele encerra. Essas escolhas são convenções para exemplos legíveis, não regras gramaticais adicionais.

Para obter um retorno rápido, conecte uma tarefa do editor a `pop check` no arquivo atual. Os trechos do código-fonte e os códigos de diagnóstico do compilador continuam úteis mesmo sem um servidor de linguagem dedicado.
