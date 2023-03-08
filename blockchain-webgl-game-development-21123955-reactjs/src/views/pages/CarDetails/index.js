import React, { useState, useRef, useEffect, useContext } from "react";
import MaketplaceCard from "src/component/MarketplaceCard";
import { ethers } from "ethers";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputAdornment,
  Input,
  List,
  ListItem,
  Hidden,
  Avatar,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";

import { Link } from "react-router-dom";
import { BiLockOpen } from "react-icons/bi";
import Page from "src/component/Page";
import { UserContext } from "src/context/User";

import Tab from "./Tab";
// import BestSeller from "./BestSeller";
import { GiCancel } from "react-icons/gi";
import { SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import apiConfig from "../../../component/config/ApiConfig";
import { sortAddress } from "src/utils";
import { toast } from "react-toastify";

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
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const columns = [
  {
    id: "event",
    label: "Event",
    align: "left",
    minWidth: "120px",
    maxWidth: "150px",
  },
  { id: "price", label: "Price", align: "left", minWidth: "160px" },
  { id: "from", label: "From", align: "left", minWidth: "160px" },
  { id: "to", label: "To", align: "left", minWidth: "160px" },
  { id: "date", label: "Date", align: "left", minWidth: "160px" },
];

let tabelData = [
  {
    event: "Collectible",
    price: "0.25 > 0.15",
    from: "R2V4 Collectible....",
    to: "R2V4 Collectible....",
    date: "21.05.21  ,  14:55",
  },
  {
    event: "Collectible",
    price: "0.25 > 0.15",
    from: "R2V4 Collectible....",
    to: "R2V4 Collectible....",
    date: "3 hrs ago",
  },
  {
    event: "Collectible",
    price: "0.25 > 0.15",
    from: "R2V4 Collectible....",
    to: "R2V4 Collectible....",
    date: "21.05.21  ,  14:55",
  },
  {
    event: "Collectible",
    price: "0.25 > 0.15",
    from: "R2V4 Collectible....",
    to: "R2V4 Collectible....",
    date: "3 hrs ago",
  },
  {
    event: "Collectible",
    price: "0.25 > 0.15",
    from: "R2V4 Collectible....",
    to: "R2V4 Collectible....",
    date: "21.05.21  ,  14:55",
  },
];

const useStyles = makeStyles((theme) => ({
  NftBreed: {
    background: "#190a2c",
    marginTop: "50px",
    borderRadius: "16px",
    marginBottom: "50px",
    position: "relative",
    padding: "20px",
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(5),
    },

    "& figure": {
      height: "260px",
      overflow: "hidden",
      position: "relative",
      backgroundSize: "100% !important",
      backgroundRepeat: "no-repeat !important",
      backgroundPosition: "center !important",
    },

    "& img": {
      top: "50%",
      left: "50%",
      width: "100%",
      height: "auto",
      position: "absolute",
      minWidth: "100%",
      transform: "translate(-50%, -50%)",
      minHeight: "100%",
    },
  },
  menu: {
    maxWidth: "100%",
    marginTop: 53,
  },
  nftDetailspage: {
    marginLeft: "40px",
    marginTop: "9px",
    "@media (max-width: 767px)": {
      marginLeft: "20px",
      marginTop: "35px",
    },
  },
  creater: {
    "& img": {
      marginRight: "10px",
      width: "60px",
    },
    "& h6": {
      color: "#000",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "24px",
    },
  },
  box: {
    boxShadow: "0 0 20px rgb(8 21 66 / 10%)",
  },
  Avtar: {
    width: 25,
    height: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWidth: {
    // width: "250px",
    maxWidth: "100%",
    marginRight: "10px",
    borderRadius: "5px",
    // [theme.breakpoints.down("xs")]: {
    //   width: "100%",
    //   margin: "0 !important",
    //   marginBottom: "10px !important",
    // },
    // "@media(max-width:768px)": {
    //   // width: "172px",
    //   borderRadius: "22px",
    // },
  },
  flexPrice: {
    display: "flex",
    alignItems: "center",
    color: "#f5f5f5",
    fontSize: "18px",
  },
  pading0: {
    padding: "0 8px !important",
  },
  customizedButton: {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "red",
  },
  paper: {
    overflowY: "unset",
  },
  textfildBorder: {
    border: "1px solid #898989",
  },
  MuiDialog: {
    paper: {
      overflowY: "unset !important",
    },
  },
  chaininfo: {
    "& span": {
      fontSize: "13px",
      color: "#fff",
    },
    "& span": {
      fontSize: "16px",
      color: "#cbcbcb",
    },
  },
  nftClass: {
    display: "flex",
    width: "100%",
    padding: "80px 0",
    "@media (max-width: 767px)": {
      display: "block",
    },
  },
}));
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 41,
    height: 20,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(19px)",
      color: "#039BE3",
      "& + $track": {
        opacity: 1,
        backgroundColor: "#039BE3",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 17,
    height: 17,
    backgroundColor: "#fff",
    boxShadow: "none",
  },
  track: {
    borderRadius: 25,
    opacity: 1,
    backgroundColor: "#039BE3",
  },
  checked: {},
  CreatorBox: {
    "& h5": {
      color: "#fff",
    },
  },
  buttonright: {
    transform: "skew(  -20deg)",
  },
}))(Switch);

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
  // {
  //   image1: "images/car1.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car2.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car3.png",
  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car4.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car1.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car2.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car3.png",
  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car4.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car1.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car2.png",

  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car3.png",
  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
  // {
  //   image1: "images/car4.png",
  //   text1: "Danish Race",
  //   text2: "Tata Harrier",
  //   text3: "525 days left",
  //   text4: "Min Bid",
  //   text5: "Price",
  //   text6: "0.2",
  //   text7: "4",
  // },
];
export default function NftDetails(props) {
  console.log("props", props.location.state.data);
  const data = props?.location?.state?.data;
  const user = useContext(UserContext);

  console.log(" data", data);
  const classes = useStyles();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openputOnSale, setopenputOnSale] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isLoading1, setIsloading1] = useState(false);

  const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  const [dashboardData, setDashboardData] = useState();
  console.log("dashboardData========>", dashboardData);
  const viewMarketData = async (id) => {
    try {
      setIsloading1(true);
      const response = await axios.get(
        apiConfig.viewBlackMarketData + `?_id=` + data
      );

      if (response.status === 200) {
        setDashboardData(response.data.result);
        setIsloading1(false);
      } else {
        setIsloading1(false);

        // history.push("/dashboard");
      }
    } catch (err) {
      setIsloading1(false);
      console.error(err.response);
    }
  };

  useEffect(() => {
    if (data) {
      viewMarketData();
    }
  }, [data]);
  const userBalence = sessionStorage.getItem("balance");
  // const etherbalnece = ethers.utils.formatEther(
  //   dashboardData && dashboardData?.orders?.sell_orders[0]?.buy_quantity
  //     ? dashboardData?.orders?.sell_orders[0]?.buy_quantity
  //     : "0.00"
  // );
  // console.log("balancelow", dashboardData);

  const buyNFT = async () => {
    // if (userBalence > 0) {
    try {
      setIsloading(true);
      await link.buy({
        orderIds: [dashboardData?.orders?.sell_orders[0]?.order_id],
      });
      await viewMarketData();
      toast.success("Successfully buy");
      setOpenBuy(false);
      setIsloading(false);
      viewMarketData();
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
    // } else {
    //   console.log("balance to low");
    //   toast.warn("Your balance too low");
    // }
  };
  const [inventory, setInventory] = useState([]);
  const ownedNft = inventory?.result;
  console.log("ownedNft", ownedNft);
  const nftDetail = ownedNft?.filter((nftPage) => {
    console.log("nftPage", nftPage?.id);
    if (nftPage.id === data) {
      return nftPage;
    }
  });
  console.log("nftDetail", nftDetail);

  const cancelSell = async () => {
    await link.cancel(
      {
        orderId:
          dashboardData && dashboardData?.orders?.sell_orders[0]?.order_id,
      }
      // load()
    );
    await viewMarketData();
    await toast.success("Succesfully order canceled");
  };
  const wallet = sessionStorage.getItem("wallet");
  return (
    <Page title="NFT Details">
      {isLoading1 ? (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <ButtonCircularProgress />
        </Box>
      ) : (
        <>
          {dashboardData && (
            <Container maxWidth="lg" style={{}}>
              <Box className={classes.NftBreed1}>
                {" "}
                <Box>
                  <Grid container spacing={4}>
                    <Box className={classes.nftClass}>
                      <Grid item xs={12} md={12} lg={6}>
                        <Box>
                          <Paper
                            className={classes.box}
                            style={{
                              position: "relative",

                              background: "#120720",
                            }}
                          >
                            <Box style={{ borderRadius: "20px" }}>
                              <figure style={{ margin: "0" }}>
                                <img
                                  src={
                                    dashboardData?.image_url
                                      ? dashboardData?.image_url
                                      : "images/detail_1.png"
                                  }
                                  alt=""
                                  width="100%"
                                  style={{
                                    display: "block",
                                    borderRadius: "5px",
                                  }}
                                />
                              </figure>
                            </Box>
                          </Paper>
                          <Hidden mdDown>
                            <Tab />
                          </Hidden>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={6}
                        className={classes.nftDetailspage}
                        // style={{ marginLeft: "20px", marginTop: "9px" }}
                      >
                        <Box className="posrel">
                          <Typography variant="h2" className="text-black">
                            {dashboardData?.name
                              ? dashboardData?.name
                              : "Danish Race"}
                          </Typography>

                          <Box>
                            <Typography
                              variant="body1"
                              className="smallfont"
                              style={{
                                color: "#ffffff !important",
                                fontSize: "15px !important",
                                fontWeight: "400 !important",
                                lineHeight: "20px",
                                marginTop: "8px",
                              }}
                            >
                              {dashboardData?.description}
                            </Typography>
                          </Box>
                          <Box my={2} className={classes.creater}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={5}>
                                <Box>
                                  <Typography
                                    variant="h4"
                                    color="textSecondary"
                                    style={{ color: "#fff" }}
                                  >
                                    Creator
                                  </Typography>
                                  <Box className="d-flex flexStart" mt={1}>
                                    <figure class="user_img detail">
                                      <Avatar
                                        class="rounded-circle"
                                        src=""
                                        alt=""
                                      />
                                    </figure>
                                    <Link
                                    // to="/profile"
                                    >
                                      {dashboardData && (
                                        <Typography
                                          variant="body1"
                                          color="textSecondary"
                                        >
                                          {sortAddress(
                                            dashboardData && dashboardData?.user
                                          )}
                                          <CopyToClipboard
                                            text={dashboardData?.user}
                                          >
                                            <BiCopy
                                              style={{
                                                color: "#fff",
                                                fontSize: " 14px",
                                                cursor: "pointer",
                                                marginLeft: "5px",
                                              }}
                                              onClick={() =>
                                                toast.info(
                                                  "Copied successfully"
                                                )
                                              }
                                            />
                                          </CopyToClipboard>
                                        </Typography>
                                      )}
                                    </Link>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={5}>
                                <Box className={classes.CreatorBox}>
                                  <Typography
                                    variant="h4"
                                    color="textSecondary"
                                    style={{ color: "#fff" }}
                                  >
                                    Collection
                                  </Typography>
                                  <Box className="d-flex flexStart" mt={1}>
                                    <figure class="user_img detail">
                                      <Avatar
                                        class="rounded-circle"
                                        style={{
                                          width: "39px",
                                          height: "39px",
                                        }}
                                        src={
                                          dashboardData &&
                                          dashboardData?.sell?.data?.properties
                                            ?.collection?.icon_url
                                            ? dashboardData?.sell?.data
                                                ?.properties?.collection
                                                ?.icon_url
                                            : ""
                                        }
                                        alt=""
                                      />
                                    </figure>
                                    <Link>
                                      <Typography
                                        variant="h6"
                                        color="textSecondary"
                                      >
                                        {dashboardData &&
                                        dashboardData?.collectionDetails?.name
                                          ? dashboardData?.collectionDetails
                                              ?.name
                                          : ""}
                                      </Typography>
                                    </Link>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                        {/* <Box mt={3}>
                  <Typography className="creatorButton">
                    <span>10%</span> of sales will go to creator
                  </Typography>
                </Box> */}
                        <Box mt={2}>
                          {dashboardData &&
                          dashboardData?.orders?.sell_orders?.length > 0 &&
                          dashboardData?.orders?.sell_orders[0]?.user ===
                            wallet ? (
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.btnWidth}
                              onClick={cancelSell}
                            >
                              Cancel sale
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.btnWidth}
                              onClick={() =>
                                buyNFT(dashboardData && dashboardData?.order_id)
                              }
                              disabled={isLoading}
                            >
                              Buy for ~
                              {ethers.utils.formatEther(
                                dashboardData &&
                                  dashboardData?.orders?.sell_orders[0]
                                    ?.buy_quantity
                                  ? dashboardData?.orders?.sell_orders[0]
                                      ?.buy_quantity
                                  : "0.00"
                              )}
                              &nbsp;ETH{" "}
                              {isLoading && <ButtonCircularProgress />}
                            </Button>
                          )}
                        </Box>
                        <Box mt={2} mb={3} className={classes.chaininfo}>
                          <Typography variant="h4" style={{ color: "#fff" }}>
                            Chain info
                          </Typography>
                          <Grid
                            container
                            spacing={1}
                            style={{
                              alignItems: "center",
                              marginTop: "10px",
                              background: "#1d0e33",
                              padding: "10px",
                              borderRadius: "5px",
                            }}
                          >
                            {/* <Grid item xs={5} md={5}>
                              <span>Contract Address:</span>
                            </Grid>
                            <Grid item xs={7} md={7}>
                              <small>
                                <span style={{ fontSize: "14px" }}>
                                  {sortAddress(
                                    dashboardData?.walletAddress
                                      ? dashboardData?.walletAddress
                                      : dashboardData?.user
                                  )}
                                  <CopyToClipboard
                                    text={dashboardData?.walletAddress}
                                  >
                                    <BiCopy
                                      style={{
                                        color: "#fff",
                                        fontSize: " 14px",
                                        cursor: "pointer",
                                        marginLeft: "5px",
                                      }}
                                      onClick={() =>
                                        toast.info("Copied successfully")
                                      }
                                    />
                                  </CopyToClipboard>
                                </span>
                              </small>
                            </Grid> */}
                            <Grid item xs={5} md={5}>
                              <span>Token ID:</span>
                            </Grid>
                            <Grid item xs={7} md={7}>
                              <small style={{ color: "#cbcbcb" }}>
                                {dashboardData?.token_id}
                              </small>
                            </Grid>
                            <Grid item xs={5} md={5}>
                              <span>Blockchain: </span>
                            </Grid>
                            <Grid item xs={7} md={7}>
                              <small style={{ color: "#cbcbcb" }}>
                                ImmutableX
                              </small>
                            </Grid>
                          </Grid>
                        </Box>
                        <Hidden lgUp>
                          <Tab />
                        </Hidden>
                      </Grid>
                    </Box>
                  </Grid>
                </Box>
              </Box>

              {openSale && (
                <Dialog
                  fullWidth="sm"
                  maxWidth="sm"
                  open={openSale}
                  onClose={() => setOpenSale(false)}
                  aria-labelledby="max-width-dialog-title"
                >
                  <DialogActions>
                    <IconButton
                      onClick={() => setOpenSale(false)}
                      className={classes.customizedButton}
                    >
                      <GiCancel />
                    </IconButton>
                  </DialogActions>
                  <DialogContent>
                    <Typography variant="h4" className="modalTitle">
                      Put On Sale
                    </Typography>
                    <Box className="checktoggel">
                      <label style={{ padding: "0" }}>Instant Sale Price</label>
                      <Typography className="checktoggel2" component="div">
                        <Grid
                          component="label"
                          container
                          alignItems="center"
                          spacing={1}
                        >
                          <Grid item>
                            <AntSwitch name="checkedC" />
                          </Grid>
                        </Grid>
                      </Typography>
                      <small>
                        Enter the price for which the item will be instantly
                        sold.
                      </small>
                    </Box>
                    <Box mt={3}>
                      <FormControl fullWidth className={classes.margin}>
                        <Input
                          id="standard-adornment-amount"
                          placeholder="0.4"
                          endAdornment={
                            <InputAdornment position="end">
                              {" "}
                              <span style={{ color: "#039BE3" }}>ETH</span>{" "}
                            </InputAdornment>
                          }
                        />
                        <small>
                          Service fee <span>2.5%</span>
                        </small>
                        <small>
                          You will receive <b>0.0053 ETH</b>{" "}
                          <span>$106.58</span>
                        </small>
                      </FormControl>
                    </Box>

                    <Box align="center" className="modal_button_div" mt={4}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => setOpenBuy(false)}
                        className={classes.btnWidth}
                        mb={2}
                      >
                        Next step
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => setOpenBuy(false)}
                        className={classes.btnWidth}
                      >
                        CANCEL
                      </Button>
                    </Box>
                  </DialogContent>
                </Dialog>
              )}

              {openShare && (
                <Dialog
                  fullWidth="sm"
                  maxWidth="sm"
                  open={openShare}
                  onClose={() => setOpenShare(false)}
                  aria-labelledby="max-width-dialog-title"
                >
                  <DialogActions>
                    <IconButton
                      onClick={() => setOpenShare(false)}
                      className={classes.customizedButton}
                    >
                      <GiCancel />
                    </IconButton>
                  </DialogActions>
                  <DialogContent>
                    <Box className="share_Box share_Box2 ">
                      <Typography veriant="h4"> Share this NFT</Typography>
                      <List>
                        <ListItem>
                          <label>
                            <SiFacebook />
                          </label>
                          <Typography variant="h6">Facebook</Typography>
                        </ListItem>
                        <ListItem>
                          <label>
                            <FaTwitter />
                          </label>
                          <Typography variant="h6">Twitter</Typography>
                        </ListItem>
                        <ListItem>
                          <label>
                            <FaTelegramPlane />
                          </label>
                          <Typography variant="h6">Telegram</Typography>
                        </ListItem>
                        <ListItem>
                          <label>
                            <GrMail />
                          </label>
                          <Typography variant="h6">E-mail</Typography>
                        </ListItem>
                      </List>
                    </Box>
                  </DialogContent>
                </Dialog>
              )}

              {openReport && (
                <Dialog
                  fullWidth="sm"
                  maxWidth="sm"
                  open={openReport}
                  onClose={() => setOpenReport(false)}
                  aria-labelledby="max-width-dialog-title"
                >
                  <DialogActions>
                    <IconButton
                      onClick={() => setOpenReport(false)}
                      className={classes.customizedButton}
                    >
                      <GiCancel />
                    </IconButton>
                  </DialogActions>
                  <DialogContent>
                    <Typography variant="h4">Why are you reporting?</Typography>
                    <Typography variant="body2" component="span">
                      Describe why you think this item should be removed from
                      marketplace
                    </Typography>

                    <Box mt={2}>
                      <label style={{ paddingTop: "10px" }}>Message</label>
                      <TextField
                        fullWidth
                        type="text"
                        variant="outlined"
                        multiline
                        rows={4}
                        rowsMax={4}
                        placeholder="Tell us some details"
                        className={classes.textfildBorder}
                      />
                    </Box>
                    <Box align="center" className="modal_button_div" mt={4}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => setOpenBuy(false)}
                        className={classes.btnWidth}
                        mb={2}
                      >
                        REPORT
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => setOpenBuy(false)}
                        className={classes.btnWidth}
                      >
                        CANCEL
                      </Button>
                    </Box>
                  </DialogContent>
                </Dialog>
              )}

              {openputOnSale && (
                <Dialog
                  fullWidth="sm"
                  maxWidth="sm"
                  open={openputOnSale}
                  onClose={() => setopenputOnSale(false)}
                  aria-labelledby="max-width-dialog-title"
                >
                  <IconButton
                    onClick={() => setopenputOnSale(false)}
                    className={classes.customizedButton}
                  >
                    <GiCancel />
                  </IconButton>
                  <DialogContent>
                    <Box className="dilogBox">
                      <Typography variant="h4" className="modalTitle">
                        Put On Sale
                      </Typography>
                      <Typography variant="body2" component="small">
                        You are about toPut On Sale for{" "}
                        <b>Elon Musk Blazin [Legendary Series]</b> from{" "}
                        <span>ðope cryptø cards</span>
                      </Typography>

                      <Box>
                        <label>Your bid</label>
                        <FormControl fullWidth className={classes.margin}>
                          <Input
                            id="standard-adornment-amount"
                            placeholder="0.054"
                            endAdornment={
                              <InputAdornment position="end">
                                <BiLockOpen /> ETH
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <label>Enter quantity</label>

                        <FormControl fullWidth className={classes.margin}>
                          <Input
                            id="standard-adornment-amount"
                            placeholder="1"
                          />
                        </FormControl>
                      </Box>

                      <Box mt={2} mb={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={5} className={classes.pading0}>
                            {" "}
                            <small>Your bidding balance</small>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={7}
                            className={classes.pading0}
                            align="right"
                          >
                            {" "}
                            <small>
                              <b>0.087 ETH</b>
                            </small>
                          </Grid>
                          <Grid item xs={6} md={5} className={classes.pading0}>
                            {" "}
                            <small>Your balance</small>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={7}
                            className={classes.pading0}
                            align="right"
                          >
                            {" "}
                            <small>
                              <b>0.0547 ETH</b>
                            </small>
                          </Grid>
                          <Grid item xs={6} md={5} className={classes.pading0}>
                            {" "}
                            <small>Service fee</small>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={7}
                            className={classes.pading0}
                            align="right"
                          >
                            {" "}
                            <small>
                              <b>0.00135 ETH</b>
                            </small>
                          </Grid>
                          <Grid item xs={6} md={5} className={classes.pading0}>
                            {" "}
                            <small>You will pay</small>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={7}
                            className={classes.pading0}
                            align="right"
                          >
                            {" "}
                            <small>
                              <b>0.05535 ETH</b>
                            </small>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box align="center" className="modal_button_div" mt={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setOpenBuy(false)}
                          className={classes.btnWidth}
                          mb={2}
                        >
                          Put On Sale
                        </Button>
                      </Box>
                    </Box>
                  </DialogContent>
                </Dialog>
              )}
              {openBuy && (
                <Dialog
                  fullWidth="sm"
                  maxWidth="sm"
                  open={openBuy}
                  onClose={() => setOpenBuy(false)}
                  aria-labelledby="max-width-dialog-title"
                >
                  {/* <DialogActions> */}
                  <IconButton
                    onClick={() => setOpenBuy(false)}
                    className={classes.customizedButton}
                  >
                    <GiCancel />
                  </IconButton>
                  {/* </DialogActions> */}
                  <DialogContent>
                    <Box className="dilogBox">
                      <Typography variant="h4" className="modalTitle">
                        Checkout
                      </Typography>
                      <Typography variant="body2" component="small">
                        You are about to purchase{" "}
                        <b>Elon Musk Blazin [Legendary Series]</b> from{" "}
                        <span>ðope cryptø cards</span>
                      </Typography>

                      <Box mt={1}>
                        <FormControl fullWidth className={classes.margin}>
                          <Input
                            id="standard-adornment-amount"
                            placeholder="1"
                            endAdornment={
                              <InputAdornment position="end">
                                <BiLockOpen />
                              </InputAdornment>
                            }
                          />
                          <small style={{ paddingTop: "10px" }}>
                            Enter quantity
                          </small>
                        </FormControl>
                      </Box>
                      <Box mt={1}>
                        <FormControl fullWidth className={classes.margin}>
                          <Input
                            id="standard-adornment-amount"
                            placeholder="0.4"
                            endAdornment={
                              <InputAdornment position="end">
                                <small>
                                  <span> Link</span>
                                </small>
                              </InputAdornment>
                            }
                          />
                          <small style={{ paddingTop: "10px" }}>
                            Price per edition
                          </small>
                        </FormControl>
                      </Box>

                      <Box mt={2} mb={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={5} className={classes.pading0}>
                            {" "}
                            <small>Your balance</small>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={7}
                            className={classes.pading0}
                            align="right"
                          >
                            {" "}
                            <small>
                              <b>0 ETH</b>
                            </small>
                          </Grid>
                          <Grid item xs={6} md={5} className={classes.pading0}>
                            {" "}
                            <small>Service fee</small>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={7}
                            className={classes.pading0}
                            align="right"
                          >
                            {" "}
                            <small>
                              <b>0.01 ETH</b>
                            </small>
                          </Grid>
                          <Grid item xs={6} md={5} className={classes.pading0}>
                            {" "}
                            <small>Total price</small>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={7}
                            className={classes.pading0}
                            align="right"
                          >
                            {" "}
                            <small>
                              <b>0.4 ETH</b>
                            </small>
                          </Grid>
                          <Grid item xs={6} md={5} className={classes.pading0}>
                            {" "}
                            <small>You will pay</small>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={7}
                            className={classes.pading0}
                            align="right"
                          >
                            {" "}
                            <small>
                              <b>0.41 ETH</b>
                            </small>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box align="center" className="modal_button_div" mt={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setOpenBuy(false)}
                          className={classes.btnWidth}
                          mb={2}
                        >
                          PROCCED TO PAYMENT
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setOpenBuy(false)}
                          className={classes.btnWidth}
                        >
                          CANCEL
                        </Button>
                      </Box>
                    </Box>
                  </DialogContent>
                </Dialog>
              )}

              <Box pb={5}>
                {/* <Box pb={3}>
              <Typography
                style={{
                  fontSize: "22px",
                  fontFamily: "Dismedia",
                  fontWeight: "500",
                  lineHeight: "1.235",
                  color: "#fff",
                }}
              >
                More car from this collection
              </Typography>
            </Box> */}
                {/* <Grid container spacing={3}>
            {TeamMap.map((data, i) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <MaketplaceCard data={data} index={i} />
                </Grid>
              );
            })}
          </Grid> */}
              </Box>
            </Container>
          )}
        </>
      )}
    </Page>
  );
}
