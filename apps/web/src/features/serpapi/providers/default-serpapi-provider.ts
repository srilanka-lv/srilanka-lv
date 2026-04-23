import { getJson } from 'serpapi';

import type { SerpApiProviderInterface } from '../interfaces/serpapi-provider-interface';
import type { SerpApiConfigModel } from '../models/serp-api-config-model';
import type { SerpApiFlightResponseModel } from '../models/serp-api-flight-response-model';

export class DefaultSerpApiProvider implements SerpApiProviderInterface {
  private readonly apiKey: string;

  constructor(config: SerpApiConfigModel) {
    this.apiKey = config.apiKey;
  }

  public async searchFlights(params: {
    departureId: string;
    arrivalId: string;
    outboundDate: string;
    currency?: string;
  }): Promise<SerpApiFlightResponseModel> {
    const response = await getJson('google_flights', {
      api_key: this.apiKey,
      departure_id: params.departureId,
      arrival_id: params.arrivalId,
      outbound_date: params.outboundDate,
      type: '2',
      adults: 1,
      travel_class: 1,
      currency: params.currency ?? 'EUR',
      gl: 'lv',
      hl: 'en',
      deep_search: true,
    });

    return response as unknown as SerpApiFlightResponseModel;
  }
}
