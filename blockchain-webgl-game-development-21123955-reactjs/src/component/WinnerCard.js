import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  Button,
  Container,
  Grid,
} from "@material-ui/core";
import Tilt from "react-parallax-tilt";
import StarsIcon from "@material-ui/icons/Stars";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  bannerImg: {
    position: "relative",

    //background:
    //  'linear-gradient(39deg, rgb(63 17 120 / 28%) 21%, rgb(139 70 191 / 32%) 70%, rgba(255,0,204,1) 100%)',
    //padding: '15px',
    //borderRadius: '10px',
    //boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    cursor: "pointer",
    "& img": {
      width: "100%",
      borderRadius: "10px",
    },
    "& h6": {
      fontSize: "18px",
      color: "#fff",
      fontWeight: 800,
      marginTop: "10px",
    },
    "& h2": {
      fontSize: "25px",
      color: "#fff",
      marginTop: "20px",
      fontWeight: 500,
      textAlign: "left",
    },
  },
  carbox: {
    background: "#190A2C",
    border: "1px solid #fff",
    padding: "20px",
    borderRadius: "5px",
  },
  dummybox: {
    paddingTop: "00px",

    //background: '#120720',
  },
  box: {
    backgroundColor: "#241B30",
    padding: "20px",
  },
  headtext: {
    "& h2": {
      fontSize: "25px",
      fontWeight: "500",
      color: "#ffffff",
    },
    "& p": {
      fontSize: "16px",
      fontWeight: "400",
      color: "#ffffff",
      paddingTop: "10px",
      "@media(max-width:768px)": {
        fontSize: "20px",
      },
    },
  },
  price: {
    fontSize: "18px",
    fontWeight: "300",
    color: "#ffffff",
    paddingTop: "30px",
    paddingBottom: "10px",
  },
  btnbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    fontSize: "20px",
    backgroundColor: "#2D2D4A",
    paddingTop: "4px",
    paddingBottom: "4px",
    borderRadius: "21px",
  },
  price: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& h4": {
      fontSize: "14px",
      fontWeight: "400",
      color: "#fff",
    },
  },
  icons: {
    backgroundColor: "#FA1C5F",
    color: "#3D122F",
    borderRadius: "50px",
    fontSize: "36px",
  },
  imgbox: {
    padding: "25px",
  },
  boxcolor: {
    borderRadius: "4px",
    paddingTop: "5px",
    paddingBottom: "5px",
    transform: "matrix(0.94, 0, -0.37, 1, 0, 0)",
    backgroundColor: "rgb(215, 162, 28)",
  },
  boxcolors: {
    borderRadius: "4px",
    paddingTop: "5px",
    paddingBottom: "5px",
    transform: "matrix(0.94, 0, -0.37, 1, 0, 0)",

    backgroundColor: "rgb(192, 122, 71)",
  },
}));

export default function WinnerCard(props) {
  const classes = useStyles();
  const { data, index } = props;
  return (
    <Box className={classes.gallryBox}>
      <Box className={classes.bannerImg}>
          <Box className={classes.carbox}>
            <Grid
              container
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item lg={4} sm={4} xs={12}>
                <Typography variant="h2">{data.text1}</Typography>
              </Grid>

              <Grid item lg={4} sm={4} xs={12}>
                <Box mt={2} className={classes.boxcolor}>
                  <Typography variant="body2">{data.text2}</Typography>
                </Box>
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <Box mt={2} className={classes.boxcolors}>
                  <Typography variant="body2">{data.text3}</Typography>
                </Box>{" "}
              </Grid>
            </Grid>
            <Box className={classes.imgbox}>
              <Tilt>
                <img src={data.image1} alt="" width="100%" />
              </Tilt>
            
            </Box>
            <Box className={classes.dummybox}>
                <Box className={classes.price}>
                  <Box>
                    <Typography
                      style={{
                        color: "#fff",
                        fontSize: "17px",
                        letterSpacing: "1px",
                      }}
                      variant="h4"
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontSize: "40px",
                          letterSpacing: "1px",
                        }}
                      >
                        {index + 1}
                      </span>{" "}
                      {data.text4}
                    </Typography>
                    <Typography variant="h4"></Typography>
                  </Box>
                  <Typography variant="h4">{data.text5}</Typography>
                </Box>
              </Box>
          </Box>
      </Box>
    </Box>
  );
}
