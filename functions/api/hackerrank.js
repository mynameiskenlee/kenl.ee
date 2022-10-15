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
 
 export async function onRequest(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
      } = context;
   const init = {
     headers: {
       'content-type': 'application/json;charset=UTF-8',
     },
   };
   const response = await fetch(url);
   const results = await gatherResponse(response);
   return new Response(results, init);
 }
  
  
 