import React from "react";

import Spinner from "@/components/ui/spinner";
import type { Character } from "@/rest-clients/rick-and-morty/types";

import useGetRickAndMortyCharacters from "../../hooks/use-get-rick-and-morty-characters";
import useCharacterListContext from "../../providers/character-list-provider.hook";
import { setResults } from "../../providers/character-list-provider.state";
import CharacterDataGridHeaderBar from "./character-data-grid-header-bar";

export default function CharacterDataGrid() {
  const { state, dispatch } = useCharacterListContext();
  const { data, isLoading, error } = useGetRickAndMortyCharacters(
    state.filters ?? {}
  );

  React.useEffect(() => {
    if (error) {
      setResults(dispatch)({ results: null });
      return;
    }
    if (JSON.stringify(state?.results) !== JSON.stringify(data?.results)) {
      setResults(dispatch)({ results: data?.results });
    }
  }, [data?.results, dispatch, state?.results, error]);

  return (
    <div className="h-dvh w-dvw">
      <div className="h-full w-full flex flex-col p-6 gap-4">
        <h1 className="font-bold text-3xl">Rick and Morty Characters</h1>
        <CharacterDataGridHeaderBar />
        {isLoading && (
          <div className="h-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {error && (
          <div className="h-full flex items-center justify-center">
            <p>Error fetching characters</p>
          </div>
        )}
        {!isLoading &&
          !error &&
          Array.isArray(data?.results) &&
          data?.results?.length > 0 && (
            <div className="overflow-y-auto h-full">
              <ul className="border-t border-gray-200">
                {data?.results?.map((el: Character) => (
                  <li
                    key={el.id}
                    className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow border-b border-gray-200"
                  >
                    <img
                      src={el.image}
                      alt={el.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{el.name}</h2>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}
