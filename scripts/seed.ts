import { seedCorpus } from '../src/lib/seed';

async function main() {
  const force = process.argv.includes('--force');
  const result = await seedCorpus(force);
  console.log(result.seeded ? 'seeded' : 'already current', result.version);
  console.table(result.counts);
}

main().catch((error) => {
  console.error('seed failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});
