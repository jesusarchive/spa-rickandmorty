/* eslint-disable react-refresh/only-export-components */
import React from "react";

import type {
  Character,
  CharacterFilters,
} from "@/rest-clients/rick-and-morty/types";

export type CharacterListActionKind =
  (typeof CharacterListActionKind)[keyof typeof CharacterListActionKind];

const CharacterListActionKind = {
  SET_FILTERS: "SET_FILTERS",
  SET_RESULTS: "SET_RESULTS",
} as const;

export type CharacterListState = {
  filters: CharacterFilters | null;
  results: Character[] | null;
};

type CharacterListSetFiltersPayload = {
  filters: CharacterFilters | null;
};

type CharacterListSetResultsPayload = {
  results: Character[] | null;
};

export type CharacterListAction = {
  type: CharacterListActionKind;
  payload: CharacterListSetFiltersPayload | CharacterListSetResultsPayload;
};

export const getDefaultState = (): CharacterListState => ({
  filters: {},
  results: [],
});

export function CharacterListPageReducer(
  state: CharacterListState,
  action: CharacterListAction
) {
  switch (action.type) {
    case CharacterListActionKind.SET_FILTERS: {
      return {
        ...state,
        filters: (action.payload as CharacterListSetFiltersPayload).filters,
      };
    }
    case CharacterListActionKind.SET_RESULTS: {
      return {
        ...state,
        results: (action.payload as CharacterListSetResultsPayload).results,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const setFilters =
  (dispatch: React.Dispatch<CharacterListAction>) =>
  ({ filters }: CharacterListSetFiltersPayload) => {
    dispatch({
      type: CharacterListActionKind.SET_FILTERS,
      payload: { filters },
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
