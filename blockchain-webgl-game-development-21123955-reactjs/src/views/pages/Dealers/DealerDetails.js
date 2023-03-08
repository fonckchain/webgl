import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import MaketplaceCard from "src/component/MarketplaceCard";
// import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import { useHistory, useLocation } from "react-router-dom";

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
import axios from "axios";
import apiConfig from "../../../component/config/ApiConfig";
import PageLoading from "src/component/PageLoading";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  imageBox: {
    background: "#170132",
    padding: "15px",

    "& img": {
      width: "100%",
      display: "block",
    },
  },
  imgFig: {
    height: "316px",
    margin: "0",
    overflow: "hidden",
    position: "relative",
    background: "rgba(0,0,0,0.7)",
    borderRadius: "5px",
    backgroundSize: "100% !important",
    backgroundRepeat: "no-repeat !important",
    backgroundPosition: "center !important",
  },
  imageBox2: {
    background: "#170132",
    padding: "15px",
    minHeight: "311px",
    [theme.breakpoints.down("md")]: {
      minHeight: "200px",
    },
    "& iframe": {
      width: "100%",
      height: "310px ",
      display: "block",
      [theme.breakpoints.down("md")]: {
        minHeight: "200px ",
      },
    },
  },
  accordion: { background: "transparent", position: "relative" },
  aboutsection: { marginBottom: "50px" },
  darkcar: {
    // backgroundImage: 'url(./images/dealer/dealerBg.jpg)',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    paddingTop: "50px",
    // paddingBottom: "50px",
    position: "relative",
    "& h2": {
      fontSize: "50px",
      fontWeight: "400",
      color: "#ffffff",
      paddingTop: "30px",
      paddingBottom: "30px",
      "@media(max-width:768px)": {
        fontSize: "30px",
      },
    },
    "& p": {
      fontWeight: "400",
      fontSize: "16px",
      color: "#ffffff",
      lineHeight: "24px",
      marginBottom: "30px",
      "@media(max-width:768px)": {
        fontSize: "20px",
      },
    },
  },
}));
const TeamMap = [
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
];
export default function (props) {
  const [idd, setIdd] = useState();

  // idd
  const user = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);
  const data = props?.location?.data;
  console.log("linkprops", location);
  const [marketplace, setMarketplace] = useState([]);
  // console.log("marketplace", JSON.stringify(marketplace?.result));
  const nftCards = marketplace?.result;
  console.log("nftCardspage", nftCards);
  const [buyOrderId, setBuyOrderId] = useState("");

  useEffect(() => {
    load();
  }, [idd]);

  const load = async () => {
    setMarketplace(
      await user?.client.getOrders({
        status: ImmutableOrderStatus.active,
        user: "0xA93647C91133454fB265821334083375b12F06e5",
      })
    );
  };
  const [dashboardData, setDashboardData] = useState();
  console.log("dashboardData", dashboardData);
  const [isLoading, setIsLoading] = useState(true);

  const allCollectionNft = async () => {
    try {
      const res = await axios.post(apiConfig.collectionNftSearch, {
        search: [idd],
      });
      console.log("res", res);
      if (res.data.statusCode === 200) {
        setDashboardData(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (idd) {
  //     allCollectionNft();
  //   } else {
  //     setDashboardData([]);
  //   }
  // }, [idd]);

  // const nftDetail = nftCards?.filter((nftPage)=>{
  //   if ( nftPage.sell.data.properties.collection.name === props.location.search) {
  //     return nftPage;
  //   }
  // })

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
    if (idd) {
      allCollectionNft();
    } else {
      setDashboardData([]);
    }
  }, [location.search, idd]);
  return (
    <Box className={classes.aboutsection}>
      <Box className={classes.darkcar} align="center">
        <Box className="subtext" textAlign="center">
          <Typography variant="h3" style={{ marginBottom: "43px" }}>
            {" "}
            {props?.location?.data} NFT'S
          </Typography>
        </Box>
        {/* <Typography variant="h2">MEET THE HEIRLOOM DEALERSHIP</Typography> */}
        {/* <Box align="center">
          <Button
          component={Link}
           to="/marketplace"
            variant="contained"
            color="primary"
          >
           View More
          </Button>
          </Box> */}
      </Box>
      <Box mb={5}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6}>
              <Box className={classes.imageBox}>
                <figure className={classes.imgFig}>
                  <img
                    style={{
                      maxHeight: "100%",
                      minHeight: "100%",
                      width: "100%",
                    }}
                    src={
                      props?.location?.img
                        ? props?.location?.img
                        : "https://gateway.pinata.cloud/ipfs/QmS1hWKuKTHwYJHoGnJUkzSumAnxLaWjMdfmEeyNDdkyfn"
                    }
                    alt=""
                    width="100%"
                  />
                </figure>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className={classes.imageBox2}>
                <iframe
                  frameborder="0"
                  allowfullscreen="1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="YouTube video player"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/cfZOy8eRLL0?autoplay=0&amp;mute=0&amp;controls=0&amp;origin=https%3A%2F%2Fforeignfuels.io&amp;playsinline=1&amp;showinfo=false&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;disablekb=1&amp;enablejsapi=1&amp;widgetid=5"
                  id="widget6"
                  data-gtm-yt-inspected-1_19="true"
                ></iframe>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg" className="wow bounceInUp">
        {/* <Button
          variant="text"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={() => history.goBack()}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button> */}
        {dashboardData ? (
          <Grid container spacing={3}>
            {dashboardData &&
              dashboardData.map((data, i) => {
                console.log("data", data);
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <MaketplaceCard data={data} index={i} />
                  </Grid>
                );
              })}
          </Grid>
        ) : (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <ButtonCircularProgress />
          </Box>
        )}
      </Container>
    </Box>
  );
}
