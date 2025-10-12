// Root styles
import "@/styles/global.css";

// Font Awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { plusJakartaSans } from "@/app/fonts";
import { bodyStyle } from "./layout.css";

// Meta
export const metadata: Metadata = {
  title: "Ceļojums uz Šrilanku | SriLanka.lv",
  description: "Viss kas jāzina pirms ceļo uz Šrilanku",
};

// Types
type RootLayoutReturnType = Readonly<{
  children: ReactNode;
}>;

// Component
export default function RootLayout({ children }: RootLayoutReturnType) {
  return (
    <html lang="en">
      <body className={clsx(plusJakartaSans.className, bodyStyle)}>
        {children}
        <Script
          src="https://payhip.com/payhip.js"
          strategy="beforeInteractive"
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
