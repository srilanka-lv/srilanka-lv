export type RawFlight = {
  departure_airport: { name: string; id: string; time: string };
  arrival_airport: { name: string; id: string; time: string };
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  flight_number: string;
  travel_class: string;
  legroom: string;
  extensions: string[];
  overnight?: boolean;
};
