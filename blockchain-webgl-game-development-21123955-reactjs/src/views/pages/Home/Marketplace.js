import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  InputAdornment,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import FormLabel from "@material-ui/core/FormLabel";
// import FormControl from '@material-ui/core/FormControl';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import MaketplaceCard from "src/component/MarketplaceCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    //padding: '80px 0',
    //position: 'relative',
    //[theme.breakpoints.down('sm')]: {
    //  padding: '100px 0',
    //},
    //[theme.breakpoints.down('xs')]: {
    //  padding: '50px 0',
    //},
    paddingBottom: "100px",
    //height: '100vh',
    backgroundColor: "#120720",
  },
  textbox: {
    // position: "relativ",
    "& h1": {
      fontSize: "50px",
      fontWeight: "400",
      color: "#fff",
      [theme.breakpoints.down("md")]: {
        fontSize: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontSize: "16px",
      marginTop: "20px",
      color: "#fff",
    },
  },
  accordion: { background: "transparent", position: "relative" },
  AccordionSum: {
    width: "125px",
    background: "#120720",
  },
  accordionBox: {
    width: "100%",
    // height: '300px',
    paddingBottom: "15px",
  },
  formCheck: {
    "&.MuiFormControlLabel": {
      fontSize: "16px",
      "&.span": {
        color: "#fff",
      },
    },
  },
}));
const TeamMap = [
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car1.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",

    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",
    text1: "Danish Race",
    text2: "Tata Harrier",
    text3: "525 days left",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
];
export default function () {
  const classes = useStyles();
  const history = useHistory();

  const [age, setAge] = React.useState("");
  const [data, setData] = React.useState("");

  const handleChange1 = (event) => {
    setAge(event.target.value);
  };

  // const handleChange1 = (event) => {
  //   setData(event.target.value)
  // }
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [openHostory, setOpenHistory] = React.useState(false);
  const handleClose1 = () => {
    setOpenHistory(false);
  };
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    wazid: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine, wazid } = state;
  const error = [gilad, jason, antoine, wazid].filter((v) => v).length !== 2;

  return (
    <Box className={classes.aboutsection}>
      <Container maxWidth="lg" className="wow bounceInUp">
        {/* <Button
          variant="text"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={() => history.goBack()}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button> */}
        <Box className={classes.textbox} align="center" mb={5} mb={7}>
          <Box mt={5}>
            <Accordion className={classes.accordion}>
              <Grid
                // style={{ position:"absolute" }}
                container
                spacing={6}
              >
                <Grid item lg={4} md={4} sm={8} xs={12}>
                  <Box style={{ textAlign: "start" }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Search "
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AiOutlineSearch style={{ fontSize: "20px" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6}>
                  {/* <AccordionSummary
                    className={classes.AccordionSum}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <FormControl
                      className={classes.formControl}
                      style={{
                        border: "1px solid #eb0dca",
                        width: "120px",
                        padding: "10px",
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-evenly"
                        alignItems="center"
                      >
                        <Box>
                          <FiFilter />
                        </Box>
                        <Box>
                          <Typography variant="h5">Filter</Typography>
                        </Box>
                      </Box>
                    </FormControl>
                  </AccordionSummary>
               */}
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={6}>
                  {/* <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Box>
                      <Typography style={{ margin: "0px 10px" }}>
                        Sort By:
                      </Typography>
                    </Box>
                    <FormControl
                      className={classes.formControl}
                      style={{ border: "1px solid #eb0dca", width: "120px" }}
                    >
                      <Select
                        value={age}
                        displayEmpty
                        onChange={handleChange1}
                        className={classes.selectEmpty}
                        fullWidth
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>Newest</em>
                        </MenuItem>
                        <MenuItem value={10}>Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
                </Grid>
              </Grid>

              {/* <AccordionDetails>
                <Box className={classes.accordionBox}>
                  <Grid container>
                    <Grid item lg={3} sm={6} md={6}>
                      <Box pb={2} pt={2}>
                        <Typography variant="body1">Generation</Typography>
                      </Box>
                      <Grid container>
                        <Grid item lg={4} sm={4} md={4} xs={12}>
                          <Box style={{ textAlign: "start" }}>
                            <TextField
                              variant="outlined"
                              fullWidth
                              placeholder="1"
                            />
                          </Box>
                        </Grid>
                        <Grid item lg={4} sm={4} md={4} xs={12}></Grid>
                        <Grid item lg={4} sm={4} md={4} xs={12}>
                          <Box style={{ textAlign: "start" }}>
                            <TextField
                              variant="outlined"
                              fullWidth
                              placeholder="1"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Box textAlign="start" pt={2}>
                        <Button
                          type="submit"
                          style={{
                            border: "1px solid #eb0dca",
                            borderRadius: "22px",
                            width: "120px",
                            padding: "10px",
                          }}
                        >
                          Reset
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item lg={9} sm={6} md={6}>
                      <Grid container>
                        <Grid item lg={3} sm={6} md={6}>
                          <Box pt={2}>
                            <Typography variant="body1">Engine</Typography>
                          </Box>
                          <Box>
                            <FormControl
                              component="fieldset"
                              className={classes.formCheck}
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={gilad}
                                      onChange={handleChange}
                                      name="gilad"
                                    />
                                  }
                                  label="Gilad Gray"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={jason}
                                      onChange={handleChange}
                                      name="jason"
                                    />
                                  }
                                  label="Jason Killian"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={antoine}
                                      onChange={handleChange}
                                      name="antoine"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={wazid}
                                      onChange={handleChange}
                                      name="wazid"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item lg={3} sm={6} md={6}>
                          <Box pt={2}>
                            <Typography variant="body1">Power</Typography>
                          </Box>
                          <Box>
                            <FormControl
                              component="fieldset"
                              className={classes.formCheck}
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={antoine}
                                      onChange={handleChange}
                                      name="antoine"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={wazid}
                                      onChange={handleChange}
                                      name="wazid"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item lg={3} sm={6} md={6}>
                          <Box pt={2}>
                            <Typography variant="body1">Tier</Typography>
                          </Box>
                          <Box>
                            <FormControl
                              component="fieldset"
                              className={classes.formCheck}
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={gilad}
                                      onChange={handleChange}
                                      name="gilad"
                                    />
                                  }
                                  label="Gilad Gray"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={jason}
                                      onChange={handleChange}
                                      name="jason"
                                    />
                                  }
                                  label="Jason Killian"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={antoine}
                                      onChange={handleChange}
                                      name="antoine"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={wazid}
                                      onChange={handleChange}
                                      name="wazid"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item lg={3} sm={6} md={6}>
                          <Box pt={7}>
                            <FormControl
                              component="fieldset"
                              className={classes.formCheck}
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={antoine}
                                      onChange={handleChange}
                                      name="antoine"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={wazid}
                                      onChange={handleChange}
                                      name="wazid"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails> */}
            </Accordion>
            <Divider style={{ borderBottom: "2px solid #190A2C" }} />
          </Box>
        </Box>
        {/* <Grid container spacing={3}>
          {TeamMap.map((data, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <MaketplaceCard data={data} index={i} />
              </Grid>
            );
          })}
        </Grid> */}
      </Container>
    </Box>
  );
}
