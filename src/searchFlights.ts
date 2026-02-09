// import iataCodesJson from "./assets/iataCodes.json";

// function SearchFlights(selectedOption: string) {
//   const apiKey = import.meta.env.VITE_API_KEY;

//   const iataInput1Value = (
//     document.getElementsByName("iatainput")[0] as HTMLInputElement
//   ).value.toUpperCase();
//   const iataInput2Value = (
//     document.getElementsByName("iatainput")[1] as HTMLInputElement
//   ).value.toUpperCase();
//   const dateInput1 = document.getElementsByName(
//     "dateinput",
//   )[0] as HTMLInputElement;
//   const dateInput2 = document.getElementsByName(
//     "dateinput",
//   )[1] as HTMLInputElement;
//   const searchResultsBox = document.getElementsByClassName(
//     "searchresultsbox",
//   )[0] as HTMLDivElement;
//   const searchResult = document.getElementsByClassName(
//     "searchresult",
//   )[0] as HTMLDivElement;

//   let formattedDate1 =
//     dateInput1.value.slice(6, 10) +
//     "-" +
//     dateInput1.value.slice(0, 2) +
//     "-" +
//     dateInput1.value.slice(3, 5);

//   let formattedDate2 =
//     dateInput2.value.slice(6, 10) +
//     "-" +
//     dateInput2.value.slice(0, 2) +
//     "-" +
//     dateInput2.value.slice(3, 5);

//   let selectedOptionNumber;

//   if (selectedOption == "One way") selectedOptionNumber = 2;
//   else if (selectedOption == "Round trip") selectedOptionNumber = 1;

//   fetch(
//     `/api-serp/search.json?api_key=${apiKey}&type=${selectedOptionNumber}&engine=google_flights&departure_id=${iataInput1Value}&arrival_id=${iataInput2Value}&outbound_date=${formattedDate1}${selectedOptionNumber == 1 ? `&return_date=${formattedDate2}` : ``}&currency=USD`,
//   ).then((response) => {
//     response.json().then((data) => {
//       if (data.search_information !== undefined)
//         if (data.search_information.flights_results_state !== undefined)
//           if (data.search_information.flights_results_state === "Fully empty") {
//             if (searchResultsBox.children.length <= 0) {
//               const searchResultClones = searchResult.cloneNode(true);
//               searchResultClones.childNodes[0].childNodes[0].textContent = `No results Found`;
//               searchResultClones.childNodes[0].childNodes[1].textContent = ``;
//               searchResultsBox.appendChild(searchResultClones);
//             } else {
//               for (let i = 0; i < searchResultsBox.children.length; i++) {
//                 if (
//                   searchResultsBox.children[i].children[0].children[0]
//                     .textContent == `No results Found`
//                 ) {
//                   (
//                     searchResultsBox.children[i] as HTMLDivElement
//                   ).style.display = "block";
//                 } else if (i >= searchResultsBox.children.length) {
//                   const searchResultClones = searchResult.cloneNode(true);
//                   searchResultClones.childNodes[0].childNodes[0].textContent = `No results Found`;
//                   searchResultClones.childNodes[0].childNodes[1].textContent = ``;
//                   searchResultsBox.appendChild(searchResultClones);
//                 }
//               }
//             }
//             return;
//           }

//       for (let i = 0; i < searchResultsBox.children.length; i++) {
//         if (
//           searchResultsBox.children[i].children[0].children[0].textContent ==
//           `No results Found`
//         ) {
//           (searchResultsBox.children[i] as HTMLDivElement).style.display =
//             "none";
//         }
//       }

//       const searchResultsBoxChildrenLength = searchResultsBox.children.length;
//       for (let i = 0; i < searchResultsBoxChildrenLength; i++) {
//         if (
//           searchResultsBox.children[0].children[0].children[0].textContent ==
//           `No results Found`
//         ) {
//           continue;
//         }
//         searchResultsBox.removeChild(searchResultsBox.children[0]);
//       }

//       console.log("Flights found:");
//       console.log(data);
//       if (data.best_flights) {
//         for (let i = 0; i < data.best_flights.length; i++) {
//           for (let j = 0; j < data.best_flights[i].flights.length; j++) {
//             const flight = data.best_flights[i].flights[j];
//             // console.log(flight);
//           }
//         }
//       }

//       if (data.other_flights) {
//         for (let i = 0; i < data.other_flights.length; i++) {
//           let searchResultClones: Node[] = [];

//           for (let j = 0; j < data.other_flights[i].flights.length; j++) {
//             const flight = data.other_flights[i].flights[j];
//             const iataCodes = Object.values(iataCodesJson);
//             let departureCity;
//             let arrivalCity;

//             for (let k = 0; k < iataCodes.length; k++) {
//               if (flight.departure_airport.id == iataCodes[k].iata) {
//                 departureCity = iataCodes[k].city;
//               }
//               if (flight.arrival_airport.id == iataCodes[k].iata) {
//                 arrivalCity = iataCodes[k].city;
//               }
//             }

//             searchResultClones.push(searchResult.cloneNode(true));
//             searchResultClones[j].childNodes[0].childNodes[0].textContent =
//               `From ${departureCity} to ${arrivalCity}`;
//             searchResultClones[j].childNodes[0].childNodes[1].textContent =
//               `Airline: ${flight.airline}\nFlight_Number: ${flight.flight_number}\nDeparture_Time: ${flight.departure_airport.time}\n${flight.arrival_airport != undefined ? `Arrival_Time: ${flight.arrival_airport.time}\n` : `\n`}Travel_Class: ${flight.travel_class}`;

//             console.log(searchResultClones[j].childNodes[0].childNodes[0]);
//           }
//           if (searchResultClones.length == 1) {
//             searchResultClones[0].childNodes[0].childNodes[1].textContent += `\n\nPrice: ${data.other_flights[i].price}$`
//           } else if (searchResultClones.length == 2) {
//             const cities = flights.map((flight: any) => getCity(flight.arrival_airport.id));
//       displayTitle = `From ${getCity(flights[0].departure_airport.id)} to ${cities.join(" to ")}`;
    
//             searchResultClones[0].childNodes[0].childNodes[0].textContent = `From ${searchResultClones[0].childNodes[0].childNodes[0].textContent?.split(" ")[1]} to ${searchResultClones[0].childNodes[0].childNodes[0].textContent?.split(" ")[3]} to ${searchResultClones[1].childNodes[0].childNodes[0].textContent?.split(" ")[3]}`;
//             searchResultClones[0].childNodes[0].childNodes[1].textContent = `Flight 1:\n${searchResultClones[0].childNodes[0].childNodes[1].textContent}\n\nFlight 2:\n${searchResultClones[1].childNodes[0].childNodes[1].textContent}\n\nPrice: ${data.other_flights[i].price}$`;
//           } else if (searchResultClones.length == 3) {
//             searchResultClones[0].childNodes[0].childNodes[0].textContent = `From ${searchResultClones[0].childNodes[0].childNodes[0].textContent?.split(" ")[1]} to ${searchResultClones[0].childNodes[0].childNodes[0].textContent?.split(" ")[3]} to ${searchResultClones[1].childNodes[0].childNodes[0].textContent?.split("from ")[1].split(" to")} to ${searchResultClones[2].childNodes[0].childNodes[0].textContent?.split(" ")[3]}`;
//             searchResultClones[0].childNodes[0].childNodes[1].textContent = `Flight 1:\n${searchResultClones[0].childNodes[0].childNodes[1].textContent}\n\nFlight 2:\n${searchResultClones[1].childNodes[0].childNodes[1].textContent}\n\nFlight 3:\n${searchResultClones[2].childNodes[0].childNodes[1].textContent}\n\nPrice: ${data.other_flights[i].price}$`;
//           }
//           searchResultsBox.appendChild(searchResultClones[0]);
//           searchResultClones = [];
//         }
//       }
//     });
//   });
// }

// export default SearchFlights;


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
