import {
  Autocomplete,
  TextField,
} from "@mui/material";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import airports from "../../assets/iataCodes.json";

import type {
  Airport,
} from "../../types/airport";

interface AirportOption
  extends Airport {
  id: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const airportList =
  Object.entries(
    airports,
  ).map(
    ([id, airport]) => ({
      id,
      ...(airport as Airport),
    }),
  );

const regionNames =
  new Intl.DisplayNames(
    ["en"],
    {
      type: "region",
    },
  );

const normalize = (
  value: string,
) =>
  value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .toLowerCase()
    .trim();

const matchesWords = (
  value: string,
  query: string,
) => {
  const queryWords =
    query
      .split(/\s+/)
      .filter(Boolean);

  const valueWords =
    value
      .split(/\s+/)
      .filter(Boolean);

  return queryWords.every(
    (queryWord) =>
      valueWords.some(
        (valueWord) =>
          valueWord.startsWith(
            queryWord,
          ),
      ),
  );
};

export default function AirportAutocomplete({
  label,
  value,
  onChange,
}: Props) {
  const [inputValue, setInputValue] =
    useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const options =
    useMemo(() => {

      const query =
        normalize(inputValue);

      if (!query) {
        return [];
      }

      const iataExact: AirportOption[] =
        [];

      const iataPrefix: AirportOption[] =
        [];

      const cityExact: AirportOption[] =
        [];

      const cityPrefix: AirportOption[] =
        [];

      const countryExact: AirportOption[] =
        [];

      const countryPrefix: AirportOption[] =
        [];

      const airportPrefix: AirportOption[] =
        [];

      const statePrefix: AirportOption[] =
        [];

      for (const airport of airportList) {
        const iata =
          normalize(
            airport.iata,
          );

        const city =
          normalize(
            airport.city,
          );

        const state =
          normalize(
            airport.state ?? "",
          );

        

        const country =
          normalize(
            regionNames.of(
              airport.country.toUpperCase(),
            ) ??
            airport.country,
          );

        const name =
          normalize(
            airport.name,
          );

        const option = {
          ...airport,
          country:
            regionNames.of(
              airport.country.toUpperCase(),
            ) ??
            airport.country,
        };

        if (iata === query) {
          iataExact.push(option);
          continue;
        }

        if (
          iata.startsWith(
            query,
          )
        ) {
          iataPrefix.push(option);
          continue;
        }

        if (city === query) {
          cityExact.push(option);
          continue;
        }

        if (
          city.startsWith(
            query,
          )
        ) {
          cityPrefix.push(option);
          continue;
        }
        if (
          country === query
        ) {
          countryExact.push(
            option,
          );
          continue;
        }

        if (
          country.startsWith(
            query,
          )
        ) {
          countryPrefix.push(
            option,
          );
          continue;
        }

        if (
          matchesWords(
            name,
            query,
          )
        ) {
          airportPrefix.push(
            option,
          );
          continue;
        }

        if (
          state &&
          matchesWords(
            state,
            query,
          )
        ) {
          statePrefix.push(
            option,
          );
        }
      }

      return [
        ...iataExact,
        ...iataPrefix,
        ...cityExact,
        ...cityPrefix,
        ...countryExact,
        ...countryPrefix,
        ...airportPrefix,
        ...statePrefix,
      ].slice(0, 20);
    }, [inputValue]);

    const selectedOption =
        options.find(
          (option) =>
            option.iata === value,
        ) ?? null;

  return (
    <Autocomplete
      freeSolo
      value={selectedOption}
      options={options}
      filterOptions={(x) => x}
      isOptionEqualToValue={(
        option,
        value,
      ) =>
        option.id ===
        value.id
      }
      inputValue={
        inputValue
      }
onInputChange={(
  _,
  newValue,
) => {
  const cleaned =
    newValue.replace(
      /[^A-Za-z\s]/g,
      "",
    );

  setInputValue(
    cleaned,
  );

  onChange(
    cleaned,
  );
}}
      onChange={(
        _,
        airport,
      ) => {
        if (
          airport &&
          typeof airport !==
          "string"
        ) {
          setInputValue(
            airport.iata,
          );

          onChange(
            airport.iata,
          );
        }
      }}
      getOptionLabel={(
        option,
      ) => {
        if (
          typeof option ===
          "string"
        ) {
          return option;
        }

        return option.iata;
      }}
      renderOption={(
        props,
        airport,
      ) => (
        <li
          {...props}
          key={airport.id}
        >
          <div>
            <strong>
              {airport.iata}
              {" — "}
              {airport.name}
            </strong>

            <br />

            {[
              airport.city,
              airport.state,
              airport.country,
            ]
              .filter(Boolean)
              .join(", ")}
          </div>
        </li>
      )}
      renderInput={(
        params,
      ) => (
        <TextField
          {...params}
          label={label}
        />
      )}
    />
  );
}