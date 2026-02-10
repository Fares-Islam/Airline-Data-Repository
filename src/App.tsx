import { Box, CssBaseline, GlobalStyles, Typography } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import IataSearchBar from "./iataSearchBar";
import SearchResult from "./searchResult";
import DateSearchBar from "./dateSearchBar";
import SearchMode from "./searchMode";
import SearchButton from "./searchButton";
import { ContextProvider, UseContext } from "./context";

function App() {
  const { selectedOption } = UseContext();

  const today = dayjs().format("MM-DD-YYYY");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date1, setDate1] = useState(today);
  const [date2, setDate2] = useState(today);
  const [results, setResults] = useState<
    {
      flights: {
        airline: string;
        flight_number: string;
        travel_class: string;
        departure_airport: { id: string; time: string };
        arrival_airport: { id: string; time: string };
      }[];
    }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!from || !to || !date1) return;

    setLoading(true);
    setHasSearched(true);

    const formattedDate1 =
      date1.slice(6, 10) + "-" + date1.slice(0, 2) + "-" + date1.slice(3, 5);
    const formattedDate2 =
      date2.slice(6, 10) + "-" + date2.slice(0, 2) + "-" + date2.slice(3, 5);

    const type = selectedOption === "One way" ? 2 : 1;

    const res = await fetch(
      `/api-serp/search.json?api_key=${apiKey}&type=${type}&engine=google_flights&departure_id=${from}&arrival_id=${to}&outbound_date=${formattedDate1}${type === 1 ? `&return_date=${formattedDate2}` : ``}&currency=USD`
    );

    const data = await res.json();
    setResults(data?.other_flights || []);
    setLoading(false);
  };

  return (
    <ContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ body: { margin: 0 } }} />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage:
            "radial-gradient(circle at top, #2c2d35, #15161a)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#cfd1ff", mb: 3, fontWeight: 600 }}
        >
          Flight Search
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Typography sx={{ width: 55, color: "#b6b6c9" }}>From</Typography>
          <IataSearchBar value={from} onChange={setFrom} />
          <DateSearchBar value={date1} onChange={setDate1} />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Typography sx={{ width: 55, color: "#b6b6c9" }}>To</Typography>
          <IataSearchBar value={to} onChange={setTo} />
          <DateSearchBar value={date2} onChange={setDate2} />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <SearchMode />
          <SearchButton onClick={handleSearch} loading={loading} />
        </Box>

        <SearchResult results={results} hasSearched={hasSearched} />
      </Box>
    </ContextProvider>
  );
}

export default App;
