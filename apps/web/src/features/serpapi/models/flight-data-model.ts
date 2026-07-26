export type FlightAirportModel = {
  name: string;
  id: string;
  time: string; // "2026-07-06 16:00"
};

export type FlightLegModel = {
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureAirport: FlightAirportModel;
  arrivalAirport: FlightAirportModel;
  duration: number; // minutes
  airplane?: string;
  travelClass?: string;
  legroom?: string;
  extensions?: string[];
  overnight?: boolean;
};

export type FlightLayoverStopModel = {
  name: string;
  id: string;
  duration: number; // minutes
};

export type FlightCarbonEmissionsModel = {
  this_flight?: number;
  typical_for_this_route?: number;
  difference_percent?: number;
};

export type FlightCheapestModel = {
  price: number; // EUR, one-way
  totalDuration: number; // minutes
  stops: number;
  flights: FlightLegModel[];
  layovers: FlightLayoverStopModel[];
  carbonEmissions?: FlightCarbonEmissionsModel;
  bookingToken?: string;
};

export type FlightDateModel = {
  date: string; // YYYY-MM-DD
  cheapestFlight: FlightCheapestModel;
};

export type FlightMonthModel = {
  month: string; // YYYY-MM
  label: string; // English label written by map-flights.ts; never rendered
  averagePrice: number;
  lowestPrice: number;
  dates: FlightDateModel[];
};

export type FlightDataModel = {
  queriedOn: string; // YYYY-MM-DD
  months: FlightMonthModel[];
};

// Slim shape sent to the client Tabs component (the 148K JSON must stay server-side)
export type FlightMonthSummaryModel = {
  month: string;
  lowestPrice: number;
  averagePrice: number;
  dateCount: number;
};
