/**
 * eGazette publishes each issue as a numbered PDF under /WriteReadData/<year>/.
 * There is no documented feed, so the listing page is parsed for those links and
 * treated as a change signal only. A parse that yields nothing is reported as
 * such rather than silently passing as "no changes".
 */
import type { SourceItem } from './indiacode';

const LISTING = [
  'https://egazette.gov.in/',
  'https://egazette.gov.in/(S(lq0kxb45kzs2))/Default.aspx',
];

const PDF_LINK = /href="([^"]*WriteReadData\/(\d{4})\/(\d+)\.pdf)"[^>]*>([^<]{0,200})</gi;

export async function fetchEgazette(): Promise<SourceItem[]> {
  for (const url of LISTING) {
    try {
      const res = await fetch(url, {
        headers: {
          accept: 'text/html',
          'user-agent': 'Mozilla/5.0 (compatible; SaathiLawSync/1.0)',
        },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) continue;

      const html = await res.text();
      const items: SourceItem[] = [];
      for (const match of html.matchAll(PDF_LINK)) {
        const [, href, year, id, label] = match;
        const title = label.replace(/\s+/g, ' ').trim() || `Gazette ${year}/${id}`;
        items.push({
          source: 'egazette',
          kind: 'notification',
          ref: `${year}/${id}`,
          title,
          url: new URL(href.replace(/^\.\//, '/'), 'https://egazette.gov.in/').toString(),
          publishedAt: year,
        });
        if (items.length >= 60) break;
      }
      if (items.length > 0) return items;
    } catch {
      // Try the next listing shape.
    }
  }
  return [];
}
