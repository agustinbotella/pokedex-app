import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Pagination,
  AppBar,
  Toolbar,
  Typography,
  TextField,
} from "@mui/material";
import { fetchPokemons, fetchPokemonSearch } from "../../api";
import PokemonGrid from "../../components/PokemonGrid";
import NoPokemons from "../../components/NoPokemons";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (search) {
      fetchPokemonSearch(search).then((response) => {
        setPokemons(response);
        setTotalPokemonCount(response.length);
      });
    } else {
      fetchPokemons(offset).then((response) => {
        setPokemons(response.data.results);
        setTotalPokemonCount(response.data.count);
      });
    }
  }, [search, offset]);

  const handlePageChange = (_event, page) => {
    const newOffset = (page - 1) * ITEMS_PER_PAGE;
    setOffset(newOffset);
  };

  return (
    <Container>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokedex
          </Typography>
          <TextField
            variant="filled"
            label="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ bgcolor: "background.paper" }}
          />
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        {pokemons.length === 0 ? (
          <NoPokemons />
        ) : (
          <PokemonGrid pokemons={pokemons} />
        )}
        {!search && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(totalPokemonCount / ITEMS_PER_PAGE)}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Home;
