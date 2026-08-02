import Image from 'next/image';
import type { FunctionComponent } from 'react';

import {
  aboutPageHeroContentStyle,
  aboutPageHeroImageStyle,
  aboutPageHeroLedeStyle,
  aboutPageHeroSectionStyle,
  aboutPageHeroTitleStyle,
} from './styles.css';

export const AboutPageHeroSection: FunctionComponent = () => (
  <section className={aboutPageHeroSectionStyle}>
    <Image
      className={aboutPageHeroImageStyle}
      src="/images/srilanka-lv_par-mani.webp"
      alt="Grieta pastaigā pa Šrilankas pludmali saulrietā"
      fill
      sizes="100vw"
      preload
      quality={75}
    />
    <div className={aboutPageHeroContentStyle}>
      <h1 className={aboutPageHeroTitleStyle}>Par mani</h1>
      <p className={aboutPageHeroLedeStyle}>
        Sveiki! Mani sauc Grieta, un Šrilanka jau divus gadus ir manas mājas.
      </p>
    </div>
  </section>
);
