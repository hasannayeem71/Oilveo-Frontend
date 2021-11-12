import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Review from "../Review/Review";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get(`https://oilveo.herokuapp.com/reviews`)
      .then((res) => setReviews(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        REVIEW
      </Typography>

      <Grid container spacing={2}>
        {reviews.map((re) => {
          return (
            <Grid item xs={6} md={3} key={re._id}>
              <Review re={re} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default UserReviews;

/**
 * <OwlCarousel className="owl-theme" loop margin={10} nav>
        <div class="item">
          <img src={} />
        </div>
        <div class="item">
          <img src="assets/img/2.jpg" />
        </div>
        <div class="item">
          <img src="assets/img/3.jpg" />
        </div>
        <div class="item">
          <img src="assets/img/4.jpg" />
        </div>
        <div class="item">
          <img src="assets/img/5.jpg" />
        </div>
      </OwlCarousel>
 */
