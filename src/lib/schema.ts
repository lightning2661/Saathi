/**
 * One schema for both runtimes: node:sqlite in dev, D1 in production.
 * JSON is stored as TEXT; nothing here depends on FTS5 or extensions so the
 * same DDL runs unchanged on D1.
 */
export const SCHEMA = `
CREATE TABLE IF NOT EXISTS meta (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS acts (
  id                 TEXT PRIMARY KEY,
  short_title        TEXT NOT NULL,
  long_title         TEXT NOT NULL,
  number             TEXT NOT NULL,
  year               INTEGER NOT NULL,
  jurisdiction       TEXT NOT NULL,
  ministry           TEXT,
  official_url       TEXT NOT NULL,
  consolidated_as_on TEXT NOT NULL,
  source             TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS provisions (
  id           TEXT PRIMARY KEY,
  act_id       TEXT NOT NULL REFERENCES acts(id),
  section      TEXT NOT NULL,
  heading      TEXT NOT NULL,
  body         TEXT NOT NULL,
  summary      TEXT NOT NULL,
  tags         TEXT NOT NULL DEFAULT '',
  status       TEXT NOT NULL,
  verified_on  TEXT NOT NULL,
  source_url   TEXT NOT NULL,
  in_force_from TEXT,
  amended_by   TEXT,
  human_reviewed INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS provisions_act ON provisions(act_id, section);
CREATE INDEX IF NOT EXISTS provisions_status ON provisions(status);

CREATE TABLE IF NOT EXISTS cases (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  citation   TEXT NOT NULL,
  court      TEXT NOT NULL,
  year       INTEGER NOT NULL,
  holding    TEXT NOT NULL,
  relevance  TEXT NOT NULL,
  source_url TEXT NOT NULL,
  verified_on TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS topics (
  slug        TEXT PRIMARY KEY,
  title_en    TEXT NOT NULL,
  title_hi    TEXT NOT NULL,
  title_ta    TEXT NOT NULL,
  summary_en  TEXT NOT NULL,
  summary_hi  TEXT NOT NULL,
  summary_ta  TEXT NOT NULL,
  keywords    TEXT NOT NULL,
  urgency     INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS topic_provisions (
  topic_slug   TEXT NOT NULL REFERENCES topics(slug),
  provision_id TEXT NOT NULL REFERENCES provisions(id),
  weight       REAL NOT NULL DEFAULT 1,
  PRIMARY KEY (topic_slug, provision_id)
);

CREATE TABLE IF NOT EXISTS topic_cases (
  topic_slug TEXT NOT NULL REFERENCES topics(slug),
  case_id    TEXT NOT NULL REFERENCES cases(id),
  PRIMARY KEY (topic_slug, case_id)
);

CREATE TABLE IF NOT EXISTS steps (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_slug TEXT NOT NULL,
  lang       TEXT NOT NULL,
  ordinal    INTEGER NOT NULL,
  kind       TEXT NOT NULL,
  text       TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS steps_topic ON steps(topic_slug, lang, ordinal);

CREATE TABLE IF NOT EXISTS unsure (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_slug TEXT NOT NULL,
  lang       TEXT NOT NULL,
  ordinal    INTEGER NOT NULL,
  text       TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS helplines (
  id         TEXT PRIMARY KEY,
  name_en    TEXT NOT NULL,
  name_hi    TEXT NOT NULL,
  name_ta    TEXT NOT NULL,
  number     TEXT NOT NULL,
  alt_number TEXT,
  what       TEXT NOT NULL,
  hours      TEXT NOT NULL,
  langs      TEXT NOT NULL,
  source_url TEXT NOT NULL,
  verified_on TEXT NOT NULL,
  priority   INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS helpline_topics (
  helpline_id TEXT NOT NULL,
  topic_slug  TEXT NOT NULL,
  PRIMARY KEY (helpline_id, topic_slug)
);

CREATE TABLE IF NOT EXISTS qa (
  id          TEXT PRIMARY KEY,
  question    TEXT NOT NULL,
  lang        TEXT NOT NULL,
  topic_slug  TEXT NOT NULL,
  answer      TEXT NOT NULL,
  sources     TEXT NOT NULL,
  reviewed_by TEXT NOT NULL,
  reviewed_on TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sync_runs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  source      TEXT NOT NULL,
  started_at  TEXT NOT NULL,
  finished_at TEXT,
  status      TEXT NOT NULL,
  fetched     INTEGER NOT NULL DEFAULT 0,
  changed     INTEGER NOT NULL DEFAULT 0,
  detail      TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS sync_changes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id     INTEGER NOT NULL,
  source     TEXT NOT NULL,
  kind       TEXT NOT NULL,
  ref        TEXT NOT NULL,
  summary    TEXT NOT NULL,
  detail     TEXT NOT NULL DEFAULT '',
  fingerprint TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS sync_changes_fingerprint
  ON sync_changes(fingerprint);

CREATE TABLE IF NOT EXISTS source_state (
  source          TEXT PRIMARY KEY,
  etag            TEXT,
  last_modified   TEXT,
  doc_hash        TEXT,
  checked_at      TEXT,
  status          TEXT NOT NULL DEFAULT 'unknown',
  detail          TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS feedback (
  id         TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  topic      TEXT NOT NULL,
  lang       TEXT NOT NULL,
  rating     TEXT NOT NULL,
  flags      TEXT NOT NULL DEFAULT '',
  note       TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS events (
  id         TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  kind       TEXT NOT NULL,
  topic      TEXT NOT NULL DEFAULT '',
  lang       TEXT NOT NULL DEFAULT '',
  provider   TEXT NOT NULL DEFAULT '',
  dropped    INTEGER NOT NULL DEFAULT 0
);
`;
