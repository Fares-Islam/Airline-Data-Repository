import { Container } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageContainer({
  children,
}: Props) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      {children}
    </Container>
  );
}