/**
 * Submits all sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver).
 *
 * Run after a deploy, once the site is live (IndexNow verifies the key file
 * at {site}/{key}.txt): `bun scripts/submit-indexnow.ts`
 *
 * Requires INDEXNOW_KEY and NEXT_PUBLIC_SELF_URL (or SITE_URL) in the env.
 */

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  const siteUrl = (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SELF_URL)?.replace(/\/$/, '');
  const key = process.env.INDEXNOW_KEY;

  if (!siteUrl || !key) {
    console.error('Missing SITE_URL/NEXT_PUBLIC_SELF_URL or INDEXNOW_KEY');
    process.exit(1);
  }

  const sitemapResponse = await fetch(`${siteUrl}/sitemap.xml`);
  if (!sitemapResponse.ok) {
    console.error(`Failed to fetch sitemap: ${sitemapResponse.status}`);
    process.exit(1);
  }

  const xml = await sitemapResponse.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  if (urlList.length === 0) {
    console.error('No URLs found in sitemap');
    process.exit(1);
  }

  const host = new URL(siteUrl).host;
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${siteUrl}/${key}.txt`,
      urlList,
    }),
  });

  if (!response.ok && response.status !== 202) {
    console.error(`IndexNow submission failed: ${response.status} ${await response.text()}`);
    process.exit(1);
  }

  console.log(`Submitted ${urlList.length} URLs to IndexNow (status ${response.status})`);
}

main();

export {};
