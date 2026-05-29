import { PAGE_PRODUCTS_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';

export const generateMetadata = () => buildPageMetadata(PAGE_PRODUCTS_SLUG);

export default function ProductsPage() {
  return <span>Products Page</span>;
}
