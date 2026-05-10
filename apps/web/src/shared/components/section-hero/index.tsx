import clsx from 'clsx';
import Image from 'next/image';
import type { ComponentProps, FunctionComponent } from 'react';

import { CoverImageEffect } from '../cover-image-effect';
import {
  sectionHeroCoverImageEffectStyles,
  sectionHeroImageStyle,
  sectionHeroStyle,
  sectionHeroSubtitleStyle,
  sectionHeroTitleStyle,
} from './styles.css';

type SectionHeroProps = {
  className?: string;
} & ComponentProps<'section'>;

export const SectionHero: FunctionComponent<SectionHeroProps> = ({ className, ...props }) => (
  <section className={clsx(sectionHeroStyle, className)} {...props}>
    <h1 className={sectionHeroTitleStyle}>Tavs ceļojums uz Šrilanku sākas šeit</h1>
    <h2 className={sectionHeroSubtitleStyle}>
      No personalizēta plāna līdz kopīgiem piedzīvojumiem viss vienuviet latviešiem.
    </h2>
    <CoverImageEffect className={sectionHeroCoverImageEffectStyles.top} variant="top" />
    <Image
      className={sectionHeroImageStyle}
      src="/images/srilanka-lv_hero-image.webp"
      alt=""
      quality={100}
      fill
      priority
    />
    <CoverImageEffect className={sectionHeroCoverImageEffectStyles.bottom} variant="bottom" />
  </section>
);
