import { Link2 } from 'lucide-react';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { anchorStyle, headingStyle, sectionStyle } from './styles.css';

type GuideSectionProps = PropsWithChildren<{
  id: string;
  title: string;
}>;

/**
 * One H2 section of the guide. The `id` is the anchor the table of contents
 * links to, and `scroll-margin-top` keeps the heading clear of the header.
 *
 * The heading carries a link to itself. That is a sharing feature, not a
 * ranking one: Google already gets what it needs from the id plus the table of
 * contents. It lets a reader copy a link to one section, which matters on a
 * guide this long, because a deep link to the visa answer converts better than
 * a link to the top of 3,500 words.
 */
export const GuideSection: FunctionComponent<GuideSectionProps> = ({ id, title, children }) => (
  <section id={id} className={sectionStyle}>
    <h2 className={headingStyle}>
      {title}
      <a href={`#${id}`} className={anchorStyle} aria-label={`Saite uz sadaļu: ${title}`}>
        <Link2 size={30} aria-hidden="true" />
      </a>
    </h2>
    {children}
  </section>
);
