import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { color } from '@mui/system'
import MeetCard from "src/component/MeetCard";
const useStyles = makeStyles({
  mainbox: {
    paddingBottom: "40px",
    backgroundColor: "#1d0e33",
  },

  subtext: {
    fontSize: "29px",
    fontWeight: "700",
    marginBottom: "-3px",
    color: "#ffffff",
    marginTop: "-13px",
  },
  ceo: {
    fontSize: "18px",
    fontWeight: "300",
    marginBottom: "15px",
    color: "#fc5050",
  },
  top: {
    // margin: "0 auto",
    // marginBottom: "90px",
    backgroundColor: "#190A2C",
    width: "100%",
    padding: "20px 0px",
  },
  mainBoxText: {
    // paddingBottom: "40px",
    "& h3": {
      color: "#ffffff",
      textAlign: "center",
      // fontSize: "48px",
    },
  },
});
const meetMap = [
  {
    text1: "Dashan",
    text2: "CEO & ARTIST",
    img1: "/images/profile pic.png",
  },
  {
    text1: "Charles",
    text2: "MANAGEMENT",
    img1: "./images/manimage1.png",
  },
];
function TeamBehind() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Box
        className="subtext"
        textAlign="center"
        style={{ paddingBottom: "20px", paddingTop: "50px" }}
      >
        <Typography
          variant="h3"
          title=" OUR TEAM"
          className={`${classes.mainBoxText} subtext`}
          // style={{ fontSize: "48px", color: "white" }}
        >
          About Us
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          {meetMap.map((data, i) => {
            return (
              <Grid item lg={6} md={6} sm={6} xs={12} key={i}>
                <MeetCard data={data} index={i} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default TeamBehind;
