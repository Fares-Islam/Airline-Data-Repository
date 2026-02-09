// import { Card, CardContent, Typography } from "@mui/material";

// function SearchResult() {
//   return (
//     <>
//       <template>
//         <Card className="searchresult" sx={{ bgcolor: "#1f1f22", m: 1 }}>
//           <CardContent>
//             <Typography variant="h4" component="div">
//               title
//             </Typography>
//             <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
//               paragraph
//             </Typography>
//           </CardContent>
//         </Card>
//       </template>
//     </>
//   );
// }

// export default SearchResult;
import { Box, Paper, Typography, Divider, Stack } from "@mui/material";

type Props = {
  results: {
    flights: {
      airline: string;
      flight_number: string;
      travel_class: string;
      departure_airport: { id: string; time: string };
      arrival_airport: { id: string; time: string };
    }[];
  }[];
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
        <Typography textAlign="center">No results found</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ width: "85%", mt: 3 }}>
      <Stack spacing={2}>
        {results.map((group, i) => (
          <Paper
            key={i}
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundImage: "linear-gradient(to right, #3b3d48, #2f313b)",
              color: "#d5d7ff",
            }}
          >
            <Stack spacing={1.5}>
              {group.flights.map((flight, j) => (
                <Box key={j}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={600}>
                      {flight.departure_airport.id} →{" "}
                      {flight.arrival_airport.id}
                    </Typography>

                    <Typography color="#9fa1ff">
                      {flight.travel_class}
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: 0.7, borderColor: "#2a2b33" }} />

                  <Stack direction="row" gap={2} flexWrap="wrap">
                    <Typography fontSize="0.9rem">
                      ✈ {flight.airline}
                    </Typography>
                    <Typography fontSize="0.9rem">
                      #{flight.flight_number}
                    </Typography>
                    <Typography fontSize="0.9rem">
                      🕓 {flight.departure_airport.time}
                    </Typography>
                    <Typography fontSize="0.9rem">
                      🕔 {flight.arrival_airport.time}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default SearchResult;
