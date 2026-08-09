/**
 * Renders the markdown representation of every public page from site.json.
 *
 * Imported by functions/_middleware.js, which serves the result to requests
 * negotiating `Accept: text/markdown`. Kept free of any Node or Angular
 * dependency so it runs unchanged on the Cloudflare Workers runtime.
 */

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

const RENDERERS = {
  '/': homePage,
  '/about': aboutPage,
  '/experience': experiencePage,
};

/** Returns a `route -> markdown` map for every page with a markdown form. */
export function renderPages(content) {
  return new Map(
    Object.entries(RENDERERS).map(([route, render]) => [route, render(content)])
  );
}
