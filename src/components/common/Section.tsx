import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Section({
  children,
}: Props) {
  return (
    <Box
      component="section"
      sx={{
        mb: 6,
      }}
    >
      {children}
    </Box>
  );
}