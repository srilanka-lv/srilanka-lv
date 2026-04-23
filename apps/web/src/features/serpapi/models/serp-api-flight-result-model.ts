import type { SerpApiFlightModel } from './serp-api-flight-model';
import type { SerpApiLayoverModel } from './serp-api-layover-model';

export type SerpApiFlightResultModel = {
  flights: SerpApiFlightModel[];
  layovers?: SerpApiLayoverModel[];
  total_duration: number;
  price: number;
  type: string;
  airline_logo: string;
  booking_token?: string;
};
