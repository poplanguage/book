---
title: String
description: Componha texto UTF-8 imutável com as operações da rc.3.
sidebar:
  order: 13
---

`String` é um texto UTF-8 imutável. Unicode é preservado nos literais e nos valores em tempo de execução.

```pop
local language: String = "Pop"
local symbol = "🫧"
local greeting = symbol .. " Olá, " .. language
```

Use `..`, não `+`, para concatenação. Use crases quando a interpolação ficar mais clara:

```pop
local release = "0.1.0-rc.3"
local ready = true
local message = `Pop {release}: pronto={ready}`
```

`String(value)` formata explicitamente uma string, um booleano, um inteiro ou uma primitiva de ponto flutuante. Strings são comparadas pelo conteúdo UTF-8 com `==` e `~=`.

Consulte o [guia completo de strings](../strings/) para conhecer escapes, pontuação de interpolação, regras de formatação e os limites atuais da biblioteca.
