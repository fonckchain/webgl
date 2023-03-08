import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
const useStyles = makeStyles((theme) => ({
  bannerImg: {
    // background: "rgb(63,17,120)",
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
  const { data, isNameChange, setSelectedNFTData, setIsNameChangeOpen } = props;
  return (
    <Box className={classes.gallryBox}>
      <Box className={classes.bannerImg}>
        <Link to={{ pathname: "/details", search: data.id }}>
          <Tilt>
            <img
              src={
                data.nfdData.image
                  ? data.nfdData.image
                  : "images/collection/1.png"
              }
              alt=""
            />
          </Tilt>
        </Link>
        <Box
          mt={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="body1" style={{ color: "#E21AE7" }}>
              {data.name ? data.name : "UNKNOWN YET"}
            </Typography>
          </Box>
          {isNameChange && (
            <Box>
              <Button
                size="small"
                color="Primary"
                onClick={() => {
                  setIsNameChangeOpen();
                  setSelectedNFTData(data);
                }}
              >
                Update Name
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
