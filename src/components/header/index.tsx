import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import type { FunctionComponent } from "react";

import { headerContentStyle, headerStyle, payButtonStyle } from "./styles.css";

export const Header: FunctionComponent = () => (
  <header className={headerStyle}>
    <div className={headerContentStyle}>
      <Image
        src="/srilanka-lv_logo.png"
        alt="SriLanka.lv Logo"
        width={150}
        height={41}
      />
      <a
        href="https://payhip.com/b/2mq5J"
        className={clsx("payhip-buy-button", payButtonStyle)}
        data-theme="none"
        data-product="2mq5J"
      >
        <FontAwesomeIcon icon={faCartPlus} />
        Pirkt ceļvedi
      </a>
    </div>
  </header>
);
