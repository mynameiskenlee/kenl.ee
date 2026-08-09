/**
 * Markdown content negotiation.
 *
 * Requests that accept `text/markdown` get a markdown representation of the
 * page; everything else gets the regular HTML app. The markdown is rendered
 * from the same src/content/site.json the Angular components read, at module
 * load rather than per request, so it cannot drift from the site and does not
 * depend on the build command running an extra step.
 *
 * https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */
import content from '../src/content/site.json';
import { DISCOVERY_LINK } from '../src/content/api.mjs';
import { renderPages } from '../src/content/markdown.mjs';

/** Public route -> markdown body. */
const MARKDOWN_ROUTES = renderPages(content);

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
      link: DISCOVERY_LINK,
      vary: 'Accept',
      // Cloudflare's edge cache keys on URL and does not honour `Vary: Accept`,
      // so markdown must not be cached at a URL that also serves HTML.
      'cache-control': 'no-store',
    },
  });
}

/**
 * Adds `Accept` to Vary so shared caches keep the two representations apart,
 * and the discovery links to the head of the page. Appending rather than
 * setting leaves any `Link` the static asset already carries in place; RFC 8288
 * §3 reads repeated field lines as one list.
 */
async function htmlResponse(next) {
  const response = await next();
  const varied = new Response(response.body, response);
  const existing = varied.headers.get('vary');

  varied.headers.set('vary', existing && !/\baccept\b/i.test(existing) ? `${existing}, Accept` : existing ?? 'Accept');
  varied.headers.append('link', DISCOVERY_LINK);

  return varied;
}

export async function onRequest(context) {
  const { request, next } = context;

  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  const pathname = normalise(new URL(request.url).pathname);
  const markdown = MARKDOWN_ROUTES.get(pathname);

  if (!acceptsMarkdown(request.headers.get('accept'))) {
    return markdown ? htmlResponse(next) : next();
  }

  if (markdown) return markdownResponse(markdown, { method: request.method });

  // Anything else — hashed bundles, images, /api routes — is served as-is.
  // Only the HTML shell that Pages falls back to for unknown routes, which has
  // no markdown representation, is answered with a markdown 404.
  const response = await next();
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.toLowerCase().includes('text/html')) return response;

  return markdownResponse(NOT_FOUND, { status: 404, method: request.method });
}
