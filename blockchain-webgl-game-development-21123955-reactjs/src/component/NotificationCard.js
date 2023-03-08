import React from "react";
import {
  Typography,
  Box,
  makeStyles,
  Avatar,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import { FaEllipsisV } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BsClockHistory } from "react-icons/bs";

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
  NotificationBox: {
    position: "relative",
    alignContent: "center",
    "& div": {
      "& h5": {
        fontSize: "22px",
        lineHeight: "33px",
        color: "#fc4f4f",
        fontWeight: "200",
      },
      "& p": {
        fontWeight: "500",
        fontSize: "14px",
        // lineHeight: "30px",
        color: "#9F9F9F",
      },
      "& small": {
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "18px",
        color: "#979797",
      },
    },
  },
  Notificationimg: {
    width: "70px",
    marginRight: "30px",
    "@media(maxWidth:767px)": {
      Notificationimg: {
        marginRight: "10px",
      },
    },
    "& img": {
      width: "100%",
    },
  },
  buttonMargin: {
    marginRight: "10px",
  },
  NotifiButton: {
    display: "flex",
    "@media(maxWidth:767px)": {
      display: "flex",
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
    <Box className={classes.NotificationBox}>
      {/* <figure className={classes.Notificationimg}>
        <img src={data.img} alt="" />
      </figure> */}
      <Box>
        <Typography variant="h5"> {data.title}</Typography>
        <Typography variant="body2" component="p">
          {data.discription}
        </Typography>
        <Typography variant="body2" component="small">
          {data.time}
        </Typography>
        <Box mt={1} mb={1} className={classes.NotifiButton}>
          {/* <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.buttonMargin}
          >
            ACCEPT
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
}
