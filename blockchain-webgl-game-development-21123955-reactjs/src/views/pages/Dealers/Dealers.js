import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiConfig from "../../../component/config/ApiConfig";
import { useWeb3React } from "@web3-react/core";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
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

// import MarketPlaceData from './MarketPlaceData.json';

const useStyles = makeStyles((theme) => ({
  imageBox: {
    background: "#170132",
    border: "10px solid #170132",
    padding: "15px",

    "& img": {
      width: "100%",
      display: "block",
    },
    "&:hover": {
      background: "#120720",
    },
  },
  formControl: {
    height: "45px",
    backgroundColor: "#120720",
    color: "#fff",
    border: "1px solid #ccc6",
    width: "100%",
    padding: "0 10px",
    borderRadius: 0,
    "&:focus-visible": {
      outline: "none",
    },
  },
  accordion: { background: "transparent", position: "relative" },
  aboutsection: {
    // marginTop: "50px",
    // background: " #1D0E33",
    minHeight: "500px",
  },
  darkcar: {
    backgroundImage: "url(./images/dealer/dealerBg.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    paddingTop: "50px",
    paddingBottom: "50px",
    marginBottom: "50px",
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

export default function () {
  const classes = useStyles();
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
    addNft();
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
      <Container maxWidth="lg" className="wow bounceInUp">
        <Box>{/* <Typography variant="h5">Marketplace</Typography> */}</Box>
        {/* <Grid item lg={3} md={4} sm={6} xs={12}>
          <select className={classes.formControl}>
            <option>-- Sort by --</option>
            <option>Class</option>
            <option>Entry Fee</option>
            <option>Start Time</option>
            <option>Registered</option>
            <option>Distance</option>
          </select>
        </Grid> */}
        {isLoading ? (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <ButtonCircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} style={{ paddingTop: "40px" }}>
            {allCollection &&
              allCollection.map((data, i) => {
                // console.log("MarketPlaceData", data);
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <Box className={classes.imageBox}>
                      <Grid
                        onClick={() => {
                          history.push({
                            pathname: "/dealer-details",
                            search: data?.collection?.name,
                            data: data?.collection?.name,
                            img: data?.collection.icon_url,
                          });
                        }}
                      >
                        <img
                          style={{ cursor: "pointer", maxHeight: "245px" }}
                          src={
                            data?.collection?.icon_url
                              ? data?.collection?.icon_url
                              : "https://gateway.pinata.cloud/ipfs/QmS1hWKuKTHwYJHoGnJUkzSumAnxLaWjMdfmEeyNDdkyfn"
                          }
                          alt=""
                        />
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "10px",
                            color: "white",
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{
                              marginTop: "10px",
                              color: "white",
                            }}
                          >
                            {data?.collection?.name}
                          </Typography>
                          <Typography
                            variant="h6"
                            style={{
                              marginTop: "10px",
                              color: "white",
                            }}
                          >
                            {data?.numberOfData}
                          </Typography>
                        </Box>
                      </Grid>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
