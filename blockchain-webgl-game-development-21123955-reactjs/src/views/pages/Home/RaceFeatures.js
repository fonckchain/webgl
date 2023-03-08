import React from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  ListItem,
  List,
  Grid,
} from "@material-ui/core";
import {} from "react-feather";
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: "50px 0 100px",
    position: "relative",
    backgroundColor: "#120720",
    //height: '50vh',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down("md")]: {
      height: "auto",
    },
    "& h1": {
      fontSize: "50px",
      fontWeight: "600",
      color: "#fff",
    },
    "& p": {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "400",
      "@media(max-width:768px)": {},
    },
  },
  textbox: {
    position: "relative",
    zIndex: "1",
    "& li": {
      color: "#ffffff",
      position: "relative",
      fontSize: "24px",
      fontWeight: "500",
      paddingLeft: "30px",
      "&::after": {
        top: "14px",
        left: "0",
        width: "17px",
        height: "17px",
        content: "''",
        position: "absolute",
        borderRadius: "50%",
        backgroundColor: "#EA1546",
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
    "& h1": {
      fontSize: "50px",
      fontWeight: "600",
      color: "#f30065",
      [theme.breakpoints.down("lg")]: {
        fontSize: "40px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontSize: "17px",
      marginTop: "20px",
      color: "rgb(188, 184, 184)",
    },
  },

  textmargin: {
    marginTop: "90px",
  },
  lastbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
  },
}));

export default function RaceFeatures() {
  const classes = useStyles();

  return (
    <Box className={classes.aboutsection}>
      <Container maxWidth="lg">
        <Box className="subtext" textAlign="center">
          <Typography variant="h3" title="Features of DeRace">
            Features of DeRace
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="body1">
            DeRace is a complete NFT Car racing ecosystem where you can
            participate in Car
            <br /> races, breed NFT Cars with unique characteristics, build your
            own NFT hippodrome and make profit while doing it.
          </Typography>
        </Box>
        {/*<Container maxWidth="md">*/}
        <Box
          className={classes.textmargin}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={10} alignItems="center">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className={classes.textbox}>
                <List>
                  <ListItem> NFT Cars</ListItem>
                  <Box
                    mb={2}
                    style={{ marginTop: "-22px", paddingLeft: "30px" }}
                  >
                    {" "}
                    <Typography
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {" "}
                      One of a kind Cars that differ in both traits (rarity,
                      performance, cool-down time) and visual appearances.
                    </Typography>
                  </Box>
                  {/* <Box className={classes.textbox} mt={4}> */}
                </List>
              </Box>
              <Box className={classes.textbox}>
                <List>
                  <ListItem> Car races</ListItem>
                  <Box
                    mb={2}
                    style={{ marginTop: "-22px", paddingLeft: "30px" }}
                  >
                    {" "}
                    <Typography
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {" "}
                      Car races are based on RNG technology. The winner gets %
                      of all participant fees and additional prizes.
                    </Typography>
                  </Box>
                </List>
              </Box>
              <Box className={classes.textbox} mt={4}>
                <List>
                  <ListItem> Car breeding</ListItem>
                  <Box
                    mb={2}
                    style={{ marginTop: "-22px", paddingLeft: "30px" }}
                  >
                    {" "}
                    <Typography
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {" "}
                      Corresponding NFT Car genetics. Breeding via Genetic
                      Algorithm and Ethereum Smart Contract.
                    </Typography>
                  </Box>
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box>
                <img
                  src="./images/car2.png"
                  alt=""
                  width="100%"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    margin: "0 auto",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/*</Container>*/}
        <Box className={classes.textmargin}>
          <Grid container spacing={10} alignItems="center">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box>
                <img
                  src="./images/car_3.png"
                  alt=""
                  width="100%"
                  style={{ maxWidth: "650px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className={classes.textbox}>
                <List>
                  <ListItem> NFT Cars</ListItem>
                  <Box
                    mb={2}
                    style={{ marginTop: "-22px", paddingLeft: "30px" }}
                  >
                    {" "}
                    <Typography
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {" "}
                      One of a kind Cars that differ in both traits (rarity,
                      performance, cool-down time) and visual appearances.
                    </Typography>
                  </Box>
                  {/* <Box className={classes.textbox} mt={4}> */}
                </List>
              </Box>
              <Box className={classes.textbox}>
                <List>
                  <ListItem> Car races</ListItem>
                  <Box
                    mb={2}
                    style={{ marginTop: "-22px", paddingLeft: "30px" }}
                  >
                    {" "}
                    <Typography
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {" "}
                      Car races are based on RNG technology. The winner gets %
                      of all participant fees and additional prizes.
                    </Typography>
                  </Box>
                </List>
              </Box>
              <Box className={classes.textbox} mt={4}>
                <List>
                  <ListItem> Car breeding</ListItem>
                  <Box
                    mb={2}
                    style={{ marginTop: "-22px", paddingLeft: "30px" }}
                  >
                    {" "}
                    <Typography
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {" "}
                      Corresponding NFT Car genetics. Breeding via
                    </Typography>
                  </Box>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
