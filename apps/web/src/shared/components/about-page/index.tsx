/**
 * Direction contract (impeccable, surface seed 27914f7a, candidate 7/7).
 *
 * THESIS: Grieta's letter experienced as a scroll through the island: quiet
 * paper passages that break, at each emotional turn, into full-bleed
 * photographs. Refuses the about-page default (portrait beside a bio column
 * with fact cards).
 * OWN-WORLD: warm paper, espresso ink, one coral accent, Comme; black bottom
 * scrims under whitesmoke luminosity type on photos; hairline color-mix
 * borders; her ink signature as the sign-off.
 * STORY: A reader meets Grieta on the beach, reads how an accidental Google
 * search became a home, watches the island interrupt her text the way it
 * interrupted her life, and leaves trusting her, toward the girls' trip or
 * the blog.
 * FIRST VIEWPORT: breadcrumb trail, then a full-bleed beach photo cut by the
 * fold; "Par mani" large at bottom-left over the scrim, her greeting beneath.
 * FORM: immersive photo-scroll, assigned by seed roll over a 7-candidate
 * ranked list; staging: letter passages at 65ch, photo breaks at 65-75svh.
 */
import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { FunctionComponent } from 'react';

import { AboutPageHeroSection } from '@/shared/components/about-page-hero-section';
import { AboutPagePostcardsSection } from '@/shared/components/about-page-postcards-section';
import { AboutPageStorySection } from '@/shared/components/about-page-story-section';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';
import { SectionBlogs } from '@/shared/components/section-blogs';

export const AboutPage: FunctionComponent = () => {
  const href = `/${PAGES.LV.ABOUT_ME}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      <AboutPageHeroSection />
      <AboutPageStorySection />
      <AboutPagePostcardsSection />
      <SectionBlogs sectionTitle="Mani piedzīvojumi Šrilankā" blogsLimit={6} />
    </>
  );
};
