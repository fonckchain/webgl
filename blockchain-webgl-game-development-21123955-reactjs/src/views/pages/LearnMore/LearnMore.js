import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  learnMoreBg: {
    background: "#1D0E33",
    // paddingBottom: "10rem",
    "@media(max-width:1290px)": {
      paddingBottom: "3rem",
    },
  },
  learnMoreHeader: {
    "& h1": {
      paddingTop: "6rem",
      // paddingBottom:"2rem",
      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "48px",
      lineHeight: "49px",
      textAlign: "center",
      color: "#FFFFFF",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
      "@media(max-width:1290px)": {
        paddingTop: "3rem",
      },
    },
  },
  contentBox: {
    marginTop: "2rem",
    background: "#110720",
    borderRadius: "5px",

    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media(max-width:1279px)": {
      width: "auto",
      marginTop: "1rem",
    },
    "& h4": {
      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "26px",
      lineHeight: "37px",
      color: "#FFFFFF",
    },
  },
  contentBoxVideo: {
    marginTop: "2rem",

    height: "443px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#110720",
    borderRadius: "5px",
    "@media(max-width:1276px)": {
      width: "auto",
      marginTop: "1rem",
      maxHeight: "200px",
    },
    "@media(max-width:991px)": {
      maxHeight: "200px",
    },

    "& h4": {
      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "26px",
      lineHeight: "37px",
      color: "#FFFFFF",
    },
  },
  contentBoxDiscord: {
    marginTop: "2rem",
    marginBottom: "5rem",
    background: "#110720",
    borderRadius: "5px",

    height: "443px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media(max-width:1276px)": {
      width: "auto",
      marginTop: "1rem",
      maxHeight: "200px",
    },
    "@media(max-width:991px)": {
      maxHeight: "200px",
    },

    "& h4": {
      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "26px",
      lineHeight: "37px",
      color: "#FFFFFF",
    },
  },
}));
const learnData = [
  {
    title: "Getting Started",
  },
  {
    title: "Buy A New Car",
  },
  {
    title: "FAQ",
  },
  {
    title: "Video",
  },
  {
    title: "Discord Embed",
  },
];

export default function LearnMore() {
  const classes = useStyles();
  return (
    <Box className={classes.learnMoreBg}>
      <Container>
        <Box className={classes.learnMoreHeader}>
          <Typography variant="h1">Learn More</Typography>
        </Box>
        <Grid container spacing={2}>
          {learnData.slice(0, 3).map((data, index) => {
            return (
              <>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Box className={classes.contentBox}>
                    <Typography variant="h4">{data.title}</Typography>
                  </Box>
                </Grid>
              </>
            );
          })}
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Box className={classes.contentBoxVideo}>
              <Typography variant="h4">Video</Typography>
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Box className={classes.contentBoxDiscord}>
              <Typography variant="h4">Discord Embed</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
