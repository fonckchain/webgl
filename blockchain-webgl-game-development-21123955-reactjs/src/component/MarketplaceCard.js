import React from "react";
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";
import Tilt from "react-parallax-tilt";
import StarsIcon from "@material-ui/icons/Stars";
import { Link, useHistory } from "react-router-dom";
import { ethers } from "ethers";

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
    },
    "& p": {
      display: "flex",
      fontWeight: "500",
      color: "#ffffff",
      fontSize: "13px",
    },
  },
  carbox: {
    position: "relative",
    padding: "20px",
    background: "#1b0c2d",
    border: "1px solid #ea154699",
    transition: "0.3s",
    "&:hover": {
      borderColor: "#ea154699",
      filter: "drop-shadow(0px -1px 5px #ea154699)",
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
  imgFig: {
    height: "181px",
    width: "100%",
    marginLeft: "-1px",
    margin: "0",
    "@media(max-width:768px)": {
      height: "auto",
    },
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
  //price: {
  //  fontSize: '18px',
  //  fontWeight: '300',
  //  color: '#ffffff',
  //  paddingTop: '30px',
  //  paddingBottom: '10px',
  //},
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
    marginTop: "30px",

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
  console.log("data=====>,,", data);
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box>
      <Box
        className={classes.carbox}
        onClick={() => {
          history.push({
            pathname: "/dealers-details",
            search: data?.data._id,
            data: data?.data._id,
          });
        }}
      >
        <Box className={classes.cardcolor}>
          <Typography style={{ color: "#fff" }}>{data?.text1}</Typography>
          <Box className={classes.bannerImg}>
            <figure className={classes.imgFig}>
              <img
                style={{
                  maxHeight: "100%",
                  minHeight: "100%",
                  width: "100%",
                  borderRadius: "0px",
                }}
                src={
                  data?.data?.sell?.data?.properties?.image_url
                    ? data?.data?.sell?.data?.properties?.image_url
                    : "https://gateway.pinata.cloud/ipfs/QmS1hWKuKTHwYJHoGnJUkzSumAnxLaWjMdfmEeyNDdkyfn"
                }
                alt=""
                width="100%"
              />
            </figure>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "12px" }}
        >
          <Box
            style={{ marginLeft: "-8px" }}
            display="flex"
            justifyContent="start"
            alignItems="center"
          >
            <Box>
              <img src="images/eth.png" alt="" style={{ width: "100%" }} />
            </Box>
            <Box>
              <Typography style={{ color: "#fff" }}>
                {Number(
                  ethers.utils.formatEther(data?.data?.buy?.data?.quantity)
                )}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography style={{ color: "#FFFFFF" }} variant="body1">
              {" "}
              {data?.data?.sell?.data?.properties?.name
                ? data?.data?.sell?.data?.properties?.name
                : "Dummy"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
