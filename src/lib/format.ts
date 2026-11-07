/** '12' → 's.12'; 'Article 21' → 'Art. 21'. */
export function sectionLabel(section: string): string {
  if (/^article\s/i.test(section)) return section.replace(/^article\s*/i, 'Art. ');
  return `s.${section}`;
}

/** 'The Transgender Persons (Protection of Rights) Act, 2019' → 'TPA 2019'. */
export function actShort(title: string): string {
  if (/Amendment Act, 2026/i.test(title)) return 'TPA Amendment 2026';
  if (/Transgender Persons/i.test(title)) return 'TPA 2019';
  if (/Constitution/i.test(title)) return 'Constitution';
  return title.replace(/^The\s+/, '');
}
