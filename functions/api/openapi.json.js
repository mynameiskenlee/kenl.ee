/**
 * The `service-desc` resource named by /.well-known/api-catalog: the OpenAPI
 * 3.1 description of every endpoint under /api.
 */
import { jsonResponse, methodNotAllowed, openApiDocument } from '../../src/content/api.mjs';

export function onRequest({ request }) {
  const rejected = methodNotAllowed(request.method);
  if (rejected) return rejected;

  const { origin } = new URL(request.url);

  return jsonResponse(openApiDocument(origin), {
    method: request.method,
    contentType: 'application/openapi+json',
  });
}
