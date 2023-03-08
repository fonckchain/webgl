import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, } from "@material-ui/core";
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    boxmain: {
        backgroundColor: "#21162e",
        padding: "30px",
    },
    tableHead:{
        backgroundColor: "#120720", 
        "& tr ":{
            "& th":{
                fontSize: "13px",
                
            },
            
        }, 
    },
    tableBody:{
        backgroundColor: "#21162e", 
        "& tr":{
            "&:hover":{
                backgroundColor:"#2c1e3d",
            },
            "& td":{
                borderBottom: "1px solid rgb(111 111 111 / 42%) !important",
                padding: "20px 10px",
                fontSize: "13px",
            },
            
        }, 
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    {
        Race: "4th ",
        Track: "Honda",
        Class: "Current",
        Distance: "Cylinder Block",
        Fee: "400hp",
        Pool: "42 min 25.65 src",
    },
    {
        Race: "4th ",
        Track: "Honda",
        Class: "Current",
        Distance: "Cylinder Block",
        Fee: "400hp",
        Pool: "42 min 25.65 src",
    },
    {
        Race: "4th ",
        Track: "Honda",
        Class: "Current",
        Distance: "Cylinder Block",
        Fee: "400hp",
        Pool: "42 min 25.65 src",
    },
    {
        Race: "4th ",
        Track: "Honda",
        Class: "Current",
        Distance: "Cylinder Block",
        Fee: "400hp",
        Pool: "42 min 25.65 src",
    },
    {
        Race: "4th ",
        Track: "Honda",
        Class: "Current",
        Distance: "Cylinder Block",
        Fee: "400hp",
        Pool: "42 min 25.65 src",
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
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell align="center">Place</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Generation</TableCell>
                            <TableCell align="center">Engine</TableCell>
                            <TableCell align="center">MaxPower</TableCell>
                            <TableCell align="center">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell  scope="row" align="center">
                                    {row.Race}
                                </TableCell>
                                <TableCell align="center">{row.Track}</TableCell>
                                <TableCell align="center">{row.Class}</TableCell>
                                <TableCell align="center">{row.Distance}</TableCell>
                                <TableCell align="center">{row.Fee}</TableCell>
                                <TableCell align="center">{row.Pool}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
