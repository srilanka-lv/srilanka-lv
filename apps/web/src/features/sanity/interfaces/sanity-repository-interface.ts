import type { SanityQueriesModel } from '../models/sanity-queries-model';

export interface SanityRepositoryInterface {
  query<Q extends string>(
    groq: Q,
    params?: Record<string, unknown>,
  ): Promise<Q extends keyof SanityQueriesModel ? SanityQueriesModel[Q] : unknown>;
}
