import { blogPostsQuery } from '@packages/sanity/queries/blog-posts-query';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PAGE_BLOGS_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_BLOGS_SLUG);

export default async function BlogsPage() {
  const repository = buildSanityRepository();
  const posts = await repository.query(blogPostsQuery, { limit: 6 });

  return posts.map((post) => (
    <Link key={post._id} href={`/blogi/${post.slug?.current}`}>
      {post.title}
    </Link>
  ));
}
