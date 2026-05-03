import { blogPostBySlugQuery } from '@packages/sanity/queries/blog-post-by-slug-query';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import type { FunctionComponent } from 'react';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';

import { BlogCoverImage } from '../blog-cover-image';
import { BlogHero } from '../blog-hero';
import { BlogHeroAuthor } from '../blog-hero-author';
import { BlogHeroTitle } from '../blog-hero-title';
import { BlogText } from '../blog-text';
import { FaqList } from '../faq-list';
import {
  blogPageLayoutArticleStyle,
  blogPageLayoutAsideStyle,
  blogPageLayoutStyle,
} from './styles.css';

const sanityProvider = new DefaultSanityProvider();
const sanityRepository = new DefaultSanityRepository(sanityProvider);

type BlogPageLayoutProps = { slug: string };

export const BlogPageLayout: FunctionComponent<BlogPageLayoutProps> = async ({ slug }) => {
  const post = await sanityRepository.query(blogPostBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <div className={blogPageLayoutStyle}>
      <BlogCoverImage image={post.coverImage} />

      <article className={blogPageLayoutArticleStyle}>
        <BlogHero>
          <BlogHeroTitle>{post.title}</BlogHeroTitle>
          <BlogHeroAuthor publishedAt={post.publishedAt} />
        </BlogHero>
        <BlogText body={post.body} />
      </article>

      <aside className={blogPageLayoutAsideStyle}>
        {post.tags && post.tags.length > 0 && (
          <ul>
            {post.tags.map((tag) => (
              <li key={tag._id}>{tag.title}</li>
            ))}
          </ul>
        )}

        {post.faqs && post.faqs.length > 0 && (
          <FaqList
            items={post.faqs.map((faq) => ({
              id: faq._id,
              question: faq.question ?? '',
              answer: faq.answer ? <PortableText value={faq.answer} /> : null,
            }))}
          />
        )}
      </aside>
    </div>
  );
};
