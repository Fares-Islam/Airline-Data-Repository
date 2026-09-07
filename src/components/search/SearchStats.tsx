import {
  Chip,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  count: number;
}

export default function SearchStats({
  count,
}: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
      >
        Flights
      </Typography>

      <Chip
        color="primary"
        label={`${count} result${
          count === 1
            ? ""
            : "s"
        }`}
      />
    </Stack>
  );
}