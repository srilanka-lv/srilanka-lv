import type { FunctionComponent, PropsWithChildren } from 'react';

import { sectionStyle } from './styles.css';

type GuideSectionProps = PropsWithChildren<{
  id: string;
  title: string;
}>;

/**
 * One H2 section of the guide. The `id` is the anchor the table of contents
 * links to; `scroll-margin-top` keeps the heading clear of the sticky header.
 */
export const GuideSection: FunctionComponent<GuideSectionProps> = ({ id, title, children }) => (
  <section id={id} className={sectionStyle}>
    <h2>{title}</h2>
    {children}
  </section>
);
