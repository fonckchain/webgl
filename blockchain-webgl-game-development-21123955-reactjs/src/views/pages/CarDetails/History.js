import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import BirdCard from "src/component/BirdCard";
import { Link } from "react-router-dom"
const walletdetails = [
  {
    profileImg: "images/Activity/1.png",
    time: "6/29/2021, 7:53 PM",
    data:"Elon Musk",
    check:"images/token/check.png",
  },
  {
    profileImg: "images/Activity/2.png",
    time: "6/29/2021, 7:53 PM",
    data:"Ei Meta Key",
    check:"images/token/check.png",
  },
  {
    profileImg: "images/Activity/3.png",
    time: "6/29/2021, 7:53 PM",
    data:"Dazza",
    check:"images/token/check.png",
  },
  {
    profileImg: "images/Activity/4.png",
    time: "6/29/2021, 7:53 PM",
    data:"Wheels For Hands",
    check:"images/token/check.png",
  },
];
export default function Users(props) {
    const { type, data } = props;
  
  
    return (
        <Box>
            <Grid container>
        {walletdetails.map((data, i) => {
            return (
              <Grid
                item
                xs={12}
                md={12}
                key={i}
                className="walletSet mb-20"
              >
                <BirdCard data={data} type="timing" index={i} />
              </Grid>
            );
          })}
          </Grid>
          </Box>
    );
}