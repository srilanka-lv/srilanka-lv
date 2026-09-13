import type { FunctionComponent, PropsWithChildren } from 'react';

import { calloutStyle, labelStyle } from './styles.css';

type GuideCalloutTone = 'tip' | 'warning' | 'personal';

const labels: Record<GuideCalloutTone, string> = {
  tip: 'Padoms',
  warning: 'Uzmanību',
  personal: 'No Madihas',
};

type GuideCalloutProps = PropsWithChildren<{
  tone?: GuideCalloutTone;
}>;

/**
 * A short aside inside the guide: a tip, a warning, or a first-person note
 * from Madiha. A quiet bordered box in the site's stone surface, so the coral
 * stays reserved for links and actions.
 */
export const GuideCallout: FunctionComponent<GuideCalloutProps> = ({ tone = 'tip', children }) => (
  <aside className={calloutStyle}>
    <span className={labelStyle}>{labels[tone]}</span>
    {children}
  </aside>
);
