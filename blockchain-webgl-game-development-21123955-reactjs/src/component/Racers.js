import React, { useState, useContext, useEffect } from "react";
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
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { ethers } from "ethers";

import {
  Link as ImLink,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
} from "@imtbl/imx-sdk";

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
    "& p": {
      display: "flex",
      fontWeight: "500",
      color: "#ffffff",
      fontSize: "14px",
    },
  },
  carbox: {
    position: "relative",
    padding: "20px",
    background: "#190A2C",
    border: "1px solid #ea154699",
    borderRadius: "5px",
    // width:"317px"
  },
  dummybox: {
    background: "#07030d91",
    "& h5": {
      display: "flex",
      fontWeight: "500",
      color: "#ffffff",
    },
  },
  imgFig: {
    height: "200px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0",
    "@media(max-width:768px)": {
      height: "auto",
    },
  },
  box: {
    backgroundColor: "#241B30",
    padding: "20px",
  },
  gallryBox: {
    // width: "300px",
    paddingTop: "40px",
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
    marginTop: "17px",

    "& h4": {
      fontSize: "15px",
      fontWeight: "500",
      color: "#fff !important",
      marginBottom: "5px",
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
    "& h4": {
      fontSize: "16px",
      fontWeight: "500",
      color: "#fff",
      marginTop: "15px",
      letterSpacing: "1px",
    },
    "& p": {
      fontSize: "14px",
      fontWeight: "500",
      color: "#ffffff",
      paddingTop: "7px",
    },
  },
}));
const data = [
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2   ETH",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2   ETH",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2   ETH",
    text7: "4",
  },
  {
    image1: "images/car4.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2   ETH",
    text7: "4",
  },
  // {
  //   image1: "images/car1.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car2.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car3.png",
  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car4.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car1.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car2.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car3.png",
  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car4.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car1.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car2.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car3.png",
  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car4.png",
  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2   ETH",
  //   text7: "4",
  // },
];
export default function UsersCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [marketplace, setMarketplace] = useState([]);
  const [loader1, setLoader1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // console.log("marketplace", JSON.stringify(marketplace?.result));
  const nftCards = marketplace?.result;
  console.log("nftCards", data);

  const wallet = sessionStorage.getItem("wallet");
  const load = async () => {
    try {
      setIsLoading(true);
      setMarketplace(
        await user?.client.getOrders({
          status: ImmutableOrderStatus.active,
          user: wallet,
        })
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box className={classes.gallryBox}>
      <Box className={classes.bannerImg}>
        {/*<Tilt>
          <img src={data.image} alt=""/>
        </Tilt>*/}
        {/*<Box>
          <Typography variant="h6">{data.name}</Typography>
        </Box>*/}
        {isLoading ? (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <ButtonCircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {/* {nftCards && nftCards.length > 0 ? ( */}
            <>
              {data &&
                data.map((nftCard) => {
                  console.log("nftCard", nftCard);
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box
                        // onClick={() => {
                        //   history.push({
                        //     pathname: "/ownNftDetails",
                        //     search: nftCard?.sell?.data?.id,
                        //     data: nftCard?.sell?.data?.id,
                        //   });
                        // }}
                        className={classes.carbox}
                      >
                        <figure className={classes.imgFig}>
                          <img
                            onClick={() => history.push("/dealers-details")}
                            style={{
                              maxHeight: "100%",

                              width: "100%",
                            }}
                            src={nftCard?.image1}
                            // {data.image1}
                            alt=""
                            width="100%"
                          />
                        </figure>
                        {/* <Tilt>
                        <img
                          style={{ maxHeight: "114px" }}
                          src={
                            nftCard?.sell?.data?.properties?.image_url
                              ? nftCard?.sell?.data?.properties?.image_url
                              : "images/car1.png"
                          }
                          // {data.image1}
                          alt=""
                          width="100%"
                        />
                      </Tilt> */}

                        <Box classname={classes.dummybox}>
                          <Box className={classes.price}>
                            <Typography variant="h4">
                              {nftCard?.text1}
                              {/* {data.text1} */}
                            </Typography>
                            <Typography variant="body1">
                              {data.text3}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body1">
                              {/* <img src="images/ether1.svg" alt="" style={{ width: "45px" }} /> */}
                              {/* {data?.text2} */}
                              {nftCard?.text2}
                            </Typography>
                          </Box>
                          <Box
                            style={{ marginTop: "8px", marginBottom: "2px" }}
                          >
                            <Divider
                              style={{
                                border: "0.5px solid rgb(234 21 70 / 70%)",
                              }}
                            />
                          </Box>
                          <Box className={classes.pricesection}>
                            <Box display="flex" justifyContent="space-between">
                              <Box>
                                <Typography variant="body1">
                                  {/* {data.text4} */}Token Id
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="body1">
                                  {/* {data.text5} */}Price
                                </Typography>
                              </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                              <Typography
                                variant="body2"
                                style={{
                                  color: "#bcb8b8",
                                  marginTop: "-4px",
                                }}
                              >
                                {/* {data.text6} */}
                                {nftCard?.text7}
                              </Typography>
                              <Typography
                                variant="body2"
                                style={{
                                  color: "#bcb8b8",
                                  marginTop: "-4px",
                                }}
                              >
                                {nftCard?.text6}
                                {/* {Number(
                                  ethers.utils.formatEther(
                                    nftCard?.buy?.data?.quantity
                                  )
                                )} */}
                                {/* {data.text7} */}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
            </>
            {/* ) : (
              <Box style={{ marginLeft: "10px" }}>No Data Found</Box>
            )} */}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
