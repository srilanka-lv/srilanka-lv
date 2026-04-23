import type { SerpApiProviderInterface } from '../interfaces/serpapi-provider-interface';
import type { SerpApiRepositoryInterface } from '../interfaces/serpapi-repository-interface';

export class DefaultSerpApiRepository implements SerpApiRepositoryInterface {
  readonly provider: SerpApiProviderInterface;

  constructor(provider: SerpApiProviderInterface) {
    this.provider = provider;
  }

  public async searchFlights(params: {
    departureId: string;
    arrivalId: string;
    outboundDate: string;
    currency?: string;
  }) {
    return this.provider.searchFlights(params);
  }
}
