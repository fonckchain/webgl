import React from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import RaceResultDetails from "src/component/RaceResultDetails";
import { FaRegEye } from "react-icons/fa";

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
    paddingBottom: "100px",
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
        fontSize: "13px",
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
      borderBottom: "20px solid #1d0e33 !important",
      padding: "20px 10px",
      fontSize: "13px",
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
});
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* <TableCell  align="center">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <Button variant="contained" color="primary" style={{ fontSize: " 12px", height: "40px", }}>     Open for all</Button> : <Button variant="contained" color="primary" style={{ fontSize: " 12px", height: "40px", }}>     Open for all</Button>}
                       
                    </IconButton>
                </TableCell> */}
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
            style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <RaceResultDetails />
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
  createData(
    "Super Renault",
    "Seleros'Kmpl",
    "18.00Lmpl",
    "02/01/2022",
    "RICE POOL",
    "2/12"
  ),
  createData(
    "Super Renault",
    "Seleros'Kmpl",
    "18.00Lmpl",
    "02/01/2022",
    "RICE POOL",
    "2/12"
  ),
  createData(
    "Super Renault",
    "Seleros'Kmpl",
    "18.00Lmpl",
    "02/01/2022",
    "RICE POOL",
    "2/12"
  ),
  createData(
    "Super Renault",
    "Seleros'Kmpl",
    "18.00Lmpl",
    "02/01/2022",
    "RICE POOL",
    "2/12"
  ),
  createData(
    "Super Renault",
    "Seleros'Kmpl",
    "18.00Lmpl",
    "02/01/2022",
    "RICE POOL",
    "2/12"
  ),
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
        {/* <Box mb={5}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={9}>
              <Typography variant="h2"> Results</Typography>
            </Grid>
            <Grid xs={12} sm={3}>
              <select className={classes.formControl}>
                <option>-- Sort by --</option>
                <option>Class</option>
                <option>Entry Fee</option>
                <option>Start Time</option>
                <option>Registered</option>
                <option>Distance</option>
              </select>
            </Grid>
          </Grid>
        </Box> */}

        {/* <Box style={{ paddingBottom: "30px" }}>
                    <Typography variant="h2"> Races</Typography>
                </Box> */}

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell align="center">Race Name</TableCell>
                <TableCell align="center"> Hippodrome</TableCell>
                <TableCell align="center">Distance</TableCell>
                <TableCell align="center">Date</TableCell>
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
