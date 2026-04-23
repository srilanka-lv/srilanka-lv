import { getJson } from 'serpapi';

import type { SerpApiProviderInterface } from '../interfaces/serpapi-provider-interface';
import type { SerpApiFlightResponseModel } from '../models/serpapi-flight-response-model';

export class DefaultSerpApiProvider implements SerpApiProviderInterface {
  public async searchFlights(params: {
    airportDepartureId: string;
    airportArrivalId: string;
    outboundDate: string;
  }): Promise<SerpApiFlightResponseModel> {
    const { airportDepartureId, airportArrivalId, outboundDate } = params;

    const data = await getJson('google_flights', {
      api_key: process.env.SERPAPI_API_KEY,
      departure_id: airportDepartureId,
      arrival_id: airportArrivalId,
      outbound_date: outboundDate,
      type: '2', // One-way flight
      adults: 1, // 1 adult
      travel_class: 1, // Economy class
      currency: 'EUR', // Euro
      gl: 'lv', // Latvian
      hl: 'lv', // Latvian
      deep_search: true, // Deep search
    });

    return data as unknown as SerpApiFlightResponseModel;
  }
}
