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
    border: "1px solid #ea154699",
    padding: "20px",
    position: "relative",
    background: "#190A2C",
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
      color: "#fff",
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
    text6: "0.2  ETH",
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
export default function UsersCard(props) {
  console.log("props", props);
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [inventory, setInventory] = useState([]);
  const ownedNft = inventory?.result;

  const wallet = sessionStorage.getItem("wallet");
  console.log("wallet ", wallet);
  console.log("inventory.result ", JSON.stringify(inventory?.result));

  useEffect(() => {
    load();
  }, [user]);

  const load = async () => {
    try {
      setIsLoading(true);
      setInventory(
        await user?.client.getAssets({ user: wallet, sell_orders: true })
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Box style={{ width: "100%" }} className={classes.gallryBox}>
      <Box className={classes.bannerImg}>
        {isLoading ? (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <ButtonCircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {ownedNft && ownedNft.length > 0 ? (
              <>
                {ownedNft &&
                  ownedNft.map((ownNft) => {
                    console.log("ownNft", ownNft);
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box
                          onClick={() => {
                            history.push({
                              pathname: "/ownNftDetails",
                              search: ownNft?.id,
                              data: ownNft?.id,
                            });
                          }}
                          className={classes.carbox}
                        >
                          <figure className={classes.imgFig}>
                            <img
                              style={{
                                maxHeight: "100%",
                                minHeight: "100%",
                                width: "100%",
                              }}
                              src={
                                ownNft?.image_url
                                  ? ownNft?.image_url
                                  : "images/car2.png"
                              }
                              // {data.image1}
                              alt=""
                              width="100%"
                            />
                          </figure>

                          <Box classname={classes.dummybox}>
                            <Box className={classes.price}>
                              <Typography variant="h4">
                                {ownNft?.name ? ownNft?.name : "Danish Race"}
                              </Typography>
                              <Typography variant="body1">
                                {data.text3}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body1">
                                {/* <img src="images/ether1.svg" alt="" style={{ width: "45px" }} /> */}
                                {ownNft?.description
                                  ? ownNft?.description
                                  : "Tata Harrier"}
                              </Typography>
                            </Box>
                            <Box
                              style={{ marginTop: "8px", marginBottom: "2px" }}
                            >
                              <Divider
                                style={{
                                  border: "0.5px solid rgba(234, 21, 70, 0.7)",
                                }}
                              />
                            </Box>
                            <Box className={classes.pricesection}>
                              <Box
                                display="flex"
                                justifyContent="space-between"
                              >
                                <Box>
                                  <Typography variant="body1">
                                    {/* {data.text4} */}Token ID
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography variant="body1">
                                    {/* {data.text5} */}Price
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                display="flex"
                                justifyContent="space-between"
                              >
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "#bcb8b8",
                                    marginTop: "-4px",
                                  }}
                                >
                                  {/* {data.text6} */}
                                  {ownNft?.token_id}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "#bcb8b8",
                                    marginTop: "-4px",
                                  }}
                                >
                                  {ownNft &&
                                  ownNft?.orders &&
                                  ownNft?.orders?.sell_orders &&
                                  ownNft?.orders?.sell_orders[0] &&
                                  ownNft?.orders?.sell_orders[0]?.buy_quantity
                                    ? Number(
                                        ethers.utils.formatEther(
                                          ownNft?.orders?.sell_orders[0]
                                            ?.buy_quantity
                                        )
                                      )
                                    : 0}
                                  &nbsp;ETH
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
              </>
            ) : (
              <Box style={{ marginLeft: "10px" }}>No Data Found</Box>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
