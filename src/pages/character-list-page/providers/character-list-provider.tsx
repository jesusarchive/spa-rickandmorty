import React from "react";

import { CharacterListContext } from "./character-list-provider.context";
import {
  CharacterListPageReducer,
  getDefaultState,
} from "./character-list-provider.state";

type CharacterListProviderProps = {
  children: React.ReactNode;
};

function CharacterListProvider({
  children,
}: Readonly<CharacterListProviderProps>) {
  const [state, dispatch] = React.useReducer(
    CharacterListPageReducer,
    getDefaultState()
  );

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <CharacterListContext.Provider value={value}>
      {children}
    </CharacterListContext.Provider>
  );
}

export default CharacterListProvider;
