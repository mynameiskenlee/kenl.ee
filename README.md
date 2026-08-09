# Kenl.Ee

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
This runs `ng build` followed by `scripts/generate-markdown.mjs`, so use it rather than a bare `ng build` for anything that will be deployed.

## Markdown for agents

Page content lives in `src/content/site.json` and is consumed twice: by the Angular components, and by `scripts/generate-markdown.mjs`, which emits `index.md`, `about.md` and `experience.md` into the build output. `functions/_middleware.js` serves those files with `Content-Type: text/markdown` when a request negotiates `Accept: text/markdown`, and serves the usual HTML otherwise.

```
curl -H 'Accept: text/markdown' https://kenl.ee/experience
```

When adding a route, add it to `src/app/app-routing.module.ts`, `src/sitemap.xml`, the `PAGES` map in the generator and the `MARKDOWN_ROUTES` map in the middleware.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
