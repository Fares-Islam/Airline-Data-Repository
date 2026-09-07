import airports from "../assets/iataCodes.json";

import type { Airport } from "../types/airport";

const airportLookup = new Map<
  string,
  string
>();

const airportData =
  Object.values(airports) as Airport[];

for (const airport of airportData) {
  if (!airport.iata) {
    continue;
  }

  airportLookup.set(
    airport.iata,
    airport.city,
  );
}

export function airportName(
  iata: string,
) {
  return airportLookup.get(iata) ?? iata;
}