import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "55px",
    zIndex: "1",
    position: "relative",
    marginTop: "73px",
    marginBottom: "60px",
    borderRadius: "8px",
    backgroundSize: "cover",
    backgroundColor: "#120720",
    backgroundImage: "url(./images/background.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    "&::after": {
      content: "''",
      zIndex: "-1",
      position: "absolute",
      width: "100%",
      bottom: "0",

      height: "100%",
    },
  },

  texthead: {
    "& h5": {
      fontSize: "35px",
      fontWeight: "400",
      color: "#FFFFFF",
      textShadow: "0px 4px 4px rgb(0 0 0 / 50%)",
      [theme.breakpoints.only("xs")]: {
        fontSize: "22px",
      },
    },
    "& p": {
      color: "#ffffff",
      fontSize: "24px",
      fontWeight: "500",
      lineHeight: "32px",
      textShadow: "0px 4px 4px rgb(0 0 0 / 50%)",
      marginTop: "16px",
      [theme.breakpoints.only("xs")]: {
        fontSize: "14px",
        lineHeight: "20px",
        marginTop: "0px",
      },
    },
  },
  buttonright: {
    padding: "10px 26px",
    fontSize: "24px",
    fontWeight: "400",
  },
  gamebox: {
    width: "100%",
    maxWidth: "300px",
  },
  cartop: {
    width: "100%",
    maxWidth: "270px",
    marginTop: "-20px",
  },
}));

function Garage() {
  const classes = useStyles();
  return (
    <Box className={classes.bannerbox}>
      <Container>
        <Box className={classes.mainbox}>
          <Box className={classes.bannerbox}>
            <Grid container alignItems="center">
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Box className={classes.texthead}>
                  <Typography variant="h5">
                    {/* Create your free garage */}
                    Start Racing Today!
                  </Typography>
                  <Typography variant="body1">
                    Start your racing carrer in the Downshift District by
                    purchasing a vehicle.
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={8} md={6} sm={12} xs={12}>
                <Box display="flex" justifyContent="end" alignItems="end">
                  <Box>
                    <img
                      src="./images/Upimage1.png"
                      alt=""
                      width="100%"
                      className={classes.gamebox}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Garage;
