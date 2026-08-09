/**
 * The site's public HTTP API, described once and served four ways: the RFC 9727
 * catalog at /.well-known/api-catalog, the OpenAPI description at
 * /api/openapi.json, the human documentation at /api/docs, and the status
 * document at /api/health.
 *
 * Kept free of any Node or Angular dependency, like src/content/markdown.mjs,
 * so it runs unchanged on the Cloudflare Workers runtime.
 *
 * https://www.rfc-editor.org/rfc/rfc9727
 */

/** Where each representation lives, relative to the site root. */
export const PATHS = {
  catalog: '/.well-known/api-catalog',
  openapi: '/api/openapi.json',
  docs: '/api/docs',
  health: '/api/health',
};

/**
 * Every API this site publishes. Each entry becomes one linkset member in the
 * catalog and one path in the OpenAPI description.
 */
export const APIS = [
  {
    id: 'hackerrank',
    path: '/api/hackerrank',
    title: 'HackerRank recent challenges',
    summary:
      'Recently solved HackerRank challenges for the profile _kltk, proxied at the edge so callers need no HackerRank credentials and no cross-origin request.',
  },
];

const HACKERRANK_CHALLENGE = {
  type: 'object',
  title: 'Challenge',
  properties: {
    name: { type: 'string', description: 'Challenge title.', examples: ['Cycle Detection'] },
    ch_slug: {
      type: 'string',
      description: 'Challenge slug.',
      examples: ['detect-whether-a-linked-list-contains-a-cycle'],
    },
    con_slug: { type: 'string', description: 'Contest the challenge belongs to.', examples: ['master'] },
    created_at: { type: 'string', format: 'date-time', description: 'When the challenge was solved.' },
    url: {
      type: 'string',
      description: 'Challenge path, relative to https://www.hackerrank.com.',
      examples: ['/challenges/detect-whether-a-linked-list-contains-a-cycle'],
    },
  },
};

const PROBLEM_DETAIL = {
  type: 'object',
  title: 'Problem',
  description: 'Error representation, per RFC 9457.',
  properties: {
    type: { type: 'string', format: 'uri' },
    title: { type: 'string' },
    status: { type: 'integer' },
    detail: { type: 'string' },
  },
};

/** The OpenAPI 3.1 description served at /api/openapi.json. */
export function openApiDocument(baseUrl) {
  return {
    openapi: '3.1.0',
    info: {
      title: 'kenl.ee API',
      version: '1.0.0',
      summary: 'Read-only endpoints behind kenl.ee.',
      description:
        'Small, unauthenticated, read-only API behind https://kenl.ee. Discoverable through the RFC 9727 catalog at /.well-known/api-catalog.',
      contact: { name: 'Ken Lee', url: 'https://kenl.ee/about' },
    },
    servers: [{ url: baseUrl, description: 'Production' }],
    externalDocs: { description: 'Human documentation', url: `${baseUrl}${PATHS.docs}` },
    paths: {
      '/api/hackerrank': {
        get: {
          operationId: 'listRecentChallenges',
          summary: 'List recently solved HackerRank challenges',
          description:
            'Proxies the HackerRank REST profile feed for the user _kltk and returns its payload verbatim. Unauthenticated; no request parameters.',
          responses: {
            200: {
              description: 'The HackerRank feed, passed through unchanged.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      models: { type: 'array', items: HACKERRANK_CHALLENGE },
                      cursor: { type: 'string', description: 'Opaque pagination cursor from HackerRank.' },
                      last_page: { type: 'boolean' },
                      response_version: { type: 'string', examples: ['v2'] },
                    },
                  },
                },
              },
            },
            502: {
              description: 'HackerRank was unreachable or refused the request.',
              content: { 'application/problem+json': { schema: PROBLEM_DETAIL } },
            },
          },
        },
      },
      '/api/health': {
        get: {
          operationId: 'getStatus',
          summary: 'Status of the API',
          description:
            'Liveness of the edge functions serving this API. Linked from the catalog as the `status` resource of every API listed there.',
          responses: {
            200: {
              description: 'The API is serving requests.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['status'],
                    properties: {
                      status: { type: 'string', enum: ['operational'] },
                      checkedAt: { type: 'string', format: 'date-time' },
                      apis: {
                        type: 'array',
                        description: 'The APIs this status document covers.',
                        items: { type: 'string', format: 'uri' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}

/**
 * Answers anything other than GET and HEAD with 405, or returns null when the
 * method is fine. HEAD is handled by returning a bodiless response elsewhere.
 */
export function methodNotAllowed(method) {
  if (method === 'GET' || method === 'HEAD') return null;

  return new Response(null, { status: 405, headers: { allow: 'GET, HEAD' } });
}

/**
 * A JSON response with the CORS and caching headers every API route shares.
 * `maxAge: 0` means the response must not be stored at all, which is what an
 * error representation wants: the next caller should reach the origin again.
 */
export function jsonResponse(
  body,
  { method = 'GET', status = 200, contentType = 'application/json', maxAge = 3600 } = {}
) {
  const serialised = `${JSON.stringify(body, null, 2)}\n`;

  return new Response(method === 'HEAD' ? null : serialised, {
    status,
    headers: {
      'content-type': contentType,
      'content-length': String(new TextEncoder().encode(serialised).length),
      'access-control-allow-origin': '*',
      'cache-control': maxAge === 0 ? 'no-store' : `public, max-age=${maxAge}`,
    },
  });
}

/**
 * An RFC 9457 problem document, shaped like the `Problem` schema the OpenAPI
 * description names. `type` stays `about:blank` because this site publishes no
 * problem-type registry; RFC 9457 §4.2.1 then asks that `title` be the status
 * phrase, leaving `detail` to say what actually went wrong.
 */
export function problemResponse({ method = 'GET', status, title, detail }) {
  return jsonResponse(
    { type: 'about:blank', title, status, detail },
    { method, status, contentType: 'application/problem+json', maxAge: 0 }
  );
}

/**
 * The RFC 9727 catalog served at /.well-known/api-catalog: one linkset member
 * per API, each anchored at the API's entry point and carrying the
 * `service-desc`, `service-doc` and `status` relations from RFC 8631.
 */
export function apiCatalog(baseUrl) {
  return {
    linkset: APIS.map((api) => ({
      anchor: `${baseUrl}${api.path}`,
      'service-desc': [
        {
          href: `${baseUrl}${PATHS.openapi}`,
          type: 'application/openapi+json',
          title: 'OpenAPI 3.1 description',
        },
      ],
      'service-doc': [
        { href: `${baseUrl}${PATHS.docs}`, type: 'text/html', title: `${api.title} — documentation` },
      ],
      status: [{ href: `${baseUrl}${PATHS.health}`, type: 'application/json', title: 'API status' }],
    })),
  };
}
