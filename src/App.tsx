import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useMemo } from "react";

import HomePage from "./pages/HomePage";
import { theme } from "./theme";

function App() {
  const globalStyles = useMemo(
    () => ({
      body: {
        margin: 0,
        backgroundColor: "#0d1117",
      },
      "*": {
        boxSizing: "border-box",
      },
      "#root": {
        minHeight: "100vh",
      },
    }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={globalStyles}
      />

      <HomePage />
    </ThemeProvider>
  )
}

export default App;