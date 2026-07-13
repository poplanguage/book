---
title: Interpretador MIR
description: Entenda o mecanismo de execução de referência usado para conformidade.
sidebar:
  order: 5
---

Além da geração de código LLVM, Pop contém um interpretador para MIR verificada. Ele executa diretamente a representação transformada pelo compilador e é usado para testar a semântica da linguagem, falhas, valores gerenciados e a concordância entre mecanismos de execução.

O interpretador é valioso para a implementação porque os testes comparam seus resultados com o comportamento nativo sem fazer da análise do código-fonte o único parâmetro de correção. Na rc.3, a cobertura diferencial inclui conversão numérica, composição e formatação de strings, valores condicionais, intervalos numéricos e controle de loops, pacotes fixos, acesso e alteração de tabelas tipadas, enums, constantes e genéricos especializados.

Não existe um comando público `pop interpret` na versão 0.1.0-rc.3. `pop run` compila e executa um executável nativo. O interpretador MIR pertence ao trabalho de conformidade do compilador e de implementação avançada, portanto programas de usuário não devem depender de comportamentos específicos dele.

Da mesma forma, o crate de VM nesta versão é apenas um espaço reservado, e não um destino de bytecode disponível. O caminho oferecido ao usuário é a compilação nativa com LLVM, com o transpilador C11 disponível para seu subconjunto documentado.
