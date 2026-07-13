import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';

type SidebarEntry = StarlightRouteData['sidebar'][number];
type SidebarLink = Extract<SidebarEntry, { type: 'link' }>;

function flatten(entries: SidebarEntry[]): SidebarLink[] {
  return entries.flatMap((entry) => (entry.type === 'group' ? flatten(entry.entries) : entry));
}

function forVersion(entries: SidebarEntry[], versionPath: string): SidebarEntry[] {
  const filtered: SidebarEntry[] = [];

  for (const entry of entries) {
    if (entry.type === 'link') {
      const isVersioned = /\/010-rc\d+(?:\/|$)/.test(entry.href);
      if (!isVersioned || entry.href.includes(versionPath)) filtered.push(entry);
      continue;
    }

    const versionEntries = forVersion(entry.entries, versionPath);
    if (versionEntries.length > 0) filtered.push({ ...entry, entries: versionEntries });
  }

  return filtered;
}

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const selectedVersion = context.url.pathname.match(/\/010-(rc\d+)(?:\/|$)/)?.[1];

  if (!selectedVersion) return;

  route.head.push({
    tag: 'meta',
    attrs: { 'data-pagefind-filter': 'version', content: selectedVersion },
  });

  route.sidebar = forVersion(route.sidebar, `/010-${selectedVersion}/`);

  const links = flatten(route.sidebar);
  const currentIndex = links.findIndex((link) => link.isCurrent);
  route.pagination = {
    prev: currentIndex > 0 ? links[currentIndex - 1] : undefined,
    next: currentIndex >= 0 ? links[currentIndex + 1] : undefined,
  };
});
