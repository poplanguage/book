---
title: Um projeto Pop
description: Dê a um programa Pop uma estrutura convencional de projeto.
sidebar:
  order: 8
---

Um único arquivo-fonte é suficiente para exemplos pequenos. À medida que um programa cresce, manter seu código-fonte e as informações do projeto juntos facilita sua execução e seu compartilhamento. Pop chama essa unidade de **Bubble** e a descreve com um arquivo `bubble.toml`.

Crie um novo diretório com esta estrutura:

```text
greeting/
├── bubble.toml
└── src/
    └── main.pop
```

Coloque as seguintes informações do projeto em `bubble.toml`:

```toml title="bubble.toml"
[package]
name = "Greeting"
version = "0.1.0"
edition = "2026"
```

O nome do pacote usa PascalCase, assim como o namespace no arquivo-fonte. A versão identifica este projeto, não a versão instalada de Pop.

Agora, adicione o programa:

```pop title="src/main.pop"
namespace Greeting

function main()
    print("Olá de um projeto Pop!")
end
```

No diretório `greeting`, execute:

```sh
pop run --manifestPath bubble.toml
```

Pop lê o manifesto, descobre `src/main.pop`, gera o programa em `target/debug/` e o executa.

## A estrutura convencional

`src/main.pop` é o código-fonte executável padrão. Um projeto pode, em vez disso ou adicionalmente, conter um `src/lib.pop` reutilizável. Executáveis adicionais podem ficar em `src/bin/`, embora o comando `run` atual exija que o projeto contenha exatamente um executável.

O formato do manifesto também reconhece uma tabela `[dependencies]`, mas a resolução de dependências não está disponível na 0.1.0-rc.3. Por enquanto, use uma Bubble para organizar o código que pertence a um projeto; não espere que ela baixe pacotes externos.

Usaremos arquivos `.pop` diretamente na maioria dos exemplos curtos, pois eles mantêm a lição focada. A parte Módulos e Pacotes retoma a organização em vários arquivos e a estrutura completa do projeto.
