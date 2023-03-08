import React from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  mainbox: {
    backgroundColor: "#120720",

    paddingTop: "100px",
    paddingBottom: "100px",
  },
  boxbg: {
    backgroundColor: "#190A2C",
    //backgroundImage: 'url(/image/backgroundblack.png)',

    paddingTop: "50px",
    paddingBottom: "50px",
    maxWidth: "100%",
    width: "100%",
  },
  visontitle: {
    fontSize: "48px",
    fontWeight: "600",
    color: "#F8BB07",
  },
  visonsubtext: {
    fontSize: "18px",
    fontWeight: "300",
    color: "#ffffff",
    paddingTop: "20px",
  },
  cardBox: {
    border: "1px solid transparent",
    height: "auto",

    overflow: "hidden",
    position: "relative",
    maxWidth: "100%",
    background: "#120720",
    borderRadius: "5px",

    border: "0.5px solid #a901354d",
    "&:hover": {
      width: "100%",
      border: "0.5px solid transparent",
      overflow: "hidden",
      boxSizing: "border-box",
      textAlign: "center",
      borderImage: "linear-gradient(to right,#04D9B2,#0354AA,#F20544)",
      backgroundColor: "#08111B",
      borderImageSlice: "1",
      borderRadius: "5px",
    },
    "& figure": {
      height: "77px",
      display: "flex",
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
  },
});
function Backers(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <Box>
      <Box textAlign="center" className={classes.cardBox}>
        <figure>
          <img
            src={data.img1}
            alt=""
            width="100%"
            style={{
              margin: "0px auto",
              maxHeight: "97px",
              width: "auto",
              maxWidth: "100%",
            }}
          />
        </figure>
      </Box>
      {/* <Box textAlign="center" className={classes.cardBox}>
        <figure>
          <img
            src={data.img2}
            alt=""
            width="100%"
            style={{
              margin: "0px auto",
              maxHeight: "97px",
              width: "auto",
              maxWidth: "100%",
            }}
          />
        </figure>
      </Box>
      <Box textAlign="center" className={classes.cardBox}>
        <figure>
          <img
            src={data.img3}
            alt=""
            width="100%"
            style={{
              margin: "0px auto",
              maxHeight: "97px",
              width: "auto",
              maxWidth: "100%",
            }}
          />
        </figure>
      </Box>
      <Box textAlign="center">
        <figure>
          <img
            src={data.img4}
            alt=""
            width="100%"
            style={{
              margin: "0px auto",
              maxHeight: "97px",
              width: "auto",
              maxWidth: "100%",
            }}
          />
        </figure>
      </Box>
      <Box textAlign="center">
        <figure>
          <img
            src={data.img5}
            alt=""
            width="100%"
            style={{
              margin: "0px auto",
              maxHeight: "97px",
              width: "auto",
              maxWidth: "100%",
            }}
          />
        </figure>
      </Box>
      <Box textAlign="center">
        <figure>
          <img
            src={data.img6}
            alt=""
            width="100%"
            style={{
              margin: "0px auto",
              maxHeight: "97px",
              width: "auto",
              maxWidth: "100%",
            }}
          />
        </figure>
      </Box> */}
    </Box>
  );
}

export default Backers;
