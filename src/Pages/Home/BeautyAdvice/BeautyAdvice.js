import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const BeautyAdvice = () => {
  return (
    <Container>
      <hr />
      <Typography variant="h4" sx={{ my: 2 }}>
        HAIR BEAUTY ADVICE
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/PPLvXf59wSM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </Grid>
        <Grid item xs={12} md={6}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/xoWKmN1wBHM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BeautyAdvice;
