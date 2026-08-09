/**
 * Generates the markdown representation of every public page from
 * src/content/site.json and writes it into the build output as `<route>.md`.
 *
 * functions/_middleware.js serves these files when a request negotiates
 * `Accept: text/markdown`. Run as part of `npm run build`, after `ng build`.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function readJson(path) {
  return JSON.parse(await readFile(join(projectRoot, path), 'utf8'));
}

/** Resolves the browser output directory configured in angular.json. */
function outputDir(angularConfig) {
  const project = Object.values(angularConfig.projects)[0];
  const outputPath = project.architect.build.options.outputPath;
  if (typeof outputPath === 'string') return join(projectRoot, outputPath);
  return join(projectRoot, outputPath.base, outputPath.browser ?? 'browser');
}

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

const PAGES = {
  'index.md': homePage,
  'about.md': aboutPage,
  'experience.md': experiencePage,
};

const [content, angularConfig] = await Promise.all([
  readJson('src/content/site.json'),
  readJson('angular.json'),
]);

const destination = outputDir(angularConfig);

await Promise.all(
  Object.entries(PAGES).map(async ([file, render]) => {
    await writeFile(join(destination, file), render(content), 'utf8');
    console.log(`generated ${join(destination, file)}`);
  })
);
