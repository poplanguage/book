import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { createRequire } from 'node:module';

const pagefindUiPath = createRequire(import.meta.url)
  .resolve('@pagefind/default-ui')
  .replace('/cjs/ui-core.cjs', '/mjs/ui-core.mjs');

const repository = process.env.GITHUB_REPOSITORY;
const [owner, repositoryName] = repository?.split('/') ?? [];
const isUserPage = repositoryName?.toLowerCase() === `${owner?.toLowerCase()}.github.io`;
const base = repositoryName && !isUserPage ? `/${repositoryName}` : undefined;

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
      name: 'keyword.control.pop',
      match: '\\b(?:if|then|else|while|do|repeat|until|for|match|when|return|end)\\b',
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
    { name: 'constant.numeric.integer.pop', match: '\\b[0-9][0-9_]*\\b' },
    { name: 'keyword.operator.symbol.pop', match: '==|~=|[+\\-*/%<>=|?]' },
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
      },
      sidebar: [
        {
          label: '1. Getting Started',
          translations: { 'pt-br': '1. Primeiros passos' },
          items: [
            { autogenerate: { directory: '0.1.0-rc.2/start' } },
            { autogenerate: { directory: '0.1.0-rc.3/start' } },
          ],
        },
        {
          label: '2. Language Fundamentals',
          translations: { 'pt-br': '2. Fundamentos da linguagem' },
          items: [
            { autogenerate: { directory: '0.1.0-rc.2/language' } },
            { autogenerate: { directory: '0.1.0-rc.3/language' } },
          ],
        },
        {
          label: '3. Types',
          translations: { 'pt-br': '3. Tipos' },
          items: [
            { autogenerate: { directory: '0.1.0-rc.2/types' } },
            { autogenerate: { directory: '0.1.0-rc.3/types' } },
          ],
        },
        {
          label: '4. Data and Abstraction',
          translations: { 'pt-br': '4. Dados e abstração' },
          items: [
            { autogenerate: { directory: '0.1.0-rc.2/data' } },
            { autogenerate: { directory: '0.1.0-rc.3/data' } },
          ],
        },
        {
          label: '5. Modules and Packages',
          translations: { 'pt-br': '5. Módulos e pacotes' },
          items: [
            { autogenerate: { directory: '0.1.0-rc.2/organization' } },
            { autogenerate: { directory: '0.1.0-rc.3/organization' } },
          ],
        },
        {
          label: '6. Compile Time',
          translations: { 'pt-br': '6. Tempo de compilação' },
          items: [
            { autogenerate: { directory: '0.1.0-rc.2/compile-time' } },
            { autogenerate: { directory: '0.1.0-rc.3/compile-time' } },
          ],
        },
        {
          label: '7. Runtime and Backends',
          translations: { 'pt-br': '7. Runtime e backends' },
          items: [
            { autogenerate: { directory: '0.1.0-rc.2/execution' } },
            { autogenerate: { directory: '0.1.0-rc.3/execution' } },
          ],
        },
        {
          label: '8. Tooling',
          translations: { 'pt-br': '8. Ferramentas' },
          items: [
            { autogenerate: { directory: '0.1.0-rc.2/tooling' } },
            { autogenerate: { directory: '0.1.0-rc.3/tooling' } },
          ],
        },
        {
          label: '9. Reference',
          translations: { 'pt-br': '9. Referência' },
          items: [
            { autogenerate: { directory: '0.1.0-rc.2/reference' } },
            { autogenerate: { directory: '0.1.0-rc.3/reference' } },
          ],
        },
        {
          label: 'Contributing',
          translations: { 'pt-br': 'Contribuindo' },
          slug: 'contributing',
        },
      ],
    }),
  ],
});
