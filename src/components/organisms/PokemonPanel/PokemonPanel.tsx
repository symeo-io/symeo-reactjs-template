import { PropsWithSx } from "types/PropsWithSx";
import { Pokemon } from "api/pokemon/pokemon.types";
import { Box, Typography } from "@mui/material";

export type PokemonPanelProps = PropsWithSx & { pokemon: Pokemon };

function PokemonPanel({ pokemon, sx }: PokemonPanelProps) {
  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h1">{pokemon.name}</Typography>
      <Box
        component="img"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
    </Box>
  );
}

export default PokemonPanel;
