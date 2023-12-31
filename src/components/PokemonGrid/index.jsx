import PropTypes from "prop-types";
import { Container, Box, Grid, CircularProgress } from "@mui/material";
import PokemonCard from "../PokemonCard";

const PokemonGrid = ({ pokemons }) => {
  if (pokemons.length === 0) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
          mt={4}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {pokemons.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PokemonGrid;

PokemonGrid.propTypes = {
  pokemons: PropTypes.array.isRequired,
};
