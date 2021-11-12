import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import React from "react";
const Review = ({ re }) => {
  const { name, review, userImg, rating } = re;
  return (
    <>
      <Box
        sx={{
          m: 1,
          width: "100%",
          // height: "100%",
        }}>
        <Paper elevation={4}>
          <Box sx={{ display: "flex", alignItems: "center", padding: "5px" }}>
            <Avatar alt="user Img" src={userImg} />
            <Typography variant="p" style={{ fontWeight: "500" }}>
              {name}
            </Typography>
          </Box>
          <Typography
            variant="p"
            as="h6"
            style={{
              textAlign: "left",
              fontWeight: "400",
              padding: "5px",
              lineHeight: "2",
            }}>
            {review}
          </Typography>
          <Rating name="read-only" value={rating} readOnly />
        </Paper>
      </Box>
    </>
  );
};

export default Review;

/**
 * <div class="item">
          <img src={} />
        </div>
 */
