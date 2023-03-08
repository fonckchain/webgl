import React, { useContext } from "react";
import { Box, Typography, Container, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { UserContext } from "src/context/User";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundImage: "url(./images/bgimage.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top right",
    position: "relative",
    // height: "116vh",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",

    "&::after": {
      content: "''",
      zIndex: "1",
      position: "absolute",
      width: "100%",
      bottom: "0",
      background: "rgb(0,0,0)",
      background:
        "linear-gradient(0deg, rgb(0 0 0 / 72%) 18%, rgba(0,0,0,0) 100%)",
      height: "100%",
    },
  },
  textbox: {
    zIndex: "2",
    position: "relative",

    textAlign: "center",
    padding: "193px 0 100px",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      padding: "150px 0 70px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      padding: "150px 0 70px",
    },
    "& h1": {
      fontSize: "44px",
      fontWeight: "400 !important",
      color: "#ffffff",
      textShadow: " 0px 5px 4px #000000",
      letterSpacing: "3px",

      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
      // marginBottom: "25px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
    "& h2": {
      fontSize: "50px",
      color: "#1CE9E9",
      textShadow: " 0px 5px 4px #000000",
      letterSpacing: "3px",
      marginBottom: "25px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "35px",
      },
    },
    "& h3": {
      fontSize: "30px",
      fontWeight: "400",
      color: " #FFFFFF",
      textShadow: " 0px 5px 4px #000000",
      letterSpacing: "3px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  },
  mainbox1: {
    // backgroundColor: '#120720',
    position: "relative",
    zIndex: "9",
    marginTop: "-48px",
  },
  imgbox: {
    textAlign: "center",
    width: "100%",
    // paddingBotton: "30px",
    backgroundColor: "#08111B",
    boxSizing: "border-box",
    border: "5px solid transparent",
    borderImage: "linear-gradient(to right,#04D9B2,#0354AA,#F20544)",
    borderImageSlice: "1",
    overflow: "hidden",
  },
  videobox: {
    width: "100%",
  },
  subtext: {
    "& h3": {
      fontSize: "50px",
      fontWeight: "400",
      color: "#ffffff",
      marginTop: "120px",
      marginBottom: "20px",
    },
  },
  model: {
    marginTop: "73px",
    marginBottom: "43px",
    "& h3": {
      color: "#ffffff",
      border: "0.5px solid #FFFFFF",
      height: "100%",
      display: "flex",
      padding: "20px",
      fontSize: "16px",
      lineHeight: "25px",
      background: "rgba(0, 0, 0, 0.3)",
      boxSizing: "border-box",
      textAlign: "center",
      alignItems: "center",
      borderRadius: "5px",
      fontWeight: "400",
      justifyContent: "center",
      "&:hover": {
        width: "100%",
        border: "0.5px solid transparent",
        overflow: "hidden",
        boxSizing: "border-box",
        textAlign: "center",
        borderImage: "linear-gradient(to right,#04D9B2,#0354AA,#F20544)",
        backgroundColor: "#08111B",
        borderImageSlice: "1",
        borderRadius: "5px",
      },
    },
  },
}));
const wallet = sessionStorage.getItem("wallet");
function Banner() {
  const user = useContext(UserContext);

  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box className={classes.textbox}>
          <Typography variant="h1">
            THE FIRST RACING GAME
            <br /> ON IMMUTABLE X.
          </Typography>
          {/* <Typography variant="h2">MINTING IN</Typography>
          <Typography variant="h3">
            1 DAY 23 HOURS 50 MINUTES AND 6 SECONDS
          </Typography> */}

          <Box className={classes.mainbox1}>
            <Container maxWidth="md">
              <Grid container className={classes.model} spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  {" "}
                  <Typography variant="h3">9000 MINTABLE CAR MODELS</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {" "}
                  <Typography variant="h3">
                    UPGRADE & CUSTOMIZE YOUR CAR
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {" "}
                  <Typography variant="h3">
                    RACE AND COMPETE WITH FRIENDS
                  </Typography>
                </Grid>
              </Grid>
              <Box className={classes.imgbox}>
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  // loop="true"
                  // autoplay="true"
                  width="100%"
                  className={classes.videobox}
                >
                  <source
                    src="images/MetaKnightPromoVideo1.mp4"
                    type="video/mp4"
                  />
                </video>
              </Box>
            </Container>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;
