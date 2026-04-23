import type { RawFlightResult } from './raw-flight-result';

export type RawResponse = {
  best_flights?: RawFlightResult[];
  other_flights?: RawFlightResult[];
};
