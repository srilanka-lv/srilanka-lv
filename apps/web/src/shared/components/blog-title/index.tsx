import type { FunctionComponent, PropsWithChildren } from 'react';

import { Heading } from '../heading';
import { blogTitleStyle } from './styles.css';

type BlogTitleProps = PropsWithChildren;

export const BlogTitle: FunctionComponent<BlogTitleProps> = ({ children }) => (
  <Heading as="h1" variant="h1" className={blogTitleStyle}>
    {children}
  </Heading>
);
