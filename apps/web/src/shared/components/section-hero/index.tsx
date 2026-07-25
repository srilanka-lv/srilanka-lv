import clsx from 'clsx';
import { getImageProps } from 'next/image';
import type { ComponentProps, FunctionComponent } from 'react';
import { preload } from 'react-dom';

import {
  sectionHeroImageStyle,
  sectionHeroStyle,
  sectionHeroSubtitleStyle,
  sectionHeroTitleStyle,
} from './styles.css';

type SectionHeroProps = {
  className?: string;
} & ComponentProps<'section'>;

export const SectionHero: FunctionComponent<SectionHeroProps> = ({ className, ...props }) => {
  const common = {
    alt: 'Tavs ceļojums uz Šrilanku sākas šeit',
    sizes: '100vw',
    fill: true,
    priority: true,
  };

  const {
    props: { srcSet: desktop, src: optimizedSrcDesktop },
  } = getImageProps({
    ...common,
    src: '/images/srilanka-lv_hero-image_desktop.webp',
  });

  const {
    props: { srcSet: mobile, src: optimizedSrcMobile, ...rest },
  } = getImageProps({
    ...common,
    src: '/images/srilanka-lv_hero-image_mobile.webp',
  });

  preload(optimizedSrcDesktop, {
    as: 'image',
    imageSrcSet: desktop,
    fetchPriority: 'high',
  });

  preload(optimizedSrcMobile, {
    as: 'image',
    imageSrcSet: mobile,
    fetchPriority: 'high',
  });

  return (
    <section className={clsx(sectionHeroStyle, className)} {...props}>
      <h1 className={sectionHeroTitleStyle}>Tavs ceļojums uz Šrilanku sākas šeit</h1>
      <h2 className={sectionHeroSubtitleStyle}>
        No personalizēta plāna līdz kopīgiem piedzīvojumiem viss vienuviet latviešiem.
      </h2>
      <picture>
        <source media="(max-width: 1279px)" srcSet={mobile} />
        <source media="(min-width: 1280px)" srcSet={desktop} />
        <img {...rest} alt={common.alt} className={sectionHeroImageStyle} />
      </picture>
    </section>
  );
};
