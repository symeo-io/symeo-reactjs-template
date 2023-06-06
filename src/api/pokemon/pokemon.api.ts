import { api } from "api/api";
import {
  GetPokemonInput,
  GetPokemonListInput,
  GetPokemonListResponse,
  GetPokemonResponse,
} from "api/pokemon/pokemon.types";

const valuesQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonList: builder.query<GetPokemonListResponse, GetPokemonListInput>({
      query: ({ limit = 20, offset = 0 }) => ({
        url: `/pokemon`,
        params: { limit, offset },
      }),
      providesTags: (result, error, { limit, offset }) => [
        { type: "PokemonList", limit, offset },
      ],
    }),
    getPokemon: builder.query<GetPokemonResponse, GetPokemonInput>({
      query: ({ name }) => ({
        url: `/pokemon/${name}`,
      }),
      providesTags: (result, error, { name }) => [{ type: "Pokemon", name }],
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = valuesQueryApi;
