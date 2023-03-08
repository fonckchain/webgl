import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, Button } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  tableHead: {
    backgroundColor: "#120720",
    padding: "20px 10px",
    // borderBottom: "1px solid rgb(111 111 111 / 42%) !important",
    "& tr ": {
      "& th": {
        fontSize: "16px",
        fontFamily: "Dismedia",
        letterSpacing: "1px",
        padding: "6px 24px 26px 16px",
      },
    },
  },
  tableBody: {
    backgroundColor: "#120720",
    "& tr": {
      "&:hover": {
        backgroundColor: "#2c1e3d",
      },
      "& td": {
        borderBottom: "20px solid #120720 !important",
        padding: "7px 16px",
        backgroundColor: "#1D0E33",
        fontSize: "16px",
        fontFamily: "Dismedia",
        letterSpacing: "1px",
        "& b": {
          color: "rgb(40, 231, 240)",
        },
        "& b": {
          margin: 0,
          backgroundColor: "rgba(40, 202, 76, 0.5)",
          display: "-webkit-inline-box",
          padding: "2px 12px",
          borderRadius: "2px",
          border: "1px solid #33FF00",
          color: " #fff",
          fontSize: "13px",
        },
      },
    },
    "& MuiTableCell": {
      "& body": {
        color: "#fff",
      },
    },
  },
  btn: {
    color: "white",
    padding: "2px 13px 2px 13px",
    border: "1px solid #00FF29",
    fontSize: "14px",
    background: "rgba(0, 134, 54, 0.62)",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "600",
    marginRight: "6px",
    borderRadius: "5px",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    address: "obgs1254fhiofhbfsdfjsh",
    type: "Buy",
    price: "$5000",
    view: "icon",
    // view: <FaExternalLinkAlt/>,
    component: "Token",
  },
  {
    address: "obgs1254fhiofhbfsdfjsh",
    type: "Sell",
    price: "$5000",
    view: "icon",
    // view: <FaExternalLinkAlt/>,
    component: "Car",
  },
  {
    address: "obgs1254fhiofhbfsdfjsh",
    type: "Mint",
    price: "$5000",
    view: "icon",
    // view: <FaExternalLinkAlt/>,
    component: "Buy",
  },
  {
    address: "obgs1254fhiofhbfsdfjsh",
    type: "Buy",
    price: "$5000",
    view: "icon",
    // view: <FaExternalLinkAlt/>,
    component: "Token",
  },
  {
    address: "obgs1254fhiofhbfsdfjsh",
    type: "Mint",
    price: "$5000",
    view: "icon",
    // view: <FaExternalLinkAlt/>,
    component: "Buy",
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
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Wallet Address</TableCell>
              <TableCell align="left">Time</TableCell>
              {/* <TableCell align="left">View</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            <TableRow>
              <TableCell scope="row" align="left">
                User Name
              </TableCell>

              <TableCell align="left">
                <p>Buy</p>
              </TableCell>
              <TableCell align="left">
                <Button className={classes.btn}>$500</Button>
              </TableCell>
              {/* <TableCell align="left">
                <Link href="#" target="_blanck">
                  <FaExternalLinkAlt />
                </Link>
              </TableCell> */}
              <TableCell align="left">
                0x7965A692a99BFA357eC34316B417A992219d24eA
              </TableCell>
              <TableCell align="left">
                {moment(new Date()).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row" align="left">
                User Name
              </TableCell>

              <TableCell align="left">
                <p>Sell</p>
              </TableCell>
              <TableCell align="left">
                <Button className={classes.btn}>$500</Button>
              </TableCell>
              {/* <TableCell align="left">
                <Link href="#" target="_blanck">
                  <FaExternalLinkAlt />
                </Link>
              </TableCell> */}
              <TableCell align="left">
                0x7965A692a99BFA357eC34316B417A992219d24eA
              </TableCell>
              <TableCell align="left">
                {moment(new Date()).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row" align="left">
                User Name
              </TableCell>

              <TableCell align="left">
                <p>Rent</p>
              </TableCell>
              <TableCell align="left">
                <Button className={classes.btn}>$500</Button>
              </TableCell>
              {/* <TableCell align="left">
                <Link href="#" target="_blanck">
                  <FaExternalLinkAlt />
                </Link>
              </TableCell> */}
              <TableCell align="left">
                0x7965A692a99BFA357eC34316B417A992219d24eA
              </TableCell>
              <TableCell align="left">
                {moment(new Date()).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
