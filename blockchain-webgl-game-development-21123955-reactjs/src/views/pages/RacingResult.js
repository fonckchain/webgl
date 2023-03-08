import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  AppBar,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogContent,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Races from "src/views/pages/Race/Races";
import CloseIcon from "@material-ui/icons/Close";

import RacingResults from "src/views/pages/Race/RacingResult";
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
    backgroundColor: "#1D0E33",

    paddingTop: "50px",
    // paddingBottom: "100px",
    "& h1": {
      fontSize: "48px",
      fontWeight: "400",
      color: "#ffffff",
      textAlign: "center",
      marginBottom: "20px",
    },
    "& p": {
      fontSize: "14px",
      fontWeight: "400",
      color: "#ffffff",
    },
  },
  formcontrol: {
    height: "40px",
    fontSize: "14px",
    border: "none",
    padding: "0 6px",
    backgroundColor: "#1d0e33",
    color: "#fff",
    // borderColor: "#ccc",
    width: "215px",
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
  borderbg: {
    marginBottom: "80px",
  },
  tabBox: {
    backgroundColor: "#110720",
  },
  mainboxtext: {
    "& h3": {
      color: "#ffffff",
      textAlign: "center",
    },
  },
}));

export default function RacingResult() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (Name, newValue) => {
    setValue(newValue);
  };
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Box className={classes.mainbox}>
      <Box pt={4} pb={4} className={`${classes.mainboxtext} subtext`}>
        <Typography variant="h3">Racing Result</Typography>
      </Box>
      <Box className={classes.tabBox}>
        <AppBar
          position="static"
          style={{
            boxShadow: "none",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="lg">
            {" "}
            <Box display="flex" justifyContent="space-between">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                style={{
                  color: "#fff",
                }}
              >
                <Tab label="Result" {...a11yProps(0)} />
              </Tabs>
              <Typography
                variant="h4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Box>
                  <select
                    // onChange={(e) => {
                    //   setSelectedFilter(e.target.value);
                    // }}
                    //   onChange={handleChange}
                    className={classes.formcontrol}
                  >
                    <option value="">Sort By: Type</option>
                    <option
                      value={`["NFT_CREATE", "CREATE_COLLECTION", "ORDER_CREATE"]`}
                    >
                      Listing
                    </option>
                    <option value={`["SEND_NFT", "SEND_ORDER", "ORDER_SELL"]`}>
                      Purchases
                    </option>
                    <option value={`["BID_CREATE"]`}>Bid</option>
                    <option value={`["LIKE", "DISLIKE"]`}>Likes</option>
                    <option value={`["FOLLOW", "UNFOLLOW"]`}>Followings</option>
                  </select>
                </Box>
              </Typography>
            </Box>
          </Container>
        </AppBar>
      </Box>

      <Container maxWidth="lg" style={{ padding: "0px" }}>
        <TabPanel value={value} index={0}>
          <RacingResults />
        </TabPanel>
      </Container>
    </Box>
  );
}
