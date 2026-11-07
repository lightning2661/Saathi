/**
 * data.gov.in requires a free API key per account. Without one the adapter
 * reports itself unconfigured instead of failing the whole sync run.
 */
import type { SourceItem } from './indiacode';

const CATALOG = 'https://api.data.gov.in/catalog';

interface CatalogRecord {
  title?: string;
  desc?: string;
  index_name?: string;
  updated?: string;
}

export async function fetchDataGovIn(apiKey: string | undefined, query = 'transgender'): Promise<SourceItem[]> {
  if (!apiKey) return [];

  const url = `${CATALOG}?api-key=${encodeURIComponent(apiKey)}&format=json&limit=50&filters[title]=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`data.gov.in ${res.status}`);

  const json = (await res.json()) as { records?: CatalogRecord[]; catalog?: CatalogRecord[] };
  const records = json.records ?? json.catalog ?? [];

  return records
    .filter((r) => r.title || r.index_name)
    .map((r) => ({
      source: 'data.gov.in',
      kind: 'dataset',
      ref: r.index_name ?? r.title ?? 'unknown',
      title: r.title ?? r.index_name ?? 'Untitled dataset',
      url: `https://www.data.gov.in/catalog/${encodeURIComponent(r.index_name ?? '')}`,
      publishedAt: r.updated,
    }));
}
