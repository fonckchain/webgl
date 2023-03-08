import React from "react";
import { Box, Container, Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TransactionsTable from "src/component/TransactionsTable";
const Upcoming = () => {
  const use = makeStyles((theme) => ({
    root: {
      height: "auto",
      paddingBottom: "55px",
      "@media (max-width:1024px)": {
        paddingTop: "100px",
      },
      "@media (max-width:767px)": {
        paddingTop: "0px",
        paddingBottom: "50px",
      },
    },
    lineborder: {
      width: "100%",
      maxWidth: "400px",
      margin: "0 auto",
    },
    filterBtns: {
      textAlign: "right",
      marginTop: "60px",
      "& button": {
        color: "white",
        minWidth: "80px",
        border: "0.5px solid #1E8F63",
        padding: 0,
        fontSize: "14px",
        transform: "skew( -20deg)",
        background: "rgba(47, 92, 74, 0.4)",
        fontFamily: "Roboto",
        marginRight: " 2px",
        borderRadius: 0,
        height: "40px",
        marginLeft: "5px",
      },
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    selectMenu: {
      border: "1px solid #ccc",
      minWidth: "200px",
      color: "#fff",
    },
    cardBox: {
      position: "relative",
      width: "fit-content",
      // "& img": {
      //   position: "absolute",
      // },
    },
    buttonright: {
      borderRadius: "5px",
      backgroundColor: "#EA1546",
      padding: "12px 35px",
    },
    formcontrol: {
      height: "40px",
      fontSize: "14px",
      padding: "0 6px",
      backgroundColor: "#0000",
      color: "#fff",
      // borderColor: "#ccc",
      width: "100%",
      borderRadius: "5px",
      // border: "1px solid #3d3d3d",
      // background:
      //   "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      "&:focus-visible": {
        outline: "none",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "0px",
      },
    },
    leftSection: {
      color: "#D3D3D3",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "40px",
      "& h3": {
        fontSize: "30px",
        marginLeft: "15px",
        lineHeight: 0,
        [theme.breakpoints.down("xs")]: {
          fontSize: "25px",
          marginLeft: "6px",
          lineHeight: "40px",
        },
      },
    },
  }));
  const classes = use();
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <Box className={classes.root}>
      {/* <Container maxWidth="lg">
        <Box className="subtext" textAlign="center">
          <Typography variant="h3" title="Recent Transactions"> Recent Transactions</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <img
            src="./images/borderbg.png"
            alt=""
            width="100%"
            className={classes.lineborder}
          />
        </Box>
      </Container> */}
      <Container maxWidth="lg">
        <Box className={classes.leftSection}>
          <img src="./images/gec.png" alt="" style={{ width: "35px" }} />
          <Typography variant="h3" title="UPCOMING RACES">
            {" "}
            RECENT ACTIVITY
          </Typography>
        </Box>
        {/* <Box>
            <select
              // onChange={(e) => {
              //   setSelectedFilter(e.target.value);
              // }}
              onChange={handleChange}
              className={classes.formcontrol}
            >
              <option value="">Sort By: Price</option>
              <option
                value={`["NFT_CREATE", "CREATE_COLLECTION", "ORDER_CREATE"]`}
              >
                Listing
              </option>
              <option value={`["SEND_NFT", "SEND_ORDER", "ORDER_SELL"]`}>
                Purchases
              </option>
              <option value={`["BID_CREATE"]`}>Bid</option>
              <option value={`["LIKE", "DISLIKE"]`}>Likes</option>
              <option value={`["FOLLOW", "UNFOLLOW"]`}>Followings</option>
            </select>
          </Box> */}
      </Container>
      <Container maxWidth="lg">
        {/* <Box className={classes.filterBtns}>
          <Button>Token</Button>
          <Button>Cars</Button>
          <Button>Parts</Button>
          <Button>Buy</Button>
          <Button>Sell</Button>
        </Box> */}
        <Box mt={7}>
          <TransactionsTable />
        </Box>
      </Container>
    </Box>
  );
};

export default Upcoming;
