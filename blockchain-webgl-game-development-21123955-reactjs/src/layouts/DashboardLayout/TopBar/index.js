import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Hidden,
  SvgIcon,
  Typography,
  Box,
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
  },
  toolbar: {
    height:0,
    padding: "0 10px",
    [theme.breakpoints.down("md")]:{
      height:70,
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      elevation={3}
      className={clsx(classes.root, className)}
      color="inherit"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
           style={{ color: "#00e0b0" }}
            onClick={onMobileNavOpen}
            style={{ marginRight: 10 }}
          >
            <SvgIcon fontSize="small">
              <MenuIcon style={{ color: "#00e0b0" }} />
            </SvgIcon>
          </IconButton>
          <Box align="center"> <Link to="/"><img src="images/logo.png" /></Link></Box>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
