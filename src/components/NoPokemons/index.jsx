import { Box, Typography } from "@mui/material";

function NoPokemons() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4">There are no pokemons to show</Typography>
    </Box>
  );
}

export default NoPokemons;
