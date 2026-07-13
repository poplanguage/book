import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
  integrations: [
    starlight({
      title: 'Pop Book',
      description: 'Learn Pop Lang through small, verified examples.',
      favicon: '/favicon.svg',
      logo: {
        src: '../assets/pop.png',
        alt: 'Pop Lang',
        replacesTitle: false,
      },
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
          href: 'https://github.com/pop-lang/pop',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/pop-lang/pop/edit/master/popbook/',
      },
      lastUpdated: true,
      tableOfContents: false,
      components: {
        Header: './src/components/Header.astro',
        MobileMenuFooter: './src/components/MobileMenuFooter.astro',
      },
      sidebar: [
        {
          label: 'Start',
          translations: { 'pt-br': 'Início' },
          items: [{ autogenerate: { directory: '0.1.0-rc.2/start' } }],
        },
        {
          label: 'Language',
          translations: { 'pt-br': 'Linguagem' },
          items: [{ autogenerate: { directory: '0.1.0-rc.2/language' } }],
        },
        {
          label: 'Types',
          translations: { 'pt-br': 'Tipos' },
          items: [{ autogenerate: { directory: '0.1.0-rc.2/types' } }],
        },
        {
          label: 'Reference',
          translations: { 'pt-br': 'Referência' },
          items: [{ autogenerate: { directory: '0.1.0-rc.2/reference' } }],
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
