import React, { useState, useRef, useEffect, useContext } from "react";
import MaketplaceCard from "src/component/MarketplaceCard";
import { useLocation } from "react-router-dom";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
import axios from "axios";
import apiConfig from "../../../component/config/ApiConfig";
import { UserContext } from "src/context/User";
import FormHelperText from "@material-ui/core/FormHelperText";
import CloseIcon from "@material-ui/icons/Close";

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
import { toast } from "react-toastify";
import { sortAddress } from "src/utils";

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
  menu: {
    maxWidth: "100%",
    marginTop: 53,
  },
  nftClass: {
    display: "flex",
    width: "100%",
    "@media (max-width: 767px)": {
      display: "block",
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
  const user = useContext(UserContext);
  const [data, setIdd] = useState();

  console.log("user+++", user);
  // const data = props?.location?.state?.data;
  console.log(" data", data);
  const classes = useStyles();
  const moreRef = useRef(null);
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [putOnsaleOpen, setputOnsaleOpen] = useState(false);
  const [cancleSale, setcancleSale] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [policy, setPolicy] = useState(false);
  const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);
  const [sellAmount, setSellAmount] = useState("");
  const [sellTokenId, setSellTokenId] = useState("");
  const [sellTokenAddress, setSellTokenAddress] = useState("");
  const [sellCancelOrder, setSellCancelOrder] = useState("");
  const [selData, setSelData] = useState();
  const [isSubmit1, setIsSubmit1] = useState(false);
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
  }, []);
  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
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
  const wallet = sessionStorage.getItem("wallet");

  const load = async () => {
    setInventory(
      await user?.client.getAssets({ user: wallet, sell_orders: true })
    );
  };

  const sellNFT = async () => {
    setIsSubmit1(true);
    if (sellAmount && Number(sellAmount) > 0) {
      await link.sell({
        amount: sellAmount,
        tokenId: nftDetail && nftDetail[0]?.token_id,
        tokenAddress: nftDetail && nftDetail[0]?.token_address,
      });
      setSelData(
        await user?.client.getAssets({ user: wallet, sell_orders: true })
      );
      await setputOnsaleOpen(false);
      await load();
      await toast.success("Succesfully Sale");
      // window.location.href = "/ownNftDetails";
    }
  };

  // cancel sell order
  const cancelSell = async () => {
    await link.cancel({
      orderId: nftDetail && nftDetail[0]?.orders?.sell_orders[0]?.order_id,
    });
    await load();
    await toast.success("Succesfully order canceled");
  };

  useEffect(() => {
    if (user?.client && data) {
      load();
    }
  }, [user?.client, data]);

  return (
    <Page title="NFT Details">
      <Container maxWidth="lg">
        <Box className={classes.NftBreed}>
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
                        borderRadius: "5px",
                        boxShadow: "none",
                        background: "#120720",
                      }}
                    >
                      <Box style={{ borderRadius: "20px" }}>
                        <figure className="m-0 p-2" style={{ margin: "0" }}>
                          <img
                            src={
                              nftDetail && nftDetail[0]?.image_url
                                ? nftDetail[0]?.image_url
                                : "images/car3.png"
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
                  style={{ marginLeft: "40px", marginTop: "9px" }}
                >
                  <Box className="posrel">
                    <Typography variant="h2" className="text-black">
                      {nftDetail && nftDetail[0]?.name
                        ? nftDetail[0]?.name
                        : "Danish Race"}
                    </Typography>
                    <Box mt={1}>
                      <Typography variant="h6" className="smallfont">
                        {nftDetail && nftDetail[0]?.metadata?.description}
                      </Typography>
                    </Box>
                    <Box my={2} className={classes.creater}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
                          <Box>
                            <Typography
                              variant="h5"
                              color="textSecondary"
                              style={{ color: "#fff", letterSpacing: "1px" }}
                            >
                              Creator
                            </Typography>
                            <Box
                              className="d-flex flexStart"
                              mt={2}
                              style={{ marginLeft: "-4px" }}
                            >
                              <figure class="user_img detail">
                                <Avatar class="rounded-circle" src="" alt="" />
                              </figure>
                              <Link
                                // to="/profile"
                                style={{ marginLeft: "-10px" }}
                              >
                                {nftDetail && (
                                  <Typography
                                    variant="h6"
                                    color="textSecondary"
                                    style={{ marginLeft: "8px" }}
                                  >
                                    {sortAddress(
                                      nftDetail && nftDetail[0]?.user
                                    )}
                                    <CopyToClipboard text={nftDetail[0]?.user}>
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
                              color="textSecondary"
                              style={{ color: "#fff", letterSpacing: "1px" }}
                            >
                              Collection
                            </Typography>
                            <Box className="d-flex flexStart" mt={2}>
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
                  <Box mt={1}>
                    {nftDetail &&
                    nftDetail[0]?.orders?.sell_orders?.length > 0 ? (
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

                  <Box mt={3} className={classes.chaininfo}>
                    <Typography variant="h4" style={{ color: "#fff" }}>
                      Chain info
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        alignItems: "center",
                        marginTop: "10px",
                        background: "#1d0e33",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      {/* <Grid item xs={5} md={5}>
                        <span>Contract Address:</span>
                      </Grid>
                      <Grid item xs={7} md={7}>
                        <small>
                          <span>0x2a18...acb8hfelamslaw</span>
                        </small>
                      </Grid> */}
                      <Grid item xs={5} md={5}>
                        <span>Token ID:</span>
                      </Grid>
                      <Grid item xs={7} md={7}>
                        <small>{nftDetail && nftDetail[0]?.token_id}</small>
                      </Grid>
                      <Grid item xs={5} md={5}>
                        <span>Blockchain: </span>
                      </Grid>
                      <Grid item xs={7} md={7}>
                        <small>ImmutableX</small>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* <Hidden lgUp>
                    <Tab />
                  </Hidden> */}
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Box>

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
        {cancleSale && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={cancleSale}
            onClose={() => setcancleSale(false)}
            aria-labelledby="max-width-dialog-title"
          >
            {/* <DialogActions> */}
            {/* <IconButton
              onClick={() => setcancleSale(false)}
              className={classes.customizedButton}
            >
              <GiCancel />
            </IconButton> */}
            <CloseIcon
              onClick={() => setcancleSale(false)}
              className={classes.customizedButton}
              style={{
                width: "1.3em",
                height: "1.3em",
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                justifyContent: "end",
              }}
            />
            {/* </DialogActions> */}
            <DialogContent>
              <Box className="dilogBox">
                <Typography variant="h4" className="modalTitle">
                  Cancel Sale
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
                    <small style={{ paddingTop: "10px" }}>Enter quantity</small>
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
                    onClick={() => setcancleSale(false)}
                    className={classes.btnWidth}
                    mb={2}
                  >
                    Cancel Sale
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setcancleSale(false)}
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
    </Page>
  );
}
