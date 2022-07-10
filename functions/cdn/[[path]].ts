export const onRequest: PagesFunction = ({ request, params }) => {
  const u = new URL(request.url);
  u.hostname = 'cdn.accsaber.com';
  u.pathname = Array.isArray(params.path) ? params.path.join('/') : params.path;

  return fetch(u, {
    ...request,
    cf: {
      cacheEverything: true,
      cacheTtl: 24 * 60 * 60, // 1 Day
    },
  });
};
