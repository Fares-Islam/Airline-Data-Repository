import type { FlightResult } from "./searchFlights";

export default function FlightResults( results : FlightResult[]) {
  if (!results.length) {
    return <p>No results found.</p>;
  }

  return (
    <div className="searchresultsbox">
      {results.map((flight, i) => (
        <div key={i} className="searchresult">
          <h3>
            From {flight.from} to {flight.to}
          </h3>

          <p>
            Airline: {flight.airline} <br />
            Flight: {flight.flightNumber} <br />
            Departure: {flight.departure} <br />
            {flight.arrival && <>Arrival: {flight.arrival} <br /></>}
            Class: {flight.travelClass}
          </p>
        </div>
      ))}
    </div>
  );
}