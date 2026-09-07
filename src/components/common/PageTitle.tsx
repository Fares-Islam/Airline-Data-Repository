import {
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
}

export default function PageTitle({
  title,
  subtitle,
}: Props) {
  return (
    <Stack
      spacing={1}
      sx={{
        mb: 5,
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        maxWidth={700}
      >
        {subtitle}
      </Typography>
    </Stack>
  );
}