import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  Modal,
  Container,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import RaceDetails from "src/component/RaceDetails";
import CloseIcon from "@material-ui/icons/Close";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RaceResultCard from "src/component/RaceResultCard";
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundColor: "#1d0e33",
    // paddingTop: "50px",
    paddingBottom: "20px",
    padding: "20px",
  },

  maintext: {
    fontFamily: "'Dismedia'",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "18px",
  },
  rowBox: {
    backgroundColor: "#190a2c",
    "&:hover": {
      backgroundColor: "#2c1e3d",
    },
  },
  tableHead: {
    backgroundColor: "#1d0e33",
    "& tr ": {
      "& th": {
        fontSize: "14px",
        fontStyle: "normal",
        fontFamily: "'Roboto'",
        fontWeight: "500",
        lineHeight: "21px",
        textAlign: "left",
      },
    },
  },
  formControl: {
    height: "45px",
    backgroundColor: "#120720",
    color: "#fff",
    border: "1px solid #ccc6",
    width: "100%",
    padding: "0 10px",
    "&:focus-visible": {
      outline: "none",
    },
  },
  updateContent: {
    // background: "#1D0E33",
    color: "#fff",
    padding: "25px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h6": {
      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "30px",
      lineHeight: "37px",
      color: "#FFFFFF",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
      "@media(max-width:600px)": {
        fontSize: "25px",
      },
      "@media(max-width:441px)": {
        fontSize: "20px",
      },
    },
  },
  imgSection: {
    background: "#110720",
    borderRadius: "5px",

    height: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  btnSection: {
    marginTop: "3rem",
    "@media(max-width:800px)": {
      display: "flex",
    },

    "& button": {
      background: "#FF2E5F",
      borderRadius: "5px",
      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "37px",
      textAlign: "center",
      color: "#FFFFFF",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
      padding: "7px 50px",
      "&:hover": {
        background: "gray",
      },
    },
    "& #btn-again": {
      background: "#47DF00",
      borderRadius: "5px",
      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "37px",
      textAlign: "center",
      color: "#FFFFFF",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
      padding: "7px 50px",
    },
  },
  mainBoxContent: {
    paddingBottom: "2rem",
  },
  contentGroupSection: {
    "& h6": {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "28px",

      color: "#FFFFFF",
      paddingTop: "2rem",
    },
  },
  regBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0.5rem",
    marginBottom: "1.5rem",

    "& button": {
      background: "#EA1546",
      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "18px",
      display: "flex",
      alignItems: "center",
      color: "#FFFFFF",
      padding: "15px",
      letterSpacing: ".7px",
      "&:hover": {
        background: "gray",
      },
    },
  },
  selectCarSection: {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    "& h6": {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "28px",
      color: "#FFFFFF",
    },
    "& h5": {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "25px",
      lineHeight: "42px",
      color: "#FFFFFF",
    },
    "& img": {
      width: "35px",
      height: "35px",
    },
  },
  tableheadText: {},
}));

const datamap = [
  { text1: "Racer #1241", image: "image", text2: "1ST PLACE", text3: "3.00" },
  { text1: "Racer #1241", image: "image", text2: "2ST PLACE", text3: "2.00" },
  { text1: "Racer #1241", image: "image", text2: "3ST PLACE", text3: "1.00" },
];
const carData = [
  {
    imgage: "images/car2.png",
  },
  {
    imgage: "images/car2.png",
  },
  {
    imgage: "images/car2.png",
  },
  {
    imgage: "images/car2.png",
  },
  {
    imgage: "images/car2.png",
  },
  {
    imgage: "images/car2.png",
  },
];

const useRowStyles = makeStyles({
  root: {
    backgroundColor: "#110720",
    // padding: "20px",
    "& td": {
      //   borderBottom: "20px solid #1d0e33 !important",
      padding: "20px 10px",
      fontSize: "13px",
      textAlign: "left",
    },
    "& > *": {
      borderBottom: "unset",
    },
    "&:hover": {
      backgroundColor: "#2c1e3d",
    },
  },
  boxmain: {
    backgroundColor: "#21162e",
    paddingTop: "40px",
    textAlign: "center",
  },
  divide: {
    marginTop: "30px",
    marginBottom: "30px",
  },
  dividebox: {
    border: "1px solid #3e3549",
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
  headtext: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#fff",
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
  btnJoin: {
    color: "white",
    fontSize: "12px",
    background: "rgba(152, 0, 0, 0.33)",
    border: "2px solid #FF0000",
    fontFamily: "Roboto",
    marginRight: "16px",
    "@media(max-width:768px)": {
      fontSize: "10px",
    },
  },
  tabltbtn: {
    color: "#fff",
    background: "#1D0E33",
    fontFamily: "'Dismedia'",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "18px",
    padding: "10px 0px 6px 0px",
  },
});
function Row(props) {
  const { row, setUpdateWinningOpen, updateWinningOpen } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  console.log("updateWinningOpen", updateWinningOpen);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: " 12px", height: "40px" }}
              >
                {" "}
                Open for all
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: " 12px", height: "40px" }}
              >
                {" "}
                Open for all
              </Button>
            )}
          </IconButton>
        </TableCell> */}
        <TableCell scope="row" align="center">
          {/* {row.name} */}
          <Button
            variant="contained"
            className={classes.tabltbtn}

            // style={
            //   row.Race === "1ST"
            //     ? { background: "#FF2F60", height: "29px" }
            //     : row.Race === "2ND"
            //     ? { background: "#00FFF3", height: "29px" }
            //     : row.Race === "3RD"
            //     ? { background: "#FF00FF", height: "29px" }
            //     : { background: "#1D0E33", height: "29px" }
            // }
            // style={row.Race === "2ND" ? { background: "green" } : {}}
            // style={row.Race === "3RD" ? { background: "blue" } : {}}
          >
            6TH
          </Button>
        </TableCell>
        <TableCell
          align="center"
          style={{
            fontFamily: "'Dismedia'",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "18px",
          }}
        >
          {row.calories}
        </TableCell>
        <TableCell
          align="center"
          style={{
            fontFamily: "'Dismedia'",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "18px",
          }}
        >
          {row.fat}
        </TableCell>
        <TableCell
          align="center"
          style={{
            fontFamily: "'Dismedia'",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "18px",
          }}
        >
          {row.carbs}
        </TableCell>
        {/* <TableCell align="center">{row.protein}</TableCell>
        <TableCell align="center">{row.protein}</TableCell> */}
        {/* <TableCell align="center">
          <Button
            className={classes.btnJoin}
            onClick={() => setUpdateWinningOpen(true)}
          >
            Join Race
          </Button>
        </TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <RaceDetails />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
function Row1(props) {
  const { row, setUpdateWinningOpen, updateWinningOpen } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  console.log("updateWinningOpen", updateWinningOpen);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell scope="row" align="center">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
        {/* <TableCell align="center">{row.protein}</TableCell>
        <TableCell align="center">{row.protein}</TableCell> */}
        {/* <TableCell align="center">
          <Button
            className={classes.btnJoin}
            onClick={() => setUpdateWinningOpen(true)}
          >
            Join Race
          </Button>
        </TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <RaceDetails />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("ABC", "1st", "1500m", "$2400", "4.0", "4"),
  createData("ABC", "1st", "1500m", "$2400", "4.0", "4"),
  createData("ABC", "1st", "1500m", "$2400", "4.0", "4"),
  createData("ABC", "1st", "1500m", "$2400", "4.0", "4"),
];
const rows1 = [createData("ABerC", "1sertet", "1500m", "$2400", "4.0", "4")];
export default function CollapsibleTable() {
  const [updateWinningOpen, setUpdateWinningOpen] = useState(false);
  const [selectVechileOpen, setSelectVechileOpen] = useState(false);
  const [confirmSelection, setconfirmSelection] = useState(false);

  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Box>
        {/* <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead className={classes.tableHead}>
              <TableRow>
               
                <TableCell align="center">Race Track</TableCell>
                <TableCell align="center">Class</TableCell>
                <TableCell align="center">Distance</TableCell>
                <TableCell align="center">Entry Fee</TableCell>
                <TableCell align="center">Prize Pool</TableCell>
                <TableCell align="center">Registered</TableCell>
               
              </TableRow>
            </TableHead>

            <TableBody>
              {rows1.map((row) => (
                <Row1
                  key={row.name}
                  row={row}
                  setUpdateWinningOpen={setUpdateWinningOpen}
                  updateWinningOpen={updateWinningOpen}
                  setSelectVechileOpen={setSelectVechileOpen}
                  selectVechileOpen={selectVechileOpen}
                  className={classes.rowBox}
                />
              ))}
            </TableBody>
            <TableBody>
              {rows.map((row) => (
                <Row
                  key={row.name}
                  row={row}
                  setUpdateWinningOpen={setUpdateWinningOpen}
                  updateWinningOpen={updateWinningOpen}
                  setSelectVechileOpen={setSelectVechileOpen}
                  selectVechileOpen={selectVechileOpen}
                  className={classes.rowBox}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell align="center">Race Track</TableCell>
                <TableCell align="center">Class</TableCell>
                <TableCell align="center">Distance</TableCell>
                <TableCell align="center">Entry Fee</TableCell>
                <TableCell align="center">Prize Pool</TableCell>
                <TableCell align="center">Registered</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ background: "#110720" }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead className={classes.tableHead}>
                  <TableRow style={{ background: "#110720" }}>
                    <TableCell
                      align="center"
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Roboto",
                        fontWeight: "600",
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "18px",
                      }}
                    >
                      Race #453
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Roboto",
                        fontWeight: "600",
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "18px",
                      }}
                    >
                      Z Class
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Roboto",
                        fontWeight: "600",
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "18px",
                      }}
                    >
                      1/2 Mile
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Roboto",
                        fontWeight: "600",
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "18px",
                      }}
                    >
                      {/* 0.50 */}
                      <Box
                        style={{
                          display: "flex",
                          height: "20px",
                          justifyContent: "start",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="images/gasv2.png"
                          alt=""
                          style={{ width: "24px" }}
                        />
                        &nbsp;
                        <Typography
                          variant="h6"
                          style={{
                            color: "#fff",
                            fontFamily: "'Roboto'",
                            fontWeight: "600",
                            fontStyle: "normal",

                            fontSize: "16px",
                            lineHeight: "18px",
                          }}
                        >
                          0.50
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "#fff",
                        fontFamily: "'Roboto'",
                        fontWeight: "600",
                        fontStyle: "normal",

                        fontSize: "18px",
                        lineHeight: "18px",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          height: "20px",
                          justifyContent: "start",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="images/gasv2.png"
                          alt=""
                          style={{ width: "24px" }}
                        />
                        &nbsp;&nbsp;
                        <Typography
                          variant="h6"
                          style={{
                            color: "#fff",
                            fontFamily: "'Roboto'",
                            fontWeight: "600",
                            fontStyle: "normal",

                            fontSize: "16px",
                            lineHeight: "18px",
                          }}
                        >
                          0.50
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Roboto",
                        fontWeight: "600",
                        fontStyle: "normal",
                        fontSize: "18px",
                        lineHeight: "18px",
                      }}
                    >
                      1/10
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={2}>
              {datamap &&
                datamap.map((data, i) => {
                  return (
                    <Grid item lg={4} xs={12}>
                      <RaceResultCard data={data} />
                    </Grid>
                  );
                })}
            </Grid>
          </AccordionDetails>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead className={classes.tableHead}>
                <TableRow style={{ background: "#110720" }}>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    Position
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    Token ID
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    Class
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    Career{" "}
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* <TableBody>
                {rows1.map((row) => (
                  <Row1
                    key={row.name}
                    row={row}
                    setUpdateWinningOpen={setUpdateWinningOpen}
                    updateWinningOpen={updateWinningOpen}
                    setSelectVechileOpen={setSelectVechileOpen}
                    selectVechileOpen={selectVechileOpen}
                    className={classes.rowBox}
                  />
                ))}
              </TableBody> */}
              <TableBody>
                {rows.map((row) => (
                  <Row
                    key={row.name}
                    row={row}
                    setUpdateWinningOpen={setUpdateWinningOpen}
                    updateWinningOpen={updateWinningOpen}
                    setSelectVechileOpen={setSelectVechileOpen}
                    selectVechileOpen={selectVechileOpen}
                    className={classes.rowBox}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Accordion>
        <Accordion>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ background: "#110720" }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead className={classes.tableHead}>
                  <TableRow style={{ background: "#110720" }}>
                    <TableCell
                      align="center"
                      style={{
                        color: "#fff",
                        fontFamily: "'Roboto'",
                        fontWeight: "600",
                        fontStyle: "normal",

                        fontSize: "18px",
                        lineHeight: "18px",
                      }}
                    >
                      Race #453
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "#fff",
                        fontFamily: "'Roboto'",
                        fontWeight: "600",
                        fontStyle: "normal",

                        fontSize: "18px",
                        lineHeight: "18px",
                      }}
                    >
                      Z Class
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "#fff",
                        fontFamily: "'Roboto'",
                        fontWeight: "600",
                        fontStyle: "normal",

                        fontSize: "18px",
                        lineHeight: "18px",
                      }}
                    >
                      1/2 Mile
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "#fff",
                        fontFamily: "'Roboto'",
                        fontWeight: "600",
                        fontStyle: "normal",

                        fontSize: "18px",
                        lineHeight: "18px",
                      }}
                    >
                      {/* 0.50 */}
                      <Box
                        style={{
                          display: "flex",
                          height: "20px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="images/gasv2.png"
                          alt=""
                          style={{ width: "31px" }}
                        />
                        &nbsp;&nbsp;
                        <Typography
                          variant="h6"
                          style={{
                            color: "#fff",
                            fontFamily: "'Roboto'",
                            fontWeight: "600",
                            fontStyle: "normal",

                            fontSize: "18px",
                            lineHeight: "18px",
                          }}
                        >
                          0.50
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "#fff",
                        fontFamily: "'Roboto'",
                        fontWeight: "600",
                        fontStyle: "normal",

                        fontSize: "18px",
                        lineHeight: "18px",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          height: "20px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="images/gasv2.png"
                          alt=""
                          style={{ width: "31px" }}
                        />
                        &nbsp;&nbsp;
                        <Typography
                          variant="h6"
                          style={{
                            color: "#fff",
                            fontFamily: "'Roboto'",
                            fontWeight: "600",
                            fontStyle: "normal",

                            fontSize: "18px",
                            lineHeight: "18px",
                          }}
                        >
                          5.00
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontFamily: "'Roboto'",
                        fontWeight: "600",
                        fontStyle: "normal",

                        fontSize: "18px",
                        lineHeight: "18px",
                      }}
                    >
                      1/10
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </AccordionSummary>

          <AccordionDetails style={{ background: "#110720" }}>
            {datamap &&
              datamap.map((data, i) => {
                return (
                  <Grid container spacing={2} style={{ margin: "9px" }}>
                    <RaceResultCard data={data} />
                  </Grid>
                );
              })}
          </AccordionDetails>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead className={classes.tableHead}>
                <TableRow style={{ background: "#110720" }}>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    Position
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    Token ID
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    Class
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                    }}
                  >
                    Career{" "}
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* <TableBody>
                {rows1.map((row) => (
                  <Row1
                    key={row.name}
                    row={row}
                    setUpdateWinningOpen={setUpdateWinningOpen}
                    updateWinningOpen={updateWinningOpen}
                    setSelectVechileOpen={setSelectVechileOpen}
                    selectVechileOpen={selectVechileOpen}
                    className={classes.rowBox}
                  />
                ))}
              </TableBody> */}
              <TableBody>
                {rows.map((row) => (
                  <Row
                    key={row.name}
                    row={row}
                    setUpdateWinningOpen={setUpdateWinningOpen}
                    updateWinningOpen={updateWinningOpen}
                    setSelectVechileOpen={setSelectVechileOpen}
                    selectVechileOpen={selectVechileOpen}
                    className={classes.rowBox}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Accordion>
        <Box align="center" mt={5}>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "200px",
              height: " 50px",
              borderRadius: "5px",
              backgroundColor: "#EA1546",
              padding: "12px 35px",
            }}
          >
            VIEW MORE
          </Button>
        </Box>
      </Box>
      {updateWinningOpen && (
        <Dialog
          open={updateWinningOpen}
          onClose={() => {
            setUpdateWinningOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
          style={{ background: "#1D0E33" }}
        >
          <DialogContent>
            <Box className={classes.updateContent} style={{}}>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Your Winnings
              </Typography>
              <CloseIcon
                onClick={() => {
                  setUpdateWinningOpen(false);
                }}
                style={{ width: "1.3em", height: "1.3em", cursor: "pointer" }}
              />
            </Box>
            <Container className={classes.mainBoxContent}>
              <Grid container spacing={4}>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box className={classes.imgSection}>
                    <img src="images/car2.png" alt="" />
                  </Box>
                </Grid>
                <Grid item lg={8} md={8} sm={6} xs={12}>
                  <Box className={classes.contentGroupSection}>
                    <Typography variant="h6">
                      You have unboxed a{" "}
                      <span style={{ color: "#faf500" }}>Legendary</span>
                    </Typography>
                    <Typography variant="h6">Red Racing Wheels</Typography>
                  </Box>
                  <Box className={classes.btnSection}>
                    <Button
                      onClick={() => {
                        setUpdateWinningOpen(false);
                      }}
                    >
                      CLOSE
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button id="btn-again">AGAIN</Button>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
        </Dialog>
      )}
      {confirmSelection && (
        <Dialog
          open={confirmSelection}
          onClose={() => {
            setconfirmSelection(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
          style={{ background: "#1D0E33" }}
        >
          <DialogContent>
            <Box className={classes.updateContent} style={{}}>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Confirm Selection
              </Typography>
              <CloseIcon
                onClick={() => {
                  setconfirmSelection(false);
                }}
                style={{ width: "1.3em", height: "1.3em", cursor: "pointer" }}
              />
            </Box>
            <Container className={classes.mainBoxContent}>
              <Grid container spacing={4}>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box className={classes.imgSection}>
                    <img src="images/car2.png" alt="" />
                  </Box>
                </Grid>
                <Grid item lg={8} md={8} sm={6} xs={12}>
                  <Box className={classes.contentGroupSection}>
                    <Typography variant="h6">
                      You have selected this vehicle.
                    </Typography>
                  </Box>
                  <Box className={classes.selectCarSection}>
                    <Typography variant="h6">
                      This race will cost you:
                    </Typography>
                    &nbsp;&nbsp;
                    <img src="images/gastoken.png" alt="" />
                    &nbsp;&nbsp;
                    <Typography variant="h5">500</Typography>
                  </Box>
                  <Box className={classes.btnSection}>
                    <Button onClick={() => setconfirmSelection(false)}>
                      BACK
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button id="btn-again">CONFIRM</Button>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
        </Dialog>
      )}
      {selectVechileOpen && (
        <Dialog
          open={selectVechileOpen}
          onClose={() => {
            setSelectVechileOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
          style={{ background: "#1D0E33" }}
          // disableBackdropClick={isUpdateMinSatke}
          // disableEscapeKeyDown={isUpdateMinSatke}
        >
          <DialogContent>
            <Box className={classes.updateContent} style={{}}>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Select Your Vehicle
              </Typography>
              <CloseIcon
                onClick={() => {
                  setSelectVechileOpen(false);
                }}
                style={{ width: "1.3em", height: "1.3em", cursor: "pointer" }}
              />
            </Box>
            <Container className={classes.mainBoxContent}>
              <Grid container spacing={4}>
                {carData.map((data) => {
                  return (
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Box
                        className={classes.imgSection}
                        onClick={() => setconfirmSelection(true)}
                      >
                        <img
                          style={{ cursor: "pointer" }}
                          src={data.imgage}
                          alt=""
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
