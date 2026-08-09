/**
 * The `status` resource named by /.well-known/api-catalog.
 *
 * Reports that the edge functions behind /api are serving requests. It does not
 * reach out to the upstreams those endpoints proxy, so it stays cheap enough to
 * poll and cannot be used to amplify traffic at anyone else.
 */
import { APIS, jsonResponse, methodNotAllowed } from '../../src/content/api.mjs';

export function onRequest({ request }) {
  const rejected = methodNotAllowed(request.method);
  if (rejected) return rejected;

  const { origin } = new URL(request.url);

  return jsonResponse(
    {
      status: 'operational',
      checkedAt: new Date().toISOString(),
      apis: APIS.map((api) => `${origin}${api.path}`),
    },
    { method: request.method, maxAge: 60 }
  );
}
