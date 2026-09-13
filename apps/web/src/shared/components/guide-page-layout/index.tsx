import type { FunctionComponent, PropsWithChildren } from 'react';

import { Breadcrumbs } from '../breadcrumbs';
import { buildSectionItems, findNavLabel } from '../breadcrumbs/build-items';
import { ContentUpdatedAt } from '../content-updated-at';
import { guideArticleStyle, guideBodyStyle, guideLedeStyle } from './index.css';

type GuidePageLayoutProps = PropsWithChildren<{
  /** Public LV path, e.g. `/celojums-uz-srilanku`. Must be registered in `navigationItems`. */
  href: string;
  /** ISO date of the last content change; rendered as "Atjaunots: ...". */
  updatedAt: string;
  /** One-sentence subtitle under the H1. */
  lede?: string;
}>;

/**
 * Layout for the pillar guide, whose content is authored in code rather than
 * Sanity. Unlike `StaticPageLayout` it renders only the article itself: no
 * "Mani piedzīvojumi" blog strip and no FAQ aside, so the page reads as one
 * long guide between the header and the footer. The footer also drops its
 * product cards on this route (see `Footer`).
 */
export const GuidePageLayout: FunctionComponent<GuidePageLayoutProps> = ({
  href,
  updatedAt,
  lede,
  children,
}) => (
  <article className={guideArticleStyle}>
    <Breadcrumbs items={buildSectionItems(href)} />
    <h1>{findNavLabel(href)}</h1>
    {lede ? <p className={guideLedeStyle}>{lede}</p> : null}
    <ContentUpdatedAt updatedAt={updatedAt} />
    <div className={guideBodyStyle}>{children}</div>
  </article>
);
