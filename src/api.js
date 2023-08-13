import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = (offset = 0) => {
  return axios.get(`${BASE_URL}/pokemon?limit=10&offset=${offset}`);
};

export const fetchPokemonByName = async (name) => {
  return axios.get(`${BASE_URL}/pokemon/${name}`);
};

export const fetchPokemonSearch = async (pokemons, name) => {
  return pokemons.filter((pokemon) => pokemon.name.includes(name));
};
