import React, { useState, useRef, useContext, useEffect } from "react";
import MaketplaceCard from "src/component/MarketplaceCard";

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
  FormHelperText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { BiLockOpen } from "react-icons/bi";
import Page from "src/component/Page";
import Tab from "./Tab";
// import BestSeller from "./BestSeller";
import { GiCancel } from "react-icons/gi";
import { SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { UserContext } from "src/context/User";
import { ethers } from "ethers";
import { sortAddress } from "src/utils";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory, useLocation } from "react-router-dom";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
// import { CopyToClipboard } from "react-copy-to-clipboard";

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
import CloseIcon from "@material-ui/icons/Close";

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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(5),
    },
  },
  nftClass: {
    display: "flex",
    width: "100%",
    "@media (max-width: 767px)": {
      display: "block",
    },
  },
  nftDetailspage: {
    marginLeft: "40px",
    marginTop: "9px",
    "@media (max-width: 767px)": {
      marginLeft: "20px",
      marginTop: "35px",
    },
  },
  menu: {
    maxWidth: "100%",
    marginTop: 53,
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
    //   width: "172px",
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
      fontSize: "16px",
      color: "#fff",
    },
    "& span": {
      fontSize: "16px",
      color: "#cbcbcb",
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

export default function NftDetails(props) {
  const user = useContext(UserContext);
  const location = useLocation();
  const [isSubmit1, setIsSubmit1] = useState(false);

  const data = props?.location?.data;
  const classes = useStyles();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [isLoading1, setIsloading1] = useState(false);
  const [idd, setIdd] = useState();

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);
  const [marketplace, setMarketplace] = useState([]);
  const [putOnsaleOpen, setputOnsaleOpen] = useState(false);

  // console.log("marketplace", JSON.stringify(marketplace?.result));
  const nftCards = marketplace?.result;
  const nftDetail = nftCards?.filter((nftPage) => {
    if (nftPage.sell.data.id === idd) {
      return nftPage;
    }
  });
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
  const walletAddres = sessionStorage.getItem("wallet");
  const [buyOrderId, setBuyOrderId] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [sellTokenId, setSellTokenId] = useState("");
  const [sellTokenAddress, setSellTokenAddress] = useState("");
  const [sellCancelOrder, setSellCancelOrder] = useState("");
  // console.log("sellTokenId", sellTokenId);
  const [inventory, setInventory] = useState();

  // sell an asset
  const sellNFT = async () => {
    await link.sell({
      amount: sellAmount,
      tokenId: nftDetail?.token_id,
      tokenAddress: nftDetail?.token_address,
    });
    setInventory(
      await user?.client.getAssets({ user: walletAddres, sell_orders: true })
    );
    await load();
    await viewNft();
  };
  const [dashboardData, setDashboardData] = useState();
  console.log("dashboardData", dashboardData);
  const [isLoading, setIsLoading] = useState(false);

  const viewNft = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(apiConfig.nft + idd);

      if (response.status === 200) {
        setDashboardData(response.data.result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("error");

        // history.push("/dashboard");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err.response);
    }
  };

  // useEffect(() => {
  //   viewNft();
  // }, [data]);
  const userBalence = sessionStorage.getItem("balance");
  const etherbalnece =
    dashboardData &&
    Number(ethers.utils.formatEther(dashboardData?.buy?.data?.quantity));
  console.log("balancelow", etherbalnece);
  const wallet = sessionStorage.getItem("wallet");

  const buyNFT = async () => {
    // if (userBalence > etherbalnece) {
    try {
      setIsloading1(true);
      await link.buy({
        orderIds: [dashboardData && dashboardData?.order_id],
      });
      setOpenBuy(false);
      setIsloading1(false);
      viewNft();
    } catch (err) {
      console.log(err);
      setIsloading1(false);
    }
    // } else {
    //   toast.warn("Your balance too low");
    //   console.log("balance to low");
    // }
  };
  const cancelSell = async () => {
    await link.cancel(
      {
        orderId: nftDetail && nftDetail[0]?.orders?.sell_orders[0]?.order_id,
      }
      // load()
    );
    await load();
    await toast.success("Succesfully order canceled");
  };
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
    if (idd) {
      viewNft();
    }
  }, [location.search, idd]);
  return (
    <Page title="NFT Details">
      <Container maxWidth="lg">
        <Box className={classes.NftBreed}>
          {" "}
          <Box>
            <Grid container spacing={4}>
              {/* {nftCards
                ?.filter((nftPage) => {
                  if (nftPage.sell.data.id === props.location.data) {
                    return nftPage;
                  }
                })
                .map((data) => {
                //  setSellTokenId(data.sell.data.tokenId)
                //  setSellTokenAddress(data.sell.data.token_address);

                  console.log("data?.user", data); */}
              {/* return ( */}
              <Box className={classes.nftClass}>
                <Grid item xs={12} md={12} lg={6}>
                  <Box>
                    <Paper
                      className={classes.box}
                      style={{
                        position: "relative",
                        borderRadius: "20px",
                        boxShadow: "none",
                        background: "#120720",
                      }}
                    >
                      <Box style={{ borderRadius: "5px" }}>
                        <figure className="m-0 p-2" style={{ margin: "0" }}>
                          <img
                            src={
                              dashboardData &&
                              dashboardData?.sell?.data?.properties?.image_url
                                ? dashboardData?.sell?.data?.properties
                                    ?.image_url
                                : "https://gateway.pinata.cloud/ipfs/QmS1hWKuKTHwYJHoGnJUkzSumAnxLaWjMdfmEeyNDdkyfn"
                            }
                            alt=""
                            width="100%"
                            style={{
                              display: "block",
                              borderRadius: "20px",
                              height: "100%",
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
                  // style={{ marginLeft: "40px", marginTop: "9px" }}
                >
                  <Box className="posrel">
                    <Typography variant="h2" className="text-black">
                      {dashboardData &&
                      dashboardData?.sell?.data?.properties?.name
                        ? dashboardData?.sell?.data?.properties?.name
                        : "Danish race"}
                    </Typography>
                    <Box mt={1} className={classes.creater}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
                          <Box>
                            <Typography
                              variant="h5"
                              style={{ color: "#fff", letterSpacing: "1px" }}
                            >
                              Dealers
                            </Typography>
                            <Box className="d-flex flexStart" mt={1}>
                              <figure class="user_img detail">
                                <Avatar class="rounded-circle" src="" alt="" />
                              </figure>
                              <Link>
                                {dashboardData && (
                                  <Typography
                                    variant="h6"
                                    color="textSecondary"
                                  >
                                    {sortAddress(
                                      dashboardData && dashboardData?.user
                                    )}{" "}
                                    <CopyToClipboard text={dashboardData?.user}>
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
                                  </Typography>
                                )}
                              </Link>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <Box className={classes.CreatorBox}>
                            <Typography
                              variant="h5"
                              style={{ color: "#fff", letterSpacing: "1px" }}
                            >
                              Collection
                            </Typography>

                            {/* <Box className="d-flex flexStart" mt={2}>
                              <figure class="user_img detail">
                                <img
                                  class="rounded-circle"
                                  src={
                                    nftDetail &&
                                    nftDetail[0]?.collection?.icon_url
                                  }
                                  alt=""
                                />
                              </figure>
                              <Link to="/profile">
                                <Typography
                                  variant="h6"
                                  color="textSecondary"
                                  style={{ marginLeft: "22px" }}
                                >
                                  {nftDetail && nftDetail[0]?.collection?.name}
                                </Typography>
                              </Link>
                            </Box> */}
                            <Box className="d-flex flexStart" mt={1}>
                              <figure class="user_img detail">
                                <Avatar
                                  class="rounded-circle"
                                  src={
                                    dashboardData &&
                                    dashboardData?.sell?.data?.properties
                                      ?.collection?.icon_url
                                      ? dashboardData?.sell?.data?.properties
                                          ?.collection?.icon_url
                                      : ""
                                  }
                                  alt=""
                                />
                                {/* <img
                                  class="rounded-circle"
                                  src={
                                    dashboardData &&
                                    dashboardData?.sell?.data?.properties
                                      ?.collection?.icon_url
                                      ? dashboardData?.sell?.data?.properties
                                          ?.collection?.icon_url
                                      : ""
                                  }
                                  alt=""
                                /> */}
                              </figure>
                              <Link>
                                <Typography
                                  variant="h6"
                                  color="textSecondary"
                                  style={{ marginLeft: "20px" }}
                                >
                                  {dashboardData &&
                                  dashboardData?.sell?.data?.properties
                                    ?.collection?.name
                                    ? dashboardData?.sell?.data?.properties
                                        ?.collection?.name
                                    : "Dummy"}
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
                  {/* {nftDetail && nftDetail[0]?.user === walletAddres ? (
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.btnWidth}
                            onClick={() => setOpenPlaceBid(true)}
                            style={{ marginLeft: "10px !important" }}
                          >
                            PUT ON SALE
                          </Button>
                        ) : ( */}
                  <Box mt={2}>
                    {dashboardData &&
                    dashboardData?.orders?.sell_orders?.length > 0 &&
                    dashboardData?.orders?.sell_orders[0]?.user === wallet ? (
                      <Box>
                        {dashboardData &&
                        dashboardData?.orders?.sell_orders?.length > 0 ? (
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
                            onClick={() => setputOnsaleOpen(true)}
                            style={{ marginLeft: "10px !important" }}
                          >
                            Put on sale
                          </Button>
                        )}
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isLoading1 || !wallet}
                        className={classes.btnWidth}
                        onClick={() => buyNFT(dashboardData?.order_id)}
                      >
                        Buy for ~{/* ~0.01 */}
                        {dashboardData &&
                          Number(
                            ethers.utils.formatEther(
                              dashboardData?.buy?.data?.quantity
                            )
                          )}
                        &nbsp;ETH {isLoading1 && <ButtonCircularProgress />}
                      </Button>
                    )}
                  </Box>
                  {!wallet && (
                    <Box
                      mt={1}
                      ml={2}
                      style={{ cursor: "pointer" }}
                      onClick={user.linkSetup}
                    >
                      Connect wallet
                    </Box>
                  )}
                  <Box mt={3} className={classes.chaininfo}>
                    <Typography variant="h4" style={{ color: "#fff" }}>
                      Chain info
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        position: "relative",
                        alignItems: "center",
                        marginTop: "10px",
                        background: "rgb(29, 14, 51)",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      {/* <Grid item xs={5} md={5}>
                        <span>Contract Address:</span>
                      </Grid>
                      <Grid item xs={7} md={7}>
                        <small>
                          <span>
                            {sortAddress(dashboardData?.walletAddress)}
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
                          {dashboardData?.sell?.data?.token_id}
                        </small>
                      </Grid>
                      <Grid item xs={5} md={5}>
                        <span>Blockchain: </span>
                      </Grid>
                      <Grid item xs={7} md={7}>
                        <small style={{ color: "#cbcbcb" }}>ImmutableX</small>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* <Hidden lgUp>
                    <Tab />
                  </Hidden> */}
                </Grid>
              </Box>
              {/* );
                })} */}
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
                  Enter the price for which the item will be instantly sold.
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
                    You will receive <b>0.0053 ETH</b> <span>$106.58</span>
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
        {putOnsaleOpen && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={putOnsaleOpen}
            onClose={() => setputOnsaleOpen(false)}
            aria-labelledby="max-width-dialog-title"
          >
            {/* <IconButton
              onClick={() => setputOnsaleOpen(false)}
              className={classes.customizedButton}
            >
              <GiCancel />
            </IconButton> */}
            <CloseIcon
              className={classes.customizedButton}
              onClick={() => setputOnsaleOpen(false)}
              style={{
                width: "1.3em",
                height: "1.3em",
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                justifyContent: "end",
              }}
            />
            <DialogContent>
              <Box className="dilogBox">
                <Typography
                  variant="h4"
                  className="modalTitle"
                  style={{ color: "#fff" }}
                >
                  Put on sale
                </Typography>
                <Typography variant="body2" component="small">
                  You are about to Put on sale for{" "}
                  <b>Elon Musk Blazin [Legendary Series]</b> from{" "}
                  <span>ðope cryptø cards</span>
                </Typography>

                <Box>
                  <label>Amount</label>
                  <FormControl fullWidth className={classes.margin}>
                    <Input
                      id="standard-adornment-amount"
                      placeholder="0.054"
                      value={sellAmount}
                      type="number"
                      onChange={(e) => setSellAmount(e.target.value)}
                      error={
                        (isSubmit1 && !sellAmount) ||
                        (isSubmit1 && Number(sellAmount) == 0)
                      }
                      onKeyPress={(event) => {
                        if (
                          event?.key === "-" ||
                          event?.key === "+" ||
                          event?.key === "="
                        ) {
                          event.preventDefault();
                        }
                      }}
                      // helperText={
                      //   (isSubmit1 && !sellAmount && (
                      //     <Typography
                      //       variant="body"
                      //       style={{
                      //         fontSize: "13px",
                      //         fontWeight: "100",
                      //         marginTop: "4px",
                      //         marginLeft: "-10px",
                      //       }}
                      //     >
                      //       Amount is required
                      //     </Typography>
                      //   )) ||
                      //   (isSubmit1 && Number(sellAmount) == 0 && (
                      //     <Typography
                      //       variant="body"
                      //       style={{
                      //         fontSize: "13px",
                      //         fontWeight: "100",
                      //         marginTop: "4px",
                      //         marginLeft: "0px",
                      //       }}
                      //     >
                      //       Please enter valid amount
                      //     </Typography>
                      //   ))
                      // }
                      endAdornment={
                        <InputAdornment position="end">
                          <BiLockOpen /> ETH
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error>
                      {(isSubmit1 && !sellAmount && (
                        <Typography
                          variant="body"
                          style={{
                            fontSize: "13px",
                            fontWeight: "100",
                            marginTop: "4px",
                            // marginLeft: "-10px",
                          }}
                        >
                          Amount is required
                        </Typography>
                      )) ||
                        (isSubmit1 && Number(sellAmount) == 0 && (
                          <Typography
                            variant="body"
                            style={{
                              fontSize: "13px",
                              fontWeight: "100",
                              marginTop: "4px",
                              marginLeft: "0px",
                            }}
                          >
                            Please enter valid amount
                          </Typography>
                        ))}
                    </FormHelperText>
                  </FormControl>
                </Box>

                <Box align="center" className="modal_button_div" mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={sellNFT}
                    className={classes.btnWidth}
                    mb={2}
                  >
                    Put on sale
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setputOnsaleOpen(false)}
                    className={classes.btnWidth}
                    mb={2}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        )}

        {openPlaceBid && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={openPlaceBid}
            onClose={() => setOpenPlaceBid(false)}
            aria-labelledby="max-width-dialog-title"
          >
            <IconButton
              onClick={() => setOpenPlaceBid(false)}
              className={classes.customizedButton}
            >
              <GiCancel />
            </IconButton>
            <DialogContent>
              <Box className="dilogBox">
                <Typography variant="h4" className="modalTitle">
                  Put On sale
                </Typography>
                {/* <Typography variant="body2" component="small">
                  You are about to place a bid for{" "}
                  <b>Elon Musk Blazin [Legendary Series]</b> from{" "}
                  <span>ðope cryptø cards</span>
                </Typography> */}

                <Box>
                  <label> Amount (ETH):</label>
                  <FormControl fullWidth className={classes.margin}>
                    <Input
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <BiLockOpen /> ETH
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>
                <Box>
                  <label>Token ID:</label>

                  <FormControl fullWidth className={classes.margin}>
                    <Input
                      // value={}
                      // onChange={() => setSellTokenId(data?.sell.data.token_id)}
                      placeholder="2"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <label>Token Address:</label>

                  <FormControl fullWidth className={classes.margin}>
                    <Input
                      value={sellTokenAddress}
                      onChange={(e) => setSellTokenAddress(e.target.value)}
                      placeholder="1"
                    />
                  </FormControl>
                </Box>

                {/* <Box mt={2} mb={2}>
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
                </Box> */}

                <Box align="center" className="modal_button_div" mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={sellNFT}
                    className={classes.btnWidth}
                    mb={2}
                  >
                    PUT ON SALE
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
        </Box>
      </Container>
    </Page>
  );
}
