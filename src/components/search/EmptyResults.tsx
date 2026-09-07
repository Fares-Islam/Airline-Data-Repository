import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function EmptyResults() {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 5,
        py: 8,
        borderRadius: 5,

        textAlign: "center",

        border:
          "1px solid rgba(255,255,255,.08)",

        background:
          "linear-gradient(180deg,#252730,#1d2028)",
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
      >
        <SearchOffRoundedIcon
          sx={{
            fontSize: 60,
            opacity: .5,
          }}
        />

        <Typography
          variant="h5"
          fontWeight={700}
        >
          No flights found
        </Typography>

        <Typography
          color="text.secondary"
          maxWidth={500}
        >
          Try changing your airports,
          dates, or search mode.
        </Typography>
      </Stack>
    </Paper>
  );
}