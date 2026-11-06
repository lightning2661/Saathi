import { SCHEMA } from './schema';

type Row = Record<string, unknown>;
type Param = string | number | null;

export interface Db {
  all<T = Row>(sql: string, params?: Param[]): Promise<T[]>;
  first<T = Row>(sql: string, params?: Param[]): Promise<T | null>;
  run(sql: string, params?: Param[]): Promise<void>;
  exec(sql: string): Promise<void>;
}

/** D1 binding injected by the Worker entry (env.DB). */
interface D1Like {
  prepare(sql: string): {
    bind(...p: unknown[]): {
      all(): Promise<{ results: Row[] }>;
      first(): Promise<Row | null>;
      run(): Promise<unknown>;
    };
  };
  exec(sql: string): Promise<unknown>;
}

function d1Adapter(db: D1Like): Db {
  return {
    async all<T>(sql: string, params: Param[] = []) {
      const r = await db.prepare(sql).bind(...params).all();
      return (r?.results ?? []) as T[];
    },
    async first<T>(sql: string, params: Param[] = []) {
      return ((await db.prepare(sql).bind(...params).first()) ?? null) as T | null;
    },
    async run(sql: string, params: Param[] = []) {
      await db.prepare(sql).bind(...params).run();
    },
    async exec(sql: string) {
      await db.exec(sql);
    },
  };
}

let cached: Promise<Db> | null = null;

async function openLocal(): Promise<Db> {
  const { DatabaseSync } = await import('node:sqlite');
  const path = process.env.SAATHI_DB_PATH || '.data/saathi.sqlite';
  const { mkdirSync } = await import('node:fs');
  const { dirname } = await import('node:path');
  mkdirSync(dirname(path), { recursive: true });

  const raw = new DatabaseSync(path);
  raw.exec('PRAGMA journal_mode = WAL;');
  raw.exec('PRAGMA foreign_keys = ON;');

  return {
    async all<T>(sql: string, params: Param[] = []) {
      return raw.prepare(sql).all(...params) as T[];
    },
    async first<T>(sql: string, params: Param[] = []) {
      return (raw.prepare(sql).get(...params) ?? null) as T | null;
    },
    async run(sql: string, params: Param[] = []) {
      raw.prepare(sql).run(...params);
    },
    async exec(sql: string) {
      raw.exec(sql);
    },
  };
}

/**
 * Single entry point for storage. Workers set globalThis.__SAATHI_D1__;
 * everything else falls back to the bundled SQLite file.
 */
export function getDb(): Promise<Db> {
  if (!cached) {
    const binding = (globalThis as { __SAATHI_D1__?: D1Like }).__SAATHI_D1__;
    cached = binding ? Promise.resolve(d1Adapter(binding)) : openLocal();
  }
  return cached;
}

let migrated = false;

export async function ensureSchema(): Promise<Db> {
  const db = await getDb();
  if (!migrated) {
    await db.exec(SCHEMA);
    migrated = true;
  }
  return db;
}

export async function getMeta(db: Db, key: string): Promise<string | null> {
  const row = await db.first<{ value: string }>('SELECT value FROM meta WHERE key = ?', [key]);
  return row?.value ?? null;
}

export async function setMeta(db: Db, key: string, value: string): Promise<void> {
  await db.run(
    'INSERT INTO meta(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
    [key, value],
  );
}
