import type { Character } from "@/rest-clients/rick-and-morty/types";

import useGetRickAndMortyCharacters from "./hooks/use-get-rick-and-morty-characters";
import CharacterListProvider from "./providers/character-list-provider";

function CharacterListPageInternal() {
  const { data, isLoading, error } = useGetRickAndMortyCharacters();

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
        <ul>
          {data?.results?.map((el: Character) => (
            <li key={el.id}>{el.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function CharacterListPage() {
  return (
    <CharacterListProvider>
      <CharacterListPageInternal />
    </CharacterListProvider>
  );
}
