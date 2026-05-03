import { Temporal } from '@js-temporal/polyfill';
import type { BlogPostBySlugQueryResult } from '@packages/sanity/sanity.types';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { Text } from '../text';
import {
  blogHeroAuthorLinkStyle,
  blogHeroAuthorPublishedAtStyle,
  blogHeroAuthorStyle,
} from './styles.css';

type BlogHeroAuthorProps = Pick<NonNullable<BlogPostBySlugQueryResult>, 'publishedAt'>;

export const BlogHeroAuthor: FunctionComponent<BlogHeroAuthorProps> = ({ publishedAt }) => {
  if (!publishedAt) {
    return null;
  }

  const date = Temporal.Instant.from(publishedAt)
    .toZonedDateTimeISO('Europe/Riga')
    .toPlainDate()
    .toLocaleString('lv-LV', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <Text as="span" className={blogHeroAuthorStyle}>
      <Link href="/par-mani" className={blogHeroAuthorLinkStyle}>
        Laura Grieta
      </Link>
      ,{` `}
      <Text as="span" className={blogHeroAuthorPublishedAtStyle}>
        {date}
      </Text>
    </Text>
  );
};
