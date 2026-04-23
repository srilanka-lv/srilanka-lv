import type { SerpApiFlightResponseModel } from '../models/serp-api-flight-response-model';

export interface SerpApiProviderInterface {
  searchFlights(params: {
    departureId: string;
    arrivalId: string;
    outboundDate: string;
    currency?: string;
  }): Promise<SerpApiFlightResponseModel>;
}
