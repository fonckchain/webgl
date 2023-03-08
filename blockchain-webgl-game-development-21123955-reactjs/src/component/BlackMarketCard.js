import React from "react";
import { ethers } from "ethers";

import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
} from "@material-ui/core";
import Tilt from "react-parallax-tilt";
import StarsIcon from "@material-ui/icons/Stars";
import { Link, useHistory } from "react-router-dom";
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
      paddingTop: "25px",
    },

    "& p": {
      display: "flex",
      fontWeight: "500",
      color: "#ffffff",
      fontSize: "13px",
      "& span": {
        color: "#28e7f0",
      },
    },
  },
  carbox: {
    position: "relative",
    padding: "35px 26px 25px 24px",
    background: "#190A2C",
    border: "1px solid #3b3b3b",
    background: "#1b0c2d",
    transition: "0.3s",
    "&:hover": {
      borderColor: "#6c0863",
      filter: "drop-shadow(0px -1px 5px #6c0863)",
      transform: "translateY(-10px)",
    },
  },
  dummybox: {
    background: "#07030d91",
    "& h5": {
      display: "flex",
      fontWeight: "500",
      color: "#ffffff",
    },
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
    backgroundColor: "#231437 ",
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
    marginTop: "11px",
    // backgroundColor: "#231437 ",
    "& h4": {
      fontSize: "16px",
      fontWeight: "500",
      color: "#fff",

      letterSpacing: "1px",
    },
  },
  icons: {
    backgroundColor: "#FA1C5F",
    color: "#3D122F",
    borderRadius: "50px",
    fontSize: "36px",
  },

  pricesection: {
    marginTop: "10px",
    "& h6": {
      fontSize: "16px",
      fontWeight: "500",
      color: "#28e7f0",
      letterSpacing: "1px",
    },
    "& p": {
      fontSize: "13px",
      fontWeight: "300",
      display: "block",
    },
  },
}));

export default function UsersCard(data) {
  console.log("data", data);
  const classes = useStyles();
  const history = useHistory();
  // const { data, blackMarket } = props
  return (
    <Box
      onClick={() => {
        history.push({
          pathname: "/dealers-details",
          search: data?.data._id,
          data: data?.data._id,
        });
      }}
      className={classes.gallryBox}
    >
      <Box className={classes.bannerImg}>
        {/*<Tilt>
          <img src={data.image} alt=""/>
        </Tilt>*/}
        {/*<Box>
          <Typography variant="h6">{data.name}</Typography>
        </Box>*/}
        <Box className={classes.carbox}>
          <Tilt>
            <img
              style={{ maxHeight: "243px", minHeight: "243px" }}
              src={
                data?.data?.sell?.data?.properties?.image_url
                  ? data?.data?.sell?.data?.properties?.image_url
                  : "https://gateway.pinata.cloud/ipfs/QmS1hWKuKTHwYJHoGnJUkzSumAnxLaWjMdfmEeyNDdkyfn"
              }
              alt=""
              width="100%"
            />
          </Tilt>
          <Box className="absolute" mt={2}>
            {/* {blackMarket && ( */}
            <Typography
              // disableds
              variant="body1"
              // variant="contained"
              size="large"
              color="primary"
              className="blackPrice"
            >
              Black Price : &nbsp;{" "}
              {/* <span>
                {ethers.utils.formatEther(
                  data?.data?.orders?.sell_orders[0]?.buy_quantity
                )}{" "}
                ETH
              </span> */}
            </Typography>
            {/* )} */}
          </Box>
          <Box classname={classes.dummybox}>
            <Box mt={2}>
              <Typography variant="h4" style={{ color: "#F83838" }}>
                {data.text1}
              </Typography>
            </Box>
            <Box className={classes.price}>
              <Typography variant="body1">
                {" "}
                {data?.data?.sell?.data?.properties?.name
                  ? data?.data?.sell?.data?.properties?.name
                  : "Dummy"}
              </Typography>
              <Typography variant="body1">{data.data?.order_id}</Typography>
            </Box>

            {/* <Box mt={2}>
              <Divider style={{ border: '1px solid #6C0863' }} />
            </Box> */}

            <Grid container spacing={1} className={classes.pricesection}>
              {/* <Grid item xs={6}>
              <Typography variant="body2">{data.text4}</Typography>
              </Grid> */}
              {/* <Grid item xs={6} align="right">
              <Typography variant="body2">{data.text5}</Typography>
              </Grid> */}
              {/* <Grid item xs={6} >
              <Typography variant="h6" >
                  {data.text6}
                </Typography>
              </Grid> */}
              {/* <Grid item xs={6} align="right">
              <Typography variant="h6">
                 $ {data.text7}
                </Typography>
              </Grid> */}
            </Grid>
            {/* <Box className={classes.pricesection}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body2">{data.text4}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">{data.text5}</Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" >
                  {data.text6}
                </Typography>
                <Typography variant="h6">
                  {data.text7}
                </Typography>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
