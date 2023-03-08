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
  Dialog,
  DialogContent,
  Container,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import RaceDetails from "src/component/RaceDetails";
import { FaRegEye } from "react-icons/fa";
import CloseIcon from "@material-ui/icons/Close";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

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
    marginTop: "20px",

    // paddingTop: "50px",
    paddingBottom: "20px",
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
        textAlign: "left",
        padding: "30px 0 16px 40px",
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
}));

const useRowStyles = makeStyles({
  root: {
    backgroundColor: "#110720",
    // padding: "20px",
    "& td": {
      padding: "30px 0 16px 40px",
      fontSize: "14px",
      // borderBottom: "20px solid #1d0e33 !important",
      fontFamily: "'Dismedia'",
      letterSpacing: "1px",
      textAlign: "left",
    },
    "& > *": {
      borderBottom: "unset",
    },
    "&:hover": {
      backgroundColor: "#110720",
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
  updateContent: {
    background: "#110720",
    color: "#fff",
    padding: "3px 0px 45px 7px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h6": {
      background: "#110720",

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
      fontFamily: "Roboto",
    },
  },
  openBtn: {
    fontSize: " 12px",
    height: "40px",
    "@media (max-width:991px)": {
      fontSize: " 10px !important",
    },
    "@media (max-width:767px)": {
      fontSize: " 8px !important",
      padding: "3px",
      minWidth: "100px",
    },
  },
});
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [confirmSelection, setconfirmSelection] = useState(false);
  const [gasTokenValue, setGastOkenValue] = useState("");

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell scope="row" align="center">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
        <TableCell align="center">{row.protein}</TableCell>
        <TableCell align="center">{row.protein}</TableCell>
        <TableCell align="center">
          <FaRegEye
            onClick={() => setconfirmSelection(true)}
            style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <RaceDetails />
          </Collapse>
        </TableCell>
      </TableRow>
      {confirmSelection && (
        <Dialog
          // styl={{ background: "#110720" }}
          open={confirmSelection}
          onClose={() => {
            setconfirmSelection(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="xs"
          style={{ background: "#110720", padding: "10px 10px 35px 10px" }}
          // disableBackdropClick={isUpdateMinSatke}
          // disableEscapeKeyDown={isUpdateMinSatke}
        >
          <DialogContent
            style={{ background: "#110720", padding: "10px 10px 35px 10px" }}
          >
            <Box className={classes.updateContent}>
              <Typography variant="h5" style={{ color: "#fff" }}>
                Buy Gas Token
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
                <Grid lg={12} md={12} xs={12} sm={12}>
                  <TextField
                    type="number"
                    className={classes.boxcolor}
                    style={{ border: "none" }}
                    variant="outlined"
                    fullWidth
                    value={gasTokenValue}
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => setGastOkenValue(e.target.value)}
                    // placeholder="Search"
                    InputProps={{
                      startAdornment: (
                        <img
                          style={{ width: "34px" }}
                          src="images/gastoken.png"
                        />
                        // <MailOutlineIcon position="start">Kg</MailOutlineIcon>
                      ),
                    }}
                  />
                </Grid>
                &nbsp;
                <Grid lg={12} md={12} xs={12} sm={12}>
                  <Box>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "center", color: "#f9f8f9" }}
                    >
                      $0.00 = @ 500
                    </Typography>
                  </Box>
                </Grid>
                &nbsp;
                <Grid lg={12} md={12} xs={12} sm={12}>
                  <Box>
                    <Box className={classes.boxcolor}>
                      <Button variant="h5" fullWidth>
                        Pay
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                &nbsp;
                <Grid lg={12} md={12} xs={12} sm={12}>
                  <Box>
                    <Box className={classes.boxcolor}>
                      <Button variant="h5" fullWidth>
                        CHECKOUT WITH PAYPAL
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                &nbsp;
                <Grid lg={12} md={12} xs={12} sm={12}>
                  <Box>
                    <Box className={classes.boxcolor}>
                      <Button variant="h5" fullWidth>
                        CHECKOUT WITH STRIPE
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                &nbsp;
                <Grid lg={12} md={12} xs={12} sm={12}>
                  <Box>
                    <Box className={classes.boxcolor}>
                      <Button variant="h5" fullWidth>
                        CHECKOUT WITH CRYPTO
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </DialogContent>
        </Dialog>
      )}
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

export default function CollapsibleTable() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box className={classes.mainbox}>
      <Box>
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
                <TableCell align="center">View</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} className={classes.rowBox} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
