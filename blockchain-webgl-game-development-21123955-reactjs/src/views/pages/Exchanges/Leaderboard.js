import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import LeaderboardTable from "src/component/LeaderboardTable";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundColor: "#1d0e33",

    marginTop: "20px",
    paddingBottom: "50px",
  },
  rowBox: {
    backgroundColor: "#190a2c",
    "&:hover": {
      backgroundColor: "#2c1e3d",
    },
  },
  tableHead: {
    backgroundColor: "#110720",
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

export default function CollapsibleTable() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Box>
        <LeaderboardTable />
      </Box>
    </Box>
  );
}
