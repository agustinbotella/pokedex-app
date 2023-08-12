import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/no-image.jpeg";

const PokemonCard = ({ name }) => {
  const navigate = useNavigate();

  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(undefined);

  const getImageUrl = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    setImageUrl(data.sprites.front_default);
  };

  useEffect(() => {
    getImageUrl();
    setImageIsLoading(false);

    return () => {
      setImageIsLoading(true);
      setImageUrl(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        elevation={3}
        sx={{ cursor: "pointer" }}
        style={{ padding: "16px", textAlign: "center" }}
        onClick={() => navigate(`/${name}`)}
      >
        <img
          src={imageIsLoading ? noImage : imageUrl || noImage}
          alt={name}
          style={{ maxWidth: "96px", maxHeight: "96px" }}
        />
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default PokemonCard;

// proptypes
PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
};
