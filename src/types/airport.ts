export interface Airport {
  iata: string;
  icao: string;

  city: string;
  state: string;
  country: string;

  name: string;

  elevation: number;

  lat: number;
  lon: number;

  tz: string;
}

export interface AirportSearchResult {
  iata: string;
  city: string;
  country: string;
  name: string;
}