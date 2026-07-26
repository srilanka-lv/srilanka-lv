import { blogPostsQuery } from '@packages/sanity/queries/blog-posts-query';
import clsx from 'clsx';
import type { ComponentProps, FunctionComponent } from 'react';

import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';

import { Heading } from '../heading';
import { SectionBlogsItem } from '../section-blogs-item';
import { sectionBlogsStyle, sectionBlogsTitleStyle } from './styles.css';

type SectionBlogsProps = {
  sectionTitle?: string;
  sectionTitleClassName?: string;
  sectionBlogsClassName?: string;
  sectionBlogsItemClassName?: string;
  blogsLimit?: number;
} & ComponentProps<'section'>;

export const SectionBlogs: FunctionComponent<SectionBlogsProps> = async ({
  sectionTitle,
  sectionTitleClassName,
  sectionBlogsClassName,
  sectionBlogsItemClassName,
  blogsLimit = 24,
  ...props
}) => {
  const repository = buildSanityRepository();
  const posts = await repository.query(blogPostsQuery, { limit: blogsLimit });

  return (
    <>
      {sectionTitle && (
        <Heading
          as="h3"
          variant="h2"
          className={clsx(sectionBlogsTitleStyle, sectionTitleClassName)}
        >
          {sectionTitle}
        </Heading>
      )}
      <section className={clsx(sectionBlogsStyle, sectionBlogsClassName)} {...props}>
        {posts.map((post) => (
          <SectionBlogsItem key={post._id} {...post} className={sectionBlogsItemClassName} />
        ))}
      </section>
    </>
  );
};
