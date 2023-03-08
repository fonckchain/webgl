import { Box, Typography, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import React from "react";
const useStyles = makeStyles((theme) => ({
  Boxmain: {
    backgroundColor: "#1D0E33",
  },
  Boxtext: {
    "& h3": {
      color: "#fff",
      textAlign: "center",
    },
  },
  gridbox: {
    backgroundColor: "#110720",
    padding: "50px 20px 50px 20px",
    "& h3": {
      color: "#ffffff",
      textAlign: "center",
      fontSize: "26px",
      fontWeight: "normal",
    },
  },
  gridboxx: {
    height: "350px",
    backgroundColor: "#110720",
    display: " flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: "50px 20px 50px 20px",
    "& h3": {
      color: "#ffffff",
      textAlign: "center",
      fontSize: "26px",
      fontWeight: "normal",
    },
  },
}));
export default function LearnMore() {
  const classes = useStyles();
  return (
    <Box className={classes.Boxmain}>
      <Container>
        <Box pt={5} pb={5}>
          <Box className={classes.Boxtext}>
            <Typography variant="h3">Learn More</Typography>
          </Box>
        </Box>
        <Box pb={6}>
          <Grid container spacing={5}>
            <Grid item lg={4} sm={4} xs={12}>
              <Box className={classes.gridbox}>
                <Typography variant="h3">
                  hGetting <br /> Startedgjh
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <Box className={classes.gridbox}>
                <Typography variant="h3">
                  {" "}
                  Buy A <br /> New Car
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <Box className={classes.gridbox}>
                <Typography variant="h3">
                  {" "}
                  Help <br /> Center
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item lg={8} sm={8} xs={12}>
              <Box className={classes.gridboxx}>
                <Typography variant="h3">Video</Typography>
              </Box>
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <Box className={classes.gridboxx}>
                <Typography variant="h3"> Discord Embed</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
