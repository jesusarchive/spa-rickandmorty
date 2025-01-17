import type { Character } from "@/rest-clients/rick-and-morty/types";

import useGetRickAndMortyCharacters from "../../hooks/use-get-rick-and-morty-characters";
import useCharacterListContext from "../../providers/character-list-provider.hook";
import CharacterDataGridHeaderBar from "./character-data-grid-header-bar";

export default function CharacterDataGrid() {
  const { state } = useCharacterListContext();
  const { data, isLoading, error } = useGetRickAndMortyCharacters(
    state.filters ?? {}
  );

  if (isLoading) {
    return (
      <div className="h-dvh w-dvw">
        <div className="h-full w-full flex flex-col p-6">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-dvh w-dvw">
        <div className="h-full w-full flex flex-col p-6">
          <p>Error fetching characters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh w-dvw">
      <div className="h-full w-full flex flex-col p-6 gap-4">
        <h1 className="font-bold text-3xl">Rick and Morty Characters</h1>
        <CharacterDataGridHeaderBar />
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
      </div>
    </div>
  );
}
