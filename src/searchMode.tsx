import { MenuItem, Select } from "@mui/material";
import { UseContext } from "./context";

function SearchMode() {
   const { selectedOption, setSelectedOption } = UseContext()

  return (
    <>
      <Select
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
        sx={{
          backgroundImage:
            "linear-gradient(to right, rgb(51, 51, 66), rgb(59, 65, 71))",
          color: "#212225",
          m: 1,
          height: "36px",
        }}
        MenuProps={{
          slotProps: { paper: { sx: { backgroundColor: "#222427" } } },
        }}
      >
        <MenuItem
          value="One way"
          sx={{
            bgcolor: "#222427",
            color: "#19191d",
            "&.Mui-selected": {
              bgcolor: "#1c1e20 !important",
              color: "#121314",
            },
            "&.Mui-selected:hover": { bgcolor: "#28282c !important" },
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.08)", color: "#19191f" },
          }}
        >
          One way
        </MenuItem>
        {/* <MenuItem
          value="Round trip"
          sx={{
            bgcolor: "#222427",
            color: "#19191d",
            "&.Mui-selected": {
              bgcolor: "#1c1e20 !important",
              color: "#121314",
            },
            "&.Mui-selected:hover": { bgcolor: "#28282c !important" },
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.08)", color: "#19191f" },
          }}
        >
          Round trip
        </MenuItem> */}
      </Select>
    </>
  );
}

export default SearchMode;
