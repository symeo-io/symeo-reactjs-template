import PageTemplate from "components/templates/PageTemplate";
import { useGetPokemonListQuery } from "api/pokemon/pokemon.api";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import PokemonList from "components/organisms/PokemonList/PokemonList";

function Home() {
  const intl = useIntl();
  const { data: pokemonListData, isLoading: isLoadingPokemonList } =
    useGetPokemonListQuery({
      offset: 0,
      limit: 151,
    });
  const pokemonList = useMemo(
    () => pokemonListData?.results ?? [],
    [pokemonListData?.results]
  );

  return (
    <PageTemplate>
      <Typography variant="h1">
        {intl.formatMessage({ id: "home.title" })}
      </Typography>
      <PokemonList
        pokemonList={pokemonList}
        isLoading={isLoadingPokemonList}
        sx={{ marginTop: (theme) => theme.spacing(2) }}
      />
    </PageTemplate>
  );
}

export default Home;
