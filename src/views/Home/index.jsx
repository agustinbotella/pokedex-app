import { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Pagination,
  AppBar,
  Toolbar,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import { fetchPokemons, fetchPokemonSearch } from "../../api";
import PokemonGrid from "../../components/PokemonGrid";
import NoPokemons from "../../components/NoPokemons";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const ITEMS_PER_PAGE = 10;
  const BASE_URL = "https://pokeapi.co/api/v2";

  let fullPokemonList = useRef(null);

  const getFullPokemonsList = async () => {
    return await axios.get(`${BASE_URL}/pokemon?limit=100000&offset=0`);
  };

  useEffect(() => {
    if (fullPokemonList.current.length === 0) {
      getFullPokemonsList().then((response) => {
        fullPokemonList.current = response.data.results;
      });
    }
    if (search) {
      fetchPokemonSearch(fullPokemonList.current, search).then((response) => {
        setPokemons(response);
        setTotalPokemonCount(response.length);
      });
    } else {
      setPokemons([]);
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
        {pokemons.length === 0 && search ? (
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
