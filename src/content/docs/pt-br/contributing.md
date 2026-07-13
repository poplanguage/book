---
title: Contribuindo com o Pop Book
description: Adicione e traduza documentação focada e versionada de Pop Lang.
---

O conteúdo fica em `src/content/docs/<idioma>/<versão>/`. Inglês é o idioma de origem e português brasileiro espelha os mesmos caminhos relativos.

## Adicione uma página

1. Crie um arquivo Markdown ou MDX focado em `en/0.1.0-rc.2/`.
2. Crie o mesmo caminho em `pt-br/0.1.0-rc.2/`, ou deixe-o ausente temporariamente para o Starlight exibir o conteúdo em inglês como fallback.
3. Adicione `title`, `description` e `sidebar.order` ao frontmatter.
4. Execute `pnpm check` e `pnpm build` antes de abrir um pull request.

Não descreva uma funcionalidade de memória. Relacione a mudança a um código ou teste implementado no compilador.
