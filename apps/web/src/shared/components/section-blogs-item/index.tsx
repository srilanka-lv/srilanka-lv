import type { BlogPostsQueryResult } from '@packages/sanity/sanity.types';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { urlForImage } from '@/features/sanity/utils/url-for-image';

import { Heading } from '../heading';
import {
  sectionBlogsItemHeadingStyle,
  sectionBlogsItemImageStyle,
  sectionBlogsItemLinkStyle,
  sectionBlogsItemLinkTextStyle,
  sectionBlogsItemStyle,
} from './styles.css';

type SectionBlogsItemProps = BlogPostsQueryResult[number];

export const SectionBlogsItem: FunctionComponent<SectionBlogsItemProps> = ({
  title,
  slug,
  coverImage,
}) => {
  const src = coverImage
    ? // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
      urlForImage(coverImage).width(1200).quality(100).fit('max').auto('format').url()
    : null;
  const alt = coverImage?.alt ?? '';
  const itemSlug = slug?.current ? `/blogs/${slug?.current}` : null;

  if (!itemSlug || !src) {
    return null;
  }

  return (
    <article className={sectionBlogsItemStyle}>
      <Link className={sectionBlogsItemLinkStyle} href={itemSlug}>
        <Image className={sectionBlogsItemImageStyle} src={src} alt={alt} fill sizes="auto" />
        <Heading className={sectionBlogsItemHeadingStyle} as="span" variant="h3">
          {title}
        </Heading>
        <span className={sectionBlogsItemLinkTextStyle}>Lasīt vairāk →</span>
      </Link>
    </article>
  );
};
