export interface FlightResult {
  id: string;

  from: string;
  to: string;

  airline: string;
  flightNumber: string;

  departure: string;
  arrival?: string;

  travelClass: string;
}

export type SearchMode =
  | "One way"
  | "Round trip";