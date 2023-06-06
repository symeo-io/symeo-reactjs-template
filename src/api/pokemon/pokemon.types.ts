export type Pokemon = {
  name: string;
  order: number;
  sprites: {
    front_default: string;
  };
};

export type PokemonListItem = {
  name: string;
  url: string;
};

export type GetPokemonListResponse = {
  count: number;
  results: PokemonListItem[];
};

export type GetPokemonListInput = {
  offset?: number;
  limit?: number;
};

export type GetPokemonResponse = Pokemon;

export type GetPokemonInput = {
  name: string;
};
