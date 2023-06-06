import { api } from "api/api";
import {
  GetPokemonListInput,
  GetPokemonListResponse,
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
  }),
});

export const { useGetPokemonListQuery } = valuesQueryApi;
