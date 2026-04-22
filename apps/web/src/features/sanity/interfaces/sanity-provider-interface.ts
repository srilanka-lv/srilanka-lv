import type { SanityQueriesModel } from '../models/sanity-queries-model';

export interface SanityProviderInterface {
  fetch<Q extends string>(
    query: Q,
    params?: Record<string, unknown>,
  ): Promise<Q extends keyof SanityQueriesModel ? SanityQueriesModel[Q] : unknown>;
}
