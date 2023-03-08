import React from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Button,
    Divider,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import RaceResultTableDetails from "./RaceResultTableDetails";
import { AiFillPlaySquare } from "react-icons/ai";
import WinnerCard from "src/component/WinnerCard";
const useStyles = makeStyles((theme) => ({

    openbtn: {
        backgroundColor: "#F83838",
    },
    boxmain: {
        backgroundColor: "#21162e",
        paddingTop: "40px",
        paddingBottom: "50px",
        textAlign: "center",
    },
    divide: {
        marginTop: "30px",
        marginBottom: "30px",
    },
    dividebox: {
        border: "1px solid #adabab",
    },
    livebtn: {
        fontSize: " 20px",
        display: "flex",
        alignItems: "center",
        color: " #f83838",
        "& svg": {
            marginTop: "-5px",
            marginRight: "5px",
        },
    },
    headtext: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#fff",
    },
    boxcolor: {
        borderRadius: "4px",
        paddingTop: "5px",
        paddingBottom: "5px",
        transform: "matrix(0.94, 0, -0.37, 1, 0, 0)",
        backgroundColor: "rgb(215, 162, 28)",
    },

    boxcolors: {
        borderRadius: "4px",
        paddingTop: "5px",
        paddingBottom: "5px",
        transform: "matrix(0.94, 0, -0.37, 1, 0, 0)",

        backgroundColor: "rgb(192, 122, 71)",
    },
}));
const WinnerData = [
    {
      image1: "images/car1.png",
      text1: "Car 1",
      text2: "1st Gen",
      text3: " 300 hp",
      text4: "st",
      text5: "31 min 22.20 sec",
    },
    {
      image1: "images/car2.png",
      text1: "Car 2",
      text2: "2nd Gen",
      text3: " 200 hp",
      text4: "nd",
      text5: "35 min 34.33 sec",
    },
    {
      image1: "images/car3.png",
      text1: "Car 3",
      text2: "3rd Gen",
      text3: " 100 hp",
      text4: "rd",
      text5: "36 min 20.67 sec",
    },
  ];
export default function CollapsibleTable() {
    const classes = useStyles();
    return (
        <Box className={classes.boxmain}>
             <Grid container spacing={2}>
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                      <Box>
                        <Typography className={classes.headtext}>
                          ENTRY REQUIREMENTS
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                      <Box>
                        <Typography className={classes.headtext}>
                          RACE NAME
                        </Typography>
                      </Box>
                      <Box mt={3}>
                        <Typography
                          style={{
                            color: "#938989",
                            fontSize: "17px",
                            fontWeight: "500",
                          }}
                        >
                          Beta Race #1679
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                      <Box>
                        <Typography className={classes.headtext}>
                          PRIZE POOL
                        </Typography>
                      </Box>
                      <Box mt={3}>
                        <Typography
                          style={{
                            color: "#938989",
                            fontSize: "17px",
                            fontWeight: "500",
                          }}
                        >
                          73.15DERC
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                      <Box>
                        <Typography className={classes.headtext}>
                          REGISTERED
                        </Typography>
                      </Box>
                      <Box mt={3}>
                        <Typography
                          style={{
                            color: "#938989",
                            fontSize: "17px",
                            fontWeight: "500",
                          }}
                        >
                          73.15DERC
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
            <Box className={classes.divide}>
                <Divider className={classes.dividebox} />
            </Box>
            <Box>
                    <Container>
                      <Grid container alignItems="center">
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Box textAlign="center" pb={5}>
                            <Grid container spacing={2}>
                              <Grid
                                item
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  paddingTop: "12px",
                                }}
                                lg={6}
                                md={6}
                                sm={6}
                                xs={12}
                              >
                                <Grid container spacing={2}>
                                  <Grid item lg={3} md={3} sm={6} xs={12}>
                                    <Box>
                                      <Typography className={classes.headtext}>
                                        HIPPODROME

                                      </Typography>
                                    </Box>
                                    <Box pt={1}>
                                      <Typography style={{ color: "#a19898" }}>
                                        Adem's
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid item lg={3} md={3} sm={6} xs={12}>
                                    <Box>
                                      <Typography className={classes.headtext}>
                                        STATUS
                                      </Typography>
                                    </Box>
                                    <Box pt={1}>
                                      <Typography style={{ color: "#a19898" }}>
                                        Open
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid item lg={3} md={3} sm={6} xs={12}>
                                    <Box>
                                      <Typography className={classes.headtext}>
                                        DISTANCE
                                      </Typography>
                                    </Box>
                                    <Box pt={1}>
                                      <Typography style={{ color: "#a19898" }}>
                                        2 Furlongs
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid item lg={3} md={3} sm={6} xs={12}>
                                    <Box>
                                      <Typography className={classes.headtext}>
                                        STARTS AT

                                      </Typography>
                                    </Box>
                                    <Box pt={1}>
                                      <Typography style={{ color: "#a19898" }}>
                                        Dec 31, 2021 3:57 PM
                                      </Typography>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item lg={6} sm={6} md={6} xs={12}>
                                <Box mt={3} align="center">
                                  <Typography
                                    style={{
                                      color: "#fff",
                                      fontSize: "12px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    TOTAL PRIZE POOL OF 22.80 DERC WILL BE SPLIT
                                    AS FOLLOWS:
                                  </Typography>
                                </Box>
                                <Box>
                                  <Grid container>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                      <Box mt={2} className={classes.boxcolor}>
                                        <Typography
                                          style={{
                                            color: "#fff",
                                            fontSize: "17px",
                                            letterSpacing: "1px",
                                          }}
                                        >
                                          1st43.20Derc
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                      <Box mt={2} className={classes.boxcolors}>
                                        <Typography
                                          style={{
                                            color: "#fff",
                                            fontSize: "17px",
                                            letterSpacing: "1px",
                                          }}
                                        >
                                          2nd6.00Derc
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                      <Box mt={2} className={classes.boxcolor}>
                                        <Typography
                                          style={{
                                            color: "#fff",
                                            fontSize: "17px",
                                            letterSpacing: "1px",
                                          }}
                                        >
                                          3rd2.40Derc
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>

                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Container>
                  </Box>
                  <Container >
                <Grid container spacing={3}>
                    {WinnerData.map((data, i) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
                          <WinnerCard data={data} index={i} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Container>
            <RaceResultTableDetails/>

        </Box>
    );
}
