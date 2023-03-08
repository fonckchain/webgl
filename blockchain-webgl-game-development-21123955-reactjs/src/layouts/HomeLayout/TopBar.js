import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Grid,
  Avatar,
  MenuItem,
  Box,
  Container,
  Menu,
  Grow,
  Paper,
  Popper,
  MenuList,
  Typography,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import EditIcon from "@material-ui/icons/Edit";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { MdEmail } from "react-icons/md";
import { HiExternalLink } from "react-icons/hi";
import MenuIcon from "@material-ui/icons/Menu";
import { MdSend } from "react-icons/md";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Logo from "./../../component/Logo";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IoIosNotifications } from "react-icons/io";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useWeb3React } from "@web3-react/core";
import CloseIcon from "@material-ui/icons/Close";
import { toast } from "react-toastify";
import { RiLuggageDepositLine } from "react-icons/ri";

import {
  Link as ImLink,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
  ETHTokenType,
  MintableERC721TokenType,
} from "@imtbl/imx-sdk";

import {
  ACTIVE_NETWORK,
  NetworkContextName,
  REACT_APP_ROPSTEN_ENV_URL,
  REACT_APP_ROPSTEN_LINK_URL,
} from "src/constants";
import { UserContext } from "src/context/User";
import { copyTextById, sortAddress } from "src/utils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { GiCancel } from "react-icons/gi";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { RiShutDownLine } from "react-icons/ri";
import DialogActions from "@material-ui/core/DialogActions";
import { AiFillProject } from "react-icons/ai";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const headersData = [
  // {
  //   label: "Profile",
  //   href: "/profile",
  // },
  {
    label: "Race",
    href: "/race",
  },
  {
    label: "Exchange",
    href: "/exchange",
  },

  {
    label: "Dealership",
    href: "/dealership",
  },

  {
    label: "Marketplace",
    href: "/marketplace-new",
  },

  // {
  //   label: "Create Nft",
  //   href: "/CreateNft",
  // },
];

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  updateContent: {
    background: "#110720",
    color: "#fff",
    padding: "3px 0px 45px 7px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h6": {
      background: "#110720",

      fontFamily: "Dismedia",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "30px",
      lineHeight: "37px",
      color: "#FFFFFF",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
      "@media(max-width:600px)": {
        fontSize: "25px",
      },
      "@media(max-width:441px)": {
        fontSize: "20px",
      },
    },
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    fontSize: "15px",
    lineHeight: "24px",
    fontWeight: "500",
    borderRadius: 0,
    minWidth: "auto",
    color: "#fff",
    height: "31px",
    padding: "0px 6px",
    letterSpacing: "1px",
    fontFamily: "'Roboto', sans-serif",
    margin: "0 7px",
    "@media (max-width: 1291px)": {
      fontSize: "13px",
    },
    "@media (max-width: 900px)": {
      fontStyle: "normal",
      letterSpacing: "-0.6px",
      lineHeight: "24px",
      color: "#FFF",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginLeft: "-10px",
    },
    "&.active": {
      color: "#ea1546",
    },
    "&:hover": {
      color: "#ea1546",
    },
    "&:last-child": {
      backgroundColor: "#1ed760",
    },
  },

  login: {
    // backgroundColor: "#ec0066",
    marginLeft: "10px",
  },
  loginButton: {
    height: "28px",

    width: "28px",
  },
  toolbar: {
    display: "flex",
    padding: "4px 0",
    justifyContent: "space-between",
    height: "100%",
    "@media (max-width: 900px)": {
      paddingLeft: "75px",
      paddingRight: "20px",
      height: "100%",
    },
  },
  maindrawer: {
    height: "100%",
    background: "#0c0731",
    width: "260px",
  },
  logoDrawer: {
    width: "140px",
    marginBottom: "20px",
    marginTop: "1rem",
  },
  drawerContainer: {
    padding: "20px 20px 0px 9px",
    height: "100%",
    background: "#190a2c",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawericon: {
    color: "#000",
    position: "absolute",
    top: "0px",
    right: "-10px",
    fontSize: "25px",
    [theme.breakpoints.down("xs")]: {
      right: "0px",
    },
  },
  logoImg: {
    width: "75px",
    // height: '44.5px',
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
    },
  },
  menuMobile: {
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: "-0.6px",
    lineHeight: "1.75",
    color: "#fff",
    borderBottom: "1px solid #3e3e3e",
    padding: "16px 0px",
    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
    },
  },
  paper1: {
    background: "black",
    color: "white",
  },
  containerHeight: {
    height: "100%",
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "0px",
  },
  search: {
    height: "31px",
    position: "relative",
    color: "#ABABAB",
    borderRadius: "100px",
    backgroundColor: "#E6E6E6",
    border: "1px solid #fff",
    "&:hover": {
      backgroundColor: "#ececec",
      border: "1px solid #300760",
    },
    marginLeft: 20,
    width: "140px",
    maxWidth: "257px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "180px",
    },
  },
  searchIcon: {
    fontSize: "16px",
    padding: theme.spacing(0, 2),
    color: "#000000",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    fontSize: "16px",
  },
  walletCss: {
    color: "#fff",
    height: "40px",
    padding: "4px 7px",
    fontSize: "11px",
    fontWeight: "500",
    borderRadius: "5px",
    textTransform: "uppercase",
    background: "#ec0066",
    border: "1px solid #ec0066",
    "&:hover": {
      background: "#f83838",
      border: "1px solid #f83838",
      color: "#fff",
    },
    "@media (max-width: 1291px)": {
      fontSize: "10px",
    },
    "@media (max-width: 900px)": {
      marginLeft: "12px",
      marginTop: "12px",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: "13px",
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100px",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
  boxcolor: {
    borderRadius: "4px",
    paddingTop: "5px",
    paddingBottom: "5px",
    transform: "matrix(0.94, 0, -0.37, 1, 0, 0)",
    backgroundColor: "rgb(215, 162, 28)",
  },
  boxcolor: {
    backgroundColor: "#1D0E33",
    // padding: "13px",
    borderRadius: "5px",
    "& h5": {
      color: "#ffffff",
      fontFamily: "Roboto",
      fontSize: "16px",
      textAlign: "center",
    },
    "& button": {
      color: "#ffffff",
      padding: "10px",
      fontFamily: "Roboto",
    },
  },
  submenu: {
    borderTop: "3px solid #300760",
    top: "25px !important",
  },
  menubox: {
    "& ul": {
      width: "120px",
      borderRadius: "5px",
      backgroundColor: "#00000091",
      background: "#110720",
      "& a": {
        fontSize: "15px",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "500",
        color: "#B7B7B7",
        "&.active": {
          color: "#fff",
        },
        "&:hover": {
          color: "#fff",
        },
      },
    },
  },
  customizedButton: {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "white",
  },
  buttonText: {},
}));

export default function Header() {
  // const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);
  const walletAddress = sessionStorage.getItem("wallet");
  const walletBalance = sessionStorage.getItem("balance");

  const locationHr = window.location.href.split("/");
  console.log("location------", locationHr);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const { chainId, account } = useWeb3React();
  const [confirmSelection, setconfirmSelection] = useState(false);
  const [openDepositPage, setopenDepositPage] = useState(false);
  const balance = sessionStorage.getItem("balance");
  const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);

  const [depositAmount, setDepositAmount] = useState();
  const [isSubmit1, setIsSubmit1] = useState(false);
  const [mintTokenId, setMintTokenId] = useState("");
  const [tokenDepostMessage, setTokenDepostMessage] = useState("");

  console.log("balance", balance);
  const classes = useStyles();

  const user = useContext(UserContext);
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const {
    customizedButton,
    loginButton,
    menuMobile,
    menuButton,
    menuButton1,
    toolbar,
    drawerContainer,
    drawericon,
    login,
    logoDrawer,
    community,
    containerHeight,
    search,
    searchIcon,
    mainHeader,
    inputInput,
    menubox,
    inputRoot,
    walletCss,

    submenu,
  } = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [gasTokenValue, setGastOkenValue] = useState("");

  const { mobileView, drawerOpen } = state;
  const depositETH = async () => {
    setIsSubmit1(true);

    if (depositAmount && Number(depositAmount) > 0) {
      if (balance >= depositAmount) {
        const arra = await link.deposit({
          type: ETHTokenType.ETH,
          amount: depositAmount,
        });
        setopenDepositPage(false);
        console.log("arra", arra);
        toast.success("Deposit succesfully ");
      } else {
        setTimeout(() => {
          setTokenDepostMessage(""); // count is 0 here
        }, 5000);
        setTokenDepostMessage("Your wallet balance is too low");
        // setTokenDepostMessage("")
      }
    }
  };
  const StyledMenu = withStyles({
    paper: {
      // border: "1px solid #d3d4d5",
      marginTop: "20px",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const [open1, setOpen1] = useState({ community: false, user: false });
  const anchorRef = { community: useRef(null), user: useRef(null) };

  const handleToggle = (name) => {
    setOpen1({ ...open1, [name]: !open1[name] });
  };

  const handleClose2 = (event, name) => {
    if (
      anchorRef[name].current &&
      anchorRef[name].current.contains(event.target)
    ) {
      return;
    }

    setOpen1({ ...open1, [name]: false });
  };

  function handleListKeyDown(event, name) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen1({ ...open1, [name]: false });
    }
  }
  const handleClose = () => {
    setAnchorEl1(null);
  };
  const handleCloseLogout = () => {
    setAnchorEl1(null);
    sessionStorage.removeItem("wallet");
  };
  const [open11, setOpen11] = React.useState(false);

  const handleDrawerOpen11 = () => {
    setOpen11(true);
  };

  const handleDrawerClose11 = () => {
    setOpen11(false);
  };
  console.log("account=====>>>", account);
  const wallet = sessionStorage.getItem("wallet");
  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {productLogo}
        <Grid
          container
          item
          direction="row"
          justify="flex-end"
          alignItems="center"
          style={{ paddingLeft: "0px" }}
        >
          {getMenuButtons()}
          <Button
            className={menuButton}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            endIcon={<ExpandMoreIcon />}
          >
            Learn more
          </Button>
          {/* <Box> */}
          <Box display="flex" alignItems="center" pr={1}>
            {" "}
            <Button
              style={{
                padding: "5px 8px",
                color: "rgb(255, 255, 255)",
                fontFamily: "'Roboto', sans-serif",
                backgroundColor: "rgb(29, 14, 51)",
                fontSize: "16px",
                minWidth: "auto",
              }}
            >
              <img
                src="images/gasv2.png"
                alt=""
                style={{ width: "25px", marginRight: "6px" }}
              />
              <Typography
                variant="body2"
                style={{
                  fontSize: "15px",
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: "500",
                }}
              >
                500
              </Typography>
              <IconButton
                style={{
                  padding: "5px",
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Roboto, sans-serif",
                  background: "rgb(17, 7, 32)",
                  fontSize: "15px",
                  borderRadius: "5px",
                  minWidth: "auto",
                  marginLeft: "5px",
                }}
                aria-label="delete"
                size="small"
                // onClick={() => setconfirmSelection(true)}
                onClick={() => history.push("/exchange")}
              >
                <AddCircleIcon
                  fontSize="30"
                  style={{ color: "#ffffff", fontSize: "20px" }}
                />
                {/* {user.unreadCount && user.unreadCount > 0 ? (
                <span className="dots"></span>
              ) : null} */}
              </IconButton>
            </Button>
          </Box>
          <Box display="flex" alignItems="center" pr={1}>
            {" "}
            <Button
              style={{
                padding: "5px 8px",
                color: "rgb(255, 255, 255)",
                fontFamily: "'Roboto', sans-serif",
                backgroundColor: "rgb(29, 14, 51)",
                fontSize: "16px",
                minWidth: "auto",
              }}
            >
              <img
                src="images/ethimg.png"
                alt=""
                style={{ width: "25px", marginRight: "6px" }}
              />
              <Typography
                variant="body2"
                style={{
                  fontSize: "15px",
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: "500",
                }}
              >
                {walletBalance ? walletBalance?.slice(0, 5) : 0}
              </Typography>

              <IconButton
                style={{
                  padding: "5px",
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Roboto, sans-serif",
                  background: "rgb(17, 7, 32)",
                  fontSize: "15px",
                  borderRadius: "5px",
                  minWidth: "auto",
                  marginLeft: "5px",
                }}
                aria-label="delete"
                size="small"
                // component={Link}
                // to="/notification"
              >
                <AddCircleIcon
                  fontSize="30"
                  style={{ color: "#ffffff", fontSize: "20px" }}
                />
                {/* {user.unreadCount && user.unreadCount > 0 ? (
                <span className="dots"></span>
              ) : null} */}
              </IconButton>
            </Button>
          </Box>
          {/* </Box> */}
          {/* {user.isLogin && account && ( */}
          <Box pr={1}>
            <IconButton
              style={{
                padding: "9px 8px",
                color: "rgb(255, 255, 255)",
                fontFamily: "Roboto, sans-serif",
                backgroundColor: "rgb(29, 14, 51)",
                fontSize: "16px",
                minWidth: "auto",
                borderRadius: "5px",
                background: "#1D0E33",
                boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
              }}
              aria-label="delete"
              size="small"
              component={Link}
              to="/notification"
            >
              <NotificationsActiveIcon
                fontSize="30"
                style={{ color: "#ffffff", fontSize: "20px" }}
              />
              {/* {user.unreadCount && user.unreadCount > 0 ? (
                <span className="dots"></span>
              ) : null} */}
            </IconButton>
          </Box>
          {/* )} */}

          <input
            type="text"
            id="headerWalletAddress"
            value={user.userData?.walletAddress}
            style={{ display: "none" }}
          />
          {/* <Button variant="contained" color="primary">
            GARAGE
          </Button> */}
          {wallet && wallet ? (
            <Box pl={1}>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick1}
                // aria-label="delete"
                size="small"
                // className={classes.login}
                style={
                  {
                    // background: "#f83838",
                  }
                }
                // ref={anchorRef.user}
                // aria-controls={open1.user ? "menu-list-grow" : undefined}

                // onClick={() => handleToggle("user")}
              >
                {" "}
                <Avatar
                  src={
                    user?.profileDetails?.profilePic
                      ? user?.profileDetails?.profilePic
                      : "images/profilepic.png"
                  }
                />
                <ExpandMoreIcon
                  style={{ color: "#fff", width: "39px", height: "39px" }}
                />
              </IconButton>
              {/* for test */}

              <StyledMenu
                id="simple-menu"
                style={{ position: "absolute", top: "-2%" }}
                anchorEl={anchorEl1}
                keepMounted
                className={menubox}
                open={Boolean(anchorEl1)}
                onClose={handleClose}
              >
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon style={{ width: "20px" }} />
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                </Link>

                <Link
                  to="/#"
                  style={{
                    textDecoration: "none",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListAltIcon style={{ width: "20px" }} /> &nbsp; &nbsp; &nbsp;
                  &nbsp;
                  <MenuItem onClick={handleClose}>Garage</MenuItem>
                </Link>
                {/* <Link
                  to="/CreateNft"
                  style={{
                    textDecoration: "none",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AiFillProject style={{ width: "20px" }} /> &nbsp; &nbsp;
                  &nbsp; &nbsp;
                  <MenuItem onClick={() => history.push("/CreateNft")}>
                    Create NFT
                  </MenuItem>
                </Link> */}
                {/* <Link
                  // to="/CreateNft"
                  style={{
                    textDecoration: "none",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <RiLuggageDepositLine style={{ width: "20px" }} /> &nbsp;
                  &nbsp; &nbsp; &nbsp;
                  <MenuItem onClick={() => setopenDepositPage(true)}>
                    Deposit
                  </MenuItem>
                </Link> */}
                <Link
                  // to="/profile"
                  style={{
                    textDecoration: "none",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <RiShutDownLine style={{ fontSize: "20px" }} /> &nbsp; &nbsp;
                  &nbsp; &nbsp;
                  <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
                </Link>
                <Link
                  to="/#"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                ></Link>
              </StyledMenu>

              {/*  */}
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={walletCss}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={user.linkSetup}
            >
              Connect wallet
            </Button>
          )}

          {user.isLogin && (account || user.tronWalletAddress) && (
            <Box>
              <IconButton
                aria-label="delete"
                size="small"
                className={login}
                ref={anchorRef.user}
                aria-controls={open1.user ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleClick1}
              >
                {" "}
                <Avatar
                  className={loginButton}
                  src={
                    user?.userData?.profilePic
                      ? user?.userData?.profilePic
                      : "images/profile pic.png"
                  }
                />
              </IconButton>
            </Box>
          )}

          <Popper
            open={open1.community}
            anchorEl={anchorRef.community.current}
            role={undefined}
            transition
            disablePortal
            className={submenu}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener
                    onClickAway={(e) => handleClose2(e, "user")}
                  >
                    <MenuList
                      autoFocusItem={open1}
                      id="menu-list-grow"
                      onKeyDown={(e) => handleListKeyDown(e, "user")}
                    >
                      <MenuItem component={Link} to="/our-community">
                        Getting Started
                      </MenuItem>
                      <MenuItem component={Link} to="/roadmap">
                        Roadmap
                      </MenuItem>
                      <MenuItem component={Link} to="/teambehind">
                        About Us
                      </MenuItem>
                      <MenuItem component={Link} to="/faq">
                        FAQ
                      </MenuItem>
                      {/* <MenuItem component={Link} to="/our-community">
                        Our Community
                      </MenuItem> */}

                      <MenuItem component={Link} onClick={handleDrawerOpen11}>
                        Announcements{" "}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
        {confirmSelection && (
          <Dialog
            // styl={{ background: "#110720" }}
            open={confirmSelection}
            onClose={() => {
              setconfirmSelection(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="xs"
            style={{ background: "#110720", padding: "10px 10px 35px 10px" }}
            // disableBackdropClick={isUpdateMinSatke}
            // disableEscapeKeyDown={isUpdateMinSatke}
          >
            <DialogContent
              style={{ background: "#110720", padding: "10px 10px 35px 10px" }}
            >
              <Box className={classes.updateContent}>
                <Typography variant="h5" style={{ color: "#fff" }}>
                  Buy Gas Token
                </Typography>
                <CloseIcon
                  onClick={() => {
                    setconfirmSelection(false);
                  }}
                  style={{ width: "1.3em", height: "1.3em", cursor: "pointer" }}
                />
              </Box>
              <Container className={classes.mainBoxContent}>
                <Grid container spacing={4}>
                  <Grid lg={12} md={12} xs={12} sm={12}>
                    <TextField
                      type="number"
                      className={classes.boxcolor}
                      style={{ border: "none" }}
                      variant="outlined"
                      fullWidth
                      value={gasTokenValue}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      onChange={(e) => setGastOkenValue(e.target.value)}
                      // placeholder="Search"
                      InputProps={{
                        startAdornment: (
                          <img
                            style={{ width: "34px" }}
                            src="images/gastoken.png"
                          />
                          // <MailOutlineIcon position="start">Kg</MailOutlineIcon>
                        ),
                      }}
                    />
                  </Grid>
                  &nbsp;
                  <Grid lg={12} md={12} xs={12} sm={12}>
                    <Box>
                      <Typography
                        variant="h6"
                        style={{ textAlign: "center", color: "#f9f8f9" }}
                      >
                        $0.00 = @ 500
                      </Typography>
                    </Box>
                  </Grid>
                  &nbsp;
                  <Grid lg={12} md={12} xs={12} sm={12}>
                    <Box>
                      <Box className={classes.boxcolor}>
                        <Button variant="h5" fullWidth>
                          Pay
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  &nbsp;
                  <Grid lg={12} md={12} xs={12} sm={12}>
                    <Box>
                      <Box className={classes.boxcolor}>
                        <Button variant="h5" fullWidth>
                          CHECKOUT WITH PAYPAL
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  &nbsp;
                  <Grid lg={12} md={12} xs={12} sm={12}>
                    <Box>
                      <Box className={classes.boxcolor}>
                        <Button variant="h5" fullWidth>
                          CHECKOUT WITH STRIPE
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  &nbsp;
                  <Grid lg={12} md={12} xs={12} sm={12}>
                    <Box>
                      <Box className={classes.boxcolor}>
                        <Button variant="h5" fullWidth>
                          CHECKOUT WITH CRYPTO
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </DialogContent>
          </Dialog>
        )}
        {openDepositPage && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={openDepositPage}
            onClose={() => setopenDepositPage(false)}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogActions>
              <CloseIcon
                onClick={() => setopenDepositPage(false)}
                style={{
                  width: "1.3em",
                  height: "1.3em",
                  cursor: "pointer",
                  color: "#fff",
                }}
              />
            </DialogActions>
            <DialogContent style={{ padding: "17px" }}>
              <Typography variant="h4" style={{ color: "#fff" }}>
                DEPOSIT
              </Typography>

              <Grid item xs={12} sm={12} lg={12}>
                <Box mt={2} className="mainBox">
                  <Typography
                    variant="body2"
                    className={classes.labeltext}
                    for="fname"
                    style={{
                      fontSize: "15px",
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: "200",
                      color: "white",
                      lineHeight: "1.43",
                    }}
                  >
                    {` Amount (ETH): ${balance ? balance?.slice(0, 5) : 0}`}
                  </Typography>
                  {/* &nbsp;&nbsp; */}
                  <TextField
                    style={{ marginTop: "7px" }}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder={balance}
                    fullWidth
                    type="number"
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    name="name"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    error={isSubmit1 && !mintTokenId}
                    helperText={
                      (isSubmit1 && !depositAmount && (
                        <Typography
                          variant="body"
                          style={{
                            fontSize: "13px",
                            fontWeight: "100",
                            marginTop: "4px",
                            marginLeft: "-10px",
                          }}
                        >
                          Deposit amount is required
                        </Typography>
                      )) ||
                      (Number(depositAmount) == 0 && (
                        <Box ml={1}>Enter valid deposit amount</Box>
                      ))
                    }
                  />
                </Box>
              </Grid>
              {tokenDepostMessage && (
                <Box
                  textAlign="left"
                  // ml={1}
                  mt={1}
                  style={{ color: "#7c1c1c", fontWeight: 600 }}
                >
                  {tokenDepostMessage}
                </Box>
              )}
              <Box align="center" className="modal_button_div" mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={depositETH}
                  className={classes.btnWidth}
                  mb={2}
                >
                  DEPOSIT
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setopenDepositPage(false)}
                  className={classes.btnWidth}
                >
                  CANCEL
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={mainHeader}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            <IconButton
              onClick={handleDrawerClose}
              className={customizedButton}
            >
              <GiCancel />
            </IconButton>
            <img className={logoDrawer} src="images/logo.png" alt="" />
            <Box>
              <IconButton
                aria-label="delete"
                size="small"
                className={login}
                onClick={handleClick1}
              >
                {" "}
                <Avatar
                  className={loginButton}
                  src={"images/profile pic.png"}
                />
              </IconButton>
              <StyledMenu
                id="simple-menu"
                style={{ position: "absolute", top: "3.5%" }}
                anchorEl={anchorEl1}
                keepMounted
                className={menubox}
                open={Boolean(anchorEl1)}
                onClose={handleClose}
              >
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon />
                  &nbsp; &nbsp;
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>

                <Link
                  to="/#"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListAltIcon /> &nbsp; &nbsp;
                  <MenuItem onClick={handleClose}>Garage</MenuItem>
                </Link>
                <Link
                  to="/CreateNft"
                  style={{
                    textDecoration: "none",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AiFillProject style={{ width: "20px" }} /> &nbsp; &nbsp;
                  &nbsp; &nbsp;
                  <MenuItem onClick={() => history.push("/CreateNft")}>
                    Create NFT
                  </MenuItem>
                </Link>
                <Link
                  // to="/CreateNft"
                  style={{
                    textDecoration: "none",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <RiLuggageDepositLine style={{ width: "20px" }} /> &nbsp;
                  &nbsp; &nbsp; &nbsp;
                  <MenuItem onClick={() => setopenDepositPage(true)}>
                    Deposit
                  </MenuItem>
                </Link>
                <Link
                  // to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon />
                  &nbsp; &nbsp;
                  <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
                </Link>
                <Link
                  to="/#"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                ></Link>
              </StyledMenu>
            </Box>
            {getDrawerChoices()}
            <Button
              className={menuButton}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ExpandMoreIcon />}
            >
              Learn more
            </Button>

            <input
              type="text"
              id="headerWalletAddress"
              value={user.userData?.walletAddress}
              style={{ display: "none" }}
            />
            <Button variant="contained" color="primary">
              GARAGE
            </Button>
            <Popper
              open={open1.community}
              anchorEl={anchorRef.community.current}
              role={undefined}
              transition
              disablePortal
              className={submenu}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener
                      onClickAway={(e) => handleClose2(e, "user")}
                    >
                      <MenuList
                        autoFocusItem={open1}
                        id="menu-list-grow"
                        onKeyDown={(e) => handleListKeyDown(e, "user")}
                      >
                        <MenuItem component={Link} to="/our-community">
                          Getting Started
                        </MenuItem>
                        <MenuItem component={Link} to="/roadmap">
                          Roadmap
                        </MenuItem>
                        <MenuItem component={Link} to="/teambehind">
                          About Us
                        </MenuItem>
                        <MenuItem component={Link} to="/faq">
                          FAQ
                        </MenuItem>
                        {/* <MenuItem component={Link} to="/our-community">
                          Our Community
                        </MenuItem> */}

                        <MenuItem component={Link} onClick={handleDrawerOpen11}>
                          Announcements{" "}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Drawer>

        <div>{productLogo}</div>
        <Grid container>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <IconButton
              className={drawericon}
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon
                width="60px"
                height="60px"
                style={{ color: "#fc4040", fontSize: "30px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            style={{ width: "100%" }}
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: menuButton1,
            }}
          >
            <MenuItem className={menuMobile} style={{ width: "100%" }}>
              {label}
            </MenuItem>
          </Button>
        </>
      );
    });
  };

  const productLogo = (
    <Box>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: menuButton,
            }}
            style={`/${locationHr[3]}` === href ? { color: "#EA1546" } : {}}
          >
            {label}
          </Button>
        </>
      );
    });
  };

  return (
    <>
      <AppBar
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        // className={history.location.pathname !== "/" ? "InnerHeader" : "Header"}
        elevation={0}
        style={{ backgroundColor: "rgb(11 4 19)", border: "none" }}
      >
        <Container
          maxWidth={history.location.pathname !== "/" ? "lg" : "lg"}
          className={containerHeight}
        >
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>

      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        className={menubox}
        onClose={handleClose1}
      >
        <MenuItem component={Link} to="/our-community">
          Getting Started
        </MenuItem>
        <MenuItem component={Link} to="/roadmap">
          Roadmap
        </MenuItem>
        <MenuItem component={Link} to="/teambehind">
          About Us
        </MenuItem>
        <MenuItem component={Link} to="/faq">
          FAQ
        </MenuItem>

        <MenuItem component={Link} onClick={handleDrawerOpen11}>
          Announcements
        </MenuItem>
      </StyledMenu>

      <Drawer
        variant="temporary"
        anchor="right"
        open={open11}
        onClose={handleDrawerClose11}
        style={{ overflowY: "scroll" }}
      >
        <Box className="updateBox">
          <Typography variant="h4">
            Product Updates <HiExternalLink />{" "}
          </Typography>
          <p className="letestPost">
            {" "}
            <MdEmail /> Get the latest posts to your inbox!
          </p>
          <Box className="announcementBox_main">
            <Box className="announcementBox">
              <span>2 days ago </span>
              <p className="annousment">ANNOUNCEMENT</p>
              <Typography variant="h3">
                Next Up: The Fibonacci Cup 4.0
              </Typography>
              <Typography variant="body2">Hey everyone 🐴</Typography>
              <Typography variant="body2">
                Hope you’re all still riding the high of reading our first{" "}
                <a href="#" target="_blank">
                  FOREIGN FUELS blog.
                </a>{" "}
              </Typography>
              <Typography variant="body2">
                As mentioned in that blog…
              </Typography>
              <Typography variant="body2">
                {" "}
                Next up: The Fibonacci Cup 4.0!
              </Typography>
              <Typography variant="body2">
                {" "}
                Back by popular demand, the Fibonacci Cup. Here are the details:
              </Typography>
              <Typography variant="body2">
                {" "}
                🕚 Qualifying starts 12th Jan, 12am UTC
              </Typography>
              <Typography variant="body2">
                {" "}
                👉 Just a reminder there will be no Grand Finals again
              </Typography>
              <Typography variant="body2">
                {" "}
                You can find all the info in{" "}
                <a href="#" target="_blank">
                  FOREIGN FUELS Guide.{" "}
                </a>
              </Typography>
              <Typography variant="body2">
                {" "}
                👀 What’s next for tournaments? 👀
              </Typography>
              <Typography variant="body2">
                {" "}
                The next few weeks will bring some exciting changes for FOREIGN
                FUELS tournaments, so stay tuned for more info!
              </Typography>
              <Box className="sendBox">
                <input type="text" placeholder="Send us your feedback" />
                <MdSend />
              </Box>
            </Box>
            <Box className="announcementBox">
              <span>2 days ago </span>
              <p className="annousment">ANNOUNCEMENT</p>
              <Typography variant="h3">
                Next Up: The Fibonacci Cup 4.0
              </Typography>
              <Typography variant="body2">Hey everyone 🐴</Typography>
              <Typography variant="body2">
                Hope you’re all still riding the high of reading our first{" "}
                <a href="#" target="_blank">
                  FOREIGN FUELS blog.
                </a>{" "}
              </Typography>
              <Typography variant="body2">
                As mentioned in that blog…
              </Typography>
              <Typography variant="body2">
                {" "}
                Next up: The Fibonacci Cup 4.0!
              </Typography>
              <Typography variant="body2">
                {" "}
                Back by popular demand, the Fibonacci Cup. Here are the details:
              </Typography>
              <Typography variant="body2">
                {" "}
                🕚 Qualifying starts 12th Jan, 12am UTC
              </Typography>
              <Typography variant="body2">
                {" "}
                👉 Just a reminder there will be no Grand Finals again
              </Typography>
              <Typography variant="body2">
                {" "}
                You can find all the info in{" "}
                <a href="#" target="_blank">
                  FOREIGN FUELS Guide.{" "}
                </a>
              </Typography>
              <Typography variant="body2">
                {" "}
                👀 What’s next for tournaments? 👀
              </Typography>
              <Typography variant="body2">
                {" "}
                The next few weeks will bring some exciting changes for FOREIGN
                FUELS tournaments, so stay tuned for more info!
              </Typography>
              <Box className="sendBox">
                <input type="text" placeholder="Send us your feedback" />
                <MdSend />
              </Box>
            </Box>
            <Box className="announcementBox">
              <span>2 days ago </span>
              <p className="annousment">ANNOUNCEMENT</p>
              <Typography variant="h3">
                Next Up: The Fibonacci Cup 4.0
              </Typography>
              <Typography variant="body2">Hey everyone 🐴</Typography>
              <Typography variant="body2">
                Hope you’re all still riding the high of reading our first{" "}
                <a href="#" target="_blank">
                  FOREIGN FUELS blog.
                </a>{" "}
              </Typography>
              <Typography variant="body2">
                As mentioned in that blog…
              </Typography>
              <Typography variant="body2">
                {" "}
                Next up: The Fibonacci Cup 4.0!
              </Typography>
              <Typography variant="body2">
                {" "}
                Back by popular demand, the Fibonacci Cup. Here are the details:
              </Typography>
              <Typography variant="body2">
                {" "}
                🕚 Qualifying starts 12th Jan, 12am UTC
              </Typography>
              <Typography variant="body2">
                {" "}
                👉 Just a reminder there will be no Grand Finals again
              </Typography>
              <Typography variant="body2">
                {" "}
                You can find all the info in{" "}
                <a href="#" target="_blank">
                  FOREIGN FUELS Guide.{" "}
                </a>
              </Typography>
              <Typography variant="body2">
                {" "}
                👀 What’s next for tournaments? 👀
              </Typography>
              <Typography variant="body2">
                {" "}
                The next few weeks will bring some exciting changes for FOREIGN
                FUELS tournaments, so stay tuned for more info!
              </Typography>
              <Box className="sendBox">
                <input type="text" placeholder="Send us your feedback" />
                <MdSend />
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
