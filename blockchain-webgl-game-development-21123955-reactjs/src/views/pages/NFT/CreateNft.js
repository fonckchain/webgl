import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  InputBase,
} from "@material-ui/core";

import CollectionCreate from "./CollectionCreate";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { MdAddCircle } from "react-icons/md";
import { CgTimelapse } from "react-icons/cg";
import { HiTag } from "react-icons/hi";
import { GiCancel } from "react-icons/gi";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { useHistory } from "react-router";
import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import {
  addImageHandler,
  approveTokenHandler,
  createNFTBlockchainHanlder,
  createNFTHandler,
  getBase64,
  getDateDiff,
  getTokenId,
  placeOrderAPIHandler,
  placeOrderBlockchainHandler,
  uploadNFTHandler,
} from "src/services/index";
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
import axios from "axios";
import apiConfig from "src/component/config/ApiConfig";
import CollectionCard from "./CollectionCard";
import { toast } from "react-toastify";
import DeployABI from "src/ABI/DeployABI.json";
import MarketPlaceABI from "src/ABI/MarketPlaceABI.json";
import { DataLoading } from "src/component/PageLoading";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import TextField from "@material-ui/core/TextField";
import Stepper from "@material-ui/core/Stepper";
// import { Link } from "react-router-dom";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Slider from "@material-ui/core/Slider";
import { RiTelegramLine } from "react-icons/ri";
import { TiSocialTwitterCircular } from "react-icons/ti";
import {
  Link as ImLink,
  ImmutableXClient,
  ImmutableMethodResults,
  MintableERC721TokenType,
} from "@imtbl/imx-sdk";
import { ethers } from "ethers";

const useStyles = makeStyles((theme) => ({
  mainBoxcreate: {
    padding: "15px",
    border: "1px solid #3d3d3d",
    background:
      "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    backdropFilter: "blur(42px)",
    borderRadius: " 16px",
    "& label": {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "10px",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "0",
    right: "0",
    // color: "#fff",
    color: "#f00",
  },
  paper: {
    overflowY: "unset",
  },
  NftImg: {
    borderRadius: 10,
    display: "block",
    height: "220px",
    position: "relative",
    overflow: "hidden",
    textALign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      maxWidth: "100%",
      maxHeight: "220px",
      width: "auto",
    },
  },
  NftBreed: {
    background: "transparent",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(10),
  },
  PageHeading: {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "39px",
    color: "#898989",
    paddingBottom: "10px",
    display: "flex",
    alignItems: "center",
    "& span": {
      color: "#000",
      lineHeight: "0",
      cursor: "pointer",
      position: "relative",
      "&:hover div": {
        opacity: "1",
      },
      "& svg": {
        paddingLeft: "5px",
        color: "#898989",
      },
    },
  },
  button: {
    marginTop: "10px",
    height: "45px",
    minWidth: "90px",
  },
  createbox: {
    "& .MuiDialog-paperScrollPaper": {
      width: 450,
      maxWidth: 450,
      minWidth: 450,
      [theme.breakpoints.down("sm")]: {
        width: "95%",
        maxWidth: "95%",
        minWidth: "95%",
      },
    },
  },
  innerCollection: {
    position: "absolute",
    width: "calc(100% - 40px)",
    bottom: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "20px 20px 0 0",
    padding: "20px",
    background: "#1a1919",
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
    width: "100%",
    margin: "0 10px",
  },
  sectionTitleHead: {
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
  title: {
    borderBottom: "1px solid #eaeaea",
  },
  ListItem: {
    "& span": {
      fontSize: "20px",
      lineHeight: "30px",
      color: "#f30065",
      fontWeight: "400",
    },
    "& p": {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#898989",
      fontWeight: "400",
    },
  },

  createIcon: {
    width: 100,
    height: 100,
    color: "#222",
  },
  formControl: {
    padding: 0,
    width: "100%",
  },
  walletSet: {
    padding: "0 15px 0 0",
  },
  scrollY: {
    overflowY: "scroll",
    maxHeight: "500px",
    border: "1px solid rgb(33, 27, 40)",
    boxShadow: "rgb(182 180 180 / 15%) 1.95px 1.95px 2.6px",
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
}))(Switch);

export default function ResellNFT() {
  const user = useContext(UserContext);

  const history = useHistory();
  const classes = useStyles();

  // ************************************************  Blockchain function *********************************************************//
  const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);
  const [inventory, setInventory] = useState();
  // minting
  const [mintTokenId, setMintTokenId] = useState("");
  const [mintBlueprint, setMintBlueprint] = useState("");

  const wallet = sessionStorage.getItem("wallet");
  const random = () => {
    const min = 1;
    const max = 1000000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const adminTokenAmount = sessionStorage.getItem("mintId");
  const [isSubmit, setIsSubmit] = useState(false);
  const [tabview, setTabView] = useState("participates");
  const [tokenAmountMessage, setTokenAmountMessage] = useState("");
  const [tokenAmount, setTokenAmount] = useState();
  const [tokenAmountErrorMessage, setTokenAmountErrorMessage] = useState("");

  const mint = async () => {
    setIsSubmit(true);

    if (mintTokenId) {
      setTabView("Owned");
      // initialise a client with the minter for your NFT smart contract
      const provider = new ethers.providers.JsonRpcProvider(
        `https://eth-ropsten.alchemyapi.io/v2/${REACT_APP_ALCHEMY_API_KEY}`
      );
      const minterPrivateKey = REACT_APP_MINTER_PK; // registered minter for your contract
      const minter = new ethers.Wallet(minterPrivateKey).connect(provider);
      const publicApiUrl = REACT_APP_ROPSTEN_ENV_URL;
      const starkContractAddress = REACT_APP_ROPSTEN_STARK_CONTRACT_ADDRESS;
      const registrationContractAddress =
        REACT_APP_ROPSTEN_REGISTRATION_ADDRESS;
      const minterClient = await ImmutableXClient.build({
        publicApiUrl,
        signer: minter,
        starkContractAddress,
        registrationContractAddress,
      });

      // mint any number of NFTs to specified wallet address (must be registered on Immutable X first)
      const token_address = "0xB242F7a0b66111866A5B8F8307a44318f954CeF4"; // contract registered by Immutable
      try {
        const result = await minterClient.mint({
          mints: [
            {
              etherKey: wallet,
              tokens: [
                {
                  type: MintableERC721TokenType.MINTABLE_ERC721,
                  data: {
                    id: mintTokenId, // this is the ERC721 token id
                    blueprint: "imx", // this is passed to your smart contract at time of withdrawal from L2
                    tokenAddress: token_address.toLowerCase(),
                  },
                },
              ],
              nonce: random().toString(10),
              authSignature: "",
            },
          ],
        });
        console.log("mintResult", result);
        console.log(`Token minted: ${result.results[0].token_id}`);
        history.push("/profile");
        setTimeout(() => {
          setTokenAmountMessage(""); // count is 0 here
        }, 5000);
        setTokenAmountMessage(`Token minted: ${result.results[0].token_id}`);
        // toast.success(`Token minted: ${result.results[0].token_id}`);
        setTokenAmount(result.results[0].token_id);
        setIsSubmit(false);
        sessionStorage.setItem("mintId", result.results[0].token_id);
        localStorage.setItem("mintId", result.results[0].token_id);

        // window.sessionStorage.setItem("mintId", result.results[0].token_id);
        setMintTokenId("");
        setInventory(
          await user?.client.getAssets({ user: wallet, sell_orders: true })
        );
      } catch (error) {
        setTimeout(() => {
          setTokenAmountErrorMessage(""); // count is 0 here
        }, 5000);
        setTokenAmountErrorMessage(
          "Please enter valid token id. this is duplicate token id "
        );

        console.log("error>>>>>", error.message);
      }
    }
  };

  return (
    <Box className={classes.NftBreed}>
      {" "}
      <Box>
        <Container maxWidth="md">
          <Grid container spacing={2} className="sectionHeading">
            <Grid item xs={12}>
              &nbsp;&nbsp;&nbsp;
              <Box>
                <Typography variant="h2" style={{ color: "#fc4f4f" }}>
                  Create your NFT
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="order2">
              <Box mb={2}>
                <Box>
                  <Grid item xs={12} sm={12} lg={12}>
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
                  </Grid>
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

                  <Button
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
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {/* featured */}
    </Box>
  );
}
