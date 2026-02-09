// import { Input } from "@mui/material";

// function IataSearchBar() {

//   return (
//     <>
//       <Input
//         placeholder="iata"
//         name="iatainput"
//         sx={{
//           backgroundImage:
//             "linear-gradient(to right, rgb(51, 51, 66), rgb(59, 65, 71))",
//           height: "36px",
//           color: "#212225",
//           m: 1,
//           width: "40px"
//         }}
//         inputProps={{ maxLength: 3 }}
//       />
//     </>
//   );
// }

// export default IataSearchBar;

import { Input } from "@mui/material";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function IataSearchBar({ value, onChange }: Props) {
  return (
    <Input
      placeholder="IATA"
      value={value}
      onChange={(e) => onChange(e.target.value.toUpperCase())}
      inputProps={{ maxLength: 3 }}
      sx={{
        backgroundImage:
          "linear-gradient(to right, #3b3d48, #2f313b)",
        height: "36px",
        color: "#d5d7ff",
        px: 1,
        borderRadius: 2,
        width: 65,
        textAlign: "center",
      }}
    />
  );
}

export default IataSearchBar;

