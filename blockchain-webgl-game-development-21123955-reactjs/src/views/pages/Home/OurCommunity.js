import React, { useState } from "react";
// import Owned from "./Owned";
import { BsInfoLg } from "react-icons/bs";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineQuestion } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import {
  Grid,
  Box,
  Container,
  IconButton,
  Typography,
  makeStyles,
  Button,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wallet: {
    paddingTop: "50px",
    paddingBottom: "100px",
  },
  communityBox: {
    backgroundImage:
      " linear-gradient(  1.57deg  ,#45597d 1.41%,rgba(25,59,103,.34) 41.32%,rgb(39 49 59 / 65%) 79.59%), url('../images/bgCar.jpg')",
    padding: " 30px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    cursor: "pointer",
    position: "relative",
    transition: "0.3s",
    zIndex: "1",
    "&:hover": {
      transform: "translateY(-10px)",
      "& a": {
        textDecoration: "none",
      },
    },

    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#00000038",
      zIndex: "-1",
    },
    "& div": {
      height: "40px",
      width: "40px",
      borderRadius: " 50%",
      border: "1px solid #fff",
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
      alignItems: "center",
      fontSize: "22px",
      color: "#fff",
    },
    "& h4": {
      color: "#fff",
      marginBottom: "20px",
      letterSpacing: " 1px",
      display: "flex",
      alignItems: "center",
    },
    "& p": {
      color: "#fff",
      fontSize: "14px",
    },
  },
}));

export default function UsersView() {
  const classes = useStyles();

  return (
    <Box className={classes.wallet}>
      <Container>
        <Box className="subtext" textAlign="center" pb={5}>
          <Typography
            variant="h3"
            title="COMMUNITY PORTALS"
            style={{ marginBottom: "14px" }}
          >
            Community Portals
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.communityBox}>
              <div>
                <BsInfoLg />
              </div>
              <Typography variant="h4">
                Getting Started <BiChevronRight />{" "}
              </Typography>
              <Typography variant="body2">
                Here, you'll find curated how-to guides and information to help
                get you on the racetrack.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.communityBox}>
              <div>
                <AiOutlineShoppingCart />
              </div>
              <Typography variant="h4">
                Buy a RaceCar <BiChevronRight />{" "}
              </Typography>
              <Typography variant="body2">
                Don't have a raceCar yet? Find the right one to bring you
                success on the racetrack.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.communityBox}>
              <div>
                <AiOutlineQuestion />
              </div>
              <Typography variant="h4">
                FAQ <BiChevronRight />{" "}
              </Typography>
              <Typography variant="body2">
                Need help? For more information, you can also check the
                dedicated Knowledge Knowledge Base!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.communityBox}>
              <div>
                <BsNewspaper />
              </div>
              <Typography variant="h4">
                Latest News <BiChevronRight />{" "}
              </Typography>
              <Typography variant="body2">
                Be the first! Find all the ZED RUN related news as soon as it
                happens.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.communityBox}>
              <Link
                href="https://discord.com/invite/Jjv3xYAqsf"
                target="_blanck"
              >
                <div>
                  <FiUserPlus />
                </div>
                <Typography variant="h4">
                  Join the Community <BiChevronRight />{" "}
                </Typography>
                <Typography variant="body2">
                  Join our thriving community on Discord and chat to likeminded
                  people around the world.
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.communityBox}>
              <div>
                <RiProductHuntLine />
              </div>
              <Typography variant="h4">
                Product Portal <BiChevronRight />{" "}
              </Typography>
              <Typography variant="body2">
                Do you have any ideas? Share them with us and help us improve
                the site and the experience.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
