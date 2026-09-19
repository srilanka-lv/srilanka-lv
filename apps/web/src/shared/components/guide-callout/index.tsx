import { Lightbulb, TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { bodyStyle, calloutStyles, iconStyle, labelStyle, portraitStyle } from './styles.css';

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
 * from Madiha. Tips and warnings are quiet stone boxes; a personal note
 * carries Grieta's portrait on the coral-tinted panel, the same one the
 * product cards and the PDF block stand on.
 */
export const GuideCallout: FunctionComponent<GuideCalloutProps> = ({ tone = 'tip', children }) => {
  if (tone === 'personal') {
    return (
      <aside className={calloutStyles.personal}>
        <Image
          className={portraitStyle}
          src="/images/srilanka-lv_laura-grieta-grinberga_profile.webp"
          alt="Grieta - Srilanka.lv"
          width={64}
          height={64}
          sizes="64px"
        />
        <div className={bodyStyle}>
          <span className={labelStyle}>{labels.personal}</span>
          {children}
        </div>
      </aside>
    );
  }

  const Icon = tone === 'warning' ? TriangleAlert : Lightbulb;

  return (
    <aside className={calloutStyles.quiet}>
      <span className={labelStyle}>
        <Icon className={iconStyle} aria-hidden="true" strokeWidth={2} />
        {labels[tone]}
      </span>
      <div className={bodyStyle}>{children}</div>
    </aside>
  );
};
