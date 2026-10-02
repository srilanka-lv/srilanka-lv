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

const metaContent = (html: string, attribute: 'name' | 'property', key: string) =>
  html.match(new RegExp(`<meta ${attribute}="${key}" content="([^"]*)"`))?.[1];

const decode = (value: string) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

/**
 * The girls trip page against Google's rich result requirements, checked
 * offline: FAQPage questions with answers, a complete VideoObject, a usable
 * Offer, search-sized title and description, and no unfilled TODO_GRIETA
 * placeholder anywhere a search engine reads.
 */
async function validateGirlsTrip(path: string) {
  const html = await fetchHtml(path);
  const nodes = extractLdNodes(html, path);

  const trip = nodes.find((node) => node['@type'] === 'TouristTrip') as LdNode | undefined;
  const offer = trip?.offers as LdNode | undefined;
  const offerMissing = ['price', 'priceCurrency', 'availability', 'url', 'validThrough'].filter(
    (field) => !offer?.[field],
  );
  if (!offer || offerMissing.length > 0) {
    fail(path, `Offer missing fields: ${offerMissing.join(', ') || 'offers'}`);
  } else {
    ok(`${path}: Offer ${offer.price} ${offer.priceCurrency}, ${offer.availability}`);
  }

  const video = trip?.video as LdNode | undefined;
  const videoMissing = ['name', 'description', 'thumbnailUrl', 'uploadDate'].filter(
    (field) => !video?.[field],
  );
  if (!video?.contentUrl && !video?.embedUrl) {
    videoMissing.push('contentUrl or embedUrl');
  }
  if (videoMissing.length > 0) {
    fail(path, `VideoObject missing fields: ${videoMissing.join(', ')}`);
  } else {
    ok(`${path}: VideoObject (thumbnail ${String(video?.thumbnailUrl).split('/').pop()})`);
  }

  const faqPage = nodes.find((node) => node['@type'] === 'FAQPage');
  const questions = (faqPage?.mainEntity ?? []) as LdNode[];
  const incomplete = questions.filter(
    (question) => !question.name || !(question.acceptedAnswer as LdNode | undefined)?.text,
  );
  if (questions.length === 0 || incomplete.length > 0) {
    fail(path, `FAQPage has ${questions.length} questions, ${incomplete.length} incomplete`);
  } else {
    ok(`${path}: FAQPage with ${questions.length} answered questions`);
  }

  // Inline SVG icons carry <title>s too; the document title is the one with
  // the root layout's " | Šrilanka 26/27" suffix.
  const pageTitle = decode(
    [...html.matchAll(/<title>([^<]*)<\/title>/g)]
      .map((match) => match[1])
      .find((value) => value.includes(' | ')) ?? '',
  );
  const description = decode(metaContent(html, 'name', 'description') ?? '');
  if (pageTitle.length > 60 || description.length === 0 || description.length > 155) {
    fail(path, `title ${pageTitle.length} chars, description ${description.length} chars`);
  } else {
    ok(`${path}: title ${pageTitle.length} chars, description ${description.length} chars`);
  }

  if (!metaContent(html, 'property', 'og:image')) {
    fail(path, 'missing og:image');
  }

  const searchable = [
    pageTitle,
    description,
    metaContent(html, 'property', 'og:title') ?? '',
    metaContent(html, 'property', 'og:description') ?? '',
    JSON.stringify(nodes),
  ].join(' ');
  if (searchable.includes('TODO_GRIETA:')) {
    fail(path, 'a TODO_GRIETA placeholder reached the metadata or JSON-LD');
  } else {
    ok(`${path}: no placeholder in metadata or JSON-LD`);
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
    ['TouristTrip', ['name', 'description', 'provider', 'offers', 'itinerary', 'image']],
  ]);
  await validateGirlsTrip('/produkti/meitenu-celojums-uz-srilanku');
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
