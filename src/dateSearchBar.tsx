import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function DateSearchBar({ value, onChange }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjs(value)}
        onChange={(newValue: Dayjs | null) => {
          if (newValue) onChange(newValue.format("MM-DD-YYYY"));
        }}
        sx={{
          backgroundImage:
            "linear-gradient(to right, #3b3d48, #2f313b)",
          borderRadius: 2,
          input: { color: "#d5d7ff" },
        }}
      />
    </LocalizationProvider>
  );
}

export default DateSearchBar;
