/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { Character } from "@/rest-clients/rick-and-morty/types";

export type CharacterListActionKind =
  (typeof CharacterListActionKind)[keyof typeof CharacterListActionKind];

const CharacterListActionKind = {
  SET_QUERY: "SET_QUERY",
  SET_RESULTS: "SET_RESULTS",
  SET_FILTERS: "SET_FILTERS",
} as const;

export type CharacterListState = {
  query: string;
  results: Character[];
  filters: any | null;
};

type CharacterListSetQueryPayload = {
  query: string;
};

type CharacterListSetResultsPayload = {
  results: Character[];
};

type CharacterListSetFiltersPayload = {
  filters: any | null;
};

export type CharacterListAction = {
  type: CharacterListActionKind;
  payload:
    | CharacterListSetQueryPayload
    | CharacterListSetResultsPayload
    | CharacterListSetFiltersPayload;
};

export const getDefaultState = (): CharacterListState => ({
  query: "",
  results: [],
  filters: null,
});

export function CharacterListPageReducer(
  state: CharacterListState,
  action: CharacterListAction
) {
  switch (action.type) {
    case CharacterListActionKind.SET_QUERY: {
      return {
        ...state,
        query: (action.payload as CharacterListSetQueryPayload).query,
      };
    }
    case CharacterListActionKind.SET_RESULTS: {
      return {
        ...state,
        results: (action.payload as CharacterListSetResultsPayload).results,
      };
    }
    case CharacterListActionKind.SET_FILTERS: {
      return {
        ...state,
        filters: (action.payload as CharacterListSetFiltersPayload).filters,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const setQuery =
  (dispatch: React.Dispatch<CharacterListAction>) =>
  ({ query }: CharacterListSetQueryPayload) => {
    dispatch({
      type: CharacterListActionKind.SET_QUERY,
      payload: { query },
    });
  };

export const setResults =
  (dispatch: React.Dispatch<CharacterListAction>) =>
  ({ results }: CharacterListSetResultsPayload) => {
    dispatch({
      type: CharacterListActionKind.SET_RESULTS,
      payload: { results },
    });
  };

export const setFilters =
  (dispatch: React.Dispatch<CharacterListAction>) =>
  ({ filters }: CharacterListSetFiltersPayload) => {
    dispatch({
      type: CharacterListActionKind.SET_FILTERS,
      payload: { filters },
    });
  };
