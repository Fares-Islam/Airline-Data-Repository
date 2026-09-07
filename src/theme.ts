import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#7d80ff",
    },

    secondary: {
      main: "#a4a7ff",
    },

    background: {
      default: "#101114",
      paper: "#1b1e25",
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily:
      '"Inter","Segoe UI",Roboto,Helvetica,Arial,sans-serif',

    h3: {
      fontWeight: 800,
    },

    h5: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
  },
});