import type { FunctionComponent } from 'react';

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
          href="https://wa.me/642902323786"
          title="WhatsApp"
        >
          +64 2902323786
        </a>
      </li>
      <li className={subFooterItemStyle}>E-pasts: sveiki@srilanka.lv</li>
      {/* <li className={subFooterItemStyle}>Privātuma noteikumi</li>
      <li className={subFooterItemStyle}>Atruna</li> */}
      <li className={subFooterItemStyle}>
        <a className={subFooterLinkStyle} href="/llms.txt">
          llms.txt
        </a>
      </li>
    </ul>
  );
};
