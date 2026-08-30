import type { FunctionComponent } from 'react';

import { WHATSAPP_URL } from '@/shared/constants/whatsapp';

import { subFooterItemStyle, subFooterLinkStyle, subFooterStyle } from './styles.css';

export const SubFooter: FunctionComponent = () => {
  const year = new Date().getFullYear();

  return (
    <ul className={subFooterStyle}>
      <li className={subFooterItemStyle}>Copyright © {year} Srilanka.lv. All rights reserved.</li>
      <li className={subFooterItemStyle}>
        WhatsApp:{' '}
        <a
          className={subFooterLinkStyle}
          target="_blank"
          rel="noopener noreferrer"
          href={WHATSAPP_URL}
          title="WhatsApp"
          data-umami-event="contact"
          data-umami-event-channel="whatsapp"
        >
          +64 2902323786
        </a>
      </li>
      <li className={subFooterItemStyle}>
        E-pasts:{' '}
        <a
          className={subFooterLinkStyle}
          href="mailto:sveiki@srilanka.lv"
          data-umami-event="contact"
          data-umami-event-channel="email"
        >
          sveiki@srilanka.lv
        </a>
      </li>
      <li className={subFooterItemStyle}>
        <a
          className={subFooterLinkStyle}
          target="_blank"
          rel="noopener noreferrer"
          href="https://celoarmariku.lv/policies/privacy-policy"
          data-umami-event="outbound-link"
          data-umami-event-url="https://celoarmariku.lv/policies/privacy-policy"
        >
          Privātuma politika
        </a>
      </li>
      {/* <li className={subFooterItemStyle}>Atruna</li> */}
      <li className={subFooterItemStyle}>
        <a className={subFooterLinkStyle} href="/llms.txt">
          llms.txt
        </a>
      </li>
    </ul>
  );
};
