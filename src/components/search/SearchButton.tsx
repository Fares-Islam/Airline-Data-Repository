import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Button,
  CircularProgress,
} from "@mui/material";

interface Props {
  loading: boolean;
  onClick: () => void;
}

export default function SearchButton({
  loading,
  onClick,
}: Props) {
  return (
    <Button
      variant="contained"
      size="large"
      disableElevation
      startIcon={
        !loading && <SearchRoundedIcon />
      }
      onClick={onClick}
      sx={{
        minWidth: 165,
        height: 56,
        borderRadius: 3,
        fontWeight: 700,
        fontSize: "1rem",

        background:
          "linear-gradient(135deg,#6d78ff,#8d97ff)",

        transition:
          "transform .18s ease, box-shadow .18s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 8,
        },

        "&:active": {
          transform: "translateY(0)",
        },
      }}
    >
      {loading ? (
        <CircularProgress
          size={24}
          color="inherit"
        />
      ) : (
        "Search Flights"
      )}
    </Button>
  );
}