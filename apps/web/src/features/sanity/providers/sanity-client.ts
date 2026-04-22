import { env } from 'next-runtime-env';
import { createClient } from 'next-sanity';

import { SANITY_API_VERSION } from '../constants/index';
import type { SanityClient } from '../types/index';

export function createSanityClient(): SanityClient {
  return createClient({
    projectId: env('NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: env('NEXT_PUBLIC_SANITY_DATASET'),
    apiVersion: SANITY_API_VERSION,
    useCdn: true,
  });
}
