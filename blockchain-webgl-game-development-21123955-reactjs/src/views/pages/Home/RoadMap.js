import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  ListItem,
  List,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundColor: "#120720",
    paddingTop: "50px",
    paddingBottom: "100px",
    "& h1": {
      fontSize: "48px",
      fontWeight: "400",
      color: "#fff",
      [theme.breakpoints.only("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontSize: "18px",
      fontWeight: "400",
      color: "#fff",
    },
    "& h2": {
      fontSize: "30px",
      fontWeight: "500",
      color: "#fff",
    },
  },
  textbox: {
    backgroundColor: "#190A2C",
    paddingTop: "20px",
    paddingBottom: "20px",
    textAlign: "center",
  },
  subtext: {
    backgroundColor: "#120720",
    paddingTop: "20px",
    paddingBottom: "10px",
    paddingLeft: "10px",
  },
  headbox1: {
    marginTop: "260px",
    border: "1px solid #ea154661",
    borderRadius: "5px",
    overflow: "hidden",
    position: "relative",
    "@media(max-width:565px)": {
      marginTop: "0",
    },
  },
  headbox2: {
    border: "1px solid #ea154661",
    borderRadius: "5px",
    overflow: "hidden",
    position: "relative",
    marginTop: "188px",
    "@media(max-width:565px)": {
      marginTop: "0",
    },
  },
  headbox3: {
    border: "1px solid #ea154661",
    borderRadius: "5px",
    overflow: "hidden",
    position: "relative",
    marginTop: "116px",
    "@media(max-width:565px)": {
      marginTop: "0",
    },
  },
  headbox4: {
    border: "1px solid #ea154661",
    borderRadius: "5px",
    overflow: "hidden",
    position: "relative",
    marginTop: "45px",
    // "& @media(maxWidth:565)": {
    "@media(max-width:565px)": {
      marginTop: "0",
    },
  },
  textboxs: {
    position: "relative",
    zIndex: "1",
    "& li": {
      position: "relative",
      paddingLeft: "20px",
      fontSize: "17px",
      color: "#ffffff",
      fontWeight: "400",
      "&::after": {
        content: "''",
        position: "absolute",
        height: "9px",
        width: "9px",
        backgroundColor: "#EA1546",
        borderRadius: "50%",
        left: 0,
        top: "14px",
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
      fontSize: "19px",
      marginTop: "20px",
      color: "#fff",
    },
  },
  mainflex: {
    marginTop: "50px",
  },
}));

function Roadmap() {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box textAlign="center">
          <Box className="subtext" textAlign="center">
            <Typography variant="h1" title="Roadmap">
              Roadmap
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="body1">
              We are aiming to introduce our game-changing platform
              <br /> by the end of this year and fully arm it with all the
              exciting features next year.
            </Typography>
          </Box>
        </Box>
        <Box className={classes.mainflex}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <Box className={classes.headbox1}>
                <Box className={classes.textbox}>
                  <Typography
                    variant="body1"
                    style={{
                      fontFamily: "Dismedia",
                      letterSpacing: "1px",
                      fontSize: "20px",
                    }}
                  >
                    2018
                  </Typography>
                </Box>
                <Box className={classes.subtext}>
                  <Typography variant="body1">Awareness</Typography>
                  <Box width="30%">
                    <Divider style={{ border: "1px solid #EA1546" }} />
                  </Box>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Gap analysis</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Tools define process</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Errors with risks</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Lack of process documentation</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Initiate change for problem managment</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Text here</ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <Box className={classes.headbox2}>
                <Box className={classes.textbox}>
                  <Typography
                    variant="body1"
                    style={{
                      fontFamily: "Dismedia",
                      letterSpacing: "1px",
                      fontSize: "20px",
                    }}
                  >
                    2019
                  </Typography>
                </Box>
                <Box className={classes.subtext}>
                  <Typography variant="body1">Standardized</Typography>
                  <Box width="35%">
                    <Divider style={{ border: "1px solid #EA1546" }} />
                  </Box>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Gap analysis</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Tools define process</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Errors with risks</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Lack of process documentation</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Initiate change for problem managment</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Text here</ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <Box className={classes.headbox3}>
                <Box className={classes.textbox}>
                  <Typography
                    variant="body1"
                    style={{
                      fontFamily: "Dismedia",
                      letterSpacing: "1px",
                      fontSize: "20px",
                    }}
                  >
                    2020
                  </Typography>
                </Box>
                <Box className={classes.subtext}>
                  <Typography variant="body1">Proactive</Typography>
                  <Box width="27%">
                    <Divider style={{ border: "1px solid #EA1546" }} />
                  </Box>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Gap analysis</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Tools define process</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Errors with risks</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Lack of process documentation</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Initiate change for problem managment</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Text here</ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <Box className={classes.headbox4}>
                <Box className={classes.textbox}>
                  <Typography
                    variant="body1"
                    style={{
                      fontFamily: "Dismedia",
                      letterSpacing: "1px",
                      fontSize: "20px",
                    }}
                  >
                    2021
                  </Typography>
                </Box>
                <Box className={classes.subtext}>
                  <Typography variant="body1">Service Aligned</Typography>
                  <Box width="39%">
                    <Divider style={{ border: "1px solid #EA1546" }} />
                  </Box>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Gap analysis</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Tools define process</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Errors with risks</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Lack of process documentation</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Initiate change for problem managment</ListItem>
                  </List>
                </Box>
                <Box className={classes.textboxs}>
                  <List>
                    <ListItem>Text here</ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Roadmap;
