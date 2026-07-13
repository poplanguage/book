const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function bookPath(path: string): string {
  return `${base}/${path.replace(/^\/+/, '')}`.replace(/\/+/g, '/');
}
