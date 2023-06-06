export type Pokemon = {
  name: string;
  url: string;
};

export type GetPokemonListResponse = {
  count: number;
  results: Pokemon[];
};

export type GetPokemonListInput = {
  offset?: number;
  limit?: number;
};
