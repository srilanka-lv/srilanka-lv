import { blogPostsQuery } from '@packages/sanity/queries/blog-posts-query';
import clsx from 'clsx';
import type { ComponentProps, FunctionComponent } from 'react';

import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';

import { Heading } from '../heading';
import { SectionBlogsItem } from '../section-blogs-item';
import { sectionBlogsStyle, sectionBlogsTitleStyle } from './styles.css';

type SectionBlogsProps = {
  className?: string;
} & ComponentProps<'section'>;

export const SectionBlogs: FunctionComponent<SectionBlogsProps> = async ({
  className,
  ...props
}) => {
  const repository = buildSanityRepository();
  const posts = await repository.query(blogPostsQuery, { limit: 6 });

  return (
    <>
      <Heading as="h3" variant="h2" className={sectionBlogsTitleStyle}>
        Mani piedzīvojumi Šrilankā
      </Heading>
      <section className={clsx(sectionBlogsStyle, className)} {...props}>
        {posts.map((post) => (
          <SectionBlogsItem key={post._id} {...post} />
        ))}
      </section>
    </>
  );
};
