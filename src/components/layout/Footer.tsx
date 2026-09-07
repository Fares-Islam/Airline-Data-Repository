import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        py: 5,
        borderTop:
          "1px solid rgba(255,255,255,.06)",
      }}
    >
      <Stack
        spacing={1}
        alignItems="center"
      >
        <Typography
          fontWeight={700}
        >
          Flight Search
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Powered by Google Flights via SerpApi
        </Typography>
      </Stack>
    </Box>
  );
}