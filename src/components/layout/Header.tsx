import FlightRoundedIcon from "@mui/icons-material/FlightRounded";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          "rgba(14,15,19,.75)",
        backdropFilter: "blur(18px)",
        borderBottom:
          "1px solid rgba(255,255,255,.06)",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          minHeight: 72,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
        >
          <FlightRoundedIcon
            color="primary"
          />

          <Typography
            variant="h5"
            fontWeight={800}
          >
            Flight Search
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}