import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableHead,
  makeStyles,
  Grid,
  Box,
  Accordion,
  Paper,
  Button,
  Divider,
  Container,
  Hidden,
} from "@material-ui/core";
import React from "react";

import WinnerCard from "src/component/WinnerCard";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const useStyles = makeStyles((theme) => ({
  mainbox: {},
  bgbox: {
    backgroundColor: "#120720",
    //padding: "10px 10px 10px 10px",
    //border: "1px solid #6C0863",
    borderRadius: "10px",
  },
  header: {
    background: "transparent",
    "& .MuiTableCell-root": {
      backgroundColor: "transparent",
    },
    "& :hover": {
      backgroundColor: "#2c1e3d",
    },
  },
  headtext: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#fff",
  },
  boxmain: {
    backgroundColor: "#21162e",
    paddingTop: "40px",
    paddingBottom: "50px",
    textAlign: "center",
    // borderTopLeftRadius: "45px",
    // borderTopRightRadius: "45px",
  },
  buttonright: {
    padding: "10px 26px",
    fontSize: "24px",
    fontWeight: "400",
    backgroundColor: "#F83838",
  },
  buttonright1: {
    width: "fit-content",
    padding: "20px",
    fontSize: "24px",
    fontWeight: "400",
    backgroundColor: "#F83838",
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
  TableBody: {
    "& .MuiTableCell-root": {
      backgroundColor: "#2c1e3d",
    },
    "& .TableHead": {
      background: "transparent",
      boxShadow: "rgb(47 40 47) 0px 5px 15px",
      marginBottom: "5px",
      backgroundColor: "#2c1e3d",
    },
  },
}));

const WinnerData = [
  {
    image1: "images/car1.png",
    text1: "Car 1",
    text2: "1st Gen",
    text3: " 300 hp",
    text4: "st",
    text5: "31 min 22.20 sec",
  },
  {
    image1: "images/car2.png",
    text1: "Car 2",
    text2: "2nd Gen",
    text3: " 200 hp",
    text4: "nd",
    text5: "35 min 34.33 sec",
  },
  {
    image1: "images/car3.png",
    text1: "Car 3",
    text2: "3rd Gen",
    text3: " 100 hp",
    text4: "rd",
    text5: "36 min 20.67 sec",
  },
];
const WinnerData1 = [
  {
    image1: "images/car3.png",
    name: "Honda",
    generation: "Current ",
    time: "42 min 25.67 sec",
    maxPower: "400hp",
    Engine: "Cylinder Block",
  },
  {
    image1: "images/car3.png",
    name: "Nissan",
    generation: "Previous ",
    time: "46 min 12.17 sec",
    maxPower: "260hp",
    Engine: "Cylinder Head",
  },
  {
    image1: "images/car3.png",
    name: "Volvo",
    generation: "Current",
    time: "48 min 33.44 sec",
    maxPower: "234hp",
    Engine: "Crank Case",
  },
  {
    image1: "images/car3.png",
    name: "Jaguar",
    generation: "Previous",
    time: "49 min 36.65 sec",
    maxPower: "348hp",
    Engine: "Cylinder Liner",
  },
  {
    image1: "images/car3.png",
    name: "Toyota",
    generation: "Current",
    time: "50 min 33.43 sec",
    maxPower: "432hp",
    Engine: "Piston Pin",
  },
  {
    image1: "images/car3.png",
    name: "Lexus",
    generation: "Previous",
    time: "52 min 65.67 sec",
    maxPower: "247hp",
    Engine: "Crank Shaft",
  },
  {
    image1: "images/car3.png",
    name: " Tesla",
    generation: "Current",
    time: "55 min 14.31 sec",
    maxPower: "333hp",
    Engine: "Engine Valves",
  },
];

const columns1 = [
  {
    id: "Place",
    label: "Place",
    align: "left",
    minWidth: "120px",
    maxWidth: "150px",
  },
  { id: "Name", label: "Name", align: "left", minWidth: "160px" },
  { id: "Generation", label: "Generation", align: "left", minWidth: "160px" },
  { id: "Engine", label: "Engine", align: "left", minWidth: "160px" },
  { id: "MaxPower", label: "MaxPower", align: "left", minWidth: "160px" },
  { id: " Time", label: " Time", align: "left", minWidth: "160px" },
];

const RaseCard = (props) => {
  const { data } = props;
  const classes = useStyles();
  return (
    <div>
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Hidden smDown>
            <TableContainer className={classes.header}>
              <Table aria-label="simple table" id="user_list">
                <TableHead>
                  <TableRow>
                    {/* <TableCell component="th" scope="row">
                      <Typography
                        variant="body2"
                        className={classes.buttonright1}
                      >
                        Open for all
                      </Typography>
                    </TableCell> */}
                    <TableCell
                      component="th"
                      style={{ width: "140px" }}
                      scope="row"
                    >
                      <Typography variant="body2">{data.raceName}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body2">{data.hippodrome}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body2">{data.distance}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body2">{data.date}</Typography>
                    </TableCell>

                    <TableCell align="start">
                      <Typography variant="body2">{data.pricePool}</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Hidden>

          <Hidden mdUp>
            <Grid container>
              <Grid item md={6} sm={6} xs={6}>
                <Box textAlign="start">
                  <Typography variant="body1">{data.raceName}</Typography>
                  <Typography variant="body2">{data.hippodrome}</Typography>
                  <Typography variant="body2">
                    <span style={{ fontSize: "10px", color: "" }}>
                      {data.date}
                    </span>
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
                <Box textAlign="end">
                  <Typography variant="body2">{data.distance}</Typography>
                  <Typography variant="body2">{data.date}</Typography>
                  <Typography variant="body2">{data.pricePool}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Hidden>
        </AccordionSummary>

        <AccordionDetails>
          <Grid
            container
            spacing={2}
            className="text-center"
            style={{ display: "block" }}
          >
            <Grid item xs={12} md={12}>
              <Paper
                variant="outlined"
                elevation={3}
                style={{ padding: "11px" }}
              >
                <Box className={classes.boxmain}>
                  <Grid container spacing={2}>
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                      <Box>
                        <Typography className={classes.headtext}>
                          ENTRY REQUIREMENTS
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12}>
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
                    <Grid item lg={3} md={4} sm={6} xs={12}>
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
                    <Grid item lg={3} md={4} sm={6} xs={12}>
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
                      <Grid container alignItems="center">
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Box textAlign="center" pb={5}>
                            <Grid container spacing={2}>
                              <Grid
                                item
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  paddingTop: "12px",
                                }}
                                lg={6}
                                md={6}
                                sm={6}
                                xs={12}
                              >
                                <Grid container spacing={2}>
                                  <Grid item lg={3} md={3} sm={6} xs={12}>
                                    <Box>
                                      <Typography className={classes.headtext}>
                                        HIPPODROME

                                      </Typography>
                                    </Box>
                                    <Box pt={1}>
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
                                    <Box pt={1}>
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
                                    <Box pt={1}>
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
                                    <Box pt={1}>
                                      <Typography style={{ color: "#a19898" }}>
                                        Dec 31, 2021 3:57 PM
                                      </Typography>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item lg={6} sm={6} md={6} xs={12}>
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

                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Container>
                  </Box>
                  <Container >
                <Grid container spacing={3}>
                    {WinnerData.map((data, i) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
                          <WinnerCard data={data} index={i} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Container>
                </Box>
            

                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns1.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            // style={{
                            //   minWidth: column.minWidth,
                            //   backgroundColor: "#190A2C",
                            // }}
                            style={{
                              minWidth: column.minWidth,
                              backgroundColor: "#190A2C",
                              boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.TableBody}>
                      {WinnerData1.map((data, i) => {
                        return (
                          <>
                            <TableRow key={i}>
                              <TableCell
                                style={{
                                  boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                }}
                                className="table-data p-l-10"
                              >
                                <span style={{ fontSize: "23px" }}>
                                  {i + 4}
                                </span>{" "}
                                th
                              </TableCell>
                              <TableCell
                                style={{
                                  boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                }}
                                className="table-data"
                              >
                                {data.name}
                              </TableCell>

                              <TableCell
                                style={{
                                  boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                }}
                                className="table-data"
                              >
                                {data.generation}
                              </TableCell>
                              <TableCell
                                style={{
                                  boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                }}
                                className="table-data"
                              >
                                {data.Engine}
                              </TableCell>
                              <TableCell
                                style={{
                                  boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                }}
                                className="table-data"
                              >
                                {data.maxPower}
                              </TableCell>
                              <TableCell
                                style={{
                                  boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                }}
                                className="table-data"
                              >
                                {data.time}
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default RaseCard;
