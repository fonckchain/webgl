import React, { useState, useEffect, useContext } from "react";
// import Owned from "./Owned";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { ImShare2 } from "react-icons/im";
import { FiMoreHorizontal } from "react-icons/fi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FaTelegramPlane } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import DialogActions from "@material-ui/core/DialogActions";
import { GiCancel } from "react-icons/gi";
import CloseIcon from "@material-ui/icons/Close";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import Details from "src/views/pages/CarDetails/Details";
import ParticipateCard from "src/component/ParticipateCard";
import Racers from "src/component/Racers";

import OwnedCar from "src/component/OwnedCar";
import { sortAddress } from "src/utils";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";

import web3 from "web3";
import {
  Grid,
  Box,
  Container,
  IconButton,
  Typography,
  makeStyles,
  Button,
  TextField,
  Avatar,
} from "@material-ui/core";
import {} from "react-feather";
import axios from "axios";
import apiConfig from "../../../component/config/ApiConfig";
// import { useWeb3React } from "@web3-react/core";
import {
  Link as ImLink,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
  ETHTokenType,
  MintableERC721TokenType,
} from "@imtbl/imx-sdk";
// import {
//   REACT_APP_ROPSTEN_LINK_URL,
//   REACT_APP_ROPSTEN_ENV_URL,
// } from "src/constants";
import { UserContext } from "src/context/User";
import {
  getMarketplaceContractAddress,
  getNetworkDetails,
  networkList,
  REACT_APP_ROPSTEN_LINK_URL,
  REACT_APP_ROPSTEN_ENV_URL,
  REACT_APP_ALCHEMY_API_KEY,
  REACT_APP_MINTER_PK,
  REACT_APP_ROPSTEN_STARK_CONTRACT_ADDRESS,
  REACT_APP_ROPSTEN_REGISTRATION_ADDRESS,
} from "src/constants";

const useStyles = makeStyles((theme) => ({
  customizedButton: {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "red",
  },
  formcontrol1: {
    color: "#fff",
    height: "40px",
    padding: "0px 20px 0px 20px",
    fontSize: "14px",
    borderRadius: "5px",
    backgroundColor: "#0000",
  },
  paper: {
    overflowY: "unset",
  },
  wallet: {
    paddingTop: "20px",
    paddingBottom: theme.spacing(4),
  },
  sectionTitleHead: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    margin: "10px 0 ",
    padding: "0 0",
    width: "100%",
  },
  sectionTitleHead2: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    margin: "10px 0 ",
    padding: "0 0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  metamask: {
    maxWidth: "100%",
    width: "400px",
  },
  selectOption: {
    width: "300px",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    justifyContent: "space-around",
    padding: "0px 24px 0px 3px !important",
    "& .MuiOutlinedInput": {
      root: {
        position: " relative",

        padding: "0px 24px 0px 3px",
      },
    },
  },
  walletSet: {
    padding: "0",
  },
  qrCoce: {
    maxWidth: "100%",
    width: "250px",
  },

  copyQr: {
    maxWidth: "250px",
    display: "flex",
  },
  padding0: {
    padding: "0",
  },
  walletDetails: {
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  walletCss: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media(max-width:768px)": {
      display: "block ",
    },
  },
  boxClass: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #5d5665",
    padding: "8px",
    marginTop: "10px",
    borderRadius: "4px",
    alignItems: "center",
  },
  typographyPage: {
    "@media(max-width:768px)": {
      marginTop: "-20px",
      marginBottom: "-30px",
    },
  },
  btnWidth: {
    width: "250px",
    maxWidth: "100%",
    marginRight: "10px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "0 !important",
      marginBottom: "10px !important",
    },
    "@media(max-width:768px)": {
      width: "172px",
      borderRadius: "22px",
    },
  },
  FollowingBox: {
    height: "300px",
    overflowx: "scroll",
  },
  imgFig: {
    height: "80px",
    width: "80px",
    "@media(max-width:768px)": {
      height: "auto",
    },
  },
  imageTage: {
    position: "relative",
    maxHeight: "87px",
    minHeight: "87px",
    width: "87px",
    marginLeft: "84px",

    "& img": {
      width: "100px !important",
      height: "132px !important",
    },
    "@media(max-width:768px)": {
      marginLeft: "15px",
    },
  },
  TabButtonsBox: {
    borderBottom: "0.5px solid #80808036",
    "& button": {
      color: " #fff",
      padding: "6px 22px",
      borderBottom: "2px solid transparent",
      borderRadius: "0",
      fontFamily: "Roboto !important",
      fontStyle: "normal !important",
      fontWeight: "500 !important",
      fontSize: "17px !important",
      lineHeight: "54px !important",

      "&.active": {
        color: "#fff",
        borderBottom: "2px solid #EA1546",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "6px 17px",
        fontSize: "12px !important",
      },
    },
  },
}));

export default function UsersView() {
  const classes = useStyles();
  const [tabview, setTabView] = useState("cars");
  const [openDepositPage, setopenDepositPage] = useState(false);
  const walletAddres = sessionStorage.getItem("wallet");
  const [profileDetails, setProfileDetails] = useState();
  const [isSubmit1, setIsSubmit1] = useState(false);
  const [addressAmount, setAddressAmount] = useState("");
  const user = useContext(UserContext);
  const [inventory, setInventory] = useState("");
  const ownedNft = JSON.stringify(inventory?.result);

  const userProfileDeatils = async () => {
    try {
      console.log("token=====>>>", sessionStorage.getItem("token"));
      if (sessionStorage.getItem("token")) {
        const res = await axios.get(apiConfig.adminProfile, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setProfileDetails(res.data.result);
          // setIsLoading(false);
        }
      }
    } catch (error) {
      // setIsLoading(false);
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    userProfileDeatils();
  }, []);

  const balance = sessionStorage.getItem("balance");
  const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);
  const [depositAmount, setDepositAmount] = useState();

  const dataDisplauhandler = async () => {
    try {
      const balance = await web3.eth.getBalance(walletAddres);
      const balanceImETH = await web3.utils.fromWei(balance);
      setAddressAmount(parseFloat(balanceImETH).toFixed(2));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (walletAddres) {
      dataDisplauhandler();
    }
  }, [walletAddres]);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const depositETH = async () => {
    setIsSubmit1(true);

    if (depositAmount) {
      // if (balance >= depositAmount) {
      await link.deposit({
        type: ETHTokenType.ETH,
        amount: depositAmount,
      });
      setopenDepositPage(false);
      // } else {
      //   setTimeout(() => {
      //     setTokenDepostMessage(""); // count is 0 here
      //   }, 5000);
      //   setTokenDepostMessage("Your wallet balance is too low");
      //   // setTokenDepostMessage("")
      // }
    }
  };
  useEffect(() => {
    load();
  }, []);

  const wallet = sessionStorage.getItem("wallet");

  const load = async () => {
    setInventory(
      await user?.client.getAssets({ user: wallet, sell_orders: true })
    );
  };

  const addBlackMarketData = async () => {
    try {
      const res = await axios.post(apiConfig.addBlackMarket, {
        data: ownedNft,
      });
      if (res.data.statusCode === 200) {
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    addBlackMarketData();
  }, [ownedNft]);
  const adminTokenAmount = sessionStorage.getItem("mintId");
  const ab = Number(adminTokenAmount) + 1;
  const [mintTokenId, setMintTokenId] = useState("");
  const [tokenAmount, setTokenAmount] = useState();
  const [tokenAmountMessage, setTokenAmountMessage] = useState("");
  const [tokenDepostMessage, setTokenDepostMessage] = useState("");

  const [tokenAmountErrorMessage, setTokenAmountErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const random = () => {
    const min = 1;
    const max = 1000000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <>
      <Box>
        {" "}
        <Box className="usersView">
          <Container maxWidth="lg">
            <figure className="figure">
              <img
                src={"images/background.png"}
                className="img-responsive"
                alt=""
                style={{ width: "100%" }}
              />
            </figure>
          </Container>
          <Container maxWidth="lg">
            <Box p={5}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box className="usersPic">
                    <figure className={classes.imgFig}>
                      <div>
                        {" "}
                        <Avatar
                          className={classes.imageTage}
                          src={
                            profileDetails && profileDetails?.profilePic
                              ? profileDetails?.profilePic
                              : "images/profilepic.png"
                          }
                        />
                      </div>

                      {/* <img
                        className={classes.imageTage}
                        src=// "/images/users/5.png"
                        {
                          profileDetails && profileDetails?.profilePic
                            ? profileDetails?.profilePic
                            : "/images/users/5.png"
                        }
                        className="img-responsive"
                        alt=""
                      /> */}
                    </figure>
                    <Box className="userDetails" textAlign="center">
                      {/* <Typography variant="h4" className="SectionTitle m-b-5">
                        {profileDetails && profileDetails?.name}
                      </Typography> */}
                      <Box className={classes.walletCss} mb={3}>
                        {/* <Typography variant="h6">@4bulls_game </Typography> */}
                        &nbsp;&nbsp;
                        {profileDetails && (
                          <Typography
                            variant="h6"
                            className={classes.typographyPage}
                          >
                            {sortAddress(profileDetails?.walletAddress)}
                            <CopyToClipboard
                              text={profileDetails?.walletAddress}
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
                          </Typography>
                        )}
                      </Box>
                      <Typography variant="h6">
                        {profileDetails && profileDetails?.email}
                      </Typography>
                      &nbsp;
                      <Button
                        style={{ borderRadius: "5px" }}
                        variant="containedPrimary"
                        color="secondary"
                        component={Link}
                        to="/edit-profile"
                      >
                        Edit Profile
                      </Button>
                      {/* <Typography
                        variant="body2"
                        color="primary"
                        style={{ marginTop: 20 }}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. Read More
                      </Typography> */}
                    </Box>
                  </Box>
                  {/* <Box>
                    <Box className={classes.boxClass}>
                      {balance && (
                        <Box
                          style={{
                            position: "relative",
                            color: "#ffffff91",
                            fontSize: "13px",
                            fontWeight: "500",
                          }}
                        >
                          {ethers.utils.formatEther(balance && balance)} ETH
                        </Box>
                      )}

                      <Button
                        onClick={() => setopenDepositPage(true)}
                        style={{
                          minWidth: "54px",
                          padding: "3px 12px",
                          height: "35px",
                          fontSize: "12px ",
                        }}
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Deposit
                      </Button>
                    </Box>
                  </Box> */}
                  {/* <Grid item xs={12} sm={12} lg={12}>
                    <Box mt={2} className="mainBox">
                      <TextField
                        onKeyPress={(event) => {
                          if (
                            event?.key === "-" ||
                            event?.key === "+" ||
                            event?.key === "="
                          ) {
                            event.preventDefault();
                          }
                        }}
                        type="number"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder={`Token id: ${
                          Number(adminTokenAmount) + 1
                        }`}
                        fullWidth
                        name="name"
                        value={mintTokenId}
                        onChange={(e) => setMintTokenId(e.target.value)}
                        error={isSubmit && !mintTokenId}
                        helperText={
                          isSubmit &&
                          !mintTokenId && (
                            <Typography
                              variant="body"
                              style={{
                                fontSize: "13px",
                                fontWeight: "100",
                                marginTop: "4px",
                                marginLeft: "-10px",
                              }}
                            >
                              Token id is required
                            </Typography>
                          )
                        }
                      />
                    </Box>
                  </Grid> */}
                  {tokenAmountErrorMessage && (
                    <Box
                      textAlign="left"
                      ml={1}
                      mt={1}
                      style={{ color: "#ba1f11", fontWeight: 600 }}
                    >
                      {tokenAmountErrorMessage}
                    </Box>
                  )}
                  {tokenAmountMessage && (
                    <Box
                      textAlign="left"
                      ml={1}
                      mt={1}
                      style={{ color: "green", fontWeight: 600 }}
                    >
                      {tokenAmountMessage}
                    </Box>
                  )}

                  {/* <Button
                    style={{
                      marginTop: "20px",
                      borderRadius: "5px",
                    }}
                    onClick={mint}
                    variant="contained"
                    size="large"
                    color="primary"
                  >
                    Create nft
                  </Button> */}
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box
                    className={classes.tabBox}
                    style={{ marginTop: "-14px" }}
                    mb={2}
                  >
                    <Box className={classes.TabButtonsBox}>
                      {/* <Button
                        className={tabview === "participates" ? "active" : " "}
                        onClick={() => setTabView("participates")}
                      >
                        Participants Car
                      </Button>
                      <Button
                        className={tabview === "Owned" ? "active" : " "}
                        onClick={() => setTabView("Owned")}
                      >
                        Owned Car
                      </Button> */}
                      <Button
                        className={tabview === "cars" ? "active" : " "}
                        onClick={() => setTabView("cars")}
                      >
                        Cars
                        {/* <span>Car</span> */}
                      </Button>{" "}
                      <Button
                        className={tabview === "racers" ? "active" : " "}
                        onClick={() => setTabView("racers")}
                      >
                        Racers
                        {/* <span>Car</span> */}
                      </Button>{" "}
                      <Button
                        className={tabview === "parts" ? "active" : " "}
                        onClick={() => setTabView("parts")}
                      >
                        Parts
                        {/* <span>Car</span> */}
                      </Button>
                    </Box>
                    &nbsp;
                    <Grid
                      item
                      container
                      style={{
                        border: "1px solid gray",
                        borderRadius: "15px",
                        padding: "10px 27px 10px 0px",
                        // minWidth: "191px",
                      }}
                    >
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        lg={3}
                        md={3}
                        // style={{ minWidth: "165px" }}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          style={{
                            padding: "0px 24px 0px 3px !important",
                            minWidth: "165px",
                          }}
                        >
                          <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                              >
                                Sort By: All chains
                              </em>
                            </MenuItem>
                            <MenuItem value={10}> Listing</MenuItem>
                            <MenuItem value={20}> Purchases</MenuItem>
                            <MenuItem value={30}> Likes</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        lg={3}
                        md={3}
                        // style={{ minWidth: "165px" }}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          style={{
                            padding: "0px 24px 0px 3px !important",
                            minWidth: "165px",
                          }}
                        >
                          <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                              >
                                Sort By: Price
                              </em>
                            </MenuItem>
                            <MenuItem value={10}> Listing</MenuItem>
                            <MenuItem value={20}> Purchases</MenuItem>
                            <MenuItem value={30}> Likes</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        lg={3}
                        md={3}
                        // style={{ minWidth: "165px" }}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          style={{
                            padding: "0px 24px 0px 3px !important",
                            minWidth: "165px",
                          }}
                        >
                          <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                              >
                                Sort By: Class
                              </em>
                            </MenuItem>
                            <MenuItem value={10}> Listing</MenuItem>
                            <MenuItem value={20}> Purchases</MenuItem>
                            <MenuItem value={30}> Likes</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        lg={3}
                        md={3}
                        // style={{ minWidth: "165px" }}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          style={{
                            padding: "0px 24px 0px 3px !important",
                            minWidth: "165px",
                          }}
                        >
                          <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                              >
                                Sort By: Name
                              </em>
                            </MenuItem>
                            <MenuItem value={10}> Listing</MenuItem>
                            <MenuItem value={20}> Purchases</MenuItem>
                            <MenuItem value={30}> Likes</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        lg={3}
                        md={3}
                        // style={{ minWidth: "165px" }}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          style={{
                            padding: "0px 24px 0px 3px !important",
                            minWidth: "165px",
                          }}
                        >
                          <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                              >
                                Sort By: All chains
                              </em>
                            </MenuItem>
                            <MenuItem value={10}> Listing</MenuItem>
                            <MenuItem value={20}> Purchases</MenuItem>
                            <MenuItem value={30}> Likes</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        lg={3}
                        md={3}
                        // style={{ minWidth: "165px" }}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          style={{
                            padding: "0px 24px 0px 3px !important",
                            minWidth: "165px",
                          }}
                        >
                          <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                              >
                                Sort By: Type
                              </em>
                            </MenuItem>
                            <MenuItem value={10}> Listing</MenuItem>
                            <MenuItem value={20}> Purchases</MenuItem>
                            <MenuItem value={30}> Likes</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        lg={3}
                        md={3}
                        // style={{ minWidth: "165px" }}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          style={{
                            padding: "0px 24px 0px 3px !important",
                            minWidth: "165px",
                          }}
                        >
                          <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                              >
                                Sort By: All chains
                              </em>
                            </MenuItem>
                            <MenuItem value={10}> Listing</MenuItem>
                            <MenuItem value={20}> Purchases</MenuItem>
                            <MenuItem value={30}> Likes</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        lg={3}
                        md={3}
                        style={{ minWidth: "165px" }}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          style={{
                            padding: "0px 24px 0px 3px !important",
                            minWidth: "165px",
                          }}
                        >
                          <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                              >
                                Sort By: All Chains
                              </em>
                            </MenuItem>
                            <MenuItem value={10}> Listing</MenuItem>
                            <MenuItem value={20}> Purchases</MenuItem>
                            <MenuItem value={30}> Likes</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Box className="TabButtonsContant">
                      {tabview === "participates" ? <ParticipateCard /> : ""}
                      {tabview === "Owned" ? <OwnedCar /> : ""}
                      {tabview === "racers" ? <Racers /> : ""}
                      {tabview === "parts" ? <Racers /> : ""}
                      {tabview === "cars" ? <Racers /> : ""}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
      {openDepositPage && (
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={openDepositPage}
          onClose={() => setopenDepositPage(false)}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogActions>
            <CloseIcon
              onClick={() => setopenDepositPage(false)}
              style={{
                width: "1.3em",
                height: "1.3em",
                cursor: "pointer",
                color: "#fff",
              }}
            />
          </DialogActions>
          <DialogContent style={{ padding: "17px" }}>
            <Typography variant="h4" style={{ color: "#fff" }}>
              DEPOSIT
            </Typography>

            <Grid item xs={12} sm={12} lg={12}>
              <Box mt={2} className="mainBox">
                <label className={classes.labeltext} for="fname">
                  Amount (ETH):
                </label>
                {/* &nbsp;&nbsp; */}
                <TextField
                  style={{ marginTop: "7px" }}
                  id="outlined-basic"
                  variant="outlined"
                  placeholder={balance}
                  fullWidth
                  type="number"
                  onKeyPress={(event) => {
                    if (event?.key === "-" || event?.key === "+") {
                      event.preventDefault();
                    }
                  }}
                  name="name"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  error={isSubmit1 && !mintTokenId}
                  helperText={
                    isSubmit1 &&
                    !depositAmount && (
                      <Typography
                        variant="body"
                        style={{
                          fontSize: "13px",
                          fontWeight: "100",
                          marginTop: "4px",
                          marginLeft: "-10px",
                        }}
                      >
                        Deposit amount is required
                      </Typography>
                    )
                    // ||
                    // (isSubmit1 && Number(mintTokenId) == 0 && (
                    //   <Typography
                    //     variant="body"
                    //     style={{
                    //       fontSize: "13px",
                    //       fontWeight: "100",
                    //       marginTop: "4px",
                    //       marginLeft: "0px",
                    //     }}
                    //   >
                    //     Token id is required
                    //   </Typography>
                    // ))
                  }
                />
              </Box>
            </Grid>
            {tokenDepostMessage && (
              <Box
                textAlign="left"
                // ml={1}
                mt={1}
                style={{ color: "#7c1c1c", fontWeight: 600 }}
              >
                {tokenDepostMessage}
              </Box>
            )}
            <Box align="center" className="modal_button_div" mt={4}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={depositETH}
                className={classes.btnWidth}
                mb={2}
              >
                DEPOSIT
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => setopenDepositPage(false)}
                className={classes.btnWidth}
              >
                CANCEL
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
