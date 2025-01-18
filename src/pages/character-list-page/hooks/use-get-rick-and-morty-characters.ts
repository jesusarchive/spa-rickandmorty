import useQuery from "@/hooks/use-query";
import getRickAndMortyCharacters from "@/rest-clients/rick-and-morty/get-rick-and-morty-characters";
import type { CharacterFilters } from "@/rest-clients/rick-and-morty/types";

export type UseGetRickAndMortyCharactersProps = CharacterFilters;

export default function useGetRickAndMortyCharacters(
  props: UseGetRickAndMortyCharactersProps = {}
) {
  return useQuery({
    queryKey: ["get-rick-and-morty-character-list", ...Object.values(props)],
    queryFn: async () => getRickAndMortyCharacters(props),
  });
}
