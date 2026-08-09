/**
 * RFC 9727 API catalog.
 *
 * Serves the linkset describing every API this site publishes, so agents and
 * crawlers can find the OpenAPI description, the documentation and the status
 * resource without being told where they are.
 *
 * https://www.rfc-editor.org/rfc/rfc9727
 */
import { apiCatalog, jsonResponse, methodNotAllowed } from '../../src/content/api.mjs';

export function onRequest({ request }) {
  const rejected = methodNotAllowed(request.method);
  if (rejected) return rejected;

  const { origin } = new URL(request.url);

  // The bare media type, without a charset or profile parameter: RFC 9727
  // clients match on `application/linkset+json`, and JSON is UTF-8 already.
  return jsonResponse(apiCatalog(origin), {
    method: request.method,
    contentType: 'application/linkset+json',
  });
}
