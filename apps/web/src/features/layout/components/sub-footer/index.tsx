import type { FunctionComponent } from 'react';

import { AskGrietaCta } from '@/features/ask-grieta/components/ask-grieta-cta';

import { subFooterItemStyle, subFooterLinkStyle, subFooterStyle } from './styles.css';

export const SubFooter: FunctionComponent = () => {
  const year = new Date().getFullYear();

  return (
    <ul className={subFooterStyle}>
      <li className={subFooterItemStyle}>Copyright © {year} Srilanka.lv. All rights reserved.</li>
      <li className={subFooterItemStyle}>
        WhatsApp:{' '}
        {/* Opens the Ask Grieta drawer, whose footer has the direct WhatsApp,
            Instagram and phone routes (WhatsApp links dead-end in Instagram). */}
        <AskGrietaCta
          as="link"
          entry="replaced-whatsapp"
          placement="sub-footer"
          className={subFooterLinkStyle}
        >
          +64 2902323786
        </AskGrietaCta>
      </li>
      <li className={subFooterItemStyle}>
        E-pasts:{' '}
        <a
          className={subFooterLinkStyle}
          href="mailto:sveiki@srilanka.lv"
          data-umami-event="contact"
          data-umami-event-channel="email"
          data-umami-event-placement="sub-footer"
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
