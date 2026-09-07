import {
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { UseContext } from "../../context";

export default function SearchMode() {
  const {
    selectedOption,
    setSelectedOption,
  } = UseContext();

  const handleChange = (
    event: SelectChangeEvent,
  ) => {
    setSelectedOption(
      event.target.value as
        | "One way"
        | "Round trip",
    );
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      size="small"
      fullWidth
    >
      <MenuItem value="One way">
        One way
      </MenuItem>

      <MenuItem value="Round trip">
        Round trip
      </MenuItem>
    </Select>
  );
}