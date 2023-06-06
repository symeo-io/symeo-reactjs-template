# ReactJS Template

## Table of Contents

- [Installation](#installation)
    - [Minimum requirements](#minimum-requirements)
    - [Install the application locally](#install-the-application-locally)
- [Development](#development)
    - [Coding conventions](#coding-conventions)
- [Architectures](#architectures)
    - [Framework](#framework)
    - [Frontend architecture](#frontend-architecture)
    - [Components architecture](#components-architecture)
    - [Components library](#components-library)
    - [Components styling](#components-styling)
    - [Config](#config)
    - [Routing](#routing)
    - [i18n](#i18n)
    - [Authentication](#authentication)
    - [APIs calls](#apis-calls)

## Installation

### Minimum requirements

- [NodeJS](https://nodejs.org/en/) 18.12.1 (You can use [nvm](https://github.com/nvm-sh/nvm))
- [Yarn](https://classic.yarnpkg.com/en/docs/install) 1.22.19

### Install the application locally

- Run `git clone git@github.com:symeo-io/symeo-reactjs-template.git` or `git clone https://github.com/symeo-io/symeo-reactjs-template.git` to clone the repository
- Run `cd symeo-reactjs-template` to navigate to the code folder
- Run `yarn` to install node dependencies
- Run `cp .env.staging .env` to copy the staging dot env file
- Edit the created `.env` file with the relevant variable values (to connect to your local api for example)
- Run `yarn start` to start the application on the `5173` port

## Development

### Coding conventions

The coding conventions and style are enforced by the [eslint](https://eslint.org/) linter and the [prettier](https://prettier.io/) formatter. The configuration can be found in the [.eslintrc](./.eslintrc) file. Your IDE should be configured to use this configuration.

To check linting error in command line, run `yarn lint`.

To fix automatically format errors, run `yarn lint:fix`.


## Architectures

### Framework

The web application is build on top of the [React](https://reactjs.org/) framework, with the [TypeScript](https://www.typescriptlang.org/) language. Local and production build are performed using [Vite](https://vitejs.dev/).

### Frontend architecture

The project is structured as follows:

- `src/components`: React components (reusable pieces of the application, such as a button).
- `src/hoc`: Custom [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html).
- `src/hooks`: Custom [React hooks](https://fr.reactjs.org/docs/hooks-intro.html).
- `src/providers`: Providers used to make functionalities available to any nested components of the app (such as [React Context](https://fr.reactjs.org/docs/context.html)).
- `src/api`: The API querying system, implement using [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- `src/services`: Custom services used in the application.
- `src/theme`: Custom [Mui Theme](https://mui.com/material-ui/customization/theming/).
- `src/translations`: Translation files used by [react-intl](https://formatjs.io/docs/react-intl/).
- `src/types`: Common typescript types used by the application.

### Components architecture

Components are split and organized using the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/). The `scr/components` reflects this methodology with the folders:

- `scr/components/atoms`
- `scr/components/molecules`
- `scr/components/organisms`
- `scr/components/pages`
- `scr/components/templates`

### Components library

The app makes heavy use of [Material UI](https://mui.com/) components.

### Components styling

The components should be style using the [sx prop](https://mui.com/system/getting-started/the-sx-prop/) provided by Material UI. To ensure that all components can be styled the same way, all custom components props type should inherit the [PropsWithSx](./src/types/PropsWithSx.tsx) type and pass the sx prop to its root component:

```typescript jsx
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";

export type CustomComponentProps = PropsWithSx & {
  title: string;
}

function CustomComponent({ title, sx }) {
  return <Box sx={{ ...sx }}>{title}</Box>;
}

export default CustomComponent;
```

### Config

Environment specific config is performed using .env files:

- `.env.local` for local development
- `.env.staging` for staging environment
- `.env.demo` for demo environment
- `.env.production` for production environment

Config is then centralized in the [config.ts](./src/config.ts) file. Env variables should be loaded only in the file, and component should only use this file to get config values.

### Routing

Routing is implemented using the [react-router](https://reactrouter.com/en/main) library. All routes are declared in the [routing.tsx](./src/routing.tsx) file with relevant config for each file. Those routes are then added to the app in the [RoutesWrapper](./src/RoutesWrapper.tsx) component.

Navigation between pages should be performed using the [useNavigate](./src/hooks/useNavigate.tsx) custom hook or using the [InternalLink](./src/components/atoms/InternalLink/InternalLink.tsx) component, which are made to use routes declared in the routing.tsx file.

### i18n

Internationalization is performed using [react-intl](https://formatjs.io/docs/getting-started/installation/). Translation files are stored in the [translations](./src/translations) folder, using json files ([en.json](./src/translations/en.json) for example).

All wording used throughout the application should be centralized in the translation files, and then be used in components like so:

```typescript jsx
import React from "react";
import { Drawer, Typography } from "@mui/material";
import { useIntl } from "react-intl";

function Sidebar() {
  const intl = useIntl();

  return (
    <Drawer>
      <Typography variant="h2">
        {intl.formatMessage({ id: "sidebar.title" })}
      </Typography>
    </Drawer>
  );
}

export default Sidebar;
```

### Authentication

The template assumes the api it calls uses [OpenID Connect](https://fr.wikipedia.org/wiki/OpenID_Connect) for authentication. An example is set up with Google Authentication.

It is implemented using [oidc-react](https://github.com/bjerkio/oidc-react), which is configured in the [App.tsx](./src/App.tsx) file using the `AuthProvider` provided by the library.

Routes that should only be accessed by logged-in users can be flagged with `isSecured: true` in the [routing.tsx](./src/routing.tsx) file. Those routes are then wrapped in the [AuthenticatedRoute](./src/components/atoms/AuthenticatedRoute) which manage all auth redirections.

To access current user data, the `useAuth()` hook provided by the library should be used.

### APIs calls

Calls to REST APIs are performed using the [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) toolkit. It:

- Tracks loading state in order to show UI spinners
- Avoids duplicate requests for the same data
- Allows optimistic updates to make the UI feel faster
- Manages cache lifetimes as the user interacts with the UI

It uses `redux` and is set up in the [App.tsx](./src/App.tsx) file to declare the redux [store](./src/store.ts) with the `Provider` given by the library.

APIs are then declared and configured in the [api.ts](./src/api/api.ts) file. Root url and logic to send Authentication token is defined in this file. 

Different series of endpoints can then be declared in separated files like so:

- `scr/api/api`: Root declaration of the api
- `scr/api/api/pokemon/pokemon.api.ts`: Declaration of the routes related to pokemon
- `scr/api/api/pokemon/pokemon.types.ts`: Declaration of all the types used to interact with the pokemon routes

For example:

pokemon.types.ts
```typescript
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
```

pokemon.api.ts
```typescript
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
```

RTK Query then generates hooks for each route that can be used in components:

```typescript jsx
import PageTemplate from "components/templates/PageTemplate";
import { useGetPokemonQuery } from "api/pokemon/pokemon.api";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import PokemonPanel from "components/organisms/PokemonPanel/PokemonPanel";

function Pokemon() {
  const { name } = useParams();
  const { data: pokemon, isLoading } = useGetPokemonQuery(
    { name: name as string },
    { skip: !name }
  );

  return (
    <PageTemplate>
      {isLoading && (
        <Box
          sx={{
            padding: (theme) => theme.spacing(2),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && pokemon && <PokemonPanel pokemon={pokemon} />}
    </PageTemplate>
  );
}

export default Pokemon;
```

RTK Query also supports sending data using [Mutations](https://redux-toolkit.js.org/rtk-query/usage/mutations).