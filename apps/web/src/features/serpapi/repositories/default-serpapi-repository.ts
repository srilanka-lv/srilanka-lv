import type { SerpApiProviderInterface } from '../interfaces/serpapi-provider-interface';
import type { SerpApiRepositoryInterface } from '../interfaces/serpapi-repository-interface';

export class DefaultSerpApiRepository implements SerpApiRepositoryInterface {
  readonly provider: SerpApiProviderInterface;

  constructor(provider: SerpApiProviderInterface) {
    this.provider = provider;
  }

  public async searchFlights(params: {
    airportDepartureId: string;
    airportArrivalId: string;
    outboundDate: string;
  }) {
    return this.provider.searchFlights(params);
  }
}
