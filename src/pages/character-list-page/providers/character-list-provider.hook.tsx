import React from "react";

import { CharacterListContext } from "./character-list-provider.context";

function useCharacterListContext() {
  const context = React.useContext(CharacterListContext)!;
  if (context === undefined) {
    throw new Error(
      "useCharacterListContext must be used within a CharacterListProvider"
    );
  }
  return context;
}

export default useCharacterListContext;
