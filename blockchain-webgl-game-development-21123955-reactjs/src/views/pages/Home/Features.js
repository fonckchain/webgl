import React from "react";
import { Box, Typography, Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "70px 0 65px",
    position: "relative",
    backgroundColor: "#1D0E33",
    zIndex: "9",
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px",
    },
  },

  frameTop: {
    position: "absolute",
    top: "0",
    width: "100%",
  },
  frameBottom: {
    position: "absolute",
    bottom: "-1px",
    width: "100%",
    transform: "rotate( 180deg)",
  },
  tokens: {
    "& h4": {
      fontSize: "30px",
      fontWeight: "500",
      color: "#ffffff",
      paddingTop: "30px",
      paddingBottom: "27px",
      fontFamily: "'Roboto', sans-serif",
      "@media(max-width:767px)": {
        fontSize: "20px",
      },
    },
    "& p": {
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "20px",
      textAlign: "center",
    },
  },
  boxbgone: {
    textAlign: "center",
    // background: 'linear-gradient(152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)',
    backgroundColor: "#110720",
    backdropFilter: "blur(42px)",
    // height: "100%",
    borderRadius: "5px",
    padding: "50px 25px 50px 25px",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-10px)",
    },
  },

  lineborder: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
  imgtoken: {
    width: "100%",
    maxWidth: "70px",
    margin: "0 auto",
    height: "80px",
    "& img": {
      maxHeight: "80px",
    },
  },
  bigtoken: {
    width: "100%",
    maxWidth: "80px",
    margin: "0 auto",
  },
  leftSection: {
    color: "#D3D3D3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "40px",
    "& h3": {
      fontSize: "30px",
      marginLeft: "15px",
      lineHeight: 0,
      [theme.breakpoints.down("xs")]: {
        fontSize: "25px",
        marginLeft: "6px",
        lineHeight: "40px",
      },
    },
  },
  buttonright: {
    padding: "12px 30px",
    borderRadius: "5px",
    height: "45px",
    backgroundColor: "#EA1546",
  },
}));

function Features() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box className={classes.leftSection} textAlign="center">
          <img
            src="images/ourFratures.png"
            alt="features"
            style={{ width: "38px" }}
          />
          <Typography variant="h3" title="OUR FEATURES">
            OUR FEATURES
          </Typography>
        </Box>
        <Box className={classes.gridbox}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Box textAlign="center" className={classes.boxbgone}>
                <figure className={classes.imgtoken}>
                  <img
                    src="images/token1.png"
                    alt=""
                    width="100%"
                    style={{ maxWidth: "65px" }}
                  />
                </figure>
                <Box className={classes.tokens}>
                  <Typography variant="h4">CUSTOMIZATION</Typography>
                  <Typography variant="body1">
                    All cars on Foreign Fuels will be upgradable and modifiable
                    with parts. All parts are interchangable for specific
                    manufacturers. Upgrade their appearance and performance to
                    improve your car’s in-game stats.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Box textAlign="center" className={classes.boxbgone}>
                <figure className={classes.imgtoken}>
                  <img src="images/token2.png" alt="" width="100%" />
                </figure>
                <Box className={classes.tokens}>
                  <Typography variant="h4">$GAS TOKENS</Typography>
                  <Typography variant="body1">
                    Use $GAS tokens in order to mint parts, upgrade your cars,
                    or modify your apperance. Place wagers on races against your
                    friends and rivals to earn $GAS. Gas tokens can be purchased
                    with Ethereum and other Crypto.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Box textAlign="center" className={classes.boxbgone}>
                <figure className={classes.imgtoken}>
                  <img src="images/token3.png" alt="" width="100%" />
                </figure>
                <Box className={classes.tokens}>
                  <Typography variant="h4">RACE FRIENDS</Typography>
                  <Typography variant="body1">
                    Passively earn $GAS tokens by racing against your friends.
                    Increase your car’s performance rating to compete against
                    others and to have a better chance at winning future races.
                    Or upgrade your car’s apperance.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box align="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonright}
          >
            LEARN MORE
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Features;
