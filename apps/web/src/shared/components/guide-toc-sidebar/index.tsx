'use client';

import { useEffect, useState } from 'react';

import type { GuideTocItem } from '@/shared/components/guide-toc';

import { counterStyle, linkStyle, listStyle, sidebarStyle, titleStyle } from './styles.css';

type GuideTocSidebarProps = {
  items: GuideTocItem[];
};

/**
 * The sticky table of contents beside the guide, shown only from `xl` up where
 * the shell is wide enough to hold it. Below that the article keeps its
 * collapsible block.
 *
 * The active entry is tracked with an IntersectionObserver rather than a
 * scroll listener, so the browser does the work off the main thread and the
 * page's interaction budget is untouched. The observer window is a thin band
 * near the top of the viewport: whichever section heading last crossed it is
 * the one the reader is in.
 */
export function GuideTocSidebar({ items }: GuideTocSidebarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Several sections can sit in the band at once; the first one in
        // document order is the one the reader has reached.
        const current = items.find((item) => visible.has(item.id));

        if (current) {
          setActiveId(current.id);
        }
      },
      { rootMargin: '-15% 0px -75% 0px' },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className={sidebarStyle} aria-label="Satura rādītājs">
      <p className={titleStyle}>Saturs</p>
      <ol className={listStyle}>
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={linkStyle}
              aria-current={item.id === activeId ? 'true' : undefined}
            >
              <span className={counterStyle}>{index + 1}.</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
