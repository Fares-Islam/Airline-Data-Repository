import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  maxStops: number;
  onMaxStopsChange: (
    value: number,
  ) => void;

  cabinClass: string;
  onCabinClassChange: (
    value: string,
  ) => void;
}

export default function SearchFilters({
  maxStops,
  onMaxStopsChange,
  cabinClass,
  onCabinClassChange,
}: Props) {
  return (
    <Stack
      spacing={3}
      mt={3}
    >
      <FormControl fullWidth>
        <InputLabel>
          Cabin
        </InputLabel>

        <Select
          label="Cabin"
          value={cabinClass}
          onChange={(event) =>
            onCabinClassChange(
              event.target.value,
            )
          }
        >
          <MenuItem value="Any">
            Any
          </MenuItem>

          <MenuItem value="Economy">
            Economy
          </MenuItem>

          <MenuItem value="Premium Economy">
            Premium Economy
          </MenuItem>

          <MenuItem value="Business">
            Business
          </MenuItem>

          <MenuItem value="First">
            First
          </MenuItem>
        </Select>
      </FormControl>

      <Stack spacing={1}>
        <Typography>
          Maximum Stops
        </Typography>

        <Slider
          value={maxStops}
          min={0}
          max={3}
          step={1}
          marks
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            onMaxStopsChange(
              value as number,
            )
          }
        />
      </Stack>
    </Stack>
  );
}