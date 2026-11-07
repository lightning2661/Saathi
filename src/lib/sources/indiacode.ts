/**
 * Official India Code portal (indiacode.gov.in) runs DSpace 7. The discovery
 * endpoint is public, JSON, and needs no key. We read metadata only; statutory
 * text arrives as PDF and always goes through human verification.
 */
const DISCOVER = 'https://indiacode.gov.in/server/api/discover/search/objects';

export interface SourceItem {
  source: string;
  kind: string;
  ref: string;
  title: string;
  url: string;
  publishedAt?: string;
}

interface DspaceMetadata {
  [key: string]: { value: string }[] | undefined;
}

interface DspaceObject {
  uuid?: string;
  name?: string;
  handle?: string;
  metadata?: DspaceMetadata;
}

const first = (meta: DspaceMetadata | undefined, key: string): string | undefined =>
  meta?.[key]?.[0]?.value;

export async function fetchIndiaCode(query: string, size = 40): Promise<SourceItem[]> {
  const url = `${DISCOVER}?query=${encodeURIComponent(query)}&size=${size}&sort=dc.date.issued,DESC`;
  const res = await fetch(url, {
    headers: { accept: 'application/json', 'user-agent': 'SaathiLawSync/1.0 (+legal corpus refresh)' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`indiacode ${res.status}`);

  const json = (await res.json()) as {
    _embedded?: { searchResult?: { _embedded?: { objects?: { _embedded?: { indexableObject?: DspaceObject } }[] } } };
  };

  const objects = json._embedded?.searchResult?._embedded?.objects ?? [];
  const items: SourceItem[] = [];

  for (const wrapper of objects) {
    const obj = wrapper._embedded?.indexableObject;
    if (!obj?.uuid) continue;
    const title = obj.name ?? first(obj.metadata, 'dc.title');
    if (!title) continue;
    items.push({
      source: 'indiacode',
      kind: 'act',
      ref: obj.uuid,
      title,
      url: obj.handle
        ? `https://indiacode.gov.in/handle/${obj.handle}`
        : `https://indiacode.gov.in/item/${obj.uuid}`,
      publishedAt:
        first(obj.metadata, 'dc.date.issued') ??
        first(obj.metadata, 'dc.date.accessioned')?.slice(0, 10),
    });
  }
  return items;
}

/** Queries that cover the statute book this app actually depends on. */
export const INDIACODE_QUERIES = [
  'Transgender Persons (Protection of Rights) Act',
  'Transgender Persons Rules',
  'National Legal Services Authority',
  'Juvenile Justice Care and Protection of Children',
  'Protection of Children from Sexual Offences',
  'Mental Healthcare Act',
  'Human Immunodeficiency Virus and Acquired Immune Deficiency Syndrome Prevention and Control Act',
];
