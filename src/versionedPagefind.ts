// @ts-expect-error — Pagefind does not publish declarations for this browser entry point.
import { PagefindUI as DefaultPagefindUI } from 'pagefind-default-ui-original';

type PagefindOptions = Record<string, unknown>;

export class PagefindUI extends DefaultPagefindUI {
  constructor(options: PagefindOptions) {
    const selectedVersion = window.location.pathname.match(/\/010-(rc\d+)(?:\/|$)/)?.[1];

    super({
      ...options,
      ...(selectedVersion ? { filters: { version: selectedVersion } } : {}),
    });
  }
}
