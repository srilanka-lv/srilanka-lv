import { blogPostsBySlugQuery } from '@packages/sanity/queries/blog-posts-by-slug-query';
import type { BlockContent } from '@packages/sanity/sanity.types';
import { notFound } from 'next/navigation';
import type { FunctionComponent } from 'react';

import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';

import { BlogCoverImage } from '../blog-cover-image';
import { BlogHero } from '../blog-hero';
import { BlogHeroAuthor } from '../blog-hero-author';
import { BlogHeroTitle } from '../blog-hero-title';
import { BlogPostJsonLd } from '../blog-post-json-ld';
import { BlogText } from '../blog-text';
import { Breadcrumbs } from '../breadcrumbs';
import { buildPostItems } from '../breadcrumbs/build-items';
import { FaqList } from '../faq-list';
import {
  blogPageLayoutArticleStyle,
  blogPageLayoutAsideStyle,
  blogPageLayoutStyle,
  breadcrumbsStyle,
} from './styles.css';

type BlogPageLayoutProps = { slug: string };

export const BlogPageLayout: FunctionComponent<BlogPageLayoutProps> = async ({ slug }) => {
  const repository = buildSanityRepository();
  const post = await repository.query(blogPostsBySlugQuery, { slug });

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
        questionSlot: question as string,
        answerSlot: answer as BlockContent,
      })) ?? [];

  return (
    <div className={blogPageLayoutStyle}>
      <BlogPostJsonLd
        slug={slug}
        title={post.title ?? ''}
        excerpt={post.excerpt ?? ''}
        publishedAt={post.publishedAt}
        updatedAt={post._updatedAt}
        coverImage={post.coverImage}
        openGraph={post.openGraph}
        body={post.body}
      />

      <BlogCoverImage image={post.coverImage} />

      <article className={blogPageLayoutArticleStyle}>
        <BlogHero>
          <BlogHeroTitle>{post.title}</BlogHeroTitle>
          <BlogHeroAuthor publishedAt={post.publishedAt} />
        </BlogHero>
        <Breadcrumbs className={breadcrumbsStyle} items={buildPostItems(slug, post.title ?? '')} />
        <BlogText body={post.body} />
      </article>

      <aside className={blogPageLayoutAsideStyle}>
        <FaqList items={items} />
      </aside>
    </div>
  );
};
