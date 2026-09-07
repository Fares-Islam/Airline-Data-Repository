import FlightRoundedIcon from "@mui/icons-material/FlightRounded";
import {
  Chip,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  count: number;
}

export default function SearchSummary({
  count,
}: Props) {
  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{
        xs: "flex-start",
        md: "center",
      }}
      sx={{
        mb: 4,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={800}
      >
        Search Results
      </Typography>

      <Chip
        color="primary"
        icon={<FlightRoundedIcon />}
        label={`${count} ${
          count === 1
            ? "flight"
            : "flights"
        } found`}
      />
    </Stack>
  );
}