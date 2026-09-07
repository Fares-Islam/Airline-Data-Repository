import { Box } from "@mui/material";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PageContainer from "../components/layout/PageContainer";

import SearchHero from "../components/search/SearchHero";
import SearchCard from "../components/search/SearchCard";

import SearchResult from "../searchResult";

import { UseContext } from "../context";

export default function HomePage() {
  const {
    results,
    hasSearched,
    loading,
  } = UseContext();

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",
        flexDirection: "column",

        background:
          "radial-gradient(circle at top,#2d3140,#181a21 42%,#0f1013)",
      }}
    >
      <Header />

      <PageContainer>
        <SearchHero />

        <SearchCard />

        {!loading && (
          <SearchResult
            results={results}
            hasSearched={hasSearched}
          />
        )}
      </PageContainer>

      <Footer />
    </Box>
  );
}