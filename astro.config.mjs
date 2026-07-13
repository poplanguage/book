import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { createRequire } from 'node:module';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const pagefindUiPath = createRequire(import.meta.url)
  .resolve('@pagefind/default-ui')
  .replace('/cjs/ui-core.cjs', '/mjs/ui-core.mjs');

const repository = process.env.GITHUB_REPOSITORY;
const [owner, repositoryName] = repository?.split('/') ?? [];
const isUserPage = repositoryName?.toLowerCase() === `${owner?.toLowerCase()}.github.io`;
const base = repositoryName && !isUserPage ? `/${repositoryName}` : undefined;

const docsRoots = {
  en: fileURLToPath(new URL('./src/content/docs/en/', import.meta.url)),
  'pt-br': fileURLToPath(new URL('./src/content/docs/pt-br/', import.meta.url)),
};

function unquote(value) {
  const first = value.at(0);
  const last = value.at(-1);
  return (first === '"' && last === '"') || (first === "'" && last === "'")
    ? value.slice(1, -1)
    : value;
}

function pageMetadata(path) {
  const source = readFileSync(path, 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1]?.trim();
  const order = frontmatter.match(/^\s+order:\s*(-?\d+(?:\.\d+)?)\s*$/m)?.[1];

  return {
    label: title ? unquote(title) : humanize(basename(path, extname(path))),
    order: order === undefined ? Number.POSITIVE_INFINITY : Number(order),
  };
}

function humanize(value) {
  const words = value.replace(/[-_]+/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function pageSlug(path, docsRoot) {
  return relative(docsRoot, path)
    .replaceAll('\\', '/')
    .replace(/\.(?:md|mdx)$/, '')
    .replace(/\/index$/, '')
    .replace(/^0\.1\.0-rc\.(\d+)(?=\/|$)/, '010-rc$1');
}

function pageLink(path, docsRoot) {
  return `/${pageSlug(path, docsRoot)}/`;
}

function documentationFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).filter(
    (entry) => !entry.name.startsWith('.') && (entry.isDirectory() || /\.mdx?$/.test(entry.name)),
  );
}

function orderedSidebarNodes(directory, locale, docsRoot) {
  const nodes = [];

  for (const entry of documentationFiles(directory)) {
    const path = join(directory, entry.name);

    if (!entry.isDirectory()) {
      if (/^index\.mdx?$/.test(entry.name)) continue;

      const metadata = pageMetadata(path);
      nodes.push({
        order: metadata.order,
        label: metadata.label,
        item: {
          label: metadata.label,
          link: pageLink(path, docsRoot),
          attrs: { 'data-sidebar-locale': locale },
        },
      });
      continue;
    }

    const childNodes = orderedSidebarNodes(path, locale, docsRoot);
    const indexEntry = documentationFiles(path).find(
      (child) => !child.isDirectory() && /^index\.mdx?$/.test(child.name),
    );

    if (indexEntry) {
      const indexPath = join(path, indexEntry.name);
      const metadata = pageMetadata(indexPath);
      nodes.push({
        order: metadata.order,
        label: metadata.label,
        item: {
          label: metadata.label,
          collapsed: true,
          items: [
            {
              label: metadata.label,
              link: pageLink(indexPath, docsRoot),
              attrs: {
                'data-category-index': 'true',
                'data-sidebar-locale': locale,
              },
            },
            ...childNodes.map(({ item }) => item),
          ],
        },
      });

      continue;
    }

    if (childNodes.length > 0) {
      const label = humanize(entry.name);
      nodes.push({
        order: childNodes[0].order,
        label,
        item: {
          label,
          collapsed: true,
          items: childNodes.map(({ item }) => item),
        },
      });
    }
  }

  return nodes.sort(
    (left, right) => left.order - right.order || left.label.localeCompare(right.label),
  );
}

function documentationSidebar(locale, directory) {
  const docsRoot = docsRoots[locale];
  const path = join(docsRoot, directory);
  if (!existsSync(path)) return [];
  return orderedSidebarNodes(path, locale, docsRoot).map(({ item }) => item);
}

function versionedDocumentationSidebar(section) {
  return Object.keys(docsRoots).flatMap((locale) => [
    ...documentationSidebar(locale, `0.1.0-rc.2/${section}`),
    ...documentationSidebar(locale, `0.1.0-rc.3/${section}`),
  ]);
}

const popLanguage = {
  name: 'pop',
  scopeName: 'source.pop',
  displayName: 'Pop Lang',
  aliases: ['poplang'],
  patterns: [
    { name: 'comment.line.documentation.pop', match: '---.*$' },
    { name: 'comment.line.double-dash.pop', match: '--.*$' },
    {
      name: 'string.quoted.double.pop',
      begin: '"',
      end: '"',
      patterns: [{ name: 'constant.character.escape.pop', match: '\\\\.' }],
    },
    {
      name: 'string.quoted.single.pop',
      begin: "'",
      end: "'",
      patterns: [{ name: 'constant.character.escape.pop', match: '\\\\.' }],
    },
    {
      name: 'string.interpolated.pop',
      begin: '`',
      end: '`',
      patterns: [{ name: 'constant.character.escape.pop', match: '\\\\.' }],
    },
    {
      name: 'keyword.control.pop',
      match:
        '\\b(?:if|then|elseif|else|while|do|repeat|until|for|break|continue|match|when|return|end)\\b',
    },
    {
      name: 'keyword.declaration.pop',
      match: '\\b(?:namespace|using|public|internal|private|function|local|const|record|union|class|interface|enum|attribute|type|open|implements)\\b',
    },
    { name: 'keyword.operator.word.pop', match: '\\b(?:and|or|not|with)\\b' },
    { name: 'constant.language.pop', match: '\\b(?:nil|true|false)\\b' },
    {
      name: 'support.type.primitive.pop',
      match: '\\b(?:Boolean|Byte|Float|Float32|Float64|Int|Int8|Int16|Int32|Int64|Never|String|UInt8|UInt16|UInt32|UInt64)\\b',
    },
    { name: 'storage.type.pop', match: '\\b[A-Z][A-Za-z0-9_]*\\b' },
    { name: 'entity.name.function.pop', match: '\\b[a-z][A-Za-z0-9_]*(?=\\s*\\()' },
    {
      name: 'constant.numeric.float.pop',
      match: '\\b[0-9][0-9_]*(?:\\.[0-9][0-9_]*)?(?:[eE][+-]?[0-9][0-9_]*)\\b|\\b[0-9][0-9_]*\\.[0-9][0-9_]*\\b',
    },
    { name: 'constant.numeric.integer.pop', match: '\\b[0-9][0-9_]*\\b' },
    {
      name: 'keyword.operator.symbol.pop',
      match: '\\.\\.=|\\+=|-=|\\*=|/=|%=|<=|>=|==|~=|\\.\\.|[+\\-*/%<>=|?]',
    },
  ],
};

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : 'https://pop-lang.github.io',
  base,
  output: 'static',
  vite: {
    resolve: {
      alias: [
        {
          find: /^@pagefind\/default-ui$/,
          replacement: new URL('./src/versionedPagefind.ts', import.meta.url).pathname,
        },
        { find: /^pagefind-default-ui-original$/, replacement: pagefindUiPath },
      ],
    },
  },
  integrations: [
    starlight({
      title: 'Pop Book',
      description: 'Learn Pop Lang through small, verified examples.',
      favicon: '/pop.png',
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        'pt-br': { label: 'Português (Brasil)', lang: 'pt-BR' },
      },
      customCss: ['./src/styles/pop-book.css'],
      expressiveCode: {
        shiki: {
          langs: [popLanguage],
        },
      },
      social: [
        {
          icon: 'github',
          label: 'Pop Lang on GitHub',
          href: 'https://github.com/poplanguage/pop',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/poplanguage/book/edit/main/',
      },
      lastUpdated: true,
      tableOfContents: false,
      routeMiddleware: './src/starlightRouteData.ts',
      components: {
        Header: './src/components/Header.astro',
        MobileMenuFooter: './src/components/MobileMenuFooter.astro',
        Sidebar: './src/components/Sidebar.astro',
      },
      sidebar: [
        {
          label: '1. Getting Started',
          translations: { 'pt-BR': '1. Primeiros passos' },
          items: versionedDocumentationSidebar('start'),
        },
        {
          label: '2. Language Fundamentals',
          translations: { 'pt-BR': '2. Fundamentos da linguagem' },
          items: versionedDocumentationSidebar('language'),
        },
        {
          label: '3. Types',
          translations: { 'pt-BR': '3. Tipos' },
          items: versionedDocumentationSidebar('types'),
        },
        {
          label: '4. Data and Abstraction',
          translations: { 'pt-BR': '4. Dados e abstração' },
          items: versionedDocumentationSidebar('data'),
        },
        {
          label: '5. Modules and Packages',
          translations: { 'pt-BR': '5. Módulos e pacotes' },
          items: versionedDocumentationSidebar('organization'),
        },
        {
          label: '6. Compile Time',
          translations: { 'pt-BR': '6. Tempo de compilação' },
          items: versionedDocumentationSidebar('compile-time'),
        },
        {
          label: '7. Runtime and Backends',
          translations: { 'pt-BR': '7. Runtime e backends' },
          items: versionedDocumentationSidebar('execution'),
        },
        {
          label: '8. Tooling',
          translations: { 'pt-BR': '8. Ferramentas' },
          items: versionedDocumentationSidebar('tooling'),
        },
        {
          label: '9. Reference',
          translations: { 'pt-BR': '9. Referência' },
          items: versionedDocumentationSidebar('reference'),
        },
        {
          slug: 'contributing',
        },
      ],
    }),
  ],
});
