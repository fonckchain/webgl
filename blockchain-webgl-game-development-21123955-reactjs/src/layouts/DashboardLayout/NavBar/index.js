/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import NavItem from "./NavItem";
import { CgUserList } from "react-icons/cg";
import { RiGalleryLine } from "react-icons/ri";
import { FiSliders } from "react-icons/fi";
import { GoDashboard } from "react-icons/go";
import { Link } from "react-router-dom";
const sections = [
  {
    items: [
      {
        title: "Dashboard",
        icon: GoDashboard,
        href: "/dashboard",
      },
      {
        title: "User List",
        icon: CgUserList,
        href: "/user-list",
      },
      {
        title: "Parameters",
        icon: FiSliders,
        href: "/parameters",
      },
    
      {
        title: "Gallery",
        icon: RiGalleryLine,
        href: "/gallery",
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    background: "#272a30",
  },
  desktopDrawer: {
    width: 250,
    top: "0px",
    height: "100%",
    backgroundColor: "#272a30",
    boxShadow: " 0 0.1rem 0.7rem rgb(0 0 0 / 10%)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Hidden mdDown>
        <Box
          padding={0}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          
        </Box>
      </Hidden>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
       <Box align="center" mt={3}> <Link to="/"><img src="images/logo.png" /></Link></Box>
        <Box py={4}>
          {sections.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
        </Box>

      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
          
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
