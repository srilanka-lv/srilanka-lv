import { allBlogPostsQuery } from '@packages/sanity/queries/all-blog-posts-query';
import Link from 'next/link';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';

const provider = new DefaultSanityProvider();
const repository = new DefaultSanityRepository(provider);

export const revalidate = 3600; // 1 hour

export default async function BlogsPage() {
  const posts = await repository.query(allBlogPostsQuery);

  return posts.map((post) => (
    <Link key={post._id} href={`/blogs/${post.slug?.current}`}>
      {post.title}
    </Link>
  ));
}
