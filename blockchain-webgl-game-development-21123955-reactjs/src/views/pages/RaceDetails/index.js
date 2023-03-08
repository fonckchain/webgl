import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { AiFillPlaySquare } from "react-icons/ai"
import PropTypes from "prop-types";
//import Accordian from 'src/views/pages/CarRace/Accordian'
import { useHistory, } from "react-router-dom";

// const columns = [
//   {
//     id: "Name",
//     label: "Name",
//     align: "left",
//     minWidth: "120px",
//     maxWidth: "150px",
//   },
//   { id: "Generation", label: "Generation", align: "left", minWidth: "160px" },
//   { id: " Compare", label: " Compare", align: "left", minWidth: "160px" },
//   { id: "Breed", label: "Breed", align: "left", minWidth: "160px" },
//   { id: "Engine", label: "Engine", align: "left", minWidth: "160px" },
//   { id: "MaxPower", label: "MaxPower", align: "left", minWidth: "160px" },
// ];

let tabelData = [
  {
    Name: "Hyundai Creta",
    Transmission: "Automatic",
    Compare: "Rs. 88.99 Lakhs",
    Mileage: "28.8 Kmpl speed",
    Engine: "Radiator",
    MaxPower: "130bhp@3750rpm",
  },
  {
    Name: "Kia Seltos",
    Transmission: "Manual",
    Compare: "Rs. 35.66 Lakhs",
    Mileage: "27.8 Kmpl speed",
    Engine: "Intercooler",
    MaxPower: "130bhp@3750rpm",
  },
  {
    Name: "Mahindra XUV",
    Transmission: "Automatic",
    Compare: "Rs. 90.33Lakhs",
    Mileage: "17.8 Kmpl speed",
    Engine: "Timing Chain",
    MaxPower: "130bhp@3750rpm",
  },
  {
    Name: "MG Hector",
    Transmission: "Manual",
    Compare: "Rs. 14.65 Lakhs",
    Mileage: "20.8 Kmpl speed",
    Engine: "Spark Plug",
    MaxPower: "130bhp@3750rpm",
  },
  {
    Name: "Tata Harrier",
    Transmission: "Manual",
    Compare: "Rs. 56.12 Lakhs",
    Mileage: "34.8 Kmpl speed",
    Engine: "Clutch Plate",
    MaxPower: "130bhp@3750rpm",
  },
];

const TeamMapResult = [
  {
    raceName: "Super Renault",
    hippodrome: "Seleros'Kmpl",
    distance: "18.00 Kmpl",
    date: "02/02/2022",
    pricePool: "RICE POOL",
  },
  {
    raceName: "Campus Renault",
    hippodrome: "Adem'Super",
    distance: "26.00 Kmpl",
    date: "09/11/2023",
    pricePool: "PRICE POOL",
  },
  {
    raceName: "Championship Car",
    hippodrome: "Stone'Rally",
    distance: "10.00 Kmpl",
    date: "12/09/2021",
    pricePool: "PRICE POOL",
  },
  {
    raceName: "Danish Race",
    hippodrome: "Rellay speed",
    distance: "35.00 Kmpl",
    date: "12/09/2021",
    pricePool: "PRICE POOL",
  },
  {
    raceName: "Rally Finland",
    hippodrome: "Ralley'Race",
    distance: "30.00 Kmpl",
    date: "12/09/2021",
    pricePool: "PRICE POOL",
  },
  {
    raceName: "Motorsport Race ",
    hippodrome: "Stone'Rally",
    distance: "20.8 Kmpl speed",
    date: "12/09/2021",
    pricePool: "PRICE POOL",
  },
  {
    raceName: "Drag Racing",
    hippodrome: "Adem'Super",
    distance: "20.8 Kmpl speed",
    date: "12/09/2021",
    pricePool: "PRICE POOL",
  },
];
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

const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundColor: "#120720",

    paddingTop: "50px",
    paddingBottom: "100px",
    "& h1": {
      fontSize: "50px",
      fontWeight: "400",
      color: "#ffffff",
      textAlign: "center",
      marginBottom: "20px",
    },
    "& p": {
      fontSize: "13px",
      fontWeight: "400",
      color: "#ffffff",
    },
  },
  borderbg: {
    marginBottom: "80px",
  },
  header: {
    background: "transparent",
    boxShadow: "rgb(47 40 47) 0px 5px 15px",
    marginBottom: "5px",
    paddingTop: "15px",
    paddingBottom: "15px",
    "& .MuiTableCell-root": {
      backgroundColor: "#120720",
    },
  },
  NftBreed: {
    backgroundColor: "#fff",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
  },
  menu: {
    maxWidth: "100%",
    marginTop: 53,
  },
  box: {
    boxShadow: "0 0 20px rgb(8 21 66 / 10%)",
  },
  avtar: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  flexGeneration: {
    display: "flex",
    alignItems: "center",
    color: "#300760",
    fontSize: "18px",
  },
  headtext: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#fff",
  },
  boxmain: {
    backgroundColor: "#190A2C",
    paddingTop: "40px",
    paddingBottom: "50px",
    textAlign: "center",
  },
  buttonright1: {
    padding: "10px",
    fontSize: "24px",
    fontWeight: "400",
    textAlign: "center",
    backgroundColor: "#F83838",
    "&:hover": {
      backgroundColor: "#F83838",
    },
  },
  divide: {
    marginTop: "30px",
    marginBottom: "30px",
  },
  dividebox: {
    border: "1px solid #adabab",
  },
  boxcolor: {
    borderRadius: "4px",
    paddingTop: "5px",
    paddingBottom: "5px",
    transform: "matrix(0.94, 0, -0.37, 1, 0, 0)",
    backgroundColor: "rgb(215, 162, 28)",
  },

  boxcolors: {
    borderRadius: "4px",
    paddingTop: "5px",
    paddingBottom: "5px",
    transform: "matrix(0.94, 0, -0.37, 1, 0, 0)",

    backgroundColor: "rgb(192, 122, 71)",
  },
  livebtn: {
    fontSize: " 20px",
    display: "flex",
    alignItems: "center",
    color: " #f83838",
    "& svg": {
      marginTop: "-5px",
      marginRight: "5px",
    },
  },
}));

export default function Race(props) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const handleChange = (Name, newValue) => {
    setValue(newValue);
  };

  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [policy, setPolicy] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  const { data } = props;
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          className="text-center"
          style={{ display: "block" }}
        >
          <Grid item xs={12} md={12}>
            <Paper variant="outlined" elevation={3} style={{ padding: "11px" }}>
              <Box className={classes.boxmain}>
                <Grid container spacing={2}>

                  <Grid item lg={3} md={4} sm={4} xs={12}>
                    <Box>
                      <Typography className={classes.headtext}>
                        ENTRY REQUIREMENTS
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonright}
                      >
                        Open All
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={4} sm={4} xs={12}>
                    <Box>
                      <Typography className={classes.headtext}>
                        RACE NAME
                      </Typography>
                    </Box>
                    <Box mt={3}>
                      <Typography
                        style={{
                          color: "#938989",
                          fontSize: "17px",
                          fontWeight: "500",
                        }}
                      >
                        Beta Race #1679
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={4} sm={4} xs={12}>
                    <Box>
                      <Typography className={classes.headtext}>
                        PRIZE POOL
                      </Typography>
                    </Box>
                    <Box mt={3}>
                      <Typography
                        style={{
                          color: "#938989",
                          fontSize: "17px",
                          fontWeight: "500",
                        }}
                      >
                        73.15DERC
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={4} sm={4} xs={12}>
                    <Box>
                      <Typography className={classes.headtext}>
                        REGISTERED
                      </Typography>
                    </Box>
                    <Box mt={3}>
                      <Typography
                        style={{
                          color: "#938989",
                          fontSize: "17px",
                          fontWeight: "500",
                        }}
                      >
                        73.15DERC
                      </Typography>
                    </Box>
                  </Grid>

                </Grid>
                <Box className={classes.divide}>
                  <Divider className={classes.dividebox} />
                </Box>
                <Box>
                  <Container>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box paddingTop="60px">
                          <img
                            src="./images/car1.png"
                            alt=""
                            width="100%"
                            style={{
                              width: "100%",
                              maxWidth: "400px",
                              margin: "0 auto",
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box
                          textAlign="center"
                          className={classes.carstatus}
                        >
                          <Grid container spacing={2}>
                            <Grid item lg={3} md={3} sm={6} xs={12}>
                              <Box>
                                <Typography className={classes.headtext}>
                                  HIPPODROME
                                </Typography>
                              </Box>
                              <Box>
                                <Typography style={{ color: "#a19898" }}>
                                  Adem's
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={3} md={3} sm={6} xs={12}>
                              <Box>
                                <Typography className={classes.headtext}>
                                  STATUS
                                </Typography>
                              </Box>
                              <Box>
                                <Typography style={{ color: "#a19898" }}>
                                  Open
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={3} md={3} sm={6} xs={12}>
                              <Box>
                                <Typography className={classes.headtext}>
                                  DISTANCE
                                </Typography>
                              </Box>
                              <Box>
                                <Typography style={{ color: "#a19898" }}>
                                  2 Furlongs
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={3} md={3} sm={6} xs={12}>
                              <Box>
                                <Typography className={classes.headtext}>
                                  STARTS AT
                                </Typography>
                              </Box>
                              <Box>
                                <Typography style={{ color: "#a19898" }}>
                                  Dec 31, 2021 3:57 PM
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Box mt={3} align="center">
                            <Typography
                              style={{
                                color: "#fff",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              TOTAL PRIZE POOL OF 22.80 DERC WILL BE SPLIT
                              AS FOLLOWS:
                            </Typography>
                          </Box>
                          <Box>
                            <Grid container>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box mt={2} className={classes.boxcolor}>
                                  <Typography
                                    style={{
                                      color: "#fff",
                                      fontSize: "17px",
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    1st43.20Derc
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box mt={2} className={classes.boxcolors}>
                                  <Typography
                                    style={{
                                      color: "#fff",
                                      fontSize: "17px",
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    2nd6.00Derc
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box mt={2} className={classes.boxcolor}>
                                  <Typography
                                    style={{
                                      color: "#fff",
                                      fontSize: "17px",
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    3rd2.40Derc
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box align="right" mt={3}>
                            <Button className={classes.livebtn}> <AiFillPlaySquare />  LIVE</Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Container>
                </Box>
              </Box>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead className="TableHead">
                    <TableRow>
                      <TableCell
                        style={{
                          backgroundColor: "#190A2C",
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#190A2C",
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                      >
                        Generation
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#190A2C",
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                      >
                        Compare
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#190A2C",
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                      >
                        Engine
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#190A2C",
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                      >
                        MaxPower
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.TableBody}>
                    <TableRow>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data p-l-10"
                      >
                        Hyundai Creta
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Automatic
                        {/* {data.craft} */}
                      </TableCell>

                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Rs. 88.99 Lakhs
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Radiator
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        130bhp@3750rpm
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data p-l-10"
                      >
                        Hyundai Creta
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Automatic
                        {/* {data.craft} */}
                      </TableCell>

                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Rs. 88.99 Lakhs
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Radiator
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        130bhp@3750rpm
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data p-l-10"
                      >
                        Hyundai Creta
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Automatic
                        {/* {data.craft} */}
                      </TableCell>

                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Rs. 88.99 Lakhs
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Radiator
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        130bhp@3750rpm
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data p-l-10"
                      >
                        Hyundai Creta
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Automatic
                        {/* {data.craft} */}
                      </TableCell>

                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Rs. 88.99 Lakhs
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Radiator
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        130bhp@3750rpm
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data p-l-10"
                      >
                        Hyundai Creta
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Automatic
                        {/* {data.craft} */}
                      </TableCell>

                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Rs. 88.99 Lakhs
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        Radiator
                      </TableCell>
                      <TableCell
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        }}
                        className="table-data"
                      >
                        130bhp@3750rpm
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
