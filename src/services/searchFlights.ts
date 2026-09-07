import airports from "../assets/iataCodes.json";
import type { FlightResult } from "../types/flight";

interface Airport {
  iata: string;
  city: string;
}

interface SerpApiFlight {
  airline: string;
  flight_number: string;
  travel_class: string;
  departure_airport: {
    id: string;
    time: string;
  };
  arrival_airport: {
    id: string;
    time: string;
  };
}

interface SerpApiItinerary {
  flights: SerpApiFlight[];
}

interface SearchResponse {
  error?: string;
  search_information?: {
    flights_results_state?: string;
  };
  best_flights?: SerpApiItinerary[];
  other_flights?: SerpApiItinerary[];
}

const airportMap = new Map<string, string>();

for (const airport of Object.values(airports) as Airport[]) {
  if (airport.iata) {
    airportMap.set(airport.iata, airport.city);
  }
}

const cityFromIata = (iata: string): string => airportMap.get(iata) ?? iata;

export async function searchFlights(
  selectedOption: string,
  fromIata: string,
  toIata: string,
  outboundDate: string,
  returnDate?: string,
): Promise<FlightResult[]> {
  
  fromIata = fromIata.toUpperCase();
  toIata = toIata.toUpperCase();

  const type = selectedOption === "Round trip" ? 1 : 2;

  const params = new URLSearchParams({
    type: String(type),
    departure_id: fromIata,
    arrival_id: toIata,
    outbound_date: outboundDate,
    currency: "USD",
    deep_search: "true",
  });

  if (type === 1 && returnDate) {
    params.append("return_date", returnDate);
  }

  const response = await fetch(`/api/search?${params.toString()}`);

  const data = (await response.json()) as SearchResponse;

  if (!response.ok) {
    throw new Error(
      typeof data.error === "string" ? data.error : "Flight search failed.",
    );
  }

  if (data.search_information?.flights_results_state === "Fully empty") {
    return [];
  }

  const itineraries = [
    ...(data.best_flights ?? []),
    ...(data.other_flights ?? []),
  ];

  const results: FlightResult[] = [];

  for (const itinerary of itineraries) {
    const flights = itinerary.flights;

    if (!flights.length) {
      continue;
    }

    const firstFlight = flights[0];
    const lastFlight = flights[flights.length - 1];

    if (
      firstFlight.departure_airport.id.toUpperCase() !== fromIata ||
      lastFlight.arrival_airport.id.toUpperCase() !== toIata
    ) {
      continue;
    }

    const airlines = [
      ...new Set(flights.map((flight: SerpApiFlight) => flight.airline)),
    ];

    const flightNumbers = flights.map(
      (flight: SerpApiFlight) => flight.flight_number,
    );

    results.push({
      id: `${fromIata}-${toIata}-${firstFlight.departure_airport.time}-${flightNumbers.join("-")}`,
      from: cityFromIata(fromIata),
      to: cityFromIata(toIata),
      airline: airlines.join(", "),
      flightNumber: flightNumbers.join(" / "),
      departure: firstFlight.departure_airport.time,
      arrival: lastFlight.arrival_airport.time,
      travelClass: firstFlight.travel_class,
    });
  }

  return results;
}
