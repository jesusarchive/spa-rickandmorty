/* eslint-disable react-refresh/only-export-components */
import React from "react";

import type { CharacterFilters } from "@/rest-clients/rick-and-morty/types";

export type CharacterListActionKind =
  (typeof CharacterListActionKind)[keyof typeof CharacterListActionKind];

const CharacterListActionKind = {
  SET_FILTERS: "SET_FILTERS",
} as const;

export type CharacterListState = {
  filters: CharacterFilters | null;
};

type CharacterListSetFiltersPayload = {
  filters: CharacterFilters | null;
};

export type CharacterListAction = {
  type: CharacterListActionKind;
  payload: CharacterListSetFiltersPayload;
};

export const getDefaultState = (): CharacterListState => ({
  filters: {},
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
