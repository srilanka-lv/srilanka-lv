import type { SerpApiFlightResultModel } from './serp-api-flight-result-model';
import type { SerpApiPriceInsightsModel } from './serp-api-price-insights-model';

export type SerpApiFlightResponseModel = {
  best_flights: SerpApiFlightResultModel[];
  other_flights?: SerpApiFlightResultModel[];
  price_insights?: SerpApiPriceInsightsModel;
};
