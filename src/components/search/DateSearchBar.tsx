import dayjs, {
  type Dayjs,
} from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DateSearchBar({
  value,
  onChange,
}: Props) {
  const handleChange = (
    newValue: Dayjs | null,
  ) => {
    if (
      !newValue ||
      !newValue.isValid()
    ) {
      return;
    }

    onChange(
      newValue.format(
        "MM-DD-YYYY",
      ),
    );
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
    >
      <DatePicker
        value={dayjs(value)}
        onChange={handleChange}
        disablePast
        format="MM-DD-YYYY"
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
        }}
        sx={{
          width: "100%",

          backgroundImage:
            "linear-gradient(to right,#3b3d48,#2f313b)",

          borderRadius: 2,

          "& .MuiInputBase-root": {
            color: "#d5d7ff",
          },

          "& .MuiSvgIcon-root": {
            color: "#d5d7ff",
          },

          "& fieldset": {
            borderColor:
              "#4d4f5d",
          },

          "&:hover fieldset": {
            borderColor:
              "#7b7dff",
          },

          "&.Mui-focused fieldset": {
            borderColor:
              "#9fa1ff",
          },
        }}
      />
    </LocalizationProvider>
  );
}