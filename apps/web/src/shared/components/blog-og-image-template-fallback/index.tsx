import type { FunctionComponent } from 'react';

import { SITE_NAME } from '@/shared/constants/site-name';

import { BlogOgImageTemplateLogo } from '../blog-og-image-template-logo';

export const BlogOgImageTemplateFallback: FunctionComponent = () => (
  <div
    style={{
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      color: 'whitesmoke',
      fontFamily: 'Comme',
      fontWeight: 700,
    }}
  >
    <div style={{ display: 'flex', marginBottom: 32 }}>
      <BlogOgImageTemplateLogo width={300} />
    </div>
    <div style={{ display: 'flex', fontSize: 36, opacity: 0.8 }}>{SITE_NAME}</div>
  </div>
);
