// import React, {useContext, } from "react";
import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import TeamCard from "src/component/TeamCard";
import Slider from "react-slick";
import { UserContext } from "src/context/User";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import FormControl from "@material-ui/core/FormControl";

import apiConfig from "../../../component/config/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import NoDataFound from "src/views/pages/NoDataFound";
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: "50px 0px",
    padding: "20px",
    // backgroundImage: "url(./images/redimg.png)",
    backgroundColor: "#1D0E33",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "528px",
  },
  textbox: {
    "& h1": {
      fontSize: "50px",
      fontWeight: "400",
      color: "#fff",
      [theme.breakpoints.down("md")]: {
        fontSize: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontSize: "16px",
      marginTop: "20px",
      color: "#fff",
    },
  },
  cotext: {
    textAlign: "center",
    "& h6": {
      color: "#ffffff",
      fontSize: "120px",
      fontWeight: "700",
      transform: "matrix(0.94, 0, -0.27, 1, 0, 0)",
      lineHeight: "120px",
      display: "inline-block",
      [theme.breakpoints.down("md")]: {
        fontSize: "80px",
      },
    },
    "& h2": {
      fontSize: "60px",
      fontWeight: "700",
      color: "#ffffff",
      lineHeight: "60px",
      marginTop: "20px",
    },
  },
  logobox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-170px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px",
    },
    "& img": {
      width: "100%",
      maxWidth: "50%",
      [theme.breakpoints.down("md")]: {
        maxWidth: "80%",
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
    },
  },
  buttonright: {
    transform: "skew(  -20deg)",
    textTransform: "capitalize",
  },
  leftSection: {
    color: "#fff",
    display: "flex",
    [theme.breakpoints.only("xs")]: {
      alignItems: "center",
    },
  },
  topBar: {
    // paddingBottom: "50px",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-between",
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
  mediaq: {
    marginTop: "33px",
    // "@media(max-width:950px": {
    //   marginButton: "33px",
    // },
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
}));
const TeamMap = [
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
  {
    text1: "Z20 Stallion",
    price: "0.05",
  },
];
export default function () {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [select, setSelect] = useState("");
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);

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
  const user = useContext(UserContext);
  const [inventory, setInventory] = useState("");
  const ownedNft = JSON.stringify(inventory?.result);

  console.log("ownedNft", ownedNft);
  console.log("inventory.result", inventory.result);

  const [age, setAge] = React.useState("");
  const [blackMarket, setblackMarket] = React.useState("Black Market");
  const [value, setValue] = React.useState(30);
  const [loader1, setloader1] = React.useState(false);

  const wallet = sessionStorage.getItem("wallet");
  const [formData, setFormData] = useState({});
  const _onInputChange = (e) => {
    const temp = { ...formData, [e.target.name]: e.target.value };
    setFormData(temp);
  };
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setInventory(
      await user?.client.getAssets({ user: wallet, sell_orders: true })
    );
  };

  const [allCollection, setAllCollection] = useState([]);

  console.log("allCollection", allCollection);

  const listBlackMarket = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(apiConfig.listBlackMarket, {
        params: { page: page },
      });

      if (response.data.statusCode === 200) {
        setAllCollection();
        setIsLoading(false);
        setNoOfPages(response.data.result.pages);

        setAllCollection(response.data.result.docs);
        setIsLoading(false);
      }
      console.error("meesse");
    } catch (err) {
      setAllCollection();
      setIsLoading(false);
      console.error(err.response);
    }
  };
  useEffect(() => {
    listBlackMarket();
  }, [page]);

  // const auth = useContext(UserContext);
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
    pauseOnHover: true,
    arrows: false,
    // infinite: auth.upcommingPoolList.length > 3,
    speed: 7000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerPadding: "50px",
          autoplay: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
          autoplay: true,
        },
      },
    ],
  };
  return (
    <Box className={classes.aboutsection}>
      <Box className={classes.mediaq}>
        <Container maxWidth="lg">
          <Box className={classes.topBar}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                {" "}
                <Box className={classes.leftSection}>
                  <Box>
                    <img src="./images/flagnew.png" alt="" />
                  </Box>
                  <Box className="subtext">
                    <Typography variant="h3" title="UPCOMING RACES">
                      {" "}
                      Marketplace
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Grid container spacing={2} style={{ marginTop: "-6px" }}>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    {/* <select
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
                      </select> */}
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      style={{
                        padding: "0px 24px 0px 3px !important",
                        width: "100%",
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
                          <em style={{ fontFamily: "'Roboto', sans-serif" }}>
                            Sort By: Price
                          </em>
                        </MenuItem>
                        <MenuItem value={10}> Listing</MenuItem>
                        <MenuItem value={20}> Purchases</MenuItem>
                        <MenuItem value={30}> Likes</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    {/* <Box className="textfeildbox"> */}
                    {/* <label>Promote Request</label> */}
                    {/* <Select
                        className={classes.inputfield}
                        name="promoteRequest"
                        value={formData.promoteRequest}
                        onChange={_onInputChange}
                        labelId="label"
                        id="select"
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                        fullWidth
                      >
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                      </Select> */}
                    {/* </Box>{" "} */}
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
                    </Box> */}
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      style={{
                        padding: "0px 24px 0px 3px !important",
                        width: "100%",
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
                          <em style={{ fontFamily: "'Roboto', sans-serif" }}>
                            Sort By: Price
                          </em>
                        </MenuItem>
                        <MenuItem value={10}> Listing</MenuItem>
                        <MenuItem value={20}> Purchases</MenuItem>
                        <MenuItem value={30}> Likes</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box></Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <>
        {isLoading ? (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <ButtonCircularProgress />
          </Box>
        ) : (
          <Box pt={3}>
            <Container maxWidth="lg">
              {allCollection && allCollection.length > 0 ? (
                <Grid container spacing={4}>
                  {allCollection &&
                    allCollection.map((data, i) => {
                      console.log("data", data);
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          key={i}
                          className="gridview"
                        >
                          <TeamCard data={data} index={i} isUpcomming={true} />
                        </Grid>
                      );
                    })}
                </Grid>
              ) : (
                <NoDataFound />
              )}
              {allCollection && allCollection.length != 0 && (
                <Box
                  className={classes.tabBtn}
                  pt={5}
                  display="flex"
                  justifyContent="end"
                >
                  <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={(e, v) => setPage(v)}
                  ></Pagination>
                </Box>
              )}
            </Container>
          </Box>
        )}
      </>
    </Box>
  );
}
