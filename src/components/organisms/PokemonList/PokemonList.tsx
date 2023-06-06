import { PropsWithSx } from "types/PropsWithSx";
import { PokemonListItem } from "api/pokemon/pokemon.types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useIntl } from "react-intl";
import { Box, CircularProgress } from "@mui/material";
import InternalLink from "components/atoms/InternalLink/InternalLink";
import { useJSONLocalStorage } from "hooks/useLocalStorage";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useCallback } from "react";

const FAVORITE_POKEMON_STORAGE_KEY = "FAVORITE_POKEMON";

export type PokemonListProps = PropsWithSx & {
  pokemonList: PokemonListItem[];
  isLoading?: boolean;
};

function PokemonList({ pokemonList, isLoading = false, sx }: PokemonListProps) {
  const intl = useIntl();
  const [favorites, setFavorites] = useJSONLocalStorage<string[]>(
    FAVORITE_POKEMON_STORAGE_KEY
  );

  const addToFavorite = useCallback(
    (pokemon: PokemonListItem) => {
      if (!favorites?.includes(pokemon.name)) {
        setFavorites(favorites ? [...favorites, pokemon.name] : [pokemon.name]);
      }
    },
    [favorites, setFavorites]
  );

  const removeFromFavorites = useCallback(
    (pokemon: PokemonListItem) => {
      if (favorites) {
        setFavorites(favorites.filter((name) => name !== pokemon.name));
      }
    },
    [favorites, setFavorites]
  );

  return (
    <TableContainer component={Paper} sx={{ ...sx }}>
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
      {!isLoading && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {intl.formatMessage({
                  id: "pokemon-list.columns.number-column-label",
                })}
              </TableCell>
              <TableCell>
                {intl.formatMessage({
                  id: "pokemon-list.columns.name-column-label",
                })}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonList.map((pokemon, index) => (
              <TableRow
                key={pokemon.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <InternalLink to="pokemon" params={{ name: pokemon.name }}>
                    {pokemon.name}
                  </InternalLink>
                </TableCell>
                <TableCell align="right">
                  {favorites?.includes(pokemon.name) ? (
                    <StarIcon
                      onClick={() => removeFromFavorites(pokemon)}
                      sx={{ cursor: "pointer" }}
                    />
                  ) : (
                    <StarBorderIcon
                      onClick={() => addToFavorite(pokemon)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

export default PokemonList;
