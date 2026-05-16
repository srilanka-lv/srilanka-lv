import { allBlogPostsQuery } from '@packages/sanity/queries/all-blog-posts-query';
import clsx from 'clsx';
import type { ComponentProps, FunctionComponent } from 'react';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';

import { Heading } from '../heading';
import { SectionBlogsItem } from '../section-blogs-item';
import { sectionBlogsStyle, sectionBlogsTitleStyle } from './styles.css';

const provider = new DefaultSanityProvider();
const repository = new DefaultSanityRepository(provider);

type SectionBlogsProps = {
  className?: string;
} & ComponentProps<'section'>;

export const SectionBlogs: FunctionComponent<SectionBlogsProps> = async ({
  className,
  ...props
}) => {
  const posts = await repository.query(allBlogPostsQuery, { limit: 6 });

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
