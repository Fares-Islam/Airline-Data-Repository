import FlightRoundedIcon from "@mui/icons-material/FlightRounded";

import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  departure: string;
  arrival?: string;
}

export default function FlightTimeline({
  departure,
  arrival,
}: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <Box
        textAlign="center"
        minWidth={80}
      >
        <Typography
          fontWeight={700}
        >
          {departure}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Departure
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          position: "relative",
        }}
      >
        <Box
          sx={{
            borderTop:
              "2px dashed rgba(255,255,255,.2)",
          }}
        />

        <FlightRoundedIcon
          color="primary"
          sx={{
            position: "absolute",
            left: "50%",
            top: -11,
            transform:
              "translateX(-50%)",

            bgcolor:
              "background.paper",
          }}
        />
      </Box>

      <Box
        textAlign="center"
        minWidth={80}
      >
        <Typography
          fontWeight={700}
        >
          {arrival ?? "--"}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Arrival
        </Typography>
      </Box>
    </Stack>
  );
}