/**
 * Markdown content negotiation.
 *
 * Requests that accept `text/markdown` get the pre-rendered markdown
 * representation of the page (built by scripts/generate-markdown.mjs);
 * everything else gets the regular HTML app.
 *
 * https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

/** Public route -> markdown asset emitted into the build output. */
const MARKDOWN_ROUTES = new Map([
  ['/', '/index.md'],
  ['/about', '/about.md'],
  ['/experience', '/experience.md'],
]);

const NOT_FOUND = `# 404 — Page not found

No page exists at this address. See [https://kenl.ee](https://kenl.ee) for the site index.
`;

/** Normalises a pathname so `/about`, `/about/` and `/About` resolve alike. */
function normalise(pathname) {
  const lower = pathname.toLowerCase();
  return lower.length > 1 && lower.endsWith('/') ? lower.slice(0, -1) : lower;
}

/** True when the Accept header lists `text/markdown` with a non-zero q-value. */
function acceptsMarkdown(accept) {
  if (!accept) return false;

  return accept.split(',').some((entry) => {
    const [mediaType, ...parameters] = entry.trim().split(';');
    if (mediaType.trim().toLowerCase() !== 'text/markdown') return false;

    const quality = parameters
      .map((parameter) => parameter.trim().toLowerCase())
      .find((parameter) => parameter.startsWith('q='));

    return quality ? parseFloat(quality.slice(2)) > 0 : true;
  });
}

/**
 * Approximate token count, in the spirit of `x-markdown-tokens`: roughly one
 * token per four characters of a word, plus one per standalone symbol.
 */
function estimateTokens(text) {
  const words = text.match(/[\p{L}\p{N}]+/gu) ?? [];
  const symbols = text.match(/[^\s\p{L}\p{N}]/gu) ?? [];

  return words.reduce((total, word) => total + Math.ceil(word.length / 4), symbols.length);
}

function markdownResponse(body, { status = 200, method = 'GET' } = {}) {
  return new Response(method === 'HEAD' ? null : body, {
    status,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'content-length': String(new TextEncoder().encode(body).length),
      'x-markdown-tokens': String(estimateTokens(body)),
      vary: 'Accept',
      // Cloudflare's edge cache keys on URL and does not honour `Vary: Accept`,
      // so markdown must not be cached at a URL that also serves HTML.
      'cache-control': 'no-store',
    },
  });
}

/** Adds `Accept` to Vary so shared caches keep the two representations apart. */
async function htmlResponse(next) {
  const response = await next();
  const varied = new Response(response.body, response);
  const existing = varied.headers.get('vary');

  varied.headers.set('vary', existing && !/\baccept\b/i.test(existing) ? `${existing}, Accept` : existing ?? 'Accept');

  return varied;
}

export async function onRequest(context) {
  const { request, env, next } = context;

  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  const url = new URL(request.url);
  const pathname = normalise(url.pathname);
  const markdownPath = MARKDOWN_ROUTES.get(pathname);

  if (!acceptsMarkdown(request.headers.get('accept'))) {
    return markdownPath ? htmlResponse(next) : next();
  }

  if (markdownPath) {
    const assetRequest = new Request(new URL(markdownPath, url), { headers: { accept: 'text/plain' } });
    const asset = env.ASSETS ? await env.ASSETS.fetch(assetRequest) : await next(assetRequest);
    const body = asset.ok ? await asset.text() : '';

    // A missing .md falls through to the SPA shell; serve HTML rather than that.
    if (body && !body.trimStart().startsWith('<')) {
      return markdownResponse(body, { method: request.method });
    }

    return htmlResponse(next);
  }

  // Anything else — hashed bundles, images, /api routes — is served as-is.
  // Only the HTML shell that Pages falls back to for unknown routes, which has
  // no markdown representation, is answered with a markdown 404.
  const response = await next();
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.toLowerCase().includes('text/html')) return response;

  return markdownResponse(NOT_FOUND, { status: 404, method: request.method });
}
