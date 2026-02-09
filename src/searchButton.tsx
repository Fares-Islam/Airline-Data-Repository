// import { Button } from "@mui/material";
// import SearchFlights from "./searchFlights";
// import { UseContext } from "./context";

// function SearchButton() {
//   const { selectedOption } = UseContext(); 

//   return (
//     <>
//       <Button
//         name="searchbutton"
//         sx={{
//           backgroundImage:
//             "linear-gradient(to right, rgb(51, 51, 66), rgb(59, 65, 71))",
//           height: "36px",
//           color: "#212225",
//           m: 1,
//         }}
//         onClick={() => SearchFlights(selectedOption)}
//       >
//         Search
//       </Button>
//     </>
//   );
// }

// export default SearchButton;

import { Button } from "@mui/material";

type Props = {
  onClick: () => void;
  loading: boolean;
};

function SearchButton({ onClick, loading }: Props) {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      sx={{
        backgroundImage:
          "linear-gradient(to right, #5a5cff, #8f90ff)",
        color: "#14151a",
        fontWeight: 600,
        px: 3,
        borderRadius: 2,
        "&:hover": {
          backgroundImage:
            "linear-gradient(to right, #7376ff, #a0a2ff)",
        },
      }}
    >
      {loading ? "Searching..." : "Search"}
    </Button>
  );
}

export default SearchButton;

