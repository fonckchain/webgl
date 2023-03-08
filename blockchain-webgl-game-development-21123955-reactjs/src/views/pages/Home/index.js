import React from "react";
import { Box } from "@material-ui/core";
import Page from "src/component/Page";
import Banner from "./Banner";
import Team from "./Team";
import Garage from "./Garage";
import Stud from "./Stud";
import Meet from "./Meet";
import Features from "./Features";
import Content from "./Content";
import Video from "./Video";
import Upcoming from "./Upcoming";
import Transactions from "./Transactions";
function Home() {
  return (
    <Page title="FOREIGN FUELS | Home">
      <Box>
        <Banner />
        {/* <Video /> */}
        <Features />
        <Upcoming />
        <Team />
        <Garage />
        <Transactions />
        {/* <Stud /> */}
        <Meet />
        {/* <Content /> */}
      </Box>
    </Page>
  );
}
export default Home;
