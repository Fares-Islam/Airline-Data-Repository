import {
  Collapse,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import { useState } from "react";

import { UseContext } from "../../context";

import SearchFilters from "./SearchFilters";
import SearchToolbar from "./SearchToolbar";

export default function SearchCard() {
const {
  from,
  to,

  date1,
  date2,

  loading,

  setFrom,
  setTo,

  setDate1,
  setDate2,

  handleSearch,
} = UseContext();

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const [maxStops, setMaxStops] =
    useState(3);

  const [cabinClass, setCabinClass] =
    useState("Any");

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 6,
        overflow: "hidden",
        border:
          "1px solid rgba(255,255,255,.08)",
        background:
          "linear-gradient(180deg,#2c3039,#23252d)",
      }}
    >
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            px: 4,
            py: 3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
          >
            Search Flights
          </Typography>

          <IconButton
            onClick={() =>
              setFiltersOpen((v) => !v)
            }
          >
            <TuneRoundedIcon />
          </IconButton>
        </Stack>

        <Divider />

        <Stack
          sx={{
            p: 4,
          }}
        >
          <SearchToolbar
  from={from}
  to={to}
  departureDate={date1}
  returnDate={date2}
  loading={loading}
  onFromChange={setFrom}
  onToChange={setTo}
  onDepartureDateChange={setDate1}
  onReturnDateChange={setDate2}
  onSearch={handleSearch}
/>

          <Collapse in={filtersOpen}>
            <SearchFilters
              maxStops={maxStops}
              onMaxStopsChange={
                setMaxStops
              }
              cabinClass={cabinClass}
              onCabinClassChange={
                setCabinClass
              }
            />
          </Collapse>
        </Stack>
      </Stack>
    </Paper>
  );
}