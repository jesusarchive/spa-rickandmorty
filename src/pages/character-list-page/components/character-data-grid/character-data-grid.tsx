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

  const hasData = React.useMemo(
    () =>
      !isLoading &&
      !error &&
      Array.isArray(data?.results) &&
      data?.results?.length > 0,
    [isLoading, error, data?.results]
  );

  return (
    <div className="h-screen w-screen p-10 overflow-hidden">
      <div className="flex flex-col gap-14">
        <h1 className="font-bold text-4xl">Rick and Morty Characters</h1>
        <CharacterDataGridHeaderBar />
      </div>

      <div className="h-full w-full flex flex-col gap-8 overflow-hidden">
        {error && (
          <div className="h-full flex items-center justify-center p-10">
            <p>Error fetching characters</p>
          </div>
        )}
        {!error && isLoading && (
          <div className="h-full flex items-center justify-center p-10">
            <Spinner />
          </div>
        )}
        {hasData && (
          <div className="overflow-y-auto h-full p-10">
            <ul className="border-t border-gray-200 p-4">
              {data?.results?.map((el: Character) => (
                <li
                  key={el.id}
                  className="flex items-center gap-8 bg-gray-100 p-8 rounded-lg shadow border-b border-gray-200 hover:bg-gray-200"
                >
                  <img
                    src={el.image}
                    alt={el.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{el.name}</h2>
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
