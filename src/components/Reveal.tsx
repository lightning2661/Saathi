import type { ReactNode } from 'react';

/**
 * Layout wrapper only. An earlier version hid these blocks and faded them in
 * with IntersectionObserver, which left content invisible whenever the observer
 * did not fire (background tab, print, headless capture). Page-load motion now
 * lives in the hero alone, so this stays a plain block and nothing can vanish.
 */
export function Reveal({ children }: { children: ReactNode; delay?: number }) {
  return <div className="reveal">{children}</div>;
}
