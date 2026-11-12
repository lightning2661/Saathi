'use client';

import { useMemo, useState } from 'react';
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  searchFaq,
  type FaqCategory,
  type FaqItem,
} from '@/lib/faq';

export function FaqClient({ items }: { items: FaqItem[] }) {
  const [category, setCategory] = useState<FaqCategory | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const scoped = category === 'all' ? items : items.filter((i) => i.category === category);
    return searchFaq(scoped, query);
  }, [items, category, query]);

  return (
    <>
      <div className="faq-tools">
        <div className="chips" style={{ marginTop: 0 }}>
          <button
            className="chip"
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            All {items.length}
          </button>
          {CATEGORY_ORDER.map((c) => (
            <button
              key={c}
              className="chip"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        <div style={{ flex: '1 1 16rem', maxWidth: '22rem' }}>
          <label className="sr-only" htmlFor="faq-search">
            Search questions
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — rent, police, certificate, 1098"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="faq-empty">
          Nothing matches “{query}”. Try a shorter word, or{' '}
          <a href="/ask">describe the situation instead</a>.
        </p>
      ) : (
        <ul className="faq-list">
          {filtered.map((f) => (
            <li className="faq-item" id={f.id} key={f.id}>
              <details>
                <summary>{f.q}</summary>
                <div className="faq-body">
                  <p>{f.a}</p>
                  <div className="cite-row">
                    <a className="badge" href={`/rights`} style={{ textDecoration: 'none' }}>
                      {CATEGORY_LABEL[f.category]}
                    </a>
                    {f.section && (
                      <a className="cite" href={`/laws?q=${encodeURIComponent(f.section!)}`}>
                        {f.section} · law library
                      </a>
                    )}
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
