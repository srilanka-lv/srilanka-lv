import { PAGE_PRODUCTS_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = () => buildPageMetadata(PAGE_PRODUCTS_SLUG);

export default function ProductsPage() {
  return (
    <>
      <Breadcrumbs items={buildSectionItems(`/${PAGE_PRODUCTS_SLUG}`)} />
      <span>Products Page</span>
    </>
  );
}
