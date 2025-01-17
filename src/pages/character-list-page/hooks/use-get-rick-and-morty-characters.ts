import useQuery from "@/hooks/use-query";
// import { useQuery } from "@tanstack/react-query";
import getRickAndMortyCharacters from "@/rest-clients/rick-and-morty/get-rick-and-morty-characters";

export default function useGetRickAndMortyCharacters() {
  return useQuery({
    queryKey: ["get-rick-and-morty-character-list"],
    queryFn: async () => getRickAndMortyCharacters(),
  });
}
