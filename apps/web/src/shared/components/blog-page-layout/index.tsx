import { blogPostBySlugQuery } from '@packages/sanity/queries/blog-post-by-slug-query';
import type { BlockContent } from '@packages/sanity/sanity.types';
import { notFound } from 'next/navigation';
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

  const items =
    post.faqs
      ?.filter(
        (faq) =>
          faq._id && faq.question != null && faq.question.trim() !== '' && faq.answer != null,
      )
      .map(({ _id, question, answer }) => ({
        id: _id,
        question: question as string,
        answer: answer as BlockContent,
      })) ?? [];

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
        {/* {post.tags && post.tags.length > 0 && (
          <ul>
            {post.tags.map((tag) => (
              <li key={tag._id}>{tag.title}</li>
            ))}
          </ul>
        )} */}

        <FaqList items={items} />
      </aside>
    </div>
  );
};
