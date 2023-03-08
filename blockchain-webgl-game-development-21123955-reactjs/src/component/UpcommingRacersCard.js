import React from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const use = makeStyles((theme) => ({
  cardBox: {
    position: "relative",
    margin: "0px 10px",
    "& img": {
      width: "100%",
    },
  },
  cardContent: {
    position: "absolute",
    top: "0px",
    padding: "10px",
  },
  bottomContent: {
    position: "absolute",
    bottom: "0px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    "& h4": {
      color: "#fff",
      fontSize: "14px",
      letterSpacing: "1px",
      fontFamily: "'Roboto'",
      marginBottom: "8px",
      fontWeight: "600",
      marginBottom: "42px",
    },
  },
  btnJoin: {
    color: "white",
    padding: "8px 8px",
    border: "1px solid #FF0000",
    fontSize: "13px",
    background: "rgba(152, 0, 0, 0.33)",
    fontFamily: "Roboto",
    fontWeight: "500",
    marginRight: "16px",
    height: "40px",
  },

  btn: {
    color: "white",
    padding: "2px 6px 2px 6px",
    border: "1px solid #00FF29",
    fontSize: "12px",
    background: "rgba(0, 134, 54, 0.62)",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "500",
    marginRight: "6px",
    borderRadius: "5px",
  },
}));

export default function UpcommingRacersCard() {
  const classes = use();
  return (
    <Box className={classes.cardBox}>
      <img src="images/backUpcomming.png" alt="" />
      <Box className={classes.cardContent}>
        <Box className={classes.btnouter}>
          <Button className={classes.btn}>US</Button>
          <Button className={classes.btn}>CHARLOTTE</Button>
          <Button className={classes.btn}>CLASS IV</Button>
        </Box>
      </Box>
      <Box className={classes.bottomContent}>
        <Box>
          <Typography variant="h4">Racers Joined: 3/12 </Typography>
        </Box>
      </Box>

      <Box className={classes.bottomContent}>
        <Box>
          {/* <Typography variant="h4">Racers Joined: 3/12 </Typography> */}
          <Button className={classes.btn}>$5.00</Button>
        </Box>

        <Button className={classes.btnJoin}>JOIN RACE</Button>
      </Box>
    </Box>
  );
}
