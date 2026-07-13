import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const normalizedPath = context.url.pathname.replace(
    /\/0\.1\.0-rc\.(\d+)(?=\/|$)/g,
    '/010-rc$1',
  );

  if (normalizedPath !== context.url.pathname) {
    return context.redirect(`${normalizedPath}${context.url.search}`, 308);
  }

  return next();
});
