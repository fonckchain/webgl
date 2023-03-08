import React from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Button,
    Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import RaceTableDetails from "./RaceTableDetails";
import { AiFillPlaySquare } from "react-icons/ai";
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

export default function CollapsibleTable() {
    const classes = useStyles();
    return (
        <Box className={classes.boxmain}>
            <Grid container spacing={2}>

                <Grid item lg={3} md={4} sm={4} xs={12}>
                    <Box>
                        <Typography className={classes.headtext}>
                            ENTRY REQUIREMENTS
                        </Typography>
                    </Box>
                    <Box mt={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ fontSize: " 12px", height: "40px", }}
                        >
                            Open All
                        </Button>
                    </Box>
                </Grid>
                <Grid item lg={3} md={4} sm={4} xs={12}>
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
                <Grid item lg={3} md={4} sm={4} xs={12}>
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
                <Grid item lg={3} md={4} sm={4} xs={12}>
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
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <Box paddingTop="60px">
                                <img
                                    src="./images/car1.png"
                                    alt=""
                                    width="100%"
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                        margin: "0 auto",
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <Box
                                textAlign="center"
                                className={classes.carstatus}
                            >
                                <Grid container spacing={2}>
                                    <Grid item lg={3} md={3} sm={6} xs={12}>
                                        <Box>
                                            <Typography className={classes.headtext}>
                                                HIPPODROME
                                            </Typography>
                                        </Box>
                                        <Box>
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
                                        <Box>
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
                                        <Box>
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
                                        <Box>
                                            <Typography style={{ color: "#a19898" }}>
                                                Dec 31, 2021 3:57 PM
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
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
                                <Box align="right" mt={3}>
                                    <Button className={classes.livebtn}> <AiFillPlaySquare />  LIVE</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <RaceTableDetails/>

        </Box>
    );
}
