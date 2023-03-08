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

const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundColor: "#1d0e33",
    padding: "50px 0 50px",
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px",
    },
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
  leftSection: {
    color: "#D3D3D3",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    marginBottom: "30px",
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

const meetMap = [
  {
    text1: "Dashan",
    text2: "CEO & ARTIST",
    img1: "./images/manimage.png",
  },
  {
    text1: "Charles",
    text2: "MANAGEMENT",
    img1: "./images/manimage1.png",
  },
  {
    text1: "Logan",
    text2: "DEVELOPER",
    img1: "./images/manimage2.png",
  },
  {
    text1: "Curtis",
    text2: "COMMUNITY",
    img1: "./images/manimage3.png",
  },
];

function Meet() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box className="subtextr" pb={1}>
          <Box className={classes.leftSection}>
            <img src="./images/grl.png" alt="" style={{ width: "35px" }} />
            &nbsp;&nbsp;
            <Typography variant="h3" title="MEET THE TEAM">
              OUR TEAM
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {meetMap.map((data, i) => {
            return (
              <Grid item lg={3} md={3} sm={6} xs={12} key={i}>
                <MeetCard data={data} index={i} />
              </Grid>
            );
          })}
        </Grid>
        <Box align="center" mt={6}>
          {/* <Button
            style={{ textDecoration: "none" }}
            href="https://discord.com/invite/Jjv3xYAqsf"
            // target="_blanck"
            component={Link}
            variant="contained"
            color="primary"
          >
            JOIN OUR COMMUNITY
          </Button> */}

          <Button
            style={{ textDecoration: "none" }}
            variant="contained"
            color="primary"
            href="https://discord.com/invite/Jjv3xYAqsf"
            // target="_blanck"
            component={Link}
            className={classes.buttonright}
          >
            JOIN OUR COMMUNITY
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Meet;
