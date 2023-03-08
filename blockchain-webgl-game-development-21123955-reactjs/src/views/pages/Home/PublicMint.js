import React, { useContext, useEffect, useState } from "react";
import {
  List,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  ListItem,
} from "@material-ui/core";
import { calculateTimeLeft } from "src/utils";
import { UserContext } from "src/context/User";
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: "80px 0",
    position: "relative",
    backgroundRepeat: "no-repeat",
    width: "100%",
    backgroundSize: "cover",
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
      fontSize: "14px",
      marginTop: "20px",
      color: "#fff ",
    },
  },
}));

export default function BestSeller() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(
        calculateTimeLeft(
          new Date(parseInt(user.publicSaleStartTimestamp) * 1000)
        )
      );
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Box className={classes.aboutsection}>
      <Container maxWidth="lg">
        <Box className={classes.textbox} align="center">
          <Typography variant="h1" className="wow bounceInUp">
            {" "}
            Public Mint Opening{" "}
          </Typography>
        </Box>
        {timeLeft && (
          <List className="wow bounceInUp">
            <ListItem>
              <span>DAY</span>
              <div> {timeLeft.days ? timeLeft.days && timeLeft.days : "0"}</div>
            </ListItem>
            <ListItem>
              <span>HOURS</span>
              <div>
                {" "}
                {timeLeft.hours ? timeLeft.hours && timeLeft.hours : "0"}
              </div>
            </ListItem>
            <ListItem>
              <span>MINUTES</span>
              <div>
                {timeLeft.minutes ? timeLeft.minutes && timeLeft.minutes : "0"}
              </div>
            </ListItem>
            <ListItem>
              <span>SECONDS</span>
              <div>
                {timeLeft.seconds ? timeLeft.seconds && timeLeft.seconds : "0"}
              </div>
            </ListItem>
          </List>
        )}
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
      </Container>
    </Box>
  );
}
