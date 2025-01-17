import React from "react";

import type {
  CharacterListAction,
  CharacterListState,
} from "./character-list-provider.state";

export const CharacterListContext = React.createContext<{
  state: CharacterListState;
  dispatch: React.Dispatch<CharacterListAction>;
} | null>(null);
