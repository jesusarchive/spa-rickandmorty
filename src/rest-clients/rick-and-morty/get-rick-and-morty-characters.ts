import { handleFetchErrors } from "@/rest-clients/api-error";
import getVerbs from "@/rest-clients/verbs";

import { API_CONFIG } from "../api-config";
import { CharacterFilters } from "./types";

export type GetRickAndMortyCharactersProps = CharacterFilters;

export default async function getRickAndMortyCharacters({
  name,
  status,
  species,
  type,
  gender,
}: GetRickAndMortyCharactersProps) {
  const { get } = getVerbs();
  const endpoint = `${API_CONFIG.baseUrl}/character`;

  try {
    const res = await get(endpoint, {
      params: {
        ...(name && { name }),
        ...(status && { status }),
        ...(species && { species }),
        ...(type && { type }),
        ...(gender && { gender }),
      },
    });

    return await res.json();
  } catch (ex) {
    console.log("error", ex);
    throw await handleFetchErrors(ex);
  }
}
