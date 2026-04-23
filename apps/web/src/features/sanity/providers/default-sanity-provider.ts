import { env } from 'next-runtime-env';
import { createClient } from 'next-sanity';

import type { SanityProviderInterface } from '../interfaces/sanity-provider-interface';
import type { SanityClientModel } from '../models/sanity-client-model';

export class DefaultSanityProvider implements SanityProviderInterface {
  private readonly client: SanityClientModel;

  constructor() {
    this.client = createClient({
      projectId: env('NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID'),
      dataset: env('NEXT_PUBLIC_SANITY_STUDIO_DATASET'),
      apiVersion: '2026-04-22',
      token: env('SANITY_API_KEY'),
      useCdn: false,
    });
  }

  public async fetch<Q extends string>(query: Q, params: Record<string, unknown> = {}) {
    return this.client.fetch(query, params);
  }
}
