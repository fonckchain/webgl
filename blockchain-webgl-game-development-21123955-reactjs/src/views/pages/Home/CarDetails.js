import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  makeStyles,
  Button,
  TextField,
  AppBar,
  Tabs,
  Tab,
  Avatar,
  Paper,
} from "@material-ui/core";
import FireplaceIcon from "@material-ui/icons/Fireplace";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import PropTypes from "prop-types";
import MarketplaceCard from "src/component/MarketplaceCard";
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundColor: "#120720",
    paddingTop: "80px",
    paddingBottom: "80px",
    "& h2": {
      fontSize: "50px",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "10px",
    },
    "& p": {
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "400",
    },
    "& h5": {
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "400",
    },
    "& h3": {
      fontSize: "50px",
      fontWeight: "700",
      color: "#fff",
      marginTop: "40px",
      marginBottom: "30px",
      textAlign: "center",
    },
  },
  boxppr: {
    backgroundColor: "#190A2C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "200px",
    paddingBottom: "200px",
  },
  icons: {
    backgroundColor: "#FA1C5F",
    color: "#3D122F",
    borderRadius: "50px",
    fontSize: "60px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: "25px",
    marginBottom: "10px",
  },
  flex1: {
    width: "200px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "35px",
    marginBottom: "30px",
  },
  headtext: {
    marginTop: "100px",
  },
  carbox: {
    backgroundColor: "#190A2C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  buttonright: {
    padding: "10px 26px",
    fontSize: "24px",
    fontWeight: "400",
  },
  carmargin: {
    paddingTop: "35px",
  },
  dialogs: {
    "& h3": {
      color: "#fff",
    },
    "& .MuiDialog-paperScrollPaper": {
      background: "#190a2c",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: "#fff",
    },
  },
  TabPanel1: {
    "& .paper": {
      background: "#190a2c",
      // boxShadow: "0 0 0 3px #190a2c, 0 0 0 4px #5c1728",
      boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    },
  },
  chainInfo: {
    "& h5": {
      fontSize: "20px",
    },
    "& h6": {
      fontSize: "20px",
      color: "#fafafa",
      fontWeight: "400",
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const historyOnCard = [
  {
    userName: "Alburt",
    status: "Buy",
    date: "12-02-2022 04:35 PM",
  },
  {
    userName: "Jhon Merjh",
    status: "Liked",
    date: "12-02-2022 04:35 PM",
  },
  {
    userName: "Virru",
    status: "1 edition Added ",
    date: "12-02-2022 04:35 PM",
  },
];

const currentCullection = [
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
];
function Car() {
  const classes = useStyles();
  const location = useLocation();
  const [modalsOnBuy, setModalsOnBuy] = useState();

  const search = location.search
    ? location.search.substring(1, location.search.length)
    : "";
  const data = location.state.data;

  console.log("data", data);

  const [value, setValue] = React.useState(0);

  const handleChange = (Name, newValue) => {
    setValue(newValue);
  };

  const settings = {
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    className: "recomended",
    autoplay: false,
    autoplaySpeed: 3000,
    infinite: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
    ],
  };

  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={5}>
              <Box className={classes.boxppr}>
                <Box className={classes.carmargin}>
                  <img src={data.image1} alt="" width="100%" />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={7}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h2">{data.text1}</Typography>
                  <Typography variant="h5">
                    ID {data.text3}{" "}
                    <FireplaceIcon
                      style={{
                        backgroundColor: "#2081E2",
                      }}
                    />
                  </Typography>
                </Box>
              </Box>
              <Box variant="h2" className={classes.headtext}>
                {/* <Typography>Owner:</Typography> */}
              </Box>

              <Grid container pt={3} className="flex">
                <Grid item lg={6} md={6} sm={6}>
                  <Box>
                    {" "}
                    <Box mb={2} textAlign="start">
                      <Typography>
                        Price: <span style={{ color: "#ffffffab" }}>$ 203</span>
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      className={classes.buttonright}
                      style={{ backgroundColor: "#F83838" }}
                      onClick={() => {
                        setModalsOnBuy(true);
                      }}
                    >
                      Buy
                    </Button>
                  </Box>
                </Grid>{" "}
                <Grid item lg={6} md={6} sm={6}>
                  <Box>
                    {" "}
                    <Box mb={2} textAlign="start">
                      <Typography>
                        Black Price:{" "}
                        <span style={{ color: "#ffffffab" }}>
                          $ {data.bPrice}
                        </span>
                      </Typography>
                    </Box>
                    {/* {search === "" ? (
                    ""
                  ) : (
                    <Button
                      // disableds
                      variant="outlined"
                      // variant="contained"
                      size="large"
                      color="primary"
                      className="blackPrice"
                    >
                      Black Price :{data?.bPrice}
                    </Button>
                  )} */}
                  </Box>
                </Grid>
              </Grid>

              <Box className={classes.chainInfo} pt={3}>
                <Grid container>
                  <Grid item lg={12} sm={12} md={12}>
                    <Typography variant="h5">Chain info</Typography>
                  </Grid>
                  <Grid item lg={6} sm={6} md={6}>
                    <Typography variant="h5">Contracact Address :</Typography>
                  </Grid>
                  <Grid item lg={6} sm={6} md={6}>
                    <Typography variant="h6">
                      0x39705FA80158ea3D25B8229052D139CE803095BD
                    </Typography>
                  </Grid>
                  <Grid item lg={6} sm={6} md={6}>
                    <Typography variant="h5">Token ID</Typography>
                  </Grid>
                  <Grid item lg={6} sm={6} md={6}>
                    <Typography variant="h6"> 129</Typography>
                  </Grid>
                  <Grid item lg={6} sm={6} md={6}>
                    <Typography variant="h5"> Blockchain</Typography>
                  </Grid>
                  <Grid item lg={6} sm={6} md={6}>
                    <Typography variant="h6"> Ethereum</Typography>
                  </Grid>
                </Grid>

                {/* <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.buttonright}
                  style={{ backgroundColor: "#F83838" }}
                  onClick={() => {
                    setModalsOnBuy(true);
                  }}
                >
                  Buy
                </Button> */}
              </Box>

              {/* <Box align="left" mt={5}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.buttonright}
                  style={{ backgroundColor: "#F83838" }}
                >
                 See all stats
                </Button>
              </Box> */}
            </Grid>
          </Grid>
          <Box>
            <Box textAlign="start">
              <Typography variant="h2">Looks properties</Typography>
            </Box>

            <Box>
              <Grid container>
                <Grid item sm={6} lg={6} xs={12}>
                  <Box style={{ backgroundColor: "" }}>
                    <AppBar position="static" style={{ boxShadow: "none" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        style={{
                          color: "#fff",
                          //backgroundColor: '#120720',
                          //borderBottom: '2px solid #ededf1',
                          //borderBottom: '2px solid rgb(25, 10, 44)',
                        }}
                      >
                        <Tab label="Details" {...a11yProps(0)} />
                        <Tab label="History" {...a11yProps(1)} />
                      </Tabs>
                    </AppBar>

                    <Container maxWidth="lg">
                      <TabPanel value={value} index={0}>
                        <Box>
                          <Typography variant="h5">Owner</Typography>
                          <Box className={classes.flex1}>
                            <Avatar src="" />
                            <Typography variant="body2">Owner Name</Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Typography variant="h4">Properties</Typography>

                          <Box className={classes.flex}>
                            <Typography variant="body1">
                              Transmission
                            </Typography>
                            <Typography variant="body1">Manual</Typography>
                          </Box>
                          <Box className={classes.flex}>
                            <Typography variant="body1">Fuel Type</Typography>
                            <Typography variant="body1">Diesel</Typography>
                          </Box>
                          <Box className={classes.flex}>
                            <Typography variant="body1">Body Type</Typography>
                            <Typography variant="body1">SUV</Typography>
                          </Box>
                          <Box className={classes.flex}>
                            <Typography variant="body1">
                              ARAI Mileage
                            </Typography>
                            <Typography variant="body1">16.0 kmpl</Typography>
                          </Box>
                          <Box className={classes.flex}>
                            <Typography variant="body1">
                              City Mileage
                            </Typography>
                            <Typography variant="body1">15.64 kmpl</Typography>
                          </Box>
                        </Box>
                      </TabPanel>

                      <TabPanel value={value} index={1}>
                        {historyOnCard.map((map, i) => {
                          return (
                            <Box pt={3} className={classes.TabPanel1}>
                              <Paper className="paper">
                                <Grid container>
                                  <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <Box>
                                      <img src={data.image1} alt="" />
                                    </Box>
                                  </Grid>
                                  <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <Box>
                                      <Typography variant="h4">
                                        {data.text1}
                                      </Typography>
                                      <Grid container>
                                        <Grid item lg={6} md={6} sm={4}>
                                          <Typography variant="body1">
                                            {map.status} By :{" "}
                                          </Typography>
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={4}>
                                          <Avatar src="" alt="" />
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={4}>
                                          <Typography
                                            display="flex"
                                            variant="body1"
                                          >
                                            {map.userName}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                      <Box pt={2}>
                                        <Typography variant="h5">
                                          {map.date}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Box>
                          );
                        })}
                      </TabPanel>
                    </Container>
                  </Box>
                </Grid>
                <Grid item sm={6} lg={6} xs={12}>
                  {" "}
                  <Box>
                    <Typography variant="h3">
                      More from this simillar
                    </Typography>
                    <Grid container spacing={2}>
                      <Slider {...settings} className="width100">
                        {currentCullection?.map((data, i) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              md={12}
                              lg={12}
                              sm={12}
                              key={i}
                              className="walletSet"
                            >
                              <MarketplaceCard
                                data={data}
                                // bidAccpet={bidAccpet()}
                                type="timing"
                                index={i}
                              />
                            </Grid>
                          );
                        })}
                      </Slider>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>

      {modalsOnBuy && (
        <Dialog
          maxWidth="md"
          // onEntering={handleEntering}
          aria-labelledby="confirmation-dialog-title"
          open={modalsOnBuy}
          className={classes.dialogs}
        >
          <DialogTitle>
            <Typography variant="h3">Buy Now</Typography>
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              width="300px"
              variant="outlined"
              // fullWidth
              defaultValue="5"
              label="Price"
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => setModalsOnBuy(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => setModalsOnBuy(false)} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        // <Modal
        //   open={modalsOnBuy}
        //   // onClose={handleClose}
        //   aria-labelledby="simple-modal-title"
        //   aria-describedby="simple-modal-description"
        // >
        //   {/* {body} */}
        //   <Typography variant="h6">Buy</Typography>

        //   <Divider />
        //   <TextField variant="outlined" label="5" />
        //   <Button
        //     autoFocus
        //     onClick={() => setModalsOnBuy(false)}
        //     color="primary"
        //   >
        //     Cancel
        //   </Button>
        //   <Button onClick={() => setModalsOnBuy(false)} color="primary">
        //     Ok
        //   </Button>
        // </Modal>
      )}
    </Box>
  );
}

export default Car;
