import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Divider,
  Paper,
  Hidden,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { AiFillPlaySquare } from "react-icons/ai"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  mainbox: {},
  bgbox: {
    backgroundColor: "#120720",
    //padding: "10px 10px 10px 10px",
    //border: "1px solid #6C0863",
    borderRadius: "10px",
  },
  header: {
    background: "transparent",
    paddingTop: "0",
    paddingBottom: "0",
    "& .MuiTableCell-root": {
      backgroundColor: "transparent",
    },
    "& :hover": {
      backgroundColor: "#2c1e3d",
    },
  },
  headtext: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#fff",
  },
  boxmain: {
    backgroundColor: "#21162e",
    paddingTop: "40px",
    paddingBottom: "50px",
    textAlign: "center",
    // borderTopLeftRadius: "45px",
    // borderTopRightRadius: "45px",
  },
  buttonright1: {
    padding: "10px",
    fontSize: "24px",
    fontWeight: "400",
    textAlign: "center",
    backgroundColor: "#F83838",
    "&:hover": {
      backgroundColor: "#F83838",
    },
  },
  buttonrightsm: {
    // padding: "10px",
    // fontSize: "24px",
    // fontWeight: "400",
    "& p": {
      backgroundColor: "#F83838",
      padding: "10px",
      width: "fit-content",
    },
    "& h6": {
      paddingTop: "8px",
      fontSize: "15px",
      // color: "#ffffff",
    },
    "& h5": {
      paddingTop: "8px",
      fontSize: "17px",
      color: "#ffffff",
    },
  },
  divide: {
    marginTop: "30px",
    marginBottom: "30px",
  },
  dividebox: {
    border: "1px solid #adabab",
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
  TableBody: {
    "& .MuiTableCell-root": {
      backgroundColor: "#21162e",
    },
    "& .TableHead": {
      background: "transparent",
      boxShadow: "rgb(47 40 47) 0px 5px 15px",
      marginBottom: "5px",
      backgroundColor: "#2c1e3d",
    },
  },
  livebtn:{
    fontSize:" 20px",
    display: "flex",
    alignItems: "center",
    color:" #f83838",
    "& svg":{
      marginTop: "-5px",
      marginRight: "5px",
    },
  },

}));

function RacesCardResult(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <Box className={classes.mainbox}>
      <Box className={classes.bgbox}>
        <Box pt={1} pb={1}>
          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Hidden smDown>
                <TableContainer className={classes.header}>
                  <Table aria-label="simple table" id="user_list">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          component="th"
                          // style={{ minWidth: "160px" }}
                          scope="row"
                        >
                          <Typography
                            variant="body2"
                            className={classes.buttonright1}
                          >
                            Open for all
                          </Typography>
                        </TableCell>
                        <TableCell
                          component="th"
                          style={{ width: "140px" }}
                          scope="row"
                          minWidth="160px"
                        >
                          <Typography variant="body2">
                            {data.raceName}
                          </Typography>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ maxWidth: "160px" }}
                        >
                          <Typography variant="body2">
                            {data.hippodrome}
                          </Typography>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ maxWidth: "160px" }}
                        >
                          <Typography variant="body2">
                            {data.distance}
                          </Typography>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ maxWidth: "160px" }}
                        >
                          <Typography variant="body2">{data.text5}</Typography>
                        </TableCell>

                        <TableCell align="start" style={{ maxWidth: "160px" }}>
                          <Typography variant="body2">{data.text6}</Typography>
                        </TableCell>

                        <TableCell align="start" style={{ maxWidth: "160px" }}>
                          <Typography variant="body2">{data.text7}</Typography>
                        </TableCell>
                        <TableCell align="start" style={{ maxWidth: "160px" }}>
                          <Typography variant="body2">{data.text8}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Hidden>

              <Hidden mdUp>
                <Grid container>
                  <Grid item sm={6} xs={6}>
                    <Box
                      className={classes.buttonrightsm}
                      textAlign="start"
                      pl={2}
                    >
                      {" "}
                      <Typography variant="body2">Open </Typography>
                      <Typography variant="h5">{data.raceName}</Typography>
                      <Typography variant="h6">{data.hippodrome}</Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Box textAlign="end" pt={2} pr={2}>
                      <Typography variant="body2">{data.text5}</Typography>
                      <Typography variant="body2">{data.text6}</Typography>
                      <Typography variant="body2">{data.distance}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Hidden>
            </AccordionSummary>

            <AccordionDetails>
              <Grid
                container
                spacing={2}
                className="text-center"
                style={{ display: "block" }}
              >
                <Grid item xs={12} md={12}>
                  <Paper
                    variant="outlined"
                    elevation={3}
                    style={{ padding: "11px" }}
                  >
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
                                    className={classes.buttonright}
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
                                  <Button className={classes.livebtn}> <AiFillPlaySquare/>  LIVE</Button>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Container>
                      </Box>
                    </Box>

                    <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead className="TableHead">
                          <TableRow>
                            {props.columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: "#190A2C",
                                  boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody className={classes.TableBody}>
                          {props.tabelData.map((data, i) => {
                            return (
                              <>
                                <TableRow key={i}>
                                  <TableCell
                                    style={{
                                      boxShadow:
                                        "0 0 8px 0 rgb(99 99 99 / 20%)",
                                    }}
                                    className="table-data p-l-10"
                                  >
                                    {data.Name}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      boxShadow:
                                        "0 0 8px 0 rgb(99 99 99 / 20%)",
                                    }}
                                    className="table-data"
                                  >
                                    {data.Transmission}
                                    {/* {data.craft} */}
                                  </TableCell>

                                  <TableCell
                                    style={{
                                      boxShadow:
                                        "0 0 8px 0 rgb(99 99 99 / 20%)",
                                    }}
                                    className="table-data"
                                  >
                                    {data.Compare}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      boxShadow:
                                        "0 0 8px 0 rgb(99 99 99 / 20%)",
                                    }}
                                    className="table-data"
                                  >
                                    {data.Mileage}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      boxShadow:
                                        "0 0 8px 0 rgb(99 99 99 / 20%)",
                                    }}
                                    className="table-data"
                                  >
                                    {data.Engine}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      boxShadow:
                                        "0 0 8px 0 rgb(99 99 99 / 20%)",
                                    }}
                                    className="table-data"
                                  >
                                    {data.MaxPower}
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {/* <Grid container spacing={3}>
            {TeamMap.map((data, i) => {
              return (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <RacesCardResult data={data} index={i} />
                </Grid>
              );
            })}
          </Grid> */}
        </Box>

        <>
          {/* <Grid container alignItems="center">
          <Grid item lg={2} md={2} sm={6} xs={12}>
            <Box>
              <img
                src={data.image1}
                alt=""
                width="100%"
                style={{
                  width: "100%",
                  maxWidth: "80px",
                  margin: "0 auto",
                }}
              />
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box>
              <img
                src={data.image2}
                alt=""
                width="100%"
                style={{
                  width: "100%",
                  maxWidth: "100px",
                  margin: "0 auto",
                }}
              />
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={6} xs={12}>
            <Box>
              <Typography variant="body1">{data.text1}</Typography>
            </Box>
          </Grid>
          <Grid item lg={2} md={2} sm={6} xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                style={{
                  fontSize: "21px",
                  fontWeight: "400",
                  color: "#1CE9E9",
                }}
              >
                {data.text2}
              </Typography>

              <Typography style={{ fontSize: "16px", fontWeight: "400" }}>
                {data.text3}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      
       */}
        </>
      </Box>
    </Box>
  );
}

export default RacesCardResult;
