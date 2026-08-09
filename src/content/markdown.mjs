/**
 * Renders the markdown representation of every public page from site.json.
 *
 * Imported by functions/_middleware.js, which serves the result to requests
 * negotiating `Accept: text/markdown`. Kept free of any Node or Angular
 * dependency so it runs unchanged on the Cloudflare Workers runtime.
 */
import { PATHS, openApiDocument } from './api.mjs';

const bullets = (lines) => lines.map((line) => `- ${line}`).join('\n');

function homePage({ site, pages }) {
  const links = pages
    .filter((page) => page.path !== '/')
    .map((page) => `- [${page.title}](${site.url}${page.path}) — ${page.summary}`)
    .join('\n');

  return `# ${site.name}

> ${site.tagline}

${site.role}. Focus areas: ${site.focus}.

## Pages

${links}
`;
}

function aboutPage({ site }) {
  const links = site.social.map((link) => `- [${link.label}](${link.url})`).join('\n');

  return `# ${site.name}

${site.role}

${site.focus}

## Elsewhere

${links}
`;
}

function experiencePage({ site, experiences, educations, projects }) {
  const roles = experiences.map((exp) => `### ${exp.title} — ${exp.company}

${exp.location} · ${exp.period}

${bullets(exp.descriptions)}`);

  const schools = educations.map((edu) => `### ${edu.degree}

${edu.institution} · ${edu.location} · ${edu.period}

${bullets(edu.descriptions)}`);

  const built = projects.map((proj) => `### [${proj.title}](${proj.link})

${proj.technologies} · ${proj.period}

${bullets(proj.descriptions)}`);

  return `# ${site.name} — Experience

## Work Experience

${roles.join('\n\n')}

## Education

${schools.join('\n\n')}

## Projects

${built.join('\n\n')}
`;
}

/**
 * Markdown twin of the HTML page served by functions/api/docs.js. Both are
 * rendered from the OpenAPI document, so neither can describe an endpoint the
 * machine-readable description does not have.
 */
function apiDocsPage({ site }) {
  const document = openApiDocument(site.url);

  const endpoints = Object.entries(document.paths).map(([path, item]) => {
    const responses = Object.entries(item.get.responses).map(
      ([status, response]) => `\`${status}\` — ${response.description}`
    );

    return `### GET ${path}

${item.get.description}

${bullets(responses)}

\`\`\`
curl ${site.url}${path}
\`\`\``;
  });

  return `# ${document.info.title}

${document.info.description}

## Discovery

- [\`${PATHS.catalog}\`](${site.url}${PATHS.catalog}) — RFC 9727 catalog
- [\`${PATHS.openapi}\`](${site.url}${PATHS.openapi}) — OpenAPI ${document.openapi} description
- [\`${PATHS.health}\`](${site.url}${PATHS.health}) — status

Every endpoint is unauthenticated, read-only and answers \`GET\` and \`HEAD\`. Responses carry \`Access-Control-Allow-Origin: *\`.

## Endpoints

${endpoints.join('\n\n')}
`;
}

const RENDERERS = {
  '/': homePage,
  '/about': aboutPage,
  '/experience': experiencePage,
  [PATHS.docs]: apiDocsPage,
};

/** Returns a `route -> markdown` map for every page with a markdown form. */
export function renderPages(content) {
  return new Map(
    Object.entries(RENDERERS).map(([route, render]) => [route, render(content)])
  );
}
