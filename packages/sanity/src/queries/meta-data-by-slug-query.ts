import { defineQuery } from 'groq';

export const metaDataBySlugQuery = defineQuery('*[slug.current == $slug][0]{ seo, openGraph }');
