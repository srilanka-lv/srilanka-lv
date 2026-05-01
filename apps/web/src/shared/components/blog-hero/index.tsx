import clsx from 'clsx';
import type { ComponentPropsWithoutRef, FunctionComponent, PropsWithChildren } from 'react';

import { blogHeroStyle } from './styles.css';

type BlogHeroProps = PropsWithChildren<{ className?: string }> & ComponentPropsWithoutRef<'div'>;

export const BlogHero: FunctionComponent<BlogHeroProps> = ({ className, children, ...props }) => (
  <div {...props} className={clsx(blogHeroStyle, className)}>
    {children}
  </div>
);
