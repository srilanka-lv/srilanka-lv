import { PAGES } from '@packages/sanity/constants/pages-slugs';
import clsx from 'clsx';
import { getImageProps } from 'next/image';
import type { ComponentProps, FunctionComponent } from 'react';

import {
  sectionHeroButtonStyle,
  sectionHeroImageStyle,
  sectionHeroStyle,
  sectionHeroSubtitleStyle,
  sectionHeroTitleStyle,
} from './styles.css';

type SectionHeroProps = {
  className?: string;
} & ComponentProps<'section'>;

const mobileMedia = '(max-width: 1279px)';
const desktopMedia = '(min-width: 1280px)';

export const SectionHero: FunctionComponent<SectionHeroProps> = ({ className, ...props }) => {
  const common = {
    alt: 'Tavs ceļojums uz Šrilanku sākas šeit',
    sizes: '100vw',
    fill: true,
    priority: true,
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: '/images/srilanka-lv_hero-image_desktop.webp',
  });

  const {
    props: { srcSet: mobile, src: _src, ...rest },
  } = getImageProps({
    ...common,
    src: '/images/srilanka-lv_hero-image_mobile.webp',
  });

  return (
    <section className={clsx(sectionHeroStyle, className)} {...props}>
      {/* Hoisted into <head>; media-scoped so each viewport downloads only its own variant. */}
      <link
        rel="preload"
        as="image"
        imageSrcSet={mobile}
        imageSizes="100vw"
        media={mobileMedia}
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet={desktop}
        imageSizes="100vw"
        media={desktopMedia}
        fetchPriority="high"
      />
      <h1 className={sectionHeroTitleStyle}>Tavs ceļojums uz Šrilanku sākas šeit</h1>
      <h2 className={sectionHeroSubtitleStyle}>
        No personalizēta plāna līdz kopīgiem piedzīvojumiem viss vienuviet latviešiem.
      </h2>
      <a
        className={sectionHeroButtonStyle}
        href={`/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`}
      >
        Brauc uz Šrilanku ar mani
      </a>
      <picture>
        <source media="(max-width: 1279px)" srcSet={mobile} />
        <source media="(min-width: 1280px)" srcSet={desktop} />
        <img {...rest} alt={common.alt} className={sectionHeroImageStyle} />
      </picture>
    </section>
  );
};
