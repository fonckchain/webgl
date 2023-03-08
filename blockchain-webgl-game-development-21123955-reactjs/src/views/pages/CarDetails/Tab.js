import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  makeStyles,
  Button,
} from "@material-ui/core";
import Page from "src/component/Page";
// import Bids from "./Bids";
import Details from "./Details";
import History from "./History";
export default function Tab() {
  const [tabview, setTabView] = useState("details");
  return (
    <Page title="NFT Details">
      <Container>
      {/* <Box className="TabButtonsBox" mt={5}>
                    <Button className={tabview === "details" ? "active" : " "} onClick={() => setTabView("details")}>Details</Button>
                    <Button className={tabview === "history" ? "active" : " "} onClick={() => setTabView("history")}>History</Button>
                  </Box>
                  <Box className="TabButtonsContant">
                    {tabview === "details" ? (<Details />) : ('')}
                    {tabview === "history" ? (<History />) : ('')}
                  </Box> */}
      </Container>
    </Page>
  );
}
