import type { SanityProviderInterface } from '../interfaces/sanity-provider-interface';
import type { SanityRepositoryInterface } from '../interfaces/sanity-repository-interface';

export class DefaultSanityRepository implements SanityRepositoryInterface {
  readonly provider: SanityProviderInterface;

  constructor(provider: SanityProviderInterface) {
    this.provider = provider;
  }

  public async query<Q extends string>(groq: Q, params?: Record<string, unknown>) {
    return this.provider.fetch(groq, params);
  }
}
