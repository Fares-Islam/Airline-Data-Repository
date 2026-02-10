import iataCodesJson from "./assets/iataCodes.json"; // https://github.com/mwgg/Airports

export type FlightResult = {
  from: string;
  to: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival?: string;
  travelClass: string;
};

const formatDate = (value: string) =>
  `${value.slice(6, 10)}-${value.slice(0, 2)}-${value.slice(3, 5)}`;

export async function searchFlights(
  selectedOption: string,
  fromIata: string,
  toIata: string,
  outboundDate: string,
  returnDate?: string,
): Promise<FlightResult[]> {
  const apiKey = import.meta.env.VITE_API_KEY;

  const type = selectedOption === "Round trip" ? 1 : 2;

  const url =
    `/api-serp/search.json?api_key=${apiKey}` +
    `&type=${type}&engine=google_flights` +
    `&departure_id=${fromIata}&arrival_id=${toIata}` +
    `&outbound_date=${formatDate(outboundDate)}` +
    (type === 1 && returnDate
      ? `&return_date=${formatDate(returnDate)}`
      : "") +
    `&currency=USD`;

  const res = await fetch(url);
  const data = await res.json();

  if (
    data.search_information?.flights_results_state === "Fully empty"
  ) {
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
