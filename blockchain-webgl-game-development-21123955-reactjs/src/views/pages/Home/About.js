import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import {} from "react-feather";
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: "80px 0",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0px !important",
      paddingBottom: "30px",
    },
    "& img": {
      width: "100%",
      borderRadius: "20px",
    },
  },
  textbox: {
    paddingLeft: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
    },
    "& h1": {
      fontSize: "70px",
      fontWeight: "800",
      color: "#fff",
      [theme.breakpoints.down("md")]: {
        fontSize: "60px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontSize: "20px",
      marginTop: "20px",
      marginBottom: "20px",
      lineHeight: "35px",
      fontWeight: "400",
      color: "#fff ",
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px",
      },
    },
  },
}));

export default function BestSeller() {
  const classes = useStyles();

  return (
    <Box className={classes.aboutsection}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={12} md={5} className="wow bounceInLeft">
            <video
              controls
              // loop="true"
              // autoplay="true"
              width="100%"
            >
              <source src="images/MetaKnightPromoVideo1.mp4" type="video/mp4" />
            </video>
          </Grid>
          <Grid item xs={12} sm={12} md={7} className="wow bounceInRight">
            <Box className={classes.textbox} mb={5}>
              <Typography variant="h1" align="left">
                {" "}
                Our <br /> Meta Kingdom
              </Typography>
              <Typography variant="body2">
                The Meta Kingdom is comprised of 6 major factions and each Meta
                Knight is a member of their respective faction. Along with an
                army of Meta Knights, each faction has their own Overlord
                plotting to dominate the Meta Kingdom and Hero tasked with
                protecting the realm.
              </Typography>
              <Button variant="contained" size="large" color="Primary">
                Connect wallet
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
