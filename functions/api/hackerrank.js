/**
 * Example someHost is set up to take in a JSON request
 * Replace url with the host you wish to send requests to
 * @param {string} someHost the host to send the request to
 * @param {string} url the URL to send the request to
 */
 const someHost = 'https://www.hackerrank.com/rest/hackers/_kltk';
 const url = someHost + '/recent_challenges?limit=1000&response_version=v2';
 
 /**
  * gatherResponse awaits and returns a response body as a string.
  * Use await gatherResponse(..) in an async function to get the response body
  * @param {Response} response
  */
 async function gatherResponse(response) {
   const { headers } = response;
   const contentType = headers.get('content-type') || '';
   if (contentType.includes('application/json')) {
     return JSON.stringify(await response.json());
   }
   return response.text();
 }
 
 async function handleRequest() {
   const init = {
     headers: {
       'content-type': 'application/json;charset=UTF-8',
     },
   };
   const response = await fetch(url, init);
   const results = await gatherResponse(response);
   return new Response(results, init);
 }
 
 addEventListener('fetch', event => {
   return event.respondWith(handleRequest());
 });
 