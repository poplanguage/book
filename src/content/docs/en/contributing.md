---
title: Contributing to Pop Book
description: Add and translate focused, versioned Pop Lang documentation.
---

Content lives in `src/content/docs/<locale>/<version>/`. English is the source locale and Brazilian Portuguese mirrors the same relative file paths.

## Add a page

1. Create one focused Markdown or MDX file under the current `en/0.1.0-rc.3/` edition.
2. Create the matching path under `pt-br/0.1.0-rc.3/`, or leave it absent temporarily so Starlight shows the English fallback.
3. Add `title`, `description`, and `sidebar.order` frontmatter.
4. Run `pnpm check` and `pnpm build` before opening a pull request.

Do not describe a feature from memory. Link the change to an implemented compiler source or test.
