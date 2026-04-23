export type SerpApiFlightModel = {
  departure_airport: {
    name: string;
    id: string;
    time: string;
  };
  arrival_airport: {
    name: string;
    id: string;
    time: string;
  };
  duration: number;
  airline: string;
  airline_logo: string;
  flight_number: string;
  travel_class: string;
  extensions: string[];
};
