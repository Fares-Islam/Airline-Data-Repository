import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";

import {
  Grid,
  IconButton,
  Stack,
} from "@mui/material";

import AirportAutocomplete from "./AirportAutocomplete";
import DateSearchBar from "./DateSearchBar";
import SearchButton from "./SearchButton";
import SearchMode from "./SearchMode";

import { UseContext } from "../../context";

interface Props {
  from: string;
  to: string;

  departureDate: string;
  returnDate: string;

  loading: boolean;

  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;

  onDepartureDateChange: (
    value: string,
  ) => void;

  onReturnDateChange: (
    value: string,
  ) => void;

  onSearch: () => void;
}

export default function SearchToolbar({
  from,
  to,

  departureDate,
  returnDate,

  loading,

  onFromChange,
  onToChange,

  onDepartureDateChange,
  onReturnDateChange,

  onSearch,
}: Props) {
  const { selectedOption } =
    UseContext();

  const swapAirports = () => {
    onFromChange(to);
    onToChange(from);
  };

  return (
    <Stack spacing={3}>
      <Grid
        container
        spacing={2}
      >
        <Grid size={{ xs: 12, md: 5 }}>
          <AirportAutocomplete
            label="From"
            value={from}
            onChange={onFromChange}
          />
        </Grid>

        <Grid
          size="auto"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={swapAirports}
            aria-label="Swap airports"
          >
            <SwapHorizRoundedIcon />
          </IconButton>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <AirportAutocomplete
            label="To"
            value={to}
            onChange={onToChange}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
      >
        <Grid
          size={
            selectedOption ===
            "Round trip"
              ? { xs: 12, md: 4 }
              : { xs: 12, md: 6 }
          }
        >
          <DateSearchBar
            value={departureDate}
            onChange={
              onDepartureDateChange
            }
          />
        </Grid>

        {selectedOption ===
          "Round trip" && (
          <Grid size={{ xs: 12, md: 4 }}>
            <DateSearchBar
              value={returnDate}
              onChange={
                onReturnDateChange
              }
            />
          </Grid>
        )}

        <Grid
          size={
            selectedOption ===
            "Round trip"
              ? { xs: 12, md: 4 }
              : { xs: 12, md: 6 }
          }
        >
          <SearchMode />
        </Grid>
      </Grid>

      <Stack
        direction="row"
        justifyContent="flex-end"
      >
        <SearchButton
          loading={loading}
          onClick={onSearch}
        />
      </Stack>
    </Stack>
  );
}