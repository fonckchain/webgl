import {
  Box,
  Grid,
  Typography,
  makeStyles,
  Container,
  Button,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { AiOutlineSearch } from "react-icons/ai";

import React from "react";
import { getContract, getWeb3Obj } from "src/utils";
import { TestERCContract } from "src/constants";

import { useWeb3React } from "@web3-react/core";
import TestERCABI from "src/ABI/TestERCABI.json";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  mainBoxText: {
    // paddingTop: "9px",
    "& h3": {
      color: "#ffffff",
      textAlign: "center",
      // fontSize: "48px",
    },
  },
  bankbox: {
    backgroundColor: "#110720",
    padding: "20px",
    borderRadius: "5px",
    "& p": {
      color: "#fff",
    },
    // "@media(max-width:768px)": {
    //   height: "245px",
    // },
  },
  bankboxImage: {
    backgroundColor: "#110720",
    padding: "20px",
    borderRadius: "5px",
    // height: "350px",

    "& p": {
      color: "#fff",
    },
    "@media(max-width:768px)": {
      height: "200px",
    },
  },
  boxcolorr: {
    backgroundColor: "#1D0E33",
    padding: "13px",
    borderRadius: "5px",
    "& h5": {
      color: "#ffffff",
      fontFamily: "Roboto",
      fontSize: "16px",
      textAlign: "center",
    },
  },
  boxcolor: {
    backgroundColor: "#1D0E33",
    // padding: "13px",
    borderRadius: "5px",
    "& h5": {
      color: "#ffffff",
      fontFamily: "Roboto",
      fontSize: "16px",
      textAlign: "center",
    },
    "& button": {
      color: "#ffffff",
      padding: "10px",
    },
  },
}));
export default function BankDetails() {
  const classes = useStyles();
  const { account, library } = useWeb3React();
  const submithandler = async () => {
    const web3 = await getWeb3Obj();
    try {
      const contractObj = getContract(
        TestERCContract,
        TestERCABI,
        library,
        account
      );
      console.log("contractobj---------", contractObj);
      const data = await contractObj.transfer(
        "0x16156b06c8e726F1D6973Cc6562430b39f1A6bd6",
        web3.utils.toWei("5"),
        {
          value: web3.utils.toWei("5"),
        }
      );
      toast.success("Successfully Purchased");
    } catch (err) {
      console.log("erroooooo", err);
    }
  };

  return (
    <Box style={{ backgroundColor: "#1D0E33" }}>
      <Box pt={5} pb={7}>
        <Container>
          <Box className={classes.mainBoxcard}>
            <Box className={`${classes.mainBoxText} subtext`}>
              <Typography variant="h3" style={{ marginBottom: "33px" }}>
                exchange
              </Typography>
            </Box>
            <Grid container spacing={5}>
              <Grid item lg={8} md={8} xs={12}>
                <Box className={classes.bankboxImage}>
                  <Box
                    width="50%"
                    height="50%"
                    style={{
                      margin: "0 auto",
                      padding: "50px 40px 50px 40px ",
                    }}
                  >
                    <img
                      src="images/car2.png"
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Box className={classes.bankbox}>
                  <Typography>Buy Gas Tokens</Typography>
                  <Box style={{ paddingTop: "20px" }}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box>
                        <TextField
                          variant="outlined"
                          fullWidth
                          placeholder="Search"
                        />
                      </Box>
                    </Grid>
                  </Box>
                  <Box pt={2} pb={1}>
                    <Box className={classes.boxcolor}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={submithandler}
                      >
                        BUY
                      </Button>
                    </Box>
                  </Box>
                  {/* <Box pt={5} pb={5}>
                    <Typography style={{ textAlign: "center" }}>
                      $0.00 = @ 500
                    </Typography>
                  </Box> */}
                  {/* <Box>
                    <Box className={classes.boxcolor}>
                      <Button variant="h5" fullWidth>
                        CHECKOUT WITH PAYPAL
                      </Button>
                    </Box>
                  </Box> */}
                  {/* <Box pt={2}>
                    <Box className={classes.boxcolor}>
                      <Button variant="h5" fullWidth>
                        {" "}
                        CHECKOUT WITH STRIPE
                      </Button>
                    </Box>
                  </Box> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
