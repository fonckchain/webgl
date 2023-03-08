import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  bannerImg: {
    background: "rgb(63,17,120)",
    // background: "linear-gradient(39deg, rgba(63,17,120,1) 21%, rgba(139,70,191,1) 70%, rgba(255,0,204,1) 100%)",
    background:
      "linear-gradient(39deg, rgb(63 17 120 / 28%) 21%, rgb(139 70 191 / 32%) 70%, rgba(255,0,204,1) 100%)",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    cursor: "pointer",
    "& img": {
      width: "100%",
      borderRadius: "10px",
    },
  },
}));

export default function UsersCard(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <Link to="/" className="boxHolderCollection">
      <Box className={classes.gallryBox}>
        <Box className={classes.bannerImg}>
          <Tilt>
            <img src={data.image} alt="" />
          </Tilt>
        </Box>
      </Box>
    </Link>
  );
}
