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

