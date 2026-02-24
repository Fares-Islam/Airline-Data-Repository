import { Box, Paper, Typography, Divider, Stack } from "@mui/material";
import type { FlightResult } from "./searchFlights";

type Props = {
  results: FlightResult[];
  hasSearched: boolean;
};

function SearchResult({ results, hasSearched }: Props) {
  if (!hasSearched) return null;

  if (!results.length) {
    return (
      <Paper
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 3,
          backgroundImage: "linear-gradient(to right, #3b3d48, #2f313b)",
          color: "#cfd1ff",
        }}
      >
        <Typography textAlign="center" fontWeight={500}>
          No results found
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ width: "85%", mt: 3 }}>
      <Stack spacing={2}>
        {results.map((flight, i) => (
          <Paper
            key={i}
            elevation={6}
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundImage: "linear-gradient(to right, #3b3d48, #2f313b)",
              color: "#d5d7ff",
              transition: "0.25s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Stack spacing={1.5}>
              {/* Route + Class */}
              <Stack
                direction="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Typography fontWeight={600}>
                  {flight.from} → {flight.to}
                </Typography>

                <Typography color="#9fa1ff">
                  {flight.travelClass}
                </Typography>
              </Stack>

              <Divider sx={{ borderColor: "#2a2b33" }} />

              {/* Flight Info */}
              <Stack
                direction="row"
                gap={2}
                flexWrap="wrap"
                fontSize="0.9rem"
              >
                <Typography>✈ {flight.airline}</Typography>
                <Typography>#{flight.flightNumber}</Typography>
                <Typography>🕓 {flight.departure}</Typography>

                {flight.arrival && (
                  <Typography>🕔 {flight.arrival}</Typography>
                )}
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default SearchResult;