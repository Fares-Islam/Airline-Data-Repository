// import { useState } from "react";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// function DateSearchBar() {
//   const [selectedDate, setSelectedDate] = useState(dayjs());

//   const handleChange = (value: any) => {
//     setSelectedDate(value);
//   };

//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker
//           name="dateinput"
//           label="Date"
//           value={selectedDate}
//           onChange={handleChange}
//           sx={{
//             backgroundImage:
//               "linear-gradient(to right, rgb(51, 51, 66), rgb(59, 65, 71))",
              
//           }}
//           slotProps={{
//             popper: {
//               sx: {
//                 "& .MuiPaper-root": {
//                   backgroundImage:
//                     "linear-gradient(to right, rgb(51, 51, 66), rgb(59, 65, 71))",
//                 },
//                 "& .MuiPickersDay-root": { color: "#1c1d1f" },
//                 "& .MuiDayCalendar-weekDayLabel": {
//                   color: "#252629",
//                 },
//                 "& .MuiPickersCalendarHeader-label": { color: "#1c1d1f" },
//                 "& .MuiIconButton-root": { color: "#1c1d1f" },
//               },
//             },
//             textField: {
//               variant: "filled",
//               sx: {
//                 m: 1,
//                 backgroundImage:
//                   "linear-gradient(to right, rgb(51, 51, 66), rgb(59, 65, 71))",
//                 "& .MuiPickersSectionList-root": {
//                   color: "#1c1d1f",
//                 },
//                 "& .MuiInputLabel-root": { color: "#1c1d1f" },
//               },
//             },
//           }}
//         />
//       </LocalizationProvider>
//     </>
//   );
// }

// export default DateSearchBar;

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
