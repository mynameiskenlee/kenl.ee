# Kenl.Ee

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Markdown for agents

Page content lives in `src/content/site.json` and is consumed twice: by the Angular components, and by `src/content/markdown.mjs`, which renders the markdown form of each page. The Cloudflare Pages Function in `functions/_middleware.js` serves that markdown with `Content-Type: text/markdown` when a request negotiates `Accept: text/markdown`, and serves the usual HTML otherwise. Rendering happens in the Function, so no extra build step is involved.

```
curl -H 'Accept: text/markdown' https://kenl.ee/experience
```

When adding a route, add it to `src/app/app-routing.module.ts`, `src/sitemap.xml` and the `RENDERERS` map in `src/content/markdown.mjs`.

## API catalog

The site publishes an [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727) catalog so agents can discover its API without being told where it is:

```
curl https://kenl.ee/.well-known/api-catalog
```

The catalog is a `application/linkset+json` document with one entry per API, each anchored at the API's entry point and pointing at three resources:

| Relation       | Route                | Served by                      |
| -------------- | -------------------- | ------------------------------ |
| `service-desc` | `/api/openapi.json`  | `functions/api/openapi.json.js` |
| `service-doc`  | `/api/docs`          | `functions/api/docs.js`         |
| `status`       | `/api/health`        | `functions/api/health.js`       |

All four are rendered from `src/content/api.mjs`, which holds the API list and the OpenAPI 3.1 document. Adding an endpoint means editing that one file: the catalog, the description, the HTML docs page and its markdown twin in `src/content/markdown.mjs` all follow.

Every page also advertises the catalog in its response head, per [RFC 9727 §3](https://www.rfc-editor.org/rfc/rfc9727#section-3), so an agent finds the API without fetching a body first:

```
curl -sI https://kenl.ee | grep -i '^link:'
```

`functions/_middleware.js` attaches `DISCOVERY_LINK` from `src/content/api.mjs` to both the HTML and the markdown representation of each page. The targets are relative references, which [RFC 8288 §3](https://www.rfc-editor.org/rfc/rfc8288#section-3) resolves against the request URI, so the header is identical on `kenl.ee` and on a preview deploy.

To exercise the Function locally, build first and then serve the output through the Pages runtime:

```
npx wrangler pages dev dist/kenl.ee
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
