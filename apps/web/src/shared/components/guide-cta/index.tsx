import type { FunctionComponent, ReactNode } from 'react';

import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

import { actionsStyle, ctaStyle, headingStyle, textStyle } from './styles.css';

type GuideCtaProps = {
  title: string;
  children: ReactNode;
  /** The links themselves, so the caller decides what each one points at. */
  actions: ReactNode;
};

/**
 * An offer inside the guide, placed where the reader has just been given
 * something substantial and is most likely to want it done for them. Server
 * rendered, no client JavaScript: it is a heading, a sentence and links.
 */
export const GuideCta: FunctionComponent<GuideCtaProps> = ({ title, children, actions }) => (
  <aside className={ctaStyle}>
    <Heading as="h3" variant="h5" className={headingStyle}>
      {title}
    </Heading>
    <Text className={textStyle}>{children}</Text>
    <div className={actionsStyle}>{actions}</div>
  </aside>
);
