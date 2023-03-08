import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import { AiFillMediumCircle } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footerSection: {
    backgroundImage: "url(./images/footerbg.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(6),
    },
    "& ul": {
      padding: "0",
    },
    "& h3": {
      fontSize: "24px",
      fontWeight: "400",
      color: "#ffffff",
      marginTop: "20px",
      marginBottom: "20px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  },
  borderBottmo: {
    overflow: "hidden",
    background: "#000",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },

  largeIcon: {
    width: 18,
    height: 18,
    marginRight: "8px",
  },
  icons: {
    justify: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justify: "center",
    },
  },
  button: {
    backgroundColor: "#fab758",
    color: "#ffffff",
    border: "2px solid #fab758",
    borderRadius: "40px",
    minHeight: "50px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: "500",
    transition: "0.26s ease",
    minWidth: "160px",
    paddingBottom: "3px",
    textTransform: "capitalize",
    marginRight: "15px",
    marginBottom: "10px",
    marginTop: "27px",
  },
  join: {
    color: "#ffffff",
    fontSize: "30px",
  },
  textFild: {
    position: "relative",

    "& button": {
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      backgroundColor: "#3F78E0",
      minWidth: "90px",
      fontSize: "16px",
      fontWeight: "500",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#000",
      },
    },
  },
}));

export default function Liquidity() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.footerSection} style={{ background: "#120720" }}>
        <Container maxWidth="lg">
          <Grid container style={{ color: "white" }} spacing={1}>
            <Grid item xs={12} sm={12} md={4}>
              <Grid
                container
                direction="column"
                spacing={9}
                alignItems="flex-start"
              >
                <Grid item>
                  {" "}
                  {/*{/ <Logo width="100" />{" "} /}*/}
                  <img
                    src="/images/logo.png"
                    alt=""
                    width="100%"
                    style={{ maxWidth: "350px", margin: "0 auto" }}
                  />
                  <Typography
                    variant="body2"
                    style={{
                      maxWidth: "267px",
                      margin: "0 auto",
                      color: "#666666",
                    }}
                  >
                    The first Immutable Racing Game with zero gas fees. The more
                    you race the more you earn!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <Typography
                className="footerTitle"
                variant="h3"
                style={{ color: "#ffffff" }}
              >
                ABOUT US
              </Typography>
              <List className="listingFooter">
                <ListItem style={{ color: "#666666" }}>
                  <a
                    style={{ color: "#666666" }}
                    href="https://foreign-fuels.gitbook.io/foreignfuels/introduction/overview"
                    target="_blank"
                  >
                    {" "}
                    Whitepaper
                  </a>
                </ListItem>

                <ListItem
                  style={{ color: "#666666" }}
                  to="/teambehind"
                  component={Link}
                >
                  Team
                </ListItem>
                <ListItem
                  style={{ color: "#666666" }}
                  to="/brackers"
                  component={Link}
                >
                  Brackers
                </ListItem>
                <ListItem
                  style={{ color: "#666666" }}
                  to="/privacy-policy"
                  component={Link}
                >
                  Privacy Policy
                </ListItem>
              </List>{" "}
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <Typography
                className="footerTitle"
                variant="h3"
                style={{ color: "#ffffff" }}
              >
                LEARN MORE
              </Typography>
              <List className="listingFooter">
                <ListItem
                  to="/roadmap"
                  component={Link}
                  style={{ color: "#666666" }}
                >
                  Roadmap
                </ListItem>
                <ListItem
                  to="/racefeatures"
                  component={Link}
                  style={{ color: "#666666" }}
                >
                  Features
                </ListItem>
                <ListItem
                  to="/marketplace"
                  component={Link}
                  style={{ color: "#666666" }}
                >
                  Marketplace
                </ListItem>
                <ListItem
                  to="/marketplace"
                  component={Link}
                  style={{ color: "#666666" }}
                >
                  Getting Started
                </ListItem>
              </List>{" "}
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography
                className="footerTitle"
                variant="h3"
                style={{ color: "#ffffff" }}
              >
                SOCIAL
              </Typography>
              <List className="listingFooter">
                <ListItem>
                  <a
                    href="https://twitter.com/foreignfuels"
                    target="_blank"
                    style={{ color: "#666666" }}
                  >
                    <img
                      src="images/tweeter.png"
                      style={{ width: "21%", marginRight: "7px" }}
                    />
                    {/* style={{ fontSize: "25px", color: "#666666" }} */}
                    Twitter
                  </a>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <a
                    href="https://discord.com/invite/FHdFRc4j3u"
                    target="_blank"
                    style={{ color: "#666666" }}
                  >
                    {" "}
                    {/* <BsDiscord
                      style={{ fontSize: "25px", color: "#666666" }}
                    />{" "} */}
                    <img
                      src="images/discord.png"
                      style={{ width: "21%", marginRight: "7px" }}
                    />
                    Discord
                  </a>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <a
                    href="https://foreignfuels.medium.com/"
                    target="_blank"
                    style={{ color: "#666666" }}
                  >
                    {" "}
                    {/* <AiFillMediumCircle
                      style={{ fontSize: "25px", color: "#666666" }}
                    />{" "} */}
                    <img
                      src="images/medium.png"
                      style={{ width: "21%", marginRight: "7px" }}
                    />
                    Medium
                  </a>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <a
                    href="https://foreignfuels.instagram.com/"
                    target="_blank"
                    style={{ color: "#666666" }}
                  >
                    {" "}
                    {/* <AiFillMediumCircle
                      style={{ fontSize: "25px", color: "#666666" }}
                    />{" "} */}
                    <img
                      src="images/insta.png"
                      style={{ width: "19%", marginRight: "7px" }}
                    />
                    Instagram
                  </a>{" "}
                </ListItem>
                {/* <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <AiFillTwitterCircle style={{ fontSize: "25px" }} />
                  <ListItem
                    style={{ color: "#ffffff", margin: "0px 10px" }}
                  >
                    {" "}
                    Twitter
                  </ListItem>
                </Box> */}
                {/* <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <BsDiscord style={{ fontSize: "25px" }} />
                  <ListItem
                    style={{ color: "#ffffff", margin: "0px 10px" }}
                  >
                    Discord
                  </ListItem>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <AiFillMediumCircle style={{ fontSize: "25px" }} />
                  <ListItem
                    style={{ color: "#ffffff", margin: "0px 10px" }}
                  >
                    Medium
                  </ListItem>
                </Box> */}
              </List>{" "}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
