/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { Character } from "@/rest-clients/rick-and-morty/types";

export type CharacterListActionKind =
  (typeof CharacterListActionKind)[keyof typeof CharacterListActionKind];

const CharacterListActionKind = {
  SET_QUERY: "SET_QUERY",
  SET_RESULTS: "SET_RESULTS",
} as const;

export type CharacterListState = {
  query: string;
  results: Character[];
};

type CharacterListSetQueryPayload = {
  query: string;
};

type CharacterListSetResultsPayload = {
  results: Character[];
};

export type CharacterListAction = {
  type: CharacterListActionKind;
  payload: CharacterListSetQueryPayload | CharacterListSetResultsPayload;
};

export const getDefaultState = (): CharacterListState => ({
  query: "",
  results: [],
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
      type: CharacterListActionKind.SET_QUERY,
      payload: { results },
    });
  };
