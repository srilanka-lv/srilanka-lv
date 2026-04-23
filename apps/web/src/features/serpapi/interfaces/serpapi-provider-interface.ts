import type { SerpApiFlightResponseModel } from '../models/serpapi-flight-response-model';

export interface SerpApiProviderInterface {
  searchFlights(params: {
    airportDepartureId: string;
    airportArrivalId: string;
    outboundDate: string;
  }): Promise<SerpApiFlightResponseModel>;
}
