import { SectionBlogs } from '@/shared/components/section-blogs';
import { SectionFaqs } from '@/shared/components/section-faqs';
import { SectionHero } from '@/shared/components/section-hero';

export default function HomePage() {
  return (
    <>
      <SectionHero />
      <SectionFaqs />
      <SectionBlogs />
    </>
  );
}
