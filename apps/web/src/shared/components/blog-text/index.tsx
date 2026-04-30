import type { PortableTextComponents } from '@portabletext/react';
import type { FunctionComponent } from 'react';

import { PortableText, type PortableTextValue } from '@/features/sanity/components/portable-text';
import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

import {
  blogBlockquoteStyle,
  blogHeadingStyle,
  blogListStyle,
  blogParagraphStyle,
} from './styles.css';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <Text className={blogParagraphStyle}>{children}</Text>,
    h2: ({ children }) => (
      <Heading as="h2" variant="h2" className={blogHeadingStyle}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" variant="h3" className={blogHeadingStyle}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading as="h4" variant="h4" className={blogHeadingStyle}>
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading as="h5" variant="h5" className={blogHeadingStyle}>
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading as="h6" variant="h6" className={blogHeadingStyle}>
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <blockquote className={blogBlockquoteStyle}>{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className={blogListStyle}>{children}</ul>,
    number: ({ children }) => <ol className={blogListStyle}>{children}</ol>,
  },
};

type BlogTextProps = {
  body: PortableTextValue;
};

export const BlogText: FunctionComponent<BlogTextProps> = ({ body }) => (
  <PortableText value={body} components={components} />
);
