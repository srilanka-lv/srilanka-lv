import { allBlogPostsQuery } from '@srilanka/sanity/queries';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';

const provider = new DefaultSanityProvider();
const repository = new DefaultSanityRepository(provider);

export default async function Home() {
  const posts = await repository.query(allBlogPostsQuery);

  return posts.map((post) => <div key={post._id}>{post.title}</div>);
}
