import React from "react";
import HomePage from "components/pages/Home/Home";
import LoginPage from "components/pages/Login/Login";
import PokemonPage from "components/pages/Pokemon/Pokemon";

export type Route = {
  isSecured?: boolean;
  sidebar?: boolean;
  path: string;
  element: React.ComponentType<object>;
  defaultParams?: Record<string, string>;
  contained?: boolean;
};

const routes = {
  home: {
    path: "/",
    isSecured: true,
    sidebar: true,
    element: HomePage,
  } as Route,
  pokemon: {
    path: "/pokemon/:name",
    isSecured: true,
    sidebar: true,
    element: PokemonPage,
  } as Route,
  login: {
    path: "/login",
    isSecured: false,
    sidebar: false,
    element: LoginPage,
  } as Route,
  "*": {
    path: "/*",
    element: () => <div>Not Found</div>, // TODO: build 404 page
  } as Route,
};

export default routes;
