import React from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  makeStyles,
  CardMedia,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Mint from "./Mint";
import PublicMint from "src/views/pages/Mint/PublicMint";

const useStyles = makeStyles((theme) => ({
  mainbaner: {
    paddingBottom: "50px",
    backgroundColor: "#190a2c",
  },
  bannerpage: {
    width: "100%",
    // height: "500px",
    borderRadius: "40px",
  },
  bannerbox: {
    "@media(max-width:768px)": {
      paddingBottom: "40px",
    },
  },
  bannertext: {
    paddingTop: "9%",
  },
  text1: {
    "& h1": {
      fontSize: "60px",
      color: "#fff",
      fontWeight: "700",
    },
  },
  text2: {
    fontSize: "20px",
    color: "#fff",
  },
}));
export default function Banner() {
  const classes = useStyles();
  return (
    <Box
      style={{
        // paddingTop: "120px",
        paddingBottom: "50px",
      }}
    >
      <Box className={classes.mainbaner}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} lg={6}>
              <Box className={classes.bannertext}>
                <Box className={classes.text1}>
                  <Box className="subtext" textAlign="center">
                    <Typography variant="h3" title="Buy">Buy</Typography>
                  </Box>
                  <Typography className={classes.text2}>
                    The Best Place to Collect , Buy and Sell Awesome Cars
                  </Typography>
                  <p style={{    color: "#ccc",}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </p>
                </Box>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Box
                    style={{
                      color: "#fff",
                      paddingTop: "70px",
                    }}
                  >
                    Get Featured on the Homepage &#x2192;
                  </Box>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} lg={6}>
              <Box fixed className="bannerContent">
                &nbsp;&nbsp;&nbsp;
                <Box
                  className={classes.bannerbox}
                //  component={Link} to="/details"
                >
                  <img className={classes.bannerpage} src="/images/car1.png" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Mint />
      {/* <PublicMint /> */}
    </Box>
  );
}
