import React, { useContext } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Search } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
// import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: "relative",
    background: "#190a2c",
    padding: "50px 0 0px",
  },
  mainbox: {
    backgroundColor: "rgb(13 2 28)",
    height: "105px",
    padding: "20px",
    "& .leftside": {
      backgroundColor: "#110720",
    },
    "& .textbox": {
      padding: "10px 0px 10px",
      backgroundColor: "#1D0E33",
      borderRadius: "5px",
      "& img": {
        width: "100%",
        maxWidth: "75px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "& h6": {
        fontSize: "14px",
        fontWeight: "700",
        textAlign: "center",
        marginTop: "10px",
      },
    },
  },
  formcontrol: {
    height: "46px",
    fontSize: "14px",
    // border: "none",
    padding: "0 6px",
    backgroundColor: "#0d021c",
    color: "#fff",
    borderColor: "#ccc",
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
  carbox: {
    padding: "20px 20px 20px 20px",
    backgroundColor: "#190a2c",
    position: "relative",
    borderRadius: "5px",
  },
  cardcolor: {
    padding: "30px",
    borderRadius: "5px",
    backgroundColor: "#110720",
  },
  formcontrols: {
    // height: "38px",
    fontSize: "14px",
    border: "1px solid #fff",
    // padding: "0 6px",
    backgroundColor: "#0d021c",
    color: "#fff",
    borderColor: "#ccc",
    // width: "215px",
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
    "& svg": {
      color: "#fff !important",
    },
  },
  maiSection: {
    backgroundColor: "rgb(13 2 28)",
    padding: "20px",
  },
  carMain: {
    background: "#1D0E33",
    borderRadius: "5px",
    padding: "20px",
  },
}));
const sideObj = [
  {
    carimg: "images/gastoken.png",
    title: "Gas 500",
  },
  {
    carimg: "images/eth.png",
    title: "0.5 ETH",
  },
  {
    carimg: "images/car.png",
    title: "5 Cars",
  },
  {
    carimg: "images/setting.png",
    title: "3 Parts",
  },
  {
    carimg: "images/racers.png",
    title: "3 Racers",
  },
];
const mainObj = [
  {
    name: "Gas 500",
    carimg: "images/car2.png",
    title: "images/bolt.png",
  },
  {
    name: "Gas 500",
    carimg: "images/car2.png",
    title: "images/bolt.png",
  },
  {
    name: "Gas 500",
    carimg: "images/car2.png",
    title: "images/bolt.png",
  },
  {
    name: "Gas 500",
    carimg: "images/car2.png",
    title: "images/bolt.png",
  },
  {
    name: "Gas 500",
    carimg: "images/car2.png",
    title: "images/bolt.png",
  },
  {
    name: "Gas 500",
    carimg: "images/car2.png",
    title: "images/bolt.png",
  },
  {
    name: "Gas 500",
    carimg: "images/car2.png",
    title: "images/bolt.png",
  },
  {
    name: "Gas 500",
    carimg: "images/car2.png",
    title: "images/bolt.png",
  },
  {
    name: "Gas 500",
    carimg: "images/car2.png",
    title: "images/bolt.png",
  },
];
const wallet = sessionStorage.getItem("wallet");
function Banner() {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();
  const handleChange = (Name, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box style={{}} className={classes.bannerBox}>
        <Container>
          <Box>
            <Grid
              container
              spacing={3}
              style={{ height: "833px", overflow: "auto" }}
            >
              <Grid
                item
                lg={2}
                md={2}
                sm={12}
                xs={12}
                style={{ height: "833px", overflow: "auto" }}
              >
                {sideObj.map((data, i) => {
                  return (
                    <Box className={classes.mainbox}>
                      <Box className="leftside">
                        <Box className="textbox">
                          <Box style={{ cursor: "pointer" }}>
                            <img
                              src={data.carimg}
                              alt=""
                              width="100%"
                              style={{}}
                            />
                          </Box>
                          <Box>
                            <Typography variant="h6">{data.title}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Grid>

              <Grid
                item
                lg={10}
                md={10}
                sm={12}
                xs={12}
                style={{ height: "730px", overflow: "auto" }}
              >
                <Box className={classes.maiSection}>
                  <Grid container spacing={2}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                      {/* <TextField
                        className={classes.formcontrols}
                        // variant="outlined"
                        fullWidth
                        placeholder="Search"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                      /> */}

                      <TextField
                        className={classes.formcontrols}
                        fullWidth
                        placeholder="Search"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment>
                              <IconButton>
                                <SearchIcon
                                  style={{ color: "#fff !important" }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* <Search /> */}
                    </Grid>
                    {/* &nbsp; */}
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Box>
                        <select
                          fullWidth
                          // onChange={(e) => {
                          //   setSelectedFilter(e.target.value);
                          // }}
                          onChange={handleChange}
                          className={classes.formcontrol}
                        >
                          <option value="">Sort By: Type</option>
                          <option
                            value={`["NFT_CREATE", "CREATE_COLLECTION", "ORDER_CREATE"]`}
                          >
                            Listing
                          </option>
                          <option
                            value={`["SEND_NFT", "SEND_ORDER", "ORDER_SELL"]`}
                          >
                            Purchases
                          </option>
                          <option value={`["BID_CREATE"]`}>Bid</option>
                          <option value={`["LIKE", "DISLIKE"]`}>Likes</option>
                          <option value={`["FOLLOW", "UNFOLLOW"]`}>
                            Followings
                          </option>
                        </select>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: "13px" }}>
                    {mainObj.map((data, i) => {
                      return (
                        <Grid
                          item
                          lg={4}
                          md={4}
                          sm={12}
                          xs={12}
                          className="gridview"
                        >
                          <Box
                            className={classes.carbox}
                            // onClick={() => {
                            //   history.push({
                            //     pathname: "/cardetails",
                            //     // search: blackMarket,
                            //     state: {
                            //       data: data?.data?._id,
                            //     },
                            //   });
                            // }}
                          >
                            <Box className={classes.cardcolor}>
                              {/* <Typography style={{ color: "#fff" }}>{data?.text1}</Typography> */}
                              <Box
                                className={classes.bannerImg}
                                style={{ cursor: "pointer" }}
                              >
                                <Box
                                  mt={0}
                                  mb={3}
                                  textAlign="center"
                                  // style={{
                                  //   display: "flex",
                                  //   justifyContent: "center",
                                  //   color: "#FFFFFF",
                                  // }}
                                >
                                  Z20 Stallion
                                </Box>
                                <img
                                  src={data.carimg}
                                  alt=""
                                  style={{ width: "100%", maxHeight: "210px" }}
                                />
                              </Box>
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Box
                                display="flex"
                                justifyContent="start"
                                alignItems="center"
                                style={{
                                  height: "44px",
                                  marginBottom: "0px",
                                  marginTop: "15px",
                                }}
                              >
                                {/* <Box> */}
                                <Typography variant="body1">
                                  {" "}
                                  <img src={data.title} alt="" />
                                  {/* {data.title} */}
                                </Typography>
                                {/* </Box> */}
                                {/* <Box>
                                  <img
                                    src="images/eth.png"
                                    alt=""
                                    style={{ width: "100%", cursor: "pointer" }}
                                  />
                                </Box> */}
                                {/* <Box></Box> */}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Banner;
