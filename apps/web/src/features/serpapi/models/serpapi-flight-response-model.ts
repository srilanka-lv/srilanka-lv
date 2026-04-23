import type { SerpApiFlightResultModel } from './serpapi-flight-result-model';
import type { SerpApiPriceInsightsModel } from './serpapi-price-insights-model';

export type SerpApiFlightResponseModel = {
  best_flights?: SerpApiFlightResultModel[];
  other_flights?: SerpApiFlightResultModel[];
  price_insights?: SerpApiPriceInsightsModel;
};
