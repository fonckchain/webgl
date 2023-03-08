import React, { useState, useEffect } from "react";
import {
  List,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  ListItem,
} from "@material-ui/core";
import { countDownDate } from "src/constants";
// import CountDownTime from "./CountDowmTime";
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: "80px 0",
    position: "relative",
    backgroundRepeat: "no-repeat",
    width: "100%",
    backgroundSize: "cover",
    background: "#000",
    "& img": {
      width: "100%",
      borderRadius: "50px",
    },
    "& ul": {
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      display: "flex",
      marginTop: "50px",
      justifyContent: "center",
      "& li": {
        display: "block",
        padding: "10px",
        textAlign: "center",
        "& span": {
          color: "#fff",
          [theme.breakpoints.down("xs")]: {
            fontSize: "10px",
          },
        },
        "& div": {
          width: "80px",
          height: "80px",
          position: "relative",
          margin: "auto",
          marginTop: "10px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: " center",
          justifyContent: "center",
          fontSize: "40px",
          paddingTop: "16px",
          color: "#000",
          borderRadius: " 10px",
          zIndex: "1",
          [theme.breakpoints.down("xs")]: {
            width: "40px",
            height: "40px",
            fontSize: "23px",
            paddingTop: "8px",
          },
          "&::after": {
            content: "''",
            zIndex: "-1",
            position: "absolute",
            width: "100%",
            top: "50%",
            backgroundColor: "#ccc",
            height: "1px",
          },
        },
      },
    },
  },

  textbox: {
    "& h1": {
      fontSize: "50px",
      fontWeight: "600",
      color: "#fff",
      [theme.breakpoints.down("lg")]: {
        fontSize: "50px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontSize: "14px",
      marginTop: "20px",
      color: "#fff ",
    },
  },
}));

export default function BestSeller(props) {
  const classes = useStyles();

  //
  // var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

  const [intervals, setIinerval] = useState(true);
  const [dayssss, setDayssss] = useState("");
  const [hourssss, setHourssss] = useState("");
  const [minutessss, setMinutesssss] = useState("");
  const [secondssss, setSecondssss] = useState("");
  // // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var day = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hour = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setDayssss(day);
    setHourssss(hour);
    setMinutesssss(minutes);
    setSecondssss(seconds);

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      setIinerval(false);
    }
  }, 1000);

  return (
    <Box
      className={classes.aboutsection}
      // style={{ backgroundImage: "url('images/bg-date.png')" }}
    >
      <Container maxWidth="lg">
        <Box className={classes.textbox} align="center">
          <Typography variant="h1" className="wow bounceInUp">
            {" "}
            Public Mint {intervals !== true ? "Open" : "Opening"}
          </Typography>
        </Box>

        {intervals !== true ? (
          <Box align="center" className="wow bounceInUp" mt={5}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.buttonright}
            >
              MINTING START
            </Button>
          </Box>
        ) : (
          <>
            <Box>
              {dayssss === 0 &&
              hourssss === 0 &&
              minutessss === 0 &&
              secondssss === 0 ? null : (
                <>
                  {/*   */}
                  <List className="wow bounceInUp">
                    <ListItem>
                      <span>DAY</span>
                      <div>{dayssss < 10 ? `0${dayssss}` : dayssss}</div>
                    </ListItem>
                    <ListItem>
                      <span>HOURS</span>
                      <div>{hourssss < 10 ? `0${hourssss}` : hourssss}</div>
                    </ListItem>
                    <ListItem>
                      <span>MINUTES</span>
                      <div>
                        {minutessss < 10 ? `0${minutessss}` : minutessss}
                      </div>
                    </ListItem>
                    <ListItem>
                      <span>SECONDS</span>
                      <div>
                        {secondssss < 10 ? `0${secondssss}` : secondssss}
                      </div>
                    </ListItem>
                  </List>
                </>
              )}
            </Box>
            <Box align="center" className="wow bounceInUp" mt={5}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.buttonright}
              >
                MINTING SOON
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
