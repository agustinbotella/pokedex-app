import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonByName } from "../../api";
import {
  Paper,
  CircularProgress,
  Typography,
  Container,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import noImage from "../../assets/no-image.jpeg";

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState();
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(undefined);

  let { pokemon } = useParams();

  const getImageUrl = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    );
    const data = await response.json();
    setImageUrl(data.sprites.front_default);
  };

  useEffect(() => {
    fetchPokemonByName(pokemon).then((response) => {
      setPokemonData(response.data);
    });
    getImageUrl();
    setImageIsLoading(false);

    return () => {
      setImageIsLoading(true);
      setImageUrl(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  const getPokemonTypesAsString = (types) => {
    const typesArray = types.map((type) => type.type.name);
    const typesString = typesArray.join(", ");
    return typesString;
  };

  return (
    <Container>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokedex
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4 }}>
        {pokemonData ? (
          <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              {pokemon}
            </Typography>
            <img
              src={imageIsLoading ? noImage : imageUrl || noImage}
              alt={pokemon}
              style={{ maxWidth: "96px", maxHeight: "96px" }}
            />
            <Typography variant="h6" gutterBottom>
              Weight: {pokemonData.weight}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Types: {getPokemonTypesAsString(pokemonData.types)}
            </Typography>
          </Paper>
        ) : (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Pokemon;
