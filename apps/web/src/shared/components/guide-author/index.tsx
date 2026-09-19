import Image from 'next/image';
import type { FunctionComponent, ReactNode } from 'react';

import { Signature } from '@/shared/components/signature';

import { authorStyle, bodyStyle, nameStyle, portraitStyle, signatureStyle } from './styles.css';

type GuideAuthorProps = {
  name: string;
  portraitSrc: string;
  portraitAlt: string;
  children: ReactNode;
};

/**
 * The author box: who wrote the guide and where they live, signed the way the
 * footer is. The Person node in the page's JSON-LD carries the same name, so
 * the visible byline and the structured data agree.
 */
export const GuideAuthor: FunctionComponent<GuideAuthorProps> = ({
  name,
  portraitSrc,
  portraitAlt,
  children,
}) => (
  <aside className={authorStyle}>
    <Image
      className={portraitStyle}
      src={portraitSrc}
      alt={portraitAlt}
      width={96}
      height={96}
      sizes="96px"
    />
    <div className={bodyStyle}>
      <span className={nameStyle}>{name}</span>
      {children}
      <Signature className={signatureStyle} />
    </div>
  </aside>
);
