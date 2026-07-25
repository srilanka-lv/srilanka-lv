/**
 * Validates JSON-LD, llms.txt, and sitemap health against a running server.
 *
 * `bun scripts/validate-seo.ts` (BASE_URL env overrides http://localhost:3000)
 */

const BASE = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

type LdNode = Record<string, unknown> & { '@type'?: string };

let failures = 0;

function fail(page: string, message: string) {
  failures += 1;
  console.error(`  ✗ ${page}: ${message}`);
}

function ok(message: string) {
  console.log(`  ✓ ${message}`);
}

async function fetchHtml(path: string): Promise<string> {
  const response = await fetch(`${BASE}${path}`);
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }
  return response.text();
}

function extractLdNodes(html: string, page: string): LdNode[] {
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const nodes: LdNode[] = [];

  for (const [, raw] of scripts) {
    try {
      const parsed = JSON.parse(raw);
      const graph = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
      nodes.push(...graph);
    } catch {
      fail(page, 'JSON-LD failed to parse');
    }
  }

  return nodes;
}

function requireNode(
  nodes: LdNode[],
  page: string,
  type: string,
  requiredFields: string[] = [],
): void {
  const node = nodes.find((candidate) => candidate['@type'] === type);
  if (!node) {
    fail(page, `missing ${type} node`);
    return;
  }

  const missing = requiredFields.filter(
    (field) => node[field] === undefined || node[field] === null || node[field] === '',
  );
  if (missing.length > 0) {
    fail(page, `${type} missing fields: ${missing.join(', ')}`);
    return;
  }

  ok(`${page}: ${type}${requiredFields.length > 0 ? ` (${requiredFields.length} fields)` : ''}`);
}

async function validatePage(path: string, checks: [string, string[]][]) {
  const html = await fetchHtml(path);
  const nodes = extractLdNodes(html, path);
  for (const [type, fields] of checks) {
    requireNode(nodes, path, type, fields);
  }
}

async function firstBlogPath(): Promise<string | null> {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const blogUrl = urls.find((url) => url.includes('/blogi/'));
  return blogUrl ? new URL(blogUrl).pathname : null;
}

async function checkUrls(urls: string[], label: string) {
  let broken = 0;
  for (const url of urls) {
    const local = url.replace(/^https?:\/\/[^/]+/, BASE);
    const response = await fetch(local, { method: 'GET' });
    if (response.status >= 400) {
      broken += 1;
      fail(label, `${url} -> ${response.status}`);
    }
  }
  if (broken === 0) {
    ok(`${label}: all ${urls.length} URLs respond`);
  }
}

async function main() {
  const articleFields = [
    'headline',
    'datePublished',
    'dateModified',
    'author',
    'publisher',
    'mainEntityOfPage',
    'inLanguage',
  ];

  console.log('JSON-LD checks');
  await validatePage('/', [
    ['Organization', ['name', 'url', 'logo', 'sameAs']],
    ['WebSite', ['name', 'url', 'inLanguage']],
    ['Person', ['name', 'description', 'url', 'sameAs']],
    ['FAQPage', ['mainEntity']],
  ]);

  await validatePage('/ko-darit-un-ko-nedarit-srilankas-brivdienas', [
    ['Article', articleFields],
    ['Person', ['name']],
    ['Organization', ['name']],
  ]);

  const blogPath = await firstBlogPath();
  if (blogPath) {
    await validatePage(blogPath, [
      ['BlogPosting', articleFields],
      ['Person', ['name']],
      ['Organization', ['name']],
    ]);
  } else {
    fail('blog', 'no blog URL found in sitemap');
  }

  await validatePage('/produkti/meitenu-celojums-uz-srilanku', [
    ['TouristTrip', ['name', 'description', 'provider', 'offers']],
  ]);
  await validatePage('/produkti/srilankas-brivdienu-konsultacijas', [
    ['Product', ['name', 'description', 'brand']],
  ]);
  await validatePage('/produkti/personalizets-celojuma-plans-uz-srilanku', [
    ['Product', ['name', 'description', 'brand']],
  ]);
  await validatePage('/par-mani', [
    ['AboutPage', ['name', 'url', 'mainEntity']],
    ['Person', ['name', 'description']],
  ]);

  console.log('\nllms.txt checks');
  const llmsResponse = await fetch(`${BASE}/llms.txt`);
  const contentType = llmsResponse.headers.get('content-type') ?? '';
  if (!contentType.includes('text/markdown')) {
    fail('/llms.txt', `content-type is ${contentType}`);
  } else {
    ok('/llms.txt: text/markdown');
  }
  const llms = await llmsResponse.text();
  const llmsUrls = [...llms.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);
  await checkUrls(llmsUrls, 'llms.txt links');

  console.log('\nsitemap checks');
  const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .filter((url) => !url.includes('cdn.sanity.io'));
  const lastmodCount = [...sitemapXml.matchAll(/<lastmod>/g)].length;
  ok(`sitemap: ${sitemapUrls.length} URLs, ${lastmodCount} with lastmod`);
  await checkUrls(sitemapUrls, 'sitemap URLs');

  console.log('\nimage SEO checks');
  for (const path of ['/', blogPath ?? '/blogi']) {
    const html = await fetchHtml(path);
    if (/<meta name="robots" content="[^"]*max-image-preview:large[^"]*"/.test(html)) {
      ok(`${path}: robots meta with max-image-preview:large`);
    } else {
      fail(path, 'missing robots meta with max-image-preview:large');
    }
  }

  if (sitemapXml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')) {
    ok('sitemap: image namespace declared');
  } else {
    fail('sitemap', 'missing image namespace');
  }

  const imageLocs = [...sitemapXml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(
    (match) => match[1],
  );
  const sanityLocs = imageLocs.filter((url) => url.startsWith('https://cdn.sanity.io/'));
  if (sanityLocs.length === 0) {
    fail('sitemap', 'no cdn.sanity.io <image:loc> entries found');
  } else {
    ok(`sitemap: ${sanityLocs.length} cdn.sanity.io image entries`);
    const probe = await fetch(sanityLocs[0], { method: 'HEAD' });
    if (probe.ok) {
      ok(`sitemap: first image URL returns ${probe.status}`);
    } else {
      fail('sitemap', `first image URL returned ${probe.status}`);
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} failure(s)`);
    process.exit(1);
  }
  console.log('\nAll SEO checks passed');
}

main();

export {};
