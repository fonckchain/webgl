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
import NoDataFound from "../NoDataFound";

const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: "50px 0px",
    padding: "20px",
    // backgroundImage: "url(./images/redimg.png)",
    backgroundColor: "#1D0E33",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "450px",
    // minHeight: "calc(100%-100px)",
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
    paddingTop: "30px",
    "& h3": {
      color: "#fff",
      // fontSize: "48px",
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
}));
const TeamMap = [
  {
    img: "images/bolt1.png",
  },
  {
    img: "images/bolt1.png",
  },
  {
    img: "images/bolt1.png",
  },
  {
    img: "images/bolt1.png",
  },
  {
    img: "images/bolt1.png",
  },
  {
    img: "images/bolt1.png",
  },
  {
    img: "images/bolt1.png",
  },
  {
    img: "images/bolt1.png",
  },
  {
    img: "images/bolt1.png",
  },
];
export default function () {
  const classes = useStyles();
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

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [dealerDetails, setDealerDetails] = useState([]);
  const { chainId, account } = useWeb3React();
  // console.log("dealerDetails", dealerDetails);
  const user = useContext(UserContext);

  // *********************************blockchain *****************************************************************************?//
  const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);
  // console.log("link", link);
  const [marketplace, setMarketplace] = useState("");
  const [allCollection, setAllCollection] = useState([]);

  console.log("allCollection", allCollection);
  const nftCards = JSON.stringify(marketplace.result);
  console.log("marketplace.result", JSON.stringify(marketplace.result));
  const wallet = sessionStorage.getItem("wallet");
  const addNft = async () => {
    try {
      const response = await axios.post(apiConfig.addNft, {
        walletAddress: wallet,
        nfts: nftCards,
      });

      if (response.data.response_code !== 200) {
      } else {
        history.push("/dashboard");
      }
    } catch (err) {
      console.error(err.response);
    }
  };
  useEffect(() => {
    if (nftCards) {
      addNft();
    }
  }, [nftCards]);

  const listCollection = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(apiConfig.nftCollectionList);

      if (response.data.statusCode !== 200) {
        setIsLoading(false);
        console.log("bbb");
      } else {
        setAllCollection(response.data.result);
      }
      console.error("meesse");
      setIsLoading(false);
    } catch (err) {
      setAllCollection();
      console.error(err.response);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    listCollection();
  }, []);
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setMarketplace(
      await user?.client.getOrders({
        status: ImmutableOrderStatus.active,
        user: "0xA93647C91133454fB265821334083375b12F06e5",
      })
    );
  };

  return (
    <Box className={classes.aboutsection}>
      <Container maxWidth="lg">
        <Box className={`${classes.leftSection} subtext`}>
          <Typography
            variant="h3"
            title="UPCOMING RACES"
            style={{ marginBottom: "40px" }}
          >
            {" "}
            Dealership
          </Typography>
        </Box>
      </Container>
      {isLoading ? (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <ButtonCircularProgress />
        </Box>
      ) : (
        <Container maxWidth="lg">
          {allCollection && allCollection?.length > 0 ? (
            <Grid container spacing={4}>
              {allCollection &&
                allCollection.map((data, i) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                      key={i}
                      className="gridview"
                    >
                      <MenufactureCard
                        data={data}
                        index={i}
                        isUpcomming={true}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            <NoDataFound />
          )}
        </Container>
      )}
    </Box>
  );
}
