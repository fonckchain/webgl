import React from "react";
import {
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  NftImg: {
    borderRadius: 10,
    display: "block",
    miHeight: "300px",
    position: "relative",
  },
  bottomblock: {
    display: "flex",
    justifyContent: "space-between", 
    alignContent: "center",
  },
  bottomTop: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    margin: "10px 0 0",
  },
  playbutton: {
    position: "absolute",
    bottom: 5,
    right: 10,
  },
}));

export default function UsersCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { type, data } = props;
  const classes = useStyles();

  return (
    <Box className="CardBox">
      <Box className="User_card"> 
      <figure class="user_img following2">
                  <img class="rounded-circle" src={data.profileImg} alt="" />
        </figure>
        <Box>
          <Typography variant="h5" className="edition"> 0.016 WETH &nbsp; <small> by <Link to="/user"><span>{data.data}</span></Link>  for 1 edition</small></Typography>
          <Typography variant="body2" component="span">{data.time}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
