import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  CircularProgress,
  Typography,
  Container,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import axios from "axios";

const Ability = () => {
  let { ability } = useParams();
  const [abilityText, setAbilityText] = useState();
  const [abilityName, setAbilityName] = useState();

  const getAbilityText = async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/ability/${ability}`,
    );

    // Iterate over the effect_entries array and get the text from the one whose language is english
    const englishEffect = response.data.effect_entries.find(
      (effect) => effect.language.name === "en",
    );
    // Iterate over the name array and get the text from the one whose language is english
    const englishName = response.data.names.find(
      (name) => name.language.name === "en",
    );
    setAbilityText(englishEffect.effect);
    setAbilityName(englishName.name);
  };

  useEffect(() => {
    getAbilityText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ability]);

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
        {abilityText ? (
          <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              {abilityName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {abilityText}
            </Typography>
          </Paper>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Ability;
