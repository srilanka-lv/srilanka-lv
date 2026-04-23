import type { SerpApiFlightModel } from './serpapi-flight-model';
import type { SerpApiLayoverModel } from './serpapi-layover-model';

export type SerpApiFlightResultModel = {
  flights: SerpApiFlightModel[];
  layovers?: SerpApiLayoverModel[];
  total_duration: number;
  price: number;
  type: string;
  airline_logo: string;
  booking_token?: string;
};
