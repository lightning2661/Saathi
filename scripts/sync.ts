import { ensureSchema } from '../src/lib/db';
import { seedCorpus } from '../src/lib/seed';
import { runSync } from '../src/lib/sync';

/** Usage: npm run sync [-- indiacode|egazette|data.gov.in] */
async function main() {
  const only = process.argv[2];
  const db = await ensureSchema();
  await seedCorpus();

  const results = await runSync(db, only);
  for (const r of results) {
    console.log(`${r.source.padEnd(12)} ${r.status.padEnd(6)} seen=${r.fetched} new=${r.changed}  ${r.note}`);
  }

  const failed = results.filter((r) => r.status === 'error');
  if (failed.length) process.exit(1);
}

main().catch((error) => {
  console.error('sync failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});
