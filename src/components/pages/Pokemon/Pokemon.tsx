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
