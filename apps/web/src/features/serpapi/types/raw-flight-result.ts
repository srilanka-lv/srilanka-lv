import type { RawFlight } from './raw-flight';
import type { RawLayover } from './raw-layover';

export type RawFlightResult = {
  flights: RawFlight[];
  layovers?: RawLayover[];
  total_duration: number;
  carbon_emissions?: {
    this_flight: number;
    typical_for_this_route: number;
    difference_percent: number;
  };
  price: number;
  type: string;
  airline_logo: string;
  booking_token?: string;
};
