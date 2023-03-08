import React from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import BrackersCard from "src/component/BrackersCard";

const product = [
  {
    img1: "images/backers1.png",
  },
  {
    img1: "images/backers2.png",
  },
  {
    img1: "images/backers3.png",
  },
  {
    img1: "images/backers4.png",
  },
  {
    img1: "images/backers5.png",
  },
  {
    img1: "images/backers6.png",
  },
  {
    img1: "images/backers7.png",
  },
  {
    img1: "images/backers8.png",
  },
  {
    img1: "images/backers9.png",
  },
  {
    img1: "images/backers10.png",
  },
  {
    img1: "images/backers11.png",
  },
  {
    img1: "images/backers12.png",
  },
  {
    img1: "images/backers13.png",
  },
  {
    img1: "images/backers14.png",
  },
  {
    img1: "images/backers15.png",
  },
  {
    img1: "images/backers16.png",
  },
  {
    img1: "images/backers17.png",
  },
  {
    img1: "images/backers18.png",
  },
];

const useStyles = makeStyles({
  mainbox: {
    background: "#1D0E33",
    padding: "60px 0",
  },

  backers: {
    fontSize: "50px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "40px",
  },
});
function BackersCard() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container>
        {/*<Box className={classes.boxbg}>*/}
        {/* <Box textAlign="center">
          <Typography className={classes.backers}>BACKERS</Typography>
        </Box> */}
        <Box className="subtext" textAlign="center" pb={2}>
          <Typography variant="h3" title="BACKERS">
            BACKERS
          </Typography>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {product.map((data, i) => {
            return (
              <Grid item lg={2} md={2} sm={4} xs={6} k={i}>
                <BrackersCard data={data} type="card" index={i} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default BackersCard;
