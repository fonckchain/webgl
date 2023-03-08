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
import MenufactureCard from "src/component/MenufactureCard";
import Slider from "react-slick";
import axios from "axios";
import apiConfig from "../../../component/config/ApiConfig";
import { useWeb3React } from "@web3-react/core";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";
import {
  Link as ImLink,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
} from "@imtbl/imx-sdk";
import {
  REACT_APP_ROPSTEN_LINK_URL,
  REACT_APP_ROPSTEN_ENV_URL,
} from "src/constants";
import { UserContext } from "src/context/User";
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: "50px 0px",
    padding: "20px",
    // backgroundImage: "url(./images/redimg.png)",
    backgroundColor: "#1D0E33",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
    "& h3": {
      color: "#fff",
      fontSize: "48px",
      textAlign: "center",
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
    backgroundColor: "#0000",
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
  manCard: {
    backgroundColor: "#120720",
    padding: "0px 20px 10px 20px",
  },
  imgFig: {
    Height: "250px",
    width: "100%",
    cursor: "pointer",
    margin:"0",
    textAlign:"center",
   
  },
  manCardcolor: {
    backgroundColor: "#1d0e33",
    paddingTop:"2rem",
    paddingBottom:"2rem",
    "@media(max-width:767px)":{
        paddingBottom:"1.5rem",

    },
  },
}));
const allCollection = [
  {
    img: "images/car2.png",
    title: "Vehicle Body",
    img1:"images/gastoken.png",
    title1:"15000",
  },
  {
    img: "images/car2.png",
    title: "Racer",
    img1:"images/gastoken.png",
    title1:"15000",
  },
  {
    img: "images/car2.png",
    title: "Drive Train Part",
    img1:"images/gastoken.png",
    title1:"15000",
  },
  {
    img: "images/car2.png",
    title: "Handling Parts",
    img1:"images/gastoken.png",
    title1:"15000",
  },
  {
    img: "images/car2.png",
    title: "Engine Parts",
    img1:"images/gastoken.png",
    title1:"15000",
  },
  {
    img: "images/car2.png",
    title: "Cosmetic Parts",
    img1:"images/gastoken.png",
    title1:"15000",
  },
];
export default function () {
  const classes = useStyles();
  //   const [select, setSelect] = useState("");

  //   const handleChange = (event) => {
  //     const name = event.target.name;
  //     setState({
  //       ...state,
  //       [name]: event.target.value,
  //     });
  //   };
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

  //   const history = useHistory();
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [dealerDetails, setDealerDetails] = useState([]);
  //   const { chainId, account } = useWeb3React();
  // console.log("dealerDetails", dealerDetails);
  //   const user = useContext(UserContext);

  // *********************************blockchain *****************************************************************************?//
  //   const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);
  // console.log("link", link);
  //   const [marketplace, setMarketplace] = useState("");
  //   const [allCollection, setAllCollection] = useState([]);

  //   console.log("allCollection", allCollection);
  //   const nftCards = JSON.stringify(marketplace.result);
  //   console.log("marketplace.result", JSON.stringify(marketplace.result));
  //   const wallet = sessionStorage.getItem("wallet");
  //   const addNft = async () => {
  //     try {
  //       const response = await axios.post(apiConfig.addNft, {
  //         walletAddress: wallet,
  //         nfts: nftCards,
  //       });

  //       if (response.data.response_code !== 200) {
  //       } else {
  //         history.push("/dashboard");
  //       }
  //     } catch (err) {
  //       console.error(err.response);
  //     }
  //   };
  //   useEffect(() => {
  //     addNft();
  //   }, [nftCards]);

  //   const listCollection = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(apiConfig.nftCollectionList);

  //       if (response.data.statusCode !== 200) {
  //         setIsLoading(false);
  //         console.log("bbb");
  //       } else {
  //         setAllCollection(response.data.result);
  //       }
  //       console.error("meesse");
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.error(err.response);
  //       setIsLoading(false);
  //     }
  //   };
  //   useEffect(() => {
  //     listCollection();
  //   }, []);
  //   useEffect(() => {
  //     load();
  //   }, []);

  //   const load = async () => {
  //     setMarketplace(
  //       await user?.client.getOrders({
  //         status: ImmutableOrderStatus.active,
  //         user: "0xA93647C91133454fB265821334083375b12F06e5",
  //       })
  //     );
  //   };

  return (
    <Box className={classes.aboutsection}>
      <Container maxWidth="lg">
        <Box className={classes.leftSection} pt={5} pb={5}>
          <Typography variant="h3" title="Bolt Dealership">
            Bolt Dealership
          </Typography>
        </Box>
      </Container>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        {/* <ButtonCircularProgress /> */}
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {allCollection.map((data, i) => {
            return (
              <Grid item xs={12} md={4} sm={6} lg={4} key={i} className="gridview">
                <Box>
                  <Box className={classes.manCard}>
                    <Box display="flex" justifyContent="center" pt={1} pb={0}>
                      <Typography
                        style={{
                          marginTop: "10px",
                          color: "white",
                        }}
                      >
                        {data.title}
                      </Typography>
                      {/* <img src={data.img} alt="" style={{ width: "50%" }} /> */}
                    </Box>
                    <Box pt={0} pb={1}></Box>
                    <Box className={classes.manCardcolor}>
                    <figure className={classes.imgFig}>
                          <img
                            style={{

                              width: "auto",
                              maxWidth:"100%",
                            
                            }}
                            src={data.img}
                            alt=""
                            width="100%"
                          />
                        </figure>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" pt={2} pb={1}>
                    <img src={data.img1} alt=""  width="32px"/>&nbsp;&nbsp;
                      <Typography
                        style={{
                          
                          color: "white",
                        }}
                      >
                        {data.title1}
                      </Typography>
                     
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Box align="center" mt={5}>
          {/* <Button
            variant="contained"
            color="primary"
            className={classes.buttonright}
          >
            View all
          </Button> */}
        </Box>
      </Container>
    </Box>
  );
}
