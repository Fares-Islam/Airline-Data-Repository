import {
  airportName,
} from "./airportLookup";

import type {
  FlightResult,
} from "../types/flight";

interface Flight {
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

export function mapFlights(
  flights: Flight[],
): FlightResult[] {
  return flights.map((flight) => ({
    id: [
      flight.flight_number,
      flight.departure_airport.time,
      flight.arrival_airport.time,
    ].join("-"),

    from: airportName(
      flight.departure_airport.id,
    ),

    to: airportName(
      flight.arrival_airport.id,
    ),

    airline: flight.airline,

    flightNumber:
      flight.flight_number,

    departure:
      flight.departure_airport.time,

    arrival:
      flight.arrival_airport.time,

    travelClass:
      flight.travel_class,
  }));
}