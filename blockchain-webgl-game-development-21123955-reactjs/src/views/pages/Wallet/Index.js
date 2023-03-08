import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import Page from "src/component/Page";
import { useHistory } from "react-router-dom";
import { BiCopy } from "react-icons/bi";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import GalleryImage from "src/component/GalleryImage";
import {
  getContract,
  getWeb3Obj,
  copyTextByID,
  swichNetworkHandler,
  getBalanceOf,
} from "src/utils";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import {
  ACTIVE_NETWORK,
  CryptoChipsContract,
  TestERCContract,
} from "src/constants";
import CryptoChipsABI from "src/ABI/CryptoChipsABI.json";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TestERCABI from "src/ABI/TestERCABI.json";

const useStyles = makeStyles((theme) => ({
  deatailimage: {
    width: "100%",
    height: "40vh",
    display: "flex",
    padding: "90px 0 50px",
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
  copy: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: " 0px 4px 8px rgb(0 0 0 / 12%)",
    backgroundColor: " #e21ae7",
    color: "#fff",
    paddingTop: "13px",
    position: "absolute",
    right: "10%",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50px",
    bottom: "-26px",
    [theme.breakpoints.down("xs")]: {
      right: "10px",
      width: "90%",
    },
    "& svg": {
      fontSize: "30px",
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
}));

function Wallet(props) {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const { account, chainId, library } = useWeb3React();
  const [userBalance, setUserBalance] = useState(0);
  const [isUpdatingWithdrwal, setIsUpdatingWithdrwal] = useState(false);
  const [isWhitelistLoading, setIsWhitelistLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addressStr, setAddressStr] = useState("");
  const [isWhitelist, setIsWhitelist] = useState(false);
  const [selectedNFTData, setSelectedNFTData] = useState();
  const [isNameChangeOpen, setIsNameChangeOpen] = useState(false);
  const [newName, setnewName] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isClaimAll, setIsClaimAll] = useState(false);
  useEffect(() => {
    if (!account) {
      history.push("/");
    }
  }, [account]);

  const getContractBalance = async () => {
    const web3 = await getWeb3Obj();
    const bal = await web3.eth.getBalance(CryptoChipsContract);
    let balance = await web3.utils.fromWei(bal);
    setUserBalance(balance);
  };
  useEffect(() => {
    getContractBalance();
  }, []);

  const withdrawHandler = async () => {
    if (ACTIVE_NETWORK === chainId) {
      setIsUpdatingWithdrwal(true);
      try {
        const contract = await getContract(
          CryptoChipsContract,
          CryptoChipsABI,
          library,
          account
        );
        const res = await contract.withdrawAll({
          from: account,
        });
        await res.wait();
        setIsUpdatingWithdrwal(false);
        toast.success("Success");
        getContractBalance();
      } catch (error) {
        setIsUpdatingWithdrwal(false);
        toast.error(error.message);
        console.log("ERROR", error);
      }
    } else {
      swichNetworkHandler();
    }
  };

  const addToWhitelistHandler = async () => {
    if (ACTIVE_NETWORK === chainId) {
      if (addressStr && addressStr !== "") {
        const web3 = await getWeb3Obj();
        const addList = addressStr.split(",");
        console.log("addList", addList);
        for (var i = 0; i < addList.length; i++) {
          const dataRes = web3.utils.isAddress(addList[i]);
          console.log("dataRes", dataRes);
          if (!dataRes) {
            break;
          }
        }
        if (i === addList.length) {
          setIsWhitelistLoading(true);
          try {
            const contract = await getContract(
              CryptoChipsContract,
              CryptoChipsABI,
              library,
              account
            );
            const res = await contract.addToWhitelist(addList, {
              from: account,
            });
            await res.wait();
            setIsUpdatingWithdrwal(false);
            toast.success("Success");
            setIsWhitelistLoading(false);
            setIsOpenModal(false);
            setAddressStr();
          } catch (error) {
            toast.error(error.message);
            console.log("ERROR", error);
            setIsWhitelistLoading(false);
          }
        } else {
          toast.error(
            `Please enter valid address, ${i + 1} number address is wrong `
          );
        }
      } else {
        toast.error("Please enter address");
      }
    } else {
      swichNetworkHandler();
    }
  };

  const removeFromWhitelistHandler = async () => {
    if (ACTIVE_NETWORK === chainId) {
      if (addressStr && addressStr !== "") {
        const web3 = await getWeb3Obj();
        const addList = addressStr.split(",");
        console.log("addList", addList);
        for (var i = 0; i < addList.length; i++) {
          const dataRes = web3.utils.isAddress(addList[i]);
          console.log("dataRes", dataRes);
          if (!dataRes) {
            break;
          }
        }
        if (i === addList.length) {
          setIsWhitelistLoading(true);
          try {
            const contract = await getContract(
              CryptoChipsContract,
              CryptoChipsABI,
              library,
              account
            );
            const res = await contract.removeFromWhitelist(addList, {
              from: account,
            });
            await res.wait();
            setIsUpdatingWithdrwal(false);
            toast.success("Success");
            setIsWhitelistLoading(false);
            setIsOpenModal(false);
            setAddressStr();
          } catch (error) {
            toast.error(error.message);
            console.log("ERROR", error);
            setIsWhitelistLoading(false);
          }
        } else {
          toast.error(
            `Please enter valid address, ${i + 1} number address is wrong `
          );
        }
      } else {
        toast.error("Please enter address");
      }
    } else {
      swichNetworkHandler();
    }
  };

  const updateNamehandler = async () => {
    if (ACTIVE_NETWORK === chainId) {
      if (newName !== "") {
        try {
          const contract = await getContract(
            CryptoChipsContract,
            CryptoChipsABI,
            library,
            account
          );

          const testERCBalance = await getBalanceOf(
            TestERCABI,
            TestERCContract,
            account
          );
          console.log("testERCBalance", testERCBalance);

          setIsUpdatingName(true);
          if (testERCBalance > user.NAME_CHANGE_PRICE) {
            const validateName = await contract.validateName(newName);
            if (validateName) {
              const isNameReserved = await contract.isNameReserved(newName);
              if (!isNameReserved) {
                const changeName = await contract.changeName(
                  selectedNFTData.id,
                  newName
                );
                await changeName.wait();
                user.userNFTListHadler(user.balanceOfValue);

                toast.success("Updated successfully");
                setIsNameChangeOpen(false);
              } else {
                toast.error("Name is reserved");
              }
            } else {
              toast.error("Name is invalid");
            }
          } else {
            toast.error("Balance is low");
          }
          setIsUpdatingName(false);
        } catch (error) {
          setIsUpdatingName(false);

          toast.error(error.message);
        }
      } else {
        toast.error("Please enter name");
      }
    } else {
      swichNetworkHandler();
    }
  };

  const claimAllHandler = async () => {
    if (ACTIVE_NETWORK === chainId) {
      try {
        setIsClaimAll(true);
        const testERCcontract = getContract(
          TestERCContract,
          TestERCABI,
          library,
          account
        );
        const permittedValues = user.userNFTList.map((value) => value.id);
        console.log("permittedValues", permittedValues);
        const claimRes = await testERCcontract.claim(permittedValues);
        await claimRes.wait();
        user.userNFTListHadler(user.balanceOfValue);
        toast.success("Success");
        setIsClaimAll(false);
      } catch (error) {
        toast.error(error.message);
        setIsClaimAll(false);
      }
    } else {
      swichNetworkHandler();
    }
  };

  return (
    <Page title="Wallet">
      <Box style={{ backgroundColor: "rgb(0 10 37)" }} pb={7}>
        <Container maxWidth="lg">
          <Button
            variant="text"
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </Button>
        </Container>
        <Box
          className={classes.deatailimage}
          style={{ backgroundImage: "url('images/bg-date.png')" }}
          mb={10}
        >
          <img
            src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${account}&choe=UTF-8`}
            alt=""
          />
          <Box className={classes.copy}>
            <input
              id={"wallet_WalletAddress"}
              value={account}
              style={{ display: "none" }}
            />
            <Typography
              variant="body1"
              align="center"
              onClick={() => copyTextByID("wallet_WalletAddress")}
            >
              {account}
            </Typography>
            <BiCopy onClick={() => copyTextByID("wallet_WalletAddress")} />
          </Box>
        </Box>

        <Container>
          <Box mt={5} mb={5}>
            <Grid container spacing={3} alignItems="center">
              {/* <Grid item xs={12} sm={12} md={2}></Grid> */}
              {account &&
                user.adminWalletAddress.toLowerCase() ===
                  account.toLowerCase() && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.walletdiv}>
                      <Typography variant="h6">Balance</Typography>
                      <Typography variant="h1">{userBalance}</Typography>
                      <Box className={`${classes.box} wallet_box`}></Box>
                    </Box>
                  </Grid>
                )}
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.walletdiv}>
                  <Typography variant="h6">Owned Crypto Crafts</Typography>
                  <Typography variant="h1">{user.balanceOfValue}</Typography>
                  <Box className={`${classes.box} wallet_box`}></Box>
                </Box>
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.walletdiv}>
                  <Typography variant="h6">Accumulated</Typography>
                  <Typography variant="h1">
                    {parseFloat(user.accumulated).toFixed(4)}
                  </Typography>
                  <Box className={`${classes.box} wallet_box`}></Box>
                </Box>
              </Grid>{" "}
            </Grid>

            <Grid container spacing={3} alignItems="center">
              {/* <Grid item xs={12} sm={12} md={2}></Grid> */}
              {!user.isLoadingUserNFT && (
                <Grid item xs={12} sm={4} md={3}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={() => claimAllHandler()}
                    disabled={isUpdatingWithdrwal || isClaimAll}
                  >
                    Claim All {isClaimAll && <ButtonCircularProgress />}
                  </Button>
                </Grid>
              )}
              {account &&
                user.adminWalletAddress.toLowerCase() ===
                  account.toLowerCase() && (
                  <>
                    <Grid item xs={12} sm={4} md={3}>
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        onClick={() => withdrawHandler()}
                        disabled={isUpdatingWithdrwal || isClaimAll}
                      >
                        Withdraw{" "}
                        {isUpdatingWithdrwal && <ButtonCircularProgress />}
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled={isUpdatingWithdrwal || isClaimAll}
                        onClick={() => {
                          setIsOpenModal(true);
                          setIsWhitelist(true);
                        }}
                      >
                        Add to Whitelisted
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled={isUpdatingWithdrwal || isClaimAll}
                        onClick={() => {
                          setIsOpenModal(true);
                          setIsWhitelist(false);
                        }}
                      >
                        Remove From Whitelisted
                      </Button>
                    </Grid>
                  </>
                )}
            </Grid>

            <Grid container spacing={3} alignItems="center"></Grid>
          </Box>
          <Typography variant="h3" align="center" style={{ color: "#E21AE7" }}>
            ***All NFTs will be displayed once the admin stores their
            Metadata***
          </Typography>
          {user.balanceOfValue == 0 && (
            <Box mt={3}>
              <Typography
                variant="h4"
                align="center"
                style={{ color: "#E21AE7" }}
              >
                No Data Found
              </Typography>
            </Box>
          )}

          <Box mt={8}>
            <Grid container spacing={3}>
              {user.userNFTList.map((data, i) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <GalleryImage
                      data={data}
                      index={i}
                      isNameChange={!user.isLoadingUserNFT}
                      setIsNameChangeOpen={() => setIsNameChangeOpen(true)}
                      setSelectedNFTData={(nftData) =>
                        setSelectedNFTData(nftData)
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* WHITELIST MODAL */}
      {isOpenModal && (
        <Dialog
          open={isOpenModal}
          onClose={() => {
            setAddressStr();
            setIsOpenModal(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
          disableBackdropClick={isWhitelistLoading}
          disableEscapeKeyDown={isWhitelistLoading}
        >
          <DialogContent style={{ backgroundColor: "#000000a1" }}>
            <Box textAlign="center" mt={2}>
              <Typography variant="h6" style={{ color: "#fff" }}>
                {isWhitelist ? "Add To Whitelist" : "Remove From Whitelist"}
              </Typography>
            </Box>
            <Box p={3}>
              {/* <label style={{ color: "#fff" }}>User Wallet ID</label> */}
              <TextField
                id="outlined-basic"
                style={{ color: "#fff" }}
                variant="outlined"
                placeholder="Please enter comma separated address"
                fullWidth
                onChange={(e) => setAddressStr(e.target.value)}
                multiline
                rows={2}
                rowsMax={4}
                inputProps={{
                  style: { color: "#fff" },
                }}
              />
            </Box>
            <DialogActions>
              <Button
                onClick={() => {
                  setIsOpenModal(false);
                  setAddressStr();
                }}
                color="primary"
                style={{ color: "#fff" }}
                disabled={isWhitelistLoading}
              >
                Cancel
              </Button>
              <Button
                disabled={isWhitelistLoading}
                color="primary"
                style={{ color: "#e21ae7" }}
                autoFocus
                onClick={() => {
                  if (isWhitelist) {
                    addToWhitelistHandler();
                  } else {
                    removeFromWhitelistHandler();
                  }
                }}
              >
                Submit {isWhitelistLoading && <ButtonCircularProgress />}
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}

      {/* UPDATE CHANGE */}
      {isNameChangeOpen && selectedNFTData && (
        <Dialog
          open={isNameChangeOpen}
          onClose={() => {
            setSelectedNFTData();
            setIsNameChangeOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
          disableBackdropClick={isUpdatingName}
          disableEscapeKeyDown={isUpdatingName}
        >
          <DialogContent style={{ backgroundColor: "#000000a1" }}>
            <Box textAlign="center" mt={2}>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Update Name
              </Typography>
            </Box>
            <Box p={3}>
              {/* <label style={{ color: "#fff" }}>User Wallet ID</label> */}
              <TextField
                id="outlined-basic"
                inputProps={{
                  style: { color: "#fff" },
                }}
                variant="outlined"
                placeholder="Enter name"
                fullWidth
                onChange={(e) => setnewName(e.target.value)}
              />
            </Box>
            <DialogActions>
              <Button
                onClick={() => {
                  setIsNameChangeOpen(false);
                  setSelectedNFTData();
                }}
                color="primary"
                style={{ color: "#fff" }}
                disabled={isUpdatingName}
              >
                Cancel
              </Button>
              <Button
                disabled={isUpdatingName}
                color="primary"
                style={{ color: "#e21ae7" }}
                autoFocus
                onClick={updateNamehandler}
              >
                Submit {isUpdatingName && <ButtonCircularProgress />}
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </Page>
  );
}

export default Wallet;
