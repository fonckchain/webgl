// import React, {useContext, } from "react";
import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import TeamCard from "src/component/TeamCard";
import Slider from "react-slick";
import { UserContext } from "src/context/User";
import axios from "axios";
import apiConfig from "../../../component/config/ApiConfig";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: "70px 0px 40px",
    // backgroundImage: "url(./images/redimg.png)",
    backgroundColor: "#1D0E33",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px",
    },
  },
  textbox: {
    "& h1": {
      fontSize: "50px",
      fontWeight: "400",
      color: "#fff",
      [theme.breakpoints.down("md")]: {
        fontSize: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontSize: "16px",
      marginTop: "20px",
      color: "#fff",
    },
  },
  cotext: {
    textAlign: "center",
    "& h6": {
      color: "#ffffff",
      fontSize: "120px",
      fontWeight: "700",
      transform: "matrix(0.94, 0, -0.27, 1, 0, 0)",
      lineHeight: "120px",
      display: "inline-block",
      [theme.breakpoints.down("md")]: {
        fontSize: "80px",
      },
    },
    "& h2": {
      fontSize: "60px",
      fontWeight: "700",
      color: "#ffffff",
      lineHeight: "60px",
      marginTop: "20px",
    },
  },
  logobox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-170px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px",
    },
    "& img": {
      width: "100%",
      maxWidth: "50%",
      [theme.breakpoints.down("md")]: {
        maxWidth: "80%",
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
    },
  },
  buttonright: {
    transform: "skew(  -20deg)",
    textTransform: "capitalize",
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
    paddingBottom: "50px",
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
  buttonright: {
    borderRadius: "5px",
    backgroundColor: "#EA1546",
    padding: "12px 35px",
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
const TeamMap = [
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
];
export default function () {
  const classes = useStyles();
  const [select, setSelect] = useState("");
  const [loader1, setloader1] = React.useState(false);
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });
  const history = useHistory();

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  // const auth = useContext(UserContext);
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
    pauseOnHover: true,
    arrows: false,
    // infinite: auth.upcommingPoolList.length > 3,
    speed: 7000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
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
  const [allCollection, setAllCollection] = useState([]);

  console.log("allCollection", allCollection);

  const listBlackMarket = async () => {
    try {
      setloader1(true);
      const response = await axios.get(apiConfig.listBlackMarket);

      if (response.data.statusCode !== 200) {
        console.log("bbb");
        setloader1(false);
      } else {
        setAllCollection(response.data.result.docs);
        setloader1(false);
      }
      console.error("meesse");
    } catch (err) {
      setloader1(false);
      console.error(err.response);
    }
  };
  useEffect(() => {
    listBlackMarket();
  }, []);
  return (
    <Box className={classes.aboutsection} pb={3}>
      <Container maxWidth="lg">
        <Box className={classes.leftSection}>
          <img src="./images/gr1.png" alt="" style={{ width: "35px" }} />
          <Typography variant="h3" title="UPCOMING RACES">
            {" "}
            RECENT LISTING
          </Typography>
        </Box>
      </Container>

      <Slider
        {...settings}
        className="width100"
        style={{ width: "100%", position: "relative" }}
      >
        {/* {TeamMap.map((data, i) => {
          return (
            <Grid container spacing={4}>
              <Grid item xs={12} md={12} lg={12} key={i} className="gridview">
                <TeamCard data={data} index={i} isUpcomming={true} />
              </Grid>
            </Grid>
          );
        })} */}
        {allCollection &&
          allCollection?.map((data, i) => {
            console.log("data", data);
            return (
              <Grid container spacing={4}>
                <Grid item xs={12} md={12} lg={12} key={i} className="gridview">
                  <TeamCard data={data} index={i} isUpcomming={true} />
                </Grid>
              </Grid>
            );
          })}
        {/* {TeamMap.map((data, i) => {
            return (
              <Grid item xs={12} sm={12} md={12} key={i}>
                <TeamCard data={data} index={i} />
              </Grid>
            );
          })} */}
      </Slider>

      {/* <Grid container spacing={3}>
          {TeamMap.map((data, i) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <TeamCard data={data} index={i} />
              </Grid>
            );
          })}
        </Grid> */}
      <Box align="center" mt={5}>
        <Button
          onClick={() => history.push("/dealership-new")}
          variant="contained"
          color="primary"
          className={classes.buttonright}
        >
          View all
        </Button>
      </Box>
    </Box>
  );
}
