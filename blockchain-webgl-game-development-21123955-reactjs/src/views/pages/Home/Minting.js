import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import Tilt from "react-parallax-tilt";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import LazyLoad from "react-lazyload";
import { getWeb3Obj, getContract, swichNetworkHandler } from "src/utils";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK, CryptoChipsContract } from "src/constants";
import CryptoChipsABI from "src/ABI/CryptoChipsABI.json";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
function valuetext(value) {
  return `${value}°C`;
}
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    paddingTop: "150px",
    paddingBottom: "30px",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      paddingTop: "60px",
      paddingBottom: "30px",
    },
  },
  textbox: {
    "& h1": {
      fontSize: "70px",
      fontWeight: "800",
      color: "#fff",
      [theme.breakpoints.down("md")]: {
        fontSize: "60px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontSize: "14px",
      marginTop: "20px",
      color: "#fff ",
    },
  },
  slider: {
    marginTop: "130px",
    width: "100%",
    margin: "0 auto ",
    maxWidth: "70%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      marginTop: "0px",
    },
    "& h3": {
      fontSize: "35px",
      fontStyle: "italic",
      color: "#E21AE7",
      fontWeight: "600",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  amount: {
    "& label": {
      color: "#fff",
      fontSize: "18px",
      marginBottom: "10px",
    },
  },
  amountdiv: {
    maxWidth: "100%",
    height: "60px",
    border: "1px solid #00ffab",
    borderRadius: " 5px",
    display: "flex",
    padding: "0 20px",
    alignItems: "center",
    fontSize: "45px",
  },
  quantity: {
    maxWidth: "100%",
    display: "flex",
    height: "51px",
    border: "1px solid #eb0dca",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "5px",
    "& button": {
      fontSize: "20px",
      color: "#fff",
      "&:first-child": {
        color: "#eb0dca",
      },
      "&:last-child": {
        color: "#eb0dca",
      },
    },
    "& input": {
      textAlign: "center",
      backgroundColor: "transparent",
      color: "#fff",
      border: "none",
      fontSize: "15px",
      width: "30%",
      "&:focus-visible": {
        outline: "none",
      },
      "&::placeholder": {
        color: "#fff",
      },
    },
  },
}));

export default function BestSeller() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account, library, chainId } = useWeb3React();
  const [numberofnft, setNumberofnft] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    setAmount(numberofnft * user.nftPrice);
  }, [numberofnft, user.nftPrice]);

  const mintNFT = async () => {
    if (ACTIVE_NETWORK === chainId) {
      if (account && numberofnft && numberofnft !== "") {
        if (
          parseFloat(user.totalSupply) + parseFloat(numberofnft) <=
          parseFloat(user.MAX_NFT_SUPPLY)
        ) {
          if (
            parseFloat(numberofnft) + parseFloat(user.balanceOfValue) <=
            parseFloat(user.MAX_NFT_WALLET)
          ) {
            setIsLoading(true);
            try {
              const web3 = await getWeb3Obj();
              var balance = await web3.eth.getBalance(account);
              var walletBalance = await web3.utils.fromWei(balance.toString());
              console.log("balance", balance);
              console.log("walletBalance", walletBalance);
              console.log("amount", amount);

              if (parseFloat(walletBalance) > parseFloat(amount)) {
                const contract = getContract(
                  CryptoChipsContract,
                  CryptoChipsABI,
                  library,
                  account
                );
                console.log("contract", contract);

                if (user.hasFinalSaleStarted) {
                  const tx = await contract.mintNFT(numberofnft, {
                    value: web3.utils.toWei(amount.toString()).toString(),
                    gasLimit: 3000000,
                    from: account,
                  });
                  await tx.wait();
                  console.log(tx);
                  toast.success("Successfully minted");
                } else {
                  const checkIfWhitelisted = await contract.checkIfWhitelisted(
                    account
                  );
                  if (checkIfWhitelisted) {
                    if (user.reservedClaimed != user.RESERVED_NFT) {
                      const tx = await contract.reserveMINT(numberofnft, {
                        value: web3.utils.toWei(amount.toString()).toString(),
                        gasLimit: 3000000,
                        from: account,
                      });
                      await tx.wait();
                      console.log(tx);
                      toast.success("Successfully minted");
                    } else {
                    }
                  } else {
                    toast.warn("Address is not whitelisted");
                  }
                }
              } else {
                toast.warn("Insufficient funds");
              }

              setIsLoading(false);
              user.getCurrentMintingDetails();
            } catch (error) {
              setIsLoading(false);
              console.log("ERRROR", error);
              toast.error(error.message);
            }
          }
        } else {
          toast.error("Minting would exceed max supply");
        }
      } else {
        toast.error("Purchase exceeds max allowed per wallet");
      }
    } else {
      swichNetworkHandler();
    }
  };

  return (
    <Box className={classes.aboutsection}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={12} md={5} className="wow bounceInUp">
            <Box className={classes.textbox} mb={5}>
              <Typography variant="h1" align="left">
                {" "}
                {user.hasFinalSaleStarted ? "Public Sale" : "Presale"}
              </Typography>
              <Box mt={5} mb={5} className={classes.amount}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <label>Amount</label>
                    <Box mt={1}>
                      {" "}
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        readOnly
                        value={amount}
                        disabled={isLoading}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <label>Quantity</label>
                    <Box className={classes.quantity} mt={1}>
                      <Button
                        variant="outline"
                        color="secondary"
                        size="small"
                        disabled={isLoading}
                        onClick={() => {
                          if (numberofnft > 1) {
                            setNumberofnft(numberofnft - 1);
                          }
                        }}
                      >
                        -
                      </Button>
                      <input
                        type="text"
                        readOnly
                        placeholder="2"
                        value={numberofnft}
                        disabled
                      />
                      <Button
                        variant="outline"
                        color="secondary"
                        size="small"
                        disabled={isLoading}
                        onClick={() => {
                          if (numberofnft < user.MAX_MINT) {
                            setNumberofnft(numberofnft + 1);
                          }
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={5}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                  onClick={() => {
                    if (account) {
                      mintNFT();
                    } else {
                      user.connectWallet();
                    }
                  }}
                >
                  {account ? "MINT NOW" : "Connect wallet"}{" "}
                  {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={1}></Grid>
          <Grid item xs={12} sm={12} md={6} style={{ position: "relative" }}>
            <Tilt>
              <div className="image1 wow flipInX">
                <LazyLoad>
                  <img src="images/Serenheart_Hero.gif" alt="" />
                </LazyLoad>{" "}
              </div>
            </Tilt>
            <Tilt className="image2 wow bounceInRight">
              {" "}
              <LazyLoad>
                <img src="images/Mint/2.png" alt="" />
              </LazyLoad>{" "}
            </Tilt>
            <Tilt className="image3 wow bounceInLeft">
              <LazyLoad>
                <img src="images/Mint/3.png" alt="" />{" "}
              </LazyLoad>{" "}
            </Tilt>
            <Tilt className="image4 wow lightSpeedIn">
              {" "}
              <LazyLoad>
                <img src="images/Mint/4.png" alt="" />
              </LazyLoad>{" "}
            </Tilt>
          </Grid>
        </Grid>
        <Box className={classes.slider} mb={5}>
          <Box mb={3}>
            <Slider
              value={user.totalSupply}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={user.MAX_NFT_SUPPLY}
              disabled
            />
          </Box>
          <Typography variant="h3" align="center">
            {" "}
            {user.totalSupply} of {user.MAX_NFT_SUPPLY} Knights Minted
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
