import { handleFetchErrors } from "@/rest-clients/api-error";
import getVerbs from "@/rest-clients/verbs";

import { API_CONFIG } from "../api-config";

export default async function getRickAndMortyCharacters() {
  const { get } = getVerbs();
  const endpoint = `${API_CONFIG.baseUrl}/character`;

  try {
    const res = await get(endpoint);

    return await res.json();
  } catch (ex) {
    throw await handleFetchErrors(ex);
  }
}
