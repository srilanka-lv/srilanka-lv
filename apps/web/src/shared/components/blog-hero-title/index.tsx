import type { FunctionComponent, PropsWithChildren } from 'react';

import { Heading } from '../heading';
import { blogHeroTitleStyle } from './styles.css';

type BlogHeroTitleProps = PropsWithChildren;

export const BlogHeroTitle: FunctionComponent<BlogHeroTitleProps> = ({ children }) => (
  <Heading as="h1" variant="h1" className={blogHeroTitleStyle}>
    {children}
  </Heading>
);
