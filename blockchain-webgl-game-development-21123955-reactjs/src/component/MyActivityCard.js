import React from "react";
import {
  Typography,
  Box,
  makeStyles,
  Avatar,
  Grid,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BsClockHistory } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

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
  activitycard: {
    background: " #FFFFFF",
    border: "2px solid #F0EDEE",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    "@media (max-width: 767px)": {
      display: "block",
      borderRadius: "27px",
    },
    '& div': {
      paddingLeft: "60px",
      "@media (max-width: 767px)": {
        padding: "15px",
      },
      '& h6': {
        color: "#000",
      },
      '& svg': {
        color: "#000",
        fontSize: "20px",
        cursor: "pointer",
      },
    },
  },
  userComment: {
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "22px",
    color: "#898989",
    marginBottom: "7px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    '& a': {
      color: "#ec0066",
      fontWeight: "400",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      marginLeft: "10px",
      marginRight: "10px",
    },
  },
  activityimg: {
    position: "relative",
    width: "150px",
    height:"150px",
    margin: "0",
    "@media (max-width: 767px)": {
      width: "100%",
    },
    '& img': {
      '&:first-child': {
        height: "100%",
        display: "block",
        "@media (max-width: 767px)": {
          width: "100%",
        },
      },
      '&:last-child': {
        position: "absolute",
        top: "15px",
        right: "-15px",
        "@media (max-width: 767px)": {
          top: "0",
          right: "0",
        },
      },
    },
  },
  userimg: {
    position: "relative",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    margin: "0",
    marginRight: "10px",
    '& img': {
      '&:first-child': {
        width: "30px",
        height: "30px",
        display: "block",
        objectFit: "cover",
      },
      '&:last-child': {
        position: "absolute",
        top: "0",
        right: "-5px",
        width: "13px",
      },
    },
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
      <Box className={classes.activitycard}>
        <figure class={classes.activityimg}>
          <img class="rounded-circle" src={data.profileImg} alt="" />
          <img src={data.filterIcon} />
        </figure>
        <Box>
          <Typography variant="h6">  {data.name}</Typography>
          <Typography veriant="h6" className={classes.userComment}>1 edition transferred from

            <Link to="/user">  <figure class={classes.userimg}>
              <img class="rounded-circle" src="images/users/1.png" alt="" />
              <img src="images/token/check.png" />
            </figure>  Rarebit </Link>   to    <Link to="/user">   <figure class={classes.userimg}>
              <img class="rounded-circle" src="images/users/1.png" alt="" />
              <img src="images/token/check.png" />
            </figure> Bunny Parton</Link></Typography>
          <Typography variant="body2" component="span">{data.time} <FiExternalLink /></Typography>
        </Box>
      </Box>
    </Box>
  );
}
