export type CharacterStatus = "alive" | "dead" | "unknown";
export type CharacterGender = "female" | "male" | "genderless" | "unknown";
export type CharacterSpecie = "human" | "humanoid";

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: CharacterSpecie;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Location = {
  name: string;
  url: string;
};

export type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export type CharacterFilters = {
  name?: string;
  status?: CharacterStatus;
  species?: CharacterSpecie;
  type?: string;
  gender?: CharacterGender;
};
