import { SITE_NAME } from '@/shared/constants/site-name';

import { Logo } from './logo';

export function BrandedFallback() {
  return (
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
        <Logo width={300} />
      </div>
      <div style={{ display: 'flex', fontSize: 36, opacity: 0.8 }}>{SITE_NAME}</div>
    </div>
  );
}
