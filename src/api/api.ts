import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "config";
import { UserManager } from "oidc-react";

export const apiTagTypes = ["PokemonList"];

export const api = createApi({
  tagTypes: apiTagTypes,
  baseQuery: fetchBaseQuery({
    baseUrl: config.api.url,
    prepareHeaders: async (headers) => {
      const userManager = new UserManager({
        authority: config.authentication.google.authority,
        client_id: config.authentication.google.clientId,
        redirect_uri: config.authentication.google.redirectUri,
      });

      const user = await userManager.getUser();
      const token = user?.access_token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
