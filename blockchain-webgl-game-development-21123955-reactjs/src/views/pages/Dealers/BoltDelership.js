import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MeetCard from "src/component/MeetCard";
import BoltDelershipCard from "src/component/BoldDelershipCard";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundColor: "#1d0e33",
    padding: "50px 0 100px",
    "& h1": {
      fontSize: "50px",
      fontWeight: "400",
      color: "#ffffff",
      textAlign: "center",
      marginBottom: "20px",
    },
  },
  borderbg: {
    marginBottom: "80px",
  },
  boxborder: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
}));

const meetMap = [
  {
    text1: "FF Car + Racer",
    text2: "CEO & ARTIST",
    img1: "./images/manimage.png",
  },
  {
    text1: "Handling Parts",
    text2: "MANAGEMENT",
    img1: "./images/manimage1.png",
  },
  {
    text1: "Engine Parts",
    text2: "DEVELOPER",
    img1: "./images/manimage2.png",
  },
  {
    text1: "Cosmetic Parts",
    text2: "COMMUNITY",
    img1: "./images/manimage3.png",
  },
  {
    text1: "FF Car + Racer",
    text2: "CEO & ARTIST",
    img1: "./images/manimage.png",
  },
  {
    text1: "FF Car + Racer",
    text2: "CEO & ARTIST",
    img1: "./images/manimage.png",
  },
];

function BoltDelership() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box className="subtextt">
          <Typography variant="h3" title="MEET THE TEAM">
            Bolt Dealership
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {meetMap.map((data, i) => {
            return (
              <Grid item lg={4} md={4} sm={6} xs={12} key={i}>
                <BoltDelershipCard data={data} index={i} />
              </Grid>
            );
          })}
        </Grid>
        <Box align="center" mt={9}>
          <Button
            style={{ textDecoration: "none" }}
            href="https://discord.com/invite/Jjv3xYAqsf"
            target="_blanck"
            component={Link}
            variant="contained"
            color="primary"
          >
            JOIN OUR COMMUNITY
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default BoltDelership;
