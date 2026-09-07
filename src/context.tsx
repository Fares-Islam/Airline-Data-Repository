import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import dayjs from "dayjs";

import { searchFlights } from "./services/searchFlights";
import type { FlightResult } from "./types/flight";

export type SearchMode =
  | "One way"
  | "Round trip";

interface ContextData {
  selectedOption: SearchMode;
  setSelectedOption: Dispatch<
    SetStateAction<SearchMode>
  >;

  from: string;
  setFrom: Dispatch<
    SetStateAction<string>
  >;

  to: string;
  setTo: Dispatch<
    SetStateAction<string>
  >;

  date1: string;
  setDate1: Dispatch<
    SetStateAction<string>
  >;

  date2: string;
  setDate2: Dispatch<
    SetStateAction<string>
  >;

  loading: boolean;

  results: FlightResult[];

  hasSearched: boolean;

  error: string;

  canSearch: boolean;

  handleSearch(): Promise<void>;
}

const Context =
  createContext<
    ContextData | undefined
  >(undefined);

export function UseContext() {
  const context =
    useContext(Context);

  if (!context) {
    throw new Error(
      "UseContext must be used inside ContextProvider.",
    );
  }

  return context;
}

export function ContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const today = useMemo(
    () =>
      dayjs().format(
        "MM-DD-YYYY",
      ),
    [],
  );

  const [
    selectedOption,
    setSelectedOption,
  ] =
    useState<SearchMode>(
      "One way",
    );

  const [from, setFrom] =
    useState("");

  const [to, setTo] =
    useState("");

  const [date1, setDate1] =
    useState(today);

  const [date2, setDate2] =
    useState(today);

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState<FlightResult[]>([]);

  const [
    hasSearched,
    setHasSearched,
  ] =
    useState(false);

  const [error, setError] =
    useState("");

  const canSearch =
    from.length === 3 &&
    to.length === 3 &&
    from !== to;

  const handleSearch =
    useCallback(async () => {
      if (!canSearch) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const flights =
          await searchFlights(
            selectedOption,
            from,
            to,
            dayjs(
              date1,
              "MM-DD-YYYY",
            ).format(
              "YYYY-MM-DD",
            ),
            dayjs(
              date2,
              "MM-DD-YYYY",
            ).format(
              "YYYY-MM-DD",
            ),
          );

        setResults(flights);
      } catch {
        setResults([]);
        setError(
          "Unable to search flights.",
        );
      } finally {
        setLoading(false);
        setHasSearched(true);
      }
    }, [
      canSearch,
      selectedOption,
      from,
      to,
      date1,
      date2,
    ]);

  const value =
    useMemo(
      () => ({
        selectedOption,
        setSelectedOption,

        from,
        setFrom,

        to,
        setTo,

        date1,
        setDate1,

        date2,
        setDate2,

        loading,

        results,

        hasSearched,

        error,

        canSearch,

        handleSearch,
      }),
      [
        selectedOption,

        from,
        to,

        date1,
        date2,

        loading,

        results,

        hasSearched,

        error,

        canSearch,

        handleSearch,
      ],
    );

  return (
    <Context.Provider
      value={value}
    >
      {children}
    </Context.Provider>
  );
}