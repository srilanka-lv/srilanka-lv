import type { FunctionComponent } from 'react';

import { socialMediaItems } from '../navigation/index.data';
import { footerSocialLinkStyle, footerSocialsStyle } from './styles.css';

export const FooterSocials: FunctionComponent = () => (
  <div className={footerSocialsStyle}>
    {socialMediaItems.map(({ href, icon, label }) => (
      <a
        key={href}
        className={footerSocialLinkStyle}
        href={href}
        aria-label={label}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {icon}
      </a>
    ))}
  </div>
);
