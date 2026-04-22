import type { SanityClient } from '@sanity/client';

export type { SanityClient };

export interface SanityRepository {
  readonly client: SanityClient;
}
