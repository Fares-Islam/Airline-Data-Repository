import AirlineSeatReclineNormalRoundedIcon from "@mui/icons-material/AirlineSeatReclineNormalRounded";
import FlightRoundedIcon from "@mui/icons-material/FlightRounded";

import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { FlightResult } from "../../types/flight";
import FlightTimeline from "./FlightTimeline";

interface Props {
  flight: FlightResult;
}

export default function FlightCard({
  flight,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,

        border:
          "1px solid rgba(255,255,255,.08)",

        background:
          "linear-gradient(180deg,#282c36,#20232b)",

        transition:
          ".18s ease",

        "&:hover": {
          transform:
            "translateY(-3px)",

          borderColor:
            "rgba(125,128,255,.4)",

          boxShadow:
            "0 12px 28px rgba(0,0,0,.28)",
        },
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5}>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {flight.from} → {flight.to}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {flight.flightNumber}
            </Typography>
          </Stack>

<Box>
  <Typography
    variant="caption"
    color="text.secondary"
    sx={{
      display: "block",
      mb: 0.5,
    }}
  >
    Airline
  </Typography>

  <Chip
    icon={<FlightRoundedIcon />}
    label={flight.airline}
  />
</Box>
        </Stack>

        <FlightTimeline
          departure={flight.departure}
          arrival={flight.arrival}
        />

        <Divider />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Cabin
            </Typography>

            <Chip
              size="small"
              icon={
                <AirlineSeatReclineNormalRoundedIcon />
              }
              label={flight.travelClass}
            />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}