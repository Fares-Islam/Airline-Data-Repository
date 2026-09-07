import { Box, Stack, Typography } from "@mui/material";

export default function SearchHero() {
  return (
    <Box
      sx={{
        mb: 5,
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={3}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight={800}
          >
            Find your next flight
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              maxWidth: 650,
            }}
          >
            Search flights between thousands of airports
            worldwide using live Google Flights data.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}