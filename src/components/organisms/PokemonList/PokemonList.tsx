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

export type PokemonListProps = PropsWithSx & {
  pokemonList: PokemonListItem[];
  isLoading?: boolean;
};

function PokemonList({ pokemonList, isLoading = false, sx }: PokemonListProps) {
  const intl = useIntl();

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
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

export default PokemonList;
