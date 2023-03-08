import React, { useState } from "react";
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
import UpcommingRacersCard from "src/component/UpcommingRacersCard";
import Slider from "react-slick";
const cardData = [
  {
    index: "1",
  },
  {
    index: "2",
  },
  {
    index: "3",
  },
  {
    index: "4",
  },
  {
    index: "5",
  },
  {
    index: "6",
  },
  // {
  //   index: "7",
  // },
  // {
  //   index: "8",
  // },
];
const Upcoming = () => {
  const use = makeStyles((theme) => ({
    root: {
      height: "auto",
      padding: "70px 0px 60px",
      position: "relative",
      zIndex: "999",
      [theme.breakpoints.down("sm")]: {
        padding: "50px 0px",
      },
    },
    frame: {
      position: "relative",
      transition: "0.3s",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
    bgframe: {
      top: "48%",
      left: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      "@media (max-width:1024px)": {
        width: "85%",
      },
    },
    btnouter: {
      // display: "flex",
      display: "flex",
      alignItems: "center",
    },
    btnbottom: {
      position: "absolute",
      top: "225px",
      left: "60px",
      padding: "0 20px 20px 20px",
      maxWidth: "100%",
    },
    box: {
      color: "white",
      // transform: "skew(-20deg)",
      background: "#F83838",
      border: "0.5px solid #1E8F63",
      padding: 0,
      borderRadius: 0,
      fontFamily: "Roboto",
      // position: "absolute",
      // bottom: "55px",
      // left: " 60px",
      "&:hover": {
        background: "#F83838",
      },
      // "@media (max-width:1024px)": {
      //   bottom: "65px",
      //   left: " 70px",
      // },
      // "@media (max-width:991px)": {
      //   bottom: "50px",
      //   left: " 50px",
      // },
    },
    enter: {
      right: 60,
      bottom: "50px",
      color: "white",
      fontSize: "12px",
      background: "#F83838",
      borderRadius: 0,
      fontFamily: "Roboto",
      position: "absolute",
      opacity: 0,
      transition: "0.3s",
      "&:hover": {
        background: "#F83838",
      },
      "@media (max-width:1024px)": {
        right: "65px",
        bottom: "60px",
      },
      "@media (max-width:991px)": {
        right: "50px",
        bottom: "50px",
      },
    },
    btn: {
      color: "white",
      width: "50px",
      fontSize: "12px",
      // transform: "skew(-20deg)",
      marginRight: "6px",
      padding: 0,
      background: "rgba(0, 134, 54, 0.62)",
      border: "2px solid #00FF29",
      fontFamily: "Roboto",
      borderRadius: "5px",
    },
    lineborder: {
      width: "100%",
      maxWidth: "400px",
      margin: "0 auto",
    },
    carimg: {
      width: "180px",
      position: "absolute",
      right: "80px",
      top: "90px",
    },
    carframe: {
      width: "100%",
    },
    buttonright: {
      borderRadius: "5px",
      backgroundColor: "#EA1546",
      padding: "12px 35px",
    },
    registerdtext: {
      position: "absolute",
      top: "80px",
      left: "50px",
      fontSize: "14px",
      color: "#fff",
      fontWeight: 400,
    },
    leftSection: {
      color: "#D3D3D3",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "40px",
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
    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    selectMenu: {
      border: "1px solid #ccc",
      minWidth: "200px",
      color: "#fff",
    },
    cardBox: {
      position: "relative",
      width: "fit-content",
      // "& img": {
      //   position: "absolute",
      // },
    },
    formcontrol: {
      height: "40px",
      fontSize: "14px",
      padding: "0 6px",
      backgroundColor: "#1d0e33",
      color: "#fff",
      // borderColor: "#ccc",
      width: "100%",
      borderRadius: "5px",
      // border: "1px solid #3d3d3d",
      // background:
      //   "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      "&:focus-visible": {
        outline: "none",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "0px",
      },
    },
  }));
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
    pauseOnHover: true,
    arrows: false,

    speed: 7000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
          autoplay: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
          autoplay: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
          autoplay: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerPadding: "50px",
          autoplay: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
          autoplay: true,
        },
      },
    ],
  };
  const classes = use();
  const [select, setSelect] = useState("");
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box className={classes.leftSection}>
          <img src="./images/flagnew.png" alt="" style={{ width: "38px" }} />
          <Typography variant="h3" title="UPCOMING RACES">
            {" "}
            UPCOMING RACES
          </Typography>
        </Box>
      </Container>

      {/* <Container maxWidth="lg"> */}
      <Box className={classes.framebox} mt={10}>
        <Grid container spacing={2}>
          <Slider
            {...settings}
            className="width100"
            style={{ width: "100%", position: "relative" }}
          >
            {cardData.map((data, i) => {
              return (
                <Grid xs={12} md={12} lg={12} key={i} className="gridview">
                  <UpcommingRacersCard data={data} index={i} />
                </Grid>
              );
            })}
          </Slider>
        </Grid>
        <Box align="center" mt={5}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonright}
          >
            View all
          </Button>
        </Box>
      </Box>
      {/* </Container> */}
    </Box>
  );
};

export default Upcoming;
