/**
 * The `service-doc` resource named by /.well-known/api-catalog: the human
 * documentation for everything under /api.
 *
 * The page is rendered from the same OpenAPI document served at
 * /api/openapi.json, so the prose cannot describe endpoints the machine
 * description does not have. The markdown representation of this route lives in
 * src/content/markdown.mjs and is served by the middleware to agents that
 * negotiate `Accept: text/markdown`.
 */
import { PATHS, methodNotAllowed, openApiDocument } from '../../src/content/api.mjs';

const escape = (value) =>
  String(value).replace(
    /[&<>"]/g,
    (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]
  );

const STYLES = `
  :root { color-scheme: light dark; }
  body {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    background-color: rgb(43, 137, 228);
    color: #ffffff;
    margin: 0;
    padding: 3rem 1.5rem 5rem;
    line-height: 1.6;
  }
  main { max-width: 46rem; margin: 0 auto; }
  h1 { font-size: 2rem; margin: 0 0 .25rem; }
  h2 { font-size: 1.25rem; margin: 3rem 0 .5rem; }
  h3 { font-size: 1rem; margin: 1.5rem 0 .25rem; text-transform: uppercase; letter-spacing: .08em; opacity: .75; }
  p, li { color: rgba(255, 255, 255, .85); }
  a { color: #ffffff; }
  code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .9rem; }
  code { background: rgba(0, 0, 0, .25); border-radius: .25rem; padding: .1rem .35rem; }
  pre { background: rgba(0, 0, 0, .25); border-radius: .5rem; padding: 1rem; overflow-x: auto; }
  pre code { background: none; padding: 0; }
  dl { display: grid; grid-template-columns: auto 1fr; gap: .25rem 1rem; margin: .5rem 0; }
  dt { font-weight: 500; }
  dd { margin: 0; color: rgba(255, 255, 255, .85); }
  .endpoint { border-top: 1px solid rgba(255, 255, 255, .25); padding-top: 1.5rem; margin-top: 2.5rem; }
  .endpoint h2 { margin-top: 0; }
  .method { font-weight: 500; letter-spacing: .05em; }
  @media (max-width: 30rem) {
    dl { grid-template-columns: 1fr; gap: 0 0; }
    dt { margin-top: .5rem; }
  }
  @media (prefers-color-scheme: dark) {
    body { background-color: #212121; }
  }
`;

function endpointSection(path, operation, baseUrl) {
  const responses = Object.entries(operation.responses)
    .map(
      ([status, response]) =>
        `<dt><code>${escape(status)}</code></dt><dd>${escape(response.description)}</dd>`
    )
    .join('');

  return `<section class="endpoint">
      <h2 id="${escape(operation.operationId)}"><span class="method">GET</span> <code>${escape(path)}</code></h2>
      <p>${escape(operation.description)}</p>
      <h3>Responses</h3>
      <dl>${responses}</dl>
      <h3>Example</h3>
      <pre><code>curl ${escape(baseUrl)}${escape(path)}</code></pre>
    </section>`;
}

function page(baseUrl) {
  const document = openApiDocument(baseUrl);
  const endpoints = Object.entries(document.paths)
    .map(([path, item]) => endpointSection(path, item.get, baseUrl))
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escape(document.info.title)} — Documentation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(document.info.description)}">
  <link rel="icon" type="image/svg+xml" href="/assets/logo.svg">
  <link rel="service-desc" href="${escape(PATHS.openapi)}" type="application/openapi+json">
  <link rel="api-catalog" href="${escape(PATHS.catalog)}" type="application/linkset+json">
  <style>${STYLES}</style>
</head>
<body>
  <main>
    <h1>${escape(document.info.title)}</h1>
    <p>${escape(document.info.description)}</p>

    <h2>Discovery</h2>
    <dl>
      <dt>Catalog</dt>
      <dd><a href="${escape(PATHS.catalog)}"><code>${escape(PATHS.catalog)}</code></a> — RFC 9727 linkset</dd>
      <dt>Description</dt>
      <dd><a href="${escape(PATHS.openapi)}"><code>${escape(PATHS.openapi)}</code></a> — OpenAPI ${escape(document.openapi)}</dd>
      <dt>Status</dt>
      <dd><a href="${escape(PATHS.health)}"><code>${escape(PATHS.health)}</code></a></dd>
    </dl>
    <p>Every endpoint is unauthenticated, read-only and answers <code>GET</code> and <code>HEAD</code>. Responses carry <code>Access-Control-Allow-Origin: *</code>.</p>

${endpoints}

    <p><a href="${escape(baseUrl)}/">${escape(baseUrl)}</a></p>
  </main>
</body>
</html>
`;
}

export function onRequest({ request }) {
  const rejected = methodNotAllowed(request.method);
  if (rejected) return rejected;

  const { origin } = new URL(request.url);
  const body = page(origin);

  return new Response(request.method === 'HEAD' ? null : body, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=3600',
      vary: 'Accept',
    },
  });
}
