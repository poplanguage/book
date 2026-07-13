---
title: Introdução
description: Conheça Pop e veja o que você construirá ao longo deste livro.
sidebar:
  order: 1
---

Boas-vindas ao _The Pop Book_, uma introdução à Pop Lang 0.1.0-rc.3. Pop é uma linguagem compilada e estaticamente tipada, com uma sintaxe pequena e legível. Ela usa conceitos conhecidos como funções, registros, classes e interfaces, ao mesmo tempo que mantém os blocos fáceis de reconhecer com a palavra-chave `end`.

:::caution[Esta é uma versão preliminar]
Pop 0.1.0-rc.3 é uma candidata a lançamento, não uma versão estável da linguagem. A sintaxe, o comportamento do compilador, a biblioteca Standard, os arquivos de projeto e as opções de linha de comando podem mudar consideravelmente antes da 1.0. Código de outra versão de Pop pode não funcionar exatamente como mostrado aqui. Mantenha o seletor de versão em **0.1.0-rc.3** enquanto estiver lendo esta edição.
:::

Este é um programa Pop completo:

```pop
namespace Welcome

function main()
    local language = "Pop"
    local release = "0.1.0-rc.3"
    print(`🫧 Olá da {language} {release}!`)
end
```

Você ainda não precisa entender todas as linhas. Ao final da primeira parte, saberá escrever programas como este, armazenar valores, tomar decisões, repetir tarefas e organizar comportamentos em funções.

As partes seguintes apresentam os tipos de Pop e suas formas de modelar dados. Páginas dedicadas abordam cada primitiva. Você usará intervalos numéricos, valores condicionais, múltiplos retornos, genéricos explícitos, tabelas tipadas, registros, enums, uniões marcadas, classes e interfaces; aprenderá como namespaces dividem um programa; e verá como closures podem transportar estado. As partes finais são um guia preciso da linguagem implementada nesta versão, incluindo recursos de tempo de compilação, execução nativa e ferramentas de linha de comando.

## Para quem é este livro

Os capítulos iniciais pressupõem apenas que você saiba criar um arquivo de texto e digitar um comando em um terminal. Termos de programação são apresentados quando se tornam úteis. Se você já conhece outra linguagem, os exemplos devem esclarecer a sintaxe e as regras de Pop sem exigir a leitura da documentação do compilador.

Comece por [Escolha seu caminho de aprendizado](../learning-paths/) em vez de tentar adivinhar quais capítulos deve pular. Quem está programando pela primeira vez recebe um guia de vocabulário e uma rota gradual de prática. Programadores experientes recebem uma rota mais curta pelas regras específicas de Pop.

Se você conhece Luau, leia [Vindo de Luau](../coming-from-luau/) antes de confiar na sintaxe conhecida. Pop mantém várias formas legíveis inspiradas em Luau, mas substitui tipagem gradual, valor-verdade implícito, tabelas universais, módulos em tempo de execução e metatabelas por contratos estáticos e modelos de dados separados.

Este livro aborda os recursos disponíveis em Pop 0.1.0-rc.3. Pop ainda é uma candidata a lançamento, portanto sua biblioteca padrão e suas ferramentas de pacotes são pequenas. O livro indica esses limites diretamente, em vez de ensinar APIs que ainda não existem.

Escolha um caminho, instale Pop e escreva seu primeiro programa.
