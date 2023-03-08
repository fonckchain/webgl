import React from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  withStyles,
  makeStyles,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
const useStyles = makeStyles((theme) => ({
  bannerpage: {
    width: "100%",
    height: "500px",
    borderRadius: "40px",
  },
  bannerbox: {
    "@media(max-width:768px)": {
      paddingBottom: "40px",
    },
  },
  bannertext: {
    paddingTop: "9%",
  },
  text1: {
    "& h1": {
      fontSize: "60px",
      color: "#fff",
      fontWeight: "700",
    },
  },
  text2: {
    fontSize: "20px",
    color: "#fff",
  },
  TextField: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #eb0dca",
    height: "45px",
    borderRadius: "5px",
    alignItems: "center",
  },
  sliderr: {
    paddingTop: "30px",
    width: "50%",
    margin: "0 auto",
  },
  textmint: {
    textAlign: "center",
    color: "#eb0dca",
  },
  timebox: {
    width: "100px",
    backgroundColor: "#fff",
    padding: "30px",
  },
  text1: {
    "& h1": {
      fontSize: "60px",
      color: "#fff",
      textAlign: "center",
      fontWeight: "700",
    },
  },
}));
const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
export default function Mint() {
  const classes = useStyles();
  return (
    <Box
      style={{
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid item xs={12} sm={8} lg={6}>
            <Box className={classes.bannertext}>
              <Box>
              <Box className="subtext" textAlign="center">
                    <Typography variant="h3" title="Buy Token">Buy Token</Typography>
                  </Box>
                {/* <Box className={classes.text1}>
                  <Typography variant="h1">Buy Token</Typography>
                </Box> */}
                <Box style={{ paddingTop: "40px" }}>
                  <Typography style={{ color: "#fff" }}>Amount</Typography>
                  <TextField
                    style={{ borderRadius: "0px" }}
                    id="outlined-basic"
                    // label="Outlined"
                    fullWidth
                    variant="outlined"
                  />
                </Box>
                <Box pt={4}>
                  <Typography style={{ color: "#fff" }}>Quantity</Typography>
                  <Box className={classes.TextField}>
                    <Box>
                      <Button style={{ color: "#eb0dca" }}>-</Button>
                    </Box>
                    <Box>
                      <Typography style={{ color: "#fff" }}>5</Typography>
                    </Box>
                    <Box>
                      <Button style={{ color: "#eb0dca" }}>+</Button>
                    </Box>
                  </Box>
                </Box>
                <Box pt={5}>
                  <Button variant="contained" color="primary" fullWidth>
                    Connect Wallet
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} lg={6}>
            <Box fixed className="bannerContent">
              &nbsp;&nbsp;&nbsp;
              <Box className={classes.bannerbox}>
                <img
                  className={classes.bannerpage}
                  src="/images/mintdemo.jpeg"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* <Box className={classes.sliderr}>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={20}
          />
        </Box>
        <Box className={classes.textmint}>
          <Typography variant="h3">170 of 9999 Minted</Typography>
        </Box> */}
      </Container>
    </Box>
  );
}
