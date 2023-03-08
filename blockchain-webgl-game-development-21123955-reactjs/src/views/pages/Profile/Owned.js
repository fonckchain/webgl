import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import NFTCard from "src/component/NFTCard";
import { Link } from "react-router-dom"
const walletdetails = [
  {
    img: "images/card/1.png",
    name: "Bitcoin Miner Ani...",
    likes: "0",
  },
  {
    img: "images/card/2.png",
    name: "Atlanta Hawks coin",
    likes: "250",
  },
  {
    img: "images/card/3.png",
    name: "who am i? #11",
    likes: "10",
  },
  {
    img: "images/card/4.png",
    name: "CryptoBusters Car",
    likes: "50",
  },
  {
    img: "images/card/5.png",
    name: "LIL YOU #0021",
    likes: "100",
  },
  {
    img: "images/card/6.png",
    name: "PASSION | Special Art ",
    likes: "100",
  },
  {
    img: "images/card/7.png",
    name: "Pink Lotus",
    likes: "100",
  },
  {
    img: "images/card/8.png",
    name: "neotokyo citizen #15",
    likes: "100",
  },
  {
    img: "images/card/9.png",
    name: "Bitcoin Miner Ani...",
    likes: "100",
  },
  {
    img: "images/card/10.png",
    name: "Atlanta Hawks coin",
    likes: "100",
  },
  {
    img: "images/card/11.png",
    name: "who am i? #11",
    likes: "100",
  },
  {
    img: "images/card/12.png",
    name: "CryptoBusters Car",
    likes: "100",
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
                sm={6}
                md={4}
                lg={3}
                key={i}
                className="walletSet mb-20"
              >
                <NFTCard data={data} type="timing" index={i} />
              </Grid>
            );
          })}
          </Grid>
          </Box>
    );
}