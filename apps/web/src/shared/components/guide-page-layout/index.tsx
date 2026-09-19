import type { FunctionComponent, PropsWithChildren } from 'react';

import { Breadcrumbs } from '../breadcrumbs';
import { buildSectionItems, findNavLabel } from '../breadcrumbs/build-items';
import { ContentUpdatedAt } from '../content-updated-at';
import type { GuideTocItem } from '../guide-toc';
import { GuideTocSidebar } from '../guide-toc-sidebar';
import { shellMainStyle, shellStyle } from '../guide-toc-sidebar/styles.css';
import { guideArticleStyle, guideBodyStyle, guideLedeStyle } from './index.css';

type GuidePageLayoutProps = PropsWithChildren<{
  /** Public LV path, e.g. `/celojums-uz-srilanku`. Must be registered in `navigationItems`. */
  href: string;
  /** ISO date of the last content change; rendered as "Atjaunots: ...". */
  updatedAt: string;
  /** One-sentence subtitle under the H1. */
  lede?: string;
  /** Sections for the sticky sidebar. The article keeps its own inline copy for narrow screens. */
  tocItems: GuideTocItem[];
}>;

/**
 * Layout for the pillar guide, whose content is authored in code rather than
 * Sanity. Unlike `StaticPageLayout` it renders only the article itself: no
 * "Mani piedzīvojumi" blog strip and no FAQ aside, so the page reads as one
 * long guide between the header and the footer. The footer also drops its
 * product cards on this route (see `Footer`).
 *
 * From `xl` up the shell widens past the site's body width and becomes a two
 * column grid, putting a sticky table of contents beside the article. The text
 * column keeps its width at every size, so nothing about the reading measure
 * changes; only the empty margin is put to work.
 */
export const GuidePageLayout: FunctionComponent<GuidePageLayoutProps> = ({
  href,
  updatedAt,
  lede,
  tocItems,
  children,
}) => (
  <div className={shellStyle}>
    <GuideTocSidebar items={tocItems} />
    <div className={shellMainStyle}>
      <article className={guideArticleStyle}>
        <Breadcrumbs items={buildSectionItems(href)} />
        <h1>{findNavLabel(href)}</h1>
        {lede ? <p className={guideLedeStyle}>{lede}</p> : null}
        <ContentUpdatedAt updatedAt={updatedAt} />
        <div className={guideBodyStyle}>{children}</div>
      </article>
    </div>
  </div>
);
