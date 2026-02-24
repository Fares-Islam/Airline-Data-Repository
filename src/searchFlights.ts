import iataCodesJson from "./assets/iataCodes.json";

export type FlightResult = {
  from: string;
  to: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival?: string;
  travelClass: string;
};

export async function searchFlights(
  selectedOption: string,
  fromIata: string,
  toIata: string,
  outboundDate: string,
  returnDate?: string,
): Promise<FlightResult[]> {

  const type = selectedOption === "Round trip" ? 1 : 2;

  const params = new URLSearchParams({
    type: String(type),
    departure_id: fromIata,
    arrival_id: toIata,
    outbound_date: outboundDate,
    currency: "USD",
  });

  if (type === 1 && returnDate) {
    params.append("return_date", returnDate);
  }

  const url = `https://airline-data-repository.vercel.app/api/search?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    console.error("API failed:", text);
    throw new Error("API request failed");
  }

  const data = await res.json();

  if (data.error) {
    console.error("Server error:", data.error);
    throw new Error(data.error);
  }

  if (data.search_information?.flights_results_state === "Fully empty") {
    return [];
  }

  const iataCodes = Object.values(iataCodesJson);

  const cityFromIata = (iata: string) =>
    iataCodes.find((x) => x.iata === iata)?.city || iata;

  const results: FlightResult[] = [];

  if (data.other_flights) {
    for (const group of data.other_flights) {
      for (const flight of group.flights) {
        results.push({
          from: cityFromIata(flight.departure_airport.id),
          to: cityFromIata(flight.arrival_airport.id),
          airline: flight.airline,
          flightNumber: flight.flight_number,
          departure: flight.departure_airport.time,
          arrival: flight.arrival_airport?.time,
          travelClass: flight.travel_class,
        });
      }
    }
  }

  return results;
}