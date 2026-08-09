/**
 * Recently solved HackerRank challenges for the profile _kltk, proxied so
 * callers need no HackerRank credentials and no cross-origin request.
 *
 * HackerRank sits behind Akamai, which answers requests it dislikes with a
 * 200 OK carrying an HTML "Access Denied" page rather than an error status.
 * Every response is therefore checked twice — once for the status, once for the
 * media type — and anything that is not JSON becomes an RFC 9457 problem
 * document with a 502, the response the OpenAPI description promises.
 */
import { jsonResponse, methodNotAllowed, problemResponse } from '../../src/content/api.mjs';

const UPSTREAM =
  'https://www.hackerrank.com/rest/hackers/_kltk/recent_challenges?limit=1000&response_version=v2';

/**
 * Akamai scores requests partly on how ordinary the client looks, and the
 * runtime's default agent string is not that. Sending a browser's headers is
 * best-effort only: the edge IP still weighs against us, so the caller may see
 * a 502 whatever we send.
 */
const UPSTREAM_HEADERS = {
  accept: 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  referer: 'https://www.hackerrank.com/_kltk',
};

const badGateway = (method, detail) =>
  problemResponse({ method, status: 502, title: 'Bad Gateway', detail });

export async function onRequest({ request }) {
  const rejected = methodNotAllowed(request.method);
  if (rejected) return rejected;

  const { method } = request;
  let response;

  try {
    response = await fetch(UPSTREAM, { headers: UPSTREAM_HEADERS });
  } catch (error) {
    return badGateway(method, `HackerRank could not be reached: ${error.message}`);
  }

  if (!response.ok) {
    return badGateway(method, `HackerRank answered ${response.status} ${response.statusText}.`);
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.toLowerCase().includes('json')) {
    return badGateway(
      method,
      `HackerRank answered with ${contentType || 'no media type'} rather than JSON, which is how its bot protection refuses a request.`
    );
  }

  let payload;

  try {
    payload = await response.json();
  } catch (error) {
    return badGateway(method, `HackerRank sent a body that is not valid JSON: ${error.message}`);
  }

  return jsonResponse(payload, { method });
}
