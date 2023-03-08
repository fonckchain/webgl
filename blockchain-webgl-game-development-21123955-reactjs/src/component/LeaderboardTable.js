import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FaRegEye } from "react-icons/fa";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  boxmain: {
    backgroundColor: "#120720",
    // padding: "30px",
  },
  tableHead: {
    backgroundColor: "#1d0e33",
    borderBottom: "20px solid #1c0e32",

    "& tr ": {
      "& th": {
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "21px",
        textAlign: "left",
        padding: "20px 10px 0px 30px",
      },
    },
  },
  tableBody: {
    backgroundColor: "#110720",
    "& tr": {
      "&:hover": {
        backgroundColor: "#110720",
      },
      "& td": {
        padding: "20px 10px 10px 30px",
        fontSize: "14px",
        fontStyle: "normal",
        fontFamily: "'Dismedia'",
        fontWeight: "600",
        lineHeight: "18px",
        letterSpacing: "1px",
        textAlign: "left",
      },
    },
    "& button": {
      background: "#FF2F60",
      borderRadius: "5px",
      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "18px",
      color: "#FFFFFF",
      paddingTop: "10px",
      width: "86px",
      height: "43px",
      letterSpacing: ".7px",
    },
  },
  imgContent: {
    display: "flex",
    height: "20px",
    justifyContent: "start",
    alignItems: "center",
    "& h6": {
      color: "#FFFFFF",
      fontSize: "14px",
      fontStyle: "normal",
      fontFamily: "Dismedia",
      fontWeight: "normal",
    },
  },
  track: {
    background: "#FF2F60",
    borderRadius: "5px",
    fontFamily: "Dismedia",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "18px",

    color: "#FFFFFF",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    Race: "1ST",
    Track: "Racer #1423",
    Class: "Z Class",
    Fee: "5.00",
    img: "images/gastoken.png",
  },
  {
    Race: "2ND",
    Track: "Racer #1423",
    Class: "Z Class",
    Fee: "5.00",
    img: "images/gastoken.png",
  },
  {
    Race: "3RD",
    Track: "Racer #1423",
    Class: "Z Class",
    Fee: "5.00",
    img: "images/gastoken.png",
  },
  {
    Race: "4th ",
    Track: "Racer #1423",
    Class: "Z Class",
    Fee: "5.00",
    img: "images/gastoken.png",
  },
  {
    Race: "4th ",
    Track: "Racer #1423",
    Class: "Z Class",
    Fee: "5.00",
    img: "images/gastoken.png",
  },
];

export default function CollapsibleTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box className={classes.boxmain}>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="center">Positions</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Number of Races</TableCell>
              <TableCell align="center">Prize</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className={classes.tableBody}>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell scope="row" align="center">
                  <Button
                    variant="contained"
                    className={classes.track}
                    style={
                      row.Race === "1ST"
                        ? { background: "#FF2F60", height: "43px" }
                        : row.Race === "2ND"
                        ? { background: "#00FFF3", height: "43px" }
                        : row.Race === "3RD"
                        ? { background: "#FF00FF", height: "43px" }
                        : { background: "#1D0E33", height: "43px" }
                    }
                  >
                    {row.Race}
                  </Button>
                </TableCell>
                <TableCell align="center">{row.Track}</TableCell>
                <TableCell align="center" style={{}}>
                  {row.Class}
                </TableCell>
                <TableCell align="center">
                  <Box className={classes.imgContent}>
                    <img style={{ width: "28px" }} src={row.img} alt="" />
                    &nbsp;&nbsp;
                    <Typography variant="h6">{row.Fee}</Typography>
                  </Box>
                </TableCell>
                {/* <TableCell style={{display:"flex",alignItems:"center"}}>
                <img src={row.img} alt="" />
                <Typography>{row.Fee}</Typography>
               
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
