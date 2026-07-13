# Pop Book

The versioned, bilingual guide to Pop Lang, built with Astro and Starlight.

## Local development

```sh
pnpm install
pnpm dev
```

Run `pnpm build` before pushing. The GitHub Pages workflow builds and deploys pushes to `master` or `main`.

## Content layout

```text
src/content/docs/
├── en/
│   ├── 0.1.0-rc.2/
│   └── 0.1.0-rc.3/
└── pt-br/
    └── 0.1.0-rc.2/
```

Keep equivalent translations at the same relative path. Copy each locale's version folder when starting a new book edition; old editions remain unchanged.

`0.1.0-rc.3` currently uses Starlight's English fallback for Portuguese pages that have not been translated yet.
