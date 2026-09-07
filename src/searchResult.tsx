import {
  Box,
  Fade,
  Stack,
} from "@mui/material";

import type { FlightResult } from "./types/flight";

import EmptyResults from "./components/search/EmptyResults";
import FlightCard from "./components/search/FlightCard";
import SearchSummary from "./components/search/SearchSummary";

interface Props {
  results: FlightResult[];
  hasSearched: boolean;
}

export default function SearchResult({
  results,
  hasSearched,
}: Props) {
  if (!hasSearched) {
    return null;
  }

  if (results.length === 0) {
    return <EmptyResults />;
  }

  return (
    <Fade
      in
      timeout={250}
    >
      <Box
        sx={{
          mt: 5,
        }}
      >
        <SearchSummary
          count={results.length}
        />

        <Stack spacing={2.5}>
          {results.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
            />
          ))}
        </Stack>
      </Box>
    </Fade>
  );
}