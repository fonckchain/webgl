import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import Page from "src/component/Page";
import Dialog from "@material-ui/core/Dialog";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {
  copyTextByID,
  getContract,
  getWeb3ContractObject,
  getWeb3Obj,
  swichNetworkHandler,
} from "src/utils";
import { CryptoChipsContract, ACTIVE_NETWORK } from "src/constants";
import CryptoChipsABI from "src/ABI/CryptoChipsABI.json";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  deatailimage: {
    width: "100%",
    height: "50vh",
    display: "flex",
    padding: "50px 0",
    position: "relative",
    background: "linear-gradient(  342deg, #180f07 39%, #30140de8 61%)",
    textAlign: "center",
    justifyContent: "center",
    borderBottom: " 2px solid #E21AE7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
    "& img": {
      filter: " drop-shadow(rgba(0, 0, 0, 0.25) 0px 20px 20px)",
      maxHeight: "100%",
      borderRadius: "10px",
      maxWidth: "100%",
    },
  },

  Padding_Top: {
    paddingTop: "50px",
    backgroundColor: "#fff",
  },
  dialogBox: {
    padding: "30px",
  },
  walletPage: {
    "& h4": {
      fontSize: "50px",
      fontWeight: "600",
      color: "#300760",
      marginBottom: "30px",
      "& span": {
        color: "#f30066",
      },
      [theme.breakpoints.down("lg")]: {
        fontSize: "40px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "27px",
      color: "#7f7f7f",

      "& span": {
        color: "#ec0066",
        cursor: "pointer",
      },
    },
  },
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
  walletBox: {
    background: "#FFFFFF",
    boxShadow: " 0px 4px 8px rgba(0, 0, 0, 0.12)",
    borderRadius: "25px",
    padding: "30px",
    textAlign: "center",
    marginBottom: "50px",
    transition: "02s",
    cursor: "pointer",
    border: "1px solid transparent",
    "&:hover": {
      border: "1px solid #f30065",
    },
    "& p": {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "27px",
      color: "#fafafa",
      textOverflow: "ellipsis",
      maxWidth: "90%",
      overflow: "hidden",
      position: "relative",
    },
  },
  walletdiv: {
    background: "#FFFFFF",
    boxShadow: " 0px 4px 8px rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    padding: "20px 15px",
    position: "relative",
    backgroundColor: "#dedede",
    border: "1px solid transparent",
    overflow: "hidden",
    "& svg": {
      position: "absolute",
      right: "24px",
      fontSize: "80px",
      top: "9px",
      color: "#3c076a40",
      transform: "rotate(-20deg)",
    },
    "& h6": {
      color: "#e21ae7",
    },
    "& h1": {
      color: "#000",
      marginTop: "10px",
    },
    "&:hover": {
      "& .wallet_box": {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
      "& .wallet_box:first-child": {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
    },
  },
  box: {
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    backgroundColor: "#e21ae752",
    position: "absolute",
    top: "100%",
    right: "-150px",
    transition: "0.5s all",
  },
  boxheading: {
    color: "#fff",
    "& h3": {
      fontSize: "30px",
      paddingBottom: 0,
      color: "#e21ae7",
      marginBottom: "10px",
    },
    "& p": {
      fontSize: "16px",
      color: "#fff",
    },
    "&  div": {
      border: "1px solid #fff",
      display: " inline-block",
      padding: "10px 20px",
      borderRadius: "5px",
      marginTop: "20px",
      color: "#fff",
      fontWeight: "600",
      height: "20px",
    },
  },
  filterbox: {
    display: "inline-block",
    flesWarp: "warp",
    minWidth: "90px",
    boxShadow: "rgb(0 0 0 / 13%) 0px 5px 15px",
    border: "1px solid #e21ae7",
    padding: "10px",
    color: "#fff",
    borderRadius: "10px",
    margin: "10px 5px",
    transition: " 02s",
    "&:hover": {
      transform: "translateY(-10px)",
    },
    "& label": {
      fontSize: "15px",
      paddingBottom: 0,
      color: "#e21ae7",
    },
  },
}));

function Wallet(props) {
  const { account, library, chainId } = useWeb3React();
  const user = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [nftDetails, setnftDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [ownerOf, setOwnerOf] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDetails = async (id) => {
    setIsLoading(true);
    try {
      const contract = await getWeb3ContractObject(
        CryptoChipsABI,
        CryptoChipsContract
      );

      const ownerOf_L = await contract.methods.ownerOf(id.toString()).call();
      setOwnerOf(ownerOf_L);

      const filter = await contract.methods.tokenURI(id.toString()).call();
      const res = await axios.get(filter);

      if (res.status === 200) {
        setnftDetails({ id: id.toString(), nfdData: res.data });
        console.log(" res.data", res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (location.search) {
      const ids = location.search.split("?");
      if (ids[1]) {
        getDetails(ids[1]);
      }
    }
  }, [location]);

  const transferFromHandler = async () => {
    if (ACTIVE_NETWORK === chainId) {
      if (transferAddress && transferAddress !== "") {
        const web3 = await getWeb3Obj();
        const dataRes = web3.utils.isAddress(transferAddress);
        if (dataRes) {
          try {
            setIsUpdate(true);
            const contract = getContract(
              CryptoChipsContract,
              CryptoChipsABI,
              library,
              account
            );

            const res = await contract.transferFrom(
              account,
              transferAddress,
              nftDetails.id
            );
            await res.wait();
            toast.success("Success");
            setIsUpdate(false);
            getDetails(nftDetails.id);
            user.getCurrentMintingDetails();
            handleClose();
          } catch (error) {
            setIsUpdate(false);

            toast.error(error.message);
            console.log("error", error);
          }
        } else {
          toast.error("Please enter valid address");
        }
      } else {
        toast.error("Please enter address");
      }
    } else {
      swichNetworkHandler();
    }
  };

  return (
    <Page title="Meta Knight">
      {!isLoading ? (
        <>
          <Container maxWidth="lg">
            <Button
              variant="text"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={() => history.goBack()}
              startIcon={<ArrowBackIosIcon />}
            >
              Back
            </Button>
          </Container>
          {nftDetails ? (
            <Box style={{ backgroundColor: "rgb(0 10 37)" }}>
              <Box
                className={classes.deatailimage}
                style={{ backgroundImage: "url('images/bg-date.png')" }}
                mb={10}
              >
                <Tilt>
                  <img src={nftDetails.nfdData.image} alt="" />
                </Tilt>
              </Box>

              <Container>
                <Box mt={5} pb={7}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box className={classes.boxheading}>
                        <Typography variant="h3">
                          {" "}
                          #{nftDetails.id} - {nftDetails.nfdData.name}{" "}
                        </Typography>
                        <input
                          id={"details_ownerOf"}
                          value={ownerOf}
                          style={{ display: "none" }}
                        />
                        <Typography
                          onClick={() => copyTextByID("details_ownerOf")}
                          variant="body2"
                          style={{ wordBreak: "break-all" }}
                        >
                          <strong>Owned by:</strong> {ownerOf}
                        </Typography>
                        {/* <div>Accumulated NCT: 2566.60</div> <br /> */}

                        {!account && (
                          <Button
                            variant="contained"
                            size="large"
                            color="Primary"
                            style={{ marginTop: "20px" }}
                            onClick={() => user.connectWallet()}
                          >
                            Connect Wallet
                          </Button>
                        )}

                        {ownerOf &&
                          account &&
                          account.toLowerCase() === ownerOf.toLowerCase() && (
                            <Button
                              variant="contained"
                              size="large"
                              color="Primary"
                              style={{ marginTop: "20px" }}
                              onClick={handleClickOpen}
                            >
                              Transfer
                            </Button>
                          )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {nftDetails && nftDetails.nfdData?.attributes && (
                        <Typography variant="h3" style={{ color: "#fff" }}>
                          {" "}
                          Traits{" "}
                        </Typography>
                      )}

                      {nftDetails &&
                        nftDetails.nfdData?.attributes?.map((data, i) => {
                          return (
                            <Box className={classes.filterbox} key={i}>
                              <label>{data.trait_type}</label>
                              <Typography variant="body1">
                                {data.value}
                              </Typography>
                            </Box>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Box>
          ) : (
            <Box mt={5} mb={5} display="flex" justifyContent="center">
              <Typography>No Data Found</Typography>
            </Box>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
            disableBackdropClick={isUpdate}
            disableEscapeKeyDown={isUpdate}
          >
            <DialogContent style={{ backgroundColor: "rgb(0 0 0 / 87%)" }}>
              <Box p={3}>
                <label style={{ color: "#fff" }}>User Wallet ID</label>
                <Box mt={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="User Wallet ID"
                    fullWidth
                    value={transferAddress}
                    disabled={isUpdate}
                    onChange={(e) => setTransferAddress(e.target.value)}
                  />
                </Box>
              </Box>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="primary"
                  style={{ color: "#fff" }}
                  disabled={isUpdate}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  style={{ color: "#e21ae7" }}
                  autoFocus
                  disabled={isUpdate}
                  onClick={() => transferFromHandler()}
                >
                  Transfer {isUpdate && <ButtonCircularProgress />}
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Box mt={5} mb={5} display="flex" justifyContent="center">
          <Typography>Loading...</Typography>
          <ButtonCircularProgress />
        </Box>
      )}
    </Page>
  );
}

export default Wallet;
