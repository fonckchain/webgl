import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  AppBar,
  Tabs,
  Tab,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import RacingResults from "src/views/pages/Race/RacingResult";
import Races from "./Races";
import Upcoming from "./Upcoming";
import Leaderboard from "./Leaderboard";
import Results from "./Results";
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
// const [tabview, setTabView] = useState("Main");
const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundColor: "#1D0E33",
    paddingTop: "20px",
    // paddingBottom: "100px",
    "& h1": {
      fontSize: "48px",
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
  tabBox: {
    // backgroundColor: "#110720",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  tabBoxbg: {
    backgroundColor: "#110720",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  mainboxtext: {
    "& h3": {
      color: "#ffffff",
      textAlign: "center",
    },
  },
  TabButtonsBox: {
    "& button": {
      color: " #fff",
      padding: "6px 22px",
      borderBottom: "2px solid transparent",
      borderRadius: "0",
      fontFamily: "Roboto !important",
      fontStyle: "normal !important",
      fontWeight: "500 !important",
      fontSize: "17px !important",
      lineHeight: "54px !important",

      "&.active": {
        color: "#fff",
        borderBottom: "2px solid #EA1546",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "6px 17px",
        fontSize: "12px !important",
      },
    },
  },
  formcontrol: {
    border: "navajowhite",
    height: "40px",
    fontSize: "14px",
    padding: "0px 20px 0px 20px",
    backgroundColor: "#0000",
    color: "#fff",
    // borderColor: "#ccc",
    width: "100%",
    borderRadius: "5px",
    // border: "1px solid #3d3d3d",
    // background:
    //   "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    "&:focus-visible": {
      outline: "none",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
  },
}));

export default function Race() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tabview, setTabView] = useState("Races");
  const handleChange = (Name, newValue) => {
    setValue(newValue);
  };
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Box className={classes.mainbox}>
      <Box className={classes.tabBoxx}>
        <Box>
          <Container>
            <Box className={classes.tabBox}>
              <Box className={classes.TabButtonsBox}>
                <Button
                  className={tabview === "Races" ? "active" : " "}
                  onClick={() => setTabView("Races")}
                >
                  Crypto
                </Button>
                <Button
                  className={tabview === "Upcoming" ? "active" : " "}
                  onClick={() => setTabView("Upcoming")}
                >
                  Fiat
                </Button>
              </Box>
            </Box>
          </Container>

          <Container>
            {" "}
            <Box className={classes.tabBoxbg}>
              {tabview === "Races" ? <Races /> : ""}
              {tabview === "Upcoming" ? <Upcoming /> : ""}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
